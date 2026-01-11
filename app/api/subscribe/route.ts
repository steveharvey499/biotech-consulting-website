import { NextRequest, NextResponse } from "next/server";
import { subscribeToNewsletter } from "@/lib/beehiiv";
import { sendWelcomeEmail } from "@/lib/email";
import { saveSubscriptionToSupabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      email, 
      firstName,
      lastName,
      role, 
      companyFocus, 
      biggestChallenge, 
      teamSize,
      referralSource
    } = body;

    // Validation
    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Log subscription data with questions for analytics
    console.log("Subscription data received:", {
      email,
      firstName,
      lastName,
      role,
      companyFocus,
      biggestChallenge,
      teamSize,
      referralSource,
    });

    // Save subscription data to Supabase (non-blocking if not configured)
    try {
      await saveSubscriptionToSupabase({
        email,
        firstName: firstName || "",
        lastName: lastName || "",
        role,
        companyFocus,
        biggestChallenge,
        teamSize,
        referralSource,
      });
    } catch (dbError) {
      // Non-fatal - subscription continues even if database save fails
      console.error("Error saving subscription to Supabase (non-fatal):", dbError);
      if (dbError instanceof Error) {
        console.error("Database error details:", {
          message: dbError.message,
          stack: dbError.stack,
        });
      }
      // Continue - subscription still succeeds even if database fails
    }

    // Subscribe to Beehiiv newsletter
    try {
      console.log("Attempting to subscribe email to Beehiiv:", email);
      const result = await subscribeToNewsletter(email, true);
      console.log("Subscription result:", result);
    } catch (subscriptionError) {
      console.error("Error subscribing to Beehiiv newsletter:", subscriptionError);
      
      // Provide user-friendly error message
      const errorMessage = subscriptionError instanceof Error 
        ? subscriptionError.message 
        : "Failed to subscribe to newsletter";
      
      // Check if it's a duplicate subscription error (non-fatal)
      if (errorMessage.toLowerCase().includes("already subscribed") || 
          errorMessage.toLowerCase().includes("already exists") ||
          errorMessage.toLowerCase().includes("duplicate")) {
        console.info("Email already subscribed or duplicate, continuing with welcome email");
      } else {
        // Log full error for debugging
        console.error("Subscription failed with error:", {
          message: errorMessage,
          error: subscriptionError,
        });
        // For other errors, return error response
        return NextResponse.json(
          { error: errorMessage },
          { status: 500 }
        );
      }
    }

    // Send welcome email via Resend
    // This is non-blocking - subscription succeeds even if email fails
    try {
      await sendWelcomeEmail({
        to: email,
      });
    } catch (emailError) {
      // Non-fatal - subscription still succeeds even if email fails
      console.warn("Error sending welcome email (non-fatal):", emailError);
    }

    // Log successful subscription with all data for your records
    console.log("Subscription completed successfully:", {
      email,
      firstName,
      lastName,
      role,
      companyFocus,
      biggestChallenge,
      teamSize,
      referralSource,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      { message: "Subscription successful" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing subscription:", error);
    
    // Provide more detailed error information for debugging
    let errorMessage = "Failed to process subscription";
    if (error instanceof Error) {
      errorMessage = error.message;
      console.error("Error details:", {
        message: error.message,
        stack: error.stack,
      });
    }
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}


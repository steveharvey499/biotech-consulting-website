import { NextRequest, NextResponse } from "next/server";
import { subscribeToNewsletter } from "@/lib/beehiiv";
import { sendWelcomeEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

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

    // Subscribe to Beehiiv newsletter
    try {
      await subscribeToNewsletter(email, true);
    } catch (subscriptionError) {
      console.error("Error subscribing to Beehiiv newsletter:", subscriptionError);
      
      // Provide user-friendly error message
      const errorMessage = subscriptionError instanceof Error 
        ? subscriptionError.message 
        : "Failed to subscribe to newsletter";
      
      // Check if it's a duplicate subscription error (non-fatal)
      if (errorMessage.toLowerCase().includes("already subscribed") || 
          errorMessage.toLowerCase().includes("already exists")) {
        console.info("Email already subscribed, continuing with welcome email");
      } else {
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


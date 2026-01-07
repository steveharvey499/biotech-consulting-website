import { NextRequest, NextResponse } from "next/server";
import { saveContactToSheet } from "@/lib/googleSheets";
import {
  sendContactFormNotification,
} from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, company, message } = body;

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
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

    // Save contact to Google Sheet (non-blocking if not configured)
    try {
      await saveContactToSheet({
        name,
        email,
        company,
        message,
      });
    } catch (sheetError) {
      // Non-fatal - contact form submission continues even if sheet save fails
      console.warn("Error saving to Google Sheet (non-fatal):", sheetError);
    }

    // Send notification email to admin via Resend
    try {
      await sendContactFormNotification({
        name,
        email,
        company,
        message,
      });
    } catch (emailError) {
      // Non-fatal - log but don't fail the submission
      console.warn("Error sending contact form notification email (non-fatal):", emailError);
    }

    return NextResponse.json(
      { message: "Contact form submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { error: "Failed to process contact form" },
      { status: 500 }
    );
  }
}

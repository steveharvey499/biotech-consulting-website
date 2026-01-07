import { NextRequest, NextResponse } from "next/server";
import {
  createOrUpdateContact,
  addContactToList,
  updateContactProperties,
} from "@/lib/hubspot";

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

    // Create or update contact in HubSpot
    const { contactId } = await createOrUpdateContact({
      email,
    });

    // Update contact properties for subscription tracking
    await updateContactProperties(contactId, {
      subscription_source: "website",
      subscription_date: new Date().toISOString(),
    });

    // Add contact to newsletter list if list ID is configured
    const newsletterListId = process.env.HUBSPOT_NEWSLETTER_LIST_ID;
    if (newsletterListId) {
      try {
        await addContactToList(contactId, newsletterListId);
      } catch (listError) {
        // Log error but don't fail the subscription if list addition fails
        console.error("Error adding contact to newsletter list:", listError);
      }
    }

    return NextResponse.json(
      { message: "Subscription successful" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing subscription:", error);
    return NextResponse.json(
      { error: "Failed to process subscription" },
      { status: 500 }
    );
  }
}


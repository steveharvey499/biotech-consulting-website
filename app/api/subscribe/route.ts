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
    let contactId: string;
    try {
      const result = await createOrUpdateContact({
        email,
      });
      contactId = result.contactId;
    } catch (contactError) {
      console.error("Error creating/updating contact:", contactError);
      throw new Error("Failed to create contact in HubSpot");
    }

    // Add contact to newsletter list if list ID is configured
    const newsletterListId = process.env.HUBSPOT_NEWSLETTER_LIST_ID;
    if (newsletterListId) {
      try {
        await addContactToList(contactId, newsletterListId);
      } catch (listError) {
        // Log error but don't fail the subscription if list addition fails
        console.error("Error adding contact to newsletter list:", listError);
        console.warn("Contact was created but not added to list. List ID:", newsletterListId);
        // Continue - contact was created successfully
      }
    } else {
      console.warn("HUBSPOT_NEWSLETTER_LIST_ID is not configured. Contact created but not added to list.");
    }

    // Update contact properties for subscription tracking
    // This is optional - subscription will succeed even if properties don't exist
    // Only attempt if ENABLE_SUBSCRIPTION_PROPERTIES is set (skip by default until properties are created)
    const enableProperties = process.env.ENABLE_SUBSCRIPTION_PROPERTIES === "true";
    if (enableProperties) {
      try {
        const propertiesUpdated = await updateContactProperties(contactId, {
          subscription_source: "website",
          subscription_date: new Date().toISOString().split("T")[0], // Format as YYYY-MM-DD for date picker
        });
        
        if (!propertiesUpdated) {
          console.info("Subscription properties not updated (properties may not exist in HubSpot). Contact was still created successfully.");
        }
      } catch (propertyError) {
        // This should never happen, but just in case
        console.warn("Unexpected error updating properties (non-fatal):", propertyError);
        // Continue - subscription is still successful
      }
    } else {
      console.info("Subscription property tracking is disabled. Set ENABLE_SUBSCRIPTION_PROPERTIES=true to enable after creating properties in HubSpot.");
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


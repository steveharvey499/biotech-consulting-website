/**
 * Beehiiv API Integration
 * 
 * This module provides functions to interact with the Beehiiv API v2
 * for newsletter subscription management.
 */

export interface SubscribeResult {
  success: boolean;
  message?: string;
  data?: any;
}

/**
 * Subscribe an email to the Beehiiv newsletter publication
 * 
 * @param email - The email address to subscribe
 * @param reactivateExisting - Whether to reactivate if already unsubscribed (default: true)
 * @returns Promise with subscription result
 */
export async function subscribeToNewsletter(
  email: string,
  reactivateExisting: boolean = true
): Promise<SubscribeResult> {
  try {
    const apiKey = process.env.BEEHIV_API_KEY;
    const publicationId = process.env.BEEHIV_PUBLICATION_ID;

    if (!apiKey) {
      throw new Error("BEEHIV_API_KEY is not configured");
    }

    if (!publicationId) {
      throw new Error("BEEHIV_PUBLICATION_ID is not configured");
    }

    // Beehiiv API v2 endpoint for subscribing to a publication
    const apiUrl = `https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions`;

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        reactivate_existing: reactivateExisting,
      }),
    });

    const responseData = await response.json().catch(() => ({}));

    if (!response.ok) {
      // Handle API errors
      const errorMessage =
        responseData?.errors?.[0]?.message ||
        responseData?.message ||
        `Beehiiv API error: ${response.status} ${response.statusText}`;

      console.error("Beehiiv API error:", {
        status: response.status,
        statusText: response.statusText,
        error: errorMessage,
        response: responseData,
      });

      throw new Error(errorMessage);
    }

    // Success response
    return {
      success: true,
      message: "Successfully subscribed to newsletter",
      data: responseData,
    };
  } catch (error) {
    console.error("Error subscribing to Beehiiv newsletter:", error);

    // Re-throw with more context if it's already an Error
    if (error instanceof Error) {
      throw error;
    }

    throw new Error(
      `Failed to subscribe to newsletter: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}


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

    // Ensure Publication ID is in V2 format (starts with 'pub_')
    // If user pasted the V1 ID, we can detect and use it, but V2 is preferred
    const formattedPublicationId = publicationId.startsWith('pub_') 
      ? publicationId 
      : `pub_${publicationId}`;

    // Beehiiv API v2 endpoint for subscribing to a publication
    const apiUrl = `https://api.beehiiv.com/v2/publications/${formattedPublicationId}/subscriptions`;

    console.log("Beehiiv API call:", {
      url: apiUrl,
      email: email,
      originalPublicationId: publicationId,
      formattedPublicationId: formattedPublicationId,
      hasApiKey: !!apiKey,
      apiKeyLength: apiKey?.length || 0,
    });

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

    const responseData = await response.json().catch(async (err) => {
      const text = await response.text().catch(() => "Could not read response");
      console.error("Failed to parse JSON response:", text);
      return { rawResponse: text };
    });

    console.log("Beehiiv API response:", {
      status: response.status,
      statusText: response.statusText,
      ok: response.ok,
      data: responseData,
    });

    if (!response.ok) {
      // Handle API errors
      const errorMessage =
        responseData?.errors?.[0]?.message ||
        responseData?.message ||
        responseData?.error ||
        `Beehiiv API error: ${response.status} ${response.statusText}`;

      console.error("Beehiiv API error:", {
        status: response.status,
        statusText: response.statusText,
        error: errorMessage,
        fullResponse: responseData,
        url: apiUrl,
      });

      throw new Error(errorMessage);
    }

    // Success response
    console.log("Beehiiv subscription successful:", responseData);
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


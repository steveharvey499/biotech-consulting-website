import { createClient } from "@supabase/supabase-js";

/**
 * Initialize Supabase client using environment variables
 */
function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL is not configured");
  }

  if (!supabaseServiceKey) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is not configured");
  }

  // Use service role key for server-side operations
  // This bypasses RLS (Row Level Security) for admin operations
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

export interface SubscriptionData {
  email: string;
  firstName: string;
  lastName?: string;
  role?: string;
  companyFocus?: string;
  biggestChallenge?: string;
  teamSize?: string;
  referralSource?: string;
}

/**
 * Save subscription data to Supabase
 * 
 * @param data - Subscription data (email, firstName, lastName, role, etc.)
 * @returns Promise that resolves when subscription is saved
 */
export async function saveSubscriptionToSupabase(
  data: SubscriptionData
): Promise<void> {
  try {
    // If Supabase is not configured, skip silently
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    console.log("Supabase configuration check:", {
      hasUrl: !!supabaseUrl,
      hasKey: !!supabaseServiceKey,
      url: supabaseUrl ? `${supabaseUrl.substring(0, 20)}...` : "missing",
      key: supabaseServiceKey ? `${supabaseServiceKey.substring(0, 10)}...` : "missing",
    });

    if (!supabaseUrl || !supabaseServiceKey) {
      console.warn(
        "Supabase not configured. Skipping database save. Subscription will only be added to Beehiiv."
      );
      console.warn("Missing:", {
        url: !supabaseUrl ? "NEXT_PUBLIC_SUPABASE_URL" : null,
        key: !supabaseServiceKey ? "SUPABASE_SERVICE_ROLE_KEY" : null,
      });
      return;
    }

    const supabase = getSupabaseClient();

    const insertData = {
      email: data.email,
      first_name: data.firstName,
      last_name: data.lastName || null,
      role: data.role || null,
      company_focus: data.companyFocus || null,
      biggest_challenge: data.biggestChallenge || null,
      team_size: data.teamSize || null,
      referral_source: data.referralSource || null,
      created_at: new Date().toISOString(),
    };

    console.log("Attempting to insert into Supabase:", {
      table: "subscriptions",
      data: insertData,
    });

    // Insert subscription data into the subscriptions table
    const { data: insertedData, error } = await supabase
      .from("subscriptions")
      .insert(insertData)
      .select();

    if (error) {
      console.error("Supabase insert error:", {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
      });
      throw error;
    }

    console.log("Subscription saved to Supabase successfully:", insertedData);
  } catch (error) {
    // Log error but don't throw - subscription should still succeed
    // even if database save fails
    console.error("Error saving subscription to Supabase:", error);
    if (error instanceof Error) {
      console.error("Error details:", {
        message: error.message,
        stack: error.stack,
      });
    }
    console.warn(
      "Subscription will continue, but database save failed."
    );
    // Re-throw so the API route can log it properly
    throw error;
  }
}

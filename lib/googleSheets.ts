import { google } from "googleapis";

export interface ContactData {
  name: string;
  email: string;
  company?: string;
  message: string;
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
 * Initialize Google Sheets API client using service account
 */
function getSheetsClient() {
  const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!serviceAccountEmail || !privateKey) {
    throw new Error(
      "GOOGLE_SERVICE_ACCOUNT_EMAIL and GOOGLE_PRIVATE_KEY must be configured"
    );
  }

  const auth = new google.auth.JWT({
    email: serviceAccountEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  return google.sheets({ version: "v4", auth });
}

/**
 * Save contact form submission to Google Sheet
 * 
 * @param data - Contact form data (name, email, company, message)
 * @returns Promise that resolves when contact is saved
 */
export async function saveContactToSheet(
  data: ContactData
): Promise<void> {
  try {
    // If Google Sheets is not configured, skip silently
    // This allows the contact form to work with email-only option
    const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY;
    const sheetId = process.env.GOOGLE_SHEETS_ID;

    if (!serviceAccountEmail || !privateKey || !sheetId) {
      console.warn(
        "Google Sheets not configured. Skipping sheet save. Contact form will only send email notification."
      );
      return;
    }

    const sheets = getSheetsClient();
    const range = "Sheet1!A:E"; // Adjust range as needed

    // Prepare row data: [Timestamp, Name, Email, Company, Message]
    const timestamp = new Date().toISOString();
    const rowData = [
      timestamp,
      data.name,
      data.email,
      data.company || "",
      data.message,
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: range,
      valueInputOption: "RAW",
      requestBody: {
        values: [rowData],
      },
    });

    console.log("Contact saved to Google Sheet successfully");
  } catch (error) {
    // Log error but don't throw - contact form submission should still succeed
    // even if Google Sheets save fails
    console.error("Error saving contact to Google Sheet:", error);
    console.warn(
      "Contact form submission will continue, but sheet save failed."
    );
  }
}

/**
 * Save subscription data to Google Sheet
 * 
 * @param data - Subscription data (email, name, role, companyFocus, etc.)
 * @returns Promise that resolves when subscription is saved
 */
export async function saveSubscriptionToSheet(
  data: SubscriptionData
): Promise<void> {
  try {
    // If Google Sheets is not configured, skip silently
    // This allows the subscription to work with Beehiiv-only option
    const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY;
    const sheetId = process.env.GOOGLE_SHEETS_ID;

    if (!serviceAccountEmail || !privateKey || !sheetId) {
      console.warn(
        "Google Sheets not configured. Skipping sheet save. Subscription will only be added to Beehiiv."
      );
      return;
    }

    const sheets = getSheetsClient();
    // Use a different sheet/tab for subscriptions, or append to existing sheet
    // Adjust range as needed - using Sheet2 for subscriptions, or you can use the same sheet
    const range = "Subscriptions!A:I"; // Adjust range and sheet name as needed (9 columns: Timestamp, Email, First Name, Last Name, Role, Company Focus, Biggest Challenge, Team Size, Referral Source)

    // Prepare row data: [Timestamp, Email, First Name, Last Name, Role, Company Focus, Biggest Challenge, Team Size, Referral Source]
    const timestamp = new Date().toISOString();
    const rowData = [
      timestamp,
      data.email,
      data.firstName || "",
      data.lastName || "",
      data.role || "",
      data.companyFocus || "",
      data.biggestChallenge || "",
      data.teamSize || "",
      data.referralSource || "",
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: range,
      valueInputOption: "RAW",
      requestBody: {
        values: [rowData],
      },
    });

    console.log("Subscription saved to Google Sheet successfully");
  } catch (error) {
    // Log error but don't throw - subscription should still succeed
    // even if Google Sheets save fails
    console.error("Error saving subscription to Google Sheet:", error);
    console.warn(
      "Subscription will continue, but sheet save failed."
    );
  }
}

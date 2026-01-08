import { Resend } from "resend";

// Initialize Resend client
const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export interface WelcomeEmailOptions {
  to: string;
  recipientName?: string;
}

/**
 * Send a welcome email to a new newsletter subscriber
 * Uses Resend for email delivery
 */
export async function sendWelcomeEmail(
  options: WelcomeEmailOptions
): Promise<boolean> {
  try {
    if (!resend) {
      console.warn("RESEND_API_KEY is not configured. Welcome email not sent.");
      return false;
    }

    const fromEmail =
      process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
    const recipientName = options.recipientName || "there";

    const welcomeEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #1a1a1a; margin-bottom: 20px;">Welcome to The Synthesis Newsletter!</h2>
          <p>Hi ${recipientName},</p>
          <p>Thank you for subscribing. You'll now receive the latest insights and articles on leadership and company building in biotech.</p>
          <p>We're excited to share our journey with you.</p>
          <p style="margin-top: 30px;">Best regards,<br><strong>The Synthesis Team</strong></p>
        </body>
      </html>
    `;

    const welcomeEmailText = `Welcome to The Synthesis Newsletter!

Hi ${recipientName},

Thank you for subscribing. You'll now receive the latest insights and articles on leadership and company building in biotech.

We're excited to share our journey with you.

Best regards,
The Synthesis Team`;

    const result = await resend.emails.send({
      from: fromEmail,
      to: options.to,
      subject: "Welcome to The Synthesis Newsletter",
      html: welcomeEmailHtml,
      text: welcomeEmailText,
    });

    if (result.error) {
      console.error("Error sending welcome email:", result.error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error sending welcome email:", error);
    return false;
  }
}

export interface ContactFormNotificationOptions {
  name: string;
  email: string;
  company?: string;
  message: string;
}

/**
 * Send contact form submission notification to admin email
 * 
 * @param options - Contact form data
 * @returns Promise with success status
 */
export async function sendContactFormNotification(
  options: ContactFormNotificationOptions
): Promise<boolean> {
  try {
    console.log("Attempting to send contact form notification:", {
      hasResendClient: !!resend,
      resendApiKeyConfigured: !!process.env.RESEND_API_KEY,
    });

    if (!resend) {
      console.error("RESEND_API_KEY is not configured. Contact form notification not sent.");
      return false;
    }

    const fromEmail =
      process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
    const adminEmail = process.env.CONTACT_EMAIL || process.env.NOTIFICATION_EMAIL;

    console.log("Email configuration:", {
      fromEmail,
      adminEmail,
      hasContactEmail: !!process.env.CONTACT_EMAIL,
      hasNotificationEmail: !!process.env.NOTIFICATION_EMAIL,
    });

    if (!adminEmail) {
      console.error("CONTACT_EMAIL or NOTIFICATION_EMAIL not configured. Contact form notification not sent.");
      return false;
    }

    const notificationEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #1a1a1a; margin-bottom: 20px;">New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${options.name}</p>
          <p><strong>Email:</strong> <a href="mailto:${options.email}">${options.email}</a></p>
          ${options.company ? `<p><strong>Company:</strong> ${options.company}</p>` : ""}
          <p><strong>Message:</strong></p>
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin-top: 10px;">
            <p style="margin: 0; white-space: pre-wrap;">${options.message}</p>
          </div>
          <p style="margin-top: 30px; color: #666; font-size: 12px;">
            This message was sent from your website contact form.
          </p>
        </body>
      </html>
    `;

    const notificationEmailText = `New Contact Form Submission

Name: ${options.name}
Email: ${options.email}
${options.company ? `Company: ${options.company}\n` : ""}
Message:
${options.message}

---
This message was sent from your website contact form.`;

    console.log("Sending email via Resend:", {
      from: fromEmail,
      to: adminEmail,
      replyTo: options.email,
      subject: `New Contact Form Submission from ${options.name}`,
    });

    const result = await resend.emails.send({
      from: fromEmail,
      to: adminEmail,
      reply_to: options.email,
      subject: `New Contact Form Submission from ${options.name}`,
      html: notificationEmailHtml,
      text: notificationEmailText,
    });

    console.log("Resend API response:", {
      success: !result.error,
      error: result.error,
      data: result.data,
    });

    if (result.error) {
      console.error("Error sending contact form notification:", {
        error: result.error,
        message: result.error.message,
        name: result.error.name,
      });
      return false;
    }

    console.log("Contact form notification sent successfully to:", adminEmail);
    return true;
  } catch (error) {
    console.error("Error sending contact form notification:", error);
    return false;
  }
}


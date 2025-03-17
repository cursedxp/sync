import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface EmailData {
  email: string;
  token: string;
}

export async function sendVerificationEmail({ email, token }: EmailData) {
  try {
    const confirmationUrl = `${process.env.NEXTAUTH_URL}/auth/verify-email?token=${token}`;
    const response = await resend.emails.send({
      from: process.env.EMAIL_FROM || "onboarding@resend.dev",
      to: email,
      subject: "Verify your email address",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Verify your email address</title>
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .container {
                background-color: #ffffff;
                border-radius: 8px;
                padding: 32px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
              }
              .logo {
                text-align: center;
                margin-bottom: 24px;
              }
              .button {
                display: inline-block;
                background-color: #3b82f6;
                color: #ffffff;
                text-decoration: none;
                padding: 12px 24px;
                border-radius: 6px;
                margin: 24px 0;
              }
              .footer {
                margin-top: 32px;
                font-size: 14px;
                color: #666;
                text-align: center;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="logo">
                <h1>Welcome to Sync</h1>
              </div>
              <h2>Verify your email address</h2>
              <p>Thank you for registering! Please click the button below to verify your email address:</p>
              <div style="text-align: center;">
                <a href="${confirmationUrl}" class="button">Verify Email Address</a>
              </div>
              <p>Or copy and paste this URL into your browser:</p>
              <p style="word-break: break-all;">${confirmationUrl}</p>
              <p>This verification link will expire in 24 hours.</p>
              <div class="footer">
                <p>If you didn't create an account, you can safely ignore this email.</p>
                <p>&copy; ${new Date().getFullYear()} Sync. All rights reserved.</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });
    if (response.error) {
      console.error(
        "Error sending verification email:",
        response.error.message
      );
      throw new Error("Failed to send verification email");
    }
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw new Error("Failed to send verification email");
  }
}

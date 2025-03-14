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
      //TODO: Change to the actual email address
      from: "onboarding@resend.dev",
      to: email,
      subject: "Verify your email",
      html: `
        <h2>Verify your email address</h2>
        <p>Click the link below to verify your email address:</p>
        <a href="${confirmationUrl}">Verify Email</a>
        <p>If you didn't request this email, you can safely ignore it.</p>
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

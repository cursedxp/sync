import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { createVerificationToken } from "@/app/lib/emailAuth";
import { sendVerificationEmail } from "@/app/lib/email";
import { resendVerificationSchema } from "@/app/lib/validations/auth";
import rateLimitEmail from "@/app/middlewares/rateLimit";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    //Validate the request body
    const validation = resendVerificationSchema.safeParse(body);

    if (!validation.success)
      return NextResponse.json({ error: "Invalid request body", status: 400 });

    const { email } = validation.data;

    // Check rate limit
    if (!rateLimitEmail(email)) {
      return NextResponse.json({
        error: "Too many verification requests. Please try again in 24 hours.",
        status: 429,
      });
    }

    //Check if the user exists
    const user = await prisma.user.findUnique({
      where: { email },
    });

    //If the user does not exist, return a 404 error
    if (!user)
      return NextResponse.json({ error: "User not found", status: 404 });

    //Check if the user has already verified their email
    if (user.emailVerified)
      return NextResponse.json({
        error: "Email already verified",
        status: 400,
      });

    //Create a verification token
    const token = await createVerificationToken(email);

    //Send the verification email
    await sendVerificationEmail({
      email,
      token,
    });

    return NextResponse.json(
      { message: "Verification email sent", status: 200 },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending verification email:", error);
    return NextResponse.json(
      { error: "Failed to send verification email" },
      { status: 500 }
    );
  }
}

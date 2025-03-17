import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { verifyVerificationToken } from "@/app/lib/emailAuth";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json({ error: "Token is required" }, { status: 400 });
    }

    const payload = await verifyVerificationToken(token);

    if (!payload || !payload.email) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 400 }
      );
    }

    // Check if user exists and isn't already verified
    const user = await prisma.user.findUnique({
      where: { email: payload.email as string },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (user.emailVerified) {
      return NextResponse.json(
        { error: "Email already verified" },
        { status: 400 }
      );
    }

    // Update user's email verification status
    await prisma.user.update({
      where: { email: payload.email as string },
      data: { emailVerified: new Date() },
    });

    return NextResponse.json(
      { message: "Email verified successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error verifying email:", error);
    return NextResponse.json(
      { error: "Failed to verify email" },
      { status: 500 }
    );
  }
}

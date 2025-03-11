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

    if (!payload) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }

    await prisma.user.update({
      where: { email: payload.email as string },
      data: { emailVerified: new Date() },
    });

    return NextResponse.json(
      { message: "Email verified successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error verifying verification token:", error);
    return NextResponse.json(
      { error: "Failed to verify verification token" },
      { status: 500 }
    );
  }
}

import { prisma } from "./prisma";
import crypto from "crypto";

export async function createVerificationToken(email: string) {
  // Generate a random token
  const token = crypto.randomBytes(32).toString("hex");

  // Calculate expiry (24 hours from now)
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);

  // Store token in database
  await prisma.verificationToken.create({
    data: {
      token,
      identifier: email,
      expires,
    },
  });

  return token;
}

export async function verifyVerificationToken(token: string) {
  try {
    // Find and delete the token (single use)
    const verificationToken = await prisma.verificationToken.delete({
      where: {
        token,
      },
    });

    // Check if token has expired
    if (new Date() > verificationToken.expires) {
      return null;
    }

    return {
      email: verificationToken.identifier,
    };
  } catch {
    return null;
  }
}

// Optional: Clean up expired tokens
export async function cleanupExpiredTokens() {
  try {
    await prisma.verificationToken.deleteMany({
      where: {
        expires: {
          lt: new Date(),
        },
      },
    });
  } catch (error) {
    console.error("Error cleaning up expired tokens:", error);
  }
}

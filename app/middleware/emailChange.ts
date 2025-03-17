import { prisma } from "@/app/lib/prisma";

export async function handleEmailChange(userId: string, newEmail: string) {
  try {
    // Update user's email and reset verification status
    await prisma.user.update({
      where: { id: userId },
      data: {
        email: newEmail,
        emailVerified: null, // Reset verification status
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Error handling email change:", error);
    return { success: false, error: "Failed to update email" };
  }
}

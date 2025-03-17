import { NextResponse } from "next/server";
import { cleanupExpiredTokens } from "@/app/lib/emailAuth";

// This route should be called by a CRON job
export async function GET(request: Request) {
  try {
    // Verify that the request is coming from a legitimate source
    // You might want to add authentication here
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await cleanupExpiredTokens();

    return NextResponse.json({ message: "Cleanup completed" }, { status: 200 });
  } catch (error) {
    console.error("Error in token cleanup:", error);
    return NextResponse.json(
      { error: "Failed to cleanup tokens" },
      { status: 500 }
    );
  }
}

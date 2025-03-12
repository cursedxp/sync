import { NextResponse } from "next/server";
import { loginSchema } from "@/app/lib/validations/auth";
import bcrypt from "bcrypt";
import { prisma } from "@/app/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = loginSchema.safeParse(body);

    //1-Validate request body
    if (!validatedData.success) {
      return NextResponse.json(
        {
          error: "Validation error",
          issues: validatedData.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    //2-Check if user exists
    const user = await prisma.user.findUnique({
      where: { email: validatedData.data.email },
    });
    if (!user || !user.password) {
      return NextResponse.json({ error: "User not found" }, { status: 401 });
    }

    //3-Check if password is correct
    const passwordMatch = await bcrypt.compare(
      validatedData.data.password,
      user.password
    );
    if (!passwordMatch) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    //Remove password from response
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;

    return NextResponse.json({ user: userWithoutPassword }, { status: 200 });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

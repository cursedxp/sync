import { SignJWT, jwtVerify } from "jose";

const secretKey = new TextEncoder().encode(process.env.NEXTAUTH_SECRET);

export async function createVerificationToken(email: string) {
  const token = await new SignJWT({ email })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("24h")
    .setIssuedAt()
    .sign(secretKey);

  return token;
}

export async function verifyVerificationToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secretKey);
    return payload;
  } catch (error) {
    console.error("Error verifying verification token:", error);
    return null;
  }
}

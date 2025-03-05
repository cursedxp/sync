import { DefaultSession, DefaultUser } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      isProfileCompleted: boolean
    } & DefaultSession["user"]
  }

  interface User extends DefaultUser {
    isProfileCompleted: boolean
  }
}
import NextAuth, { AuthOptions } from "next-auth";
import type { Adapter } from "next-auth/adapters";
import {PrismaAdapter} from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import {prisma} from "@/app/lib/prisma";
import bcrypt from "bcryptjs";

//Auth options
const authOptions: AuthOptions = {
    //1-Adapter
    adapter: PrismaAdapter(prisma) as Adapter,
    //2-Session
    session: {
        strategy:"jwt"
    },
    //3-Pages
    pages: {
        signIn:"/login" //add address of login page
    },
    //4-Providers
    providers: [
        CredentialsProvider({
            //1-Name of the provider
            name: "credentials",
            //2-Get credentials from request
            credentials: {
                email: {label: "Email", type: "email"},
                password: {label: "Password", type: "password"}
            },
            //1-Check if user exists and password is correct
            async authorize(credentials){
                if(!credentials?.email || !credentials?.password){
                    throw new Error("Invalid credentials");
                }
                const user = await prisma.user.findUnique({
                    where: {email: credentials.email}
                })
                if(!user || !user.password){
                    throw new Error("User not found");
                }
                const passwordsMatch = await bcrypt.compare(credentials.password, user.password)
                if(!passwordsMatch){
                    throw new Error("Invalid password");
                }
                return {
                    id: user.id,
                    email: user.email,
                    isProfileCompleted: user.isProfileCompleted
                };
            }
        })
    ],
    //3-JWT callback
    callbacks: {
        async jwt({token,user}){
            if(user){
                token.id = user.id;
                token.isProfileCompleted = user.isProfileCompleted;
            }
            return token;
        },
        async session({session,token}){
            if(session.user){
                session.user.id = token.id as string;
                session.user.isProfileCompleted = token.isProfileCompleted as boolean;
            }
            return session;
        }
    }
}

const authHandler = NextAuth(authOptions);

export {authHandler as GET, authHandler as POST}
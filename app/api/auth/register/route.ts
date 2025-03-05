import { NextResponse } from "next/server";
import { initialRegisterSchema } from "@/app/lib/validations/auth";
import { prisma } from "@/app/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        
    //1-Validate request body
    const validatedData = initialRegisterSchema.safeParse(body);

    if(!validatedData.success) {
        return NextResponse.json({error:"Validation error",
            issues: validatedData.error.flatten().fieldErrors,
        }, {status:400})
    }

    //2-Check if user already exists
    const existingUser = await prisma.user.findUnique({
        where: {
            email: validatedData.data.email
        }
    });

    if(existingUser) {
        return NextResponse.json({error:"User already exists"}, {status:400})
    }

    //3-Hash password
    const hashedPassword = await bcrypt.hash(validatedData.data.password, 10)

    //4-Create user
    const user = await prisma.user.create({data:{
        email: validatedData.data.email,
        password: hashedPassword,
        countryOfBusiness: validatedData.data.countryOfBusiness,
        acceptTerms: validatedData.data.acceptTerms,
        newsletterSubscription: validatedData.data.newsletterSubscription,
        isProfileCompleted: false,
    }})

    //5-Clean up response
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {password, ...userWithoutPassword} = user;

    return NextResponse.json(
        {
            message: "Registration successful",
            user: userWithoutPassword
        },
        { status: 201 }
    );
} catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
    );
}
    
}
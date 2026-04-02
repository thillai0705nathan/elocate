import { NextResponse } from "next/server";
import { prisma } from "../../../utils/prisma";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { fullName, email, password } = body;

        if (!email || !password || !fullName) {
            return NextResponse.json({ message: "Full name, email, and password are required" }, { status: 400 });
        }

        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json({ message: "User already exists" }, { status: 409 });
        }

        const user = await prisma.user.create({
            data: {
                name: fullName,
                email,
                password,
            },
        });

        return NextResponse.json({
            id: user.id,
            email: user.email,
            fullname: user.name,
            username: user.name || user.email.split("@")[0],
            token: "mock-jwt-token"
        });
    } catch (error: any) {
        console.error("Register error:", error);
        
        // Log environment status for debugging
        console.log("Database connection status check...");
        try {
            await prisma.$connect();
            console.log("Database connected successfully.");
        } catch (dbError) {
            console.error("Database connection check failed:", dbError);
        }

        return NextResponse.json({ 
            message: "Internal server error",
            error: process.env.NODE_ENV === "development" ? error.message : undefined 
        }, { status: 500 });
    }
}

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
    } catch (error) {
        console.error("Register error:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}

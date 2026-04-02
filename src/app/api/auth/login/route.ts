import { NextResponse } from "next/server";
import { prisma } from "../../../utils/prisma";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json({ message: "Email and password are required" }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user || user.password !== password) {
            return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
        }

        return NextResponse.json({
            id: user.id,
            email: user.email,
            fullname: user.name,
            username: user.name || user.email.split("@")[0],
            token: "mock-jwt-token"
        });
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}

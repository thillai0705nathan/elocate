import { NextResponse } from "next/server";
import { prisma } from "../../utils/prisma";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, phone, message } = body;

        const contactMessage = await prisma.contactMessage.create({
            data: {
                name,
                email,
                phone,
                message,
            },
        });

        return NextResponse.json(contactMessage, { status: 201 });
    } catch (error) {
        console.error("Error saving contact message:", error);
        return NextResponse.json({ error: "Failed to save message" }, { status: 500 });
    }
}

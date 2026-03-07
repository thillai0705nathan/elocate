import { NextResponse } from "next/server";
import { prisma } from "../../utils/prisma";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { userId, address, date, time, items, price, facilityName } = body;

        const pickupRequest = await prisma.pickUpRequest.create({
            data: {
                userId,
                address,
                date: new Date(date),
                time,
                items,
                price: parseFloat(price),
                facilityName,
            },
        });

        return NextResponse.json(pickupRequest, { status: 201 });
    } catch (error) {
        console.error("Error creating pickup request:", error);
        return NextResponse.json({ error: "Failed to create pickup request" }, { status: 500 });
    }
}

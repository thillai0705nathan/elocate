import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function test() {
    try {
        const count = await prisma.user.count();
        console.log("User count:", count);
    } catch (e) {
        console.error("Prisma error:", e);
    } finally {
        await prisma.$disconnect();
    }
}
test();

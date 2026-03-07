import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const facilities = [
        { name: "Chennai E-Waste Center", lat: 13.0827, lon: 80.2707, address: "Chennai, Tamil Nadu", verified: true, contact: "9876543210", time: "9 AM - 6 PM" },
        { name: "Tambaram Recycler", lat: 12.9249, lon: 80.1000, address: "Tambaram", verified: false, contact: "9123456780", time: "10 AM - 5 PM" },
        { name: "Velachery Green Recycle", lat: 12.9791, lon: 80.2212, address: "Velachery, Chennai", verified: true, contact: "9000000001", time: "9 AM - 7 PM" },
        { name: "OMR E-Waste Hub", lat: 12.9120, lon: 80.2279, address: "OMR, Chennai", verified: true, contact: "9000000002", time: "8 AM - 6 PM" },
        { name: "Anna Nagar Eco Center", lat: 13.0850, lon: 80.2101, address: "Anna Nagar", verified: false, contact: "9000000003", time: "10 AM - 6 PM" },
        { name: "Adyar Smart Recycling", lat: 13.0012, lon: 80.2565, address: "Adyar", verified: true, contact: "9000000004", time: "9 AM - 5 PM" },
        { name: "Porur Waste Tech", lat: 13.0352, lon: 80.1586, address: "Porur", verified: false, contact: "9000000005", time: "9 AM - 6 PM" },
        { name: "Ambattur Industrial Recyclers", lat: 13.1143, lon: 80.1548, address: "Ambattur", verified: true, contact: "9000000006", time: "8 AM - 8 PM" },
        { name: "Avadi E-Scrap Yard", lat: 13.1067, lon: 80.1097, address: "Avadi", verified: false, contact: "9000000007", time: "10 AM - 4 PM" },
        { name: "Chromepet Green Center", lat: 12.9516, lon: 80.1462, address: "Chromepet", verified: true, contact: "9000000008", time: "9 AM - 6 PM" },
        { name: "Coimbatore E-Waste Plant", lat: 11.0168, lon: 76.9558, address: "Coimbatore", verified: true, contact: "9000000009", time: "9 AM - 7 PM" },
        { name: "Madurai Smart Recycle", lat: 9.9252, lon: 78.1198, address: "Madurai", verified: true, contact: "9000000010", time: "9 AM - 6 PM" },
        { name: "Trichy Eco Recovery", lat: 10.7905, lon: 78.7047, address: "Trichy", verified: false, contact: "9000000011", time: "10 AM - 5 PM" },
        { name: "Salem Waste Solutions", lat: 11.6643, lon: 78.1460, address: "Salem", verified: true, contact: "9000000012", time: "9 AM - 6 PM" },
        { name: "Tirunelveli E-Cycle", lat: 8.7139, lon: 77.7567, address: "Tirunelveli", verified: false, contact: "9000000013", time: "9 AM - 5 PM" },
        { name: "Vellore Green Tech", lat: 12.9165, lon: 79.1325, address: "Vellore", verified: true, contact: "9000000014", time: "8 AM - 6 PM" },
        { name: "Erode Scrap Recovery", lat: 11.3410, lon: 77.7172, address: "Erode", verified: false, contact: "9000000015", time: "10 AM - 5 PM" },
        { name: "Thoothukudi Recyclers", lat: 8.7642, lon: 78.1348, address: "Thoothukudi", verified: true, contact: "9000000016", time: "9 AM - 6 PM" },
        { name: "Pondicherry E-Waste Drop", lat: 11.9416, lon: 79.8083, address: "Puducherry", verified: true, contact: "9000000017", time: "9 AM - 7 PM" },
        { name: "Bangalore E-Recovery", lat: 12.9716, lon: 77.5946, address: "Bangalore", verified: true, contact: "9000000018", time: "9 AM - 8 PM" }
    ];

    for (const facility of facilities) {
        await prisma.facility.create({
            data: facility,
        });
    }

    console.log("Database seeded successfully!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

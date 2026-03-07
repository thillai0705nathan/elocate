import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const generateEWasteReport = (data: {
    itemName: string;
    confidence: number;
    category: string;
    hazardLevel: string;
    recyclingDifficulty: string;
    materials: { name: string; percentage: number }[];
    impact: string;
    imageData?: string; // Add support for embedding the scan image
}) => {
    const doc = new jsPDF();
    const timestamp = new Date().toLocaleString();

    // Header
    doc.setFillColor(16, 185, 129); // Emerald-500
    doc.rect(0, 0, 210, 40, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.text("ELocate AI Report", 20, 25);
    doc.setFontSize(10);
    doc.text(`Generated on: ${timestamp}`, 140, 25);

    let currentY = 55;

    // Embed Image if available
    if (data.imageData) {
        try {
            doc.addImage(data.imageData, 'JPEG', 20, currentY, 50, 40);
            doc.setTextColor(31, 41, 55);
            doc.setFontSize(18);
            doc.text("Detection Summary", 80, currentY + 10);
            doc.setFontSize(12);
            doc.text(`Item Detected: ${data.itemName}`, 80, currentY + 20);
            doc.text(`AI Confidence: ${data.confidence.toFixed(2)}%`, 80, currentY + 27);
            doc.text(`Category: ${data.category}`, 80, currentY + 34);
            currentY += 50;
        } catch (e) {
            console.error("PDF Image Error:", e);
            // Fallback if image fails
            doc.setTextColor(31, 41, 55);
            doc.setFontSize(18);
            doc.text("Detection Summary", 20, currentY);
            doc.setFontSize(12);
            doc.text(`Item Detected: ${data.itemName}`, 20, currentY + 10);
            doc.text(`AI Confidence: ${data.confidence.toFixed(2)}%`, 20, currentY + 17);
            doc.text(`Category: ${data.category}`, 20, currentY + 24);
            currentY += 40;
        }
    } else {
        doc.setTextColor(31, 41, 55);
        doc.setFontSize(18);
        doc.text("Detection Summary", 20, currentY);
        doc.setFontSize(12);
        doc.text(`Item Detected: ${data.itemName}`, 20, currentY + 10);
        doc.text(`AI Confidence: ${data.confidence.toFixed(2)}%`, 20, currentY + 17);
        doc.text(`Category: ${data.category}`, 20, currentY + 24);
        currentY += 40;
    }

    // Material Breakdown Table
    doc.setFontSize(16);
    doc.text("Material Composition", 20, currentY);

    const materialTable = data.materials.map(m => [m.name, `${m.percentage}%`]);
    autoTable(doc, {
        startY: currentY + 5,
        head: [["Material", "Composition"]],
        body: materialTable,
        theme: "striped",
        headStyles: { fillColor: [16, 185, 129] }
    });

    // Environmental Impact
    const finalY = (doc as any).lastAutoTable.finalY + 20;
    doc.setFontSize(16);
    doc.text("Expert Environmental Insights", 20, finalY);

    doc.setFontSize(11);
    doc.setTextColor(75, 85, 99);
    const splitImpact = doc.splitTextToSize(data.impact, 170);
    doc.text(splitImpact, 20, finalY + 10);

    // Footer / Disposal
    doc.setDrawColor(209, 213, 219);
    doc.line(20, finalY + 40, 190, finalY + 40);
    doc.setFontSize(12);
    doc.setTextColor(16, 185, 129);
    doc.text("Hazard Level: " + data.hazardLevel, 20, finalY + 50);
    doc.text("Recycling Difficulty: " + data.recyclingDifficulty, 120, finalY + 50);

    doc.save(`ELocate_Report_${data.itemName.replace(/\s+/g, "_")}.pdf`);
};

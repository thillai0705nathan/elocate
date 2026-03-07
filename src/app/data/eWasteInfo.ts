export interface MaterialComposition {
    name: string;
    percentage: number;
    color: string;
}

export interface EWasteDetails {
    category: "Device" | "Component" | "Accessory";
    description: string;
    materials: MaterialComposition[];
    hazardLevel: "Low" | "Medium" | "High";
    recyclingDifficulty: "Easy" | "Moderate" | "Difficult";
    disposalMethod: string;
}

export const EWASTE_MAPPING: Record<string, EWasteDetails> = {
    "Mobile Phone": {
        category: "Device",
        description: "Handheld telecommunication device containing valuable metals and hazardous components.",
        materials: [
            { name: "Plastic", percentage: 40, color: "#4ade80" },
            { name: "Copper", percentage: 15, color: "#fb923c" },
            { name: "Aluminum", percentage: 10, color: "#94a3b8" },
            { name: "Glass", percentage: 15, color: "#38bdf8" },
            { name: "Gold/Silver", percentage: 1, color: "#facc15" },
            { name: "Hazardous (Lead/Mercury)", percentage: 19, color: "#f87171" },
        ],
        hazardLevel: "High",
        recyclingDifficulty: "Moderate",
        disposalMethod: "Requires professional dismantling to recover precious metals and safe battery disposal.",
    },
    "Laptop": {
        category: "Device",
        description: "Portable personal computer with complex circuitry and lithium-ion batteries.",
        materials: [
            { name: "Plastic", percentage: 30, color: "#4ade80" },
            { name: "Aluminum", percentage: 25, color: "#94a3b8" },
            { name: "Copper", percentage: 10, color: "#fb923c" },
            { name: "Glass", percentage: 10, color: "#38bdf8" },
            { name: "Gold/Silver", percentage: 2, color: "#facc15" },
            { name: "Hazardous", percentage: 23, color: "#f87171" },
        ],
        hazardLevel: "High",
        recyclingDifficulty: "Difficult",
        disposalMethod: "Remove battery separately. Motherboard contains significant gold and should be processed by e-waste specialists.",
    },
    "Battery": {
        category: "Component",
        description: "Energy storage unit, highly hazardous if punctured or disposed of incorrectly.",
        materials: [
            { name: "Lithium/Cobalt", percentage: 30, color: "#c084fc" },
            { name: "Plastic", percentage: 20, color: "#4ade80" },
            { name: "Steel", percentage: 25, color: "#64748b" },
            { name: "Chemicals/Hazardous", percentage: 25, color: "#f87171" },
        ],
        hazardLevel: "High",
        recyclingDifficulty: "Difficult",
        disposalMethod: "Never throw in regular trash. Take to a dedicated battery recycling point to prevent fires and chemical leaks.",
    },
    "PCB (Circuit Board)": {
        category: "Component",
        description: "The heart of electronic devices, rich in precious metals but contains toxic flame retardants.",
        materials: [
            { name: "Fiberglass", percentage: 50, color: "#94a3b8" },
            { name: "Copper", percentage: 20, color: "#fb923c" },
            { name: "Gold/Silver/Palladium", percentage: 5, color: "#facc15" },
            { name: "Hazardous Resins", percentage: 25, color: "#f87171" },
        ],
        hazardLevel: "Medium",
        recyclingDifficulty: "Difficult",
        disposalMethod: "Smelting and chemical refining required to recover gold. High toxicity if burned.",
    },
    "Charger/Cable": {
        category: "Accessory",
        description: "Power adapters and USB cables primarily made of copper and protective plastic.",
        materials: [
            { name: "Plastic/PVC", percentage: 60, color: "#4ade80" },
            { name: "Copper", percentage: 35, color: "#fb923c" },
            { name: "Steel/Brass", percentage: 5, color: "#64748b" },
        ],
        hazardLevel: "Low",
        recyclingDifficulty: "Easy",
        disposalMethod: "Excellent for copper recovery. Can be processed by most standard e-waste recyclers.",
    },
    "E-Waste": { // Fallback for general detection
        category: "Device",
        description: "Generic electronic waste item.",
        materials: [
            { name: "Plastic", percentage: 50, color: "#4ade80" },
            { name: "Metals", percentage: 30, color: "#fb923c" },
            { name: "Hazardous", percentage: 20, color: "#f87171" },
        ],
        hazardLevel: "Medium",
        recyclingDifficulty: "Moderate",
        disposalMethod: "Identify the specific device type for better disposal instructions.",
    },
    "CPU": {
        category: "Device",
        description: "Central Processing Unit/Computer Tower containing high-value electronics and heavy metals.",
        materials: [
            { name: "Steel", percentage: 50, color: "#64748b" },
            { name: "Copper", percentage: 15, color: "#fb923c" },
            { name: "Gold/Palladium", percentage: 2, color: "#facc15" },
            { name: "Aluminium", percentage: 20, color: "#94a3b8" },
            { name: "Hazardous", percentage: 13, color: "#f87171" },
        ],
        hazardLevel: "High",
        recyclingDifficulty: "Difficult",
        disposalMethod: "Requires shredding and magnetic separation to recover iron and precious metals.",
    },
    "Monitor": {
        category: "Device",
        description: "Visual display units containing toxic phosphorus and lead glass.",
        materials: [
            { name: "Glass", percentage: 40, color: "#38bdf8" },
            { name: "Plastic", percentage: 35, color: "#4ade80" },
            { name: "PCB", percentage: 15, color: "#10b981" },
            { name: "Lead", percentage: 10, color: "#94a3b8" },
        ],
        hazardLevel: "High",
        recyclingDifficulty: "Moderate",
        disposalMethod: "Must be handled carefully to prevent glass breakage and mercury release.",
    },
    "Remote": {
        category: "Accessory",
        description: "Small control device primarily plastic and circuitry.",
        materials: [
            { name: "Plastic", percentage: 80, color: "#4ade80" },
            { name: "Silicone", percentage: 10, color: "#94a3b8" },
            { name: "PCB", percentage: 10, color: "#10b981" },
        ],
        hazardLevel: "Low",
        recyclingDifficulty: "Easy",
        disposalMethod: "Remove batteries first. Plastic casing can be easily recycled.",
    },
    "Hard Disk": {
        category: "Component",
        description: "Data storage unit with high-grade aluminum and powerful magnets.",
        materials: [
            { name: "Aluminum", percentage: 70, color: "#94a3b8" },
            { name: "Steel", percentage: 15, color: "#64748b" },
            { name: "Neodymium", percentage: 5, color: "#c084fc" },
            { name: "PCB", percentage: 10, color: "#10b981" },
        ],
        hazardLevel: "Medium",
        recyclingDifficulty: "Moderate",
        disposalMethod: "Mechanical destruction required for data privacy before metal recovery.",
    },
    "RAM": {
        category: "Component",
        description: "Memory module rich in gold plating and high-speed silicon.",
        materials: [
            { name: "Gold", percentage: 3, color: "#facc15" },
            { name: "Silicon", percentage: 60, color: "#94a3b8" },
            { name: "Fiberglass", percentage: 30, color: "#4ade80" },
            { name: "Resin", percentage: 7, color: "#f87171" },
        ],
        hazardLevel: "Low",
        recyclingDifficulty: "Difficult",
        disposalMethod: "Chemical stripping used to recover ultra-thin gold layers.",
    },
    "ROM": {
        category: "Component",
        description: "Read-only memory integrated circuits.",
        materials: [
            { name: "Silicon", percentage: 70, color: "#94a3b8" },
            { name: "Plastic", percentage: 20, color: "#4ade80" },
            { name: "Gold/Copper", percentage: 10, color: "#facc15" },
        ],
        hazardLevel: "Low",
        recyclingDifficulty: "Difficult",
        disposalMethod: "Complex integrated circuit recycling path.",
    },
    "Printer": {
        category: "Device",
        description: "Peripheral device containing motors, ink/toner residue, and heavy plastics.",
        materials: [
            { name: "Plastic", percentage: 60, color: "#4ade80" },
            { name: "Steel", percentage: 20, color: "#64748b" },
            { name: "Transformer/Copper", percentage: 10, color: "#fb923c" },
            { name: "Toner (Toxic)", percentage: 10, color: "#111827" },
        ],
        hazardLevel: "Medium",
        recyclingDifficulty: "Moderate",
        disposalMethod: "Remove ink/toner cartridges before recycling the mechanical body.",
    },
    "Jumping Wires": {
        category: "Accessory",
        description: "Prototype wires with high-quality copper and colorful PVC insulation.",
        materials: [
            { name: "Copper", percentage: 40, color: "#fb923c" },
            { name: "PVC Plastic", percentage: 60, color: "#4ade80" },
        ],
        hazardLevel: "Low",
        recyclingDifficulty: "Easy",
        disposalMethod: "Stripped for pure copper recovery.",
    },
    "Tablet": {
        category: "Device",
        description: "Portable touchscreen device with integrated high-density lithium batteries.",
        materials: [
            { name: "Glass/Touch", percentage: 40, color: "#38bdf8" },
            { name: "Aluminum", percentage: 20, color: "#94a3b8" },
            { name: "Lithium", percentage: 15, color: "#c084fc" },
            { name: "PCB", percentage: 25, color: "#10b981" },
        ],
        hazardLevel: "High",
        recyclingDifficulty: "Difficult",
        disposalMethod: "Specialized heat-separation required to remove glued-in batteries safely.",
    },
    "Smart Watch": {
        category: "Device",
        description: "Wearable technology with miniaturized electronics.",
        materials: [
            { name: "Stainless Steel/Ti", percentage: 30, color: "#94a3b8" },
            { name: "Glass", percentage: 20, color: "#38bdf8" },
            { name: "PCB", percentage: 30, color: "#10b981" },
            { name: "Battery", percentage: 20, color: "#f87171" },
        ],
        hazardLevel: "Medium",
        recyclingDifficulty: "Difficult",
        disposalMethod: "Micro-disassembly required for precious metal recovery.",
    },
    "Camera": {
        category: "Device",
        description: "Optical electronic device with high-grade lenses and sensors.",
        materials: [
            { name: "Plastic", percentage: 40, color: "#4ade80" },
            { name: "Glass Lenses", percentage: 25, color: "#38bdf8" },
            { name: "PCB/Sensor", percentage: 25, color: "#10b981" },
            { name: "Metals", percentage: 10, color: "#fb923c" },
        ],
        hazardLevel: "Medium",
        recyclingDifficulty: "Moderate",
        disposalMethod: "Separation of optics from electronics for material high-yield.",
    },
    "Pen Drive": {
        category: "Accessory",
        description: "Flash storage device with high-density NAND memory.",
        materials: [
            { name: "Plastic/Metal Shell", percentage: 70, color: "#4ade80" },
            { name: "Flash Memory PCB", percentage: 30, color: "#10b981" },
        ],
        hazardLevel: "Low",
        recyclingDifficulty: "Easy",
        disposalMethod: "Small size makes them easy to process in bulk for metal recovery.",
    },
    "Hair Dryer": {
        category: "Device",
        description: "Heating appliance with high-power motors and nichrome wire.",
        materials: [
            { name: "Plastic", percentage: 70, color: "#4ade80" },
            { name: "Copper Motor", percentage: 20, color: "#fb923c" },
            { name: "Nichrome/Steel", percentage: 10, color: "#64748b" },
        ],
        hazardLevel: "Low",
        recyclingDifficulty: "Easy",
        disposalMethod: "Motorized parts are excellent for copper recycling.",
    },
    "Torch Light": {
        category: "Device",
        description: "Portable lighting with batteries and LED electronics.",
        materials: [
            { name: "Plastic/Aluminum", percentage: 60, color: "#4ade80" },
            { name: "Battery", percentage: 30, color: "#f87171" },
            { name: "LED PCB", percentage: 10, color: "#10b981" },
        ],
        hazardLevel: "Medium",
        recyclingDifficulty: "Moderate",
        disposalMethod: "Remove batteries; the body is recyclable as standard plastic/aluminum.",
    },
    "Remote Car": {
        category: "Device",
        description: "Electronic toy containing motors, batteries, and radio controllers.",
        materials: [
            { name: "Plastic", percentage: 75, color: "#4ade80" },
            { name: "Motors/Copper", percentage: 10, color: "#fb923c" },
            { name: "Batteries", percentage: 10, color: "#f87171" },
            { name: "PCB", percentage: 5, color: "#10b981" },
        ],
        hazardLevel: "Medium",
        recyclingDifficulty: "Moderate",
        disposalMethod: "Remove battery packs; motors are high value for metal scrap.",
    },
};

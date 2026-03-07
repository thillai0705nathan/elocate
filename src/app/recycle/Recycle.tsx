"use client";

import React, { useEffect } from "react";
import { FiSmartphone, FiHeadphones, FiTv } from "react-icons/fi";
import { GiWashingMachine } from "react-icons/gi";
import { RiFridgeFill } from "react-icons/ri";
import { FaLaptop } from "react-icons/fa";
import { MdOutlineDevicesOther } from "react-icons/md";
import Link from "next/link";

interface RecycleCardProps {
  itemName: string;
  description: string;
  recyclingProcess: string;
  specialInstructions: string;
  icon: React.ReactNode;
  benefits: string;
}

const Recycle: React.FC = () => {
  useEffect(() => {
    document.title = "ELocate - Electronics Recycling Solutions";
  }, []);

  const recycleItems: RecycleCardProps[] = [
    {
      itemName: "Smartphone",
      description: "Responsibly recycle your outdated or non-functional smartphones and recover valuable materials while protecting the environment.",
      recyclingProcess:
        "Our certified process includes data wiping, component dismantling, precious metal recovery, and safe disposal of hazardous materials.",
      specialInstructions:
        "Back up and factory reset your device to remove personal data. Remove SIM cards and memory cards before recycling.",
      benefits: "Recycling one smartphone can recover enough precious metals to prevent mining 80 kg of earth.",
      icon: <FiSmartphone size={48} className="text-emerald-500" />,
    },
    {
      itemName: "Laptop",
      description: "Give your old laptops and computers a sustainable afterlife through our specialized electronics recycling program.",
      recyclingProcess:
        "We implement secure data destruction, component disassembly, circuit board processing, and proper management of LCD screens and batteries.",
      specialInstructions: "Back up important files, perform a secure wipe of all storage drives, and remove any external batteries before recycling.",
      benefits: "Recycling laptops can recover 95% of materials including valuable metals like gold, silver, and rare earth elements.",
      icon: <FaLaptop size={48} className="text-emerald-500" />,
    },
    {
      itemName: "Accessories",
      description: "Properly dispose of cables, chargers, headphones, keyboards, and other electronic accessories that accumulate over time.",
      recyclingProcess:
        "We meticulously sort accessories by material type, separate metal components, process plastic elements, and safely handle any hazardous materials.",
      specialInstructions: "Bundle similar accessories together for easier processing and ensure batteries are removed from wireless devices.",
      benefits: "Recycling accessories prevents toxic materials from entering landfills and reduces the need for virgin resource extraction.",
      icon: <FiHeadphones size={48} className="text-emerald-500" />,
    },
    {
      itemName: "Television",
      description: "Ensure your old TVs, monitors, and display devices are recycled in an environmentally responsible manner.",
      recyclingProcess:
        "Our specialized process includes screen separation, hazardous material containment, circuit board recovery, and plastic/metal segregation for optimal recycling.",
      specialInstructions:
        "Transport with screen facing down to prevent shattering. Include all cables, stands, and remote controls when possible.",
      benefits: "Proper TV recycling prevents lead, mercury, and flame retardants from contaminating soil and water resources.",
      icon: <FiTv size={48} className="text-emerald-500" />,
    },
    {
      itemName: "Refrigerator",
      description: "Dispose of refrigerators and freezers through our specialized large appliance recycling program that safely handles refrigerants.",
      recyclingProcess:
        "We carefully extract and properly dispose of refrigerants, recover insulation materials, separate and process metal components, and manage hazardous elements.",
      specialInstructions:
        "Clean and defrost the unit completely before recycling. Remove all food, shelving, and loose components.",
      benefits: "Proper refrigerator recycling prevents potent greenhouse gases from entering the atmosphere and recovers valuable metals and plastics.",
      icon: <RiFridgeFill size={48} className="text-emerald-500" />,
    },
    {
      itemName: "Other",
      description: "Recycle any electronic device not covered by other categories through our comprehensive e-waste management program.",
      recyclingProcess:
        "Every device undergoes proper assessment, disassembly, component sorting, material recovery, and environmentally sound disposal of non-recyclable parts.",
      specialInstructions: "If possible, include original packaging, manuals, and accessories for the most complete recycling process.",
      benefits: "Ensures that even unusual or uncommon electronic devices are properly handled and don't end up in landfills.",
      icon: <MdOutlineDevicesOther size={48} className="text-emerald-500" />,
    },
  ];

  return (
    <div className="section container mx-auto px-4 recycle-container pb-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl text-emerald-700 font-bold mb-4">
          Sustainable Electronics Recycling Solutions
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Choose the right recycling option for your electronic devices and contribute to a circular economy that preserves resources and protects our environment.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {recycleItems.map((item, index) => (
          <RecycleCard key={index} {...item} />
        ))}
      </div>

      <div className="mt-20 bg-emerald-50 rounded-[2.5rem] p-12 shadow-inner border border-emerald-100">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-black text-emerald-900 tracking-tight">Why Choose ELocate?</h3>
          <p className="text-emerald-600 font-bold mt-2 uppercase tracking-widest text-xs">The gold standard in e-waste recovery</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { title: "Certified Process", desc: "Eco-standards compliance", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
            { title: "Data Security", desc: "Military-grade wipe", icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" },
            { title: "Recovery", desc: "99.9% material yield", icon: "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" },
            { title: "Swift Flow", desc: "Scan and recover", icon: "M13 10V3L4 14h7v7l9-11h-7z" }
          ].map((feature, i) => (
            <div key={i} className="bg-white p-6 rounded-[2rem] shadow-sm text-center transform hover:-translate-y-2 transition-all duration-300">
              <div className="bg-emerald-100 w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-6 text-emerald-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                </svg>
              </div>
              <h4 className="text-lg font-black text-slate-800 mb-1">{feature.title}</h4>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-tight">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const RecycleCard: React.FC<RecycleCardProps> = ({
  itemName,
  description,
  recyclingProcess,
  specialInstructions,
  benefits,
  icon,
}) => {
  return (
    <div className="bg-white shadow-2xl rounded-[2.5rem] overflow-hidden hover:shadow-[0_20px_50px_rgba(16,185,129,0.15)] transition-all duration-500 flex flex-col h-full border border-slate-100 group">
      <div className="bg-slate-50 p-10 flex justify-center items-center group-hover:bg-emerald-50 transition-colors duration-500">
        <div className="bg-white rounded-[2rem] p-6 shadow-xl transform group-hover:rotate-12 transition-transform duration-500">{icon}</div>
      </div>

      <div className="p-8 flex flex-col flex-grow">
        <h3 className="text-3xl font-black mb-4 text-slate-800 tracking-tight">{itemName}</h3>
        <p className="text-slate-500 font-medium leading-relaxed mb-8">{description}</p>

        <div className="space-y-8 flex-grow mb-10">
          <div className="relative pl-6 before:absolute before:left-0 before:top-1 before:w-1 before:h-4 before:bg-emerald-500 before:rounded-full">
            <h4 className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em] mb-2">Neural Recovery Path</h4>
            <p className="text-slate-600 text-sm leading-relaxed">{recyclingProcess}</p>
          </div>

          <div className="p-6 bg-amber-50 rounded-[1.5rem] border border-amber-100/50">
            <h4 className="text-[10px] font-black text-amber-700 uppercase tracking-[0.2em] mb-2">Critical Prep</h4>
            <p className="text-slate-600 text-xs italic leading-loose font-medium">{specialInstructions}</p>
          </div>
        </div>

        <Link
          href={`/recycle/${itemName.toLowerCase()}`}
          className="w-full py-5 px-8 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-3xl text-center shadow-xl shadow-emerald-200 hover:shadow-emerald-400 transition-all uppercase tracking-[0.2em] text-[10px]"
        >
          Start {itemName} Recovery
        </Link>
      </div>
    </div>
  );
};

export default Recycle;

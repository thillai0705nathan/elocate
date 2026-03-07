"use client";

import React, { useState } from "react";
import { Share2, Heart, DollarSign, Package, MapPin, Tag, Smartphone, Laptop, Trash2 } from "lucide-react";
import Link from "next/link";

const CommunityPage = () => {
    const [activeTab, setActiveTab] = useState<"marketplace" | "donate">("marketplace");

    const marketplaceItems = [
        { id: 1, name: "iPad Air 4", price: "₹18,000", location: "Adyar, Chennai", condition: "Good", icon: <Smartphone className="text-blue-500" /> },
        { id: 2, name: "Dell Latitude 7490", price: "₹22,000", location: "Velachery, Chennai", condition: "Excellent", icon: <Laptop className="text-emerald-500" /> },
        { id: 3, name: "Mechanical Keyboard", price: "₹2,500", location: "Anna Nagar, Chennai", condition: "Like New", icon: <Package className="text-amber-500" /> },
    ];

    const donationNeeds = [
        { id: 1, org: "Chennai Rural School", need: "5 Laptops", priority: "High", icon: <Heart className="text-red-500" /> },
        { id: 2, org: "Eco-Tech Charity", need: "Tablets for Kids", priority: "Medium", icon: <Heart className="text-purple-500" /> },
    ];

    return (
        <div className="min-h-screen bg-slate-50 py-16 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="bg-emerald-600 p-2 rounded-xl text-white">
                                <Share2 size={24} />
                            </div>
                            <span className="font-black text-emerald-600 uppercase tracking-widest text-xs">Community Impact</span>
                        </div>
                        <h1 className="text-5xl font-black text-slate-800 tracking-tight">Eco-Circular <span className="text-emerald-600">Hub</span></h1>
                        <p className="text-slate-400 font-bold mt-2 text-xl">Donate, Sell, or Repurpose your electronics with the community.</p>
                    </div>

                    <div className="flex bg-white p-2 rounded-[2rem] shadow-xl border border-slate-100">
                        <button
                            onClick={() => setActiveTab("marketplace")}
                            className={`px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${activeTab === "marketplace" ? "bg-emerald-600 text-white shadow-lg shadow-emerald-200" : "text-slate-400"}`}
                        >
                            Marketplace
                        </button>
                        <button
                            onClick={() => setActiveTab("donate")}
                            className={`px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${activeTab === "donate" ? "bg-emerald-600 text-white shadow-lg shadow-emerald-200" : "text-slate-400"}`}
                        >
                            Donation Center
                        </button>
                    </div>
                </div>

                {activeTab === "marketplace" ? (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {marketplaceItems.map(item => (
                                    <div key={item.id} className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-50 group hover:border-emerald-200 transition-all">
                                        <div className="bg-slate-50 w-16 h-16 rounded-3xl flex items-center justify-center mb-6 group-hover:bg-emerald-50 transition-colors">
                                            {item.icon}
                                        </div>
                                        <h3 className="text-2xl font-black text-slate-800 mb-2">{item.name}</h3>
                                        <div className="flex items-center gap-2 mb-6">
                                            <Tag size={14} className="text-emerald-600" />
                                            <span className="text-xs font-black text-emerald-600 uppercase tracking-widest">{item.condition}</span>
                                        </div>

                                        <div className="flex justify-between items-center pt-6 border-t border-slate-100">
                                            <div>
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pricing</p>
                                                <p className="text-xl font-black text-slate-800">{item.price}</p>
                                            </div>
                                            <button className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-600 transition-all">
                                                View Details
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-slate-900 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden h-fit">
                            <div className="absolute top-0 right-0 p-8 opacity-10">
                                <DollarSign size={140} />
                            </div>
                            <h3 className="text-2xl font-black mb-6">Sell Your Device</h3>
                            <p className="text-slate-400 font-medium mb-10 leading-relaxed">Turn your unused electronics into cash while promoting sustainable reuse.</p>

                            <form className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Device Name</label>
                                    <input type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-emerald-500 transition-all" placeholder="e.g. MacBook Pro 2018" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Ask Price</label>
                                    <input type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-emerald-500 transition-all" placeholder="₹" />
                                </div>
                                <button className="w-full bg-emerald-600 py-5 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-emerald-500/20 hover:bg-emerald-700 transition-all mt-4">
                                    List Item Now
                                </button>
                            </form>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {donationNeeds.map(need => (
                            <div key={need.id} className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-50 flex flex-col md:flex-row gap-8 items-center">
                                <div className="bg-red-50 p-8 rounded-[2rem] text-red-500">
                                    {need.icon}
                                </div>
                                <div className="flex-grow">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-3xl font-black text-slate-800 tracking-tight">{need.org}</h3>
                                        <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{need.priority} Priority</span>
                                    </div>
                                    <p className="text-slate-400 font-bold mb-8 italic">Needed: {need.need}</p>
                                    <button className="bg-emerald-600 text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-emerald-100">
                                        Donate Now
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="mt-16 bg-white rounded-[3rem] p-12 shadow-xl border border-slate-100 text-center">
                    <h2 className="text-3xl font-black text-slate-800 mb-4 tracking-tight">Environmental Contribution</h2>
                    <p className="text-slate-400 font-medium text-lg mb-10 max-w-2xl mx-auto">Reusing electronics saves 90% more energy than recycling them. Every item sold or donated here prevents raw material mining.</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-8 bg-slate-50 rounded-[2rem]">
                            <p className="text-4xl font-black text-emerald-600 mb-2">2.4k</p>
                            <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Devices Reused</p>
                        </div>
                        <div className="p-8 bg-slate-50 rounded-[2rem]">
                            <p className="text-4xl font-black text-amber-500 mb-2">12tn</p>
                            <p className="text-xs font-black text-slate-400 uppercase tracking-widest">CO2 Saved</p>
                        </div>
                        <div className="p-8 bg-slate-50 rounded-[2rem]">
                            <p className="text-4xl font-black text-blue-500 mb-2">840</p>
                            <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Community Members</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommunityPage;

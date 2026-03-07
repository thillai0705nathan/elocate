"use client"

import { useState } from "react"
import Link from "next/link"
import { getApiUrl } from "../utils/api"

export default function PickupPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        date: "",
        time: "Morning (9 AM - 12 PM)",
        items: ""
    })
    const [submitted, setSubmitted] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            // Mapping UI fields to DB schema
            const payload = {
                userId: "GUEST_" + Date.now(), // Placeholder for guest users
                address: formData.address,
                date: formData.date,
                time: formData.time,
                items: formData.items || "E-Waste Items",
                price: 0,
                facilityName: "Home Pickup"
            }

            const response = await fetch(getApiUrl("/api/pickup"), {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            })

            if (response.ok) {
                setSubmitted(true)
                // Save to localStorage for demo persistence
                const history = JSON.parse(localStorage.getItem("pickup_history") || "[]")
                history.push({ ...formData, id: Date.now(), status: "Confirmed", timestamp: new Date().toISOString() })
                localStorage.setItem("pickup_history", JSON.stringify(history))
            } else {
                alert("Error submitting pickup request. Please try again.")
            }
        } catch (error) {
            console.error("Pickup Submission Error:", error)
            alert("Connection error. Please check your internet.")
        } finally {
            setIsSubmitting(false)
        }
    }


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    if (submitted) {
        return (
            <div className="min-h-screen bg-green-50 flex items-center justify-center p-4">
                <div className="bg-white p-10 rounded-3xl shadow-2xl text-center max-w-md w-full animate-in fade-in zoom-in duration-500">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Request Received!</h2>
                    <p className="text-gray-600 mb-8">
                        Thank you, <b>{formData.name}</b>. Our team will contact you at <b>{formData.phone}</b> to confirm the pickup for <b>{formData.date}</b>.
                    </p>
                    <div className="space-y-4">
                        <Link href="/ewaste-check" className="block w-full bg-green-600 text-white font-bold py-4 rounded-xl hover:bg-green-700 transition-all shadow-lg shadow-green-200">
                            Check More Items
                        </Link>
                        <Link href="/" className="block w-full bg-gray-100 text-gray-700 font-bold py-4 rounded-xl hover:bg-gray-200 transition-all">
                            Return Home
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                <div className="mb-10 text-center">
                    <Link href="/ewaste-check" className="text-green-600 font-semibold flex items-center justify-center mb-4 hover:underline">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                        Back to Classifier
                    </Link>
                    <h1 className="text-4xl font-extrabold text-gray-900">Schedule <span className="text-green-600">Home Pickup</span></h1>
                    <p className="mt-2 text-lg text-gray-500">Professional e-waste collection right at your doorstep.</p>
                </div>

                <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-12">
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Full Name</label>
                                <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:bg-white transition-all outline-none" placeholder="John Doe" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Phone Number</label>
                                <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:bg-white transition-all outline-none" placeholder="+91 98765 43210" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Email Address</label>
                            <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:bg-white transition-all outline-none" placeholder="john@example.com" />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Pickup Address</label>
                            <textarea required name="address" rows={3} value={formData.address} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:bg-white transition-all outline-none" placeholder="123 Eco Street, Green City..."></textarea>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Preferred Date</label>
                                <input required type="date" name="date" value={formData.date} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:bg-white transition-all outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Time Slot</label>
                                <select name="time" value={formData.time} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:bg-white transition-all outline-none appearance-none">
                                    <option>Morning (9 AM - 12 PM)</option>
                                    <option>Afternoon (1 PM - 4 PM)</option>
                                    <option>Evening (5 PM - 8 PM)</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Items for Pickup (Optional)</label>
                            <input type="text" name="items" value={formData.items} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:bg-white transition-all outline-none" placeholder="e.g. 2 Old Laptops, 5 batteries" />
                        </div>

                        <div className="pt-4">
                            <button type="submit" className="w-full bg-green-600 text-white font-bold py-4 rounded-xl hover:bg-green-700 transition-all shadow-xl shadow-green-100 transform active:scale-[0.98]">
                                Schedule My Pickup
                            </button>
                            <p className="text-center text-xs text-gray-400 mt-4">
                                By scheduling, you agree to our Terms of Service regarding e-waste handling.
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

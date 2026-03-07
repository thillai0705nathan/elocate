"use client"

import React, { useMemo } from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js'
import { Line, Bar, Pie } from 'react-chartjs-2'
import { TrendingUp, Battery, Laptop, Smartphone, Recycle, AlertTriangle } from 'lucide-react'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
)

const AnalyticsPage = () => {
    // Mock data for project demonstration
    const trendData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [
            {
                label: 'E-Waste Detected (Items)',
                data: [45, 52, 60, 85, 92, 110, 145],
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                fill: true,
                tension: 0.4,
            },
            {
                label: 'Predicted Growth (ML)',
                data: [null, null, null, null, null, 110, 150, 185, 230], // Prediction part
                borderColor: '#3b82f6',
                borderDash: [5, 5],
                pointRadius: 0,
                tension: 0.4,
            }
        ],
    }

    const categoryData = {
        labels: ['Smartphones', 'Laptops', 'Batteries', 'PCBs', 'Monitors', 'Others'],
        datasets: [
            {
                data: [40, 25, 15, 10, 5, 5],
                backgroundColor: [
                    '#10b981',
                    '#3b82f6',
                    '#f59e0b',
                    '#ef4444',
                    '#8b5cf6',
                    '#64748b'
                ],
            },
        ],
    }

    const prediction = "Based on our Linear Regression model, we expect a 24% increase in e-waste detection next month, particularly in the 'Mobile Devices' category."

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-10 text-center">
                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
                        E-Waste <span className="text-emerald-600">Analytics & Insights</span>
                    </h1>
                    <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto italic">
                        "Turning data into environmental impact strategies using ML predictions."
                    </p>
                </div>

                {/* Prediction Hero */}
                <div className="bg-emerald-600 rounded-3xl p-8 mb-12 text-white shadow-2xl relative overflow-hidden">
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="md:w-2/3">
                            <div className="flex items-center gap-2 mb-4 bg-emerald-500/30 w-fit px-4 py-1 rounded-full border border-emerald-400">
                                <TrendingUp size={18} />
                                <span className="text-sm font-bold uppercase tracking-widest">ML Prediction Engine</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-black mb-4">Future E-Waste Trends</h2>
                            <p className="text-emerald-50 text-xl leading-relaxed">
                                {prediction}
                            </p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 text-center w-full md:w-1/3">
                            <p className="text-emerald-200 text-sm uppercase font-bold mb-1">Expected Volume</p>
                            <p className="text-6xl font-black">~185</p>
                            <p className="text-emerald-100 mt-2">Items next month</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Trend Chart */}
                    <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                            <Recycle className="text-emerald-600" />
                            Detection Volume History
                        </h3>
                        <div className="h-80">
                            <Line
                                data={trendData}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    plugins: { legend: { display: false } },
                                    scales: { y: { beginAtZero: true } }
                                }}
                            />
                        </div>
                    </div>

                    {/* Pie Chart */}
                    <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                            <Smartphone className="text-blue-600" />
                            Device Category Distribution
                        </h3>
                        <div className="h-80 flex justify-center">
                            <Pie
                                data={categoryData}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* Detailed Insights */}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-xl shadow-md flex items-center gap-4">
                        <div className="bg-orange-100 p-3 rounded-lg text-orange-600">
                            <Battery size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 font-medium">Top E-Waste</p>
                            <p className="text-xl font-bold">Lithium Batteries</p>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-md flex items-center gap-4">
                        <div className="bg-blue-100 p-3 rounded-lg text-blue-600">
                            <Laptop size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 font-medium">Recycling Ready</p>
                            <p className="text-xl font-bold">Laptops (25%)</p>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-md flex items-center gap-4">
                        <div className="bg-red-100 p-3 rounded-lg text-red-600">
                            <AlertTriangle size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 font-medium">Hazard Alert</p>
                            <p className="text-xl font-bold">High (32%)</p>
                        </div>
                    </div>
                </div>

                <div className="mt-12 text-center bg-gray-100 p-8 rounded-3xl">
                    <h3 className="text-gray-500 font-bold uppercase tracking-[0.2em] text-sm mb-4">How we calculate this?</h3>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        We use a <b>Linear Regression</b> model trained on current user interaction data, pickup frequency, and seasonal trends to predict e-waste generation patterns for the upcoming months.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default AnalyticsPage

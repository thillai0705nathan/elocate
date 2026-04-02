"use client";
import React, { useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";

const ForgetPassword = () => {
    const [email, setEmail] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Mocking password reset request
        toast.info("Password Reset Requested! Please check your email.");
        setEmail("");
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
            <div className="w-full max-w-md p-8 space-y-8 bg-white shadow-2xl rounded-2xl">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-black">Reset Password</h1>
                    <p className="mt-2 text-gray-400">Enter your email and we'll send you a link to reset your password.</p>
                </div>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-400 focus:border-emerald-400"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 text-white bg-black rounded-lg hover:bg-emerald-400 hover:text-black transition-colors"
                    >
                        Send Reset Link
                    </button>
                    <div className="text-center">
                        <Link href="/sign-in" className="text-sm font-bold text-black hover:text-emerald-400">
                            Back to Sign In
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ForgetPassword;

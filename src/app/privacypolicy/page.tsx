import React from "react";

const PrivacyPolicy = () => {
    return (
        <div className="container mx-auto px-4 py-32 md:py-48 max-w-4xl">
            <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
            <p className="text-gray-600 mb-4">Last Updated: April 2026</p>
            
            <section className="mb-8 font-light text-gray-700 leading-7">
                <h2 className="text-2xl font-semibold mb-4 text-black">1. Information We Collect</h2>
                <p>We collect information that you provide directly to us through the ELocate platform, including when you create an account, request a pickup, or contact us. This includes your name, email address, phone number, and location data needed for e-waste recycling services.</p>
            </section>

            <section className="mb-8 font-light text-gray-700 leading-7">
                <h2 className="text-2xl font-semibold mb-4 text-black">2. How We Use Your Information</h2>
                <p>We use the information we collect to provide, maintain, and improve our services, facilitate e-waste pickups, and communicate with you about your recycling requests.</p>
            </section>

            <section className="mb-8 font-light text-gray-700 leading-7">
                <h2 className="text-2xl font-semibold mb-4 text-black">3. Sharing of Information</h2>
                <p>We may share your information with certified recycling facilities only to facilitate the pickup and recycling of your e-waste. We do not sell your personal information to third parties.</p>
            </section>
        </div>
    );
};

export default PrivacyPolicy;

import React from "react";

const TermsOfService = () => {
    return (
        <div className="container mx-auto px-4 py-32 md:py-48 max-w-4xl">
            <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
            <p className="text-gray-600 mb-4">Effective Date: April 2026</p>
            
            <section className="mb-8 font-light text-gray-700 leading-7">
                <h2 className="text-2xl font-semibold mb-4 text-black">1. Acceptance of Terms</h2>
                <p>Welcome to ELocate. By accessing or using our platform, you agree to comply with and be bound by these Terms of Service. If you do not agree, please do not use our services.</p>
            </section>

            <section className="mb-8 font-light text-gray-700 leading-7">
                <h2 className="text-2xl font-semibold mb-4 text-black">2. Responsible Recycling</h2>
                <p>By requesting an e-waste pickup through ELocate, you certify that you have the right to dispose of the electronics and that they do not contain hazardous materials beyond those standard in electronic waste.</p>
            </section>

            <section className="mb-8 font-light text-gray-700 leading-7">
                <h2 className="text-2xl font-semibold mb-4 text-black">3. User Conduct</h2>
                <p>You agree to provide accurate information when registering and requesting pickups. You are responsible for maintaining the security of your account credentials.</p>
            </section>

            <section className="mb-8 font-light text-gray-700 leading-7">
                <h2 className="text-2xl font-semibold mb-4 text-black">4. Limitation of Liability</h2>
                <p>ELocate is a platform that connects users with recycling facilities. We are not responsible for any damage to devices or property during the pickup process, which is handled by third-party facilities.</p>
            </section>
        </div>
    );
};

export default TermsOfService;

"use client";

import React, { useState } from "react";
import Link from "next/link";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaLinkedin, FaTwitter, FaInstagram, FaWhatsapp, FaPaperPlane } from "react-icons/fa";

import { getApiUrl } from "@/app/utils/api";

const ContactUs = () => {
  const [formData, setFormData] = useState({

    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const sendMsg = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1. Send to Database
      const dbResponse = await fetch(getApiUrl("/api/contact"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!dbResponse.ok) throw new Error("Database submission failed");

      // 2. Original EmailJS call (optional, but keeping it for the user)
      const templateParams = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
      };

      await emailjs.send(
        "service_jqn5flv",
        "template_cnom5kj",
        templateParams,
        "ddYcz13MvW01UFF5u"
      );

      setFormData({ name: "", email: "", phone: "", message: "" });
      toast.success("Message received and saved! Our team will respond shortly.");
    } catch (error) {
      console.error("Submission Error:", error);
      toast.error(
        "We encountered an issue while saving your message. Please try again or email us directly."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">


      {/* Hero Section */}
      <div className="w-full bg-emerald-600 py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
            Get in Touch
          </h1>
          <p className="text-emerald-50 text-xl md:text-2xl max-w-3xl mx-auto">
            Have questions about e-waste? Our team of sustainability experts is ready to help you navigate the world of responsible electronics recycling.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-12 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Contact Information Cards */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-8 rounded-2xl shadow-xl border-t-4 border-emerald-500 hover:-translate-y-1 transition-transform duration-300">
              <div className="flex items-center mb-6">
                <div className="bg-emerald-100 p-4 rounded-full mr-4 text-emerald-600">
                  <FaMapMarkerAlt size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Our Office</h3>
                  <p className="text-gray-600 italic">Visit us in person</p>
                </div>
              </div>
              <address className="not-italic text-gray-700 text-lg">
                ELocate Headquarters<br />
                Kodambakkam High Road,<br />
                Chennai, Tamil Nadu 600034
              </address>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-xl border-t-4 border-emerald-500 hover:-translate-y-1 transition-transform duration-300">
              <div className="flex items-center mb-6">
                <div className="bg-emerald-100 p-4 rounded-full mr-4 text-emerald-600">
                  <FaPhoneAlt size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Phone Support</h3>
                  <p className="text-gray-600 italic">Call or message us</p>
                </div>
              </div>
              <div className="space-y-2">
                <Link href="tel:+911234567890" className="block text-lg text-gray-700 hover:text-emerald-600 transition-colors">
                  +91 123 456 7890
                </Link>
                <Link href="https://wa.me/911234567890" className="flex items-center text-lg text-gray-700 hover:text-green-500 transition-colors">
                  <FaWhatsapp className="mr-2" size={20} /> WhatsApp Support
                </Link>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-xl border-t-4 border-emerald-500 hover:-translate-y-1 transition-transform duration-300">
              <div className="flex items-center mb-6">
                <div className="bg-emerald-100 p-4 rounded-full mr-4 text-emerald-600">
                  <FaEnvelope size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Email Us</h3>
                  <p className="text-gray-600 italic">24/7 digital support</p>
                </div>
              </div>
              <Link href="mailto:support@elocate.com" className="text-lg text-gray-700 hover:text-emerald-500 transition-colors">
                support@elocate.com
              </Link>
              <div className="mt-8 pt-6 border-t border-gray-100">
                <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4">Follow Our Progress</p>
                <div className="flex gap-4">
                  <Link href="#" className="p-3 bg-gray-50 rounded-lg text-gray-600 hover:bg-emerald-500 hover:text-white transition-all duration-300"><FaLinkedin size={20} /></Link>
                  <Link href="#" className="p-3 bg-gray-50 rounded-lg text-gray-600 hover:bg-emerald-500 hover:text-white transition-all duration-300"><FaTwitter size={20} /></Link>
                  <Link href="#" className="p-3 bg-gray-50 rounded-lg text-gray-600 hover:bg-emerald-500 hover:text-white transition-all duration-300"><FaInstagram size={20} /></Link>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl border border-gray-100">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 flex items-center">
                <span className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center mr-4">
                  <FaPaperPlane size={20} />
                </span>
                Send Us a Message
              </h2>

              <form onSubmit={sendMsg} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Full Name</label>
                  <input
                    name="name"
                    placeholder="John Doe"
                    className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 transition-all bg-gray-50"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Email Address</label>
                  <input
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 transition-all bg-gray-50"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Phone Number (Optional)</label>
                  <input
                    name="phone"
                    placeholder="+91 00000 00000"
                    className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 transition-all bg-gray-50"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-semibold text-gray-700">How can we help today?</label>
                  <textarea
                    name="message"
                    rows={6}
                    placeholder="Describe your inquiry..."
                    className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 transition-all bg-gray-50 resize-none"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="md:col-span-2 pt-4">
                  <button
                    disabled={isSubmitting}
                    className={`w-full py-4 text-white font-bold rounded-xl shadow-lg transition-all transform active:scale-[0.98] flex items-center justify-center
                      ${isSubmitting ? 'bg-gray-400' : 'bg-emerald-600 hover:bg-emerald-700 hover:shadow-emerald-200 shadow-emerald-100'}`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <FaPaperPlane className="mr-2" />
                        Send Your Message
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ContactUs;

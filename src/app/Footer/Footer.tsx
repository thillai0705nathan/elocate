"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import logo from "../../assets/ELocate-s.png";
import emailjs from "@emailjs/browser";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";

import { Send, MapPin, Phone, Mail, Linkedin, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await emailjs.send(
        "service_jqn5flv",
        "template_ppph1w9",
        { email },
        "ddYcz13MvW01UFF5u"
      );
      setEmail("");
      toast.success("Subscription Confirmed!");
    } catch (err) {
      toast.error("Unable to process request.");
    }
  };

  return (
    <footer className="footer">
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />
      <div className="footer-top">
        <div className="container">
          <div className="footer-brand">
            <Link href="/">
              <Image src={logo} alt="ELocate" width={100} height={100} />
            </Link>
            <p>
              ELocate: Revolutionizing e-waste management. Connect with certified
              recycling facilities and stay environmentally responsible.
            </p>
            <form onSubmit={handleSubmit} className="newsletter-form">
              <input
                type="email"
                name="email"
                placeholder="Join newsletter"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="email-field"
              />
              <button type="submit" className="form-btn">
                <Send size={18} />
              </button>
            </form>
          </div>

          <ul>
            <li className="footer-list-title">Recycling Solutions</li>
            <li>
              <Link href="/recycle/smartphone" className="footer-link">
                Smartphone Recycling
              </Link>
            </li>
            <li>
              <Link href="/recycle/laptop" className="footer-link">
                Laptop & Computer Recycling
              </Link>
            </li>
            <li>
              <Link href="/recycle/accessories" className="footer-link">
                Electronics Accessories
              </Link>
            </li>
          </ul>

          <ul>
            <li className="footer-list-title">ELocate Platform</li>
            <li>
              <Link href="/about" className="footer-link">
                Mission & Vision
              </Link>
            </li>
            <li>
              <Link href="/education" className="footer-link">
                Education Center
              </Link>
            </li>
          </ul>

          <ul>
            <li className="footer-list-title">Connect With Us</li>
            <li className="footer-item">
              <MapPin size={18} />
              <span>Chh.Sambhajinagar, Chennai, India</span>
            </li>
            <li className="footer-item">
              <Phone size={18} />
              <Link href="tel:+911234567890" className="contact-link">
                +91 123 456 7890
              </Link>
            </li>
            <li className="footer-item">
              <Mail size={18} />
              <Link href="mailto:contact@elocate.com" className="contact-link">
                contact@elocate.com
              </Link>
            </li>
            <li className="social-list">
              <Link href="#" className="social-link">
                <Linkedin size={18} />
              </Link>
              <Link href="#" className="social-link">
                <Instagram size={18} />
              </Link>
              <Link href="#" className="social-link">
                <Twitter size={18} />
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">

          <ul className="footer-bottom-list">
            <li>
              <Link href="/privacypolicy" className="footer-bottom-link">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/termsandservices" className="footer-bottom-link">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
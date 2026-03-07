"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import logo from "../../assets/ELocate-s.png";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastContainer = dynamic(
  () => import("react-toastify").then((mod) => mod.ToastContainer),
  { ssr: false }
);
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
    <footer className="footer shadow-2xl">
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />
      <div className="container flex flex-wrap justify-between">
        <div className="footer-brand">
          <Link href="/">
            <Image src={logo} alt="ELocate" width={100} height={100} />
          </Link>
          <p>
            ELocate: Revolutionizing e-waste management. Connect with certified
            recycling facilities and stay environmentally responsible.
          </p>
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="email"
              name="email"
              placeholder="Join newsletter"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <Send size={18} />
          </form>
        </div>

        <ul>
          <li>Recycling Solutions</li>
          <li>
            <Link href="/recycle/smartphone">Smartphone Recycling</Link>
          </li>
          <li>
            <Link href="/recycle/laptop">Laptop & Computer Recycling</Link>
          </li>
          <li>
            <Link href="/recycle/accessories">Electronics Accessories</Link>
          </li>
        </ul>

        <ul>
          <li>ELocate Platform</li>
          <li>
            <Link href="/aboutus">Mission & Vision</Link>
          </li>
          <li>
            <Link href="/education">Education Center</Link>
          </li>
        </ul>

        <ul>
          <li>Connect With Us</li>
          <li className="flex items-center gap-2">
            <MapPin size={18} />
            Chh.Sambhajinagar, Chennai, India
          </li>
          <li className="flex items-center gap-2">
            <Phone size={18} />
            <Link href="tel:+911234567890">+91 123 456 7890</Link>
          </li>
          <li className="flex items-center gap-2">
            <Mail size={18} />
            <Link href="mailto:contact@elocate.com">contact@elocate.com</Link>
          </li>
          <li className="flex gap-2">
            <Link href="#"><Linkedin size={18} /></Link>
            <Link href="#"><Instagram size={18} /></Link>
            <Link href="#"><Twitter size={18} /></Link>
          </li>
        </ul>
      </div>

      <div className="footer-bottom">
        <p>
          &copy; 2023 ELocate | All Rights Reserved by{" "}
          <Link href="#">Team Spam Byte</Link>
        </p>
        <ul className="flex gap-4">
          <li>
            <Link href="/privacypolicy">Privacy Policy</Link>
          </li>
          <li>
            <Link href="/termsandservices">Terms of Service</Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;

"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "../../assets/ELocate-s.png";
import { getUser, handleLogout } from "../sign-in/auth";

import { Bell, Trophy, Zap, MessageCircle, Menu, X, MapPin } from "lucide-react";
import { useGamification } from "../utils/useGamification";

const Navbar = () => {
  const pathname = usePathname();
  // ✅ hydration-safe mount guard
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<any>(null);

  const [isNavbarActive, setIsNavbarActive] = useState(false);
  const [isHeaderActive, setIsHeaderActive] = useState(false);
  const [locations, setLocations] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotifyOpen, setIsNotifyOpen] = useState(false);

  const { points, level } = useGamification();

  // Mock Notifications
  const notifications = [
    { id: 1, text: "You have unused e-waste! Scan now.", icon: <Zap size={16} className="text-amber-500" /> },
    { id: 2, text: "Schedule a pickup to earn 100 bonus pts.", icon: <Trophy size={16} className="text-emerald-500" /> },
  ];

  // ✅ run client-only logic after mount
  useEffect(() => {
    setMounted(true);
    const storedUser = getUser();
    if (storedUser && (storedUser.id || storedUser.email)) {
      setUser(storedUser);
    } else {
      setUser(null);
    }
  }, []);

  const toggleNavbar = () => setIsNavbarActive(!isNavbarActive);
  const closeNavbar = () => setIsNavbarActive(false);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleNotify = () => setIsNotifyOpen(!isNotifyOpen);

  useEffect(() => {
    setIsNavbarActive(false);
  }, [pathname]);

  useEffect(() => {
    if (isNavbarActive) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isNavbarActive]);

  // ✅ geolocation client-side only
  useEffect(() => {
    if (!navigator.geolocation) {
      setLocations("Location not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async pos => {
        try {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;

          const res = await fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${lon},${lat}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`
          );

          const data = await res.json();
          const ctx = data.features?.[0]?.context || [];

          const city = ctx.find((c: any) => c.id.includes("place"))?.text;
          const state = ctx.find((c: any) => c.id.includes("region"))?.text;

          if (city && state) {
            setLocations(`${city}, ${state}`);
          } else if (city || state) {
            setLocations(city || state);
          } else {
            setLocations("Location Detected");
          }
        } catch (error) {
          console.error("Geocoding error:", error);
          setLocations("India");
        }
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          setLocations("Enable Location");
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          setLocations("Location unavailable");
        } else if (error.code === error.TIMEOUT) {
          setLocations("Location timeout");
        } else {
          setLocations("Location unavailable");
        }
      }
    );
  }, []);

  // ✅ scroll effect
  useEffect(() => {
    const onScroll = () => setIsHeaderActive(window.scrollY > 100);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ✅ hydration guard — prevents mismatch crash
  if (!mounted) return null;

  return (
    <>
      {/* Full-screen overlay — outside header so it covers the entire page */}
      <div
        className={`overlay ${isNavbarActive ? "active" : ""}`}
        onClick={closeNavbar}
        aria-hidden="true"
      />

      <header className={`header ${isHeaderActive ? "active" : ""}`} style={isNavbarActive ? { zIndex: 100, backgroundColor: "transparent", opacity: 1, boxShadow: "none" } : {}}>
        <div className="container shadow-md flex items-center justify-between gap-2">

          <Link href="/">
            <Image
              src={logo}
              alt="ELocate"
              width={100}
              height={100}
              priority
              style={{ height: "auto" }}
            />
          </Link>

          <nav className={`navbar ${isNavbarActive ? "active" : ""}`}>
            <div className="flex items-center justify-between">
              <Link href="/" className="logo">
                ELocate
              </Link>

              <button onClick={toggleNavbar} className="nav-close-btn" title="Close navigation menu">
                <X size={24} />
              </button>
            </div>

            <ul className="navbar-list">
              {[
                "Home",
                "About",
                "E-Facilities",
                "Recycle",
                "Community",
                "Education",
                "Contact-us",
                "Rules",
              ].map(label => (
                <li key={label} className="navbar-link">
                  <Link href={label === "Home" ? "/" : `/${label.toLowerCase()}`} onClick={closeNavbar} className="text-white lg:text-slate-800 font-bold hover:text-emerald-400" style={isNavbarActive ? { color: "#ffffff", opacity: 1 } : {}}>
                    {label.replace("-", " ")}
                  </Link>
                </li>
              ))}

              <li className="navbar-link">
                <Link href="/five-r" onClick={closeNavbar} className="text-white lg:text-slate-800 font-bold hover:text-emerald-400" style={isNavbarActive ? { color: "#ffffff", opacity: 1 } : {}}>5R</Link>
              </li>
              <li className="navbar-link">
                <Link href="/ewaste-check" onClick={closeNavbar} className="text-white lg:text-slate-800 font-bold hover:text-emerald-400" style={isNavbarActive ? { color: "#ffffff", opacity: 1 } : {}}>E-Waste Check</Link>
              </li>
              <li className="navbar-link">
                <Link href="/analytics" onClick={closeNavbar} className="text-white lg:text-slate-800 font-bold hover:text-emerald-400" style={isNavbarActive ? { color: "#ffffff", opacity: 1 } : {}}>Analytics</Link>
              </li>
            </ul>
          </nav>

          <div className="flex items-center gap-2 sm:gap-4 md:gap-6 shrink-0">
            {/* Notifications */}
            <div className="relative hidden sm:block">
              <button onClick={toggleNotify} className="relative p-2 text-slate-600 hover:text-emerald-600 transition-colors">
                <Bell size={22} />
                <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-[10px] flex items-center justify-center rounded-full border-2 border-white font-bold">2</span>
              </button>

              {isNotifyOpen && (
                <div className="absolute right-0 mt-4 w-72 bg-white rounded-2xl shadow-2xl border border-slate-100 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2">
                  <div className="p-4 bg-slate-50 border-b">
                    <h3 className="font-bold text-slate-800">Environmental Alerts</h3>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.map(n => (
                      <div key={n.id} className="p-4 border-b hover:bg-slate-50 transition-colors flex gap-3 items-start">
                        <div className="mt-1">{n.icon}</div>
                        <p className="text-sm text-slate-600 leading-tight">{n.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="hidden md:flex items-center gap-3 bg-emerald-50 px-4 py-2 rounded-2xl border border-emerald-100">
              <MapPin size={20} className="text-emerald-600" />
              <span className="text-xs font-black text-emerald-800 uppercase tracking-tight truncate max-w-[150px] lg:max-w-[200px]">
                {locations || "Locating..."}
              </span>
            </div>

            {user ? (
              <div className="relative flex items-center gap-3">
                <div className="hidden lg:block text-right">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{level}</p>
                  <p className="text-xs font-bold text-emerald-600">{points} Pts</p>
                </div>
                <button onClick={toggleDropdown} className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center font-black text-slate-600 hover:bg-emerald-100 transition-all border-2 border-white shadow-sm">
                  {(user?.username || user?.fullname || user?.email || "U").charAt(0).toUpperCase()}
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 top-14 w-48 bg-white rounded-2xl shadow-2xl border border-slate-100 z-50 overflow-hidden py-1">
                    <Link href="/profile" className="block px-4 py-3 text-sm font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 transition-all">Profile Dashboard</Link>
                    <button onClick={handleLogout} className="block w-full text-left px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 transition-all">Sign Out</button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link href="/sign-in" className="text-slate-600 font-bold text-sm hover:text-emerald-600 transition-colors">
                  Sign In
                </Link>
                <Link href="/sign-up" className="bg-emerald-600 text-white px-4 py-2 rounded-xl font-bold text-xs sm:text-sm hover:bg-emerald-700 shadow-lg shadow-emerald-200 transition-all">
                  Sign Up
                </Link>
              </div>
            )}

            <button onClick={toggleNavbar} className="nav-open-btn lg:hidden" title="Open navigation menu">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;

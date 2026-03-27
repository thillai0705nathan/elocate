"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import hero from "../../assets/hero-banner.png";

const solutions = [
  "Recycling Revolution",
  "Sustainable Disposal",
  "Smart Facility Finder",
];

const solutionVariants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
};


const HeroSection: React.FC = () => {
  const [currentSolution, setCurrentSolution] = useState(solutions[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentIndex = solutions.indexOf(currentSolution);
      const nextIndex = (currentIndex + 1) % solutions.length;
      setCurrentSolution(solutions[nextIndex]);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentSolution]);
  return (
    <section className="section hero" id="home" aria-label="hero">
      <div className="container">
        <div className="hero-content">
          <p className="hero-subtitle has-before">
            Welcome to ELocate — Powering a Greener Tomorrow
          </p>

          <h1 className="h1 hero-title">
            Your Strategic Partner for Innovative and High-Impact
            <br /> <motion.span
              className="text-go-green"
              variants={solutionVariants}
              initial="initial"
              animate="animate"
              key={currentSolution}
            >
              E-Waste {''}
              {currentSolution}
            </motion.span>
          </h1>

          <p className="hero-text">
            ELocate: Revolutionizing E-Waste Management for a Sustainable Future. Discover nearby e-waste facilities with precision and ease.
            Your gateway to responsible recycling practices and environmental stewardship — one device at a time.
          </p>

          <div className="btn-group">
            <Link href="/e-facilities" className="btn btn-primary">
              Find Nearest Facility
            </Link>
            <Link href="/recycle" className="btn btn-primary">
              Start Recycling Today
            </Link>
          </div>
        </div>

        <div className="hero-banner has-before img-holder">
          <Image
            src={hero}
            alt="hero banner"
            width={650}
            height={650}
            className="object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

import Image from "next/image";
import Link from "next/link";
import React from "react";
import feature from "../../assets/features/banner.svg";

const About = () => {
  return (
    <section className="about" id="about" aria-label="about">
      <div className="container">
        <p className="section-subtitle">
          —Discover ELocate—
        </p>

        <h2 className="h2 section-title">
          Pioneering the Future of E-Waste Management & Sustainability
        </h2>

        <div className="about-content">
          <div className="about-text">
            <p className="section-text">
              India faces a critical environmental challenge with 1.71 million metric tons of e-waste generated annually, much of it improperly disposed. The scarcity of accessible, trustworthy e-waste collection facilities intensifies this growing crisis. <br /><br />
              ELocate was born from this urgent need. Our award-winning platform bridges the critical gap between consumers and certified e-waste facilities through an intuitive, powerful interface. We&apos;re not just locating recycling centers—we&apos;re catalyzing a movement toward responsible electronics lifecycle management and environmental stewardship.
            </p>
            <div className="btn-group">
              <Link href="/contact-us" className="btn btn-primary">
                Connect With Us
              </Link>
              <Link href="/recycle" className="btn btn-secondary">
                Explore Recycling Solutions
              </Link>
            </div>
          </div>
          <div className="section-banner has-before img-holder">
            <Image
              src={feature}
              alt="Sustainable E-Waste Management Solution"
              width={400}
              height={400}
              className="img-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

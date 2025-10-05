// src/pages/LandingPage.jsx

import Features from "@/Components/Features";
import HeroSection from "@/Components/Hero";
import Navbar from "@/Components/Navbar";
import Menu from "@/Components/ui/quotes";
import { SmoothCursor } from "@/Components/ui/smooth-cursor";
import React from "react";



const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <SmoothCursor />
      {/* Navbar */}
    <Navbar />

      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Section */}
        <section id="hero">
         <HeroSection />
        </section>
        

        {/* Features Section */}
        <section id="features" className=" min-h-screen w-full px-5 bg-foreground dark:bg-background md:px-10 lg:px-20 ">
         <Features />
        
        </section>
        <section id="menu" className=" min-h-screen w-full py-20 px-5 md:px-10 bg-card-foreground text-foreground dark:bg-background dark:text-primary-foreground">
         
         <Menu />
        </section>
      </main>

      {/* Footer */}
      
    </div>
  );
};

export default LandingPage;
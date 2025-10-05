"use client";

import React from "react";
import { motion } from "framer-motion";

import { Link } from "react-router-dom";
import { InteractiveHoverButton } from "./ui/interactive-hover-button";

export default function HeroSection() {
  return (
    // 1. Main Background Gradient:
    // Light: from-amber-200 to-amber-300 -> from-background to-secondary (using secondary for the lighter end)
    // Dark: dark:from-gray-900 dark:to-gray-800 -> dark:from-background dark:to-card (using background/card)
    <section className="relative flex min-h-screen w-full items-center justify-center bg-card-foreground dark:bg-background overflow-hidden">
      
    

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4">
        <motion.h1
          // Heading Text:
          // text-gray-900 -> text-primary (Darkest color in light mode)
          // dark:text-white -> dark:text-primary-foreground (Lightest color in dark mode)
          className="text-6xl md:text-8xl font-extrabold text-primary dark:text-primary leading-tight"
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          Forumly
        </motion.h1>

        <motion.p
          // Paragraph Text:
          // text-gray-700 -> text-foreground (Standard text color)
          // dark:text-gray-300 -> dark:text-muted-foreground (Slightly lighter in dark mode for contrast)
          className="mt-6 text-xl md:text-2xl text-background dark:text-muted-foreground max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        >
          The blueprint for your next great idea isn't in a file — it's in a conversation.
        </motion.p>

        <motion.div
          className="mt-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        >
          <Link to ="/signup" ><InteractiveHoverButton>Get Started</InteractiveHoverButton></Link>
        </motion.div>
      </div>
    </section>
  );
}
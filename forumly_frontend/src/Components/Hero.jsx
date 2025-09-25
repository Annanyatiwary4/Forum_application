"use client";

import React from "react";
import { motion } from "framer-motion";

import { Link } from "react-router-dom";
import { InteractiveHoverButton } from "./ui/interactive-hover-button";

export default function HeroSection() {
  return (
    <section className="relative flex h-screen w-full items-center justify-center bg-gradient-to-br from-amber-200 to-amber-300 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      
      {/* Floating Background Shapes */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div 
          className="absolute top-10 left-10 w-80 h-80 bg-indigo-300/20 rounded-full blur-3xl"
          animate={{ y: [0, 20, 0], x: [0, 15, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 bg-pink-300/20 rounded-full blur-3xl"
          animate={{ y: [0, -25, 0], x: [0, -20, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4">
        <motion.h1
          className="text-6xl md:text-8xl font-extrabold text-gray-900 dark:text-white leading-tight"
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          Forumly
        </motion.h1>

        <motion.p
          className="mt-6 text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto"
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
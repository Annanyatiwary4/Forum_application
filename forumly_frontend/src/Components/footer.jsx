"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { FaLinkedin, FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer
      className={cn(
        "w-full border-t border-gray-200 dark:border-gray-700",
        "bg-card-foreground dark:bg-background text-primary dark:text-white"
      )}
    >
      {/* Top Links + Connect Section */}
      <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-20 py-8 flex flex-col md:flex-row justify-between gap-8">
        
        {/* Section Links */}
        <div className="flex flex-col gap-4">
          <h3 className="font-semibold text-lg">Links</h3>
           <div className="flex gap-4">
          <a href="#hero" className="hover:underline">Home</a>
          <a href="#features" className="hover:underline">Features</a>
          <a href="#about" className="hover:underline">About Us</a>
          <a href="#contact" className="hover:underline">Contact</a>
        </div>
        </div>

        {/* Connect with me */}
        <div className="flex flex-col gap-4">
          <h3 className="font-semibold text-lg">Connect with me</h3>
          <div className="flex gap-4">
            <a
              href="https://www.linkedin.com/in/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={24} />
            </a>
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-800 dark:hover:text-gray-300 transition-colors"
              aria-label="GitHub"
            >
              <FaGithub size={24} />
            </a>
          </div>
        </div>
      </div>

      {/* Separator */}
      <div className="border-t border-gray-300 dark:border-gray-600 mx-5 md:mx-10 lg:mx-20"></div>

      {/* Bottom copyright */}
      <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-20 py-4 text-sm flex flex-col items-center gap-2 text-gray-700 dark:text-gray-400">
        <span>© {new Date().getFullYear()} Forumly. All rights reserved.</span>
        <span>Made with ❤️ by Annanya</span>
      </div>
    </footer>
  );
}

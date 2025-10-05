"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { AnimatedList } from "./animated-list";


let notifications = [
  {
    title: "New discussion started",
    description: "A thread on React 18 features has been posted.",
    time: "15m ago",
    icon: "🆕",
    color: "#00C9A7", // Kept for item branding
  },
  {
    title: "Tech update",
    description: "Tailwind CSS 4.0 release notes are now available.",
    time: "10m ago",
    icon: "🚀",
    color: "#FFB800", // Kept for item branding
  },
  {
    title: "New reply",
    description: "Alice replied to your thread on Node.js best practices.",
    time: "5m ago",
    icon: "💬",
    color: "#FF3D71", // Kept for item branding
  },
  {
    title: "Announcement",
    description: "Forum maintenance scheduled at 12:00 AM UTC.",
    time: "2m ago",
    icon: "📢",
    color: "#1E86FF", // Kept for item branding
  },
];

// Repeat notifications to fill the list
notifications = Array.from({ length: 10 }, () => notifications).flat();

const Notification = ({ title, description, icon, color, time }) => {
  return (
    <figure
      className={cn(
        "relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-4",
        "transition-all duration-200 ease-in-out hover:scale-[103%]",
        
        // LIGHT MODE:
        // bg-white -> bg-card
        // [box-shadow:0_0_0_1px_rgba(0,0,0,.03),...] -> Custom light mode shadow using border/ring
        "bg-card border border-border/50 shadow-md",
        
        // DARK MODE:
        // dark:bg-transparent -> dark:bg-card/50 (using card for dark background, with opacity)
        // dark:backdrop-blur-md -> Kept, for effect
        // dark:[border:1px_solid_rgba(255,255,255,.1)] -> dark:[border:1px_solid_var(--color-border)] (using border variable)
        // dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] -> dark:[box-shadow:0_0_0_1px_var(--color-ring),_0_-20px_80px_-20px_#ffffff1f_inset] (Using ring for outline)
        "transform-gpu dark:bg-card/50 dark:backdrop-blur-md dark:border-border dark:shadow-xl dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]"
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-2xl"
          style={{ backgroundColor: color }}
        >
          <span className="text-lg">{icon}</span>
        </div>
        <div className="flex flex-col overflow-hidden">
          <figcaption className="flex flex-row items-center whitespace-pre text-lg font-medium dark:text-primary-foreground">
            {/* Title Text: text-black for light mode, text-primary-foreground (white) for dark mode */}
            <span className="text-sm text-black sm:text-lg dark:text-primary">{title}</span>
            <span className="mx-1">·</span>
            {/* Time Text: text-gray-500 -> text-muted-foreground */}
            <span className="text-xs text-muted-foreground">{time}</span>
          </figcaption>
          {/* Description Text: text-black for light mode, text-foreground (near white) for dark mode */}
          <p className="text-sm font-normal text-black dark:text-foreground">{description}</p>
        </div>
      </div>
    </figure>
  );
};

export const AnimatedListDemo = ({ className }) => {
  return (
    <div
      className={cn(
        "relative flex h-[500px] w-full flex-col overflow-hidden p-2",
        className
      )}
    >
      <AnimatedList>
        {notifications.map((item, idx) => (
          <Notification {...item} key={idx} />
        ))}
      </AnimatedList>

      {/* Bottom gradient overlay: using 'from-background' which is theme-aware */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background"></div>
    </div>
  );
};
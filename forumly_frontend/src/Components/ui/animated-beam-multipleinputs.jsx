"use client";

import React, { forwardRef, useRef } from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { AnimatedBeam } from "./animated-beam";

// 🟣 Circle component with slight shadow glow
const Circle = forwardRef(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex size-12 items-center justify-center rounded-full border-2 border-border bg-white/80 backdrop-blur-md p-1 shadow-[0_0_25px_-10px_rgba(0,0,0,0.5)] hover:scale-105 transition-transform duration-300",
        className
      )}
    >
      {children}
    </div>
  );
});
Circle.displayName = "Circle";

// 🧠 Main Demo Component
export function AnimatedBeamMultipleOutputDemo({ className }) {
  const containerRef = useRef(null);
  const div1Ref = useRef(null);
  const div2Ref = useRef(null);
  const div3Ref = useRef(null);
  const div4Ref = useRef(null);
  const div5Ref = useRef(null);
  const div6Ref = useRef(null);
  const div7Ref = useRef(null);

  // 🎨 Gradient color list for fallbacks
  const gradients = [
    "from-pink-500 to-orange-400",
    "from-blue-500 to-cyan-400",
    "from-green-500 to-lime-400",
    "from-purple-500 to-indigo-400",
    "from-yellow-500 to-amber-400",
  ];

  // 🧍 Dummy user avatars (DiceBear generated)
  const users = [
    { name: "U1", img: "https://api.dicebear.com/8.x/adventurer/svg?seed=Alpha" },
    { name: "U2", img: "https://api.dicebear.com/8.x/adventurer/svg?seed=Bliss" },
    { name: "U3", img: "https://api.dicebear.com/8.x/adventurer/svg?seed=Charlie" },
    { name: "U4", img: "https://api.dicebear.com/8.x/adventurer/svg?seed=Delta" },
    { name: "U5", img: "https://api.dicebear.com/8.x/adventurer/svg?seed=Echo" },
  ];

  return (
    <div
      className={cn(
        "relative flex h-[500px] w-full items-center justify-center overflow-hidden p-10",
        className
      )}
      ref={containerRef}
    >
      <div className="flex size-full max-w-lg flex-row items-stretch justify-between gap-10">
        {/* Left users */}
        <div className="flex flex-col justify-center gap-2">
          {users.map((user, i) => (
            <Circle key={i} ref={[div1Ref, div2Ref, div3Ref, div4Ref, div5Ref][i]}>
              <Avatar>
                <AvatarImage src={user.img} alt={user.name} />
                <AvatarFallback
                  className={cn(
                    "text-white font-bold bg-gradient-to-br",
                    gradients[i]
                  )}
                >
                  {user.name}
                </AvatarFallback>
              </Avatar>
            </Circle>
          ))}
        </div>

        {/* Center moderator */}
        <div className="flex flex-col justify-center">
          <Circle ref={div6Ref} className="size-16 shadow-lg">
            <Avatar>
              <AvatarImage
                src="https://api.dicebear.com/8.x/bottts/svg?seed=Moderator"
                alt="Moderator"
              />
              <AvatarFallback className="text-white font-semibold bg-gradient-to-br from-sky-500 to-violet-500">
                Mod
              </AvatarFallback>
            </Avatar>
          </Circle>
        </div>

        {/* Right receiver */}
        <div className="flex flex-col justify-center">
          <Circle ref={div7Ref}>
            <Avatar>
              <AvatarImage
                src="https://api.dicebear.com/8.x/adventurer/svg?seed=Zara"
                alt="User 6"
              />
              <AvatarFallback className="text-white font-semibold bg-gradient-to-br from-red-500 to-pink-600">
                U6
              </AvatarFallback>
            </Avatar>
          </Circle>
        </div>
      </div>

      {/* Animated beams */}
      <AnimatedBeam containerRef={containerRef} fromRef={div1Ref} toRef={div6Ref} />
      <AnimatedBeam containerRef={containerRef} fromRef={div2Ref} toRef={div6Ref} />
      <AnimatedBeam containerRef={containerRef} fromRef={div3Ref} toRef={div6Ref} />
      <AnimatedBeam containerRef={containerRef} fromRef={div4Ref} toRef={div6Ref} />
      <AnimatedBeam containerRef={containerRef} fromRef={div5Ref} toRef={div6Ref} />
      <AnimatedBeam containerRef={containerRef} fromRef={div6Ref} toRef={div7Ref} />
    </div>
  );
}

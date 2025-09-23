"use client";

import React, { forwardRef, useRef } from "react";
import { cn } from "@/lib/utils";
import { AnimatedBeam } from "./animated-beam";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // Shadcn avatar

const Circle = forwardRef(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex size-12 items-center justify-center rounded-full border-2 border-border bg-white p-1 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
        className
      )}
    >
      {children}
    </div>
  );
});

Circle.displayName = "Circle";

export function AnimatedBeamMultipleOutputDemo({ className }) {
  const containerRef = useRef(null);
  const div1Ref = useRef(null);
  const div2Ref = useRef(null);
  const div3Ref = useRef(null);
  const div4Ref = useRef(null);
  const div5Ref = useRef(null);
  const div6Ref = useRef(null);
  const div7Ref = useRef(null);

  return (
    <div
      className={cn(
        "relative flex h-[500px] w-full items-center justify-center overflow-hidden p-10",
        className
      )}
      ref={containerRef}
    >
      <div className="flex size-full max-w-lg flex-row items-stretch justify-between gap-10">
        <div className="flex flex-col justify-center gap-2">
          <Circle ref={div1Ref}>
            <Avatar>
              <AvatarImage src="/avatars/user1.jpg" alt="User 1" />
              <AvatarFallback>U1</AvatarFallback>
            </Avatar>
          </Circle>
          <Circle ref={div2Ref}>
            <Avatar>
              <AvatarImage src="/avatars/user2.jpg" alt="User 2" />
              <AvatarFallback>U2</AvatarFallback>
            </Avatar>
          </Circle>
          <Circle ref={div3Ref}>
            <Avatar>
              <AvatarImage src="/avatars/user3.jpg" alt="User 3" />
              <AvatarFallback>U3</AvatarFallback>
            </Avatar>
          </Circle>
          <Circle ref={div4Ref}>
            <Avatar>
              <AvatarImage src="/avatars/user4.jpg" alt="User 4" />
              <AvatarFallback>U4</AvatarFallback>
            </Avatar>
          </Circle>
          <Circle ref={div5Ref}>
            <Avatar>
              <AvatarImage src="/avatars/user5.jpg" alt="User 5" />
              <AvatarFallback>U5</AvatarFallback>
            </Avatar>
          </Circle>
        </div>
        <div className="flex flex-col justify-center">
          <Circle ref={div6Ref} className="size-16">
            <Avatar>
              <AvatarImage src="https://github.com/evilrabbit.png" alt="Moderator" />
              <AvatarFallback>Mod</AvatarFallback>
            </Avatar>
          </Circle>
        </div>
        <div className="flex flex-col justify-center">
          <Circle ref={div7Ref}>
            <Avatar>
              <AvatarImage src="https://github.com/leerob.png" alt="User 6" />
              <AvatarFallback>U6</AvatarFallback>
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
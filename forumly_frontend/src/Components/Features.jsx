import React from "react";
import ScrollFloat from "./ScrollFloat";
import { FeaturesCard } from "./FeaturesCard";

export default function Features() {
  return (
    <>
      {/* ===== What's Inside Section ===== */}
          <section className="text-white px-6 md:px-12">
            <div className="mx-auto text-[8rem] font-mono">
            <ScrollFloat
      animationDuration={1}
      ease="back.inOut(2)"
      stagger={0.03}
      className="text-[8rem] font-mono text-center leading-snug"
    >
      What's Inside → 
    </ScrollFloat>
        </div>
        <div className="mt-5">
            {/* Import and render your feature cards here */}
            
                    <FeaturesCard />

          </div>

      </section>

    </>
  );
}
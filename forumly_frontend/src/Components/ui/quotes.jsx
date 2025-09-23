// src/DemoFlowingMenu.jsx
import React from "react";
import FlowingMenu from "./FlowingMenu";



const demoItems = [
  
  {
    link: "#",
    text: "Community",
    description: "It's time to share your story and connect with others who are on the same journey. Discover a community that understands, supports, and celebrates your unique perspective."
  },
  {
    link: "#",
    text: "Dialogue",
    description: "The best answers aren't in a book; they're in a conversation. Exchange knowledge, gain new insights, and unlock solutions you won't find anywhere else."
  },
  {
    link: "#",
    text: "Curiosity",
    description: "A curious mind is never lost; it's just waiting to be surprised. Dive into a universe of topics, find unexpected passions, and ignite your curiosity."
  },
  {
    link: "#",
    text: "Perspective",
    description: "A mind is like a parachute. It doesn't work if it's not open. Engage in civil discourse, respectfully challenge your own beliefs, and see the world through a new lens."
  },
];

export default function Menu() {
  return (
    <div style={{ height: "600px", position: "relative" }}>
      <FlowingMenu items={demoItems} />
    </div>
  );
}
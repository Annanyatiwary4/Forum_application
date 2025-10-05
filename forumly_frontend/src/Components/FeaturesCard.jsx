import { CalendarIcon, FileTextIcon } from "@radix-ui/react-icons";
import { BellIcon, Share2Icon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Marquee } from "./ui/marquee";
import { AnimatedListDemo } from "./ui/animatedlistdemo";
import { AnimatedBeamMultipleOutputDemo } from "./ui/animated-beam-multipleinputs";
import { BentoCard, BentoGrid } from "./ui/bento-grid";



const files = [
  {
    name: "Alice Johnson",
    body: "This forum has been a game-changer for staying updated on the latest tech trends. Love the discussions here!",
  },
  {
    name: "Bob Smith",
    body: "The community is super helpful! I got answers to all my React questions within hours.",
  },
  {
    name: "Catherine Lee",
    body: "I appreciate the detailed tutorials and the weekly tech updates. Very informative and easy to follow.",
  },
  {
    name: "David Kim",
    body: "Joining this forum has helped me improve my coding skills tremendously. Highly recommend it!",
  },
  {
    name: "Elena Martinez",
    body: "I love seeing real-world project examples here. It makes learning so much more practical.",
  },
];

const features = [
  {
    Icon: FileTextIcon,
    name: "Active Discussions",
    description: "Get real-time updates from our thriving community. See what's trending and join the conversation instantly.",
    href: "#",
    cta: "Dive in now",
    className: "col-span-3 lg:col-span-1",
    background: (
      <Marquee
        pauseOnHover
        // Use from-background for the mask gradient to match the theme
        className="absolute top-10 [--duration:20s] [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)]"
      >
        {files.map((f, idx) => (
          <figure
            key={idx}
            className={cn(
              "relative w-32 cursor-pointer overflow-hidden rounded-xl border p-4",
              
              // LIGHT MODE:
              // border-gray-950/[.1] -> border-border
              // bg-gray-950/[.01] -> bg-background/50 (subtle contrast)
              // hover:bg-gray-950/[.05] -> hover:bg-secondary
              "border-border bg-background/50 hover:bg-secondary",
              
              // DARK MODE:
              // dark:border-gray-50/[.1] -> dark:border-border
              // dark:bg-gray-50/[.10] -> dark:bg-card (slightly elevated from dark background)
              // dark:hover:bg-gray-50/[.15] -> dark:hover:bg-accent/10 (subtle highlight)
              "dark:border-border dark:bg-card dark:hover:bg-accent/10",
              
              // Text Color forfigcaption (name)
              "text-foreground",

              "transform-gpu opacity-90 hover:opacity-100 hover:scale-105 transition-all duration-300 ease-out"
            )}
          >
            <div className="flex flex-row items-center gap-2">
              <div className="flex flex-col">
                {/* Figcaption: text-foreground (name) */}
                <figcaption className="text-sm font-medium text-foreground">
                  {f.name}
                </figcaption>
              </div>
            </div>
            {/* Blockquote: text-muted-foreground (body) */}
            <blockquote className="mt-2 text-xs text-muted-foreground">{f.body}</blockquote>
          </figure>
        ))}
      </Marquee>
    ),
  },
  {
    Icon: BellIcon,
    name: "Stay Notified",
    description: "Never miss a beat. Get alerts for new replies, mentions, and updates on your favorite topics.",
    href: "#",
    cta: "Manage your alerts",
    className: "col-span-3 lg:col-span-2",
    background: (
      <AnimatedListDemo className="absolute right-2 top-4 h-[300px] w-full scale-75 border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-90" />
    ),
  },
  {
    Icon: Share2Icon,
    name: "Community Integrations",
    description: "Connect your favorite tools like GitHub, Slack, and Discord to seamlessly share your work and projects.",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-2",
    background: (
      <AnimatedBeamMultipleOutputDemo className="absolute right-2 top-4 h-[300px] border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105" />
    ),
  },
  {
    Icon: FileTextIcon,
    name: "Get Help from fellow Developers",
    description: "Need help? Post your problem and get a solution fast from the community.",
    className: "col-span-3 lg:col-span-1",
    href: "#",
    cta: "Get Help Now",
    background: (
      <figure
        className={cn(
          "relative w-full cursor-pointer overflow-hidden rounded-xl border p-4",
          
          // LIGHT MODE:
          // border-gray-950/[.1] -> border-border
          // bg-gray-950/[.01] -> bg-background/50
          // hover:bg-gray-950/[.05] -> hover:bg-secondary
          "border-border bg-background/50 hover:bg-secondary",

          // DARK MODE:
          // dark:border-gray-50/[.1] -> dark:border-border
          // dark:bg-gray-50/[.10] -> dark:bg-card
          // dark:hover:bg-gray-50/[.15] -> dark:hover:bg-accent/10
          "dark:border-border dark:bg-card dark:hover:bg-accent/10",
          
          // Blockquote text color:
          "text-muted-foreground",

          // ✅ Crisp effect: no blur, subtle fade and scale on hover
          "transform-gpu opacity-90 hover:opacity-100 hover:scale-105 transition-all duration-300 ease-out"
        )}
      >
        <blockquote className="mt-2 text-xs">
          {`
              Hey everyone! I'm struggling with a CSS layout issue...
            I've tried using flexbox but the items aren't aligning correctly.
            Can someone take a look at my code?
              [code link here]
            `}
        </blockquote>
      </figure>
    ),
  },
];

export function FeaturesCard() {
  return (
    <BentoGrid>
      {features.map((feature, idx) => (
        <BentoCard key={idx} {...feature} />
      ))}
    </BentoGrid>
  );
}
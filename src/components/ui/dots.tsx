"use client";

import { cn } from "@/lib/utils";

type DotConfig = {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  size: string;
  color: string;
  delay?: string;
  duration?: string;
};

const dots: DotConfig[] = [
  { top: "25%", left: "25%", size: "w-2 h-2", color: "bg-primary" },
  {
    top: "33%",
    right: "33%",
    size: "w-1 h-1",
    color: "bg-accent",
    delay: "2s",
  },
  {
    bottom: "25%",
    left: "33%",
    size: "w-3 h-3",
    color: "bg-primary/50",
    delay: "4s",
  },
  {
    top: "10%",
    left: "15%",
    size: "w-2 h-2",
    color: "bg-primary/40",
    delay: "1s",
  },
  {
    bottom: "20%",
    right: "20%",
    size: "w-3 h-3",
    color: "bg-accent/60",
    delay: "2.5s",
    duration: "3s",
  },
  {
    top: "30%",
    right: "10%",
    size: "w-1.5 h-1.5",
    color: "bg-primary/70",
    delay: "3.2s",
  },
  {
    bottom: "15%",
    left: "10%",
    size: "w-2.5 h-2.5",
    color: "bg-accent/50",
    delay: "4.5s",
  },
  {
    top: "5%",
    right: "25%",
    size: "w-2 h-2",
    color: "bg-primary opacity-30",
    delay: "5.2s",
    duration: "2s",
  },
  {
    bottom: "5%",
    right: "5%",
    size: "w-1.5 h-1.5",
    color: "bg-accent/70",
    delay: "5.7s",
    duration: "2.5s",
  },
  {
    top: "40%",
    left: "45%",
    size: "w-2 h-2",
    color: "bg-primary/60",
    delay: "6s",
  },

  {
    top: "15%",
    right: "10%",
    size: "w-2 h-2",
    color: "bg-primary/80",
    delay: "1.1s",
    duration: "2s",
  },
  {
    bottom: "10%",
    left: "20%",
    size: "w-2.5 h-2.5",
    color: "bg-accent/50",
    delay: "3s",
  },
  {
    top: "50%",
    left: "10%",
    size: "w-2 h-2",
    color: "bg-primary/70",
    delay: "2.4s",
    duration: "1.8s",
  },
  {
    bottom: "8%",
    right: "15%",
    size: "w-1.5 h-1.5",
    color: "bg-accent",
    delay: "3.8s",
    duration: "2.2s",
  },
  {
    top: "20%",
    left: "40%",
    size: "w-1.5 h-1.5",
    color: "bg-primary/40",
    delay: "0.7s",
  },
];

export const Dots = () => {
  return (
    <>
      {dots.map((dot, index) => (
        <div
          key={index}
          className={cn(
            "absolute rounded-full animate-float",
            dot.size,
            dot.color,
          )}
          style={{
            top: dot.top,
            bottom: dot.bottom,
            left: dot.left,
            right: dot.right,
            animationDelay: dot.delay || "0s",
            animationDuration: dot.duration || undefined,
          }}
        />
      ))}
    </>
  );
};

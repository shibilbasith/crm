"use client";
import React, { useId } from "react";
import { cn } from "@/lib/utils";

interface SparklesProps {
  id?: string;
  className?: string;
  background?: string;
  minSize?: number;
  maxSize?: number;
  particleDensity?: number;
  particleColor?: string;
}

export const SparklesCore = (props: SparklesProps) => {
  const {
    id,
    className,
    background = "transparent",
    minSize = 0.4,
    maxSize = 1,
    particleDensity = 1200,
    particleColor = "#FFF",
  } = props;
  const generateId = useId();
  return (
    <div className={cn("opacity-0", className)}>
      <div
        className={cn("h-full w-full")}
        style={{
          background,
        }}
      >
        <svg className="h-full w-full" viewBox="0 0 400 400" fill="none">
          <defs>
            <pattern
              id={id || generateId}
              x="0"
              y="0"
              width="400"
              height="400"
              patternUnits="userSpaceOnUse"
            >
              {[...Array(particleDensity)].map((_, i) => (
                <circle
                  key={`${id || generateId}-${i}`}
                  cx={Math.random() * 400}
                  cy={Math.random() * 400}
                  r={Math.random() * (maxSize - minSize) + minSize}
                  fill={particleColor}
                  fillOpacity={Math.random()}
                >
                  <animate
                    attributeName="opacity"
                    dur={`${Math.random() * 2 + 1}s`}
                    values="0;1;0"
                    repeatCount="indefinite"
                    begin={`${Math.random() * 2}s`}
                  />
                </circle>
              ))}
            </pattern>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill={`url(#${id || generateId})`}
          />
        </svg>
      </div>
    </div>
  );
};
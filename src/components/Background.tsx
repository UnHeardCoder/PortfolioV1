"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface BackgroundProps {
  className?: string;
}

export default function Background({ className = "" }: BackgroundProps) {
  const COLS = 20;
  const ROWS = 60;
  const BASE_DELAY = 0.5;
  const NOISE = 0.05;
  const [isLoaded, setIsLoaded] = useState(false);

  const getRandomCoordinate = (): [number, number] => [
    Math.floor(Math.random() * ROWS),
    Math.floor(Math.random() * COLS),
  ];

  const [origin, setOrigin] = useState<[number, number] | undefined>();

  useEffect(() => {
    setOrigin(getRandomCoordinate());
  }, []);

  if (!origin) return null;

  const getDistance = (row: number, col: number) => {
    return (
      Math.sqrt((row - origin[0]) ** 2 + (col - origin[1]) ** 2) /
      (Math.sqrt(ROWS ** 2 + COLS ** 2))
    );
  };

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <div className="p-2">
        <div className="grid grid-cols-20 auto-rows-fr w-full gap-1">
          {[...Array(ROWS * COLS)].map((_, idx) => {
            const row = Math.floor(idx / COLS);
            const col = idx % COLS;
            const delay =
              getDistance(row, col) * BASE_DELAY + Math.random() * NOISE;
            const isOrigin = getDistance(row, col) === 0;

            return (
              <motion.div
                className="bg-neutral-700/50 rounded-sm aspect-square border border-white/20"
                key={idx}
                initial={{ opacity: isOrigin ? 1 : 0, scale: isOrigin ? 1 : 0.3 }}
                animate={{
                  opacity: isLoaded ? [0.5, 0.7, 0.5] : 0.5,
                  scale: 1,
                  backgroundColor: "rgb(55 65 81 / 0.5)"
                }}
                transition={{
                  type: "spring",
                  bounce: 0.5,
                  delay: delay,
                  opacity: isLoaded ? {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: Math.random() * 2
                  } : undefined
                }}
                onAnimationComplete={() => {
                  if (isOrigin) {
                    setIsLoaded(true);
                  }
                }}
                whileHover={{
                  opacity: 1,
                  scale: 1.05,
                  backgroundColor: "rgb(124 45 18 / 0.8)",
                  borderColor: "rgb(249 115 22 / 1)",
                  transition: { 
                    duration: 0.1
                  }
                }}
                exit={{
                  opacity: 0.5,
                  backgroundColor: "rgb(55 65 81 / 0.5)",
                  borderColor: "rgb(255 255 255 / 0.2)",
                  transition: { 
                    duration: 0.8,
                    ease: "easeOut"
                  }
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface BackgroundProps {
  className?: string;
}

export default function Background({ className = "" }: BackgroundProps) {
  const GRID_SIZE = 20;
  const BASE_DELAY = 0.5;
  const NOISE = 0.05;
  const [isLoaded, setIsLoaded] = useState(false);

  const getRandomCoordinate = (): [number, number] => [
    Math.floor(Math.random() * GRID_SIZE),
    Math.floor(Math.random() * GRID_SIZE),
  ];

  const [origin, setOrigin] = useState<[number, number] | undefined>();

  useEffect(() => {
    setOrigin(getRandomCoordinate());
  }, []);

  if (!origin) return null;

  const getDistance = (row: number, col: number) => {
    return (
      Math.sqrt((row - origin[0]) ** 2 + (col - origin[1]) ** 2) /
      (10 * Math.sqrt(2))
    );
  };

  return (
    <div className={`w-full h-full ${className}`}>
      <div className="p-4">
        <div className="grid grid-cols-20 w-full gap-2 sm:gap-3">
          {[...Array(GRID_SIZE ** 2)].map((_, idx) => {
            const row = Math.floor(idx / GRID_SIZE);
            const col = idx % GRID_SIZE;
            const delay =
              getDistance(row, col) * BASE_DELAY + Math.random() * NOISE;
            const isOrigin = getDistance(row, col) === 0;
            const animationDelay = Math.random() * 2;

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
                    delay: animationDelay
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
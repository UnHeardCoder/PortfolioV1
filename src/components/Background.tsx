"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface BackgroundProps {
  className?: string;
}

export default function Background({ className = "" }: BackgroundProps) {
  // Reduced number of squares for better performance
  const COLS = 12;
  const ROWS = 30;
  const BASE_DELAY = 0.3;
  const NOISE = 0.05;
  const [isLoaded, setIsLoaded] = useState(false);
  const [clickOrigin, setClickOrigin] = useState<[number, number] | null>(null);

  const getRandomCoordinate = (): [number, number] => [
    Math.floor(Math.random() * ROWS),
    Math.floor(Math.random() * COLS),
  ];

  const [origin, setOrigin] = useState<[number, number] | undefined>();

  useEffect(() => {
    setOrigin(getRandomCoordinate());
  }, []);

  if (!origin) return null;

  const getDistance = (row: number, col: number, from: [number, number]) => {
    // Significantly increase the distance calculation to make the ripple effect travel much further
    return Math.sqrt((row - from[0]) ** 2 + (col - from[1]) ** 2) * 5;
  };

  const handleSquareClick = (row: number, col: number) => {
    setClickOrigin([row, col]);
    setTimeout(() => setClickOrigin(null), 2000); // Increased duration to allow ripple to complete
  };

  const renderSquare = (idx: number) => {
    const row = Math.floor(idx / COLS);
    const col = idx % COLS;
    const initialDelay =
      getDistance(row, col, origin) / (Math.sqrt(ROWS ** 2 + COLS ** 2)) * BASE_DELAY + Math.random() * NOISE;
    const isOrigin = getDistance(row, col, origin) === 0;

    const distance = clickOrigin ? getDistance(row, col, clickOrigin) : 0;
    const maxDistance = Math.sqrt(ROWS ** 2 + COLS ** 2) * 5;
    const normalizedDistance = distance / maxDistance;
    
    const rippleDelay = distance * 0.015; // Reduced delay for faster ripple
    const rippleScale = clickOrigin ? Math.max(0.1, 1 - normalizedDistance * 0.5) : 1; // Adjusted for longer distance

    return (
      <motion.div
        className="bg-neutral-700/50 rounded-sm aspect-square border border-white/20 cursor-pointer"
        key={idx}
        initial={{ opacity: isOrigin ? 1 : 0, scale: isOrigin ? 1 : 0.3 }}
        animate={{
          opacity: isLoaded ? [0.5, 0.7, 0.5] : 0.5,
          scale: rippleScale,
        }}
        transition={{
          type: "spring",
          bounce: 0.5,
          delay: clickOrigin ? rippleDelay : initialDelay,
          opacity: isLoaded ? {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 2
          } : undefined,
        }}
        onClick={() => handleSquareClick(row, col)}
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
      />
    );
  };

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <div className="p-2">
        <div className="grid grid-cols-12 auto-rows-fr w-full gap-1">
          {[...Array(ROWS * COLS)].map((_, idx) => renderSquare(idx))}
        </div>
      </div>
    </div>
  );
}
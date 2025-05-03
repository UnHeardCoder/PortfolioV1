"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

interface BackgroundProps {
  className?: string;
}

export default function Background({ className = "" }: BackgroundProps) {
  const MOBILE_COLS = 12;
  const DESKTOP_COLS = 20;
  const ROWS = 31;
  const BASE_DELAY = 0.3;
  const NOISE = 0.05;
  
  const [isLoaded, setIsLoaded] = useState(false);
  const [clickOrigin, setClickOrigin] = useState<[number, number] | null>(null);
  const [columnCount, setColumnCount] = useState(MOBILE_COLS);
  const [origin, setOrigin] = useState<[number, number] | undefined>();
  const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Function to determine column count based on screen width
  const updateColumnCount = () => {
    setColumnCount(window.innerWidth >= 768 ? DESKTOP_COLS : MOBILE_COLS);
  };

  useEffect(() => {
    // Defer initial grid/origin setup to idle time
    const idleCallback =
      typeof window !== "undefined" && "requestIdleCallback" in window
        ? (window.requestIdleCallback as (cb: () => void) => void)
        : (cb: () => void) => setTimeout(cb, 1);
    idleCallback(() => {
      updateColumnCount();
      setOrigin([
        Math.floor(Math.random() * ROWS),
        Math.floor(Math.random() * (window.innerWidth >= 768 ? DESKTOP_COLS : MOBILE_COLS)),
      ]);
    });

    // Debounced resize handler
    const handleResize = () => {
      if (resizeTimeoutRef.current) clearTimeout(resizeTimeoutRef.current);
      resizeTimeoutRef.current = setTimeout(() => {
        updateColumnCount();
      }, 200);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (resizeTimeoutRef.current) clearTimeout(resizeTimeoutRef.current);
    };
  }, []);

  if (!origin) return null;

  const getDistance = (row: number, col: number, from: [number, number]) => {
    return Math.sqrt((row - from[0]) ** 2 + (col - from[1]) ** 2) * 5;
  };

  const handleSquareClick = (row: number, col: number) => {
    setClickOrigin([row, col]);
    setTimeout(() => setClickOrigin(null), 2000);
  };

  const renderSquare = (idx: number, cols: number) => {
    const row = Math.floor(idx / cols);
    const col = idx % cols;
    const initialDelay =
      getDistance(row, col, origin) / (Math.sqrt(ROWS ** 2 + cols ** 2)) * BASE_DELAY + Math.random() * NOISE;
    const isOrigin = getDistance(row, col, origin) === 0;

    const distance = clickOrigin ? getDistance(row, col, clickOrigin) : 0;
    const maxDistance = Math.sqrt(ROWS ** 2 + cols ** 2) * 5;
    const normalizedDistance = distance / maxDistance;
    
    const rippleDelay = distance * 0.015;
    const rippleScale = clickOrigin ? Math.max(0.1, 1 - normalizedDistance * 0.5) : 1;

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
        <div 
          className={`grid auto-rows-fr w-full gap-1`} 
          style={{ gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))` }}
        >
          {[...Array(ROWS * columnCount)].map((_, idx) => renderSquare(idx, columnCount))}
        </div>
      </div>
    </div>
  );
}
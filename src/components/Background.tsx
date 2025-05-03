"use client";

import { useEffect, useState } from "react";

interface BackgroundProps {
  className?: string;
}

const MOBILE_COLS = 12;
const DESKTOP_COLS = 20;
const ROWS = 31;

function getDistance(row: number, col: number, from: [number, number]) {
  return Math.sqrt((row - from[0]) ** 2 + (col - from[1]) ** 2);
}

export default function Background({ className = "" }: BackgroundProps) {
  const [columnCount, setColumnCount] = useState(MOBILE_COLS);
  const [origin, setOrigin] = useState<[number, number]>([0, 0]);

  useEffect(() => {
    setColumnCount(window.innerWidth >= 768 ? DESKTOP_COLS : MOBILE_COLS);
    setOrigin([
      Math.floor(Math.random() * ROWS),
      Math.floor(Math.random() * (window.innerWidth >= 768 ? DESKTOP_COLS : MOBILE_COLS)),
    ]);
    const handleResize = () => {
      setColumnCount(window.innerWidth >= 768 ? DESKTOP_COLS : MOBILE_COLS);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <style>{`
        @keyframes load {
          0% { opacity: 0; transform: scale(0.95); }
          50% { opacity: 0.5; transform: scale(1.02); }
          100% { opacity: 0.3; transform: scale(0.95); }
        }
        .grid-square {
          opacity: 0;
          background: rgba(64,64,64,0.3);
          border-radius: 0.125rem;
          aspect-ratio: 1/1;
          border: 1px solid rgba(255,255,255,0.1);
          cursor: pointer;
          animation: load 3s forwards;
          will-change: opacity, transform;
          contain: content;
          transition: background-color 1.5s ease-out, border-color 1.5s ease-out, box-shadow 1.5s ease-out;
        }
        .grid-square:hover {
          background: rgba(124,45,18,0.6) !important;
          border-color: rgba(249,115,22,0.5) !important;
          box-shadow: 0 0 10px rgba(249,115,22,0.3);
          transform: scale(1.1) !important;
          transition: transform 0.2s ease-in;
        }
      `}</style>
      <div className="p-2">
        <div
          className="grid auto-rows-fr w-full gap-2"
          style={{ 
            gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
            contain: 'content'
          }}
        >
          {[...Array(ROWS * columnCount)].map((_, idx) => {
            const row = Math.floor(idx / columnCount);
            const col = idx % columnCount;
            const distance = getDistance(row, col, origin);
            return (
              <div
                key={idx}
                className="grid-square"
                style={{ animationDelay: `${distance * 0.07}s` }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
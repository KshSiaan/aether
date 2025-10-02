"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ClientView() {
  const [dotPos, setDotPos] = useState({ x: 8, y: 16 });
  const [trailDots, setTrailDots] = useState<
    { x: number; y: number; id: number }[]
  >([]);
  const [trailId, setTrailId] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Add current dotPos as a trail dot
    setTrailDots((prev) => [
      ...prev,
      { x: dotPos.x, y: dotPos.y, id: trailId },
    ]);
    setTrailId((id) => id + 1);

    // Move the main dot
    setDotPos({ x, y });
  };

  return (
    <motion.div
      className="h-[50dvw] lg:h-[600px] z-30 aspect-square lg:aspect-video bg-background rounded-2xl border-4 absolute -bottom-[50dvw] lg:-bottom-[600px] left-1/2 -translate-1/2 shadow-2xl overflow-hidden"
      whileTap={{
        scale: 0.98,
        transition: { type: "spring", stiffness: 400, damping: 17 },
      }}
      whileHover={{
        scale: 1.01,
        transition: { type: "spring", stiffness: 400, damping: 25 },
      }}
      onClick={handleClick}
    >
      {/* Trail Dots */}
      {trailDots.map((trail) => (
        <motion.div
          key={trail.id}
          className="size-3 bg-rose-600 rounded-3xl absolute pointer-events-none"
          initial={{ x: trail.x - 6, y: trail.y - 6, opacity: 0.8, scale: 1 }}
          animate={{ opacity: 0, scale: 1.5 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          onAnimationComplete={() =>
            setTrailDots((prev) => prev.filter((d) => d.id !== trail.id))
          }
        />
      ))}

      {/* Main Dot with Custom Tooltip */}
      <motion.div
        className="absolute size-8 -translate-x-1/2 -translate-y-1/2"
        animate={{ x: dotPos.x + 20, y: dotPos.y + 12 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className="size-3 bg-rose-600 rounded-3xl pointer-events-none" />

        {/* Tooltip */}
        <AnimatePresence>
          {isHovering && (
            <motion.div
              className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded-md bg-muted text-foreground text-xs shadow-md whitespace-nowrap"
              initial={{ opacity: 0, scale: 0.8, y: -4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -4 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              Hello user!
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

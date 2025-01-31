"use client";

import {
  motion,
  useMotionValue,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { Sparkles, Heart, Stars, Rocket } from "lucide-react";
import { Card } from "@/components/ui/card";
import GreetingMessage from "@/components/GreetingMessage";
import React, { useEffect, useState } from "react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 120, damping: 15 },
  },
};

interface AnimatedGreetingProps {
  name: string;
  classStream: string;
}

export default function AnimatedGreeting({
  name,
  classStream,
}: AnimatedGreetingProps) {
  const [isMobile, setIsMobile] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  // Mobile-friendly motion values
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], isMobile ? [0, 0] : [10, -10]);
  const rotateY = useTransform(x, [-100, 100], isMobile ? [0, 0] : [-10, 10]);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900">
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 opacity-50"
        animate={{
          background: [
            "linear-gradient(45deg, #ff6b6b, #4ecdc4)",
            "linear-gradient(135deg, #4ecdc4, #45b7d1)",
            "linear-gradient(225deg, #45b7d1, #96f2d7)",
            "linear-gradient(315deg, #96f2d7, #ff6b6b)",
          ],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear",
        }}
      />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-4xl mx-auto relative z-10 py-8 px-4"
        style={
          !shouldReduceMotion
            ? { perspective: 2000, rotateX, rotateY }
            : undefined
        }
        {...(!isMobile && {
          onPointerMove: (e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            x.set(e.clientX - rect.left - rect.width / 2);
            y.set(e.clientY - rect.top - rect.height / 2);
          },
          onPointerLeave: () => {
            x.set(0);
            y.set(0);
          },
        })}
      >
        <motion.div variants={itemVariants}>
          <Card className="p-6 md:p-8 backdrop-blur-2xl bg-white/5 border-white/20 shadow-2xl hover:shadow-3xl transition-shadow relative overflow-hidden">
            {/* Interactive blob effect */}
            {!isMobile && (
              <motion.div
                className="absolute -inset-8 z-0 opacity-20 blur-2xl"
                animate={{
                  borderRadius: [
                    "60% 40% 30% 70%",
                    "30% 60% 70% 40%",
                    "50% 60% 30% 60%",
                  ],
                  background: ["#ff6b6b", "#4ecdc4", "#45b7d1"],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
            )}

            <div className="text-center space-y-6 relative z-10">
              <motion.div
                className="flex justify-center"
                whileHover={!isMobile ? { scale: 1.1 } : undefined}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                animate={{
                  rotate: shouldReduceMotion ? 0 : [0, 20, -20, 0],
                }}
              >
                <Sparkles className="w-12 h-12 text-yellow-300 animate-pulse" />
              </motion.div>

              <motion.h1
                className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-400 bg-clip-text text-transparent"
                variants={itemVariants}
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                }}
                style={{
                  backgroundSize: "200% 200%",
                }}
              >
                Dear {name}
              </motion.h1>

              <motion.p
                className="text-xl md:text-2xl text-white/90 font-medium mb-8 drop-shadow-md"
                variants={itemVariants}
              >
                Class of {classStream}
              </motion.p>

              <motion.div variants={itemVariants}>
                <GreetingMessage />
              </motion.div>

              <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-8 md:mt-12"
                variants={containerVariants}
              >
                <WishCard
                  icon={<Heart className="w-8 h-8 text-pink-400" />}
                  title="With Love"
                  message="May your journey ahead be filled with endless possibilities and beautiful moments."
                  isMobile={isMobile}
                />
                <WishCard
                  icon={<Stars className="w-8 h-8 text-yellow-300" />}
                  title="Shine Bright"
                  message="Your potential is limitless. Keep reaching for the stars and never stop dreaming."
                  isMobile={isMobile}
                />
                <WishCard
                  icon={<Rocket className="w-8 h-8 text-blue-400" />}
                  title="Soar High"
                  message="As you embark on this new chapter, may you soar to new heights of success."
                  isMobile={isMobile}
                />
              </motion.div>

              <motion.div
                className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-white/10"
                variants={itemVariants}
              >
                <p className="text-white/80 italic text-sm md:text-base">
                  With best wishes from your juniors,
                </p>
                <p className="text-xl md:text-2xl text-white font-semibold mt-2 bg-gradient-to-r from-white via-amber-100 to-purple-200 bg-clip-text text-transparent">
                  Class of 11th (2024-25)
                </p>
                <div className="mt-4 flex items-center justify-center space-x-2">
                  <div className="w-8 h-px bg-white/40" />
                  <span className="text-white/60 text-xs md:text-sm">
                    UCSKM Public School, Bhiwadi
                  </span>
                  <div className="w-8 h-px bg-white/40" />
                </div>
              </motion.div>
            </div>
          </Card>
        </motion.div>
      </motion.div>

      {/* Mobile-specific floating elements */}
      {isMobile && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full"
              initial={{ scale: 0 }}
              animate={{
                scale: [0, 1, 0],
                x: Math.random() * 400 - 200,
                y: Math.random() * 800 - 400,
              }}
              transition={{
                duration: 4 + Math.random() * 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function WishCard({
  icon,
  title,
  message,
  isMobile,
}: {
  icon: React.ReactNode;
  title: string;
  message: string;
  isMobile: boolean;
}) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={!isMobile ? { y: -10, scale: 1.05 } : undefined}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="p-4 md:p-6 backdrop-blur-2xl border-white/10 group relative overflow-hidden transition-all hover:border-white/30 bg-white/5">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
          animate={
            !isMobile
              ? {
                  x: [-100, 200],
                }
              : undefined
          }
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
        />
        <div className="flex flex-col items-center text-center space-y-3 md:space-y-4 relative z-10">
          <motion.div
            className="hover:scale-110 transition-transform"
            whileHover={!isMobile ? { rotate: 360 } : undefined}
            transition={{ type: "spring", stiffness: 200 }}
          >
            {icon}
          </motion.div>
          <h3 className="text-lg md:text-xl font-semibold text-white drop-shadow-sm">
            {title}
          </h3>
          <p className="text-white/80 text-sm md:text-base leading-relaxed">
            {message}
          </p>
        </div>
      </Card>
    </motion.div>
  );
}

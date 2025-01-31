"use client"

import { motion } from "framer-motion"

export default function GreetingMessage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 120 }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-8 max-w-3xl mx-auto px-4 relative"
    >
      <motion.p 
        variants={itemVariants}
        className="text-2xl md:text-3xl text-white/90 leading-relaxed font-light tracking-wide"
        style={{ textShadow: "0 2px 4px rgba(0,0,0,0.3)" }}
      >
        <span className="text-4xl text-yellow-300 font-bold mr-2">✦</span>
        As you stand at the threshold of a new beginning, we, your juniors, want to express our heartfelt gratitude for
        being incredible mentors. Your guidance, friendship, and the memories we&apos;ve shared will forever echo in the 
        <span className="bg-gradient-to-r from-yellow-300 to-amber-400 bg-clip-text text-transparent mx-2">
          halls of UCSKM
        </span>.
      </motion.p>

      <motion.div
        variants={itemVariants}
        className="relative my-12 py-6 px-8 rounded-xl border-l-4 border-yellow-300 bg-black/20 backdrop-blur-sm"
      >
        <div className="absolute top-0 left-0 w-full h-full border-t border-white/10 rounded-xl pointer-events-none" />
        <blockquote className="text-3xl font-serif text-center leading-snug bg-gradient-to-br from-yellow-300 to-amber-400 bg-clip-text text-transparent italic">
          &quot;May your journey sparkle with the brilliance of your dreams, each step illuminated by the wisdom you&apos;ve shared.&quot;
        </blockquote>
        <div className="flex justify-center mt-4">
          <div className="h-1 w-24 bg-amber-400/50 rounded-full" />
        </div>
      </motion.div>

      <motion.p
        variants={itemVariants}
        className="text-xl md:text-2xl text-white/80 leading-relaxed font-medium max-w-4xl mx-auto"
      >
        As you embark on this new chapter, remember that your legacy at UCSKM will continue to grow through every student you&apos;ve inspired. We pledge to nurture the 
        <span className="text-yellow-300 mx-1.5">values</span> you&apos;ve instilled and carry forward the 
        <span className="text-yellow-300 mx-1.5">tradition</span> of excellence you&apos;ve established.
      </motion.p>

      <motion.div
        variants={itemVariants}
        className="flex justify-center mt-12"
      >
        <div className="animate-pulse">
          <svg 
            className="w-12 h-12 text-yellow-300 opacity-80"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M13 10V3L4 14h7v7l9-11h-7z" 
            />
          </svg>
        </div>
      </motion.div>
    </motion.div>
  )
}
import React from "react"
import { AnimatePresence, motion } from "framer-motion"
import { cx } from "@emotion/css"

interface FadeProps {
  isActive: boolean
  className?: string
  options?: {
    initial?: Record<string, string | number>
    animated?: Record<string, string | number>
    exit?: Record<string, string | number>
  }
}

const Fade: React.FC<FadeProps> = ({ children, isActive, className, options }) => {
  return (
    <AnimatePresence>
      {isActive && (
        <motion.section
          data-testid="fade-motion-section"
          layout
          className={cx(className)}
          initial={{ opacity: 0, y: "-100%", ...options?.initial }}
          animate={{ opacity: 1, y: 0, ...options?.animated }}
          exit={{ opacity: 0, y: "100%", ...options?.exit }}
        >
          {children}
        </motion.section>
      )}
    </AnimatePresence>
  )
}
export default Fade

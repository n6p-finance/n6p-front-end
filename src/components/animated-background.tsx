"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export function AnimatedBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100
      const y = (e.clientY / window.innerHeight) * 100
      setMousePosition({ x, y })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 -z-10"
      animate={{
        background: [
          `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(139, 92, 246, 0.15), rgba(59, 130, 246, 0.1), rgba(0, 0, 0, 0))`,
          `radial-gradient(circle at ${100 - mousePosition.x}% ${100 - mousePosition.y}%, rgba(59, 130, 246, 0.15), rgba(139, 92, 246, 0.1), rgba(0, 0, 0, 0))`,
        ],
      }}
      transition={{
        duration: 8,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "mirror",
        ease: "easeInOut",
      }}
    />
  )
}

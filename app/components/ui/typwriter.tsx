import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface TextThreeProps {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
  reducedMotion?: boolean;
}

const TextThree = ({ 
  text, 
  className = "", 
  speed = 100, 
  delay = 0,
  reducedMotion = false 
}: TextThreeProps) => {
    const [displayText, setDisplayText] = useState(reducedMotion ? text : "")

    useEffect(() => {
        if (reducedMotion) return;
        
        let currentIndex = 0
        const timeoutId = setTimeout(() => {
            const intervalId = setInterval(() => {
                if (currentIndex <= text.length) {
                    setDisplayText(text.slice(0, currentIndex))
                    currentIndex++
                } else {
                    clearInterval(intervalId)
                }
            }, speed)
            
            return () => clearInterval(intervalId)
        }, delay)

        return () => clearTimeout(timeoutId)
    }, [text, speed, delay, reducedMotion])

    return (
        <motion.span
            className={className}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {displayText}
        </motion.span>
    )
}

export default TextThree
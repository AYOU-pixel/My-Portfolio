"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

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
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        if (reducedMotion) return;
        
        let currentIndex = 0
        const timeoutId = setTimeout(() => {
            intervalRef.current = setInterval(() => {
                if (currentIndex <= text.length) {
                    setDisplayText(text.slice(0, currentIndex))
                    currentIndex++
                } else {
                    if (intervalRef.current) clearInterval(intervalRef.current);
                }
            }, speed)
        }, delay)

        return () => {
            clearTimeout(timeoutId);
            if (intervalRef.current) clearInterval(intervalRef.current);
        }
    }, [text, speed, delay, reducedMotion])

    return (
        <motion.span
            className={className}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            aria-hidden="true"
        >
            {displayText}
        </motion.span>
    )
}

export default TextThree;
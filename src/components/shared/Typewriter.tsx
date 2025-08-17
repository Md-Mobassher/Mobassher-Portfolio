"use client";

import { useEffect, useState } from "react";

interface TypewriterProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
}

const Typewriter = ({
  text,
  speed = 100,
  delay = 0,
  className = "",
}: TypewriterProps) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (delay > 0) {
      const timer = setTimeout(() => {
        setIsTyping(true);
      }, delay);
      return () => clearTimeout(timer);
    } else {
      setIsTyping(true);
    }
  }, [delay]);

  useEffect(() => {
    if (!isTyping) return;

    if (!isDeleting && currentIndex < text.length) {
      // Typing phase
      const timer = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timer);
    } else if (!isDeleting && currentIndex === text.length) {
      // Pause at the end before deleting
      const timer = setTimeout(() => {
        setIsDeleting(true);
      }, 1000); // Wait 1 second before deleting

      return () => clearTimeout(timer);
    } else if (isDeleting && currentIndex > 0) {
      // Deleting phase
      const timer = setTimeout(() => {
        setDisplayText((prev) => prev.slice(0, -1));
        setCurrentIndex((prev) => prev - 1);
      }, speed / 2); // Delete faster than typing

      return () => clearTimeout(timer);
    } else if (isDeleting && currentIndex === 0) {
      // Reset for next cycle
      setIsDeleting(false);
      setDisplayText("");
    }
  }, [currentIndex, text, speed, isTyping, isDeleting]);

  return (
    <span className={className}>
      {displayText}
      <span className={`animate-pulse ${className} font-extralight`}>|</span>
    </span>
  );
};

export default Typewriter;

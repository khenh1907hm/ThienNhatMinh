'use client';

import { useState, useEffect, useRef } from 'react';

interface TypingEffectProps {
  texts: string[];
  speed?: number;
  deleteSpeed?: number;
  pauseTime?: number;
  className?: string;
}

export default function TypingEffect({
  texts,
  speed = 80,
  deleteSpeed = 40,
  pauseTime = 2000,
  className = '',
}: TypingEffectProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (texts.length === 0) return;

    const currentFullText = texts[currentTextIndex];
    if (!currentFullText) return;

    // Clear previous timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (charIndex < currentFullText.length) {
          setCurrentText(currentFullText.substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        } else {
          // Finished typing, wait then start deleting
          timeoutRef.current = setTimeout(() => {
            setIsDeleting(true);
          }, pauseTime);
        }
      } else {
        // Deleting
        if (charIndex > 0) {
          setCurrentText(currentFullText.substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        } else {
          // Finished deleting, move to next text
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % texts.length);
          setCharIndex(0);
        }
      }
    }, isDeleting ? deleteSpeed : speed);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [charIndex, isDeleting, currentTextIndex, texts, speed, deleteSpeed, pauseTime]);

  // Reset when texts change
  useEffect(() => {
    setCurrentTextIndex(0);
    setCurrentText('');
    setIsDeleting(false);
    setCharIndex(0);
  }, [texts]);

  return (
    <span className={className}>
      {currentText}
      <span className="inline-block w-0.5 h-[1em] bg-current ml-1 animate-pulse" />
    </span>
  );
}


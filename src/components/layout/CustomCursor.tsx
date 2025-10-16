'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const CURSOR_NORMAL_SRC = "https://i.ibb.co/BHYtFCV2/7d5630edbe3641611737b87dcc508641.png";
const CURSOR_POINTER_SRC = "https://i.ibb.co/8DqCpksM/40663.png";


export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isClicking, setIsClicking] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    document.body.classList.add('hide-cursor');
    
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e: MouseEvent) => {
      if (
        e.target instanceof Element &&
        (e.target.closest('a') || e.target.closest('button') || e.target.closest('[role="button"]'))
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };
    
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.body.addEventListener('mouseover', handleMouseOver);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);


    return () => {
      document.body.classList.remove('hide-cursor');
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.removeEventListener('mouseover', handleMouseOver);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const cursorSrc = isHovering ? CURSOR_POINTER_SRC : CURSOR_NORMAL_SRC;

  return (
    <div
      className={cn(
        "pointer-events-none fixed top-0 left-0 z-[9999] transition-transform duration-75",
        !isVisible && "opacity-0"
      )}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
      }}
    >
      <Image
        src={cursorSrc}
        alt="cursor tesoura"
        width={32}
        height={32}
        className={cn(
            "transition-all",
            isClicking ? 'rotate-[-25deg] scale-90' : 'rotate-0',
            isHovering ? 'scale-125' : 'scale-100'
        )}
      />
    </div>
  );
}

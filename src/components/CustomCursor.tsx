"use client";

import { useState, useEffect, useRef } from 'react';
import * as Tone from 'tone';
import { ScissorIcon } from './icons/ScissorIcon';

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isClicking, setIsClicking] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const synthRef = useRef<Tone.NoiseSynth | null>(null);

  useEffect(() => {
    // Initialize sound
    synthRef.current = new Tone.NoiseSynth({
      noise: { type: 'white' },
      envelope: { attack: 0.001, decay: 0.05, sustain: 0 }
    }).toDestination();

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => {
      setIsClicking(true);
      if (Tone.context.state !== 'running') {
        Tone.start();
      }
      synthRef.current?.triggerAttackRelease('32n');
    };
    
    const handleMouseUp = () => {
      setIsClicking(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      synthRef.current?.dispose();
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-50 transition-transform duration-75 ease-out"
      style={{
        transform: `translate(${position.x}px, ${position.y}px) rotate(-30deg)`,
      }}
    >
      <ScissorIcon isClicking={isClicking} />
    </div>
  );
}

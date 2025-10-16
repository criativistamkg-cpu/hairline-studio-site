"use client";

import { useState, useEffect, useRef } from 'react';
import * as Tone from 'tone';
import { ScissorIcon } from './icons/ScissorIcon';

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isClicking, setIsClicking] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const synthRef = useRef<Tone.MetalSynth | null>(null);

  useEffect(() => {
    // Initialize sound for a more realistic metallic snip
    synthRef.current = new Tone.MetalSynth({
      frequency: 400,
      envelope: { attack: 0.001, decay: 0.08, release: 0.05 },
      harmonicity: 3.1,
      modulationIndex: 32,
      resonance: 4000,
      octaves: 1.5
    }).toDestination();
    
    synthRef.current.volume.value = -12;


    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => {
      setIsClicking(true);
      if (Tone.context.state !== 'running') {
        Tone.start();
      }
      synthRef.current?.triggerAttackRelease('C4', '32n');
    };
    
    const handleMouseUp = () => {
      setIsClicking(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    
    // Hide the default cursor
    document.body.style.cursor = 'none';

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      synthRef.current?.dispose();
      // Restore default cursor on cleanup
      document.body.style.cursor = 'auto';
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-50 transition-transform duration-75 ease-out"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
    >
      <ScissorIcon isClicking={isClicking} />
    </div>
  );
}

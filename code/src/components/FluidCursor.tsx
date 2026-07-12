import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { FluidSimulation } from './FluidSimulation';

export const FluidCursor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const simulationRef = useRef<any>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const config = {
      simResolution: 256,
      dyeResolution: 1024,
      curl: 15,
      pressureIterations: 50,
      velocityDissipation: 0.95,
      dyeDissipation: 0.90,
      splatRadius: 0.072,
      forceStrength: 5.0,
      pressureDecay: 0.75,
      threshold: 0.2,
      edgeSoftness: 0.5,
      inkColor: new THREE.Color(1, 1, 1),
    };

    simulationRef.current = new FluidSimulation(canvasRef.current, config);

    return () => {
      if (simulationRef.current) {
        simulationRef.current.destroy();
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-[100]"
      style={{ width: '100%', height: '100%', display: 'block', mixBlendMode: 'difference' }}
    />
  );
};

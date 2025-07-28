'use client';
import React, { useState, useEffect } from 'react';
import { Terminal as TerminalIcon } from 'lucide-react';
import Terminal from './Terminal';

const Portfolio: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isSplineLoaded, setIsSplineLoaded] = useState(false);

  useEffect(() => {
    // Load Spline script dynamically
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://unpkg.com/@splinetool/viewer@1.10.37/build/spline-viewer.js';
    script.onload = () => setIsSplineLoaded(true);
    document.body.appendChild(script);

    // Time updater
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => {
      clearInterval(timer);
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono overflow-hidden">
      {/* Header */}
      <div className="bg-gray-900 border-b border-green-400/20 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <TerminalIcon className="w-6 h-6 text-green-400" />
            <div>
              <h1 className="text-2xl font-bold text-green-400">Rudraksh Tripathi</h1>
              <p className="text-green-300/80 text-sm">Software Engineer</p>
            </div>
          </div>
          <div className="text-green-300/60 text-sm">
            {currentTime.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex h-[calc(100vh-80px)]">
        {/* Left - Spline ID Card */}
        <div className="w-1/2 h-full bg-gray-900/50 border-r border-green-400/20">
          {isSplineLoaded && (
            <spline-viewer
              url="https://prod.spline.design/ouseHh09WkhkBVGL/scene.splinecode"
              style={{
                width: '100%',
                height: '100%',
                border: '10',
              }}
            ></spline-viewer>
          )}
        </div>

        {/* Right - Terminal */}
        <div className="w-1/2 flex flex-col">
          <Terminal />
        </div>
      </div>
    </div>
  );
};

export default Portfolio;

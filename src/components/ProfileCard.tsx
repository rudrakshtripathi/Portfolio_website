'use client';
import React, { useEffect } from 'react';

const PortfolioCardLayout: React.FC = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://unpkg.com/@splinetool/viewer@1.10.37/build/spline-viewer.js';
    document.body.appendChild(script);
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-950 text-green-400 overflow-hidden">
      
      {/* Left Side - 3D ID Card + Name */}
      <div className="w-full max-w-sm bg-gray-900 border-r border-green-400/20 flex flex-col items-center justify-center px-4 py-10">
        <div className="w-full aspect-[3/4] rounded-lg overflow-hidden mb-6">
          <spline-viewer url="https://prod.spline.design/ouseHh09WkhkBVGL/scene.splinecode" />
        </div>
        <div className="text-center">
          <h1 className="text-xl font-bold text-green-400">Rudraksh Tripathi</h1>
          <p className="text-green-300/70 text-sm">Full Stack Developer</p>
        </div>
      </div>

      {/* Right Side - Terminal */}
      <div className="flex-1 bg-black text-green-400 font-mono p-6 overflow-auto">
        <div className="flex justify-between text-green-400 text-xs mb-2">
          <span>rudraksh@portfolio:~</span>
          <span>{new Date().toLocaleString('en-GB')}</span>
        </div>

        <div className="text-green-300/90 leading-relaxed whitespace-pre-wrap">
          Welcome to my interactive 'AI powered' portfolio terminal!  
          <br />
          Type 'help' to see available commands.
          <br />
          <br />
          Available commands: help | about | skills | projects | experience | education | certifications | leadership | contact | sudo
          <br />
          <br />
          <span className="text-green-500">rudraksh@portfolio:~$</span> Type a command...
        </div>
      </div>
    </div>
  );
};

export default PortfolioCardLayout;


import React from 'react';

interface TerminalOutputProps {
  children: React.ReactNode;
}

const TerminalOutput: React.FC<TerminalOutputProps> = ({ children }) => {
  return (
    <div className="text-white whitespace-pre-wrap">
      {children}
    </div>
  );
};

export default TerminalOutput;
import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight } from 'lucide-react';
import TerminalOutput from './TerminalOutput';
import { commands } from '../data/commands';

interface TerminalLine {
  id: number;
  command: string;
  output: string | React.ReactNode;
  timestamp: Date;
}

const Terminal: React.FC = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<TerminalLine[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Welcome message
    const welcomeMessage = {
      id: 0,
      command: 'welcome',
      output: (
        <div className="space-y-2">
          <div className="text-[#00FF00]">Welcome to my interactive 'AI powered' portfolio terminal!</div>
          <div className="text-[#00FF00]">Type 'help' to see available commands.</div>
          <div className="text-[#00FF00] text-sm">
            Available commands: {Object.keys(commands).join(' | ')}
          </div>
        </div>
      ),
      timestamp: new Date()
    };
    setHistory([welcomeMessage]);
  }, []);

  useEffect(() => {
    // Auto-focus input
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    // Scroll to bottom when new output is added
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.trim().toLowerCase();
    const newHistory = [...commandHistory, input];
    setCommandHistory(newHistory);
    setHistoryIndex(-1);

    let output: string | React.ReactNode = '';

    if (commands[cmd]) {
      output = commands[cmd]();
    } else if (cmd === 'clear') {
      // Keep only the welcome message when clearing
      const welcomeMessage = {
        id: 0,
        command: 'welcome',
        output: (
          <div className="space-y-2">
            <div className="text-[#00FF00]">Welcome to my interactive 'AI powered' portfolio terminal!</div>
            <div className="text-[#00FF00]">Type 'help' to see available commands.</div>
            <div className="text-[#00FF00] text-sm">
              Available commands: {Object.keys(commands).join(' | ')}
            </div>
          </div>
        ),
        timestamp: new Date()
      };
      setHistory([welcomeMessage]);
      setInput('');
      return;
    } else {
      output = (
        <div className="text-white">
          Command not found: {cmd}. Type 'help' for available commands.
        </div>
      );
    }

    const newLine: TerminalLine = {
      id: Date.now(),
      command: input,
      output,
      timestamp: new Date()
    };

    setHistory(prev => [...prev, newLine]);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  return (
    <div className="flex flex-col h-full bg-black">
      {/* Terminal Header */}
      <div className="bg-gray-900 border-b border-green-400/20 px-4 py-2 flex items-center">
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <div className="ml-4 text-[#00FF00] text-sm">rudraksh@portfolio:~</div>
      </div>

      {/* Terminal Content */}
      <div ref={terminalRef} className="flex-1 p-4 overflow-y-auto">
        {/* Command History */}
        {history.map((line) => (
          <div key={line.id} className="mb-4">
            {line.command !== 'welcome' && (
              <div className="flex items-center text-[#00FF00] mb-1">
                <span className="text-[#00FF00]">rudraksh@portfolio:~$</span>
                <ChevronRight className="w-4 h-4 mx-1" />
                <span>{line.command}</span>
              </div>
            )}
            <div className="ml-0">
              <TerminalOutput>{line.output}</TerminalOutput>
            </div>
          </div>
        ))}

        {/* Current Input */}
        <form onSubmit={handleSubmit} className="flex items-center">
          <span className="text-[#00FF00] mr-2">rudraksh@portfolio:~$</span>
          <ChevronRight className="w-4 h-4 mr-2 text-[#00FF00]" />
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-[#00FF00] outline-none caret-[#00FF00]"
            placeholder="Type a command..."
          />
          <span className="animate-pulse text-[#00FF00]">█</span>
        </form>
      </div>
    </div>
  );
};

export default Terminal;
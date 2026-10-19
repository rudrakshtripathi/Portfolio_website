import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ChevronRight, Copy, CornerDownLeft, Maximize2, Minus, RotateCcw } from 'lucide-react';
import TerminalOutput from './TerminalOutput';
import { commands } from '../data/commands';
import { ExternalLink, projects, skillGroups } from '../data/portfolio';

interface TerminalLine { id: number; command: string; output: React.ReactNode; }
interface TerminalProps { compact: boolean; onCompactToggle: () => void; onFocusToggle: () => void; theme: string; onThemeChange: (theme: string) => void; }

const aliases: Record<string, string> = { work: 'experience', mail: 'contact', repo: 'projects', cv: 'resume' };
const commandNames = ['help', 'about', 'skills', 'projects', 'project', 'experience', 'education', 'certifications', 'leadership', 'contact', 'resume', 'status', 'now', 'availability', 'theme', 'history', 'clear', 'clear-history', 'reset', 'copy', 'sudo'];
const quickCommands = ['about', 'projects', 'skills', 'experience', 'contact'];

const closestCommand = (value: string) => {
  const distance = (a: string, b: string) => {
    const matrix = Array.from({ length: b.length + 1 }, (_, row) => [row]);
    for (let column = 0; column <= a.length; column += 1) matrix[0][column] = column;
    for (let row = 1; row <= b.length; row += 1) for (let column = 1; column <= a.length; column += 1) matrix[row][column] = Math.min(matrix[row - 1][column] + 1, matrix[row][column - 1] + 1, matrix[row - 1][column - 1] + Number(a[column - 1] !== b[row - 1]));
    return matrix[b.length][a.length];
  };
  const match = commandNames.map((command) => ({ command, score: distance(value, command) })).sort((a, b) => a.score - b.score)[0];
  return match && match.score <= 3 ? match.command : null;
};

const HelpOutput: React.FC = () => <div className="space-y-3">
  <p className="terminal-kicker">COMMAND DIRECTORY</p>
  <div className="terminal-command-grid">
    <span><b>about</b> profile and focus</span><span><b>projects</b> selected work</span><span><b>project devmind</b> project detail</span><span><b>skills ai</b> skill category</span><span><b>resume</b> professional snapshot</span><span><b>contact</b> get in touch</span><span><b>copy email</b> copy contact info</span><span><b>theme amber</b> change palette</span><span><b>status</b> current availability</span><span><b>history</b> recent commands</span>
  </div>
  <p className="terminal-muted">Use ↑ ↓ for history · Tab to autocomplete · <code>projects --ai</code> to filter.</p>
</div>;

const SkillsOutput: React.FC<{ group?: string }> = ({ group }) => {
  const groups = group && skillGroups[group] ? { [group]: skillGroups[group] } : skillGroups;
  return <div className="space-y-3"><p className="terminal-kicker">{group ? `${group.toUpperCase()} TOOLKIT` : 'TECHNICAL TOOLKIT'}</p>{Object.entries(groups).map(([name, skills]) => <div key={name}><span className="terminal-label">{name}</span><div className="terminal-tags">{skills.map((skill) => <span key={skill}>{skill}</span>)}</div></div>)}</div>;
};

const ProjectsOutput: React.FC<{ filter?: string; onRun: (command: string) => void }> = ({ filter, onRun }) => {
  const normalized = filter?.replace('--', '');
  const selected = ['ai', 'web', 'python', 'live'].includes(normalized || '') ? projects.filter((project) => project.categories.includes(normalized as 'ai' | 'web' | 'python' | 'live')) : projects;
  return <div className="space-y-3"><div className="flex flex-wrap items-center gap-2"><p className="terminal-kicker">SELECTED WORK</p><span className="terminal-muted">{filter ? `filter: ${filter}` : 'use projects --ai / --web / --python / --live'}</span></div>{selected.map((project) => <article key={project.id} className="terminal-project"><div className="flex flex-wrap justify-between gap-2"><h3>{project.title}</h3><span className="terminal-label">{project.categories.join(' · ')}</span></div><p>{project.summary}</p><div className="terminal-tags">{project.stack.slice(0, 4).map((item) => <span key={item}>{item}</span>)}</div><button type="button" className="terminal-action" onClick={() => onRun(`project ${project.id}`)}>View highlights <CornerDownLeft size={14} /></button></article>)}</div>;
};

const ProjectOutput: React.FC<{ id: string; onRun: (command: string) => void }> = ({ id, onRun }) => {
  const project = projects.find((item) => item.id === id);
  if (!project) return <div>Project not found. Try <code>project devmind</code>, <code>project cyberpaste</code>, <code>project timetable</code>, or <code>project auracalm</code>.</div>;
  return <article className="space-y-3 terminal-project terminal-project-detail"><div><p className="terminal-kicker">PROJECT FILE / {project.id.toUpperCase()}</p><h3>{project.title}</h3></div><p>{project.summary}</p><div><span className="terminal-label">Core stack</span><div className="terminal-tags">{project.stack.map((item) => <span key={item}>{item}</span>)}</div></div><div><span className="terminal-label">Technical challenge</span><p>{project.challenge}</p></div><div><span className="terminal-label">Highlights</span><ul className="terminal-list">{project.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul></div><div className="flex flex-wrap gap-4">{project.liveUrl && <ExternalLink href={project.liveUrl}>↗ Live demo</ExternalLink>}{project.githubUrl && <ExternalLink href={project.githubUrl}>↗ Source code</ExternalLink>}<button type="button" className="terminal-action" onClick={() => onRun('projects')}>← Back to projects</button></div></article>;
};

const ResumeOutput: React.FC = () => <div className="space-y-3"><p className="terminal-kicker">PROFESSIONAL SNAPSHOT</p><div className="terminal-project"><h3>Rudraksh Tripathi · Software Engineer</h3><p>Building practical AI systems, developer platforms, and full-stack web experiences.</p><div className="terminal-tags"><span>AI systems</span><span>RAG</span><span>FastAPI</span><span>React</span><span>TypeScript</span></div></div><div className="flex flex-wrap gap-4"><ExternalLink href="/Rudraksh_Tripathi_RESUME.pdf">↗ View résumé</ExternalLink><a className="terminal-link" href="/Rudraksh_Tripathi_RESUME.pdf" download="Rudraksh_Tripathi_RESUME.pdf">↓ Download résumé</a></div><p className="terminal-muted">Use <code>experience</code>, <code>education</code>, and <code>contact</code> to explore the portfolio interactively.</p></div>;
const WelcomeOutput: React.FC<{ onRun: (command: string) => void }> = ({ onRun }) => <div className="space-y-3"><p className="terminal-kicker">SYSTEM READY</p><p className="text-terminal">Welcome to Rudraksh’s interactive developer portfolio.</p><p className="terminal-muted">Start with a command or choose a shortcut.</p><div className="terminal-quick-actions">{quickCommands.map((command) => <button type="button" key={command} onClick={() => onRun(command)}>{command}</button>)}</div><p className="terminal-muted">Use ↑ ↓ for history · Tab to autocomplete · type <code>help</code> for the directory.</p></div>;

const Terminal: React.FC<TerminalProps> = ({ compact, onCompactToggle, onFocusToggle, theme, onThemeChange }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<TerminalLine[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const runCommandRef = useRef<(command: string) => void>(() => undefined);
  const addLine = useCallback((command: string, output: React.ReactNode) => setHistory((previous) => [...previous, { id: Date.now() + Math.random(), command, output }]), []);
  const reset = useCallback(() => setHistory([{ id: 0, command: 'welcome', output: <WelcomeOutput onRun={(command) => runCommandRef.current(command)} /> }]), []);

  const runCommand = useCallback(async (rawCommand: string) => {
    const trimmed = rawCommand.trim(); if (!trimmed) return;
    const [first, ...rest] = trimmed.toLowerCase().split(/\s+/); const command = aliases[first] || first; const args = rest.join(' ');
    if (!['clear', 'reset'].includes(command)) setCommandHistory((previous) => { const next = [...previous, trimmed].slice(-30); localStorage.setItem('portfolio-command-history', JSON.stringify(next)); return next; });
    setHistoryIndex(-1);
    const output = (() => {
      if (command === 'help') return <HelpOutput />;
      if (command === 'skills') return <SkillsOutput group={args} />;
      if (command === 'projects') return <ProjectsOutput filter={args} onRun={(next) => void runCommand(next)} />;
      if (command === 'project') return <ProjectOutput id={args.replace('project-', '')} onRun={(next) => void runCommand(next)} />;
      if (command === 'resume') return <ResumeOutput />;
      if (command === 'status' || command === 'now' || command === 'availability') return <div className="space-y-2"><p className="terminal-kicker">CURRENT STATUS</p><p><b>Status:</b> Building AI-powered developer tools</p><p><b>Focus:</b> RAG systems, full-stack engineering, and agentic workflows</p><p><b>Open to:</b> Internship, full-time, and freelance opportunities</p><p><b>Location:</b> India · Remote-friendly</p></div>;
      if (command === 'theme') { const requested = args || 'green'; if (!['green', 'amber', 'blue', 'mono'].includes(requested)) return <div>Available themes: green, amber, blue, mono.</div>; onThemeChange(requested); return <div>Theme switched to <b>{requested}</b>.</div>; }
      if (command === 'history') return <div className="space-y-1"><p className="terminal-kicker">RECENT COMMANDS</p>{commandHistory.length ? commandHistory.map((item, index) => <p key={`${item}-${index}`}><span className="terminal-muted">{String(index + 1).padStart(2, '0')}</span> {item}</p>) : <p>No prior commands in this session.</p>}</div>;
      if (command === 'clear-history') { localStorage.removeItem('portfolio-command-history'); setCommandHistory([]); return <div>Saved command history cleared.</div>; }
      if (command === 'copy' || (command === 'contact' && args === '--copy email')) { const target = command === 'contact' ? 'email' : args; const values: Record<string, string> = { email: 'work.rudrakshtripathi@gmail.com', github: 'https://github.com/rudrakshtripathi', linkedin: 'https://www.linkedin.com/in/rudraksh--tripathi/' }; if (!values[target]) return <div>Use <code>copy email</code>, <code>copy github</code>, or <code>copy linkedin</code>.</div>; void navigator.clipboard?.writeText(values[target]); return <div><Copy size={14} className="inline mr-1" />{target} copied to clipboard.</div>; }
      if (command === 'clear') { setHistory([]); return null; }
      if (command === 'reset') { reset(); return null; }
      if (commands[command]) return commands[command]();
      const suggestion = closestCommand(command); return <div>Command not found: <b>{command}</b>. {suggestion ? <>Did you mean <button type="button" className="terminal-action" onClick={() => void runCommand(suggestion)}>{suggestion}</button>?</> : <>Type <code>help</code> to see available commands.</>}</div>;
    })();
    if (command !== 'clear' && command !== 'reset') addLine(trimmed, output);
    setInput('');
  }, [addLine, commandHistory, onThemeChange, reset]);

  runCommandRef.current = (command) => { void runCommand(command); };

  useEffect(() => { const saved = localStorage.getItem('portfolio-command-history'); if (saved) { try { setCommandHistory(JSON.parse(saved)); } catch { localStorage.removeItem('portfolio-command-history'); } } const fromUrl = new URLSearchParams(window.location.search).get('command'); setHistory([{ id: 0, command: 'welcome', output: <WelcomeOutput onRun={(next) => runCommandRef.current(next)} /> }]); if (fromUrl && /^[a-z0-9\s-]+$/i.test(fromUrl)) window.setTimeout(() => runCommandRef.current(fromUrl.replace('-', ' ')), 100); }, []);
  useEffect(() => { if (terminalRef.current) terminalRef.current.scrollTop = terminalRef.current.scrollHeight; }, [history]);
  useEffect(() => { inputRef.current?.focus(); }, []);
  const suggestions = useMemo(() => input ? commandNames.filter((command) => command.startsWith(input.toLowerCase().split(' ')[0])).slice(0, 5) : [], [input]);
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => { if (event.key === 'Tab' && suggestions[0]) { event.preventDefault(); setInput(suggestions[0]); return; } if (event.key === 'ArrowUp') { event.preventDefault(); if (historyIndex < commandHistory.length - 1) { const next = historyIndex + 1; setHistoryIndex(next); setInput(commandHistory[commandHistory.length - 1 - next]); } } else if (event.key === 'ArrowDown') { event.preventDefault(); if (historyIndex > 0) { const next = historyIndex - 1; setHistoryIndex(next); setInput(commandHistory[commandHistory.length - 1 - next]); } else { setHistoryIndex(-1); setInput(''); } } };

  return <section id="terminal" className={`terminal-window ${compact ? 'terminal-compact' : ''}`} aria-label="Interactive portfolio terminal"><header className="terminal-header"><div className="terminal-controls" aria-label="Terminal controls"><button type="button" aria-label="Reset terminal" title="Reset terminal" className="control-red" onClick={reset}><RotateCcw size={11} /></button><button type="button" aria-label="Toggle compact terminal" title="Toggle compact terminal" className="control-yellow" onClick={onCompactToggle}><Minus size={13} /></button><button type="button" aria-label="Toggle terminal focus" title="Toggle terminal focus" className="control-green" onClick={onFocusToggle}><Maximize2 size={12} /></button></div><div><span>rudraksh@portfolio</span><span className="terminal-muted"> : interactive-session</span></div><span className="terminal-theme-name">{theme}</span></header><div ref={terminalRef} className="terminal-body" aria-live="polite">{history.map((line) => <div key={line.id} className="terminal-line">{line.command !== 'welcome' && <div className="terminal-prompt"><span>rudraksh@portfolio:~$</span><ChevronRight size={15} /><span>{line.command}</span></div>}<TerminalOutput>{line.output}</TerminalOutput></div>)}<form onSubmit={(event) => { event.preventDefault(); void runCommand(input); }} className="terminal-input-row"><label className="sr-only" htmlFor="terminal-command">Enter a portfolio command</label><span>rudraksh@portfolio:~$</span><ChevronRight size={16} /><input id="terminal-command" ref={inputRef} value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={handleKeyDown} placeholder="Type a command..." autoComplete="off" /><span className="terminal-cursor" aria-hidden="true">█</span></form>{suggestions.length > 0 && <div className="terminal-suggestions" aria-label="Command suggestions">{suggestions.map((suggestion) => <button key={suggestion} type="button" onClick={() => setInput(suggestion)}>{suggestion}</button>)}</div>}</div></section>;
};

export default Terminal;

import React, { useEffect, useState } from 'react';
import { ArrowDown, Code2, Github, Linkedin, Terminal as TerminalIcon } from 'lucide-react';
import Terminal from './Terminal';

const themeValues: Record<string, { accent: string; glow: string; soft: string }> = {
  green: { accent: '#56f39a', glow: '86, 243, 154', soft: '#c8f9dc' },
  amber: { accent: '#ffc85c', glow: '255, 200, 92', soft: '#ffe8b3' },
  blue: { accent: '#73c8ff', glow: '115, 200, 255', soft: '#d4efff' },
  mono: { accent: '#e6e8eb', glow: '230, 232, 235', soft: '#f5f5f5' },
};

const BootSequence: React.FC = () => <div className="boot-sequence" role="status" aria-label="Loading portfolio">
  <TerminalIcon size={28} />
  <div><p>Booting portfolio kernel...</p><p>Loading selected work...</p><p>Connecting developer profile...</p><p className="boot-ready">System ready.</p></div>
</div>;

const ProfileFallback: React.FC = () => <div className="profile-fallback">
  <div className="profile-monogram">RT</div>
  <p className="terminal-kicker">IDENTITY MODULE</p>
  <h2>Rudraksh<br />Tripathi</h2>
  <p>Software Engineer building useful AI and web systems.</p>
  <div className="profile-skills"><span>AI systems</span><span>Full stack</span><span>RAG</span></div>
  <div className="profile-links"><a href="https://github.com/rudrakshtripathi" target="_blank" rel="noopener noreferrer" aria-label="Rudraksh Tripathi on GitHub"><Github size={17} /></a><a href="https://www.linkedin.com/in/rudraksh--tripathi/" target="_blank" rel="noopener noreferrer" aria-label="Rudraksh Tripathi on LinkedIn"><Linkedin size={17} /></a></div>
</div>;

const Portfolio: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [splineStatus, setSplineStatus] = useState<'loading' | 'ready' | 'failed'>('loading');
  const [theme, setTheme] = useState('green');
  const [compact, setCompact] = useState(false);
  const [focusTerminal, setFocusTerminal] = useState(false);
  const [booting, setBooting] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme && themeValues[savedTheme]) setTheme(savedTheme);
    if (!reducedMotion && !sessionStorage.getItem('portfolio-booted')) {
      setBooting(true);
      const timeout = window.setTimeout(() => { sessionStorage.setItem('portfolio-booted', 'true'); setBooting(false); }, 1500);
      return () => window.clearTimeout(timeout);
    }
    return undefined;
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => setCurrentTime(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (booting || window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setSplineStatus('failed'); return undefined; }
    const existing = document.querySelector('script[data-spline-viewer]');
    if (existing) { setSplineStatus('ready'); return undefined; }
    const script = document.createElement('script');
    script.type = 'module'; script.src = 'https://unpkg.com/@splinetool/viewer@1.10.37/build/spline-viewer.js'; script.dataset.splineViewer = 'true';
    const timeout = window.setTimeout(() => setSplineStatus('failed'), 9000);
    script.onload = () => { window.clearTimeout(timeout); setSplineStatus('ready'); };
    script.onerror = () => { window.clearTimeout(timeout); setSplineStatus('failed'); };
    document.body.appendChild(script);
    return () => window.clearTimeout(timeout);
  }, [booting]);

  const setActiveTheme = (next: string) => { setTheme(next); localStorage.setItem('portfolio-theme', next); };
  const color = themeValues[theme];
  const style = { '--terminal-accent': color.accent, '--terminal-glow': color.glow, '--terminal-soft': color.soft } as React.CSSProperties;

  return <main className={`portfolio-shell ${focusTerminal ? 'portfolio-focus' : ''}`} style={style}>
    {booting && <BootSequence />}
    <header className="portfolio-header">
      <div className="brand-lockup"><div className="brand-icon"><Code2 size={19} /></div><div><h1>Rudraksh Tripathi</h1><p>Software Engineer · AI systems &amp; full-stack web</p></div></div>
      <div className="header-actions"><span className="live-indicator"><i />Available for opportunities</span><a className="header-resume" href="/Rudraksh_Tripathi_RESUME.pdf" target="_blank" rel="noopener noreferrer">View résumé</a><a className="header-resume" href="/Rudraksh_Tripathi_RESUME.pdf" download="Rudraksh_Tripathi_RESUME.pdf">Download</a><time dateTime={currentTime.toISOString()}>{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</time><a className="mobile-launch" href="#terminal">Launch terminal <ArrowDown size={14} /></a></div>
    </header>
    <div className="portfolio-layout">
      <aside className="profile-panel" aria-label="Interactive profile scene">
        <div className="profile-status"><span className="live-indicator"><i />identity.module</span><span>{splineStatus === 'ready' ? '3D / online' : splineStatus === 'loading' ? 'loading...' : 'fallback / ready'}</span></div>
        {splineStatus === 'loading' && <div className="spline-loader"><div className="spline-loader-mark">RT</div><p>Initializing identity module...</p><div><i /></div></div>}
        {splineStatus === 'ready' && <spline-viewer url="https://prod.spline.design/ouseHh09WkhkBVGL/scene.splinecode" style={{ width: '100%', height: '100%' }} />}
        {splineStatus === 'failed' && <ProfileFallback />}
        <div className="profile-footer"><span>Drag to explore</span><span>↓ terminal commands</span></div>
      </aside>
      <div className="terminal-panel"><Terminal compact={compact} onCompactToggle={() => setCompact((value) => !value)} onFocusToggle={() => setFocusTerminal((value) => !value)} theme={theme} onThemeChange={setActiveTheme} /></div>
    </div>
  </main>;
};

export default Portfolio;

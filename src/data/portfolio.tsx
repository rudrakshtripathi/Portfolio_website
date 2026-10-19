/* eslint-disable react-refresh/only-export-components */
import React from 'react';

export type ProjectCategory = 'ai' | 'web' | 'python' | 'live';

export interface Project {
  id: string;
  title: string;
  summary: string;
  stack: string[];
  categories: ProjectCategory[];
  challenge: string;
  highlights: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export const projects: Project[] = [
  {
    id: 'devmind',
    title: 'DevMind AI',
    summary: 'A multi-agent developer platform for semantic codebase understanding, CI/CD generation, and vulnerability analysis.',
    stack: ['FastAPI', 'LangGraph', 'Google Gemini', 'ChromaDB', 'RAG'],
    categories: ['ai', 'python', 'live'],
    challenge: 'Making an entire codebase searchable and useful in developer workflows without losing context.',
    highlights: ['Semantic code retrieval', 'Agentic developer workflows', 'Asynchronous indexing pipeline'],
    liveUrl: 'https://devmindai-mu.vercel.app/',
    githubUrl: 'https://github.com/rudrakshtripathi/DevMind_AI',
  },
  {
    id: 'cyberpaste',
    title: 'CyberPaste',
    summary: 'A privacy-focused AI-powered pastebin with secure sharing and developer productivity tools.',
    stack: ['Next.js', 'TypeScript', 'Supabase', 'Genkit', 'Google Gemini'],
    categories: ['ai', 'web', 'live'],
    challenge: 'Balancing useful AI assistance with private-by-default sharing.',
    highlights: ['Client-side AES-GCM encryption', 'Configurable sharing controls', 'AI syntax and complexity insights'],
    liveUrl: 'https://cyber-paste.vercel.app/',
  },
  {
    id: 'timetable',
    title: 'Optimized College Timetable Generator',
    summary: 'An optimization system that schedules professors, classrooms, and subjects under real-world constraints.',
    stack: ['React', 'FastAPI', 'Python', 'PostgreSQL', 'Genetic Algorithms'],
    categories: ['python', 'web'],
    challenge: 'Resolving competing scheduling constraints while improving resource utilization.',
    highlights: ['Constraint-aware generation', 'Conflict minimization', 'Balanced academic schedules'],
    githubUrl: 'https://github.com/rudrakshtripathi/Optimized-Professor-Timetable-Generator-using-Nature-Inspired-Algorithms',
  },
  {
    id: 'auracalm',
    title: 'AuraCalm',
    summary: 'A calming wellness experience that analyzes vocal patterns to provide real-time stress feedback.',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Web Audio API'],
    categories: ['ai', 'web', 'live'],
    challenge: 'Turning live voice signals into a gentle, supportive experience.',
    highlights: ['Vocal-pattern analysis', 'Soothing soundscapes', 'Responsive wellness interface'],
    liveUrl: 'https://aura-calm.vercel.app/',
  },
];

export const skillGroups: Record<string, string[]> = {
  frontend: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'HTML5/CSS3'],
  backend: ['Python', 'FastAPI', 'Node.js', 'REST APIs', 'MySQL', 'PostgreSQL'],
  ai: ['LangGraph', 'RAG', 'ChromaDB', 'Google Gemini', 'Embeddings', 'Prompt Design'],
  cloud: ['AWS', 'Google Cloud', 'Azure', 'Docker', 'Kubernetes', 'GitHub Actions'],
};

export const ExternalLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="terminal-link">
    {children}<span className="sr-only"> (opens in a new tab)</span>
  </a>
);

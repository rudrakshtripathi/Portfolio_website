import React from 'react';
import { Code, Briefcase, User, Mail, GraduationCap, Award, Users, Shield, HelpCircle } from 'lucide-react';

export const commands: { [key: string]: () => React.ReactNode } = {
  help: () => (
    <div className="space-y-3">
      <div className="text-white font-semibold flex items-center">
        <HelpCircle className="w-4 h-4 mr-2" />
        Available Commands:
      </div>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="space-y-1">
          <div><span className="text-[#00FF00]">help</span> - <span className="text-white">Show this help message</span></div>
          <div><span className="text-[#00FF00]">about</span> - <span className="text-white">Learn about me</span></div>
          <div><span className="text-[#00FF00]">skills</span> - <span className="text-white">View my technical skills</span></div>
          <div><span className="text-[#00FF00]">projects</span> - <span className="text-white">See my projects</span></div>
          <div><span className="text-[#00FF00]">experience</span> - <span className="text-white">Work experience</span></div>
          <div><span className="text-[#00FF00]">education</span> - <span className="text-white">Educational background</span></div>
        </div>
        <div className="space-y-1">
          <div><span className="text-[#00FF00]">certifications</span> - <span className="text-white">My certifications</span></div>
          <div><span className="text-[#00FF00]">leadership</span> - <span className="text-white">Leadership experience</span></div>
          <div><span className="text-[#00FF00]">contact</span> - <span className="text-white">Get in touch</span></div>
          <div><span className="text-[#00FF00]">sudo</span> - <span className="text-white">Secret command</span></div>
          <div><span className="text-[#00FF00]">clear</span> - <span className="text-white">Clear terminal</span></div>
        </div>
      </div>
    </div>
  ),

  about: () => (
    <div className="space-y-4">
      <div className="text-white font-semibold flex items-center">
        <User className="w-4 h-4 mr-2" />
        About Rudraksh Tripathi
      </div>
      <div className="space-y-2 text-white">
        <p>Hi, I'm Rudraksh Tripathi, an Enthusiastic and results-driven software developer.</p>
        <p>Passionate about building innovative solutions and leveraging technology to optimize processes</p>
        <p>My expertise spans across modern web technologies, cloud platforms, and AI/ML integration.</p>
        <p>Skilled in collaborating within dynamic teams and delivering impactful solutions.</p>
      </div>
      <div className="mt-4 p-3 bg-gray-900/50 rounded border border-green-400/20">
        <div className="text-white text-sm mb-2">Quick Facts:</div>
        <div className="text-white text-sm space-y-1">
          <div>• 🎯 Focus: Modern web technologies & AI-ML Integration</div>
          <div>• 🌟 Experience: Building Several Projects in software engineering</div>
          <div>• 🚀 Passion: Building innovative digital solutions</div>
          <div>• 📍 Location: Available for remote opportunities</div>
        </div>
      </div>
    </div>
  ),

  skills: () => (
    <div className="space-y-4">
      <div className="text-white font-semibold flex items-center">
        <Code className="w-4 h-4 mr-2" />
        Technical Skills
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <div>
            <div className="text-white text-sm mb-2">Frontend Development</div>
            <div className="text-white text-sm space-y-1">
              <div>• HTML5, CSS3, Tailwind CSS</div>
              <div>• React.js, Next.js</div>
              <div>• TypeScript, JavaScript</div>
              <div>• PostMan API, Context API</div>
            </div>
          </div>
          <div>
            <div className="text-white text-sm mb-2">Backend Development</div>
            <div className="text-white text-sm space-y-1">
              <div>• Python, Node.js</div>
              <div>• RESTful APIs, MYSQL</div>
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <div>
            <div className="text-white text-sm mb-2">Database & Cloud</div>
            <div className="text-white text-sm space-y-1">
              <div>• AWS, Google Cloud, Azure</div>
              <div>• Docker, Kubernetes</div>
            </div>
          </div>
          <div>
            <div className="text-white text-sm mb-2">Tools & Others</div>
            <div className="text-white text-sm space-y-1">
              <div>• Git, GitHub, GitLab</div>
              <div>• Figma, Adobe Creative Suite, Canva</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),

  projects: () => (
    <div className="space-y-4">
      <div className="text-white font-semibold flex items-center">
        <Briefcase className="w-4 h-4 mr-2" />
        Featured Projects
      </div>
      <div className="space-y-4">
      <div className="p-4 bg-gray-900/50 rounded border border-green-400/20">
      <div className="text-white font-medium">CyberPaste – Secure AI-Powered Pastebin</div>
      <div className="text-white text-sm mt-1">
      Full-stack pastebin focused on privacy and productivity. Features client-side AES-GCM encryption,
      AI assistant for syntax fixes and complexity insights, multi-file pastes, configurable expiry/access control,
      raw view, and a sleek cyberpunk UI with a command palette.
    </div>
    <div className="text-white text-xs mt-2">
      Tech: Next.js, TypeScript, Tailwind CSS, ShadCN UI, Supabase (PostgreSQL + Auth), Genkit + Google Gemini, Vercel/Firebase Hosting
    </div>
    <div className="mt-2">
      <a href="https://cyber-paste.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-[#00FF00] hover:text-white transition-colors text-xs">
        🌐 Live Demo
      </a>
    </div>
  </div>
</div>

      <div className="space-y-4">
        <div className="p-4 bg-gray-900/50 rounded border border-green-400/20">
          <div className="text-white font-medium">Study Smart (Student Assistant App)</div>
          <div className="text-white text-sm mt-1">
            Full-stack application with AI-driven ssistant designed for students.
            Features include to-do list management, study timer, resource links, and motivational quotes to help students stay organized and focused.
          </div>
          <div className="text-white text-xs mt-2">
            Tech: React, TypeScript, Google Gemini API, Tailwind CSS, Netlify, GitHub Actions
          </div>
          <div className="mt-2">
            <a href="https://studysmart-ai.netlify.app" target="_blank" rel="noopener noreferrer" className="text-[#00FF00] hover:text-white transition-colors text-xs">
              🌐 Live Demo
            </a>
          </div>
        </div>
        <div className="p-4 bg-gray-900/50 rounded border border-green-400/20">
          <div className="text-white font-medium">Visionary Spaces (Virtual Room Designer)</div>
          <div className="text-white text-sm mt-1">
            3D interior design prototype that allows users to visualize and customize room layouts by selecting elements and adjusting the vibe.
          </div>
          <div className="text-white text-xs mt-2">
            Tech: React, TypeScript, Google Gemini API, Tailwind CSS, Netlify, GitHub Actions
          </div>
          <div className="mt-2">
            <a href="https://visionary-spaces.netlify.app" target="_blank" rel="noopener noreferrer" className="text-[#00FF00] hover:text-white transition-colors text-xs">
              🌐 Live Demo
            </a>
          </div>
        </div>
        <div className="space-y-4">
  <div className="p-4 bg-gray-900/50 rounded border border-green-400/20">
    <div className="text-white font-medium">AuraCalm – AI-Powered Stress Level Checker</div>
    <div className="text-white text-sm mt-1">
      Real-time stress detection app that analyzes vocal patterns to check stress levels and deliver calm.
      Features soothing soundscapes, gentle haptics, and relaxing visuals for instant stress relief.
    </div>
    <div className="text-white text-xs mt-2">
      Tech: Next.js 14, TypeScript, Tailwind CSS, Framer Motion, Web Audio API, Navigator Vibration API, Vercel Hosting
    </div>
    <div className="mt-2">
      <a href="https://auracalm.vercel.app" target="_blank" rel="noopener noreferrer" className="text-[#00FF00] hover:text-white transition-colors text-xs">
        🌐 Live Demo
      </a>
    </div>
  </div>
</div>

        <div className="p-4 bg-gray-900/50 rounded border border-green-400/20">
          <div className="text-white font-medium">Invisible Cloak (Computer Vision Project)</div>
          <div className="text-white text-sm mt-1">
            Real-time computer vision project using OpenCV that creates an invisibility effect by masking a specific color.           </div>
          <div className="text-white text-xs mt-2">
            Tech: Python, OpenCV, NumPy
          </div>
          <div className="mt-2">
            <a href="https://github.com/rudrakshtripathi/invisible-cloak" target="_blank" rel="noopener noreferrer" className="text-[#00FF00] hover:text-white transition-colors text-xs">
              🔗 GitHub Repository
            </a>
          </div>
        </div>
      </div>
      <div className="space-y-4">
  <div className="p-4 bg-gray-900/50 rounded border border-green-400/20">
    <div className="text-white font-medium">Jarvis – AI Voice Assistant</div>
    <div className="text-white text-sm mt-1">
      Personal AI-powered voice assistant capable of executing commands, answering queries, and interacting 
      in natural language. Supports speech recognition, text-to-speech, OpenAI-powered conversations, 
      and automating system tasks.
    </div>
    <div className="text-white text-xs mt-2">
      Tech: Python, OpenAI API, SpeechRecognition, Pyttsx3, PyAutoGUI, Webbrowser, Linux Environment
    </div>
    <div className="mt-2">
      <a href="https://github.com/rudrakshtripathi/jarvis-ai-assistant" target="_blank" rel="noopener noreferrer" className="text-[#00FF00] hover:text-white transition-colors text-xs">
        🔗 GitHub Repository
      </a>
    </div>
  </div>
</div>

      <div className="text-white text-sm mt-4">
        💡 View more projects on my GitHub profile
      </div>
    </div>
  ),

  experience: () => (
    <div className="space-y-4">
      <div className="text-white font-semibold flex items-center">
        <Briefcase className="w-4 h-4 mr-2" />
        Work Experience
      </div>
      <div className="space-y-4">
        <div className="p-4 bg-gray-900/50 rounded border border-green-400/20">
          <div className="flex justify-between items-start mb-2">
            <div className="text-white font-medium">Campus Ambassador</div>
            <div className="text-white text-sm">July 2024 - April 2025</div>
          </div>
          <div className="text-white text-sm mb-2">Geek for Geeks</div>
          <div className="text-white text-sm space-y-1">
            <div>• Organized events and workshops to enhance career readiness among peers.</div>
            <div>• Promoted Internshala’s initiatives on campus and assisted students in accessing internship opportunities.</div>
          </div>
        </div>
        <div className="p-4 bg-gray-900/50 rounded border border-green-400/20">
          <div className="flex justify-between items-start mb-2">
            <div className="text-white font-medium">Campus Ambassador</div>
            <div className="text-white text-sm">May 2024 - July 2024</div>
          </div>
          <div className="text-white text-sm mb-2">Internshala</div>
          <div className="text-white text-sm space-y-1">
            <div>• Organized events and workshops to enhance career readiness among peers.</div>
            <div>• Promoted Internshala’s initiatives on campus and assisted students in accessing internship opportunities.</div>
          </div>
        </div>
        <div className="p-4 bg-gray-900/50 rounded border border-green-400/20">
          <div className="flex justify-between items-start mb-2">
            <div className="text-white font-medium">Artificial Intelligence Intern</div>
            <div className="text-white text-sm">Nov 2023 - Jan 2024</div>
          </div>
          <div className="text-white text-sm mb-2">Corizo Edutech Private</div>
          <div className="text-white text-sm space-y-1">
            <div>• Implemented machine learning algorithms to predict Cardiovascular Diseases.</div>
            <div>• Implemented machine learning algorithms for Spotify songs genre segmentation</div>
          </div>
        </div>
      </div>
    </div>
  ),

  education: () => (
    <div className="space-y-4">
      <div className="text-white font-semibold flex items-center">
        <GraduationCap className="w-4 h-4 mr-2" />
        Education
      </div>
      <div className="space-y-3">
        <div className="p-4 bg-gray-900/50 rounded border border-green-400/20">
          <div className="flex justify-between items-start mb-2">
            <div className="text-white font-medium">Bachelors of Computer Science</div>
            <div className="text-white text-sm">2023 - Present</div>
          </div>
          <div className="text-white text-sm mb-2">Birla Institute of Technology</div>
          <div className="text-white text-sm">
             Computer Science & Engineering 
          </div>
        </div>
      </div>
    </div>
  ),

  certifications: () => (
    <div className="space-y-4">
      <div className="text-white font-semibold flex items-center">
        <Award className="w-4 h-4 mr-2" />
        Certifications & Achievements
      </div>
      <div className="space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-3 bg-gray-900/50 rounded border border-green-400/20">
            <div className="text-white text-sm font-medium">Goldman Sachs - Software Engineering</div>
            <div className="text-white text-xs">Forage • Feb 2025</div>
          </div>
          <div className="p-3 bg-gray-900/50 rounded border border-green-400/20">
            <div className="text-white text-sm font-medium">Microsoft Azure Cloud Course</div>
            <div className="text-white text-xs">Microsoft • May 2024</div>
          </div>
          <div className="p-3 bg-gray-900/50 rounded border border-green-400/20">
            <div className="text-white text-sm font-medium">Tata Group - Cybersecurity Analyst</div>
            <div className="text-white text-xs">Forage• May 2024</div>
          </div>
          <div className="p-3 bg-gray-900/50 rounded border border-green-400/20">
            <div className="text-white text-sm font-medium">Artificial Intelligence Intern</div>
            <div className="text-white text-xs">Corizo Edutech • Jan 2023</div>
          </div>
        </div>
        <div className="mt-4 p-3 bg-gray-900/50 rounded border border-green-400/20">
          <div className="text-white text-sm mb-2">Achievements:</div>
          <div className="text-white text-sm space-y-1">
            <div>🏆 selected for Phase 2 of the Vultr Hackathon organized by GeeksforGeeks 🎉</div>
            <div>🌟 intern at the International Model United Nations (IMUN)!</div>
          </div>
        </div>
      </div>
    </div>
  ),

  leadership: () => (
    <div className="space-y-4">
      <div className="text-white font-semibold flex items-center">
        <Users className="w-4 h-4 mr-2" />
        Leadership & Community
      </div>
      <div className="space-y-3">
        <div className="p-4 bg-gray-900/50 rounded border border-green-400/20">
          <div className="text-white font-medium mb-2">Tech Lead</div>
          <div className="text-white text-sm space-y-1">
            <div>• Leading a team of 8 developers of Google Developers Club</div>
            <div>• Established code review processes and technical standards</div>
            <div>• selected for Phase 2 of the Vultr Hackathon organized by GeeksforGeeks</div>
          </div>
        </div>
      </div>
    </div>
  ),

  contact: () => (
    <div className="space-y-4">
      <div className="text-white font-semibold flex items-center">
        <Mail className="w-4 h-4 mr-2" />
        Get In Touch
      </div>
      <div className="space-y-3">
        <div className="p-4 bg-gray-900/50 rounded border border-green-400/20">
          <div className="text-white text-sm mb-3">Let's connect and discuss opportunities!</div>
          <div className="space-y-2 text-white text-sm">
            <div className="flex items-center">
              <Mail className="w-4 h-4 mr-2" />
              <a href="mailto:work.rudrakshtripathi@gmail.com" className="hover:text-[#00FF00] transition-colors text-white">
                work.rudrakshtripathi@gmail.com
              </a>
            </div>
            <div className="flex items-center">
              <span className="w-4 h-4 mr-2">💼</span>
              <a href="https://www.linkedin.com/in/rudraksh--tripathi/" target="_blank" rel="noopener noreferrer" className="hover:text-[#00FF00] transition-colors text-white">
                https://www.linkedin.com/in/rudraksh--tripathi/
              </a>
            </div>
            <div className="flex items-center">
              <span className="w-4 h-4 mr-2">🐱</span>
              <a href="https://github.com/rudrakshtripathi" target="_blank" rel="noopener noreferrer" className="hover:text-[#00FF00] transition-colors text-white">
                https://github.com/rudrakshtripathi
              </a>
            </div>
            <div className="flex items-center">
              <span className="w-4 h-4 mr-2">🌐</span>
              <a href="https://portfolio-website-woad-tau-82.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-[#00FF00] transition-colors text-white">
                rudraksh-portfolio.dev
              </a>
            </div>
          </div>
        </div>
        <div className="p-4 bg-gray-900/50 rounded border border-green-400/20">
          <div className="text-white text-sm mb-2">Available for:</div>
          <div className="text-white text-sm space-y-1">
            <div>✅ Full-time opportunities</div>
            <div>✅ Freelance projects</div>
            <div>✅ Technical consulting</div>
            <div>✅ Speaking engagements</div>
          </div>
        </div>
        <div className="text-white text-sm">
          💡 Response time: Usually within 24 hours
        </div>
      </div>
    </div>
  ),

  sudo: () => (
    <div className="space-y-3">
      <div className="text-white font-semibold flex items-center">
        <Shield className="w-4 h-4 mr-2" />
        sudo access granted...
      </div>
      <div className="p-4 bg-red-900/20 border border-red-400/30 rounded">
        <div className="text-red-400 text-sm mb-2">🚨 SECRET CLASSIFIED INFORMATION 🚨</div>
        <div className="text-white text-sm space-y-1">
          <div>• Secret project: Building the next-gen AI assistant</div>
          <div>• Hidden skill: Can debug code in my sleep</div>
          <div>• Coffee consumption: 42 cups per week</div>
          <div>• Favorite debugging tool: console.log() 😄</div>
          <div>• Secret superpower: Reading documentation</div>
        </div>
      </div>
      <div className="text-white text-sm">
        Just kidding! But I do love what I do. 🚀
      </div>
    </div>
  )
};
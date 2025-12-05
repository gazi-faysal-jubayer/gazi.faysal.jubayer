"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useOSStore } from "@/store/useOSStore";
import { PROFILE, SKILLS, EDUCATION, PROJECTS, EXPERIENCE } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface CommandOutput {
  command: string;
  output: string[];
  isError?: boolean;
}

const COMMANDS: Record<string, () => string[]> = {
  help: () => [
    "Available commands:",
    "",
    "  whoami          - Display user information",
    "  skills          - List all skills",
    "  education       - Show education history",
    "  projects        - List all projects",
    "  experience      - Show work experience",
    "  contact         - Display contact information",
    "  clear           - Clear the terminal",
    "  neofetch        - System information",
    "  echo <text>     - Print text to terminal",
    "  date            - Display current date/time",
    "  npm run contact - Open contact info",
    "  git log         - Show recent commits (simulated)",
    "",
    "Type 'help' for this message.",
  ],

  whoami: () => [
    `User: ${PROFILE.name}`,
    `Role: Mechanical Engineer & Full-Stack Developer`,
    `Location: Dhaka, Bangladesh`,
    "",
    PROFILE.bio,
  ],

  skills: () => [
    "╭─────────────────────────────────────╮",
    "│           SKILLS MATRIX             │",
    "╰─────────────────────────────────────╯",
    "",
    "Engineering:",
    ...SKILLS.engineering.map((s) => `  ▸ ${s}`),
    "",
    "Programming:",
    ...SKILLS.programming.map((s) => `  ▸ ${s}`),
  ],

  education: () => [
    "Education History:",
    "",
    ...EDUCATION.map((edu) => [
      `┌─ ${edu.degree}`,
      `│  ${edu.institution}`,
      `│  ${edu.year}`,
      `└─ Location: ${edu.location}`,
      "",
    ]).flat(),
  ],

  projects: () => [
    "Projects:",
    "",
    ...PROJECTS.map((proj, i) => [
      `[${i + 1}] ${proj.title}`,
      `    Type: ${proj.type}`,
      `    ${proj.description}`,
      `    Tech: ${proj.tech.join(", ")}`,
      "",
    ]).flat(),
  ],

  experience: () => [
    "Work Experience:",
    "",
    ...EXPERIENCE.map((exp) => [
      `╔═══════════════════════════════════════`,
      `║ ${exp.title}`,
      `║ ${exp.company} | ${exp.period}`,
      `╟───────────────────────────────────────`,
      `║ ${exp.description}`,
      `╚═══════════════════════════════════════`,
      "",
    ]).flat(),
  ],

  contact: () => [
    "Contact Information:",
    "",
    `  📧 Email:    ${PROFILE.email}`,
    `  🐙 GitHub:   ${PROFILE.github}`,
    `  💼 LinkedIn: ${PROFILE.linkedin}`,
    "",
    "Feel free to reach out!",
  ],

  neofetch: () => {
    const now = new Date();
    return [
      "",
      "        ████████████████████        gazi@portfolio",
      "      ████████████████████████      ──────────────────",
      "    ████████████████████████████    OS: GaziOS v1.0",
      "   ██████████████████████████████   Host: Portfolio Website",
      "  ████████████████████████████████  Kernel: Next.js 14",
      "  ████████          ████████████    Uptime: Since 2024",
      " ████████            ██████████     Packages: npm (node)",
      " ████████  ████████  ██████████     Shell: GaziTerminal",
      " ████████  ████████  ██████████     Resolution: Dynamic",
      " ████████  ████████  ██████████     Theme: Glassmorphism",
      "  ████████          ████████████    Terminal: GaziOS Term",
      "  ████████████████████████████████  CPU: Your Browser",
      "   ██████████████████████████████   Memory: Enough",
      "    ████████████████████████████",
      "      ████████████████████████      " + now.toLocaleDateString(),
      "        ████████████████████",
      "",
    ];
  },

  date: () => {
    const now = new Date();
    return [now.toString()];
  },

  "npm run contact": () => COMMANDS.contact(),

  "git log": () => [
    "commit a3f2e1d (HEAD -> main, origin/main)",
    "Author: Gazi Faysal Jubayer <gazi@example.com>",
    "Date:   " + new Date().toDateString(),
    "",
    "    feat: Added Windows 11 style portfolio",
    "",
    "commit b4c3d2e",
    "Author: Gazi Faysal Jubayer <gazi@example.com>",
    "Date:   " + new Date(Date.now() - 86400000).toDateString(),
    "",
    "    feat: Implemented 3D CAD viewer",
    "",
    "commit c5d4e3f",
    "Author: Gazi Faysal Jubayer <gazi@example.com>",
    "Date:   " + new Date(Date.now() - 172800000).toDateString(),
    "",
    "    init: Initial commit",
  ],

  "git log education": () => COMMANDS.education(),
};

export default function Terminal() {
  const { isDarkMode } = useOSStore();
  const [history, setHistory] = useState<CommandOutput[]>([
    {
      command: "",
      output: [
        "GaziOS Terminal v1.0",
        `Welcome, visitor! Type 'help' for available commands.`,
        "",
      ],
    },
  ]);
  const [currentInput, setCurrentInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [history, scrollToBottom]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const executeCommand = useCallback((cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    
    if (!trimmedCmd) {
      setHistory((prev) => [...prev, { command: "", output: [] }]);
      return;
    }

    if (trimmedCmd === "clear") {
      setHistory([]);
      return;
    }

    // Check for echo command
    if (trimmedCmd.startsWith("echo ")) {
      const text = cmd.trim().substring(5);
      setHistory((prev) => [
        ...prev,
        { command: cmd, output: [text] },
      ]);
      return;
    }

    // Check for exact command match
    const commandFn = COMMANDS[trimmedCmd];
    if (commandFn) {
      setHistory((prev) => [
        ...prev,
        { command: cmd, output: commandFn() },
      ]);
    } else {
      setHistory((prev) => [
        ...prev,
        {
          command: cmd,
          output: [
            `'${cmd}' is not recognized as a command.`,
            "Type 'help' for available commands.",
          ],
          isError: true,
        },
      ]);
    }
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        executeCommand(currentInput);
        setCommandHistory((prev) => [currentInput, ...prev]);
        setCurrentInput("");
        setHistoryIndex(-1);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (historyIndex < commandHistory.length - 1) {
          const newIndex = historyIndex + 1;
          setHistoryIndex(newIndex);
          setCurrentInput(commandHistory[newIndex]);
        }
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        if (historyIndex > 0) {
          const newIndex = historyIndex - 1;
          setHistoryIndex(newIndex);
          setCurrentInput(commandHistory[newIndex]);
        } else if (historyIndex === 0) {
          setHistoryIndex(-1);
          setCurrentInput("");
        }
      } else if (e.key === "Tab") {
        e.preventDefault();
        // Simple tab completion
        const matches = Object.keys(COMMANDS).filter((cmd) =>
          cmd.startsWith(currentInput.toLowerCase())
        );
        if (matches.length === 1) {
          setCurrentInput(matches[0]);
        }
      }
    },
    [currentInput, commandHistory, historyIndex, executeCommand]
  );

  const handleContainerClick = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div
      className={cn(
        "flex flex-col h-full font-mono text-sm",
        isDarkMode ? "bg-[#0c0c0c]" : "bg-[#0c0c0c]"
      )}
      onClick={handleContainerClick}
    >
      {/* Terminal content */}
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto p-4 text-white/90"
      >
        {history.map((entry, i) => (
          <div key={i} className="mb-2">
            {entry.command && (
              <div className="flex items-center gap-2">
                <span className="text-green-400">gazi@portfolio</span>
                <span className="text-gray-400">:</span>
                <span className="text-blue-400">~</span>
                <span className="text-gray-400">$</span>
                <span className="text-white">{entry.command}</span>
              </div>
            )}
            <div
              className={cn(
                "whitespace-pre-wrap",
                entry.isError ? "text-red-400" : "text-white/80"
              )}
            >
              {entry.output.map((line, j) => (
                <div key={j}>{line}</div>
              ))}
            </div>
          </div>
        ))}

        {/* Current input line */}
        <div className="flex items-center gap-2">
          <span className="text-green-400">gazi@portfolio</span>
          <span className="text-gray-400">:</span>
          <span className="text-blue-400">~</span>
          <span className="text-gray-400">$</span>
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full bg-transparent outline-none text-white caret-white"
              autoComplete="off"
              autoCapitalize="off"
              spellCheck={false}
            />
            {/* Blinking cursor effect handled by caret */}
          </div>
        </div>
      </div>
    </div>
  );
}


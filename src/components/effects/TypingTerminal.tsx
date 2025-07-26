"use client";

import { useEffect, useRef, useState } from "react";

type LineEntry =
  | { type: "command"; text: string }
  | { type: "output"; text: string };

type CommandEntry = {
  command: string;
  output?: string;
};

const terminalCommands: CommandEntry[] = [
  { command: "npm install", output: "added 112 packages in 4.2s" },
  { command: "npm run dev", output: "Ready on http://localhost:3000" },
  { command: "npm run build", output: "Compiled successfully in 3.7s" },
  { command: "next dev", output: "Starting Next.js in development mode..." },
  { command: "git pull origin main", output: "Already up to date." },
  {
    command: "git checkout -b feature/ui-refactor",
    output: "Switched to branch 'feature/ui-refactor'",
  },
  {
    command: 'git commit -m "feat: new feature"',
    output: "[feature/ui-refactor] 1 file changed, 42 insertions(+)",
  },
  {
    command: "git push origin feature/ui-refactor",
    output: "Branch pushed successfully 🚀",
  },
  { command: "npx eslint . --fix", output: "3 problems fixed" },
  { command: "npx prettier --write .", output: "Formatted 12 files" },
  {
    command: "docker compose up",
    output: "Containers are running on ports 5432, 3000",
  },
  {
    command: "curl -X GET https://web-craft-falkone.ru/",
    output: '{"status":"ok","items":[1,2,3]}',
  },
  { command: "rm -rf dist", output: "" },
  { command: "echo 'Ready to ship 🚀'", output: "Ready to ship 🚀" },
  {
    command: "fortune",
    output: `"Talk is cheap. Show me the code." — Linus Torvalds`,
  },
  {
    command: "neofetch",
    output: "ReactOS 18.0 | Memory: 64GB | Uptime: 42 days",
  },
  { command: "exit", output: "logout" },
];

export const TypingTerminal = () => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState<LineEntry[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const [cmdIndex, setCmdIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isOutputPhase, setIsOutputPhase] = useState(false);

  const prompt = "alex@devbox:~$";

  useEffect(() => {
    const entry = terminalCommands[cmdIndex];
    if (!entry) return;

    if (!isOutputPhase) {
      if (charIndex < entry.command.length) {
        const timeout = setTimeout(() => {
          setCurrentInput((prev) => prev + entry.command[charIndex]);
          setCharIndex((i) => i + 1);
        }, 60);
        return () => clearTimeout(timeout);
      } else {
        const delay = 400 + Math.random() * 600;
        const timeout = setTimeout(() => setIsOutputPhase(true), delay);
        return () => clearTimeout(timeout);
      }
    } else {
      const newLines: LineEntry[] = [
        { type: "command", text: `${prompt} ${entry.command}` },
      ];
      if (entry.output) {
        newLines.push({ type: "output", text: entry.output });
      }
      setLines((prev) => [...prev, ...newLines]);
      setTimeout(() => {
        setCurrentInput("");
        setCharIndex(0);
        setIsOutputPhase(false);
        setCmdIndex((i) => (i + 1) % terminalCommands.length);
      }, 1800);
    }
  }, [charIndex, isOutputPhase, cmdIndex]);

  useEffect(() => {
    terminalRef.current?.scrollTo({ top: 9999, behavior: "smooth" });
  }, [lines]);

  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[95vw] max-w-2xl bg-[#0F0F1A]/90 text-[#6EE7B7] font-mono text-sm px-4 py-3 rounded-md shadow-md border border-[#6EE7B7]/30 backdrop-blur-sm overflow-hidden">
      <div
        ref={terminalRef}
        className="max-h-[125px] overflow-y-auto pr-1 space-y-1"
      >
        {lines.slice(-12).map((line, idx) => (
          <div
            key={idx}
            className={
              line.type === "command" ? "text-[#6EE7B7]" : "text-[#A3E635]"
            }
          >
            {line.text}
          </div>
        ))}

        <div>
          <span className="text-[#8B5CF6]">{prompt}</span>{" "}
          <span>{currentInput}</span>
          <span className="inline-block w-[1ch] animate-blink">▍</span>
        </div>
      </div>
    </div>
  );
};

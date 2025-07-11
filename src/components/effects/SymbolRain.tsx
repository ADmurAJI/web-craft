"use client";

import { useEffect, useState } from "react";

type SymbolItem = {
  id: number;
  x: number;
  symbol: string;
  eaten?: boolean;
};

interface SymbolRainProps {
  triggerCount: number;
}

export const SymbolRain = ({ triggerCount }: SymbolRainProps) => {
  const [fallingSymbols, setFallingSymbols] = useState<SymbolItem[]>([]);

  useEffect(() => {
    if (triggerCount === 0 || triggerCount > 7) return;

    const is404Phase = triggerCount >= 6;
    const symbols = is404Phase
      ? ["404"]
      : [
          "</>",
          "<div>",
          "<h1>",
          "{ }",
          "<>",
          "</h1>",
          "const",
          "=>",
          "function",
          "🧠",
        ];

    let count = 0;
    const interval = setInterval(
      () => {
        if (count >= (is404Phase ? 20 : 40)) {
          clearInterval(interval);
          return;
        }

        const randomSymbol =
          symbols[Math.floor(Math.random() * symbols.length)];

        setFallingSymbols((prev) => [
          ...prev,
          {
            id: Date.now() + Math.random(),
            x: Math.random() * 200 - 100,
            symbol: randomSymbol,
          },
        ]);

        count++;
      },
      is404Phase ? 60 : 40,
    );

    return () => clearInterval(interval);
  }, [triggerCount]);

  // "Поедание" слева направо
  useEffect(() => {
    if (fallingSymbols.length === 0) return;

    const eater = setInterval(() => {
      setFallingSymbols((prev) => {
        const next = [...prev];
        const i = next.findIndex((s) => !s.eaten);
        if (i === -1) {
          clearInterval(eater);
          return prev;
        }
        next[i] = { ...next[i], eaten: true };
        return next;
      });
    }, 3000);

    return () => clearInterval(eater);
  }, [fallingSymbols]);

  return (
    <div className="absolute left-[20px] w-[200px] h-0 top-0 z-50 pointer-events-none">
      {fallingSymbols.map(({ id, x, symbol, eaten }) => {
        const rotation = Math.random() * 360 - 180;
        const delay = Math.random() * 0.5;
        const duration = 3 + Math.random();
        const size = Math.random() * 0.5 + 0.75;

        return (
          <span
            key={id}
            className={`absolute text-xs whitespace-nowrap transition-opacity duration-300 ease-in ${
              symbol === "404" ? "text-destructive" : "text-primary"
            } ${eaten ? "opacity-0" : "opacity-80"}`}
            style={{
              left: `${x}%`,
              transform: `rotate(${rotation}deg) scale(${size})`,
              animation: `fall ${duration}s ease-in forwards`,
              animationDelay: `${delay}s`,
            }}
          >
            {symbol}
          </span>
        );
      })}
    </div>
  );
};

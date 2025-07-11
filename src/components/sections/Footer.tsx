"use client";

import { Code, Heart } from "lucide-react";
import { useState } from "react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [explosions, setExplosions] = useState<{ id: number }[]>([]);
  const [cooldown, setCooldown] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const handleHeartClick = () => {
    if (cooldown || clickCount >= 5) return;

    setClickCount((prev) => prev + 1);
    setCooldown(true);

    const id = Date.now();
    setExplosions((prev) => [...prev, { id }]);

    setTimeout(() => {
      setExplosions((prev) => prev.filter((e) => e.id !== id));
    }, 2000);

    setTimeout(() => {
      setCooldown(false);
    }, 3000);
  };

  return (
    <footer className="bg-card/50 backdrop-blur-sm border-t border-border relative overflow-hidden">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                <Code className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">
                Frontend Dev
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Создаю веб-приложения, SaaS-продукты и SEO-оптимизированные сайты.
              4+ лет коммерческого опыта.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Разделы</h3>
            <div className="space-y-2">
              {[
                { label: "Услуги", href: "#services" },
                { label: "Портфолио", href: "#portfolio" },
                { label: "Блог", href: "#blog" },
                { label: "Контакты", href: "#contact" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .getElementById(link.href.substring(1))
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="block text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Связь</h3>
            <div className="space-y-3">
              <a
                href="https://vk.com/dr.falkone"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-muted-foreground hover:text-primary transition-colors text-sm group"
              >
                <span className="mr-2">VK:</span>
                <span className="group-hover:underline">dr.falkone</span>
              </a>
              <a
                href="https://t.me/dr_falkone"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-muted-foreground hover:text-primary transition-colors text-sm group"
              >
                <span className="mr-2">Telegram:</span>
                <span className="group-hover:underline">@dr_falkone</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 relative z-10">
          <div className="text-muted-foreground text-sm">
            © {currentYear} Frontend Developer. Все права защищены.
          </div>

          <div
            className="flex items-center text-muted-foreground text-sm cursor-pointer select-none"
            onClick={handleHeartClick}
          >
            <span>Сделано с</span>
            <Heart className="w-4 h-4 mx-1 text-red-500 animate-pulse" />
            <span>на React + TypeScript</span>
          </div>
        </div>
      </div>

      {explosions.map(({ id }) => (
        <Explosion key={id} />
      ))}
    </footer>
  );
};

const Explosion = () => {
  const count = 8;
  return (
    <div
      className="absolute pointer-events-none z-50"
      style={{
        bottom: "70px",
        left: "min(1790px, calc(100% - 170px))",
        right: "clamp(0px, calc(100vw - 1000px), 170px)",
      }}
    >
      {Array.from({ length: count }).map((_, i) => {
        const angle = (i / count) * 2 * Math.PI;
        const dx = Math.cos(angle) * 280;
        const dy = Math.sin(angle) * 280;

        return (
          <span
            key={i}
            className="absolute text-red-500 text-sm animate-heart-pop"
            style={
              {
                animationDelay: `${i * 0.15}s`,
                "--dx": `${dx}px`,
                "--dy": `${-dy}px`,
              } as React.CSSProperties
            }
          >
            ♥
          </span>
        );
      })}
    </div>
  );
};

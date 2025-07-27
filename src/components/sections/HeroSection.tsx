"use client";

import { TypingTerminal } from "@/components/effects/TypingTerminal";
import { ContactModal } from "@/components/modals/ContactModal";
import { Button } from "@/components/ui/button";
import { Dots } from "@/components/ui/dots";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const techRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showTerminal, setShowTerminal] = useState(true);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = hero.getBoundingClientRect();
      const x = (clientX - left) / width - 0.5;
      const y = (clientY - top) / height - 0.5;
      hero.style.setProperty("--mouse-x", x.toString());
      hero.style.setProperty("--mouse-y", y.toString());
    };

    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const parallax = scrolled * 0.5;
      hero.style.transform = `translate3d(0, ${parallax}px, 0)`;
    };

    hero.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      hero.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const target = techRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowTerminal(!entry.isIntersecting);
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -50% 0px",
      },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-[700px] sm:pb-[160px] sm:pt-0"
    >
      <Dots />

      <div
        ref={heroRef}
        className="relative z-10 text-center max-w-4xl mx-auto px-4 transform-gpu"
      >
        <div className="animate-slide-up">
          <h1
            className="
    text-3xl
    sm:text-4xl
    md:text-5xl
    lg:text-6xl
    xl:text-7xl
    font-bold
    mb-6
    leading-tight
    bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent
  "
          >
            Проектирую интерфейсы для сложных B2B-систем
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Создаю надёжные frontend-решения на React и Next.js: real-time
            мониторинг, визуализация данных, SSR-оптимизация и защита доступа.
            <br />
            Работаю под ключ — от архитектуры и UI до стабильной интеграции с
            API и ускорения загрузки.
          </p>
        </div>

        <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              onClick={() =>
                document
                  .getElementById("portfolio")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              size="lg"
              className="gradient-primary text-primary-foreground hover:glow-primary transition-all duration-300 group"
            >
              Посмотреть работы
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              onClick={() => setIsModalOpen(true)}
              variant="outline"
              size="lg"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              Обсудить проект
            </Button>
          </div>
        </div>

        <div
          ref={techRef}
          className="animate-slide-up"
          style={{ animationDelay: "0.4s" }}
        >
          <p className="text-sm text-muted-foreground mb-4">Технологии:</p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              "TypeScript",
              "React",
              "Next.js",
              "Redux Toolkit",
              "TanStack Query",
              "React Hook Form",
              "Storybook",
              "SWR / React Query",
              "Framer Motion",
              "D3.js",
              "Cytoscape.js",
            ].map((tech, index) => (
              <div
                key={tech}
                className="px-4 py-2 bg-card border border-border rounded-lg text-sm font-mono hover:border-primary transition-colors duration-300"
                style={{ animationDelay: `${0.6 + index * 0.1}s` }}
              >
                {tech}
              </div>
            ))}
          </div>
        </div>

        <div
          className="animate-slide-up mt-16"
          style={{ animationDelay: "0.8s" }}
        ></div>
      </div>

      <div
        className={cn(
          "hidden sm:block transition-opacity duration-500",
          showTerminal ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
      >
        <TypingTerminal />
      </div>

      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};

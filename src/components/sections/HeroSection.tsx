"use client";

import { TypingTerminal } from "@/components/effects/TypingTerminal";
import { ContactModal } from "@/components/modals/ContactModal";
import { Button } from "@/components/ui/button";
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
      {/* Particles */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary rounded-full animate-float opacity-60"></div>
      <div
        className="absolute top-1/3 right-1/3 w-1 h-1 bg-accent rounded-full animate-float opacity-40"
        style={{ animationDelay: "2s" }}
      ></div>
      <div
        className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-primary/50 rounded-full animate-float"
        style={{ animationDelay: "4s" }}
      ></div>
      <div
        className="absolute top-[10%] left-[15%] w-2 h-2 bg-primary/40 rounded-full animate-float"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute bottom-[20%] right-[20%] w-3 h-3 bg-accent/60 rounded-full animate-float"
        style={{ animationDelay: "2.5s" }}
      ></div>
      <div
        className="absolute top-[30%] right-[10%] w-1.5 h-1.5 bg-primary/70 rounded-full animate-float"
        style={{ animationDelay: "3.2s" }}
      ></div>
      <div
        className="absolute bottom-[15%] left-[10%] w-2.5 h-2.5 bg-accent/50 rounded-full animate-float"
        style={{ animationDelay: "4.5s" }}
      ></div>
      <div
        className="absolute top-[5%] right-[25%] w-2 h-2 bg-primary opacity-30 rounded-full animate-float"
        style={{ animationDelay: "5.2s" }}
      ></div>
      <div
        className="absolute bottom-[5%] right-[5%] w-1.5 h-1.5 bg-accent/70 rounded-full animate-float"
        style={{ animationDelay: "5.7s" }}
      ></div>
      <div
        className="absolute top-[40%] left-[45%] w-2 h-2 bg-primary/60 rounded-full animate-float"
        style={{ animationDelay: "6s" }}
      ></div>

      {/* Content */}
      <div
        ref={heroRef}
        className="relative z-10 text-center max-w-4xl mx-auto px-4 transform-gpu"
      >
        <div className="animate-slide-up">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
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

        {/* Technologies */}
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

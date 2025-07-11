"use client";

import { SymbolRain } from "@/components/effects/SymbolRain";
import { ContactModal } from "@/components/modals/ContactModal";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Briefcase,
  Code,
  FolderOpen,
  Menu,
  MessageSquare,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const navItems = [
  { id: "hero", label: "Главная", icon: Code },
  { id: "services", label: "Услуги", icon: Briefcase },
  { id: "portfolio", label: "Портфолио", icon: FolderOpen },
  { id: "blog", label: "Блог", icon: BookOpen },
  { id: "contact", label: "Контакты", icon: MessageSquare },
];

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rainTriggerCount, setRainTriggerCount] = useState(0);
  const [isRainCooldown, setIsRainCooldown] = useState(false);
  const [visibleLabels, setVisibleLabels] = useState<string[]>(
    navItems.map((item) => item.label),
  );

  const playEatSound = () => {
    const audio = new Audio("/sounds/eat.mp3");
    audio.volume = 0.4;
    audio.play().catch(() => {});
  };

  const triggerSymbolRain = () => {
    if (isRainCooldown) return;

    if (rainTriggerCount >= 7) {
      toast.error("💀 Ты пробудил древний баг! Обратного пути нет...");
      return;
    }

    if (rainTriggerCount === 6) {
      toast.error("💢 Хватит мучить интерфейс!");

      navItems.forEach((item, itemIndex) => {
        const labelLength = item.label.length;
        for (let charIndex = 0; charIndex < labelLength; charIndex++) {
          setTimeout(
            () => {
              setVisibleLabels((prev) => {
                const updated = [...prev];
                const current = updated[itemIndex];
                if (current.length > 0) {
                  updated[itemIndex] = current.slice(1);
                }
                return updated;
              });
              playEatSound();
            },
            (itemIndex * labelLength + charIndex) * 2500,
          );
        }
      });

      setRainTriggerCount((prev) => prev + 1);
      return;
    }

    if (rainTriggerCount >= 5) {
      toast.warning("👾 Фронтенд-сущность проснулась! Она ест символы...");
    }

    setRainTriggerCount((prev) => prev + 1);
    setIsRainCooldown(true);

    setTimeout(() => {
      setIsRainCooldown(false);
    }, 3000);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-lg border-b border-border"
          : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={triggerSymbolRain}
          >
            <div className="relative w-8 h-8 gradient-primary rounded-lg flex items-center justify-center overflow-visible">
              <Code className="w-5 h-5 text-primary-foreground" />
              <SymbolRain triggerCount={rainTriggerCount} />
            </div>
            <span className="text-xl font-bold text-foreground">
              Frontend Dev
            </span>
          </div>

          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-muted-foreground hover:text-primary transition-all duration-300 relative group"
                disabled={visibleLabels[index].length === 0}
              >
                {visibleLabels[index]}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </div>

          <div className="hidden lg:block">
            <Button
              onClick={() => setIsModalOpen(true)}
              className="gradient-primary text-primary-foreground w-full mt-4"
            >
              Связаться
            </Button>

            <ContactModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            />
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-foreground hover:text-primary transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        <div
          className={`lg:hidden absolute top-full right-0 left-0 bg-background/95 backdrop-blur-lg border-b border-border overflow-hidden transform transition-transform transition-opacity duration-700 ease-in-out origin-top-right ${
            isMobileMenuOpen
              ? "scale-y-100 opacity-100"
              : "scale-y-0 opacity-0 pointer-events-none"
          }`}
        >
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col space-y-4">
              {navItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="flex items-center space-x-3 text-muted-foreground hover:text-primary transition-all duration-200 py-2"
                  disabled={visibleLabels[index].length === 0}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{visibleLabels[index]}</span>
                </button>
              ))}
              <Button
                onClick={() => setIsModalOpen(true)}
                className="gradient-primary text-primary-foreground w-full mt-4"
              >
                Связаться
              </Button>

              <ContactModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
              />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

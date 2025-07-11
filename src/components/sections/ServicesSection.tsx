"use client";

import { ContactModal } from "@/components/modals/ContactModal";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Database,
  Monitor,
  Search,
  Settings,
  Smartphone,
  Zap,
} from "lucide-react";
import { useState } from "react";

const allServices = [
  {
    icon: Monitor,
    title: "Сложные веб-приложения",
    description:
      "Разрабатываю масштабируемые интерфейсы: CRM, админки, дашборды, внутренние системы. Быстро, модульно, надёжно.",
    features: [
      "Архитектура под рост",
      "Чистый и расширяемый UI-код",
      "Реактивные формы и таблицы",
      "Графики и визуализация данных",
    ],
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: Zap,
    title: "SaaS-продукты под ключ",
    description:
      "Проектирую и собираю SaaS-приложения с авторизацией, биллингом, аналитикой и масштабируемой архитектурой.",
    features: [
      "Продуманная MVP-структура",
      "Stripe, подписки и лицензии",
      "Личный кабинет и роли",
      "CI/CD и PWA-ready",
    ],
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: Search,
    title: "SEO-first лендинги и промо-сайты",
    description:
      "Создаю быстрые, адаптивные сайты с полной технической SEO-оптимизацией. Максимальный Lighthouse и позиции в поиске.",
    features: [
      "Core Web Vitals 95+",
      "OpenGraph и JSON-LD",
      "Оптимизация загрузки",
      "Аналитика и отслеживание событий",
    ],
    color: "from-green-500 to-green-600",
  },
  {
    icon: Database,
    title: "Интеграции и backend-коммуникации",
    description:
      "Настраиваю REST/GraphQL-интеграции, работаю с микросервисами, CMS, no-code и headless-платформами.",
    features: [
      "REST / GraphQL / WebSocket",
      "Strapi, Sanity, Netlify CMS",
      "Payload, Contentful, Ghost",
      "API-агрегация и валидация",
    ],
    color: "from-amber-500 to-amber-600",
  },
  {
    icon: Smartphone,
    title: "Адаптивный UI и кроссбраузерность",
    description:
      "Интерфейсы выглядят чётко и работают без глюков на любых устройствах: от iPhone SE до 4K-мониторов.",
    features: [
      "Mobile-first, Touch-friendly",
      "Dark mode / Light mode",
      "Tailwind, SCSS, кастомные темы",
      "PWA / Offline поддержка",
    ],
    color: "from-pink-500 to-pink-600",
  },
  {
    icon: Settings,
    title: "Техническая поддержка и DevOps",
    description:
      "Сопровождаю проекты: аналитика, A/B тестирование, мониторинг, оптимизация Lighthouse и скорости работы.",
    features: [
      "Sentry, PostHog, Plausible",
      "A/B эксперименты и кастомные ивенты",
      "Оптимизация bundle и lazy loading",
      "Поддержка, CI/CD, ревью кода",
    ],
    color: "from-slate-500 to-slate-600",
  },
];

export const ServicesSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <section id="services" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Услуги
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Полный цикл фронтенд-разработки: от идеи до запуска и поддержки
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {allServices.map((service, index) => (
            <div
              key={index}
              className="group relative bg-card/60 backdrop-blur-md rounded-xl p-6 border border-border transition-all duration-500 hover:shadow-xl hover:scale-105"
            >
              <div
                className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br ${service.color} pointer-events-none`}
              />
              <div className="relative space-y-6">
                <div className="space-y-4">
                  <div
                    className={`w-16 h-16 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                  >
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>

                <div className="space-y-2">
                  {service.features.map((feature, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ transitionDelay: `${i * 0.1}s` }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
          {[
            { value: "4+", label: "Года опыта" },
            { value: "50+", label: "Проектов" },
            { value: "95+%", label: "Lighthouse Score" },
            { value: "100%", label: "Качество кода" },
            { value: "24/7", label: "Поддержка" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div
                className="text-3xl md:text-4xl font-bold text-primary mb-2 animate-wave"
                style={{
                  animationDelay: `${i * 0.2}s`,
                  animationFillMode: "both",
                }}
              >
                {stat.value}
              </div>
              <div className="text-muted-foreground text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="text-center mt-20">
          <div className="bg-card/70 backdrop-blur-md border border-border rounded-xl p-10 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Готовы начать проект?</h3>
            <p className="text-muted-foreground mb-6">
              Расскажите о вашей задаче, и я предложу оптимальное решение с
              учетом бюджета и сроков
            </p>
            <Button
              size="lg"
              onClick={() => setIsModalOpen(true)}
              className="gradient-primary text-primary-foreground hover:glow-primary transition-all duration-300 group"
            >
              Обсудить проект
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>

            <ContactModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

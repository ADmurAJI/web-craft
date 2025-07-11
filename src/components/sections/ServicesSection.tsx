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
    title: "Веб-приложения",
    description:
      "Создаю сложные пользовательские интерфейсы: дашборды, CRM, админки, SaaS-платформы",
    features: [
      "Компонентная архитектура",
      "State management",
      "Реактивные формы",
      "Визуализация данных",
    ],
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: Zap,
    title: "SaaS-платформы под ключ",
    description: "Создание SaaS с подписками, аналитикой и масштабируемостью",
    features: ["MVP", "Подписки", "Личный кабинет", "Дашборды"],
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: Search,
    title: "SEO-оптимизация и разработка посадочных страниц",
    description:
      "Создаю продающие лендинги с технической SEO-оптимизацией для высоких позиций в поиске",
    features: [
      "Техническая SEO",
      "Оптимизация скорости",
      "Метатеги и разметка",
      "Core Web Vitals",
    ],
    color: "from-green-500 to-green-600",
  },
  {
    icon: Database,
    title: "Интеграция с REST API и CMS",
    description:
      "Подключаю внешние сервисы, настраиваю взаимодействие с бэкендом и популярными CMS",
    features: ["REST API", "GraphQL", "Headless CMS", "Микросервисы"],
    color: "from-amber-500 to-amber-600",
  },
  {
    icon: Smartphone,
    title: "Адаптивная вёрстка и мобильная оптимизация",
    description:
      "Все проекты отлично работают на любых устройствах от смартфонов до широких мониторов",
    features: ["Mobile-first", "Responsive design", "Touch-интерфейсы", "PWA"],
    color: "from-pink-500 to-pink-600",
  },
  {
    icon: Settings,
    title: "Сопровождение, улучшения, внедрение аналитики",
    description:
      "Техническая поддержка проектов, оптимизация производительности и настройка аналитики",
    features: [
      "Мониторинг ошибок",
      "A/B тестирование",
      "Аналитика",
      "Обновления",
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

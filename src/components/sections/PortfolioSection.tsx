"use client";

import projectFintech from "@/assets/project-fintech.jpg";
import projectRealestate from "@/assets/project-realestate.jpg";
import projectTourism from "@/assets/project-tourism.jpg";
import { ContactModal } from "@/components/modals/ContactModal";
import { ProjectPreviewModal } from "@/components/modals/ProjectPreviewModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ArrowRight,
  BarChart3,
  Database,
  ExternalLink,
  Github,
  Home,
  Lock,
  Map,
  ShoppingCart,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";
import projectCrm from "../../../public/portfolio/crm/4.jpg";
import projectEcommerce from "../../../public/portfolio/ecommerce/2.jpg";
import projectSaas from "../../../public/portfolio/saas/2.jpg";

export const PortfolioSection = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<
    null | (typeof projects)[0]
  >(null);

  const baseProjects = [
    {
      id: 1,
      key: "crm",
      title: "CRM-система для логистической компании",
      description:
        "Внутренний инструмент для управления заказами, клиентской базой и документооборотом. Интеграция с бухгалтерией и модулем аналитики по SLA.",
      image: projectCrm,
      technologies: [
        "React",
        "TypeScript",
        "Redux Toolkit",
        "Node.js",
        "PostgreSQL",
      ],
      features: [
        "Управление заказами",
        "Карточки клиентов",
        "Отчеты по SLA",
        "Аналитика загрузки",
      ],
      icon: Database,
      color: "from-blue-500 to-indigo-600",
    },
    {
      id: 2,
      key: "saas",
      title: "SaaS-платформа бизнес-аналитики в реальном времени",
      description:
        "Веб-приложение с потоковыми дашбордами, подписками и API-доступом. Обновление метрик в реальном времени через WebSocket и экспорт в CSV/PDF.",
      image: projectSaas,
      technologies: [
        "Next.js",
        "TypeScript",
        "Recharts",
        "WebSocket",
        "Prisma",
        "Stripe",
      ],
      features: [
        "Live-дашборды",
        "Stripe-подписки",
        "API-интеграции",
        "Экспорт отчетов",
      ],
      icon: BarChart3,
      color: "from-purple-500 to-pink-600",
    },
    {
      id: 3,
      key: "tourism",
      title: "Туристический портал с картой и фильтрами",
      description:
        "SEO-оптимизированный сайт с интерактивной картой, каталогом туров и системой фильтрации. Поддержка нескольких языков и динамических маршрутов.",
      image: projectTourism,
      technologies: ["Next.js", "TypeScript", "Mapbox", "Tailwind CSS", "SEO"],
      features: [
        "Интерактивная карта",
        "Фильтрация туров",
        "Бронирование",
        "Мультиязычность",
      ],
      icon: Map,
      color: "from-green-500 to-teal-600",
    },
    {
      id: 4,
      key: "ecommerce",
      title: "E-commerce платформа с админкой и Stripe",
      description:
        "Масштабируемый интернет-магазин с корзиной, оплатой, управлением товарами и админ-панелью. Поддержка ролей и прав доступа.",
      image: projectEcommerce,
      technologies: ["React", "TypeScript", "Redux", "Stripe", "Node.js"],
      features: [
        "Каталог и корзина",
        "Онлайн-оплата",
        "Админка с RBAC",
        "Уведомления",
      ],
      icon: ShoppingCart,
      color: "from-violet-500 to-purple-600",
    },
    {
      id: 5,
      key: "fintech",
      title: "AI-платформа для анализа бизнес-данных",
      description:
        "Решение на базе LLM для генерации аналитики, визуализации трендов и общения с ИИ-помощником по отчётам. Внедрение FastAPI и OpenAI.",
      image: projectFintech,
      technologies: [
        "Next.js",
        "TypeScript",
        "FastAPI",
        "OpenAI API",
        "Chart.js",
      ],
      features: [
        "Чат с LLM",
        "Анализ отчётов",
        "BI-интеграции",
        "Графики и визуализация",
      ],
      icon: BarChart3,
      color: "from-emerald-500 to-teal-600",
    },
    {
      id: 6,
      key: "realestate",
      title: "Платформа для продажи и аренды недвижимости",
      description:
        "Каталог объектов с фильтрами, интерактивной картой и калькулятором ипотеки. Хостинг изображений на Cloudinary, SSR и Prisma ORM.",
      image: projectRealestate,
      technologies: ["Next.js", "TypeScript", "Prisma", "MapBox", "Cloudinary"],
      features: [
        "Поиск и фильтры",
        "Карта объектов",
        "Ипотечный калькулятор",
        "Виртуальные туры",
      ],
      icon: Home,
      color: "from-orange-500 to-red-600",
    },
  ];

  const projects = baseProjects.map((project) => ({
    ...project,
    gallery: Array.from(
      { length: 9 },
      (_, i) => `/portfolio/${project.key}/${i + 1}.jpg`,
    ),
  }));

  return (
    <section id="portfolio" className="py-18 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Портфолио
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Реальные проекты, которые решают бизнес-задачи
          </p>
        </div>

        <div className="space-y-16 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <Card
              key={project.id}
              className={`relative overflow-hidden bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-700 ${
                hoveredProject === index ? "glow-primary" : ""
              }`}
              onMouseEnter={() => setHoveredProject(index)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div
                className={`group grid lg:grid-cols-2 gap-8 ${index % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}
              >
                <div className="relative group/image overflow-hidden">
                  <div className="transition-transform duration-700 group-hover:scale-110">
                    <Image
                      src={project.image}
                      alt={project.title}
                      className="w-full h-64 lg:h-80 object-cover"
                      width={800}
                      height={400}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  <div
                    className={`absolute top-4 right-4 lg:top-6 lg:right-6 w-12 h-12 rounded-lg bg-gradient-to-br ${project.color} flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  >
                    <project.icon className="w-6 h-6 text-white" />
                  </div>
                </div>

                <div
                  className={`space-y-6 ${index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""} p-6`}
                >
                  <div>
                    <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-3 transition-colors group-hover:text-primary">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">
                      Ключевые возможности
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {project.features.map((feature, featureIndex) => (
                        <div
                          key={featureIndex}
                          className="flex items-center text-sm text-muted-foreground"
                        >
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">
                      Технологии
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <Badge
                          key={techIndex}
                          variant="outline"
                          className="border-border hover:border-primary/50 font-mono text-xs"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 group/btn"
                      onClick={() => {
                        if (
                          ["tourism", "fintech", "realestate"].includes(
                            project.key,
                          )
                        ) {
                          toast.info(
                            "🎒 Без паники! Галерея для этого проекта ещё монтируется.",
                          );
                          return;
                        }
                        setSelectedProject(project);
                      }}
                    >
                      <ExternalLink className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                      Превью проекта
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-muted-foreground hover:text-primary transition-colors group/btn"
                      onClick={() =>
                        toast.error(
                          "Приватный проект. Доступ к коду только для клиента проекта",
                          {
                            icon: <Lock className="text-destructive w-5 h-5" />,
                          },
                        )
                      }
                    >
                      <Github className="w-4 h-4 mr-2 group-hover/btn:rotate-12 transition-transform" />
                      Код
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-6 text-lg">
            Хотите создать нечто подобное для своего бизнеса?
          </p>
          <Button
            size="lg"
            onClick={() => setIsModalOpen(true)}
            className="gradient-primary text-primary-foreground hover:glow-primary transition-all duration-300"
          >
            Обсудить проект
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        <ContactModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
        {selectedProject && (
          <ProjectPreviewModal
            isOpen={!!selectedProject}
            onClose={() => setSelectedProject(null)}
            title={selectedProject.title}
            images={selectedProject.gallery}
          />
        )}
      </div>
    </section>
  );
};

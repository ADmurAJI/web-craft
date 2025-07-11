"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useInView } from "@/hooks/useInView";
import { ArrowRight, Calendar, Clock } from "lucide-react";

export const BlogSection = () => {
  const { ref, isInView } = useInView<HTMLDivElement>(0.15);

  const articles = [
    {
      id: 1,
      title: "Оптимизация React приложений: от 50 до 95 Lighthouse Score",
      excerpt:
        "Практические техники для улучшения производительности: lazy loading, code splitting, оптимизация изображений и многое другое.",
      category: "Performance",
      readTime: "8 мин",
      date: "13 февраля 2019",
      color: "from-blue-500 to-blue-600",
    },
    {
      id: 2,
      title:
        "SEO для SPA: как сделать React-приложение видимым для поисковиков",
      excerpt:
        "Server-side rendering, meta теги, структурированные данные и другие способы улучшить SEO одностраничных приложений.",
      category: "SEO",
      readTime: "12 мин",
      date: "6 мая 2024",
      color: "from-green-500 to-green-600",
    },
    {
      id: 3,
      title:
        "Архитектура крупных фронтенд проектов: паттерны, подходы и масштабирование",
      excerpt:
        "Feature-Sliced Design, монорепозитории, микрофронтенды — как организовать код в больших командах.",
      category: "Architecture",
      readTime: "15 мин",
      date: "23 мая 2024",
      color: "from-purple-500 to-purple-600",
    },
  ];

  return (
    <section id="blog" className="py-20 relative">
      <div
        ref={ref}
        className="transition-all duration-700 ease-out transform"
        style={{
          opacity: isInView ? 1 : 0,
          transform: isInView ? "translateY(0)" : "translateY(60px)",
        }}
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Блог
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Делюсь опытом в разработке, SEO и создании интерфейсов
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {articles.map((article) => (
            <Card
              key={article.id}
              className="group bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-500 cursor-pointer hover:scale-105 transform-gpu"
            >
              <CardHeader className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge
                    variant="outline"
                    className={`bg-gradient-to-r ${article.color} text-white border-0 text-xs`}
                  >
                    {article.category}
                  </Badge>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="w-3 h-3 mr-1" />
                    {article.readTime}
                  </div>
                </div>

                <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
                  {article.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {article.excerpt}
                </CardDescription>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3 mr-1" />
                    {article.date}
                  </div>

                  <div className="flex items-center text-primary hover:text-accent transition-colors group/link">
                    <span className="text-sm font-medium mr-1">Читать</span>
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

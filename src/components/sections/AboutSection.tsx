'use client'

import { useInView } from '@/hooks/useInView'
import { Code, Database, Globe, Palette, Smartphone, Zap } from 'lucide-react'

const skills = [
	{
		icon: Code,
		title: "Сложные интерфейсы",
		description:
			"Создаю интуитивные и функциональные интерфейсы для веб-приложений любой сложности",
	},
	{
		icon: Database,
		title: "Интеграция API",
		description: "Опыт работы с REST API, GraphQL и различными CMS системами",
	},
	{
		icon: Smartphone,
		title: "Адаптивность",
		description:
			"Все проекты оптимизированы для мобильных устройств и различных экранов",
	},
	{
		icon: Zap,
		title: "Оптимизация",
		description:
			"Оптимизирую скорость загрузки и общую производительность приложений",
	},
	{
		icon: Globe,
		title: "SEO-оптимизация",
		description:
			"Создаю сайты с учетом требований поисковых систем для лучшего ранжирования",
	},
	{
		icon: Palette,
		title: "UI/UX дизайн",
		description:
			"Воплощаю дизайн в код с точностью до пикселя, создаю собственные решения",
	},
];

export const AboutSection = () => {
	const { ref, isInView } = useInView<HTMLDivElement>(0.2);
	
	return (
		<section id="about" className="py-12 relative">
			<div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6">
				<div ref={ref} className="text-center mb-16 transition-all duration-700 ease-out transform"
				     style={{
					     opacity: isInView ? 1 : 0,
					     transform: isInView ? 'translateY(0)' : 'translateY(50px)',
				     }}
				>
					<h2 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-foreground via-primary to-primary">
						Обо <span className="font-bold">мне</span>
					</h2>
					<div className="max-w-4xl mx-auto space-y-6 text-lg text-muted-foreground">
						<p>
							Уже более 4 лет разрабатываю масштабируемые, производительные и надёжные веб-приложения.
						</p>
						<p>
							Работаю с React, Next.js, TypeScript, Redux Toolkit и сопутствующим стеком. В работе ценю внимание к
							деталям, инженерный подход и стабильный результат.
						</p>
					</div>
				</div>
				
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
					{skills.map((skill, index) => (
						<div
							key={skill.title}
							className='group relative bg-card/60 backdrop-blur-md border border-border rounded-xl p-6 hover:scale-105 hover:shadow-xl transition-all duration-500 hover:neon-border'
							style={{ animationDelay: `${index * 0.1}s` }}
						>
							<div className="flex items-start gap-4">
								<div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors shrink-0">
									<skill.icon className="w-6 h-6 text-primary" />
								</div>
								<div className="flex-1">
									<h4 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
										{skill.title}
									</h4>
									<p className="text-muted-foreground leading-relaxed">
										{skill.description}
									</p>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};
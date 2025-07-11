'use client';

import {
	SiCss3,
	SiCssmodules,
	SiCypress,
	SiEslint,
	SiFigma,
	SiFramer,
	SiGit,
	SiGithub,
	SiGraphql,
	SiHtml5,
	SiJavascript,
	SiJest,
	SiNextdotjs,
	SiNpm,
	SiPnpm,
	SiPostcss,
	SiPrettier,
	SiReact,
	SiReacthookform,
	SiRedux,
	SiSass,
	SiStorybook,
	SiStyledcomponents,
	SiTailwindcss,
	SiTestinglibrary,
	SiTypescript,
	SiVite,
	SiWebpack,
	SiYarn,
	SiZod
} from 'react-icons/si'


const technologies = [
	{ name: "React", icon: <SiReact /> },
	{ name: "Next.js", icon: <SiNextdotjs /> },
	{ name: "Redux Toolkit", icon: <SiRedux /> },
	{ name: "Tailwind CSS", icon: <SiTailwindcss /> },
	{ name: "CSS Modules", icon: <SiCssmodules /> },
	{ name: "SCSS", icon: <SiSass /> },
	{ name: "JavaScript", icon: <SiJavascript /> },
	{ name: "TypeScript", icon: <SiTypescript /> },
	{ name: "Vite", icon: <SiVite /> },
	{ name: "Webpack", icon: <SiWebpack /> },
	{ name: "Jest", icon: <SiJest /> },
	{ name: "React Hook Form", icon: <SiReacthookform /> },
	{ name: "Framer Motion", icon: <SiFramer /> },
	{ name: "GraphQL", icon: <SiGraphql /> },
	{ name: "ESLint", icon: <SiEslint /> },
	{ name: "Prettier", icon: <SiPrettier /> },
	{ name: "Storybook", icon: <SiStorybook /> },
	{ name: "PostCSS", icon: <SiPostcss /> },
	{ name: "Styled Components", icon: <SiStyledcomponents /> },
	{ name: "RTL", icon: <SiTestinglibrary /> },
	{ name: "Yarn", icon: <SiYarn /> },
	
	{ name: "HTML5", icon: <SiHtml5 /> },
	{ name: "CSS3", icon: <SiCss3 /> },
	{ name: "Git", icon: <SiGit /> },
	{ name: "GitHub", icon: <SiGithub /> },
	{ name: "NPM", icon: <SiNpm /> },
	{ name: "PNPM", icon: <SiPnpm /> },
	{ name: "Zod", icon: <SiZod /> },
	{ name: "Figma", icon: <SiFigma /> },
	{ name: "Cypress", icon: <SiCypress /> },
];

export const TechnologyMarquee = () => {
	return (
		<div className="relative overflow-hidden py-8 w-full border-border group">
			
			<div
				className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-background via-background to-transparent z-10 pointer-events-none" />
			<div
				className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-background via-background to-transparent z-10 pointer-events-none" />
			
			{/* Центрирование */}
			<div className="flex justify-center w-full">
				<div
					className="animate-marquee flex min-w-full whitespace-nowrap gap-12 text-muted-foreground text-sm font-medium group-hover:pause-marquee">
					{[...technologies, ...technologies].map((tech, i) => (
						<div
							key={i}
							className="flex items-center gap-2 px-4 py-2 hover:text-primary hover:scale-110 transition-transform duration-300"
						>
							<span className="text-lg">{tech.icon}</span>
							<span>{tech.name}</span>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

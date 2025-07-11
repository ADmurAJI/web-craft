'use client';
import { useEffect, useRef } from 'react'

export default function CursorGlow() {
	const glowRef = useRef<HTMLDivElement>(null);
	
	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			if (glowRef.current) {
				glowRef.current.style.left = `${e.clientX}px`;
				glowRef.current.style.top = `${e.clientY}px`;
			}
		};
		
		window.addEventListener('mousemove', handleMouseMove);
		return () => window.removeEventListener('mousemove', handleMouseMove);
	}, []);
	
	return (
		<div
			ref={glowRef}
			className="pointer-events-none fixed z-50 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full
           bg-gradient-radial from-white/10 via-white/20 to-transparent opacity-50 blur-[100px]
           transition-opacity duration-300"
		/>
	);
}

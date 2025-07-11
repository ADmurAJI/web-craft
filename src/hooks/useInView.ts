'use client'

import { useEffect, useRef, useState } from 'react'

export const useInView = <T extends HTMLElement>(threshold = 0.1) => {
	const ref = useRef<T | null>(null);
	const [isInView, setIsInView] = useState(false);
	
	useEffect(() => {
		if (!ref.current) return;
		
		const observer = new IntersectionObserver(
			([entry]) => setIsInView(entry.isIntersecting),
			{ threshold }
		);
		
		observer.observe(ref.current);
		return () => observer.disconnect();
	}, []);
	
	return { ref, isInView };
};

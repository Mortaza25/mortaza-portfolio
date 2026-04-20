import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);
    const [isVisible, setIsVisible] = useState(false); // Only show after initial movement

    useEffect(() => {
        const updateMousePosition = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
            if (!isVisible) setIsVisible(true);
            
            // Check if hovering over interactive elements
            const target = e.target;
            const isClickable = 
                window.getComputedStyle(target).cursor === 'pointer' ||
                target.tagName.toLowerCase() === 'a' ||
                target.tagName.toLowerCase() === 'button' ||
                target.closest('a') !== null ||
                target.closest('button') !== null;
                
            setIsHovered(Boolean(isClickable));
        };

        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        window.addEventListener('mousemove', updateMousePosition);
        document.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('mouseenter', handleMouseEnter);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mouseenter', handleMouseEnter);
        };
    }, [isVisible]);

    // Don't render on very small screens (likely touch devices)
    if (typeof window !== 'undefined' && window.innerWidth < 768) return null;

    const variants = {
        default: {
            x: mousePosition.x - 8,
            y: mousePosition.y - 8,
            height: 16,
            width: 16,
            opacity: isVisible ? 1 : 0,
            backgroundColor: "rgba(255, 255, 255, 1)",
            mixBlendMode: "difference", // This makes it look cool against dark/light backgrounds
        },
        hover: {
            x: mousePosition.x - 24,
            y: mousePosition.y - 24,
            height: 48,
            width: 48,
            opacity: isVisible ? 0.8 : 0,
            backgroundColor: "rgba(255, 255, 255, 1)",
            mixBlendMode: "difference",
        }
    };

    return (
        <motion.div
            className="fixed top-0 left-0 z-[9999] rounded-full pointer-events-none hidden md:block"
            variants={variants}
            animate={isHovered ? "hover" : "default"}
            transition={{
                type: "spring",
                stiffness: 700,
                damping: 40,
                mass: 0.5
            }}
        />
    );
};

export default CustomCursor;

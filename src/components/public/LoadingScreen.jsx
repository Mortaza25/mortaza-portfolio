import React from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = () => {
    return (
        <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center"
        >
            <div className="flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="mb-8"
                >
                    <span className="text-4xl md:text-5xl font-bold tracking-tighter text-dark">
                        Mortaza.
                    </span>
                </motion.div>
                
                <div className="w-48 md:w-64 h-[2px] bg-gray-100 relative overflow-hidden rounded-full">
                    <motion.div 
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ 
                            duration: 2.2, 
                            ease: [0.65, 0, 0.35, 1] 
                        }}
                        className="absolute h-full left-0 top-0 bg-dark"
                    />
                </div>
                
            </div>
        </motion.div>
    );
};

export default LoadingScreen;

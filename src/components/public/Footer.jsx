import React from 'react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="py-8 px-6 bg-dark relative overflow-hidden">
            <div className="max-w-6xl mx-auto text-center relative z-10">
                <p className="text-[10px] md:text-xs font-medium text-gray-500 uppercase tracking-[0.3em] leading-none">
                    © {currentYear} AZKA MORTAZA. ALL RIGHTS RESERVED.
                </p>
            </div>
        </footer>
    );
};

export default Footer;

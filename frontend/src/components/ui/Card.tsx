import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    title?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '', title }) => {
    return (
        <div className={`glass-card rounded-2xl overflow-hidden transition-all duration-300 hover:border-lounge-gold/30 hover:shadow-2xl hover:shadow-lounge-purple/10 ${className}`}>
            {title && (
                <div className="px-6 py-5 border-b border-white/5 bg-white/5">
                    <h3 className="text-xl font-light tracking-wide text-lounge-gold">{title}</h3>
                </div>
            )}
            <div className="px-6 py-6">
                {children}
            </div>
        </div>
    );
};

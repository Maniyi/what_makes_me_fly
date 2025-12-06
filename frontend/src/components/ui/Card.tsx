import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    title?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '', title }) => {
    return (
        <div className={`bg-black/40 backdrop-blur-md rounded-xl border border-white/10 shadow-lg ${className}`}>
            {title && (
                <div className="px-6 py-4 border-b border-white/10">
                    <h3 className="text-lg font-medium leading-6 text-white">{title}</h3>
                </div>
            )}
            <div className="px-6 py-4">
                {children}
            </div>
        </div>
    );
};

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger' | 'outline';
    size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    ...props
}) => {
    const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-95";

    const variants = {
        primary: "bg-lounge-gold hover:bg-lounge-gold-hover text-black shadow-[0_0_20px_rgba(212,175,55,0.3)] border border-lounge-gold/50",
        secondary: "bg-white/5 hover:bg-white/10 text-lounge-gold backdrop-blur-sm border border-lounge-gold/20",
        danger: "bg-red-900/80 hover:bg-red-800 text-white shadow-[0_0_15px_rgba(220,38,38,0.3)] border border-red-500/30",
        outline: "border border-lounge-gold/50 text-lounge-gold hover:bg-lounge-gold/10"
    };

    const sizes = {
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-4 py-2 text-sm",
        lg: "h-12 px-8 text-base"
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

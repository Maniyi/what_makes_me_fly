import React from 'react';
import Link from 'next/link';

export const Navbar: React.FC = () => {
    return (
        <nav className="glass-panel sticky top-0 z-50 border-b-0 shadow-2xl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20"> {/* Increased height for sleekness */}
                    <div className="flex w-full items-center justify-between">
                        <div className="flex-shrink-0 flex items-center">
                            <Link href="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-lounge-gold via-yellow-200 to-lounge-gold tracking-[0.2em] uppercase hover:opacity-90 transition-opacity">
                                kiss-and-shhhh
                            </Link>
                        </div>
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            {['Requests', 'Attendant', 'Inventory', 'Payments', 'Expenses'].map((item) => (
                                <Link
                                    key={item}
                                    href={`/${item.toLowerCase()}`}
                                    className="border-transparent text-gray-400 hover:text-lounge-gold hover:border-lounge-gold inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-all duration-300 uppercase tracking-widest"
                                >
                                    {item}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

import React from 'react';
import Link from 'next/link';

export const Navbar: React.FC = () => {
    return (
        <nav className="bg-black/60 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <Link href="/" className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 tracking-wider">
                                kiss-and-shhhh
                            </Link>
                        </div>
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            <Link href="/requests" className="border-transparent text-gray-300 hover:text-white hover:border-cyan-400 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors">
                                Requests
                            </Link>
                            <Link href="/attendant" className="border-transparent text-gray-300 hover:text-white hover:border-cyan-400 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors">
                                Attendant
                            </Link>
                            <Link href="/inventory" className="border-transparent text-gray-300 hover:text-white hover:border-cyan-400 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors">
                                Inventory
                            </Link>
                            <Link href="/payments" className="border-transparent text-gray-300 hover:text-white hover:border-cyan-400 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors">
                                Payments
                            </Link>
                            <Link href="/expenses" className="border-transparent text-gray-300 hover:text-white hover:border-cyan-400 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors">
                                Expenses
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

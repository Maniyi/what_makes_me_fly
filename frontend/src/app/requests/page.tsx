'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function RequestsPage() {
    const [requests, setRequests] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchRequests = async () => {
        try {
            setLoading(true);
            const data = await api.getRequests();
            setRequests(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Auto-login for demo purposes if no token
        const init = async () => {
            if (!localStorage.getItem('token')) {
                try {
                    const res = await api.login({ username: 'admin', password: 'password' });
                    localStorage.setItem('token', res.access_token);
                } catch (e) {
                    console.error("Auto-login failed", e);
                }
            }
            fetchRequests();
        };
        init();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">Error: {error}</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-lounge-gold via-white to-lounge-purple tracking-tighter drop-shadow-lg">Customer Requests</h2>
                <Link href="/requests/new">
                    <Button>New Request</Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {requests.map((req) => (
                    <Card key={req.id} className="flex flex-col h-full hover:scale-[1.02] transform transition-transform" title={req.customer_name}>
                        <div className="flex-1">
                            <div className="flex justify-between items-start mb-4">
                                <p className="text-gray-400 text-sm uppercase tracking-wider">Table</p>
                                <span className="text-2xl font-light text-white">{req.table_number || '—'}</span>
                            </div>

                            <div className="space-y-2 mb-6">
                                {req.items && Array.isArray(req.items) && req.items.map((item: any, idx: number) => (
                                    <div key={idx} className="flex justify-between items-center text-sm border-b border-white/5 pb-2 last:border-0">
                                        <span className="text-gray-300">{item.name}</span>
                                        <span className="text-lounge-gold font-mono">x{item.quantity}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="pt-4 mt-auto border-t border-white/5 flex justify-between items-center">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase border
                ${req.status === 'pending' ? 'bg-yellow-900/20 text-yellow-500 border-yellow-500/20' :
                                    req.status === 'accepted' ? 'bg-blue-900/20 text-blue-400 border-blue-500/20' :
                                        req.status === 'delivered' ? 'bg-green-900/20 text-green-400 border-green-500/20' : 'bg-gray-800/50 text-gray-500 border-gray-600/20'}`}>
                                {req.status}
                            </span>
                            <p className="text-xs text-gray-600 font-mono">
                                {new Date(req.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                        </div>
                    </Card>
                ))}
                {requests.length === 0 && (
                    <div className="col-span-full py-12 text-center">
                        <p className="text-gray-500 italic text-lg">No active requests</p>
                    </div>
                )}
            </div>
        </div>
    );
}

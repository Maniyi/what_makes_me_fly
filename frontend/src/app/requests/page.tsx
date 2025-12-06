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
                <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">Customer Requests</h2>
                <Link href="/requests/new">
                    <Button>New Request</Button>
                </Link>
            </div>

            <div className="grid gap-4">
                {requests.map((req) => (
                    <Card key={req.id} className="flex justify-between items-center hover:bg-white/5 transition-colors border-white/5">
                        <div>
                            <h3 className="font-bold text-lg text-white">{req.customer_name}</h3>
                            <p className="text-gray-400">Table: {req.table_number || 'N/A'}</p>
                            <div className="mt-2">
                                {req.items && Array.isArray(req.items) && req.items.map((item: any, idx: number) => (
                                    <span key={idx} className="inline-block bg-white/10 rounded-full px-3 py-1 text-sm font-semibold text-neon-blue mr-2 mb-2 border border-neon-blue/20">
                                        {item.name} (x{item.quantity})
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="text-right">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize border
                ${req.status === 'pending' ? 'bg-yellow-100/10 text-yellow-300 border-yellow-500/30' :
                                    req.status === 'accepted' ? 'bg-blue-100/10 text-blue-300 border-blue-500/30' :
                                        req.status === 'delivered' ? 'bg-green-100/10 text-green-300 border-green-500/30' : 'bg-gray-100/10 text-gray-300 border-gray-500/30'}`}>
                                {req.status}
                            </span>
                            <p className="text-xs text-gray-500 mt-1">
                                {new Date(req.created_at).toLocaleString()}
                            </p>
                        </div>
                    </Card>
                ))}
                {requests.length === 0 && (
                    <p className="text-gray-500 text-center py-8 italic">No requests found.</p>
                )}
            </div>
        </div>
    );
}

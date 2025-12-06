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
                <h2 className="text-2xl font-bold text-gray-900">Customer Requests</h2>
                <Link href="/requests/new">
                    <Button>New Request</Button>
                </Link>
            </div>

            <div className="grid gap-4">
                {requests.map((req) => (
                    <Card key={req.id} className="flex justify-between items-center">
                        <div>
                            <h3 className="font-medium text-lg">{req.customer_name}</h3>
                            <p className="text-gray-500">Table: {req.table_number || 'N/A'}</p>
                            <div className="mt-2">
                                {req.items && Array.isArray(req.items) && req.items.map((item: any, idx: number) => (
                                    <span key={idx} className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                                        {item.name} (x{item.quantity})
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="text-right">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                ${req.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                    req.status === 'accepted' ? 'bg-blue-100 text-blue-800' :
                                        req.status === 'delivered' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                {req.status}
                            </span>
                            <p className="text-xs text-gray-400 mt-1">
                                {new Date(req.created_at).toLocaleString()}
                            </p>
                        </div>
                    </Card>
                ))}
                {requests.length === 0 && (
                    <p className="text-gray-500 text-center py-8">No requests found.</p>
                )}
            </div>
        </div>
    );
}

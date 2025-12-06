'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function PaymentsPage() {
    const [payments, setPayments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [newPayment, setNewPayment] = useState({ amount: 0, method: 'cash', request_id: '' });

    const fetchPayments = async () => {
        try {
            setLoading(true);
            const data = await api.getPayments();
            setPayments(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPayments();
    }, []);

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.createPayment({
                ...newPayment,
                request_id: newPayment.request_id ? parseInt(newPayment.request_id) : null
            });
            setNewPayment({ amount: 0, method: 'cash', request_id: '' });
            fetchPayments();
        } catch (err) {
            console.error(err);
            alert('Failed to record payment');
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">Payments</h2>

            <Card title="Record Payment" className="border-neon-blue/20">
                <form onSubmit={handleCreate} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                    <Input
                        label="Amount"
                        type="number"
                        step="0.01"
                        value={newPayment.amount}
                        onChange={e => setNewPayment({ ...newPayment, amount: parseFloat(e.target.value) })}
                        required
                    />
                    <div className="w-full">
                        <label className="block text-sm font-medium text-gray-200 mb-1">Method</label>
                        <select
                            className="flex h-10 w-full rounded-lg border border-white/20 bg-black/20 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            value={newPayment.method}
                            onChange={e => setNewPayment({ ...newPayment, method: e.target.value })}
                        >
                            <option value="cash" className="text-black">Cash</option>
                            <option value="card" className="text-black">Card</option>
                            <option value="online" className="text-black">Online</option>
                        </select>
                    </div>
                    <Input
                        label="Request ID (Optional)"
                        type="number"
                        value={newPayment.request_id}
                        onChange={e => setNewPayment({ ...newPayment, request_id: e.target.value })}
                    />
                    <Button type="submit">Record</Button>
                </form>
            </Card>

            <div className="bg-black/40 backdrop-blur-md shadow overflow-hidden sm:rounded-lg border border-white/10">
                <table className="min-w-full divide-y divide-white/10">
                    <thead className="bg-white/5">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Amount</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Method</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Date</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                        {payments.map((payment) => (
                            <tr key={payment.id} className="hover:bg-white/5 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">#{payment.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-neon-blue font-mono">${payment.amount}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 capitalize">{payment.method}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{new Date(payment.created_at).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

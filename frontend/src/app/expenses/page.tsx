'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function ExpensesPage() {
    const [expenses, setExpenses] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [newExpense, setNewExpense] = useState({ description: '', amount: 0, category: '' });

    const fetchExpenses = async () => {
        try {
            setLoading(true);
            const data = await api.getExpenses();
            setExpenses(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.createExpense(newExpense);
            setNewExpense({ description: '', amount: 0, category: '' });
            fetchExpenses();
        } catch (err) {
            console.error(err);
            alert('Failed to log expense');
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Expenses</h2>

            <Card title="Log Expense">
                <form onSubmit={handleCreate} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                    <Input
                        label="Description"
                        value={newExpense.description}
                        onChange={e => setNewExpense({ ...newExpense, description: e.target.value })}
                        required
                    />
                    <Input
                        label="Category"
                        value={newExpense.category}
                        onChange={e => setNewExpense({ ...newExpense, category: e.target.value })}
                    />
                    <Input
                        label="Amount"
                        type="number"
                        step="0.01"
                        value={newExpense.amount}
                        onChange={e => setNewExpense({ ...newExpense, amount: parseFloat(e.target.value) })}
                        required
                    />
                    <Button type="submit">Log Expense</Button>
                </form>
            </Card>

            <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {expenses.map((expense) => (
                            <tr key={expense.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{expense.description}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{expense.category}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${expense.amount}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(expense.created_at).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

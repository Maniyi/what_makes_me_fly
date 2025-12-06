'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function InventoryPage() {
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [newItem, setNewItem] = useState({ name: '', quantity: 0, price: 0, category: '' });

    const fetchInventory = async () => {
        try {
            setLoading(true);
            const data = await api.getInventory();
            setItems(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInventory();
    }, []);

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.createInventoryItem(newItem);
            setNewItem({ name: '', quantity: 0, price: 0, category: '' });
            fetchInventory();
        } catch (err) {
            console.error(err);
            alert('Failed to create item');
        }
    };

    const handleUpdate = async (id: number, data: any) => {
        try {
            await api.updateInventoryItem(id, data);
            fetchInventory();
        } catch (err) {
            console.error(err);
            alert('Failed to update item');
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Inventory Management</h2>

            <Card title="Add New Item">
                <form onSubmit={handleCreate} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
                    <Input
                        label="Name"
                        value={newItem.name}
                        onChange={e => setNewItem({ ...newItem, name: e.target.value })}
                        required
                    />
                    <Input
                        label="Category"
                        value={newItem.category}
                        onChange={e => setNewItem({ ...newItem, category: e.target.value })}
                    />
                    <Input
                        label="Quantity"
                        type="number"
                        value={newItem.quantity}
                        onChange={e => setNewItem({ ...newItem, quantity: parseInt(e.target.value) })}
                        required
                    />
                    <Input
                        label="Price"
                        type="number"
                        step="0.01"
                        value={newItem.price}
                        onChange={e => setNewItem({ ...newItem, price: parseFloat(e.target.value) })}
                        required
                    />
                    <Button type="submit">Add Item</Button>
                </form>
            </Card>

            <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                    {items.map((item) => (
                        <li key={item.id} className="px-6 py-4 flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                                <p className="text-sm text-gray-500">{item.category} | ${item.price}</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => handleUpdate(item.id, { quantity: Math.max(0, item.quantity - 1) })}
                                        className="p-1 rounded-full hover:bg-gray-100"
                                    >
                                        -
                                    </button>
                                    <span className="font-medium w-8 text-center">{item.quantity}</span>
                                    <button
                                        onClick={() => handleUpdate(item.id, { quantity: item.quantity + 1 })}
                                        className="p-1 rounded-full hover:bg-gray-100"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

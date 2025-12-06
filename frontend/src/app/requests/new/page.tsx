'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function NewRequestPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [inventory, setInventory] = useState<any[]>([]);
    const [cart, setCart] = useState<any[]>([]);
    const [customerName, setCustomerName] = useState('');
    const [tableNumber, setTableNumber] = useState('');

    useEffect(() => {
        const fetchInventory = async () => {
            try {
                const data = await api.getInventory();
                setInventory(data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchInventory();
    }, []);

    const addToCart = (item: any) => {
        const existing = cart.find(i => i.id === item.id);
        if (existing) {
            setCart(cart.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
        } else {
            setCart([...cart, { ...item, quantity: 1 }]);
        }
    };

    const removeFromCart = (itemId: number) => {
        setCart(cart.filter(i => i.id !== itemId));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (cart.length === 0) return;

        setLoading(true);
        try {
            await api.createRequest({
                customer_name: customerName,
                table_number: tableNumber,
                items: cart.map(i => ({ id: i.id, name: i.name, quantity: i.quantity }))
            });
            router.push('/requests');
        } catch (err) {
            console.error(err);
            alert('Failed to create request');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">New Request</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <h3 className="text-lg font-medium">Menu</h3>
                    <div className="grid gap-4">
                        {inventory.map((item) => (
                            <Card key={item.id} className="flex justify-between items-center p-4">
                                <div>
                                    <h4 className="font-medium">{item.name}</h4>
                                    <p className="text-sm text-gray-500">${item.price}</p>
                                </div>
                                <Button size="sm" onClick={() => addToCart(item)} disabled={item.quantity <= 0}>
                                    Add
                                </Button>
                            </Card>
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-lg font-medium">Order Details</h3>
                    <Card>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <Input
                                label="Customer Name"
                                value={customerName}
                                onChange={(e) => setCustomerName(e.target.value)}
                                required
                            />
                            <Input
                                label="Table Number"
                                value={tableNumber}
                                onChange={(e) => setTableNumber(e.target.value)}
                            />

                            <div className="border-t pt-4 mt-4">
                                <h4 className="font-medium mb-2">Cart</h4>
                                {cart.length === 0 ? (
                                    <p className="text-gray-500 text-sm">Cart is empty</p>
                                ) : (
                                    <ul className="space-y-2">
                                        {cart.map((item) => (
                                            <li key={item.id} className="flex justify-between items-center text-sm">
                                                <span>{item.name} x{item.quantity}</span>
                                                <button type="button" onClick={() => removeFromCart(item.id)} className="text-red-600 hover:text-red-800">
                                                    Remove
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                            <Button type="submit" className="w-full" disabled={loading || cart.length === 0}>
                                {loading ? 'Submitting...' : 'Submit Request'}
                            </Button>
                        </form>
                    </Card>
                </div>
            </div>
        </div>
    );
}

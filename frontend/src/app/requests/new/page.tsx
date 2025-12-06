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
        <div className="space-y-8">
            <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">
                Place Your Order
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <h3 className="text-xl font-bold text-white tracking-wide border-b border-neon-blue/30 pb-2">Menu</h3>
                    <div className="grid gap-4">
                        {inventory.map((item) => (
                            <Card key={item.id} className="flex justify-between items-center p-4 hover:bg-white/5 transition-colors border-white/5">
                                <div>
                                    <h4 className="font-bold text-lg text-white">{item.name}</h4>
                                    <p className="text-sm text-neon-pink font-mono">${item.price}</p>
                                </div>
                                <Button size="sm" onClick={() => addToCart(item)} disabled={item.quantity <= 0} variant="outline">
                                    Add +
                                </Button>
                            </Card>
                        ))}
                    </div>
                </div>

                <div className="space-y-6">
                    <h3 className="text-xl font-bold text-white tracking-wide border-b border-neon-pink/30 pb-2">Your Tray</h3>
                    <Card className="border-neon-pink/20">
                        <form onSubmit={handleSubmit} className="space-y-6">
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
                            <Button type="submit" className="w-full bg-gradient-to-r from-neon-blue to-neon-purple border-none text-white font-bold shadow-lg shadow-neon-blue/20" disabled={loading || cart.length === 0}>
                                {loading ? 'Submitting...' : 'Send Request'}
                            </Button>
                        </form>
                    </Card>
                </div>
            </div>
        </div>
    );
}

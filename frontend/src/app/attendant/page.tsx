'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function AttendantPage() {
    const [assignments, setAssignments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [attendantId, setAttendantId] = useState(2); // Mock attendant ID (from seed)

    const fetchAssignments = async () => {
        try {
            setLoading(true);
            // In a real app, we'd get the attendant ID from the logged-in user
            // For now, we'll fetch all requests or just mock it
            // Since our API requires an ID for assignments, we'll use a hardcoded one or fetch all requests if we want to simulate a pool
            // But let's stick to the plan: /attendants/{id}/assignments
            // We'll assume the current user is an attendant with ID 2
            const data = await api.getAttendantAssignments(attendantId);
            setAssignments(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAssignments();
    }, []);

    const handleStatusUpdate = async (id: number, status: string) => {
        try {
            await api.updateRequest(id, { status });
            fetchAssignments();
        } catch (err) {
            console.error(err);
            alert('Failed to update status');
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Attendant Tasks</h2>

            <div className="grid gap-4">
                {assignments.length === 0 ? (
                    <p className="text-gray-500">No active assignments.</p>
                ) : (
                    assignments.map((req) => (
                        <Card key={req.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div>
                                <h3 className="font-medium text-lg">{req.customer_name}</h3>
                                <p className="text-gray-500">Table: {req.table_number}</p>
                                <div className="mt-2">
                                    {req.items && Array.isArray(req.items) && req.items.map((item: any, idx: number) => (
                                        <span key={idx} className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                                            {item.name} (x{item.quantity})
                                        </span>
                                    ))}
                                </div>
                                <p className="text-sm text-gray-500 mt-1">Status: <span className="font-medium capitalize">{req.status}</span></p>
                            </div>

                            <div className="flex gap-2">
                                {req.status === 'pending' && (
                                    <Button size="sm" onClick={() => handleStatusUpdate(req.id, 'accepted')}>
                                        Accept
                                    </Button>
                                )}
                                {req.status === 'accepted' && (
                                    <Button size="sm" onClick={() => handleStatusUpdate(req.id, 'delivered')}>
                                        Mark Delivered
                                    </Button>
                                )}
                                {req.status === 'delivered' && (
                                    <span className="text-green-600 font-medium px-4">Completed</span>
                                )}
                            </div>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}

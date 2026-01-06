import { useState, useEffect } from 'react';
import orderService from '../services/orderService';
import authService from '../services/authService';
import { Package } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CustomerOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const user = authService.getCurrentUser();

    useEffect(() => {
        const loadOrders = async () => {
            try {
                // Fix: Handle both 'userId' (camelCase) and 'UserId' (PascalCase) to avoid undefined
                const currentUserId = user.userId || user.UserId || user.id;
                const data = await orderService.getMyOrders(currentUserId);
                setOrders(data);
            } catch (error) {
                console.error("Failed to load orders", error);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            loadOrders();
        }
    }, [user]);

    if (loading) return <div>Loading your orders...</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold font-serif mb-6">My Orders</h1>
            <div className="space-y-4">
                {orders.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-lg shadow-sm">
                        <Package size={48} className="mx-auto text-gray-300 mb-4" />
                        <p className="text-gray-500">You have no orders yet.</p>
                    </div>
                ) : (
                    orders.map(order => (
                        <div key={order.id} className="bg-white border rounded-lg p-6 shadow-sm hover:shadow-md transition">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <p className="font-bold text-lg">Order #{order.id}</p>
                                    <p className="text-sm text-gray-500">Placed on {new Date(order.orderDate).toLocaleDateString()}</p>
                                </div>
                                <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-full uppercase tracking-wide">
                                    {order.status}
                                </span>
                            </div>
                            <div className="border-t pt-4 flex justify-between items-center">
                                <div>
                                    <span className="text-gray-600 text-sm">Total Amount:</span>
                                    <span className="ml-2 font-bold text-lg">Rp {order.totalAmount.toLocaleString('id-ID')}</span>
                                </div>
                                <Link to={`/dashboard/orders/${order.id}`} className="text-primary text-sm font-medium hover:underline">View Details</Link>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

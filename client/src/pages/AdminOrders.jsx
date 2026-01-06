import { useState, useEffect } from 'react';
import orderService from '../services/orderService';
import { Package, Truck, CheckCircle, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {
        try {
            const data = await orderService.getAllOrders();
            setOrders(data);
        } catch (error) {
            console.error("Failed to load orders", error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Pending': return <Clock className="text-yellow-500" size={18} />;
            case 'Processing': return <Package className="text-blue-500" size={18} />;
            case 'Shipped': return <Truck className="text-purple-500" size={18} />;
            case 'Delivered': return <CheckCircle className="text-green-500" size={18} />;
            default: return <Clock className="text-gray-500" size={18} />;
        }
    };

    const handleStatusUpdate = async (id, newStatus) => {
        try {
            await orderService.updateOrderStatus(id, newStatus);
            // Optimistic update or reload
            setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
        } catch (error) {
            console.error("Failed to update status", error);
            alert("Failed to update status");
        }
    };

    if (loading) return <div>Loading orders...</div>;

    const statusOptions = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold font-serif mb-6">Order Management</h1>
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 text-gray-600 text-xs uppercase">
                        <tr>
                            <th className="p-4">Order ID</th>
                            <th className="p-4">Date</th>
                            <th className="p-4">Customer</th>
                            <th className="p-4">Total</th>
                            <th className="p-4">Status</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {orders.map(order => (
                            <tr key={order.id} className="border-t hover:bg-gray-50">
                                <td className="p-4 font-medium">#{order.id}</td>
                                <td className="p-4">{new Date(order.orderDate).toLocaleDateString()}</td>
                                <td className="p-4">{order.shippingName || 'Guest'}</td>
                                <td className="p-4">Rp {order.totalAmount.toLocaleString('id-ID')}</td>
                                <td className="p-4">
                                    <div className="flex items-center gap-2">
                                        {getStatusIcon(order.status)}
                                        <select
                                            value={order.status}
                                            onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                                            className="border-none bg-transparent text-sm font-medium focus:ring-0 cursor-pointer"
                                        >
                                            {statusOptions.map(status => (
                                                <option key={status} value={status}>{status}</option>
                                            ))}
                                        </select>
                                    </div>
                                </td>
                                <td className="p-4 text-right">
                                    <Link to={`/admin/orders/${order.id}`} className="text-blue-500 hover:underline">View Details</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {orders.length === 0 && <div className="p-8 text-center text-gray-500">No orders found.</div>}
            </div>
        </div>
    );
}

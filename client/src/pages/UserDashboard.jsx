import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import authService from '../services/authService';
import orderService from '../services/orderService';

export default function UserDashboard() {

    const user = authService.getCurrentUser();



    if (!user) {
        return <div className="p-10 text-center">Please login first.</div>;
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="flex justify-between items-center mb-8 border-b pb-6">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-gray-900">My Account</h1>
                    <p className="text-gray-500 mt-2">Welcome back, {user.username}!</p>
                </div>
            </div>

            <div>
                <h2 className="text-xl font-bold mb-6">Recent Orders</h2>
                <OrderList />
            </div>
        </div>
    );
}

function OrderList() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {
        try {
            const user = authService.getCurrentUser();
            if (user) {
                const data = await orderService.getMyOrders(user.UserId); // Changed from getAllOrders
                setOrders(data);
            }
        } catch (error) {
            console.error("Failed to load orders", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Loading orders...</div>;

    if (orders.length === 0) {
        return (
            <div className="bg-white border rounded-lg p-8 text-center text-gray-500">
                <p>You haven't placed any orders yet.</p>
                <button onClick={() => navigate('/shop')} className="mt-4 text-primary font-medium hover:underline">Start Shopping</button>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {orders.map(order => (
                <div key={order.id} className="bg-white border rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="font-bold text-lg">Order #{order.id}</p>
                            <p className="text-sm text-gray-500">{new Date(order.orderDate).toLocaleDateString()}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                            order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                                'bg-yellow-100 text-yellow-800'
                            }`}>
                            {order.status}
                        </span>
                    </div>
                    <div className="space-y-2">
                        {order.orderItems.map(item => (
                            <div key={item.id} className="flex justify-between text-sm">
                                <span>{item.product ? item.product.name : 'Product'} x {item.quantity}</span>
                                <span>Rp {(item.price * item.quantity).toLocaleString('id-ID')}</span>
                            </div>
                        ))}
                    </div>
                    <div className="border-t mt-4 pt-4 flex justify-between font-bold">
                        <span>Total</span>
                        <span>Rp {order.totalAmount.toLocaleString('id-ID')}</span>
                    </div>
                </div>
            ))}
        </div>
    );
}


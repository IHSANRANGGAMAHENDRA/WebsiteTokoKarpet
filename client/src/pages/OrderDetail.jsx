import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import orderService from '../services/orderService';
import authService from '../services/authService';
import { ArrowLeft, Package, MapPin, CreditCard, AlertTriangle, Printer } from 'lucide-react';

export default function OrderDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    const loadOrder = async () => {
        try {
            const data = await orderService.getOrderById(id);
            setOrder(data);
        } catch (error) {
            console.error("Failed to load order", error);
            alert("Order not found");
            navigate(-1); // Go back
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadOrder();
    }, [id]);

    const handleCancelOrder = async () => {
        if (window.confirm('Are you sure you want to cancel this order?')) {
            try {
                await orderService.cancelOrder(order.id);
                alert("Order cancelled successfully.");
                loadOrder(); // Reload to show new status
            } catch (error) {
                console.error("Failed to cancel", error);
                alert("Failed to cancel order.");
            }
        }
    };

    if (loading) return <div className="p-8 text-center">Loading order details...</div>;
    if (!order) return <div className="p-8 text-center">Order not found.</div>;

    const canCancel = (order.status === 'Pending' || order.status === 'Processing');
    // const isAdmin = user?.role === 'Admin'; // Unused

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <button onClick={() => navigate(-1)} className="flex items-center text-gray-600 hover:text-primary mb-6">
                <ArrowLeft size={20} className="mr-2" /> Back to Orders
            </button>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                {/* Header */}
                <div className="bg-gray-50 px-6 py-4 border-b flex justify-between items-center flex-wrap gap-4">
                    <div>
                        <h1 className="text-xl font-bold font-serif">Order #{order.id}</h1>
                        <p className="text-sm text-gray-500">Placed on {new Date(order.orderDate).toLocaleDateString()} at {new Date(order.orderDate).toLocaleTimeString()}</p>
                    </div>
                    <div className="flex items-center gap-3 print:hidden">
                        <span className={`px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wide border ${order.status === 'Cancelled' ? 'bg-red-50 text-red-600 border-red-100' :
                            order.status === 'Delivered' ? 'bg-green-50 text-green-600 border-green-100' :
                                'bg-blue-50 text-blue-600 border-blue-100'
                            }`}>
                            {order.status}
                        </span>
                        {canCancel && (
                            <button
                                onClick={handleCancelOrder}
                                className="px-4 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 transition flex items-center gap-2"
                            >
                                <AlertTriangle size={16} /> Cancel Order
                            </button>
                        )}
                        <button
                            onClick={handlePrint}
                            className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center gap-2"
                        >
                            <Printer size={16} /> Print Invoice
                        </button>
                    </div>
                </div>

                <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Order Items */}
                    <div className="md:col-span-2 space-y-6">
                        <h2 className="font-bold text-lg mb-4 flex items-center gap-2"><Package size={20} /> Items Ordered</h2>
                        <div className="space-y-4">
                            {order.orderItems.map((item) => (
                                <div key={item.id} className="flex gap-4 border-b pb-4 last:border-0 last:pb-0">
                                    <div className="w-20 h-20 print:w-32 print:h-32 bg-gray-100 rounded overflow-hidden shrink-0">
                                        {/* Fallback image if product is deleted or image invalid */}
                                        <img
                                            src={item.product?.imageUrl || 'https://via.placeholder.com/150'}
                                            alt={item.product?.name || 'Product'}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-gray-800">{item.product?.name || "Unknown Product"}</h3>
                                        <p className="text-sm text-gray-500">{item.quantity} x Rp {item.price.toLocaleString('id-ID')}</p>
                                    </div>
                                    <div className="font-bold">
                                        Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="border-t pt-4 flex justify-between items-center text-lg font-bold">
                            <span>Total Amount</span>
                            <span>Rp {order.totalAmount.toLocaleString('id-ID')}</span>
                        </div>
                    </div>

                    {/* Sidebar Info */}
                    <div className="space-y-6">
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2"><MapPin size={18} /> Shipping Detail</h3>
                            <p className="font-medium">{order.shippingName || "No Name"}</p>
                            <p className="text-sm text-gray-600 mt-1 whitespace-pre-wrap">{order.shippingAddress}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2"><CreditCard size={18} /> Payment Info</h3>
                            <p className="text-sm text-gray-600">Method: <span className="font-medium text-gray-900">{order.paymentMethod || "Bank Transfer"}</span></p>
                            <p className="text-sm text-gray-600 mt-1">Status: <span className="font-medium text-gray-900">{order.status === 'Cancelled' ? 'Void' : 'Paid (Simulated)'}</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

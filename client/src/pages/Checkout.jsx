
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import authService from '../services/authService';
import orderService from '../services/orderService';
import { useNavigate } from 'react-router-dom';
import { X, CheckCircle, CreditCard, Building2, Wallet, QrCode } from 'lucide-react';

export default function Checkout() {
    const { cartItems, cartTotal, clearCart } = useCart();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [currentOrder, setCurrentOrder] = useState(null);
    const user = authService.getCurrentUser();

    const [formData, setFormData] = useState({
        fullName: 'Udin', // Default values for simpler demo
        address: 'Jl. Contoh No. 123',
        phone: '08123456789',
        email: 'udin@example.com',
        paymentMethod: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Guard: Require login
    if (!user) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <h2 className="text-3xl font-serif font-bold mb-4">Please Login First</h2>
                <p className="text-gray-600 mb-8">You need to be logged in to proceed with checkout.</p>
                <div className="flex justify-center gap-4">
                    <button onClick={() => navigate('/login')} className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-gray-800 transition">
                        Login Now
                    </button>
                    <button onClick={() => navigate('/shop')} className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                        Continue Shopping
                    </button>
                </div>
            </div>
        );
    }



    const handleSubmit = async (e) => {
        e.preventDefault();
        if (cartItems.length === 0) return;

        setLoading(true);
        try {
            // Prepare payload
            const orderPayload = {
                userId: user.userId || user.UserId || user.id,
                totalAmount: cartTotal,
                shippingAddress: `${formData.address}, Phone: ${formData.phone} `,
                paymentMethod: formData.paymentMethod || "Bank Transfer",
                shippingName: formData.fullName,
                orderItems: cartItems.map(item => ({
                    productId: item.id,
                    quantity: item.quantity,
                    price: item.price
                }))
            };

            // 1. Create Order in Backend
            const newOrder = await orderService.createOrder(orderPayload);

            // 2. Open Mock Payment Modal instead of Midtrans
            setCurrentOrder(newOrder);
            setShowPaymentModal(true);

        } catch (error) {
            console.error("Order process failed", error);
            alert('Failed to place order. ' + (error.response?.data || error.message));
        } finally {
            setLoading(false);
        }
    };

    const handleSimulatePayment = async () => {
        setLoading(true);
        try {
            // Simulate processing delay
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Update status
            await orderService.updateOrderStatus(currentOrder.id, "Processing");

            clearCart();
            setShowPaymentModal(false);
            navigate('/dashboard/orders');
        } catch (error) {
            console.error("Payment failed", error);
            alert("Simulation failed");
        } finally {
            setLoading(false);
        }
    };

    if (cartItems.length === 0 && !showPaymentModal) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <h2 className="text-2xl font-serif mb-4">Your cart is empty</h2>
                <button onClick={() => navigate('/shop')} className="text-primary underline">Back to Shop</button>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12 relative">
            <h1 className="text-3xl font-serif font-bold mb-8 text-center">Checkout</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Form Section */}
                <div>
                    <h2 className="text-xl font-bold mb-6">Shipping Details</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Full Name</label>
                            <input
                                type="text"
                                name="fullName"
                                required
                                value={formData.fullName}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-secondary"
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                required
                                value={formData.email}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-secondary"
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Phone</label>
                            <input
                                type="tel"
                                name="phone"
                                required
                                value={formData.phone}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-secondary"
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Shipping Address</label>
                            <textarea
                                name="address"
                                required
                                rows="3"
                                value={formData.address}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-secondary"
                                onChange={handleChange}
                            ></textarea>
                        </div>

                        {/* Payment Method Section */}
                        <div className="pt-4 border-t">
                            <h3 className="text-lg font-bold mb-3">Payment Method</h3>
                            <div className="space-y-3">
                                <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="Bank Transfer (BCA/Mandiri)"
                                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                        onChange={handleChange}
                                        required
                                    />
                                    <span className="ml-3 font-medium text-gray-700">Bank Transfer (BCA/Mandiri)</span>
                                </label>
                                <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="E-Wallet (Dana/OVO/Gopay)"
                                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                        onChange={handleChange}
                                    />
                                    <span className="ml-3 font-medium text-gray-700">E-Wallet (Dana/OVO/Gopay)</span>
                                </label>
                                <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="QRIS (Scan)"
                                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                        onChange={handleChange}
                                    />
                                    <span className="ml-3 font-medium text-gray-700">QRIS (Scan Code)</span>
                                </label>
                                <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="Seabank / Jago"
                                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                        onChange={handleChange}
                                    />
                                    <span className="ml-3 font-medium text-gray-700">Digital Bank (Seabank/Jago)</span>
                                </label>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary text-white font-medium py-3 rounded-lg hover:bg-gray-800 transition disabled:opacity-50 mt-4"
                        >
                            {loading ? 'Processing...' : 'Place Order'}
                        </button>
                    </form>
                </div>

                {/* Order Summary */}
                <div className="bg-gray-50 p-6 rounded-lg h-fit">
                    <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                    <div className="space-y-4 mb-6">
                        {cartItems.map((item) => (
                            <div key={item.id} className="flex justify-between items-center text-sm">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-gray-200 rounded overflow-hidden">
                                        <img src={item.imageUrl || item.image} alt={item.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <p className="font-medium">{item.name}</p>
                                        <p className="text-gray-500">Qty: {item.quantity}</p>
                                    </div>
                                </div>
                                <span>Rp {(item.price * item.quantity).toLocaleString('id-ID')}</span>
                            </div>
                        ))}
                    </div>
                    <div className="border-t border-gray-200 pt-4 flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>Rp {cartTotal.toLocaleString('id-ID')}</span>
                    </div>
                </div>
            </div>

            {/* MOCK PAYMENT MODAL */}
            {showPaymentModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
                        <div className="bg-gray-50 px-6 py-4 border-b flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <CreditCard className="text-primary" size={24} />
                                <h3 className="font-bold text-lg text-gray-800">Secure Payment</h3>
                            </div>
                            <button onClick={() => setShowPaymentModal(false)} className="text-gray-400 hover:text-gray-600">
                                <X size={24} />
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            <div className="text-center">
                                <p className="text-sm text-gray-500 mb-1">Total Amount</p>
                                <p className="text-3xl font-bold text-gray-900">Rp {cartTotal.toLocaleString('id-ID')}</p>
                            </div>

                            <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg flex gap-3 text-blue-800 text-sm">
                                <Building2 size={20} className="shrink-0" />
                                <div>
                                    <p className="mb-2">You selected <strong>{formData.paymentMethod}</strong>.</p>

                                    {formData.paymentMethod.includes("Bank Transfer") && (
                                        <div className="bg-white p-3 rounded border border-blue-200 mt-2">
                                            <p className="font-bold text-gray-700">Bank BCA</p>
                                            <p className="font-mono text-lg tracking-wider">123-456-7890</p>
                                            <p className="text-xs text-gray-500">a/n LuxeCarpet Admin</p>
                                        </div>
                                    )}

                                    {formData.paymentMethod.includes("E-Wallet") && (
                                        <div className="bg-white p-3 rounded border border-blue-200 mt-2">
                                            <p className="font-bold text-gray-700">Dana / OVO / Gopay</p>
                                            <p className="font-mono text-lg tracking-wider">0812-3456-7890</p>
                                            <p className="text-xs text-gray-500">a/n LuxeCarpet Official</p>
                                        </div>
                                    )}

                                    {formData.paymentMethod.includes("Seabank") && (
                                        <div className="bg-white p-3 rounded border border-blue-200 mt-2">
                                            <p className="font-bold text-gray-700">Seabank / Bank Jago</p>
                                            <p className="font-mono text-lg tracking-wider">9012-3456-7890</p>
                                            <p className="text-xs text-gray-500">a/n LuxeCarpet Admin</p>
                                        </div>
                                    )}

                                    {formData.paymentMethod.includes("QRIS") && (
                                        <div className="bg-white p-3 rounded border border-blue-200 mt-2 text-center">
                                            <div className="w-32 h-32 bg-gray-200 mx-auto flex items-center justify-center mb-2">
                                                <QrCode size={48} className="text-gray-400" />
                                            </div>
                                            <p className="text-xs text-gray-500">Scan this QR Code</p>
                                        </div>
                                    )}

                                    <p className="mt-2 text-xs opacity-75">Click 'Confirm Payment' to simulate a successful transfer.</p>
                                </div>
                            </div>

                            <button
                                onClick={handleSimulatePayment}
                                disabled={loading}
                                className="w-full py-4 bg-primary text-white rounded-lg font-bold text-lg hover:bg-gray-800 transition flex justify-center items-center gap-2"
                            >
                                {loading ? (
                                    <span>Processing Payment...</span>
                                ) : (
                                    <>
                                        <CheckCircle size={20} />
                                        Confirm Payment
                                    </>
                                )}
                            </button>

                            <p className="text-xs text-center text-gray-400">
                                Secured by LuxeCarpet Payment Gateway
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}


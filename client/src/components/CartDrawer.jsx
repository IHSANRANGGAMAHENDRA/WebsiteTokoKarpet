import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function CartDrawer() {
    const {
        isCartOpen,
        setIsCartOpen,
        cartItems,
        removeFromCart,
        updateQuantity,
        cartTotal
    } = useCart();

    if (!isCartOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] overflow-hidden">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
                onClick={() => setIsCartOpen(false)}
            ></div>

            {/* Drawer */}
            <div className="absolute inset-y-0 right-0 max-w-md w-full flex pl-10">
                <div className="w-full h-full bg-white shadow-xl flex flex-col">
                    {/* Header */}
                    <div className="px-4 py-6 bg-gray-50 border-b flex justify-between items-center">
                        <h2 className="text-lg font-serif font-bold text-gray-900 flex items-center gap-2">
                            <ShoppingBag size={20} /> Shopping Cart
                        </h2>
                        <button
                            onClick={() => setIsCartOpen(false)}
                            className="text-gray-400 hover:text-gray-500"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    {/* Items */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-6">
                        {cartItems.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-gray-500 space-y-4">
                                <ShoppingBag size={48} className="text-gray-300" />
                                <p>Your cart is empty.</p>
                                <Link
                                    to="/shop"
                                    onClick={() => setIsCartOpen(false)}
                                    className="text-primary font-medium hover:underline"
                                >
                                    Start Shopping
                                </Link>
                            </div>
                        ) : (
                            cartItems.map((item) => (
                                <div key={item.id} className="flex gap-4">
                                    {/* Image */}
                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                        <img
                                            src={item.imageUrl || item.image || "https://via.placeholder.com/150"}
                                            alt={item.name}
                                            className="h-full w-full object-cover object-center"
                                        />
                                    </div>

                                    {/* Details */}
                                    <div className="flex flex-1 flex-col">
                                        <div>
                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                                <h3>{item.name}</h3>
                                                <p className="ml-4">Rp {(item.price * item.quantity).toLocaleString('id-ID')}</p>
                                            </div>
                                            <p className="mt-1 text-sm text-gray-500">{item.category}</p>
                                        </div>
                                        <div className="flex flex-1 items-end justify-between text-sm">
                                            <div className="flex items-center border rounded-md">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="p-1 hover:bg-gray-100"
                                                >
                                                    <Minus size={14} />
                                                </button>
                                                <span className="px-2 font-medium">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="p-1 hover:bg-gray-100"
                                                >
                                                    <Plus size={14} />
                                                </button>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() => removeFromCart(item.id)}
                                                className="font-medium text-red-500 hover:text-red-600 flex items-center gap-1"
                                            >
                                                <Trash2 size={16} />
                                                <span className="text-xs">Remove</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Footer */}
                    {cartItems.length > 0 && (
                        <div className="border-t border-gray-200 px-4 py-6 bg-gray-50">
                            <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
                                <p>Subtotal</p>
                                <p>Rp {cartTotal.toLocaleString('id-ID')}</p>
                            </div>
                            <p className="mt-0.5 text-sm text-gray-500 mb-6">
                                Shipping and taxes calculated at checkout.
                            </p>
                            <Link
                                to="/checkout"
                                onClick={() => setIsCartOpen(false)}
                                className="flex items-center justify-center rounded-md border border-transparent bg-primary px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-800"
                            >
                                Checkout
                            </Link>
                            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                <p>
                                    or{' '}
                                    <button
                                        type="button"
                                        className="font-medium text-secondary hover:text-yellow-600"
                                        onClick={() => setIsCartOpen(false)}
                                    >
                                        Continue Shopping
                                        <span aria-hidden="true"> &rarr;</span>
                                    </button>
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

import { ShoppingCart, Eye, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
// import { useState } from 'react'; // No longer needed
import authService from '../services/authService';

export default function ProductCard({ product }) {
    const { addToCart } = useCart();
    const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();

    const user = authService.getCurrentUser();

    const isWhitelisted = isInWishlist(product.id);

    const handleWishlistToggle = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (!user) {
            alert("Please login to use wishlist");
            return;
        }

        if (isWhitelisted) {
            await removeFromWishlist(product.id);
        } else {
            await addToWishlist(product.id);
        }
    };

    return (
        <div className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100">
            {/* Image Container */}
            <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Quick Action Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex gap-2 justify-center bg-white/90 backdrop-blur-sm">
                    <button onClick={() => addToCart(product)} className="p-2 bg-primary text-white rounded-full hover:bg-black transition-colors" title="Add to Cart">
                        <ShoppingCart size={18} />
                    </button>
                    <button onClick={handleWishlistToggle} className={`p-2 rounded-full transition-colors border border-gray-200 ${isWhitelisted ? 'bg-red-50 text-red-500 border-red-200' : 'bg-white text-gray-700 hover:bg-gray-50'}`} title="Wishlist">
                        <Heart size={18} fill={isWhitelisted ? "currentColor" : "none"} />
                    </button>
                    <Link to={`/product/${product.id}`} className="p-2 bg-white border border-gray-200 text-gray-700 rounded-full hover:bg-gray-50 transition-colors" title="View Details">
                        <Eye size={18} />
                    </Link>
                </div>
            </div>

            {/* Product Info */}
            <div className="p-4">
                <p className="text-xs text-secondary font-medium uppercase tracking-wide mb-1">{product.category}</p>
                <Link to={`/product/${product.id}`}>
                    <h3 className="font-serif font-bold text-lg text-gray-900 mb-2 group-hover:text-secondary transition-colors line-clamp-1">{product.name}</h3>
                </Link>
                <div className="flex items-center justify-between">
                    <span className="text-gray-900 font-semibold">
                        {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(product.price)}
                    </span>
                </div>
            </div>
        </div>
    );
}

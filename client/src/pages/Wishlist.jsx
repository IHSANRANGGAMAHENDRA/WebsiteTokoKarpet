import { Link } from 'react-router-dom';
import { Heart, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export default function Wishlist() {
    const { wishlistItems: items, removeFromWishlist, loading } = useWishlist();
    const { addToCart } = useCart();

    if (loading) return <div className="container mx-auto px-4 py-8 text-center text-gray-500">Memuat wishlist...</div>;

    if (items.length === 0) {
        return (
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold font-serif mb-6">My Wishlist</h1>
                <div className="text-center py-20 bg-white rounded-lg shadow-sm">
                    <Heart size={48} className="mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-500 mb-4">Your wishlist is empty.</p>
                    <Link to="/shop" className="text-primary font-medium hover:underline">Browse Collection</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold font-serif mb-6">My Wishlist</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map(({ product }) => (
                    <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col group">
                        <div className="relative aspect-[4/3] overflow-hidden bg-gray-200">
                            <img
                                src={product.imageUrl}
                                alt={product.name}
                                className="h-full w-full object-cover object-center group-hover:scale-105 transition duration-300"
                            />
                            <button
                                onClick={() => removeFromWishlist(product.id)}
                                className="absolute top-2 right-2 p-2 bg-white/80 rounded-full hover:bg-white text-gray-500 hover:text-red-500 transition"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                        <div className="p-4 flex flex-col flex-1">
                            <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{product.name}</h3>
                            <p className="text-primary font-medium mt-1">Rp {product.price.toLocaleString('id-ID')}</p>
                            <div className="mt-4 mt-auto">
                                <button
                                    onClick={() => addToCart(product)}
                                    className="w-full flex items-center justify-center gap-2 bg-primary text-white py-2 rounded hover:bg-gray-800 transition"
                                >
                                    <ShoppingBag size={18} /> Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

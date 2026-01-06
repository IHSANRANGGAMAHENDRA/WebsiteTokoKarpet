import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Star, Truck, ShieldCheck, ArrowLeft } from 'lucide-react';
import { useState, useEffect } from 'react';
import productService from '../services/productService';
import authService from '../services/authService';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export default function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeImage, setActiveImage] = useState("");
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();
    const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();

    const isWhitelisted = product ? isInWishlist(product.id) : false;

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await productService.getProductById(id);
                setProduct(data);
                // Use imageUrl from API or a placeholder if missing
                setActiveImage(data.imageUrl || "https://via.placeholder.com/500");
            } catch (error) {
                console.error("Failed to fetch product", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    if (loading) return (
        <div className="container mx-auto px-4 py-20 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-500">Loading details...</p>
        </div>
    );

    if (!product) return (
        <div className="container mx-auto px-4 py-20 text-center">
            <h2 className="text-2xl font-serif mb-4">Product Not Found</h2>
            <Link to="/shop" className="text-primary underline">Back to Shop</Link>
        </div>
    );

    // Fallback for specs if not provided by API
    const specs = product.specs || {
        material: product.material || "Premium Quality",
        origin: "Imported"
    };

    // Use images array if available, otherwise just use the main imageUrl
    const images = product.images || [product.imageUrl];

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Breadcrumb / Back */}
            <Link to="/shop" className="inline-flex items-center text-gray-500 hover:text-primary mb-6 transition">
                <ArrowLeft size={20} className="mr-2" />
                Back to Collection
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* LEFT: Image Gallery */}
                <div className="space-y-4">
                    <div className="aspect-[4/5] md:aspect-square bg-gray-100 rounded-lg overflow-hidden shadow-sm">
                        <img
                            src={activeImage || "https://via.placeholder.com/500"}
                            alt={product.name}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                    </div>
                    {/* Only show thumbnails if there are multiple images */}
                    {images.length > 1 && (
                        <div className="grid grid-cols-4 gap-4">
                            {images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveImage(img)}
                                    className={`aspect-square rounded-md overflow-hidden border-2 transition ${activeImage === img ? 'border-secondary' : 'border-transparent hover:border-gray-200'
                                        }`}
                                >
                                    <img src={img} alt={`View ${idx}`} className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* RIGHT: Product Info */}
                <div className="space-y-8">
                    <div>
                        <span className="text-secondary font-medium tracking-wider uppercase text-sm">
                            {product.category || "Collection"}
                        </span>
                        <h1 className="text-4xl font-serif font-bold text-primary mt-2 mb-4">
                            {product.name}
                        </h1>
                        <div className="flex items-center space-x-4 mb-6">
                            <span className="text-3xl font-light text-gray-900">
                                Rp {product.price?.toLocaleString('id-ID')}
                            </span>
                        </div>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            {product.description || "No description available."}
                        </p>
                    </div>

                    {/* Specs Grid */}
                    <div className="grid grid-cols-2 gap-y-4 gap-x-8 py-6 border-y border-gray-100">
                        {Object.entries(specs).map(([key, value]) => (
                            <div key={key}>
                                <dt className="text-gray-400 text-sm capitalize">{key}</dt>
                                <dd className="font-medium text-primary">{value || "-"}</dd>
                            </div>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="space-y-4">
                        <div className="flex space-x-4">
                            <div className="flex items-center border border-gray-300 rounded-lg">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="px-4 py-3 hover:bg-gray-50 text-gray-600"
                                >
                                    -
                                </button>
                                <span className="px-4 font-medium text-primary w-12 text-center">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="px-4 py-3 hover:bg-gray-50 text-gray-600"
                                >
                                    +
                                </button>
                            </div>
                            <button
                                onClick={() => addToCart(product, quantity)}
                                className="flex-1 bg-primary text-white font-medium py-3 px-8 rounded-lg hover:bg-gray-800 transition flex items-center justify-center space-x-2"
                            >
                                <ShoppingCart size={20} />
                                <span>Add to Cart</span>
                            </button>
                            <button
                                onClick={async () => {
                                    const user = authService.getCurrentUser();
                                    if (!user) return alert("Silakan login terlebih dahulu");

                                    if (isWhitelisted) {
                                        await removeFromWishlist(product.id);
                                    } else {
                                        await addToWishlist(product.id);
                                    }
                                }}
                                className={`p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition ${isWhitelisted ? 'text-red-500 bg-red-50' : 'text-gray-600'}`}
                                title={isWhitelisted ? "Remove from Wishlist" : "Add to Wishlist"}
                            >
                                <Heart size={20} fill={isWhitelisted ? "currentColor" : "none"} />
                            </button>
                        </div>
                    </div>

                    {/* Features */}
                    <div className="grid grid-cols-2 gap-4 pt-4">
                        <div className="flex items-center space-x-3 text-sm text-gray-600">
                            <Truck size={20} className="text-secondary" />
                            <span>Free Shipping</span>
                        </div>
                        <div className="flex items-center space-x-3 text-sm text-gray-600">
                            <ShieldCheck size={20} className="text-secondary" />
                            <span>Authenticity Guarantee</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Menu, Heart } from 'lucide-react';
import { useState } from 'react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import authService from '../services/authService';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { cartCount, toggleCart } = useCart();
    const { wishlistCount } = useWishlist();
    const navigate = useNavigate();
    const user = authService.getCurrentUser();

    const handleLogout = () => {
        authService.logout();
        navigate('/');
        window.location.reload();
    };

    return (
        <nav className="sticky top-0 z-50 bg-white shadow-sm">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="text-2xl font-serif font-bold text-primary">
                    LuxeCarpet
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-8 text-sm font-medium text-gray-600">
                    <Link to="/" className="hover:text-secondary transition">Home</Link>
                    <Link to="/shop" className="hover:text-secondary transition">Collection</Link>
                    <Link to="/about" className="hover:text-secondary transition">Our Story</Link>
                    <Link to="/contact" className="hover:text-secondary transition">Contact</Link>
                </div>

                {/* Icons */}
                <div className="flex items-center space-x-4">
                    <Link to="/dashboard/wishlist" className="text-gray-600 hover:text-primary relative hidden md:block" title="Wishlist">
                        <Heart size={24} />
                        {wishlistCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                                {wishlistCount}
                            </span>
                        )}
                    </Link>
                    <button
                        onClick={toggleCart}
                        className="text-gray-600 hover:text-primary relative"
                    >
                        <ShoppingCart size={24} />
                        {/* Cart Count Badge */}
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-secondary text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                                {cartCount}
                            </span>
                        )}
                    </button>
                    {user ? (
                        <div className="flex items-center gap-4 hidden md:flex">
                            <span className="text-sm font-medium text-gray-700">Hi, {user.Message ? 'User' : user.username || 'User'}</span>
                            <button onClick={handleLogout} className="text-sm text-red-500 hover:underline">Logout</button>
                        </div>
                    ) : (
                        <Link to="/login" className="text-gray-600 hover:text-primary hidden md:block">
                            <User size={24} />
                        </Link>
                    )}
                    {/* Mobile Menu Button */}
                    <button className="md:hidden text-gray-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        <Menu size={24} />
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-t p-4 space-y-4">
                    <Link to="/" className="block text-gray-600">Home</Link>
                    <Link to="/shop" className="block text-gray-600">Collection</Link>
                    <Link to="/about" className="block text-gray-600">Our Story</Link>
                    <Link to="/login" className="block text-gray-600">Account</Link>
                </div>
            )}
        </nav>
    );
}

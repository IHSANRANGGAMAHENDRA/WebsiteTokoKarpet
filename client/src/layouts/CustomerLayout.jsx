import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { User, ShoppingBag, Heart, LogOut } from 'lucide-react';
import authService from '../services/authService';
import { useEffect } from 'react';

export default function CustomerLayout() {
    const navigate = useNavigate();
    const location = useLocation();
    const user = authService.getCurrentUser();

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    const handleLogout = () => {
        authService.logout();
        navigate('/');
        window.location.reload();
    };

    if (!user) return null;

    const menuItems = [
        { icon: User, label: 'My Account', path: '/dashboard' },
        { icon: ShoppingBag, label: 'Orders', path: '/dashboard/orders' },
        { icon: Heart, label: 'Wishlist', path: '/dashboard/wishlist' },
        { icon: User, label: 'Settings', path: '/dashboard/settings' },
    ];

    return (
        <div className="flex min-h-screen bg-gray-50 font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-sm flex flex-col fixed inset-y-0 left-0 z-40 border-r">
                <div className="p-6 border-b flex items-center justify-between">
                    <Link to="/" className="text-xl font-serif font-bold text-primary">LuxeCarpet</Link>
                </div>

                <div className="p-6 pb-2">
                    <p className="text-xs text-uppercase text-gray-500 font-semibold tracking-wider mb-4">CUSTOMER MENU</p>
                    <nav className="space-y-1">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = location.pathname === item.path;
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${isActive
                                        ? 'bg-primary text-white'
                                        : 'text-gray-600 hover:bg-gray-100 hover:text-primary'
                                        }`}
                                >
                                    <Icon size={18} />
                                    <span className="font-medium text-sm">{item.label}</span>
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                <div className="mt-auto p-4 border-t">
                    <div className="flex items-center gap-3 px-4 py-3 mb-2">
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold text-xs uppercase">
                            {(user.username || 'U').substring(0, 2)}
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-sm font-medium text-gray-900 truncate">{user.username || 'User'}</p>
                            <p className="text-xs text-gray-500">Member</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors text-sm font-medium"
                    >
                        <LogOut size={18} />
                        Logout
                    </button>
                    <Link to="/" className="block mt-2 text-center text-xs text-gray-400 hover:underline">Back to Home</Link>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 ml-64 p-8">
                <Outlet />
            </main>
        </div>
    );
}

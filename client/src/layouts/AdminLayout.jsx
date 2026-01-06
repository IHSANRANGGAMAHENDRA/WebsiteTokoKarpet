import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingBag, Users, LogOut, Settings } from 'lucide-react';
import authService from '../services/authService';
import { useEffect } from 'react';

export default function AdminLayout() {
    const navigate = useNavigate();
    const location = useLocation();
    const user = authService.getCurrentUser();

    useEffect(() => {
        if (!user || user.role !== 'Admin') {
            navigate('/login');
        }
    }, [user, navigate]);

    const handleLogout = () => {
        authService.logout();
        navigate('/');
        window.location.reload();
    };

    const menuItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
        { icon: Package, label: 'Products', path: '/admin/products' },
        { icon: ShoppingBag, label: 'Orders', path: '/admin/orders' },
        { icon: Users, label: 'Customers', path: '/admin/customers' },
        { icon: Settings, label: 'Settings', path: '/admin/settings' },
    ];

    if (!user || user.role !== 'Admin') return null;

    return (
        <div className="flex min-h-screen bg-gray-100 font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md flex flex-col fixed inset-y-0 left-0 z-50">
                <div className="p-6 border-b">
                    <h1 className="text-2xl font-serif font-bold text-primary">LuxeAdmin</h1>
                    <p className="text-xs text-gray-500 mt-1">Management Console</p>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path));

                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                    ? 'bg-primary text-white shadow-sm'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-primary'
                                    }`}
                            >
                                <Icon size={20} />
                                <span className="font-medium text-sm">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t">
                    <div className="flex items-center gap-3 px-4 py-3 mb-2">
                        <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-white font-bold text-xs">
                            AD
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-sm font-medium text-gray-900 truncate">{user.username || 'Admin'}</p>
                            <p className="text-xs text-gray-500">Administrator</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors text-sm font-medium"
                    >
                        <LogOut size={20} />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 ml-64 p-8 overflow-y-auto">
                <Outlet key={location.pathname} />
            </main>
        </div>
    );
}

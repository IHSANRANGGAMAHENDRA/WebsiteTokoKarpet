import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import dashboardService from '../services/dashboardService';
import { useState, useEffect } from 'react';
import { ShoppingBag, DollarSign, Package, Users } from 'lucide-react';

export default function AdminDashboard() {
    const navigate = useNavigate();
    const user = authService.getCurrentUser();
    const [stats, setStats] = useState({
        totalOrders: 0,
        totalRevenue: 0,
        totalProducts: 0,
        totalCustomers: 0,
        todayOrders: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user && user.role === 'Admin') {
            loadStats();
        }
    }, [user]);

    const loadStats = async () => {
        try {
            const data = await dashboardService.getStats();
            setStats(data);
        } catch (error) {
            console.error("Failed to load stats", error);
        } finally {
            setLoading(false);
        }
    };



    if (!user || user.role !== 'Admin') {
        return <div className="p-10 text-center">Access Denied. Admins only.</div>;
    }

    if (loading) return <div className="p-10 text-center">Loading dashboard...</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-serif font-bold text-gray-900">Admin Dashboard</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-full">
                        <ShoppingBag size={24} />
                    </div>
                    <div>
                        <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider">Total Orders</h3>
                        <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
                        <p className="text-green-500 text-xs mt-1">+{stats.todayOrders} today</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="p-3 bg-green-50 text-green-600 rounded-full">
                        <DollarSign size={24} />
                    </div>
                    <div>
                        <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider">Total Revenue</h3>
                        <p className="text-2xl font-bold text-gray-900">Rp {stats.totalRevenue.toLocaleString('id-ID')}</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="p-3 bg-purple-50 text-purple-600 rounded-full">
                        <Package size={24} />
                    </div>
                    <div>
                        <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider">Products</h3>
                        <p className="text-2xl font-bold text-gray-900">{stats.totalProducts}</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="p-3 bg-orange-50 text-orange-600 rounded-full">
                        <Users size={24} />
                    </div>
                    <div>
                        <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider">Customers</h3>
                        <p className="text-2xl font-bold text-gray-900">{stats.totalCustomers}</p>
                    </div>
                </div>
            </div>

            <div className="mt-8">
                <h2 className="text-xl font-bold mb-6">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <button onClick={() => navigate('/admin/products')} className="p-6 bg-white rounded-lg border border-gray-200 hover:border-primary hover:shadow-md transition text-left group">
                        <h3 className="font-bold text-lg group-hover:text-primary mb-2">Manage Products</h3>
                        <p className="text-gray-600 text-sm">Add, edit, or delete products.</p>
                    </button>

                    <button onClick={() => navigate('/admin/orders')} className="p-6 bg-white rounded-lg border border-gray-200 hover:border-primary hover:shadow-md transition text-left group">
                        <h3 className="font-bold text-lg group-hover:text-primary mb-2">Manage Orders</h3>
                        <p className="text-gray-600 text-sm">Update shipping status.</p>
                    </button>

                    <button onClick={() => navigate('/admin/customers')} className="p-6 bg-white rounded-lg border border-gray-200 hover:border-primary hover:shadow-md transition text-left group">
                        <h3 className="font-bold text-lg group-hover:text-primary mb-2">User Accounts</h3>
                        <p className="text-gray-600 text-sm">View customer list.</p>
                    </button>
                </div>
            </div>
        </div>
    );
}

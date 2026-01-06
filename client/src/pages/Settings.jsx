import { useState, useEffect } from 'react';
import authService from '../services/authService';
import api from '../api/axiosConfig';

export default function Settings() {
    const [formData, setFormData] = useState({
        fullName: '',
        address: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    // Get user once
    const [user] = useState(() => authService.getCurrentUser());

    useEffect(() => {
        if (user) {
            setFormData({
                fullName: user.fullName || '',
                address: user.address || ''
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        if (!user) return;

        try {
            await api.put(`/api/users/${user.UserId}`, {
                id: user.UserId,
                ...formData
            });
            setMessage('Profile updated successfully!');

            // Update local storage carefully
            const updatedUser = { ...user, ...formData };
            localStorage.setItem('user', JSON.stringify(updatedUser));
        } catch (error) {
            console.error("Update failed", error);
            setMessage('Failed to update profile.');
        } finally {
            setLoading(false);
        }
    };

    if (!user) return <div className="p-8 text-center">Please login.</div>;

    return (
        <div className="container mx-auto px-4 py-8 max-w-lg">
            <h1 className="text-2xl font-serif font-bold mb-6">Profile Settings</h1>

            {message && (
                <div className={`p-4 mb-4 rounded ${message.includes('success') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                    {message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Shipping Address</label>
                    <textarea
                        name="address"
                        rows="3"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
                    ></textarea>
                </div>

                <div className="flex gap-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 bg-primary text-white font-medium py-2 rounded-lg hover:bg-gray-800 transition disabled:opacity-50"
                    >
                        {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>

            </form>
        </div>
    );
}

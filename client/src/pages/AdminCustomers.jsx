import { useState, useEffect } from 'react';
import userService from '../services/userService';

export default function AdminCustomers() {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadCustomers();
    }, []);

    const loadCustomers = async () => {
        try {
            const data = await userService.getAllCustomers();
            setCustomers(data);
        } catch (error) {
            console.error("Failed to load customers", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Loading customers...</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold font-serif mb-6">Customers</h1>
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 text-gray-600 text-xs uppercase">
                        <tr>
                            <th className="p-4">ID</th>
                            <th className="p-4">Username</th>
                            <th className="p-4">Role</th>
                            {/* <th className="p-4">Formatted Join Date</th> */}
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {customers.map(customer => (
                            <tr key={customer.id} className="border-t hover:bg-gray-50">
                                <td className="p-4 font-medium">#{customer.id}</td>
                                <td className="p-4 font-bold">{customer.username}</td>
                                <td className="p-4">{customer.role}</td>
                                {/* <td className="p-4">{new Date(customer.joinDate).toLocaleDateString()}</td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
                {customers.length === 0 && <div className="p-8 text-center text-gray-500">No customers found.</div>}
            </div>
        </div>
    );
}

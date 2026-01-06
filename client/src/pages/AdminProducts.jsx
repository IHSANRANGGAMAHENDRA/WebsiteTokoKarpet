import { useState, useEffect } from 'react';
import productService from '../services/productService';
import { Plus, Edit, Trash2, X, Save } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        stock: '',
        imageUrl: '',
        category: '',
        material: ''
    });

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            const data = await productService.getAllProducts();
            setProducts(data);
        } catch (error) {
            console.error("Failed to load products", error);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (product) => {
        setIsEditing(true);
        setCurrentProduct(product);
        setFormData({
            name: product.name,
            description: product.description,
            price: product.price,
            stock: product.stock,
            imageUrl: product.imageUrl,
            category: product.category,
            material: product.material
        });
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await productService.deleteProduct(id);
                loadProducts();
            } catch (error) {
                console.error("Failed to delete", error);
                alert("Failed to delete product");
            }
        }
    };

    const handleAddNew = () => {
        setIsEditing(true);
        setCurrentProduct(null);
        setFormData({
            name: '',
            description: '',
            price: '',
            stock: '',
            imageUrl: '',
            category: '',
            material: ''
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                ...formData,
                price: parseFloat(formData.price),
                stock: parseInt(formData.stock)
            };

            if (currentProduct) {
                await productService.updateProduct(currentProduct.id, { ...payload, id: currentProduct.id });
            } else {
                await productService.createProduct(payload);
            }
            setIsEditing(false);
            loadProducts();
        } catch (error) {
            console.error("Failed to save", error);
            alert("Failed to save product");
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold font-serif">Product Management</h1>
                    <Link to="/admin" className="text-sm text-gray-500 hover:text-primary">Back to Dashboard</Link>
                </div>
                {!isEditing && (
                    <button
                        onClick={handleAddNew}
                        className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-800"
                    >
                        <Plus size={20} /> Add New Product
                    </button>
                )}
            </div>

            {isEditing ? (
                <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
                    <div className="flex justify-between items-center mb-6 border-b pb-4">
                        <h2 className="text-xl font-bold">{currentProduct ? 'Edit Product' : 'Add New Product'}</h2>
                        <button onClick={() => setIsEditing(false)} className="text-gray-500 hover:text-red-500">
                            <X size={24} />
                        </button>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Name</label>
                                <input required type="text" className="w-full border rounded p-2" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Category</label>
                                <input required type="text" className="w-full border rounded p-2" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Price</label>
                                <input required type="number" className="w-full border rounded p-2" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Stock</label>
                                <input required type="number" className="w-full border rounded p-2" value={formData.stock} onChange={e => setFormData({ ...formData, stock: e.target.value })} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Image URL</label>
                            <input required type="text" className="w-full border rounded p-2" value={formData.imageUrl} onChange={e => setFormData({ ...formData, imageUrl: e.target.value })} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Material</label>
                            <input type="text" className="w-full border rounded p-2" value={formData.material} onChange={e => setFormData({ ...formData, material: e.target.value })} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea required rows="4" className="w-full border rounded p-2" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })}></textarea>
                        </div>
                        <div className="flex justify-end pt-4">
                            <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded mr-2">Cancel</button>
                            <button type="submit" className="px-6 py-2 bg-primary text-white rounded hover:bg-gray-800 flex items-center gap-2">
                                <Save size={18} /> Save Product
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                            <tr>
                                <th className="p-4 border-b">Image</th>
                                <th className="p-4 border-b">Name</th>
                                <th className="p-4 border-b">Category</th>
                                <th className="p-4 border-b">Price</th>
                                <th className="p-4 border-b">Stock</th>
                                <th className="p-4 border-b text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {products.map(product => (
                                <tr key={product.id} className="hover:bg-gray-50 border-b last:border-0">
                                    <td className="p-4">
                                        <img src={product.imageUrl} alt="" className="w-12 h-12 object-cover rounded" />
                                    </td>
                                    <td className="p-4 font-medium">{product.name}</td>
                                    <td className="p-4">{product.category}</td>
                                    <td className="p-4">Rp {product.price.toLocaleString('id-ID')}</td>
                                    <td className="p-4">{product.stock}</td>
                                    <td className="p-4 text-right space-x-2">
                                        <button onClick={() => handleEdit(product)} className="text-blue-500 hover:text-blue-700 p-1">
                                            <Edit size={18} />
                                        </button>
                                        <button onClick={() => handleDelete(product.id)} className="text-red-500 hover:text-red-700 p-1">
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {products.length === 0 && !loading && (
                        <div className="p-8 text-center text-gray-500">No products found.</div>
                    )}
                </div>
            )}
        </div>
    );
}

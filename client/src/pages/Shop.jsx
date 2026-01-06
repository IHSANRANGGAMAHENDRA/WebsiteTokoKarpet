import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { Filter } from 'lucide-react';
import productService from '../services/productService';

export default function Shop() {
    const [searchParams] = useSearchParams();
    const [showFilters, setShowFilters] = useState(false);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [priceRange, setPriceRange] = useState(50000000);

    const categories = ["Modern", "Luxury", "Bohemian", "Vintage", "Natural"];

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await productService.getAllProducts();
                setProducts(data);
            } catch (error) {
                console.error("Failed to fetch products", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Effect to selection from URL
    useEffect(() => {
        const categoryParam = searchParams.get('category');
        if (categoryParam) {
            // Capitalize first letter to match DB if needed, but usually we just match exact string
            // Assuming DB is title case based on DbInitializer
            setSelectedCategories([categoryParam]);
        }
    }, [searchParams]);

    const handleCategoryChange = (category) => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(selectedCategories.filter(c => c !== category));
        } else {
            setSelectedCategories([...selectedCategories, category]);
        }
    };

    const filteredProducts = products.filter(product => {
        // Filter by Category
        if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
            return false;
        }
        // Filter by Price
        if (product.price > priceRange) {
            return false;
        }
        return true;
    });

    return (
        <div className="bg-accent min-h-screen pt-8 pb-20">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-serif font-bold text-gray-900">All Collections</h1>
                        <p className="text-gray-500 mt-1">
                            {loading ? 'Loading collection...' : `Showing ${filteredProducts.length} premium items`}
                        </p>
                    </div>

                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:border-black transition-colors md:hidden"
                    >
                        <Filter size={18} /> Filters
                    </button>
                </div>

                <div className="flex gap-8">
                    {/* Sidebar Filters (Desktop) */}
                    <aside className={`w-64 flex-shrink-0 hidden md:block space-y-8`}>
                        {/* Categories */}
                        <div>
                            <h3 className="font-serif font-bold mb-4">Categories</h3>
                            <ul className="space-y-2 text-sm text-gray-600">
                                {categories.map(category => (
                                    <li key={category}>
                                        <label className="flex items-center gap-2 cursor-pointer hover:text-primary">
                                            <input
                                                type="checkbox"
                                                className="rounded border-gray-300 accent-primary"
                                                checked={selectedCategories.includes(category)}
                                                onChange={() => handleCategoryChange(category)}
                                            />
                                            {category}
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Price Range */}
                        <div>
                            <h3 className="font-serif font-bold mb-4">Price Range</h3>
                            <input
                                type="range"
                                className="w-full accent-primary"
                                min="0"
                                max="50000000"
                                step="1000000"
                                value={priceRange}
                                onChange={(e) => setPriceRange(Number(e.target.value))}
                            />
                            <div className="flex justify-between text-xs text-gray-500 mt-2">
                                <span>IDR 0</span>
                                <span>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumSignificantDigits: 3 }).format(priceRange)}</span>
                            </div>
                        </div>
                    </aside>

                    {/* Product Grid */}
                    <div className="flex-grow">
                        {loading ? (
                            <div className="text-center py-20">Loading...</div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredProducts.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

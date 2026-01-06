import { createContext, useContext, useState, useEffect } from 'react';
import wishlistService from '../services/wishlistService';
import authService from '../services/authService';

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
    const [wishlistItems, setWishlistItems] = useState([]);
    const [loading, setLoading] = useState(true);
    // Optimization: store a Set of Product Ids for fast O(1) lookups
    const [wishlistProductIds, setWishlistProductIds] = useState(new Set());

    const user = authService.getCurrentUser();

    useEffect(() => {
        if (user) {
            fetchWishlist();
        } else {
            setWishlistItems([]);
            setWishlistProductIds(new Set());
            setLoading(false);
        }
    }, [user?.UserId]);

    const fetchWishlist = async () => {
        try {
            setLoading(true);
            const data = await wishlistService.getWishlist(user.UserId);
            // data is Array of WishlistItems (which contain Product) or just Products? 
            // Looking at DbInitializer, WishlistItems has ProductId.
            // Assuming the service returns the full joined data or we need to normalize.
            // Let's assume the service returns the list of objects.
            // Ensure data is an array
            const validData = Array.isArray(data) ? data : [];
            setWishlistItems(validData);
            const ids = new Set(validData.map(item => item.productId));
            setWishlistProductIds(ids);
        } catch (error) {
            console.error("Failed to fetch wishlist", error);
        } finally {
            setLoading(false);
        }
    };

    const addToWishlist = async (productId) => {
        if (!user) {
            alert("Silakan login untuk menggunakan wishlist");
            return;
        }
        try {
            await wishlistService.addToWishlist(user.UserId, productId);
            // Optimistic update or refetch
            // For simplicity and correctness, let's refetch or manually append
            // We need the full product object to append effectively if we want to show it immediately in list
            // But for the "Heart" icon state, ID is enough.
            setWishlistProductIds(prev => new Set(prev).add(productId));
            fetchWishlist(); // Sync fully to get the ID/details
        } catch (error) {
            console.error("Failed to add to wishlist", error);
        }
    };

    const removeFromWishlist = async (productId) => {
        if (!user) return;
        try {
            await wishlistService.removeFromWishlist(user.UserId, productId);
            setWishlistProductIds(prev => {
                const newSet = new Set(prev);
                newSet.delete(productId);
                return newSet;
            });
            setWishlistItems(prev => prev.filter(item => item.productId !== productId));
        } catch (error) {
            console.error("Failed to remove from wishlist", error);
        }
    };

    const isInWishlist = (productId) => {
        return wishlistProductIds.has(productId);
    };

    return (
        <WishlistContext.Provider value={{ wishlistItems, addToWishlist, removeFromWishlist, isInWishlist, loading, wishlistCount: wishlistItems.length }}>
            {children}
        </WishlistContext.Provider>
    );
};

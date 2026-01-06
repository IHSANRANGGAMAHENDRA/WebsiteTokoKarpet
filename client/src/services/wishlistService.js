import api from '../api/axiosConfig';

const getWishlist = async (userId) => {
    const response = await api.get(`/api/wishlist/${userId}`);
    return response.data;
};

const addToWishlist = async (userId, productId) => {
    const response = await api.post(`/api/wishlist/add?userId=${userId}&productId=${productId}`);
    return response.data;
};

const removeFromWishlist = async (userId, productId) => {
    const response = await api.delete(`/api/wishlist/remove?userId=${userId}&productId=${productId}`);
    return response.data;
};

const wishlistService = {
    getWishlist,
    addToWishlist,
    removeFromWishlist
};

export default wishlistService;

import api from '../api/axiosConfig';

const getAllProducts = async () => {
    const response = await api.get('/api/products');
    return response.data;
};

const getProductById = async (id) => {
    const response = await api.get(`/api/products/${id}`);
    return response.data;
};

const createProduct = async (productData) => {
    const response = await api.post('/api/products', productData);
    return response.data;
};

const updateProduct = async (id, productData) => {
    const response = await api.put(`/api/products/${id}`, productData);
    return response.data;
};

const deleteProduct = async (id) => {
    const response = await api.delete(`/api/products/${id}`);
    return response.data;
};

const productService = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};

export default productService;

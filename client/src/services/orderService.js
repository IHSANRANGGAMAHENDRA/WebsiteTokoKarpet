import api from '../api/axiosConfig';

const createOrder = async (orderData) => {
    const response = await api.post('/api/orders', orderData);
    return response.data;
};

const getOrderById = async (id) => {
    const response = await api.get(`/api/orders/${id}`);
    return response.data;
};

const getAllOrders = async () => {
    // Admin only
    const response = await api.get('/api/orders');
    return response.data;
};

const getMyOrders = async (userId) => {
    // Should filter by user ID (backend should handle this via token, but for now passing ID)
    const response = await api.get(`/api/orders/user/${userId}`);
    return response.data;
};

const updateOrderStatus = async (id, status) => {
    const response = await api.put(`/api/orders/${id}/status`, JSON.stringify(status), {
        headers: { 'Content-Type': 'application/json' }
    });
    return response.data;
};

const getPaymentToken = async (orderId) => {
    const response = await api.post(`/api/payment/token/${orderId}`);
    return response.data; // Expected to return { token: "..." }
};

const cancelOrder = async (id) => {
    // Re-use updateStatus but specific to cancellation logic if backend allows
    // For now we assume updating status to 'Cancelled' is sufficient
    const response = await api.put(`/api/orders/${id}/status`, JSON.stringify("Cancelled"), {
        headers: { 'Content-Type': 'application/json' }
    });
    return response.data;
};

const orderService = {
    createOrder,
    getOrderById,
    getAllOrders,
    getMyOrders,
    updateOrderStatus,
    getPaymentToken,
    cancelOrder
};

export default orderService;

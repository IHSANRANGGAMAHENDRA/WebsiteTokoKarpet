import api from '../api/axiosConfig';

const getAllCustomers = async () => {
    const response = await api.get('/api/users');
    return response.data;
};

const userService = {
    getAllCustomers
};

export default userService;

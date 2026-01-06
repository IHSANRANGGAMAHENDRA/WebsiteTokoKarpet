import api from '../api/axiosConfig';

const login = async (username, password) => {
    const response = await api.post('/api/auth/login', { username, password });
    if (response.data.message === "Login successful") { // Adjust based on actual API response
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

const register = async (username, password) => {
    const response = await api.post('/api/auth/register', { username, password });
    return response.data;
};

const logout = () => {
    localStorage.removeItem('user');
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};

const authService = {
    login,
    register,
    logout,
    getCurrentUser
};

export default authService;

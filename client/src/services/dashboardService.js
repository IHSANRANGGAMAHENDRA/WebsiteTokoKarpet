import api from '../api/axiosConfig';

const getStats = async () => {
    const response = await api.get('/api/dashboard/stats');
    return response.data;
};

const dashboardService = {
    getStats
};

export default dashboardService;

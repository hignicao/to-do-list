import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use(config => {
    const token = localStorage.getItem('authToken');
    if (token && !config.url.includes('/login') && !config.url.includes('/auth/register')) {
        config.headers['Authorization'] = `Token ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});


export const login = async (username, password) => {
    const response = await apiClient.post('/login/', { username, password });
    localStorage.setItem('authToken', response.data.token);
    return response.data;
};

export const register = (username, password) => {
    return apiClient.post('/auth/register/', { username, password });
};


export const getTasks = (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiClient.get(`/tasks/?${query}`);
};

export const createTask = (title, description = '') => {
    return apiClient.post('/tasks/', { title, description });
};

export const updateTask = (taskId, data) => {
    return apiClient.patch(`/tasks/${taskId}/`, data);
};

export const deleteTask = (taskId) => {
    return apiClient.delete(`/tasks/${taskId}/`);
};
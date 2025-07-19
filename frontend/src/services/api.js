import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const login = async (username, password) => {
    try {
        const response = await apiClient.post('/login/', { username, password });
        const { token } = response.data;
        localStorage.setItem('authToken', token);
        return { token };
    } catch (error) {
        console.error("Erro no login:", error.response.data);
        throw error;
    }
};

export const getTasks = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
        throw new Error("Nenhum token encontrado.");
    }

    try {
        const response = await apiClient.get('/tasks/', {
            headers: {
                'Authorization': `Token ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar tarefas:", error.response.data);
        throw error;
    }
};

export const register = (username, password) => {
    return apiClient.post('/auth/register/', { username, password });
};
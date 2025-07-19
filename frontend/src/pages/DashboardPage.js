import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTasks } from '../services/api';

function DashboardPage() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTasks = async () => {
            const token = localStorage.getItem('authToken');
            if (!token) {
                navigate('/');
                return;
            }

            try {
                const tasksData = await getTasks();
                setTasks(tasksData);
            } catch (error) {
                console.error("Sessão expirada ou inválida. Por favor, faça login novamente.");
                localStorage.removeItem('authToken');
                navigate('/');
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, [navigate]);

    if (loading) {
        return <p>Carregando tarefas...</p>;
    }

    return (
        <div>
            <h1>Minhas Tarefas</h1>
            <ul>
                {tasks.length > 0 ? (
                    tasks.map(task => (
                        <li key={task.id}>{task.title}</li>
                    ))
                ) : (
                    <p>Nenhuma tarefa encontrada.</p>
                )}
            </ul>
        </div>
    );
}

export default DashboardPage;
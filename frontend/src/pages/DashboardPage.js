import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTasks, createTask, updateTask, deleteTask } from '../services/api';

function DashboardPage() {
    const [tasks, setTasks] = useState([]);
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchTasks = useCallback(async () => {
        try {
            const response = await getTasks();
            setTasks(response.data.results);
        } catch (error) {
            console.error("Sessão inválida. Redirecionando para login.");
            localStorage.removeItem('authToken');
            navigate('/');
        } finally {
            setLoading(false);
        }
    }, [navigate]);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            navigate('/');
            return;
        }
        fetchTasks();
    }, [fetchTasks, navigate]);

    const handleCreateTask = async (e) => {
        e.preventDefault();
        if (!newTaskTitle.trim()) return;
            await createTask(newTaskTitle);
            setNewTaskTitle('');
            fetchTasks();
        } catch (error) {
            console.error("Erro ao criar tarefa:", error);
        }
    };

    const handleToggleComplete = async (task) => {
        try {
            await updateTask(task.id, { completed: !task.completed });
            fetchTasks();
        } catch (error) {
            console.error("Erro ao atualizar tarefa:", error);
        }
    };

    const handleDeleteTask = async (taskId) => {
        try {
            await deleteTask(taskId);
            fetchTasks();
        } catch (error) {
            console.error("Erro ao deletar tarefa:", error);
        }
    };

    if (loading) {
        return <p>Carregando...</p>;
    }

    return (
        <div>
            <h1>Minhas Tarefas</h1>

            <form onSubmit={handleCreateTask}>
                <input
                    type="text"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    placeholder="Adicionar nova tarefa..."
                />
                <button type="submit">Adicionar</button>
            </form>

            <ul>
                {tasks.length > 0 ? (
                    tasks.map(task => (
                        <li key={task.id} style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                            <input
                                type="checkbox"
                                checked={task.completed}
                                onChange={() => handleToggleComplete(task)}
                            />
                            {task.title}
                            <button onClick={() => handleDeleteTask(task.id)} style={{ marginLeft: '10px' }}>
                                Excluir
                            </button>
                        </li>
                    ))
                ) : (
                    <p>Você ainda não tem tarefas. Adicione uma!</p>
                )}
            </ul>
        </div>
    );
}

export default DashboardPage;
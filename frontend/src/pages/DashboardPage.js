import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTasks, createTask, updateTask, deleteTask } from '../services/api';

function DashboardPage() {
    const [tasks, setTasks] = useState([]);
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const [filter, setFilter] = useState({});
    const [pagination, setPagination] = useState({ count: 0, next: null, previous: null });
    const [currentPage, setCurrentPage] = useState(1);

    const fetchTasks = useCallback(async () => {
        setLoading(true);
        try {
            const params = { ...filter, page: currentPage };
            const response = await getTasks(params);
            setTasks(response.data.results);
            setPagination({
                count: response.data.count,
                next: response.data.next,
                previous: response.data.previous
            });
        } catch (error) {
            console.error("Sessão inválida. Redirecionando para login.");
            localStorage.removeItem('authToken');
            navigate('/');
        } finally {
            setLoading(false);
        }
    }, [navigate, filter, currentPage]);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            navigate('/');
        } else {
            fetchTasks();
        }
    }, [fetchTasks, navigate]);

    const handleCreateTask = async (e) => {
        e.preventDefault();
        if (!newTaskTitle.trim()) return;
        await createTask(newTaskTitle);
        setNewTaskTitle('');
        fetchTasks();
    };

    const handleToggleComplete = async (task) => {
        await updateTask(task.id, { completed: !task.completed });
        fetchTasks();
    };

    const handleDeleteTask = async (taskId) => {
        await deleteTask(taskId);
        fetchTasks();
    };

    const handleFilterChange = (newFilter) => {
        setCurrentPage(1);
        setFilter(newFilter);
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

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

            <div>
                <button onClick={() => handleFilterChange({})}>Todas</button>
                <button onClick={() => handleFilterChange({ completed: 'false' })}>Pendentes</button>
                <button onClick={() => handleFilterChange({ completed: 'true' })}>Concluídas</button>
            </div>

            {loading ? <p>Carregando...</p> : (
                <ul>
                    {tasks.map(task => (
                        <li key={task.id} style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                            <input type="checkbox" checked={task.completed} onChange={() => handleToggleComplete(task)} />
                            {task.title}
                            <button onClick={() => handleDeleteTask(task.id)} style={{ marginLeft: '10px' }}>Excluir</button>
                        </li>
                    ))}
                </ul>
            )}
             {tasks.length === 0 && !loading && <p>Nenhuma tarefa encontrada.</p>}


            <div>
                <button onClick={() => handlePageChange(currentPage - 1)} disabled={!pagination.previous}>
                    Anterior
                </button>
                <span>Página {currentPage}</span>
                <button onClick={() => handlePageChange(currentPage + 1)} disabled={!pagination.next}>
                    Próxima
                </button>
            </div>
        </div>
    );
}

export default DashboardPage;
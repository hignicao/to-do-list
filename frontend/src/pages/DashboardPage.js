import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getTasks, createTask, updateTask, deleteTask } from "../services/api";

import { AppBar, Toolbar, Typography, Button, Container, Box, TextField, List, ListItem, ListItemText, Checkbox, IconButton, CircularProgress, Card, CardContent, Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function DashboardPage() {
	const [tasks, setTasks] = useState([]);
	const [newTaskTitle, setNewTaskTitle] = useState("");
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
			setPagination({ count: response.data.count, next: response.data.next, previous: response.data.previous });
		} catch (error) {
			navigate("/");
		} finally {
			setLoading(false);
		}
	}, [navigate, filter, currentPage]);

	useEffect(() => {
		const token = localStorage.getItem("authToken");
		if (!token) navigate("/");
		else fetchTasks();
	}, [fetchTasks, navigate]);

	const handleLogout = () => {
		localStorage.removeItem("authToken");
		navigate("/");
	};

	const handleCreateTask = async (e) => {
		e.preventDefault();
		if (!newTaskTitle.trim()) return;
		await createTask(newTaskTitle);
		setNewTaskTitle("");
		await fetchTasks();
	};

	const handleToggleComplete = async (task) => {
		await updateTask(task.id, { completed: !task.completed });
		await fetchTasks();
	};

	const handleDeleteTask = async (taskId) => {
		await deleteTask(taskId);
		await fetchTasks();
	};

	const handleFilterChange = (newFilter) => {
		setCurrentPage(1);
		setFilter(newFilter);
	};

	const handlePageChange = (newPage) => {
		setCurrentPage(newPage);
	};

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						Gerenciador de Tarefas
					</Typography>
					<Button color="inherit" onClick={handleLogout}>
						Sair
					</Button>
				</Toolbar>
			</AppBar>

			<Container maxWidth="md" sx={{ mt: 4 }}>
				<Box component="form" onSubmit={handleCreateTask} sx={{ display: "flex", gap: 2, mb: 4 }}>
					<TextField fullWidth variant="outlined" label="Adicionar nova tarefa..." value={newTaskTitle} onChange={(e) => setNewTaskTitle(e.target.value)} />
					<Button type="submit" variant="contained" size="large">
						Adicionar
					</Button>
				</Box>

				<Stack direction="row" spacing={1} display="flex" justifyContent="center" sx={{ mb: 2 }}>
					<Typography display="flex" justifyContent="center" alignItems={"center"}>Filtros:</Typography>
					<Button variant={Object.keys(filter).length === 0 ? "contained" : "outlined"} onClick={() => handleFilterChange({})}>
						Todas
					</Button>
					<Button variant={filter.completed === "false" ? "contained" : "outlined"} onClick={() => handleFilterChange({ completed: "false" })}>
						Pendentes
					</Button>
					<Button variant={filter.completed === "true" ? "contained" : "outlined"} onClick={() => handleFilterChange({ completed: "true" })}>
						Concluídas
					</Button>
				</Stack>

				<Card>
					<CardContent>
						{loading ? (
							<Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
								<CircularProgress />
							</Box>
						) : (
							<List>
								{tasks.length > 0 ? (
									tasks.map((task) => (
										<ListItem
											key={task.id}
											secondaryAction={
												<IconButton edge="end" aria-label="delete" onClick={() => handleDeleteTask(task.id)}>
													<DeleteIcon />
												</IconButton>
											}
										>
											<Checkbox edge="start" checked={task.completed} tabIndex={-1} disableRipple onChange={() => handleToggleComplete(task)} />
											<ListItemText primary={task.title} sx={{ textDecoration: task.completed ? "line-through" : "none" }} />
										</ListItem>
									))
								) : (
									<Typography sx={{ textAlign: "center", p: 2 }}>Nenhuma tarefa encontrada.</Typography>
								)}
							</List>
						)}
					</CardContent>
				</Card>

				<Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: 2 }}>
					<Button onClick={() => handlePageChange(currentPage - 1)} disabled={!pagination.previous}>
						Anterior
					</Button>
					<Typography sx={{ p: 1 }}>Página {currentPage}</Typography>
					<Button onClick={() => handlePageChange(currentPage + 1)} disabled={!pagination.next}>
						Próxima
					</Button>
				</Box>
			</Container>
		</Box>
	);
}

export default DashboardPage;

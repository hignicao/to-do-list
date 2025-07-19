import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../services/api";

import { Button, TextField, Container, Typography, Box, Alert, Grid } from "@mui/material";

function LoginPage() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		try {
			await login(username, password);
			navigate("/dashboard");
		} catch (err) {
			setError("Falha no login. Verifique suas credenciais.");
		}
	};

	return (
		<Container component="main" maxWidth="xs">
			<Box
				sx={{
					marginTop: 8,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<Typography component="h1" variant="h5">
					Login
				</Typography>
				<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
					<TextField
						margin="normal"
						required
						fullWidth
						id="username"
						label="Nome de Usuário"
						name="username"
						autoComplete="username"
						autoFocus
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
					<TextField
						margin="normal"
						required
						fullWidth
						name="password"
						label="Senha"
						type="password"
						id="password"
						autoComplete="current-password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					{error && (
						<Alert severity="error" sx={{ width: "100%", mt: 2 }}>
							{error}
						</Alert>
					)}
					<Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
						Entrar
					</Button>
					<Grid container justifyContent="flex-end">
						<Grid item>
							<Link to="/register" style={{ textDecoration: "none" }}>
								<Typography variant="body2">Não tem uma conta? Cadastre-se</Typography>
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Container>
	);
}

export default LoginPage;

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../services/api";

import { Button, TextField, Container, Typography, Box, Alert, Grid } from "@mui/material";

function RegisterPage() {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [password2, setPassword2] = useState("");
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setSuccess("");

		if (password !== password2) {
			setError("As senhas não correspondem.");
			return;
		}

		try {
			const userData = { username, email, password, password2 };
			await register(userData);
			setSuccess("Cadastro realizado com sucesso! Você será redirecionado para o login.");
			setTimeout(() => {
				navigate("/");
			}, 2000);
		} catch (err) {
			if (err.response && err.response.data) {
				const errorData = err.response.data;
				if (errorData.username) setError(`Usuário: ${errorData.username[0]}`);
				else if (errorData.email) setError(`Email: ${errorData.email[0]}`);
				else if (errorData.password) setError(`Senha: ${errorData.password[0]}`);
				else setError("Erro no cadastro. Verifique os dados.");
			} else {
				setError("Erro de conexão. Tente novamente.");
			}
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
					Cadastro
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
					<TextField margin="normal" required fullWidth id="email" label="Endereço de Email" name="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
					<TextField margin="normal" required fullWidth name="password" label="Senha" type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
					<TextField margin="normal" required fullWidth name="password2" label="Confirmar Senha" type="password" id="password2" value={password2} onChange={(e) => setPassword2(e.target.value)} />

					{error && (
						<Alert severity="error" sx={{ width: "100%", mt: 2 }}>
							{error}
						</Alert>
					)}
					{success && (
						<Alert severity="success" sx={{ width: "100%", mt: 2 }}>
							{success}
						</Alert>
					)}

					<Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
						Cadastrar
					</Button>
					<Grid container justifyContent="flex-end">
						<Grid item>
							<Link to="/" style={{ textDecoration: "none" }}>
								<Typography variant="body2">Já tem uma conta? Faça login</Typography>
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Container>
	);
}

export default RegisterPage;

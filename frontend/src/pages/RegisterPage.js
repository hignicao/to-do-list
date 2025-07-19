import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../services/api';

function RegisterPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (password !== password2) {
            setError('As senhas não correspondem.');
            return;
        }

        try {
            const userData = { username, email, password, password2 };
            await register(userData);

            setSuccess('Cadastro realizado com sucesso! Você será redirecionado para o login.');
            setTimeout(() => {
                navigate('/');
            }, 2000);
        } catch (err) {
            if (err.response && err.response.data) {
                const errorData = err.response.data;
                if (errorData.username) {
                    setError(`Usuário: ${errorData.username[0]}`);
                } else if (errorData.email) {
                    setError(`Email: ${errorData.email[0]}`);
                } else if (errorData.password) {
                    setError(`Senha: ${errorData.password[0]}`);
                } else {
                    setError('Erro no cadastro. Verifique os dados.');
                }
            } else {
                setError('Erro de conexão. Tente novamente.');
            }
        }
    };

    return (
        <div>
            <h2>Cadastro</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Usuário:</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label>Senha:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div>
                    <label>Confirmar Senha:</label>
                    <input type="password" value={password2} onChange={(e) => setPassword2(e.target.value)} required />
                </div>
                <button type="submit">Cadastrar</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            <p>Já tem uma conta? <Link to="/">Faça login</Link></p>
        </div>
    );
}

export default RegisterPage;
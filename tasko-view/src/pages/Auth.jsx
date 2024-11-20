import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [nome, setNome] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = 'http://localhost:8080/auth/login';


      const payload = { email, senha };


      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        credentials: 'include', // Importante para manter cookies de sessão
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const data = await response.json();
        alert('Login realizado com sucesso!');
        navigate('/inicio');
      } else {
        const errorMessage = await response.text();
        alert('Erro: ' + errorMessage);
      }
    } catch (error) {
      alert('Erro de conexão: ' + error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl mb-4">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Entrar
          </button>
        </form>
        <Link to="/cadastro"
          className="w-full mt-4 text-blue-500 hover:underline"
        >
        Não tem conta? Cadastre-se
        </Link>
      </div>
    </div>
  );
};

export default AuthPage;
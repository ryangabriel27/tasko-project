import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";
import fundo from "../assets/img/Back3.png";
import NavbarMenor from '../components/NavbarMenor';
import Footer from '../components/Footer';

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
    <>
      <NavbarMenor link={"/"} />
      <div className="background-image-login">
        <img src={fundo} />
      </div>
      <div className="cardLogin">
        <h1 className="h1Login">
          Login
        </h1>
        <p className="pLogin">Insira o e-mail e a senha da sua conta:</p>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="inputLogin"
              required
            />
            <input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="inputLogin"
              required
            />
          </div>
          <button
            type="submit"
            className="buttonGradient6 pointer"
          >
            Entrar
          </button>
        </form>
        <Link to="/cadastro"
          className="darkBack noDecoration cardInfo"
        >
          Não tem conta? Cadastre-se
        </Link>
      </div>
      <Footer/>
    </>
  );
};

export default AuthPage;
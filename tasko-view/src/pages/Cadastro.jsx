import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/cadStyle.css";
import taskoPurple from "../assets/img/TaskoPurple.png";


const Cadastro = () => {
  const [formData, setFormData] = useState({
    nome: "",
    sobrenome: "",
    cpf: "",
    telefone: "",
    email: "",
    senha: "",
    data_nasc: "",
    cep: "",
    endereco: "",
    foto: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      const response = await fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json(); // Supondo que a API retorna o `userId`
        sessionStorage.setItem("userId", data.id); // Salva o ID no sessionStorage
        alert("Cadastro realizado com sucesso!");
        navigate("/escolha-objetivo"); // Redireciona para a página de objetivo
      } else {
        alert("Erro ao realizar o cadastro.");
      }
    } catch (error) {
      alert("Erro de conexão: " + error.message);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <button onClick={() => window.history.back()} className="voltar">
          <i className="fas fa-arrow-left"></i>
        </button>
        <img src={taskoPurple} alt="Tasko Logo" />
        <h2>CADASTRO</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="grid-container">
          <div className="grid-item">
            <input
              type="text"
              name="nome"
              placeholder="Nome"
              required
              value={formData.nome}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="sobrenome"
              placeholder="Sobrenome"
              required
              value={formData.sobrenome}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="cpf"
              placeholder="CPF"
              required
              value={formData.cpf}
              onChange={handleInputChange}
            />
          </div>
          <div className="grid-item">
            <input
              type="tel"
              name="telefone"
              placeholder="Telefone"
              required
              value={formData.telefone}
              onChange={handleInputChange}
            />
            <input
              type="email"
              name="email"
              placeholder="E-mail"
              required
              value={formData.email}
              onChange={handleInputChange}
            />
            <input
              type="password"
              name="senha"
              placeholder="Senha"
              required
              value={formData.senha}
              onChange={handleInputChange}
            />
          </div>
          <div className="grid-item">
            <input
              type="date"
              name="data_nasc"
              required
              value={formData.data_nasc}
              onChange={handleInputChange}
            />
          </div>
          <div className="grid-item">
            <input
              type="text"
              name="cep"
              placeholder="CEP"
              required
              value={formData.cep}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="endereco"
              placeholder="Endereço"
              required
              value={formData.endereco}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="foto"
              placeholder="Link"
              value={formData.foto}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <button type="submit" className="button primary">
          Continuar
        </button>
      </form>
    </div>
  );
};

export default Cadastro;

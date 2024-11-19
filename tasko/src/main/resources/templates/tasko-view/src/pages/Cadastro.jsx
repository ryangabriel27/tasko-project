import React, { useState } from "react";
import "../assets/css/cadStyle.css";

const Cadastro = () => {
  const [tipo, setTipo] = useState("cliente"); // Alterar para 'prestador' conforme necessário

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(`${name}: ${value}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulário enviado");
  };

  return (
    <div className="container">
      <div className="header">
        <button onClick={() => window.history.back()} className="voltar">
          <i className="fas fa-arrow-left"></i>
        </button>
        <img src="/path/to/TaskoPurple.png" alt="Tasko Logo" />
        <h2>CADASTRO - USUÁRIO</h2>
      </div>

      {/* Formulário Condicional */}
      {tipo === "prestador" ? (
        <form onSubmit={handleSubmit}>
          <input type="hidden" name="tipo" value={tipo} />
          <div className="grid-container">
            <div className="grid-item">
              <input type="text" name="nome" placeholder="Nome" required onChange={handleInputChange} />
              <input type="text" name="sobrenome" placeholder="Sobrenome" required onChange={handleInputChange} />
              <input type="text" name="cpf" placeholder="CPF" required onChange={handleInputChange} />
              <input type="text" name="cnpj" placeholder="CNPJ" required onChange={handleInputChange} />
            </div>
            <div className="grid-item">
              <input type="tel" name="telefone" placeholder="Telefone" required onChange={handleInputChange} />
              <input type="email" name="email" placeholder="E-mail" required onChange={handleInputChange} />
              <input type="password" name="senha" placeholder="Senha" required onChange={handleInputChange} />
            </div>
            <div className="grid-item">
              <input type="date" name="data_nasc" required onChange={handleInputChange} />
            </div>
            <div className="grid-item">
              <input type="text" name="cep" placeholder="CEP" required onChange={handleInputChange} />
              <input type="text" name="endereco" placeholder="Endereço" required onChange={handleInputChange} />
              <input type="text" name="foto" placeholder="Link" onChange={handleInputChange} />
            </div>
            <div className="grid-item">
              <textarea
                name="descricaoServicos"
                placeholder="Descrição dos Serviços"
                rows="4"
                required
                onChange={handleInputChange}
              ></textarea>
            </div>
            <div className="grid-item">
              <input
                type="text"
                name="categoriaServicos"
                placeholder="Categoria dos Serviços"
                required
                onChange={handleInputChange}
              />
              <input type="text" name="links" placeholder="Links" onChange={handleInputChange} />
              <input type="number" name="valorHora" placeholder="Valor por Hora" required onChange={handleInputChange} />
            </div>
          </div>
          <button type="submit" className="button primary">Prosseguir</button>
        </form>
      ) : (
        <form onSubmit={handleSubmit}>
          <input type="hidden" name="tipo" value={tipo} />
          <div className="grid-container">
            <div className="grid-item">
              <input type="text" name="nome" placeholder="Nome" required onChange={handleInputChange} />
              <input type="text" name="sobrenome" placeholder="Sobrenome" required onChange={handleInputChange} />
              <input type="text" name="cpf" placeholder="CPF" required onChange={handleInputChange} />
            </div>
            <div className="grid-item">
              <input type="tel" name="telefone" placeholder="Telefone" required onChange={handleInputChange} />
              <input type="email" name="email" placeholder="E-mail" required onChange={handleInputChange} />
              <input type="password" name="senha" placeholder="Senha" required onChange={handleInputChange} />
            </div>
            <div className="grid-item">
              <input type="date" name="data_nasc" required onChange={handleInputChange} />
            </div>
            <div className="grid-item">
              <input type="text" name="cep" placeholder="CEP" required onChange={handleInputChange} />
              <input type="text" name="endereco" placeholder="Endereço" required onChange={handleInputChange} />
              <input type="text" name="foto" placeholder="Link" onChange={handleInputChange} />
            </div>
          </div>
          <button type="submit" className="button primary">Prosseguir</button>
        </form>
      )}
    </div>
  );
};

export default Cadastro;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/cadStyle.css";
import taskoPurple from "../assets/img/TaskoPurple.png";
import InputMask from "react-input-mask";
import { validarCPF, validarEmail, validarTelefone, validarCEP, verificarMaioridade } from "../components/Auth";

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

  const [errors, setErrors] = useState({
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

  const handleInputChange = async (e) => {
    const { name, value } = e.target;

    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));

    if (name === "cep") {
      const cep = value.replace(/\D/g, "");
      setFormData((prevData) => ({ ...prevData, cep: cep }));

      setTimeout(async () => {
        if (cep.length === 8) {
          try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json();

            if (!data.erro) {
              setFormData((prevData) => ({
                ...prevData,
                endereco: `${data.logradouro}, ${data.bairro}`,
              }));
            } else {
              setErrors((prevErrors) => ({
                ...prevErrors,
                cep: "CEP não encontrado.",
              }));
            }
          } catch (error) {
            console.error("Erro ao consultar CEP:", error);
            setErrors((prevErrors) => ({
              ...prevErrors,
              cep: "Erro ao consultar CEP.",
            }));
          }
        }
      }, 500);
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (formData.nome.trim() === "") {
      newErrors.nome = "Nome é obrigatório.";
    }

    if (formData.sobrenome.trim() === "") {
      newErrors.sobrenome = "Sobrenome é obrigatório.";
    }

    const cpfError = validarCPF(formData.cpf);
    if (cpfError) {
      newErrors.cpf = cpfError;
    }

    const telefoneError = validarTelefone(formData.telefone);
    if (telefoneError) {
      newErrors.telefone = telefoneError;
    }

    const emailError = validarEmail(formData.email);
    if (emailError) {
      newErrors.email = emailError;
    }

    if (formData.senha.trim() === "") {
      newErrors.senha = "Senha é obrigatória.";
    }

    if (formData.data_nasc === "") {
      newErrors.data_nasc = "Data de nascimento é obrigatória.";
    } else {
      const maioridadeError = verificarMaioridade(formData.data_nasc);
      if (maioridadeError) {
        newErrors.data_nasc = maioridadeError;
      }
    }

    const cepError = validarCEP(formData.cep);
    if (cepError) {
      newErrors.cep = cepError;
    }

    if (formData.endereco.trim() === "") {
      newErrors.endereco = "Endereço é obrigatório.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      console.log(formData);
      const response = await fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        sessionStorage.setItem("userId", data.id);
        alert("Cadastro realizado com sucesso!");
        navigate("/escolha-objetivo");
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
            {errors.nome && <span className="error">{errors.nome}</span>}
            <input
              type="text"
              name="sobrenome"
              placeholder="Sobrenome"
              required
              value={formData.sobrenome}
              onChange={handleInputChange}
            />
            {errors.sobrenome && <span className="error">{errors.sobrenome}</span>}
            <InputMask
              mask="999.999.999-99"
              name="cpf"
              placeholder="CPF"
              required
              value={formData.cpf}
              onChange={handleInputChange}
            />
            {errors.cpf && <span className="error">{errors.cpf}</span>}
          </div>
          <div className="grid-item">
            <InputMask
              mask="(99) 99999-9999"
              name="telefone"
              placeholder="Telefone"
              required
              value={formData.telefone}
              onChange={handleInputChange}
            />
            {errors.telefone && <span className="error">{errors.telefone}</span>}
            <input
              type="email"
              name="email"
              placeholder="E-mail"
              required
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.email && <span className="error">{errors.email}</span>}
            <input
              type="password"
              name="senha"
              placeholder="Senha"
              required
              value={formData.senha}
              onChange={handleInputChange}
            />
            {errors.senha && <span className="error">{errors.senha}</span>}
          </div>
          <div className="grid-item">
            <input
              type="date"
              name="data_nasc"
              required
              value={formData.data_nasc}
              onChange={handleInputChange}
            />
            {errors.data_nasc && <span className="error">{errors.data_nasc}</span>}
          </div>
          <div className="grid-item">
            <InputMask
              mask="99999-999"
              name="cep"
              placeholder="CEP"
              required
              value={formData.cep}
              onChange={handleInputChange}
            />
            {errors.cep && <span className="error">{errors.cep}</span>}
            <input
              type="text"
              name="endereco"
              placeholder="Endereço"
              required
              value={formData.endereco}
              onChange={handleInputChange}
            />
            {errors.endereco && <span className="error">{errors.endereco}</span>}
            <input
              type="text"
              name="foto"
              placeholder="Link"
              value={formData.foto}
              onChange={handleInputChange}
            />
            {errors.foto && <span className="error">{errors.foto}</span>}
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

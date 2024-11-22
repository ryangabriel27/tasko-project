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

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Validações centralizadas
  const validarFormulario = () => {
    const newErrors = {};

    const validations = {
      nome: () => (formData.nome.trim() ? "" : "Nome é obrigatório."),
      sobrenome: () => (formData.sobrenome.trim() ? "" : "Sobrenome é obrigatório."),
      cpf: () => validarCPF(formData.cpf),
      telefone: () => validarTelefone(formData.telefone),
      email: () => validarEmail(formData.email),
      senha: () => (formData.senha.trim() ? "" : "Senha é obrigatória."),
      data_nasc: () => {
        if (!formData.data_nasc) return "Data de nascimento é obrigatória.";
        return verificarMaioridade(formData.data_nasc);
      },
      cep: () => validarCEP(formData.cep),
      endereco: () => (formData.endereco.trim() ? "" : "Endereço é obrigatório."),
    };

    // Executa validação para cada campo
    Object.keys(validations).forEach((key) => {
      const error = validations[key]();
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    if (name === "cep" && value.replace(/\D/g, "").length === 8) {
      fetch(`https://viacep.com.br/ws/${value.replace(/\D/g, "")}/json/`)
        .then((response) => response.json())
        .then((data) => {
          if (!data.erro) {
            setFormData((prevData) => ({
              ...prevData,
              endereco: `${data.logradouro}, ${data.bairro}`,
            }));
          } else {
            setErrors((prevErrors) => ({ ...prevErrors, cep: "CEP não encontrado." }));
          }
        })
        .catch(() => {
          setErrors((prevErrors) => ({ ...prevErrors, cep: "Erro ao consultar CEP." }));
        });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validarFormulario()) return;

    try {
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

  // Componente reutilizável para entradas
  const InputField = ({ type, name, placeholder, mask, isRequired }) => (
    <>
      {mask ? (
        <InputMask
          mask={mask}
          name={name}
          placeholder={placeholder}
          required={isRequired}
          value={formData[name]}
          onChange={handleInputChange}
        />
      ) : (
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          required={isRequired}
          value={formData[name]}
          onChange={handleInputChange}
        />
      )}
      {errors[name] && <span className="error">{errors[name]}</span>}
    </>
  );

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
            <InputField type="text" name="nome" placeholder="Nome" isRequired={true} />
            <InputField type="text" name="sobrenome" placeholder="Sobrenome" isRequired={true} />
            <InputField type="text" name="cpf" placeholder="CPF" mask="999.999.999-99" isRequired={true} />
          </div>
          <div className="grid-item">
            <InputField
              type="text"
              name="telefone"
              placeholder="Telefone"
              mask="(99) 99999-9999"
              isRequired={true}
            />
            <InputField type="email" name="email" placeholder="E-mail" isRequired={true} />
            <InputField type="password" name="senha" placeholder="Senha" isRequired={true} />
          </div>
          <div className="grid-item">
            <InputField type="date" name="data_nasc" placeholder="Data de Nascimento" isRequired={true} />
          </div>
          <div className="grid-item">
            <InputField type="text" name="cep" placeholder="CEP" mask="99999-999" isRequired={true} />
            <InputField type="text" name="endereco" placeholder="Endereço" isRequired={true} />
            <InputField type="text" name="foto" placeholder="Link para foto" isRequired={false} />
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

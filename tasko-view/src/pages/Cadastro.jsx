import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../assets/css/cadStyle.css";
import fundo from "../assets/img/Background2.png"; // Certifique-se de ter a imagem 'fundo.jpg' no caminho correto
import InputField from "react-input-mask"
import { validarCPF, validarEmail, validarTelefone, validarCEP, verificarMaioridade } from "../components/Auth";
import taskoWhite from "../assets/img/TaskoWhite.png";
import FooterSimples from "../components/FooterSimples";
import NavbarMenor from "../components/NavbarMenor";

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

    console.log(e);

    console.log(formData)

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

    <div>
      <NavbarMenor link={"/"}/>

      <div className="container">
        <div className="left-side">
          <img src={fundo} alt="Background" className="background-image" />
          <div className="overlay-text">
            <h1>Cadastro de <span className="hi-text">Usuário</span></h1>
          </div>
        </div>

        <div className="right-side">
          <form onSubmit={handleSubmit}>
            <div className="grid-container">
              {/* Primeira Coluna */}
              <div className="grid-item">
                <InputField type="text" name="nome" placeholder="Nome" isRequired={true} onChange={handleInputChange} />
                <InputField type="text" name="cpf" placeholder="CPF" mask="999.999.999-99" isRequired={true} onChange={handleInputChange} />
                <InputField
                  type="text"
                  name="telefone"
                  placeholder="Telefone"
                  mask="(99) 99999-9999"
                  isRequired={true}
                  onChange={handleInputChange}
                />
                <InputField type="text" name="endereco" placeholder="Endereço" isRequired={true} onChange={handleInputChange} />
                <InputField type="text" name="foto" placeholder="Link para foto" isRequired={false} onChange={handleInputChange} />

              </div>

              {/* Segunda Coluna */}
              <div className="grid-item">
                <InputField type="text" name="sobrenome" placeholder="Sobrenome" isRequired={true} onChange={handleInputChange} />
                <InputField type="email" name="email" placeholder="E-mail" isRequired={true} onChange={handleInputChange} />
                <InputField type="text" name="cep" placeholder="CEP" mask="99999-999" isRequired={true} onChange={handleInputChange} />
                <InputField type="date" name="data_nasc" placeholder="Data de Nascimento" isRequired={true} onChange={handleInputChange} />
                <InputField type="password" name="senha" placeholder="Senha" isRequired={true} onChange={handleInputChange} />
              </div>
            </div>
            <button type="submit" className="button-cad">
              Continuar
            </button>
          </form>
        </div>
      </div>
      <FooterSimples>

      </FooterSimples>
    </div>
  );
};

export default Cadastro;

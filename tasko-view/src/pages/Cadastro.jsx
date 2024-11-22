import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../assets/css/cadStyle.css";
import fundo from "../assets/img/Background1.png"; // Certifique-se de ter a imagem 'fundo.jpg' no caminho correto
import InputMask from "react-input-mask";
import { validarCPF, validarEmail, validarTelefone, validarCEP, verificarMaioridade } from "../components/Auth";
import taskoWhite from "../assets/img/TaskoWhite.png";
import FooterSimples from "../components/FooterSimples";

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
          className="in-cad"
        />
      ) : (
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          required={isRequired}
          value={formData[name]}
          onChange={handleInputChange}
          className="in-cad"
        />
      )}
      {errors[name] && <span className="error">{errors[name]}</span>}
    </>
  );

  return (

    <div>

      <nav className="navbarsimples">
        <Link to="/escolha-objetivo" className="voltar-link">
          ←
        </Link>
        <img src={taskoWhite} alt="tasko" className="logoNavSimples" />
      </nav>

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
                <InputField type="text" name="nome" placeholder="Nome" isRequired={true} />
                <InputField type="text" name="cpf" placeholder="CPF" mask="999.999.999-99" isRequired={true} />
                <InputField
                  type="text"
                  name="telefone"
                  placeholder="Telefone"
                  mask="(99) 99999-9999"
                  isRequired={true}
                />
                <InputField type="text" name="endereco" placeholder="Endereço" isRequired={true} />
                <InputField type="text" name="foto" placeholder="Link para foto" isRequired={false} />

              </div>

              {/* Segunda Coluna */}
              <div className="grid-item">
                <InputField type="text" name="sobrenome" placeholder="Sobrenome" isRequired={true} />
                <InputField type="email" name="email" placeholder="E-mail" isRequired={true} />
                <InputField type="text" name="cep" placeholder="CEP" mask="99999-999" isRequired={true} />
                <InputField type="date" name="data_nasc" placeholder="Data de Nascimento" isRequired={true} />
                <InputField type="password" name="senha" placeholder="Senha" isRequired={true} />
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

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/cadStyle.css";
import fundo from "../assets/img/Background2.png";
import InputField from "react-input-mask";
import { validarCPF, validarEmail, validarTelefone, validarCEP, verificarMaioridade } from "../components/Auth";
import NavbarMenor from "../components/NavbarMenor";
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

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
  
    // Resetando o erro do campo alterado
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  
    if (name === "cep") {
      const cep = value.replace(/\D/g, ""); // Remove caracteres não numéricos
      setFormData((prevData) => ({ ...prevData, cep }));
  
      if (cep.length === 8) { // Realiza a busca apenas se o CEP tiver 8 números
        try {
          const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
          const data = await response.json();
  
          if (!data.erro) {
            setFormData((prevData) => ({
              ...prevData,
              endereco: `${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`,
            }));
          } else {
            setFormData((prevData) => ({ ...prevData, endereco: "" })); // Limpa o endereço
            setErrors((prevErrors) => ({
              ...prevErrors,
              cep: "CEP não encontrado.",
            }));
          }
        } catch (error) {
          setFormData((prevData) => ({ ...prevData, endereco: "" })); // Limpa o endereço
          setErrors((prevErrors) => ({
            ...prevErrors,
            cep: "Erro ao consultar o CEP.",
          }));
        }
      } else if (cep.length === 0) {
        // Limpa o campo de endereço quando o CEP for apagado
        setFormData((prevData) => ({ ...prevData, endereco: "" }));
      }
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validação dos campos
    const newErrors = {};
    if (!formData.nome.trim()) newErrors.nome = "Nome é obrigatório.";
    if (!formData.sobrenome.trim()) newErrors.sobrenome = "Sobrenome é obrigatório.";

    const cpfError = validarCPF(formData.cpf);
    if (cpfError) newErrors.cpf = cpfError;

    const telefoneError = validarTelefone(formData.telefone);
    if (telefoneError) newErrors.telefone = telefoneError;

    const emailError = validarEmail(formData.email);
    if (emailError) newErrors.email = emailError;

    if (!formData.senha.trim()) newErrors.senha = "Senha é obrigatória.";

    if (!formData.data_nasc) {
      newErrors.data_nasc = "Data de nascimento é obrigatória.";
    } else {
      const maioridadeError = verificarMaioridade(formData.data_nasc);
      if (maioridadeError) newErrors.data_nasc = maioridadeError;
    }

    const cepError = validarCEP(formData.cep);
    if (cepError) newErrors.cep = cepError;

    if (!formData.endereco.trim()) newErrors.endereco = "Endereço é obrigatório.";

    setErrors(newErrors);

    // Se houver erros, não prosseguir com o envio
    if (Object.keys(newErrors).length > 0) return;

    try {
      const response = await fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        alert("Cadastro realizado com sucesso!");
        sessionStorage.setItem("userId", data.id);
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
      <NavbarMenor link={"/"} />
      <div className="container">
        <div className="left-side">
          <img src={fundo} alt="Background" className="background-image" />
          <div className="overlay-text">
            <h1>
              Cadastro de <span className="hi-text">Usuário</span>
            </h1>
          </div>
        </div>

        <div className="right-side">
          <form onSubmit={handleSubmit}>
            <div className="grid-container">
              <div className="grid-item">
                <InputField
                  type="text"
                  name="nome"
                  placeholder="Nome"
                  onChange={handleInputChange}
                />
                {errors.nome && <small className="error">{errors.nome}</small>}

                <InputField
                  type="text"
                  name="cpf"
                  placeholder="CPF"
                  mask="999.999.999-99"
                  onChange={handleInputChange}
                />
                {errors.cpf && <small className="error">{errors.cpf}</small>}

                <InputField
                  type="text"
                  name="telefone"
                  placeholder="Telefone"
                  mask="(99) 99999-9999"
                  onChange={handleInputChange}
                />
                {errors.telefone && <small className="error">{errors.telefone}</small>}

                <InputField
                  type="text"
                  name="endereco"
                  placeholder="Endereço"
                  onChange={handleInputChange}
                  value={formData.endereco}
                  disabled
                />
                {errors.endereco && <small className="error">{errors.endereco}</small>}

                <InputField
                  type="text"
                  name="foto"
                  placeholder="Link para foto"
                  onChange={handleInputChange}
                />
              </div>

              <div className="grid-item">
                <InputField
                  type="text"
                  name="sobrenome"
                  placeholder="Sobrenome"
                  onChange={handleInputChange}
                />
                {errors.sobrenome && <small className="error">{errors.sobrenome}</small>}

                <InputField
                  type="email"
                  name="email"
                  placeholder="E-mail"
                  onChange={handleInputChange}
                />
                {errors.email && <small className="error">{errors.email}</small>}

                <InputField
                  type="text"
                  name="cep"
                  placeholder="CEP"
                  mask="99999-999"
                  onChange={handleInputChange}
                  
                />
                {errors.cep && <small className="error">{errors.cep}</small>}

                <InputField
                  type="date"
                  name="data_nasc"
                  placeholder="Data de Nascimento"
                  onChange={handleInputChange}
                />
                {errors.data_nasc && <small className="error">{errors.data_nasc}</small>}

                <InputField
                  type="password"
                  name="senha"
                  placeholder="Senha"
                  onChange={handleInputChange}
                />
                {errors.senha && <small className="error">{errors.senha}</small>}
              </div>
            </div>
            <button type="submit" className="button-cad">
              Continuar
            </button>
          </form>
        </div>
      </div>
      <FooterSimples />
    </div>
  );
};

export default Cadastro;

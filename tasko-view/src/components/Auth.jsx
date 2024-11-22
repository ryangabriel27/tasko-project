// components/Auth.jsx
export const validarCPF = (cpf) => {
  // Remove caracteres não numéricos
  cpf = cpf.replace(/[^\d]+/g, "");

  // Verifica se o CPF tem 11 dígitos
  if (cpf.length !== 11) {
    return "CPF deve ter 11 dígitos.";
  }

  // Validação do primeiro dígito verificador
  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let resto = 11 - (soma % 11);
  if (resto === 10 || resto === 11) {
    resto = 0;
  }
  if (resto !== parseInt(cpf.charAt(9))) {
    return "CPF inválido.";
  }

  // Validação do segundo dígito verificador
  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpf.charAt(i)) * (11 - i);
  }
  resto = 11 - (soma % 11);
  if (resto === 10 || resto === 11) {
    resto = 0;
  }
  if (resto !== parseInt(cpf.charAt(10))) {
    return "CPF inválido.";
  }

  return ""; // CPF válido
};

export const validarEmail = (email) => {
  // Expressão regular para validar formato de email
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(email)) {
    return "E-mail inválido.";
  }
  return ""; // Email válido
};

export const validarTelefone = (telefone) => {
  // Remove caracteres não numéricos
  telefone = telefone.replace(/[^\d]+/g, "");

  // Verifica se o telefone tem 10 ou 11 dígitos
  if (telefone.length < 10 || telefone.length > 11) {
    return "Telefone deve ter 10 ou 11 dígitos.";
  }

  return ""; // Telefone válido
};

export const validarCEP = (cep) => {
  // Remove caracteres não numéricos
  cep = cep.replace(/[^\d]+/g, "");

  // Verifica se o CEP tem 8 dígitos
  if (cep.length !== 8) {
    return "CEP deve ter 8 dígitos.";
  }

  return ""; // CEP válido
};
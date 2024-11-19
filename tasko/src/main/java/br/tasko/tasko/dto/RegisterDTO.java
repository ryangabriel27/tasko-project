package br.tasko.tasko.dto;


import lombok.Data;

@Data
public class RegisterDTO {
    private String nome;
    private String sobrenome;
    private String email;
    private String cpf;
    private String senha;
    private String telefone;
    private String endereco;
    // Outros campos do seu modelo User
}

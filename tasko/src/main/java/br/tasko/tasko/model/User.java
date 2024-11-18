package br.tasko.tasko.model;

import java.io.Serializable;
import java.sql.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity 
@Table(name = "usuario") 
@Getter
@Setter
public class User implements Serializable  {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String sobrenome;
    private String cpf;
    private String telefone;
    private String email;
    private String senha;
    private String tipo;
    private Date data_nasc;
    private String cep;
    private String endereco;
    private String foto;

    @ManyToOne
    @JoinColumn(name = "prestador_id", nullable = true)  // "nullable = true" torna a coluna opcional
    private Prestador prestador;

}

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

@Entity 
@Table(name = "usuario") 
public class User implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String sobrenome;
    private String cpf;
    private String telefone;
    private String email;
    private String tipo;
    private Date data_nasc;
    private String cep;
    private String endereco;
    private String foto;

    @ManyToOne
    @JoinColumn(name = "prestador_id", nullable = true)  // "nullable = true" torna a coluna opcional
    private Prestador prestador;



    //Métodos
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }
}

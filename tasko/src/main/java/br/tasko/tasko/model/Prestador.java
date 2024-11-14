package br.tasko.tasko.model;

import java.io.Serializable;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "prestador")
@Getter
@Setter
public class Prestador implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private User usuario;
    private String descricaoServicos;
    private String categoriaServicos;
    private String cnpj;
    private String links;
    private List<Avaliacao> avaliacoes;
    private int valorHora;
    private List<Servico> meusServicos;

    

}

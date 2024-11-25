package br.tasko.tasko.model;

import java.io.Serializable;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "inscricao")
@Getter
@Setter
public class Inscricao implements Serializable{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "publicacao_id", referencedColumnName = "id")
    private Publicacao publicacao;

    @ManyToOne
    @JoinColumn(name = "prestador_id", referencedColumnName = "id")
    private Prestador prestador;

    private float valor;

    private String descricao;
}

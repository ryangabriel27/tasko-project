package br.tasko.tasko.model;

import java.io.Serializable;

import jakarta.persistence.*;
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

    @OneToOne
    @JoinColumn(name = "usuario_id", referencedColumnName = "id") // Supomos que User tem uma coluna `id`
    private User usuario;

    private String descricaoServicos;
    private String categoriaServicos;
    private String links;
    private int valorHora;

     @Column(unique = true) // Garante unicidade no banco de dados
     private String cnpj;
}

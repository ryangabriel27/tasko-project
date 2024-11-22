package br.tasko.tasko.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "contratos")
@Getter
@Setter
public class Contrato {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "servico_id", nullable = false, referencedColumnName = "id")
    private Servico servico;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = false, referencedColumnName = "id")
    private User usuario;

    @Column(nullable = false)
    private LocalDateTime dataContratacao;

    @Column(nullable = false)
    private String status; // Ex: "PENDENTE", "APROVADO", "CANCELADO"

    public Contrato() {
        this.dataContratacao = LocalDateTime.now();
        this.status = "PENDENTE";
    }
}

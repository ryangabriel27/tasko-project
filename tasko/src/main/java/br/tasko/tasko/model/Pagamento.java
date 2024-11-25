package br.tasko.tasko.model;

import java.io.Serializable;
import java.util.Date;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "pagamentos")
@Getter
@Setter
public class Pagamento implements Serializable{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Float valor;

    @Temporal(TemporalType.DATE)
    @Column(nullable = false)
    private Date data;

    @Column(nullable = false)
    private String status;

    @ManyToOne
    @JoinColumn(name = "servico_id", nullable = false)
    private Servico servico;

    @ManyToOne
    @JoinColumn(name = "pagador_id", nullable = false)
    private User pagador;
}
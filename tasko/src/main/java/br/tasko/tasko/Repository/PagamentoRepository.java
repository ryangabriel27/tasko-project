package br.tasko.tasko.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.tasko.tasko.model.Pagamento;

public interface PagamentoRepository extends JpaRepository<Pagamento, Long> {
}

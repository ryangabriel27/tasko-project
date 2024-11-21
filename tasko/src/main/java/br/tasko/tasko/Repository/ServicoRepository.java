package br.tasko.tasko.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.tasko.tasko.model.Servico;

@Repository
public interface ServicoRepository extends JpaRepository<Servico, Long> {
    // Método para buscar serviços pelo id do prestador
    List<Servico> findByPrestadorId(Long prestadorId);
}

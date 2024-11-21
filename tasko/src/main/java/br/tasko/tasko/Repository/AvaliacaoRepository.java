package br.tasko.tasko.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.tasko.tasko.model.Avaliacao;
import br.tasko.tasko.model.Prestador;

@Repository
public interface AvaliacaoRepository extends JpaRepository<Avaliacao, Long> {

    // Buscar avaliações de um prestador específico
    List<Avaliacao> findByPrestadorId(Long prestadorId);

    List<Avaliacao> findByPrestador(Prestador prestador);
}

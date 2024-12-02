package br.tasko.tasko.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import br.tasko.tasko.model.Prestador;
import br.tasko.tasko.model.Servico;
import jakarta.transaction.Transactional;

@Repository
public interface ServicoRepository extends JpaRepository<Servico, Long> {
    // Método para buscar serviços pelo id do prestador
    List<Servico> findByPrestadorId(Long prestadorId);

    @Query("SELECT s FROM Servico s WHERE LOWER(s.titulo) LIKE LOWER(CONCAT('%', :titulo, '%'))")
    List<Servico> buscarPorTitulo(@Param("titulo") String titulo);

    @Query("SELECT s FROM Servico s WHERE LOWER(s.descricao) LIKE LOWER(CONCAT('%', :descricao, '%'))")
    List<Servico> buscarPorDescricao(@Param("descricao") String descricao);

    List<Servico> findAllByPrestador(Prestador prestador);

    @Transactional
    void deleteAllByPrestador(Prestador prestador);
}

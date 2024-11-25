package br.tasko.tasko.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import br.tasko.tasko.model.Contrato;
import br.tasko.tasko.model.User;

@Repository
public interface ContratoRepository extends JpaRepository<Contrato, Long> {
    List<Contrato> findByUsuario(User usuario);

    @Query("SELECT c FROM Contrato c WHERE c.servico.prestador.id = :prestadorId")
    List<Contrato> findByPrestadorId(@Param("prestadorId") Long prestadorId);
}

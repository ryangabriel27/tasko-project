package br.tasko.tasko.Repository;

import br.tasko.tasko.model.Prestador;
import br.tasko.tasko.model.User;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PrestadorRepository extends JpaRepository<Prestador, Long> {
    boolean existsByCnpj(String cnpj);

    Optional<Prestador> findByUsuario(User usuario);

    // Método customizado para buscar o prestador pelo ID do usuário
    Prestador findByUsuarioId(Long usuarioId);
}

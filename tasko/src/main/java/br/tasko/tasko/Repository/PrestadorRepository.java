package br.tasko.tasko.Repository;

import br.tasko.tasko.model.Prestador;
import br.tasko.tasko.model.User;

import java.util.Optional;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import br.tasko.tasko.model.Categoria;

@Repository
public interface PrestadorRepository extends JpaRepository<Prestador, Long> {
    boolean existsByCnpj(String cnpj);

    Optional<Prestador> findByUsuario(User usuario);

    // Método customizado para buscar o prestador pelo ID do usuário
    Prestador findByUsuarioId(Long usuarioId);

    @Query(value = "SELECT * FROM prestador ORDER BY RANDOM() LIMIT :limite", nativeQuery = true)
    List<Prestador> obterPrestadoresAleatorios(int limite);

    List<Prestador> findByCategoria(Categoria categoria);

    // List<Prestador> findByNomeContainingIgnoreCase(String nome);

    @Query(value = """
                SELECT p
                FROM Prestador p
                LEFT JOIN p.usuario u
                WHERE LOWER(u.nome) LIKE LOWER(CONCAT('%', :nome, '%'))
            """)
    List<Prestador> buscarPorNomeDeUsuario(@Param("nome") String nome);

}

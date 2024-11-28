package br.tasko.tasko.Repository;

import br.tasko.tasko.model.User;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByCpf(String cpf);

    boolean existsByEmail(String email);

    Optional<User> findByEmail(String email);

    // @Query(value = """
    //             SELECT u
    //             FROM User
    //             WHERE LOWER(u.nome) LIKE LOWER(CONCAT('%', :nome, '%'))
    //         """)
    // List<User> buscarPorNomeAproximado(@Param("nome") String nome);
}

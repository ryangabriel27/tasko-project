package br.tasko.tasko.Repository;

import org.springframework.data.repository.CrudRepository;

import br.tasko.tasko.model.User;
import java.util.List;

public interface UserRepository extends CrudRepository<User, Long> {
    boolean existsByEmail(String email); // Verifica se o usuario existe

    User findByEmail(String email); // Procura usuário por Emai
}

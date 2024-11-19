package br.tasko.tasko.Repository;

import br.tasko.tasko.model.User;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByCpf(String cpf);
    boolean existsByEmail(String email);
    Optional<User> findByEmail(String email);
    
}

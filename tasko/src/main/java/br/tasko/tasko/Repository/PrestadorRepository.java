package br.tasko.tasko.Repository;

import org.springframework.data.repository.CrudRepository;

import br.tasko.tasko.model.Prestador;
import br.tasko.tasko.model.User;

import java.util.List;

public interface PrestadorRepository extends CrudRepository<Prestador, Long> {
    List<Prestador> findByUsuario(User usuario);

    boolean existsByUsuario(User usuario);
}

package br.tasko.tasko.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.tasko.tasko.model.Categoria;

public interface CategoriaRepository extends JpaRepository<Categoria, Long> {

}

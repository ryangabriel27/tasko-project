package br.tasko.tasko.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.tasko.tasko.Repository.CategoriaRepository;
import br.tasko.tasko.Repository.PrestadorRepository;
import br.tasko.tasko.Repository.UserRepository;
import br.tasko.tasko.model.Categoria;
import br.tasko.tasko.model.Prestador;
import br.tasko.tasko.model.User;

@Service
public class PrestadorService {

    @Autowired
    private PrestadorRepository prestadorRepository;

    @Autowired
    private CategoriaRepository categoriaRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Prestador> listarTodosPrestadores() {
        return prestadorRepository.findAll();
    }

    public Prestador cadastrarPrestador(Prestador prestador) {
        // Verificar se o usuário já é prestador
        if (prestadorRepository.findByUsuario(prestador.getUsuario()).isPresent()) {
            throw new RuntimeException("Usuário já é prestador!");
        }
        return prestadorRepository.save(prestador);
    }

    // Método para buscar um prestador pelo ID
    public Prestador obterPrestadorPorId(Long id) {
        return prestadorRepository.findById(id).orElse(null); // Retorna null caso o prestador não seja encontrado
    }

    // Método para buscar um prestador pelo ID do usuário associado
    public Prestador obterPrestadorPorUsuarioId(Long usuarioId) {
        return prestadorRepository.findByUsuarioId(usuarioId); // Nova consulta no repositório
    }

    // Método para buscar prestadores aleatórios
    public List<Prestador> obterPrestadoresAleatorios(int limite) {
        return prestadorRepository.obterPrestadoresAleatorios(limite);
    }

    // Método para buscar prestadores aleatórios
    public List<Prestador> obterPrestadoresPorCategoria(Long id) {
        Optional<Categoria> categoria = categoriaRepository.findById(id);
        return prestadorRepository.findByCategoria(categoria.get());
    }

    public List<Prestador> buscarPrestadoresPorNome(String nome) {
        // Passo 1: Buscar usuários com nomes semelhantes
        List<User> usuarios = userRepository.buscarPorNomeAproximado(nome);

        if (usuarios.isEmpty()) {
            System.out.println("Nenhum usuário encontrado com o nome fornecido.");
            return new ArrayList<>();
        }

        // Passo 2: Buscar apenas os prestadores associados aos usuários encontrados
        List<Prestador> prestadoresEncontrados = new ArrayList<>();
        for (User usuario : usuarios) {
            Optional<Prestador> prestador = prestadorRepository.findByUsuario(usuario);
            if (prestador.get() != null) {
                prestadoresEncontrados.add(prestador.get());
            }
        }

        return prestadoresEncontrados;
    }

}

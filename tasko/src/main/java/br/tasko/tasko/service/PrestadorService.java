package br.tasko.tasko.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.tasko.tasko.Repository.PrestadorRepository;
import br.tasko.tasko.Repository.UserRepository;
import br.tasko.tasko.model.Prestador;

@Service
public class PrestadorService {

    @Autowired
    private PrestadorRepository prestadorRepository;

    @Autowired
    private UserRepository userRepository;

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
}

package br.tasko.tasko.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.tasko.tasko.Repository.AvaliacaoRepository;
import br.tasko.tasko.Repository.CategoriaRepository;
import br.tasko.tasko.Repository.ContratoRepository;
import br.tasko.tasko.Repository.PrestadorRepository;
import br.tasko.tasko.Repository.ServicoRepository;
import br.tasko.tasko.Repository.UserRepository;
import br.tasko.tasko.model.Categoria;
import br.tasko.tasko.model.Prestador;
import br.tasko.tasko.model.Servico;
import br.tasko.tasko.model.User;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

@Service
public class PrestadorService {

    @Autowired
    private PrestadorRepository prestadorRepository;

    @Autowired
    private CategoriaRepository categoriaRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AvaliacaoRepository avaliacaoRepository;

    @Autowired
    private ServicoRepository servicoRepository;

    @Autowired
    private ContratoRepository contratoRepository;

    public List<Prestador> listarTodosPrestadores() {
        return prestadorRepository.findAll();
    }

    public Prestador cadastrarPrestador(Prestador prestador) {
        // Verificar se o usuário já é prestador
        if(prestadorRepository.existsByCnpj(prestador.getCnpj())){
            throw new RuntimeException("CNPJ já cadastrado!");
        }
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

    public Prestador atualizarPrestador(Long id, Prestador prestadorAtualizado) {
        Optional<Prestador> prestadorOptional = prestadorRepository.findById(id);

        if (prestadorOptional.isEmpty()) {
            throw new RuntimeException("Prestador não encontrado.");
        }

        Prestador prestador = prestadorOptional.get();

        // Verifica se o JSON contém a categoria
        if (prestadorAtualizado.getCategoria() != null && prestadorAtualizado.getCategoria().getId() != null) {
            Optional<Categoria> categoriaOptional = categoriaRepository
                    .findById(prestadorAtualizado.getCategoria().getId());
            if (categoriaOptional.isEmpty()) {
                throw new RuntimeException("Categoria não encontrada.");
            }
            prestador.setCategoria(categoriaOptional.get());
        }

        prestador.setDescricaoServicos(prestadorAtualizado.getDescricaoServicos());
        prestador.setValorHora(prestadorAtualizado.getValorHora());
        prestador.setCnpj(prestadorAtualizado.getCnpj());
        prestador.setLinks(prestadorAtualizado.getLinks());

        return prestadorRepository.save(prestador);
    }

    @Transactional
    public void excluirPrestador(Long prestadorId) {
        // Verifica se o prestador existe
        Prestador prestador = prestadorRepository.findById(prestadorId)
                .orElseThrow(() -> new EntityNotFoundException("Prestador não encontrado"));

        // 1. Excluir avaliações associadas
        avaliacaoRepository.deleteAllByPrestador(prestador);

        // 2. Excluir contratos associados aos serviços do prestador
        List<Servico> servicos = servicoRepository.findAllByPrestador(prestador);
        for (Servico servico : servicos) {
            contratoRepository.deleteAllByServico(servico);
        }

        // 3. Excluir serviços associados ao prestador
        servicoRepository.deleteAllByPrestador(prestador);

        // 4. Excluir o usuário associado ao prestador
        // userRepository.delete(prestador.getUsuario());

        // 5. Excluir o próprio prestador
        prestadorRepository.delete(prestador);
    }

}

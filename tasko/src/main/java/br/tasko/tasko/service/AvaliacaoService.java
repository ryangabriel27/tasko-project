package br.tasko.tasko.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.tasko.tasko.Repository.AvaliacaoRepository;
import br.tasko.tasko.Repository.PrestadorRepository;
import br.tasko.tasko.model.Avaliacao;
import br.tasko.tasko.model.Prestador;

@Service
public class AvaliacaoService {

    @Autowired
    private PrestadorRepository prestadorRepository;

    @Autowired
    private AvaliacaoRepository avaliacaoRepository;

    // Criar uma nova avaliação
    public Avaliacao criarAvaliacao(Avaliacao avaliacao) {
        return avaliacaoRepository.save(avaliacao);
    }

    // Listar todas as avaliações de um prestador
    public List<Avaliacao> listarAvaliacoesPorPrestador(Long prestadorId) {
        Optional<Prestador> prestador = prestadorRepository.findById(prestadorId);
        return avaliacaoRepository.findByPrestador(prestador.get());
    }

    // Buscar uma avaliação específica (opcional, caso precise de detalhes)
    public Avaliacao buscarAvaliacaoPorId(Long id) {
        return avaliacaoRepository.findById(id).orElse(null);
    }

    // Calcular a média das avaliações de um prestador
    public Double calcularMediaAvaliacoes(Long prestadorId) {
        Optional<Prestador> prestador = prestadorRepository.findById(prestadorId);
        List<Avaliacao> avaliacoes = avaliacaoRepository.findByPrestador(prestador.get());

        if (avaliacoes.isEmpty()) {
            return 0.0; // Caso não haja avaliações, retorna 0
        }

        double somaNotas = 0;
        for (Avaliacao avaliacao : avaliacoes) {
            somaNotas += avaliacao.getNota();
        }

        return somaNotas / avaliacoes.size(); // Retorna a média das notas
    }
}

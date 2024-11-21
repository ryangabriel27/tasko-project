package br.tasko.tasko.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.tasko.tasko.model.Avaliacao;
import br.tasko.tasko.service.AvaliacaoService;

@RestController
@RequestMapping("/api/avaliacoes")
public class AvaliacaoController {

    @Autowired
    private AvaliacaoService avaliacaoService;

    // Endpoint para criar uma avaliação
    @PostMapping
    public ResponseEntity<Avaliacao> criarAvaliacao(@RequestBody Avaliacao avaliacao) {
        try {
            Avaliacao novaAvaliacao = avaliacaoService.criarAvaliacao(avaliacao);
            return new ResponseEntity<>(novaAvaliacao, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    // Endpoint para listar todas as avaliações de um prestador
    @GetMapping("/prestador/{prestadorId}")
    public ResponseEntity<List<Avaliacao>> listarAvaliacoesPorPrestador(@PathVariable Long prestadorId) {
        List<Avaliacao> avaliacoes = avaliacaoService.listarAvaliacoesPorPrestador(prestadorId);
        if (avaliacoes.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(avaliacoes, HttpStatus.OK);
    }

    // Endpoint para buscar uma avaliação por ID (opcional)
    @GetMapping("/{id}")
    public ResponseEntity<Avaliacao> buscarAvaliacaoPorId(@PathVariable Long id) {
        Avaliacao avaliacao = avaliacaoService.buscarAvaliacaoPorId(id);
        if (avaliacao == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(avaliacao, HttpStatus.OK);
    }

    // Endpoint para calcular a média das avaliações de um prestador
    @GetMapping("/prestador/{prestadorId}/media")
    public ResponseEntity<Double> calcularMediaAvaliacoes(@PathVariable Long prestadorId) {
        Double media = avaliacaoService.calcularMediaAvaliacoes(prestadorId);
        return new ResponseEntity<>(media, HttpStatus.OK);
    }
}
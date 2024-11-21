package br.tasko.tasko.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.tasko.tasko.model.Servico;
import br.tasko.tasko.service.ServicoService;

@RestController
@RequestMapping("/api/servicos")
public class ServicoController {

    @Autowired
    private ServicoService servicoService;

    // Endpoint para cadastrar um serviço
    @PostMapping
    public ResponseEntity<Servico> cadastrarServico(@RequestBody Servico servico) {
        Servico novoServico = servicoService.cadastrarServico(servico);
        return ResponseEntity.ok(novoServico);
    }

    // Endpoint para listar todos os serviços
    @GetMapping
    public ResponseEntity<List<Servico>> listarServicos() {
        List<Servico> servicos = servicoService.listarServicos();
        return ResponseEntity.ok(servicos);
    }

    // Endpoint para buscar serviço por ID
    @GetMapping("/{id}")
    public ResponseEntity<Servico> buscarServicoPorId(@PathVariable Long id) {
        Servico servico = servicoService.buscarServicoPorId(id);
        return ResponseEntity.ok(servico);
    }

    // Endpoint para atualizar serviço
    @PutMapping("/{id}")
    public ResponseEntity<Servico> atualizarServico(@PathVariable Long id, @RequestBody Servico servicoAtualizado) {
        Servico servico = servicoService.atualizarServico(id, servicoAtualizado);
        return ResponseEntity.ok(servico);
    }

    // Endpoint para deletar serviço
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarServico(@PathVariable Long id) {
        servicoService.deletarServico(id);
        return ResponseEntity.noContent().build();
    }

    // Endpoint para listar serviços por ID do prestador
    @GetMapping("/prestador/{prestadorId}")
    public ResponseEntity<List<Servico>> listarServicosPorPrestador(@PathVariable Long prestadorId) {
        List<Servico> servicos = servicoService.listarServicosPorPrestador(prestadorId);
        return ResponseEntity.ok(servicos);
    }
}
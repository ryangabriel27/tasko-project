package br.tasko.tasko.controller;

import java.util.List;

import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.tasko.tasko.model.Contrato;
import br.tasko.tasko.service.ContratoService;
import jakarta.transaction.Transactional;

@RestController
@RequestMapping("/api/contratos")
public class ContratoController {

    @Autowired
    private ContratoService contratoService;

    @PostMapping
    public ResponseEntity<Contrato> criarContrato(@RequestBody Contrato contrato) {
        Contrato contratoNovo = contratoService.criarContrato(contrato.getServico().getId(),
                contrato.getUsuario().getId());
        return ResponseEntity.ok(contratoNovo);
    }

    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<List<Contrato>> listarContratosPorUsuario(@PathVariable Long usuarioId) {
        try {
            List<Contrato> contratos = contratoService.listarContratosPorUsuario(usuarioId);

            // Inicializa as associações "lazy" explicitamente
            contratos.forEach(contrato -> Hibernate.initialize(contrato.getServico()));

            return ResponseEntity.ok(contratos);
        } catch (Exception e) {
            // Retorna erro 500 com a mensagem
            return ResponseEntity.status(500).body(null);
        }
    }

    @Transactional
    @GetMapping("/prestador/{prestadorId}")
    public ResponseEntity<List<Contrato>> listarContratosPorPrestador(@PathVariable Long prestadorId) {

        try {
            List<Contrato> contratos = contratoService.listarContratosPorPrestador(prestadorId);
            contratos.forEach(contrato -> {
                Hibernate.initialize(contrato.getServico());
                Hibernate.initialize(contrato.getServico().getPrestador());
                Hibernate.initialize(contrato.getServico().getPrestador().getUsuario());
            });

            return ResponseEntity.ok(contratos);
        } catch (Exception e) {
            // TODO: handle exception
            return ResponseEntity.status(500).body(null);
        }

    }

    @PostMapping("/{contratoId}/status")
    public ResponseEntity<Contrato> alterarStatusContrato(
            @PathVariable Long contratoId,
            @RequestParam String acao) {
        try {
            Contrato contratoAtualizado = contratoService.alterarStatusContrato(contratoId, acao);
            return ResponseEntity.ok(contratoAtualizado);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }
}
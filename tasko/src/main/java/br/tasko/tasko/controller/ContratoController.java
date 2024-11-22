package br.tasko.tasko.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.tasko.tasko.model.Contrato;
import br.tasko.tasko.service.ContratoService;

@RestController
@RequestMapping("/api/contratos")
public class ContratoController {

    @Autowired
    private ContratoService contratoService;

    @PostMapping
    public ResponseEntity<Contrato> criarContrato(@RequestBody Contrato contrato) {
        Contrato contratoNovo = contratoService.criarContrato(contrato.getServico().getId(), contrato.getUsuario().getId());
        return ResponseEntity.ok(contratoNovo);
    }

    @GetMapping("/{usuarioId}")
    public ResponseEntity<List<Contrato>> listarContratosPorUsuario(@PathVariable Long usuarioId) {
        List<Contrato> contratos = contratoService.listarContratosPorUsuario(usuarioId);
        return ResponseEntity.ok(contratos);
    }
}
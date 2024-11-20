package br.tasko.tasko.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.tasko.tasko.model.Prestador;
import br.tasko.tasko.service.PrestadorService;

@RestController
@RequestMapping("/api/prestadores")
public class PrestadorController {

    @Autowired
    private PrestadorService prestadorService;

    @PostMapping
    public ResponseEntity<?> cadastrarPrestador(@RequestBody Prestador prestador) {
        try {
            Prestador novoPrestador = prestadorService.cadastrarPrestador(prestador);
            return ResponseEntity.ok(novoPrestador);
        } catch (Exception e) {
            return ResponseEntity.status(400).body("Erro ao cadastrar prestador: " + e.getMessage());
        }
    }

    // Endpoint para buscar um prestador pelo ID
    @GetMapping("/{id}")
    public ResponseEntity<?> obterPrestadorPorId(@PathVariable Long id) {
        try {
            Prestador prestador = prestadorService.obterPrestadorPorId(id);
            if (prestador == null) {
                return ResponseEntity.status(404).body("Prestador não encontrado.");
            }
            return ResponseEntity.ok(prestador);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erro ao buscar prestador: " + e.getMessage());
        }
    }

    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<?> obterPrestadorPorUsuarioId(@PathVariable Long usuarioId) {
        try {
            Prestador prestador = prestadorService.obterPrestadorPorUsuarioId(usuarioId);
            if (prestador == null) {
                return ResponseEntity.status(404).body("Prestador não encontrado para o usuário com id: " + usuarioId);
            }
            return ResponseEntity.ok(prestador);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erro ao buscar prestador: " + e.getMessage());
        }
    }
}
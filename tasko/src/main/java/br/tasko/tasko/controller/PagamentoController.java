package br.tasko.tasko.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import br.tasko.tasko.model.Pagamento;
import br.tasko.tasko.service.PagamentoService;

import java.util.List;

@RestController
@RequestMapping("/api/pagamentos")
public class PagamentoController {

    private final PagamentoService pagamentoService;

    public PagamentoController(PagamentoService pagamentoService) {
        this.pagamentoService = pagamentoService;
    }

    @PostMapping
    public ResponseEntity<Pagamento> criarPagamento(@RequestBody Pagamento pagamento) {
        Pagamento novoPagamento = pagamentoService.salvarPagamento(pagamento);
        return ResponseEntity.ok(novoPagamento);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pagamento> buscarPagamento(@PathVariable Long id) {
        return pagamentoService.buscarPagamentoPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<Pagamento>> listarPagamentos() {
        return ResponseEntity.ok(pagamentoService.listarPagamentos());
    }
}

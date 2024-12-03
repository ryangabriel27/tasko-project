package br.tasko.tasko.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.tasko.tasko.Repository.ContratoRepository;
import br.tasko.tasko.Repository.ServicoRepository;
import br.tasko.tasko.model.Prestador;
import br.tasko.tasko.model.Servico;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

@Service
public class ServicoService {

    @Autowired
    private ServicoRepository servicoRepository;

    @Autowired
    private ContratoRepository contratoRepository;

    @Transactional
    public void excluirServico(Long id) {
        // Verifica se o serviço existe
        Servico servico = servicoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Serviço não encontrado"));

        // Exclui os contratos associados ao serviço
        contratoRepository.deleteAllByServico(servico);

        // Exclui o serviço
        servicoRepository.delete(servico);
    }

    // Cadastrar um novo serviço
    public Servico cadastrarServico(Servico servico) {
        return servicoRepository.save(servico);
    }

    // Buscar todos os serviços
    public List<Servico> listarServicos() {
        return servicoRepository.findAll();
    }

    // Buscar serviço por ID
    public Servico buscarServicoPorId(Long id) {
        return servicoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Serviço não encontrado!"));
    }

    // Atualizar serviço
    public Servico atualizarServico(Long id, Servico servicoAtualizado) {
        Servico servico = buscarServicoPorId(id);
        servico.setTitulo(servicoAtualizado.getTitulo());
        servico.setDescricao(servicoAtualizado.getDescricao());
        servico.setHoras(servicoAtualizado.getHoras());
        servico.setValor(servicoAtualizado.getValor());
        servico.setStatus(servicoAtualizado.getStatus());
        return servicoRepository.save(servico);
    }

    // Buscar serviços por ID do prestador
    public List<Servico> listarServicosPorPrestador(Long prestadorId) {
        return servicoRepository.findByPrestadorId(prestadorId);
    }

    public List<Servico> buscarPorTitulo(String titulo) {
        return servicoRepository.buscarPorTitulo(titulo);
    }

    public List<Servico> buscarPorDescricao(String descricao) {
        return servicoRepository.buscarPorDescricao(descricao);
    }

    // Método para buscar serviços aleatórios
    public List<Servico> obterServicosAleatorios(int limite) {
        return servicoRepository.obterServicosAleatorios(limite);
    }
}

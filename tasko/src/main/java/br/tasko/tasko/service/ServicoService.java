package br.tasko.tasko.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.tasko.tasko.Repository.ServicoRepository;
import br.tasko.tasko.model.Servico;

@Service
public class ServicoService {

    @Autowired
    private ServicoRepository servicoRepository;

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
        servico.setDescricao(servicoAtualizado.getDescricao());
        servico.setHoras(servicoAtualizado.getHoras());
        servico.setValor(servicoAtualizado.getValor());
        servico.setStatus(servicoAtualizado.getStatus());
        return servicoRepository.save(servico);
    }

    // Deletar serviço
    public void deletarServico(Long id) {
        servicoRepository.deleteById(id);
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
}

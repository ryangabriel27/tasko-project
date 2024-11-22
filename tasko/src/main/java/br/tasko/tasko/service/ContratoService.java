package br.tasko.tasko.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.tasko.tasko.Repository.ContratoRepository;
import br.tasko.tasko.Repository.ServicoRepository;
import br.tasko.tasko.Repository.UserRepository;
import br.tasko.tasko.model.Contrato;
import br.tasko.tasko.model.Servico;
import br.tasko.tasko.model.User;

import java.util.List;
import java.util.Optional;

@Service
public class ContratoService {

    @Autowired
    private ContratoRepository contratoRepository;

    @Autowired
    private ServicoRepository servicoRepository;

    @Autowired
    private UserRepository usuarioRepository;

    public Contrato criarContrato(Long servicoId, Long usuarioId) {
        Optional<Servico> servicoOpt = servicoRepository.findById(servicoId);
        Optional<User> usuarioOpt = usuarioRepository.findById(usuarioId);

        if (servicoOpt.isEmpty() || usuarioOpt.isEmpty()) {
            throw new IllegalArgumentException("Serviço ou usuário não encontrado.");
        }

        Contrato contrato = new Contrato();
        contrato.setServico(servicoOpt.get());
        contrato.setUsuario(usuarioOpt.get());
        return contratoRepository.save(contrato);
    }

    public List<Contrato> listarContratosPorUsuario(Long usuarioId) {
        return contratoRepository.findByUsuarioId(usuarioId);
    }
}
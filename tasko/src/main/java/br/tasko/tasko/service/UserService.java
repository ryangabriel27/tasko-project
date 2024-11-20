package br.tasko.tasko.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import br.tasko.tasko.Repository.UserRepository;
import br.tasko.tasko.dto.RegisterDTO;
import br.tasko.tasko.model.User;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User registerUser(User registerDTO) {
        // Verificar se email ou CPF já existem
        if (userRepository.existsByEmail(registerDTO.getEmail())) {
            throw new RuntimeException("Email já cadastrado");
        }

        if (userRepository.existsByCpf(registerDTO.getCpf())) {
            throw new RuntimeException("CPF já cadastrado");
        }

        User user = new User();
        user.setNome(registerDTO.getNome());
        user.setData_nasc(registerDTO.getData_nasc());
        user.setFoto(registerDTO.getFoto());
        user.setSobrenome(registerDTO.getSobrenome());
        user.setEmail(registerDTO.getEmail());
        user.setCpf(registerDTO.getCpf());
        user.setTelefone(registerDTO.getTelefone());
        user.setSenha(passwordEncoder.encode(registerDTO.getSenha()));

        return userRepository.save(user);
    }

    public User authenticateUser(String email, String senha) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        if (!passwordEncoder.matches(senha, user.getSenha())) {
            throw new RuntimeException("Senha inválida");
        }

        return user;
    }

    public User findUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        return user;
    }

    
}
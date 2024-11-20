package br.tasko.tasko.controller;

import br.tasko.tasko.Repository.UserRepository;
import br.tasko.tasko.model.Prestador;
import br.tasko.tasko.model.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // Recupera todos os usuários
    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Adiciona um novo usuário
    @PostMapping
    public User addUser(@RequestBody User user) {
        return userRepository.save(user);
    }

    // Recupera um usuário pelo ID
    @GetMapping("/{id}")
    public Optional<User> getUserById(@PathVariable Long id) {
        return userRepository.findById(id);
    }

    // Atualiza um usuário pelo ID
    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User updatedUser) {
        return userRepository.findById(id).map(user -> {
            user.setNome(updatedUser.getNome());
            user.setSobrenome(updatedUser.getSobrenome());
            user.setSenha(updatedUser.getSenha());
            user.setTipo(updatedUser.getTipo());
            user.setData_nasc(updatedUser.getData_nasc());
            user.setCep(updatedUser.getCep());
            user.setEndereco(updatedUser.getEndereco());
            user.setFoto(updatedUser.getFoto());
            user.setCpf(updatedUser.getCpf());
            user.setTelefone(updatedUser.getTelefone());
            user.setEmail(updatedUser.getEmail());
            user.setPrestador(updatedUser.getPrestador());
            return userRepository.save(user);
        }).orElseThrow(() -> new RuntimeException("Usuário não encontrado com ID: " + id));
    }

    // Deleta um usuário pelo ID
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
        } else {
            throw new RuntimeException("Usuário não encontrado com ID: " + id);
        }
    }

    @PatchMapping("/{id}")
    public ResponseEntity<?> patchPrestador(@PathVariable Long id, @RequestBody Prestador prestador) {
        return userRepository.findById(id).map(user -> {
            user.setPrestador(prestador);
            userRepository.save(user);
            return ResponseEntity.ok(user);
        }).orElseThrow(() -> new RuntimeException("Usuário não encontrado com ID: " + id));
    }
}

package br.tasko.tasko.controller;

import br.tasko.tasko.Repository.UserRepository;
import br.tasko.tasko.model.Prestador;
import br.tasko.tasko.model.User;
import br.tasko.tasko.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/users")
public class UserController {

    @Autowired
    private UserService userService;

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
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        } else {
            return ResponseEntity.status(404).body(null); // Retorna 404 se o usuário não for encontrado
        }
    }

    // Deleta um usuário pelo ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return ResponseEntity.noContent().build(); // Retorna 204 No Content após exclusão
        } else {
            return ResponseEntity.status(404).build(); // Retorna 404 se o usuário não for encontrado
        }
    }

    // Atualiza um usuário pelo ID
    @PutMapping("/{id}")
    public ResponseEntity<User> atualizarUser(@PathVariable Long id, @RequestBody User usuarioAtualizado) {
        try {
            User usuario = userService.atualizarUser(id, usuarioAtualizado);  // Chama o serviço para atualizar o usuário
            return ResponseEntity.ok(usuario);  // Retorna o usuário atualizado no corpo da resposta
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(null);  // Retorna 404 se não encontrar o usuário
        }
    }

    // Atualiza apenas o prestador do usuário
    @PatchMapping("/{id}")
    public ResponseEntity<?> patchPrestador(@PathVariable Long id, @RequestBody Prestador prestador) {
        return userRepository.findById(id).map(user -> {
            user.setPrestador(prestador);
            userRepository.save(user);
            return ResponseEntity.ok(user);
        }).orElseThrow(() -> new RuntimeException("Usuário não encontrado com ID: " + id));
    }
}

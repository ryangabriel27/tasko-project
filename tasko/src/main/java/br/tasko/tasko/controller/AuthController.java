package br.tasko.tasko.controller;

import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import br.tasko.tasko.dto.LoginDTO;
import br.tasko.tasko.dto.RegisterDTO;
import br.tasko.tasko.model.User;
import br.tasko.tasko.service.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:3000") // Permite o acesso do React
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User usuario) {
        try {
            User user = userService.registerUser(usuario);
            return ResponseEntity.ok(user);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginDTO loginDTO, HttpSession session) {
        try {
            User user = userService.authenticateUser(loginDTO.getEmail(), loginDTO.getSenha());

            // Salvar informações na sessão
            session.setAttribute("userId", user.getId());
            session.setAttribute("userEmail", user.getEmail());

            // Verifique se a sessão está sendo criada corretamente
            System.out.println("Sessão criada com ID: " + session.getId());

            return ResponseEntity.ok(user);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/current")
    public ResponseEntity<?> getCurrentUser(HttpSession session) {
        Long userId = (Long) session.getAttribute("userId");
        if (userId == null) {
            return ResponseEntity.status(401).body("Usuário não autenticado");
        }

        // Busca o usuário pelo ID
        User usuario = userService.findUser(userId);

        return ResponseEntity.ok(usuario);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpSession session) {
        session.invalidate();
        return ResponseEntity.ok().build();
    }
}
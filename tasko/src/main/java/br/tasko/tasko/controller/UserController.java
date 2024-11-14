package br.tasko.tasko.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.tasko.tasko.Repository.UserRepository;
import br.tasko.tasko.model.User;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserRepository usR;

    @GetMapping
    public List<User> getAllUsers() {
        return (List<User>) usR.findAll();
    }

    @PostMapping
    public User adicionarUsuario(@RequestBody User user) {
        return usR.save(user);
    }

    @GetMapping("/{id}")
    public Optional<User> getUserById(@PathVariable Long id) {
        return usR.findById(id);
    }

    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User user) {
        if (usR.existsById(id)) {
            user.setId(id);
            return usR.save(user);
        } else {
            return null;
        }
    }

    @DeleteMapping("/{id}")
    public List<User> deleteUser(@PathVariable Long id) {
        Optional<User> user = usR.findById(id);
        if (user.isPresent()) {
            usR.delete(user.get());
            return (List<User>) usR.findAll();
        } else {
            return null;
        }
    }

}

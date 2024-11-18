package br.tasko.tasko.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import br.tasko.tasko.Repository.UserRepository;
import br.tasko.tasko.model.User;

@Controller
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserRepository usR;

    // Método para exibir todos os usuários (para uso administrativo)
    @GetMapping
    public String getAllUsers(Model model) {
        List<User> users = (List<User>) usR.findAll();
        model.addAttribute("users", users);
        return "user-list"; // Certifique-se de ter uma página user-list.html para listar usuários, se necessário
    }

    // Exibir formulário de cadastro com base no tipo de usuário
    @GetMapping("/cadastro")
    public String mostrarFormularioCadastro(@RequestParam("tipo") String tipo, Model model) {
        model.addAttribute("tipo", tipo);
        return "cadastro"; // Certifique-se de que o nome da página está correto
    }

    // Cadastrar novo usuário e redirecionar para a página de login
    @PostMapping("/cadastrar")
    public String cadastrarUsuario(@ModelAttribute User user) {
        usR.save(user);
        return "redirect:/login"; // Redireciona para a página de login após o cadastro
    }

    // Buscar usuário por ID
    @GetMapping("/{id}")
    public String getUserById(@PathVariable Long id, Model model) {
        Optional<User> user = usR.findById(id);
        if (user.isPresent()) {
            model.addAttribute("user", user.get());
            return "user-details"; // Página para exibir detalhes do usuário
        } else {
            return "user-not-found"; // Página para caso o usuário não seja encontrado
        }
    }

    // Atualizar dados do usuário
    @PutMapping("/{id}")
    public String updateUser(@PathVariable Long id, @RequestBody User user) {
        if (usR.existsById(id)) {
            user.setId(id);
            usR.save(user);
            return "redirect:/users/" + id; // Redireciona para a página de detalhes do usuário atualizado
        } else {
            return "user-not-found"; // Página para caso o usuário não seja encontrado
        }
    }

    // Deletar usuário por ID
    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable Long id, Model model) {
        Optional<User> user = usR.findById(id);
        if (user.isPresent()) {
            usR.delete(user.get());
            model.addAttribute("users", usR.findAll());
            return "user-list"; // Atualiza a lista de usuários após deletar
        } else {
            return "user-not-found"; // Página para caso o usuário não seja encontrado
        }
    }
}

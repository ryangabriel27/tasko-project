package br.tasko.tasko.controller;

import br.tasko.tasko.model.Prestador;
import br.tasko.tasko.model.User;
import br.tasko.tasko.Repository.PrestadorRepository;
import br.tasko.tasko.Repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PrestadorRepository prestadorRepository;

    @PostMapping("/cadastrar")
    public String cadastrarUsuario(@ModelAttribute User user,
            BindingResult result,
            @RequestParam(required = false) String descricaoServicos,
            @RequestParam(required = false) String categoriaServicos,
            @RequestParam(required = false) String cnpj,
            @RequestParam(required = false) String links,
            @RequestParam(required = false) Integer valorHora,
            Model model) {
        // Verifica se o CPF ou e-mail já existem
        if (userRepository.existsByCpf(user.getCpf())) {
            model.addAttribute("errorMessage", "O CPF informado já está cadastrado.");
            return "erro";
        }
        if (userRepository.existsByEmail(user.getEmail())) {
            model.addAttribute("errorMessage", "O e-mail informado já está cadastrado.");
            return "erro";
        }

        // Para prestador, verifica o CNPJ
        if ("prestador".equals(user.getTipo()) && cnpj != null && prestadorRepository.existsByCnpj(cnpj)) {
            model.addAttribute("errorMessage", "O CNPJ informado já está cadastrado.");
            return "erro";
        }

        // Código de cadastro segue como antes...
        if ("prestador".equals(user.getTipo())) {
            Prestador prestador = new Prestador();
            prestador.setUsuario(user);
            prestador.setDescricaoServicos(descricaoServicos);
            prestador.setCategoriaServicos(categoriaServicos);
            prestador.setCnpj(cnpj);
            prestador.setLinks(links);
            prestador.setValorHora(valorHora != null ? valorHora : 0);

            userRepository.save(user);
            prestadorRepository.save(prestador);

            user.setPrestador(prestador);
            userRepository.save(user);
        } else {
            userRepository.save(user);
        }

        model.addAttribute("successMessage", "Usuário cadastrado com sucesso!");
        return "redirect:/successPage";
    }

    @GetMapping("/cadastro")
    public String mostrarFormularioCadastro(@RequestParam("tipo") String tipo, Model model) {
        model.addAttribute("tipo", tipo);
        return "cadastro"; // Certifique-se de que o nome da página está correto
    }

}

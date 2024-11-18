package br.tasko.tasko.controller;

import br.tasko.tasko.model.Prestador;
import br.tasko.tasko.model.User;
import br.tasko.tasko.Repository.PrestadorRepository;
import br.tasko.tasko.Repository.UserRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
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
                                   @RequestParam(required = false) String descricaoServicos,
                                   @RequestParam(required = false) String categoriaServicos,
                                   @RequestParam(required = false) String cnpj,
                                   @RequestParam(required = false) String links,
                                   @RequestParam(required = false) Integer valorHora,
                                   Model model) {
        if ("prestador".equals(user.getTipo())) {
            // Criando e salvando Prestador
            Prestador prestador = new Prestador();
            prestador.setUsuario(user);
            prestador.setDescricaoServicos(descricaoServicos);
            prestador.setCategoriaServicos(categoriaServicos);
            prestador.setCnpj(cnpj);
            prestador.setLinks(links);
            prestador.setValorHora(valorHora);

            // Salvar User primeiro
            userRepository.save(user);

            // Associar o prestador ao usuário e salvar prestador
            prestadorRepository.save(prestador);
            user.setPrestador(prestador);
            userRepository.save(user); // Atualizar o User com o     prestador relacionado
        } else {
            // Salvando Cliente
            userRepository.save(user);
        }

        model.addAttribute("successMessage", "Usuário cadastrado com sucesso!");
        return "redirect:/successPage"; // Redireciona para uma página de sucesso
    }

    @GetMapping("/cadastro")
    public String mostrarFormularioCadastro(@RequestParam("tipo") String tipo, Model model) {
        model.addAttribute("tipo", tipo);
        return "cadastro"; // Certifique-se de que o nome da página está correto
    }

}

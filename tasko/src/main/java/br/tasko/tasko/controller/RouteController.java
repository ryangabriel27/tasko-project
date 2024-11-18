package br.tasko.tasko.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class RouteController {

    // Rota para a página inicial (página de boas-vindas ou home)
    @GetMapping("/")
    public String home() {
        return "index"; // Retorna o nome da view (HTML) que será renderizada
    }

    // Rota para a página de cadastro
    @GetMapping("/cadastro")
    public String cadastro() {
        return "cadastro"; // Retorna o nome da view de cadastro
    }

    // Rota para a página de login
    @GetMapping("/login")
    public String login() {
        return "login"; // Retorna o nome da view de login
    }

    @GetMapping("/busca")
    public String busca() {
        return "busca";
    }

    @GetMapping("/inicio")
    public String inicio() {
        return "inicio";
    }

    @GetMapping("/perfil")
    public String perfil() {
        return "perfil";
    }
    
}

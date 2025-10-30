package com.projeto.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projeto.backend.model.Funcionario;

@CrossOrigin(origins = "http://localhost:5173") // libera para o React
@RestController
public class FuncionarioController {

    @GetMapping("/funcionarios")
    public List<Funcionario> listarFuncionarios() {
        return List.of(
                new Funcionario(1L, "João Silva", "Desenvolvedor"),
                new Funcionario(2L, "Maria Souza", "Designer"),
                new Funcionario(3L, "Carlos Lima", "Analista")
        );
    }
}

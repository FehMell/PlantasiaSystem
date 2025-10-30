package com.projeto.backend.model;

public class Funcionario {
     public Long id;
     public String nome;
     public String cargo;

    public Funcionario(Long id, String nome, String cargo) {
        this.id = id;
        this.nome = nome;
        this.cargo = cargo;
    }

    public Long getId() { return id; }
    public String getNome() { return nome; }
    public String getCargo() { return cargo; }
}
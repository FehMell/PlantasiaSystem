package com.plantasia.controller;

import com.plantasia.model.Plant;
import com.plantasia.service.PlantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/plants")
public class PlantController {

    @Autowired
    private PlantService plantService;

    // Lista todas as plantas
    @GetMapping
    public String listPlants(Model model) {
        model.addAttribute("plants", plantService.findAll());
        return "plants/list"; // página: templates/plants/list.html
    }

    // formulário de cadastro
    @GetMapping("/new")
    public String newPlant(Model model) {
        model.addAttribute("plant", new Plant());
        return "plants/form"; // página: templates/plants/form.html
    }

    // salva a planta
    @PostMapping
    public String savePlant(@ModelAttribute("plant") Plant plant) {
        plantService.save(plant);
        return "redirect:/plants";
    }

    // formulário para editar
    @GetMapping("/edit/{id}")
    public String editPlant(@PathVariable Long id, Model model) {
        Plant plant = plantService.findById(id);
        model.addAttribute("plant", plant);
        return "plants/form";
    }

    // excluir a planta
    @GetMapping("/delete/{id}")
    public String deletePlant(@PathVariable Long id) {
        plantService.delete(id);
        return "redirect:/plants";
    }
}
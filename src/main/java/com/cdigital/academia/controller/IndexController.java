package com.cdigital.academia.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class IndexController {

    //Leyendo la variable del application.properties
    @Value("${app.json.version}")
    private String jsonVersion;

    @GetMapping("/acad")
    public String showIndex(Model model){
        System.out.println("Mostrando la pagina inicial");

        model.addAttribute("title", "Judo Academic Figuereo & Solís");
        model.addAttribute("jsonVersion", jsonVersion);
        return "index";
    }
}

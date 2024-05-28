package com.example.progettowsda.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class TabelloneController {

    @GetMapping("/tabellone")
    public String getTabellone(@RequestParam(name = "id_impianto", required = false) String codImpianto,
                               @RequestParam(name = "ref_palinsesto", required = false) String codPalinsesto,
                               Model model) {
        // Logica per gestire codImpianto e codPalinsesto
        if (codImpianto != null) {
            model.addAttribute("codImpianto", codImpianto);
        }
        if (codPalinsesto != null) {
            model.addAttribute("codPalinsesto", codPalinsesto);
        }
        // Restituisce il nome del template Thymeleaf (tabellone.html)
        return "tabellone";
    }
}

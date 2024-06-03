package com.example.progettowsda.controller;

import com.example.progettowsda.entity.Impianto;
import com.example.progettowsda.repository.ImpiantoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class TabelloneController {

    @Autowired
    private ImpiantoRepository impiantoRepository;

    @GetMapping("/tabellone")
    public String getTabellone(@RequestParam(name = "id_impianto", required = true) String codImpianto,
                               Model model) {
        Impianto impianto = impiantoRepository.findByIdImpianto(codImpianto);
        if (impianto != null) {
            model.addAttribute("codImpianto", codImpianto);
            model.addAttribute("codPalinsesto", impianto.getPalinsesto().getIdPalinsesto());
            model.addAttribute("palinsestoPath", impianto.getPalinsesto().getPath());
        } else {
            // Handle the case where the impianto is not found
            model.addAttribute("error", "Impianto not found");
        }
        return "tabellone";
    }
}

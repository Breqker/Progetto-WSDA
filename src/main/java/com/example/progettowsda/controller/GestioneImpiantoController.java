package com.example.progettowsda.controller;

import com.example.progettowsda.entity.Impianto;
import com.example.progettowsda.entity.Palinsesto;
import com.example.progettowsda.repository.ImpiantoRepository;
import com.example.progettowsda.repository.PalinsestoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@Controller
@RequestMapping(path = "/dbaccess")
public class GestioneImpiantoController {

    @Autowired
    private ImpiantoRepository impiantoRepository;

    @Autowired
    private PalinsestoRepository palinsestoRepository;

    @GetMapping(path = "/main")
    public String showMainPage(Model model) {
        Iterable<Impianto> impianti = impiantoRepository.findAll();
        model.addAttribute("impianti", impianti);
        model.addAttribute("impianto", new Impianto());
        Iterable<Palinsesto> palinsesti = palinsestoRepository.findAll();
        model.addAttribute("palinsesti", palinsesti);
        return "gestione_impianti"; // Thymeleaf template name for the main page
    }

    @PostMapping(path = "/add")
    public String addNewImpianto(@ModelAttribute Impianto impianto, Model model) {
        Optional<Palinsesto> palinsesto = palinsestoRepository.findById(impianto.getPalinsesto().getIdPalinsesto());
        if (!palinsesto.isPresent()) {
            return "error";
        }

        impianto.setStato(true); // Default to true
        impiantoRepository.save(impianto);

        return "redirect:/dbaccess/main";
    }

    @GetMapping(path = "/mod/{idImpianto}")
    public String showModForm(@PathVariable("idImpianto") String idImpianto, Model model) {
        Impianto imp = impiantoRepository.findById(idImpianto).orElse(null);
        if (imp == null) {
            return "error"; // Handle error if impianto not found
        }
        Iterable<Palinsesto> palinsesti = palinsestoRepository.findAll();
        model.addAttribute("palinsesti", palinsesti);
        model.addAttribute("impianto", imp);
        return "gestione_impianti"; // Thymeleaf template name for the main page
    }

    @PostMapping(path = "/mod/{idImpianto}")
    public String modImpianto(@PathVariable("idImpianto") String idImpianto, @ModelAttribute Impianto modifiedImpianto, Model model) {
        Impianto imp = impiantoRepository.findById(idImpianto).orElse(null);
        if (imp == null) {
            return "error"; // Handle error if impianto not found
        }

        Optional<Palinsesto> palinsesto = palinsestoRepository.findById(modifiedImpianto.getPalinsesto().getIdPalinsesto());
        if (!palinsesto.isPresent()) {
            return "error";
        }

        imp.setPalinsesto(palinsesto.get());
        imp.setStato(modifiedImpianto.isStato());
        imp.setLatitudine(modifiedImpianto.getLatitudine());
        imp.setLongitudine(modifiedImpianto.getLongitudine());

        impiantoRepository.save(imp);

        return "redirect:/dbaccess/main";
    }

    @GetMapping(path = "/delete/{idImpianto}")
    public String deleteImpianto(@PathVariable("idImpianto") String idImpianto) {
        impiantoRepository.deleteById(idImpianto);
        return "redirect:/dbaccess/main";
    }
}

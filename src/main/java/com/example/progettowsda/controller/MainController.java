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
public class MainController {

    @Autowired
    private ImpiantoRepository impiantoRepository;

    @Autowired
    private PalinsestoRepository palinsestoRepository;

    @GetMapping(path = "/add")
    public String showAddForm(Model model) {
        Iterable<Palinsesto> palinsesti = palinsestoRepository.findAll();
        model.addAttribute("palinsesti", palinsesti);
        model.addAttribute("impianto", new Impianto());
        return "addForm";
    }

    @PostMapping(path = "/add")
    public String addNewImpianto(@ModelAttribute Impianto impianto, Model model) {
        Optional<Palinsesto> palinsesto = palinsestoRepository.findById(impianto.getPalinsesto().getIdPalinsesto());
        if (!palinsesto.isPresent()) {
            return "error";
        }

        impianto.setStato(true); // Default to true
        impiantoRepository.save(impianto);

        model.addAttribute("idImpianto", impianto.getIdImpianto());
        model.addAttribute("idPalinsesto", impianto.getPalinsesto().getIdPalinsesto());
        model.addAttribute("latitudine", impianto.getLatitudine());
        model.addAttribute("longitudine", impianto.getLongitudine());

        return "saved";
    }

    @GetMapping(path = "/all")
    public String getAllImpianti(Model model) {
        Iterable<Impianto> impianti = impiantoRepository.findAll();
        model.addAttribute("impianti", impianti);
        return "impiantiList"; // Thymeleaf template name to show the list of impianti
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
        return "modForm"; // Thymeleaf template name for the modification form
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

        // Add attributes for confirmation message
        model.addAttribute("idImpianto", imp.getIdImpianto());
        model.addAttribute("idPalinsesto", imp.getPalinsesto().getIdPalinsesto());
        model.addAttribute("latitudine", imp.getLatitudine());
        model.addAttribute("longitudine", imp.getLongitudine());
        model.addAttribute("stato", imp.isStato());

        return "modified"; // Thymeleaf template name for the modified confirmation page
    }


    @GetMapping(path = "/delete/{idImpianto}")
    public String deleteImpianto(@PathVariable("idImpianto") String idImpianto) {
        impiantoRepository.deleteById(idImpianto);
        return "deleted"; // Thymeleaf template name for the deletion confirmation page
    }
}

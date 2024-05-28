package com.example.progettowsda.controller;

import com.example.progettowsda.entity.Impianto;
import com.example.progettowsda.entity.ImpiantoId;
import com.example.progettowsda.repository.ImpiantoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping(path = "/dbaccess")
public class MainController {

    @Autowired
    private ImpiantoRepository impiantoRepository;

    @GetMapping(path = "/add")
    public String showAddForm() {
        return "addForm";
    }

    @PostMapping(path = "/add")
    public String addNewImpianto(@RequestParam String idImpianto,
                                 @RequestParam String idPalinsesto,
                                 @RequestParam double latitudine,
                                 @RequestParam double longitudine,
                                 Model model) {
        Impianto newImpianto = new Impianto();
        newImpianto.setIdImpianto(idImpianto);
        newImpianto.setIdPalinsesto(idPalinsesto);
        newImpianto.setLatitudine(latitudine);
        newImpianto.setLongitudine(longitudine);
        impiantoRepository.save(newImpianto);

        model.addAttribute("idImpianto", idImpianto);
        model.addAttribute("idPalinsesto", idPalinsesto);
        model.addAttribute("latitudine", latitudine);
        model.addAttribute("longitudine", longitudine);

        return "saved";
    }


    @GetMapping(path = "/all")
    public @ResponseBody Iterable<Impianto> getAllImpianti() {
        return impiantoRepository.findAll();
    }

    @GetMapping(path = "/mod")
    public @ResponseBody String modImpianto(@RequestParam String idImpianto, @RequestParam String idPalinsesto) {
        ImpiantoId impiantoId = new ImpiantoId();
        impiantoId.setIdImpianto(idImpianto);
        impiantoId.setIdPalinsesto(idPalinsesto);
        Impianto imp = impiantoRepository.findById(impiantoId).orElse(null);
        if (imp != null) {
            imp.setIdPalinsesto("Updated Palinsesto");
            impiantoRepository.save(imp);
            return "Modified";
        }
        return "Impianto not found";
    }

    @GetMapping(path = "/delete")
    public @ResponseBody String deleteImpianto(@RequestParam String idImpianto, @RequestParam String idPalinsesto) {
        ImpiantoId impiantoId = new ImpiantoId();
        impiantoId.setIdImpianto(idImpianto);
        impiantoId.setIdPalinsesto(idPalinsesto);
        impiantoRepository.deleteById(impiantoId);
        return "Deleted";
    }
}

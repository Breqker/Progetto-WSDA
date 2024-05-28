package com.example.progettowsda.controller;

import com.example.progettowsda.entity.Impianto;
import com.example.progettowsda.entity.Segnalazione;
import com.example.progettowsda.repository.ImpiantoRepository;
import com.example.progettowsda.repository.SegnalazioneRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@Controller
@RequestMapping(path = "/dbaccess")
public class SegnalazioniController {

    @Autowired
    private ImpiantoRepository impiantoRepository;

    @Autowired
    private SegnalazioneRepository segnalazioneRepository;

    @GetMapping("/segnalazioni")
    public String showSegnalazioniForm(Model model) {
        Iterable<Impianto> impianti = impiantoRepository.findAll();
        model.addAttribute("impianti", impianti);
        return "segnalazioniForm";
    }

    @PostMapping("/segnalazioni")
    public String getSegnalazioni(@RequestParam("idImpianto") String idImpianto,
                                  @RequestParam("startDateTime") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDateTime,
                                  @RequestParam("endDateTime") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDateTime,
                                  Model model) {
        List<Segnalazione> segnalazioni = segnalazioneRepository.findByImpianto_IdImpiantoAndDataInserimentoBetween(idImpianto, startDateTime, endDateTime);
        model.addAttribute("segnalazioni", segnalazioni);
        return "segnalazioniList";
    }
}

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
import java.util.Map;
import java.util.stream.Collectors;

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
        return "segnalazioni";
    }

    @PostMapping("/segnalazioni")
    public String getSegnalazioni(@RequestParam("idImpianto") String idImpianto,
                                  @RequestParam("startDateTime") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDateTime,
                                  @RequestParam("endDateTime") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDateTime,
                                  Model model) {

        List<Segnalazione> segnalazioni = segnalazioneRepository.findByImpianto_IdImpiantoAndDataInserimentoBetween(idImpianto, startDateTime, endDateTime);

        // Calcoliamo la somma delle durate di visualizzazione dei cartelloni
        int sommaDurate = segnalazioni.stream()
                .mapToInt(Segnalazione::getDurataVisual)
                .sum();

        // Contiamo il numero totale di segnalazioni
        long count = segnalazioni.size();

        // Raggruppiamo le segnalazioni per cod_cartellone per creare il grafico
        Map<String, Long> cartelloniVisualizzati = segnalazioni.stream()
                .collect(Collectors.groupingBy(Segnalazione::getCodCartellone, Collectors.counting()));

        model.addAttribute("segnalazioni", segnalazioni);
        model.addAttribute("sommaDurate", sommaDurate);
        model.addAttribute("numeroSegnalazioni", count);
        model.addAttribute("cartelloniVisualizzati", cartelloniVisualizzati);

        return "segnalazioni";
    }
}

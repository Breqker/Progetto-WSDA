package com.example.progettowsda.controller;

import com.example.progettowsda.entity.Segnalazione;
import com.example.progettowsda.repository.ImpiantoRepository;
import com.example.progettowsda.repository.SegnalazioneRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Controller
public class ReportImpiantiController {

    @Autowired
    private SegnalazioneRepository segnalazioneRepository;

    @Autowired
    private ImpiantoRepository impiantoRepository;


    // Costruttore per l'iniezione delle dipendenze
    public ReportImpiantiController(SegnalazioneRepository segnalazioneRepository) {
        this.segnalazioneRepository = segnalazioneRepository;

    }


    @GetMapping("/report")
    public String getReport(Model model) {
        List<Segnalazione> segnalazioni = segnalazioneRepository.findAll();
        List<String> codCartelloneList = segnalazioni.stream()
                .map(Segnalazione::getCodCartellone)
                .distinct()
                .collect(Collectors.toList());

        model.addAttribute("segnalazioni", segnalazioni);
        model.addAttribute("codCartelloneList", codCartelloneList);
        return "report_impianti";
    }

    @GetMapping("/reportByCartellone")
    public String getReportByCartellone(@RequestParam String codCartellone, Model model) {
        List<Segnalazione> segnalazioni = segnalazioneRepository.findByCodCartellone(codCartellone);
        List<String> codCartelloneList = segnalazioneRepository.findAll()
                .stream()
                .map(Segnalazione::getCodCartellone)
                .distinct()
                .collect(Collectors.toList());

        model.addAttribute("segnalazioni", segnalazioni);
        model.addAttribute("codCartelloneList", codCartelloneList);
        return "report_impianti";
    }

    @GetMapping("/reportByDateRange")
    public String getReportByDateRange(@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
                                       @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate,
                                       Model model) {
        LocalDateTime startOfDay = startDate.atStartOfDay();
        LocalDateTime endOfDay = endDate.atTime(23, 59, 59);
        List<Segnalazione> segnalazioni = segnalazioneRepository.findByDataInserimentoBetween(startOfDay, endOfDay);
        List<String> codCartelloneList = segnalazioneRepository.findAll()
                .stream()
                .map(Segnalazione::getCodCartellone)
                .distinct()
                .collect(Collectors.toList());

        model.addAttribute("segnalazioni", segnalazioni);
        model.addAttribute("codCartelloneList", codCartelloneList);
        return "report_impianti";
    }

    @GetMapping("/reportByCartelloneAndDateRange")
    public String getReportByCartelloneAndDateRange(@RequestParam String codCartellone,
                                                    @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
                                                    @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate,
                                                    Model model) {
        LocalDateTime startOfDay = startDate.atStartOfDay();
        LocalDateTime endOfDay = endDate.atTime(23, 59, 59);
        List<Segnalazione> segnalazioni = segnalazioneRepository.findByCodCartelloneAndDataInserimentoBetween(codCartellone, startOfDay, endOfDay);
        List<String> codCartelloneList = segnalazioneRepository.findAll()
                .stream()
                .map(Segnalazione::getCodCartellone)
                .distinct()
                .collect(Collectors.toList());

        model.addAttribute("segnalazioni", segnalazioni);
        model.addAttribute("codCartelloneList", codCartelloneList);
        return "report_impianti";
    }



    @GetMapping("/durataVisualByCartellone")
    public String getDurataVisualByCartellone(@RequestParam String codCartellone, Model model) {
        List<Segnalazione> segnalazioni = segnalazioneRepository.findByCodCartellone(codCartellone);

        int durataVisualComplessiva = segnalazioni.stream()
                .mapToInt(Segnalazione::getDurataVisual)
                .sum();

        List<Segnalazione> allSegnalazioni = segnalazioneRepository.findAll();
        List<String> codCartelloneList = allSegnalazioni.stream()
                .map(Segnalazione::getCodCartellone)
                .distinct()
                .collect(Collectors.toList());

        model.addAttribute("durataVisualComplessiva", durataVisualComplessiva);
        model.addAttribute("codCartelloneList", codCartelloneList);
        return "report_impianti";
    }



    @GetMapping("/durataVisualByCartelloneAndDate")
    public String getDurataVisualByCartelloneAndDate(@RequestParam String codCartellone,
                                                     @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
                                                     @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate,
                                                     Model model) {
        LocalDateTime startOfDay = startDate.atStartOfDay();
        LocalDateTime endOfDay = endDate.atTime(23, 59, 59);


        List<Segnalazione> segnalazioni = segnalazioneRepository.findByCodCartelloneAndDataInserimentoBetween(codCartellone, startOfDay, endOfDay);

        int durataVisualComplessiva = segnalazioni.stream()
                .mapToInt(Segnalazione::getDurataVisual)
                .sum();

        List<Segnalazione> allSegnalazioni = segnalazioneRepository.findAll();
        List<String> codCartelloneList = allSegnalazioni.stream()
                .map(Segnalazione::getCodCartellone)
                .distinct()
                .collect(Collectors.toList());

        model.addAttribute("durataVisualComplessiva", durataVisualComplessiva);
        model.addAttribute("codCartelloneList", codCartelloneList);
        return "report_impianti";
    }










}

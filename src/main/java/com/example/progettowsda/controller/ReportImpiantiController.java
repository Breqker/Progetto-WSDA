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
public class ReportImpiantiController {

    @Autowired
    private ImpiantoRepository impiantoRepository;

    @Autowired
    private SegnalazioneRepository segnalazioneRepository;

    @GetMapping("/segnalazioni")
    public String showSegnalazioniForm(Model model) {
        Iterable<Impianto> impianti = impiantoRepository.findAll();
        model.addAttribute("impianti", impianti);
        return "report_impianti";
    }

    @PostMapping("/segnalazioni")
    public String getSegnalazioni(@RequestParam("idImpianto") String idImpianto,
                                  @RequestParam("startDateTime") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDateTime,
                                  @RequestParam("endDateTime") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDateTime,
                                  Model model) {
        if (startDateTime == null || endDateTime == null) {
            model.addAttribute("errorMessage", "Seleziona la data");
            return showSegnalazioniForm(model);
        }

        if (startDateTime.isAfter(endDateTime)) {
            model.addAttribute("errorMessage", "La data di inizio non può essere successiva alla data di fine");
            return showSegnalazioniForm(model);
        }

        System.out.println("startDateTime: " + startDateTime);
        System.out.println("endDateTime: " + endDateTime);

        Iterable<Impianto> impianti = impiantoRepository.findAll();
        List<Segnalazione> segnalazioni = segnalazioneRepository.findByImpianto_IdImpiantoAndDataInserimentoBetween(idImpianto, startDateTime, endDateTime);

        // Log delle segnalazioni trovate
        segnalazioni.forEach(seg -> System.out.println("Segnalazione trovata: " + seg));

        // Calcoliamo la somma delle durate di visualizzazione dei cartelloni
        int sommaDurate = segnalazioni.stream()
                .mapToInt(Segnalazione::getDurataVisual)
                .sum();

        // Contiamo il numero totale di segnalazioni
        long count = segnalazioni.size();

        // Raggruppiamo le segnalazioni per cod_cartellone per creare il grafico
        Map<String, Long> cartelloniVisualizzati = segnalazioni.stream()
                .collect(Collectors.groupingBy(Segnalazione::getCodCartellone, Collectors.counting()));

        model.addAttribute("impianti", impianti);
        model.addAttribute("segnalazioni", segnalazioni);
        model.addAttribute("sommaDurate", sommaDurate);
        model.addAttribute("numeroSegnalazioni", count);
        model.addAttribute("cartelloniVisualizzati", cartelloniVisualizzati);

        return "report_impianti";
    }




    /*

        1. Fare una query segnalazioni
           1.1 valori di ritorno
               1.1.1 cod_impianto, cod_palinstesto, durata_visual, data_inserimento
           1.2 realizzo corrispondenze tramite altra query con palinsesti tramite cod_palinstesto in chiave con id_palinsesto
               1.2.1 ricavo "path" da cui estrapolo il cartellone di riferimento
               1.2.2 da path prendo il nome del cartellone con una manipolazione di stringa e la uso come variabile di riferimento es. /Pannalle_animali/animali.html -> animali -> nome_caratteristico


        2. Definisco un'entità "Impression"
           2.1 attributi: cod_impianto, cod_palinsesto, data_inserimento ,durata_visual, nome_carretisco
           2.2 opportuni set e get

        3. Repository dell'entità impression


        4. Metto i miei risultati su una qualche lista di Impression


        5. Sulla base degli elemti della lista
           5.1 prendo un nome caratterisco scorro tutti gli elementi con quel nome per ricavarmi tutte le impression per quella singola pubblictà -> "Impressioni totali"
           5.2 prendo un intervallo di date e un nome caratteristico scorro la lista e trovo -> "Impressioni per quel periodo su quel cartellone"
           5.3 prendo singolo giorno scorro -> "Cosa è successo in quel giorno"


        CREATE TABLE segnalazioni (
    id_segnalazione VARCHAR(50),
    cod_impianto VARCHAR(50),
    cod_palinsesto VARCHAR(50),
    cod_cartellone VARCHAR(50),
    durata_visual INT,
    data_inserimento TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (cod_impianto, id_segnalazione),
    FOREIGN KEY (cod_impianto) REFERENCES impianto(id_impianto)
);


CREATE TABLE palinsesti (
    id_palinsesto VARCHAR(50) PRIMARY KEY,
    path VARCHAR(255)
);


---------------------------------------------------

Lato front end


3 menù
-"Impressioni totali" -> deve essere visualizato appena aperta la pagina con un grafico
-"Impressioni per quel periodo su quel cartellone" -> menù con calenadrio, menù a tendina con scelta cartelloni (si fa con una query totale oppure scorrendo la lista di entità e popolo il mio menù a tendina)
-"Cosa è successo in quel giorno" -> solo calendario e risultato di scorrimento lista con query generalista


     */
























}

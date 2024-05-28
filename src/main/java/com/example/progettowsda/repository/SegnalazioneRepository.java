package com.example.progettowsda.repository;

import com.example.progettowsda.entity.Segnalazione;
import org.springframework.data.repository.CrudRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface SegnalazioneRepository extends CrudRepository<Segnalazione, String> {

    List<Segnalazione> findByImpianto_IdImpiantoAndDataInserimentoBetween(String idImpianto, LocalDateTime start, LocalDateTime end);
}

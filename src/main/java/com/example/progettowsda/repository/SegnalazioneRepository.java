package com.example.progettowsda.repository;

import com.example.progettowsda.entity.Segnalazione;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface SegnalazioneRepository extends JpaRepository<Segnalazione, String> {
    List<Segnalazione> findByCodCartellone(String codCartellone);
    List<Segnalazione> findByDataInserimentoBetween(LocalDateTime startDate, LocalDateTime endDate);
    List<Segnalazione> findByCodCartelloneAndDataInserimentoBetween(String codCartellone, LocalDateTime startDate, LocalDateTime endDate);

}

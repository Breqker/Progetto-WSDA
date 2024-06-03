package com.example.progettowsda.repository;

import com.example.progettowsda.entity.Impianto;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;


@Repository
public interface ImpiantoRepository extends JpaRepository<Impianto, String> {
    Impianto findByIdImpianto(String idImpianto);
}

package com.example.progettowsda.repository;

import com.example.progettowsda.entity.Palinsesto;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface PalinsestoRepository extends JpaRepository<Palinsesto, String> {
    Palinsesto findByIdPalinsesto(String idPalinsesto);
}



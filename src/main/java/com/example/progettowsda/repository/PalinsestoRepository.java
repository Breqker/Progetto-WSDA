package com.example.progettowsda.repository;

import com.example.progettowsda.entity.Palinsesto;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PalinsestoRepository extends CrudRepository<Palinsesto, String> {
}

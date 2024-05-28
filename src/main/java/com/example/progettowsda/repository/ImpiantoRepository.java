package com.example.progettowsda.repository;

import com.example.progettowsda.entity.Impianto;
import com.example.progettowsda.entity.ImpiantoId;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImpiantoRepository extends CrudRepository<Impianto, ImpiantoId> {
}

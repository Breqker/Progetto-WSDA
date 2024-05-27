package it.unipa.wsda.dbaccess;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImpiantoRepository extends CrudRepository<Impianto, Integer> {
    Impianto findById(int id);
}

package it.unipa.wsda.dbaccess;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping(path="/dbaccess")
public class MainController {

    @Autowired
    private ImpiantoRepository impiantoRepository;

    @PostMapping(path="/add")
    public @ResponseBody String addNewImpianto (@RequestParam String idPalinsesto,
                                                @RequestParam double latitudine,
                                                @RequestParam double longitudine) {
        Impianto newImpianto = new Impianto();
        newImpianto.setIdPalinsesto(idPalinsesto);
        newImpianto.setLatitudine(latitudine);
        newImpianto.setLongitudine(longitudine);
        impiantoRepository.save(newImpianto);
        return "Saved";
    }

    @GetMapping(path="/all")
    public @ResponseBody Iterable<Impianto> getAllImpianti() {
        return impiantoRepository.findAll();
    }

    @GetMapping(path="/mod")
    public @ResponseBody String modImpianto(@RequestParam Integer id) {
        // Assuming you have a findById method in ImpiantoRepository
        Impianto imp = impiantoRepository.findById(id).orElse(null);
        if (imp != null) {
            imp.setIdPalinsesto("Updated Palinsesto");
            impiantoRepository.save(imp);
            return "Modified";
        }
        return "Impianto not found";
    }

    @GetMapping(path="/delete")
    public @ResponseBody String deleteImpianto(@RequestParam Integer id) {
        impiantoRepository.deleteById(id);
        return "Deleted";
    }
}

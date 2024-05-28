package com.example.progettowsda.entity;

import java.io.Serializable;
import java.util.Objects;

public class ImpiantoId implements Serializable {
    private String idImpianto;
    private String idPalinsesto;

    // Getters, setters, hashCode, and equals methods

    public String getIdImpianto() {
        return idImpianto;
    }

    public void setIdImpianto(String idImpianto) {
        this.idImpianto = idImpianto;
    }

    public String getIdPalinsesto() {
        return idPalinsesto;
    }

    public void setIdPalinsesto(String idPalinsesto) {
        this.idPalinsesto = idPalinsesto;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ImpiantoId that = (ImpiantoId) o;
        return Objects.equals(idImpianto, that.idImpianto) &&
                Objects.equals(idPalinsesto, that.idPalinsesto);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idImpianto, idPalinsesto);
    }
}

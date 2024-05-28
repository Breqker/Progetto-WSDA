package com.example.progettowsda.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "palinsesti")
public class Palinsesto {
    @Id
    @Column(name = "id_palinsesto")
    private String idPalinsesto;

    @Column(name = "path")
    private String path;

    // Getters and setters

    public String getIdPalinsesto() {
        return idPalinsesto;
    }

    public void setIdPalinsesto(String idPalinsesto) {
        this.idPalinsesto = idPalinsesto;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }
}

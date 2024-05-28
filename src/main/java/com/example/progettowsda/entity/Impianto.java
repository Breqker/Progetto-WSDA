package com.example.progettowsda.entity;


import jakarta.persistence.*;


@Entity
@Table(name = "impianto")
public class Impianto {
    @Id
    @Column(name = "id_impianto")
    private String idImpianto;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "ref_palinsesto", referencedColumnName = "id_palinsesto")
    private Palinsesto palinsesto;

    @Column(name = "stato")
    private boolean stato;

    @Column(name = "latitudine")
    private double latitudine;

    @Column(name = "longitudine")
    private double longitudine;

    // Getters and setters

    public String getIdImpianto() {
        return idImpianto;
    }

    public void setIdImpianto(String idImpianto) {
        this.idImpianto = idImpianto;
    }

    public Palinsesto getPalinsesto() {
        return palinsesto;
    }

    public void setPalinsesto(Palinsesto palinsesto) {
        this.palinsesto = palinsesto;
    }

    public boolean isStato() {
        return stato;
    }

    public void setStato(boolean stato) {
        this.stato = stato;
    }

    public double getLatitudine() {
        return latitudine;
    }

    public void setLatitudine(double latitudine) {
        this.latitudine = latitudine;
    }

    public double getLongitudine() {
        return longitudine;
    }

    public void setLongitudine(double longitudine) {
        this.longitudine = longitudine;
    }
}

package com.example.progettowsda.entity;


import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "segnalazioni")
public class Segnalazione {

    @Id
    @Column(name = "id_segnalazione")
    private String idSegnalazione;

    @ManyToOne
    @JoinColumn(name = "cod_impianto", referencedColumnName = "id_impianto")
    private Impianto impianto;

    @ManyToOne
    @JoinColumn(name = "cod_palinsesto", referencedColumnName = "id_palinsesto")
    private Palinsesto palinsesto;

    @Column(name = "cod_cartellone")
    private String codCartellone;

    @Column(name = "durata_visual")
    private int durataVisual;

    @Column(name = "data_inserimento")
    private LocalDateTime dataInserimento;

    public String getIdSegnalazione() {
        return idSegnalazione;
    }

    public void setIdSegnalazione(String idSegnalazione) {
        this.idSegnalazione = idSegnalazione;
    }

    public Impianto getImpianto() {
        return impianto;
    }

    public void setImpianto(Impianto impianto) {
        this.impianto = impianto;
    }


    public Palinsesto getPalinsesto() {
        return palinsesto;
    }

    public void setPalinsesto(Palinsesto palinsesto) {
        this.palinsesto = palinsesto;
    }

    public String getCodCartellone() {
        return codCartellone;
    }

    public void setCodCartellone(String codCartellone) {
        this.codCartellone = codCartellone;
    }

    public int getDurataVisual() {
        return durataVisual;
    }

    public void setDurataVisual(int durataVisual) {
        this.durataVisual = durataVisual;
    }

    public LocalDateTime getDataInserimento() {
        return dataInserimento;
    }

    public void setDataInserimento(LocalDateTime dataInserimento) {
        this.dataInserimento = dataInserimento;
    }
}

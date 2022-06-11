package com.application.Realisateur;

import com.application.Film.Film;

import javax.persistence.*;
import java.io.Serializable;

import java.util.List;

@Entity
public class Realisateur implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.REMOVE, mappedBy = "realisateurs")
    private List<Film> films;

    public Realisateur() {
        super();
    }
    public Realisateur(String url) {
        super();
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
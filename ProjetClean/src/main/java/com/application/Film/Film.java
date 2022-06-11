package com.application.Film;

import com.application.Realisateur.Realisateur;
import com.application.Genre.Genre;

import javax.persistence.*;
import java.io.Serializable;

import java.util.List;

@Entity
public class Film implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;

    @ManyToMany(cascade = CascadeType.REFRESH, fetch = FetchType.EAGER)
    @JoinTable(name="film_realisateurs",
            joinColumns={@JoinColumn(name="film_id")},
            inverseJoinColumns={@JoinColumn(name="realisateur_id")})
    private List<Realisateur> realisateurs;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "genre_id")
    private Genre genre;

    private String affiche;

    Integer rate;

    Integer date;

    public Film() {
        super();
    }
    public Film(String name, Integer rate) {
        super();
        this.name = name;
        this.rate = rate;
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

    public String getAffiche() {
        return affiche;
    }

    public void setAffiche(String affiche) {
        this.affiche = affiche;
    }

    public Integer getRate() {
        return rate;
    }

    public void setRate(Integer rate) {
        this.rate = rate;
    }

    public List<Realisateur> getRealisateurs() {
        return realisateurs;
    }

    public void setRealisateurs(List<Realisateur> realisateurs) {
        this.realisateurs = realisateurs;
    }

    public Genre getGenre() {
        return genre;
    }

    public void setGenre(Genre genre) {
        this.genre = genre;
    }

    public Integer getDate() {
        return date;
    }

    public void setDate(Integer date) {
        this.date = date;
    }
}
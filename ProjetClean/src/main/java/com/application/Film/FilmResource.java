package com.application.Film;

import com.application.Realisateur.Realisateur;
import com.application.Realisateur.RealisateurRepository;
import com.application.Genre.Genre;
import org.springframework.beans.factory.annotation.Autowired;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.ArrayList;

import java.util.List;
import java.util.Optional;
import javax.ws.rs.core.Response;

@Path("films")
public class FilmResource {
    @Autowired
    private FilmRepository filmRepository;

    @Autowired
    private RealisateurRepository realisateurRepository;


    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Film createFilm(Film a) {
        return filmRepository.save(a);
    }


    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Film> getAllFilms(){
        List<Film> films = new ArrayList<>();
        for (Film film : filmRepository.findAll()) {
            films.add(film);
        }
        return films;
    }

    @GET
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Film getFilmById(@PathParam("id") Long id){
        return filmRepository.findById(id).get();
    }

    @GET
    @Path("{id}/realisateurs")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Realisateur> getRealisateursByFilm(@PathParam("id") Long id){
        return filmRepository.findById(id).get().getRealisateurs();
    }

    @GET
    @Path("{id}/genre")
    @Produces(MediaType.APPLICATION_JSON)
    public Genre getGenreByFilm(@PathParam("id") Long id){
        return filmRepository.findById(id).get().getGenre();
    }

    @PUT
    @Path("{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Film totallyUpdateFilm(@PathParam("id") Long id, Film a) {
        a.setId(id);
        return filmRepository.save(a);
    }

    @PATCH
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Path("{id}")
    public Response patchFilm(@PathParam("id") Long id, Film a) {
        Integer rate = a.getRate();
        String afficheUrl = a.getAffiche();
        String name = a.getName();
        Genre genre = a.getGenre();
        List<Realisateur> realisateurs = a.getRealisateurs();
        Integer date = a.getDate();

        Optional<Film> optional = filmRepository.findById(id);

        if (optional.isPresent()) {
            Film pBDD = optional.get();
            if(rate!=null){ pBDD.setRate(rate);}
            if(realisateurs != null){pBDD.setRealisateurs(realisateurs);}
            if(afficheUrl!=null){ pBDD.setAffiche(afficheUrl);}
            if(genre!=null){ pBDD.setGenre(genre);}
            if(name!=null){ pBDD.setName(name);}
            if(date!=null){ pBDD.setDate(date); }
            filmRepository.save(pBDD);
            return Response.ok(pBDD).build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
    }

    @DELETE
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteFilm(@PathParam("id") Long id) {
        if (filmRepository.findById(id).isPresent()) {
            filmRepository.deleteById(id);
        }
        return Response.noContent().build();
    }
}
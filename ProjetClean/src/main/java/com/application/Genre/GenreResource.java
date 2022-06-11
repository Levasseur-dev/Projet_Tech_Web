package com.application.Genre;

import org.springframework.beans.factory.annotation.Autowired;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.Optional;

@Path("genres")
public class GenreResource {
    @Autowired
    private GenreRepository genreRepository;

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Genre createGenre(Genre g) {
        return genreRepository.save(g);
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Iterable<Genre> getGenre(){
        return genreRepository.findAll();
    }

    @GET
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Genre getGenreById(@PathParam("id") Long id){
        return genreRepository.findById(id).get();
    }

    @PUT
    @Path("{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Genre totallyUpdateGenre(@PathParam("id") Long id, Genre g) {
        g.setId(id);
        return genreRepository.save(g);
    }

    @PATCH
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Path("{id}")
    public Response updateGenre(@PathParam("id") Long id, Genre g) {
        String name = g.getName();
        Optional<Genre> optional = genreRepository.findById(id);
        if (optional.isPresent()) {
            Genre gBDD = optional.get();
            if(name!=null){ gBDD.setName(name);}
            genreRepository.save(gBDD);
            return Response.ok(gBDD).build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
    }

    @DELETE
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteGenre(@PathParam("id") Long id) {
        if (genreRepository.findById(id).isPresent()) {
            genreRepository.deleteById(id);
        }
        return Response.noContent().build();
    }
}

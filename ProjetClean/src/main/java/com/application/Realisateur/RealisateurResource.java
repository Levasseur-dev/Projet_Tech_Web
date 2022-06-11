package com.application.Realisateur;

import org.springframework.beans.factory.annotation.Autowired;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.Optional;

@Path("realisateurs")
public class RealisateurResource {
    @Autowired
    private RealisateurRepository realisateurRepository;

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Realisateur createRealisateur(Realisateur a) {
        return realisateurRepository.save(a);
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Iterable<Realisateur> getAllRealisateurs(){
        return realisateurRepository.findAll();
    }

    @GET
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Realisateur getRealisateurById(@PathParam("id") Long id){
        return realisateurRepository.findById(id).get();
    }

    @PUT
    @Path("{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Realisateur totallyUpdateRealisateur(@PathParam("id") Long id, Realisateur a) {
        a.setId(id);
        return realisateurRepository.save(a);
    }

    @PATCH
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Path("{id}")
    public Response updateRealisateur(@PathParam("id") Long id, Realisateur a) {
        String name = a.getName();
        Optional<Realisateur> optional = realisateurRepository.findById(id);
        if (optional.isPresent()) {
            Realisateur pBDD = optional.get();
            if(name!=null){ pBDD.setName(name);}
            realisateurRepository.save(pBDD);
            return Response.ok(pBDD).build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
    }

    @DELETE
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteRealisateur(@PathParam("id") Long id) {
        if (realisateurRepository.findById(id).isPresent()) {
            realisateurRepository.deleteById(id);
        }
        return Response.noContent().build();
    }
}
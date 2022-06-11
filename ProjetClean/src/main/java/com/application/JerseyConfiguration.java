package com.application;

import com.application.Film.FilmResource;
import com.application.Realisateur.RealisateurResource;
import com.application.Genre.GenreResource;
import org.glassfish.jersey.server.ResourceConfig;
import org.glassfish.jersey.servlet.ServletProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

import javax.ws.rs.ApplicationPath;
@Component
@ApplicationPath("rest")
@Configuration
public class JerseyConfiguration extends ResourceConfig
{
    public JerseyConfiguration() {
        register(FilmResource.class);
        register(RealisateurResource.class);
        register(GenreResource.class);
        register(CORSResponseFilter.class);
        // La servlet de jersey map toutes les url /* donc impossible de servir du contenu statique via la servlet par défaut de sprign boot.
        // On doit donc dire àjersey de quand même laisser passer la requête pour que la prochaine servlet prenne le relais.
        // https://stackoverflow.com/questions/29658240/spring-boot-jersey-allow-jersey-to-serve-static-content/29670751#29670751
        property(ServletProperties.FILTER_FORWARD_ON_404, true);
    }
}

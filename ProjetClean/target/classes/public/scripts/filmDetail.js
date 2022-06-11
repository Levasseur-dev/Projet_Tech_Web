$(document).ready(function() {
    let filmId = window.location.search.substring(4);
    let $affiche = $("#affiche");
    let $realisateurs = $("#realisateurlist");
    let $genre = $("#genre");
    let $date = $("#date");
    let $rate = $("#rate");

    $.get("http://localhost:8080/rest/films/" + filmId + "/realisateurs", function (resp) {
        appendToRealisateurList(resp);
    });

    $.get("http://localhost:8080/rest/films/" + filmId + "/genre", function (resp) {
        $genre.append(`<p> ${resp.name} </p>`);
    });

    $.get("http://localhost:8080/rest/films/" + filmId, function (resp) {
        $affiche.append(`<img src="${resp.affiche}" alt="affiche">`);
        $date.append(resp.date);
        $rate.append(resp.rate);
        $("#filmAffiche").append(`<input type="button" value="Modifier le film"
                                       onClick="window.location='editFilmForm.html?id=${resp.id}';">`)
    })

    function appendToRealisateurList(realisateur) {
        realisateur.forEach( a => $realisateurs.append(`<li> ${a.name} </li>`));
    }
});
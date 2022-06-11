$(document).ready(function(){
    let $listRealisateurs = $("#listFilms");

    $.get("http://localhost:8080/rest/films/",function(resp){
        resp.forEach( a => appendToListFilms(a));
    });

    $listRealisateurs.on("click", "li button", function() {
        let elemid = $(this).parent().attr('id');

        $.ajax({
            type: "DELETE",
            url: "http://localhost:8080/rest/films/" + elemid.replace('film-',''),
            dataType: "json",
            success: function(data){
                $("#"+elemid).remove();
            }
        });
    });

    function appendToListFilms(film) {
        let realisateurs = "";
        film.realisateurs.forEach(a => realisateurs+= a.name + ", ");
        $listRealisateurs.append(`<li id="film-${film.id}" class="list-group-item"><a><span> ${film.name} </span></a>
                                <input type="button" value="Détails" onclick="window.location='filmDetail.html?id=${film.id}';">
                                <button>Supprimer</button>
                                </li>`);
    }
});
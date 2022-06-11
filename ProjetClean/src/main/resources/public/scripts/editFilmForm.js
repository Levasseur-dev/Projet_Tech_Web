$(document).ready(function(){
    let filmId = window.location.search.substring(4);
    let $listRealisateurs = $("#form-group-realisateurs");
    let $selectGenres = $("#selectGenres");

    $.get("http://localhost:8080/rest/films/" + filmId, function (resp) {
        $("#name-input").val(resp.name);
        $("#affiche-input").val(resp.affiche);
        $("#date-input").val(resp.date);
        $("#rate-input").val(resp.rate);

        $.get("http://localhost:8080/rest/films/" + filmId + "/genre", function (resp) {
            $selectGenres.val(resp.id);
        });
    })

    $.get("http://localhost:8080/rest/genres",function(resp){
        resp.forEach( g => {
            appendToSelects(g);
        });
    });

    $.get("http://localhost:8080/rest/realisateurs", function(resp){
        resp.forEach(a => {
            appendRealisateursToForm(a);
        });
        $.get("http://localhost:8080/rest/films/" + filmId + "/realisateurs", function (resp) {
            resp.forEach(realisateur => checkRealisateur(realisateur))
        })
    })

    $('#addbtnFilm').click(function(){
        let filmName = $("#name-input").val();
        let filmRate = $("#rate-input").val();
        let genreId = $("#selectGenres").val();
        let afficheUrl = $("#affiche-input").val();
        let date = $("#date-input").val();
        var checkedRealisateurs = [];

        $.each($("input[type='checkbox']:checked"), function(){
            checkedRealisateurs.push({"id":$(this).val()});
        })
        $.ajax({
            type: "PATCH",
            url: "http://localhost:8080/rest/films/" + filmId,
            data: JSON.stringify({ "name": filmName, "rate" : filmRate, "affiche":afficheUrl, "genre":{"id": genreId},
                "date":date, "realisateurs":checkedRealisateurs }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            })
            }
        });
    })

    $("#newGenre").click(function(){
        $(this).hide();
        $("#displayGenrePost").show();
    })

    $("#newRealisateur").click(function(){
        $(this).hide();
        $("#displayRealisateurPost").show();
    })

    $("#addbtnGenre").click(function(){
        if($("#genreInput").val()!==""){
            $.ajax({
                type: "POST",
                url: "http://localhost:8080/rest/genres",
                data: JSON.stringify({"name": $("#genreInput").val()}),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function(data){
                    appendToSelects(data);
                }
            })
            $("#genreInput").val("");
            $(this).parent().hide();
            $("#newGenre").show();
        }
    })

    $("#addbtnRealisateur").click(function(){
        if($("#realisateurInput").val()!==""){
            $.ajax({
                type: "POST",
                url: "http://localhost:8080/rest/realisateurs",
                data: JSON.stringify({"name": $("#realisateurInput").val()}),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function(data){
                    appendRealisateursToForm(data);
                }
            })
            $("#realisateurInput").val("");
            $(this).parent().hide();
            $("#newRealisateur").show();
        }
    })

    function checkRealisateur(a) {
        $("input#" + a.id).prop('checked', true);
    }

    function appendRealisateursToForm(realisateur){
        $listRealisateurs.append(`<input type="checkbox" id="${realisateur.id}" value="${realisateur.id}"> <label for="${realisateur.id}">${realisateur.name} </label></input><br>`)
    }
    /* Ajoute un élément li dans le select des livres*/
    function appendToSelects(g) {
        $selectGenres.append(`<option value=${g.id}> ${g.name} </option>`)
    }
});
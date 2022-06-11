$(document).ready(function(){
    let $listRealisateurs = $("#form-group-realisateurs");
    let $selectGenres = $("#selectGenres");

    $.get("http://localhost:8080/rest/genres",function(resp){
        resp.forEach( g => {
            appendToSelects(g);
        });
    });

    $.get("http://localhost:8080/rest/realisateurs", function(resp){
        resp.forEach(a => {
            appendRealisateursToForm(a);
        })
    })

    $('#addbtnFilm').click(function(){
        let filmName = $("#name-input").val();
        let filmRate = $("#rate-input").val();
        let genreId = $("#selectGenres").val();
        let afficheUrl = $("#affiche-input").val();
        let date = $("#date-input").val();
        var realisateursList = [];

        $.each($("input[type='checkbox']:checked"), function(){
            realisateursList.push({"id":$(this).val()});
        })
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/rest/films",
            data: JSON.stringify({ "name": filmName, "rate" : filmRate, "affiche":afficheUrl, "genre":{"id": genreId},
                "date":date, "realisateurs":realisateursList }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
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

    function appendRealisateursToForm(realisateur){
        $listRealisateurs.append(`<input type="checkbox" id="${realisateur.id}" value="${realisateur.id}"> <label for="${realisateur.id}">${realisateur.name} </label></input><br>`)
    }

    /* Ajoute un élément li dans le select des genres*/
    function appendToSelects(g) {
        $selectGenres.append(`<option value="${g.id}"> ${g.name} </option>`)
    }
});
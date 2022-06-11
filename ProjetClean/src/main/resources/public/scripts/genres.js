$(document).ready(function() {
        let $listGenres = $("#listGenres");

        $.get("http://localhost:8080/rest/genres/", function (resp) {
            resp.forEach(g => appendToListGenres(g));
        });

        $listGenres.on("click", "td button.deletebtn", function() {
            let elemid = $(this).parent().parent().attr('id');

            $.ajax({
                type: "DELETE",
                url: "http://localhost:8080/rest/genres/" + elemid.replace('genre-',''),
                dataType: "json",
                success: function(data){
                    $("#"+elemid).remove();
                }
            });
        });

        $listGenres.on("click", "td button.editbtn", function() {
            let elemid = $(this).parent().parent().attr('id');
            let nameid = "#name-"+elemid.replace('genre-', '');
            $.ajax({
                type: "PATCH",
                url: "http://localhost:8080/rest/genres/" + elemid.replace('genre-',''),
                data: JSON.stringify({"name": $(nameid).val()}),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function(data){
                    $(nameid).prop('disabled', true);
                    $(nameid).css('color', '#39e300');
                }
            });
        });

        $("#submitNewGenre").click(function (){
            let genreName = $("#newgenreInput").val();
            if (genreName!=""){
                $.ajax({
                    type: "POST",
                    url:"http://localhost:8080/rest/genres",
                    data: JSON.stringify({"name": genreName}),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function(data){
                        appendToListGenres(data);
                        $("#newgenreInput").val("");
                    }
                })
            }
        })

        function appendToListGenres(g) {
            $listGenres.append(`<tr id="genre-${g.id}">
                                <td>${g.id}</td>
                                <td><input id="name-${g.id}" value="${g.name}"/></td>
                                <td><button class="editbtn">Modifier</button></td>
                                <td><button class="deletebtn">X</button></td>
                            </tr>`);
        }
    }
)

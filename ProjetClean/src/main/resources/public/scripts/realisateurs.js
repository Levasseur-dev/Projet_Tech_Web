$(document).ready(function() {
    let $realisateurs = $("#listRealisateur");

    $.get("http://localhost:8080/rest/realisateurs/", function (resp) {
        resp.forEach(a => appendToListRealisateurs(a));
    });

    $realisateurs.on("click", "td button.deletebtn", function() {
        let elemid = $(this).parent().parent().attr('id');

        $.ajax({
            type: "DELETE",
            url: "http://localhost:8080/rest/realisateurs/" + elemid.replace('realisateur-',''),
            dataType: "json",
            success: function(data){
                $("#"+elemid).remove();
            }
        });
    });

    $realisateurs.on("click", "td button.editbtn", function() {
        let elemid = $(this).parent().parent().attr('id');
        let nameid = "#name-"+elemid.replace('realisateur-', '');
        $.ajax({
            type: "PATCH",
            url: "http://localhost:8080/rest/realisateurs/" + elemid.replace('realisateur-',''),
            data: JSON.stringify({"name": $(nameid).val()}),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(data){
                $(nameid).prop('disabled', true);
                $(nameid).css('color', '#39e300');
            }
        });
    });

    $("#submitNewRealisateur").click(function (){
        let $realisateurName = $("#newRealisateurInput").val();
        if ($realisateurName!==""){
            $.ajax({
                type: "POST",
                url:"http://localhost:8080/rest/realisateurs",
                data: JSON.stringify({"name": $realisateurName}),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function(data){
                    appendToListRealisateurs(data);
                    $("#newRealisateurInput").val("");
                }
            })
        }
    })

    function appendToListRealisateurs(realisateur) {
        $realisateurs.append(`<tr id="realisateur-${realisateur.id}">
                                <td>${realisateur.id}</td>
                                <td><input id="name-${realisateur.id}" value="${realisateur.name}"/></td>
                                <td><button class="editbtn">Modifier</button></td>
                                <td><button class="deletebtn">X</button></td>
                            </tr>`);
    }
}
)

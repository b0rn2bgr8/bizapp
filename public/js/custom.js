$(function(){
    $("#q-search").keyup(function(){
        var str = $(this).val();

        if(str != ""){
            $.ajax({
            method: "GET",
            url: "http://localhost:9000/business/searchall/?searchStr=" + str,
            dataType: "json"
        }).then(function(data){
            $("#business").empty();            
            for(var i = 0; data.length; i++){
                $("#business").append("<option value=\""+ data[i].name +"\">").html();
            }
        });
    }
});


    $("#btnSearch").click(function(){
        var str = $("#q-search").val();

        $.ajax({
            method: "GET",
            url: "http://localhost:9000/business/searchall/?searchStr=" + str,
            dataType: "json"
        }).then(function(data){
            $("#searchList").empty();
            for(var i = 0; i < data.length; i++){
            var html = "<section class=\"col-md-12\"><section class=\"panel panel-primary\"><div class=\"panel-heading\">" +
                        "<h2 class=\"panel-title\">"+ data[i].name +"</h2></div>" +
                    "<div class=\"panel-body\">" +
                        "<section class=\"col-md-4\">" +
                            "<img class=\"img-responsive\" src=\"" + data[i].logo +"\">" +
                        "</section>"+
                        "<section class=\"col-md-8\">"+
                            "<div id=\"map\">"+
                            "<iframe src=\"//www.google.com/maps/embed/v1/place?q=latitude&zoom=17&key=AIzaSyANO36ZOvsUmjZ77Mmp3w-8MLZTQGTzxQA\"></iframe>"+
                            "</div>"+
                            "<ul class=\"list-group\">"+
                                "<li class=\"list-group-item\"><strong>Address</strong>: "+ data[i].streetAddress + "</li>"+
                                "<li class=\"list-group-item\"><strong>Surburb</strong>: "+ data[i].surburb + "</li>"+
                                "<li class=\"list-group-item\"><strong>City</strong>: "+ data[i].city + "</li>"+
                                "<li class=\"list-group-item\"><strong>Province</strong>: "+ data[i].province + "</li>"+
                                "<li class=\"list-group-item\"><strong>Contact Numbers</strong>: "+ data[i].tel + "</li>"+
                                "<li class=\"list-group-item\"><strong>Email</strong>: "+ data[i].email + "</li>"+
                                "<li class=\"list-group-item\"><strong>Tags</strong>: "+ data[i].tags.toString() + "</li>"+
                            "</ul></section></div></section></section>";

            $("#searchList").append(html);
        }
        });
        });
    
});

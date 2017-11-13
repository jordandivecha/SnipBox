var gistSearch;

$("#submitSearch").on("click", function(){
  event.preventDefault();
  $(".resultsHolder").empty();
  gistSearch = $("#searchInput").val().trim();
  $("#searchInput").text("");

    var queryURL = "https://api.github.com/search/repositories?q=" + gistSearch + "+language:javascript&sort=stars&order=desc";
    // var embedqueryURL = "http://noembed.com/embed?url=" +queryURL+ "&callback=my_embed_function"
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {
      console.log(response);

      for(var i = 0; i < response.items.length; i++){
        var newDiv = $("<div class='card  center-align left hoverable blue-grey darken-4 card-content white-text results'>");
        var newLink = $("<a class ='light-blue-text'target='_blank'>");
        var link = response.items[i].html_url;
        
        var newResultName = $("<p class = 'flow-text' id='resultName'>")
        var resultName = response.items[i].name;
        console.log("Name: " + resultName + " Link: " + link);
        newLink.append("Visit Repository").attr("href", link);
        newResultName.append(resultName);
        newDiv.append(newResultName);
        newDiv.append(newLink);
        $(".resultsHolder").append(newDiv);
      }
      
    });
});
var gistSearch;

$("#submitSearch").on("click", function(){
  event.preventDefault();
  gistSearch = $("#searchInput").val().trim();
  $("#searchInput").text("");

    var queryURL = "https://api.github.com/search/repositories?q=" + gistSearch + "+language:javascript&sort=stars&order=desc";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {
      console.log(response);

      for(var i = 0; i < response.items.length; i++){
        var newDiv = $("<div class='card medium #1a237e indigo darken-4 card-content white-text'>");
        var newLink = $("<a>");
        var link = response.items[i].html_url;
        var newResultName = $("<p>")
        var resultName = response.items[i].name;
        console.log("Name: " + resultName + " Link: " + link);
        newLink.attr("text", resultName).attr("href", link);
        newResultName.attr("text", resultName);
        newDiv.append(resultName);
        newDiv.append(newLink);
        $(".resultsHolder").append(newDiv);
      }
      
    });
});
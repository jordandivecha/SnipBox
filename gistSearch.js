var gistSearch;

$("#searchButton").on("click", function(){
  event.preventDefault();
  gistSearch = $("#searchTerm").val().trim();
  $("#searchTerm").text("");

    var queryURL = "https://api.github.com/search/repositories?q=" + gistSearch + "+language:javascript&sort=stars&order=desc";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {
      console.log(response);

      for(var i = 0; i < response.items.length; i++){
        var newDiv = $("<div>");
        var newLink = $("<a>");
        var link = response.items[i].html_url;
        var resultName = response.items[i].name;
        console.log("Name: " + resultName + " Link: " + link);
        newLink.attr("text", resultName).attr("href", link);
        newDiv.html(newLink);
        $("#searchResultsDisplay").append(newDiv);
      }
      
    });
});
var string = "fuck this fuck is a string";
var regex = new RegExp("fuck");

$("#commentsSubmit").on("click", function(){
	event.preventDefault();
	var comment = $("#commentsInput").val().trim();
	var newCommentDiv = $("<div>");
	newCommentDiv.text(comment.toString());
	$("#commentsDisplay").prepend(newCommentDiv);

});

console.log(string.replace(regex, string => "*" ));


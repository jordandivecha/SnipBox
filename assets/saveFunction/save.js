var userInput;
var encoded;
var decoded;
var nameInput;

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyCl8d2onqD8JOpl1LEje_OWFuDwdXtjwjM",
    authDomain: "snipbox-af82c.firebaseapp.com",
    databaseURL: "https://snipbox-af82c.firebaseio.com",
    projectId: "snipbox-af82c",
    storageBucket: "snipbox-af82c.appspot.com",
    messagingSenderId: "1006600670987"
  };
  firebase.initializeApp(config);

  var database = firebase.database(); 


// Encode the user's snippet when the save
// button is clicked so that we can store
// the string in Firebase
// Currently encodes, but doesn't save to firebase
$(".savebutton").on("click", function(){
	event.preventDefault();
	userInput = myCodeMirror.getValue();
	// nameInput = $(".nameInput").val().trim();
	console.log("User Input: " + userInput);
	encoded = window.btoa(userInput);
	console.log("Encoded: " + encoded);

	//find the User Id so that we may store saved
	//snippets in the appropriate database directory
	
	//set to database
	// database.ref("/userId").set({
	// 	snippet: encoded
	// });
});


//Currently encodes, but doesn't publish due to firebase rules
$(".publishbutton").on("click", function(){
	event.preventDefault();

	userInput = myCodeMirror.getValue();
	// nameInput = $(".nameInput").val().trim();
	console.log("User Input to publish: " + userInput);
	encoded = window.btoa(userInput);
	console.log("Encoded: " + encoded);

	//DATABASE NOT DEFINED!!!!!!!!!
	database.ref("/publishedSnippets").set({
		snippet: encoded
	});
});
// Decoding
// decoded = window.atob(encoded);
// console.log("Decoded: " + decoded);



// firebase rules
// "$uid === auth.uid"


$(".copybutton").on("click", function(){
	event.preventDefault();
	 $(".CodeMirror-line").text().select();
	 document.execCommand("copy");
});










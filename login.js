$( document ).ready(function() {

  var provider = new firebase.auth.GithubAuthProvider();

  var config = {
      apiKey: "AIzaSyCl8d2onqD8JOpl1LEje_OWFuDwdXtjwjM",
      authDomain: "snipbox-af82c.firebaseapp.com",
      databaseURL: "https://snipbox-af82c.firebaseio.com",
      projectId: "snipbox-af82c",
      storageBucket: "snipbox-af82c.appspot.com",
      messagingSenderId: "1006600670987"
    };
    firebase.initializeApp(config);

    
    
firebase.auth().getRedirectResult().then(function(result) {
  if (result.credential) {
    // This gives you a GitHub Access Token. You can use it to access the GitHub API.
    var token = result.credential.accessToken;
    console.log(token)
    
   
    // ...
  } else {
    firebase.auth().signInWithRedirect(provider);
    
  }
  // The signed-in user info.
  var user = result.user;
}).catch(function(error) {
  console.log(error)
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
});

});
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
      if (result){
        console.log(result.user["uid"],result.user["displayName"],result.user["email"])
        writeUserData(result.user["uid"],result.user["displayName"],result.user["email"])
      }

    }).catch(function(error) {
      //alert(error)
    });
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
        $(document.body).append("Hi " + displayName + "</br>")
       // $(document.body).append("UID: " + uid)
        console.log(uid)
        // ...
      } else {
        // User is signed out.
        $(document.body).append("Not logged in.")
        

      }
    });
    function logOut(){
      firebase.auth().signOut().then(function() {
        console.log("Log out succesfully")
      }, function(error) {
        console.log(error)
      });
    }
    function logIn(){
      firebase.auth().signInWithRedirect(provider); 
    }
    function writeUserData(userId, name, email) {
      firebase.database().ref('users/' + userId).set({
        displayName: name,
        email: email,
      });
    }

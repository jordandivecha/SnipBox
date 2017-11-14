// Firebase grab info

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
           $(".username").text(displayName);
          // $(document.body).append("UID: " + uid)
           console.log(uid)
           // ...
         } else {
           // User is signed out.
           window.location.replace("/login.html");
           
   
         }
       });

    // Logout

    $(".logout").click(function(){
        logOut();
    })
    function logOut(){
        firebase.auth().signOut().then(function() {
          localStorage.clear();
        }, function(error) {
          console.log(error)
        });
      }

      function saveSnippet() {
        var filename = window.btoa($("#fileName").val());
        var code = myCodeMirror.getValue();
        var userId = localStorage.getItem("uid");
        code = window.btoa(code)
        var obj = {};
        obj["content"] = code;
        firebase.database().ref('users/' + userId + '/snippets/javascript/' + filename).set(obj);
      }

    $(".savebutton").click(function(){
        saveSnippet();
    })

    function copySnippet(){
        var dummy = document.createElement("input");
        //dummy.style.display = 'none'
        document.body.appendChild(dummy);
        //$(dummy).css('display','none');
        dummy.setAttribute("id", "dummy_id");
        //dummy.setAttribute('value', document.URL + '; ' + document.title)
        dummy.setAttribute('value', myCodeMirror.getValue());
        //document.getElementById("dummy_id").value=val;
        dummy.select();
        document.execCommand("copy");
        document.body.removeChild(dummy)
    
    }

    $(".copybutton").click(function(){
        copySnippet();
    });
  

  // PULL IN FOLDER NAMES
    var userId = localStorage.getItem("uid");
    var starCountRef = firebase.database().ref('/users/' + userId + "/snippets/javascript");
    console.log("string");
    starCountRef.on('value', function(snapshot) {
      $(".javascriptFolder").empty();
      var JavascriptFolders = snapshot.val();
      console.log(JavascriptFolders);
      for (var x in JavascriptFolders){
        var fileName = window.atob(x)
        var content = window.atob(JavascriptFolders[x].content)
        console.log(fileName, ":", content)
        $(".javascriptFolder").append($("<span>").addClass("subFolder right-align").text(fileName).append("</br>"))
      }
    });

    // PULL IN SUBFOLDERS
    $(document).on("click", ".subFolder", function(){
      var folderName = window.btoa($(this).text())
      console.log($(this).text());
      return firebase.database().ref('/users/' + userId + "/snippets/javascript").once('value').then(function(snapshot) {
        var info = snapshot.val()
        var content = window.atob(info[folderName].content)
        console.log(content)
        myCodeMirror.setValue(content)
        $("#fileName").val(window.atob(folderName))
        $("#fileName").focus();
        // ...
      });
    })

    // ====================================================
     //               Published Button
     // ====================================================
     function publishSnippet() {
      var filename = window.btoa($("#fileName").val());
      
      if(filename === ""){
        alert("Please name your snippet!");
        break;
      };
      var code = myCodeMirror.getValue();
      code = window.btoa(code);
      var obj = {filename: code};
      firebase.database().ref('/published').set(obj);
      console.log("Your code should be published.  Check Firebase.");
    }
    $(".publishbutton").click(function(){
      publishSnippet();
    });
    // ====================================================
    //               Published Snippet Feed
    // ====================================================
  //   var decodedFromFeed; //global to access through event listener and on click
    
  //   firebase.database().ref("/published").on("value", function(snapshot) {
  //     var anchor = $("<a>");
  //     var feedName = snapshot.child("published").key(); //this may not access key correctly
  //     decodedFromFeed = window.atob(snapshot.child("published/" + feedName).val()); //should save decoded content of the key
  //     anchor.attr("text", feedName).addClass("feedButton");
  //     $(".publishfeed").prepend(anchor); //Add new anchor to the feed
  
  //   },function(errorObject) {
  //   console.log("The read failed: " + errorObject.code);
  // });
  //   $(document).on("click", ".publishFeed", function(){
  //   var feedName = $(this).text();
  //   myCodeMirror.setValue(decodedFromFeed);
  // });

  function deleteSnippet(){
    firebase.database().ref('/users/' + userId + "/snippets/javascript/" + window.btoa($("#fileName").val())).remove();
    myCodeMirror.setValue("");
    $("#fileName").val("");
  }
  function newSnippet(){
    myCodeMirror.setValue("");
    $("#fileName").val("");
  }
  $(".clearbutton").click(deleteSnippet);
  $(".createbutton").click(newSnippet);

  // 
 



  // ====================================================
     //               Published Button
     // ====================================================
     function publishSnippet() {
      code = window.btoa(code)
      
      


    var filename = window.btoa($("#fileName").val());
    
    // if(filename === "") {
    //   alert("Please name your snippet!");  
    //   break;
    // };

    var code = window.btoa(myCodeMirror.getValue());
    var obj = {};
    obj["content"] = code;
    firebase.database().ref('published/javascript/' + filename).set(obj);
    console.log("Your code should be published.  Check Firebase.");
  }
  $(".publishbutton").click(function(){
    publishSnippet();
  });
  // ====================================================
  //               Published Snippet Feed
  // ====================================================
  var decodedFromFeed; //global to access through event listener and on click
  
  firebase.database().ref("published/javascript").on("value", function(snapshot) {
    var result = (snapshot.val());
    for (var i in result){
      var fileName = window.atob(i);
      var code = window.atob(result[i].content);
      console.log(fileName, code);
      
     // var displayCode = myCodeMirror.setValue(code);
     publishLibrary(fileName, code);
    }

  },function(errorObject) {
  console.log("The read failed: " + errorObject.code);
});

function publishLibrary (fileName, code){
  var libraryItem = $("<div class= 'card  center-align left hoverable blue-grey darken-4 card-content white-text publishFeed'>");
  libraryItem.text(fileName);
  $(".libraryfeed").prepend(libraryItem);
}
  $(document).on("click", ".publishFeed", function(){
  var feedName = $(this).text();
  $('ul.tabs').tabs('select_tab', 'snippetpage');
  var code = ""; 
  firebase.database().ref("published/javascript/" + window.btoa(feedName)).once('value').then(function(snapshot) {
    code = window.atob(snapshot.val()["content"])
   // console.log(code)
    myCodeMirror.setValue(code);
  $("#fileName").val(feedName);
  $("#fileName").focus();
  });

  console.log(code)
 // myCodeMirror.setValue(code);
  // $("#fileName").val(feedName);
  // $("#fileName").focus();
  
  //myCodeMirror.setValue(code);
});
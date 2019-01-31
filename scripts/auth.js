  function authenticate() {

      if(gapi.auth2.getAuthInstance().isSignedIn.get()){
        console.log(gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getName());
        
        console.log(gapi.auth2.GoogleUser);
        console.log("signed in");

        return gapi.auth2.getAuthInstance();
      } else {
      return gapi.auth2.getAuthInstance()
          .signIn({scope: "profile https://mail.google.com/ https://www.googleapis.com/auth/gmail.compose https://www.googleapis.com/auth/gmail.modify https://www.googleapis.com/auth/gmail.send"})
          .then(function() {
              console.log("Sign-in successful");
              },
                function(err) { console.error("Error signing in", err); });
    }
  }
  function loadClient() {
    return gapi.client.load("https://content.googleapis.com/discovery/v1/apis/gmail/v1/rest")
        .then(function() { 
              console.log("GAPI client loaded for API");
              console.log(gapi.auth2);
              // console.log(gapi.auth2.currentUser.get().getBasicProfile());
              },
              function(err) { console.error("Error loading GAPI client for API", err); });
  }
  

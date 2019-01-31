

function sendMessage(headers_obj, message, callback)
{
  var email = '';

  for(var header in headers_obj)
    email += header += ": "+headers_obj[header]+"\r\n";



  email += "\r\n" + message;

  var sendRequest = gapi.client.gmail.users.messages.send({
    'userId': 'me',
    'resource': {
      'raw': window.btoa(email).replace(/\+/g, '-').replace(/\//g, '_')
    }
  });

  return sendRequest.execute(callback);
}

function sendEmail()
{
  $('#send-button').addClass('disabled');

  sendMessage(
    {
      'To': 'michael.t.stanfa@gmail.com',
      'Subject': 'test subject'
    },
    'this is the message of the email',
    composeTidy
  );

  return false;
}

function composeTidy()
{
  console.log('you hit the compose tidy function!');
}

function testFunctionToSendEmail() {
    sendEmail();
}    
/**

{
  "message": {
    "to:": "michael.t.stanfa@gmail.com",
    "subject:":" test subject"
  }

}

**/

/*"headers": [ # List of headers on this message part. For the top-level message part, representing the entire message payload, it will contain the standard RFC 2822 email headers such as To, From, and Subject.
        {
          "name": "A String", # The name of the header before the : separator. For example, To.
          "value": "A String", # The value of the header after the : separator. For example, someuser@example.com.
        },
      ]
*/
    /*var message = '{"payload" : {"headers": [{"name": "To", "value":"michael.t.stanfa@gmail.com"},]}}'
    var msg = Base64.encodeURI(message);
    return gapi.client.gmail.users.drafts.create({
      
      "userId": "stanfa.michael@gmail.com",
      "resource": {
        "message": {
          "raw": msg
        }
      }
    })
        .then(function(response) {
                // Handle the results here (response.result has the parsed body).
                console.log("Response", response);
              },
              function(err) { console.error("Execute error", err); });
  }*/


// function authenticate() {
//     return gapi.auth2.getAuthInstance()
//         .signIn(
//             {scope: "https://mail.google.com/ https://www.googleapis.com/auth/gmail.compose https://www.googleapis.com/auth/gmail.modify https://www.googleapis.com/auth/gmail.readonly",
//             'clientId': '288496341273-vbkcvk5eancre2goe4r229cqqnd3ga7d.apps.googleusercontent.com'
//       })
//         .then(function() { console.log("Sign-in successful"); },
//               function(err) { console.error("Error signing in", err); });
//   }
//   function loadClient() {
//     gapi.client.setToken({'access_token': gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token});
//     return gapi.client.load("https://content.googleapis.com/discovery/v1/apis/gmail/v1/rest")
//         .then(function() { console.log("GAPI client loaded for API"); },
//               function(err) { console.error("Error loading GAPI client for API", err); });
//   }
//   // Make sure the client is loaded and sign-in is complete before calling this method.
//   function execute() {

   
//     // gapi.auth2.setToken({'access_token': gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token});
//     return gapi.client.gmail.users.getProfile({
//       "userId": "stanfa.michael@gmail.com"
//     })
//         .then(function(response) {
//                 // Handle the results here (response.result has the parsed body).
//                 console.log("Response", response);
//               },
//               function(err) { console.error("Execute error", err); });
//   }
// /*
//   function init() {
//     gapi.load("client:auth2", function() {
//       gapi.auth2.init({client_id: YOUR_CLIENT_ID});
//   });
// }*/

//   function constructEmail(message) {
//     // loadGpai();
//     var GoogleAuth_1 = loadGpai();
//     var msg = Base64.encodeURI("test email");
//     return gapi.client.gmail.users.drafts.create({

//       'userId':"stanfa.michael@gmail.com",
//       'resource': {
//           'message': { 
//             'raw': msg
//           }
//       }
//     }).then(function(response){
//         console.log("Response", response);
//       },
//               function(err) { console.error("Execute error", err); });
//     }

/*function loadGpai() {
  var GoogleAuth;
  // gapi.client.init({
  //       // 'apiKey': 'AIzaSyA95UFMiGFfXTnirRByeudylpDfQUEaMuU',
  //       'clientId': '288496341273-vbkcvk5eancre2goe4r229cqqnd3ga7d.apps.googleusercontent.com',
  //       'scope': 'https://www.googleapis.com/auth/drive.metadata.readonly ',
  //       'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest']
  //   }).then(function () {
        GoogleAuth = gapi.auth2.getAuthInstance();
        console.log(GoogleAuth);
        return GoogleAuth;

      // });
  // gapi.load("client:auth2", function() {
  //   gapi.auth2.init({client_id: '288496341273-vbkcvk5eancre2goe4r229cqqnd3ga7d.apps.googleusercontent.com'});
  // })
}*/

  // gapi.load("client:auth2", function() {
  //   gapi.auth2.init({client_id: '288496341273-vbkcvk5eancre2goe4r229cqqnd3ga7d.apps.googleusercontent.com'});
  // })
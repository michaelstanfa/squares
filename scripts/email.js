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

function sendEmail() {

  sendMessage(
  {
    'To': $('#email-modal-to')[0].innerHTML,
    'Cc': $('#email-modal-cc')[0].innerHTML,
    "Bcc": $('#email-modal-bcc')[0].value,
    'Subject': $('#email-modal-subject')[0].value,
  },
  $('#email-modal-email-body')[0].value,
  composeTidy
  );

  return false;
}

function composeTidy() {
  $('#email-modal-to')[0].innerHTML = "";
  $('#email-modal-cc')[0].innerHTML = "";
  $('#email-modal-bcc')[0].innerHTML = "";
  $('#email-modal-subject')[0].value ="";
  $('#email-modal-email-body')[0].value = "";
}

function openEmailModal() {
  composeTidy();
  $('#email-modal-to').html($('#info-modal-email-address').get(0).innerHTML);
}

function openEmailEverybodyModal() {

  $('#email-modal-to').html('');

  var allPeople;
  var to = "";
  var bcc = "";
  var cc= "";
  var allPeople = firebase.database().ref('users');

  allPeople.on('value',function(users) {
    users.forEach(function(user){
      bcc += user.val().email + ",";  
    });
  });
  bcc = bcc.slice(0,-1);
  
  $("#email-modal-bcc").html(bcc);
  $("#email-modal-cc").html("stanfa.michael@gmail.com");

}
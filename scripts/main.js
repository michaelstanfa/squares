function register() {

	var newUser = document.getElementById("newUserForm");
	
}

function userEmailExists(user){
	//get email from page now
	var em = "test-2@live.com";
	console.log(user.val().email);
	if(em == user.val().email) {
		console.log(em + " is already registered");
		throw (new Error("ERROR MESSAGE"));
	}
}

function doesUserExist(em) {
	var users = firebase.database().ref('users');
	users.on('value', function(snapshot) {
		snapshot.forEach(function(user){
			console.log(user);
			try {
				userEmailExists(user)
			} catch (Error) {
				return true;
				console.log("CAUGHT ERROR IN DOESUSEREXIST");
			}
		});
	});
}


function createNewUser(firstnameinput, lastnameinput, emailinput) {
	// var createNew = doesUserExist(emailinput);
	// console.log("create new: " + createNew);
		//void method that will stop anything else from running
		try{
			var cont = sync.await(doesUserExist(emailinput));
			console.log(cont);
			console.log("after doesUserExist");
		} catch {
			console.log("catch in createnewuser")
		}
	/*  if(doesUserExist(emailinput)){
	  	console.log("comparing " + emailinput + " with one above");
	  	console.log("got into create new user");
		var userData = {
		  	firstname: firstnameinput,
		  	lastname: lastnameinput,
		  	email: emailinput
		  };

		  // Get a key for a new user.
		  var newUserKey = firebase.database().ref().child('users').push().key;
		  console.log(newUserKey);
		  var updates = {};
		  updates['/users/' + newUserKey] = userData;

		  return firebase.database().ref().update(updates);
	  } else {
	  	console.log("returned false");
	  }*/
}

function testFirebase(){
	// getEmail();
	createNewUser("hilary","hamilton","michael.t.stanfa@gmail.com");
}

function updateScores() {
	var db = firebase.database();
	var updateData = {
		rams: document.getElementById("score_rams").value,
		pats: document.getElementById("score_pats").value
	}

	var scoreUpdates = {};
	scoreUpdates['scores'] = updateData;
	db.ref().update(scoreUpdates);
	document.getElementById("score_rams").value = "";// = '';
	document.getElementById("score_pats").value = "";//value = '';

}

function showCurrentScores() {
	var scores = firebase.database().ref('scores');

	scores.on('value', function(snapshot) {
		$("#score_pats_current").html("Pats: " + snapshot.val().pats);
		$("#score_rams_current").html("Rams: " + snapshot.val().rams);
	});
}
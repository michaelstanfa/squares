function register() {
	var firstName = document.getElementById("fname");
	var lastName = document.getElementById("lname");
	var emailName = document.getElementById("email");

	if(firstName.value =="" || lastName.value == "" || emailName.value == ""){
		window.alert("Please fill out each piece of the form.");
	} else {
		createNewUser(firstName.value, lastName.value, emailName.value);
		window.alert("Thank you! You'll be contacted shortly with more info");
	}
}

function createNewUser(firstnameinput, lastnameinput, emailinput) {

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

		  firebase.database().ref().update(updates);
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

function showRegisteredUsers() {
	var htmltableappend = ""
	var users = firebase.database().ref('users');
	$(".registered-users").html("");
	//todo move this table out to a new location

	//todo add in table labels

	users.on('value', function(snapshot) {
		snapshot.forEach(function(user){
			htmltableappend="";
			htmltableappend += "<tr class = 'form-group'>";
			htmltableappend += "<td class = 'form-group'>"+user.key+"</td>";
			htmltableappend += "<td class = 'form-group'>"+user.val().email+"</td>";
			htmltableappend += "<td class = 'form-group'>"+user.val().firstname+"</td>";
			htmltableappend += "<td class = 'form-group'>"+user.val().lastname+"</td>";
			htmltableappend += "</tr>";
			$(".registered-users").append(htmltableappend);
		});
	});
}

function loadAdminPage() {
	showCurrentScores();
	showRegisteredUsers();
}
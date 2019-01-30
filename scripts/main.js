function register() {
	var firstName = document.getElementById("fname");
	var lastName = document.getElementById("lname");
	var emailName = document.getElementById("email");

	if(firstName.value =="" || lastName.value == "" || emailName.value == ""){
		window.alert("Please fill out each piece of the form.");
	} else {
		createNewUser(firstName.value, lastName.value, emailName.value);
		window.alert("Thank you! You'll be contacted shortly with more info");
		firstName.value = "";
		lastName.value = "";
		emailName.value = "";
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
		$("#score_pats_current").html(snapshot.val().pats);
		$("#score_rams_current").html(snapshot.val().rams);
	});
}

function retrieveCurrentUserCount() {
	var users = firebase.database().ref('users');
	users.on('value', function(snapshot) {
		var userCount = count(snapshot);
		console.log(20 - userCount);
		$("#current-user-count").html("Join " + userCount + " others now - only " + (20 - userCount) + " spots left!");
	});
}

function count(snapshot) {
	var this_count = 0;
	console.log(snapshot);
	snapshot.forEach(function(user){
		this_count += 1;
	});
	return this_count;
}

function showRegisteredUsers() {
	var users = firebase.database().ref('users');
	$(".registered-users").html("");
	//todo move this table out to a new location
	var htmlheader = "<tbody><tr class='header'><td>id</td><td>email</td><td>first name</td><td>last name</td></tr>"
	//todo add in delete option from id column
	$(".registered-users").append(htmlheader);
	users.on('value', function(snapshot) {
		snapshot.forEach(function(user){
			
			var userobj = {email:user.val().email, firstname:user.val().firstname, lastname:user.val().lastname,key:user.key};
			console.log(userobj);
			htmltableappend="";
			htmltableappend += "<tr>";
			htmltableappend += "<td><i userkey = '" + user.key + "' class = 'fa fa-info-circle' onclick='openUserModal(" + JSON.stringify(userobj) + ")' data-target='#infoModal' data-toggle='modal'></i></td>";
			htmltableappend += "<td>"+user.val().email+"</td>";
			htmltableappend += "<td >"+user.val().firstname+"</td>";
			htmltableappend += "<td>"+user.val().lastname+"</td>";
			htmltableappend += "</tr>";
			$(".registered-users").append(htmltableappend);
		});
	});
	$(".registered-users").append("</tbody>");
}

function loadGrid() {
	$("#grid-top-level").html("");
	var top_grid_html_open = "<tr><td></td>";//room enough for the left numbers
	$("#grid-top-level").html(top_grid_html_open);
	var grid = firebase.database().ref('grid');
	grid.on('value',function(snapshot){
		var top_grid_html_numbers = ""
		var top = snapshot.val().top;
		top_grid_html_numbers += "<td class='top_num' colspan='1' id='top_num_" + top.zero + "'>" + top.zero + "</td>";
		top_grid_html_numbers += "<td class='top_num' id='top_num_" + top.one + "'>" + top.one + "</td>";
		top_grid_html_numbers += "<td class='top_num' id='top_num_" + top.two + "'>" + top.two + "</td>";
		top_grid_html_numbers += "<td class='top_num' id='top_num_" + top.three + "'>" + top.three + "</td>";
		top_grid_html_numbers += "<td class='top_num' id='top_num_" + top.four + "'>" + top.four + "</td>";
		top_grid_html_numbers += "<td class='top_num' id='top_num_" + top.five + "'>" + top.five + "</td>";
		top_grid_html_numbers += "<td class='top_num' id='top_num_" + top.six + "'>" + top.six + "</td>";
		top_grid_html_numbers += "<td class='top_num' id='top_num_" + top.seven + "'>" + top.seven + "</td>";
		top_grid_html_numbers += "<td class='top_num' id='top_num_" + top.eight + "'>" + top.eight + "</td>";
		top_grid_html_numbers += "<td class='top_num' id='top_num_" + top.nine + "'>" + top.nine + "</td>";
		$("#grid-top-level").append(top_grid_html_numbers);
	});
	var top_grid_html_close = "</tr>";
	$("#grid-top-level").append(top_grid_html_close);

}

function loadAdminPage() {
	showCurrentScores();
	showRegisteredUsers();
	loadGrid();
}

function showUsers() {
	$("#users-table").show();
}

function hideUsers() {
	$("#users-table").hide();
}

function openUserModal(ele) {

	$("#modal-title").html(ele.email);
	$("#modal-user-firstname-lastname").html(ele.firstname + " " + ele.lastname);
	$("#modal-user-key").html(ele.key);

}

function deleteUser(userkey) {
	console.log("Deleting user " + userkey.text());
}
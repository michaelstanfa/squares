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
	var updates = {};
	updates['/users/' + newUserKey] = userData;
	firebase.database().ref().update(updates);
}

function updateScores(when) {
		var db = firebase.database();
		var updateData = {
			rams: document.getElementById("score_rams").value,
			pats: document.getElementById("score_pats").value
		}

		var scoreUpdates = {};
		scoreUpdates['scores/' + when] = updateData;
		db.ref().update(scoreUpdates);
	document.getElementById("score_rams").value = "";// = '';
	document.getElementById("score_pats").value = "";//value = '';

}

function showCurrentScores() {
	var scores = firebase.database().ref('scores');

	scores.on('value', function(snapshot) {
		ss = snapshot.val();
		current = ss.current;
		q1 = ss.q1;
		q2 = ss.q2;
		q3 = ss.q3;
		q4 = ss.q4;

		$("#score_pats_current").html(current.pats);
		$("#score_rams_current").html(current.rams);

		$("#pats_q1_score").html(q1.pats);
		$("#pats_q2_score").html(q2.pats);
		$("#pats_q3_score").html(q3.pats);
		$("#pats_q4_score").html(q4.pats);

		$("#rams_q1_score").html(q1.rams);
		$("#rams_q2_score").html(q2.rams);
		$("#rams_q3_score").html(q3.rams);
		$("#rams_q4_score").html(q4.rams);
	});
}

function retrieveCurrentUserCount() {
	var users = firebase.database().ref('users');
	users.on('value', function(snapshot) {
		var userCount = count(snapshot);
		if(userCount >= 20) {
			$("#current-user-count").html("Sorry, we're all full! Maybe next time!");
			$("#register-button").attr("disabled","disabled");
		} else {
			$("#register-button").removeAttr("disabled");
			$("#current-user-count").html("Join " + userCount + " others now - only " + (20 - userCount) + " spots left!");	
		}
		
	});
}

function count(snapshot) {
	var this_count = 0;
	snapshot.forEach(function(user){
		this_count += 1;
	});
	return this_count;
}

function showRegisteredUsers() {
	var users = firebase.database().ref('users');
	users.on('value', function(snapshot) {
		var userCount = count(snapshot);
		$('#user-count-info').html(userCount);
	});

	$(".registered-users").html("");
	//todo move this table out to a new location
	var htmlheader = "<tbody><tr class='header'><td><button class='btn btn-primary' onclick='openEmailEverybodyModal()' data-target='#emailModal' data-toggle='modal'>Email All</button></td><td>email</td><td>first name</td><td>last name</td><td>Submitted</td></tr>"
	//todo add in delete option from id column
	$(".registered-users").append(htmlheader);
	users.on('value', function(snapshot) {
		snapshot.forEach(function(user){
			
			var userobj = {email:user.val().email, firstname:user.val().firstname, lastname:user.val().lastname,key:user.key};
			htmltableappend="";
			htmltableappend += "<tr>";
			htmltableappend += "<td><i userkey = '" + user.key + "' class = 'fa fa-info-circle' onclick='openUserModal(" + JSON.stringify(userobj) + ")' data-target='#infoModal' data-toggle='modal'></i></td>";
			htmltableappend += "<td>"+user.val().email+"</td>";
			htmltableappend += "<td >"+user.val().firstname+"</td>";
			htmltableappend += "<td>"+user.val().lastname+"</td>";
			htmltableappend += "<td>"+user.val().submitted+"</td>";
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

	$("#info-modal-email-address").html(ele.email);
	$("#modal-user-firstname-lastname").html(ele.firstname + " " + ele.lastname);
	$("#modal-user-key").html(ele.key);

}

function deleteUser(userkey) {
	console.log("Deleting user " + userkey.text());
	firebase.database().ref('users/' + userkey.text()).remove();
	document.location.reload();
}

function displayAdminHTML() {

	if (gapi.auth2.getAuthInstance() != null) {
	    var profile = gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile()	    
	    if(profile.getEmail()!="stanfa.michael@gmail.com"){
	    	$(".login_html").html("Sorry, this page is for admins only.");
	    } else {
	    	$(".login_html").hide();
	    	$(".admin-content").show();
	    }
	} else {
		console.log("Error gathering auth info when displaying admin info.");
	}
}
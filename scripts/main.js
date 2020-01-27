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
  // Get a key for a new user.`
	var newUserKey = firebase.database().ref().child('users').push().key;
	var updates = {};
	updates['/users/' + newUserKey] = userData;
	firebase.database().ref().update(updates);
}

function updateScores(when) {
		var db = firebase.database();
		var updateData = {
			nfc: document.getElementById("score_nfc").value,
			afc: document.getElementById("score_afc").value
		}

		var scoreUpdates = {};
		scoreUpdates['scores/' + when] = updateData;
		db.ref().update(scoreUpdates);
	document.getElementById("score_nfc").value = "";// = '';
	document.getElementById("score_afc").value = "";//value = '';

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

		$("#score_afc_current").html(current.afc);
		$("#score_nfc_current").html(current.nfc);

		$("#afc_q1_score").html(q1.afc);
		$("#afc_q2_score").html(q2.afc);
		$("#afc_q3_score").html(q3.afc);
		$("#afc_q4_score").html(q4.afc);

		$("#nfc_q1_score").html(q1.nfc);
		$("#nfc_q2_score").html(q2.nfc);
		$("#nfc_q3_score").html(q3.nfc);
		$("#nfc_q4_score").html(q4.nfc);
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
	$("#grid-afc-level").html("");
	var afc_grid_html_open = "<tr><td></td>";//room enough for the nfc numbers
	$("#grid-afc-level").html(afc_grid_html_open);
	var grid = firebase.database().ref('grid');
	grid.on('value',function(snapshot){
		var afc_grid_html_numbers = ""
		var afc = snapshot.val().afc;
		afc_grid_html_numbers += "<td class='afc_num' colspan='1' id='afc_num_" + afc.zero + "'>" + afc.zero + "</td>";
		afc_grid_html_numbers += "<td class='afc_num' id='afc_num_" + afc.one + "'>" + afc.one + "</td>";
		afc_grid_html_numbers += "<td class='afc_num' id='afc_num_" + afc.two + "'>" + afc.two + "</td>";
		afc_grid_html_numbers += "<td class='afc_num' id='afc_num_" + afc.three + "'>" + afc.three + "</td>";
		afc_grid_html_numbers += "<td class='afc_num' id='afc_num_" + afc.four + "'>" + afc.four + "</td>";
		afc_grid_html_numbers += "<td class='afc_num' id='afc_num_" + afc.five + "'>" + afc.five + "</td>";
		afc_grid_html_numbers += "<td class='afc_num' id='afc_num_" + afc.six + "'>" + afc.six + "</td>";
		afc_grid_html_numbers += "<td class='afc_num' id='afc_num_" + afc.seven + "'>" + afc.seven + "</td>";
		afc_grid_html_numbers += "<td class='afc_num' id='afc_num_" + afc.eight + "'>" + afc.eight + "</td>";
		afc_grid_html_numbers += "<td class='afc_num' id='afc_num_" + afc.nine + "'>" + afc.nine + "</td>";
		$("#grid-afc-level").append(afc_grid_html_numbers);
	});
	var afc_grid_html_close = "</tr>";
	$("#grid-afc-level").append(afc_grid_html_close);

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
	$("#users-table").html("");
	showRegisteredUsers();

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

function randomScoreNumber(score, random) {
	this.score = score,
	this.random = random;
}

function randomizeNumbers() {
	if(db == null) {
		var db = firebase.database();
	}
	afcNumbers = [];
	nfcNumbers = [];
	for(score = 0; score < 10; score++) {
		afcNumbers.push(new randomScoreNumber(score, Math.random()))
		nfcNumbers.push(new randomScoreNumber(score, Math.random()))
	}
	afcNumbers.sort((a, b) => (a.random > b.random) ? 1 : -1);
	nfcNumbers.sort((a, b) => (a.random > b.random) ? 1 : -1);
	let afcFinalNumbers = afcNumbers.map(a => a.score);
	let nfcFinalNumbers = nfcNumbers.map(a => a.score);

	var nfcHeader = {
		zero: nfcFinalNumbers[0],
		one: nfcFinalNumbers[1],
		two: nfcFinalNumbers[2],
		three: nfcFinalNumbers[3],
		four: nfcFinalNumbers[4],
		five: nfcFinalNumbers[5],
		six: nfcFinalNumbers[6],
		seven: nfcFinalNumbers[7],
		eight: nfcFinalNumbers[8],
		nine: nfcFinalNumbers[9]
	};

	var afcHeader = {
		zero: afcFinalNumbers[0],
		one: afcFinalNumbers[1],
		two: afcFinalNumbers[2],
		three: afcFinalNumbers[3],
		four: afcFinalNumbers[4],
		five: afcFinalNumbers[5],
		six: afcFinalNumbers[6],
		seven: afcFinalNumbers[7],
		eight: afcFinalNumbers[8],
		nine: afcFinalNumbers[9]
	};

	db.ref('grid/afc').update(afcHeader);
	db.ref('grid/nfc').update(nfcHeader);
}

function nullifyNumbers() {

	if(db == null) {
		var db = firebase.database();
	}
	
	var nullHeader = {
		zero: "--",
		one: "--",
		two: "--",
		three: "--",
		four: "--",
		five: "--",
		six: "--",
		seven: "--",
		eight: "--",
		nine: "--"
	};

	db.ref('grid/afc').update(nullHeader);
	db.ref('grid/nfc').update(nullHeader);
}
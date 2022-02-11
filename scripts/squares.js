var userSelecting = {
	id:null,
	email:null,
	firstname:null,
	lastname:null,
	initials:null,
	submitted:null,
};
var db;

function buildSquares() {
	db = firebase.database();
	var grid_labels = db.ref('grid');
	var team_scores = db.ref('scores');
	grid_labels.on('value', function(numbers){
		buildAFCHeader(numbers.val().afc);
		buildNFCHeader(numbers.val().nfc);
		getGridChoices();
	});

	var urlParams = getUrlVars();
	user_id= urlParams['resu'];
	if(user_id != null) {
		return new Promise(function(resolve, reject){
			var selecting_user = db.ref('users/' + user_id);
			selecting_user.on('value', function(info){
				userSelecting = {
					id: info.key,
					email: info.val().email,
					firstname: info.val().firstname,
					lastname: info.val().lastname,
					initials: returnInitials(info.val().firstname, info.val().lastname),
					submitted: info.val().submitted,
				}
				resolve(populateUserInfo(userSelecting));
			});
		});
	} else {
		setupViewing();
	}
}

function setupViewing(){
	$("#all-selection-info").attr("hidden","hidden");
}

function populateUserInfo(info) {
	$("#selecting-user-information-name").html(info.firstname + " " + info.lastname);
	$("#selecting-user-information-email").html(info.email);
	if(info.submitted) {
		$("#squares-filled-warning-message").removeAttr("hidden");
		$("#submit-clear-buttons").attr("hidden","hidden");
		$("#my-selected-squares").attr("hidden","hidden");
	}
}

getUrlVars = function() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

function getGridChoices() {
	return new Promise(function(resolve, reject){
		user_grid_choices = db.ref('users');
		team_scores = db.ref('scores');
		grid_values = db.ref('grid')

		user_grid_choices.on('value', function(users) {
			users.forEach(function(user){
				var initials = returnInitials(user.val().firstname, user.val().lastname);
				console.log(user.val())
				var concatName = returnConcat(user);
				if(user.val().squares != null) {
					user.val().squares.forEach(function(square){
						if(square.length>1){
							$("#" + square).html(initials);
							$("#" + square).attr("value", concatName);
							var nfc_int = square[square.length - 4];
							var afc_int = square[square.length - 1];
							var nfc_score = $("#r" + nfc_int + "-cind")[0].innerHTML;
							var afc_score = $("#rind-c" + afc_int)[0].innerHTML;
							$("#" + square).attr("class", "divTableCell cell-with-initials rs" + nfc_score + "-cs" + afc_score + " " + concatName);						
						}
					});
				}
			});
		resolve(selectWinners(team_scores));
		resolve(seeWhoIsPlaying());
		});
	});
} 

function dropdownUser(wholeName, initials, concatName) {
	this.wholeName = wholeName,
	this.initials = initials,
	this.concatName = concatName
}

function seeWhoIsPlaying() {
	return new Promise(function(resolve, reject) {
		var options = ""
		$('#see-who-is-playing').html('');
		var users = db.ref('users');
		users.on('value', function(snapshot) {
			console.log(snapshot);
			options += "<option class = 'container' value = '' ></option>";
			var namelist = [];
			snapshot.forEach(function(user){
				var initials = returnInitials(user.val().firstname, user.val().lastname);
				var wholename = user.val().firstname + " " + user.val().lastname;
				console.log(user)
				var concatName = returnConcat(user)
				namelist.push(new dropdownUser(wholename, initials, concatName));
			});

			namelist.sort((a, b) => (a.wholeName > b.wholeName) ? 1 : -1);
			namelist.forEach(function(name) {
				options += "<option class = 'container who-is-playing' value = " + name.concatName + ">" + name.wholeName + "</option>";
			});

			resolve($("#see-who-is-playing").append(options));
		});
	});
}

function viewWhoIsPlaying(ele) {
	console.log(ele)
	var initials = ele.options[ele.selectedIndex].value;
	console.log(initials);
	$(".cell-with-initials").each(function(x, cell) {
		$('.cell-with-initials')[x].style.fontWeight = 250;
	});
	if(initials!="") {
		$("." + initials).each(function(i, element) {
			$('.' + initials)[i].style.fontWeight=900;
		});
	}
}

function buildAFCHeader(header){
	$("#rind-c0").html(header.zero).attr("class","divTableCell row_score_" + header.zero);
	$("#rind-c1").html(header.one).attr("class","divTableCell row_score_" + header.one);
	$("#rind-c2").html(header.two).attr("class","divTableCell row_score_" + header.two);
	$("#rind-c3").html(header.three).attr("class","divTableCell row_score_" + header.three);
	$("#rind-c4").html(header.four).attr("class","divTableCell row_score_" + header.four);
	$("#rind-c5").html(header.five).attr("class","divTableCell row_score_" + header.five);
	$("#rind-c6").html(header.six).attr("class","divTableCell row_score_" + header.six);
	$("#rind-c7").html(header.seven).attr("class","divTableCell row_score_" + header.seven);
	$("#rind-c8").html(header.eight).attr("class","divTableCell row_score_" + header.eight);
	$("#rind-c9").html(header.nine).attr("class","divTableCell row_score_" + header.attr);
}

function buildNFCHeader(header){
	$("#r0-cind").html(header.zero).attr("class","divTableCell col_score_" + header.zero);
	$("#r1-cind").html(header.one).attr("class","divTableCell col_score_" + header.one);
	$("#r2-cind").html(header.two).attr("class","divTableCell col_score_" + header.two);
	$("#r3-cind").html(header.three).attr("class","divTableCell col_score_" + header.three);
	$("#r4-cind").html(header.four).attr("class","divTableCell col_score_" + header.four);
	$("#r5-cind").html(header.five).attr("class","divTableCell col_score_" + header.five);
	$("#r6-cind").html(header.six).attr("class","divTableCell col_score_" + header.six);
	$("#r7-cind").html(header.seven).attr("class","divTableCell col_score_" + header.seven);
	$("#r8-cind").html(header.eight).attr("class","divTableCell col_score_" + header.eight);
	$("#r9-cind").html(header.nine).attr("class","divTableCell col_score_" + header.nine);
}

function addCellToSelected(cell){
	if(userSelecting.id!=null){
		if ($("#selected-squares > div").length == 10) {
			window.alert("You have 5! Start over or submit");
		} else if($("#" + cell.id)[0].innerHTML != ""){
			window.alert("Already selected! Pick another.");
		} else {

			$("#selected-squares").append("<div class='inline option' role='option'>" + cell.id + "</div><div class = 'inline'>&nbsp</div>");
			$("#" + cell.id)[0].innerHTML = userSelecting.initials;
		}
	}
}


function clearSelectedSquares() {
	$("#selected-squares").html("");
	location.reload();
}

function submitMySquares() {

	if($("#selected-squares > div").length != 10) {
		window.alert("You have more squares to pick!");
	} else {
		var arr = [];
		var squares = {
			0: $(".option")[0].innerHTML,
			1: $(".option")[1].innerHTML,
			2: $(".option")[2].innerHTML, 
			3: $(".option")[3].innerHTML,
			4: $(".option")[4].innerHTML,
		}
		submitSquares(squares);
		window.alert("Thanks! Your squares have been submitted.");
		window.location.replace('https://michaelstanfa.github.io/squares/pages/squares.html');
	}

}

function returnInitials(firstname, lastname) {
	return firstname.substring(0,1) + lastname.substring(0,1);
}

function returnConcat(user) {
	return (user.val().firstname + "-" + user.val().lastname).replace(" ", "-")
}

function submitSquares(squares) {
	
	var id = userSelecting.id;
	var squaresUpdates = {};
	squaresUpdates['users/' + id + '/squares'] = squares;
	db.ref().update(squaresUpdates);

	var submittedUpdate = {};
	submittedUpdate['users/' + id + '/submitted'] = true;
	db.ref().update(submittedUpdate);
}

function buildBoxScore() {
	if(userSelecting.id==null){
		$("#selecting-user-information").attr("style","display:none;");
	}
}

function selectWinners(scores) {
	highlightCurrentWinner();
	scores.on('value',function(score){
		$("#q1_winner").html(getWinnerFromScore(score.val().q1));
		$("#q2_winner").html(getWinnerFromScore(score.val().q2));
		$("#q3_winner").html(getWinnerFromScore(score.val().q3));
		$("#q4_winner").html(getWinnerFromScore(score.val().q4));
	});
}

function highlightCurrentWinner() {
	var nfc_num = $("#score_nfc_current")[0].innerHTML;
	var afc_num = $("#score_afc_current")[0].innerHTML;
	nfc_num = nfc_num[nfc_num.length - 1];
	afc_num = afc_num[afc_num.length - 1];
	$(".rs" + nfc_num + "-cs"+ afc_num)[0].style.backgroundColor = "yellow";
}

function getWinnerFromScore(obj) {
	
	nfc = obj.nfc;
	afc = obj.afc;
	if(nfc!="-"){
		nfc_num = nfc[nfc.length-1];
		afc_num = afc[afc.length-1];
		var ele = $(".rs" + nfc_num + "-cs"+ afc_num);
		return ele[0].getAttribute("value").replace("-", " ");

	}
}

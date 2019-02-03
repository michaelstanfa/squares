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
		buildPatsHeader(numbers.val().top);
		buildRamsHeader(numbers.val().left);
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
				var wholename = user.val().firstname + " " + user.val().lastname;
				user.val().squares.forEach(function(square){
					if(square.length>1){
						$("#" + square).html(initials);
						$("#" + square).attr("value", wholename);
						var rams_int = square[square.length - 4];
						var pats_int = square[square.length - 1];
						var rams_score = $("#r" + rams_int + "-cind")[0].innerHTML;
						var pats_score = $("#rind-c" + pats_int)[0].innerHTML;
						$("#" + square).attr("class", "divTableCell rs" + rams_score + "-cs" + pats_score);						
					}
				});
			});
		resolve(selectWinners(team_scores));
		});
	});
} 

function dummyHeaders() {
	$("#rind-cind").html("");
	$("#rind-c0").html("c0");
	$("#rind-c1").html("c1");
	$("#rind-c2").html("c2");
	$("#rind-c3").html("c3");
	$("#rind-c4").html("c4");
	$("#rind-c5").html("c5");
	$("#rind-c6").html("c6");
	$("#rind-c7").html("c7");
	$("#rind-c8").html("c8");
	$("#rind-c9").html("c9");

	$("#r0-cind").html("r0");
	$("#r1-cind").html("r1");
	$("#r2-cind").html("r2");
	$("#r3-cind").html("r3");
	$("#r4-cind").html("r4");
	$("#r5-cind").html("r5");
	$("#r6-cind").html("r6");
	$("#r7-cind").html("r7");
	$("#r8-cind").html("r8");
	$("#r9-cind").html("r9");

}

function buildPatsHeader(header){
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

function buildRamsHeader(header){
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
		location.reload();
	}

}

function returnInitials(firstname, lastname) {
	return firstname.substring(0,1) + lastname.substring(0,1);
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
	var rams_num = $("#score_rams_current")[0].innerHTML;
	var pats_num = $("#score_pats_current")[0].innerHTML;
	rams_num = rams_num[rams_num.length - 1];
	pats_num = pats_num[pats_num.length - 1];
	$(".rs" + rams_num + "-cs"+ pats_num)[0].style.backgroundColor = "yellow";
}

function getWinnerFromScore(obj) {
	
	rams = obj.rams;
	pats = obj.pats;
	if(rams!="-"){
		rams_num = rams[rams.length-1];
		pats_num = pats[pats.length-1];
		var ele = $(".rs" + rams_num + "-cs"+ pats_num);
		return ele[0].getAttribute("value");

	}
}
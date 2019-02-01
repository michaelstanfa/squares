function buildSquares() {
	//$('#squares_grid').html('');
	var grid_numbers = firebase.database().ref('grid');
	grid_numbers.on('value', function(numbers){
		//buildPatsHeader(numbers.val().top);
		//buildRamsHeader(numbers.val().left);
		dummyHeaders();
	});
	var currentSelectedCellsArray = [];
	
}

function dummyHeaders() {
	$("#rind-cind").html("Squares");
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
	$("#rind-cind").html("Squares");
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
	if ($("#selected-squares > div").length == 10) {
		window.alert("You have 5! Start over or submit");
	} else if($("#" + cell.id)[0].innerHTML != ""){
		window.alert("Already selected! Pick another.");
	} else {

		$("#selected-squares").append("<div class='inline option' role='option'>" + cell.id + "</div><div class = 'inline'>&nbsp</div>");
		$("#" + cell.id)[0].innerHTML = $("#square-select-usernames").children("option:selected").attr("initials");
	}
}


function clearSelectedSquares() {
	$("#selected-squares").html("");
	location.reload();
}

function submitMySquares() {
	console.log($("#selected-squares > div").length);
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
		//location.reload();
	}

}

function localSelectUsernameBox() {
	var users = firebase.database().ref('users');
	users.on('value', function(snapshot) {
		snapshot.forEach(function(user){
			var this_html = "";
			this_html = "<option id = " + user.key + " initials=" + user.val().firstname.substring(0,1) + user.val().lastname.substring(0,1) + " value=" + user.val().email +">" + user.val().firstname + " " + user.val().lastname + "</option>";
			$("#square-select-usernames").append(this_html);
		});
	});
}

function changeselect() {
	console.log($("#square-select-usernames"));
	console.log($("#square-select-usernames").children("option:selected"));
}

function submitSquares(squares) {
	var id = $("#square-select-usernames").children("option:selected").attr("id");
	console.log(id);
	var squaresUpdates = {};
	squaresUpdates['users/' + id + '/squares'] = squares;
	firebase.database().ref().update(squaresUpdates);
}

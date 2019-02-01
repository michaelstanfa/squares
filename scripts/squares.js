function buildSquares() {
	$('#squares_grid').html('');
	var grid_numbers = firebase.database().ref('grid');
	grid_numbers.on('value', function(numbers){
		buildPatsHeader(numbers.val().top);
		buildRamsHeader(numbers.val().left);
	});
	
}

function buildPatsHeader(header){
	console.log(header);
	pats_html = "";
	pats_html += "<tr>";
	pats_html += "<td class = 'pats_" + header.zero + "'>" + header.zero + "</td>";
	pats_html += "<td class = 'pats_" + header.one + "'>" + header.one + "</td>";
	pats_html += "<td class = 'pats_" + header.two + "'>" + header.two + "</td>";
	pats_html += "<td class = 'pats_" + header.three + "'>" + header.three + "</td>";
	pats_html += "<td class = 'pats_" + header.four + "'>" + header.four + "</td>";
	pats_html += "<td class = 'pats_" + header.five + "'>" + header.five + "</td>";
	pats_html += "<td class = 'pats_" + header.six + "'>" + header.six + "</td>";
	pats_html += "<td class = 'pats_" + header.seven + "'>" + header.seven + "</td>";
	pats_html += "<td class = 'pats_" + header.eight + "'>" + header.eight + "</td>";
	pats_html += "<td class = 'pats_'" + header.nine + "'>" + header.nine + "</td>";
	pats_html += "<tr>";

	$('#pats-index-numbers').html(pats_html);

}

function buildRamsHeader(header){
	console.log(header);
	rams_html = "";
	rams_html += "<tr>";
	rams_html += "<td class = 'rams_" + header.zero + "'>" + header.zero + "</td>";
	rams_html += "<td class = 'rams_" + header.one + "'>" + header.one + "</td>";
	rams_html += "<td class = 'rams_" + header.two + "'>" + header.two + "</td>";
	rams_html += "<td class = 'rams_" + header.three + "'>" + header.three + "</td>";
	rams_html += "<td class = 'rams_" + header.four + "'>" + header.four + "</td>";
	rams_html += "<td class = 'rams_" + header.five + "'>" + header.five + "</td>";
	rams_html += "<td class = 'rams_" + header.six + "'>" + header.six + "</td>";
	rams_html += "<td class = 'rams_" + header.seven + "'>" + header.seven + "</td>";
	rams_html += "<td class = 'rams_" + header.eight + "'>" + header.eight + "</td>";
	rams_html += "<td class = 'rams_" + header.nine + "'>" + header.nine + "</td>";
	rams_html += "<tr>";

	$('#rams-index-numbers').html(rams_html);
}
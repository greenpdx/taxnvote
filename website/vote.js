/*
 */

function initChart() {	
	google.charts.load('current', {'packages':['corechart']});
	google.charts.setOnLoadCallback(drawCharts);
}

function drawCharts() {
	budgetChart();
	voteChart();
}

/*  US BUdget Mandatory, Interest and Discretionary piechart
 */
function budgetChart() {

	var budg = new google.visualization.DataTable();
	budg.addColumn({ 'id': 'budget', 'type': 'string'});
	budg.addColumn({ 'id': 'amount', 'type': 'number'});
	budg.addColumn({'type': 'string', 'role': 'tooltip', 'p': {'html': true}});
	budg.addRows([
		['Interest',     .22915, '$229.15 Billion'],
		['Discretionary',      1.110, '$1.11 Trillion'],
		['Mandatory',  2.45, '$2.45 Trillion']
	]);

	var role = budg.getColumnRole(2);
	console.log(role);
	
	var budgOpts = {
		legend: {position: 'none'},
		pieSliceText: 'label',
		slices: [{color: '#00f'},{color: '#c60'},{color: '#0c0'}],
		chartArea: {top: '13%', width: '85%', height: '85%'},
		backgroundColor: 'none',
		is3D: true,
		fontsize: '2em',
		tooltip: {isHtml: true }
	};

	var chart = new google.visualization.PieChart(document.getElementById('piechart'));

	chart.draw(budg, budgOpts);
}

/*  US Discretionary piechart
 */
function voteChart() {

	var vote = google.visualization.arrayToDataTable([
		['Budget', 'Amount'],
		['Interest',     .22915],
		['Discretionary',      1.110],
		['Mandatory',  2.45]
	]);
	
	var voteOpts = {
		legend: {position: 'none'},
		pieSliceText: 'label',
		slices: [{color: '#00f'},{color: '#c60'},{color: '#0c0'}],
		chartArea: {top: '13%', width: '85%', height: '85%'},
		backgroundColor: 'none',
		is3D: true,
		fontsize: '2em',
		tooltip: {isHTML: true }
	};

	var chart = new google.visualization.PieChart(document.getElementById('piechart'));

	chart.draw(vote, voteOpts);
}

initChart();

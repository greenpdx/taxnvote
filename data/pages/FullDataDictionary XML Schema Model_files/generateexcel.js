function GenerateExcel()
{
	
var myBrowser = navigator.userAgent.toLowerCase();

if (myBrowser.indexOf("msie") < 0){
	alert("This functionality works for Microsoft Internet Explorer only.");
	return;
}


var rows = document.getElementById('dataItems').rows;//collection of rows in the table including the header

var xls = new ActiveXObject("Excel.Application");
xls.visible = true;
var Book = xls.Workbooks.Add();

var excelRowIndex = 0;
for (i = 1; i < rows.length; i++){//From i = 1, because the first row in the table containes no data and is reserved for filters, etc.
		if(rows[i].style.display != 'none'){
			excelRowIndex = excelRowIndex + 1;//only visible rows
			var cells = rows[i].cells;//collection of cells in the selected row
			for (j = 0; j < cells.length; j++)
				{
				Book.ActiveSheet.Cells(excelRowIndex, j+1).Value = cells[j].innerText;
			}
		}
	}
}
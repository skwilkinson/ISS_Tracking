/**
 * @author Dylon
 * Fetches info from xml file and displays it in a table
 */
var x;
var y;
var i;
var j;

function initialize()
{
	alert("1");
	
var mytable=document.getElementById("sitesTable");

var newrow=mytable.insertRow(-1); //add new row to end of table
var newcell=newrow.insertCell(0); //insert new cell to row
newcell.innerHTML=1;
var newcell=newrow.insertCell(0); //insert new cell to row
newcell.innerHTML="Site #";
alert("2");

xmlhttp=new XMLHttpRequest();

alert("3 new");

xmlhttp.open("GET","EOSitesDaily.xml",true);
xmlhttp.send();
xmlDoc=xmlhttp.responseXML; 
alert("5");

i = 0;
j = i+1;
	alert("4a");
x=xmlDoc.getElementsByTagName('wmc__TEOSite');
y=xmlDoc.getElementsByTagName('TGeoCoordsEx');
	alert("4b");
addTable();
alert("5");
}

function goToNextSite()
{
if(i<5)
{
i = i+1;
j = j+1;
deleteTable();	
addTable();
}
}

function goToPreviousSite()
{
if(i>0)
{
i = i-1;
j = j-1;
deleteTable();	
addTable();
}
}
    
function deleteTable()
{
var mytable=document.getElementById("sitesTable");
while (mytable.rows.length>0) //deletes table
mytable.deleteRow(0); 
}    
    
function addTable()
{
var mytable=document.getElementById("sitesTable");

var newrow=mytable.insertRow(-1); //add new row to end of table
var newcell=newrow.insertCell(0); //insert new cell to row
newcell.innerHTML=i+1;
var newcell=newrow.insertCell(0); //insert new cell to row
newcell.innerHTML="Site #";
	
var newrow=mytable.insertRow(-1); //add new row to end of table
var newcell=newrow.insertCell(0); //insert new cell to row
newcell.innerHTML=x[i].getAttribute('Nomenclature');
var newcell=newrow.insertCell(0); //insert new cell to row
newcell.innerHTML="Location";

var newrow=mytable.insertRow(-1); //add new row to end of table
var newcell=newrow.insertCell(0); //insert new cell to row
newcell.innerHTML=y[i].getAttribute('lat') + ", " + y[i].getAttribute('lon');
var newcell=newrow.insertCell(0); //insert new cell to row
newcell.innerHTML="Lat,Lon";

var newrow=mytable.insertRow(-1); //add new row to end of table
var newcell=newrow.insertCell(0); //insert new cell to row
newcell.innerHTML=x[i].getAttribute('Notes');
var newcell=newrow.insertCell(0); //insert new cell to row
newcell.innerHTML="Notes";
}

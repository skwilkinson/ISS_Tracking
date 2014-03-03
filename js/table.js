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
	alert("yo1");
var mytable=document.getElementById("sitesTable");

if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp=new XMLHttpRequest();
  }
else
  {// code for IE6, IE5
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
xmlhttp.open("GET","EOSitesDaily.xml",false);
xmlhttp.send();
xmlDoc=xmlhttp.responseXML; 

i = 0;
j = i+1;

x=xmlDoc.getElementsByTagName('wmc__TEOSite');
y=xmlDoc.getElementsByTagName('TGeoCoordsEx');

addTable();
alert("yo2");
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

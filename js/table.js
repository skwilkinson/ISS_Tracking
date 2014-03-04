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
var mytable=document.getElementById("sitesTable");

xmlhttp=new XMLHttpRequest();

xmlhttp.open("GET","EOSitesDaily.xml",false);
xmlhttp.send();
xmlDoc=xmlhttp.responseXML; 

i = 0;
j = i+1;

x=xmlDoc.getElementsByTagName('wmc__TEOSite');
y=xmlDoc.getElementsByTagName('TGeoCoordsEx');
numbSites = xmlDoc.getElementsByTagName('wmc__TEOSite').length;


addTable();
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
newcell.innerHTML=i+1 + " of " + numbSites;
var newcell=newrow.insertCell(0); //insert new cell to row
newcell.innerHTML="Site #";
	
var newrow=mytable.insertRow(-1); //add new row to end of table
var newcell=newrow.insertCell(0); //insert new cell to row
newcell.innerHTML=x[i].getAttribute('Nomenclature');

var newcell=newrow.insertCell(0); //insert new cell to row
newcell.innerHTML="Location";

var newrow=mytable.insertRow(-1); //add new row to end of table
var newcell=newrow.insertCell(0); //insert new cell to row

var str = x[i].getAttribute('Notes');
var m = str.indexOf(";",0);
var time = str.substring(0,m);
newcell.innerHTML = time;

var newcell=newrow.insertCell(0); //insert new cell to row
newcell.innerHTML="Time";

var newrow=mytable.insertRow(-1); //add new row to end of table
var newcell=newrow.insertCell(0); //insert new cell to row

var n = str.indexOf(";",m+1);
var lens = str.substring(m+1,n);
newcell.innerHTML = lens;

var newcell=newrow.insertCell(0); //insert new cell to row
newcell.innerHTML="Lens";

var newrow=mytable.insertRow(-1); //add new row to end of table
var newcell=newrow.insertCell(0); //insert new cell to row

var o = str.indexOf(";",n+1);
var notes = str.substring(n+1,o);
newcell.innerHTML = notes;

var newcell=newrow.insertCell(0); //insert new cell to row
newcell.innerHTML="Notes";

var newrow=mytable.insertRow(-1); //add new row to end of table
var newcell=newrow.insertCell(0); //insert new cell to row

var pa = str.indexOf("lat",o+1);
var pb = str.indexOf(",",pa);
var lat = str.substring(pa,pb);

var qa = str.indexOf("lon",o+1);
var qb = str.indexOf("at",pb);
var lon = str.substring(qa,qb);
newcell.innerHTML = lat +", "+ lon;

var newcell=newrow.insertCell(0); //insert new cell to row
newcell.innerHTML="Lat, Long";
}

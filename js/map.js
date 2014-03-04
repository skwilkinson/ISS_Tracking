/**
 * @author Silas
 */

var myCenter;
var lat;
var lon;

function initialize()
{
	updatePosition();
	var mapProp = {
  	center: myCenter,
  	zoom:7,
  	mapTypeId: google.maps.MapTypeId.SATELLITE,
  	mapTypeControl: false,
  	streetViewControl: false,
  	zoomControl: false,
	panControl: false,
  	scaleControl: true
  	};

  	map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
  	
  	var currentPosTable=document.getElementById("currentPosTable");
  	
	var image = new google.maps.MarkerImage("ISS.png",
      new google.maps.Size(21, 21),     // size
      new google.maps.Point(0, 0),      // origin
      new google.maps.Point(10, 10));   // anchor
      
  	crossHair = new google.maps.Marker({
	    position: map.getCenter(),
	    map: map,
	    icon: image
	});

	crossHair.setMap(map);
	liveUpdate = setInterval(function(){updatePosition()},1000);
}

var map;
var crossHair;
var liveUpdate;


function updatePosition() {

	$.getJSON('http://api.open-notify.org/iss-now.json?callback=?', function(data) 
	{
    if (data) {
		lat = data.iss_position.latitude;
		lon = data.iss_position.longitude;
		ISS_loc = new google.maps.LatLng(lat,lon);
	}
	
	var ISS_loc;
	map.panTo(ISS_loc);
    	crossHair.setPosition(ISS_loc);
    
    uptatePosOutput();
  });

function uptatePosOutput()
{
	latShort = lat.toFixed(4);
	lonShort = lon.toFixed(4);
	while (currentPosTable.rows.length>0) //deletes table
	currentPosTable.deleteRow(0); 
	
	var newrow=currentPosTable.insertRow(-1); //add new row to end of table
	var newcell=newrow.insertCell(0); //insert new cell to row
	newcell.innerHTML="Current Position";
	
	var newrow=currentPosTable.insertRow(-1); //add new row to end of table
	var newcell=newrow.insertCell(0); //insert new cell to row
	newcell.innerHTML="Lon: "+lonShort;
	var newcell=newrow.insertCell(0); //insert new cell to row
	newcell.innerHTML="Lat: "+latShort;
}

}

function startUpdate() {
	var liveUpdate = setInterval(function(){updatePosition()},1000);
	updatePosition();
	alert("Start executes");
}

function stopUpdate() {
	window.clearInterval(liveUpdate);
	alert("Stop executes");
}
function goToPhilly()
{
	var philly = new google.maps.LatLng(39.9500,-75.1700);
	map.setZoom(9);
	map.setCenter(philly);
};

function goToLondon()
{
	var london =new google.maps.LatLng(51.508742,-0.120850);
	map.setZoom(9);
	map.setCenter(london);
};

google.maps.event.addDomListener(window, 'load', initialize);



/**
 * @author Silas
 * Displays map and updates ISS location
 */

var myCenter;
var lat;
var lon;
var p = new Boolean();
p = true;
var issImage;
var targetImage;
var targetCrossHair;
var Target_loc;
var map;
var issCrossHair;
var liveUpdate;

//initializes map upon startup
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
  	
  	//ISS crosshair image
	var issImage = new google.maps.MarkerImage("ISS.png",
      new google.maps.Size(21, 21),     // size
      new google.maps.Point(0, 0),      // origin
      new google.maps.Point(10, 10));   // anchor
      
  	issCrossHair = new google.maps.Marker({
	    position: map.getCenter(),
	    map: map,
	    icon: issImage
	});

	//target crosshair image
	var targetImage = new google.maps.MarkerImage("ISS.png",
      new google.maps.Size(21, 21),     // size
      new google.maps.Point(0, 0),      // origin
      new google.maps.Point(10, 10));   // anchor
      
  	targetCrossHair = new google.maps.Marker({
	    position: map.getCenter(),
	    map: map,
	    icon: targetImage
});

	issCrossHair.setMap(map);
	liveUpdate = setInterval(function(){updatePosition()},1000);
}

function updatePosition() {

	//goes to this website and fetches current ISS position
	$.getJSON('http://api.open-notify.org/iss-now.json?callback=?', function(data) 
	{
    if (data) {
		lat = data.iss_position.latitude;
		lon = data.iss_position.longitude;
		ISS_loc = new google.maps.LatLng(lat,lon);
	}

	//updates map to move to current ISS location
	var ISS_loc;
	if (p){
		map.panTo(ISS_loc);	
	}
    	issCrossHair.setPosition(ISS_loc);
    
    uptatePosOutput();
  });

//outputs ISS location to table
function uptatePosOutput()
{
	var table = document.getElementById("currentPosTable").createCaption();
	table.innerHTML = "<b>Current ISS Position</b>";
	
	latShort = lat.toFixed(4);
	lonShort = lon.toFixed(4);
	while (currentPosTable.rows.length>0) //deletes table
	currentPosTable.deleteRow(0); 

	var newrow=currentPosTable.insertRow(-1); //add new row to end of table
	var newcell=newrow.insertCell(0); //insert new cell to row
	newcell.innerHTML="Lon: "+lonShort;
	var newcell=newrow.insertCell(0); //insert new cell to row
	newcell.innerHTML="Lat: "+latShort;
}
}

function startUpdate() {
	p = true;
}

function stopUpdate() {
	p = false;
}

//moves map to current target location
function goToTargetPosition()
{
	var targetPos = new google.maps.LatLng(targetLat,targetLon);
	map.setZoom(9);
	map.setCenter(targetPos);
	Target_loc = new google.maps.LatLng(targetLat,targetLon);
	targetCrossHair.setPosition(Target_loc);
}

google.maps.event.addDomListener(window, 'load', initialize);


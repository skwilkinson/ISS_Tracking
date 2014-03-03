/**
 * @author Silas
 */

var myCenter=new google.maps.LatLng(51.508742,-0.120850);

function initialize()
{
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
  });

}

function startUpdate() {
	liveUpdate = setInterval(function(){updatePosition()},1000);
	updatePosition();
	alert("This executes");
}

function stopUpdate() {
	window.clearInterval(liveUpdate);
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


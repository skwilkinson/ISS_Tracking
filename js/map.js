/**
 * @author Silas
 */

var myCenter=new google.maps.LatLng(51.508742,-0.120850);

function initialize()
{
var mapProp = {
  center: myCenter,
  zoom:5,
  mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  map = new google.maps.Map(document.getElementById("googleMap"),mapProp);

  marker = new google.maps.Marker({
  position: myCenter,
  title:'Click to zoom'
  });

marker.setMap(map);
}

var map;
var marker;

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


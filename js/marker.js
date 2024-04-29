function read_locations_marker (list_coord, icon_png) {
  var locations_marker = [];
  for (var i = 0; i < list_coord.length; i++) {
    locations_marker.push({position: {lat: list_coord[i].latitude, lng: list_coord[i].longitude}, shortname: list_coord[i].shortname, name: list_coord[i].name})
  } 
  initMapMarkers(locations_marker, icon_png);
  stop_check_zoom();
}

function initMapMarkers(locations,icon_png) {
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: zoom,
    maxZoom: zoom + 10,
    minZoom: zoom - 1,
    center: center,
  });
  const markers = locations.map((location_marker, i) => {
    infoWindow = new google.maps.InfoWindow();
    const marker = new google.maps.Marker({
      position: location_marker.position,
      label: location_marker.shortname,
      title: location_marker.name,
      icon:  icon_png
    });
    google.maps.event.addListener(marker, 'click', function(evt) {
      infoWindow.close();
      infoWindow.setContent(marker.getTitle());
      infoWindow.open(marker.getMap(), marker);
    })
    return marker;
  });
  new MarkerClusterer(map, markers, {
    imagePath:
      "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
  });
}



var locations_path_all = [];
function read_locations_circle_new (list_coord_reg_new, list_coord_okr_new) {
  locations_circle_all = []
  locations_path_all = []
  stop_check_zoom()
  map_check = 'kekw'
  check_path(list_coord_reg_new)
  check_path_okr(list_coord_okr_new)
  check_color_locations_circle(list_coord_reg_new);
  check_color_locations_circle_okr(list_coord_okr_new);
  initMapCircle(zoom, center);
  center_check =  { lat: map_circle.getCenter().lat(), lng: map_circle.getCenter().lng() }
  initMapCircle_region_new(map_circle.zoom, center_check, locations_circle_all, locations_path_all)
  run_check_zoom();
}


function check_path(list_coord) {
  for (var i = 0; i < list_coord.length; i++) {
    
    if (list_coord[i].region_post.indexOf('imp') == 0) {
      arr_path = []
      arrcord = list_coord[i].coord_path.split(',') 
      for (var n = 0; n < arrcord.length; n++) {
        coord = arrcord[n].split('_')
        arr_path.push({lat: Number(coord[0]), lng: Number(coord[1])})
      }
      locations_path_all.push({check: 'reg',name: list_coord[i].region, month: list_coord[i].month, region_post: list_coord[i].region_post,color: "#00BFFF",flightPlanCoordinates: arr_path})
   }   
  }
}
function check_path_okr(list_coord) {
  for (var i = 0; i < list_coord.length; i++) {
    if (list_coord[i].region_post.indexOf('imp') == 0) {
      arr_path = []
      arrcord = list_coord[i].coord_path.split(',') 
      for (var n = 0; n < arrcord.length; n++) {
        coord = arrcord[n].split('_')
        arr_path.push({lat: Number(coord[0]), lng: Number(coord[1])})
      }
      locations_path_all.push({check: 'okr',name: list_coord[i].region, month: list_coord[i].month, region_post: list_coord[i].region_post,color: "#00BFFF",flightPlanCoordinates: arr_path})
   }   
  }
}



function initMapCircle_region_new(zoom_circle, center, locations_circle, array_plines) {
  arrmarkers = []
  map_circle = new google.maps.Map(document.getElementById("map"), {
    zoom: zoom_circle,
    maxZoom: zoom + 10,
    minZoom: zoom - 1,
    center: center,
  });
  for (var i = 0; i < array_plines.length; i++) {
    var flightPlanCoordinates = array_plines[i].flightPlanCoordinates
    const flightPath = new google.maps.Polyline({
      path: flightPlanCoordinates,
      geodesic: true,
      strokeColor: array_plines[i].color,
      strokeOpacity: 0.5,
      strokeWeight: 2,
    });
    flightPath.type = array_plines[i].check+array_plines[i].month;
    arrmarkers.push(flightPath);
    flightPath.setMap(map_circle);
  };
  const Circle = locations_circle.map((location_circle, i) => {
    razmer = Math.abs(location_circle.potreblenie) / 100
    if (razmer < 10){
      razmer = 10
    }
    if (razmer > 60){
      razmer = 60
    }
    infoWindow = new google.maps.InfoWindow();
    const marker = new google.maps.Marker({
      position: location_circle.center,
      sName: "Marker Name",
      label: String(location_circle.potreblenie),
      title: location_circle.region +', '+ location_circle.month,
      map: map_circle,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: razmer, 
        strokeWeight: 0.4,
        strokeColor: location_circle.color,
        strokeOpacity: 0.4,
        fillColor:  location_circle.color,
        fillOpacity: 0.4,
      },
    });
    marker.type = location_circle.check+location_circle.month;
    arrmarkers.push(marker);
    marker.addListener("click", () => {
      infoWindow.close();
      infoWindow.setContent(marker.getTitle());
      infoWindow.open(marker.getMap(), marker);
    });
    displayMarkers();
    return marker;
  });
}


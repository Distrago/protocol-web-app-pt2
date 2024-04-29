var list_mount = ['2018-01-01', '2018-02-01','2018-03-01',
  '2018-04-01','2018-05-01','2018-06-01','2018-07-01','2018-08-01','2018-09-01','2018-10-01','2018-11-01','2018-12-01','2019-01-01','2019-02-01','2019-03-01','2019-04-01',
  '2019-05-01','2019-06-01','2019-07-01','2019-08-01','2019-09-01','2019-10-01','2019-11-01','2019-12-01','2020-01-01','2020-02-01','2020-03-01','2020-04-01','2020-05-01',
  '2020-06-01','2020-07-01','2020-08-01','2020-09-01','2020-10-01','2020-11-01','2020-12-01','2021-01-01','2021-02-01','2021-03-01','2021-04-01','2021-05-01','2021-06-01']
var arr_TimerId = []
var locations_circle = [];
var color_check;
var locations_circle_region = [];
var locations_circle_okrug = [];
var arrmarkers = [];
var infoWindow;
var map_circle;
var map_check = '';
var center_check = { lat: 63.412547, lng: 92.723601 };
function animation_run(list_coord) {
  arr_TimerId = [];
  initMapCircle(zoom, center);
  stop_check_zoom();
  for (let i = 0; i < list_mount.length; i++) {
    let timerId = setTimeout(read_locations_circle_animation,i*3*1000,list_coord, list_mount[i]) 
    arr_TimerId.push(timerId);
  };
}
function animation_stop(arr_TimerId) {
  for (let i = 0; i < arr_TimerId.length; i++) {
    clearTimeout(arr_TimerId[i]);
  };
}
function  read_locations_circle_animation(list_coord, mount_check){
  check_color_locations_circle(list_coord, mount_check);
  zoom_animation = map_circle.zoom;
  center_animation = { lat: map_circle.getCenter().lat(), lng: map_circle.getCenter().lng() };
  initMapCircle_animation(zoom_animation, center_animation, locations_circle_region);
}

function check_color_locations_circle(list_coord, mount_check) {
  locations_circle_region = []
  for (var i = 0; i < list_coord.length; i++) {
    if (list_coord[i].month == mount_check) {
      if (list_coord[i].potreblenie < 0) {
        color_check = "#FF0000"}
      else {
        color_check = "#00FF00"}
        locations_circle_region.push({center: {lat: list_coord[i].latitude, lng: list_coord[i].longitude}, potreblenie: list_coord[i].potreblenie, color: color_check, month: list_coord[i].month, region: list_coord[i].region})
    }
  } 
}
function check_color_locations_circle_okr(list_coord, mount_check) {
  locations_circle_okrug = []
  for (var i = 0; i < list_coord.length; i++) {
    if (list_coord[i].month == mount_check) {
      if (list_coord[i].potreblenie < 0) {
        color_check = "#FF0000"}
      else {
        color_check = "#00FF00"}
        locations_circle_okrug.push({center: {lat: list_coord[i].latitude, lng: list_coord[i].longitude}, potreblenie: list_coord[i].potreblenie, color: color_check, month: list_coord[i].month, region: list_coord[i].region})
    }
  } 
}

function read_locations_circle (mount_check) {
  stop_check_zoom()
  map_check = 'kekw'
  check_color_locations_circle(list_coord_reg, mount_check);
  check_color_locations_circle_okr(list_coord_okr, mount_check);
  initMapCircle(zoom, center);
  run_check_zoom();
}

function initMapCircle(zoom, center) {
  map_circle = new google.maps.Map(document.getElementById("map"), {
    zoom: zoom,
    maxZoom: zoom + 10,
    minZoom: zoom - 1,
    center: center,
  });
}
function initMapCircle_region(zoom_circle, center, locations_circle) {
  map_circle = new google.maps.Map(document.getElementById("map"), {
    zoom: zoom_circle,
    maxZoom: zoom + 10,
    minZoom: zoom - 1,
    center: center,
  });
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
    marker.type = location_circle.month;
    arrmarkers.push(marker);
    marker.addListener("click", () => {
      infoWindow.close();
      infoWindow.setContent(marker.getTitle());
      infoWindow.open(marker.getMap(), marker);
    });
    return marker;
  });
}

function initMapCircle_animation(zoom_animation, center_animation, locations_circle) {
  map_circle = new google.maps.Map(document.getElementById("map"), {
    zoom: zoom_animation,
    maxZoom: zoom + 10,
    minZoom: zoom - 1,
    center: center_animation,
  });
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
    marker.addListener("click", () => {
      infoWindow.close();
      infoWindow.setContent(marker.getTitle());
      infoWindow.open(marker.getMap(), marker);
    });
    return marker;
  });
}
function region_okrug() {
  console.log(map_circle.zoom);
  if (map_circle.zoom <= 4 && map_check != 'okrug'){
    console.log('создаем карту округов')
    map_check = 'okrug'
    center_check =  { lat: map_circle.getCenter().lat(), lng: map_circle.getCenter().lng() }
    initMapCircle_region(map_circle.zoom, center_check, locations_circle_okrug)
  }
  if (map_circle.zoom > 4 && map_check != 'region'){
    console.log('создаем карту регионов')
    map_check = 'region'
    center_check =  { lat: map_circle.getCenter().lat(), lng: map_circle.getCenter().lng() }
    initMapCircle_region(map_circle.zoom, center_check, locations_circle_region)
  }
}

var check_zoom;
function run_check_zoom() {
  check_zoom = setInterval(region_okrug, 500);
}
function stop_check_zoom() {
  clearInterval(check_zoom);
}






function displayMarkers(type) {
    for (var i = 0; i < arrmarkers.length; i++) {
        if (arrmarkers[i].type === type) {
          arrmarkers[i].setVisible(true);
        } 
        else {
          arrmarkers[i].setVisible(false);
        } 
    }
}
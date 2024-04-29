
var okrug_color_okrug = [
  {name: 'СФО', color: "#00BFFF"},
  {name: 'ДФО', color: "#00FF00"},
  {name: 'СЗФО', color: "#FF0000"},
  {name: 'ПФО', color: "#00FF00"},
  {name: 'ЦФО', color: "#FF0000"},
  {name: 'СКФО', color: "#00FF00"},
  {name: 'УрФО', color: "#FF0000"},
  {name: 'ЮФО', color: "#00FF00"}
]

var okrug_color_region =[
  {name: 'RU-AD', color: "#00BFFF"},
  {name: 'RU-KC', color: "#00BFFF"},
  {name: 'RU-KDA', color: "#00BFFF"},
  {name: 'RU-STA', color: "#00BFFF"},
  {name: 'RU-ROS', color: "#00BFFF"},
  {name: 'RU-KB', color: "#00BFFF"},
  {name: 'RU-SE', color: "#00BFFF"},
  {name: 'RU-IN', color: "#00BFFF"},
  {name: 'RU-KL', color: "#00BFFF"},
  {name: 'RU-CE', color: "#00BFFF"},
  {name: 'RU-DA', color: "#00BFFF"},
  {name: 'RU-VGG', color: "#00BFFF"},
  {name: 'RU-SAR', color: "#00BFFF"},
  {name: 'RU-AST', color: "#00BFFF"},
  {name: 'RU-MOS', color: "#00BFFF"},
  {name: 'RU-VOR', color: "#00BFFF"},
  {name: 'RU-MOW', color: "#00BFFF"},
  {name: 'RU-TUL', color: "#00BFFF"},
  {name: 'RU-KLU', color: "#00BFFF"},
  {name: 'RU-VLA', color: "#00BFFF"},
  {name: 'RU-RYA', color: "#00BFFF"},
  {name: 'RU-BEL', color: "#00BFFF"},
  {name: 'RU-TVE', color: "#00BFFF"},
  {name: 'RU-LIP', color: "#00BFFF"},
  {name: 'RU-KRS', color: "#00BFFF"},
  {name: 'RU-PNZ', color: "#00BFFF"},
  {name: 'RU-LEN', color: "#00BFFF"},
  {name: 'RU-TAM', color: "#00BFFF"},
  {name: 'RU-SPE', color: "#00BFFF"},
  {name: 'RU-IVA', color: "#00BFFF"},
  {name: 'RU-YAR', color: "#00BFFF"},
  {name: 'RU-SAM', color: "#00BFFF"},
  {name: 'RU-ORL', color: "#00BFFF"},
  {name: 'RU-SMO', color: "#00BFFF"},
  {name: 'RU-NIZ', color: "#00BFFF"},
  {name: 'RU-MO', color: "#00BFFF"},
  {name: 'RU-BRY', color: "#00BFFF"},
  {name: 'RU-NGR', color: "#00BFFF"},
  {name: 'RU-KOS', color: "#00BFFF"},
  {name: 'RU-ULY', color: "#00BFFF"},
  {name: 'RU-VLG', color: "#00BFFF"},
  {name: 'RU-MUR', color: "#00BFFF"},
  {name: 'RU-PSK', color: "#00BFFF"},
  {name: 'RU-KR', color: "#00BFFF"},
  {name: 'RU-CU', color: "#00BFFF"},
  {name: 'RU-KIR', color: "#00BFFF"},
  {name: 'RU-ORE', color: "#00BFFF"},
  {name: 'RU-ME', color: "#00BFFF"},
  {name: 'RU-BA', color: "#00BFFF"},
  {name: 'RU-TA', color: "#00BFFF"},
  {name: 'RU-UD', color: "#00BFFF"},
  {name: 'RU-ARK', color: "#00BFFF"},
  {name: 'RU-PER', color: "#00BFFF"},
  {name: 'RU-CHE', color: "#00BFFF"},
  {name: 'RU-SVE', color: "#00BFFF"},
  {name: 'RU-KO', color: "#00BFFF"},
  {name: 'RU-KGN', color: "#00BFFF"},
  {name: 'RU-TYU', color: "#00BFFF"},
  {name: 'RU-NEN', color: "#00BFFF"},
  {name: 'RU-OMS', color: "#00BFFF"},
  {name: 'RU-KHM', color: "#00BFFF"},
  {name: 'RU-NVS', color: "#00BFFF"},
  {name: 'RU-ALT', color: "#00BFFF"},
  {name: 'RU-KEM', color: "#00BFFF"},
  {name: 'RU-AL', color: "#00BFFF"},
  {name: 'RU-TOM', color: "#00BFFF"},
  {name: 'RU-KYA', color: "#00BFFF"},
  {name: 'RU-TY', color: "#00BFFF"},
  {name: 'RU-IRK', color: "#00BFFF"},
  {name: 'RU-BU', color: "#00BFFF"},
  {name: 'RU-ZAB', color: "#00BFFF"},
  {name: 'RU-SA', color: "#00BFFF"},
  {name: 'RU-AMU', color: "#00BFFF"},
  {name: 'RU-YEV', color: "#00BFFF"},
  {name: 'RU-KHA', color: "#00BFFF"},
  {name: 'RU-PRI', color: "#00BFFF"}
]

var arrplines = [];
var arr_path = [];
var array_plines = [];
function load_array_path(list_zd_path, arr_color) {
  stop_check_zoom()
  array_plines = []
  for (var i = 0; i < list_zd_path.length; i++) {
    arr_path = []
    arrcord = list_zd_path[i].path.split(',') 
    for (var n = 0; n < arrcord.length; n++) {
      coord = arrcord[n].split('_')
      arr_path.push({lat: Number(coord[0]), lng: Number(coord[1])})
    }
    for (var g = 0; g < arr_color.length; g++) {
      if (list_zd_path[i].name_start == arr_color[g].name){
        color = arr_color[g].color
      }
    }
    array_plines.push({name: list_zd_path[i].name_start,color: color,flightPlanCoordinates: arr_path})
  }
  read_plines(array_plines)
}



function read_plines(array_plines){
  arrplines = []
  const map = new google.maps.Map(document.getElementById("map"), {
  zoom: zoom,
  maxZoom: zoom + 10,
  minZoom: zoom - 1,
  center: center,
  mapTypeId: "terrain",
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
    flightPath.type = array_plines[i].name
    arrplines.push(flightPath);
    flightPath.setMap(map);
  }
}

function displayPlines(type) {
  for (var i = 0; i < arrplines.length; i++) {
      if (arrplines[i].type === type) {
        arrplines[i].setVisible(true);
      } 
      else {
        arrplines[i].setVisible(false);
      } 
  }
}





var array_plines_test;
array_plines_test = [{name: 'RU-SVE',color: "#00BFFF",flightPlanCoordinates: [{lat: 52.535235, lng: 85.179278}, {lat: 62.535235, lng: 85.179278}]}]
var locations_circle_test;
locations_circle_test = [{check: 'okr',center: {lat: 52.535235, lng: 85.179278}, potreblenie: 3000, color: "#00BFFF", month: "#00BFFF", region: 'RU-SVE'}]
function test_kek() {
  arrplines = []
  const map = new google.maps.Map(document.getElementById("map"), {
  zoom: zoom,
  maxZoom: zoom + 10,
  minZoom: zoom - 1,
  center: center,
  mapTypeId: "terrain",
  });
  for (var i = 0; i < array_plines_test.length; i++) {
    var flightPlanCoordinates = array_plines_test[i].flightPlanCoordinates
    const flightPath = new google.maps.Polyline({
      path: flightPlanCoordinates,
      geodesic: true,
      strokeColor: array_plines_test[i].color,
      strokeOpacity: 0.5,
      strokeWeight: 2,
    });
    flightPath.type = 'test'
    arrplines.push(flightPath);
    flightPath.setMap(map);
  };
  const Circle = locations_circle_test.map((location_circle_test, i) => {
    razmer = Math.abs(location_circle_test.potreblenie) / 100
    if (razmer < 10){
      razmer = 10
    }
    if (razmer > 60){
      razmer = 60
    }
    infoWindow = new google.maps.InfoWindow();
    const marker = new google.maps.Marker({
      position: location_circle_test.center,
      label: String(location_circle_test.potreblenie),
      title: location_circle_test.region +', '+ location_circle_test.month,
      map: map,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: razmer, 
        strokeWeight: 0.4,
        strokeColor: location_circle_test.color,
        strokeOpacity: 0.4,
        fillColor:  location_circle_test.color,
        fillOpacity: 0.4,
      },
    });
    marker.type = 'test';
    arrmarkers.push(marker);
    marker.addListener("click", () => {
      infoWindow.close();
      infoWindow.setContent(marker.getTitle());
      infoWindow.open(marker.getMap(), marker);
    });
    return marker;
  });

}
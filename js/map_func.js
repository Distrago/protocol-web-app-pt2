var center = { lat: 63.412547, lng: 92.723601 };
var zoom = 4;


function load_map() {
  read_list_coord_reg()
  read_list_coord_okr()
  read_list_coord_elev()
  read_list_coord_station()
  read_list_zd_path_okrug()
  read_list_zd_path_region()
  read_list_coord_okr_new()
  read_list_coord_reg_new()
  
  document.head.appendChild(script);
}

function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: zoom,
    maxZoom: zoom + 10,
    minZoom: zoom - 1,
    center: center,
  });
}
function clear_map() {
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: zoom,
    maxZoom: zoom + 10,
    minZoom: zoom - 1,
    center: center,
  });
}




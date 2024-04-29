var map;

// Create the script tag, set the appropriate attributes
var script = document.createElement('script');
script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBAcJ8gbr6gPidmfu6mfjF--ZoTl-n7fnQ&callback=initMap';
script.async = true;

function load_select_mount(list_mount) {
  var objSel = document.getElementById("mountRegion");
  for (var i = 0; i < list_mount.length; i++) {
    objSel.options[i] = new Option(list_mount[i], list_mount[i]);
  } 
}

function load_select_zd(okrug_color,id_) {
  var objSel = document.getElementById(id_);
  for (var i = 0; i < okrug_color.length; i++) {
    objSel.options[i] = new Option(okrug_color[i].name, okrug_color[i].name);
  } 
}


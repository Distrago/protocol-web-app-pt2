var list_coord_reg = [];
var list_coord_elev = [];
var list_coord_station = [];

function read_list_coord_reg() {// функция чтения данных с сайта
  $.getJSON ($SCRIPT_ROOT + '/get_coord_reg', { //получаем json с сайта
  }, function (date) { //открываем функцию
    for (var i = 0; i < date.result.length; i++) { //цикл по массиву с сайта
      list_coord_reg.push({    //закидываем в массив данные с присвоением класса
        "year": date.result[i].year,
        "month": date.result[i].month,
        "region": date.result[i].region,
        "potreblenie": Number(date.result[i].potreblenie.replace(',','.')),
        "latitude": Number(date.result[i].latitude.replace(',','.')),
        "longitude": Number(date.result[i].longitude.replace(',','.'))
      })
    } 
  })
}

function read_list_coord_elev() {
  $.getJSON ($SCRIPT_ROOT + '/get_coord_elev', {
  }, function (date) {
    for (var i = 0; i < date.result.length; i++) {
      list_coord_elev.push({
        "name": date.result[i].name,
        "shortname": date.result[i].shortname,
        "latitude": Number(date.result[i].latitude),
        "longitude": Number(date.result[i].longitude)
      })
    } 
  })
}

function read_list_coord_station() {
  $.getJSON ($SCRIPT_ROOT + '/get_coord_station', {
  }, function (date) {
    for (var i = 0; i < date.result.length; i++) {
      list_coord_station.push({
        "name": date.result[i].name,
        "shortname": date.result[i].shortname,
        "latitude": Number(date.result[i].latitude),
        "longitude": Number(date.result[i].longitude)
      })
    } 
  })
}
// setTimeOut





/*
var list_coord_reg = [];
var list_coord_elev = [];
var list_coord_station = [];


function read_list_coord_reg() {
  $.getJSON ($SCRIPT_ROOT + '/get_coord_reg', {
  }, function (date) {
    for (var i = 0; i < date.result.length; i++) {
      if (date.result[i].month == '2021-01-01') {
        list_coord_reg.push({
          "year": date.result[i].year,
          "month": date.result[i].month,
          "region": date.result[i].region,
          "potreblenie": Number(date.result[i].potreblenie.replace(',','.')),
          "latitude": Number(date.result[i].latitude.replace(',','.')),
          "longitude": Number(date.result[i].longitude.replace(',','.'))
        })
      }
    } 
    read_locations_circle ();
  })
  
}


function read_list_coord_elev() {
  $.getJSON ($SCRIPT_ROOT + '/get_coord_elev', {
  }, function (date) {
    for (var i = 0; i < date.result.length; i++) {
      list_coord_elev.push({
        "name": date.result[i].name,
        "latitude": Number(date.result[i].latitude),
        "longitude": Number(date.result[i].longitude)
      })
    } 
    read_locations_marker ();
  })
  
}


function read_list_coord_station() {
  $.getJSON ($SCRIPT_ROOT + '/get_coord_station', {
  }, function (date) {
    for (var i = 0; i < date.result.length; i++) {
      list_coord_station.push({
        "name": date.result[i].name,
        "latitude": Number(date.result[i].latitude),
        "longitude": Number(date.result[i].longitude)
      })
    } 
    read_locations_marker ();
  })
  
}
*/
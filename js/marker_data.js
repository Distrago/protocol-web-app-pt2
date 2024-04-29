var list_coord_reg = [];
var list_coord_elev = [];
var list_coord_station = [];
var list_coord_okr = [];
var list_zd_path_okrug = [];
var list_zd_path_region = [];
var list_coord_okr_new = [];
var list_coord_reg_new = [];

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


function read_list_coord_okr() {// функция чтения данных с сайта
  $.getJSON ($SCRIPT_ROOT + '/get_coord_okr', { //получаем json с сайта
  }, function (date) { //открываем функцию
    for (var i = 0; i < date.result.length; i++) { //цикл по массиву с сайта
      list_coord_okr.push({    //закидываем в массив данные с присвоением класса
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


function read_list_zd_path_okrug() {
  $.getJSON ($SCRIPT_ROOT + '/get_zd_path_okrug', {
  }, function (date) {
    for (var i = 0; i < date.result.length; i++) {
      list_zd_path_okrug.push({
        "name_start": date.result[i].name_start,
        "name_end": date.result[i].name_end,
        "path": date.result[i].path,
      })
    } 
  })
}


function read_list_zd_path_region() {
  $.getJSON ($SCRIPT_ROOT + '/get_zd_path_region', {
  }, function (date) {
    for (var i = 0; i < date.result.length; i++) {
      list_zd_path_region.push({
        "name_start": date.result[i].name_start,
        "name_end": date.result[i].name_end,
        "path": date.result[i].path,
      })
    } 
  })
}


function read_list_coord_okr_new() {// функция чтения данных с сайта
  $.getJSON ($SCRIPT_ROOT + '/get_coord_okr_new', { //получаем json с сайта
  }, function (date) { //открываем функцию
    for (var i = 0; i < date.result.length; i++) { //цикл по массиву с сайта
      list_coord_okr_new.push({    //закидываем в массив данные с присвоением класса
        "year": date.result[i].year,
        "month": date.result[i].month,
        "region": date.result[i].region,
        "potreblenie": Number(date.result[i].potreblenie.replace(',','.')),
        "latitude": Number(date.result[i].latitude.replace(',','.')),
        "longitude": Number(date.result[i].longitude.replace(',','.')),
        "val": Number(date.result[i].val.replace(',','.')), 
        "region_post": date.result[i].region_post, 
        "station_post": date.result[i].station_post, 
        "path": date.result[i].path, 
        "path_name": date.result[i].path_name, 
        "path_len": Number(date.result[i].path_len.replace(',','.')), 
        "coord_path": date.result[i].coord_path
      })
    } 
  })
}


function read_list_coord_reg_new() {// функция чтения данных с сайта
  $.getJSON ($SCRIPT_ROOT + '/get_coord_reg_new', { //получаем json с сайта
  }, function (date) { //открываем функцию
    for (var i = 0; i < date.result.length; i++) { //цикл по массиву с сайта
      list_coord_reg_new.push({    //закидываем в массив данные с присвоением класса
        "year": date.result[i].year,
        "month": date.result[i].month,
        "region": date.result[i].region,
        "potreblenie": Number(date.result[i].potreblenie.replace(',','.')),
        "latitude": Number(date.result[i].latitude.replace(',','.')),
        "longitude": Number(date.result[i].longitude.replace(',','.')),
        "val": Number(date.result[i].val.replace(',','.')), 
        "region_post": date.result[i].region_post, 
        "station_post": date.result[i].station_post, 
        "path": date.result[i].path, 
        "path_name": date.result[i].path_name, 
        "path_len": Number(date.result[i].path_len.replace(',','.')), 
        "coord_path": date.result[i].coord_path
      })
    } 
  })
}



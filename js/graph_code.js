setTimeout(() => {  
  webformOpen()
},500);

var json_file, graph_style, slider_distance, chbox, group_collor, rate, timestamp, timestamp_double, closestRight, message, message_views
let startDate = 0
let endDate = 0
let selectedNodes = new Set();
var result = {
  "nodes": [],
  "links": [],
  
}     
var proba = {
  'source':[] ,
  'target':[],
  'id': [],
}

var array = []
var Array_togl = []
var array_id = []
var array_message_views = []
var array_color = []
var array_scale = []
var array_segment = []
var array_minist = []
var array_regul = []


function webformOpen(){
    var time_now = Date.now();
    startDate_selector = document.querySelector('#startDate');
    endDate_selector = document.querySelector('#endDate');
    startDate = Date.parse(startDate_selector.value);
    endDate = Date.parse(endDate_selector.value);
    if(startDate_selector.value == ''){
      startDate = time_now - 2629743000 

      var year  = new Date(startDate).toLocaleDateString('ru',{ year: 'numeric'});
	  	var month  = new Date(startDate).toLocaleDateString('ru',{ month: '2-digit'});
	  	var day  = new Date(startDate).toLocaleDateString('ru',{ day: '2-digit'});
	  	document.querySelector('#startDate').value = year + '-' + month + '-' + day
        console.log(year)
    }
    else{
      startDate = Date.parse(startDate_selector.value);
    }
    if(endDate_selector.value == ''){
      endDate = time_now  
      var year  = new Date(endDate).toLocaleDateString('ru',{ year: 'numeric'});
      var month  = new Date(endDate).toLocaleDateString('ru',{ month: '2-digit'});
      var day  = new Date(endDate).toLocaleDateString('ru',{ day: '2-digit'});
      document.querySelector('#endDate').value = year + '-' + month + '-' + day
    }
    else{
      endDate = Date.parse(endDate_selector.value);
    }

    
      
      InputToSlider()
    
}


function getFile (fileName) {
  var request = new XMLHttpRequest();
  request.open('GET', fileName);
  request.onloadend = function(){
    parse(request.responseText);
  }
  request.send();
}

getFile('static/json/miserables.json'); //путь к файлу
function parse(obj) {
  json_file = JSON.parse(obj);
}


function standatrDistance(){

  slider_distance = 20
  slider_input.value = Number(slider_distance);
  distance_link.innerHTML = "Дистанция: <b>" + Number(slider_distance) + "</b>";
  InputToSlider()
}

function Null_array(){
  array.length = []
  result.length = 0
  array_message_views.length = []
  result = {
    "nodes": [],
    "links": []
  }
  proba = {
    'source':[] ,
    'target':[],
    'id': [],
  }
  Array_togl = []
  array_color = []
  array_scale = []
  array_segment = []
  array_minist = []
  array_regul = []

  
  console.log('Обнулили значения')
}

function InputToSlider(){
  Null_array()
  

  console.log('начали')

  chbox = document.getElementById('group_nodes');

  var time_now = Date.now();
  
  if(startDate == 0){
    startDate = time_now - 2629743000
  }
  if(endDate == 0){
    endDate = time_now    
  }

  slider_distance = document.getElementById("slider_input");
  slider_distance_value = slider_distance.value
  distance_link.innerHTML = "Дистанция: <b>" + Number(slider_distance_value) + "</b>";


  var slider_graph = document.getElementById("slider_graph");
  slider_graph_value = slider_graph.value
  percent_message.innerHTML = "Процент совпадения: <b>" + Number(slider_graph_value) + "</b>";
  
  var select_style = document.getElementById("select_style").value;
  if(select_style == 0){
    graph_style = 'null'
  }
  if(select_style == 1){
    graph_style = 'td'
  }
  if(select_style == 2){
    graph_style = 'bu'
  }
  if(select_style == 3 ){
    graph_style = 'lr'
  }
  if(select_style == 4 ){
    graph_style = 'rl'
  }
  if(select_style == 5 ){
    graph_style = 'zout'
  }
  if(select_style == 6 ){
    graph_style = 'zin'
  }
  if(select_style == 7 ){
    graph_style = 'radialout'
  }
  if(select_style == 8){
    graph_style = 'radialin'
  }
  
  let brands_chbox = document.getElementsByName("brands[]");
  for (var i = 0; i <brands_chbox.length; i++) {

    if (brands_chbox[i].checked){
      Array_togl.push(brands_chbox[i].value)
    }
  }
  
  if(Array_togl.length != 0){
    group_collor = 'group'
    array_id = []

    for (var a = 0; a < Array_togl.length; a++) {

      for (var i = 0; i < json_file.links.length; i++) {
        timestamp = new Date(json_file.nodes[i].date.split(".").reverse().join(".")).getTime();

        if((json_file.nodes[i].tema !=null) && (json_file.nodes[i].tema !=null) && json_file.nodes[i].tema == Array_togl[a] && (timestamp >= startDate) && (timestamp <= endDate) ){
          rate =(Math.random() * (30 - 5 + 1)) + 5;

          json_file.nodes[i].x = rate*0.25
          json_file.nodes[i].y = rate*1.25
          json_file.nodes[i].z = rate*0.75

          result["nodes"].push(json_file.nodes[i])
        }
      }
    }

    for (var a = 0;a < Array_togl.length; a++) {

      for (var i = 0; i < result.nodes.length; i++) {
        closestRight = undefined
        timestamp = 0
        timestamp_double = 0
        proba = {
          'source':[] ,
          'target': [],
          'id': [],
        }
        
        for (var n = 0; n < result.nodes.length; n++) {
          var timestamp = new Date(json_file.nodes[i].date.split(".").reverse().join(".")).getTime();
          
          if (Array_togl[a] == result.nodes[i].tema && (Array_togl[a] == result.nodes[n].tema)){
            time_old_mess = new Date(result.nodes[i].date.split(".").reverse().join(".")).getTime();
            time_new_mess = new Date(result.nodes[n].date.split(".").reverse().join(".")).getTime();
            
            if (time_old_mess > time_new_mess && ( closestRight == undefined || closestRight > time_old_mess)) {
              closestRight = time_old_mess;
              proba = {
                'source':result.nodes[i].id ,
                'target': result.nodes[n].id,
                // 'id': Array_togl[a],
                'group':Array_togl[a]
              }
              result["links"].push(proba)
              // console.log('запись')
            }
          }

          if (Array_togl.length > 0 && (result.nodes[i].id_clear == result.nodes[n].id_clear) && (result.nodes[i].tema != result.nodes[n].tema && array_id.includes(result.nodes[i].id_clear) == false )){
            array_id.push(result.nodes[i].id_clear)
            proba = {
              'source':result.nodes[i].id ,
              'target': result.nodes[n].id,
              // 'id': Array_togl[a],
              'group':'conflux'
            }
            result["links"].push(proba)
          }
        }
      }
    }  
  }


  else if (Array_togl.length == 0  && array_scale.length == 0 && array_segment.length == 0 && array_minist.length == 0){
    for (var n = 0; n < json_file.links.length; n++) {
      var timestamp = new Date(json_file.nodes[n].date.split(".").reverse().join(".")).getTime();
      if((json_file.links[n].value >= slider_graph_value) && (timestamp >= startDate) && (timestamp <= endDate)){
        result["links"].push(json_file.links[n])
      }
    }

    for (var n = 0; n < result.links.length; n++) {
      if(result.links[n].source.id == undefined || result.links[n].target.id == undefined){
        if (array.includes(result.links[n].target) == false ){
          array.push(result.links[n].target)
        }

        if (array.includes(result.links[n].source) == false ){
          array.push(result.links[n].source)
        }
      }

    else{
        if (array.includes(result.links[n].target.id) == false ){
          array.push(result.links[n].target.id)
        }

        if (array.includes(result.links[n].source.id) == false ){
          array.push(result.links[n].source.id)
        }
      }
    }

    for (var i = 0; i < json_file.nodes.length; i++){
      if ((array.includes(json_file.nodes[i].id) == true)){
        rate =(Math.random() * (30 - 5 + 1)) + 5;
        json_file.nodes[i].x = rate*0.25
        json_file.nodes[i].y = rate*1.25
        json_file.nodes[i].z = rate*0.75

        // json_file.nodes[i].vx = 1
        // json_file.nodes[i].vy = 1
        // json_file.nodes[i].vz = 1

        result["nodes"].push(json_file.nodes[i])
      }
    }  
  }
  console.log(result) 
 

  Graph_F()
};


        // for (var i = 0; i < result.nodes.length; i++) {
        //   k = 0
        //   for (var n = 0; n < result.nodes.length; n++) {
        //     l = i+n
    
        //   var start
        //   var end 
        //     for (var a = 0; a < Array_togl.length; a++) {
    
        //       if (l < result.nodes.length) {
    
        //         if (result.nodes[l].tema == result.nodes[i].tema && Array_togl[a] == result.nodes[l].tema){
        //           var timestamp = new Date(result.nodes[i].date.split(".").reverse().join(".")).getTime();
        //         var timestamp_double = new Date(result.nodes[l].date.split(".").reverse().join(".")).getTime();
        //         start = timestamp - 3600000
        //         end = timestamp + 3600000
                
        //           if (result.nodes[i].id != result.nodes[l].id && (timestamp_double > start) && (timestamp_double < end)){
        //             proba = {
        //               'source':result.nodes[i].id ,
        //               'target': result.nodes[l].id,
        //               'id': result.nodes[i].tema,
        //             }
        //             result["links"].push(proba)
        //           }
        //         }
        //       } 
        //     }

        // if (l < result.nodes.length) {
        //   var timestamp = new Date(result.nodes[i].date.split(".").reverse().join(".")).getTime();
        //   var timestamp_double = new Date(result.nodes[l].date.split(".").reverse().join(".")).getTime();
        //   start = timestamp - 3600000
        //   end = timestamp + 3600000

        //   if (result.nodes[l].tema == result.nodes[i].tema && result.nodes[l].tema == 'Импорт'){

        //     if (result.nodes[i].id != result.nodes[l].id && (timestamp_double > start) && (timestamp_double < end)){
        //       proba = {
        //         'source':result.nodes[i].id ,
        //         'target': result.nodes[l].id,
        //         'id': result.nodes[i].tema,
        //       }
        //       result["links"].push(proba)
        //     }
        //   }

        //   if (result.nodes[l].tema == result.nodes[i].tema && result.nodes[l].tema == 'Экспорт'){

        //     if (result.nodes[i].id != result.nodes[l].id && (timestamp_double > start) && (timestamp_double < end)){
        //       proba = {
        //         'source':result.nodes[i].id ,
        //         'target': result.nodes[l].id,
        //         'id': result.nodes[i].tema,
        //       }
        //       result["links"].push(proba)
        //     }
        //   }
        // }
      
        


      
    

    // for (var n = 0; n < result.links.length; n++) {
    //   if(result.links[n].source.id == undefined || result.links[n].target.id == undefined){
    //     if (array.includes(result.links[n].target) == false ){
    //       array.push(result.links[n].target)
    //     }
  
    //     if (array.includes(result.links[n].source) == false ){
    //       array.push(result.links[n].source)
    //     }
    //   }
    //  else{
    //     if (array.includes(result.links[n].target.id) == false ){
    //       array.push(result.links[n].target.id)
    //     }
  
    //     if (array.includes(result.links[n].source.id) == false ){
    //       array.push(result.links[n].source.id)
    //     }
    //   }
    // }



    // for (var i = 0; i < result.nodes.length; i++){
      
    //   if ((array.includes(json_file.links[i].source) == true) && (array.includes(json_file.links[i].target))){
        
    //     result["links"].push(json_file.links[i])

    //   }
    // } 
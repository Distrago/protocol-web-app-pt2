

function Graph_F(){
  
  
  const Graph = ForceGraph3D()(document.getElementById('3d-graph'))
  .width([680])
  .height([880])
  Graph.graphData(result)
  // Graph.nodeLabel('text') // при навелении отображает текст
  .screen2GraphCoords(10, 10, 5)
  Graph.dagMode(graph_style) 
  .linkDirectionalArrowLength(10) // меняет величину стрелки
  .linkDirectionalArrowRelPos(1) // меняет положение стрелки на линии 
  .cooldownTicks(100)
  .nodeVal('RelSize') // размер точки 
  .nodeOpacity(1) //прозрачность точки
  .backgroundColor('white')
  Graph.nodeLabel(nodes => `<span style="color: black">${nodes.text}</span>`)

  Graph.linkOpacity(0.8) // прозрачность линии связи
  // .linkColor(0)
  // .linkWidth(1) // толщина линии связи
  Graph.d3Force('link')
  .distance(link => link.color ? slider_distance_value : slider_distance_value)


  if(chbox.checked == true){
    // Message_selected()
    // message  = document.getElementById('message')
    // message.innerHTML = ''
    // checkbox_message.innerHTML = "<b>" + 'Выбор сообщений' + "</b>";

    Graph.linkColor('white')
    Graph.nodeColor(node => selectedNodes.has(node) ? 'red': 'gray')

    Graph.onNodeClick((node, event) => {

      if (event.ctrlKey || event.shiftKey || event.altKey) { // multi-selection
        selectedNodes.has(node) ? selectedNodes.delete(node) : selectedNodes.add(node);
      } 

      else { // single-selection
        const untoggle = selectedNodes.has(node) && selectedNodes.size === 1;
        selectedNodes.clear();
        !untoggle && selectedNodes.add(node);
        // message  = document.getElementById('message')
        // message.innerHTML = ''
      }
      // message  = document.getElementById('message')
      // message.innerHTML += "<p>" + node.date + ' ' + node.text + "</p>" + "<hr>";
      Graph.nodeColor(Graph.nodeColor()); // update color of selected nodes
    })

    Graph.onNodeDrag((node, translate) => {

      if (selectedNodes.has(node)) { // moving a selected node
        [...selectedNodes]
          .filter(selNode => selNode !== node) // don't touch node being dragged
          .forEach(node => ['x', 'y', 'z'].forEach(coord => node[`f${coord}`] = node[coord] + translate[coord])); // translate other nodes by same amount
      }
    })
    Graph.onNodeDragEnd(node => {

      if (selectedNodes.has(node)) { // finished moving a selected node
        [...selectedNodes]
          .filter(selNode => selNode !== node) // don't touch node being dragged
          .forEach(node => ['x', 'y', 'z'].forEach(coord => node[`f${coord}`] = undefined)); // unfix controlled nodes
      }
    });
  }

  else if(chbox.checked == false && Array_togl.length == 0  && Array_togl_channel == 0){
    // Message_views()
    checkbox_message.innerHTML = "<b>" + 'По группам' + "</b>";
    group_collor = 'group'
    Graph.linkAutoColorBy(group_collor)
  }

  Graph.nodeAutoColorBy(group_collor) 

  
  if(Array_togl.length != 0){
    Graph.linkAutoColorBy('group')
  }
  
  if(Array_togl_channel.length != 0){
    Graph.linkAutoColorBy('group')
  }

  setTimeout(() => {  
    Color_graph()

  }, 400);
}


// function Message_views(){

//   message  = document.getElementById('message')
//   message.innerHTML = ''

//   for (var i = 0; i < result.nodes.length; i++){
//     message  = document.getElementById('message')
//     message_views = "<p>" + result.nodes[i].date + ' ' + String(result.nodes[i].text) + "</p>" + "<hr>"
//     array_message_views.push(message_views)
//     // message.innerHTML += "<p>" + String(result.nodes[i].text) + "</p>" + "<hr>";

//     if(i==result.nodes.length-1){
//       message.innerHTML = array_message_views.join('')
//       console.log('закончили')
//     }
//   }
// }
var test = []
function Color_graph(){
  type_color.innerHTML = ''

  for (var i = 0; i < result.nodes.length; i++){
    if (array_color.includes(result.nodes[i].color) == false){
      array_color.push(result.nodes[i].color)
      
      type_color  = document.getElementById('type_color')
      type_color.innerHTML += "<p style= 'color: " + (result.nodes[i].color).replace(/'/g, '') + "'>" + result.nodes[i].group + "</p>" + "<hr>";
    }
  }

 
}



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
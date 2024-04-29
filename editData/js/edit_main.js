fileData = 0;
var newMass = {};

function startApp(){
    get_fileData()
}


// создание списка файлов из папки для селектора
function fillSelectorFile(data){
    var FileSelect = document.getElementById('FileSelect');
    for(var i = 0; i < data.result.length; i++){
        var chi = document.createElement("option");
        chi.textContent = data.result[i].split('.')[0];
        FileSelect.appendChild(chi);
    }    
}

// выгрузка данных файла и создание таблиц для него
function read_web_document(data){
	fileData = data;

	for(var i = 0; i < Object.keys(fileData).length; i++){
		//Создать столько таблиц, сколько детей в основном документе;        
		addtable(fileData , i);
	}
}

function addtable(fileData , counter){
    var name = Object.keys(fileData)[counter];
    var tableMain = document.getElementById('mainClone').cloneNode(true);
    tableMain.id = name;
    tableMain.children[0].textContent = name;
    tableMain.style.display = '';    
 
    if(fileData[name].length > 0){
        var tableK = Object.keys(fileData[name][0]);
        var row = tableMain.children[1].children[0].cloneNode(true);
        row.style.display = '';
        row.setAttribute('class', 'TableTitle');
        tableMain.children[1].appendChild(row);
        // создание заголовка для строк
        for(var i = 0; i < tableK.length; i++){
            var cell = row.children[0].cloneNode(true);
            cell.style.display = '';
            cell.textContent = tableK[i];
            row.appendChild(cell)

        }
        // создание остальных строк
        for(var i = 0; i < fileData[name].length; i++){
            var row = tableMain.children[1].children[0].cloneNode(true);
            row.style.display = '';
            // заполнение ячеек строк
            for(var j = 0; j < tableK.length; j++){
                var cell = row.children[0].cloneNode(true);
                cell.style.display = '';
                var value = fileData[name][i][tableK[j]];
                cell.textContent = value;
                row.appendChild(cell)
            }            
            tableMain.children[1].appendChild(row);
        }
    }

    else{
        var tableK = Object.keys(fileData[name]);
        var row = tableMain.children[1].children[0].cloneNode(true);
        row.style.display = '';
        row.setAttribute('class', 'TableTitle');
        tableMain.children[1].appendChild(row);
        // создание заголовка для строк
        for(var i = 0; i < tableK.length; i++){
            var cell = row.children[0].cloneNode(true);
            cell.style.display = '';
            cell.textContent = tableK[i];
            row.appendChild(cell)

        }
        // создание остальных строк
        for(var i = 0; i < tableK.length; i++){
            var row = tableMain.children[1].children[0].cloneNode(true);
            row.style.display = '';
            // заполнение ячеек строк
            for(var j = 0; j < tableK.length; j++){
                var cell = row.children[0].cloneNode(true);
                cell.style.display = '';
                var value = fileData[name][tableK[j]];
                cell.textContent = value;
                row.appendChild(cell)
            }            
            tableMain.children[1].appendChild(row);
        }
    }
    mainTablesSpace.appendChild(tableMain);
}

function saveWebDocument(){
    var mainTablesSpace = document.getElementById('mainTablesSpace');    
    for(var i = 1; i < mainTablesSpace.children.length; i++){
        var oblect = mainTablesSpace.children[i];
        var TableTitle = oblect.children[1].children[1];
        newMass[oblect.id] = [];
        for(var j = 0; j < oblect.children[1].children.length-2; j++){
            newMass[oblect.id].push({});
            for(var k = 1; k < TableTitle.children.length; k++){
                newMass[oblect.id][j][TableTitle.children[k].textContent] = 0;
            }
        }
    }
    for(var i = 1; i < mainTablesSpace.children.length; i++){
        var oblect = mainTablesSpace.children[i];
        var TableTitle = oblect.children[1].children[1];
        for(var j = 2; j < oblect.children[1].children.length; j++){
            for(var k = 1; k < oblect.children[1].children[j].children.length; k++){
                newMass[oblect.id][j-2][TableTitle.children[k].textContent] = oblect.children[1].children[j].children[k].textContent;
            }
            
        }
    }
    sendWebDocument();
}
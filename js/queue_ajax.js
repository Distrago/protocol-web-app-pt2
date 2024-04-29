var SavePath;
var UploadPath;
//Сохранение протокола
function save_protocol(){
	if(protocolRequirements.upload_data){
		SavePath = "Protocol";
		get_clientForSaveCheck();
	}
	else{
		alert("Пожалуйста предварительно сохраните требования");
	}
}
//Сохранение требований
function save_requirements(){
	//Проверка наличия компонетов и фракций в требованиях
	if(protocolRequirements.components.length == 0)
		alert("Задайте значения для компонентов! (Создайте компонент!)")
	if(protocolRequirements.fractions.length == 0)
		alert("Задайте значения для фракций! (Создайте фракцию!)")
	//Прповерка для запуска процесса записи
	if (protocolRequirements.components.length > 0 && protocolRequirements.fractions.length > 0){
		SavePath = "Requirements";
		get_clientForSaveCheck();
	}
}
//Загрузка протокола
function upload_protocol(){
	UploadPath = "Protocol";
	get_clientForSaveCheck();
}
//Сохранение требований
function upload_requirements(){
	UploadPath = "Requirements";
	get_clientForSaveCheck();
}
function get_clientForSaveCheck(){
	overlay.style.display = "flex";
	headerTooltip.children[1].style.display = "none";
	
	$.getJSON($SCRIPT_ROOT + '/clientForSaveCheck',{	
	}, function(data){
		var clientCount = data.result;
		if(clientCount == 0){
			get_clientForSavePush();
		}
		else{
			overlay.children[0].textContent = "Вы " + Number(clientCount+1) + " в очереди, пожалуйста, подождите. Идет загрузка данных..."
			overlay.style.display = "flex";
			setTimeout(get_clientForSaveCheck, 2000);
		}
	})
	.fail(function(){
		get_clientForSaveCheck();
	});
}
function get_clientForUploadCheck(){
	overlay.style.display = "flex";
	headerTooltip.children[1].style.display = "none";
	
	$.getJSON($SCRIPT_ROOT + '/clientForUploadCheck',{	
	}, function(data){
		var clientCount = data.result;
		if(clientCount == 0){
			get_clientForUploadPush();
		}
		else{
			overlay.children[0].textContent = "Вы " + Number(clientCount+1) + " в очереди, пожалуйста, подождите. Идет загрузка данных..."
			overlay.style.display = "flex";
			setTimeout(get_clientForUploadCheck, 2000);
		}
	})
	.fail(function(){
		get_clientForUploadCheck();
	});
}

function get_clientForSavePush(){
	$.getJSON($SCRIPT_ROOT + '/clientForSavePush',{	
	}, function(data){
		var clientCount = data.result;
		overlay.children[0].textContent = "Вы " + clientCount + " в очереди, пожалуйста, подождите. Идет загрузка данных..."
		overlay.style.display = "flex";
		if(SavePath == "Protocol")
			edit_protocol();
		else
			edit_requirements();
	})
	.fail(function(){
		get_clientForSavePush();
	});
}
function get_clientForUploadPush(){
	$.getJSON($SCRIPT_ROOT + '/clientForUploadPush',{	
	}, function(data){
		var clientCount = data.result;
		overlay.children[0].textContent = "Вы " + clientCount + " в очереди, пожалуйста, подождите. Идет загрузка данных..."
		overlay.style.display = "flex";
		headerTooltip.children[1].style.display = "none";
	});
}

function get_clientForSaveRemove(){
	$.getJSON($SCRIPT_ROOT + '/clientForSaveRemove',{	
	}, function(data){
		console.log("Сервер завершил операцию клиента")
		overlay.style.display = "none";
		headerTooltip.children[1].style.display = "";
		overlay.children[0].textContent = "Пожалуйста подождите загрузки данных.";
	})
	.fail(function(){
		get_clientForSaveRemove();
	});
}
function get_clientForUploadRemove(){
	$.getJSON($SCRIPT_ROOT + '/clientForUploadRemove',{	
	}, function(data){
		console.log("Сервер завершил операцию клиента")
		overlay.style.display = "none";
		headerTooltip.children[1].style.display = "";
		overlay.children[0].textContent = "Пожалуйста подождите загрузки данных.";
	});
}
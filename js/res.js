var requirements = {
	id_requirements: "id_requirements",
	exit: "100.000",
	purity: "purity",
	capacity: "capacity",
	components: [],
	fractions: []
}
var protocol = {
	id_protocol: "id_protocol",
	id_requirements: "id_requirements",
	id_creater: "id_enginere",
	id_responsible: "id_enginere",
	company_name: "company_name",
	create_date: "create_date",
	//Внешние параметры протокола
	equipment_machine: "equipment_machine",
	configuration: "configuration",
	sorting: [],
	sourceProduct: {
		exit: "100.000",
		purity: "purity",
		capacity: "capacity",
		image: "image",
		components : []
	}
}

function page_onload(){
	var queryString = location.search;
	if(queryString != ""){
		var __id__ = location.search.substr(4);
		get_protocolData(__id__);
	}
	read_machine();
	read_configuration();
	read_manager();
}

//Генерация компонентов и фракций требований
function generateRequirementsFractions(){
	requirements.fractions.push({
		fractionName: "fractionName",
		exit: "exit",
		purity: "purity",
		capacity: "capacity",
		image: "image",
		components : [],
	});
}
function generateRequirementsComponents(){
	requirements.components.push({
		product_name: "product_name",
		value: "value",
		flag_1: "flag_1",
		flag_2: "flag_2",
		image: "image"
	});
	
	for(var i=0; i < requirements.fractions.length; i++){
		requirements.fractions[i].components.push({
			product_name: "product_name",
			value: "value",
			flag_1: "flag_1",
			flag_2: "flag_2",
			image: "image"
		});
	}
}
//Генерация компонентов и фракции протоколов
function generateProtocolSorting(){
	protocol.sorting.push({
		trays_number: 0,
		capacity: "capacity",
		//значения прохода сортировки
		accept_name: "accept_name",
		accept_name_id: "accept_name_id",
		accept_exit: "accept_exit",
		accept_purity: "accept_purity",
		accept_mass: "accept_mass",
		accept_img: "accept_img",
		//значения отбоя сортировки
		reject_name: "reject_name",
		reject_name_id: "reject_name_id",
		reject_exit: "reject_exit",
		reject_purity: "reject_purity",
		reject_mass: "reject_mass",
		reject_img: "reject_img",
		//данные по компанентам сортировки
		accept_components: [],
		reject_components : [],
		inbox_fraction : "inbox_fraction"
	});
	//добавление нового компанета для всех сортировок
	for(var id=0; id<protocol.sorting.length; id++){
		protocol.sorting[id].accept_components.push({
			product_name: "product_name",
			value: "value",
			flag_1: "flag_1",
			flag_2: "flag_2",
		});
		protocol.sorting[id].reject_components.push({
			product_name: "product_name",
			value: "value",
			flag_1: "flag_1",
			flag_2: "flag_2",
		});
	}
}
function generateProtocolComponents(){
	protocol.sourceProduct.components.push({
		product_name: "product_name",
		value: "value",
		flag_1: "flag_1",
		flag_2: "flag_2",
		image: "image"
	});
}
//Функции заполнение результата
function reviewTitle(){
	protocolNumber.textContent = protocol.id_requirements + "_" + protocol.id_protocol;
	companyName.textContent = protocol.company_name != "" ? protocol.company_name : "не установлено";
	mainProduct.textContent = protocol.sourceProduct.components[0].product_name;
	createDateProtocol.textContent = protocol.create_date;
	try{
		userManagerName.textContent = search_user_info(protocol.id_creater).name;
	}
	catch{
		userManagerName.textContent = "не установлено";
	}
	try{
		userPerformerName.textContent = search_user_info(protocol.id_responsible).name;
	}
	catch{
		userPerformerName.textContent = "не установлено";
	}
	
	try {
		equipmentMachine.textContent = list_machine[protocol.equipment_machine].machineName + " " + list_configuration[protocol.configuration].configuration;
	}
	catch (error){
		if(error.machineName == undefined)
			equipmentMachine.textContent = "не определено";
		else if(error.configuration == undefined)
			equipmentMachine.textContent = list_machine[protocol.equipment_machine].machineName + " не установлено";
	}
		
}

function reviewSourceDate(){
	//Основные данные по исходному продукту
	var sourceProductImage = sourceColumn.children[0].children[0];
	var sourceProductTitle = sourceColumn.children[1].children[0];
	var sourceProductTitleDescription = sourceColumn.children[1].children[1];

	var sourceProductPurity = sourceMainValues.children[0].children[0].children[0];
	var sourceProductExit = sourceMainValues.children[1].children[0].children[0];
	var sourceProductCapacity = sourceMainValues.children[2].children[0].children[0];
	
	var requirementsSourceProductPurity = sourceMainValues.children[0].children[1].children[0];
	var requirementsSourceProductExit = sourceMainValues.children[1].children[1].children[0];
	var requirementsSourceProductCapacity = sourceMainValues.children[2].children[1].children[0];
	
	var inboxName = checkInboxFraction(protocol.sorting[0].inbox_fraction);
	
	//Заполнение данных
	sourceProductImage.style.backgroundImage = "url('"+protocol.sourceProduct.image+"')";
	sourceProductTitle.textContent = "Исходный продукт";
	
	//Исходные данные протокола
	sourceProductPurity.textContent = protocol.sourceProduct.purity;
	sourceProductExit.textContent = protocol.sourceProduct.exit;
	sourceProductCapacity.textContent = protocol.sorting[0].capacity;
	//Исходные данные требований
	requirementsSourceProductPurity.textContent = requirements.purity;
	requirementsSourceProductExit.textContent = requirements.exit;
	requirementsSourceProductCapacity.textContent = requirements.capacity;
	//Востановка цвета
	requirementsSourceProductPurity.style.color = "gray";
	requirementsSourceProductExit.style.color = "gray";
	requirementsSourceProductCapacity.style.color = "gray";
	
	
	//Основные данные по компоненту исходного продука
	for(var i = 0; i < protocol.sourceProduct.components.length; i++){
		var sourceProductComponentsTitle = componentTitles.children[i];
		var sourceProductComponentsValue = sourceComponentValues.children[i];
		
		//Отображение блока
		sourceProductComponentsTitle.style.display = "flex";
		sourceProductComponentsValue.style.display = "flex";
		//Разбиение имени и описания
		var product_description = protocol.sourceProduct.components[i].product_name.split("(");
		if(product_description.length > 1)
			product_description[1] = "("+product_description[1];
		else
			product_description[1] = "";
		
		//Запись данных	протокола
		sourceProductComponentsTitle.children[0].children[0].style.backgroundImage = "url('"+protocol.sourceProduct.components[i].image+"')";
		sourceProductComponentsTitle.children[1].children[0].textContent = product_description[0];
		sourceProductComponentsTitle.children[1].children[1].textContent = product_description[1];
		sourceProductComponentsValue.children[0].children[0].textContent = protocol.sourceProduct.components[i].value;
		sourceProductComponentsValue.children[0].children[1].style.display = protocol.sourceProduct.components[i].flag_1 ? "flex" : "none";
		sourceProductComponentsValue.children[1].children[1].style.display = protocol.sourceProduct.components[i].flag_2 ? "none" : "flex";
		//Запис данных требований
		for(var j = 0; j < requirements.components.length; j++){
			if(protocol.sourceProduct.components[i].product_name == requirements.components[j].product_name){
				sourceProductComponentsValue.children[1].children[0].textContent = requirements.components[j].value;
				sourceProductComponentsValue.children[1].children[0].style.color = "gray";
				break;
			}
			else{
				sourceProductComponentsValue.children[1].children[0].textContent = "-";
				sourceProductComponentsValue.children[1].children[0].style.color = "gray";
			}
		}
	}
	
}
function reviewFractionDate(){
	var colum_id = 1;
	var temp = Number(protocol.sourceProduct.exit);
	for(var i = 0; i < protocol.sorting.length; i++){
		if(protocol.sorting[i].accept_name_id != 0){
			//Данные для фракций проход
			var acceptColums = document.getElementById("fractionColumn_"+colum_id);
		
			var acceptElementImage = acceptColums.children[0].children[0];
			var acceptElementTitle = acceptColums.children[1].children[0];
			var acceptElementTitleDescription = acceptColums.children[1].children[1];
			
			var acceptMainValue = document.getElementById("fractionMainValues_"+colum_id);
			var acceptElementPurity = acceptMainValue.children[0].children[0].children[0];
			var acceptElementExit = acceptMainValue.children[1].children[0].children[0];
			var acceptElementCapacity = acceptMainValue.children[2].children[0].children[0];
			
			var requirementsAcceptElementPurity = acceptMainValue.children[0].children[1].children[0];
			var requirementsAcceptElementExit = acceptMainValue.children[1].children[1].children[0];
			var requirementsAcceptElementCapacity = acceptMainValue.children[2].children[1].children[0];
			
			//Заполнение данных прохода
			acceptElementImage.style.backgroundImage = "url('"+protocol.sorting[i].accept_img+"')";
			acceptElementTitle.textContent = protocol.sorting[i].accept_name
			//acceptElementTitleDescription.textContent = "";
			
			acceptElementPurity.textContent = protocol.sorting[i].accept_purity;
			acceptElementExit.textContent = Number((protocol.sorting[i].accept_mass * protocol.sorting[i].trays_number) / (protocol.sorting[0].capacity * protocol.sorting[0].trays_number) * 100).toFixed(3);
			acceptElementCapacity.textContent = Number(protocol.sorting[0].capacity * acceptElementExit.textContent / 100).toFixed(3);
			
			temp = Number(temp - acceptElementExit.textContent).toFixed(3);
			
			//Данные из требований
			var id = Number(protocol.sorting[i].accept_name_id);
			requirementsAcceptElementPurity.textContent = requirements.fractions[id-1].purity;
			requirementsAcceptElementExit.textContent = requirements.fractions[id-1].exit;
			requirementsAcceptElementCapacity.textContent = requirements.fractions[id-1].capacity;
			
			acceptColums.style.display = "flex";
			
			for(var k = 0; k < protocol.sourceProduct.components.length; k++){
				var acceptComponents = document.getElementById("fractionComponentValues_"+colum_id);
				acceptComponents.children[k].children[0].children[0].textContent = protocol.sorting[i].accept_components[k].value;
				acceptComponents.children[k].children[0].children[0].style.color = protocol.sorting[i].accept_components[k].flag_2 ? "red" : "black";
				acceptComponents.children[k].children[0].children[1].style.display = protocol.sorting[i].accept_components[k].flag_1 ? "flex" : "none";

				//Данные из требований
				if(checkComponentName(protocol.sourceProduct.components[k].product_name)[0]){
					var id_product = checkComponentName(protocol.sourceProduct.components[k].product_name)[1];
					acceptComponents.children[k].children[1].children[0].textContent =  requirements.fractions[id-1].components[id_product].value;
					acceptComponents.children[k].children[1].children[0].style.color =  requirements.fractions[id-1].components[id_product].flag_2 ? "red" : "gray";
				}
				else{
					acceptComponents.children[k].children[1].children[0].textContent = "-";
				}
				
				acceptComponents.children[k].style.display = "flex";
				
			}
			
			colum_id++;
		}
		if(protocol.sorting[i].reject_name_id != 0){
			var rejectColums = document.getElementById("fractionColumn_"+colum_id);
		
			var rejectElementImage = rejectColums.children[0].children[0];
			var rejectElementTitle = rejectColums.children[1].children[0];
			var rejectElementTitleDescription = rejectColums.children[1].children[1];
			
			var rejectMainValue = document.getElementById("fractionMainValues_"+colum_id);
			var rejectElementPurity = rejectMainValue.children[0].children[0].children[0];
			var rejectElementExit = rejectMainValue.children[1].children[0].children[0];
			var rejectElementCapacity = rejectMainValue.children[2].children[0].children[0];
			
			var requirementsRejectElementPurity = rejectMainValue.children[0].children[1].children[0];
			var requirementsRejectElementExit = rejectMainValue.children[1].children[1].children[0];
			var requirementsRejectElementCapacity = rejectMainValue.children[2].children[1].children[0];
			
			//Заполнение данных отбоя
			rejectElementImage.style.backgroundImage = "url('"+protocol.sorting[i].reject_img+"')";
			rejectElementTitle.textContent = protocol.sorting[i].reject_name
			//rejectElementTitleDescription.textContent = "";
			
			rejectElementPurity.textContent = protocol.sorting[i].reject_purity;
			rejectElementExit.textContent = Number((protocol.sorting[i].reject_mass * protocol.sorting[i].trays_number) / (protocol.sorting[0].capacity * protocol.sorting[0].trays_number) * 100).toFixed(3);
			rejectElementCapacity.textContent = Number(protocol.sorting[0].capacity * rejectElementExit.textContent / 100).toFixed(3);
			
			temp = Number(temp - rejectElementExit.textContent).toFixed(3);
			
			//Данные из требований
			var id = Number(protocol.sorting[i].reject_name_id);
			requirementsRejectElementPurity.textContent = requirements.fractions[id-1].purity;
			requirementsRejectElementExit.textContent = requirements.fractions[id-1].exit;
			requirementsRejectElementCapacity.textContent = requirements.fractions[id-1].capacity;
			
			rejectColums.style.display = "flex";
			
			for(var k = 0; k < protocol.sourceProduct.components.length; k++){
				var rejectComponents = document.getElementById("fractionComponentValues_"+colum_id);
				rejectComponents.children[k].children[0].children[0].textContent = protocol.sorting[i].reject_components[k].value;
				rejectComponents.children[k].children[0].children[0].style.color = protocol.sorting[i].reject_components[k].flag_2 ? "red" : "black";
				rejectComponents.children[k].children[0].children[1].style.display = protocol.sorting[i].reject_components[k].flag_1 ? "flex" : "none";
				
				//Данные из требований
				if(checkComponentName(protocol.sourceProduct.components[k].product_name)[0]){
					var id_product = checkComponentName(protocol.sourceProduct.components[k].product_name)[1];
					rejectComponents.children[k].children[1].children[0].textContent =  requirements.fractions[id-1].components[id_product].value;
					rejectComponents.children[k].children[1].children[0].style.color =  requirements.fractions[id-1].components[id_product].flag_2 ? "red" : "gray";
				}
				else{
					rejectComponents.children[k].children[1].children[0].textContent = "-";
				}
				
				rejectComponents.children[k].style.display = "flex";
			}
			colum_id++;;
		}
	}
	
	if(Number(temp) > 0){
		sourceMainValues.children[1].children[0].children[0].textContent += "(" + temp + ")";
		sourceMainValues.children[2].children[0].children[0].textContent += "(" + Number(protocol.sorting[0].capacity / 100 * temp).toFixed(3)  + ")";
	}
}
function checkComponentName(product_name){
	var value = false;
	var id = null;
	for(var i = 0; i < requirements.components.length; i++){
		if(!value){
			value = requirements.components[i].product_name == product_name ? true : false;
			id = i;
		}
	}
	return [value, id];
}
//Функции схемы сортировки
function sortingDiagram(){
	for(var i = 1; i <= protocol.sorting.length; i++){
		//Создание строки для описания процесса сортировки
		var clone = sorting_0.cloneNode(true);
		var rowID = i < 9 ? "0"+i : i; 
		clone.id = "sorting_" + i;
		//Ячейки строки
		var rowName = clone.children[0].children[0];
		var inboxFractionBlock = clone.children[1];
		var inboxFractionName = clone.children[1].children[0];
		var capacityTray = clone.children[2].children[0];
		var numberTray = clone.children[3].children[0];
		var acceptOutboxFraction = clone.children[4].children[0];
		var rejectOutboxFraction = clone.children[4].children[1];
		var acceptExit = clone.children[5].children[0];
		var rejectExit = clone.children[5].children[1];
		var acceptPurity = clone.children[6].children[0];
		var rejectPurity = clone.children[6].children[1];
		var acceptFinalFraction = clone.children[7].children[0];
		var rejectFinalFraction = clone.children[7].children[1];
		
		var inboxName = checkInboxFraction(protocol.sorting[i-1].inbox_fraction);
		//Заполнение ячеек сортировки (без входящих фракции)
		rowName.textContent = rowID;
		capacityTray.textContent = Number(protocol.sorting[i-1].capacity / 1000).toFixed(3);
		numberTray.textContent = protocol.sorting[i-1].trays_number;
		acceptOutboxFraction.textContent = "Проход " + rowID;
		rejectOutboxFraction.textContent = "Отбой " + rowID;
		acceptExit.textContent = Number(protocol.sorting[i-1].accept_mass / 1000 * protocol.sorting[i-1].trays_number).toFixed(3); 
		rejectExit.textContent = Number(protocol.sorting[i-1].reject_mass / 1000 * protocol.sorting[i-1].trays_number).toFixed(3); 
		acceptPurity.textContent = protocol.sorting[i-1].accept_purity; 
		rejectPurity.textContent = protocol.sorting[i-1].reject_purity; 
		acceptFinalFraction.textContent = protocol.sorting[i-1].accept_name_id != 0 ? protocol.sorting[i-1].accept_name : "-"; 
		rejectFinalFraction.textContent = protocol.sorting[i-1].reject_name_id != 0 ? protocol.sorting[i-1].reject_name : "-"; 
		
		sorting_diagram.appendChild(clone);
		
		//заполнение ячеек входящих фракций
		for(var j = 0; j < inboxName.length; j++){
			var cloneFractionName = inboxFractionName.cloneNode(true);
			cloneFractionName.textContent = inboxName[j];
			cloneFractionName.style.display = "";
			inboxFractionBlock.appendChild(cloneFractionName);
		}
		
		clone.style.display = "flex";
	}	
}
function checkInboxFraction(inboxList){
	var inboxName = [];
	//Проверка на перую сортировку
	if(inboxList == protocol.sorting[0].inbox_fraction)
		inboxName.push("Исходная смесь");
	
	for(var i=0; i<inboxList.length; i++){
		var fractionName = null;
		if(inboxList[i].accept)
			var fractionName = i < 8 ? "Проход 0" + Number(i+1) : "Проход " + Number(i+1);
		if(inboxList[i].reject)
			var fractionName = i < 8 ? "Отбой 0" + Number(i+1) : "Отбой " + Number(i+1);
		if(fractionName != null)
			inboxName.push(fractionName);
	}

	return inboxName;
}
function returnSortingFractionCapacity(inboxName){
	var capacity = 0;
	for(var i = 0; i < inboxName.length; i++){
		if(inboxName[i] == "Исходная смесь"){
			capacity += protocol.sorting[0].capacity
		}
		else{
			var splitValue = inboxName[i].split(" ");
			var component = splitValue[0];
			var id = Number(splitValue[1]) - 1;
			
			capacity -= component == "Проход" ? Number(protocol.sorting[id].accept_mass) : Number(protocol.sorting[id].reject_mass);
		}
	}
	
	if(capacity != protocol.sorting[0].capacity && Number(capacity) > 0)
		capacity = Number(protocol.sorting[0].capacity).toFixed(3) + "(" + Number(capacity).toFixed(3) + ")";
	else
		capacity = Number(capacity).toFixed(3);
	
	return capacity;
}


//превью(попап) картинок эеватора//

function spoilerRun(element){
	spoilerImg.src = element.style.backgroundImage.split('"')[1] != null ? element.style.backgroundImage.split('"')[1] : "/static/img/result/test.jpg";
	overlay1.style.display = "flex";
	var spoiler = overlay1.children[0];
	var height = screen.height
	var width = screen.width
	if (height <= width)
		var resolution = height/width;
	else
		var resolution = 1;

	spoiler.style.width = 900 * resolution;
	spoiler.style.height = 900 * resolution;
		
}

function spoilerClose(){
	overlay1.style.display = "none";
}
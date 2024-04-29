//Таблицы
var productNameList = [];
var productTypeList = [];
var weedNameList = [];
var weedClassList = []
var descriptionList = [];

var componentPartsList = [];
var componentStatusList = [];
var componentColorList = [];

//Протокол
var protocol = [];

var componentElementClassifier = {
	classifierType: 0,
	classifierProduct: {
		useADD: false,
		mainOptions:{
			industryID: 9999,
			groupProductID: 9999,
			productID: 9999,
			descriptionID: 9999,
			productTypeID: 9999,
			productSortID: 9999,
			purposeID: 9999,
			GOST_ID: 9999,
			partsID: 9999,
			statusID: 9999
		},
		addCustomOption: ""
	},
	classifierWeed:{
		useADD: false,
		mainOptions:{
			industryID: 9999,
			categoryID: 9999,
			classWeedID: 9999,
			weedNameID: 9999,
			descriptionID: 9999,
			colorID: 9999
		},
		addCustomOption: "" 
	}
};

function startApp(){
	read_industry();
	get_protocolTop();
	
	//Временные переключатели
	document.getElementsByClassName("toggle")[0].addEventListener("click", switchToggle);
	document.getElementsByClassName("toggle")[1].addEventListener("click", switchToggle);
	document.getElementsByClassName("toggle")[2].addEventListener("click", switchToggle);
	switchDropdownMass(massDropdown);
}
function changePlaceholder(){
	//var elementID = event.target.id
	//document.getElementById("clsInput_test").value = document.getElementById(elementID).value;
}
function Dropdown() {
	var dropdown = document.getElementById("clsDropdown");
	var btn = document.getElementById("clsButton_test");
	var otherCheckbox=document.getElementById("otherCheckbox");
	
	if (dropdown.style.display=="none"){
		dropdown.style.display="flex";
		btn.style.background = "url(/static/img/classifier/select01.png)no-repeat";
		btn.style.backgroundSize = "contain";
		clsInput_test.value = ""
		classifierInpurResult.style.display="flex";
		otherCheckbox.style.display="flex";
	}
	else{
		dropdown.style.display = "none";
		btn.style.background = "url(/static/img/classifier/select.png)no-repeat";
		btn.style.backgroundSize = "contain";
		resultTextView();
		classifierInpurResult.style.display="none";
		otherCheckbox.style.display="none";
	}
}
function StartInput(){
	DoropdownOptionClear();
	
	var inputBlock = clsInput_test;
	if(inputBlock.value.length == 0){
		DropdownOptionDefault()
	}
	else{
		DropdownSearch()
	}
	var dropdown = document.getElementById("clsDropdown");
	dropdown.style.display="flex";
}
function DoropdownOptionClear(){
	var dropdownBlock = clsDropdown;
	var dropdownOptions = dropdownBlock.children[0];
	var dropdownClassifier = dropdownBlock.children[1];
	//Стартовая отчиска от лишних элементов
	for(var i = dropdownOptions.children.length - 1; i > 0; i--){
		dropdownOptions.children[i].remove();
	}
}
function setupTableInfo(){
	//Продукты
	for(var i = 0; i < list_product.length; i++){
		productNameList.push({
			"id": list_product[i].id_product,
			"name": list_product[i].productName
		});
	}
	//Засорители
	for(var i = 0; i < list_weed.length; i++){
		weedNameList.push({
			"id": list_weed[i].id_weed,
			"name": list_weed[i].weedName
		});
	}
	//Тип продукта(описание);
	for(var i = 0; i < list_productType.length; i++){
		if(list_productType[i].productTypeName != "-"){
			productTypeList.push({
				"id": list_productType[i].id_productType,
				"name": list_productType[i].productTypeName
			});
		}
	}
	//Классы засорителя
	for(var i = 0; i < list_classWeed.length; i++){
		weedClassList.push({
			"id": list_classWeed[i].id_class,
			"name": list_classWeed[i].className
		});
	}
	//Описания семян(зерна)
	for(var i = 0; i < list_descriptionSeed.length; i++){
		descriptionList.push({
			"id": list_descriptionSeed[i].id_description,
			"name": list_descriptionSeed[i].descriptionName
		});
	}
	//Дополнительные описания для компонетов(продуктов и засорителей)
	for(var i = 0; i < list_productPart.length; i++){
		componentPartsList.push({
			"id": list_productPart[i].id_number,
			"name": list_productPart[i].productPart
		})
	}
	for(var i = 0; i < list_productStatus.length; i++){
		componentStatusList.push({
			"id": list_productStatus[i].id_number,
			"name": list_productStatus[i].productStatus
		})
	}
	for(var i = 0; i < list_productColor.length; i++){
		componentColorList.push({
			"id": list_productColor[i].id_number,
			"name": list_productColor[i].productColor
		})
	}
}
function returnTableType(tableID){
	switch(tableID){
		case productNameList:
			var id = "product";
			break;
		case productTypeList:
			var id = "productType";
			break;
		case weedNameList:
			var id =  "weed";
			break;
		case weedClassList:
			var id =  "weedClass";
			break;
		case descriptionList:
			var id = "discription";
			break;
		case componentPartsList:
			var id = "parts";
			break;
		case componentStatusList:
			var id = "status";
			break;
		case componentColorList:
			var id = "color";
			break;
	}
	return id;
}

function DropdownOptionDefault(){
	var dropdownBlock = clsDropdown;
	var dropdownOptions = dropdownBlock.children[0];
	var dropdownOptionClone = dropdownBlock.children[0].children[0];
	var dropdownClassifier = dropdownBlock.children[1];
	
	var listElements = [productNameList, weedNameList, productTypeList, weedClassList, descriptionList, componentPartsList, componentStatusList, componentColorList];
	
	//Проверки
	for(var i = 0; i < classifierInpurResult.children.length; i++){
		var resultType = classifierInpurResult.children[i].id.split('_')[1];
		if(resultType == "product"){
			var ID_product = Number(classifierInpurResult.children[i].id.split('_')[2]);
			listElements = checkResultOption(listElements, productNameList);
			listElements = checkResultOption(listElements, weedNameList);
			listElements = checkResultOption(listElements, componentColorList);
		}
		if(resultType == "weed"){
			var ID_weed = Number(classifierInpurResult.children[i].id.split('_')[2]);
			listElements = checkResultOption(listElements, productNameList);
			listElements = checkResultOption(listElements, weedNameList);
			listElements = checkResultOption(listElements, descriptionList);
			listElements = checkResultOption(listElements, componentPartsList);
			listElements = checkResultOption(listElements, componentStatusList);
		}
		if(resultType == "productType"){
			var ID_productType = Number(classifierInpurResult.children[i].id.split('_')[2]);
			listElements = checkResultOption(listElements, weedNameList);
			listElements = checkResultOption(listElements, productTypeList);
		}
		if(resultType == "weedClass"){
			var ID_weedClass = Number(classifierInpurResult.children[i].id.split('_')[2]);
			listElements = checkResultOption(listElements, productNameList);
			listElements = checkResultOption(listElements, weedClassList);
			listElements = checkResultOption(listElements, descriptionList)
		}
		if(resultType == "discription"){
			listElements = checkResultOption(listElements, descriptionList);
			listElements = checkResultOption(listElements, weedNameList);
		}
		if(resultType == "parts"){
			listElements = checkResultOption(listElements, componentPartsList);
		}
		if(resultType == "status"){
			listElements = checkResultOption(listElements, componentStatusList);
		}
		if(resultType == "color"){
			listElements = checkResultOption(listElements, componentColorList);
		}
	}
	
	for(var i = 0; i < listElements.length; i++){
		var __list = listElements[i];	
		if(__list == productNameList || __list == weedNameList){
			if(ID_productType == null && ID_weedClass == null){
				for(var k = 0; k < list_protocolTop.length; k++){
					for(var el = 0 ; el < __list.length; el++){
						if(list_protocolTop[k] == __list[el].name){
							var option = dropdownOptionClone.cloneNode(true);
							option.style.display = "";
							option.children[0].setAttribute('name', returnTableType(listElements[i]));
							option.children[0].id = returnTableType(listElements[i]) + "_" + __list[el].id;
							option.children[0].value = __list[el].name;
							dropdownOptions.appendChild(option);
							
							//option.children[1].children[0].addEventListener("change", addResultOption);
							option.children[0].addEventListener("click", addResultOption);
							break;
						}
					}
				}
			}
			else if(ID_productType != null){
				var id = list_productType[ID_productType].id_product;
				var option = dropdownOptionClone.cloneNode(true);
				option.style.display = "";
				option.children[0].setAttribute('name', "product");
				option.children[0].id =  "product_" + list_product[id].id_product;
				option.children[0].value = list_product[id].productName;
				dropdownOptions.appendChild(option);
				
				//option.children[1].children[0].addEventListener("change", addResultOption);
				option.children[0].addEventListener("click", addResultOption);
			}
			else if (ID_weedClass != null){
				for(var k = 0; k < list_weed.length; k++){
					if(list_weed[k].id_class == ID_weedClass){
						var option = dropdownOptionClone.cloneNode(true);
						option.style.display = "";
						option.children[0].setAttribute('name', "weed");
						option.children[0].id = "weed_" + list_weed[k].id_weed;
						option.children[0].value = list_weed[k].weedName;
						dropdownOptions.appendChild(option);
						
						//option.children[1].children[0].addEventListener("change", addResultOption);
						option.children[0].addEventListener("click", addResultOption);
					}
				}
			}
		}
		else if(__list == productTypeList && ID_product != null){
			for(var k = 0; k < list_productType.length; k++){
				for(var el = 0 ; el < __list.length; el++){
					if(list_productType[k].id_product == ID_product && list_productType[k].productTypeName == __list[el].name){
						var option = dropdownOptionClone.cloneNode(true);
						option.style.display = "";
						option.children[0].setAttribute('name', returnTableType(listElements[i]));
						option.children[0].id = returnTableType(listElements[i]) + "_" + __list[el].id;
						option.children[0].value = __list[el].name;
						dropdownOptions.appendChild(option);
						
						//option.children[1].children[0].addEventListener("change", addResultOption);
						option.children[0].addEventListener("click", addResultOption);
						break;
					}
				}
			}
		}
		else if(__list == weedClassList && ID_weed != null){
			for(var k = 0; k < list_classWeed.length; k++){
				for(var el = 0 ; el < __list.length; el++){
					if(list_classWeed[k].id_class == list_weed[ID_weed].id_class && list_classWeed[k].className == __list[el].name){
						var option = dropdownOptionClone.cloneNode(true);
						option.style.display = "";
						option.children[0].setAttribute('name', returnTableType(listElements[i]));
						option.children[0].id = returnTableType(listElements[i]) + "_" + __list[el].id;
						option.children[0].value = __list[el].name;
						dropdownOptions.appendChild(option);
						
						//option.children[1].children[0].addEventListener("change", addResultOption);
						option.children[0].addEventListener("click", addResultOption);
						break;
					}
				}
			}
		}
		else if (__list == descriptionList && (ID_product != null || ID_weed != null)){
			for(var el = 0 ; el < __list.length; el++){
				var option = dropdownOptionClone.cloneNode(true);
				option.style.display = "";
				option.children[0].setAttribute('name', returnTableType(listElements[i]));
				option.children[0].id = returnTableType(listElements[i]) + "_" + __list[el].id;
				option.children[0].value = __list[el].name;
				dropdownOptions.appendChild(option);
				
				//option.children[1].children[0].addEventListener("change", addResultOption);
				option.children[0].addEventListener("click", addResultOption);
			}
			break;
		}
		else if((__list == componentPartsList || __list == componentStatusList || __list == componentColorList) && (ID_product != null || ID_weed != null)){
			for(var el = 0 ; el < __list.length; el++){
				var option = dropdownOptionClone.cloneNode(true);
				option.style.display = "";
				option.children[0].setAttribute('name', returnTableType(listElements[i]));
				option.children[0].id = returnTableType(listElements[i]) + "_" + __list[el].id;
				option.children[0].value = __list[el].name;
				dropdownOptions.appendChild(option);
				
				//option.children[1].children[0].addEventListener("change", addResultOption);
				option.children[0].addEventListener("click", addResultOption);
			}
			break;
		}
	}

}
function DropdownSearch(){
	var inputBlock = clsInput_test;
	var dropdownBlock = clsDropdown;
	var dropdownOptions = dropdownBlock.children[0];
	var dropdownOptionClone = dropdownBlock.children[0].children[0];
	var dropdownClassifier = dropdownBlock.children[1];
	
	var listElements = [productNameList, weedNameList, productTypeList, weedClassList, descriptionList, componentPartsList, componentStatusList, componentColorList];
	
	//Проверки
	for(var i = 0; i < classifierInpurResult.children.length; i++){
		var resultType = classifierInpurResult.children[i].id.split('_')[1];
		if(resultType == "product"){
			var ID_product = Number(classifierInpurResult.children[i].id.split('_')[2]);
			listElements = checkResultOption(listElements, productNameList);
			listElements = checkResultOption(listElements, weedNameList);
			listElements = checkResultOption(listElements, componentColorList);
		}
		if(resultType == "weed"){
			var ID_weed = Number(classifierInpurResult.children[i].id.split('_')[2]);
			listElements = checkResultOption(listElements, productNameList);
			listElements = checkResultOption(listElements, weedNameList);
			listElements = checkResultOption(listElements, descriptionList);
			listElements = checkResultOption(listElements, componentPartsList);
			listElements = checkResultOption(listElements, componentStatusList);
		}
		if(resultType == "productType"){
			var ID_productType = Number(classifierInpurResult.children[i].id.split('_')[2]);
			listElements = checkResultOption(listElements, weedNameList);
			listElements = checkResultOption(listElements, productTypeList);
		}
		if(resultType == "weedClass"){
			var ID_weedClass = Number(classifierInpurResult.children[i].id.split('_')[2]);
			listElements = checkResultOption(listElements, productNameList);
			listElements = checkResultOption(listElements, weedClassList);
		}
		if(resultType == "discription"){
			listElements = checkResultOption(listElements, descriptionList);
			listElements = checkResultOption(listElements, weedNameList);
		}
		if(resultType == "parts"){
			listElements = checkResultOption(listElements, componentPartsList);
		}
		if(resultType == "status"){
			listElements = checkResultOption(listElements, componentStatusList);
		}
		if(resultType == "color"){
			listElements = checkResultOption(listElements, componentColorList);
		}
	}
	
	//Поиск/определение
	for(var id = 0; id < listElements.length; id++){
		for(var i = 0; i < listElements[id].length; i++){
			if(listElements[id][i].name.split(' ').length == 1 ||  inputBlock.value.split(' ').length > 1){
				var element = listElements[id][i].name.split('').slice(0,inputBlock.value.length).join('');
				element = element.toUpperCase()[0] + element.slice(1);
				
				var string = inputBlock.value.toUpperCase()[0] + inputBlock.value.slice(1);
				if(element == string){
					var option = dropdownOptionClone.cloneNode(true);
					option.style.display = "";
					option.children[0].setAttribute('name', returnTableType(listElements[id]));
					option.children[0].id = returnTableType(listElements[id]) + "_" + listElements[id][i].id;
					option.children[0].value = listElements[id][i].name;
					dropdownOptions.appendChild(option);
					
					//option.children[1].children[0].addEventListener("change", addResultOption);
					option.children[0].addEventListener("click", addResultOption);
				}	
			}
			else{
				var elements = listElements[id][i].name.split(' ');
				var string = inputBlock.value.toUpperCase()[0] + inputBlock.value.slice(1);
				
				for(var k = 0; k < elements.length; k++){
					var element = elements[k].split('').slice(0,inputBlock.value.length).join('');
					element = element.toUpperCase()[0] + element.slice(1);
	
					if(element == string){
						var option = dropdownOptionClone.cloneNode(true);
						option.style.display = "";
						option.children[0].setAttribute('name', returnTableType(listElements[id]));
						option.children[0].id = returnTableType(listElements[id]) + "_" + listElements[id][i].id;
						option.children[0].value = listElements[id][i].name;
						dropdownOptions.appendChild(option);
						
						//option.children[1].children[0].addEventListener("change", addResultOption);
						option.children[0].addEventListener("click", addResultOption);
					}
				}
			}
		}
	}
	if(dropdownOptions.children.length == 1){
		var option = dropdownOptionClone.cloneNode(true);
		option.style.display = "";
		option.children[0].value = "Ничего не найдено!";
		dropdownOptions.appendChild(option);
	}
	
}
//Добавление в список результатов
function addResultOption(){
	var option = this;
	var object = document.createElement("div");
	object.classList.add("wordElement");
	object.id = "result_" + option.id;
	object.textContent = option.value;
	object.addEventListener("click", function(){
		if(this.id.split("_")[1] = "product")
			removeProductInfo()
		
		this.remove();
		StartInput();
		changeClassifier(componentElementClassifier, classifierInpurResult);
	});
	classifierInpurResult.appendChild(object);
	sortResultBlock(classifierInpurResult);
	changeClassifier(componentElementClassifier, classifierInpurResult);
	
	if(this.getAttribute("name") == "product"){
		addProductInfo(this.id);
	}
	
	document.getElementById("clsInput_test").focus();
	document.getElementById("clsInput_test").value="";
}
function addCustomOption(){
	var dropdown = document.getElementById("clsDropdown");
	
	if(dropdown.style.display != "none" && clsInput_test.value != ""){
		var object = document.createElement("div");
		object.classList.add("wordElement");
		//object.setAttribute("name", "customeOption");
		object.textContent = clsInput_test.value;
		object.addEventListener("click", function(){
			this.remove();
			StartInput();
			changeClassifier(componentElementClassifier, classifierInpurResult);
		});
		classifierInpurResult.appendChild(object);
		sortResultBlock(classifierInpurResult);
		changeClassifier(componentElementClassifier, classifierInpurResult);
	}
	ShowDropdown();
}
//Сортировка результатов
function sortResultBlock(resultBlock){
	var keyList = ["product", "weed", "productType", "weedClass", "discription", "parts", "status", "color", "customeOption"];
	
	for(var i = 0; i < resultBlock.children.length; i++){
		var type = resultBlock.children[i].id != "" ? resultBlock.children[i].id.split("_")[1] : "customeOption";
		for(var k = 0; k < keyList.length; k++){
			if(type == keyList[k])
				resultBlock.children[i].setAttribute('name', k);
		}
	}
	
	[].map.call( resultBlock.children, Object ).sort( function ( a, b ) {
		return +a.getAttribute("name") - +b.getAttribute("name");
	}).forEach( function ( elem ) {resultBlock.appendChild( elem )}); 
	
}
function addProductInfo(product_id){
	var infoBlockElement = document.getElementById("infoBlock")
	var cloneOptionInfo = infoBlockElement.children[0].cloneNode(true);
	
	var ID = product_id.split("_")[1];
	//ссылка на википедию
	cloneOptionInfo.style.display = "";
	cloneOptionInfo.children[0].value = "WIKI";
	cloneOptionInfo.children[0].addEventListener("click", function(){
		window.open(list_product[ID].wikilink)
	});
	infoBlockElement.appendChild(cloneOptionInfo);
	//ссылки на госты
	var ID_GOSTS_LIST = list_product[ID].purpose_seed.concat(list_product[ID].purpose_fodder, list_product[ID].purpose_raw, list_product[ID].purpose_export, list_product[ID].purpose_groats)
	
	for(var i = 0; i < list_product[ID].purpose_seed.length; i++){
		if(list_product[ID].purpose_seed[i] != "-"){
			var cloneOptionInfo = infoBlockElement.children[0].cloneNode(true);
			var id = list_product[ID].purpose_seed[i];
			
			cloneOptionInfo.style.display = "";
			cloneOptionInfo.children[0].value = list_GOST[id-1].gostName;
			cloneOptionInfo.children[0].addEventListener("click", function(){
				window.open(list_GOST[id-1].link);
			});
			infoBlockElement.appendChild(cloneOptionInfo);
		}
	}
	for(var i = 0; i < list_product[ID].purpose_fodder.length; i++){
		if(list_product[ID].purpose_fodder[i] != "-"){
			var cloneOptionInfo = infoBlockElement.children[0].cloneNode(true);
			var id = list_product[ID].purpose_fodder[i];
			
			cloneOptionInfo.style.display = "";
			cloneOptionInfo.children[0].value = list_GOST[id-1].gostName;
			cloneOptionInfo.children[0].addEventListener("click", function(){
				window.open(list_GOST[id-1].link);
			});
			infoBlockElement.appendChild(cloneOptionInfo);
		}
	}
	for(var i = 0; i < list_product[ID].purpose_raw.length; i++){
		if(list_product[ID].purpose_raw[i] != "-"){
			var cloneOptionInfo = infoBlockElement.children[0].cloneNode(true);
			var id = list_product[ID].purpose_raw[i];
			
			cloneOptionInfo.style.display = "";
			cloneOptionInfo.children[0].value = list_GOST[id-1].gostName;
			cloneOptionInfo.children[0].addEventListener("click", function(){
				window.open(list_GOST[id-1].link);
			});
			infoBlockElement.appendChild(cloneOptionInfo);
		}
	}
	for(var i = 0; i < list_product[ID].purpose_export.length; i++){
		if(list_product[ID].purpose_export[i] != "-"){
			var cloneOptionInfo = infoBlockElement.children[0].cloneNode(true);
			var id = list_product[ID].purpose_export[i];
			
			cloneOptionInfo.style.display = "";
			cloneOptionInfo.children[0].value = list_GOST[id-1].gostName;
			cloneOptionInfo.children[0].addEventListener("click", function(){
				window.open(list_GOST[id-1].link);
			});
			infoBlockElement.appendChild(cloneOptionInfo);
		}
	}
	for(var i = 0; i < list_product[ID].purpose_groats.length; i++){
		if(list_product[ID].purpose_groats[i] != "-"){
			var cloneOptionInfo = infoBlockElement.children[0].cloneNode(true);
			var id = list_product[ID].purpose_groats[i];
			
			cloneOptionInfo.style.display = "";
			cloneOptionInfo.children[0].value = list_GOST[id-1].gostName;
			cloneOptionInfo.children[0].addEventListener("click", function(){
				window.open(list_GOST[id-1].link);
			});
			infoBlockElement.appendChild(cloneOptionInfo);
		}
	}
	
	if(infoBlockElement.children.length != 0)
		infoTitle.style.display = "";
}
function removeProductInfo(){
	infoTitle.style.display = "none";
	for(var i = document.getElementById("infoBlock").children.length - 1; i > 0; i--){
		document.getElementById("infoBlock").children[i].remove();
	}
}
function resultTextView(){
	clsInput_test.value = "";
	for(var i = 0; i < classifierInpurResult.children.length; i++){
		clsInput_test.value = clsInput_test.value != "" ? clsInput_test.value + " " + classifierInpurResult.children[i].textContent : classifierInpurResult.children[i].textContent;
	}
}
function checkResultOption(list, listElement){	
	var index = list.indexOf(listElement);
	if(index > -1)
		list.splice(index, 1);
	
	return list;
}
//Изменение параметров классификатора
function changeClassifier(classifier, resultBlock){
	//Дефолтная установка
	classifier.classifierType = 0;
	classifier.classifierProduct.useADD = false;
	classifier.classifierProduct.mainOptions.industryID = 0;
	classifier.classifierProduct.addCustomOption = "";
	classifier.classifierWeed.useADD = false;
	classifier.classifierWeed.mainOptions.industryID = 0;
	classifier.classifierWeed.addCustomOption = "";
	//Основные установки
	for(var i = 0; i < resultBlock.children.length; i++){
		var resultType = resultBlock.children[i].id != "" ? resultBlock.children[i].id.split("_")[1] : "customeOption";
		var resultID = classifierInpurResult.children[i].id.split('_')[2];
		switch(resultType){
			case "product":
				classifier.classifierType = 0;
				classifier.classifierProduct.mainOptions.productID = list_product[resultID].id_product;
				classifier.classifierProduct.mainOptions.groupProductID = list_product[resultID].id_productGroup;
				break;
			case "weed":
				classifier.classifierType = 1;
				classifier.classifierProduct.classifierWeed.weedNameID = list_weed[resultID].weedNameID;
				classifier.classifierWeed.mainOptions.classWeedID = list_weed[resultID].id_class;
				break;
			case "productType":
				classifier.classifierType = 0;
				classifier.classifierProduct.mainOptions.productTypeID = list_productType[resultID].id_productType;
				break;
			case "weedClass":
				classifier.classifierType = 1;
				classifier.classifierWeed.mainOptions.classWeedID = list_weed[resultID].id_class;
				classifier.classifierWeed.mainOptions.categoryID = list_weed[resultID].id_category;
				break;
			case "discription":
				classifier.classifierProduct.mainOptions.descriptionID = list_descriptionSeed[resultID].id_description;
				break;
			case "parts":
				classifier.classifierProduct.mainOptions.partsID = list_productPart[resultID].id_number;
				break;
			case "status":
				classifier.classifierProduct.mainOptions.statusID = list_productStatus[resultID].id_number;
				break;
			case "color":
				classifier.classifierWeed.mainOptions.colorID = list_productColor[resultID].id_number;
				break;
			case "customeOption":
				if (classifier.classifierType == 0){
					classifier.classifierProduct.addCustomOption += resultBlock.children[i].textContent + ", ";
				}
				else{
					classifier.classifierWeed.addCustomOption += resultBlock.children[i].textContent + ", ";
				}
				break;
		}
	}
}

//дополнительная функция для кнопочки.
function checkboxOption(elementID, bool){
	var option = document.getElementById(elementID);
	if(option != null){
		var checkbox = option.parentNode.children[1].children[0];
		checkbox.checked = bool;
	}
}
function ShowDropdown(){
	var dropdown = document.getElementById("clsDropdown");
	
	var otherCheckbox=document.getElementById("addOption");
	
	dropdown.style.display="flex";

	clsInput_test.value = ""
	classifierInpurResult.style.display="flex";
	clsInputResultBlock.style.display="flex";
	otherCheckbox.style.display="flex";

	StartInput();
}
function HideDropdown(){
	var dropdown = document.getElementById("clsDropdown");
	
	var otherCheckbox=document.getElementById("addOption");
	
	dropdown.style.display = "none";
	
	resultTextView();
	classifierInpurResult.style.display="none";
	clsInputResultBlock.style.display="none";
	otherCheckbox.style.display="none";
}


//Работа с интерфейсом весовых категорий
function ShowMassDropdown(){
	massInputResultBlock.style.display = "none";
	massInputBlock.style.display = "flex";
	massDropdown.style.display = "flex";
	moreTitle.style.display = "flex";
	
	massInputBlock.children[0].children[0].focus();
	
	valueBlock.style.width="184px"
}
function HideMassDropdown(){
	massInputResultBlock.style.display = "flex";
	massInputBlock.style.display = "none";
	massDropdown.style.display = "none";
	moreTitle.style.display = "none";
	
	massInputResultBlock.children[0].value = massInputBlock.children[0].children[0].value + " " + massInputBlock.children[0].children[1].textContent;
	
	valueBlock.style.width="80px"
	
		
}
function DropdownMassOptionDefault(){
	var dropdownElements = massDropdown.children[0].children;
	for(var i = 0; i < dropdownElements.length; i++){
		dropdownElements[i].addEventListener("click", changeMassType);
	}
}
function changeMassType(){
	massInputBlock.children[0].children[0].value = this.children[0].value;
	massInputBlock.children[0].children[1].textContent = this.children[1].value;
}

function changeMassValue(){
	var dropdownElements = massDropdown.children[0].children;
	for(var i = 0; i < dropdownElements.length; i++){
		if(!dropdownElements[i].children[0].readOnly){
			dropdownElements[i].children[0].value = massInputBlock.children[0].children[0].value; // В последствии обернуть в определенную функцию
			var evt = document.createEvent("HTMLEvents");
			evt.initEvent("change", false, true);
			dropdownElements[i].dispatchEvent(evt);
		}
	}
}


function ShowDeleteButton(){
	document.getElementById("deleteButton_00").style.display="flex";
	document.getElementById("componentNumber_00").style.display="none";
	
}
function HideDeleteButton(){
	document.getElementById("deleteButton_00").style.display="none";
	document.getElementById("componentNumber_00").style.display="flex";
}

function photoBlock(){
	if (document.getElementById("photoBlock").style.display=="none"){
		document.getElementById("photoBlock").style.display="flex";
		document.getElementById("photoBlockButton").style.transform = "rotate(180deg)";
		document.getElementById("photoTitle").style.borderBottomWidth="0px"
		document.getElementById("photoTitle").style.marginBottom="8px";
	}else{
		document.getElementById("photoBlock").style.display="none";
		document.getElementById("photoBlockButton").style.transform = "rotate(0deg)";
		document.getElementById("photoTitle").style.borderBottomWidth="1px"
		document.getElementById("photoTitle").style.marginBottom="0px";
	}
}

function infoBlock(){
	if (document.getElementById("infoBlock").style.display=="none"){
		document.getElementById("infoBlock").style.display="flex";
		document.getElementById("infoBlockButton").style.transform = "rotate(180deg)";
		document.getElementById("infoTitle").style.borderBottomWidth="0px"
		document.getElementById("infoTitle").style.marginBottom="8px";
	}else{
		document.getElementById("infoBlock").style.display="none";
		document.getElementById("infoBlockButton").style.transform = "rotate(0deg)";
		document.getElementById("infoTitle").style.borderBottomWidth="1px"
		document.getElementById("infoTitle").style.marginBottom="0px";
	}
}
function moreBlock(){
	if (document.getElementById("moreBlock").style.display=="none"){
		document.getElementById("moreBlock").style.display="";
		document.getElementById("moreBlockButton").style.transform = "rotate(180deg)";
		document.getElementById("moreTitle").style.borderBottomWidth="0px"
		document.getElementById("moreTitle").style.marginBottom="8px";
	}else{
		document.getElementById("moreBlock").style.display="none";
		document.getElementById("moreBlockButton").style.transform = "rotate(0deg)";
		document.getElementById("moreTitle").style.borderBottomWidth="1px"
		document.getElementById("moreTitle").style.marginBottom="0px";
	}
}
//Смена изображений Тоглов
function switchToggle(){
	var imgName = this.style.backgroundImage.split('/')[4].split('.')[0];
	
	switch(imgName){
		case "calcOn":
			this.style.backgroundImage = "url(/static/img/classifier/calcOff.png)";
			break;
		case "calcOff":
			this.style.backgroundImage = "url(/static/img/classifier/calcOn.png)";
			break;
		case "impOff":
			this.style.backgroundImage = "url(/static/img/classifier/impOn.png)";
			break;
		case "impOn":
			this.style.backgroundImage = "url(/static/img/classifier/impOff.png)";
			break;
		case "accept":
			this.style.backgroundImage = "url(/static/img/classifier/reject.png)";
			break;
		case "reject":
			this.style.backgroundImage = "url(/static/img/classifier/accept.png)";
			break;
	}
}
//Переключение допольных опций весов компонета
function switchDropdownMass(element){
	var sliderBlock = element.children[0];
	//Псевдофункция
	function e(){
		var selectRow = this.parentNode;
		var sliderBlock = selectRow.parentNode;
		
		if(selectRow.children[0].readOnly){
			for(var i = 0 ; i < sliderBlock.children.length; i++){
				sliderBlock.children[i].style.display = "none";
			}
			selectRow.style.display = "flex";
			selectRow.children[0].readOnly = false;
			selectRow.children[1].style.backgroundColor = "#ffb23f";
		}
		else {
			for(var i = 0 ; i < sliderBlock.children.length; i++){
				sliderBlock.children[i].style.display = "flex";
			}
			selectRow.children[0].readOnly = true;
			selectRow.children[1].style.backgroundColor = "#f1f1f1";
		}
	}

	//Добавление слушателя на элементы ниспадающего списка
	for(var i = 0; i < sliderBlock.children.length; i++){
		sliderBlock.children[i].children[1].addEventListener("click", e);
	}
	mathfAddFucntion(element);
}
//Матемачесткие функции 
function mathfAddFucntion(element){
	var sliderBlock = element.children[0];
	var hingeMassBlock = element.children[2];
	var piecesBlock = element.children[4];
	sliderBlock.children[0].addEventListener("change", mathfPersecentFucntion);
	sliderBlock.children[1].addEventListener("change", mathfGramFucntion);
	sliderBlock.children[2].addEventListener("change", mathfPiecesFucntion);
	sliderBlock.children[3].addEventListener("change", mathfPieces_KG_Fucntion);
	sliderBlock.children[4].addEventListener("change", mathf_PPM_Fucntion);
	
	
	hingeMassBlock.children[0].children[0].addEventListener("change", mathf_Mass_Pirces);
	piecesBlock.children[0].children[0].addEventListener("change", mathf_Mass_Pirces);
}
function mathfPersecentFucntion(){
	var DropdownBlock = this.parentNode.parentNode;
	var MainScrollBlock = DropdownBlock.children[0];
	var HingeMass = DropdownBlock.children[2].children[0].children[0];
	var Pieces_1000	= DropdownBlock.children[4].children[0].children[0];

	//Основные параметры
	var percent = MainScrollBlock.children[0].children[0];
	var gram = MainScrollBlock.children[1].children[0];
	var pieces = MainScrollBlock.children[2].children[0];
	var pieces_kg = MainScrollBlock.children[3].children[0];
	var ppm = MainScrollBlock.children[4].children[0];
	
	//Основное значение
	percent.value = Number(percent.value).toFixed(2);
	//Остальные значения
	gram.value = Number(HingeMass.value / 100 * percent.value).toFixed(2);
	pieces.value = Number(Pieces_1000.value / 1000 * gram.value).toFixed(2);
	pieces_kg.value = Number(pieces.value * (1000 / HingeMass.value)).toFixed(2);
	ppm.value = Number(percent.value * 10000).toFixed(2);
	
	DropdownBlock.parentNode.parentNode.children[0].children[0].children[0].value = percent.value;
}
function mathfGramFucntion(){
	var DropdownBlock = this.parentNode.parentNode;
	var MainScrollBlock = DropdownBlock.children[0];
	var HingeMass = DropdownBlock.children[2].children[0].children[0];
	var Pieces_1000	= DropdownBlock.children[4].children[0].children[0];

	//Основные параметры
	var percent = MainScrollBlock.children[0].children[0];
	var gram = MainScrollBlock.children[1].children[0];
	var pieces = MainScrollBlock.children[2].children[0];
	var pieces_kg = MainScrollBlock.children[3].children[0];
	var ppm = MainScrollBlock.children[4].children[0];
	
	//Основное значение
	gram.value = Number(gram.value).toFixed(2);
	//Остальные значения
	percent.value = Number(gram.value * (100/HingeMass.value)).toFixed(2);
	pieces.value = Number(Pieces_1000.value / 1000 * gram.value).toFixed(2);
	pieces_kg.value = Number(pieces.value * (1000 / HingeMass.value)).toFixed(2);
	ppm.value = Number(percent.value * 10000).toFixed(2);
	
	DropdownBlock.parentNode.parentNode.children[0].children[0].children[0].value = gram.value;
}
function mathfPiecesFucntion(){
	var DropdownBlock = this.parentNode.parentNode;
	var MainScrollBlock = DropdownBlock.children[0];
	var HingeMass = DropdownBlock.children[2].children[0].children[0];
	var Pieces_1000	= DropdownBlock.children[4].children[0].children[0];

	//Основные параметры
	var percent = MainScrollBlock.children[0].children[0];
	var gram = MainScrollBlock.children[1].children[0];
	var pieces = MainScrollBlock.children[2].children[0];
	var pieces_kg = MainScrollBlock.children[3].children[0];
	var ppm = MainScrollBlock.children[4].children[0];
	
	//Основное значение
	pieces.value = Number(pieces.value).toFixed(2);
	//Остальные значения
	gram.value = Number(pieces.value * (1000 / Pieces_1000.value)).toFixed(2);
	percent.value = Number(gram.value * (100 / HingeMass.value)).toFixed(2);
	pieces_kg.value = Number(pieces.value * (1000 / HingeMass.value)).toFixed(2);
	ppm.value = Number(percent.value * 10000).toFixed(2);
	
	DropdownBlock.parentNode.parentNode.children[0].children[0].children[0].value = pieces.value;
}
function mathfPieces_KG_Fucntion(){
	var DropdownBlock = this.parentNode.parentNode;
	var MainScrollBlock = DropdownBlock.children[0];
	var HingeMass = DropdownBlock.children[2].children[0].children[0];
	var Pieces_1000	= DropdownBlock.children[4].children[0].children[0];

	//Основные параметры
	var percent = MainScrollBlock.children[0].children[0];
	var gram = MainScrollBlock.children[1].children[0];
	var pieces = MainScrollBlock.children[2].children[0];
	var pieces_kg = MainScrollBlock.children[3].children[0];
	var ppm = MainScrollBlock.children[4].children[0];
	
	//Основное значение
	pieces_kg.value = Number(pieces_kg.value).toFixed(2);
	//Остальные значения
	pieces.value = Number(pieces_kg.value * (HingeMass.value / 1000)).toFixed(2);
	gram.value = Number(pieces.value * (1000 / Pieces_1000.value)).toFixed(2);
	percent.value = Number(gram.value * (100 / HingeMass.value)).toFixed(2);
	ppm.value = Number(percent.value * 10000).toFixed(2);
	
	DropdownBlock.parentNode.parentNode.children[0].children[0].children[0].value = pieces_kg.value;
}
function mathf_PPM_Fucntion(){
	var DropdownBlock = this.parentNode.parentNode;
	var MainScrollBlock = DropdownBlock.children[0];
	var HingeMass = DropdownBlock.children[2].children[0].children[0];
	var Pieces_1000	= DropdownBlock.children[4].children[0].children[0];

	//Основные параметры
	var percent = MainScrollBlock.children[0].children[0];
	var gram = MainScrollBlock.children[1].children[0];
	var pieces = MainScrollBlock.children[2].children[0];
	var pieces_kg = MainScrollBlock.children[3].children[0];
	var ppm = MainScrollBlock.children[4].children[0];
	
	//Основное значение
	ppm.value = Number(ppm.value).toFixed(2);
	//Остальные значения
	percent.value = Number(ppm.value / 10000).toFixed(2);
	gram.value = Number(HingeMass.value / 100 * percent.value).toFixed(2);
	pieces.value = Number(Pieces_1000.value / 1000 * gram.value).toFixed(2);
	pieces_kg.value = Number(pieces.value * (1000 / HingeMass.value)).toFixed(2);
	
	DropdownBlock.parentNode.parentNode.children[0].children[0].children[0].value = ppm.value;
}
function mathf_Mass_Pirces(){
	var DropdownBlock = this.parentNode.parentNode.parentNode;
	var MainScrollBlock = DropdownBlock.children[0];
	var HingeMass = DropdownBlock.children[2].children[0].children[0];
	var Pieces_1000	= DropdownBlock.children[4].children[0].children[0];

	//Основные параметры
	var percent = MainScrollBlock.children[0].children[0];
	var gram = MainScrollBlock.children[1].children[0];
	var pieces = MainScrollBlock.children[2].children[0];
	var pieces_kg = MainScrollBlock.children[3].children[0];
	var ppm = MainScrollBlock.children[4].children[0];
	
	//Основное значение
	percent.value = Number(percent.value).toFixed(2);
	//Остальные значения
	gram.value = Number(HingeMass.value / 100 * percent.value).toFixed(2);
	pieces.value = Number(Pieces_1000.value / 1000 * gram.value).toFixed(2);
	pieces_kg.value = Number(pieces.value * (1000 / HingeMass.value)).toFixed(2);
	ppm.value = Number(percent.value * 1000).toFixed(2);
	
	for(var i = 0; i < MainScrollBlock.children.length; i++){
		if(!MainScrollBlock.children[i].children[0].readOnly){
			DropdownBlock.parentNode.parentNode.children[0].children[0].children[0].value = MainScrollBlock.children[i].children[0].value;
		}
	}
}
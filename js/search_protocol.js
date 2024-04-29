//Данные по протоколу
var searchProtocolID = 0;

//Функции для поиска протокола
var protocolSearch = []
var fractionSearch = []
function addSearchProtocol(){
	//Создание данных под новый протокол
	searchProtocolID = protocolSearch.length;
	generateProtocolElement(protocolSearch); //создание нового элемента протокола
	generateSortElement(protocolSearch,0,"Проход 01","Отбой 01"); // Добавление элемента сортировки
	protocolSearch[searchProtocolID].sourceProduct.components.push({ // Добовление изначального компанента для исходного продукта
		object_name: "item_source_1",
		product_name: "-",
		classifier: {
			useADD_ID: Math.random().toString(36).substring(2,10) + "PR" + (protocolSearch[searchProtocolID].sourceProduct.components.length + 1),
			classifierType: 0,
			classifierProduct: {
				useADD: false,
				mainClassifier:{
					industryID: 9999,
					groupProductID: 9999,
					productID: 9999,
					descriptionID: 9999,
					productTypeID: 9999,
					productSortID: 9999
				},
				addClassifier:{
					industry: "",
					groupProduct: "",
					product: "",
					description: "",
					productType: "",
					productSort: "",
					purpose: "",
					GOST: ""
				}
			},
			classifierWeed:{
				useADD: false,
				mainClassifier:{
					industryID: 9999,
					categoryID: 9999,
					classWeedID: 9999,
					weedNameID: 9999,
					descriptionID: 9999
				},
				addClassifier:{
					industry: "",
					category: "",
					classWeed: "",
					weedName: "",
					description: ""	
				}
			}
		},
		other_check: false,
		value: protocolSearch[searchProtocolID].sourceProduct.components.length == 0 ? 100 : 0,
		value_type: 0,
		removed_value: 0,
		flag_1: protocolSearch[searchProtocolID].sourceProduct.components.length == 0 ? true : false,
		flag_2: true,
		images: []
	});
	//Создание Блока протокола
	var cloneProtocol = search_protocol_0.cloneNode(true);
	var protocolName = cloneProtocol.children[0].children[0];
	var protocolNumber = cloneProtocol.children[0].children[1].children[0].children[0].children[1];
	var protocolSearchProduct = cloneProtocol.children[0].children[1].children[1].children[0].children[0].children[0];
	var protocolSourceCapacity = cloneProtocol.children[0].children[1].children[1].children[0].children[0].children[1];
	var protocolSourcePurity = cloneProtocol.children[0].children[1].children[1].children[1].children[0].children[2];
	var protocolFractionCapacity = cloneProtocol.children[0].children[1].children[3].children[0].children[0];
	var protocolFractionPurity = cloneProtocol.children[0].children[1].children[3].children[1].children[0];
	//селекты под аппараты и конфигурацию
	var protocolEquipmentSelect = cloneProtocol.children[0].children[1].children[1].children[1].children[0].children[0];
	var protocolConfigurationSelect = cloneProtocol.children[0].children[1].children[1].children[1].children[0].children[1];
	//кнопки
	var protocolCheckbox = cloneProtocol.children[0].children[1].children[0].children[0].children[0];
	var protocolViewButton =  cloneProtocol.children[0].children[1].children[4].children[0].children[0].children[0];
	var protocolResultButton =  cloneProtocol.children[0].children[1].children[4].children[1].children[0].children[0];
	
	//ID protocol_block
	cloneProtocol.style.display = "";
	cloneProtocol.id = "search_protocol_"+Number(searchProtocolID+1);
	//заполнение основной информация по протоколу в блок
	try{
		protocolName.textContent = search_user_info(Number(protocolSearch[searchProtocolID].id_responsible)).name + " " + protocolSearch[searchProtocolID].create_date + " " + protocolSearch[searchProtocolID].id_protocol;
	}
	catch{
		protocolName.textContent = "undefined" + " " + protocolSearch[searchProtocolID].create_date + " " + protocolSearch[searchProtocolID].id_protocol;
	}
	protocolSearchProduct.value = protocolSearch[searchProtocolID].main_product + " - " + protocolSearch[searchProtocolID].main_weed;
	protocolSourceCapacity.value = Number(protocolSearch[searchProtocolID].source_capacity).toFixed(3);
	protocolSourcePurity.value = Number(protocolSearch[searchProtocolID].source_purity).toFixed(3);
	protocolFractionCapacity.value = Number(protocolSearch[searchProtocolID].fraction_capacity).toFixed(3);
	protocolFractionPurity.value = Number(protocolSearch[searchProtocolID].fraction_purity).toFixed(3);
	
	protocolEquipmentSelect.disabled = "disabled";
	protocolConfigurationSelect.disabled = "disabled";
	
	protocolViewButton.addEventListener("click", function(){
		var ID = Number(cloneProtocol.id.substr(16)-1);
		var protocolSelect = protocolSettings.children[0].children[0].children[0].children[0].children[0];
		var option = document.createElement('option');
		
		search_load = true;
		searchProtocolID = ID;
		protocol.push(protocolSearch[ID]);
		load_protocol.push(true);
		//protocolSelect.add(option);
		
		setupProtocolView("protocol_"+protocol.length);
	});
	protocolResultButton.addEventListener("click", function(){
		var ID = Number(cloneProtocol.id.substr(16)-1);
		
		protocol.push(protocolSearch[ID]);
		protocolResultView("protocol_"+protocol.length);
		protocol.splice(protocol.length-1,1);
	});
	//Номер протокола дл отображения
	if(searchProtocolID<9)
		protocolNumber.textContent = "0"+Number(searchProtocolID+1);
	else
		protocolNumber.textContent = Number(searchProtocolID+1);
	
	searchBlock.appendChild(cloneProtocol);
}
function searchAddSourceItem(){
	//добавление нового компанета в исходный компанентов
	protocolSearch[searchProtocolID].sourceProduct.components.push({
		object_name: "search_protocol_"+protocolSearch.length,
		product_name: "-",
		classifier: {
			useADD_ID: Math.random().toString(36).substring(2,10) + "PR" + (protocolSearch[searchProtocolID].sourceProduct.components.length + 1),
			classifierType: 0,
			classifierProduct: {
				useADD: false,
				mainClassifier:{
					industryID: 9999,
					groupProductID: 9999,
					productID: 9999,
					descriptionID: 9999,
					productTypeID: 9999,
					productSortID: 9999
				},
				addClassifier:{
					industry: "",
					groupProduct: "",
					product: "",
					description: "",
					productType: "",
					productSort: "",
					purpose: "",
					GOST: ""
				}
			},
			classifierWeed:{
				useADD: false,
				mainClassifier:{
					industryID: 9999,
					categoryID: 9999,
					classWeedID: 9999,
					weedNameID: 9999,
					descriptionID: 9999
				},
				addClassifier:{
					industry: "",
					category: "",
					classWeed: "",
					weedName: "",
					description: ""	
				}
			}
		},
		other_check: false,
		value: protocolSearch[searchProtocolID].sourceProduct.components.length == 0 ? 100 : 0,
		value_type: 0,
		removed_value: 0,
		flag_1: protocolSearch[searchProtocolID].sourceProduct.components.length == 0 ? true : false,
		flag_2: true,
		images: []
	});
	//добавление нового компанета для всех сортировок
	for(var id=0; id<protocolSearch[searchProtocolID].sorting.length; id++){
		protocolSearch[searchProtocolID].sorting[id].accept_components.push({
			product_name: "-",
			iterfraction_percent: 0.00,
			value: protocolSearch[searchProtocolID].sorting[id].accept_components.length == 0 ? 100 : 0,
			value_type: 0,
			removed_value: 0,
			flag_1: protocolSearch[searchProtocolID].sorting[id].accept_components.length == 0 ? true : false,
			flag_2: false
		});
		protocolSearch[searchProtocolID].sorting[id].reject_components.push({
			product_name: "-",
			iterfraction_percent: 0.00,
			value: protocolSearch[searchProtocolID].sorting[id].reject_components.length == 0 ? 100 : 0,
			value_type: 0,
			removed_value: 0,
			flag_1: protocolSearch[searchProtocolID].sorting[id].reject_components.length == 0 ? true : false,
			flag_2: false
		});
	}	
}
function searchAddSortingBlock(id_sorting){
	var accept_name = id_sorting < 9 ? "Проход 0" + Number(id_sorting+1) : "Проход " + Number(id_sorting+1);
	var reject_name = id_sorting < 9 ? "Отбой 0" + Number(id_sorting+1) : "Отбой " + Number(id_sorting+1);
	generateSortElement(protocolSearch, id_sorting+1, accept_name, reject_name); // Добавление элемента сортировки
	//Добавление значений компанентов
	for(var id=0; id<protocolSearch[searchProtocolID].sourceProduct.components.length; id++){
		protocolSearch[searchProtocolID].sorting[id_sorting].accept_components.push({
			product_name: protocolSearch[searchProtocolID].sourceProduct.components[id].product_name,
			iterfraction_percent: 0.00,
			value: protocolSearch[searchProtocolID].sorting[id_sorting].accept_components.length == 0 ? 100 : 0,
			value_type: 0,
			removed_value: 0,
			flag_1: protocolSearch[searchProtocolID].sorting[id_sorting].accept_components.length == 0 ? true : false,
			flag_2: false
		});
		protocolSearch[searchProtocolID].sorting[id_sorting].reject_components.push({
			product_name: protocolSearch[searchProtocolID].sourceProduct.components[id].product_name,
			iterfraction_percent: 0.00,
			value: protocolSearch[searchProtocolID].sorting[id_sorting].reject_components.length == 0 ? 100 : 0,
			value_type: 0,
			removed_value: 0,
			flag_1: protocolSearch[searchProtocolID].sorting[id_sorting].reject_components.length == 0 ? true : false,
			flag_2: false
		});
	};
	//Добавление значений входящих фракции
	for(var id=0; id<protocolSearch[searchProtocolID].sorting.length; id++){
		while(protocolSearch[searchProtocolID].sorting[id].inbox_fraction.length != protocolSearch[searchProtocolID].sorting.length)
			protocolSearch[searchProtocolID].sorting[id].inbox_fraction.push({accept: false, reject: false});
	}	
}
//Перенос выбранного числа протоколов в созданные
function useSearchedProtocol(){
	var date = new Date(); //Переменная для даты
	
	for(var id = 1; id <= protocolSearch.length; id++){
		var protocolElement = document.getElementById("search_protocol_"+id);
		var checkoxElement = protocolElement.children[0].children[1].children[0].children[0].children[0];
	
		if(checkoxElement.checked){			
			//Создание использованных проотколов
			addProtocolData();
			protocol[protocol.length-1] = protocolSearch[id-1];
			protocol[protocol.length-1].id_protocol = "id_protocol"
			protocol[protocol.length-1].id_requirements = protocolRequirements.id_requirements;;
			protocol[protocol.length-1].id_protocolType = 3;
			protocol[protocol.length-1].id_creater = queryParametrList.id_creater;
			protocol[protocol.length-1].company_name = queryParametrList.company_name;
			protocol[protocol.length-1].create_date = date.getDate() + "." + Number(date.getMonth() + 1) + "." + date.getFullYear();
			load_protocol[load_protocol.length-1] = true;
			
			//Установка фракций на дефолтные
			for(var i = 0; i < protocol[protocol.length-1].sorting.length; i++){
				protocol[protocol.length-1].sorting[i].accept_name = i < 9 ? "Проход 0"+Number(i+1) : "Проход "+Number(i+1);
				protocol[protocol.length-1].sorting[i].accept_name_id = 0;
				protocol[protocol.length-1].sorting[i].reject_name = i < 9 ? "Отбой 0"+Number(i+1) : "Отбой "+Number(i+1);
				protocol[protocol.length-1].sorting[i].reject_name_id = 0;
			}
			addProtocolMainParamets(protocol.length);
			//Установка значений аппарата и конфигурации
			setupProtocolMachine(protocol.length);
			document.getElementById("protocol_"+protocol.length).children[0].children[1].children[1].children[1].children[0].children[0].value = protocol[protocol.length-1].equipment_machine;
			setupProtocolConfiguration(protocol.length,  protocol[protocol.length-1].equipment_machine);
			
			//Удаление лишних элементов протокола
			protocolSearch.splice(id-1,1);
			protocolElement.remove();
			updateSearchProtocol();
			id--;
		}
	}
	if(protocolSearch.length == 0){
		searchPage.style.display = "none";
	}
}
//Функция обновлейние списка найденных протоколов
function updateSearchProtocol(){
	for(var id=1; id <= protocolSearch.length; id++){
		var protocolElement = searchBlock.children[id+1];
		protocolElement.id = "search_protocol_"+id;
		protocolElement.children[0].children[1].children[0].children[0].children[1].textContent = id < 10 ? "0"+id : id;
	}
}
//Отчистка списка найденных протоколов
function removeSearchProtocol(){
	searchPage.style.display = "none";
	clearProtocolInterface();
	for(var i = 1; i <= protocolSearch.length; i++){
		document.getElementById("search_protocol_"+i).remove();
	}
	protocolSearch = [];
	fractionSearch = [];
	searchProtocolID = 0;
	
	overlay.style.display = "flex";
}
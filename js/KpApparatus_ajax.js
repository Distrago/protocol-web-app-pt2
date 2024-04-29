var checkLoad = true;
 
function get_separation_model(){
	$.getJSON($SCRIPT_ROOT + '/commercial_offer_main/separation/model',{
	}, function(data){
		for(var i = 0; i < data.result.length; i++){
			Model.push({
				"id": data.result[i].id,
				"Model": data.result[i].Model,
				"Voltage": data.result[i].Voltage,
				"Hz": data.result[i].Hz,
				"Air_MPa": data.result[i].Air_MPa,
				"air_class": data.result[i].air_class,
				"defence_class": data.result[i].defence_class,
				"defence_lvl": data.result[i].defence_lvl,
				"temp": data.result[i].temp,
				"wet": data.result[i].wet,
				"DBA": data.result[i].DBA,
				"explore_time": data.result[i].explore_time
			});
		}
		get_separation_main();
	})
	.fail(function(jqXHR, exception){
		//var msg = "Status Error: " + jqXHR.status + "; exeption: " + exception + "; responseText: " + jqXHR.responseText;
		//ErrorLog(msg, false);
	});
}
function get_separation_main(){
	$.getJSON($SCRIPT_ROOT + '/commercial_offer_main/separation/main',{
	}, function(data){
		for(var i = 0; i < data.result.length; i++){
			Main.push({
				"id": data.result[i].id,
				"Model": data.result[i].Model,
				"frame": data.result[i].frame,
				"modelNumber": data.result[i].modelNumber,
				"Channel": data.result[i].Channel,
				"Capacity": data.result[i].Capacity,
				"Weight": data.result[i].Weight,
				"kW": data.result[i].kW,
				"air_flow": data.result[i].air_flow,
				"Air_flowMax": data.result[i].Air_flowMax,
				"aspiration": data.result[i].aspiration,
				"description": data.result[i].description,
				"imageName": data.result[i].imageName,
				"sizeHeight": data.result[i].sizeHeight,
				"sizeDeep": data.result[i].sizeDeep,
				"sizeWidth": data.result[i].sizeWidth,
				"ModelRU": data.result[i].ModelRU,
				"descriptionEN": data.result[i].descriptionEN
			});
		}
		get_separation_configuration();
	})
	.fail(function(jqXHR, exception){
		//var msg = "Status Error: " + jqXHR.status + "; exeption: " + exception + "; responseText: " + jqXHR.responseText;
		//ErrorLog(msg, false);
	});
}
function get_separation_configuration(){
	$.getJSON($SCRIPT_ROOT + '/commercial_offer_main/separation/configuration',{
	}, function(data){
		for(var i = 0; i < data.result.length; i++){
			Configuration.push({
				"id": data.result[i].id,
				"Model": data.result[i].Model,
				"configuration": data.result[i].configuration,
				"Cleaning_factor": data.result[i].Cleaning_factor,
				"CCD": data.result[i].CCD,				
				"Description": data.result[i].Description,
				"DescriptionEN": data.result[i].DescriptionEN
			});
		}
		ChangeElevatorType();
	})
	.fail(function(jqXHR, exception){
		//var msg = "Status Error: " + jqXHR.status + "; exeption: " + exception + "; responseText: " + jqXHR.responseText;
		//ErrorLog(msg, false);
	});
}
function get_separation_KompressorType(){
	$.getJSON($SCRIPT_ROOT + '/commercial_offer_main/separation/KompressorType',{
	}, function(data){
		for(var i = 0; i < data.result.length; i++){
			KompressorType.push({
				"id": data.result[i].id,
				"compressor": data.result[i].compressor,
				"seria": data.result[i].seria,
				"infoTitle": data.result[i].infoTitle,
				"description": data.result[i].description,
				"description_seria": data.result[i].description_seria,
				"option": data.result[i].option
			});
		}
		get_separation_Kompressor()
	})
	.fail(function(jqXHR, exception){
		//var msg = "Status Error: " + jqXHR.status + "; exeption: " + exception + "; responseText: " + jqXHR.responseText;
		//ErrorLog(msg, false);
	});
}
function get_separation_Kompressor(){
	$.getJSON($SCRIPT_ROOT + '/commercial_offer_main/separation/Kompressor',{
	}, function(data){
		for(var i = 0; i < data.result.length; i++){
			Kompressor.push({
				"id": data.result[i].id,
				"compressorManufacturer": data.result[i].compressorManufacturer,
				"compressorModel": data.result[i].compressorModel,
				"compressorEnginePower": data.result[i].compressorEnginePower,
				"fullName": data.result[i].fullName,
				"fullNameEN": data.result[i].fullNameEN,
				"compressorVolume": data.result[i].compressorVolume,
				"compressorCapacity": data.result[i].compressorCapacity,				
				"compressorPressure": data.result[i].compressorPressure,				
				"compressorVoltage": data.result[i].compressorVoltage,				
				"compressorHz": data.result[i].compressorHz,				
				"compressorPhase": data.result[i].compressorPhase,				
				"compressorMass": data.result[i].compressorMass,				
				"compressorPrice": parseFloat(data.result[i].compressorPrice.replace(",",".").replace(/[^0-9.]/gim, "")),				
				"desiccant": data.result[i].desiccant,				
				"filter": data.result[i].filter,	
				"ressiver": data.result[i].ressiver,	
				"imageName": data.result[i].imageName,		
				"currency": data.result[i].currency		
			});
		}
		get_separation_Price();
	})
	.fail(function(jqXHR, exception){
		//var msg = "Status Error: " + jqXHR.status + "; exeption: " + exception + "; responseText: " + jqXHR.responseText;
		//ErrorLog(msg, false);
	});
}
function get_separation_Price(){
	$.getJSON($SCRIPT_ROOT + '/commercial_offer_main/separation/Price',{
	}, function(data){
		for(var i = 0; i < data.result.length; i++){
			Price.push({
				"id": data.result[i].id,
				"name": data.result[i].name,
				"price": parseFloat(data.result[i].price.replace(",",".").replace(/[^0-9.]/gim, "")),
				"priceNDS": parseFloat(data.result[i].priceNDS.replace(",",".").replace(/[^0-9.]/gim, "")),					
				"priceExport": parseFloat(data.result[i].priceExport.replace(",",".").replace(/[^0-9.]/gim, ""))					
			});
		}
		get_separation_Conditions();		
	})
	.fail(function(jqXHR, exception){
		//var msg = "Status Error: " + jqXHR.status + "; exeption: " + exception + "; responseText: " + jqXHR.responseText;
		//ErrorLog(msg, false);
	});

}
function get_separation_Conditions(){
	$.getJSON($SCRIPT_ROOT + '/commercial_offer_main/separation/Conditions',{
	}, function(data){
		for(var i = 0; i < data.result.length; i++){
			Conditions.push({
				"termsOfPayment": data.result[i].termsOfPayment,
				"priceIncludes": data.result[i].priceIncludes,
				"Commissioning": data.result[i].Commissioning,
				"guarantee": data.result[i].guarantee,
				"delivery": data.result[i].delivery									
			});
		}
		setupDelivery();
		CalcWindowSelectorLoad();
		
		var queryString = location.search;
		if(queryString.search("d_") != -1){
			NewCommercialOfferInfo(InfoDeal.id_deal);
		}
		else if(queryString.search("s_") != -1){
			NewDealerCommercialOfferInfo(InfoDeal.id_deal);
		}
		
	})
	.fail(function(jqXHR, exception){
		//var msg = "Status Error: " + jqXHR.status + "; exeption: " + exception + "; responseText: " + jqXHR.responseText;
		//ErrorLog(msg, false);
	});
}
//Загрузка данных по комерческому предложению если они есть
function get_commercial_elements(){
	$.post($SCRIPT_ROOT + '/commercial_offer_main/load_offer',{
		id_task: InfoDeal.id_deal,
		id_offer: InfoDeal.id_commercial_offer,
		economicModel: "ВЭД"
	}, function(data){
		if(data.result.economic_model.length != 0){
			//Установка типа экономической модели
			headerTooltip.children[5].children[0].value = data.result.economic_model[0];
			changeEconomModel();
			//Подстановка элементов комерческого предложения
			var list_ColorSorter = data.result.list_ColorSorter;
			var list_Compressor = data.result.list_Compressor;
			var list_Protocol = data.result.list_Protocol;
			var list_Elevator = data.result.list_Elevator;
			var list_Other = data.result.list_Other;
			var list_Lift = data.result.list_Lift;			

			var rowElement = 1;
			//установка сепараторов 
			for(var i = 0; i < list_ColorSorter.length; i++){
				mainSelector.value = 0;
				changeMachineType();
				var apparatName = list_ColorSorter[i][2].split(" ")[0] == "SmartSort" ? list_ColorSorter[i][2].split(" ")[0] + " " + list_ColorSorter[i][2].split(" ")[1]: list_ColorSorter[i][2].split(" ")[0];
				for(var j = 0; j < calcElevator.options.length; j++){
					if(apparatName == calcElevator.options[j].textContent){
						calcElevator.value = j;
					}
					selectorParam();
				}
				var config = list_ColorSorter[i][2].split(" ")[0] == "SmartSort" ? list_ColorSorter[i][2].split(" ")[3] : list_ColorSorter[i][2].split(" ")[2];
				var loctok = list_ColorSorter[i][2].split(" ")[0] == "SmartSort" ? list_ColorSorter[i][2].split(" ")[2] : list_ColorSorter[i][2].split(" ")[1];
				calcConf.value = config;
				calcLotok.value = loctok;
				CalculatorClose();
				
				document.getElementById("count_" + rowElement).value = list_ColorSorter[i][3];
				document.getElementById("price_" + rowElement).value = list_ColorSorter[i][4];
				document.getElementById("discountValue_" + rowElement).value = value = Number(list_ColorSorter[i][4] * list_ColorSorter[i][3] - list_ColorSorter[i][5]);
				
				CalculatePrice(rowElement);
				updateComercialOfferElement(rowElement);
				rowElement++;
			}
			//установка компрессоров
			for(var i = 0; i < list_Compressor.length; i++){
				mainSelector.value = 1;
				changeMachineType();
				
				genesisProvider.value = list_Compressor[i][2].split(" ")[0];
				selectorKompressor();
				GenesisModel.value = list_Compressor[i][2].split(" ")[1];
				selectorKompressorModel();
				GenesisMotor.value = list_Compressor[i][2].split(" ")[2];
				CalculatorClose();
				
				document.getElementById("count_" + rowElement).value = list_Compressor[i][3];
				document.getElementById("price_" + rowElement).value = list_Compressor[i][4];
				document.getElementById("discountValue_" + rowElement).value = value = Number(list_Compressor[i][4] * list_Compressor[i][3] - list_Compressor[i][5]).toFixed(2);
				
				CalculatePrice(rowElement);
				updateComercialOfferElement(rowElement);
				rowElement++;
			}
			//установка лифтов
			for(var i = 0; i < list_Lift.length; i++){
				Calculator();
				mainSelector.value = 8;
				changeMachineType();
				
				cuberSize.value = list_Lift[i][2].split(' ')[2];
				CalculatorClose();				
				CalculatePrice(rowElement);
				updateComercialOfferElement(rowElement);
				rowElement++;
			}
			if(list_Elevator != 0){
				setupElevatorElements(list_Elevator, list_Other, list_Protocol, 0);
			}			
			else{
				setupOtherElements(list_Other, list_Protocol);
			}
		}
		headerTooltip.children[6].children[0].value = 1;
		changeDiscountType();
	})
	.fail(function(jqXHR, exception){
		//var msg = "Status Error: " + jqXHR.status + "; exeption: " + exception + "; responseText: " + jqXHR.responseText;
		//ErrorLog(msg, false);
	});	
}
function setupElevatorElements(list_Elevator, list_Other, list_Protocol, list_id){
	mainSelector.value = 3;
	changeMachineType();
	
	elevatorSelector.children[0].children[0].children[0].value = list_Elevator[list_id][2];
	get_Elevators([list_Elevator, list_Other, list_Protocol, list_id]);
}
function setupOtherElements(list_Other, list_Protocol){
	//Установка прочего
	for(var i = 0; i < list_Other.length; i++){
		mainSelector.value = 7;
		changeMachineType();
		
		CalculatorClose();
		
		var rowElement = priceModelBlock.children.length-1;
		document.getElementById("componentName_" + rowElement).textContent = list_Other[i][2];
		document.getElementById("count_" + rowElement).value = list_Other[i][3];
		document.getElementById("price_" + rowElement).value = list_Other[i][4];
		document.getElementById("discountValue_" + rowElement).value = value = Number(list_Other[i][4] - list_Other[i][5]).toFixed(2);
			
		CalculatePrice(rowElement);
		updateComercialOfferElement(rowElement);
		rowElement++;
	}
	if(list_Protocol.length != 0)
		setupProtocolElements(list_Protocol, 0);
	else
		CalculationSum();
}
function setupProtocolElements(list_Protocol, list_id){
	mainSelector.value = 2;
	changeMachineType();
	
	protocolSelector.children[0].children[0].children[0].value = list_Protocol[list_id][2];
	get_protocolData([list_Protocol, list_id]);
}

// получение значений дополнительных эелементов для оборудования
function get_aspiration(){
	$.getJSON($SCRIPT_ROOT + '/commercial_offer_main/Aspiration',{
	}, function(data){
		for(var i = 0; i < data.result.length; i++){
			Aspiration.push({
				"id": data.result[i].id,
				"type": data.result[i].type,
				"lotok": data.result[i].lotok,
				"name": data.result[i].name,
				"price": data.result[i].price
			});
		}
		get_bunker();
	})
	.fail(function(jqXHR, exception){});
}
function get_bunker(){
	$.getJSON($SCRIPT_ROOT + '/commercial_offer_main/Bunker',{
	}, function(data){
		for(var i = 0; i < data.result.length; i++){
			Bunker.push({
				"id": data.result[i].id,
				"type": data.result[i].type,
				"lotok": data.result[i].lotok,
				"name": data.result[i].name,
				"price": data.result[i].price
			});
		}
		get_complect();
	})
	.fail(function(jqXHR, exception){});
}
function get_complect(){
	$.getJSON($SCRIPT_ROOT + '/commercial_offer_main/Complect',{
	}, function(data){
		for(var i = 0; i < data.result.length; i++){
			Complect.push({
				"RU": data.result[i].RU,
				"EN": data.result[i].EN,
				"price": data.result[i].price,
				"vault": data.result[i].vault
			});
		}
		get_CUBER();
	})
	.fail(function(jqXHR, exception){});
}
function get_CUBER(){
	$.getJSON($SCRIPT_ROOT + '/commercial_offer_main/separation/CUBER',{
	}, function(data){
		for(var i = 0; i < data.result.length; i++){
			LiftType.push({
				"id": data.result[i].id,
				"mass": data.result[i].mass,
				"size": data.result[i].size,
				"price": data.result[i].price
			});
		}
		get_Import();
	})
	.fail(function(jqXHR, exception){});
}
function get_Import(){
	$.getJSON($SCRIPT_ROOT + '/commercial_offer_main/separation/Import',{
	}, function(data){
		for(var i = 0; i < data.result.length; i++){
			ImportType.push({
				"id": data.result[i].id,
				"Model": data.result[i].Model,
				"Voltage": data.result[i].Voltage,
				"kW": data.result[i].kW,
				"mass": data.result[i].mass,
				"Capaсity": data.result[i].Capaсity,
				"imageName": data.result[i].imageName,
				"sizeWidth": data.result[i].sizeWidth,
				"sizeHeight": data.result[i].sizeHeight,
				"sizeDeep": data.result[i].sizeDeep,
				"price": data.result[i].price,
				"description": data.result[i].description,
				"descriptionEn": data.result[i].descriptionEn
			});
		}
	})
	.fail(function(jqXHR, exception){});
}
//Сохранение данных по комерческому предложению
var __managerName;
var __managerDistrict;
function set_commercial_offer(){
	var queryString = location.search;
	var checkNewVersion = queryString.search("d_") != -1 || queryString.search("s_") != -1 ? true : false;
	
	if(!checkNewVersion){
		$.post($SCRIPT_ROOT + '/commercial_offer_main/save_offer',{
			write_data: ComercialOfferElements,
			len: ComercialOfferElements.length,
			managerName: __managerName,
			managerDistrict: __managerDistrict
		}, function(data){
			console.log("Запись статистики по комерческому предложению осуществлена");
		})
		.fail(function(jqXHR, exception){
			//var msg = "Status Error: " + jqXHR.status + "; exeption: " + exception + "; responseText: " + jqXHR.responseText;
			//ErrorLog(msg, false);
		});
	}
	else if(queryString.search("d_") != -1){
		UpdateCommercialOfferInfo();
	}
	else if(queryString.search("s_") != -1){
		UpdateDealerCommercialOfferInfo();
	}
}
// ПЕРЕВОДЫ
function get_translate_Total(){
	$.getJSON($SCRIPT_ROOT + '/commercial_offer_main/translate/Total',{
	}, function(data){
		Translate.Total.push({
			"title": data.result[0],
			"importParamText": data.result[1],
			"Capacity": data.result[2],
			"Accuracy": data.result[3],
			"Voltage": data.result[4],
			"Power": data.result[5],
			"Weight": data.result[6],
			"editDate": data.result[7],
			"pageMenu": data.result[8],
			"aboutCompany": data.result[9],
			"ref": data.result[10],
			"photoSep": data.result[11],
			"airReq": data.result[12],
			"disc": data.result[13],
			"discP": data.result[14],
			"deliverySelector": data.result[15],
			"Close": data.result[16],
			"Add": data.result[17],
			"Pick_up": data.result[18],
			"Create": data.result[19],
			"SmartSort": data.result[20],
			"MiniSort": data.result[21]
		});
		get_translate_FirstPage();
	})
	.fail(function(jqXHR, exception){});
}
function get_translate_FirstPage(){
	$.getJSON($SCRIPT_ROOT + '/commercial_offer_main/translate/FirstPage',{
	}, function(data){
		Translate.FirstPage.push({
			"csortDescription": data.result[0],
			"commercialOfferTitle": data.result[1],
			"vacancy": data.result[2],
			"csort": data.result[3],
			"clientName": data.result[4],
			"introduction": data.result[5]
		});
		get_translate_SpecifMenu();
	})
	.fail(function(jqXHR, exception){});
}
function get_translate_SpecifMenu(){
	$.getJSON($SCRIPT_ROOT + '/commercial_offer_main/translate/SpecifMenu',{
	}, function(data){
		Translate.SpecifMenu.push({
			"addButton": data.result[0],
			"overlayAddButton": data.result[1],
			"overlayCloseButton": data.result[2],
			"Apparat": data.result[3],
			"Compressor": data.result[4],
			"Protocol": data.result[5],
			"Protocol_Create": data.result[6],
			"Elevator": data.result[7],
			"Elevator_Pick": data.result[8],
			"Bunkers": data.result[9],
			"Aspiration": data.result[10],
			"Meaning": data.result[11],
			"Import": data.result[12],
			"Commissioning": data.result[13],
			"Delivery": data.result[14]
		});
		get_translate_Specification();
	})
	.fail(function(jqXHR, exception){});
}
function get_translate_Specification(){
	$.getJSON($SCRIPT_ROOT + '/commercial_offer_main/translate/Specification',{
	}, function(data){
		Translate.Specification.push({
			"Specification": data.result[0],
			"Item": data.result[1],
			"pcs": data.result[2],
			"Price": data.result[3],
			"Sum": data.result[4],
			"Discount": data.result[5],
			"DiscountAlt": data.result[6],
			"Discounted": data.result[7],
			"incl": data.result[8],
			"Total": data.result[9]
		});
		get_translate_Delivery();
	})
	.fail(function(jqXHR, exception){});
}
function get_translate_Delivery(){
	$.getJSON($SCRIPT_ROOT + '/commercial_offer_main/translate/Delivery',{
	}, function(data){
		Translate.Delivery.push({
			"DeliveryTerms": data.result[0],
			"delivery_name": data.result[1],
			"delivery": data.result[2],
			"payment_name": data.result[3],
			"payment": data.result[4],
			"commissioning_name": data.result[5],
			"commissioning": data.result[6],
			"priceInclude_name": data.result[7],
			"priceInclude": data.result[8],
			"warranty_name": data.result[9],
			"warranty": data.result[10],
			"delivery_VarButton": data.result[11],
			"priceInclude2": data.result[12],
			"commissioning2": data.result[13]
		});
		get_translate_SmartSort();
	})
	.fail(function(jqXHR, exception){});
}
function get_translate_SmartSort(){
	$.getJSON($SCRIPT_ROOT + '/commercial_offer_main/translate/SmartSort',{
	}, function(data){
		Translate.SmartSort.push({
			"title_main": data.result[0],
			"title_ModelSeria": data.result[1],
			"description_ModelTray": data.result[2],
			"size": data.result[3],
			"paramTitle": data.result[4],
			"Channel": data.result[5],
			"Capaсity": data.result[6],
			"Cleaning_factor": data.result[7],
			"CCD": data.result[8],
			"Voltage": data.result[9],
			"Hz": data.result[10],
			"kW": data.result[11],
			"Air_MPa": data.result[12],
			"air_title": data.result[13],
			"air_hard": data.result[14],
			"air_wet": data.result[15],
			"air_oil": data.result[16],
			"air_flow": data.result[17],
			"Air_flowMax": data.result[18],
			"modelBlock11_description": data.result[19],
			"modelBlock11_standart": data.result[20],
			"modelBlock11_additional": data.result[21],
			"Weight": data.result[22],
			"defence_class": data.result[23],
			"defence_lvl": data.result[24],
			"temp": data.result[25],
			"wet": data.result[26],
			"DBA": data.result[27],
			"exeption": data.result[28],
			"lifetime": data.result[29]
		});
		get_translate_Lift();
	})
	.fail(function(jqXHR, exception){});
}
function get_translate_Lift(){
	$.getJSON($SCRIPT_ROOT + '/commercial_offer_main/translate/Lift',{
	}, function(data){
		Translate.Lift.push({
			"title_main": data.result[0],
			"title_ModelSeria": data.result[1],
			"description": data.result[2],
			"size": data.result[3],
			"paramTitle": data.result[4],
			"Speed": data.result[5],
			"Voltage": data.result[6],
			"Phase": data.result[7],
			"Hz": data.result[8],
			"kW": data.result[9],
			"defence_class": data.result[10],
			"defence_lvl": data.result[11],
			"temp": data.result[12],
			"wet": data.result[13],
			"LevelMax": data.result[14],
			"DBA": data.result[15],
			"maxMass": data.result[16],
			"maxUP": data.result[17],
			"lifetime": data.result[18],
			"ShelfLife": data.result[19],
			"Shelf": data.result[20]
		});
		get_translate_Compressor();
	})
	.fail(function(jqXHR, exception){});
}
function get_translate_Compressor(){
	$.getJSON($SCRIPT_ROOT + '/commercial_offer_main/translate/Compressor',{
	}, function(data){
		for(var i = 0; i < data.result.length; i++){
			Translate.Compressor.push({
				"compressor": data.result[i].compressor,  
				"seria": data.result[i].seria,
				"infoTitle": data.result[i].infoTitle,
				"infoTitleEN": data.result[i].infoTitleEN,
				"description": data.result[i].description,
				"descriptionEN": data.result[i].descriptionEN,
				"description_seria": data.result[i].description_seria,
				"description_seriaEN": data.result[i].description_seriaEN,
				"option": data.result[i].option,
				"optionEN": data.result[i].optionEN
			});
		}
		get_translate_CompressorP();
	})
	.fail(function(jqXHR, exception){});
}
function get_translate_CompressorP(){
	$.getJSON($SCRIPT_ROOT + '/commercial_offer_main/translate/CompressorP',{
	}, function(data){
		Translate.CompressorP.push({
			"Volume": data.result[0],  
			"Capacity": data.result[1],
			"Pressure": data.result[2],
			"EnginePower": data.result[3],
			"Voltage": data.result[4],
			"Hz": data.result[5],
			"Phase": data.result[6],
			"Mass": data.result[7]
		});
		get_translate_Elevators();
	})
	.fail(function(jqXHR, exception){});
}
function get_translate_Elevators(){
	$.getJSON($SCRIPT_ROOT + '/commercial_offer_main/translate/Elevators',{
	}, function(data){
		Translate.Elevators.push({
			"materialCinc": data.result[0],  
			"materialMetal": data.result[1],
			"bucketP": data.result[2],
			"bucketM": data.result[3],
			"Yes": data.result[4],
			"No": data.result[5],
			"Backload": data.result[6],
			"DoubleSideBackload": data.result[7],
			"LoadT": data.result[8],
			"title_main": data.result[9],
			"capacity": data.result[10],
			"capacityP": data.result[11],
			"TransportLength": data.result[12],
			"Height": data.result[13],
			"BeltSpeed": data.result[14],
			"BucketStep": data.result[15],
			"DrumStep": data.result[16],
			"DrumDesign": data.result[17],
			"Material": data.result[18],
			"BucketMaterial": data.result[19],
			"motor": data.result[20],
			"Reducer": data.result[21],
			"TransportL": data.result[22],
			"TotalL": data.result[23],
			"ChainS": data.result[24],
			"ScraperP": data.result[25],
			"ScraperM": data.result[26],
			"ElevatorH": data.result[27],
			"TotalLEl": data.result[28],
			"UpperL": data.result[29],
			"LowerL": data.result[30],
			"BucketV": data.result[31],
			"SizePipes": data.result[32],
			"RatedPower": data.result[33],
			"EQUIPMENT": data.result[34],
			"Explosion": data.result[35],
			"SuctionConnect": data.result[36],
			"windowB": data.result[37],
			"Converter": data.result[38],
			"ControlBox": data.result[39],
			"Backward": data.result[40],
			"SpeedSensor": data.result[41],
			"TapeSensor": data.result[42],
			"SupportSensorTop": data.result[43],
			"SupportSensorBot": data.result[44],
			"StreetFulfillment": data.result[45],
			"DrillInBelt": data.result[46],
			"SuctionConnectB": data.result[47],
			"ViewingWin": data.result[48],
			"window": data.result[49],
			"Hatches": data.result[50],
			"LoadUnload": data.result[51],
			"Sensor": data.result[52],
			"ChainSensor": data.result[53],
			"AddLoad": data.result[54],
			"AddUnload": data.result[55],
			"Metall": data.result[56],
			"Sections": data.result[57],
			"Shoe": data.result[58],
			"bodyT": data.result[59],
			"capT": data.result[60],
			"lining": data.result[61],
			"MetallOther": data.result[62],
			"NonBearing": data.result[63],
			"MainDimensions": data.result[64],
			"SizeLengthBefore": data.result[65],
			"SizeLenghtUnload": data.result[66],
			"SizeLenghtTotal": data.result[67],
			"lengthAxis": data.result[68],
			"Text1": data.result[69],
			"Text2": data.result[70],
			"TitleCSZE": data.result[71],
			"TitleCSE": data.result[72],
			"TitleCSCC": data.result[73],
			"Squirrel":data.result[74],
			"AddUnloadE":data.result[75]
		});
		get_translate_Product();
	})
	.fail(function(jqXHR, exception){});
}
function get_translate_Product(){
	$.getJSON($SCRIPT_ROOT + '/commercial_offer_main/translate/Product_translate',{
	}, function(data){
		for(var i = 0; i < data.result.length; i++){
			Product_T.push({
			  "ID": data.result[i].id,
			  "id_group": data.result[i].id_group,
			  "RU": data.result[i].RU,
			  "EN": data.result[i].EN
			});
		  }
		getDataBase();
	})
	.fail(function(jqXHR, exception){});
}
function getDataBase(){
	$.ajax({
		url: '/commercial_offer_main/load_mainCO_data', 
		type: 'get',
		dataType: 'json',
		contentType: 'application/json',
		success: function(data){
			SetDataBase(data);			
			console.log(data);
			// createDataBase();
		},
		error: function (error) {
		  
		}
	  })
}
//getJSON-- запрос данных в виде соотв вида документа





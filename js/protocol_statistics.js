function set_statistics(){
	//сотавление массива данных
	var _data = [];
	_data.push(
		protocolRequirements.id_deal,
		protocolRequirements.id_requirements,
		protocol[protocolID].id_protocol,
		protocolRequirements.create_date,
		protocol[protocolID].create_date,
		protocol[protocolID].company_name != "" ? String(protocol[protocolID].company_name): "-",
		protocol[protocolID].id_creater != "" ? search_user_info(protocol[protocolID].id_creater).name : "-",
		protocol[protocolID].id_responsible != "" ? search_user_info(protocol[protocolID].id_responsible).name : "-",
		protocolRequirements.product_name,
		purityRequirements.value,
		protocolRequirements.capacity_type == 0 ? Number(capactityRequirements.value).toFixed(3) : Number(capactityRequirements.value / 1000).toFixed(6),
		purityMainFractionRequirement.value,
		protocolRequirements.capacity_type == 0 ? Number(capacityMainFractionRequirement.value).toFixed(3) : Number(capacityMainFractionRequirement.value / 1000).toFixed(6),
		returnProductString(protocolRequirements),
		returnEqupmentConfiguration(protocolRequirements),
		protocolTypeID.options[protocolTypeID.value].textContent,
		protocol[protocolID].sourceProduct.name,
		protocol[protocolID].sourceProduct.purity,
		protocol[protocolID].sourceProduct.capacity_type == 0 ? Number(protocol[protocolID].sourceProduct.capacity_value / 1000).toFixed(6) : Number(protocol[protocolID].sourceProduct.capacity_value).toFixed(3),
		returnMainFractionElements()[0],
		returnMainFractionElements()[1],
		returnProductString(protocol[protocolID].sourceProduct),
		returnEqupmentConfiguration(protocol[protocolID]),
		returnTraysNumber(),
		protocol[protocolID].sorting.length,
		true
	)
	
	$.post($SCRIPT_ROOT + '/protocol/write_statistics',{
		write_data: _data
	}, function(data){
		console.log("Запись в таблицу статистики осуществленна");
		get_clientForSaveRemove();
	})
	.fail(function(jqXHR, exception){
		var msg = "Status Error: " + jqXHR.status + "; exeption: " + exception + "; responseText: " + jqXHR.responseText;
		ErrorLog(msg, false);
	});
}
function get_statistics(){
	$.getJSON($SCRIPT_ROOT + '',{
		
	}, function(data){
		

	})
	.fail(function(){
		get_statistics();
	});
}

function edit_statistics(){
	var _data = [];
	_data.push(
		
	)
	
	$.post($SCRIPT_ROOT + '', {
		id_protocol: protocol[protocolID].id_protocol,		
		write_data: _data
	}, function(data){		
		console.log("Запись в таблицу протокол осуществленна");		
	})
	.fail(function(){
		edit_statistics();
	})
}
//Дополнительные функции для составление статистики
function returnProductString(element){
	var string = "";
	for(var i = 0; i < element.components.length; i++){
		string += element.components[i].product_name + ",";
	}
	return string;	
}
function returnEqupmentConfiguration(element){
	var equipment_machine = Number(element.equipment_machine) != 9999 ? list_machine[element.equipment_machine].machineName : "-";
	var configuration = Number(element.configuration) != 9999 ? list_configuration[element.configuration].configuration : "-";
	var string = equipment_machine + " " + configuration;
	
	return string;
}

function returnMainFractionElements(){
	var mainFractionID;
	//Поиск ID основной фракции 
	for(var i = 0; i < protocolRequirements.fractions.length; i++){
		if(protocolRequirements.fractions[i].mainFraction)
			mainFractionID = String(i + 1);
	}
	
	var sunMainFractionsPurity = 0;
	var sumMainFractionsCapacity = 0;
	//Составление суммы производительностей основной фракции
	for(var i = 0; i < protocol[protocolID].sorting.length; i++){
		/*if(protocol[protocolID].sorting[i].accept_name_id == mainFractionID){
			sumMainFractionsCapacity += Number(protocol[protocolID].sorting[i].accept_mass);
			for(var j = 0; j < protocol[protocolID].sourceProduct.components.length; j++){
				var value = Number(protocol[protocolID].sorting[i].accept_mass/ 100 * protocol[protocolID].sorting[i].accept_components[j].value);
				sumMainFractionsCompnents[j] = sumMainFractionsCompnents[j] == null ? mass : sumMainFractionsCompnents[j] + mass;
			}
		}
		if(protocol[protocolID].sorting[i].reject_name_id == mainFractionID){
			sumMainFractionsCapacity += Number(protocol[protocolID].sorting[i].reject_mass);
			for(var j = 0; j < protocol[protocolID].sourceProduct.components.length; j++){
				var value = Number(protocol[protocolID].sorting[i].accept_mass/ 100 * protocol[protocolID].sorting[i].accept_components[j].value);
				sumMainFractionsCompnents[j] = sumMainFractionsCompnents[j] == null ? value : sumMainFractionsCompnents[j] + value;
			}
		}*/
		if(protocol[protocolID].sorting[i].accept_name_id == mainFractionID){
			sunMainFractionsPurity = protocol[protocolID].sorting[i].accept_purity;
			sumMainFractionsCapacity = protocol[protocolID].sorting[i].accept_mass / 1000;
		}
		if(protocol[protocolID].sorting[i].reject_name_id == mainFractionID){
			sunMainFractionsPurity = protocol[protocolID].sorting[i].reject_purity;
			sumMainFractionsCapacity = protocol[protocolID].sorting[i].reject_mass / 1000;
		}
	}
	if(mainFractionID == null){
		sunMainFractionsPurity = "-";
		sumMainFractionsCapacity = "-";
	}		
	return [sunMainFractionsPurity , sumMainFractionsCapacity];
}
function returnTraysNumber(){
	var traysNumber = 0;
	for(var i = 0; i < protocol[protocolID].sorting.length; i++){
		var remainder = Number(protocol[protocolID].sorting[i].trays_number).toFixed(2).split(".")[1]  / 100;
		traysNumber = remainder >= 0.1 ? Math.ceil(protocol[protocolID].sorting[i].trays_number) + Number(traysNumber) : Math.floor(protocol[protocolID].sorting[i].trays_number) + Number(traysNumber);
	}
	return traysNumber;
}
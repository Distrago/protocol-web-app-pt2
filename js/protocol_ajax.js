//Запись в таблицу протокола
var __id_protocol;
var __upload_fail = false;
function set_protocol_mainData(){
	
	$.post($SCRIPT_ROOT + '/protocol/write_mainInfo', {
		id_protocol: "-",
		id_requirements: protocolRequirements.id_requirements,
		write_type: "тест",
		equipment: protocol[protocolID].equipment_machine,
		configuration: protocol[protocolID].configuration,
		sortingValue: protocol[protocolID].sorting.length,
		componentValue: protocol[protocolID].sourceProduct.components.length
	}, function(data){
		__id_protocol = data.result[0];
		set_protocol_sourceProduct();
		console.log("Запись в таблицу протокол осуществленна");
	})
	.fail(function() {
		get_clientForSaveRemove();
		set_protocol_mainData();
	});
}
function set_protocol_sourceProduct(){
	var _images_name = []; 
	var _base64_img = [];
	for(var i = 0; i<protocol[protocolID].sourceProduct.images.length; i++){
		_images_name.push("sourceProductImage_"+Number(i+1));
		_base64_img.push(protocol[protocolID].sourceProduct.images[i].substr(22));
	}
	//Создание id для классификатора
	var id_classifier;
	id_classifier = protocol[protocolID].sourceProduct.classifier.classifierType;
	if(protocol[protocolID].sourceProduct.classifier.classifierType == 0){
		id_classifier += protocol[protocolID].sourceProduct.classifier.classifierProduct.useADD ? ",1" : ",0";
		if(!protocol[protocolID].sourceProduct.classifier.classifierProduct.useADD){
			id_classifier += ","+protocol[protocolID].sourceProduct.classifier.classifierProduct.mainClassifier.industryID;
			id_classifier += ","+protocol[protocolID].sourceProduct.classifier.classifierProduct.mainClassifier.groupProductID;
			id_classifier += ","+protocol[protocolID].sourceProduct.classifier.classifierProduct.mainClassifier.productID;
			id_classifier += ","+protocol[protocolID].sourceProduct.classifier.classifierProduct.mainClassifier.descriptionID;
			id_classifier += ","+protocol[protocolID].sourceProduct.classifier.classifierProduct.mainClassifier.productTypeID;
			id_classifier += ","+protocol[protocolID].sourceProduct.classifier.classifierProduct.mainClassifier.productSortID;
			id_classifier += ","+protocol[protocolID].sourceProduct.classifier.classifierProduct.mainClassifier.purposeID;
			id_classifier += ","+protocol[protocolID].sourceProduct.classifier.classifierProduct.mainClassifier.GOST_ID;
		}
		else{
			//На будущие
			id_classifier += ","+"9999";
		}
	}
	else{
		id_classifier += protocol[protocolID].sourceProduct.classifier.classifierWeed.useADD ? ",1" : ",0";
		if(!protocol[protocolID].sourceProduct.classifier.classifierProduct.useADD){
			id_classifier += ","+protocol[protocolID].sourceProduct.classifierWeed.mainClassifier.industryID;
			id_classifier += ","+protocol[protocolID].sourceProduct.classifierWeed.mainClassifier.categoryID;
			id_classifier += ","+protocol[protocolID].sourceProduct.classifierWeed.mainClassifier.classWeedID;
			id_classifier += ","+protocol[protocolID].sourceProduct.classifierWeed.mainClassifier.weedNameID;
			id_classifier += ","+protocol[protocolID].sourceProduct.classifierWeed.mainClassifier.descriptionID;
		}
		else{
			//На будущие
			id_classifier += ","+"9999";
		}
	}
	
	$.post($SCRIPT_ROOT + '/protocol/write_sourceProduct',{
		id_protocol: __id_protocol,
		id_requirements: protocolRequirements.id_requirements,
		id_product: id_classifier,
		productName: protocol[protocolID].sourceProduct.name,
		purpose: "-",
		purity: Number(protocol[protocolID].sourceProduct.purity).toFixed(3),
		capacity: Number(protocol[protocolID].sourceProduct.capacity_value).toFixed(3),
		capacity_type: protocol[protocolID].sourceProduct.capacity_type,
		selection: Number(protocol[protocolID].sourceProduct.selection_value).toFixed(3),
		selection_type: protocol[protocolID].sourceProduct.selection_type,
		photoFolder: "protocol_"+__id_protocol+"_sourceProduct",
		id_mainPhoto: protocol[protocolID].sourceProduct.images.length-1,
		//дополнитеьные элементы
		images_name: _images_name,
		base64_images: _base64_img
	}, function(data){
		set_protocol_sorting(0, protocol[protocolID].sorting.length-1);
		console.log("Запись в таблицу исходного продукта осуществленна");
	})
	.fail(function(){
		set_protocol_sourceProduct();
	});
}
function set_protocol_sorting(__id_sorting, __id_sorting_max){
	var listInboxFraction="";
	for(var id=0; id<protocol[protocolID].sorting[__id_sorting].inbox_fraction.length; id++){
		if(protocol[protocolID].sorting[__id_sorting].inbox_fraction[id].accept)
			listInboxFraction += "1";
		else
			listInboxFraction += "0";
		if(protocol[protocolID].sorting[__id_sorting].inbox_fraction[id].reject)
			listInboxFraction += "1";
		else
			listInboxFraction += "0";	
	}
	$.post($SCRIPT_ROOT + '/protocol/write_sorting',{
		id_protocol: __id_protocol,
		id_sorting: __id_sorting+1,
		inbox_fraction: listInboxFraction,
		purity: Number(protocol[protocolID].sorting[__id_sorting].purity).toFixed(3),
		capacity: Number(protocol[protocolID].sorting[__id_sorting].capacity_value).toFixed(3),
		capacity_type: protocol[protocolID].sorting[__id_sorting].capacity_type,
		programFolder: "none"
	}, function(data){
		if(__id_sorting < __id_sorting_max)
			set_protocol_sorting(__id_sorting+1, __id_sorting_max);
		else
		{
			set_protocol_accept(0, __id_sorting_max)
			console.log("Запись в таблицу сортировок осуществленна");
		}
	})
	.fail(function(){
		set_protocol_sorting(__id_sorting, __id_sorting_max);
	});
}
function set_protocol_accept(__id_sorting, __id_sorting_max){
	var _images_name = []; 
	var _base64_img = [];
	for(var i = 0; i<protocol[protocolID].sorting[__id_sorting].accept_img.length; i++){
		_images_name.push("acceptImage_"+Number(i+1));
		_base64_img.push(protocol[protocolID].sorting[__id_sorting].accept_img[i].substr(22));
	}
	
	$.post($SCRIPT_ROOT + '/protocol/write_accept',{
		id_protocol: __id_protocol,
		id_sorting: __id_sorting+1,
		fractionName: protocol[protocolID].sorting[__id_sorting].accept_name,
		selection: Number(protocol[protocolID].sorting[__id_sorting].accept_selection_mass).toFixed(3),
		selection_type: protocol[protocolID].sorting[__id_sorting].accept_selection_type,
		exit: Number(protocol[protocolID].sorting[__id_sorting].accept_exit).toFixed(3),
		purity: Number(protocol[protocolID].sorting[__id_sorting].accept_purity).toFixed(3),
		capacity: Number(protocol[protocolID].sorting[__id_sorting].accept_mass).toFixed(3),
		photoFolder: "protocol_"+__id_protocol+"_accept_"+Number(__id_sorting+1),
		id_mainPhoto: protocol[protocolID].sorting[__id_sorting].accept_img.length-1,		
		//дополнитеьные элементы
		images_name: _images_name,
		base64_images: _base64_img
	}, function(data){
		set_protocol_reject(__id_sorting, __id_sorting_max);
	})
	.fail(function(){
		set_protocol_accept(__id_sorting, __id_sorting_max);
	});
}
function set_protocol_reject(__id_sorting, __id_sorting_max){
	var _images_name = []; 
	var _base64_img = [];
	for(var i = 0; i<protocol[protocolID].sorting[__id_sorting].reject_img.length; i++){
		_images_name.push("rejectImage_"+Number(i+1));
		_base64_img.push(protocol[protocolID].sorting[__id_sorting].reject_img[i].substr(22));
	}
	
	$.post($SCRIPT_ROOT + '/protocol/write_reject',{
		id_protocol: __id_protocol,
		id_sorting: __id_sorting+1,
		fractionName: protocol[protocolID].sorting[__id_sorting].reject_name,
		selection: Number(protocol[protocolID].sorting[__id_sorting].reject_selection_mass).toFixed(3),
		selection_type: protocol[protocolID].sorting[__id_sorting].reject_selection_type,
		exit: Number(protocol[protocolID].sorting[__id_sorting].reject_exit).toFixed(3),
		purity: Number(protocol[protocolID].sorting[__id_sorting].reject_purity).toFixed(3),
		capacity: Number(protocol[protocolID].sorting[__id_sorting].reject_mass).toFixed(3),
		photoFolder: "protocol_"+__id_protocol+"_reject_"+Number(__id_sorting+1),
		id_mainPhoto: protocol[protocolID].sorting[__id_sorting].reject_img.length-1,		
		//дополнитеьные элементы
		images_name: _images_name,
		base64_images: _base64_img
	}, function(data){
		if(__id_sorting < __id_sorting_max)
			set_protocol_accept(__id_sorting+1, __id_sorting_max)
		else{
			set_protocol_components_mainInfo(0, protocol[protocolID].sourceProduct.components.length-1);
			console.log("Запись в таблицу проходов и отбоев осуществленна");
		}
	})
	.fail(function(){
		set_protocol_reject(__id_sorting, __id_sorting_max);
	});
}
function set_protocol_components_mainInfo(__id_component, __id_component_max){
	var _images_name = []; 
	var _base64_img = [];
	for(var i = 0; i<protocol[protocolID].sourceProduct.components[__id_component].images.length; i++){
		_images_name.push("component_"+Number(i+1));
		_base64_img.push(protocol[protocolID].sourceProduct.components[__id_component].images[i].substr(22));
	}
	//Создание id для классификатора
	var id_classifier;
	id_classifier = protocol[protocolID].sourceProduct.components[__id_component].classifier.classifierType;
	if(protocol[protocolID].sourceProduct.components[__id_component].classifier.classifierType == 0){
		id_classifier += protocol[protocolID].sourceProduct.components[__id_component].classifier.classifierProduct.useADD ? ",1" : ",0";
		if(!protocol[protocolID].sourceProduct.components[__id_component].classifier.classifierProduct.useADD){
			id_classifier += ","+protocol[protocolID].sourceProduct.components[__id_component].classifier.classifierProduct.mainClassifier.industryID;
			id_classifier += ","+protocol[protocolID].sourceProduct.components[__id_component].classifier.classifierProduct.mainClassifier.groupProductID;
			id_classifier += ","+protocol[protocolID].sourceProduct.components[__id_component].classifier.classifierProduct.mainClassifier.productID;
			id_classifier += ","+protocol[protocolID].sourceProduct.components[__id_component].classifier.classifierProduct.mainClassifier.descriptionID;
			id_classifier += ","+protocol[protocolID].sourceProduct.components[__id_component].classifier.classifierProduct.mainClassifier.productTypeID;
			id_classifier += ","+protocol[protocolID].sourceProduct.components[__id_component].classifier.classifierProduct.mainClassifier.productSortID;
		}
		else{
			//На будущие
			id_classifier += ","+"9999";
		}
	}
	else{
		id_classifier += protocol[protocolID].sourceProduct.components[__id_component].classifier.classifierWeed.useADD ? ",1" : ",0";
		if(protocol[protocolID].sourceProduct.components[__id_component].classifier.classifierWeed.useADD){
			id_classifier += ","+protocol[protocolID].sourceProduct.components[__id_component].classifier.classifierWeed.mainClassifier.industryID;
			id_classifier += ","+protocol[protocolID].sourceProduct.components[__id_component].classifier.classifierWeed.mainClassifier.categoryID;
			id_classifier += ","+protocol[protocolID].sourceProduct.components[__id_component].classifier.classifierWeed.mainClassifier.classWeedID;
			id_classifier += ","+protocol[protocolID].sourceProduct.components[__id_component].classifier.classifierWeed.mainClassifier.weedNameID;
			id_classifier += ","+protocol[protocolID].sourceProduct.components[__id_component].classifier.classifierWeed.mainClassifier.descriptionID;
		}
		else{
			//На будущие
			id_classifier += ","+"9999";
		}
	}
	
	$.post($SCRIPT_ROOT + '/protocol/write_components_1',{
		id_protocol: __id_protocol,
		id_component: id_classifier,
		component_number: __id_component+1,
		component_name: protocol[protocolID].sourceProduct.components[__id_component].product_name,
		component_value: Number(protocol[protocolID].sourceProduct.components[__id_component].value).toFixed(3),
		component_type: protocol[protocolID].sourceProduct.components[__id_component].value_type,
		component_valid_check: protocol[protocolID].sourceProduct.components[__id_component].flag_1,
		component_remove_check: protocol[protocolID].sourceProduct.components[__id_component].flag_2,
		photoFolder: "protocol_"+__id_protocol+"_component_"+Number(__id_component+1),
		id_mainPhoto:  protocol[protocolID].sourceProduct.components[__id_component].images.length-1,
		//дополнитеьные элементы
		images_name: _images_name,
		base64_images: _base64_img		
	}, function(data){
		if(__id_component < __id_component_max)
			set_protocol_components_mainInfo(__id_component+1, __id_component_max);
		else{
			fraction_accept_reject();
			set_protocol_components_addInfo(0, _AcceptReject.length-1, 0, __id_component_max);
		}
	})
	.fail(function(){
		set_protocol_components_mainInfo(__id_component, __id_component_max);
	});
}
function set_protocol_components_addInfo(__id_AcceptReject, __id_AcceptReject_max, __id_component, __id_component_max){
	$.post($SCRIPT_ROOT + '/protocol/write_components_2',{
		id_AcceptReject: __id_AcceptReject+1,
		str_number: Number(_AcceptReject[__id_AcceptReject].length - __id_component - 1),
		component_value: Number(_AcceptReject[__id_AcceptReject][__id_component].value).toFixed(3),
		component_type: _AcceptReject[__id_AcceptReject][__id_component].value_type,
		component_valid_check: _AcceptReject[__id_AcceptReject][__id_component].flag_1,
		component_warnin_check: _AcceptReject[__id_AcceptReject][__id_component].flag_2
	}, function(data){
		if(__id_component < __id_component_max){
			set_protocol_components_addInfo(__id_AcceptReject, __id_AcceptReject_max, __id_component+1, __id_component_max);
		}
		else
		{
			if(__id_AcceptReject < __id_AcceptReject_max){
				set_protocol_components_addInfo(__id_AcceptReject+1, __id_AcceptReject_max, 0, __id_component_max);
			}
			else{
				console.log("Запись в таблицу компанентов осуществленна");
				get_clientForSaveRemove();
			}
		}
	})
	.fail(function(){
		set_protocol_components_addInfo(__id_AcceptReject, __id_AcceptReject_max, __id_component, __id_component_max);
	});
}
var _AcceptReject = [];
function fraction_accept_reject(){
	_AcceptReject = [];
	for(var i = 0; i < protocol[protocolID].sorting.length; i++){
		_AcceptReject.push(protocol[protocolID].sorting[i].accept_components);
		_AcceptReject.push(protocol[protocolID].sorting[i].reject_components);
	}
}
function get_protocol_requirements(){
	$.post($SCRIPT_ROOT + '/protocol/get_protocol',{
		id_requirements: protocolRequirements.id_requirements
	}, function(data){
		if(data.result.length == 0){
			get_task_bitrix24(queryParametrList.id);
			overlay.style.display = "none";
		}
		else{
			for(var i=0; i < data.result.length; i++){
				addProtocolData();
				load_protocol[i] = true;
				protocolID = i;
				
				try{
					protocol[protocolID].id_protocol = data.result[i]["ID_Protocol"];
					protocol[protocolID].id_requirements = data.result[i]["ID_Requirements"];
					protocol[protocolID].id_protocolType = data.result[i]["write_type"];
					protocol[protocolID].id_creater = data.result[i]["ID_creater"];
					protocol[protocolID].id_responsible = data.result[i]["ID_responsible"];
					protocol[protocolID].company_name = data.result[i]["company_name"];
					protocol[protocolID].equipment_machine = data.result[i]["equipment"];
					protocol[protocolID].configuration = data.result[i]["configuration"];
					protocol[protocolID].create_date = data.result[i]["create_date"];
					
					document.getElementById("protocol_"+Number(protocolID+1)).children[0].children[1].children[1].children[1].children[0].children[0].value = protocol[protocolID].equipment_machine;
					setupProtocolConfiguration(Number(protocolID+1), protocol[protocolID].equipment_machine);		
			
					for(var _i = 1; _i < Number(data.result[i]["componentValue"]); _i++)
						addSourceItem();
					for(var _i = 1; _i < Number(data.result[i]["sortingValue"]); _i++)
						addSortingBlock();
				}
				catch(error){
					console.log(error.name+": "+ error.message);
				}
				clearProtocolInterface();
			}
			get_product();
			get_task_bitrix24(queryParametrList.id);
		}
	})
	.fail(function(jqXHR, exception){
		var msg = "Status Error: " + jqXHR.status + "; exeption: " + exception + "; responseText: " + jqXHR.responseText;
		ErrorLog(msg, false);
	});
}
var protocolClassfierAddList = [];
function get_product(){
	$.getJSON($SCRIPT_ROOT + '/protocol/get_product',{
	}, function(data){
		for(var i = 0; i < data.result.length; i++){
			protocolID = i;
				try{
					protocol[protocolID].sourceProduct.name = data.result[i]["productName"];
					protocol[protocolID].sourceProduct.purity = data.result[i]["purity"];
					protocol[protocolID].sourceProduct.capacity_value = data.result[i]["capacity"];
					protocol[protocolID].sourceProduct.capacity_type = data.result[i]["capacity_type"];
					protocol[protocolID].sourceProduct.selection_value = data.result[i]["selection"];
					protocol[protocolID].sourceProduct.selection_type = data.result[i]["selection_type"];
					
					var id_classifier = data.result[i]["ID_Product"].split(",");
					protocol[protocolID].sourceProduct.classifier.classifierType = Number(id_classifier[0]);
					if(protocol[protocolID].sourceProduct.classifier.classifierType == 0){
						protocol[protocolID].sourceProduct.classifier.classifierProduct.useADD = id_classifier[1] == "1" ? true : false;
						if(!protocol[protocolID].sourceProduct.classifier.classifierProduct.useADD){
							protocol[protocolID].sourceProduct.classifier.classifierProduct.mainClassifier.industryID = id_classifier[2];
							protocol[protocolID].sourceProduct.classifier.classifierProduct.mainClassifier.groupProductID = id_classifier[3];
							protocol[protocolID].sourceProduct.classifier.classifierProduct.mainClassifier.productID = id_classifier[4];
							protocol[protocolID].sourceProduct.classifier.classifierProduct.mainClassifier.descriptionID = id_classifier[5];
							protocol[protocolID].sourceProduct.classifier.classifierProduct.mainClassifier.productTypeID = id_classifier[6];
							protocol[protocolID].sourceProduct.classifier.classifierProduct.mainClassifier.productSortID = id_classifier[7];
							protocol[protocolID].sourceProduct.classifier.classifierProduct.mainClassifier.purposeID = id_classifier[8];
							protocol[protocolID].sourceProduct.classifier.classifierProduct.mainClassifier.GOST_ID = id_classifier[9];
						}
						else{
							protocolClassfierAddList.push({"id": id_classifier[2], "classifierType" : protocol[protocolID].sourceProduct.classifier.classifierType});
						}
					}
					else{
						protocol[protocolID].sourceProduct.classifier.classifierWeed.useADD = id_classifier[1] == "1" ? true : false;
						if(!protocol[protocolID].sourceProduct.classifier.classifierWeed.useADD){
							protocol[protocolID].sourceProduct.classifier.classifierWeed.mainClassifier.industryID = id_classifier[2];
							protocol[protocolID].sourceProduct.classifier.classifierWeed.mainClassifier.categoryID = id_classifier[3];
							protocol[protocolID].sourceProduct.classifier.classifierWeed.mainClassifier.classWeedID = id_classifier[4];
							protocol[protocolID].sourceProduct.classifier.classifierWeed.mainClassifier.weedNameID = id_classifier[5];
							protocol[protocolID].sourceProduct.classifier.classifierWeed.mainClassifier.descriptionID = id_classifier[6];
						}
						else{
							protocolClassfierAddList.push({"id": id_classifier[2], "classifierType" : protocol[protocolID].sourceProduct.classifier.classifierType});
						}
					}
					//Добавляем записанные фотки
					for(var j=0; j<=Number(data.result[i]["ID_mainPhoto"]); j++){
						protocol[protocolID].sourceProduct.images.push("/static/img/save_img/protocol_"+data.result[i].ID_Protocol+"/"+data.result[i].photoFolder+"/sourceProductImage_"+Number(j+1)+".png?u=" + last_updated);
					}
				}
				catch(error){
					console.log(error.name+": "+ error.message);
				}
		}
		get_sorting();
	})
	.fail(function(jqXHR, exception){
		var msg = "Status Error: " + jqXHR.status + "; exeption: " + exception + "; responseText: " + jqXHR.responseText;
		ErrorLog(msg, false);
	});
}

function get_sorting(){
	$.getJSON($SCRIPT_ROOT + '/protocol/get_sorting',{
	}, function(data){
		var count = 0;
		for(var id = 0; id < protocol.length; id++){
			protocolID = id;
			for(var i = 0; i< protocol[protocolID].sorting.length; i++){
				try{
				protocol[protocolID].sorting[i].id = Number(data.result[count]["ID_Sorting"]-1);
				protocol[protocolID].sorting[i].capacity_value = Number(data.result[count]["capacity"]);
				protocol[protocolID].sorting[i].capacity_type = Number(data.result[count]["capacity_type"]);
				protocol[protocolID].sorting[i].purity = Number(data.result[count]["purity"]);
				protocol[protocolID].sorting[i].inbox_fraction = inbox_fraction_decode(data.result[count]["inbox_fraction"]);
				protocol[protocolID].sorting[i].trays_number = Number(data.result[count]["trays_number"]).toFixed(2);
				count++;
				}
				catch(error){
					console.log(error.name+": "+ error.message);
				}
			}
		}
		if(data.result.length == 0 || protocol[0].id_protocol != data.result[0]["ID_Protocol"])
			get_sorting();
		else
			get_accept();
	})
	.fail(function(jqXHR, exception){
		var msg = "Status Error: " + jqXHR.status + "; exeption: " + exception + "; responseText: " + jqXHR.responseText;
		ErrorLog(msg, false);
	});
}

function get_accept(){
	$.getJSON($SCRIPT_ROOT + '/protocol/get_accept',{
	}, function(data){
		var count = 0;
		for(var id = 0; id < protocol.length; id++){
			protocolID = id;
			for(var i = 0; i< protocol[protocolID].sorting.length; i++){
				try{
					protocol[protocolID].sorting[i].accept_name = data.result[count]["fractionName"];
					protocol[protocolID].sorting[i].accept_name_id = data.result[count]["fractionNameID"];
					protocol[protocolID].sorting[i].accept_exit = Number(data.result[count]["exit"]);
					protocol[protocolID].sorting[i].accept_purity = Number(data.result[count]["purity"]);
					protocol[protocolID].sorting[i].accept_mass = Number(data.result[count]["capacity"]);
					protocol[protocolID].sorting[i].accept_selection_mass = Number(data.result[count]["selection"]);
					protocol[protocolID].sorting[i].accept_selection_type = Number(data.result[count]["selectiont_type"]);
						
					//Добавляем записанные фотки
					for(var j=0; j<=Number(data.result[count]["ID_mainPhoto"]); j++){
						protocol[protocolID].sorting[i].accept_img.push("/static/img/save_img/protocol_"+data.result[protocolID].ID_Protocol+"/"+data.result[protocolID].photoFolder+"/acceptImage_"+Number(j+1)+".png?u=" + last_updated);
					}
					count++;
				}
				catch(error){
					console.log(error.name+": "+ error.message);
				}
			}
		}
		if(data.result.length == 0 || protocol[0].id_protocol != data.result[0]["ID_Protocol"])
			get_accept();
		else
			get_reject();
	})
	.fail(function(jqXHR, exception){
		var msg = "Status Error: " + jqXHR.status + "; exeption: " + exception + "; responseText: " + jqXHR.responseText;
		ErrorLog(msg, false);
	});
}

function get_reject(){
	$.getJSON($SCRIPT_ROOT + '/protocol/get_reject',{
	}, function(data){
		var count = 0;
		for(var id = 0; id < protocol.length; id++){
			protocolID = id;
			for(var i = 0; i< protocol[protocolID].sorting.length; i++){
				try{
					protocol[protocolID].sorting[i].reject_name = data.result[count]["fractionName"];
					protocol[protocolID].sorting[i].reject_name_id = data.result[count]["fractionNameID"];
					protocol[protocolID].sorting[i].reject_exit = Number(data.result[count]["exit"]);
					protocol[protocolID].sorting[i].reject_purity = Number(data.result[count]["purity"]);
					protocol[protocolID].sorting[i].reject_mass = Number(data.result[count]["capacity"]);
					protocol[protocolID].sorting[i].reject_selection_mass = Number(data.result[count]["selection"]);
					protocol[protocolID].sorting[i].reject_selection_type = Number(data.result[count]["selectiont_type"]);
						
					//Добавляем записанные фотки
					for(var j=0; j<=Number(data.result[count]["ID_mainPhoto"]); j++){
						protocol[protocolID].sorting[i].reject_img.push("/static/img/save_img/protocol_"+data.result[protocolID].ID_Protocol+"/"+data.result[protocolID].photoFolder+"/rejectImage_"+Number(j+1)+".png?u=" + last_updated);
					}
					count++;
				}
				catch(error){
					console.log(error.name+": "+ error.message);
				}
			}
		}
		if(data.result.length == 0 || protocol[0].id_protocol != data.result[0]["ID_Protocol"])
			get_reject();
		else
			get_component();
	})
	.fail(function(jqXHR, exception){
		var msg = "Status Error: " + jqXHR.status + "; exeption: " + exception + "; responseText: " + jqXHR.responseText;
		ErrorLog(msg, false);
	});
}
function get_component(){
	$.getJSON($SCRIPT_ROOT + '/protocol/get_component',{
	}, function(data){
		var count = 0;
		for(var id = 0; id < protocol.length; id++){
			protocolID = id;
			for(var i=0; i < protocol[protocolID].sourceProduct.components.length; i++){
				try{
					protocol[protocolID].sourceProduct.components[i].product_name = data.result[count]["row_3"];
					protocol[protocolID].sourceProduct.components[i].value = (data.result[count]["row_7"] == "TRUE") ? data.result[count]["row_4"] : 0;
					protocol[protocolID].sourceProduct.components[i].value_type = data.result[count]["row_5"];
					protocol[protocolID].sourceProduct.components[i].removed_value = (data.result[i]["row_7"] == "FALSE") ? data.result[i]["row_4"] : 0;
					protocol[protocolID].sourceProduct.components[i].flag_1 = (data.result[count]["row_6"] == "TRUE") ? true : false;
					protocol[protocolID].sourceProduct.components[i].flag_2 = (data.result[count]["row_7"] == "TRUE") ? true : false;
					
					var id_classifier = data.result[count]["row_1"].split(",");
					protocol[protocolID].sourceProduct.components[i].classifier.classifierType = Number(id_classifier[0]);
					if(protocol[protocolID].sourceProduct.components[i].classifier.classifierType == 0){
						protocol[protocolID].sourceProduct.components[i].classifier.classifierProduct.useADD = id_classifier[1] == "1" ? true : false;
						if(!protocol[protocolID].sourceProduct.components[i].classifier.classifierProduct.useADD){
							protocol[protocolID].sourceProduct.components[i].classifier.classifierProduct.mainClassifier.industryID = id_classifier[2];
							protocol[protocolID].sourceProduct.components[i].classifier.classifierProduct.mainClassifier.groupProductID = id_classifier[3];
							protocol[protocolID].sourceProduct.components[i].classifier.classifierProduct.mainClassifier.productID = id_classifier[4];
							protocol[protocolID].sourceProduct.components[i].classifier.classifierProduct.mainClassifier.descriptionID = id_classifier[5];
							protocol[protocolID].sourceProduct.components[i].classifier.classifierProduct.mainClassifier.productTypeID = id_classifier[6];
							protocol[protocolID].sourceProduct.components[i].classifier.classifierProduct.mainClassifier.productSortID = id_classifier[7];
						}
						else{
							protocolClassfierAddList.push({"id": id_classifier[2], "classifierType" : protocol[protocolID].sourceProduct.components[i].classifier.classifierType});
						}
					}
					else{
						protocol[protocolID].sourceProduct.components[i].classifier.classifierWeed.useADD = id_classifier[1] == "1" ? true : false;
						if(!protocol[protocolID].sourceProduct.components[i].classifier.classifierWeed.useADD){
							protocol[protocolID].sourceProduct.components[i].classifier.classifierWeed.mainClassifier.industryID = id_classifier[2];
							protocol[protocolID].sourceProduct.components[i].classifier.classifierWeed.mainClassifier.categoryID = id_classifier[3];
							protocol[protocolID].sourceProduct.components[i].classifier.classifierWeed.mainClassifier.classWeedID = id_classifier[4];
							protocol[protocolID].sourceProduct.components[i].classifier.classifierWeed.mainClassifier.weedNameID = id_classifier[5];
							protocol[protocolID].sourceProduct.components[i].classifier.classifierWeed.mainClassifier.descriptionID = id_classifier[6];
						}
						else{
							protocolClassfierAddList.push({"id": id_classifier[2], "classifierType" : protocol[protocolID].sourceProduct.components[i].classifier.classifierType});
						}
					}
					
					//Добавляем записанные фотки
					for(var j=0; j<=Number(data.result[count]["row_9"]); j++){
						protocol[protocolID].sourceProduct.components[i].images.push("/static/img/save_img/protocol_"+data.result[count].row_0+"/"+data.result[count].row_8+"/component_"+Number(j+1)+".png?u=" + last_updated); 
					}
						
					for(var j=0; j < protocol[protocolID].sorting.length; j++){
						var accept_value = (data.result[count]["row_7"] == "TRUE") ? Number(data.result[count]["row_"+(j*8+10)]) : 0;
						var accept_value_type = Number(data.result[count]["row_"+(j*8+11)]);
						var accept_removed_value = (data.result[count]["row_7"] == "FALSE") ? Number(data.result[count]["row_"+(j*8+10)]) : 0;
						var accept_flag_1 = (data.result[count]["row_"+(j*8+12)] == "TRUE") ? true : false;
						var accept_flag_2 = (data.result[count]["row_"+(j*8+13)] == "TRUE") ? true : false;
						protocol[protocolID].sorting[j].accept_components[i] = {
							product_name: data.result[count].row_3,
							value: Number(accept_value),
							value_type: Number(accept_value_type),
							removed_value: Number(accept_removed_value),
							flag_1: accept_flag_1,
							flag_2: accept_flag_2
						};
						var reject_value = (data.result[count]["row_7"] == "TRUE") ? Number(data.result[count]["row_"+(j*8+14)]) : 0;
						var reject_value_type = Number(data.result[count]["row_"+(j*8+15)]);
						var reject_removed_value = (data.result[count]["row_7"] == "FALSE") ? Number(data.result[count]["row_"+(j*8+14)]) : 0;
						var reject_flag_1 = (data.result[count]["row_"+(j*8+16)] == "TRUE") ? true : false;
						var reject_flag_2 = (data.result[count]["row_"+(j*8+17)] == "TRUE") ? true : false;
						protocol[protocolID].sorting[j].reject_components[i] = {
						product_name: data.result[count].row_3,
							value: Number(reject_value),
							value_type: Number(reject_value_type),
							removed_value: Number(reject_removed_value),
							flag_1: reject_flag_1,
							flag_2: reject_flag_2
						};
					}
					count++;
				}
				catch(error){
					console.log(error.name+": "+ error.message);
				}
			}
		}
		if(protocolClassfierAddList.length == 0){
			overlay.style.display = "none";
			for(var i = 1; i <= protocol.length; i++){
				addProtocolMainParamets(i);
			}
		}
		else{
			protocolClassifierAdd();
		}

	})
	.fail(function(jqXHR, exception){
		var msg = "Status Error: " + jqXHR.status + "; exeption: " + exception + "; responseText: " + jqXHR.responseText;
		ErrorLog(msg, false);
	});
}
function inbox_fraction_decode(split_string){
	var decode_array = []
	for(var i=0; i<split_string.length; i += 2){
		if (split_string.slice(i,i+2) == "00")
			decode_array.push({"accept": false, "reject": false});
		else if(split_string.slice(i,i+2) == "10")
			decode_array.push({"accept": true, "reject": false});
		else if(split_string.slice(i,i+2) == "01")
			decode_array.push({"accept": false, "reject": true});
		else if(split_string.slice(i,i+2) == "11")
			decode_array.push({"accept": true, "reject": true});
	}
	
	return decode_array;
}
//Редактирование протокола
function edit_protocol(){
	var _data = [];
	_data.push(
		protocolRequirements.id_requirements,
		protocol[protocolID].id_protocolType,
		protocol[protocolID].equipment_machine,
		protocol[protocolID].configuration,
		protocol[protocolID].sorting.length,
		protocol[protocolID].sourceProduct.components.length,
		protocol[protocolID].company_name,
		protocol[protocolID].id_creater,
		protocol[protocolID].id_responsible,
		new Date().getDate() + "." + Number(new Date().getMonth() + 1) + "." + new Date().getFullYear()
	)
	
	$.post($SCRIPT_ROOT + '/protocol/edit_protocol', {
		id_protocol: protocolID,
		id_requirements: protocolRequirements.id_requirements,
		write_data: _data
	}, function(data){
		protocol[protocolID].id_protocol = data.result["0"];
		__id_protocol = data.result["0"];
		console.log("Запись в таблицу протокол осуществленна");
		edit_protocol_sourceProduct();
	})
	.fail(function(jqXHR, exception){
		if(queueErrorCout < 3){
			queueErrorCout++;
			edit_protocol();
		}
		else{
			var msg = "Status Error: " + jqXHR.status + "; exeption: " + exception + "; responseText: " + jqXHR.responseText;
			ErrorLog(msg, true);
		}
	});
}
function edit_protocol_sourceProduct(){
	var _images_name = []; 
	var _base64_img = [];
	for(var i = 0; i<protocol[protocolID].sourceProduct.images.length; i++){
		_images_name.push("sourceProductImage_"+Number(i+1));
		if(protocol[protocolID].sourceProduct.images[i].substr(1,6) == "static"){
			_base64_img.push(protocol[protocolID].sourceProduct.images[i].substr(1).split('?')[0]);
			
		}
		else
			_base64_img.push(protocol[protocolID].sourceProduct.images[i].substr(22));
	}
	//Создание id для классификатора
	var id_classifier;
	id_classifier = protocol[protocolID].sourceProduct.classifier.classifierType;
	if(protocol[protocolID].sourceProduct.classifier.classifierType == 0){
		id_classifier += protocol[protocolID].sourceProduct.classifier.classifierProduct.useADD ? ",1" : ",0";
		if(!protocol[protocolID].sourceProduct.classifier.classifierProduct.useADD){
			id_classifier += ","+protocol[protocolID].sourceProduct.classifier.classifierProduct.mainClassifier.industryID;
			id_classifier += ","+protocol[protocolID].sourceProduct.classifier.classifierProduct.mainClassifier.groupProductID;
			id_classifier += ","+protocol[protocolID].sourceProduct.classifier.classifierProduct.mainClassifier.productID;
			id_classifier += ","+protocol[protocolID].sourceProduct.classifier.classifierProduct.mainClassifier.descriptionID;
			id_classifier += ","+protocol[protocolID].sourceProduct.classifier.classifierProduct.mainClassifier.productTypeID;
			id_classifier += ","+protocol[protocolID].sourceProduct.classifier.classifierProduct.mainClassifier.productSortID;
			id_classifier += ","+protocol[protocolID].sourceProduct.classifier.classifierProduct.mainClassifier.purposeID;
			id_classifier += ","+protocol[protocolID].sourceProduct.classifier.classifierProduct.mainClassifier.GOST_ID;
		}
		else{
			//На будущие
			id_classifier += ","+protocol[protocolID].sourceProduct.classifier.useADD_ID;
		}
	}
	else{
		id_classifier += protocol[protocolID].sourceProduct.classifier.classifierWeed.useADD ? ",1" : ",0";
		if(!protocol[protocolID].sourceProduct.classifier.classifierWeed.useADD){
			id_classifier += ","+protocol[protocolID].sourceProduct.classifier.classifierWeed.mainClassifier.industryID;
			id_classifier += ","+protocol[protocolID].sourceProduct.classifier.classifierWeed.mainClassifier.categoryID;
			id_classifier += ","+protocol[protocolID].sourceProduct.classifier.classifierWeed.mainClassifier.classWeedID;
			id_classifier += ","+protocol[protocolID].sourceProduct.classifier.classifierWeed.mainClassifier.weedNameID;
			id_classifier += ","+protocol[protocolID].sourceProduct.classifier.classifierWeed.mainClassifier.descriptionID;
		}
		else{
			//На будущие
			id_classifier += ","+protocol[protocolID].sourceProduct.classifier.useADD_ID;
		}
	}
	
	var _data = [];
	_data.push(
		__id_protocol,
		protocolRequirements.id_requirements,
		id_classifier,
		protocol[protocolID].sourceProduct.name,
		"-",
		Number(protocol[protocolID].sourceProduct.purity).toFixed(3),
		Number(protocol[protocolID].sourceProduct.capacity_value).toFixed(3),
		Number(protocol[protocolID].sourceProduct.capacity_type),
		Number(protocol[protocolID].sourceProduct.selection_value).toFixed(3),
		Number(protocol[protocolID].sourceProduct.selection_type),
		"protocol_"+__id_protocol+"_sourceProduct",
		protocol[protocolID].sourceProduct.images.length-1
	)
	$.post($SCRIPT_ROOT + '/protocol/edit_sourceProduct',{
		write_data: _data,
		//дополнитеьные элементы
		images_name: _images_name,
		base64_images: _base64_img
	}, function(data){
		console.log("Запись в таблицу исходного продукта осуществленна");
		edit_protocol_sorting();
	})
	.fail(function(jqXHR, exception){
		if(queueErrorCout < 3){
			queueErrorCout++;
			edit_protocol_sourceProduct();
		}
		else{
			var msg = "Status Error: " + jqXHR.status + "; exeption: " + exception + "; responseText: " + jqXHR.responseText;
			ErrorLog(msg, true);
		}
	});
}

function edit_protocol_sorting(){
	var _data = [];
	for(var i = 0; i < protocol[protocolID].sorting.length; i++){
		var listInboxFraction="";
		for(var id=0; id<protocol[protocolID].sorting[i].inbox_fraction.length; id++){
			if(protocol[protocolID].sorting[i].inbox_fraction[id].accept)
				listInboxFraction += "1";
			else
				listInboxFraction += "0";
			if(protocol[protocolID].sorting[i].inbox_fraction[id].reject)
				listInboxFraction += "1";
			else
				listInboxFraction += "0";	
		}
		_data.push(
			__id_protocol,
			i+1,
			listInboxFraction,
			Number(protocol[protocolID].sorting[i].trays_number).toFixed(2),
			Number(protocol[protocolID].sorting[i].purity).toFixed(3),
			Number(protocol[protocolID].sorting[i].capacity_value).toFixed(3),
			Number(protocol[protocolID].sorting[i].capacity_type),
			"none"
		)
	}
	$.post($SCRIPT_ROOT + '/protocol/edit_sorting',{
		write_data: _data
	}, function(data){
		console.log("Запись в таблицу сортировок осуществленна");
		edit_protocol_accept();
	})
	.fail(function(jqXHR, exception){
		if(queueErrorCout < 3){
			queueErrorCout++;
			edit_protocol_sorting();
		}
		else{
			var msg = "Status Error: " + jqXHR.status + "; exeption: " + exception + "; responseText: " + jqXHR.responseText;
			ErrorLog(msg, true);
		}
	});
}

function edit_protocol_accept(){
	var _data = [];
	var _images_name = []; 
	var _base64_img = [];
	for(var i = 0; i < protocol[protocolID].sorting.length; i++){
		_data.push(
			__id_protocol,
			i+1,
			protocol[protocolID].sorting[i].accept_name,
			protocol[protocolID].sorting[i].accept_name_id,
			Number(protocol[protocolID].sorting[i].accept_selection_mass).toFixed(3),
			Number(protocol[protocolID].sorting[i].accept_selection_type),
			Number(protocol[protocolID].sorting[i].accept_exit).toFixed(3),
			Number(protocol[protocolID].sorting[i].accept_purity).toFixed(3),
			Number(protocol[protocolID].sorting[i].accept_mass).toFixed(3),
			"protocol_"+__id_protocol+"_accept_"+Number(i+1),
			protocol[protocolID].sorting[i].accept_img.length-1
		)
		for(var k = 0; k < protocol[protocolID].sorting[i].accept_img.length; k++){
			_images_name.push("acceptImage_"+Number(k+1));
			if(protocol[protocolID].sorting[i].accept_img[k].substr(1,6) == "static")
				_base64_img.push(protocol[protocolID].sorting[i].accept_img[k].substr(1).split('?')[0]);
			else
				_base64_img.push(protocol[protocolID].sorting[i].accept_img[k].substr(22));
		}
	}
	$.post($SCRIPT_ROOT + '/protocol/edit_accept',{
		write_data: _data,
		//дополнитеьные элементы
		images_name: _images_name,
		base64_images: _base64_img		
	}, function(data){
		console.log("Запись в таблицу проходов осуществленна");
		edit_protocol_reject();
	})
	.fail(function(jqXHR, exception){
		if(queueErrorCout < 3){
			queueErrorCout++;
			edit_protocol_accept();
		}
		else{
			var msg = "Status Error: " + jqXHR.status + "; exeption: " + exception + "; responseText: " + jqXHR.responseText;
			ErrorLog(msg, true);
		}
	});
}

function edit_protocol_reject(){
	var _data = [];
	var _images_name = []; 
	var _base64_img = [];
	for(var i = 0; i < protocol[protocolID].sorting.length; i++){
		_data.push(
			__id_protocol,
			i+1,
			protocol[protocolID].sorting[i].reject_name,
			protocol[protocolID].sorting[i].reject_name_id,
			Number(protocol[protocolID].sorting[i].reject_selection_mass).toFixed(3),
			Number(protocol[protocolID].sorting[i].reject_selection_type),
			Number(protocol[protocolID].sorting[i].reject_exit).toFixed(3),
			Number(protocol[protocolID].sorting[i].reject_purity).toFixed(3),
			Number(protocol[protocolID].sorting[i].reject_mass).toFixed(3),
			"protocol_"+__id_protocol+"_reject_"+Number(i+1),
			protocol[protocolID].sorting[i].reject_img.length-1
		)
		for(var k = 0; k < protocol[protocolID].sorting[i].reject_img.length; k++){
			_images_name.push("rejectImage_"+Number(k+1));
			if(protocol[protocolID].sorting[i].reject_img[k].substr(1,6) == "static")
				_base64_img.push(protocol[protocolID].sorting[i].reject_img[k].substr(1).split('?')[0]);
			else
				_base64_img.push(protocol[protocolID].sorting[i].reject_img[k].substr(22));
		}
	}
	$.post($SCRIPT_ROOT + '/protocol/edit_reject',{
		write_data: _data,
		//дополнитеьные элементы
		images_name: _images_name,
		base64_images: _base64_img		
	}, function(data){
		console.log("Запись в таблицу отбоев осуществленна");
		edit_protocol_component();
	})
	.fail(function(jqXHR, exception){
		if(queueErrorCout < 3){
			queueErrorCout++;
			edit_protocol_accept();
		}
		else{
			var msg = "Status Error: " + jqXHR.status + "; exeption: " + exception + "; responseText: " + jqXHR.responseText;
			ErrorLog(msg, true);
		}
	});
}

function edit_protocol_component(){
	var _data = [];
	var _images_name = []; 
	var _base64_img = [];
	
	for(var i = 0; i < protocol[protocolID].sourceProduct.components.length; i++){
		//Создание id для классификатора
		var id_classifier;
		id_classifier = protocol[protocolID].sourceProduct.components[i].classifier.classifierType;
		if(protocol[protocolID].sourceProduct.components[i].classifier.classifierType == 0){
			id_classifier += protocol[protocolID].sourceProduct.components[i].classifier.classifierProduct.useADD ? ",1" : ",0";
			if(!protocol[protocolID].sourceProduct.components[i].classifier.classifierProduct.useADD){
				id_classifier += ","+protocol[protocolID].sourceProduct.components[i].classifier.classifierProduct.mainClassifier.industryID;
				id_classifier += ","+protocol[protocolID].sourceProduct.components[i].classifier.classifierProduct.mainClassifier.groupProductID;
				id_classifier += ","+protocol[protocolID].sourceProduct.components[i].classifier.classifierProduct.mainClassifier.productID;
				id_classifier += ","+protocol[protocolID].sourceProduct.components[i].classifier.classifierProduct.mainClassifier.descriptionID;
				id_classifier += ","+protocol[protocolID].sourceProduct.components[i].classifier.classifierProduct.mainClassifier.productTypeID;
				id_classifier += ","+protocol[protocolID].sourceProduct.components[i].classifier.classifierProduct.mainClassifier.productSortID;
			}
			else{
				//На будущие
				id_classifier += ","+protocol[protocolID].sourceProduct.components[i].classifier.useADD_ID;
			}
		}
		else{
			id_classifier += protocol[protocolID].sourceProduct.components[i].classifier.classifierWeed.useADD ? ",1" : ",0";
			if(!protocol[protocolID].sourceProduct.components[i].classifier.classifierWeed.useADD){
				id_classifier += ","+protocol[protocolID].sourceProduct.components[i].classifier.classifierWeed.mainClassifier.industryID;
				id_classifier += ","+protocol[protocolID].sourceProduct.components[i].classifier.classifierWeed.mainClassifier.categoryID;
				id_classifier += ","+protocol[protocolID].sourceProduct.components[i].classifier.classifierWeed.mainClassifier.classWeedID;
				id_classifier += ","+protocol[protocolID].sourceProduct.components[i].classifier.classifierWeed.mainClassifier.weedNameID;
				id_classifier += ","+protocol[protocolID].sourceProduct.components[i].classifier.classifierWeed.mainClassifier.descriptionID;
			}
			else{
				//На будущие
				id_classifier += ","+protocol[protocolID].sourceProduct.components[i].classifier.useADD_ID;
			}
		}
		_data.push([
			__id_protocol,
			id_classifier,
			i+1,
			protocol[protocolID].sourceProduct.components[i].product_name,
			protocol[protocolID].sourceProduct.components[i].flag_2 ? Number(protocol[protocolID].sourceProduct.components[i].value).toFixed(3) : Number(protocol[protocolID].sourceProduct.components[i].removed_value).toFixed(3),
			Number(protocol[protocolID].sourceProduct.components[i].value_type),
			protocol[protocolID].sourceProduct.components[i].flag_1,
			protocol[protocolID].sourceProduct.components[i].flag_2,
			"protocol_"+__id_protocol+"_component_"+Number(i+1),
			protocol[protocolID].sourceProduct.components[i].images.length-1
		]);
		for(var j = 0; j < protocol[protocolID].sorting.length; j++){
			_data[i].push(
				//Проход
				protocol[protocolID].sourceProduct.components[i].flag_2 ? protocol[protocolID].sorting[j].accept_components[i].value : protocol[protocolID].sorting[j].accept_components[i].removed_value,
				protocol[protocolID].sorting[j].accept_components[i].value_type,
				protocol[protocolID].sorting[j].accept_components[i].flag_1,
				protocol[protocolID].sorting[j].accept_components[i].flag_2,
				//Отбой
				protocol[protocolID].sourceProduct.components[i].flag_2 ? protocol[protocolID].sorting[j].reject_components[i].value : protocol[protocolID].sorting[j].reject_components[i].removed_value,
				protocol[protocolID].sorting[j].reject_components[i].value_type,
				protocol[protocolID].sorting[j].reject_components[i].flag_1,
				protocol[protocolID].sorting[j].reject_components[i].flag_2,
			);
		}	
		for(var k = 0; k < protocol[protocolID].sourceProduct.components[i].images.length; k++){
			_images_name.push("component_"+Number(k+1));
			if(protocol[protocolID].sourceProduct.components[i].images[k].substr(1,6) == "static")
				_base64_img.push(protocol[protocolID].sourceProduct.components[i].images[k].substr(1).split('?')[0]);
			else
				_base64_img.push(protocol[protocolID].sourceProduct.components[i].images[k].substr(22));
		}
	}
	$.post($SCRIPT_ROOT + '/protocol/edit_components',{
		accept_reject_count: Number(protocol[protocolID].sorting.length * 2),
		write_data: _data,
		//дополнитеьные элементы
		images_name: _images_name,
		base64_images: _base64_img		
	}, function(data){
		console.log("Запись в таблицу компанентов осуществленна");
		protocol_set_useADD();
	})
	.fail(function(jqXHR, exception){
		if(queueErrorCout < 3){
			queueErrorCout++;
			edit_protocol_component();
		}
		else{
			var msg = "Status Error: " + jqXHR.status + "; exeption: " + exception + "; responseText: " + jqXHR.responseText;
			ErrorLog(msg, true);
		}
	});
}//Использование Добаленных таблиц для требований
function protocol_set_useADD(){
	var _data = [];
	//Исходный продукт
	if(protocol[protocolID].sourceProduct.classifier.classifierProduct.useADD){
		_data.push([
			protocol[protocolID].sourceProduct.classifier.useADD_ID,
			protocolRequirements.id_requirements,
			__id_protocol,
			protocol[protocolID].sourceProduct.classifier.classifierProduct.addClassifier.industry,
			protocol[protocolID].sourceProduct.classifier.classifierProduct.addClassifier.groupProduct,
			protocol[protocolID].sourceProduct.classifier.classifierProduct.addClassifier.product,
			protocol[protocolID].sourceProduct.classifier.classifierProduct.addClassifier.description,
			protocol[protocolID].sourceProduct.classifier.classifierProduct.addClassifier.purpose,
			protocol[protocolID].sourceProduct.classifier.classifierProduct.addClassifier.productSort,
			protocol[protocolID].sourceProduct.classifier.classifierProduct.addClassifier.productType,
			"-",
			"-",
			"-",
			"-",
			"-"
		]);
	}
	if(protocol[protocolID].sourceProduct.classifier.classifierWeed.useADD){
		_data.push([
			protocol[protocolID].sourceProduct.classifier.useADD_ID,
			protocolRequirements.id_requirements,
			__id_protocol,
			"-",
			"-",
			"-",
			"-",
			"-",
			"-",
			"-",
			protocol[protocolID].sourceProduct.classifier.classifierWeed.addClassifier.industry,
			protocol[protocolID].sourceProduct.classifier.classifierWeed.addClassifier.weedName,
			protocol[protocolID].sourceProduct.classifier.classifierWeed.addClassifier.category,
			protocol[protocolID].sourceProduct.classifier.classifierWeed.addClassifier.classWeed,
			protocol[protocolID].sourceProduct.classifier.classifierWeed.addClassifier.description
		]);
	}
	//Компоненты
	for(var i = 0; i < protocol[protocolID].sourceProduct.components.length; i++){
		if(protocol[protocolID].sourceProduct.components[i].classifier.classifierProduct.useADD){
			_data.push([
				protocol[protocolID].sourceProduct.components[i].classifier.useADD_ID,
				protocolRequirements.id_requirements,
				__id_protocol,
				protocol[protocolID].sourceProduct.components[i].classifier.classifierProduct.addClassifier.industry,
				protocol[protocolID].sourceProduct.components[i].classifier.classifierProduct.addClassifier.groupProduct,
				protocol[protocolID].sourceProduct.components[i].classifier.classifierProduct.addClassifier.product,
				protocol[protocolID].sourceProduct.components[i].classifier.classifierProduct.addClassifier.description,
				"-",
				protocol[protocolID].sourceProduct.components[i].classifier.classifierProduct.addClassifier.productSort,
				protocol[protocolID].sourceProduct.components[i].classifier.classifierProduct.addClassifier.productType,
				"-",
				"-",
				"-",
				"-",
				"-"
			]);
		}
		if(protocol[protocolID].sourceProduct.components[i].classifier.classifierWeed.useADD){
			_data.push([
				protocol[protocolID].sourceProduct.components[i].classifier.useADD_ID,
				protocolRequirements.id_requirements,
				__id_protocol,
				"-",
				"-",
				"-",
				"-",
				"-",
				"-",
				"-",
				protocol[protocolID].sourceProduct.components[i].classifier.classifierWeed.addClassifier.industry,
				protocol[protocolID].sourceProduct.components[i].classifier.classifierWeed.addClassifier.weedName,
				protocol[protocolID].sourceProduct.components[i].classifier.classifierWeed.addClassifier.category,
				protocol[protocolID].sourceProduct.components[i].classifier.classifierWeed.addClassifier.classWeed,
				protocol[protocolID].sourceProduct.components[i].classifier.classifierWeed.addClassifier.description			
			]);			
		}
	}
	//Запись скомпаннованных данных в таблицу
	if(_data.length != 0){
		$.post($SCRIPT_ROOT + '/protocol/classifierTemp',{
			write_data: _data
		}, function(data){
			console.log("Запись в таблицу дополнительных классификаторов осуществленна");
			set_statistics();
		})
		.fail(function(jqXHR, exception){
			var msg = "Status Error: " + jqXHR.status + "; exeption: " + exception + "; responseText: " + jqXHR.responseText;
			ErrorLog(msg, true);
		});
	}
	else{
		set_statistics();
	}
}
function protocolMainClassifier_ADD(useADD_ID){
	$.post($SCRIPT_ROOT + '/protocol/get_classifierTemp',{
		id: useADD_ID
	}, function(data){
		if(!search_load){
			protocol[protocolID].sourceProduct.classifier.classifierProduct.addClassifier.industry = data.result[0][3];
			protocol[protocolID].sourceProduct.classifier.classifierProduct.addClassifier.groupProduct = data.result[0][4];
			protocol[protocolID].sourceProduct.classifier.classifierProduct.addClassifier.product = data.result[0][5];
			protocol[protocolID].sourceProduct.classifier.classifierProduct.addClassifier.description = data.result[0][6];
			protocol[protocolID].sourceProduct.classifier.classifierProduct.addClassifier.purpose = data.result[0][7];
			protocol[protocolID].sourceProduct.classifier.classifierProduct.addClassifier.productSort = data.result[0][8];
			protocol[protocolID].sourceProduct.classifier.classifierProduct.addClassifier.productType = data.result[0][9];
			
			get_sorting();
		}
		else{
			protocolSearch[searchProtocolID].sourceProduct.classifier.classifierProduct.addClassifier.industry = data.result[0][3];
			protocolSearch[searchProtocolID].sourceProduct.classifier.classifierProduct.addClassifier.groupProduct = data.result[0][4];
			protocolSearch[searchProtocolID].sourceProduct.classifier.classifierProduct.addClassifier.product = data.result[0][5];
			protocolSearch[searchProtocolID].sourceProduct.classifier.classifierProduct.addClassifier.description = data.result[0][6];
			protocolSearch[searchProtocolID].sourceProduct.classifier.classifierProduct.addClassifier.purpose = data.result[0][7];
			protocolSearch[searchProtocolID].sourceProduct.classifier.classifierProduct.addClassifier.productSort = data.result[0][8];
			protocolSearch[searchProtocolID].sourceProduct.classifier.classifierProduct.addClassifier.productType = data.result[0][9];
			
			search_sorting();
		}
	})
}
function protocolWeedClassifier_ADD(useADD_ID){
	$.post($SCRIPT_ROOT + '/protocol/get_classifierTemp',{
		id: useADD_ID
	}, function(data){
		if(!search_load){
			protocol[protocolID].sourceProduct.classifier.classifierWeed.addClassifier.industry = data.result[0][10];
			protocol[protocolID].sourceProduct.classifier.classifierWeed.addClassifier.weedName = data.result[0][11];
			protocol[protocolID].sourceProduct.classifier.classifierWeed.addClassifier.category = data.result[0][12];
			protocol[protocolID].sourceProduct.classifier.classifierWeed.addClassifier.classWeed = data.result[0][13];
			protocol[protocolID].sourceProduct.classifier.classifierWeed.addClassifier.description = data.result[0][14];

			get_sorting();
		}
		else{
			protocolSearch[searchProtocolID].sourceProduct.classifier.classifierWeed.addClassifier.industry = data.result[0][10];
			protocolSearch[searchProtocolID].sourceProduct.classifier.classifierWeed.addClassifier.weedName = data.result[0][11];
			protocolSearch[searchProtocolID].sourceProduct.classifier.classifierWeed.addClassifier.category = data.result[0][12];
			protocolSearch[searchProtocolID].sourceProduct.classifier.classifierWeed.addClassifier.classWeed = data.result[0][13];
			protocolSearch[searchProtocolID].sourceProduct.classifier.classifierWeed.addClassifier.description = data.result[0][14];
			
			search_sorting();
		}
	})
	.fail(function(jqXHR, exception){
		var msg = "Status Error: " + jqXHR.status + "; exeption: " + exception + "; responseText: " + jqXHR.responseText;
		ErrorLog(msg, false);
	});
	
}
function protocolComponentsClassifier_ADD(list_element, id, id_max){
	var id_classifier = list_element[1];
	$.post($SCRIPT_ROOT + '/protocol/get_classifierTemp',{
		id: id_classifier
	}, function(data){
		var i = list_element[0];
		var type = list_element[2];
		
		if(type == "product"){
			if(!search_load){
				protocol[protocolID].sourceProduct.components[i].classifier.classifierProduct.addClassifier.industry = data.result[0][3];
				protocol[protocolID].sourceProduct.components[i].classifier.classifierProduct.addClassifier.groupProduct = data.result[0][4];
				protocol[protocolID].sourceProduct.components[i].classifier.classifierProduct.addClassifier.product = data.result[0][5];
				protocol[protocolID].sourceProduct.components[i].classifier.classifierProduct.addClassifier.description = data.result[0][6];
				protocol[protocolID].sourceProduct.components[i].classifier.classifierProduct.addClassifier.productSort = data.result[0][8];
				protocol[protocolID].sourceProduct.components[i].classifier.classifierProduct.addClassifier.productType = data.result[0][9];
			}
			else{
				protocolSearch[searchProtocolID].sourceProduct.components[i].classifier.classifierProduct.addClassifier.industry = data.result[0][3];
				protocolSearch[searchProtocolID].sourceProduct.components[i].classifier.classifierProduct.addClassifier.groupProduct = data.result[0][4];
				protocolSearch[searchProtocolID].sourceProduct.components[i].classifier.classifierProduct.addClassifier.product = data.result[0][5];
				protocolSearch[searchProtocolID].sourceProduct.components[i].classifier.classifierProduct.addClassifier.description = data.result[0][6];
				protocolSearch[searchProtocolID].sourceProduct.components[i].classifier.classifierProduct.addClassifier.productSort = data.result[0][8];
				protocolSearch[searchProtocolID].sourceProduct.components[i].classifier.classifierProduct.addClassifier.productType = data.result[0][9];
			}
		}
		else{
			if(!search_load){
				protocol[protocolID].sourceProduct.components[i].classifier.classifierWeed.addClassifier.industry = data.result[0][10];
				protocol[protocolID].sourceProduct.components[i].classifier.classifierWeed.addClassifier.weedName = data.result[0][11];
				protocol[protocolID].sourceProduct.components[i].classifier.classifierWeed.addClassifier.category = data.result[0][12];
				protocol[protocolID].sourceProduct.components[i].classifier.classifierWeed.addClassifier.classWeed = data.result[0][13];
				protocol[protocolID].sourceProduct.components[i].classifier.classifierWeed.addClassifier.description = data.result[0][14];
			}
			else{
				protocolSearch[searchProtocolID].sourceProduct.components[i].classifier.classifierWeed.addClassifier.industry = data.result[0][10];
				protocolSearch[searchProtocolID].sourceProduct.components[i].classifier.classifierWeed.addClassifier.weedName = data.result[0][11];
				protocolSearch[searchProtocolID].sourceProduct.components[i].classifier.classifierWeed.addClassifier.category = data.result[0][12];
				protocolSearch[searchProtocolID].sourceProduct.components[i].classifier.classifierWeed.addClassifier.classWeed = data.result[0][13];
				protocolSearch[searchProtocolID].sourceProduct.components[i].classifier.classifierWeed.addClassifier.description = data.result[0][14];
			}
		}
		if(id != id_max)
			protocolComponentsClassifier_ADD(p_tempUseADD[id+1], id+1, id_max);
		else{
			overlay.style.display = "none";
			var protocol_type = !search_load ? protocol : protocolSearch;
			for(var i = 1; i <= protocol_type.length; i++){
				addProtocolMainParamets(i);
			}
			search_load = false;
		}
	})
	.fail(function(jqXHR, exception){
		var msg = "Status Error: " + jqXHR.status + "; exeption: " + exception + "; responseText: " + jqXHR.responseText;
		ErrorLog(msg, false);
	});
}
function protocolClassifierAdd(){
	var __id_list = [];
	for(var i = 0; i < protocolClassfierAddList.length; i++){
		__id_list.push(protocolClassfierAddList[i].id);
	}
	$.post($SCRIPT_ROOT + '/protocol/get_classifierTemp',{
		id_list: __id_list
	}, function(data){
		for(var i = 0; i < data.result.length; i++){
			var clasifier_id = Number(data.result[i][0].substr(10));
			for(var id = 0; id < protocol.length; id++){
				if(protocol[id].id_protocol == data.result[i][2])
					protocolID = id;
			}
			if(clasifier_id == 0){
				if(protocolClassfierAddList[i].classifierType == 0){
					if(!search_load){
						protocol[protocolID].sourceProduct.classifier.classifierProduct.addClassifier.industry = data.result[i][3];
						protocol[protocolID].sourceProduct.classifier.classifierProduct.addClassifier.groupProduct = data.result[i][4];
						protocol[protocolID].sourceProduct.classifier.classifierProduct.addClassifier.product = data.result[i][5];
						protocol[protocolID].sourceProduct.classifier.classifierProduct.addClassifier.description = data.result[i][6];
						protocol[protocolID].sourceProduct.classifier.classifierProduct.addClassifier.purpose = data.result[i][7];
						protocol[protocolID].sourceProduct.classifier.classifierProduct.addClassifier.productSort = data.result[i][8];
						protocol[protocolID].sourceProduct.classifier.classifierProduct.addClassifier.productType = data.result[i][9];
					}
					else{
						protocolSearch[searchProtocolID].sourceProduct.classifier.classifierProduct.addClassifier.industry = data.result[i][3];
						protocolSearch[searchProtocolID].sourceProduct.classifier.classifierProduct.addClassifier.groupProduct = data.result[i][4];
						protocolSearch[searchProtocolID].sourceProduct.classifier.classifierProduct.addClassifier.product = data.result[i][5];
						protocolSearch[searchProtocolID].sourceProduct.classifier.classifierProduct.addClassifier.description = data.result[i][6];
						protocolSearch[searchProtocolID].sourceProduct.classifier.classifierProduct.addClassifier.purpose = data.result[i][7];
						protocolSearch[searchProtocolID].sourceProduct.classifier.classifierProduct.addClassifier.productSort = data.result[i][8];
						protocolSearch[searchProtocolID].sourceProduct.classifier.classifierProduct.addClassifier.productType = data.result[i][9];
					}
				}
				else{
					if(!search_load){
						protocol[protocolID].sourceProduct.classifier.classifierWeed.addClassifier.industry = data.result[i][10];
						protocol[protocolID].sourceProduct.classifier.classifierWeed.addClassifier.weedName = data.result[i][11];
						protocol[protocolID].sourceProduct.classifier.classifierWeed.addClassifier.category = data.result[i][12];
						protocol[protocolID].sourceProduct.classifier.classifierWeed.addClassifier.classWeed = data.result[i][13];
						protocol[protocolID].sourceProduct.classifier.classifierWeed.addClassifier.description = data.result[i][14];
					}
					else{
						protocolSearch[searchProtocolID].sourceProduct.classifier.classifierWeed.addClassifier.industry = data.result[i][10];
						protocolSearch[searchProtocolID].sourceProduct.classifier.classifierWeed.addClassifier.weedName = data.result[i][11];
						protocolSearch[searchProtocolID].sourceProduct.classifier.classifierWeed.addClassifier.category = data.result[i][12];
						protocolSearch[searchProtocolID].sourceProduct.classifier.classifierWeed.addClassifier.classWeed = data.result[i][13];
						protocolSearch[searchProtocolID].sourceProduct.classifier.classifierWeed.addClassifier.description = data.result[i][14];
					}					
				}
			}
			else{
				if(protocolClassfierAddList[i].classifierType == 0){
					if(!search_load){
						protocol[protocolID].sourceProduct.components[clasifier_id-1].classifier.classifierProduct.addClassifier.industry = data.result[i][3];
						protocol[protocolID].sourceProduct.components[clasifier_id-1].classifier.classifierProduct.addClassifier.groupProduct = data.result[i][4];
						protocol[protocolID].sourceProduct.components[clasifier_id-1].classifier.classifierProduct.addClassifier.product = data.result[i][5];
						protocol[protocolID].sourceProduct.components[clasifier_id-1].classifier.classifierProduct.addClassifier.description = data.result[i][6];
						protocol[protocolID].sourceProduct.components[clasifier_id-1].classifier.classifierProduct.addClassifier.productSort = data.result[i][8];
						protocol[protocolID].sourceProduct.components[clasifier_id-1].classifier.classifierProduct.addClassifier.productType = data.result[i][9];
					}
					else{
						protocolSearch[searchProtocolID].sourceProduct.components[clasifier_id-1].classifier.classifierProduct.addClassifier.industry = data.result[i][3];
						protocolSearch[searchProtocolID].sourceProduct.components[clasifier_id-1].classifier.classifierProduct.addClassifier.groupProduct = data.result[i][4];
						protocolSearch[searchProtocolID].sourceProduct.components[clasifier_id-1].classifier.classifierProduct.addClassifier.product = data.result[i][5];
						protocolSearch[searchProtocolID].sourceProduct.components[clasifier_id-1].classifier.classifierProduct.addClassifier.description = data.result[i][6];
						protocolSearch[searchProtocolID].sourceProduct.components[clasifier_id-1].classifier.classifierProduct.addClassifier.productSort = data.result[i][8];
						protocolSearch[searchProtocolID].sourceProduct.components[clasifier_id-1].classifier.classifierProduct.addClassifier.productType = data.result[i][9];
					}
				}
				else{
					if(!search_load){
						protocol[protocolID].sourceProduct.components[clasifier_id-1].classifier.classifierWeed.addClassifier.industry = data.result[i][10];
						protocol[protocolID].sourceProduct.components[clasifier_id-1].classifier.classifierWeed.addClassifier.weedName = data.result[i][11];
						protocol[protocolID].sourceProduct.components[clasifier_id-1].classifier.classifierWeed.addClassifier.category = data.result[i][12];
						protocol[protocolID].sourceProduct.components[clasifier_id-1].classifier.classifierWeed.addClassifier.classWeed = data.result[i][13];
						protocol[protocolID].sourceProduct.components[clasifier_id-1].classifier.classifierWeed.addClassifier.description = data.result[i][14];
					}
					else{
						protocolSearch[searchProtocolID].sourceProduct.components[clasifier_id-1].classifier.classifierWeed.addClassifier.industry = data.result[i][10];
						protocolSearch[searchProtocolID].sourceProduct.components[clasifier_id-1].classifier.classifierWeed.addClassifier.weedName = data.result[i][11];
						protocolSearch[searchProtocolID].sourceProduct.components[clasifier_id-1].classifier.classifierWeed.addClassifier.category = data.result[i][12];
						protocolSearch[searchProtocolID].sourceProduct.components[clasifier_id-1].classifier.classifierWeed.addClassifier.classWeed = data.result[i][13];
						protocolSearch[searchProtocolID].sourceProduct.components[clasifier_id-1].classifier.classifierWeed.addClassifier.description = data.result[i][14];
					}
				}
			}
		}
		overlay.style.display = "none";
		var protocol_type = !search_load ? protocol : protocolSearch;
		for(var i = 1; i <= protocol_type.length; i++){
			addProtocolMainParamets(i);
		}
		search_load = false;
	})
	.fail(function(jqXHR, exception){
		var msg = "Status Error: " + jqXHR.status + "; exeption: " + exception + "; responseText: " + jqXHR.responseText;
		ErrorLog(msg, false);
	});
}
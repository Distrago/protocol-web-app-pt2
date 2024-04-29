//Функции записи требований
function set_requirements_mainData(){	
	var _images_name = []; 
	var _base64_img = [];
	for(var i = 0; i<protocolRequirements.images.length; i++){
		_images_name.push("requirementsSourceProductImage_"+Number(i+1));
		_base64_img.push(protocolRequirements.images[i].substr(22));
	}
	//Создание id для классификатора
	var id_classifier;
	id_classifier = protocolRequirements.classifier.classifierType;
	if(protocolRequirements.classifier.classifierType == 0){
		id_classifier += protocolRequirements.classifier.classifierProduct.useADD ? ",1" : ",0";
		if(!protocolRequirements.classifier.classifierProduct.useADD){
			id_classifier += ","+protocolRequirements.classifier.classifierProduct.mainClassifier.industryID;
			id_classifier += ","+protocolRequirements.classifier.classifierProduct.mainClassifier.groupProductID;
			id_classifier += ","+protocolRequirements.classifier.classifierProduct.mainClassifier.productID;
			id_classifier += ","+protocolRequirements.classifier.classifierProduct.mainClassifier.descriptionID;
			id_classifier += ","+protocolRequirements.classifier.classifierProduct.mainClassifier.productTypeID;
			id_classifier += ","+protocolRequirements.classifier.classifierProduct.mainClassifier.productSortID;
			id_classifier += ","+protocolRequirements.classifier.classifierProduct.mainClassifier.purposeID;
			id_classifier += ","+protocolRequirements.classifier.classifierProduct.mainClassifier.GOST_ID;
		}
		else{
			//На будущие
			id_classifier += ","+"9999";
		}
	}
	else{
		id_classifier += protocolRequirements.classifier.classifierWeed.useADD ? ",1" : ",0";
		if(!protocolRequirements.classifier.classifierProduct.useADD){
			id_classifier += ","+protocolRequirements.classifierWeed.mainClassifier.industryID;
			id_classifier += ","+protocolRequirements.classifierWeed.mainClassifier.categoryID;
			id_classifier += ","+protocolRequirements.classifierWeed.mainClassifier.classWeedID;
			id_classifier += ","+protocolRequirements.classifierWeed.mainClassifier.weedNameID;
			id_classifier += ","+protocolRequirements.classifierWeed.mainClassifier.descriptionID;
		}
		else{
			//На будущие
			id_classifier += ","+"9999";
		}
	}
	$.post($SCRIPT_ROOT + "/protocol/requirements/write_requirement", {
		id_requirements: protocolRequirements.id_requirements,
		equipment: "-",
		configuration: "-",
		program: "-",
		productName: protocolRequirements.product_name,
		id_product: id_classifier,
		photoFolder: "requirements_"+protocolRequirements.id_requirements+"_sourceProduct",
		id_mainPhoto: protocolRequirements.images.length-1,
		capacity_value: protocolRequirements.capacity_value,
		capacity_type: protocolRequirements.capacity_type,
		fraction_count: protocolRequirements.fractions.length,
		component_count: protocolRequirements.components.length,
		//дополнитеьные элементы
		images_name: _images_name,
		base64_images: _base64_img
	}, function(data){
		console.log("Запись в таблицу требований осуществленна");
		set_requirements_fraction(0, protocolRequirements.fractions.length-1);
	})
	.fail(function(){
		set_requirements_mainData();
	});
}

function set_requirements_fraction(__id_fraction, __id_fraction_max){
	var _images_name = []; 
	var _base64_img = [];
	for(var i = 0; i<protocolRequirements.fractions[__id_fraction].images.length; i++){
		_images_name.push("fraction_"+Number(i+1));
		_base64_img.push(protocolRequirements.fractions[__id_fraction].images[i].substr(22));
	}
	$.post($SCRIPT_ROOT + "/protocol/requirements/write_fraction", {
		id_requirements: protocolRequirements.id_requirements,
		id_fraction: __id_fraction+1,
		fraction_name: protocolRequirements.fractions[__id_fraction].fractionName,
		purpose: protocolRequirements.fractions[__id_fraction].purpose,
		exit: protocolRequirements.fractions[__id_fraction].exit,
		purity: protocolRequirements.fractions[__id_fraction].purity,
		capacity: protocolRequirements.fractions[__id_fraction].capacity,
		comment: protocolRequirements.fractions[__id_fraction].comment,
		photoFolder: "requirements_"+protocolRequirements.id_requirements+"_fraction_"+Number(__id_fraction+1),
		id_mainPhoto: protocolRequirements.fractions[__id_fraction].images.length-1,
		//дополнитеьные элементы
		images_name: _images_name,
		base64_images: _base64_img
	}, function(data){
		if(__id_fraction < __id_fraction_max)
			set_requirements_fraction(__id_fraction+1, __id_fraction_max);
		else
		{
			set_requirements_components_mainInfo(0, protocolRequirements.components.length-1);
			console.log("Запись в таблицу фракций осуществленна");
		}
	})
	.fail(function(){
		set_requirements_fraction(__id_fraction, __id_fraction_max);
	});
}
function set_requirements_components_mainInfo(__id_component, __id_component_max){
	var _images_name = []; 
	var _base64_img = [];
	for(var i = 0; i<protocolRequirements.components[__id_component].images.length; i++){
		_images_name.push("component_"+Number(i+1));
		_base64_img.push(protocolRequirements.components[__id_component].images[i].substr(22));
	}
	//Создание id для классификатора
	var id_classifier;
	id_classifier = protocolRequirements.components[__id_component].classifier.classifierType;
	if(protocolRequirements.components[__id_component].classifier.classifierType == 0){
		id_classifier += protocolRequirements.components[__id_component].classifier.classifierProduct.useADD ? ",1" : ",0";
		if(!protocolRequirements.components[__id_component].classifier.classifierProduct.useADD){
			id_classifier += ","+protocolRequirements.components[__id_component].classifier.classifierProduct.mainClassifier.industryID;
			id_classifier += ","+protocolRequirements.components[__id_component].classifier.classifierProduct.mainClassifier.groupProductID;
			id_classifier += ","+protocolRequirements.components[__id_component].classifier.classifierProduct.mainClassifier.productID;
			id_classifier += ","+protocolRequirements.components[__id_component].classifier.classifierProduct.mainClassifier.descriptionID;
			id_classifier += ","+protocolRequirements.components[__id_component].classifier.classifierProduct.mainClassifier.productTypeID;
			id_classifier += ","+protocolRequirements.components[__id_component].classifier.classifierProduct.mainClassifier.productSortID;
		}
		else{
			//На будущие
			id_classifier += ","+"9999";
		}
	}
	else{
		id_classifier += protocolRequirements.components[__id_component].classifier.classifierWeed.useADD ? ",1" : ",0";
		if(!protocolRequirements.components[__id_component].classifier.classifierProduct.useADD){
			id_classifier += ","+protocolRequirements.components[__id_component].classifierWeed.mainClassifier.industryID;
			id_classifier += ","+protocolRequirements.components[__id_component].classifierWeed.mainClassifier.categoryID;
			id_classifier += ","+protocolRequirements.components[__id_component].classifierWeed.mainClassifier.classWeedID;
			id_classifier += ","+protocolRequirements.components[__id_component].classifierWeed.mainClassifier.weedNameID;
			id_classifier += ","+protocolRequirements.components[__id_component].classifierWeed.mainClassifier.descriptionID;
		}
		else{
			//На будущие
			id_classifier += ","+"9999";
		}
	}
	$.post($SCRIPT_ROOT + "/protocol/requirements/write_components_1", {
		id_requirements: protocolRequirements.id_requirements,
		component_number: __id_component+1,
		companent_name: protocolRequirements.components[__id_component].product_name,
		id_companent: id_classifier,
		component_value: protocolRequirements.components[__id_component].value,
		component_type: protocolRequirements.components[__id_component].value_type,
		component_valid_check: protocolRequirements.components[__id_component].flag_1,
		component_remove_check: protocolRequirements.components[__id_component].flag_2,
		photoFolder: "requirements_"+protocolRequirements.id_requirements+"_content_"+Number(__id_component+1),
		id_mainPhoto: protocolRequirements.components[__id_component].images.length-1,
		//дополнитеьные элементы
		images_name: _images_name,
		base64_images: _base64_img
	}, function(data){
		if(__id_component < __id_component_max)
			set_requirements_components_mainInfo(__id_component+1, __id_component_max)
		else
		{
			fraction_array();
			set_requirements_components_addInfo(0, _fraction_array.length-1, 0, __id_component_max);
		}
	})
	.fail(function(){
		set_requirements_components_mainInfo(__id_component, __id_component_max);
	});
}
function set_requirements_components_addInfo(__id_fraction, __id_fraction_max, __id_component, __id_component_max){
	$.post($SCRIPT_ROOT + '/protocol/requirements/write_components_2',{
		id_fraction: __id_fraction+1,
		str_number: Number(_fraction_array[__id_fraction].length - __id_component - 1),
		component_value: Number(_fraction_array[__id_fraction][__id_component].value).toFixed(3),
		component_type: _fraction_array[__id_fraction][__id_component].value_type,
		component_valid_check: _fraction_array[__id_fraction][__id_component].flag_1,
		component_warnin_check: _fraction_array[__id_fraction][__id_component].flag_2
	}, function(data){
		if(__id_component < __id_component_max){
			set_requirements_components_addInfo(__id_fraction, __id_fraction_max, __id_component+1, __id_component_max);
		}
		else
		{
			if(__id_fraction < __id_fraction_max){
				set_requirements_components_addInfo(__id_fraction+1, __id_fraction_max, 0, __id_component_max);
			}
			else{
				console.log("Запись в таблицу компанентов осуществленна");
				get_clientForSaveRemove();
			}
		}
	})
	.fail(function(){
		set_requirements_components_addInfo(__id_fraction, __id_fraction_max, __id_component, __id_component_max);
	});
}
var _fraction_array = [];
function fraction_array(){
	_fraction_array = [];
	for(var i = 0; i < protocolRequirements.fractions.length; i++){
		_fraction_array.push(protocolRequirements.fractions[i].components);
	}
}
var requeirementsClassfierAddList = [];
//Функции чтение/выгрузки требований
function get_requirements_mainInfo(id){
	$.post($SCRIPT_ROOT + '/protocol/requirements/get_requirements',{
		id_requirements: id
	}, function(data){
		if(data.result.length == 0){
			protocolRequirements.id_requirements = id;
			get_task_bitrix24(queryParametrList.id);
			overlay.style.display = "none";
		}
		else{
			protocolRequirements.id_user = data.result[0]["ID_user"];
			protocolRequirements.id_deal = data.result[0]["ID_deal"];
			protocolRequirements.id_requirements = data.result[0]["ID_requirements"];
			protocolRequirements.equipment_machine = data.result[0]["equipment"];
			protocolRequirements.configuration = data.result[0]["configuration"];
			protocolRequirements.product_name = data.result[0]["productName"];
			protocolRequirements.capacity_value = data.result[0]["capacity_value"];
			protocolRequirements.capacity_type = data.result[0]["capacity_type"];
			protocolRequirements.time_value = data.result[0]["time_value"];
			protocolRequirements.time_type = data.result[0]["time_type"];
			protocolRequirements.hour_in_day = data.result[0]["hour_in_day"]
			protocolRequirements.day_in_week = data.result[0]["day_in_week"]
			protocolRequirements.month_in_year = data.result[0]["month_in_year"]
			protocolRequirements.selection_value = data.result[0]["selection_value"];
			protocolRequirements.selection_type = data.result[0]["selection_type"];
			protocolRequirements.create_date = data.result[0]["create_date"];
			protocolRequirements.company_name = data.result[0]["company_name"];
			protocolRequirements.upload_data = true;
			
			
			var fraction_count = Number(data.result[0]["fraction_count"]);
			var companent_count = Number(data.result[0]["companent_count"]);
			//Создать необходимое число фракций и компонентов
			for(var i = 0; i < fraction_count; i++)
				addFractionRequirements();
			for(var i = 0; i < companent_count; i++)
				addComponentRequirements();
			
			//Проставить id классификатора продукта
			var id_classifier = data.result[0]["ID_product"].split(",");
			protocolRequirements.classifier.classifierType = Number(id_classifier[0]);
			if(protocolRequirements.classifier.classifierType == 0){
				protocolRequirements.classifier.classifierProduct.useADD = id_classifier[1] == "1" ? true : false;
				if(!protocolRequirements.classifier.classifierProduct.useADD){
					protocolRequirements.classifier.classifierProduct.mainClassifier.industryID = id_classifier[2];
					protocolRequirements.classifier.classifierProduct.mainClassifier.groupProductID = id_classifier[3];
					protocolRequirements.classifier.classifierProduct.mainClassifier.productID = id_classifier[4];
					protocolRequirements.classifier.classifierProduct.mainClassifier.descriptionID = id_classifier[5];
					protocolRequirements.classifier.classifierProduct.mainClassifier.productTypeID = id_classifier[6];
					protocolRequirements.classifier.classifierProduct.mainClassifier.productSortID = id_classifier[7];
					protocolRequirements.classifier.classifierProduct.mainClassifier.purposeID = id_classifier[8];
					protocolRequirements.classifier.classifierProduct.mainClassifier.GOST_ID = id_classifier[9];
				}
				else{
					requeirementsClassfierAddList.push({"id": id_classifier[2], "classifierType" : protocolRequirements.classifier.classifierType});
				}
			}
			else{
				protocolRequirements.classifier.classifierWeed.useADD = id_classifier[1] == "1" ? true : false;
				if(!protocolRequirements.classifier.classifierWeed.useADD){
					protocolRequirements.classifier.classifierWeed.mainClassifier.industryID = id_classifier[2];
					protocolRequirements.classifier.classifierWeed.mainClassifier.categoryID = id_classifier[3];
					protocolRequirements.classifier.classifierWeed.mainClassifier.classWeedID = id_classifier[4];
					protocolRequirements.classifier.classifierWeed.mainClassifier.weedNameID = id_classifier[5];
					protocolRequirements.classifier.classifierWeed.mainClassifier.descriptionID = id_classifier[6];
				}
				else{
					requeirementsClassfierAddList.push({"id": id_classifier[2], "classifierType" : protocolRequirements.classifier.classifierType});
				}
			}
			//Добавляем записанные фотки
			for(var j=0; j<=Number(data.result[0]["ID_mainPhoto"]); j++){
				protocolRequirements.images.push("/static/img/save_img/requirement_"+data.result[0]["ID_requirements"]+"/"+data.result[0]["photoFolder"]+"/requirementsSourceProductImage_"+Number(j+1)+".png?u=" + last_updated);
			}
			setupRequirementsInfo();
			setupMainPageCapacity(protocolRequirements, capactityRequirements , capactityRequirementsText);
			setupRequirementsSourceProductImage();
			setupRequirementsClassifierSourceProduct();
			get_requirements_fraction();
		}
	})
	.fail(function(jqXHR, exception){
		var msg = "Status Error: " + jqXHR.status + "; exeption: " + exception + "; responseText: " + jqXHR.responseText;
		ErrorLog(msg, false);
	});
}
function get_requirements_fraction(){
	$.getJSON($SCRIPT_ROOT + '/protocol/requirements/get_fraction',{
	}, function(data){
		if(data.result.length == 0){
			get_requirements_fraction();
		}
		else{
			removeMainFraction();
			
			for(var i = 0 ; i < data.result.length; i++){
				protocolRequirements.fractions[i].fractionName = data.result[i]["fraction_name"]
				protocolRequirements.fractions[i].defaultFractionName = data.result[i]["fraction_name"].substr(0,7) == "Фракция" ? true : false;
				protocolRequirements.fractions[i].mainFraction = (data.result[i]["main_fraction"] == "TRUE") ? true : false;
				protocolRequirements.fractions[i].purpose = Number(data.result[i]["purpose"]);
				protocolRequirements.fractions[i].exit = Number(data.result[i]["exit"]).toFixed(3);
				protocolRequirements.fractions[i].purity = Number(data.result[i]["purity"]).toFixed(3);
				protocolRequirements.fractions[i].capacity = Number(data.result[i]["capacity"]).toFixed(3);
				protocolRequirements.fractions[i].comment = data.result[i]["comment"]
				setupFractionMainParametr(i+1);
				
				//Добавляем записанные фотки
				for(var j=0; j<=Number(data.result[i]["ID_mainPhoto"]); j++){
					protocolRequirements.fractions[i].images.push("/static/img/save_img/requirement_"+data.result[i]["ID_requirements"]+"/"+data.result[i]["photoFolder"]+"/fraction_"+Number(j+1)+".png?u=" + last_updated);
				}
				setupRequirementsFractionImages(i);
			}
			get_requirements_components();
		}
	})
	.fail(function(jqXHR, exception){
		var msg = "Status Error: " + jqXHR.status + "; exeption: " + exception + "; responseText: " + jqXHR.responseText;
		ErrorLog(msg, false);
	});
}
function get_requirements_components(){
	$.getJSON($SCRIPT_ROOT + '/protocol/requirements/get_component',{
	}, function(data){
		if(data.result.length == 0){
			get_requirements_components()
		}
		else{
			for(var i = 0; i < data.result.length; i++){
				protocolRequirements.components[i].product_name = data.result[i]["row_2"];
				protocolRequirements.components[i].value = (data.result[i]["row_7"] == "TRUE") ? data.result[i]["row_4"] : 0;
				protocolRequirements.components[i].value_type = data.result[i]["row_5"];
				protocolRequirements.components[i].removed_value = (data.result[i]["row_7"] == "FALSE") ? data.result[i]["row_4"] : 0;
				protocolRequirements.components[i].flag_1 = (data.result[i]["row_6"] == "TRUE") ? true : false;
				protocolRequirements.components[i].flag_2 = (data.result[i]["row_7"] == "TRUE") ? true : false;
				
				//Проставить id классификатора продукта
				var useADD = false;
				var id_classifier = data.result[i]["row_3"].split(",");
				protocolRequirements.components[i].classifier.classifierType = Number(id_classifier[0]);
				if(protocolRequirements.components[i].classifier.classifierType == 0){
					protocolRequirements.components[i].classifier.classifierProduct.useADD = id_classifier[1] == "1" ? true : false;
					if(!protocolRequirements.components[i].classifier.classifierProduct.useADD){
						protocolRequirements.components[i].classifier.classifierProduct.mainClassifier.industryID = id_classifier[2];
						protocolRequirements.components[i].classifier.classifierProduct.mainClassifier.groupProductID = id_classifier[3];
						protocolRequirements.components[i].classifier.classifierProduct.mainClassifier.productID = id_classifier[4];
						protocolRequirements.components[i].classifier.classifierProduct.mainClassifier.descriptionID = id_classifier[5];
						protocolRequirements.components[i].classifier.classifierProduct.mainClassifier.productTypeID = id_classifier[6];
						protocolRequirements.components[i].classifier.classifierProduct.mainClassifier.productSortID = id_classifier[7];
					}
					else{
						requeirementsClassfierAddList.push({"id": id_classifier[2], "classifierType" : protocolRequirements.components[i].classifier.classifierType});
					}
				}
				else{
					protocolRequirements.components[i].classifier.classifierWeed.useADD = id_classifier[1] == "1" ? true : false;
					if(!protocolRequirements.components[i].classifier.classifierWeed.useADD){
						protocolRequirements.components[i].classifier.classifierWeed.mainClassifier.industryID = id_classifier[2];
						protocolRequirements.components[i].classifier.classifierWeed.mainClassifier.categoryID = id_classifier[3];
						protocolRequirements.components[i].classifier.classifierWeed.mainClassifier.classWeedID = id_classifier[4];
						protocolRequirements.components[i].classifier.classifierWeed.mainClassifier.weedNameID = id_classifier[5];
						protocolRequirements.components[i].classifier.classifierWeed.mainClassifier.descriptionID = id_classifier[6];
					}
					else{
						requeirementsClassfierAddList.push({"id": id_classifier[2], "classifierType" : protocolRequirements.components[i].classifier.classifierType});
					}
				}
				//Добавляем записанные фотки
				for(var j=0; j<=Number(data.result[i]["row_9"]); j++){
					protocolRequirements.components[i].images.push("/static/img/save_img/requirement_"+data.result[i]["row_0"]+"/"+data.result[i]["row_8"]+"/component_"+Number(j+1)+".png?u=" + last_updated); 
				}
				//Добавим записанные фракции
				for(var k = 0; k < protocolRequirements.fractions.length; k++){
					protocolRequirements.fractions[k].components[i].product_name = data.result[i]["row_2"];
					protocolRequirements.fractions[k].components[i].value = (data.result[i]["row_7"] == "TRUE") ? data.result[i]["row_"+(10+4*k)] : 0;
					protocolRequirements.fractions[k].components[i].value_type = data.result[i]["row_"+(11+4*k)];
					protocolRequirements.fractions[k].components[i].removed_value = (data.result[i]["row_7"] == "FALSE") ? data.result[i]["row_"+(10+4*k)] : 0;
					protocolRequirements.fractions[k].components[i].flag_1 = (data.result[i]["row_"+(12+4*k)] == "TRUE") ? true : false;
					protocolRequirements.fractions[k].components[i].flag_2 = (data.result[i]["row_"+(13+4*k)] == "TRUE") ? true : false;
					
					setupFractionComponents(k+1, i+1);
				}
				setupRequirementsComponent(i+1);
				setupRequirementsComponentImage(i);
				setupRequirementsClassifierComponents(i+1);
			}
			setupMainPagePurity(protocolRequirements, purityRequirements);
			mainPageProduct(protocolRequirements.components, productNameRequirements);
			setupRequirementEquipmentConfiguration();
			if(requeirementsClassfierAddList.length == 0)
				get_protocol_requirements();
			else
				requirementsClassifierAdd();
		}
	})
	.fail(function(jqXHR, exception){
		var msg = "Status Error: " + jqXHR.status + "; exeption: " + exception + "; responseText: " + jqXHR.responseText;
		ErrorLog(msg, false);
	});	
}

function edit_requirements(){
	var _images_name = []; 
	var _base64_img = [];
	for(var i = 0; i<protocolRequirements.images.length; i++){
		_images_name.push("requirementsSourceProductImage_"+Number(i+1));
		if(protocolRequirements.images[i].substr(1,6) == "static")
			_base64_img.push(protocolRequirements.images[i].substr(1,6).split('?')[0])
		else
			_base64_img.push(protocolRequirements.images[i].substr(22));
	}
	//Создание id для классификатора
	var id_classifier;
	id_classifier = protocolRequirements.classifier.classifierType;
	if(protocolRequirements.classifier.classifierType == 0){
		id_classifier += protocolRequirements.classifier.classifierProduct.useADD ? ",1" : ",0";
		if(!protocolRequirements.classifier.classifierProduct.useADD){
			id_classifier += ","+protocolRequirements.classifier.classifierProduct.mainClassifier.industryID;
			id_classifier += ","+protocolRequirements.classifier.classifierProduct.mainClassifier.groupProductID;
			id_classifier += ","+protocolRequirements.classifier.classifierProduct.mainClassifier.productID;
			id_classifier += ","+protocolRequirements.classifier.classifierProduct.mainClassifier.descriptionID;
			id_classifier += ","+protocolRequirements.classifier.classifierProduct.mainClassifier.productTypeID;
			id_classifier += ","+protocolRequirements.classifier.classifierProduct.mainClassifier.productSortID;
			id_classifier += ","+protocolRequirements.classifier.classifierProduct.mainClassifier.purposeID;
			id_classifier += ","+protocolRequirements.classifier.classifierProduct.mainClassifier.GOST_ID;
		}
		else{
			id_classifier += ","+protocolRequirements.classifier.useADD_ID			
		}
	}
	else{
		id_classifier += protocolRequirements.classifier.classifierWeed.useADD ? ",1" : ",0";
		if(!protocolRequirements.classifier.classifierWeed.useADD){
			id_classifier += ","+protocolRequirements.classifier.classifierWeed.mainClassifier.industryID;
			id_classifier += ","+protocolRequirements.classifier.classifierWeed.mainClassifier.categoryID;
			id_classifier += ","+protocolRequirements.classifier.classifierWeed.mainClassifier.classWeedID;
			id_classifier += ","+protocolRequirements.classifier.classifierWeed.mainClassifier.weedNameID;
			id_classifier += ","+protocolRequirements.classifier.classifierWeed.mainClassifier.descriptionID;
		}
		else{
			//На будущие
			id_classifier += ","+protocolRequirements.classifier.useADD_ID
		}
	}
	var _data = []
	_data.push([
		protocolRequirements.id_user,
		protocolRequirements.id_deal,
		protocolRequirements.id_requirements,
		protocolRequirements.equipment_machine,
		protocolRequirements.configuration,
		"-",
		protocolRequirements.product_name,
		id_classifier,
		protocolRequirements.selection_value,
		protocolRequirements.selection_type,
		"requirements_"+protocolRequirements.id_requirements+"_sourceProduct",
		protocolRequirements.images.length-1,
		protocolRequirements.capacity_value,
		protocolRequirements.capacity_type,
		protocolRequirements.time_value,
		protocolRequirements.time_type,
		protocolRequirements.hour_in_day,
		protocolRequirements.day_in_week,
		protocolRequirements.month_in_year,
		protocolRequirements.fractions.length,
		protocolRequirements.components.length,
		new Date().getDate() + "." + Number(new Date().getMonth() + 1) + "." + new Date().getFullYear(),
		protocolRequirements.company_name
	])
	
	$.post($SCRIPT_ROOT + '/protocol/requirements/edit_requirements',{
		id_requirements: protocolRequirements.id_requirements,
		write_data: _data,
		//дополнитеьные элементы
		images_name: _images_name,
		base64_images: _base64_img
	}, function(data){
		console.log("Запись в таблицу требований осуществленна");
		protocolRequirements.upload_data = true;
		edit_fraction();
	})
	.fail(function(jqXHR, exception){
		if(queueErrorCout < 3){
			queueErrorCout++;
			edit_requirements();
		}
		else{
			var msg = "Status Error: " + jqXHR.status + "; exeption: " + exception + "; responseText: " + jqXHR.responseText;
			ErrorLog(msg, true);
		}
	});
}

function edit_fraction(){
	var _data = [];
	var _images_name = []; 
	var _base64_img = [];
	for(var i = 0; i < protocolRequirements.fractions.length; i++){
		_data.push([
			protocolRequirements.id_requirements,
			i+1,
			protocolRequirements.fractions[i].fractionName,
			protocolRequirements.fractions[i].mainFraction,
			protocolRequirements.fractions[i].purpose,
			protocolRequirements.fractions[i].exit,
			protocolRequirements.fractions[i].purity,
			protocolRequirements.fractions[i].capacity,
			protocolRequirements.fractions[i].comment,
			"requirements_"+protocolRequirements.id_requirements+"_fraction_"+Number(i+1),
			protocolRequirements.fractions[i].images.length-1
		]);
		for(var k = 0; k<protocolRequirements.fractions[i].images.length; k++){
			_images_name.push("fraction_"+Number(k+1));
			if(protocolRequirements.fractions[i].images[k].substr(1,6) == "static")
				_base64_img.push(protocolRequirements.fractions[i].images[k].substr(1,6).split('?')[0]);
			else
				_base64_img.push(protocolRequirements.fractions[i].images[k].substr(22));
		}
	}
	
	$.post($SCRIPT_ROOT + '/protocol/requirements/edit_fraction',{
		id_requirements: protocolRequirements.id_requirements,
		fraction_count: protocolRequirements.fractions.length,
		write_data: _data,
		//дополнитеьные элементы
		images_name: _images_name,
		base64_images: _base64_img
	}, function(data){
		console.log("Запись в таблицу фракций осуществленна");
		edit_components();
	})
	.fail(function(jqXHR, exception){
		if(queueErrorCout < 3){
			queueErrorCout++;
			edit_fraction();
		}
		else{
			var msg = "Status Error: " + jqXHR.status + "; exeption: " + exception + "; responseText: " + jqXHR.responseText;
			ErrorLog(msg, true);
		}
	});	
}
function edit_components(){
	var _data = [];
	var _images_name = []; 
	var _base64_img = [];
	
	for(var i = 0; i < protocolRequirements.components.length; i++){
		//Создание id для классификатора
		var id_classifier;
		id_classifier = protocolRequirements.components[i].classifier.classifierType;
		if(protocolRequirements.components[i].classifier.classifierType == 0){
			id_classifier += protocolRequirements.components[i].classifier.classifierProduct.useADD ? ",1" : ",0";
			if(!protocolRequirements.components[i].classifier.classifierProduct.useADD){
				id_classifier += ","+protocolRequirements.components[i].classifier.classifierProduct.mainClassifier.industryID;
				id_classifier += ","+protocolRequirements.components[i].classifier.classifierProduct.mainClassifier.groupProductID;
				id_classifier += ","+protocolRequirements.components[i].classifier.classifierProduct.mainClassifier.productID;
				id_classifier += ","+protocolRequirements.components[i].classifier.classifierProduct.mainClassifier.descriptionID;
				id_classifier += ","+protocolRequirements.components[i].classifier.classifierProduct.mainClassifier.productTypeID;
				id_classifier += ","+protocolRequirements.components[i].classifier.classifierProduct.mainClassifier.productSortID;
			}
			else{
				//На будущие
				id_classifier += ","+protocolRequirements.components[i].classifier.useADD_ID;
			}
		}
		else{
			id_classifier += protocolRequirements.components[i].classifier.classifierWeed.useADD ? ",1" : ",0";
			if(!protocolRequirements.components[i].classifier.classifierWeed.useADD){
				id_classifier += ","+protocolRequirements.components[i].classifier.classifierWeed.mainClassifier.industryID;
				id_classifier += ","+protocolRequirements.components[i].classifier.classifierWeed.mainClassifier.categoryID;
				id_classifier += ","+protocolRequirements.components[i].classifier.classifierWeed.mainClassifier.classWeedID;
				id_classifier += ","+protocolRequirements.components[i].classifier.classifierWeed.mainClassifier.weedNameID;
				id_classifier += ","+protocolRequirements.components[i].classifier.classifierWeed.mainClassifier.descriptionID;
			}
			else{
				//На будущие
				id_classifier += ","+protocolRequirements.components[i].classifier.useADD_ID;
			}
		}
		//Запись массива
		_data.push([
			protocolRequirements.id_requirements,
			i+1,
			protocolRequirements.components[i].product_name,
			id_classifier,
			protocolRequirements.components[i].flag_2 ? protocolRequirements.components[i].value : protocolRequirements.components[i].removed_value,
			protocolRequirements.components[i].value_type,
			protocolRequirements.components[i].flag_1,
			protocolRequirements.components[i].flag_2,
			"requirements_"+protocolRequirements.id_requirements+"_content_"+Number(i+1),
			protocolRequirements.components[i].images.length-1
		]);
		for(var j = 0; j < protocolRequirements.fractions.length; j++){
			_data[i].push(
				protocolRequirements.components[i].flag_2 ? protocolRequirements.fractions[j].components[i].value : protocolRequirements.fractions[j].components[i].removed_value,
				protocolRequirements.fractions[j].components[i].value_type,
				protocolRequirements.fractions[j].components[i].flag_1,
				protocolRequirements.fractions[j].components[i].flag_2,
			);
		}		
		
		for(var k = 0; k<protocolRequirements.components[i].images.length; k++){
			_images_name.push("component_"+Number(k+1));
			if(protocolRequirements.components[i].images[k].substr(1,6) == "static")
				_base64_img.push(protocolRequirements.components[i].images[k].substr(1,6).split('?')[0]);
			else
				_base64_img.push(protocolRequirements.components[i].images[k].substr(22));
		}
	}
	
	$.post($SCRIPT_ROOT + '/protocol/requirements/edit_components',{
		id_requirements: protocolRequirements.id_requirements,
		fraction_count: protocolRequirements.fractions.length,
		component_count: protocolRequirements.components.length,
		write_data: _data,
		//дополнитеьные элементы
		images_name: _images_name,
		base64_images: _base64_img
	}, function(data){
		console.log("Запись в таблицу компанентов осуществленна");
		requirement_set_useADD();
	})
	.fail(function(jqXHR, exception){
		if(queueErrorCout < 3){
			queueErrorCout++;
			edit_components();
		}
		else{
			var msg = "Status Error: " + jqXHR.status + "; exeption: " + exception + "; responseText: " + jqXHR.responseText;
			ErrorLog(msg, true);
		}
	});	
}
//Использование Добаленных таблиц для требований
function requirement_set_useADD(){
	var _data = [];
	//Исходный продукт
	if(protocolRequirements.classifier.classifierProduct.useADD){
		_data.push([
			protocolRequirements.classifier.useADD_ID,
			protocolRequirements.id_requirements,
			"-",
			protocolRequirements.classifier.classifierProduct.addClassifier.industry,
			protocolRequirements.classifier.classifierProduct.addClassifier.groupProduct,
			protocolRequirements.classifier.classifierProduct.addClassifier.product,
			protocolRequirements.classifier.classifierProduct.addClassifier.description,
			protocolRequirements.classifier.classifierProduct.addClassifier.purpose,
			protocolRequirements.classifier.classifierProduct.addClassifier.productSort,
			protocolRequirements.classifier.classifierProduct.addClassifier.productType,
			"-",
			"-",
			"-",
			"-",
			"-"
		]);
	}
	if(protocolRequirements.classifier.classifierWeed.useADD){
		_data.push([
			protocolRequirements.classifier.useADD_ID,
			protocolRequirements.id_requirements,
			"-",
			"-",
			"-",
			"-",
			"-",
			"-",
			"-",
			"-",
			protocolRequirements.classifier.classifierWeed.addClassifier.industry,
			protocolRequirements.classifier.classifierWeed.addClassifier.weedName,
			protocolRequirements.classifier.classifierWeed.addClassifier.category,
			protocolRequirements.classifier.classifierWeed.addClassifier.classWeed,
			protocolRequirements.classifier.classifierWeed.addClassifier.description
		]);
	}
	//Компоненты
	for(var i = 0; i < protocolRequirements.components.length; i++){
		if(protocolRequirements.components[i].classifier.classifierProduct.useADD){
			_data.push([
				protocolRequirements.components[i].classifier.useADD_ID,
				protocolRequirements.id_requirements,
				"-",
				protocolRequirements.components[i].classifier.classifierProduct.addClassifier.industry,
				protocolRequirements.components[i].classifier.classifierProduct.addClassifier.groupProduct,
				protocolRequirements.components[i].classifier.classifierProduct.addClassifier.product,
				protocolRequirements.components[i].classifier.classifierProduct.addClassifier.description,
				"-",
				protocolRequirements.components[i].classifier.classifierProduct.addClassifier.productSort,
				protocolRequirements.components[i].classifier.classifierProduct.addClassifier.productType,
				"-",
				"-",
				"-",
				"-",
				"-"
			]);
		}
		if(protocolRequirements.components[i].classifier.classifierWeed.useADD){
			_data.push([
				protocolRequirements.components[i].classifier.useADD_ID,
				protocolRequirements.id_requirements,
				"-",
				"-",
				"-",
				"-",
				"-",
				"-",
				"-",
				"-",
				protocolRequirements.components[i].classifier.classifierWeed.addClassifier.industry,
				protocolRequirements.components[i].classifier.classifierWeed.addClassifier.weedName,
				protocolRequirements.components[i].classifier.classifierWeed.addClassifier.category,
				protocolRequirements.components[i].classifier.classifierWeed.addClassifier.classWeed,
				protocolRequirements.components[i].classifier.classifierWeed.addClassifier.description			
			]);			
		}
	}
	//Запись скомпаннованных данных в таблицу
	if(_data.length != 0){
		$.post($SCRIPT_ROOT + '/protocol/classifierTemp',{
			write_data: _data
		}, function(data){
			console.log("Запись в таблицу дополнительных классификаторов осуществленна");
			get_clientForSaveRemove();
		})
		.fail(function(jqXHR, exception){
			var msg = "Status Error: " + jqXHR.status + "; exeption: " + exception + "; responseText: " + jqXHR.responseText;
			ErrorLog(msg, true);
		});
	}
	else{
		get_clientForSaveRemove();
	}
}
function requirementsClassifierAdd(){
	var __id_list = [];
	for(var i = 0; i < requeirementsClassfierAddList.length; i++){
		__id_list.push(requeirementsClassfierAddList[i].id);
	}
	$.post($SCRIPT_ROOT + '/protocol/get_classifierTemp',{
		id_list: __id_list
	}, function(data){
		for(var i = 0; i < data.result.length; i++){
			var clasifier_id = Number(data.result[i][0].substr(10));
			if(clasifier_id == 0){
				if(requeirementsClassfierAddList[i].classifierType == 0){
					protocolRequirements.classifier.classifierProduct.addClassifier.industry = data.result[i][3];
					protocolRequirements.classifier.classifierProduct.addClassifier.groupProduct = data.result[i][4];
					protocolRequirements.classifier.classifierProduct.addClassifier.product = data.result[i][5];
					protocolRequirements.classifier.classifierProduct.addClassifier.description = data.result[i][6];
					protocolRequirements.classifier.classifierProduct.addClassifier.purpose = data.result[i][7];
					protocolRequirements.classifier.classifierProduct.addClassifier.productSort = data.result[i][8];
					protocolRequirements.classifier.classifierProduct.addClassifier.productType = data.result[i][9];
				}
				else{
					protocolRequirements.classifier.classifierWeed.addClassifier.industry = data.result[i][10];
					protocolRequirements.classifier.classifierWeed.addClassifier.weedName = data.result[i][11];
					protocolRequirements.classifier.classifierWeed.addClassifier.category = data.result[i][12];
					protocolRequirements.classifier.classifierWeed.addClassifier.classWeed = data.result[i][13];
					protocolRequirements.classifier.classifierWeed.addClassifier.description = data.result[i][14]
				}
				setupRequirementsClassifierSourceProduct();
				mainPageProduct(protocolRequirements.components, productNameRequirements);
			}
			else{
				if(requeirementsClassfierAddList[i].classifierType == 0){
					protocolRequirements.components[clasifier_id-1].classifier.classifierProduct.addClassifier.industry = data.result[i][3]
					protocolRequirements.components[clasifier_id-1].classifier.classifierProduct.addClassifier.groupProduct = data.result[i][4]
					protocolRequirements.components[clasifier_id-1].classifier.classifierProduct.addClassifier.product = data.result[i][5]
					protocolRequirements.components[clasifier_id-1].classifier.classifierProduct.addClassifier.description = data.result[i][6]
					protocolRequirements.components[clasifier_id-1].classifier.classifierProduct.addClassifier.productSort = data.result[i][8]
					protocolRequirements.components[clasifier_id-1].classifier.classifierProduct.addClassifier.productType = data.result[i][9]
				}
				else{
					protocolRequirements.components[clasifier_id-1].classifier.classifierWeed.addClassifier.industry = data.result[i][10];
					protocolRequirements.components[clasifier_id-1].classifier.classifierWeed.addClassifier.weedName = data.result[i][11];
					protocolRequirements.components[clasifier_id-1].classifier.classifierWeed.addClassifier.category = data.result[i][12];
					protocolRequirements.components[clasifier_id-1].classifier.classifierWeed.addClassifier.classWeed = data.result[i][13];
					protocolRequirements.components[clasifier_id-1].classifier.classifierWeed.addClassifier.description = data.result[i][14];
				}
				setupRequirementsClassifierComponents(clasifier_id);
			}
		}
		get_protocol_requirements();
	})
	.fail(function(jqXHR, exception){
		var msg = "Status Error: " + jqXHR.status + "; exeption: " + exception + "; responseText: " + jqXHR.responseText;
		ErrorLog(msg, false);
	});
}
/*
function dataURItoBlob(dataURI) {
            // convert base64/URLEncoded data component to raw binary data held in a string
            var byteString;
            if (dataURI.split(',')[0].indexOf('base64') >= 0)
                byteString = atob(dataURI.split(',')[1]);
            else
                byteString = unescape(dataURI.split(',')[1]);

            // separate out the mime component
            var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

            // write the bytes of the string to a typed array
            var ia = new Uint8Array(byteString.length);
            for (var i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }

            return new Blob([ia], {type:mimeString});
        }

function test_blob(){
	var base64Image = "data:image/jpg;base64,/9j/4AAQSkZJRgABAQEBIAEgAAD/4TItaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/Pgo8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjAtYzA2MCA2MS4xMzQ3NzcsIDIwMTAvMDIvMTItMTc6MzI6MDAgICAgICAgICI+CiAgIDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICAgICAgICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyI+CiAgICAgICAgIDx4bXA6Q3JlYXRvclRvb2w+QWRvYmUgRmlyZXdvcmtzIENTNSAxMS4wLjAuNDg0IE1hY2ludG9zaDwveG1wOkNyZWF0b3JUb29sPgogICAgICAgICA8eG1wOkNyZWF0ZURhdGU+MjAxNC0wMS0wOVQyMDoxNzoyNFo8L3htcDpDcmVhdGVEYXRlPgogICAgICAgICA8eG1wOk1vZGlmeURhdGU+MjAxNC0wMS0wOVQyMDoxODozNFo8L3htcDpNb2RpZnlEYXRlPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIj4KICAgICAgICAgPGRjOmZvcm1hdD5pbWFnZS9qcGVnPC9kYzpmb3JtYXQ+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgIAo8P3hwYWNrZXQgZW5kPSJ3Ij8+/9sAQwAGBAQEBQQGBQUGCQYFBgkLCAYGCAsMCgoLCgoMEAwMDAwMDBAMDg8QDw4MExMUFBMTHBsbGxwgICAgICAgICAg/9sAQwEHBwcNDA0YEBAYGhURFRogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg/8AAEQgBnAJsAwERAAIRAQMRAf/EABwAAAICAwEBAAAAAAAAAAAAAAMEAgUAAQYHCP/EAEYQAAIBAwIEBAQDBwIFBAECBwECAwAEERIhBRMxQQYiUWEUMnGBI0KRBxVSobHB0TNiJENy4fAWU4LxkgiiFyU0RHOT0v/EABgBAQEBAQEAAAAAAAAAAAAAAAABAgME/8QAIREBAQEBAQADAQEBAQEBAAAAAAERAhIDEyExQVFxFJH/2gAMAwEAAhEDEQA/AOTaIlq8zaDx4FUZClEHMO1AnKgVq1BKN6IyRSw36UCh8rVtFhay7VmwPZVkqBSW3DHatyiIjVPtWkE5yEYqKiJlTrQLy3wBwDVwSjkZ96AyW7uagtrLhp2OKlotFgATBFYUhKdDEVUDNxtigUmySaoDyznaqJ6nUUEort9XWgs4Lnbes4CNOGqiGxoiSup2oCqA1AwsSgZNEV19cohOKsCi3OqtCenWKoDLB6VVAKFaujWTVVNLnSaamDrfCgKvEsGsqL++cCmAE3FNQqhKW41GggtyUorZ4kwqBSXiEjN12oASXTmoA6mdqoftbPXjIqhtuHJ6VKrcfDwG2FRTScOzQGThvbFAVOGe1NE5OEqy7imrhQ8HTPSmpjY4eOlFbazwOlAu1sM9KyoD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";
	var blob = dataURItoBlob(base64Image);
	
	var formData = new FormData();
	var dataURL = base64Image;
    var blob = dataURItoBlob(dataURL);

    formData.append("image", blob);
	
	
	var request = new XMLHttpRequest();
    request.open("POST", $SCRIPT_ROOT + '/blob_image');
    request.send(formData);
}
*/

//Функции поиска
var search_load = false;
function search_protocol(){
	removeSearchProtocol();
	search_load = true;
	$.post($SCRIPT_ROOT + '/protocol/search_protocol',{
		productName: protocolRequirements.product_name,
		equipment: protocolRequirements.equipment_machine,
		configuration: protocolRequirements.configuration
	}, function(data){
		for(var i=0; i < data.result.length; i++){
			addSearchProtocol();
			searchProtocolID = i;
			
			protocolSearch[searchProtocolID].id_protocol = data.result[i]["ID_Protocol"];
			protocolSearch[searchProtocolID].id_requirements = data.result[i]["ID_Requirements"];
			protocolSearch[searchProtocolID].id_protocolType = data.result[i]["write_type"];
			protocolSearch[searchProtocolID].id_creater = data.result[i]["ID_creater"];
			protocolSearch[searchProtocolID].id_responsible = data.result[i]["ID_responsible"];
			protocolSearch[searchProtocolID].company_name = data.result[i]["company_name"];
			protocolSearch[searchProtocolID].equipment_machine = data.result[i]["equipment"];
			protocolSearch[searchProtocolID].configuration = data.result[i]["configuration"];
			protocolSearch[searchProtocolID].create_date = data.result[i]["create_date"];
			
			setupProtocolMachine(Number(searchProtocolID+1));
			document.getElementById("search_protocol_"+Number(searchProtocolID+1)).children[0].children[1].children[1].children[1].children[0].children[0].value 
				= protocolSearch[searchProtocolID].equipment_machine;
			setupProtocolConfiguration(Number(searchProtocolID+1), protocolSearch[searchProtocolID].equipment_machine);
			
			for(var _i = 1; _i < Number(data.result[i]["componentValue"]); _i++)
				searchAddSourceItem(); //Новый функционал
			for(var _i = 1; _i < Number(data.result[i]["sortingValue"]); _i++)
				searchAddSortingBlock(_i); //Новый функционал
		}
		if(data.result.length != 0){
			searchPage.style.display = "flex";
			overlay.style.display = "none";
			search_fraction();
		}
		else{
			overlay.style.display = "none";
			search_load = false;
		}
	})
	.fail(function(){
		search_protocol();
	})
}
function search_fraction(){
	$.getJSON($SCRIPT_ROOT + '/protocol/requirements/search_fraction',{
	}, function(data){
		for(var i=0; i < data.result.length; i++){
			fractionSearch.push({
				"id_requirements": data.result[i]["ID_requirements"],
				"id_fraction": data.result[i]["ID_fraction"],
				"fractionName": data.result[i]["fraction_name"],
				"defaultFractionName": data.result[i]["fraction_name"].substr(0,7) == "Фракция" ? true : false,
				"mainFraction": (data.result[i]["main_fraction"] == "TRUE") ? true : false,
				"purpose": Number(data.result[i]["purpose"]),
				"exit": Number(data.result[i]["exit"]).toFixed(3),
				"purity": Number(data.result[i]["purity"]).toFixed(3),
				"capacity": Number(data.result[i]["capacity"]).toFixed(3),
				"comment": data.result[i]["comment"]
			})
		}
		search_product();
	})
	.fail(function(){
		search_fraction();
	})
}
function search_product(){
	$.getJSON($SCRIPT_ROOT + '/protocol/get_product',{
	}, function(data){
		protocolClassfierAddList = [];
		for(var i = 0; i < data.result.length; i++){
			searchProtocolID = i;
		
			protocolSearch[searchProtocolID].sourceProduct.name = data.result[i]["productName"];
			protocolSearch[searchProtocolID].sourceProduct.purity = data.result[i]["purity"];
			protocolSearch[searchProtocolID].sourceProduct.capacity_value = data.result[i]["capacity"];
			protocolSearch[searchProtocolID].sourceProduct.capacity_type = data.result[i]["capacity_type"];
			protocolSearch[searchProtocolID].sourceProduct.selection_value = data.result[i]["selection"];
			protocolSearch[searchProtocolID].sourceProduct.selection_type = data.result[i]["selection_type"];
					
			var id_classifier = data.result[i]["ID_Product"].split(",");
			protocolSearch[searchProtocolID].sourceProduct.classifier.classifierType = Number(id_classifier[0]);
			
			if(protocolSearch[searchProtocolID].sourceProduct.classifier.classifierType == 0){
				protocolSearch[searchProtocolID].sourceProduct.classifier.classifierProduct.useADD = id_classifier[1] == "1" ? true : false;
				if(!protocolSearch[searchProtocolID].sourceProduct.classifier.classifierProduct.useADD){
					protocolSearch[searchProtocolID].sourceProduct.classifier.classifierProduct.mainClassifier.industryID = id_classifier[2];
					protocolSearch[searchProtocolID].sourceProduct.classifier.classifierProduct.mainClassifier.groupProductID = id_classifier[3];
					protocolSearch[searchProtocolID].sourceProduct.classifier.classifierProduct.mainClassifier.productID = id_classifier[4];
					protocolSearch[searchProtocolID].sourceProduct.classifier.classifierProduct.mainClassifier.descriptionID = id_classifier[5];
					protocolSearch[searchProtocolID].sourceProduct.classifier.classifierProduct.mainClassifier.productTypeID = id_classifier[6];
					protocolSearch[searchProtocolID].sourceProduct.classifier.classifierProduct.mainClassifier.productSortID = id_classifier[7];
					protocolSearch[searchProtocolID].sourceProduct.classifier.classifierProduct.mainClassifier.purposeID = id_classifier[8];
					protocolSearch[searchProtocolID].sourceProduct.classifier.classifierProduct.mainClassifier.GOST_ID = id_classifier[9];
				}
				else{
					protocolClassfierAddList.push({"id": id_classifier[2], "classifierType" : protocolSearch[searchProtocolID].sourceProduct.classifier.classifierType});
				}
			}
			else{
				protocolSearch[searchProtocolID].sourceProduct.classifier.classifierWeed.useADD = id_classifier[1] == "1" ? true : false;
				
				if(!protocolSearch[searchProtocolID].sourceProduct.classifier.classifierWeed.useADD){
					protocolSearch[searchProtocolID].sourceProduct.classifier.classifierWeed.mainClassifier.industryID = id_classifier[2];
					protocolSearch[searchProtocolID].sourceProduct.classifier.classifierWeed.mainClassifier.categoryID = id_classifier[3];
					protocolSearch[searchProtocolID].sourceProduct.classifier.classifierWeed.mainClassifier.classWeedID = id_classifier[4];
					protocolSearch[searchProtocolID].sourceProduct.classifier.classifierWeed.mainClassifier.weedNameID = id_classifier[5];
					protocolSearch[searchProtocolID].sourceProduct.classifier.classifierWeed.mainClassifier.descriptionID = id_classifier[6];
				}
				else{
					protocolClassfierAddList.push({"id": id_classifier[2], "classifierType" : protocolSearch[searchProtocolID].sourceProduct.classifier.classifierType});
				}
			}
			//Добавляем записанные фотки
			for(var j=0; j<=Number(data.result[i]["ID_mainPhoto"]); j++){
				protocolSearch[searchProtocolID].sourceProduct.images.push("/static/img/save_img/protocol_"+data.result[i].ID_Protocol+"/"+data.result[i].photoFolder +
					"/sourceProductImage_"+Number(j+1)+".png");
			}
		}
		search_sorting();
	})
	.fail(function(){
		search_product();
	});
}
function search_sorting(){
	$.getJSON($SCRIPT_ROOT + '/protocol/get_sorting',{
	}, function(data){
		var count = 0;
		for(var id = 0; id < protocolSearch.length; id++){
			searchProtocolID = id;
			for(var i = 0; i< protocolSearch[searchProtocolID].sorting.length; i++){
				protocolSearch[searchProtocolID].sorting[i].id = Number(data.result[count]["ID_Sorting"]-1);
				protocolSearch[searchProtocolID].sorting[i].capacity_value = Number(data.result[count]["capacity"]);
				protocolSearch[searchProtocolID].sorting[i].capacity_type = Number(data.result[count]["capacity_type"]);
				protocolSearch[searchProtocolID].sorting[i].purity = Number(data.result[count]["purity"]);
				protocolSearch[searchProtocolID].sorting[i].inbox_fraction = inbox_fraction_decode(data.result[count]["inbox_fraction"]);
				count++;
			}
		}
		search_accept();
	})
	.fail(function(){
		search_sorting();
	});
}
function search_accept(){
	$.getJSON($SCRIPT_ROOT + '/protocol/get_accept',{
	}, function(data){
		var count = 0;
		for(var id = 0; id < protocolSearch.length; id++){
			searchProtocolID = id;
			for(var i = 0; i< protocolSearch[searchProtocolID].sorting.length; i++){
				protocolSearch[searchProtocolID].sorting[i].accept_name = data.result[count]["fractionName"];
				protocolSearch[searchProtocolID].sorting[i].accept_name_id = data.result[count]["fractionNameID"];
				protocolSearch[searchProtocolID].sorting[i].accept_exit = Number(data.result[count]["exit"]);
				protocolSearch[searchProtocolID].sorting[i].accept_purity = Number(data.result[count]["purity"]);
				protocolSearch[searchProtocolID].sorting[i].accept_mass = Number(data.result[count]["capacity"]);
				protocolSearch[searchProtocolID].sorting[i].accept_selection_mass = Number(data.result[count]["selection"]);
				protocolSearch[searchProtocolID].sorting[i].accept_selection_type = Number(data.result[count]["selectiont_type"]);
						
				//Добавляем записанные фотки
				for(var j=0; j<=Number(data.result[i]["ID_mainPhoto"]); j++){
					protocolSearch[searchProtocolID].sorting[i].accept_img.push("/static/img/save_img/protocol_"+data.result[i].ID_Protocol+"/"+data.result[i].photoFolder+"/acceptImage_" + 
						Number(j+1)+".png");
				}
				count++;
			}
		}
		search_reject();
	})
	.fail(function(){
		search_accept();
	});
}
function search_reject(){
	$.getJSON($SCRIPT_ROOT + '/protocol/get_reject',{
	}, function(data){
		var count = 0;
		for(var id = 0; id < protocolSearch.length; id++){
			searchProtocolID = id;
			for(var i = 0; i< protocolSearch[searchProtocolID].sorting.length; i++){
				protocolSearch[searchProtocolID].sorting[i].reject_name = data.result[count]["fractionName"];
				protocolSearch[searchProtocolID].sorting[i].reject_name_id = data.result[count]["fractionNameID"];
				protocolSearch[searchProtocolID].sorting[i].reject_exit = Number(data.result[count]["exit"]);
				protocolSearch[searchProtocolID].sorting[i].reject_purity = Number(data.result[count]["purity"]);
				protocolSearch[searchProtocolID].sorting[i].reject_mass = Number(data.result[count]["capacity"]);
				protocolSearch[searchProtocolID].sorting[i].reject_selection_mass = Number(data.result[count]["selection"]);
				protocolSearch[searchProtocolID].sorting[i].reject_selection_type = Number(data.result[count]["selectiont_type"]);
						
				//Добавляем записанные фотки
				for(var j=0; j<=Number(data.result[i]["ID_mainPhoto"]); j++){
					protocolSearch[searchProtocolID].sorting[i].reject_img.push("/static/img/save_img/protocol_"+data.result[i].ID_Protocol+"/"+data.result[i].photoFolder+"/rejectImage_" + 
						Number(j+1)+".png");
				}
				count++;
			}
		}
		search_component();
	})
	.fail(function(){
		search_reject();
	});
}
function search_component(){
	$.getJSON($SCRIPT_ROOT + '/protocol/get_component',{
	}, function(data){
		var count = 0;
		for(var id = 0; id < protocolSearch.length; id++){
			searchProtocolID = id;
			for(var i=0; i < protocolSearch[searchProtocolID].sourceProduct.components.length; i++){
				
				protocolSearch[searchProtocolID].sourceProduct.components[i].product_name = data.result[count]["row_3"];
				protocolSearch[searchProtocolID].sourceProduct.components[i].value = (data.result[count]["row_7"] == "TRUE") ? data.result[count]["row_4"] : 0;
				protocolSearch[searchProtocolID].sourceProduct.components[i].value_type = data.result[count]["row_5"];
				protocolSearch[searchProtocolID].sourceProduct.components[i].removed_value = (data.result[i]["row_7"] == "FALSE") ? data.result[i]["row_4"] : 0;
				protocolSearch[searchProtocolID].sourceProduct.components[i].flag_1 = (data.result[count]["row_6"] == "TRUE") ? true : false;
				protocolSearch[searchProtocolID].sourceProduct.components[i].flag_2 = (data.result[count]["row_7"] == "TRUE") ? true : false;
					
				var id_classifier = data.result[count]["row_1"].split(",");
				protocolSearch[searchProtocolID].sourceProduct.components[i].classifier.classifierType = Number(id_classifier[0]);
				
				if(protocolSearch[searchProtocolID].sourceProduct.components[i].classifier.classifierType == 0){
					protocolSearch[searchProtocolID].sourceProduct.components[i].classifier.classifierProduct.useADD = id_classifier[1] == "1" ? true : false;
					
					if(!protocolSearch[searchProtocolID].sourceProduct.components[i].classifier.classifierProduct.useADD){
						protocolSearch[searchProtocolID].sourceProduct.components[i].classifier.classifierProduct.mainClassifier.industryID = id_classifier[2];
						protocolSearch[searchProtocolID].sourceProduct.components[i].classifier.classifierProduct.mainClassifier.groupProductID = id_classifier[3];
						protocolSearch[searchProtocolID].sourceProduct.components[i].classifier.classifierProduct.mainClassifier.productID = id_classifier[4];
						protocolSearch[searchProtocolID].sourceProduct.components[i].classifier.classifierProduct.mainClassifier.descriptionID = id_classifier[5];
						protocolSearch[searchProtocolID].sourceProduct.components[i].classifier.classifierProduct.mainClassifier.productTypeID = id_classifier[6];
						protocolSearch[searchProtocolID].sourceProduct.components[i].classifier.classifierProduct.mainClassifier.productSortID = id_classifier[7];
					}
					else{
						protocolClassfierAddList.push({"id": id_classifier[2], "classifierType" : protocolSearch[searchProtocolID].sourceProduct.components[i].classifier.classifierType});
					}
				}
				else{
					protocolSearch[searchProtocolID].sourceProduct.components[i].classifier.classifierWeed.useADD = id_classifier[1] == "1" ? true : false;
					
					if(!protocolSearch[searchProtocolID].sourceProduct.components[i].classifier.classifierWeed.useADD){
						protocolSearch[searchProtocolID].sourceProduct.components[i].classifier.classifierWeed.mainClassifier.industryID = id_classifier[2];
						protocolSearch[searchProtocolID].sourceProduct.components[i].classifier.classifierWeed.mainClassifier.categoryID = id_classifier[3];
						protocolSearch[searchProtocolID].sourceProduct.components[i].classifier.classifierWeed.mainClassifier.classWeedID = id_classifier[4];
						protocolSearch[searchProtocolID].sourceProduct.components[i].classifier.classifierWeed.mainClassifier.weedNameID = id_classifier[5];
						protocolSearch[searchProtocolID].sourceProduct.components[i].classifier.classifierWeed.mainClassifier.descriptionID = id_classifier[6];
					}
					else{
						protocolClassfierAddList.push({"id": id_classifier[2], "classifierType" : protocolSearch[searchProtocolID].sourceProduct.components[i].classifier.classifierType});
					}
				}
					
				//Добавляем записанные фотки
				for(var j=0; j<=Number(data.result[count]["row_9"]); j++){
					protocolSearch[searchProtocolID].sourceProduct.components[i].images.push("/static/img/save_img/protocol_"+data.result[count].row_0+"/"+data.result[count].row_8+"/component_" +
						Number(j+1)+".png"); 
				}
						
				for(var j=0; j < protocolSearch[searchProtocolID].sorting.length; j++){
					var accept_value = (data.result[count]["row_7"] == "TRUE") ? Number(data.result[count]["row_"+(j*8+10)]) : 0;
					var accept_value_type = Number(data.result[count]["row_"+(j*8+11)]);
					var accept_removed_value = (data.result[count]["row_7"] == "FALSE") ? Number(data.result[count]["row_"+(j*8+10)]) : 0;
					var accept_flag_1 = (data.result[count]["row_"+(j*8+12)] == "TRUE") ? true : false;
					var accept_flag_2 = (data.result[count]["row_"+(j*8+13)] == "TRUE") ? true : false;
					protocolSearch[searchProtocolID].sorting[j].accept_components[i] = {
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
					protocolSearch[searchProtocolID].sorting[j].reject_components[i] = {
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
	.fail(function(){
		search_component();
	});
}

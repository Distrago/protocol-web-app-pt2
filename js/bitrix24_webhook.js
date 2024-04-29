function get_task_bitrix24(taskID){
	//$.getJSON('https://csort.bitrix24.ru/rest/284/6984u4eiy6xut0p1/task.item.getdata.json?taskId='+taskID,{
	$.getJSON('https://csort.bitrix24.ru/rest/284/6984u4eiy6xut0p1/crm.deal.get.json?ID='+taskID,{
	}, function(data){
		if(document.location.pathname == "/protocol"){
			queryParametrList.id_creater = data.result.CREATED_BY;
			queryParametrList.id_responsible = data.result.RESPONSIBLE_ID;
			queryParametrList.id_deal = typeof data.result.UF_CRM_TASK == "boolean" ? "-" : data.result.UF_CRM_TASK[0].substr(2);
			queryParametrList.company_name = data.result.UF_AUTO_236825523115 != null ? data.result.UF_AUTO_236825523115 : "-";
			
			protocolRequirements.id_user = queryParametrList.id_creater;
			protocolRequirements.id_deal = queryParametrList.id_deal;
			protocolRequirements.company_name = queryParametrList.company_name;
			
			for(var i=0; i<protocol.length; i++){
				protocol[i].id_creater = queryParametrList.id_creater;
				protocol[i].id_responsible = queryParametrList.id_responsible;
				protocol[i].company_name = queryParametrList.company_name;
			}
		}
		else{
			commecrialOfferInfo(data);
		}
	})
	.fail(function(){
		console.log("Error");
	});
}

function commecrialOfferInfo(data){
	var manager = search_user_info(data.result.ASSIGNED_BY_ID);
	//Объекты информации о менеджере
	var photo = managerInfoBlock.children[0];
	var name = managerInfoBlock.children[1].children[0];
	var rank_position = managerInfoBlock.children[1].children[1];
	var mail = managerInfoBlock.children[1].children[4];
	var phone = managerInfoBlock.children[1].children[5];
		
	photo.style.backgroundImage = "url(/static/img/manager/" + manager.photo + ")";
	name.textContent = manager.name;
	rank_position.textContent = manager.rank_position;
	mail.textContent = "email: " + manager.mail;
	phone.textContent = "моб: " + manager.phone;
	
	switch(manager.district){
		case "Барнаул":
			QR_code_img.style.backgroundImage = "url(/static/img/qr-code/barnaul.png)";
			TG_link.href = "https://www.stqr.ru/7731-33-701?share=ec9e2015b8771a91f1292ee748460d1c";
			break;
		case "Краснодар":
			QR_code_img.style.backgroundImage = "url(/static/img/qr-code/krasnodar.png)";
			TG_link.href = "https://www.stqr.ru/7731-35-894?share=2cacff779ac9e03da6015744f3f0e726";
			break;
		case "Новосибирск":
			QR_code_img.style.backgroundImage = "url(/static/img/qr-code/novosibirsk.png)";
			TG_link.href = "https://www.stqr.ru/7731-34-184?share=4afe944c4308ce455ab6f1731ba83d3f";
			break;
		case "Самара":
			QR_code_img.style.backgroundImage = "url(/static/img/qr-code/samara.png)";
			TG_link.href = "https://www.stqr.ru/7731-37-296?share=b34944708282e982552fe9a09fa1e103";
			break;
		case "Воронеж":
			QR_code_img.style.backgroundImage = "url(/static/img/qr-code/voronej.png)";
			TG_link.href = "https://www.stqr.ru/7731-36-881?share=bcfbde430b12692ace4499b0c92e4107";
			break;
	}
	
	//prepareProductList(data.comercialOfferElementIDs);

	__managerName = manager.name;
	__managerDistrict =  manager.district;
}

function NewCommercialOfferInfo(ID){
	var _data = {
		"ID": ID 
	}
	$.ajax({
		url: '/bitrix/get_deal',
		type: 'post',
		dataType: 'json',
		contentType: 'application/json',
		data: JSON.stringify(_data),
		success: function(data){
			SetupCommecrialOfferInfo(data);
			console.log(data);
		}
	})
}

function NewDealerCommercialOfferInfo(ID){
	var _data = {
		"ID": ID 
	}
	$.ajax({
		url: '/bitrix/get_smart_deal',
		type: 'post',
		dataType: 'json',
		contentType: 'application/json',
		data: JSON.stringify(_data),
		success: function(data){
			SetupDealerCommercialOfferInfo(data);
			console.log(data);
		}
	})
}
 
function SetupCommecrialOfferInfo(data){
	//InfoDeal.id_deal = data.result.id_deal;
	var manager = data.result.id_manager;
	//Объекты информации о менеджере
	var photo = managerInfoBlock.children[0];
	var name = managerInfoBlock.children[1].children[0];
	var rank_position = managerInfoBlock.children[1].children[1];
	var mail = managerInfoBlock.children[1].children[4];
	var phone = managerInfoBlock.children[1].children[5];
	
	var textPhone = data.result.managerPhone.slice(0,2) + " (" + 
					data.result.managerPhone.slice(2,5) + ") " +
					data.result.managerPhone.slice(5,8) + "-" +
					data.result.managerPhone.slice(8,10) + "-" +
					data.result.managerPhone.slice(10)
	
	if(data.result.managerImg.indexOf("Izobrazhenie") != -1){
		data.result.managerImg = data.result.managerImg.replace("Izobrazhenie ", "Izobrazhenie%20");
		data.result.managerImg = data.result.managerImg.replace("WhatsApp ", "WhatsApp%20");
		data.result.managerImg = data.result.managerImg.replace(" v ", "%20v%20");
	}
	
	
	photo.style.backgroundImage = "url(" + data.result.managerImg + ")";
	name.textContent = data.result.managerName + " " + data.result.managerLastName;
	rank_position.textContent = data.result.managerPosition;
	mail.textContent = "email: " + data.result.managerEmail;
	phone.textContent = "моб: " + textPhone;
	
	switch(data.result.managerDistrict){
		case "Барнаул":
			QR_code_img.style.backgroundImage = "url(/static/img/qr-code/barnaul.png)";
			TG_link.href = "https://www.stqr.ru/7731-33-701?share=ec9e2015b8771a91f1292ee748460d1c";
			break;
		case "Краснодар":
			QR_code_img.style.backgroundImage = "url(/static/img/qr-code/krasnodar.png)";
			TG_link.href = "https://www.stqr.ru/7731-35-894?share=2cacff779ac9e03da6015744f3f0e726";
			break;
		case "Новосибирск":
			QR_code_img.style.backgroundImage = "url(/static/img/qr-code/novosibirsk.png)";
			TG_link.href = "https://www.stqr.ru/7731-34-184?share=4afe944c4308ce455ab6f1731ba83d3f";
			break;
		case "Самара":
			QR_code_img.style.backgroundImage = "url(/static/img/qr-code/samara.png)";
			TG_link.href = "https://www.stqr.ru/7731-37-296?share=b34944708282e982552fe9a09fa1e103";
			break;
		case "Воронеж":
			QR_code_img.style.backgroundImage = "url(/static/img/qr-code/voronej.png)";
			TG_link.href = "https://www.stqr.ru/7731-36-881?share=bcfbde430b12692ace4499b0c92e4107";
			break;
	}
	
	prepareProductList(data.result);

	__managerName = data.result.managerName + " " + data.result.managerLastName;
	__managerDistrict =  data.result.managerDistrict;
}

function SetupDealerCommercialOfferInfo(data){
	InfoDeal.id_deal = data.result.id_smart;
	var manager = data.result.id_manager;
	//Объекты информации о менеджере
	var photo = managerInfoBlock.children[0];
	var name = managerInfoBlock.children[1].children[0];
	var rank_position = managerInfoBlock.children[1].children[1];
	var company_name = managerInfoBlock.children[1].children[2];
	var mail = managerInfoBlock.children[1].children[4];
	var phone = managerInfoBlock.children[1].children[5];
	
	var TitleDiscription = document.getElementById("p1").children[0].children[0].children[1].children[0].children[0];
	
	var textPhone = data.result.dealerPhone.slice(0,2) + " (" + 
					data.result.dealerPhone.slice(2,5) + ") " +
					data.result.dealerPhone.slice(5,8) + "-" +
					data.result.dealerPhone.slice(8,10) + "-" +
					data.result.dealerPhone.slice(10)
	
	if(data.result.dealerImg.indexOf("Izobrazhenie") != -1){
		data.result.dealerImg = data.result.dealerImg.replace("Izobrazhenie ", "Izobrazhenie%20");
		data.result.dealerImg = data.result.dealerImg.replace("WhatsApp ", "WhatsApp%20");
		data.result.dealerImg = data.result.dealerImg.replace(" v ", "%20v%20");
	}
	
	
	photo.style.backgroundImage = "url(" + data.result.dealerImg + ")";
	name.textContent = data.result.dealerName + " " + data.result.dealerLastName;
	rank_position.textContent = data.result.dealerPosition;
	company_name.textContent = data.result.dealerCompany;
	mail.textContent = "email: " + data.result.dealerEmail;
	phone.textContent = "моб: " + textPhone;
	
	/*Описания на заглавной странице*/
	TitleDiscription.textContent = data.result.dealerTitleDiscription;
	introduction.textContent = data.result.dealerDiscription;
	
	/*Элеменыты теллеграма*/
	QR_code_img.style.backgroundImage = "url(" + data.result.telegramQR + ")";
	TG_link.textContent = data.result.telegramName;
	TG_link.href = data.result.telegramURL;
	TG_link.style.marginLeft = "0px";
	TG_link.parentNode.children[2].textContent = data.result.telegramDiscription;
	
	
	var logoMain = document.getElementsByClassName("topLogo")[0];
	var logoADD = document.getElementsByClassName("bottomLogoImage");
	
	/*Установка изображения логотипов*/
	logoMain.style.backgroundImage = "url(" + data.result.dealerLogoMain + ")";
	for(var i = 0; i < logoADD.length; i++){
		logoADD[i].style.backgroundImage = "url(" + data.result.dealerLogoADD + ")";
	}
	
	prepareProductList(data.result);
	
	__managerName = data.result.managerName + " " + data.result.managerLastName;
	__managerDistrict =  data.result.managerDistrict;
}

function preloadComercialOfferInfo(){
	$.ajax({
		url: '/bitrix/preload_data',
		type: 'get',
		dataType: 'json',
		contentType: 'application/json',
		success: function(data){
			BitrixPreloadData.tears_of_payment = data.result.tears_of_payment;
			prepareTermsOfDelivery();
		}
	})
}


function UpdateCommercialOfferInfo(){
	var _data = prepareProductToDeal();
	
	/*Временно разместил кусочек тут*/
	$.ajax({
		url: '/bitrix/update_deal',
		type: 'post',
		dataType: 'json',
		contentType: 'application/json',
		data: JSON.stringify(_data),
		success: function(data){
			console.log(data);
		}
	})
}

function UpdateDealerCommercialOfferInfo(){
	var _data = prepareProductToDealerDeal();
	
	/*Временно разместил кусочек тут*/
	$.ajax({
		url: '/bitrix/update_smart_deal',
		type: 'post',
		dataType: 'json',
		contentType: 'application/json',
		data: JSON.stringify(_data),
		success: function(data){
			console.log(data);
		}
	})
}

function checkSpecialApparat(apparatName){
	var listApparatName = ["МиниСорт", "SmartSort Eco"]; //Список может быть расширен, возможно стоит сделать динамическую
	var flag = false;
	for(var i = 0; i < listApparatName.length; i++){
		if(apparatName.search(listApparatName[i]) != -1){
			flag = true;
			break;
		}
	}

	return flag;
}


function prepareProductToDeal(){
	var _data = {
		"product":{
			"id": InfoDeal.id_deal,
			"rows":[]
		},
		"projectList":{
			"id": InfoDeal.id_deal,
			"fields":{
				"UF_CRM_1667964666":[], //Состав проекта (список)
				"UF_CRM_1673438603":[], //Тех поле (id документов/указатели),
				"UF_CRM_1679466250": 0, // Цена доставки
				"UF_CRM_1679466187": DeliveryInfo.children[1].textContent, //Адресс доставки
				"UF_CRM_1679467146": paymentSelector.value
				//"UF_CRM_1673438837":[], //Тех поле (ссылки на документы)
				//"UF_CRM_1676004623": "Договор (ФС итого)",
				//"UF_CRM_1676004664": "Договор (ФС НДС)",
				//"UF_CRM_1676004744": "Договор (ФС прайс)",
				//"UF_CRM_1676010536": "Договор (Компрессор итого)",
				//"UF_CRM_1676010582": "Договор (Компрессор ндс)"
			}
		},
		"smartInInvoice":{
			"ApparatInvoice":{
				"active": false,
				"ufCrmSmartInvoice1676255170530": 1559,
				"assignedById": InfoDeal.id_contact,
				"parentId2": InfoDeal.id_deal,
				"productRows": [],
				"ApparatModelList": ApparatModelList.sort()
			},
			"KompressorInvoice":{
				"active": false,
				"ufCrmSmartInvoice1676255170530": 1561,
				"assignedById": InfoDeal.id_contact,
				"parentId2": InfoDeal.id_deal,
				"productRows": []
			},
			"ElevatorInvoice":{
				"active": false,
				"ufCrmSmartInvoice1676255170530": 1563,
				"assignedById": InfoDeal.id_contact,
				"parentId2": InfoDeal.id_deal,
				"productRows": [],
				"ElevatirModelList": ElevatirModelList.sort()
			},
			"AddEquipmentInvoice":{
				"active": false,
				"ufCrmSmartInvoice1676255170530": 2145,
				"assignedById": InfoDeal.id_contact,
				"parentId2": InfoDeal.id_deal,
				"productRows": []
			},
			"ImportInvoice":{
				"active": false,
				"ufCrmSmartInvoice1676255170530": 2243,
				"assignedById": InfoDeal.id_contact,
				"parentId2": InfoDeal.id_deal,
				"productRows": []
			}
		}
	}
	
	var contractData = {
		"ApparatGroup": {
			"discountSum": 0, 
			"priceSum": 0,
			"nds": 0},
		"KompressorGroup": {
			"discountSum": 0, 
			"priceSum": 0,
			"nds": 0},
		"ElevatorGroup": {
			"discountSum": 0, 
			"priceSum": 0,
			"nds": 0},
		"AddEquipmentGroup": {
			"discountSum": 0, 
			"priceSum": 0,
			"nds": 0},	
		"ImportGroup": {
			"discountSum": 0, 
			"priceSum": 0,
			"nds": 0}		
	}
	
	var checkKompressor = false;
	
	for(var i = 1; i < priceModelBlock.children.length; i++){
		if(ComercialOfferElementIDs[i-1].text.search("Компрессор") != -1){
			checkKompressor = true;
		}
	}
	
	for(var i = 1; i < priceModelBlock.children.length; i++){
		var componentName = document.getElementById("componentName_"+i).textContent;
		var sum = document.getElementById("sum_"+i).value;
		var discountSum = document.getElementById("discountSum_"+i).value;
		var count = document.getElementById("count_"+i).value;
		var discountType = headerTooltip.children[7].children[0].value == '0' ? 1 : 2;
		var discountValue = document.getElementById("discountValue_"+i).value;
		var nds = document.getElementById("nds_"+i).value
		
		var exception = checkSpecialApparat(apparatName);
		
		/*Заполнение данных договора счетов*/
		if((ComercialOfferElementIDs[i-1].text.search("Аппарат") != -1 || ComercialOfferElementIDs[i-1].text.search("Фотосепараторы Сисорт") != -1) && !exception){
			contractData.ApparatGroup.discountSum += Number(discountSum);
			contractData.ApparatGroup.priceSum += Number(sum);
			contractData.ApparatGroup.nds += Number(nds);
			
			/*Заполнение продуктов для создания счета*/
			_data.smartInInvoice.ApparatInvoice.productRows.push({
				"productName": componentName,
				"price": Number(discountSum / count),
				"discountTypeId": discountType,
				"taxRate": Number(nds) != 0 ? 20 : 0,
				"taxIncluded": Number(nds) != 0 ? "Y" : "N",
				"quantity": Number(count),
				"measureCode": 796,
				"measureName": "шт"
			})
			
			var _id = _data.smartInInvoice.ApparatInvoice.productRows.length-1;
			
			if (discountType == 1){
				_data.smartInInvoice.ApparatInvoice.productRows[_id]["discountSum"] = discountValue;
			}
			else{
				_data.smartInInvoice.ApparatInvoice.productRows[_id]["discountRate"] = discountValue;
			}
		}
		else if(ComercialOfferElementIDs[i-1].text.search("Компрессор") != -1){
			contractData.KompressorGroup.discountSum += Number(discountSum);
			contractData.KompressorGroup.priceSum += Number(sum);
			contractData.KompressorGroup.nds += Number(nds);
			
			/*Заполнение продуктов для создания счета*/
			_data.smartInInvoice.KompressorInvoice.productRows.push({
				"productName": componentName,
				"price": Number(discountSum / count),
				"discountTypeId": discountType,
				"taxRate": Number(nds) != 0 ? 20 : 0,
				"taxIncluded": Number(nds) != 0 ? "Y" : "N",
				"quantity": Number(count),
				"measureCode": 796,
				"measureName": "шт"
			})
			
			var _id = _data.smartInInvoice.KompressorInvoice.productRows.length-1;
			
			if (discountType == 1){
				_data.smartInInvoice.KompressorInvoice.productRows[_id]["discountSum"] = discountValue;
			}
			else{
				_data.smartInInvoice.KompressorInvoice.productRows[_id]["discountRate"] = discountValue;
			}
			
		}
		else if(ComercialOfferElementIDs[i-1].text.search("Элеватор") != -1){
			contractData.ElevatorGroup.discountSum += Number(discountSum);
			contractData.ElevatorGroup.priceSum += Number(sum);
			contractData.ElevatorGroup.nds += Number(nds);
			
			/*Заполнение продуктов для создания счета*/
			_data.smartInInvoice.ElevatorInvoice.productRows.push({
				"productName": componentName,
				"price": Number(discountSum / count),
				"discountTypeId": discountType,
				"taxRate": Number(nds) != 0 ? 20 : 0,
				"taxIncluded": Number(nds) != 0 ? "Y" : "N",
				"quantity": Number(count),
				"measureCode": 796,
				"measureName": "шт"
			})
			
			var _id = _data.smartInInvoice.ElevatorInvoice.productRows.length-1;
			
			if (discountType == 1){
				_data.smartInInvoice.ElevatorInvoice.productRows[_id]["discountSum"] = discountValue;
			}
			else{
				_data.smartInInvoice.ElevatorInvoice.productRows[_id]["discountRate"] = discountValue;
			}
		}
		else if(ComercialOfferElementIDs[i-1].text.search("Бункеры и сходы") != -1){
			if(checkKompressor){
				contractData.KompressorGroup.discountSum += Number(discountSum);
				contractData.KompressorGroup.priceSum += Number(sum);
				contractData.KompressorGroup.nds += Number(nds);
				
				/*Заполнение продуктов для создания счета*/
				_data.smartInInvoice.KompressorInvoice.productRows.push({
					"productName": componentName,
					"price": Number(discountSum / count),
					"discountTypeId": discountType,
					"taxRate": Number(nds) != 0 ? 20 : 0,
					"taxIncluded": Number(nds) != 0 ? "Y" : "N",
					"quantity": Number(count),
					"measureCode": 796,
					"measureName": "шт"
				})
				
				var _id = _data.smartInInvoice.KompressorInvoice.productRows.length-1;
				
				if (discountType == 1){
					_data.smartInInvoice.KompressorInvoice.productRows[_id]["discountSum"] = discountValue;
				}
				else{
					_data.smartInInvoice.KompressorInvoice.productRows[_id]["discountRate"] = discountValue;
				}
			}
			else{
				contractData.AddEquipmentGroup.discountSum += Number(discountSum);
				contractData.AddEquipmentGroup.priceSum += Number(sum);
				contractData.AddEquipmentGroup.nds += Number(nds);
				
				/*Заполнение продуктов для создания счета*/
				_data.smartInInvoice.AddEquipmentInvoice.productRows.push({
					"productName": componentName,
					"price": Number(discountSum / count),
					"discountTypeId": discountType,
					"taxRate": Number(nds) != 0 ? 20 : 0,
					"taxIncluded": Number(nds) != 0 ? "Y" : "N",
					"quantity": Number(count),
					"measureCode": 796,
					"measureName": "шт"
				})
				
				var _id = _data.smartInInvoice.AddEquipmentInvoice.productRows.length-1;
				
				if (discountType == 1){
					_data.smartInInvoice.AddEquipmentInvoice.productRows[_id]["discountSum"] = discountValue;
				}
				else{
					_data.smartInInvoice.AddEquipmentInvoice.productRows[_id]["discountRate"] = discountValue;
				}
			}
		}
		else if(ComercialOfferElementIDs[i-1].text.search("Аспирация") != -1){
			if(checkKompressor){
				contractData.KompressorGroup.discountSum += Number(discountSum);
				contractData.KompressorGroup.priceSum += Number(sum);
				contractData.KompressorGroup.nds += Number(nds);
				
				/*Заполнение продуктов для создания счета*/
				_data.smartInInvoice.KompressorInvoice.productRows.push({
					"productName": componentName,
					"price": Number(discountSum / count),
					"discountTypeId": discountType,
					"taxRate": Number(nds) != 0 ? 20 : 0,
					"taxIncluded": Number(nds) != 0 ? "Y" : "N",
					"quantity": Number(count),
					"measureCode": 796,
					"measureName": "шт"
				})
				
				var _id = _data.smartInInvoice.KompressorInvoice.productRows.length-1;
				
				if (discountType == 1){
					_data.smartInInvoice.KompressorInvoice.productRows[_id]["discountSum"] = discountValue;
				}
				else{
					_data.smartInInvoice.KompressorInvoice.productRows[_id]["discountRate"] = discountValue;
				}
			}
			else{
				contractData.AddEquipmentGroup.discountSum += Number(discountSum);
				contractData.AddEquipmentGroup.priceSum += Number(sum);
				contractData.AddEquipmentGroup.nds += Number(nds);
				
				/*Заполнение продуктов для создания счета*/
				_data.smartInInvoice.AddEquipmentInvoice.productRows.push({
					"productName": componentName,
					"price": Number(discountSum / count),
					"discountTypeId": discountType,
					"taxRate": Number(nds) != 0 ? 20 : 0,
					"taxIncluded": Number(nds) != 0 ? "Y" : "N",
					"quantity": Number(count),
					"measureCode": 796,
					"measureName": "шт"
				})
				
				var _id = _data.smartInInvoice.AddEquipmentInvoice.productRows.length-1;
				
				if (discountType == 1){
					_data.smartInInvoice.AddEquipmentInvoice.productRows[_id]["discountSum"] = discountValue;
				}
				else{
					_data.smartInInvoice.AddEquipmentInvoice.productRows[_id]["discountRate"] = discountValue;
				}
			}
		}
		else if(ComercialOfferElementIDs[i-1].text.search("Свое Значение") != -1){
			
		}
		else if(ComercialOfferElementIDs[i-1].text.search("CUBER") != -1){
			
		}
		else if((ComercialOfferElementIDs[i-1].text.search("Импортные") != -1 || ComercialOfferElementIDs[i-1].text.search("Фотосепараторы") != -1) || exception){
			contractData.ImportGroup.discountSum += Number(discountSum);
			contractData.ImportGroup.priceSum += Number(sum);
			contractData.ImportGroup.nds += Number(nds);
			
			/*Заполнение продуктов для создания счета*/
			_data.smartInInvoice.ImportInvoice.productRows.push({
				"productName": componentName,
				"price": Number(discountSum / count),
				"discountTypeId": discountType,
				"taxRate": Number(nds) != 0 ? 20 : 0,
				"taxIncluded": Number(nds) != 0 ? "Y" : "N",
				"quantity": Number(count),
				"measureCode": 796,
				"measureName": "шт"
			})
			
			var _id = _data.smartInInvoice.ImportInvoice.productRows.length-1;
			
			if (discountType == 1){
				_data.smartInInvoice.ImportInvoice.productRows[_id]["discountSum"] = discountValue;
			}
			else{
				_data.smartInInvoice.ImportInvoice.productRows[_id]["discountRate"] = discountValue;
			}
		}
		else if(ComercialOfferElementIDs[i-1].text.search("Ввод в эксплуатацию") != -1){
			
		}
		else if(ComercialOfferElementIDs[i-1].text.search("Доставка") != -1){
			_data.projectList.fields.UF_CRM_1679466250 = discountSum;
		}
		
		/*Заполнение продуктов*/
		_data.product.rows.push({
			"ID": i-1,
			"PRODUCT_NAME": componentName,
			"PRICE": Number(discountSum / count),
			"DISCOUNT_TYPE_ID": discountType,
			"TAX_RATE": Number(nds) != 0 ? 20 : 0,
			"TAX_INCLUDED": Number(nds) != 0 ? "Y" : "N",
			"QUANTITY": Number(count),
			"MEASURE_CODE": 796,
			"MEASURE_NAME": "шт"
		})
		
		if (discountType == 1){
			_data.product.rows[i-1]["DISCOUNT_SUM"] = discountValue;
		}
		else{
			_data.product.rows[i-1]["DISCOUNT_RATE"] = discountValue;
		}
		/*Заполнение списка проекта(сделки)*/
		
		_data.projectList.fields.UF_CRM_1667964666.push(componentName + " " + count + "шт. " + Number(discountSum / count).toFixed(2) +"руб.");
	}
	
	for(var i = 0; i < ComercialOfferElementIDs.length; i++){
		_data.projectList.fields.UF_CRM_1673438603.push(ComercialOfferElementIDs[i].text);
	}
	/*
	_data.projectList.fields.UF_CRM_1676004623 = contractData.ApparatGroup.discountSum;
	_data.projectList.fields.UF_CRM_1676004664 = contractData.ApparatGroup.nds;
	_data.projectList.fields.UF_CRM_1676004744 = contractData.ApparatGroup.priceSum;
	_data.projectList.fields.UF_CRM_1676010536 = contractData.KompressorGroup.discountSum;
	_data.projectList.fields.UF_CRM_1676010582 = contractData.KompressorGroup.nds;
	*/
	
	_data.smartInInvoice.ApparatInvoice.active = _data.smartInInvoice.ApparatInvoice.productRows.length != 0 ? true : false;
	_data.smartInInvoice.KompressorInvoice.active = _data.smartInInvoice.KompressorInvoice.productRows.length != 0 ? true : false;
	_data.smartInInvoice.ElevatorInvoice.active = _data.smartInInvoice.ElevatorInvoice.productRows.length != 0 ? true : false;
	_data.smartInInvoice.AddEquipmentInvoice.active = _data.smartInInvoice.AddEquipmentInvoice.productRows.length != 0 ? true : false;
	_data.smartInInvoice.ImportInvoice.active = _data.smartInInvoice.ImportInvoice.productRows.length != 0 ? true : false;
	
	return _data;
}

function prepareProductToDealerDeal(){
	var _data = {
		"id": InfoDeal.id_deal,
		"productRows":[],
		"projectList":{
			"fields":{
				"ufCrm27_1694418608":[], //Состав проекта (список)
				"ufCrm27_1694418527":[], //Тех поле (id документов/указатели),
				//"": 0, // Цена доставки
				//"": DeliveryInfo.children[1].textContent, //Адресс доставки
			}
		}
	}
	
	for(var i = 1; i < priceModelBlock.children.length; i++){
		var componentName = document.getElementById("componentName_"+i).textContent;
		var discountSum = document.getElementById("discountSum_"+i).value;
		var count = document.getElementById("count_"+i).value;
		var discountType = headerTooltip.children[7].children[0].value == '0' ? 1 : 2;
		var discountValue = document.getElementById("discountValue_"+i).value;
		var nds = document.getElementById("nds_"+i).value
		
		/*Заполнение продуктов*/
		_data.productRows.push({
			"id": i-1,
			"productName": componentName,
			"price": Number(discountSum / count),
			"discountTypeId": discountType,
			"taxRate": Number(nds) != 0 ? 20 : 0,
			"taxIncluded": Number(nds) != 0 ? "Y" : "N",
			"quantity": Number(count),
			"measureCode": 796,
			"measureName": "шт"
		})
		
		if (discountType == 1){
			_data.productRows[i-1]["discountSum"] = discountValue;
		}
		else{
			_data.productRows[i-1]["discountRate"] = discountValue;
		}
		/*Заполнение списка проекта(сделки)*/
		_data.projectList.fields.ufCrm27_1694418608.push(componentName + " " + count + "шт. " + Number(discountSum / count).toFixed(2) +"руб.");
	}
	
	for(var i = 0; i < ComercialOfferElementIDs.length; i++){
		_data.projectList.fields.ufCrm27_1694418527.push(ComercialOfferElementIDs[i].text);
	}
	
	return _data;
}

//id документов/указатели
var ComercialOfferElementIDs = []
function newAddComercialOfferElement(selectType, idRow){
	switch(selectType){
		case "0":
			ComercialOfferElementIDs.push(
				{
					"text": '"' + mainSelector.options[mainSelector.value].textContent + '"' + " ID: " + mainSelector.value + " " + calcElevator.value + " " + calcConf.value + " " + calcLotok.value
				}
			);
			break;
		case "1":
			ComercialOfferElementIDs.push(
				{
					"text": '"' + mainSelector.options[mainSelector.value].textContent + '"' + " ID: " + mainSelector.value + " " + genesisProvider.value + " " + GenesisModel.value + " " + GenesisMotor.value
				}
			);
			break;
		case "2":
			ComercialOfferElementIDs.push(
				{
					"text": '"' + mainSelector.options[mainSelector.value].textContent + '"' + " ID: " + mainSelector.value + " " + "Протокол: " + protocolSelector.getElementsByTagName("input")[0].value
				}
			);
			break;
		case "3":
			ComercialOfferElementIDs.push(
				{
					"text": '"' + mainSelector.options[mainSelector.value].textContent + '"' + " ID: " + mainSelector.value + " " + "Элеватор: " + elevatorSelector.getElementsByTagName("input")[0].value
				}
			);
			break;
		case "4":
			ComercialOfferElementIDs.push(
				{
					"text": '"' + mainSelector.options[mainSelector.value].textContent + '"' + " ID: " + mainSelector.value + " " + BunkerSelectorType.value + " " + BunkerShod.value + " " + BunkerSelectorLotok.value
				}
			);
			break;
		case "5":
			ComercialOfferElementIDs.push(
				{
					"text": '"' + mainSelector.options[mainSelector.value].textContent + '"' + " ID: " + mainSelector.value + " " + AspirationSelectorType.value + " " + SelectorPhotoseparation.value + " " + SelectorLotok.value
				}
			);
			break;
		case "6":
			ComercialOfferElementIDs.push(
				{
					
				}
			);
			break;
		case "7":
			ComercialOfferElementIDs.push(
				{
					"text": '"' + mainSelector.options[mainSelector.value].textContent + '"' + " ID: " + mainSelector.value
				}
			);
			break;
		case "8":
			ComercialOfferElementIDs.push(
				{
					"text": '"' + mainSelector.options[mainSelector.value].textContent + '"' + " ID: " + mainSelector.value + " " + cuberSize.value
				}
			);
			break;
		case "9":
			ComercialOfferElementIDs.push(
				{
					"text": '"' + mainSelector.options[mainSelector.value].textContent + '"' + " ID: " + mainSelector.value + " " + ImportModel.value
				}
			);
			break;
		case "10":
			ComercialOfferElementIDs.push(
				{
					"text": '"' + mainSelector.options[mainSelector.value].textContent + '"' + " ID: " + mainSelector.value
				}
			);
			break;
		case "11":
			ComercialOfferElementIDs.push(
				{
					"text": '"' + mainSelector.options[mainSelector.value].textContent + '"' + " ID: " + mainSelector.value
				}
			);
			break;
	}
}

async function prepareProductList(data){
	await sleep(2500);
	
	var discountType = headerTooltip.children[7].children[0].value;

	for(var i = 1; i <= data.comercialOfferElementIDs.length; i++){
		var selectorValue = data.comercialOfferElementIDs[i-1].split('"')[2].split(" ")[2];
		mainSelector.value = selectorValue;
		//Calculator();
		
		switch(selectorValue){
			case "0":
				calcElevator.value = data.comercialOfferElementIDs[i-1].split('"')[2].split(" ")[3];
				selectorParam();
				
				if(data.comercialOfferElementIDs[i-1].indexOf("extra light") != -1){
					calcConf.value = data.comercialOfferElementIDs[i-1].split('"')[2].split(" ")[4] + " " + data.comercialOfferElementIDs[i-1].split('"')[2].split(" ")[5];
					calcLotok.value = data.comercialOfferElementIDs[i-1].split('"')[2].split(" ")[6];
				}
				else{
					calcConf.value = data.comercialOfferElementIDs[i-1].split('"')[2].split(" ")[4];
					calcLotok.value = data.comercialOfferElementIDs[i-1].split('"')[2].split(" ")[5];
				}
				
				CalculatorClose();
				
				document.getElementById("discountValue_"+i).value = discountType == "0" ? document.getElementById("price_"+i).value - data.productList[i-1].price : data.productList[i-1].DISCOUNT_RATE;
				document.getElementById("count_"+i).value = data.productList[i-1].count;
				CalculatePrice(i);
				
				await sleep(500);
				
				break;
			case "1":
				genesisProvider.value = data.comercialOfferElementIDs[i-1].split('"')[2].split(" ")[3];
				selectorKompressor();
				
				GenesisModel.value = data.comercialOfferElementIDs[i-1].split('"')[2].split(" ").length == 6 ? data.comercialOfferElementIDs[i-1].split('"')[2].split(" ")[4] : data.comercialOfferElementIDs[i-1].split('"')[2].split(" ")[4] + " " + data.comercialOfferElementIDs[i-1].split('"')[2].split(" ")[5];
				//для старой версии
				GenesisModel.value = GenesisModel.value == "" ? data.comercialOfferElementIDs[i-1].split('"')[2].split(" ")[4] + " 8" : GenesisModel.value;
				selectorKompressorModel();
				
				GenesisMotor.value = data.comercialOfferElementIDs[i-1].split('"')[2].split(" ").length == 6 ? data.comercialOfferElementIDs[i-1].split('"')[2].split(" ")[5] : data.comercialOfferElementIDs[i-1].split('"')[2].split(" ")[6];
				CalculatorClose();
				
				document.getElementById("discountValue_"+i).value = discountType == "0" ? document.getElementById("price_"+i).value - data.productList[i-1].price : data.productList[i-1].DISCOUNT_RATE;
				document.getElementById("count_"+i).value = data.productList[i-1].count;
				CalculatePrice(i);
				
				await sleep(500);
				
				break;
			case "2":
				protocolSelector.getElementsByTagName("input")[0].value = data.comercialOfferElementIDs[i-1].split('"')[2].split(" ")[4];
				get_protocolData();
				CalculatorCloseButton();
				await sleep(500);
				
				break;
			case "3":
				elevatorSelector.getElementsByTagName("input")[0].value = data.comercialOfferElementIDs[i-1].split('"')[2].split(" ")[4];
				get_Elevators(null,data.productList[i-1]);
				CalculatorCloseButton();
				await sleep(1200);
				
				break;
			case "4":
				BunkerSelectorType.value = data.comercialOfferElementIDs[i-1].split('"')[2].split(" ")[3];
				changeBunkerType();
				
				BunkerShod.value = data.comercialOfferElementIDs[i-1].split('"')[2].split(" ")[4];
				BunkerSelectorLotok.value = data.comercialOfferElementIDs[i-1].split('"')[2].split(" ")[5];
				CalculatorClose();
				
				document.getElementById("discountValue_"+i).value = discountType == "0" ? document.getElementById("price_"+i).value - data.productList[i-1].price : data.productList[i-1].DISCOUNT_RATE;
				document.getElementById("count_"+i).value = data.productList[i-1].count;
				CalculatePrice(i);
				
				await sleep(500);
				
				break;
			case "5":
				AspirationSelectorType.value = data.comercialOfferElementIDs[i-1].split('"')[2].split(" ")[3] + " " + data.comercialOfferElementIDs[i-1].split('"')[2].split(" ")[4];
				changeAspType();
				
				SelectorPhotoseparation.value = data.comercialOfferElementIDs[i-1].split('"')[2].split(" ")[5];
				SelectorLotok.value = data.comercialOfferElementIDs[i-1].split('"')[2].split(" ")[5];
				CalculatorClose();
				
				document.getElementById("discountValue_"+i).value = discountType == "0" ? document.getElementById("price_"+i).value - data.productList[i-1].price : data.productList[i-1].DISCOUNT_RATE;
				document.getElementById("count_"+i).value = data.productList[i-1].count;
				CalculatePrice(i);
				
				await sleep(500);
				
				break;
			case "6":
				
				break;
			case "7":
				CalculatorClose();
			
				document.getElementById("componentName_"+i).textContent = data.productList[i-1].productName;
				document.getElementById("price_"+i).value = data.productList[i-1].price;
				document.getElementById("discountValue_"+i).value = discountType == "0" ? document.getElementById("price_"+i).value - data.productList[i-1].price : data.productList[i-1].DISCOUNT_RATE;
				document.getElementById("count_"+i).value = data.productList[i-1].count;
				CalculatePrice(i);
				
				await sleep(500);
				
				break;
			case "8":
				selectorCuber();
				cuberSize.value = data.comercialOfferElementIDs[i-1].split('"')[2].split(" ")[3];
				CalculatorClose();
			
				document.getElementById("discountValue_"+i).value = discountType == "0" ? document.getElementById("price_"+i).value - data.productList[i-1].price : data.productList[i-1].DISCOUNT_RATE;
				document.getElementById("count_"+i).value = data.productList[i-1].count;
				CalculatePrice(i);
				
				await sleep(500);
				
				break;
			case "9":
				selectorImport();
				ImportModel.value = data.comercialOfferElementIDs[i-1].split('"')[2].split(" ")[3];
				CalculatorClose();
			
				document.getElementById("discountValue_"+i).value = discountType == "0" ? document.getElementById("price_"+i).value - data.productList[i-1].price : data.productList[i-1].DISCOUNT_RATE;
				document.getElementById("count_"+i).value = data.productList[i-1].count;
				CalculatePrice(i);
				
				await sleep(500);
				
				break;
			case "10":
				CalculatorClose();

				document.getElementById("discountValue_"+i).value = discountType == "0" ? document.getElementById("price_"+i).value - data.productList[i-1].price : data.productList[i-1].DISCOUNT_RATE;
				document.getElementById("count_"+i).value = data.productList[i-1].count;
				CalculatePrice(i);
				
				await sleep(500);
				
				break;
			case "11":
				CalculatorClose();
				
				document.getElementById("price_"+i).value = data.productList[i-1].price;
				document.getElementById("discountValue_"+i).value = discountType == "0" ? document.getElementById("price_"+i).value - data.productList[i-1].price : data.productList[i-1].DISCOUNT_RATE;
				document.getElementById("count_"+i).value = data.productList[i-1].count;
				
				DeliveryInfo.children[1].textContent = data.deliveryElementInfo.deliveryAdress;
				
				CalculatePrice(i);
				
				await sleep(500);
				
				break;	
		}
		
	}
	CalculationSum();
	
	if(__bitrixSYS == "manager"){
		paymentSelector.value = data.deliveryElementInfo.tearsOfPayment;
		paymentSelector.dispatchEvent(new Event("change"));
	}
}

function prepareTermsOfDelivery(){
	var deliverySelector = document.getElementById("deliverySelector");
	var paymentSelector = document.getElementById("paymentSelector");	  
	var costIncludeSelector = document.getElementById("costIncludeSelector");	  
	var commissioningSelector = document.getElementById("commissioningSelector");	  
	var guaranteeSelector = document.getElementById("guaranteeSelector");
	
	var paymentTextArea = document.getElementById("payment");
	/*Список условий предоплаты*/
	for(var i = 0; i < BitrixPreloadData.tears_of_payment.length; i++){
		var option =  document.createElement("option");
		option.value = BitrixPreloadData.tears_of_payment[i].id;
		option.text = BitrixPreloadData.tears_of_payment[i].name;
		paymentSelector.add(option);
	}
	/*Функция переключения*/
	paymentTextArea.textContent = BitrixPreloadData.tears_of_payment[0].terms_contract;
	paymentSelector.addEventListener("change", function(){
		try{
			paymentTextArea.textContent = returnTermsOfDeliveryData(this.value, "tears_of_payment")["terms_contract"];
		}
		catch{
			paymentSelector.value = 422385;
			paymentTextArea.textContent = BitrixPreloadData.tears_of_payment[0].terms_contract;
		}
	});
}

function returnTermsOfDeliveryData(id, terms_data){
	for(var i = 0; i < BitrixPreloadData[terms_data].length; i++){
		if(BitrixPreloadData[terms_data][i].id == id){
			var data = BitrixPreloadData[terms_data][i];
			break;
		}
	}
	
	return data;
}


//Перезагрузка списка продуктов из битрикса
function reloadBitrixData(){
	//Отчистка списка продуктов.
	while (priceModelBlock.children.length > 1){
		priceRow_1.children[0].click()
	}
	
	var queryString = location.search;
	if(queryString.search("d_") != -1){
		NewCommercialOfferInfo(InfoDeal.id_deal);
	}
	else if(queryString.search("s_") != -1){
		NewDealerCommercialOfferInfo(InfoDeal.id_deal);
	}
}
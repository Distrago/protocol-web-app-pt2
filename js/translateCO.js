Product_T = [];
function changeLang(){
	languageP = language;
	language = mainButtonLang.value;
	headerTooltip.children[3].textContent = Translate.Total[0].pageMenu[language];
	headerTooltip.children[5].children[0].children[0].textContent = Translate.Total[0].aboutCompany[language];
	headerTooltip.children[5].children[1].children[0].textContent = Translate.Total[0].ref[language];
	headerTooltip.children[5].children[2].children[0].textContent = Translate.Total[0].photoSep[language];
	headerTooltip.children[5].children[3].children[0].textContent = Translate.Total[0].airReq[language];

	headerTooltip.children[7].children[0].children[0].textContent = Translate.Total[0].disc[language];
	headerTooltip.children[7].children[0].children[1].textContent = Translate.Total[0].discP[language];
	
	protocolSelector.children[0].children[0].children[0].placeholder = Translate.SpecifMenu[0].Protocol[language];
	elevatorSelector.children[0].children[0].children[0].placeholder = Translate.SpecifMenu[0].Elevator[language];

	deliverySelector.children[0].textContent = Translate.Total[0].deliverySelector[language] + ' 1';
	paymentSelector.children[0].textContent = Translate.Total[0].deliverySelector[language] + ' 1';
	commissioningSelector.children[0].textContent = Translate.Total[0].deliverySelector[language] + ' 1';
	commissioningSelector.children[1].textContent = Translate.Total[0].deliverySelector[language] + ' 2';
	costIncludeSelector.children[0].textContent = Translate.Total[0].deliverySelector[language] + ' 1';
	costIncludeSelector.children[1].textContent = Translate.Total[0].deliverySelector[language] + ' 2';
	guaranteeSelector.children[0].textContent = Translate.Total[0].deliverySelector[language] + ' 1';

	CalcCloseButton.textContent = Translate.Total[0].Close[language];
	AspAddButton.textContent = Translate.Total[0].Add[language];
	BunkerAddButton.textContent = Translate.Total[0].Add[language];
	CompAddButton.textContent = Translate.Total[0].Add[language];
	svoyAddButton.textContent = Translate.Total[0].Add[language];
	AppAddButton.textContent = Translate.Total[0].Add[language];
	elPickButton.textContent = Translate.Total[0].Pick_up[language];
	elAddButton.textContent = Translate.Total[0].Add[language];
	PrCreateButton.textContent = Translate.Total[0].Create[language];
	PrAddButton.textContent = Translate.Total[0].Add[language];
	genAddButton.textContent = Translate.Total[0].Add[language];
	cuberAddButton.textContent = Translate.Total[0].Add[language];
	ImpAddButton.textContent = Translate.Total[0].Add[language];

	calcElevator.children[0].textContent = Translate.Total[0].SmartSort[language];
	calcElevator.children[5].textContent = Translate.Total[0].MiniSort[language];

	switch(language){
		case"EN":			
			mainSelector.style.display = 'none';
			mainSelectorEN.style.display = 'flex';
			
			headerTooltip.children[6].children[0].style.display = 'none';
			headerTooltip.children[6].children[1].style.display = 'flex';		

			BunkerSelectorType.style.display = 'none';
			BunkerSelectorTypeEN.style.display = '';

			AspirationSelectorType.style.display = 'none';
			AspirationSelectorTypeEN.style.display = '';			
			break;
		case"RU":
			mainSelector.style.display = 'flex';
			mainSelectorEN.style.display = 'none';

			headerTooltip.children[6].children[0].style.display = 'flex';
			headerTooltip.children[6].children[1].style.display = 'none';

			BunkerSelectorType.style.display = '';
			BunkerSelectorTypeEN.style.display = 'none';

			AspirationSelectorType.style.display = '';
			AspirationSelectorTypeEN.style.display = 'none';
			break;
	}
	
	var a4 = importPage_Param_MainBlock.getElementsByClassName('a4');
	var button_main = document.getElementById('button_Lang_main');
	var button_specific = document.getElementById('button_Lang_specific');
	var button_Delivery = document.getElementById('button_Lang_Delivery');
	var botLogo = document.getElementsByClassName("bottomLogoText");
	var smartA4 = modelPage_Param_MainBlock.getElementsByClassName('a4');
	var LiftPages = CUBER_page_Param_MainBlock.getElementsByClassName('a4');
	var CompressorPages = CompressorPage_Param_MainBlock.getElementsByClassName('a4');
	var ElevatorPage = ElevatorPage_Param_MainBlock.getElementsByClassName('a4');
    
	for(var i = 1; i < a4.length; i++){
		var idRow = a4[i].id.split('_')[2];
		var button = document.getElementById('button_Lang_' + idRow);
		button.click()
	}
	for(var i = 1; i < smartA4.length; i++){
		var idRow = smartA4[i].id.split('_')[2];
		var button = document.getElementById('button_Lang_Smart_' + idRow);
		button.click()
	}
	for(var i = 0; i < botLogo.length; i++){
		var textBlock = document.getElementsByClassName('bottomLogoText')[i];
		textBlock.children[0].textContent = Translate.Total[0].editDate[language] + " " + string_end_data;
	}
	for(var i = 1; i < LiftPages.length; i++){
		var idRow = LiftPages[i].id.split('_')[2];
		setupLangLift(idRow);
	}
	for(var i = 1; i < CompressorPages.length; i++){
		var idRow = CompressorPages[i].id.split('_')[2];
		setupLangComp(idRow);
	}
	for(var i = 6; i < ElevatorPage.length; i++){
		var idRow = ElevatorPage[i].id;
		setupLangEL(idRow);
	}
	
	CalulatorSelectorLinked();
	
	button_main.click();
	button_specific.click();
	button_Delivery.click();
}

// установка языка листов
function setupLang(idRow){
	return function e(){
		var button = document.getElementById('button_Lang_' + idRow);
		var description = document.getElementById('importDescription_' + idRow);
		var titleText = document.getElementById('import_Seria_' + idRow).parentNode.parentNode.children[0];
		var importParametr = document.getElementById('importParametr_' + idRow);
		var importParamText = document.getElementById('importParamText_' + idRow);
		var Capacity = importParametr.children[0].children[1].children[0];
		var Accuracy = importParametr.children[1].children[1].children[0];
		var Voltage = importParametr.children[2].children[1].children[0];
		var Power = importParametr.children[3].children[1].children[0];
		var Weight = importParametr.children[4].children[1].children[0];
		button.textContent = language;
		switch(language){
			case'EN':				
				titleText.innerHTML = ENParam.title;
				importParamText.textContent = ENParam.importParamText;
				Capacity.textContent = ENParam.Capacity;
				Accuracy.textContent = ENParam.Accuracy;
				Voltage.textContent = ENParam.Voltage;
				Power.textContent = ENParam.Power;
				Weight.textContent = ENParam.Weight;
				
				for (var i = 0; i < ImportType.length; i++){
					if (ImportModel.value == ImportType[i].Model){
						description.textContent = ImportType[i].descriptionEn;			
					}
				}
				break;
			case'RU':
				titleText.innerHTML = RUParam.title;
				importParamText.textContent = RUParam.importParamText;
				Capacity.textContent = RUParam.Capacity;
				Accuracy.textContent = RUParam.Accuracy;
				Voltage.textContent = RUParam.Voltage;
				Power.textContent = RUParam.Power;
				Weight.textContent = RUParam.Weight;
				for (var i = 0; i < ImportType.length; i++){
					if (ImportModel.value == ImportType[i].Model){
						description.textContent = ImportType[i].description;			
					}
				}
				break;
		}		
	}
}

function setupLangSmart(idRow){
	return function e(){
		var button = document.getElementById('button_Lang_Smart_' + idRow);		
		var ModelSeria = document.getElementById('ModelSeria_' + idRow);
		var Main_title = ModelSeria.parentNode.parentNode.children[0];
		var ModelTray = document.getElementById('ModelTray_' + idRow);
		var Title_Param = document.getElementById('Title_Param_' + idRow);
		var Channel = document.getElementById('Channel_' + idRow).children[0];
		var Capaсity = document.getElementById('Capaсity_' + idRow).children[0];
		var Cleaning_factor = document.getElementById('Cleaning_factor_' + idRow).children[0];
		var CCD = document.getElementById('CCD_' + idRow).children[0];
		var Voltage = document.getElementById('Voltage_' + idRow).children[0];
		var Hz = document.getElementById('Hz_' + idRow).children[0];
		var kW = document.getElementById('kW_' + idRow).children[0];
		var Air_MPa = document.getElementById('Air_MPa_' + idRow).children[0];
		var air_class = document.getElementById('air_class_' + idRow);
		var air_class_title = air_class.parentNode.children[0];
		var air_hard = air_class.children[0].children[0];
		var air_wet = air_class.children[1].children[0];
		var air_oil = air_class.children[2].children[0];
		var air_flow = document.getElementById('air_flow_' + idRow).children[0];
		var Air_flowMax = document.getElementById('Air_flowMax_' + idRow).children[0];
		var modelBlock11 = document.getElementById('modelBlock11_' + idRow).children[1];
		var description = modelBlock11.children[0];
		var aspiration = document.getElementById('aspiration_' + idRow);
		var standart = aspiration.children[0].children[0];
		var additional = aspiration.children[1].children[0];
		var Weight = document.getElementById('Weight_' + idRow).children[0];
		var defence_class = document.getElementById('defence_class_' + idRow).children[0];
		var defence_lvl = document.getElementById('defence_lvl_' + idRow).children[0];
		var temp = document.getElementById('temp_' + idRow).children[0];
		var wet = document.getElementById('wet_' + idRow).children[0];
		var DBA = document.getElementById('DBA_' + idRow).children[0];
		var advDesc = document.getElementById('advDesc_' + idRow);
		var explore_time = document.getElementById('explore_time_' + idRow).children[0];
		
		var sizeHeight = document.getElementById('sizeHeight_' + idRow).children[1];
		var sizeDeep = document.getElementById('sizeDeep_' + idRow).children[1];
		var sizeWidth = document.getElementById('sizeWidth_' + idRow).children[1];

		var en_model = document.getElementById('en_model_' + idRow).textContent;
		var mainNumber = Number(en_model.split('_')[0]);
		var conf = Number(en_model.split('_')[1]);

		var ModelImage = document.getElementById('ModelImage_' + idRow);

		button.textContent = language;
		if(ModelImage.style.backgroundImage.split("/")[4].split('')[9] == "C" && language != "RU"){
			ModelSeria.textContent = 'SmartSort C';
		}
		else{
			ModelSeria.textContent = Translate.SmartSort[0].title_ModelSeria[language];
		}
		
		Main_title.innerHTML = Translate.SmartSort[0].title_main[language];
		switch(language){
			case'RU':
				ModelTray.textContent = Main[mainNumber].description + ' ' + Configuration[conf].Description;
				break;
			case'EN':
				ModelTray.textContent = Main[mainNumber].descriptionEN + ' ' + Configuration[conf].DescriptionEN;
				break;
		}
		
		Title_Param.textContent = Translate.SmartSort[0].paramTitle[language];
		Channel.textContent = Translate.SmartSort[0].Channel[language]; 
		Capaсity.textContent = Translate.SmartSort[0].Capaсity[language];
		Cleaning_factor.textContent = Translate.SmartSort[0].Cleaning_factor[language];
		CCD.textContent = Translate.SmartSort[0].CCD[language];
		Voltage.textContent = Translate.SmartSort[0].Voltage[language];
		Hz.textContent = Translate.SmartSort[0].Hz[language]; 
		kW.textContent = Translate.SmartSort[0].kW[language];
		Air_MPa.textContent = Translate.SmartSort[0].Air_MPa[language];
		air_class_title.textContent = Translate.SmartSort[0].air_title[language];
		air_hard.textContent = Translate.SmartSort[0].air_hard[language];
		air_wet.textContent = Translate.SmartSort[0].air_wet[language];
		air_oil.textContent = Translate.SmartSort[0].air_oil[language];
		air_flow.textContent = Translate.SmartSort[0].air_flow[language];
		Air_flowMax.textContent = Translate.SmartSort[0].Air_flowMax[language];
		description.textContent = Translate.SmartSort[0].modelBlock11_description[language];
		standart.textContent = Translate.SmartSort[0].modelBlock11_standart[language];
		additional.textContent = Translate.SmartSort[0].modelBlock11_additional[language];
		Weight.textContent = Translate.SmartSort[0].Weight[language];
		defence_class.textContent = Translate.SmartSort[0].defence_class[language];
		defence_lvl.textContent = Translate.SmartSort[0].defence_lvl[language];
		temp.textContent = Translate.SmartSort[0].temp[language];
		wet.textContent = Translate.SmartSort[0].wet[language];
		DBA.textContent = Translate.SmartSort[0].DBA[language];
		advDesc.textContent = Translate.SmartSort[0].exeption[language];
		sizeHeight.textContent = Translate.SmartSort[0].size[language];
		sizeDeep.textContent = Translate.SmartSort[0].size[language];
		sizeWidth.textContent = Translate.SmartSort[0].size[language];
		if(mainNumber > 11){
			explore_time.textContent = Translate.SmartSort[0].lifetime[language];
		}			
	}
}



function setupLangMain(){
	// var button = document.getElementById('button_Lang_main');
	var csortDescription = document.getElementById("csortDescription");
	var commercialOfferTitle = document.getElementById("commercialOfferTitle");
	var managerInfoBlock = document.getElementById("managerInfoBlock");
	var clientName = document.getElementById("clientName");
	var introduction = document.getElementById('introduction');
	csortDescription.innerHTML = Translate.FirstPage[0].csortDescription[language];
	commercialOfferTitle.innerHTML = Translate.FirstPage[0].commercialOfferTitle[language];
	managerInfoBlock.children[1].children[1].textContent = Translate.FirstPage[0].vacancy[language];
	managerInfoBlock.children[1].children[2].textContent = Translate.FirstPage[0].csort[language];
	clientName.textContent = Translate.FirstPage[0].clientName[language];
	introduction.textContent = Translate.FirstPage[0].introduction[language];
}
function setupLangSpecific(){
	// var button = document.getElementById('button_Lang_specific');
	var SpecificationPageName = document.getElementById("SpecificationPageName");
	var Item = document.getElementById("Item");
	var pcs = document.getElementById("pcs");
	var Price = document.getElementById("priceValueTitle");
	var Sum = document.getElementById('priceSumTitle');
	var Discount = document.getElementById('discountValueTitle');
	var Discounted = document.getElementById('discountSumTitle');
	var incl = document.getElementById('ndsTitle');
	var Total = document.getElementById('Total');
	var priceModelBlock = document.getElementById('priceModelBlock');	
	
	var selectDiscount = headerTooltip.children[7].children[0].value;

	SpecificationPageName.innerHTML = Translate.Specification[0].Specification[language];
	Item.innerHTML = Translate.Specification[0].Item[language];
	pcs.textContent = Translate.Specification[0].pcs[language];
	Price.textContent = Translate.Specification[0].Price[language];
	Sum.textContent = Translate.Specification[0].Sum[language];
	Discount.textContent = selectDiscount = headerTooltip.children[7].children[0].value == "0" ? Translate.Specification[0].Discount[language] : Translate.Specification[0].DiscountAlt[language];
	Discounted.innerHTML = Translate.Specification[0].Discounted[language];
	incl.innerHTML = Translate.Specification[0].incl[language];
	Total.textContent = Translate.Specification[0].Total[language];
	specAddBut.textContent = Translate.Total[0].Add[language];
	


	for(var i = 1; i< priceModelBlock.children.length; i++){
		var name = document.getElementById('componentName_' + i);
		var typeID = ComercialOfferElementIDs[i-1].text.split('"')[2].split(" ")[2];
		switch(typeID){
			case "0":
				var ModelNumber = ComercialOfferElementIDs[i-1].text.split('"')[2].split(" ")[3];
				for(var k = 0; k< Main.length; k++){
					var elevatorName = Model[ModelNumber].Model;
					var model = Main[k].Model;
					if(elevatorName == model){						
						elevatorName = model;
		
						switch(language){
							case"RU":
								model = Main[k].ModelRU;
								break;
							case"EN":
								model = Main[k].Model;
								break;
							
						}			
						name.textContent = model + " " + ComercialOfferElementIDs[i-1].text.split('"')[2].split(" ")[5]+ " "+ ComercialOfferElementIDs[i-1].text.split('"')[2].split(" ")[4];
						break;
					}
					
				}
				break;
			case "1":
				for(var k = 0; k< Kompressor.length; k++){
					var KompName = language == "RU" ? Kompressor[k].fullNameEN  : Kompressor[k].fullName;
					if(name.textContent == KompName){
						name.textContent = language == "RU" ? Kompressor[k].fullName : Kompressor[k].fullNameEN;
					}
				}

				break;
			case "2":
				for(var k = 0; k< Bunker.length; k++){
					var bunkerName = language == "RU" ? Bunker[k].nameEN  : Bunker[k].name;
					if(name.textContent == bunkerName){
						name.textContent = language == "RU" ? Bunker[k].name : Bunker[k].nameEN;
					}
				}
				break;
			case "3":
				// for(var k = 0; k< Aspiration.length; k++){
				// 	var AspirationName = language == "RU" ? Aspiration[k].nameEN  : Aspiration[k].name;
				// 	if(name.textContent == AspirationName){
				// 		name.textContent = language == "RU" ? Aspiration[k].name : Aspiration[k].nameEN;
				// 	}
				// }
				break;
            case "5":
				for(var k = 0; k< Aspiration.length; k++){
					var AspirationName = language == "RU" ? Aspiration[k].nameEN  : Aspiration[k].name;
					if(name.textContent == AspirationName){
						name.textContent = language == "RU" ? Aspiration[k].name : Aspiration[k].nameEN;
					}
				}
				break;
			case "8":
				name.textContent = language == "RU" ? 'Лифтовой склад ' +' '+ ComercialOfferElementIDs[i-1].text.split(' ')[3] : 'Lift warehouse' +' '+ ComercialOfferElementIDs[i-1].text.split(' ')[3];
				break;
			case "9":
				var model = ComercialOfferElementIDs[i-1].text.split(" ")[3];
				for(var k = 0; k< ImportType.length; k++){
					if(model == ImportType[k].Model){
						name.textContent = language == "RU" ? 'Импортный сепаратор ' + model : 'imported separator ' + model;
					}
				}
				break;
			case "10":
				name.textContent = Translate.SpecifMenu[0].Commissioning[language];
				break;
			case "11":
				name.textContent = Translate.SpecifMenu[0].Delivery[language];
				break;
		}
			
		
	}
	
}
function setupLangDelivery(){
	// var button = document.getElementById('button_Lang_Delivery');
	var DeliveryTerms = document.getElementById("DELIVERY_TERMS");
	var delivery_name = document.getElementById("delivery_name");
	var delivery = document.getElementById("delivery");
	var payment_name = document.getElementById("payment_name");
	var payment = document.getElementById('payment');
	var commissioning_name = document.getElementById('commissioning_name');
	var commissioning = document.getElementById('commissioning');
	var priceInclude_name = document.getElementById('priceInclude_name');
	var priceInclude = document.getElementById('priceInclude');
	var warranty_name = document.getElementById('warranty_name');
	var warranty = document.getElementById('warranty');

	DeliveryTerms.textContent = Translate.Delivery[0].DeliveryTerms[language];
	delivery_name.textContent = Translate.Delivery[0].delivery_name[language];
	delivery.textContent = Translate.Delivery[0].delivery[language];
	payment_name.textContent = Translate.Delivery[0].payment_name[language];
	payment.textContent = Translate.Delivery[0].payment[language];
	commissioning_name.textContent = Translate.Delivery[0].commissioning_name[language];
	commissioning.textContent = commissioningSelector.value == '0' ? Translate.Delivery[0].commissioning[language] : Translate.Delivery[0].commissioning2[language];
	priceInclude_name.textContent = Translate.Delivery[0].priceInclude_name[language];
	priceInclude.textContent = costIncludeSelector.value == '0' ? Translate.Delivery[0].priceInclude[language] : Translate.Delivery[0].priceInclude2[language];
	priceInclude.textContent = Translate.Delivery[0].priceInclude[language];
	warranty_name.textContent = Translate.Delivery[0].warranty_name[language];
	warranty.textContent = Translate.Delivery[0].warranty[language];
}


function CalulatorSelectorLinked(){
	switch(language){
		case 'EN':
			mainSelector.value = mainSelectorEN.value;
			changeMachineType();
			break;
		case 'RU':
			mainSelectorEN.value = mainSelector.value;
			changeMachineType();
			break;
	}
}

function setupLangLift(idP){
	var page =  document.getElementById('CUBER_page_' + idP);

	var maintitleLift =  document.getElementById("maintitleLift_" + idP);
	var Lift_Seria =  document.getElementById("Lift_Seria_" + idP);
	var advantageDescriptionLift =  document.getElementById("advantageDescriptionLift_" + idP);

	var MTC_Lift =  document.getElementById("MTC_Lift_" + idP);
	var LiftSpeed =  document.getElementById("LiftSpeed_" + idP);
	var LiftVoltage =  document.getElementById("LiftVoltage_" + idP);
	var LiftPhase =  document.getElementById("LiftPhase_" + idP);
	var LiftHz =  document.getElementById("LiftHz_" + idP);
	var LiftkW =  document.getElementById("LiftkW_" + idP);
	var Liftdefence_class =  document.getElementById("Liftdefence_class_" + idP);
	var Liftdefence_lvl =  document.getElementById("Liftdefence_lvl_" + idP);
	var Lifttemp =  document.getElementById("Lifttemp_" + idP);
	var Liftwet =  document.getElementById("Liftwet_" + idP);
	var LiftLevelMax=  document.getElementById("LiftLevelMax_" + idP);
	var LiftDBA=  document.getElementById("LiftDBA_" + idP);
	var LiftmaxMass =  document.getElementById("LiftmaxMass_" + idP);
	var LiftmaxUP = document.getElementById("LiftmaxUP_" + idP);
	var Liftlifetime =  document.getElementById("Liftlifetime_" + idP);
	var LiftShelfLife=  document.getElementById("LiftShelfLife_" + idP);
	var LiftShelf =  document.getElementById("LiftShelf_" + idP);	

	var LiftSize_height =  document.getElementById( "LiftSize_height_" + idP);	
	var LiftSize_deep =  document.getElementById("LiftSize_deep_" + idP);	
	var LiftSize_width =  document.getElementById("LiftSize_width_" + idP);
	
	maintitleLift.innerHTML = Translate.Lift[0].title_main[language];
	Lift_Seria.textContent = Translate.Lift[0].title_ModelSeria[language];
	advantageDescriptionLift.textContent = Translate.Lift[0].description[language];

	MTC_Lift.textContent = Translate.Lift[0].paramTitle[language];
	LiftSpeed.children[0].textContent = Translate.Lift[0].Speed[language];
	LiftVoltage.children[0].textContent = Translate.Lift[0].Voltage[language];
	LiftPhase.children[0].textContent = Translate.Lift[0].Phase[language];
	LiftHz.children[0].textContent = Translate.Lift[0].Hz[language];
	LiftkW.children[0].textContent = Translate.Lift[0].kW[language];
	Liftdefence_class.children[0].textContent = Translate.Lift[0].defence_class[language];
	Liftdefence_lvl.children[0].textContent = Translate.Lift[0].defence_lvl[language];
	Lifttemp.children[0].textContent = Translate.Lift[0].temp[language];
	Liftwet.children[0].textContent = Translate.Lift[0].wet[language];
	LiftLevelMax.children[0].textContent = Translate.Lift[0].LevelMax[language];
	LiftDBA.children[0].textContent = Translate.Lift[0].DBA[language];
	LiftmaxMass.children[0].textContent = Translate.Lift[0].maxMass[language];
	LiftmaxUP.children[0].textContent = Translate.Lift[0].maxUP[language];
	Liftlifetime.children[0].textContent = Translate.Lift[0].lifetime[language];
	LiftShelfLife.children[0].textContent = Translate.Lift[0].ShelfLife[language];
	LiftShelf.children[0].textContent = Translate.Lift[0].Shelf[language];	
}
function switchActual(button_Lang){
	switch(language){
		case'RU':
			if(button_Lang.textContent != 'RU'){
				button_Lang.click();
			}
			break;
		case'EN':
			if(button_Lang.textContent != 'EN'){
				button_Lang.click();
			}
			break;
	}
}

//Блок Доставки
function prepareDeliveryBlock(){
	var DeliveryInfoInput = DeliveryInfo.children[1];
	var mainSelect;
	if(language == 'RU'){
		mainSelect = document.getElementById("mainSelector");
	}
	else{
		mainSelect = document.getElementById("mainSelectorEN");
	}
	DeliveryBlock.style.display = DeliveryBlock.style.display == "none" ? "" : "none";
	mainSelect.options['10'].style.display = mainSelect.options['10'].style.display == "" ? "none" : "";
	DeliveryInfoInput.textContent = "";
	
	setTimeout( function(){
		mainSelect.selectedIndex = "0";
	}, 1500);
}

function createDataBase(){
    // get_separation_model();  
    // get_separator_machine();
    // get_separator_configuration();
    // get_separation_KompressorType();
    // get_aspiration();
  
    AllMass.Main = Main;
    AllMass.Model = Model;
    AllMass.Configuration = Configuration;
    AllMass.KompressorType = KompressorType;
    AllMass.Kompressor = Kompressor;
    AllMass.Price = Price;
    AllMass.Product_K = Product_K;
    AllMass.Elevator = Elevator;
    AllMass.Conditions = Conditions;

    AllMass.Aspiration = Aspiration;
    AllMass.Bunker = Bunker;
    AllMass.Complect = Complect;

    AllMass.LiftType = LiftType;

    AllMass.ImportType = ImportType;

    AllMass.ENParam = ENParam;
    AllMass.RUParam = RUParam;
	bathDataBase();
}

function bathDataBase(){
  $.ajax({
      url: '/commercial_offer_main/save_mainCO_data', 
      type: 'post',
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify(AllMass),
      success: function(data){
        console.log(data);
      },
      error: function (error) {
        
      }
    })
}

function SetDataBase(data){
	
    Main = data.Main;
    Model = data.Model;
    Configuration = data.Configuration;
    KompressorType = data.KompressorType;
    Kompressor = data.Kompressor;
    Price = data.Price;
    Product_K = data.Product_K;
    Elevator = data.Elevator;
    Conditions = data.Conditions;

    Aspiration = data.Aspiration;
    Bunker = data.Bunker;
    Complect = data.Complect;

    LiftType = data.LiftType;

    ImportType = data.ImportType;

	ChangeElevatorType();
	setupDelivery();
	CalcWindowSelectorLoad();
}

function setupLangComp(idP){
	var page =  document.getElementById('CompressorPage_Param_' + idP);

	var GENESIS_Title =  document.getElementById("GENESIS_Title_" + idP);
	var infoTitle =  document.getElementById("infoTitle_" + idP);
	var compressorDescription =  document.getElementById("compressorDescription_" + idP);
	var description_seria =  document.getElementById("description_seria_" + idP);

	var settingsOption =  document.getElementById("settingsOption_" + idP);
	var op1 =  settingsOption.children[0].children[1];
	var op2 =  settingsOption.children[1].children[1];
	var op3 =  settingsOption.children[2].children[1];
	var op4 =  settingsOption.children[3].children[1];
	var op5 =  settingsOption.children[4].children[1];
	var op6 =  settingsOption.children[5].children[1];		

	var compressorVolume =  document.getElementById("compressorVolume_" + idP);
	var compressorCapacity =  document.getElementById("compressorCapacity_" + idP);
	var compressorPressure =  document.getElementById("compressorPressure_" + idP);
	var compressorEnginePower =  document.getElementById("compressorEnginePower_" + idP);
	var compressorVoltage =  document.getElementById("compressorVoltage_" + idP);
	var compressorHz =  document.getElementById("compressorHz_" + idP);
	var compressorPhase =  document.getElementById("compressorPhase_" + idP);
	var compressorMass =  document.getElementById("compressorMass_" + idP);
	var desiccant=  document.getElementById("desiccant_" + idP);
	var filter=  document.getElementById("filter_" + idP);
	var ressiver =  document.getElementById("ressiver_" + idP);	

	for(var i = 0; i< Translate.Compressor.length; i++){
		if(GENESIS_Title.textContent.split(' ')[2] == Translate.Compressor[i].seria || GENESIS_Title.textContent.split(' ')[2] == 'A39' && i == 2 || GENESIS_Title.textContent.split(' ')[0] == Translate.Compressor[i].seria){
			switch(language){
				case"EN":
					infoTitle.textContent = Translate.Compressor[i].infoTitleEN;
					compressorDescription.textContent = Translate.Compressor[i].descriptionEN;
					description_seria.textContent = Translate.Compressor[i].description_seriaEN;
					op1.textContent = Translate.Compressor[i].optionEN.split(';')[0];
					op2.textContent = Translate.Compressor[i].optionEN.split(';')[1];
					op3.textContent = Translate.Compressor[i].optionEN.split(';')[2];
					op4.textContent = Translate.Compressor[i].optionEN.split(';')[3];
					op5.textContent = Translate.Compressor[i].optionEN.split(';')[4];
					op6.textContent = Translate.Compressor[i].optionEN.split(';')[5];
					break;
				case"RU":
					infoTitle.textContent = Translate.Compressor[i].infoTitle;
					compressorDescription.textContent = Translate.Compressor[i].description;
					description_seria.textContent = Translate.Compressor[i].description_seria;
					op1.textContent = Translate.Compressor[i].option.split(';')[0];
					op2.textContent = Translate.Compressor[i].option.split(';')[1];
					op3.textContent = Translate.Compressor[i].option.split(';')[2];
					op4.textContent = Translate.Compressor[i].option.split(';')[3];
					op5.textContent = Translate.Compressor[i].option.split(';')[4];
					op6.textContent = Translate.Compressor[i].option.split(';')[5];
					break;
			}
		
		}
	}
	compressorVolume.children[0].textContent = Translate.CompressorP[0].Volume[language];
	compressorCapacity.children[0].textContent = Translate.CompressorP[0].Capacity[language];
	compressorPressure.children[0].textContent = Translate.CompressorP[0].Pressure[language];
	compressorEnginePower.children[0].textContent = Translate.CompressorP[0].EnginePower[language];
	compressorVoltage.children[0].textContent = Translate.CompressorP[0].Voltage[language];
	compressorHz.children[0].textContent = Translate.CompressorP[0].Hz[language];
	compressorPhase.children[0].textContent = Translate.CompressorP[0].Phase[language];
	compressorMass.children[0].textContent = Translate.CompressorP[0].Mass[language];

	switch(language){
		case"EN":
			desiccant.children[0].textContent = 'Desiccant';
			filter.children[0].textContent = 'Filter';
			ressiver.children[0].textContent = 'Ressiver';
			desiccant.children[1].textContent = GENESIS_Title.textContent.split(' ')[2] == 'FORMULA' ? 'No' : 'Yes';
			filter.children[1].textContent = 'Yes';
			ressiver.children[1].textContent = 'Yes';
			for(var i = 0; i < Kompressor.length; i++){
				if(GENESIS_Title.textContent == Kompressor[i].fullName){
					GENESIS_Title.textContent = Kompressor[i].fullNameEN;
				}
			}
			break;
		case"RU":
			desiccant.children[0].textContent = 'Осушитель';
			filter.children[0].textContent = 'Фильтра';
			ressiver.children[0].textContent = 'Ресивер';
			desiccant.children[1].textContent = GENESIS_Title.textContent.split(' ')[2] == 'FORMULA' ? 'Нет' : 'Да';
			filter.children[1].textContent = 'Да';
			ressiver.children[1].textContent = 'Да';
			for(var i = 0; i < Kompressor.length; i++){
				if(GENESIS_Title.textContent == Kompressor[i].fullNameEN){
					GENESIS_Title.textContent = Kompressor[i].fullName;
				}
			}
			break;
	}
}


function setupLangEL(idP){
	var page =  document.getElementById(idP);
	var modelType = page.id.split('_')[0];
	var pageType = page.id.split('_')[1];
	var idR = page.id.split('_')[2];

    switch(pageType){
        case"Technical":
            var ModelName =  document.getElementById(modelType + "_ModelName_" + idR);
            var Technic =  document.getElementById(modelType + "_Technic_" + idR);
            var Capacity =  document.getElementById(modelType + "_Capacity_" + idR);
            var CapacityProduct =  document.getElementById(modelType + "_CapacityProduct_" + idR);
            var Material =  document.getElementById(modelType + "_Material_" + idR);
            var Motor =  document.getElementById(modelType + "_Motor_" + idR);//у CSZE в нан дисплей
            var Reductor =  document.getElementById(modelType + "_Reductor_" + idR);
            var Complect =  document.getElementById(modelType + "_Complect_" + idR);	
            var Converter =  document.getElementById(modelType + "_Converter_" + idR);
            var ControlBox =  document.getElementById(modelType + "_ControlBox_" + idR);
            var StreetFulfillment =  document.getElementById(modelType + "_StreetFulfillment_" + idR);
            var Metall =  document.getElementById(modelType + "_Metall_" + idR);
           
			switch(languageP){
				case"RU":
					var product = CapacityProduct.children[0].textContent.split(" ")[1];
					break;
				case"EN":
					var product = CapacityProduct.children[0].textContent.split(" ")[3];
					break;
			}	

            // ModelName.textContent = Translate.Elevators[0].[language].split("_")[0] + Translate.Elevators[0].[language].split("_")[1];
			Technic.children[0].children[0].children[1].textContent = Translate.Elevators[0].Text1[language];
			Technic.children[0].children[1].children[0].textContent = Translate.Elevators[0].Text2[language];
			// Technic.children[0].children[1].children[0].textContent += функция передаем модель и пред язык определяем какая модель и язык и ставим соотв текст
			// Technic.children[0].children[1].children[0].textContent += 
            Technic.children[2].children[0].textContent = Translate.Elevators[0].title_main[language];
            Capacity.children[0].textContent = Translate.Elevators[0].capacity[language];
            CapacityProduct.children[0].textContent = Translate.Elevators[0].capacityP[language].split("_")[0] + " " + setLangProd(product) + " " + Translate.Elevators[0].capacityP[language].split("_")[1];
            Material.children[0].textContent = Translate.Elevators[0].Material[language];
            Material.children[1].textContent = setCurrentValue(Material.children[1]);
            Motor.children[0].textContent = Translate.Elevators[0].motor[language];
            Reductor.children[0].textContent = Translate.Elevators[0].Reducer[language];
            Complect.textContent = Translate.Elevators[0].EQUIPMENT[language];
            Converter.children[0].textContent = Translate.Elevators[0].Converter[language];            
            Converter.children[1].textContent = setCurrentValue(Converter.children[1]);
            ControlBox.children[0].textContent = Translate.Elevators[0].ControlBox[language];
            ControlBox.children[1].textContent = setCurrentValue(ControlBox.children[1]);
            StreetFulfillment.children[0].textContent = Translate.Elevators[0].StreetFulfillment[language];
            StreetFulfillment.children[1].textContent = setCurrentValue(StreetFulfillment.children[1]);
            Metall.textContent =  Translate.Elevators[0].Metall[language];

            switch(modelType){
                case 'CSZE':
                    var Height =  document.getElementById(modelType + "_Height_" + idR);
                    var LengthTotal =  document.getElementById(modelType + "_LengthTotal_" + idR);
                    var LengthTop =  document.getElementById(modelType + "_LengthTop_" + idR);
                    var LengthBottom =  document.getElementById(modelType + "_LengthBottom_" + idR);
                    var ChainSpeed =  document.getElementById(modelType + "_ChainSpeed_" + idR);
                    var BucketVolume =  document.getElementById(modelType + "_BucketVolume_" + idR);
                    var Diametr =  document.getElementById(modelType + "_Diametr_" + idR);
                    var Turn =  document.getElementById(modelType + "_Turn_" + idR);
                    var Power =  document.getElementById(modelType + "_Power_" + idR);
                    var Window =  document.getElementById(modelType + "_Window_" + idR);
                    var Hatches =  document.getElementById(modelType + "_Hatches_" + idR);
                    var LoadUnload =  document.getElementById(modelType + "_LoadUnload_" + idR);
                    var Sensor =  document.getElementById(modelType + "_Sensor_" + idR);
                    var ChainSensor =  document.getElementById(modelType + "_ChainSensor_" + idR);
                    var AddLoad =  document.getElementById(modelType + "_AddLoad_" + idR);
                    var AddUnload =  document.getElementById(modelType + "_AddUnload_" + idR);
                    var MetallMain =  document.getElementById(modelType + "_MetallMain_" + idR);
                    var MetallOther =  document.getElementById(modelType + "_MetallOther_" + idR);
                    var BucketMaterial =  document.getElementById(modelType + "_BucketMaterial_" + idR);
                    var Backward =  document.getElementById(modelType + "_Backward_" + idR);

                    Height.children[0].textContent =  Translate.Elevators[0].ElevatorH[language];
                    LengthTotal.children[0].textContent =  Translate.Elevators[0].TotalLEl[language];
                    LengthTop.children[0].textContent =  Translate.Elevators[0].UpperL[language];
                    LengthBottom.children[0].textContent =  Translate.Elevators[0].LowerL[language];
                    ChainSpeed.children[0].textContent =  Translate.Elevators[0].ChainS[language];
                    BucketVolume.children[0].textContent =  Translate.Elevators[0].BucketV[language];
                    Diametr.children[0].textContent =  Translate.Elevators[0].SizePipes[language];
                    Turn.children[0].textContent =  Translate.Elevators[0].DrumStep[language];
                    Power.children[0].textContent =  Translate.Elevators[0].RatedPower[language];
                    Window.children[0].textContent =  Translate.Elevators[0].window[language];
                    Window.children[1].textContent =  setCurrentValue(Window.children[1]);
                    Hatches.children[0].textContent =  Translate.Elevators[0].Hatches[language];
                    Hatches.children[1].textContent = setCurrentValue(Hatches.children[1]);
                    LoadUnload.children[0].textContent =  Translate.Elevators[0].LoadUnload[language];
                    LoadUnload.children[1].textContent = setCurrentValue(LoadUnload.children[1]);
                    Sensor.children[0].textContent =  Translate.Elevators[0].Sensor[language];
                    Sensor.children[1].textContent = setCurrentValue(Sensor.children[1]);
                    ChainSensor.children[0].textContent =  Translate.Elevators[0].ChainSensor[language];
                    ChainSensor.children[1].textContent = setCurrentValue(ChainSensor.children[1]);
                    AddLoad.children[0].textContent =  Translate.Elevators[0].AddLoad[language];
                    AddUnload.children[0].textContent =  Translate.Elevators[0].AddUnload[language]; //!
                    AddUnload.children[1].textContent =  AddUnload.children[1].textContent.split(" ")[0] + ' ' + Translate.Elevators[0].AddUnloadE[language]; //!
                    MetallMain.children[0].textContent =  Translate.Elevators[0].MetallOther[language];
                    MetallOther.children[0].textContent =  Translate.Elevators[0].NonBearing[language];
                    BucketMaterial.children[0].textContent =  Translate.Elevators[0].BucketMaterial[language];
                    BucketMaterial.children[1].textContent =  setCurrentValue(BucketMaterial.children[1]);
                    Backward.children[0].textContent =  Translate.Elevators[0].Backward[language];
                    Backward.children[1].textContent = setCurrentValue(Backward.children[1]);

                    break;
                case 'CSE':
                    var TransportLength =  document.getElementById(modelType + "_TransportLength_" + idR);
                    var Height =  document.getElementById(modelType + "_Height_" + idR);
                    var BeltSpeed =  document.getElementById(modelType + "_BeltSpeed_" + idR);
                    var BucketStep =  document.getElementById(modelType + "_BucketStep_" + idR);
                    var DrumStep =  document.getElementById(modelType + "_DrumStep_" + idR);
                    var DrumDesign =  document.getElementById(modelType + "_DrumDesign_" + idR);
                    var Explosion =  document.getElementById(modelType + "_Explosion_" + idR);
                    var SuctionConnect =  document.getElementById(modelType + "_SuctionConnect_" + idR);
                    var WindowB =  document.getElementById(modelType + "_WindowB_" + idR);
                    var SpeedSensor =  document.getElementById(modelType + "_SpeedSensor_" + idR);
                    var TapeSensor =  document.getElementById(modelType + "_TapeSensor_" + idR);
                    var SupportSensorTop =  document.getElementById(modelType + "_SupportSensorTop_" + idR);
                    var SupportSensorBot =  document.getElementById(modelType + "_SupportSensorBot_" + idR);
                    var DrillInBelt =  document.getElementById(modelType + "_DrillInBelt_" + idR);
                    var MetallSection =  document.getElementById(modelType + "_MetallSection_" + idR);
                    var MetallOtherS =  document.getElementById(modelType + "_MetallOther_" + idR);
                    var BucketMaterial =  document.getElementById(modelType + "_BucketMaterial_" + idR);
                    var Backward =  document.getElementById(modelType + "_Backward_" + idR);

                    TransportLength.children[0].textContent =  Translate.Elevators[0].TransportLength[language];
                    Height.children[0].textContent =  Translate.Elevators[0].Height[language];
                    BeltSpeed.children[0].textContent =  Translate.Elevators[0].BeltSpeed[language];
                    BucketStep.children[0].textContent =  Translate.Elevators[0].BucketStep[language];
                    DrumStep.children[0].textContent =  Translate.Elevators[0].DrumStep[language];
                    DrumDesign.children[0].textContent =  Translate.Elevators[0].DrumDesign[language];
                    DrumDesign.children[1].textContent = Translate.Elevators[0].Squirrel[language];
                    Explosion.children[0].textContent =  Translate.Elevators[0].Explosion[language];
                    SuctionConnect.children[0].textContent =  Translate.Elevators[0].SuctionConnect[language];
                    WindowB.children[0].textContent =  Translate.Elevators[0].windowB[language];
                    SpeedSensor.children[0].textContent =  Translate.Elevators[0].SpeedSensor[language];
                    SpeedSensor.children[1].textContent = setCurrentValue(SpeedSensor.children[1]);
                    TapeSensor.children[0].textContent =  Translate.Elevators[0].TapeSensor[language];
                    TapeSensor.children[1].textContent = setCurrentValue(TapeSensor.children[1]);
                    SupportSensorTop.children[0].textContent =  Translate.Elevators[0].SupportSensorTop[language];
                    SupportSensorTop.children[1].textContent = setCurrentValue(SupportSensorTop.children[1]);
                    SupportSensorBot.children[0].textContent =  Translate.Elevators[0].SupportSensorBot[language];
                    SupportSensorBot.children[1].textContent = setCurrentValue(SupportSensorBot.children[1]);
                    DrillInBelt.children[0].textContent =  Translate.Elevators[0].DrillInBelt[language];
                    DrillInBelt.children[1].textContent = setCurrentValue(DrillInBelt.children[1]);
                    MetallSection.children[0].textContent =  Translate.Elevators[0].Sections[language];
                    MetallOtherS.children[0].textContent =  Translate.Elevators[0].Shoe[language];
                    BucketMaterial.children[0].textContent =  Translate.Elevators[0].BucketMaterial[language];
                    BucketMaterial.children[1].textContent =  setCurrentValue(BucketMaterial.children[1]);
                    Backward.children[0].textContent =  Translate.Elevators[0].Backward[language];
                    Backward.children[1].textContent = setCurrentValue(Backward.children[1]);
                    break;
                case 'CSCC':
                    var TransportLength =  document.getElementById(modelType + "_TransportLength_" + idR);
                    var length =  document.getElementById(modelType + "_length_" + idR);
                    var BeltSpeed =  document.getElementById(modelType + "_BeltSpeed_" + idR);
                    var ScraperStep =  document.getElementById(modelType + "_ScraperStep_" + idR);
                    var DrumStep =  document.getElementById(modelType + "_DrumStep_" + idR);
                    var ScraperMaterial =  document.getElementById(modelType + "_ScraperMaterial_" + idR);
                    var SuctionConnect =  document.getElementById(modelType + "_SuctionConnect_" + idR);//не то же что у CSE
                    var Window =  document.getElementById(modelType + "_Window_" + idR);//не то же что у CSE
                    var SpeedSensor =  document.getElementById(modelType + "_SpeedSensor_" + idR);
                    var SupportSensorTop =  document.getElementById(modelType + "_SupportSensorTop_" + idR);
                    var Backload =  document.getElementById(modelType + "_Backload_" + idR);
                    var DoubleSideBackload =  document.getElementById(modelType + "_DoubleSideBackload_" + idR);
                    var Vertical =  document.getElementById(modelType + "_Vertical_" + idR);
                    var bodyT =  document.getElementById(modelType + "_bodyT_" + idR);
                    var capT =  document.getElementById(modelType + "_capT_" + idR);
                    var liningT =  document.getElementById(modelType + "_liningT_" + idR);

                    TransportLength.children[0].textContent =  Translate.Elevators[0].TransportLength[language];
                    length.children[0].textContent =  Translate.Elevators[0].TotalL[language];
                    BeltSpeed.children[0].textContent =  Translate.Elevators[0].ChainS[language];
                    ScraperStep.children[0].textContent =  Translate.Elevators[0].ScraperP[language];
                    DrumStep.children[0].textContent =  Translate.Elevators[0].DrumStep[language];
                    ScraperMaterial.children[0].textContent =  Translate.Elevators[0].ScraperM[language];
                    ScraperMaterial.children[1].textContent =  setCurrentValue(ScraperMaterial.children[1]);
                    SuctionConnect.children[0].textContent =  Translate.Elevators[0].SuctionConnectB[language];
                    Window.children[0].textContent =  Translate.Elevators[0].ViewingWin[language];
                    Window.children[1].textContent = setCurrentValue(Window.children[1]);
                    SpeedSensor.children[0].textContent =  Translate.Elevators[0].SpeedSensor[language];
                    SpeedSensor.children[1].textContent =  setCurrentValue(SpeedSensor.children[1]);
                    SupportSensorTop.children[0].textContent =  Translate.Elevators[0].SupportSensorTop[language];
                    SupportSensorTop.children[1].textContent = setCurrentValue(SupportSensorTop.children[1]);
                    Backload.children[0].textContent =  Translate.Elevators[0].Backload[language];
                    Backload.children[1].textContent = setCurrentValue(Backload.children[1]);
                    DoubleSideBackload.children[0].textContent =  Translate.Elevators[0].DoubleSideBackload[language];
                    DoubleSideBackload.children[1].textContent = setCurrentValue(DoubleSideBackload.children[1]);
                    Vertical.children[0].textContent =  Translate.Elevators[0].LoadT[language];
                    Vertical.children[1].textContent = setCurrentValue(Vertical.children[1]);
                    bodyT.children[0].textContent =  Translate.Elevators[0].bodyT[language];
                    capT.children[0].textContent =  Translate.Elevators[0].capT[language];
                    liningT.children[0].textContent =  Translate.Elevators[0].lining[language];
                    break;
            }
            break;
        case"Size":
            var main =  document.getElementById(modelType + "_"+pageType+"_" + idR);
            var titleText =  main.children[0].children[0].children[1];
            var SizeBlock =  document.getElementById(modelType + "_SizeBlock_" + idR);
            var sizeText = SizeBlock.children[0];

            titleText.textContent =  Translate.Elevators[0].MainDimensions[language];
            sizeText.textContent =  Translate.Elevators[0].MainDimensions[language];
            switch(modelType){
                case"CSZE":
                    var SizeHeight =  document.getElementById(modelType + "_SizeHeight_" + idR);
                    var SizeHeightTransport =  document.getElementById(modelType + "_SizeHeightTransport_" + idR);
                    var SizeLengthTop =  document.getElementById(modelType + "_SizeLengthTop_" + idR);
                    var SizeLengthBefore =  document.getElementById(modelType + "_SizeLengthBefore_" + idR);
                    var SizeLengthBot =  document.getElementById(modelType + "_SizeLengthBot_" + idR);
                    var SizeLenghtUnload =  document.getElementById(modelType + "_SizeLenghtUnload_" + idR);
                    var SizeLenghtTotal =  document.getElementById(modelType + "_SizeLenghtTotal_" + idR);

                    SizeHeight.children[0].textContent =  Translate.Elevators[0].ElevatorH[language];
                    SizeHeightTransport.children[0].textContent =  Translate.Elevators[0].TransportLength[language];
                    SizeLengthTop.children[0].textContent =  Translate.Elevators[0].UpperL[language];
                    SizeLengthBefore.children[0].textContent =  Translate.Elevators[0].SizeLengthBefore[language];
                    SizeLengthBot.children[0].textContent =  Translate.Elevators[0].LowerL[language];
                    SizeLenghtUnload.children[0].textContent =  Translate.Elevators[0].SizeLenghtUnload[language];
                    SizeLenghtTotal.children[0].textContent =  Translate.Elevators[0].SizeLenghtTotal[language];
                    break;
                case"CSE":
                    var HeightMain =  document.getElementById(modelType + "_HeightMain_" + idR);
                    var HeightTransport =  document.getElementById(modelType + "_HeightTransport_" + idR);

                    HeightMain.children[0].textContent =  Translate.Elevators[0].ElevatorH[language];
                    HeightTransport.children[0].textContent =  Translate.Elevators[0].TransportLength[language];
                    break;
                case"CSCC":
                    var lengthAxis =  document.getElementById(modelType + "_lengthAxis_" + idR);
                    var lengthMain =  document.getElementById(modelType + "_lengthMain_" + idR);
                    var lengthTransport =  document.getElementById(modelType + "_lengthTransport_" + idR);

                    lengthAxis.children[0].textContent =  Translate.Elevators[0].lengthAxis[language];
                    lengthMain.children[0].textContent =  Translate.Elevators[0].TotalL[language];
                    lengthTransport.children[0].textContent =  Translate.Elevators[0].TransportL[language];
                    break;
            }          
            break;
    }
}

function setLangProd(product){
	for(var i = 0; i < Product_T.length; i++){
		if( product == Product_T[i][languageP]){
			product = Product_T[i][language];
			break;
		}
	}
	return product;
}

function setCurrentValue(obj){
    for(var i = 0; i <Object.keys(Translate.Elevators[0]).length; i++){
        var findEl = Object.keys(Translate.Elevators[0])[i];
        var key = Translate.Elevators[0][findEl][languageP];
        if(key == obj.textContent){
            var result = Translate.Elevators[0][findEl][language];
            break;
        }
    }
    return result;
}

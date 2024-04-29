var protocolRequirements = {
	id_user: "id_user",
	id_deal: "id_deal",
	id_requirements: Math.random().toString(36).substring(2,7),
	product_name: "-",
	equipment_machine: 9999,
	configuration: 9999,
	classifier: {
		useADD_ID: Math.random().toString(36).substring(2,10) + "RQ0",
		classifierType: 0,
		classifierProduct: {
			useADD: false,
			mainClassifier:{
				industryID: 9999,
				groupProductID: 9999,
				productID: 9999,
				descriptionID: 9999,
				productTypeID: 9999,
				productSortID: 9999,
				purposeID: 9999,
				GOST_ID: 9999
			},
			addClassifier:{
				industry: "",
				groupProduct: "",
				product: "",
				description: "",
				productType: "",
				productSort: "",
				purpose: ""
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
	capacity_value: 1.00,
	capacity_type: 0,
	time_value: 1.00,
	time_type: 0,
	hour_in_day: 8,
	day_in_week: 5,
	month_in_year: 12,
	capacity_per_hour: 1,
	selection_value: 100.000,
	selection_type: 0,
	images: [],
	components: [],
	fractions: [],
	create_date: new Date().getDate() + "." + Number(new Date().getMonth() + 1) + "." + new Date().getFullYear(),
	upload_data: false, //Спецальная переменная для проверки сохраннея требований.
	company_name: "company_name"
}

function generateFractionRequirements(){
	protocolRequirements.fractions.push({
		fractionName: "Фракция 0" + Number(protocolRequirements.fractions.length+1),
		defaultFractionName: true,
		mainFraction: protocolRequirements.fractions.length == 0 ? true : false,
		purpose: 0,
		exit: 0.00,
		purity: 0.00,
		capacity: 0.00,
		selection_value: 100.00,
		selection_type: 0,
		images: [],
		components : [],
		comment: ""
	});
}
function generateComponentRequirements(){
	protocolRequirements.components.push({
		product_name: "-",
		classifier: {
			useADD_ID: Math.random().toString(36).substring(2,10) + "RQ" + Number(protocolRequirements.components.length+1),
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
					purpose: ""
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
		mass_component: 0,
		value: protocolRequirements.components.length == 0 ? 100 : 0,
		value_type: 0,
		removed_value: 0,
		flag_1: protocolRequirements.components.length == 0 ? true : false,
		flag_2: true,
		images: []
	});
	
	for(var i=0; i < protocolRequirements.fractions.length; i++){
		protocolRequirements.fractions[i].components.push({
			product_name: "-",
			iterfraction_percent: 0.00,
			mass_component: 0,
			value: protocolRequirements.fractions[i].components.length == 0 ? 100 : 0,
			value_type: 0,
			removed_value: 0,
			flag_1: protocolRequirements.fractions[i].components.length == 0 ? true : false,
			flag_2: false
		});
	}
}

function fractionRequirementsView(){
	if(requirementsFractionBlock.style.display == "none")
		requirementsFractionBlock.style.display = "flex";
	else
		requirementsFractionBlock.style.display = "none";
}
function updateRequirementEquipmentConfiguration(){
	protocolRequirements.equipment_machine = requirementsMachine.value;
	protocolRequirements.configuration = requirementsConfiguration.value;
}
function setupRequirementEquipmentConfiguration(){
	requirementsMachine.value = protocolRequirements.equipment_machine;
	setupRequirementsConfiguration();
	requirementsConfiguration.value = protocolRequirements.configuration;
}
function requirementsAddEventListener(){
	var InputCapacity = requirementsSourceBlockComponents.children[0].children[0].children[0].children[1].children[0];
	var SelectMassCapacity = requirementsSourceBlockComponents.children[0].children[0].children[0].children[1].children[1];
	var SliderCapacity = requirementsSourceBlockComponents.children[0].children[0].children[0].children[0];
	
	var InputTime = requirementsSourceBlockComponents.children[0].children[0].children[1].children[1].children[0];
	var SelectTime = requirementsSourceBlockComponents.children[0].children[0].children[1].children[1].children[1];
	var SliderTime = requirementsSourceBlockComponents.children[0].children[0].children[1].children[0];
	
	var SettingTimeCheckbox = requirementsSourceBlockComponents.children[0].children[0].children[1].children[1].children[2].children[0];
	
	var InputHourInDay = requirementsTimeSetting.children[0].children[1].children[0].children[0];
	var InputDayInWeek = requirementsTimeSetting.children[0].children[1].children[1].children[0];
	var InputMonthInYear = requirementsTimeSetting.children[0].children[1].children[2].children[0];
	
	var InputSolutionPriceCost = requirementsTimeSetting.children[1].children[1].children[0].children[0];
	var InputTimePaybeck = requirementsTimeSetting.children[1].children[1].children[1].children[0];
	var InputProfitInHour = requirementsTimeSetting.children[1].children[1].children[2].children[0];	
	var InputProfitInMass = requirementsTimeSetting.children[1].children[1].children[3].children[0];	
	
	var InputSelection = requirementsSourceBlockComponents.children[2].children[0].children[1].children[1].children[0];
	var SelectSelection = requirementsSourceBlockComponents.children[2].children[0].children[1].children[1].children[1];
	
	setupRequirementsInfo();
	setupRequirementsMachine();
	setupRequirementsConfiguration();
	
	InputCapacity.addEventListener("change", function(){
		SliderEdit(InputCapacity,SliderCapacity);
		updateRequirementsInfo();
	});
	SelectMassCapacity.addEventListener("change", function(){
		updateRequirementsInfo();
	});
	SliderCapacity.addEventListener("input", function(){
		InputEdit(InputCapacity,SliderCapacity);
		updateRequirementsInfo();
	});
	InputTime.addEventListener("change", function(){
		SliderEdit(InputTime,SliderTime);
		InputTime.value = InputTime.value > 0 ? InputTime.value : 0;
		updateRequirementsInfo();
	});
	SelectTime.addEventListener("change", function(){
		updateRequirementsInfo();
	});
	SliderTime.addEventListener("input", function(){
		InputEdit(InputTime,SliderTime);
		updateRequirementsInfo();
	});
	//Функционал настроек времени
	SettingTimeCheckbox.addEventListener("change", function(){
		if(SettingTimeCheckbox.checked)
			requirementsTimeSetting.style.display = "flex";
		else
			requirementsTimeSetting.style.display = "none";
	});
	InputHourInDay.addEventListener("change", function(){
		InputHourInDay.value = InputHourInDay.value < 24 && InputHourInDay.value > 0 ? InputHourInDay.value : 24;
		updateRequirementsInfo();
	});
	InputDayInWeek.addEventListener("change", function(){
		InputDayInWeek.value = InputDayInWeek.value < 7 && InputDayInWeek.value > 0 ? InputDayInWeek.value : 7;
		updateRequirementsInfo();
	});
	InputMonthInYear.addEventListener("change", function(){
		InputMonthInYear.value = InputMonthInYear.value < 12 && InputMonthInYear.value > 0 ? InputMonthInYear.value : 12;
		updateRequirementsInfo();
	});
	//Функции расчетов окупаемости
	InputSolutionPriceCost.addEventListener("change", function(){
		calculationProfitInHour(InputSolutionPriceCost, InputTimePaybeck, InputProfitInHour, InputProfitInMass);
		calculationTimePayback(InputSolutionPriceCost, InputTimePaybeck, InputProfitInHour, InputProfitInMass);
	});
	InputTimePaybeck.addEventListener("change", function(){
		calculationProfitInHour(InputSolutionPriceCost, InputTimePaybeck, InputProfitInHour, InputProfitInMass);
		calculationSolutionPriceCost(InputSolutionPriceCost, InputTimePaybeck, InputProfitInHour, InputProfitInMass);
	});
	InputProfitInHour.addEventListener("change", function(){
		calculationSolutionPriceCost(InputSolutionPriceCost, InputTimePaybeck, InputProfitInHour, InputProfitInMass);
	});
	InputProfitInMass.addEventListener("change", function(){
		calculationTimePayback(InputSolutionPriceCost, InputTimePaybeck, InputProfitInHour, InputProfitInMass);
	});
	//Функционал выборки по основному продукту требований
	InputSelection.addEventListener("change", function(){
		updateRequirementsInfo();
	});
	SelectSelection.addEventListener("change", function(){
		updateRequirementsInfo();
	});
	//Дополнительные функции для установки аппарата и конфигурации требований
	requirementsMachine.addEventListener("change", function(){
		setupRequirementsConfiguration();
		updateRequirementEquipmentConfiguration();
	});
	requirementsConfiguration.addEventListener("change", function(){
		updateRequirementEquipmentConfiguration();
	});
}

function updateRequirementsInfo(){
	var capacity_value = requirementsSourceBlockComponents.children[0].children[0].children[0].children[1].children[0];
	var capacity_type = requirementsSourceBlockComponents.children[0].children[0].children[0].children[1].children[1];
	
	var time_value = requirementsSourceBlockComponents.children[0].children[0].children[1].children[1].children[0];
	var time_type = requirementsSourceBlockComponents.children[0].children[0].children[1].children[1].children[1];
	
	var hour_in_day = requirementsTimeSetting.children[0].children[1].children[0].children[0];
	var day_in_week = requirementsTimeSetting.children[0].children[1].children[1].children[0];
	var month_in_year = requirementsTimeSetting.children[0].children[1].children[2].children[0];
	
	var InputSolutionPriceCost = requirementsTimeSetting.children[1].children[1].children[0].children[0];
	var InputTimePaybeck = requirementsTimeSetting.children[1].children[1].children[1].children[0];
	var InputProfitInHour = requirementsTimeSetting.children[1].children[1].children[2].children[0];
	var InputProfitInMass = requirementsTimeSetting.children[1].children[1].children[3].children[0];
	
	var selection_value = requirementsSourceBlockComponents.children[2].children[0].children[1].children[1].children[0];
	var selection_type = requirementsSourceBlockComponents.children[2].children[0].children[1].children[1].children[1];
	
	protocolRequirements.capacity_value = Number(capacity_value.value).toFixed(3);
	protocolRequirements.capacity_type = Number(capacity_type.value);
	
	protocolRequirements.time_value = Number(time_value.value).toFixed(3);
	protocolRequirements.time_type = Number(time_type.value);	
	
	protocolRequirements.hour_in_day = Number(hour_in_day.value).toFixed(3);
	protocolRequirements.day_in_week = Number(day_in_week.value).toFixed(3);
	protocolRequirements.month_in_year = Number(month_in_year.value).toFixed(3);
	
	protocolRequirements.selection_value = Number(selection_value.value).toFixed(3);
	protocolRequirements.selection_type = Number(selection_type.value);

	setupMainPageCapacity(protocolRequirements, capactityRequirements , capactityRequirementsText);
	calculationProfitInHour(InputSolutionPriceCost, InputTimePaybeck, InputProfitInHour, InputProfitInMass);
	updateAllFractionCapactity();
	setupRequirementsInfo();
}

function setupRequirementsInfo(){
	var capacity_value = requirementsSourceBlockComponents.children[0].children[0].children[0].children[1].children[0];
	var capacity_type = requirementsSourceBlockComponents.children[0].children[0].children[0].children[1].children[1];
	var capacity_slider = requirementsSourceBlockComponents.children[0].children[0].children[0].children[0];
	
	var time_value = requirementsSourceBlockComponents.children[0].children[0].children[1].children[1].children[0];
	var time_type = requirementsSourceBlockComponents.children[0].children[0].children[1].children[1].children[1];
	var time_slider = requirementsSourceBlockComponents.children[0].children[0].children[1].children[0];
	
	var hour_in_day = requirementsTimeSetting.children[0].children[1].children[0].children[0];
	var day_in_week = requirementsTimeSetting.children[0].children[1].children[1].children[0];
	var month_in_year = requirementsTimeSetting.children[0].children[1].children[2].children[0];

	var selection_value = requirementsSourceBlockComponents.children[2].children[0].children[1].children[1].children[0];
	var selection_type = requirementsSourceBlockComponents.children[2].children[0].children[1].children[1].children[1];
	
	capacity_value.value = Number(protocolRequirements.capacity_value).toFixed(3);
	capacity_type.value = Number(protocolRequirements.capacity_type);
	capacity_slider.value = Number(protocolRequirements.capacity_value).toFixed(3);	
	
	time_value.value = Number(protocolRequirements.time_value).toFixed(3);
	time_type.value = Number(protocolRequirements.time_type);
	time_slider.value = Number(protocolRequirements.time_value).toFixed(3);
	
	hour_in_day.value = Number(protocolRequirements.hour_in_day).toFixed(3);
	day_in_week.value = Number(protocolRequirements.day_in_week).toFixed(3);
	month_in_year.value = Number(protocolRequirements.month_in_year).toFixed(3);
	
	selection_value.value = Number(protocolRequirements.selection_value).toFixed(3);
	selection_type.value = Number(protocolRequirements.selection_type);
		
	for(var i = 1; i <= protocolRequirements.components.length; i++){
		setupRequirementsComponent(i);
	}
}

//Добавление элемента фракции
function addFractionRequirements(){
	generateFractionRequirements();
	var id_fraction = protocolRequirements.fractions.length;
	var clone = requirementsFraction_0.cloneNode(true);
	clone.id = "requirementsFraction_"+id_fraction;
	clone.style.display = "flex";	
	
	var nameBlock = clone.children[0].children[0].children[0];
	var deleteButton = nameBlock.children[0].children[0].children[0].children[0];
	var fractionName = nameBlock.children[0].children[0].children[1];
	var fractionNameNew = nameBlock.children[0].children[0].children[1];
	var fractionToggle = nameBlock.children[0].children[0].children[2];
	var purpose = nameBlock.children[0].children[1].children[0].children[0];
	var commentBlock = nameBlock.children[1].children[0];
	
	var exitSlider = clone.children[0].children[0].children[1].children[0].children[0];
	
	var fractionBlock = clone.children[0].children[0].children[2];
	var exit = fractionBlock.children[0].children[1].children[0].children[0].children[0];
	var purity = fractionBlock.children[0].children[1].children[0].children[0].children[2];
	var capacity = fractionBlock.children[0].children[1].children[0].children[0].children[4];
	var selection_value = fractionBlock.children[2].children[1].children[0];
	var selection_type = fractionBlock.children[2].children[1].children[1];
	var addPhotoButton = fractionBlock.children[4].children[0].children[0];
	
	var inputPhoto = fractionBlock.children[5];
	var imagePhoto = fractionBlock.children[4].children[0].children[0].children[0];
	var photoButton = clone.children[0].children[0].children[3].children[0];
	
	fractionName.placeholder = protocolRequirements.fractions[id_fraction-1].fractionName;
	purpose.value = protocolRequirements.fractions[id_fraction-1].purpose;
	exit.value = Number(protocolRequirements.fractions[id_fraction-1].exit).toFixed(3);
	purity.value = Number(protocolRequirements.fractions[id_fraction-1].purity).toFixed(3);
	capacity.value = Number(protocolRequirements.fractions[id_fraction-1].capacity).toFixed(3);
	selection_value.value = Number(protocolRequirements.fractions[id_fraction-1].selection_value).toFixed(3);
	selection_type.value = Number(protocolRequirements.fractions[id_fraction-1].selection_type);
	commentBlock.value = protocolRequirements.fractions[id_fraction-1].comment;
	
	fraction_block.appendChild(clone);
	requirements_file_img_change(inputPhoto,imagePhoto);
	
	deleteButton.addEventListener("click", function(){
		deleatFraction(clone.id.substr(21));
	});
	fractionNameNew.addEventListener("input", function(){
		updateFractionName(clone.id.substr(21));
	});
	fractionToggle.addEventListener("click", function(){
		updateMainFaction(clone.id.substr(21));
	});	
	purpose.addEventListener("change", function(){
		updateFractionPurpose(clone.id.substr(21));
	})
	exit.addEventListener("change", function(){
		SliderEdit(exit,exitSlider);
		updateFractionMainParametr(clone.id.substr(21));
	});	
	exitSlider.addEventListener("input", function(){
		InputEdit(exit,exitSlider);
		updateFractionMainParametr(clone.id.substr(21));
	})
	purity.addEventListener("change", function(){
		updateFractionMainParametr(clone.id.substr(21));
	});	
	capacity.addEventListener("change", function(){
		updateFractionMainParametr(clone.id.substr(21));
	});	
	selection_value.addEventListener("change", function(){
		updateFractionMainParametr(clone.id.substr(21));
	});	
	selection_type.addEventListener("change", function(){
		updateFractionMainParametr(clone.id.substr(21));
	});	
	commentBlock.addEventListener("change", function(){
		updateFractionComment(clone.id.substr(21));
	});
	addPhotoButton.addEventListener("click", function(){
		addRequirementsFractionPhoto_1(clone.id.substr(21));
	});
	photoButton.addEventListener("click", function(){
		addRequirementsFractionPhoto_2(clone.id.substr(21));
	});
	
	for(var i = 0; i < protocolRequirements.components.length; i++){
		protocolRequirements.fractions[id_fraction-1].components.push({
			product_name: "-",
			iterfraction_percent: 0.00,
			mass_component: 0,
			value: protocolRequirements.fractions[id_fraction-1].components.length == 0 ? 100 : 0,
			value_type: 0,
			removed_value: 0,
			flag_1: protocolRequirements.fractions[id_fraction-1].components.length == 0 ? true : false,
			flag_2: false
		});		
		
		addFractionComponentsRequirements(id_fraction-1,i+1);
	}
	createdExit(id_fraction-1);
}
//Функции обновления данных фракций
function updateFractionName(id){
	var id_fraction = Number(id)-1;
	var fractionElement = document.getElementById("requirementsFraction_"+id);
	
	var nameBlock = fractionElement.children[0].children[0].children[0];
	var fractionName = nameBlock.children[0].children[0].children[1];
	var fractionNameNew = nameBlock.children[0].children[0].children[1];
	
	if(fractionNameNew.value != ""){
		protocolRequirements.fractions[id_fraction].fractionName = fractionNameNew.value;
		protocolRequirements.fractions[id_fraction].defaultFractionName	= false;	
		fractionName.placeholder = protocolRequirements.fractions[id_fraction].fractionName;
	}
	else{
		protocolRequirements.fractions[id_fraction].fractionName = "Фракция 0" + id;
		protocolRequirements.fractions[id_fraction].defaultFractionName	= true;
		fractionName.placeholder = protocolRequirements.fractions[id_fraction].fractionName;
	}
}

function removeMainFraction(){
	//Отключение всех тогглов ософной фракции
	for(var i = 1; i <= protocolRequirements.fractions.length; i++){
		var fractionElement = document.getElementById("requirementsFraction_"+i);
	
		var nameBlock = fractionElement.children[0].children[0].children[0];
		var fractionToggle = nameBlock.children[0].children[0].children[2];
		
		fractionToggle.checked = false;
		protocolRequirements.fractions[i-1].mainFraction = false;
	}
}

function updateMainFaction(id){
	removeMainFraction();
	
	//Установка тогла основной фракции
	var fractionElement = document.getElementById("requirementsFraction_"+id);
	
	var nameBlock = fractionElement.children[0].children[0].children[0];
	var fractionToggle = nameBlock.children[0].children[0].children[2];
	
	fractionToggle.checked = true;
	protocolRequirements.fractions[id-1].mainFraction = true;
	mainPageMainComponentValue(protocolRequirements.fractions[id-1], capacityMainFractionRequirement, purityMainFractionRequirement);
}

function updateFractionMainParametr(id){
	var id_fraction = Number(id)-1;
	var fractionElement = document.getElementById("requirementsFraction_"+id);
	
	var exitSlider = fractionElement.children[0].children[0].children[1].children[0].children[0];
	
	var fractionBlock = fractionElement.children[0].children[0].children[2];
	var exit = fractionBlock.children[0].children[1].children[0].children[0].children[0];
	var purity = fractionBlock.children[0].children[1].children[0].children[0].children[2];
	var capacity = fractionBlock.children[0].children[1].children[0].children[0].children[4];
	var selection_value = fractionBlock.children[2].children[1].children[0];
	var selection_type = fractionBlock.children[2].children[1].children[1];
	
	protocolRequirements.fractions[id_fraction].exit = Number(exit.value).toFixed(3);
	protocolRequirements.fractions[id_fraction].purity = Number(purity.value).toFixed(3);
	protocolRequirements.fractions[id_fraction].capacity = Number(capacity.value).toFixed(3);
	protocolRequirements.fractions[id_fraction].selection_value = Number(selection_value.value).toFixed(3);
	protocolRequirements.fractions[id_fraction].selection_type = Number(selection_type.value).toFixed(3);

	calculationInFractionsPercent(id_fraction);
	setupFractionMainParametr(id);
}
function setupFractionMainParametr(id){
	var id_fraction = Number(id)-1;
	var fractionElement = document.getElementById("requirementsFraction_"+id);
	
	var nameBlock = fractionElement.children[0].children[0].children[0];
	var fractionNameNew = nameBlock.children[0].children[0].children[1];
	var fractionToggle = nameBlock.children[0].children[0].children[2];
	var purpose = nameBlock.children[0].children[1].children[0].children[0];
	var commentBlock = nameBlock.children[1].children[0];
	
	var exitSlider = fractionElement.children[0].children[0].children[1].children[0].children[0];
	
	var fractionBlock = fractionElement.children[0].children[0].children[2];
	var exit = fractionBlock.children[0].children[1].children[0].children[0].children[0];
	var purity = fractionBlock.children[0].children[1].children[0].children[0].children[2];
	var capacity = fractionBlock.children[0].children[1].children[0].children[0].children[4];
	var selection_value = fractionBlock.children[2].children[1].children[0];
	var selection_type = fractionBlock.children[2].children[1].children[1];
	
	if(!protocolRequirements.fractions[id_fraction].defaultFractionName)
		fractionNameNew.value = protocolRequirements.fractions[id_fraction].fractionName
	
	if(protocolRequirements.fractions[id_fraction].mainFraction)
		fractionToggle.checked = true;
	
	purpose.value = protocolRequirements.fractions[id_fraction].purpose;
	commentBlock.value = protocolRequirements.fractions[id_fraction].comment;
	
	exit.value = Number(protocolRequirements.fractions[id_fraction].exit).toFixed(3);
	exitSlider.value = Number(protocolRequirements.fractions[id_fraction].exit).toFixed(3);
	purity.value = Number(protocolRequirements.fractions[id_fraction].purity).toFixed(3);
	capacity.value = Number(protocolRequirements.fractions[id_fraction].capacity).toFixed(3);
	selection_value.value = Number(protocolRequirements.fractions[id_fraction].selection_value).toFixed(3);
	selection_type.value = Number(protocolRequirements.fractions[id_fraction].selection_type);
	
	interFractionsPercent(id_fraction);
	mainPageMainComponentValue(protocolRequirements.fractions[id_fraction], capacityMainFractionRequirement, purityMainFractionRequirement);
	
	for(var i=1; i <= protocolRequirements.fractions[id_fraction].components.length; i++){
		setupFractionComponents(id,i);
	}
}

function updateFractionComment(id){
	var id_fraction = Number(id)-1;
	var fractionElement = document.getElementById("requirementsFraction_"+id);
	
	var nameBlock = fractionElement.children[0].children[0].children[0];
	var commentBlock = nameBlock.children[1].children[0];
	
	protocolRequirements.fractions[id_fraction].comment = commentBlock.value;
}

function updateFractionPurpose(id){
	var id_fraction = Number(id)-1;
	var fractionElement = document.getElementById("requirementsFraction_"+id);
	
	var nameBlock = fractionElement.children[0].children[0].children[0];
	var purpose = nameBlock.children[0].children[1].children[0].children[0];
	protocolRequirements.fractions[id_fraction].purpose = Number(purpose.value);
}

function updateFractionPurposeSelect(){
	var PurposeElement = requirementsProductClassifier.children[0].children[0].children[13].children[0];
	
	for(var id=0; id <= protocolRequirements.fractions.length; id++){
		var fractionElement = document.getElementById("requirementsFraction_"+id);
		var nameBlock = fractionElement.children[0].children[0].children[0];
		var purpose = nameBlock.children[0].children[1].children[0].children[0];
		
		clearClassifierSelect(purpose);
		
		for(var i=1; i < PurposeElement.length; i++){
			var option = document.createElement('option');
			option.textContent = PurposeElement.options[i].textContent;
			option.value = PurposeElement.options[i].value;
			purpose.add(option);
		}
	}
}

//Функции удаления и перезаписи фракций
function deleatFraction(id){
	var id_fraction = Number(id)-1;
		
	document.getElementById("requirementsFraction_"+id).remove();
	protocolRequirements.fractions.splice(id_fraction,1);
	
	//Перезапись фракций
	for(var i = 0; i < protocolRequirements.fractions.length; i++){
		var fractionElement = fraction_block.children[i+1];
		fractionElement.id = "requirementsFraction_" + Number(i+1);
		if(protocolRequirements.fractions[i].defaultFractionName == true){
			protocolRequirements.fractions[i].fractionName = "Фракция 0" + Number(i+1);	
			var nameBlock = fractionElement.children[0].children[0].children[0];
			var fractionName = nameBlock.children[0].children[0].children[1];
			fractionName.placeholder = protocolRequirements.fractions[i].fractionName;
		}
		//Перезапись компонентов внутри фракции
		var componetBlock = fractionElement.children[0].children[0].children[4];
		for(var j = 0; j < protocolRequirements.fractions[i].components.length; j++)
		{
			componetBlock.children[j+1].id = "requirementsFraction_"+Number(i+1)+"_item_source_"+Number(j+1);
			var componentSelectedValue = componetBlock.children[j+1].children[1].children[0].children[1].children[0];
			var componentSlider = componetBlock.children[j+1].children[1].children[1].children[0];
			
			//Удаление слушателей с компонентов
			componentSelectedValue.replaceWith(componentSelectedValue.cloneNode(false));
			componentSlider.replaceWith(componentSlider.cloneNode(false));
		}
	}
	
	//Перезапись функций после удаления
	for(var i = 0; i < protocolRequirements.fractions.length; i++){
		for(var j = 0; j < protocolRequirements.fractions[i].components.length; j++)
		{
			var componentFractionElement =  document.getElementById("requirementsFraction_"+Number(i+1)+"_item_source_"+Number(j+1));
			var componentFractionSelectedValue = componentFractionElement.children[1].children[0].children[1].children[0];
			var componentFractionSlider = componentFractionElement.children[1].children[1].children[0];
				
			componentFractionSelectedValue.addEventListener("change", returnedFractionSelectedValueListeners(i+1,j+1), "main");
			componentFractionSlider.addEventListener("input", returnedFractionSliderValueListeners(i+1,j+1), "main");
			addCalculationFractionsComponents(i+1,j+1);
		}
	}
}

//Работа с компонентами 
function addComponentRequirements(){
	generateComponentRequirements();
	var id_components = protocolRequirements.components.length;
	
	var cloneItem = requirements_item_source_0.cloneNode(true);
	var cloneAddPhotoBlock = requirements_addPhotoBlock_0.cloneNode(true);
	var cloneClassifier = requirements_classifier_0.cloneNode(true);
	cloneItem.id = "requirements_item_source_" + id_components;
	cloneAddPhotoBlock.id = "requirements_addPhotoBlock_" + id_components;
	cloneClassifier.id = "requirements_classifier_" + id_components;
	
	cloneItem.style.display = "flex";
	
	var deleteButton = cloneItem.children[0].children[0].children[0];
	var componentNumber = cloneItem.children[0].children[0].children[1];
	var componentClassifierSelect = cloneItem.children[1].children[0].children[0];
	var componentSelectedValue = cloneItem.children[1].children[0].children[1].children[0];
	var componentSelectedType = cloneItem.children[1].children[0].children[1].children[1];
	var componentSlider = cloneItem.children[1].children[1].children[0];
	var componentFlag_1 = cloneItem.children[1].children[1].children[1].children[0];
	var componentFlag_2 = cloneItem.children[1].children[1].children[1].children[1];
	var componentAddPhotoButton = cloneItem.children[2];
	
	var inputPhoto = cloneItem.children[3];
	var imagePhoto = cloneItem.children[2].children[0].children[0];
	var photoButton = cloneAddPhotoBlock.children[0]
	
	var classifierButtonAccept = cloneClassifier.children[0].children[5].children[2];
	var classifierButtonProductAdd = cloneClassifier.children[0].children[0].children[13];
	var classifierButtonProductAddConfifm = cloneClassifier.children[0].children[1].children[13];
	var classifierButtonProductAddCancel = cloneClassifier.children[0].children[1].children[14];
	var classifierButtonWeedAdd = cloneClassifier.children[0].children[2].children[11];
	var classifierButtonWeedAddConfirm = cloneClassifier.children[0].children[3].children[11];
	var classifierButtonWeedAddCancel = cloneClassifier.children[0].children[3].children[12];
	var classifierSelectChangeType = cloneClassifier.children[0].children[5].children[0].children[0];
	
	if(id_components<10)
		componentNumber.textContent = "0"+id_components;
	else
		componentNumber.textContent = id_components;
	
	if(id_components == 1){
		deleteButton.style.display = "none";
		//Отключение возможности редактирования внутри классификатора
		classifierButtonProductAdd.style.display = "none";
		classifierButtonWeedAdd.style.display = "none";
		classifierButtonProductAddCancel.style.display = "none";
		classifierButtonWeedAddCancel.style.display = "none";	
		classifierSelectChangeType.disabled = "disabled";
		
		cloneClassifier.children[0].children[0].children[1].children[0].disabled = "disabled";
		cloneClassifier.children[0].children[0].children[3].children[0].disabled = "disabled";
		cloneClassifier.children[0].children[0].children[5].children[0].disabled = "disabled";
		cloneClassifier.children[0].children[0].children[7].children[0].disabled = "disabled";
		cloneClassifier.children[0].children[0].children[11].children[0].disabled = "disabled";
		
		cloneClassifier.children[0].children[1].children[1].children[0].readOnly = true;
		cloneClassifier.children[0].children[1].children[3].children[0].readOnly = true;
		cloneClassifier.children[0].children[1].children[5].children[0].readOnly = true;
		cloneClassifier.children[0].children[1].children[7].children[0].readOnly = true;
		cloneClassifier.children[0].children[1].children[9].children[0].readOnly = true;
		cloneClassifier.children[0].children[1].children[11].children[0].readOnly = true;
		
		cloneClassifier.children[0].children[2].children[1].children[0].disabled = "disabled";
		cloneClassifier.children[0].children[2].children[3].children[0].disabled = "disabled";
		cloneClassifier.children[0].children[2].children[5].children[0].disabled = "disabled";
		cloneClassifier.children[0].children[2].children[7].children[0].disabled = "disabled";
		cloneClassifier.children[0].children[2].children[9].children[0].disabled = "disabled";
		
		cloneClassifier.children[0].children[3].children[1].children[0].readOnly = true;
		cloneClassifier.children[0].children[3].children[3].children[0].readOnly = true;
		cloneClassifier.children[0].children[3].children[5].children[0].readOnly = true;
		cloneClassifier.children[0].children[3].children[7].children[0].readOnly = true;
		cloneClassifier.children[0].children[3].children[9].children[0].readOnly = true;
	}
	
	requirements_item_source_block.appendChild(cloneItem);
	requirements_item_source_block.appendChild(cloneAddPhotoBlock);
	requirements_item_source_block.appendChild(cloneClassifier);
	requirements_file_img_change(inputPhoto,imagePhoto);
	setupRequirementsComponent(id_components);
		
	componentClassifierSelect.addEventListener("change", function(){
		requirementsClassifierComponent(cloneItem.id.substr(25));
	});
	componentSelectedValue.addEventListener("change", function(){
		chengeTypeOfValue(protocolRequirements, protocolRequirements.components[id_components-1], componentSelectedValue);
		SliderEdit(componentSelectedValue,componentSlider);
		updateRequirementsComponents(cloneItem.id.substr(25));
		calculation_main(cloneItem.id.substr(25));
	});
	componentSelectedType.addEventListener("change", function(){
		updateRequirementsComponents(cloneItem.id.substr(25));
	});
	componentSlider.addEventListener("input", function(){
		InputEdit(componentSelectedValue,componentSlider);
		updateRequirementsComponents(cloneItem.id.substr(25));
		calculation_main(cloneItem.id.substr(25));
	});
	componentFlag_1.addEventListener("click", function(){
		updateRequirementsComponents(cloneItem.id.substr(25));
	});
	componentFlag_2.addEventListener("click", function(){
		updateRequirementsComponents(cloneItem.id.substr(25));
		removeComponetsForCalculation(cloneItem.id.substr(25));
		updateAllFractionPurity();
	});
	
	componentSelectedValue.addEventListener("change", checkRequirementsComponents);
	componentSlider.addEventListener("input", checkRequirementsComponents);
	
	requirementsSourceComponentsClassifierAddEventListeners(cloneClassifier.id.substr(24));
	//Установка отрасли по умолчанию как у исходного продукта
	cloneClassifier.children[0].children[0].children[1].children[0].value = protocolRequirements.classifier.classifierProduct.mainClassifier.industryID;
	requirementsSourceComponentsSetupProductGroup(cloneClassifier.id.substr(24));
	
	classifierButtonAccept.addEventListener("click", function(){
		requirementsClassifierComponentsEdit(cloneClassifier.id.substr(24));
	});
	classifierButtonProductAdd.addEventListener("click", function(){
		requirementsClassifierSourceComponentProductVidewADD(cloneClassifier.id.substr(24));
	});
	classifierButtonProductAddConfifm.addEventListener("click", function(){
		requirementsClassifierSourceComponentNewProductADD(cloneClassifier.id.substr(24));
	})
	classifierButtonProductAddCancel.addEventListener("click", function(){
		requirementsClassifierSourceComponentProductVidewADD(cloneClassifier.id.substr(24));
	});
	classifierButtonWeedAdd.addEventListener("click", function(){
		requirementsClassifierSourceComponentWeedVidewADD(cloneClassifier.id.substr(24));
	});
	classifierButtonWeedAddConfirm.addEventListener("click", function(){
		requirementsClassifierSourceComponentNewWeedADD(cloneClassifier.id.substr(24));
	});
	classifierButtonWeedAddCancel.addEventListener("click", function(){
		requirementsClassifierSourceComponentWeedVidewADD(cloneClassifier.id.substr(24));
	});
	classifierSelectChangeType.addEventListener("change", function(){
		requirementsClassifierSourceCompanentChangeType(cloneClassifier.id.substr(24))
	});
	
	deleteButton.addEventListener("click", function(){
		deleatComponent(cloneItem.id.substr(25));
	});
	
	componentAddPhotoButton.addEventListener("click", function(){
		addRequirementsItemSourcePhoto_1(cloneItem.id.substr(25));
	});
	photoButton.addEventListener("click", function(){
		addRequirementsItemSourcePhoto_2(cloneItem.id.substr(25));
	});
	
	for(var i = 0; i < protocolRequirements.fractions.length; i++)
		addFractionComponentsRequirements(i,id_components);
}

function addFractionComponentsRequirements(id_fraction,id_components){
	var fractionElement = document.getElementById("requirementsFraction_"+Number(id_fraction+1));
	var componentsBlock = fractionElement.children[0].children[0].children[4];
	var cloneItem = componentsBlock.children[0].cloneNode(true);
		
	cloneItem.style.display = "flex";
	cloneItem.id = "requirementsFraction_"+Number(id_fraction+1)+"_item_source_"+id_components;
		
	var componentNumber = cloneItem.children[0].children[0].children[0];
	var componentName = cloneItem.children[1].children[0].children[0];
	var componentSelectedValue = cloneItem.children[1].children[0].children[1].children[0];
	var componentSelectedType = cloneItem.children[1].children[0].children[1].children[1];
	var componentSlider = cloneItem.children[1].children[1].children[0];
	var componentFlag_1 = cloneItem.children[1].children[0].children[1].children[2].children[0];
	var componentFlag_2 = cloneItem.children[1].children[0].children[1].children[2].children[1];
		
	if(id_components<10)
		componentNumber.textContent = "0"+id_components;
	else
		componentNumber.textContent = id_components;
		
	componentsBlock.appendChild(cloneItem);
	
	componentSelectedValue.addEventListener("change", function(){
		chengeTypeOfValue(protocolRequirements.fractions[id_fraction], protocolRequirements.fractions[id_fraction].components[id_components-1], componentSelectedValue);
		SliderEdit(componentSelectedValue,componentSlider);
		updateFractionComponents(fractionElement.id.substr(21),cloneItem.id.substr(35));
	});
	componentSelectedType.addEventListener("change", function(){
		updateFractionComponents(fractionElement.id.substr(21),cloneItem.id.substr(35));
	});
	componentSlider.addEventListener("input", function(){
		InputEdit(componentSelectedValue,componentSlider);
		updateFractionComponents(fractionElement.id.substr(21),cloneItem.id.substr(35));
	});
	componentFlag_1.addEventListener("click", function(){
		updateFractionComponents(fractionElement.id.substr(21),cloneItem.id.substr(35));
	});
	componentFlag_2.addEventListener("click", function(){
		updateFractionComponents(fractionElement.id.substr(21),cloneItem.id.substr(35));
	});
	
	setupFractionComponents(Number(id_fraction+1), id_components);
	
	addCalculationFractionsComponents(fractionElement.id.substr(21),cloneItem.id.substr(35));
	
	setupFractionPurity(id_fraction);
	setupFractionExit(id_fraction);
	setupFractionMainParametr(id_fraction+1);
}
//Обновление и установка значений компонентов исходного продукта тренбований
function updateRequirementsComponents(id_components){
	var componentElement =  document.getElementById("requirements_item_source_" + id_components);
	
	var componentSelectedValue = componentElement.children[1].children[0].children[1].children[0];
	var componentSelectedType = componentElement.children[1].children[0].children[1].children[1];
	var componentSlider = componentElement.children[1].children[1].children[0];
	var componentFlag_1 = componentElement.children[1].children[1].children[1].children[0];
	var componentFlag_2 = componentElement.children[1].children[1].children[1].children[1];
	
	if(protocolRequirements.components[id_components-1].flag_2)
		protocolRequirements.components[id_components-1].value = Number(componentSlider.value).toFixed(3);
	else
		protocolRequirements.components[id_components-1].removed_value = Number(componentSlider.value).toFixed(3);
	
	protocolRequirements.components[id_components-1].value_type = componentSelectedType.value;
	protocolRequirements.components[id_components-1].flag_1 = componentFlag_1.checked;
	protocolRequirements.components[id_components-1].flag_2 = componentFlag_2.checked;
	
	//Проверка невозможности исключить компонент из рачетов
	if(id_components-1 == 0 || id_components == requirementsComponentsOtherID)
		protocolRequirements.components[id_components-1].flag_2 = true;

	setupRequirementsComponent(id_components);
	
	if(protocolRequirements.components[id_components-1].flag_2){
		setupMainPagePurity(protocolRequirements, purityRequirements);
		updateAllFractionExit();
		updateAllFractionCapactity();
	}
}
function setupRequirementsComponent(id_components){
	var componentElement = document.getElementById("requirements_item_source_" + id_components);
	
	var componentSelectedValue = componentElement.children[1].children[0].children[1].children[0];
	var componentSelectedType = componentElement.children[1].children[0].children[1].children[1];
	var componentSlider = componentElement.children[1].children[1].children[0];
	var componentFlag_1 = componentElement.children[1].children[1].children[1].children[0];
	var componentFlag_2 = componentElement.children[1].children[1].children[1].children[1];
	
	if(protocolRequirements.components[id_components-1].flag_2){
		componentSelectedValue.value = Number(protocolRequirements.components[id_components-1].value).toFixed(3);
		componentSlider.value = Number(protocolRequirements.components[id_components-1].value).toFixed(3);
	}
	else{
		componentSelectedValue.value = Number(protocolRequirements.components[id_components-1].removed_value).toFixed(3);
		componentSlider.value = Number(protocolRequirements.components[id_components-1].removed_value).toFixed(3);
	}
		
	componentSelectedType.value = protocolRequirements.components[id_components-1].value_type;
	componentFlag_1.checked = protocolRequirements.components[id_components-1].flag_1 ? true : false;
	componentFlag_2.checked = protocolRequirements.components[id_components-1].flag_2 ? true : false;
		
	componentSelectedValue.value = changeValueOfType(protocolRequirements, protocolRequirements.components[id_components-1], componentSlider);
}
//Обновление и утановка значений конмпонентов по фракции
function updateFractionComponents(id_fraction, id_components){
	var componentElement = document.getElementById("requirementsFraction_"+id_fraction+"_item_source_"+id_components);

	var componentSelectedValue = componentElement.children[1].children[0].children[1].children[0];
	var componentSelectedType = componentElement.children[1].children[0].children[1].children[1];
	var componentSlider = componentElement.children[1].children[1].children[0];
	var componentFlag_1 = componentElement.children[1].children[0].children[1].children[2].children[0];
	var componentFlag_2 = componentElement.children[1].children[0].children[1].children[2].children[1];

	if(protocolRequirements.components[id_components-1].flag_2)
		protocolRequirements.fractions[id_fraction-1].components[id_components-1].value = Number(componentSlider.value).toFixed(3);
	else
		protocolRequirements.fractions[id_fraction-1].components[id_components-1].removed_value = Number(componentSlider.value).toFixed(3);

	protocolRequirements.fractions[id_fraction-1].components[id_components-1].value_type = componentSelectedType.value;
	protocolRequirements.fractions[id_fraction-1].components[id_components-1].flag_1 = componentFlag_1.checked;
	protocolRequirements.fractions[id_fraction-1].components[id_components-1].flag_2 = componentFlag_2.checked;
	
	setupFractionComponents(id_fraction, id_components);
	setupFractionPurity(id_fraction-1);
	calculationInFractionsPercent(id_fraction-1);
	setupFractionMainParametr(id_fraction);
}
function setupFractionComponents(id_fraction, id_components){
	var componentElement = document.getElementById("requirementsFraction_"+id_fraction+"_item_source_"+id_components);

	var componentName = componentElement.children[1].children[0].children[0];
	var componentSelectedValue = componentElement.children[1].children[0].children[1].children[0];
	var componentSelectedType = componentElement.children[1].children[0].children[1].children[1];
	var componentSlider = componentElement.children[1].children[1].children[0];
	var componentFlag_1 = componentElement.children[1].children[0].children[1].children[2].children[0];
	var componentFlag_2 = componentElement.children[1].children[0].children[1].children[2].children[1];
	
	protocolRequirements.fractions[id_fraction-1].components[id_components-1].product_name = protocolRequirements.components[id_components-1].product_name;
	componentName.value = protocolRequirements.fractions[id_fraction-1].components[id_components-1].product_name;
	
	if(protocolRequirements.components[id_components-1].flag_2){
		componentSelectedValue.value = Number(protocolRequirements.fractions[id_fraction-1].components[id_components-1].value).toFixed(3);
		componentSlider.value = Number(protocolRequirements.fractions[id_fraction-1].components[id_components-1].value).toFixed(3);
	}
	else{
		componentSelectedValue.value = Number(protocolRequirements.fractions[id_fraction-1].components[id_components-1].removed_value).toFixed(3);
		componentSlider.value = Number(protocolRequirements.fractions[id_fraction-1].components[id_components-1].removed_value).toFixed(3);
	}
	
	componentSelectedType.value = protocolRequirements.fractions[id_fraction-1].components[id_components-1].value_type;
	componentFlag_1.checked = protocolRequirements.fractions[id_fraction-1].components[id_components-1].flag_1 ? true : false;
	componentFlag_2.checked = protocolRequirements.fractions[id_fraction-1].components[id_components-1].flag_2 ? true : false;
	
	componentSelectedValue.value = changeValueOfType(protocolRequirements.fractions[id_fraction-1], protocolRequirements.fractions[id_fraction-1].components[id_components-1], componentSlider);
}
//Удаление компонетов
function deleatComponent(id){
	var id_components = Number(id-1);
	
	document.getElementById("requirements_item_source_"+id).remove();
	document.getElementById("requirements_addPhotoBlock_"+id).remove();
	document.getElementById("requirements_classifier_"+id).remove();
	
	if(protocolRequirements.components[id_components].other_check)
		removeOtherRequirementsComponents();
	else
		removeMainRequirementsComponents(id_components);
	
	protocolRequirements.components.splice(id_components,1);
	
	//Перезапись исходных компонентов
	for(var i = 1; i <= protocolRequirements.components.length; i++){
		var componetItem = requirements_item_source_block.children[i*3];
		var componentAddPhotoBlock = requirements_item_source_block.children[i*3+1];
		var componentClassifier = requirements_item_source_block.children[i*3+2];
		
		var componentNumber = componetItem.children[0].children[0].children[1];
		
		componetItem.id = "requirements_item_source_" + i;
		componentAddPhotoBlock.id = "requirements_addPhotoBlock_" + i;
		componentClassifier.id = "requirements_classifier_" + i;
		
		if(i<10)
			componentNumber.textContent = "0"+i;
		else
			componentNumber.textContent = i;
		
		var componentSelectedValue = componetItem.children[1].children[0].children[1].children[0];
		var componentSlider = componetItem.children[1].children[1].children[0];
		
		//Удаление слушателей с компонентов
		componentSelectedValue.replaceWith(componentSelectedValue.cloneNode(false));
		componentSlider.replaceWith(componentSlider.cloneNode(false));
	
	}
	for(var i = 0; i < protocolRequirements.components.length; i++){
		var componentElement =  document.getElementById("requirements_item_source_"+Number(i+1));
		var componentSelectedValue = componentElement.children[1].children[0].children[1].children[0];
		var componentSlider = componentElement.children[1].children[1].children[0];
				
		componentSelectedValue.addEventListener("change", returnRequirementsSelect(i));
		componentSlider.addEventListener("input", returnRequirementsSlider(i));
		
		componentSelectedValue.addEventListener("change", checkRequirementsComponents);
		componentSlider.addEventListener("input", checkRequirementsComponents);
	}
	
	for(var i = 0; i < protocolRequirements.fractions.length; i++){
		document.getElementById("requirementsFraction_"+Number(i+1)+"_item_source_"+id).remove();
		protocolRequirements.fractions[i].components.splice(id_components,1);
		//Перезапись компонентов фракций
		var fractionElement = fraction_block.children[i+1];
		var componetBlock = fractionElement.children[0].children[0].children[4];
		for(var j = 0; j < protocolRequirements.fractions[i].components.length; j++){
			componetBlock.children[j+1].id = "requirementsFraction_"+Number(i+1)+"_item_source_"+Number(j+1);
			
			if((j+1) < 10)
				componetBlock.children[j+1].children[0].children[0].children[0].textContent = "0"+Number(j+1);
			else
				componetBlock.children[j+1].children[0].children[0].children[0].textContent = Number(j+1);
			
			var componentSelectedValue = componetBlock.children[j+1].children[1].children[0].children[1].children[0];
			var componentSlider = componetBlock.children[j+1].children[1].children[1].children[0];
			
			//Удаление слушателей с компонентов
			componentSelectedValue.replaceWith(componentSelectedValue.cloneNode(false));
			componentSlider.replaceWith(componentSlider.cloneNode(false));
		}
	}	
	newRequirementsComponentsOtherID();	
	//Перезапись функций после удаления
	for(var i = 0; i < protocolRequirements.fractions.length; i++){
		for(var j = 0; j < protocolRequirements.fractions[i].components.length; j++)
		{
			var componentFractionElement =  document.getElementById("requirementsFraction_"+Number(i+1)+"_item_source_"+Number(j+1));
			var componentFractionSelectedValue = componentFractionElement.children[1].children[0].children[1].children[0];
			var componentFractionSlider = componentFractionElement.children[1].children[1].children[0];
			
			if(requirementsComponentsOtherID == j+1){
				componentFractionSelectedValue.addEventListener("change", returnedFractionSelectedValueListeners(i+1,j+1), "other");
				componentFractionSlider.addEventListener("input", returnedFractionSliderValueListeners(i+1,j+1), "other");
			}
			else{
				componentFractionSelectedValue.addEventListener("change", returnedFractionSelectedValueListeners(i+1,j+1), "main");
				componentFractionSlider.addEventListener("input", returnedFractionSliderValueListeners(i+1,j+1), "main");
			}
			addCalculationFractionsComponents(i+1,j+1);
		}
	}
	//Пересчет частоты исходного продукта
	setupMainPagePurity(protocolRequirements, purityRequirements);
	//Пересчет частоты фракций
	for(var i = 1; i <= protocolRequirements.fractions.length; i++){
		setupFractionPurity(i-1);
		calculationInFractionsPercent(i-1);
		setupFractionMainParametr(i);
	}
}
//Отображение Классификаторов
function requirementsClassifierProduct(){
	var selectElement = requirementsSourceBlockComponents.children[2].children[0].children[1].children[0];
	
	if(selectElement.options[selectElement.value].textContent == "Классификатор"){
		requirementsProductClassifier.style.display = "flex";
		headerTooltip.children[1].style.display = "none";
		requirementsProductClassifier.style.zIndex = 2;
		overlayDisplayBlcok.style.zIndex = 1;
	}
	else{
		requirementsProductClassifier.style.display = "none";
		requirementsProductClassifier.style.zIndex = 0;
		overlayDisplayBlcok.style.zIndex = 0;
	}
}
function requirementsClassifierComponent(id){
	var selectElement = document.getElementById("requirements_item_source_"+id).children[1].children[0].children[0];
	var classifier = document.getElementById("requirements_classifier_"+id);
	
	if(selectElement.options[selectElement.value].textContent == "Классификатор"){
		classifier.style.display = "flex";
		headerTooltip.children[1].style.display = "none";
		classifier.style.zIndex = 2;
		overlayDisplayBlcok.style.zIndex = 1;			
	}
	else{
		classifier.style.display = "none";
		classifier.style.zIndex = 0;
		overlayDisplayBlcok.style.zIndex = 0;
	}
}
//Обновление зжначений имени продукта
function requirementsClassifierProductEdit(){
	var selectElementProduct = requirementsSourceBlockComponents.children[2].children[0].children[1].children[0];
	//Наименование классификатора
	var classifierProductSelectElementName = requirementsProductClassifier.children[0].children[0].children[5].children[0];
	var classifierProductSelectDescription = requirementsProductClassifier.children[0].children[0].children[7].children[0];
	//Наименования засорителя
	var classifierClassWeedSelectElememnt = requirementsProductClassifier.children[0].children[2].children[5].children[0];
	var classifierWeedSelectElememnt = requirementsProductClassifier.children[0].children[2].children[7].children[0];
	var classifierDescriptionWeedSelectElememnt = requirementsProductClassifier.children[0].children[2].children[9].children[0];
	
	
	var classifierOption = document.createElement('option');
	classifierOption.value ="classifier";
	
	if(protocolRequirements.classifier.classifierType == 0){
		//Проверка наличия предустановленного наименования
		if(classifierProductSelectElementName.value != 9999)
			classifierOption.text = list_product[classifierProductSelectElementName.value].productName;
		if(classifierProductSelectDescription.value != 9999)
			classifierOption.text += " (" + list_descriptionWeeed[classifierProductSelectDescription.value].descriptionName + ")";
		
		
		var NameElement = classifierProductSelectElementName;
	}
	else{
		if(classifierWeedSelectElememnt.value != 9999)
			classifierOption.text = list_weed[classifierWeedSelectElememnt.value].weedName + " (" + list_descriptionWeeed[classifierDescriptionWeedSelectElememnt.value].descriptionName + ")";
		else if(classifierWeedSelectElememnt.value != 9999)
			classifierOption.text = list_weed[classifierWeedSelectElememnt.value].weedName
		else if(classifierDescriptionWeedSelectElememnt.value != 9999)
			classifierOption.text = list_descriptionWeeed[classifierDescriptionWeedSelectElememnt.value].descriptionName
		else if(classifierClassWeedSelectElememnt.value != 9999)
			classifierOption.text = list_classWeed[classifierClassWeedSelectElememnt.value].className;
		
		var NameElement = classifierClassWeedSelectElememnt;
	}
	
	protocolRequirements.product_name = classifierOption.text;
	
	if(classifierOption.text.length > 23)
		classifierOption.text = classifierOption.text.substring(0,20) + "...";
	
	//Проверка сущестования компанента класификатора, его перезапись
	if(selectElementProduct[selectElementProduct.length-1].value != "classifier" && NameElement.value != 9999)
		selectElementProduct.add(classifierOption);
	else if(NameElement.value != 9999)
		selectElementProduct[selectElementProduct.length-1] = classifierOption;
		
	requirementsProductClassifier.style.display = "none";
	requirementsProductClassifier.style.zIndex = 0;
	overlayDisplayBlcok.style.zIndex = 0;
	
	//Отчиста ID-класификатора
	clearRequirementsClassifierProduct()
	//Заполнение ID-класификатора Продукт
	protocolRequirements.classifier.classifierProduct.useADD = false;
	protocolRequirements.classifier.classifierProduct.mainClassifier.industryID = requirementsProductClassifier.children[0].children[0].children[1].children[0].value;
	protocolRequirements.classifier.classifierProduct.mainClassifier.groupProductID = requirementsProductClassifier.children[0].children[0].children[3].children[0].value;
	protocolRequirements.classifier.classifierProduct.mainClassifier.productID = requirementsProductClassifier.children[0].children[0].children[5].children[0].value;
	protocolRequirements.classifier.classifierProduct.mainClassifier.descriptionID = requirementsProductClassifier.children[0].children[0].children[7].children[0].value;
	protocolRequirements.classifier.classifierProduct.mainClassifier.productTypeID = requirementsProductClassifier.children[0].children[0].children[9].children[0].value;
	protocolRequirements.classifier.classifierProduct.mainClassifier.productSortID = requirementsProductClassifier.children[0].children[0].children[11].children[0].value;
	protocolRequirements.classifier.classifierProduct.mainClassifier.purposeID = requirementsProductClassifier.children[0].children[0].children[13].children[0].value;
	protocolRequirements.classifier.classifierProduct.mainClassifier.GOST_ID = requirementsProductClassifier.children[0].children[0].children[15].children[0].value;
	//Заполнение ID-класификатора Засоритили
	protocolRequirements.classifier.classifierWeed.useADD = false;
	protocolRequirements.classifier.classifierWeed.mainClassifier.industryID = requirementsProductClassifier.children[0].children[2].children[1].children[0].value;
	protocolRequirements.classifier.classifierWeed.mainClassifier.categoryID = requirementsProductClassifier.children[0].children[2].children[3].children[0].value;
	protocolRequirements.classifier.classifierWeed.mainClassifier.classWeedID = requirementsProductClassifier.children[0].children[2].children[5].children[0].value;
	protocolRequirements.classifier.classifierWeed.mainClassifier.weedNameID = requirementsProductClassifier.children[0].children[2].children[7].children[0].value;
	protocolRequirements.classifier.classifierWeed.mainClassifier.descriptionID = requirementsProductClassifier.children[0].children[2].children[9].children[0].value;
	
	//Обнавление компонента, и закрытие классификатора
	if(NameElement.value != 9999){
		selectElementProduct.selectedIndex = selectElementProduct.length-1;
		
		if(protocolRequirements.components.length == 0)
			addComponentRequirements();
		
		protocolRequirements.components[0].classifier.classifierType = protocolRequirements.classifier.classifierType;
		protocolRequirements.components[0].classifier.classifierProduct.useADD = protocolRequirements.classifier.classifierProduct.useADD;
		protocolRequirements.components[0].classifier.classifierWeed.useADD = protocolRequirements.classifier.classifierWeed.useADD;
		//Заполнение ID-класификатора Продукт
		protocolRequirements.components[0].classifier.classifierProduct.mainClassifier.industryID = protocolRequirements.classifier.classifierProduct.mainClassifier.industryID;
		protocolRequirements.components[0].classifier.classifierProduct.mainClassifier.groupProductID = protocolRequirements.classifier.classifierProduct.mainClassifier.groupProductID;
		protocolRequirements.components[0].classifier.classifierProduct.mainClassifier.productID = protocolRequirements.classifier.classifierProduct.mainClassifier.productID;
		protocolRequirements.components[0].classifier.classifierProduct.mainClassifier.descriptionID = protocolRequirements.classifier.classifierProduct.mainClassifier.descriptionID;
		protocolRequirements.components[0].classifier.classifierProduct.mainClassifier.productTypeID = protocolRequirements.classifier.classifierProduct.mainClassifier.productTypeID;
		protocolRequirements.components[0].classifier.classifierProduct.mainClassifier.productSortID = protocolRequirements.classifier.classifierProduct.mainClassifier.productSortID;
		//Заполнение ID-класификатора Засоритили
		protocolRequirements.components[0].classifier.classifierWeed.mainClassifier.industryID = protocolRequirements.classifier.classifierWeed.mainClassifier.industryID;
		protocolRequirements.components[0].classifier.classifierWeed.mainClassifier.categoryID = protocolRequirements.classifier.classifierWeed.mainClassifier.categoryID;
		protocolRequirements.components[0].classifier.classifierWeed.mainClassifier.classWeedID = protocolRequirements.classifier.classifierWeed.mainClassifier.classWeedID;
		protocolRequirements.components[0].classifier.classifierWeed.mainClassifier.weedNameID = protocolRequirements.classifier.classifierWeed.mainClassifier.weedNameID;
		protocolRequirements.components[0].classifier.classifierWeed.mainClassifier.descriptionID = protocolRequirements.classifier.classifierWeed.mainClassifier.descriptionID;
		
		setupRequirementsClassifierComponents(1);
	}
	headerTooltip.children[1].style.display = "";
}
function clearRequirementsClassifierProduct(){
	protocolRequirements.classifier.classifierProduct = {
			useADD: false,
			mainClassifier:{
				industryID: 9999,
				groupProductID: 9999,
				productID: 9999,
				descriptionID: 9999,
				productTypeID: 9999,
				productSortID: 9999,
				purposeID: 9999,
				GOST_ID: 9999
			},
			addClassifier:{
				industry: "",
				groupProduct: "",
				product: "",
				description: "",
				productType: "",
				productSort: "",
				purpose: ""
			}
		};
	protocolRequirements.classifier.classifierWeed = {
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
}

function requirementsClassifierComponentsEdit(id){
	var selectElementSource = document.getElementById("requirements_item_source_"+id).children[1].children[0].children[0];
	var classifier = document.getElementById("requirements_classifier_"+id);
	//Наименование классификатора
	var classifierComponentSelectElementName = classifier.children[0].children[0].children[5].children[0];	
	var classifierComponentSelectDescription = classifier.children[0].children[0].children[7].children[0];	
	//Наименования засорителя
	var classifierClassWeedSelectElememnt = classifier.children[0].children[2].children[5].children[0];
	var classifierWeedSelectElememnt = classifier.children[0].children[2].children[7].children[0];
	var classifierDescriptionWeedSelectElememnt = classifier.children[0].children[2].children[9].children[0];
	
	var classifierOption = document.createElement('option');
	classifierOption.value = "classifier";
		
	if(protocolRequirements.components[id-1].classifier.classifierType == 0){
		//Проверка наличия предустановленного наименования
		if(classifierComponentSelectElementName.value != 9999)
			classifierOption.text = list_product[classifierComponentSelectElementName.value].productName;
		
		if(classifierComponentSelectDescription.value != 9999)
			classifierOption.text += " (" + list_descriptionWeeed[classifierComponentSelectDescription.value].descriptionName + ")";
		
		var NameElement = classifierComponentSelectElementName;
	}
	else{
		if(classifierWeedSelectElememnt.value != 9999 && classifierDescriptionWeedSelectElememnt.value != 9999)
			classifierOption.text = list_weed[classifierWeedSelectElememnt.value].weedName + " (" + list_descriptionWeeed[classifierDescriptionWeedSelectElememnt.value].descriptionName + ")";
		else if(classifierWeedSelectElememnt.value != 9999)
			classifierOption.text = list_weed[classifierWeedSelectElememnt.value].weedName
		else if(classifierDescriptionWeedSelectElememnt.value != 9999)
			classifierOption.text = list_descriptionWeeed[classifierDescriptionWeedSelectElememnt.value].descriptionName
		else if(classifierClassWeedSelectElememnt.value != 9999)
			classifierOption.text = list_classWeed[classifierClassWeedSelectElememnt.value].className;
		
		var NameElement = classifierClassWeedSelectElememnt;
	}

	protocolRequirements.components[id-1].product_name = classifierOption.text;
	
	if(classifierOption.text.length > 23)
		classifierOption.text = classifierOption.text.substring(0,20) + "...";
	
	//Проверка сущестования компанента класификатора, его перезапись
	if(selectElementSource[selectElementSource.length-1].value != "classifier" && NameElement.value != 9999)
		selectElementSource.add(classifierOption);
	else if(NameElement.value != 9999)
		selectElementSource[selectElementSource.length-1] = classifierOption;
		
	//Обнавление компанента, и закрытие классификатора
	if(NameElement.value != 9999)
		selectElementSource.selectedIndex = selectElementSource.length-1;
	
	classifier.style.display = "none";
	classifier.style.zIndex = 0;
	overlayDisplayBlcok.style.zIndex = 0
	
	//Отчиста ID-класификатора
	clearRequirementsClassifierComponents(id);
	//Заполнение ID-класификатора Продукт
	protocolRequirements.components[id-1].classifier.classifierProduct.useADD = false;
	protocolRequirements.components[id-1].classifier.classifierProduct.mainClassifier.industryID = classifier.children[0].children[0].children[1].children[0].value;
	protocolRequirements.components[id-1].classifier.classifierProduct.mainClassifier.groupProductID = classifier.children[0].children[0].children[3].children[0].value;
	protocolRequirements.components[id-1].classifier.classifierProduct.mainClassifier.productID = classifier.children[0].children[0].children[5].children[0].value;
	protocolRequirements.components[id-1].classifier.classifierProduct.mainClassifier.descriptionID = classifier.children[0].children[0].children[7].children[0].value;
	protocolRequirements.components[id-1].classifier.classifierProduct.mainClassifier.productTypeID = classifier.children[0].children[0].children[9].children[0].value;
	protocolRequirements.components[id-1].classifier.classifierProduct.mainClassifier.productSortID = classifier.children[0].children[0].children[11].children[0].value;
	//Заполнение ID-класификатора Засоритель
	protocolRequirements.components[id-1].classifier.classifierWeed.useADD = false;
	protocolRequirements.components[id-1].classifier.classifierWeed.mainClassifier.industryID = classifier.children[0].children[2].children[1].children[0].value;
	protocolRequirements.components[id-1].classifier.classifierWeed.mainClassifier.categoryID = classifier.children[0].children[2].children[3].children[0].value;
	protocolRequirements.components[id-1].classifier.classifierWeed.mainClassifier.classWeedID = classifier.children[0].children[2].children[5].children[0].value;
	protocolRequirements.components[id-1].classifier.classifierWeed.mainClassifier.weedNameID = classifier.children[0].children[2].children[7].children[0].value;
	protocolRequirements.components[id-1].classifier.classifierWeed.mainClassifier.descriptionID = classifier.children[0].children[2].children[9].children[0].value;
	
	for(var i = 0; i< protocolRequirements.fractions.length; i++){
		setupFractionComponents(i+1, id);
	}
	headerTooltip.children[1].style.display = "";
}
function clearRequirementsClassifierComponents(id){
	protocolRequirements.components[id-1].classifier.classifierProduct = {
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
				productSort: ""
			}
		};
	protocolRequirements.components[id-1].classifier.classifierWeed = {
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
}

//функция для добавления картинов требований
function requirements_file_img_change(input,img){
	input.addEventListener("change", function(){
		var selectedFile = input.files[0];
		
		var reader = new FileReader();
		reader.onload = function() {
			img.src = this.result;
	
			switch(img.parentElement.parentElement.parentElement.parentElement.id){
				case "requirementsSourceBlockComponents":
					if(protocolRequirements.images.length < 3){
						var clone = requirementsSourceBlockPhoto.children[2].cloneNode(true);
						clone.style.display = "flex";
						clone.id = "requirementsSourcePhoto_" + (protocolRequirements.images.length + 1);
						clone.children[0].children[0].src = this.result;
						
						requirementsSourceBlockPhoto.appendChild(clone);
						clone.children[0].addEventListener("click", function(){
							editPhoto(clone.id, img);
						});
						clone.children[1].addEventListener("click", function(){
							deleateRequirementsSourceBlockPhoto(clone.id);
						});
						
						protocolRequirements.images.push(img.src);
						
						if(protocolRequirements.images.length == 3){
							requirementsSourceBlockPhoto.children[0].style.display = "none";
							requirementsSourceBlockPhoto.children[1].style.display = "none";
						}
						else{
							requirementsSourceBlockPhoto.children[0].style.display = "flex";
							requirementsSourceBlockPhoto.children[1].style.display = "flex";
						}
					}
					break;
				case "requirements_item_source_block":
					var id = Number(input.parentElement.id.substring(25));
					if(protocolRequirements.components[id-1].images.length < 3){
						var clone = document.getElementById("requirements_addPhotoBlock_"+id).children[1].cloneNode(true);
						clone.style.display = "flex";
						clone.id = "requirements_item_source_"+id+"_photo_"+(protocolRequirements.components[id-1].images.length + 1);
						clone.children[0].children[0].src = this.result;
						
						document.getElementById("requirements_addPhotoBlock_"+id).appendChild(clone);
						clone.children[0].addEventListener("click", function(){
							editPhoto(clone.id, img);
						});
						clone.children[1].addEventListener("click", function(){
							deleateRequirementsItemSourcePhoto(clone.id);
						});						
						
						protocolRequirements.components[id-1].images.push(img.src);
						
						if(protocolRequirements.components[id-1].images.length == 3)
							document.getElementById("requirements_addPhotoBlock_"+id).children[0].style.display = "none";
						else
							document.getElementById("requirements_addPhotoBlock_"+id).children[0].style.display = "flex";					
					}
					break;
				case "":
					var id = Number(input.parentElement.parentElement.parentElement.parentElement.id.substring(21));
					if(protocolRequirements.fractions[id-1].images.length < 3){
						var clone = document.getElementById("requirementsFraction_"+id).children[0].children[0].children[3].children[2].cloneNode(true);
						clone.style.display = "flex";
						clone.id = "requirementsFraction_"+id+"_photo_"+(protocolRequirements.fractions[id-1].images.length + 1);
						clone.children[0].children[0].src = this.result;
						
						document.getElementById("requirementsFraction_"+id).children[0].children[0].children[3].appendChild(clone);
						clone.children[0].addEventListener("click", function(){
							editPhoto(clone.id, img);
						});
						clone.children[1].addEventListener("click", function(){
							deleateRequirementsFractionsPhoto(clone.id);
						});
						
						protocolRequirements.fractions[id-1].images.push(img.src);
						
						if(protocolRequirements.fractions[id-1].images.length == 3){
							document.getElementById("requirementsFraction_"+id).children[0].children[0].children[3].children[0].style.display = "none";
							document.getElementById("requirementsFraction_"+id).children[0].children[0].children[3].children[1].style.display = "none";
						}
						else{
							document.getElementById("requirementsFraction_"+id).children[0].children[0].children[3].children[0].style.display = "flex";
							document.getElementById("requirementsFraction_"+id).children[0].children[0].children[3].children[1].style.display = "flex";
						}
					}
					break;
			}
		}
		try{
			reader.readAsDataURL(selectedFile);
			input.value = "";
		}
		catch{
			
		}
	});
}
//Функции добавления картинок
function addRequirementsSourcePhoto_1(){
	if(protocolRequirements.images.length == 0){
		requirementsSourceBlockComponents.children[2].lastElementChild.click();
	}
	else if(requirementsSourceBlockPhoto.style.display == "none"){
		requirementsSourceBlockPhoto.style.display = "flex";
		headerTooltip.children[1].style.display = "none";
		requirementsSourceBlockComponents.children[2].style.zIndex = 2;
		requirementsSourceBlockPhoto.style.zIndex = 2;
		overlayDisplayBlcok.style.zIndex = 1;
	}
	else if(requirementsSourceBlockPhoto.style.display == "flex"){
		requirementsSourceBlockPhoto.style.display = "none";
		headerTooltip.children[1].style.display = "";
		requirementsSourceBlockComponents.children[2].style.zIndex = 0;
		requirementsSourceBlockPhoto.style.zIndex = 0;
		overlayDisplayBlcok.style.zIndex = 0;
	}
	
	if(protocolRequirements.images.length == 3){
		requirementsSourceBlockPhoto.children[0].style.display = "none";
		requirementsSourceBlockPhoto.children[1].style.display = "none";
	}
	else{
		requirementsSourceBlockPhoto.children[0].style.display = "flex";
		requirementsSourceBlockPhoto.children[1].style.display = "flex";
	}
}
function addRequirementsSourcePhoto_2(){
	requirementsSourceBlockComponents.children[2].lastElementChild.click();
}

function addRequirementsItemSourcePhoto_1(id){
	var item_source = document.getElementById("requirements_item_source_"+id);
	var addPhotoBlock = document.getElementById("requirements_addPhotoBlock_"+id);
		
	if(protocolRequirements.components[id-1].images.length == 0){
		item_source.lastElementChild.click();
	}
	else if(addPhotoBlock.style.display == "none"){
		addPhotoBlock.style.display = "flex";
		headerTooltip.children[1].style.display = "none";
		addPhotoBlock.style.zIndex = 2;
		item_source.style.zIndex = 2;
		overlayDisplayBlcok.style.zIndex = 1;
	}
	else if(addPhotoBlock.style.display == "flex"){
		addPhotoBlock.style.display = "none";
		headerTooltip.children[1].style.display = "";
		addPhotoBlock.style.zIndex = 0;
		item_source.style.zIndex = 0;
		overlayDisplayBlcok.style.zIndex = 0;		
	}
	
	if(protocolRequirements.components[id-1].images.length == 3){
		document.getElementById("requirements_addPhotoBlock_"+id).children[0].style.display = "none";
	}
	else{
		document.getElementById("requirements_addPhotoBlock_"+id).children[0].style.display = "flex";
	}
}
function addRequirementsItemSourcePhoto_2(id){
	var item_source = document.getElementById("requirements_item_source_"+id);
	item_source.lastElementChild.click();
}

function addRequirementsFractionPhoto_1(id){
	var fractionBlock = document.getElementById("requirementsFraction_"+id).children[0].children[0].children[2];
	var addPhotoBlock = document.getElementById("requirementsFraction_"+id).children[0].children[0].children[3];
		
	if(protocolRequirements.fractions[id-1].images.length == 0){
		fractionBlock.lastElementChild.click();
	}
	else if(addPhotoBlock.style.display == "none"){
		addPhotoBlock.style.display = "flex";
		headerTooltip.children[1].style.display = "none";
		addPhotoBlock.style.zIndex = 2;
		fractionBlock.style.zIndex = 2;
		overlayDisplayBlcok.style.zIndex = 1;
	}
	else if(addPhotoBlock.style.display == "flex"){
		addPhotoBlock.style.display = "none";
		headerTooltip.children[1].style.display = "";
		addPhotoBlock.style.zIndex = 0;
		fractionBlock.style.zIndex = 0;
		overlayDisplayBlcok.style.zIndex = 0;		
	}
	
	if(protocolRequirements.fractions[id-1].images.length == 3){
		addPhotoBlock.children[0].style.display = "none";
		addPhotoBlock.children[1].style.display = "none";
	}
	else{
		addPhotoBlock.children[0].style.display = "flex";
		addPhotoBlock.children[1].style.display = "flex";
	}
}
function addRequirementsFractionPhoto_2(id){
	var fractionBlock = document.getElementById("requirementsFraction_"+id).children[0].children[0].children[2];
	fractionBlock.lastElementChild.click();
}
//функции удаления картинок
function deleateRequirementsSourceBlockPhoto(id_value){
	var id = Number(id_value.substring(24));
	protocolRequirements.images.splice(id-1,1);
	
	document.getElementById(id_value).remove();
	
	requirementsSourceBlockPhoto.children[0].style.display = "flex";
	requirementsSourceBlockPhoto.children[1].style.display = "flex";	
	
	//замена айдишников фотографий(для последующих удалений)
	for(var id=1; id<=protocolRequirements.images.length; id++){
		requirementsSourceBlockPhoto.children[2+id].id = "requirementsSourcePhoto_"+id;
	}	
	//отображение объектов для добавления(камера)
	if(protocolRequirements.images.length > 0){
		requirementsSourceBlockPhoto.style.display = "flex";
		headerTooltip.children[1].style.display = "none";
		
		requirementsSourceBlockComponents.children[2].children[1].children[0].children[0].src = protocolRequirements.images[protocolRequirements.images.length-1];
	}
	else{
		requirementsSourceBlockPhoto.style.display = "none";
		headerTooltip.children[1].style.display = "";
		requirementsSourceBlockComponents.children[0].style.zIndex = 0;
		requirementsSourceBlockPhoto.style.zIndex = 0;
		overlayDisplayBlcok.style.zIndex = 0;
		requirementsSourceBlockComponents.children[2].children[1].children[0].children[0].src = "/static/img/req/photo.png";
	}
}
function deleateRequirementsItemSourcePhoto(id_value){
	var item_id = Number(id_value.substr(25,1));
	var photo_id = Number(id_value.substr(33,1));
	
	protocolRequirements.components[item_id-1].images.splice((photo_id-1),1);
	document.getElementById(id_value).remove();
	
	document.getElementById("requirements_addPhotoBlock_"+item_id).children[0].style.display = "flex";
	//замена айдишников фотографий(для последующих удалений)
	for(var id=1; id<=protocolRequirements.components[item_id-1].images.length; id++){
		document.getElementById("requirements_addPhotoBlock_"+item_id).children[id+1].id = "requirements_item_source_"+item_id+"_photo_"+id;
	}
	//отображение объектов для добавления(камера)
	if(protocolRequirements.components[item_id-1].images.length > 0){
		document.getElementById("requirements_addPhotoBlock_"+item_id).style.display = "flex";
		headerTooltip.children[1].style.display = "none";
		document.getElementById("requirements_item_source_"+item_id).children[2].children[0].children[0].src = protocolRequirements.components[item_id-1].images[protocolRequirements.components[item_id-1].images.length-1];
	}
	else{
		document.getElementById("requirements_addPhotoBlock_"+item_id).style.display  = "none";
		headerTooltip.children[1].style.display = "";
		document.getElementById("requirements_addPhotoBlock_"+item_id).style.zIndex = 0;
		document.getElementById("requirements_item_source_"+item_id).style.zIndex = 0;
		overlayDisplayBlcok.style.zIndex = 0;		
		document.getElementById("requirements_item_source_"+item_id).children[2].children[0].children[0].src = "/static/img/req/photo.png";
	}
}
function deleateRequirementsFractionsPhoto(id_value){
	var item_id = Number(id_value.substr(21,1));
	var photo_id = Number(id_value.substr(29,1));

	var fractionBlock = document.getElementById("requirementsFraction_"+item_id).children[0].children[0].children[2];
	var addPhotoBlock = document.getElementById("requirementsFraction_"+item_id).children[0].children[0].children[3];	
	
	protocolRequirements.fractions[item_id-1].images.splice((photo_id-1),1);
	document.getElementById(id_value).remove();
	
	addPhotoBlock.children[0].style.display = "flex";
	addPhotoBlock.children[1].style.display = "flex";	
	//замена айдишников фотографий(для последующих удалений)
	for(var id=1; id<=protocolRequirements.fractions[item_id-1].images.length; id++){
		addPhotoBlock.children[2+id].id = "requirementsFraction_"+item_id+"_photo_"+id;
	}
	//отображение объектов для добавления(камера)
	if(protocolRequirements.fractions[item_id-1].images.length > 0){
		addPhotoBlock.style.display = "flex";
		headerTooltip.children[1].style.display = "none";
		fractionBlock.children[4].children[0].children[0].children[0].src = protocolRequirements.fractions[item_id-1].images[protocolRequirements.fractions[item_id-1].images.length-1];
	}
	else{
		addPhotoBlock.style.display  = "none";
		headerTooltip.children[1].style.display = "";
		addPhotoBlock.style.zIndex = 0;
		fractionBlock.style.zIndex = 0;
		overlayDisplayBlcok.style.zIndex = 0;		
		fractionBlock.children[4].children[0].children[0].children[0].src = "/static/img/req/photo.png";
	}
}
//Функция настройки
function requirementsAddFileChange(){
	requirementsSourceBlockInput = requirementsSourceBlockComponents.children[2].lastElementChild;
	requirementsSourceBlockImage = requirementsSourceBlockComponents.children[2].children[1].children[0].children[0];
	
	requirements_file_img_change(requirementsSourceBlockInput,requirementsSourceBlockImage);
}
//Функция отображения сохраненных изображений
function setupRequirementsSourceProductImage(){
	//Добавление основной картинки фотографии
	if(protocolRequirements.images.length > 0)
		requirementsSourceBlockComponents.children[2].children[1].children[0].children[0].src = protocolRequirements.images[protocolRequirements.images.length-1];
	//Проверка числа фотографий для сокрытия кнопки добавление новых фоток
	if(protocolRequirements.images.length == 3){
		requirementsSourceBlockPhoto.children[0].style.display = "none";
		requirementsSourceBlockPhoto.children[1].style.display = "none";
	}
	else{
		requirementsSourceBlockPhoto.children[0].style.display = "flex";
		requirementsSourceBlockPhoto.children[1].style.display = "flex";
	}
		
	//Создание Объетов для фоток
	for(var i = 0; i < protocolRequirements.images.length; i++){
		var clone = requirementsSourceBlockPhoto.children[2].cloneNode(true);
		clone.style.display = "flex";
		clone.id = "requirementsSourcePhoto_" + Number(i + 1);
		clone.children[0].children[0].src = protocolRequirements.images[i];
		
		requirementsSourceBlockPhoto.appendChild(clone);
		clone.children[0].addEventListener("click",
			requirementsSourceImageAddEventFunction(clone.id.substring(24) ,"edit"));
		clone.children[1].addEventListener("click",
			requirementsSourceImageAddEventFunction(clone.id.substring(24),"deleate"));
	}
}
function setupRequirementsComponentImage(id){
	//Получение объектов
	var componentElement = document.getElementById("requirements_item_source_" + Number(id+1));
	var componentMainPhoto = componentElement.children[2].children[0].children[0];
	var componentAddPhotoBlock = document.getElementById("requirements_addPhotoBlock_" + Number(id+1));
		
	//Добавление основной картинки фотографии
	if(protocolRequirements.components[id].images.length > 0)
		componentMainPhoto.src = protocolRequirements.components[id].images[protocolRequirements.components[id].images.length-1];
	//Проверка числа фотографий для сокрытия кнопки добавление новых фоток
	if(protocolRequirements.components[id].images.length == 3)
		componentAddPhotoBlock.children[0].style.display = "none";
	else
		componentAddPhotoBlock.children[0].style.display = "flex";
	//Создание Объектов фотографий
	for(var i = 0; i < protocolRequirements.components[id].images.length; i++){
		var clone = componentAddPhotoBlock.children[1].cloneNode(true);
		clone.style.display = "flex";
		clone.id = "requirements_item_source_" + Number(id + 1) + "_photo_" + Number(i + 1);
		clone.children[0].children[0].src = protocolRequirements.components[id].images[i];
		
		componentAddPhotoBlock.appendChild(clone);
		clone.children[0].addEventListener("click",
				requirementsItemSourceImageAddEventFunction(clone.id.substring(25,26),clone.id.substring(33,34),"edit"));
		clone.children[1].addEventListener("click",
				requirementsItemSourceImageAddEventFunction(clone.id.substring(25,26),clone.id.substring(33,34),"deleate"));	
	}
}
function setupRequirementsFractionImages(id){
	//Получение объектов
	var fractionElement = document.getElementById("requirementsFraction_"+Number(id + 1)).children[0].children[0].children[2];
	var fractionMainPhoto = fractionElement.children[4].children[0].children[0].children[0];
	var fractionAddBlockPthoto = document.getElementById("requirementsFraction_" + Number(id + 1)).children[0].children[0].children[3];
	
	//Добавление основной картинки фотографии
	if(protocolRequirements.fractions[id].images.length > 0)
		fractionMainPhoto.src = protocolRequirements.fractions[id].images[protocolRequirements.fractions[id].images.length-1];
	//Проверка числа фотографий для сокрытия кнопки добавление новых фоток
	if(protocolRequirements.fractions[id].images.length == 3){
		fractionAddBlockPthoto.children[0].style.display = "none";
		fractionAddBlockPthoto.children[1].style.display = "none";
	}
	else{
		fractionAddBlockPthoto.children[0].style.display = "flex";
		fractionAddBlockPthoto.children[1].style.display = "flex";
	}
	//Создание Объектов фотографий
	for(var i = 0; i < protocolRequirements.fractions[id].images.length; i++){
		var clone = fractionAddBlockPthoto.children[2].cloneNode(true);
		clone.style.display = "flex";
		clone.id = "requirementsFraction_" + Number(id + 1) + "_photo_" + Number(i + 1);
		clone.children[0].children[0].src = protocolRequirements.fractions[id].images[i];
		
		fractionAddBlockPthoto.appendChild(clone);
		clone.children[0].addEventListener("click",
				requirementsFractionImageAddEventFunction(clone.id.substring(21,22),clone.id.substring(29,30),"edit"));
		clone.children[1].addEventListener("click",
				requirementsFractionImageAddEventFunction(clone.id.substring(21,22),clone.id.substring(29,30),"deleate"));
	}
}
function requirementsSourceImageAddEventFunction(i,type){
	return function(e){
		switch(type){
			case "edit":
				editPhoto(document.getElementById("requirementsSourcePhoto_"+i).id, requirementsSourceBlockComponents.children[2].children[1].children[0].children[0]);
				break;
			case "deleate":
				deleateRequirementsSourceBlockPhoto("requirementsSourcePhoto_"+i);
				break;
		}
	}
}
function requirementsItemSourceImageAddEventFunction(i,j,type){
	return function(e){
		switch(type){
			case "edit":
				editPhoto(document.getElementById("requirements_item_source_"+i+"_photo_"+j).id, document.getElementById("requirements_item_source_"+i).children[2].children[0].children[0]);
				break;
			case "deleate":
				deleateRequirementsItemSourcePhoto("requirements_item_source_"+i+"_photo_"+j);
				break;
		}
	}
}
function requirementsFractionImageAddEventFunction(i,j,type){
	return function(e){
		switch(type){
			case "edit":
				editPhoto(document.getElementById("requirementsFraction_"+i+"_photo_"+j).id, 
				document.getElementById("requirementsFraction_"+i).children[0].children[0].children[1].children[4].children[0].children[0].children[0]);
				break;
			case "deleate":
				deleateRequirementsFractionsPhoto("requirementsFraction_"+i+"_photo_"+j);
				break;
		}
	}
}

function setupRequirementsClassifierSourceProduct(){
	//Начальная Установка Классификатора
	requirementsProductClassifier.children[0].children[5].children[0].children[0].value = protocolRequirements.classifier.classifierType;
	requirementsClassifierSourceChangeType();
	
	//Элементы класиификатора продукта
	var IndustryElement = requirementsProductClassifier.children[0].children[0].children[1].children[0];
	var ProductGroupElement = requirementsProductClassifier.children[0].children[0].children[3].children[0];
	var ProductElement = requirementsProductClassifier.children[0].children[0].children[5].children[0];
	var ProductDescription = requirementsProductClassifier.children[0].children[0].children[7].children[0];
	var ProductTypeElement = requirementsProductClassifier.children[0].children[0].children[9].children[0];
	var PurposeElement = requirementsProductClassifier.children[0].children[0].children[13].children[0];
	//Элементы класиификатора засорителя
	var IndustryWeedElement = requirementsProductClassifier.children[0].children[2].children[1].children[0];
	var CategoryElement = requirementsProductClassifier.children[0].children[2].children[3].children[0];
	var ClassWeedElement = requirementsProductClassifier.children[0].children[2].children[5].children[0];
	var WeedElement = requirementsProductClassifier.children[0].children[2].children[7].children[0];
	var DescriptionElement = requirementsProductClassifier.children[0].children[2].children[9].children[0];
	
	switch(protocolRequirements.classifier.classifierType){
		case 0:
			//Переключение на панель добавления Компонента
			if(protocolRequirements.classifier.classifierProduct.useADD){
				requirementsClassifierSourceProductViewADD();
				
				requirementsProductClassifier.children[0].children[1].children[1].children[0].value = protocolRequirements.classifier.classifierProduct.addClassifier.industry
				requirementsProductClassifier.children[0].children[1].children[3].children[0].value = protocolRequirements.classifier.classifierProduct.addClassifier.groupProduct
				requirementsProductClassifier.children[0].children[1].children[5].children[0].value = protocolRequirements.classifier.classifierProduct.addClassifier.product
				requirementsProductClassifier.children[0].children[1].children[7].children[0].value = protocolRequirements.classifier.classifierProduct.addClassifier.description
				requirementsProductClassifier.children[0].children[1].children[9].children[0].value = protocolRequirements.classifier.classifierProduct.addClassifier.purpose
				requirementsProductClassifier.children[0].children[1].children[11].children[0].value = protocolRequirements.classifier.classifierProduct.addClassifier.productSort
				requirementsProductClassifier.children[0].children[1].children[13].children[0].value = protocolRequirements.classifier.classifierProduct.addClassifier.productType
				
				requirementsClassifierSourceNewProductADD();
			}
			else{
				//Установка ID
				requirementsProductClassifier.children[0].children[0].children[1].children[0].value = protocolRequirements.classifier.classifierProduct.mainClassifier.industryID;
				clearClassifierSelect(ProductDescription);
				clearClassifierSelect(ProductGroupElement);
				clearClassifierSelect(ProductElement);
				clearClassifierSelect(ProductTypeElement);
				clearClassifierSelect(PurposeElement);		
				
				if(IndustryElement.value == 0)
					requirementsSourceProductSetupProductGroup();
				
				requirementsProductClassifier.children[0].children[0].children[3].children[0].value = protocolRequirements.classifier.classifierProduct.mainClassifier.groupProductID;
				clearClassifierSelect(ProductElement);
				clearClassifierSelect(ProductTypeElement);
				clearClassifierSelect(PurposeElement);
				
				if(ProductGroupElement.value != 9999){
					requirementsSourceProductSetupProduct();
					requirementsSourceProductSetupPurpose();
					updateFractionPurposeSelect();
				}
					
				requirementsProductClassifier.children[0].children[0].children[5].children[0].value = protocolRequirements.classifier.classifierProduct.mainClassifier.productID;
				clearClassifierSelect(ProductTypeElement);
					
				if(ProductElement.value != 9999){
					requirementsSourceProductSetupProductType();
				}
					
				requirementsProductClassifier.children[0].children[0].children[7].children[0].value = protocolRequirements.classifier.classifierProduct.mainClassifier.descriptionID;
				requirementsProductClassifier.children[0].children[0].children[9].children[0].value = protocolRequirements.classifier.classifierProduct.mainClassifier.productTypeID;
				requirementsProductClassifier.children[0].children[0].children[11].children[0].value = protocolRequirements.classifier.classifierProduct.mainClassifier.productSortID;
				requirementsProductClassifier.children[0].children[0].children[13].children[0].value = protocolRequirements.classifier.classifierProduct.mainClassifier.purposeID;
				requirementsProductClassifier.children[0].children[0].children[15].children[0].value = protocolRequirements.classifier.classifierProduct.mainClassifier.GOST_ID;
				
				requirementsClassifierSourceGOST(ProductElement.value,PurposeElement.value);
				requirementsClassifierProductEdit();
			}
			break;
		case 1:
			//Переключение на панель добавления Компонента
			if(protocolRequirements.classifier.classifierWeed.useADD){
				requirementsClassifierSourceWeedViewADD();
				
				requirementsProductClassifier.children[0].children[3].children[1].children[0].value = protocolRequirements.classifier.classifierWeed.addClassifier.industry;
				requirementsProductClassifier.children[0].children[3].children[3].children[0].value = protocolRequirements.classifier.classifierWeed.addClassifier.category;
				requirementsProductClassifier.children[0].children[3].children[5].children[0].value = protocolRequirements.classifier.classifierWeed.addClassifier.classWeed;
				requirementsProductClassifier.children[0].children[3].children[7].children[0].value = protocolRequirements.classifier.classifierWeed.addClassifier.weedName;
				requirementsProductClassifier.children[0].children[3].children[9].children[0].value = protocolRequirements.classifier.classifierWeed.addClassifier.description;		
				
				requirementsClassifierSourceNewWeedADD();
			}
			else{
				//Установка ID
				requirementsProductClassifier.children[0].children[2].children[1].children[0].value = protocolRequirements.classifier.classifierWeed.mainClassifier.industryID;
				clearClassifierSelect(CategoryElement);
				clearClassifierSelect(ClassWeedElement);
				clearClassifierSelect(WeedElement);
				clearClassifierSelect(DescriptionElement);
				
				if(IndustryWeedElement.value == 0)
					requirementsSourceProductSetupCategory();
				
				requirementsProductClassifier.children[0].children[2].children[3].children[0].value = protocolRequirements.classifier.classifierWeed.mainClassifier.categoryID;
				clearClassifierSelect(ClassWeedElement);
				clearClassifierSelect(WeedElement);
				clearClassifierSelect(DescriptionElement);
		
				if(CategoryElement.value != 9999)
					requirementsSourceProductSetupClassWeed();
				
				requirementsProductClassifier.children[0].children[2].children[5].children[0].value = protocolRequirements.classifier.classifierWeed.mainClassifier.classWeedID;
				clearClassifierSelect(WeedElement);
				clearClassifierSelect(DescriptionElement);
		
				if(ClassWeedElement.value != 9999){
					requirementsSourceProductSetupWeed();
					requirementsSourceProductSetupDescriptionWeeed();
				}
				
				requirementsProductClassifier.children[0].children[2].children[7].children[0].value = protocolRequirements.classifier.classifierWeed.mainClassifier.weedNameID;
				requirementsProductClassifier.children[0].children[2].children[9].children[0].value = protocolRequirements.classifier.classifierWeed.mainClassifier.descriptionID;
				
				requirementsClassifierProductEdit();
			}
			break;
	}
}
function setupRequirementsClassifierComponents(id){
	var selectElementSource = document.getElementById("requirements_item_source_"+id).children[1].children[0].children[0];
	var classifier = document.getElementById("requirements_classifier_"+id);

	classifier.children[0].children[5].children[0].children[0].value = protocolRequirements.components[id-1].classifier.classifierType;
	requirementsClassifierSourceCompanentChangeType(id);
	
	//Элементы класиификатора продукта
	var IndustryElement = classifier.children[0].children[0].children[1].children[0];
	var ProductGroupElement = classifier.children[0].children[0].children[3].children[0];
	var ProductDescription = classifier.children[0].children[0].children[7].children[0];
	var ProductElement = classifier.children[0].children[0].children[5].children[0];
	var ProductTypeElement = classifier.children[0].children[0].children[9].children[0];
	//Элементы класиификатора засорителя
	var IndustryWeedElement = classifier.children[0].children[2].children[1].children[0];
	var CategoryElement = classifier.children[0].children[2].children[3].children[0];
	var ClassWeedElement = classifier.children[0].children[2].children[5].children[0];
	var WeedElement = classifier.children[0].children[2].children[7].children[0];
	var DescriptionElement = classifier.children[0].children[2].children[9].children[0];
	
	switch(protocolRequirements.components[id-1].classifier.classifierType){
		case 0:
			//Переключение на панель добавления Компонента
			if(protocolRequirements.components[id-1].classifier.classifierProduct.useADD){
				requirementsClassifierSourceComponentProductVidewADD(id);
				
				//Установка дополнительных значений
				classifier.children[0].children[1].children[1].children[0].value = protocolRequirements.components[id-1].classifier.classifierProduct.addClassifier.industry;
				classifier.children[0].children[1].children[3].children[0].value = protocolRequirements.components[id-1].classifier.classifierProduct.addClassifier.groupProduct;
				classifier.children[0].children[1].children[5].children[0].value = protocolRequirements.components[id-1].classifier.classifierProduct.addClassifier.product;
				classifier.children[0].children[1].children[7].children[0].value = protocolRequirements.components[id-1].classifier.classifierProduct.addClassifier.description;
				classifier.children[0].children[1].children[9].children[0].value = protocolRequirements.components[id-1].classifier.classifierProduct.addClassifier.productType;
				classifier.children[0].children[1].children[11].children[0].value = protocolRequirements.components[id-1].classifier.classifierProduct.addClassifier.productSort;
				
				requirementsClassifierSourceComponentNewProductADD(id);
			}
			else{
				//Установка ID
				classifier.children[0].children[0].children[1].children[0].value = protocolRequirements.components[id-1].classifier.classifierProduct.mainClassifier.industryID;
				clearClassifierSelect(ProductDescription);
				clearClassifierSelect(ProductGroupElement);
				clearClassifierSelect(ProductElement);
				clearClassifierSelect(ProductTypeElement);

				if(IndustryElement.value == 0)
					requirementsSourceComponentsSetupProductGroup(id);
				
				classifier.children[0].children[0].children[3].children[0].value = protocolRequirements.components[id-1].classifier.classifierProduct.mainClassifier.groupProductID;
				clearClassifierSelect(ProductElement);
				clearClassifierSelect(ProductTypeElement);
				
				if(ProductGroupElement.value != 9999)
					requirementsSourceComponentsSetupProduct(id);
				
				if(protocolRequirements.components[id-1].classifier.classifierProduct.mainClassifier.productID == list_product.length-1){
					
					protocolRequirements.components[id-1].other_check = true;
					requirementsComponentsOtherID = id;
					
					var componentItem = document.getElementById("requirements_item_source_" + requirementsComponentsOtherID);
					var componentSelectedValue = componentItem.children[1].children[0].children[1].children[0];
					var componentSlider = componentItem.children[1].children[1].children[0];
					
					//Добавление-Удаление функций
					componentSelectedValue.addEventListener("change",calculation_other);
					componentSlider.addEventListener("input",calculation_other);
					
					componentSelectedValue.removeEventListener("change", checkRequirementsComponents);
					componentSlider.removeEventListener("input", checkRequirementsComponents);
					
					var option = document.createElement('option');
					option.textContent = list_product[list_product.length-1].productName;
					option.value = list_product[list_product.length-1].id_product;
					ProductElement.add(option);
					
					//Добавим функции обработки прочего.
					for(var k = 1; k <= protocolRequirements.fractions.length; k++){
						var componentFractionElement =  document.getElementById("requirementsFraction_"+k+"_item_source_"+id);
						var componentFractionSelectedValue = componentFractionElement.children[1].children[0].children[1].children[0];
						var componentFractionSlider = componentFractionElement.children[1].children[1].children[0];
						
						//Удаление слушателей с компонентов
						componentFractionSelectedValue.replaceWith(componentSelectedValue.cloneNode(false));
						componentFractionSlider.replaceWith(componentSlider.cloneNode(false));
					}
					for(var k = 1; k <= protocolRequirements.fractions.length; k++){
						var componentFractionElement =  document.getElementById("requirementsFraction_"+k+"_item_source_"+id);
						var componentFractionSelectedValue = componentFractionElement.children[1].children[0].children[1].children[0];
						var componentFractionSlider = componentFractionElement.children[1].children[1].children[0];
						
						componentFractionSelectedValue.addEventListener("change", returnedFractionSelectedValueListeners(k,id), "main");
						componentFractionSlider.addEventListener("input", returnedFractionSliderValueListeners(k,id), "main");
						addCalculationFractionsComponents(k,id);
					}
					
					
				}
				classifier.children[0].children[0].children[5].children[0].value = protocolRequirements.components[id-1].classifier.classifierProduct.mainClassifier.productID;
				clearClassifierSelect(ProductTypeElement);
				
				if(ProductElement.value != 9999){
					requirementsSourceComponentsSetupProductType(id);
				}
				
				classifier.children[0].children[0].children[7].children[0].value = protocolRequirements.components[id-1].classifier.classifierProduct.mainClassifier.descriptionID;
				classifier.children[0].children[0].children[9].children[0].value = protocolRequirements.components[id-1].classifier.classifierProduct.mainClassifier.productTypeID;
				classifier.children[0].children[0].children[11].children[0].value = protocolRequirements.components[id-1].classifier.classifierProduct.mainClassifier.productSortID;
				
				requirementsClassifierSourceComponentGOST(id,ProductElement.value,protocolRequirements.classifier.classifierProduct.mainClassifier.purposeID);
				requirementsClassifierComponentsEdit(id);
			}
			break;
		case 1:
			//Переключение на панель добавления Компонента
			if(protocolRequirements.components[id-1].classifier.classifierWeed.useADD){
				requirementsClassifierSourceComponentWeedVidewADD(id);
				
				//Установка дополнительных значений
				classifier.children[0].children[3].children[1].children[0].value = protocolRequirements.components[id-1].classifier.classifierWeed.addClassifier.industry;
				classifier.children[0].children[3].children[3].children[0].value = protocolRequirements.components[id-1].classifier.classifierWeed.addClassifier.category;
				classifier.children[0].children[3].children[5].children[0].value = protocolRequirements.components[id-1].classifier.classifierWeed.addClassifier.classWeed;
				classifier.children[0].children[3].children[7].children[0].value = protocolRequirements.components[id-1].classifier.classifierWeed.addClassifier.weedName;
				classifier.children[0].children[3].children[9].children[0].value = protocolRequirements.components[id-1].classifier.classifierWeed.addClassifier.description;
				
				requirementsClassifierSourceComponentNewWeedADD(id);
			}
			else{
				//Установка ID
				classifier.children[0].children[2].children[1].children[0].value = protocolRequirements.components[id-1].classifier.classifierWeed.mainClassifier.industryID;
				clearClassifierSelect(CategoryElement);
				clearClassifierSelect(ClassWeedElement);
				clearClassifierSelect(WeedElement);
				clearClassifierSelect(DescriptionElement);
			
				if(IndustryWeedElement.value == 0)
					requirementsSourceComponentsSetupCategory(id);
				
				classifier.children[0].children[2].children[3].children[0].value = protocolRequirements.components[id-1].classifier.classifierWeed.mainClassifier.categoryID;
				clearClassifierSelect(ClassWeedElement);
				clearClassifierSelect(WeedElement);
				clearClassifierSelect(DescriptionElement);
				
				if(CategoryElement.value != 9999)
					requirementsSourceComponentsSetupClassWeed(id);
				
				classifier.children[0].children[2].children[5].children[0].value = protocolRequirements.components[id-1].classifier.classifierWeed.mainClassifier.classWeedID;
				clearClassifierSelect(WeedElement);
				clearClassifierSelect(DescriptionElement);
				
				if(ClassWeedElement.value != 9999){
					requirementsSourceComponentsSetupWeed(id);
					requirementsSourceComponentsSetupDescriptionWeeed(id);
				}
				
				classifier.children[0].children[2].children[7].children[0].value = protocolRequirements.components[id-1].classifier.classifierWeed.mainClassifier.weedNameID;
				classifier.children[0].children[2].children[9].children[0].value = protocolRequirements.components[id-1].classifier.classifierWeed.mainClassifier.descriptionID;
				
				requirementsClassifierComponentsEdit(id);
			}
			break;
	}
}
//Прочие
function returnRequirementsSelect(id_components){
	return function e(){
		var componentRequirementsElement =  document.getElementById("requirements_item_source_"+Number(id_components+1));
		var componentRequirementsSelectedValue = componentRequirementsElement.children[1].children[0].children[1].children[0];
		var componentRequirementsSlider = componentRequirementsElement.children[1].children[1].children[0];
			
		chengeTypeOfValue(protocolRequirements, protocolRequirements.components[id_components], componentRequirementsSelectedValue);
		SliderEdit(componentRequirementsSelectedValue,componentRequirementsSlider);
		updateRequirementsComponents(id_components+1);
		
		if(requirementsComponentsOtherID != id_components+1)
			calculation_main(id_components+1);
		else
			calculation_other(id_components+1);
	}
}
function returnRequirementsSlider(id_components){
	return function e(){
		var componentRequirementsElement =  document.getElementById("requirements_item_source_"+Number(id_components+1));
		var componentRequirementsSelectedValue = componentRequirementsElement.children[1].children[0].children[1].children[0];
		var componentRequirementsSlider = componentRequirementsElement.children[1].children[1].children[0];
				
		InputEdit(componentRequirementsSelectedValue,componentRequirementsSlider);
		updateRequirementsComponents(id_components+1);
		
		if(requirementsComponentsOtherID != id_components+1)
			calculation_main(id_components+1);
		else
			calculation_other(id_components+1);
	}
}
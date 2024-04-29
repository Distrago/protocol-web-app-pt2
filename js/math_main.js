var requirementsComponentsOtherID = null;
var protocolComponentsOtherID = null;

//Изменение компонетов требований
function checkRequirementsComponents(){
	var sum = 0;
	for(var i = 0; i < protocolRequirements.components.length; i++){
		if(!protocolRequirements.components[i].other_check)
			sum += Number(protocolRequirements.components[i].value);
	}
	
	//Проверка создания удаления
	if(sum < 100 && requirementsComponentsOtherID == null){
		addOtherRequirementsComponents();
	}
	else if(requirementsComponentsOtherID != null && protocolRequirements.components[requirementsComponentsOtherID-1].value == 0){
		deleatComponent(requirementsComponentsOtherID);
		requirementsComponentsOtherID = null;
	}
	//Проверка изменения
	if(sum < 100 && requirementsComponentsOtherID != null){
		var value = 100 - sum;
		editRequirementsComponentsValue(requirementsComponentsOtherID,value);
	}
}
function sumComponentSourceProduct(){
	var sumComponent = 0;
	for(var i = 0; i < protocolRequirements.components.length; i++)
		sumComponent += Number(protocolRequirements.components[i].value);
	return sumComponent;
}
function calculation_main(id_component){
	
	if(protocolRequirements.components[id_component-1].flag_2){
		var sum = sumComponentSourceProduct();
		if(requirementsComponentsOtherID != null && id_component != requirementsComponentsOtherID){		
			var value = protocolRequirements.components[requirementsComponentsOtherID-1].value - (sumComponentSourceProduct() - 100);
			editRequirementsComponentsValue(requirementsComponentsOtherID,value);
			var value = protocolRequirements.components[0].value - (sumComponentSourceProduct() - 100);
			editRequirementsComponentsValue(1,value);
			var value = protocolRequirements.components[id_component-1].value - (sumComponentSourceProduct() - 100);
			editRequirementsComponentsValue(id_component,value);
		}
		else if(id_component != 1 && id_component != requirementsComponentsOtherID){
			var value = protocolRequirements.components[0].value - (sumComponentSourceProduct() - 100);
			editRequirementsComponentsValue(1,value);
			var value = protocolRequirements.components[id_component-1].value - (sumComponentSourceProduct() - 100);
			editRequirementsComponentsValue(id_component,value);
		}
		else if(sum > 100 && id_component != requirementsComponentsOtherID){
			var max_components = protocolRequirements.components.length;
			var value = protocolRequirements.components[max_components-1].value - (sumComponentSourceProduct() - 100);
			editRequirementsComponentsValue(max_components,value);
			var value = protocolRequirements.components[0].value - (sumComponentSourceProduct() - 100);
			editRequirementsComponentsValue(1,value);
		}
	}
}
function removeMainRequirementsComponents(id_component){
	if(requirementsComponentsOtherID != null){
		var value = Number(protocolRequirements.components[requirementsComponentsOtherID-1].value) + Number(protocolRequirements.components[id_component].value);
		editRequirementsComponentsValue(requirementsComponentsOtherID,value);
		
		for(var i = 0; i<protocolRequirements.fractions.length; i++){
			var value_fraction = Number(protocolRequirements.fractions[i].components[requirementsComponentsOtherID-1].value) + Number(protocolRequirements.fractions[i].components[id_component].value);
			editFractionsComponentsValue(i+1,requirementsComponentsOtherID,value_fraction);
		}
	}
	else{
		var value = Number(protocolRequirements.components[0].value) + Number(protocolRequirements.components[id_component].value);
		editRequirementsComponentsValue(1,value);
		
		for(var i = 0; i<protocolRequirements.fractions.length; i++){
			var value_fraction = Number(protocolRequirements.fractions[i].components[0].value) + Number(protocolRequirements.fractions[i].components[id_component].value);
			editFractionsComponentsValue(i+1,1,value_fraction);
		}
	}
}
function calculation_other(){
	
	var value = protocolRequirements.components[0].value - (sumComponentSourceProduct() - 100);
	editRequirementsComponentsValue(1,value);
	var value = protocolRequirements.components[requirementsComponentsOtherID-1].value - (sumComponentSourceProduct() - 100);
	editRequirementsComponentsValue(requirementsComponentsOtherID,value);
	
	if(protocolRequirements.components[requirementsComponentsOtherID-1].value == 0){
		deleatComponent(requirementsComponentsOtherID);
		requirementsComponentsOtherID = null;
	}
}
function addOtherRequirementsComponents(){
	//Заранее задем id компонента под прочие;
	requirementsComponentsOtherID = protocolRequirements.components.length+1;
	
	addComponentRequirements();
	protocolRequirements.components[requirementsComponentsOtherID-1].other_check = true;
	
	var componentItem = document.getElementById("requirements_item_source_" + requirementsComponentsOtherID);
	var classifier = document.getElementById("requirements_classifier_" + requirementsComponentsOtherID);
	
	var componentSelectedValue = componentItem.children[1].children[0].children[1].children[0];
	var componentSlider = componentItem.children[1].children[1].children[0];
	var productElement = classifier.children[0].children[0].children[5].children[0];
	
	//Добавление опции прочее
	var option = document.createElement('option');
	option.textContent = list_product[list_product.length-1].productName;
	option.value = list_product[list_product.length-1].id_product;
	
	//Добавление-Удаление функций
	componentSelectedValue.addEventListener("change",calculation_other);
	componentSlider.addEventListener("input",calculation_other);
	
	componentSelectedValue.removeEventListener("change", checkRequirementsComponents);
	componentSlider.removeEventListener("input", checkRequirementsComponents);
	
	productElement.add(option);
	productElement.value = productElement.options[1].value;
	requirementsClassifierComponentsEdit(requirementsComponentsOtherID);
}
function removeOtherRequirementsComponents(){	
	var value = Number(protocolRequirements.components[0].value) + Number(protocolRequirements.components[requirementsComponentsOtherID-1].value);
	editRequirementsComponentsValue(1,value);
	
	for(var i = 0; i<protocolRequirements.fractions.length; i++){
		var value_fraction = Number(protocolRequirements.fractions[i].components[0].value) + Number(protocolRequirements.fractions[i].components[requirementsComponentsOtherID-1].value);
		editFractionsComponentsValue(i+1,1,value_fraction);
	}
	
	protocolRequirements.components[requirementsComponentsOtherID-1].other_check = false;
	requirementsComponentsOtherID = null;
}
function newRequirementsComponentsOtherID(){
	for(var i = 0; i < protocolRequirements.components.length; i++){
		if(protocolRequirements.components[i].other_check)
			requirementsComponentsOtherID = i+1;
	}
}
function changeRequirementsComponents(){
	var componentItem = document.getElementById("requirements_item_source_" + requirementsComponentsOtherID);
	
	var componentSelectedValue = componentItem.children[1].children[0].children[1].children[0];
	var componentSlider = componentItem.children[1].children[1].children[0];
	//Добавление-Удаление функций
	componentSelectedValue.addEventListener("change",checkRequirementsComponents);
	componentSlider.addEventListener("input",checkRequirementsComponents);
	
	componentSelectedValue.removeEventListener("change", calculation_other);
	componentSlider.removeEventListener("input", calculation_other);
	//Добавление-Удаление функций для фракций
	for(var i=0; i<protocolRequirements.fractions.length; i++){
		var componentFractionElement =  document.getElementById("requirementsFraction_"+Number(i+1)+"_item_source_"+requirementsComponentsOtherID);
		var componentFractionSelectedValue = componentFractionElement.children[1].children[0].children[1].children[0];
		var componentFractionSlider = componentFractionElement.children[1].children[1].children[0];
		
		componentFractionSelectedValue.replaceWith(componentFractionSelectedValue.cloneNode(false));
		componentFractionSlider.replaceWith(componentFractionSlider.cloneNode(false));
	}
	
	addNewFractionComponentListeners();
	
	protocolRequirements.components[requirementsComponentsOtherID-1].other_check = false;
	requirementsComponentsOtherID = null;
}
function editRequirementsComponentsValue(id,value){
	var componentElement =  document.getElementById("requirements_item_source_" + id);
	var componentSelectedValue = componentElement.children[1].children[0].children[1].children[0];
	var componentSlider = componentElement.children[1].children[1].children[0];
	
	
	componentSlider.value = value;
	componentSelectedValue.value = value;
	updateRequirementsComponents(id);
}
function sumComponentFraction(id_fraction){
	var sumComponent = 0;
	for(var i = 0; i < protocolRequirements.fractions[id_fraction-1].components.length; i++)
		sumComponent += Number(protocolRequirements.fractions[id_fraction-1].components[i].value);
	return sumComponent;
}

//Изменение компонентов фракций у требований
function fraction_calculation_main(id_fraction, id_component){
	if(requirementsComponentsOtherID != null){
		
		var value = protocolRequirements.fractions[id_fraction-1].components[requirementsComponentsOtherID-1].value - (sumComponentFraction(id_fraction) - 100);
		editFractionsComponentsValue(id_fraction,requirementsComponentsOtherID,value);
		var value = protocolRequirements.fractions[id_fraction-1].components[0].value - (sumComponentFraction(id_fraction) - 100);
		editFractionsComponentsValue(id_fraction,1,value);
		var value = protocolRequirements.fractions[id_fraction-1].components[id_component-1].value - (sumComponentFraction(id_fraction) - 100);
		editFractionsComponentsValue(id_fraction,id_component,value);
	}
	else{
		var max_components = protocolRequirements.fractions[id_fraction-1].components.length;
		if(id_component != max_components){
			var value = protocolRequirements.fractions[id_fraction-1].components[max_components-1].value - (sumComponentFraction(id_fraction) - 100);
			editFractionsComponentsValue(id_fraction,max_components,value);
			var value = protocolRequirements.fractions[id_fraction-1].components[0].value - (sumComponentFraction(id_fraction) - 100);
			editFractionsComponentsValue(id_fraction,1,value);
		}
		else{
			var value = protocolRequirements.fractions[id_fraction-1].components[0].value - (sumComponentFraction(id_fraction) - 100);
			editFractionsComponentsValue(id_fraction,1,value);
		}
		var value = protocolRequirements.fractions[id_fraction-1].components[id_component-1].value - (sumComponentFraction(id_fraction) - 100);
		editFractionsComponentsValue(id_fraction,id_component,value);
	}
}
function fraction_calculation_other(id_fraction, id_component){
	var value = protocolRequirements.fractions[id_fraction-1].components[0].value - (sumComponentFraction(id_fraction) - 100);
	editFractionsComponentsValue(id_fraction,1,value);
	var value = protocolRequirements.fractions[id_fraction-1].components[id_component-1].value - (sumComponentFraction(id_fraction) - 100);
	editFractionsComponentsValue(id_fraction,id_component,value);
}
function addCalculationFractionsComponents(id_fraction,id_component){
	var componentElement =  document.getElementById("requirementsFraction_"+id_fraction+"_item_source_"+id_component);
	var componentSelectedValue = componentElement.children[1].children[0].children[1].children[0];
	var componentSlider = componentElement.children[1].children[1].children[0];
			
	if(id_component != requirementsComponentsOtherID){
		componentSelectedValue.addEventListener("change", function(){
			if(protocolRequirements.components[id_component-1].flag_2)
				fraction_calculation_main(id_fraction, id_component);
		});
		componentSlider.addEventListener("input", function(){
			if(protocolRequirements.components[id_component-1].flag_2)
				fraction_calculation_main(id_fraction, id_component);
		});
	}
	else{
		componentSelectedValue.addEventListener("change", function(){
			fraction_calculation_other(id_fraction, id_component);
		});
		componentSlider.addEventListener("input", function(){
			fraction_calculation_other(id_fraction, id_component);
		});
	}
}
function addNewFractionComponentListeners(){
	for(var i=0; i<protocolRequirements.fractions.length; i++){
		var componentFractionElement =  document.getElementById("requirementsFraction_"+Number(i+1)+"_item_source_"+requirementsComponentsOtherID);
		var componentFractionSelectedValue = componentFractionElement.children[1].children[0].children[1].children[0];
		var componentFractionSlider = componentFractionElement.children[1].children[1].children[0];
			
		componentFractionSelectedValue.addEventListener("change", returnedFractionSelectedValueListeners(i+1,requirementsComponentsOtherID, "other"));
		componentFractionSlider.addEventListener("input", returnedFractionSliderValueListeners(i+1,requirementsComponentsOtherID, "other"));
	}
}
function returnedFractionSelectedValueListeners(id_fraction, id_component, check_flag){
	return function(e){
		var componentElement =  document.getElementById("requirementsFraction_"+id_fraction+"_item_source_"+id_component);
		var componentSelectedValue = componentElement.children[1].children[0].children[1].children[0];
		var componentSlider = componentElement.children[1].children[1].children[0];
		
		chengeTypeOfValue(protocolRequirements.fractions[id_fraction-1], protocolRequirements.fractions[id_fraction-1].components[id_component-1], componentSelectedValue);
		SliderEdit(componentSelectedValue,componentSlider);
		updateFractionComponents(id_fraction,id_component);
		
		if(check_flag == "other")
			fraction_calculation_main(id_fraction,id_component);
	}
}
function returnedFractionSliderValueListeners(id_fraction, id_component, check_flag){
	return function(e){
		var componentElement =  document.getElementById("requirementsFraction_"+id_fraction+"_item_source_"+id_component);
		var componentSelectedValue = componentElement.children[1].children[0].children[1].children[0];
		var componentSlider = componentElement.children[1].children[1].children[0];
		
		InputEdit(componentSelectedValue,componentSlider);
		updateFractionComponents(id_fraction,id_component);
		
		if(check_flag == "other")
			fraction_calculation_main(id_fraction,id_component);
	}
}
function editFractionsComponentsValue(id_fraction,id_component,value){
	var componentElement = document.getElementById("requirementsFraction_"+id_fraction+"_item_source_"+id_component);
	var componentSelectedValue = componentElement.children[1].children[0].children[1].children[0];
	var componentSlider = componentElement.children[1].children[1].children[0];
	
	componentSelectedValue.value = value;
	componentSlider.value = value;
	updateFractionComponents(id_fraction, id_component);
}
//Перевод из одной еденицы измерение в другую у компонентов
function changeValueOfType(mainElement, targetElement, slider){
	var mainElementSlectionValue = mainElement.selection_value;
	var targetElementSlectionType = targetElement.value_type;

	switch(Number(targetElementSlectionType)){
		case 0:
			var value = slider.value;
			break;
		case 1:
			var value = mainElementSlectionValue * slider.value/100;
			break;
	}
	return Number(value).toFixed(3);
}
function chengeTypeOfValue(mainElement, targetElement, value){
	var mainElementSlectionValue = mainElement.selection_value;
	var targetElementSlectionType = targetElement.value_type;
	
	switch(Number(targetElementSlectionType)){
		case 0:
			value.value = value.value;
			break;
		case 1:
			value.value = value.value/mainElementSlectionValue * 100;
			break;
	}
}
function changeValueOfTypeSorting(mainElement, targetElement, type, slider){
	var mainElementSlectionValue = type == "accept" ? mainElement.accept_selection_mass : mainElement.reject_selection_mass;
	var targetElementSlectionType = targetElement.value_type;

	switch(Number(targetElementSlectionType)){
		case 0:
			var value = slider.value;
			break;
		case 1:
			var value = mainElementSlectionValue * slider.value/100;
			break;
	}
	return Number(value).toFixed(3);
}
function chengeTypeOfValueSorting(mainElement, targetElement, type, value){
	var mainElementSlectionValue = type == "accept" ? mainElement.accept_selection_mass : mainElement.reject_selection_mass;
	var targetElementSlectionType = targetElement.value_type;
	
	switch(Number(targetElementSlectionType)){
		case 0:
			value.value = value.value;
			break;
		case 1:
			value.value = value.value/mainElementSlectionValue * 100;
			break;
	}
}
//Подсчет и вывод частоты
function setupMainPagePurity(mainElement, purityInput){
	var sum = 0;
	for(var i = 0; i < mainElement.components.length; i++){
		if(mainElement.components[i].flag_1 && mainElement.components[i].flag_2)
			sum += Number(mainElement.components[i].value);
	}
	purityInput.value = Number(sum).toFixed(3);
}
function setupFractionPurity(id_fraction){
	protocolRequirements.fractions[id_fraction].purity = 0;
	for(var i = 0; i < protocolRequirements.fractions[id_fraction].components.length; i++){
		if(protocolRequirements.fractions[id_fraction].components[i].flag_1 && protocolRequirements.components[i].flag_2)
			protocolRequirements.fractions[id_fraction].purity += Number(protocolRequirements.fractions[id_fraction].components[i].value);
	}
	protocolRequirements.fractions[id_fraction].purity = Number(protocolRequirements.fractions[id_fraction].purity).toFixed(3);
}
function updateAllFractionPurity(){
	for(var i=0; i < protocolRequirements.fractions.length; i++)
		setupFractionPurity(i);
}
//Подсчет и вывод выхода
function fractionMaxExit(id_fraction){
	var capacityCoefGram = protocolRequirements.capacity_type == "0" ? 1000000 : 1000;
	var capacityMassGram = Number(protocolRequirements.capacity_value) * Number(capacityCoefGram);
	
	var minFractionMass = Number(Infinity);
	for(var i = 0; i < protocolRequirements.fractions[id_fraction].components.length; i++){
		var requirementsComponentMass = Number(capacityMassGram/100 * protocolRequirements.components[i].value);
		
		var maxFractionComponentMass = Number(requirementsComponentMass / Number(protocolRequirements.fractions[id_fraction].components[i].value) * 100);
		
		if(maxFractionComponentMass == "NaN" || maxFractionComponentMass == "Infinity" || maxFractionComponentMass == "-Infinity")
			maxFractionComponentMass = 0;
		
		if(maxFractionComponentMass <= minFractionMass && maxFractionComponentMass != 0)
			minFractionMass = Number(maxFractionComponentMass).toFixed(5);
	}
	//Назначение максимальнового выхода для фракции
	var fractionMaxExitPercent = minFractionMass/capacityMassGram * 100;
	return Number(fractionMaxExitPercent).toFixed(3);
}
//Провека при создании новых фракций
function createdExit(id_fraction){
	if(id_fraction == 0){
		protocolRequirements.fractions[id_fraction].exit = fractionMaxExit(id_fraction);
		interFractionsPercent(id_fraction);
	}
	else{
		protocolRequirements.fractions[id_fraction].exit = checkFractionsExit();
		for(var i = 0; i < protocolRequirements.fractions[id_fraction].components.length; i++){
			protocolRequirements.fractions[id_fraction].components[i].iterfraction_percent = checkInterFractionPrcent(i);
			
		}
		inFractionsPercent(id_fraction);
	}
	setupFractionCapacity(id_fraction);
	setupFractionMainParametr(id_fraction+1);
}
function checkFractionsExit(){
	var sumAllExit = 0;
	for(var i = 0; i < protocolRequirements.fractions.length; i++){
		sumAllExit += Number(protocolRequirements.fractions[i].exit);
	}
	
	if(sumAllExit < 100)
		var sumExit = 100 - sumAllExit;
	else
		var sumExit = 0;
	
	return Number(sumExit).toFixed(3);
}
function checkInterFractionPrcent(id_component){
	var sumAllComponents = 0;
	for(var i = 0; i < protocolRequirements.fractions.length; i++){
		sumAllComponents += Number(protocolRequirements.fractions[i].components[id_component].iterfraction_percent);
	}
	if(sumAllComponents < 100)
		var sumComponent = 100 - sumAllComponents;
	else
		var sumComponent = 0;
	
	return Number(sumComponent).toFixed(3);
}

function setupFractionExit(id_fraction){
	if(Number(protocolRequirements.fractions[id_fraction].exit) > Number(fractionMaxExit(id_fraction)) || protocolRequirements.fractions.length == 1)
		protocolRequirements.fractions[id_fraction].exit = fractionMaxExit(id_fraction);
	
	interFractionsPercent(id_fraction);
}
function updateAllFractionExit(){
	for(var i = 0; i < protocolRequirements.fractions.length; i++){
		setupFractionExit(i);
		setupFractionMainParametr(i+1);
	}
}
//Установка межфракционных проценто фракций
function interFractionsPercent(id_fraction){
	var capacityCoefGram = protocolRequirements.capacity_type == "0" ? 1000000 : 1000;
	var capacityMassGram = Number(protocolRequirements.capacity_value) * Number(capacityCoefGram);
	
	var fractionMass = Number(capacityMassGram/100 * protocolRequirements.fractions[id_fraction].exit);
	
	for(var i = 0; i < protocolRequirements.fractions[id_fraction].components.length; i++){
		var requirementsComponentMass = Number(capacityMassGram/100 * protocolRequirements.components[i].value);
		var fractionComponentMass = Number(fractionMass/100 * protocolRequirements.fractions[id_fraction].components[i].value);
		
		protocolRequirements.fractions[id_fraction].components[i].iterfraction_percent = Number(fractionComponentMass/requirementsComponentMass * 100).toFixed(5);
	}
}
//Установка внутрифракционных процентов из межфракционных
function inFractionsPercent(id_fraction){
	var capacityCoefGram = protocolRequirements.capacity_type == "0" ? 1000000 : 1000;
	var capacityMassGram = Number(protocolRequirements.capacity_value) * Number(capacityCoefGram);
	
	var fractionMass = Number(capacityMassGram/100 * protocolRequirements.fractions[id_fraction].exit);
	for(var i = 0; i < protocolRequirements.fractions[id_fraction].components.length; i++){
		var requirementsComponentMass = Number(capacityMassGram/100 * protocolRequirements.components[i].value);
		var fractionComponentMass = Number(requirementsComponentMass/100 * protocolRequirements.fractions[id_fraction].components[i].iterfraction_percent);
		protocolRequirements.fractions[id_fraction].components[i].value = Number(fractionComponentMass/fractionMass * 100).toFixed(3);
		
		if(protocolRequirements.fractions[id_fraction].components[i].value == "NaN" || protocolRequirements.fractions[id_fraction].components[i].value == "Infinity" || protocolRequirements.fractions[id_fraction].components[i].value == "-Infinity"){
			if(i == 0)
				protocolRequirements.fractions[id_fraction].components[i].value = 100;
			else
				protocolRequirements.fractions[id_fraction].components[i].value = 0;
		}
			
	}
	setupFractionPurity(id_fraction);
	setupFractionCapacity(id_fraction);
	setupFractionMainParametr(id_fraction+1);
}
function calculationInFractionsPercent(id_fraction){
	setupFractionExit(id_fraction);
	var fractionExit = 0;
	var iterfraction_percent = [];
	var lastFraction = protocolRequirements.fractions.length-1;
	
	if(protocolRequirements.fractions.length > 1){
		switch(id_fraction){
			case 0:
				//Установка выхода
				for(var i = 0; i < protocolRequirements.fractions.length-1; i++)
					fractionExit += Number(protocolRequirements.fractions[i].exit);
				
				if(fractionExit > 100){	
					protocolRequirements.fractions[id_fraction].exit -= Number(fractionExit - 100);
					fractionExit -= Number(fractionExit - 100);
				}
				
				protocolRequirements.fractions[lastFraction].exit = Number(100 - fractionExit).toFixed(3);
				
				//Установка межракционных процентиов процентов
				for(var i = 0; i < protocolRequirements.fractions.length-1; i++){
					for(var j = 0; j < protocolRequirements.fractions[i].components.length; j++){
						if(iterfraction_percent[j] == null)
							iterfraction_percent[j] = 0;
						iterfraction_percent[j] += Number(protocolRequirements.fractions[i].components[j].iterfraction_percent);
					}
				}
				
				for(var i = 0; i < iterfraction_percent.length; i++){
					if(iterfraction_percent[i] > 100){
						 protocolRequirements.fractions[id_fraction].iterfraction_percent -= Number(iterfraction_percent[i] - 100);
						 iterfraction_percent[i] -= Number(iterfraction_percent[i] - 100);
					}
				}
				
				for(var i = 0; i < protocolRequirements.fractions[lastFraction].components.length; i++){
					protocolRequirements.fractions[lastFraction].components[i].iterfraction_percent = Number(100 - iterfraction_percent[i]).toFixed(3);
				}
				inFractionsPercent(lastFraction);
				break;
			case protocolRequirements.fractions.length-1:
				//Установка выхода
				for(var i = 1; i < protocolRequirements.fractions.length; i++)
					fractionExit += Number(protocolRequirements.fractions[i].exit);
				
				if(fractionExit > 100){	
					protocolRequirements.fractions[id_fraction].exit -= Number(fractionExit - 100);
					fractionExit -= Number(fractionExit - 100);
				}
				
				protocolRequirements.fractions[0].exit = Number(100 - fractionExit).toFixed(3);
				
				//Установка процентов
				var iterfraction_percent = [];
				for(var i = 1; i < protocolRequirements.fractions.length; i++){
					for(var j = 0; j < protocolRequirements.fractions[i].components.length; j++){
						if(iterfraction_percent[j] == null)
							iterfraction_percent[j] = 0;
						iterfraction_percent[j] += Number(protocolRequirements.fractions[i].components[j].iterfraction_percent);
					}
				}
				
				for(var i = 0; i < iterfraction_percent.length; i++){
					if(iterfraction_percent[i] > 100){
						 protocolRequirements.fractions[id_fraction].iterfraction_percent -= Number(iterfraction_percent[i] - 100);
						 iterfraction_percent[i] -= Number(iterfraction_percent[i] - 100);
					}
				}
				
				for(var i = 0; i < protocolRequirements.fractions[0].components.length; i++){
					protocolRequirements.fractions[0].components[i].iterfraction_percent = Number(100 - iterfraction_percent[i]).toFixed(3);
				}
				inFractionsPercent(0);
				break;
			default:
				for(var i = 0; i < protocolRequirements.fractions.length; i++)
					fractionExit += Number(protocolRequirements.fractions[i].exit);
				
				if(fractionExit > 100 && Number(protocolRequirements.fractions[lastFraction].exit) == 0){
					fractionExit = 0;
					//Установка выхода
					for(var i = 1; i < protocolRequirements.fractions.length; i++)
						fractionExit += Number(protocolRequirements.fractions[i].exit);
					
					if(fractionExit > 100){	
						protocolRequirements.fractions[id_fraction].exit -= Number(fractionExit - 100);
						fractionExit -= Number(fractionExit - 100);
					}	
					
					protocolRequirements.fractions[0].exit = Number(100 - fractionExit).toFixed(3);
					//Установка процентов
					var iterfraction_percent = [];
					for(var i = 1; i < protocolRequirements.fractions.length; i++){
						for(var j = 0; j < protocolRequirements.fractions[i].components.length; j++){
							if(iterfraction_percent[j] == null)
								iterfraction_percent[j] = 0;
							iterfraction_percent[j] += Number(protocolRequirements.fractions[i].components[j].iterfraction_percent);
						}
					}
					for(var i = 0; i < iterfraction_percent.length; i++){
						if(iterfraction_percent[i] > 100){
							protocolRequirements.fractions[id_fraction].iterfraction_percent -= Number(iterfraction_percent[i] - 100);
							iterfraction_percent[i] -= Number(iterfraction_percent[i] - 100);
						}
					}
					for(var i = 0; i < protocolRequirements.fractions[0].components.length; i++){
						protocolRequirements.fractions[0].components[i].iterfraction_percent = Number(100 - iterfraction_percent[i]).toFixed(3);
					}
					inFractionsPercent(0);
				}
				else if(Number(protocolRequirements.fractions[lastFraction].exit) >= 0){
					fractionExit = 0;
					for(var i = 0; i < protocolRequirements.fractions.length-1; i++)
						fractionExit += Number(protocolRequirements.fractions[i].exit);
					
					if(fractionExit > 100){	
						protocolRequirements.fractions[id_fraction].exit -= Number(fractionExit - 100);
						fractionExit -= Number(fractionExit - 100);
					}

					protocolRequirements.fractions[lastFraction].exit = Number(100 - fractionExit).toFixed(3);	
					//Установка межракционных процентиов процентов
					for(var i = 0; i < protocolRequirements.fractions.length-1; i++){
						for(var j = 0; j < protocolRequirements.fractions[i].components.length; j++){
							if(iterfraction_percent[j] == null)
								iterfraction_percent[j] = 0;
							iterfraction_percent[j] += Number(protocolRequirements.fractions[i].components[j].iterfraction_percent);
						}
					}
					
					for(var i = 0; i < iterfraction_percent.length; i++){
						if(iterfraction_percent[i] > 100){
							protocolRequirements.fractions[id_fraction].iterfraction_percent -= Number(iterfraction_percent[i] - 100);
							iterfraction_percent[i] -= Number(iterfraction_percent[i] - 100);
						}
					}
					
					for(var i = 0; i < protocolRequirements.fractions[lastFraction].components.length; i++){
						protocolRequirements.fractions[lastFraction].components[i].iterfraction_percent = Number(100 - iterfraction_percent[i]).toFixed(3);
					}
					inFractionsPercent(lastFraction);
				}
					
				break;	
		}
	}
	setupFractionCapacity(id_fraction);
}
//Подсчет производительности (кг/ч)
function setupMainPageCapacity(mainElement, capacityInput , capacityTextContent){	
	capacityTextContent.textContent = mainElement.capacity_type == 0 ? "т/ч" : "кг/ч";
	switch(Number(mainElement.time_type)){
		case 0:
			capacityInput.value = Number(mainElement.capacity_value / mainElement.time_value);
			break;
		case 1:
			var hour = mainElement.time_value * mainElement.hour_in_day;
			capacityInput.value = Number(mainElement.capacity_value / hour);
			break;
		case 2:
			var week = (mainElement.time_value * 30/7);
			var day = mainElement.day_in_week * week;
			var hour = mainElement.hour_in_day * day;
			capacityInput.value = Number(mainElement.capacity_value / hour);
			break;
		case 3:
			var month = (mainElement.time_value * mainElement.month_in_year);
			var week = (month * 30/7);
			var day = mainElement.day_in_week * week;
			var hour = mainElement.hour_in_day * day;
			capacityInput.value = Number(mainElement.capacity_value / hour);
			break;
	}
	protocolRequirements.capacity_per_hour = capacityInput.value;
	capacityInput.value = Number(capacityInput.value).toFixed(3);
}
//Установка происзодительности для фракций
function setupFractionCapacity(id_fraction){
	var requirementsCapacity = protocolRequirements.capacity_per_hour;
	requirementsCapacity = protocolRequirements.capacity_type == 0 ? requirementsCapacity * 1000 : requirementsCapacity;
	
	protocolRequirements.fractions[id_fraction].capacity = Number(requirementsCapacity/100 * protocolRequirements.fractions[id_fraction].exit).toFixed(3);
}
function updateAllFractionCapactity(){
	for(var i = 0; i < protocolRequirements.fractions.length; i++){
		setupFractionCapacity(i);
		setupFractionMainParametr(i+1);
	}
}
//Функции обновления/отображение продуктов и засорителей на основной странице
function mainPageProduct(mainElement, produtNameText){
	var inputText = "Продутк - Засоритель";
	for(var i = 0; i < mainElement.length; i++){
		var mainText = mainElement[i].product_name;
		
		//Проверка наличие текста
		if(mainText == "-" || mainText == "" && i == 0)
			mainText = "Продукт";
		else if(mainText == "-" || mainText == "")
			mainText = "Засоритель";
		
		//Составление строки
		if(i == 0)
			inputText = mainText;
		else if(i == 1)
			inputText += " - "+mainText;
		else
			inputText += ","+mainText;		
	}
	produtNameText.value = inputText;
}
//Вывод производительности и частоты основной фракции
function mainPageMainComponentValue(mainElement, capacityInput, purityInput){
	if(mainElement.mainFraction){
		capacityInput.value =  protocolRequirements.capacity_type == 0 ? Number(mainElement.capacity / 1000).toFixed(3) : Number(mainElement.capacity).toFixed(3);
		purityInput.value = mainElement.purity;
	}
}
//Посчет суммы исключенных компонентов
function returnRemoveComponentsPercent(mainElement){
	var sum = 0;
	for(var i=0; i < mainElement.components.length; i++)
		sum += mainElement.components[i].flag_2 ? 0 : Number(mainElement.components[i].value);

	if(mainElement.components[mainElement.components.length-1].other_check && mainElement.components[mainElement.components.length-1].flag_2)
		mainElement.components[mainElement.components.length-1].removed_value = sum;
	else
		mainElement.components[0].removed_value = sum;
}
//Удаление компонента из расчета
function removeComponetsForCalculation(id_component){
	if(id_component != 1 && id_component != requirementsComponentsOtherID)
	{
		if(!protocolRequirements.components[id_component-1].flag_2){
			if(Number(protocolRequirements.components[id_component-1].value) > 0)
				protocolRequirements.components[id_component-1].removed_value = Number(protocolRequirements.components[id_component-1].value).toFixed(3);
			if(requirementsComponentsOtherID != null){
				protocolRequirements.components[requirementsComponentsOtherID-1].value 
					= Number(protocolRequirements.components[requirementsComponentsOtherID-1].value) + Number(protocolRequirements.components[id_component-1].value);
				protocolRequirements.components[requirementsComponentsOtherID-1].value = Number(protocolRequirements.components[requirementsComponentsOtherID-1].value).toFixed(3);
				setupRequirementsComponent(requirementsComponentsOtherID);
			}
			else{
				protocolRequirements.components[0].value = Number(protocolRequirements.components[0].value) + Number(protocolRequirements.components[id_component-1].value);
				protocolRequirements.components[0].value = Number(protocolRequirements.components[0].value).toFixed(3);
				setupRequirementsComponent(1);
			}
			protocolRequirements.components[id_component-1].value = 0.00;
			setupRequirementsComponent(id_component);
		}
		else{
			protocolRequirements.components[id_component-1].value = 0;
			
			setupRequirementsComponent(id_component);
		}
		//Удаление компонента из фракций
		for(var id_fraction = 1; id_fraction <= protocolRequirements.fractions.length; id_fraction++){
			if(!protocolRequirements.components[id_component-1].flag_2){
				if(Number(protocolRequirements.components[id_component-1].value) > 0){
					protocolRequirements.fractions[id_fraction-1].components[id_component-1].removed_value 
						= Number(protocolRequirements.fractions[id_fraction-1].components[id_component-1].value).toFixed(3);
				}
				if(requirementsComponentsOtherID != null){
					protocolRequirements.fractions[id_fraction-1].components[requirementsComponentsOtherID-1].value 
						= Number(protocolRequirements.fractions[id_fraction-1].components[requirementsComponentsOtherID-1].value) 
						+ Number(protocolRequirements.fractions[id_fraction-1].components[id_component-1].value);
					protocolRequirements.fractions[id_fraction-1].components[requirementsComponentsOtherID-1].value
						= Number(protocolRequirements.fractions[id_fraction-1].components[requirementsComponentsOtherID-1].value).toFixed(3);
					setupFractionComponents(id_fraction, requirementsComponentsOtherID);
				}
				else{
					protocolRequirements.fractions[id_fraction-1].components[0].value 
						= Number(protocolRequirements.fractions[id_fraction-1].components[0].value) + Number(protocolRequirements.fractions[id_fraction-1].components[id_component-1].value);
					protocolRequirements.fractions[id_fraction-1].components[0].value = Number(protocolRequirements.fractions[id_fraction-1].components[0].value).toFixed(3);
					setupFractionComponents(id_fraction,1);
				}
				protocolRequirements.fractions[id_fraction-1].components[id_component-1].value = 0.00;
				setupFractionComponents(id_fraction, id_component);
			}
			else{
				protocolRequirements.fractions[id_fraction-1].components[id_component-1].value = 0;
				
				setupFractionComponents(id_fraction, id_component);
			}
		}
	}
}
//Изменение компонентов протокола
function checkProtocolComponents(){
	var sum = 0;
	for(var i = 0; i < protocol[protocolID].sourceProduct.components.length; i++){
		if(!protocol[protocolID].sourceProduct.components[i].other_check)
			sum += Number(protocol[protocolID].sourceProduct.components[i].value);
	}
	
	//Проверка создания удаления
	if(sum < 100 && protocolComponentsOtherID == null){
		addOtherProtocolComponents();
	}
	else if(protocolComponentsOtherID != null && protocol[protocolID].sourceProduct.components[protocolComponentsOtherID-1].value == 0){
		delateCompItem("item_source_"+protocolComponentsOtherID);
		protocolComponentsOtherID = null;
	}
	//Проверка изменения
	if(sum < 100 && protocolComponentsOtherID != null){
		var value = 100 - sum;
		editProtocolComponentsValue(protocolComponentsOtherID,value);
	}
}
function sumComponentSourceProduct_Protocol(){
	var sumComponent = 0;
	for(var i = 0; i < protocol[protocolID].sourceProduct.components.length; i++)
		sumComponent += Number(protocol[protocolID].sourceProduct.components[i].value);
	return sumComponent;
}
function calculation_main_protocol(id_component){
	if(protocol[protocolID].sourceProduct.components[id_component-1].flag_2){
		var sum = sumComponentSourceProduct_Protocol();
		if(protocolComponentsOtherID != null && id_component != protocolComponentsOtherID){		
			var value = protocol[protocolID].sourceProduct.components[protocolComponentsOtherID-1].value - (sumComponentSourceProduct_Protocol() - 100);
			editProtocolComponentsValue(protocolComponentsOtherID,value);
			var value = protocol[protocolID].sourceProduct.components[0].value - (sumComponentSourceProduct_Protocol() - 100);
			editProtocolComponentsValue(1,value);
			var value = protocol[protocolID].sourceProduct.components[id_component-1].value - (sumComponentSourceProduct_Protocol() - 100);
			editProtocolComponentsValue(id_component,value);
		}
		else if(id_component != 1 && id_component != protocolComponentsOtherID){
			var value = protocol[protocolID].sourceProduct.components[0].value - (sumComponentSourceProduct_Protocol() - 100);
			editProtocolComponentsValue(1,value);
			var value = protocol[protocolID].sourceProduct.components[id_component-1].value - (sumComponentSourceProduct_Protocol() - 100);
			editProtocolComponentsValue(id_component,value);
		}
		else if(sum > 100 && id_component != protocolComponentsOtherID){
			var max_components =  protocol[protocolID].sourceProduct.components.length;
			var value = protocol[protocolID].sourceProduct.components[max_components-1].value - (sumComponentSourceProduct_Protocol() - 100);
			editProtocolComponentsValue(max_components,value);
			var value = protocol[protocolID].sourceProduct.components[0].value - (sumComponentSourceProduct_Protocol() - 100);
			editProtocolComponentsValue(1,value);
		}
	}
	updateAllSorting();
}
function removeMainProtocolComponents(id_component){
	if(protocolComponentsOtherID != null){
		var value = Number(protocol[protocolID].sourceProduct.components[protocolComponentsOtherID-1].value) + Number(protocol[protocolID].sourceProduct.components[id_component].value);
		editProtocolComponentsValue(protocolComponentsOtherID,value);
		
		//Изменение внутри сортировок
		for(var i = 0; i < protocol[protocolID].sorting.length; i++){
			var value_accept 
				= Number(protocol[protocolID].sorting[i].accept_components[protocolComponentsOtherID-1].value) 
				+ Number(protocol[protocolID].sorting[i].accept_components[id_component].value);
			var value_reject 
				= Number(protocol[protocolID].sorting[i].reject_components[protocolComponentsOtherID-1].value) 
				+ Number(protocol[protocolID].sorting[i].reject_components[id_component].value);
				
			protocol[protocolID].sorting[i].accept_components[protocolComponentsOtherID-1].value = Number(value_accept).toFixed(3);
			protocol[protocolID].sorting[i].reject_components[protocolComponentsOtherID-1].value = Number(value_reject).toFixed(3);
		}
	}
	else{
		var value = Number(protocol[protocolID].sourceProduct.components[0].value) + Number(protocol[protocolID].sourceProduct.components[id_component].value);
		editProtocolComponentsValue(1,value);
		
		//Изменение внутри сортировок
		for(var i = 0; i < protocol[protocolID].sorting.length; i++){
			var value_accept 
				= Number(protocol[protocolID].sorting[i].accept_components[0].value) 
				+ Number(protocol[protocolID].sorting[i].accept_components[id_component].value);
			var value_reject 
				= Number(protocol[protocolID].sorting[i].reject_components[0].value) 
				+ Number(protocol[protocolID].sorting[i].reject_components[id_component].value);
			
			protocol[protocolID].sorting[i].accept_components[0].value = Number(value_accept).toFixed(3);
			protocol[protocolID].sorting[i].reject_components[0].value = Number(value_reject).toFixed(3);		
		}
		
	}
}
function calculation_other_protocol(){
	var value = protocol[protocolID].sourceProduct.components[0].value - (sumComponentSourceProduct_Protocol() - 100);
	editProtocolComponentsValue(1,value);
	var value = protocol[protocolID].sourceProduct.components[protocolComponentsOtherID-1].value - (sumComponentSourceProduct_Protocol() - 100);
	editProtocolComponentsValue(protocolComponentsOtherID,value);
	
	if(protocol[protocolID].sourceProduct.components[protocolComponentsOtherID-1].value == 0){
		delateCompItem("item_source_"+protocolComponentsOtherID);
		protocolComponentsOtherID = null;
	}
	updateAllSorting();
}
function addOtherProtocolComponents(){
	protocolComponentsOtherID = protocol[protocolID].sourceProduct.components.length+1;
	
	addSourceItem();
	protocol[protocolID].sourceProduct.components[protocolComponentsOtherID-1].other_check = true;
	
	var componentItem = document.getElementById("item_source_" + protocolComponentsOtherID);
	var classifier = document.getElementById("classifier_" + protocolComponentsOtherID);
	
	var componentSelectedValue = componentItem.children[1].children[0].children[1].children[0];
	var componentSlider = componentItem.children[1].children[1].children[0];
	var productElement = classifier.children[0].children[0].children[5].children[0];
	
	//Добавление опции прочее
	var option = document.createElement('option');
	option.textContent = list_product[list_product.length-1].productName;
	option.value = list_product[list_product.length-1].id_product;
	
	//Добавление-Удаление функций
	componentSelectedValue.addEventListener("change",calculation_other_protocol);
	componentSlider.addEventListener("input",calculation_other_protocol);
	
	componentSelectedValue.removeEventListener("change", checkProtocolComponents);
	componentSlider.removeEventListener("input", checkProtocolComponents);
	
	productElement.add(option);
	productElement.value = productElement.options[1].value;
	classifierSourceEdit(protocolComponentsOtherID);
}
function removeOtherProtocolsComponents(){	
	var value = Number(protocol[protocolID].sourceProduct.components[0].value) + Number(protocol[protocolID].sourceProduct.components[protocolComponentsOtherID-1].value);
	editProtocolComponentsValue(1,value);
	
	
	for(var i = 0; i<protocol[protocolID].sorting.length; i++){
		var value_accept = Number(protocol[protocolID].sorting[i].accept_components[0].value) + Number(protocol[protocolID].sorting[i].accept_components[protocolComponentsOtherID-1].value);
		var value_reject = Number(protocol[protocolID].sorting[i].reject_components[0].value) + Number(protocol[protocolID].sorting[i].reject_components[protocolComponentsOtherID-1].value);
		protocol[protocolID].sorting[i].accept_components[0].value = Number(value_accept).toFixed(3);
		protocol[protocolID].sorting[i].reject_components[0].value = Number(value_reject).toFixed(3);
		
	}
	
	protocol[protocolID].sourceProduct.components[protocolComponentsOtherID-1].other_check = false;
	protocolComponentsOtherID = null;
}
function changeProtocolComponents(){
	var componentItem = document.getElementById("item_source_" + protocolComponentsOtherID);
	
	var componentSelectedValue = componentItem.children[1].children[0].children[1].children[0];
	var componentSlider = componentItem.children[1].children[1].children[0];
	//Добавление-Удаление функций
	componentSelectedValue.addEventListener("change",checkProtocolComponents);
	componentSlider.addEventListener("input",checkProtocolComponents);
	
	componentSelectedValue.removeEventListener("change", calculation_other_protocol);
	componentSlider.removeEventListener("input", calculation_other_protocol);
	
	
	//Добавление-Удаление функций для сортировок
	var componentAcceptElement =  document.getElementById("item_acceptComp_"+protocolComponentsOtherID);
	var componentAcceptSelectedValue = componentAcceptElement.children[1].children[0].children[1].children[0];
	var componentAcceptSlider = componentAcceptElement.children[1].children[1].children[0];
	
	componentAcceptSelectedValue.replaceWith(componentAcceptSelectedValue.cloneNode(false));
	componentAcceptSlider.replaceWith(componentAcceptSlider.cloneNode(false));
	
	var componentRejectElement =  document.getElementById("item_rejectComp_"+protocolComponentsOtherID);
	var componentRejectSelectedValue = componentRejectElement.children[1].children[0].children[1].children[0];
	var componentRejectSlider = componentRejectElement.children[1].children[1].children[0];
		
	componentRejectSelectedValue.replaceWith(componentRejectSelectedValue.cloneNode(false));
	componentRejectSlider.replaceWith(componentRejectSlider.cloneNode(false));
	
	returnSortingEventListeners();
		
	protocol[protocolID].sourceProduct.components[protocolComponentsOtherID-1].other_check = false;
	protocolComponentsOtherID = null;
	
	addCalculationAcceptComponents(componentAcceptElement.id.substr(16));
	addCalculationRejectComponents(componentRejectElement.id.substr(16));
	updateAllSorting();
}
function returnSortingEventListeners(id){
	var componentAcceptElement =  document.getElementById("item_acceptComp_"+protocolComponentsOtherID);
	var componentAcceptSelectedValue = componentAcceptElement.children[1].children[0].children[1].children[0];
	var componentAcceptSlider = componentAcceptElement.children[1].children[1].children[0];
	
	componentAcceptSelectedValue.addEventListener("change", returnAcceptSelect(protocolComponentsOtherID-1));
	componentAcceptSlider.addEventListener("input", returnAcceptSlider(protocolComponentsOtherID-1));
	
	var componentRejectElement =  document.getElementById("item_rejectComp_"+protocolComponentsOtherID);
	var componentRejectSelectedValue = componentRejectElement.children[1].children[0].children[1].children[0];
	var componentRejectSlider = componentRejectElement.children[1].children[1].children[0];
	
	componentRejectSelectedValue.addEventListener("change", returnRejectSelect(protocolComponentsOtherID-1));
	componentRejectSlider.addEventListener("input", returnRejectSlider(protocolComponentsOtherID-1));
}

function editProtocolComponentsValue(id,value){
	var componentElement =  document.getElementById("item_source_" + id);
	var componentSelectedValue = componentElement.children[1].children[0].children[1].children[0];
	var componentSlider = componentElement.children[1].children[1].children[0];
	
	componentSlider.value = value;
	componentSelectedValue.value = value;
	itemSourceUpdate(componentElement.id);
}
function newProtoclComponentsOtherID(){
	//Обнуление айдишника прочего
	protocolComponentsOtherID = null;
	//Установка айдишник прочего
	for(var i = 0; i < protocol[protocolID].sourceProduct.components.length; i++){
		if(protocol[protocolID].sourceProduct.components[i].other_check)
			protocolComponentsOtherID = Number(i+1);
	}
}
function sumAcceptComponent(id_sorting){
	var sumComponent = 0;
	for(var i = 0; i < protocol[protocolID].sorting[id_sorting].accept_components.length; i++)
		sumComponent += Number(protocol[protocolID].sorting[id_sorting].accept_components[i].value);
	return sumComponent;
}
//Функции под фракции внутри сортировок
function accept_components_main(id_component){
	var id_sorting = Number(SortingLable.value);
	if(protocolComponentsOtherID != null){
		var value = protocol[protocolID].sorting[id_sorting].accept_components[protocolComponentsOtherID-1].value  - (sumAcceptComponent(id_sorting) - 100);
		editSortingComponentsValue("accept_components", protocolComponentsOtherID, value);
		var value = protocol[protocolID].sorting[id_sorting].accept_components[0].value - (sumAcceptComponent(id_sorting) - 100);
		editSortingComponentsValue("accept_components", 1, value);
		var value = protocol[protocolID].sorting[id_sorting].accept_components[id_component-1].value - (sumAcceptComponent(id_sorting) - 100);
		editSortingComponentsValue("accept_components", id_component, value);
	}
	else{
		var max_components = protocol[protocolID].sorting[id_sorting].accept_components.length;
		if(id_component != max_components){
			var value = protocol[protocolID].sorting[id_sorting].accept_components[max_components-1].value - (sumAcceptComponent(id_sorting) - 100);
			editSortingComponentsValue("accept_components", max_components, value);
			var value = protocol[protocolID].sorting[id_sorting].accept_components[0].value - (sumAcceptComponent(id_sorting) - 100);
			editSortingComponentsValue("accept_components", 1, value);
		}
		else{
			var value =  protocol[protocolID].sorting[id_sorting].accept_components[0].value - (sumAcceptComponent(id_sorting)- 100);
			editSortingComponentsValue("accept_components", 1, value);
		}
		var value = protocol[protocolID].sorting[id_sorting].accept_components[id_component-1].value - (sumAcceptComponent(id_sorting) - 100);
		editSortingComponentsValue("accept_components", id_component, value);
	}
}
function sumRejectComponent(id_sorting){
	var sumComponent = 0;
	for(var i = 0; i < protocol[protocolID].sorting[id_sorting].reject_components.length; i++)
		sumComponent += Number(protocol[protocolID].sorting[id_sorting].reject_components[i].value);
	return sumComponent;
}
function reject_components_main(id_component){
	var id_sorting = Number(SortingLable.value);
	if(protocolComponentsOtherID != null){
		var value = protocol[protocolID].sorting[id_sorting].reject_components[protocolComponentsOtherID-1].value  - (sumRejectComponent(id_sorting) - 100);
		editSortingComponentsValue("reject_components", protocolComponentsOtherID, value);
		var value = protocol[protocolID].sorting[id_sorting].reject_components[0].value - (sumRejectComponent(id_sorting) - 100);
		editSortingComponentsValue("reject_components", 1, value);
		var value = protocol[protocolID].sorting[id_sorting].reject_components[id_component-1].value - (sumRejectComponent(id_sorting) - 100);
		editSortingComponentsValue("reject_components", id_component, value);
	}
	else{
		var max_components = protocol[protocolID].sorting[id_sorting].reject_components.length;
		if(id_component != max_components){
			var value = protocol[protocolID].sorting[id_sorting].reject_components[max_components-1].value - (sumRejectComponent(id_sorting) - 100);
			editSortingComponentsValue("reject_components", max_components, value);
			var value = protocol[protocolID].sorting[id_sorting].reject_components[0].value - (sumRejectComponent(id_sorting) - 100);
			editSortingComponentsValue("reject_components", 1, value);
		}
		else{
			var value =  protocol[protocolID].sorting[id_sorting].reject_components[0].value - (sumRejectComponent(id_sorting)- 100);
			editSortingComponentsValue("reject_components", 1, value);
		}
		var value = protocol[protocolID].sorting[id_sorting].reject_components[id_component-1].value - (sumRejectComponent(id_sorting) - 100);
		editSortingComponentsValue("reject_components", id_component, value);
	}
}
function accept_components_other(id_component){
	var id_sorting = Number(SortingLable.value);
	var value = protocol[protocolID].sorting[id_sorting].accept_components[0].value - (sumAcceptComponent(id_sorting) - 100);
	editSortingComponentsValue("accept_components",1,value);
	var value = protocol[protocolID].sorting[id_sorting].accept_components[id_component-1].value - (sumAcceptComponent(id_sorting) - 100);
	editSortingComponentsValue("accept_components",id_component,value);
	
	if(protocol[protocolID].sorting[id_sorting].accept_components[0].value <= 0){
		var value_component_other = protocol[protocolID].sorting[id_sorting].accept_components[protocolComponentsOtherID-1].value - (sumAcceptComponent(id_sorting) - 100);
		editSortingComponentsValue("accept_components", protocolComponentsOtherID,value_component_other);
	}
}
function reject_components_other(id_component){
	var id_sorting = Number(SortingLable.value);
	var value = protocol[protocolID].sorting[id_sorting].reject_components[0].value - (sumRejectComponent(id_sorting) - 100);
	editSortingComponentsValue("reject_components",1,value);
	var value = protocol[protocolID].sorting[id_sorting].reject_components[id_component-1].value - (sumRejectComponent(id_sorting) - 100);
	editSortingComponentsValue("reject_components",id_component,value);
	
	if(protocol[protocolID].sorting[id_sorting].reject_components[0].value <= 0){
		var value_component_other = protocol[protocolID].sorting[id_sorting].reject_components[protocolComponentsOtherID-1].value - (sumRejectComponent(id_sorting) - 100);
		editSortingComponentsValue("reject_components", protocolComponentsOtherID, value_component_other);
	}
}
function editSortingComponentsValue(fraction_type, id_component, value){
	if(fraction_type == "accept_components"){
		var componentElement = document.getElementById("item_acceptComp_" + id_component);
		var componentSelectedValue = componentElement.children[1].children[0].children[1].children[0];
		var componentSlider = componentElement.children[1].children[1].children[0];
	}
	else if(fraction_type == "reject_components"){
		var componentElement = document.getElementById("item_rejectComp_" + id_component);
		var componentSelectedValue = componentElement.children[1].children[0].children[1].children[0];
		var componentSlider = componentElement.children[1].children[1].children[0];
	}
	
	componentSelectedValue.value = value;
	componentSlider.value = value;
	sortingComponentsUpdate(id_component);
}
function addCalculationAcceptComponents(id_component){
	var componentElement = document.getElementById("item_acceptComp_" + id_component);
	var componentSelectedValue = componentElement.children[1].children[0].children[1].children[0];
	var componentSlider = componentElement.children[1].children[1].children[0];
			
	if(id_component != protocolComponentsOtherID){
		componentSelectedValue.addEventListener("change", function(){
			if(protocol[protocolID].sourceProduct.components[id_component-1].flag_2)
				accept_components_main(id_component);
				sortingExitByAccept(Number(SortingLable.value) + 1);
		});
		componentSlider.addEventListener("input", function(){
			if(protocol[protocolID].sourceProduct.components[id_component-1].flag_2)
				accept_components_main(id_component);
				sortingExitByAccept(Number(SortingLable.value) + 1);
		});
	}
	else{
		componentSelectedValue.addEventListener("change", function(){
			accept_components_other(id_component);
			sortingExitByAccept(Number(SortingLable.value) + 1);
		});
		componentSlider.addEventListener("input", function(){
			accept_components_other(id_component);
			sortingExitByAccept(Number(SortingLable.value) + 1);
		});
	}
	
}
function addCalculationRejectComponents(id_component){
	var componentElement = document.getElementById("item_rejectComp_" + id_component);
	var componentSelectedValue = componentElement.children[1].children[0].children[1].children[0];
	var componentSlider = componentElement.children[1].children[1].children[0];
			
	if(id_component != protocolComponentsOtherID){
		componentSelectedValue.addEventListener("change", function(){
			if(protocol[protocolID].sourceProduct.components[id_component-1].flag_2)
				reject_components_main(id_component);
			sortingExitByReject(Number(SortingLable.value) + 1);
		});
		componentSlider.addEventListener("input", function(){
			if(protocol[protocolID].sourceProduct.components[id_component-1].flag_2)
				reject_components_main(id_component);
			sortingExitByReject(Number(SortingLable.value) + 1);
		});
	}
	else{
		componentSelectedValue.addEventListener("change", function(){
			reject_components_other(id_component);
			sortingExitByReject(Number(SortingLable.value) + 1);
		});
		componentSlider.addEventListener("input", function(){
			reject_components_other(id_component);
			sortingExitByReject(Number(SortingLable.value) + 1);
		});
	}

}
//Расчет частоты для фракций сортировки
function setupAcceptPurity(id_sorting){
	var sum = 0;
	for(var i = 0; i < protocol[protocolID].sorting[id_sorting-1].accept_components.length; i++){
		if(protocol[protocolID].sorting[id_sorting-1].accept_components[i].flag_1 && protocol[protocolID].sourceProduct.components[i].flag_2)
			sum += Number(protocol[protocolID].sorting[id_sorting-1].accept_components[i].value);
	}
	var MinInput = document.getElementById("SortingComponents_"+id_sorting).children[0].children[1].children[1].children[2];
	var MaxInput = acceptBlock.children[0].children[0].children[1].children[2];
	
	protocol[protocolID].sorting[id_sorting-1].accept_purity = Number(sum).toFixed(3);
	MinInput.value = protocol[protocolID].sorting[id_sorting-1].accept_purity;
	MaxInput.value = protocol[protocolID].sorting[id_sorting-1].accept_purity;
}
function setupRejectPurity(id_sorting){
	var sum = 0;
	for(var i = 0; i < protocol[protocolID].sorting[id_sorting-1].reject_components.length; i++){
		if(protocol[protocolID].sorting[id_sorting-1].reject_components[i].flag_1 && protocol[protocolID].sourceProduct.components[i].flag_2)
			sum += Number(protocol[protocolID].sorting[id_sorting-1].reject_components[i].value);
	}
	var MinInput = document.getElementById("SortingComponents_"+id_sorting).children[2].children[1].children[1].children[2];
	var MaxInput = rejectBlock.children[0].children[0].children[1].children[2];
	
	protocol[protocolID].sorting[id_sorting-1].reject_purity = Number(sum).toFixed(3);
	MinInput.value = protocol[protocolID].sorting[id_sorting-1].reject_purity;
	MaxInput.value = protocol[protocolID].sorting[id_sorting-1].reject_purity;
}
//Расчет выхода и производительности для фракций сортировок
//Подсчет и вывод выхода
function acceptMaxExit(id_sorting){
	var capacityCoefGram = protocol[protocolID].sorting[id_sorting].capacity_type == "0" ? 1000 : 1000000;
	var capacityMassGram = checkInboxFraction(id_sorting)[0].capacity != null /*&& id_sorting != 0*/ ? checkInboxFraction(id_sorting)[0].capacity * 1000 
		: Number(protocol[protocolID].sorting[id_sorting].capacity_value) * Number(capacityCoefGram);
	
	
	var minAcceptMass = Number(Infinity);
	for(var i = 0; i < protocol[protocolID].sorting[id_sorting].accept_components.length; i++){
		var percent_value = checkInboxFraction(id_sorting)[0].capacity != null /*&& id_sorting != 0*/ ? checkInboxFraction(id_sorting)[0].components[i].value 
			: protocol[protocolID].sourceProduct.components[i].value;
		
		var protocolComponentMass = Number(capacityMassGram/100 * percent_value);

		var maxAcceptComponentMass = Number(protocolComponentMass / Number(protocol[protocolID].sorting[id_sorting].accept_components[i].value) * 100);
		
		if(maxAcceptComponentMass == "NaN" || maxAcceptComponentMass == "Infinity" || maxAcceptComponentMass == "-Infinity")
			maxAcceptComponentMass = 0;
		
		if(maxAcceptComponentMass <= minAcceptMass && maxAcceptComponentMass != 0)
			minAcceptMass = Number(maxAcceptComponentMass).toFixed(5);
	}
	//Назначение максимальнового выхода для фракции
	var acceptMaxExitPercent = minAcceptMass/capacityMassGram * 100;
	return Number(acceptMaxExitPercent).toFixed(3);
}
function rejectMaxExit(id_sorting){
	var capacityCoefGram = protocol[protocolID].sorting[id_sorting].capacity_type == "0" ? 1000 : 1000000;
	var capacityMassGram = checkInboxFraction(id_sorting)[0].capacity != null /*&& id_sorting != 0*/ ? checkInboxFraction(id_sorting)[0].capacity * 1000
		: Number(protocol[protocolID].sorting[id_sorting].capacity_value) * Number(capacityCoefGram);
	
	var minRejectMass = Number(Infinity);
	for(var i = 0; i < protocol[protocolID].sorting[id_sorting].reject_components.length; i++){
		var percent_value = checkInboxFraction(id_sorting)[0].capacity != null /*&& id_sorting != 0*/ ? checkInboxFraction(id_sorting)[0].components[i].value 
			: protocol[protocolID].sourceProduct.components[i].value;
		
		var protocolComponentMass = Number(capacityMassGram/100 * percent_value);
		
		var maxRejectComponentMass = Number(protocolComponentMass / Number(protocol[protocolID].sorting[id_sorting].reject_components[i].value) * 100);
		
		if(maxRejectComponentMass == "NaN" || maxRejectComponentMass == "Infinity" || maxRejectComponentMass == "-Infinity")
			maxRejectComponentMass = 0;
		
		if(maxRejectComponentMass <= minRejectMass && maxRejectComponentMass != 0)
			minRejectMass = Number(maxRejectComponentMass).toFixed(5);
	}
	//Назначение максимальнового выхода для фракции
	var rejectMaxExitPercent = minRejectMass/capacityMassGram * 100;
	return Number(rejectMaxExitPercent).toFixed(3);
}
function sortingExitByAccept(id_sorting){
	var maxAcceptExitInput = acceptBlock.children[0].children[0].children[1].children[0];
	var maxRejectExitInput = rejectBlock.children[0].children[0].children[1].children[0];
	var minRejectExitInput = document.getElementById("SortingComponents_"+id_sorting).children[2].children[1].children[1].children[0];
		
	if(Number(protocol[protocolID].sorting[id_sorting-1].accept_exit) > acceptMaxExit(id_sorting-1) || Number(protocol[protocolID].sorting[id_sorting-1].accept_components.length == 1)){
		protocol[protocolID].sorting[id_sorting-1].accept_exit = acceptMaxExit(id_sorting-1);
		maxAcceptExitInput.value = protocol[protocolID].sorting[id_sorting-1].accept_exit;
		minRejectExitInput.value = protocol[protocolID].sorting[id_sorting-1].accept_exit;
	}
		
	protocol[protocolID].sorting[id_sorting-1].reject_exit = Number(100 - protocol[protocolID].sorting[id_sorting-1].accept_exit).toFixed(3);
	maxRejectExitInput.value = protocol[protocolID].sorting[id_sorting-1].reject_exit;
	minRejectExitInput.value = protocol[protocolID].sorting[id_sorting-1].reject_exit;
	
	acceptInterFractionsPercent(id_sorting-1);
	rejectInFractionsPercent(id_sorting-1);
	setupSortingCapacity(id_sorting-1);
	setupAcceptPurity(id_sorting);
	sortingInfoMaxSetup();
}
function sortingExitByReject(id_sorting){	
	var maxAcceptExitInput = acceptBlock.children[0].children[0].children[1].children[0];
	var maxRejectExitInput = rejectBlock.children[0].children[0].children[1].children[0];
	
	var minAcceptExitInput = document.getElementById("SortingComponents_"+id_sorting).children[0].children[1].children[1].children[0];
	var minRejectExitInput = document.getElementById("SortingComponents_"+id_sorting).children[2].children[1].children[1].children[0];
		
	if(Number(protocol[protocolID].sorting[id_sorting-1].reject_exit) > rejectMaxExit(id_sorting-1) || Number(protocol[protocolID].sorting[id_sorting-1].reject_components.length == 1)){
		protocol[protocolID].sorting[id_sorting-1].reject_exit = rejectMaxExit(id_sorting-1);
		maxRejectExitInput.value = protocol[protocolID].sorting[id_sorting-1].reject_exit;
		minRejectExitInput.value = protocol[protocolID].sorting[id_sorting-1].reject_exit;
	}
	
	protocol[protocolID].sorting[id_sorting-1].accept_exit = Number(100 - protocol[protocolID].sorting[id_sorting-1].reject_exit).toFixed(3);
	maxAcceptExitInput.value = protocol[protocolID].sorting[id_sorting-1].accept_exit;
	minAcceptExitInput.value = protocol[protocolID].sorting[id_sorting-1].accept_exit;
	
	rejectInterFractionsPercent(id_sorting-1);
	acceptInFractionsPercent(id_sorting-1);
	setupSortingCapacity(id_sorting-1);
	sortingInfoMaxSetup();
}
//Установка межфракционных процентов
function acceptInterFractionsPercent(id_sorting){
	var capacityCoefGram = protocol[protocolID].sorting[id_sorting].capacity_type == "0" ? 1000 : 1000000;
	var capacityMassGram = checkInboxFraction(id_sorting)[0].capacity != null ? checkInboxFraction(id_sorting)[0].capacity * 1000 
		: Number(protocol[protocolID].sorting[id_sorting].capacity_value) * Number(capacityCoefGram);
	
	var acceptMass = Number(capacityMassGram/100 * protocol[protocolID].sorting[id_sorting].accept_exit);
	
	for(var i = 0; i < protocol[protocolID].sorting[id_sorting].accept_components.length; i++){
		var percent_value = checkInboxFraction(id_sorting)[0].capacity != null /*&& id_sorting != 0*/ ? checkInboxFraction(id_sorting)[0].components[i].value 
			: protocol[protocolID].sourceProduct.components[i].value;
		
		var protocolComponentMass = Number(capacityMassGram/100 * percent_value);
		var acceptComponentMass = Number(acceptMass/100 * protocol[protocolID].sorting[id_sorting].accept_components[i].value);
		
		if(protocol[protocolID].sourceProduct.components[i].flag_2){
			protocol[protocolID].sorting[id_sorting].accept_components[i].iterfraction_percent = Number(acceptComponentMass/protocolComponentMass * 100).toFixed(5);
			protocol[protocolID].sorting[id_sorting].reject_components[i].iterfraction_percent = Number(100 - protocol[protocolID].sorting[id_sorting].accept_components[i].iterfraction_percent);
		}
		else{
			protocol[protocolID].sorting[id_sorting].accept_components[i].iterfraction_percent = 0;
			protocol[protocolID].sorting[id_sorting].reject_components[i].iterfraction_percent = 0;
		}
	}	
}
function rejectInterFractionsPercent(id_sorting){
	var capacityCoefGram = protocol[protocolID].sorting[id_sorting].capacity_type == "0" ? 1000 : 1000000;
	var capacityMassGram = checkInboxFraction(id_sorting)[0].capacity != null ? checkInboxFraction(id_sorting)[0].capacity * 1000
		: Number(protocol[protocolID].sorting[id_sorting].capacity_value) * Number(capacityCoefGram);
	
	var rejectMass = Number(capacityMassGram/100 * protocol[protocolID].sorting[id_sorting].reject_exit);
	
	for(var i = 0; i < protocol[protocolID].sorting[id_sorting].reject_components.length; i++){
		var percent_value = checkInboxFraction(id_sorting)[0].capacity != null /*&& id_sorting != 0*/ ? checkInboxFraction(id_sorting)[0].components[i].value 
			: protocol[protocolID].sourceProduct.components[i].value;
		
		var protocolComponentMass = Number(capacityMassGram/100 * percent_value);
		var rejectComponentMass = Number(rejectMass/100 * protocol[protocolID].sorting[id_sorting].reject_components[i].value);
		
		if(protocol[protocolID].sourceProduct.components[i].flag_2){
			protocol[protocolID].sorting[id_sorting].reject_components[i].iterfraction_percent = Number(rejectComponentMass/protocolComponentMass * 100).toFixed(5);
			protocol[protocolID].sorting[id_sorting].accept_components[i].iterfraction_percent = Number(100 - protocol[protocolID].sorting[id_sorting].reject_components[i].iterfraction_percent);
		}
		else{
			protocol[protocolID].sorting[id_sorting].reject_components[i].iterfraction_percent = 0;
			protocol[protocolID].sorting[id_sorting].accept_components[i].iterfraction_percent = 0;
		}
	}
}
//Установка межфракционных процентов
function acceptInFractionsPercent(id_sorting){
	var capacityCoefGram = protocol[protocolID].sorting[id_sorting].capacity_type == "0" ? 1000 : 1000000;
	var capacityMassGram = checkInboxFraction(id_sorting)[0].capacity != null ? checkInboxFraction(id_sorting)[0].capacity * 1000
		: Number(protocol[protocolID].sorting[id_sorting].capacity_value) * Number(capacityCoefGram);
	
	var acceptMass = Number(capacityMassGram/100 * protocol[protocolID].sorting[id_sorting].accept_exit);
	
	for(var i = 0; i < protocol[protocolID].sorting[id_sorting].accept_components.length; i++){
		var percent_value = checkInboxFraction(id_sorting)[0].capacity != null /*&& id_sorting != 0*/ ? checkInboxFraction(id_sorting)[0].components[i].value 
			: protocol[protocolID].sourceProduct.components[i].value;
		
		var protocolComponentMass = Number(capacityMassGram/100 * percent_value);
		var acceptComponentMass = Number(protocolComponentMass/100 * protocol[protocolID].sorting[id_sorting].accept_components[i].iterfraction_percent);
		protocol[protocolID].sorting[id_sorting].accept_components[i].value = Number(acceptComponentMass/acceptMass * 100).toFixed(3);
		
		if(protocol[protocolID].sorting[id_sorting].accept_components[i].value == "NaN" 
			|| protocol[protocolID].sorting[id_sorting].accept_components[i].value == "Infinity" 
			|| protocol[protocolID].sorting[id_sorting].accept_components[i].value == "-Infinity")
		{
			if(i == 0)
				protocol[protocolID].sorting[id_sorting].accept_components[i].value = 100;
			else
				protocol[protocolID].sorting[id_sorting].accept_components[i].value = 0;
		}		
	}
	setupAcceptPurity(id_sorting+1);
}
function rejectInFractionsPercent(id_sorting){
	var capacityCoefGram = protocol[protocolID].sorting[id_sorting].capacity_type == "0" ? 1000 : 1000000;
	var capacityMassGram = checkInboxFraction(id_sorting)[0].capacity != null ? checkInboxFraction(id_sorting)[0].capacity * 1000
		: Number(protocol[protocolID].sorting[id_sorting].capacity_value) * Number(capacityCoefGram);
	
	var rejectMass = Number(capacityMassGram/100 * protocol[protocolID].sorting[id_sorting].reject_exit);
	
	for(var i = 0; i < protocol[protocolID].sorting[id_sorting].reject_components.length; i++){
		var percent_value = checkInboxFraction(id_sorting)[0].capacity != null /*&& id_sorting != 0*/ ? checkInboxFraction(id_sorting)[0].components[i].value 
			: protocol[protocolID].sourceProduct.components[i].value;
		
		var protocolComponentMass = Number(capacityMassGram/100 * percent_value);
		var rejectComponentMass = Number(protocolComponentMass/100 * protocol[protocolID].sorting[id_sorting].reject_components[i].iterfraction_percent);
		protocol[protocolID].sorting[id_sorting].reject_components[i].value = Number(rejectComponentMass/rejectMass * 100).toFixed(3);
		
		if(protocol[protocolID].sorting[id_sorting].reject_components[i].value == "NaN" 
			|| protocol[protocolID].sorting[id_sorting].reject_components[i].value == "Infinity" 
			|| protocol[protocolID].sorting[id_sorting].reject_components[i].value == "-Infinity")
		{
			if(i == 0)
				protocol[protocolID].sorting[id_sorting].reject_components[i].value = 100;
			else
				protocol[protocolID].sorting[id_sorting].reject_components[i].value = 0;
		}		
	}
	setupRejectPurity(id_sorting+1);
}
//Установка производительности сортировок фракций
function setupSortingCapacity(id_sorting){
	var sortingCapacity = protocol[protocolID].sorting[id_sorting].capacity_value;
	sortingCapacity =  protocol[protocolID].sorting[id_sorting].capacity_type == 0 ? sortingCapacity : sortingCapacity * 1000;
	
	protocol[protocolID].sorting[id_sorting].trays_number = checkInboxFraction(id_sorting)[0].capacity != null ? Number(checkInboxFraction(id_sorting)[0].capacity / sortingCapacity).toFixed(2) : 1;
	protocol[protocolID].sorting[id_sorting].accept_mass = Number(sortingCapacity/100 * protocol[protocolID].sorting[id_sorting].accept_exit).toFixed(3);
	protocol[protocolID].sorting[id_sorting].reject_mass = Number(sortingCapacity/100 * protocol[protocolID].sorting[id_sorting].reject_exit).toFixed(3);
}
function sortingCapacityAccept(){
	var id_sorting = Number(SortingLable.value);
	var sortingCapacity = protocol[protocolID].sorting[id_sorting].capacity_value;
	sortingCapacity =  protocol[protocolID].sorting[id_sorting].capacity_type == 0 ? sortingCapacity : sortingCapacity * 1000;
	
	protocol[protocolID].sorting[id_sorting].accept_exit = Number(protocol[protocolID].sorting[id_sorting].accept_mass/(sortingCapacity / 100)).toFixed(3);
	acceptBlock.children[0].children[0].children[1].children[0].value = protocol[protocolID].sorting[id_sorting].accept_exit;
	sortingExitByAccept(id_sorting+1);
}
function sortingCapacityReject(){
	var id_sorting = Number(SortingLable.value);
	var sortingCapacity = protocol[protocolID].sorting[id_sorting].capacity_value;
	sortingCapacity =  protocol[protocolID].sorting[id_sorting].capacity_type == 0 ? sortingCapacity : sortingCapacity * 1000;
	
	protocol[protocolID].sorting[id_sorting].reject_exit = Number(protocol[protocolID].sorting[id_sorting].reject_mass/(sortingCapacity / 100)).toFixed(3);
	rejectBlock.children[0].children[0].children[1].children[0].value = protocol[protocolID].sorting[id_sorting].accept_exit;
	sortingExitByReject(id_sorting+1);
}
//Обновление данных сортировок при изменении исходных продуктов
function updateAllSorting(){
	for(var i = 0; i < protocol[protocolID].sorting.length; i++){
		sortingExitByAccept(i+1);
		sortingInfoMinSetup("SortingBlockMin_"+Number(i+1));
	}
	updateCheckInboxFraction();
}
//Исключение компонента из расчетов
function removeProtocolComponetsForCalculation(id_component){
	if(id_component != 1 && id_component != protocolComponentsOtherID){
		if(!protocol[protocolID].sourceProduct.components[id_component-1].flag_2){
			if(Number(protocol[protocolID].sourceProduct.components[id_component-1].value) > 0)
				protocol[protocolID].sourceProduct.components[id_component-1].removed_value = Number(protocol[protocolID].sourceProduct.components[id_component-1].value).toFixed(3);
			if(protocolComponentsOtherID != null){
				protocol[protocolID].sourceProduct.components[protocolComponentsOtherID-1].value 
					= Number(protocol[protocolID].sourceProduct.components[protocolComponentsOtherID-1].value) + Number(protocol[protocolID].sourceProduct.components[id_component-1].value);
				protocol[protocolID].sourceProduct.components[protocolComponentsOtherID-1].value 
					= Number(protocol[protocolID].sourceProduct.components[protocolComponentsOtherID-1].value).toFixed(3);
				itemSourceSetup("item_source_"+protocolComponentsOtherID);
			}
			else{
				protocol[protocolID].sourceProduct.components[0].value 
					= Number(protocol[protocolID].sourceProduct.components[0].value) + Number(protocol[protocolID].sourceProduct.components[id_component-1].value);
				protocol[protocolID].sourceProduct.components[0].value = Number(protocol[protocolID].sourceProduct.components[0].value).toFixed(3);
				itemSourceSetup("item_source_"+1);
			}
			protocol[protocolID].sourceProduct.components[id_component-1].value = 0.00;
			itemSourceSetup("item_source_"+id_component);
		}
		else{
			protocol[protocolID].sourceProduct.components[id_component-1].value = 0;
			itemSourceSetup("item_source_"+id_component);
		}
		//Удаление компонента из отбоя
		for(var id_sorting = 1; id_sorting <= protocol[protocolID].sorting.length; id_sorting++){
			if(!protocol[protocolID].sourceProduct.components[id_component-1].flag_2){
				if(Number(protocol[protocolID].sourceProduct.components[id_component-1].value) > 0){
					protocol[protocolID].sorting[id_sorting-1].accept_components[id_component-1].removed_value 
						= Number(protocol[protocolID].sorting[id_sorting-1].accept_components[id_component-1].value).toFixed(3);
					protocol[protocolID].sorting[id_sorting-1].reject_components[id_component-1].removed_value 
						= Number(protocol[protocolID].sorting[id_sorting-1].reject_components[id_component-1].value).toFixed(3);
				}
				if(protocolComponentsOtherID != null){
					protocol[protocolID].sorting[id_sorting-1].accept_components[protocolComponentsOtherID-1].value 
						= Number(protocol[protocolID].sorting[id_sorting-1].accept_components[protocolComponentsOtherID-1].value) 
						+ Number(protocol[protocolID].sorting[id_sorting-1].accept_components[id_component-1].value);
					protocol[protocolID].sorting[id_sorting-1].accept_components[protocolComponentsOtherID-1].value
						= Number(protocol[protocolID].sorting[id_sorting-1].accept_components[protocolComponentsOtherID-1].value).toFixed(3);
						
					protocol[protocolID].sorting[id_sorting-1].reject_components[protocolComponentsOtherID-1].value 
						= Number(protocol[protocolID].sorting[id_sorting-1].reject_components[protocolComponentsOtherID-1].value) 
						+ Number(protocol[protocolID].sorting[id_sorting-1].reject_components[id_component-1].value);
					protocol[protocolID].sorting[id_sorting-1].reject_components[protocolComponentsOtherID-1].value
						= Number(protocol[protocolID].sorting[id_sorting-1].reject_components[protocolComponentsOtherID-1].value).toFixed(3);
						
					 sortingComponentsUpdate(protocolComponentsOtherID);
				}
				else{
					protocol[protocolID].sorting[id_sorting-1].accept_components[0].value = Number(protocol[protocolID].sorting[id_sorting-1].accept_components[0].value) 
						+ Number(protocol[protocolID].sorting[id_sorting-1].accept_components[id_component-1].value);
					protocol[protocolID].sorting[id_sorting-1].accept_components[0].value 
						= Number(protocol[protocolID].sorting[id_sorting-1].accept_components[0].value).toFixed(3);
						
					protocol[protocolID].sorting[id_sorting-1].reject_components[0].value = Number(protocol[protocolID].sorting[id_sorting-1].reject_components[0].value) 
						+ Number(protocol[protocolID].sorting[id_sorting-1].reject_components[id_component-1].value);
					protocol[protocolID].sorting[id_sorting-1].reject_components[0].value 
						= Number(protocol[protocolID].sorting[id_sorting-1].reject_components[0].value).toFixed(3);
						
					sortingComponentsUpdate(1);
				}
				protocol[protocolID].sorting[id_sorting-1].accept_components[id_component-1].value = 0.00;
				protocol[protocolID].sorting[id_sorting-1].reject_components[id_component-1].value = 0.00;
				sortingComponentsUpdate(id_component);
			}
			else{
				protocol[protocolID].sorting[id_sorting-1].accept_components[id_component-1].value = 0;
				protocol[protocolID].sorting[id_sorting-1].reject_components[id_component-1].value = 0;
				sortingComponentsUpdate(id_component);
			}
		}
	}
}
function checkInboxFraction(id_sorting){
	var capacity = null;
	var components = null;
	var value = [];
	//установка значений исходной фракции для первой сортировки
	if(id_sorting == 0){
		capacity += protocol[protocolID].sourceProduct.capacity_type == 0 ? Number(protocol[protocolID].sourceProduct.capacity_value) : Number(protocol[protocolID].sourceProduct.capacity_value * 1000);
		for(var j = 0; j < protocol[protocolID].sourceProduct.components.length; j++){
			value[j] = Number(capacity / 100 * protocol[protocolID].sourceProduct.components[j].value); 
		}
	}
	//Расчет значений под добавленные фракции
	for(var i = 0; i < protocol[protocolID].sorting[id_sorting].inbox_fraction.length; i++){
		if(protocol[protocolID].sorting[id_sorting].inbox_fraction[i].accept){
			capacity += Number(protocol[protocolID].sorting[i].accept_mass * protocol[protocolID].sorting[i].trays_number);
			for(var j = 0; j < protocol[protocolID].sourceProduct.components.length; j++){
				var mass = Number(protocol[protocolID].sorting[i].accept_mass / 100 * protocol[protocolID].sorting[i].accept_components[j].value * protocol[protocolID].sorting[i].trays_number);
				value[j] = value[j] == null ? mass : value[j] + mass;
			}
		}
		if(protocol[protocolID].sorting[id_sorting].inbox_fraction[i].reject){
			capacity += Number(protocol[protocolID].sorting[i].reject_mass * protocol[protocolID].sorting[i].trays_number);
			for(var j = 0; j < protocol[protocolID].sourceProduct.components.length; j++){
				var mass = Number(protocol[protocolID].sorting[i].reject_mass / 100 * protocol[protocolID].sorting[i].reject_components[j].value * protocol[protocolID].sorting[i].trays_number);
				value[j] = value[j] == null ? mass : value[j] + mass;
			}
		}
	}
	if(capacity != null){
		var components = [];
		for(var i = 0; i < value.length; i++){
			components.push({
				"value": Number(value[i] / capacity * 100).toFixed(3)
			});
		}
	}
	
	return [{"capacity": capacity, "components": components}];
}
function updateCheckInboxFraction(){
	var iter_count = 0;
	do{
		var check_value = protocol[protocolID].sorting[0].trays_number;
		for(var i = protocol[protocolID].sorting.length-1; i >= 0 ; i--){
			sortingExitByAccept(i+1);
			sortingInfoMinSetup("SortingBlockMin_"+Number(i+1));
		}
		var temp_check_value = protocol[protocolID].sorting[0].trays_number;
		
		var defference_chech_values = Math.abs(check_value - temp_check_value);
		var defference_chech_values = Number(defference_chech_values).toFixed(2);
		
		iter_count++;
		
		if(iter_count == 100)
			defference_chech_values = 0;
		
	} while (defference_chech_values > 0.01)
}
//Экономическая подготная
function calculationProfitInHour(inputSolutionPriceCost, inputTimePaybeck, inputProfitInHour, inputProfitInMass){
	var hour_in_month = Number(30/7 * protocolRequirements.hour_in_day * protocolRequirements.day_in_week);
	var profit_in_month = Number(inputSolutionPriceCost.value / inputTimePaybeck.value);
	var capacity_per_hour = protocolRequirements.capacity_type == 0 ? protocolRequirements.capacity_per_hour * 1000 : protocolRequirements.capacity_type;
	
	inputProfitInHour.value = Number(profit_in_month/hour_in_month * 1000000).toFixed(3);
	inputProfitInMass.value = Number(inputProfitInHour.value /(capacity_per_hour / 1000)).toFixed(3);
}
function calculationSolutionPriceCost(inputSolutionPriceCost, inputTimePaybeck, inputProfitInHour, inputProfitInMass){
	var hour_in_month = Number(30/7 * protocolRequirements.hour_in_day * protocolRequirements.day_in_week);
	var capacity_per_hour = protocolRequirements.capacity_type == 0 ? protocolRequirements.capacity_per_hour * 1000 : protocolRequirements.capacity_type;
	
	inputSolutionPriceCost.value = Number((hour_in_month * inputTimePaybeck.value * inputProfitInHour.value) / 1000000).toFixed(3);
	inputProfitInMass.value = Number(inputProfitInHour.value /(capacity_per_hour / 1000)).toFixed(3);
}
function calculationTimePayback(inputSolutionPriceCost, inputTimePaybeck, inputProfitInHour, inputProfitInMass){
	
	var hour_in_month = Number(30/7 * protocolRequirements.hour_in_day * protocolRequirements.day_in_week);
	var capacity_per_hour = protocolRequirements.capacity_type == 0 ? protocolRequirements.capacity_per_hour * 1000 : protocolRequirements.capacity_type;
	
	inputProfitInHour.value = Number(inputProfitInMass.value *(capacity_per_hour / 1000)).toFixed(3);
	inputTimePaybeck.value = Number((inputSolutionPriceCost.value * 1000000) /(hour_in_month * inputProfitInHour.value)).toFixed(3)	
}
//Данные по протоколу
var protocol = [];
var queryParametrList = {};
var protocolID = 0;

//функция запуска страницы
function StartApp(){
	read_industry();
}
//Составление параметров для открыия или создание запроса
function getQueryParametrs(){
	var queryString = location.search;
	
	//Проверка существование параметров
	if(queryString){
		queryString = queryString.split("?");
		queryString = queryString[1].split("&");
		
		for(var i=0; i < queryString.length;i++){
			var parametr = queryString[i].split("=");
			queryParametrList[parametr[0]] = parametr[1];
		}
	}
	if(queryParametrList.id != null)
		get_requirements_mainInfo(queryParametrList.id);
	else{
		queryParametrList = {}
		overlay.style.display = "none";
	}
}


//Создание нового протокола
function generateProtocolElement(object_name){
	var date = new Date();
	object_name.push({
		//Данные о создании протокола
		id_protocol: "id_protocol",
		id_requirements: protocolRequirements.id_requirements,
		id_protocolType: 0,
		id_creater: queryParametrList.id_creater,
		id_responsible: queryParametrList.id_responsible,
		create_date: date.getDate() + "." + Number(date.getMonth() + 1) + "." + date.getFullYear(), //Дата создания протокола
		company_name: queryParametrList.company_name,
		//Внешние параметры протокола
		equipment_machine: 9999,
		configuration: 9999,
		main_product: "Продукт",
		main_weed: "Засоритель",
		source_capacity: 0, //Производительность исходного 		
		source_purity: 0, //Частота исходного
		fraction_capacity: 0, //Производительность основной фракции
		fraction_purity: 0, //Частота основной фракции
		//Внутренние параметры протокола
		sorting: [],
		sortingName: [],
		sourceProduct: {
			name : 'Test_name',
			classifier: {
				useADD_ID: Math.random().toString(36).substring(2,10) + "PR0",
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
			purity: 0.00,
			capacity_value: 0.00,
			capacity_type: 0, //0 - кг/ч; 1 - т/ч
			selection_value: 100.00,
			selection_type: 0, //0 - грамм; 1 - штук
			images : [],
			components : []
		}
	});
}
//Генерация элемента Сортировки
function generateSortElement(object_name, id_sortElement, accept_name, reject_name){
	var sortElement ={
		//id-сортирофки
		id : Number(id_sortElement),
		//дополнительные значение сортировок
		trays_number: 0,
		capacity_value: 1,
		capacity_type: 0,
		//значения прохода сортировки
		accept_name: String(accept_name),
		accept_name_id: 0,
		accept_exit: 100.00,
		accept_purity: 0.00,
		accept_mass: 0.00,
		accept_selection_mass: 100.00,
		accept_selection_type: 0.00,
		accept_img: [],
		//значения отбоя сортировки
		reject_name: String(reject_name),
		reject_name_id: 0,
		reject_exit: 0.00,
		reject_purity: 0.00,
		reject_mass: 0.00,
		reject_selection_mass: 100.00,
		reject_selection_type: 0.00,
		reject_img: [],
		//данные по компанентам сортировки
		accept_components: [],
		reject_components : [],
		//входящие фракции
		inbox_fraction: [{accept: false, reject: false}]
	};
	if(object_name == protocol)
		protocol[protocolID].sorting.push(sortElement);
	else
		protocolSearch[searchProtocolID].sorting.push(sortElement);
}
//Изменения значений слайдера и поля ввода
function InputEdit(Input,Slider){
	Input.value = Number(Slider.value);
}
function SliderEdit(Input,Slider){
	Slider.value = Input.value;
	
	if(Number(Input.value) > Slider.max)
		Input.value = Slider.max;
}
//изменение максимальных значений слайдера отосительно введеных значений
function SliderMaxValue(InputMain,Input,Slider){
	var coef = Number(InputMain.value / Slider.max).toFixed(3);
	Slider.max = Number(InputMain.value).toFixed(3);
	Slider.value = Number(Input.value * coef).toFixed(3);
	for(var id=1; id<=source_item; id++){
		InputEdit(Input,Slider);
	}
}
//Функции отображениея элементов протокола
function sourceBlockView(){
	if(sourceBlockComponents.style.display == "none")
	{
		sourceBlockComponents.style.display = "flex";
		sourceBlock.style.display = "none";
		protocolSettings.style.display = "none";
		Sorting.style.display = "none";
		addSortingButton.style.display = "none";
		addComponentButton.style.display = "flex";
		sourceProductUpdate();
		changePageName("protocolComponentsPage");
	}
	else{
		sourceBlockComponents.style.display = "none";
		sourceBlock.style.display = "flex";
		protocolSettings.style.display = "flex";
		Sorting.style.display = "flex";
		addSortingButton.style.display = !search_load ? "flex" : "none";
		addComponentButton.style.display = "none";
		sourceProductUpdate();
		changePageName("protocolPage");
	}
}

function protocolBlockView(){
	if(protocolPage.style.display == "none")
	{
		protocolPage.style.display = "flex";
		mainPage.style.display = "none";
		addSortingButton.style.display = !search_load ? "flex" : "none";
		changePageName("protocolPage");
		headerTooltip.children[1].style.display = "";
		
		if(protocolSearch.length > 0)
			searchPage.style.display = "none";
	}
	else{
		protocolPage.style.display = "none";
		mainPage.style.display = "flex";
		addSortingButton.style.display = "none";
		changePageName("mainPage");
		
		if(search_load){
			//Отчистка для интерфейса поиска
			protocol.splice(protocol.length-1,1);
			load_protocol.splice(load_protocol-1,1);
			search_load = false;
			searchProtocolID = 0;
		}
		else
			addProtocolMainParamets(protocolID+1);
		
		headerTooltip.children[1].style.display = "none";
		
		if(protocolSearch.length > 0)
			searchPage.style.display = "flex";
	}
}
function programBlockView(){
	if(programBlock.style.display == "none")
		programBlock.style.display = "flex";
	else
		programBlock.style.display = "none";
}
function requirementsBlockView(){
	if(requirementsPage.style.display == "none")
	{
		requirementsPage.style.display = "flex";
		mainPage.style.display = "none";
		changePageName("requirementPage");
		
		if(protocolSearch.length > 0)
			searchPage.style.display = "none";
		
		headerTooltip.children[1].style.display = "";
	}
	else{
		requirementsPage.style.display = "none";
		mainPage.style.display = "flex";
		
		setupMainPageCapacity(protocolRequirements, capactityRequirements , capactityRequirementsText);
		mainPageProduct(protocolRequirements.components, productNameRequirements);
		changePageName("mainPage");
		
		if(protocolSearch.length > 0)
			searchPage.style.display = "flex";
		
		headerTooltip.children[1].style.display = "none";
	}
}
function AddSourceBlockView(){
	if(addSourceBlock.style.display == "none"){
		addSourceBlock.style.display = "flex";
	}
	else 
	{
		addSourceBlock.style.display = "none";
	}
}
function sortBlockView(id_sorting){
	if(acceptComponents.style.display == "none")
	{
		acceptEmpty.style.display = "flex";
		acceptInput.style.display = "flex";
		acceptComponents.style.display = "flex";
		rejectEmpty.style.display = "flex";
		rejectInput.style.display = "flex";
		rejectComponents.style.display = "flex";
		sortingFractionsComponents.style.flexDirection = "column";
		sortingFractionsComponents.style.background = "none";
		addSortingButton.style.display = "none";
		sourceBlock.style.display = "none";
		protocolSettings.style.display = "none";
		SortingInfoMin.style.display = "none";
		SortingInfoMax.style.display = "";
		protocolPage.children[0].style.display = "none";
		changePageName("protocolSortingPage");
	}
	else{
		acceptEmpty.style.display = "none";
		acceptInput.style.display = "none";
		acceptComponents.style.display = "none";
		rejectEmpty.style.display = "none";
		rejectInput.style.display = "none";
		rejectComponents.style.display = "none";
		sortingFractionsComponents.style.flexDirection = "row";
		sortingFractionsComponents.style.background = "gray";
		addSortingButton.style.display = !search_load ? "flex" : "none";
		sourceBlock.style.display = "flex";
		protocolSettings.style.display = "flex";
		SortingInfoMin.style.display = "";
		SortingInfoMax.style.display = "none";
		protocolPage.children[0].style.display = "";
		updateCheckInboxFraction();
		changePageName("protocolPage");
	}
	//Дописать функцию
	sortingInfo(id_sorting);
	setupInfoFractionName();
}
function sortingInfo(id_sorting){
	if(id_sorting != null){
		var id = Number(id_sorting.substr(16));
		SortingLable.selectedIndex = id-1;
		
		acceptLabel.textContent = id < 9 ? "Проход 0" + id : "Проход " + id;
		rejectLabel.textContent = id < 9 ? "Отбой 0" + id : "Отбой " + id;
		
		sortingChangePrevievPhoto(id-1);
		sortingHideEnterFraction(id);
		sortingUpdateEnterFraction();
		sortingInfoMaxSetup();
	}
	else{
		for(var id=1; id<=protocol[protocolID].sorting.length; id++)
			sortingInfoMinSetup("SortingBlockMin_"+id);
	}
	sortingHidePhotoBlock();
}
function changePageName(name){
	var pageNameText = headerTooltip.children[0];
	switch(name){
		case "mainPage":
			pageNameText.textContent = "Основная страница";
			break;
		case "requirementPage":
			pageNameText.textContent = "Страница требований";
			break;
		case "protocolPage":
			pageNameText.textContent = "Страница протокола";
			break;
		case "protocolComponentsPage":
			pageNameText.textContent = "Страница компонентов исходного продукта";
			break;
		case "protocolSortingPage":
			pageNameText.textContent = "Страница сортировок протокола";
			break;
	}
}
function returToMainPage(){
	if(requirementsPage.style.display != "none")
		requirementsBlockView();
	else if(sourceBlockComponents.style.display != "none")
		sourceBlockView();
	else if(acceptComponents.style.display != "none")
		sortBlockView();
	else if (protocolPage.style.display != "none"){
		protocolBlockView();	
	}
}
//Функция простомтра протокола
function protocolResultView(id_value){
	var ID = Number(id_value.substr(9)-1);
	
	if(!isNaN(protocol[ID].id_protocol))
		window.open("result?id="+protocol[ID].id_protocol, "_blank");
	else
		alert("Перед просмотром сохраните протокол");
}
//Функция переключения сортировок
function sortingLableChange(){
	var id = Number(SortingLable.value);
	
	acceptLabel.textContent = protocol[protocolID].sorting[id].accept_name;
	rejectLabel.textContent = protocol[protocolID].sorting[id].reject_name;
	
	sortingChangePrevievPhoto(id);
	sortingHideEnterFraction(id+1);
	sortingUpdateEnterFraction();
	sortingHidePhotoBlock();
	sortingInfoMaxSetup();
}
function sortingHidePhotoBlock(){
	for(var id=1; id<=protocol[protocolID].sorting.length; id++){
		document.getElementById("acceptAddPhotoBlock_"+id).style.display = "none";
		document.getElementById("rejectAddPhotoBlock_"+id).style.display = "none";
	}
}
function sortingChangePrevievPhoto(id){
	//замена фотографиии для Прохода
	if(protocol[protocolID].sorting[id].accept_img.length > 0)
		document.getElementById("acceptInput").children[1].children[0].children[0].src = protocol[protocolID].sorting[id].accept_img[protocol[protocolID].sorting[id].accept_img.length-1];
	else
		document.getElementById("acceptInput").children[1].children[0].children[0].src = "/static/img/req/photo.png";
	//замена фотографиии для Отбоя	
	if(protocol[protocolID].sorting[id].reject_img.length > 0)
		document.getElementById("rejectInput").children[1].children[0].children[0].src = protocol[protocolID].sorting[id].reject_img[protocol[protocolID].sorting[id].reject_img.length-1];
	else
		document.getElementById("rejectInput").children[1].children[0].children[0].src = "/static/img/req/photo.png";		
}
function sortingHideEnterFraction(id){
	//отображение всех входящих фракций
	for(var i=1; i<=protocol[protocolID].sorting.length; i++)
		document.getElementById("inputRowSource_"+i).style.display = "flex";
	//скрытие вохдящей фракции выбранной сортировки
	document.getElementById("inputRowSource_"+id).style.display = "none";	
}
//функции обновления входящих фракции для сортировок
function sortingUpdateEnterFraction(){
	var id = SortingLable.value;
	
	for(var i=1; i<=protocol[protocolID].sorting.length; i++){
		var acceptElement = document.getElementById("inputRowSource_"+i).children[1].children[1];
		var rejectElement = document.getElementById("inputRowSource_"+i).children[2].children[1];
		
		acceptElement.checked = protocol[protocolID].sorting[id].inbox_fraction[i-1].accept;
		rejectElement.checked = protocol[protocolID].sorting[id].inbox_fraction[i-1].reject;		
	}
}
function sortingEnterFraction(targetElement){
	var id = SortingLable.value;
	for(var i=1; i<=protocol[protocolID].sorting.length; i++){
		var acceptElement = document.getElementById("inputRowSource_"+i).children[1].children[1];
		var rejectElement = document.getElementById("inputRowSource_"+i).children[2].children[1];

		if(targetElement == acceptElement){
			acceptElement.checked = protocol[protocolID].sorting[id].inbox_fraction[i-1].accept ? false : true;
			rejectElement.checked = false;
		}
		else if(targetElement == rejectElement){
			rejectElement.checked = protocol[protocolID].sorting[id].inbox_fraction[i-1].reject ? false : true;
			acceptElement.checked = false;
		}
		protocol[protocolID].sorting[id].inbox_fraction[i-1].accept = acceptElement.checked;
		protocol[protocolID].sorting[id].inbox_fraction[i-1].reject = rejectElement.checked;	
	}
	updateAllSorting();
}
//функция отображение классификатора компанента
function classifier(id){
	try{
		var selectElement = document.getElementById("item_source_"+id).children[1].children[0].children[0];
		var classifier = document.getElementById("classifier_"+id);
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
	catch{
		return false;
	}
}
//функция добаления нового классивикатора в компанент
function classifierSourceEdit(id){
	try{
		var selectElementSource = document.getElementById("item_source_"+id).children[1].children[0].children[0];
		var classifier = document.getElementById("classifier_"+id);
		//Наименование классификатора
		var classifierSelectElementName = classifier.children[0].children[0].children[5].children[0];	
		var classifierSelectDescription = classifier.children[0].children[0].children[7].children[0];
		//Наименования засорителя
		var classifierClassWeedSelectElememnt = classifier.children[0].children[2].children[5].children[0];
		var classifierWeedSelectElememnt = classifier.children[0].children[2].children[7].children[0];
		var classifierDescriptionWeedSelectElememnt = classifier.children[0].children[2].children[9].children[0];
		
		var classifierOption = document.createElement('option');
		classifierOption.value = "classifier";
		
		if(protocol[protocolID].sourceProduct.components[id-1].classifier.classifierType == 0){
			//Проверка наличия предустановленного наименования
			if(classifierSelectElementName.value != 9999)
				classifierOption.text = list_product[classifierSelectElementName.value].productName
			if(classifierSelectDescription.value != 9999)
				classifierOption.text += " (" + list_descriptionWeeed[classifierSelectDescription.value].descriptionName + ")";
				
			var NameElement = classifierSelectElementName;
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
		protocol[protocolID].sourceProduct.components[id-1].product_name = classifierOption.text;
	
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
		overlayDisplayBlcok.style.zIndex = 0;
		//Отчиста ID-класификатора
		clearClassifierSource(id);
		//Заполнение ID-класификатора Продукт
		protocol[protocolID].sourceProduct.components[id-1].classifier.classifierProduct.useADD = false;
		protocol[protocolID].sourceProduct.components[id-1].classifier.classifierProduct.mainClassifier.industryID = classifier.children[0].children[0].children[1].children[0].value;
		protocol[protocolID].sourceProduct.components[id-1].classifier.classifierProduct.mainClassifier.groupProductID = classifier.children[0].children[0].children[3].children[0].value;
		protocol[protocolID].sourceProduct.components[id-1].classifier.classifierProduct.mainClassifier.productID = classifier.children[0].children[0].children[5].children[0].value;
		protocol[protocolID].sourceProduct.components[id-1].classifier.classifierProduct.mainClassifier.descriptionID = classifier.children[0].children[0].children[7].children[0].value;
		protocol[protocolID].sourceProduct.components[id-1].classifier.classifierProduct.mainClassifier.productTypeID = classifier.children[0].children[0].children[9].children[0].value;
		protocol[protocolID].sourceProduct.components[id-1].classifier.classifierProduct.mainClassifier.productSortID = classifier.children[0].children[0].children[11].children[0].value;
		//Заполнение ID-класификатора Засоритель
		protocol[protocolID].sourceProduct.components[id-1].classifier.classifierWeed.useADD = false;
		protocol[protocolID].sourceProduct.components[id-1].classifier.classifierWeed.mainClassifier.industryID = classifier.children[0].children[2].children[1].children[0].value;
		protocol[protocolID].sourceProduct.components[id-1].classifier.classifierWeed.mainClassifier.categoryID = classifier.children[0].children[2].children[3].children[0].value;
		protocol[protocolID].sourceProduct.components[id-1].classifier.classifierWeed.mainClassifier.classWeedID = classifier.children[0].children[2].children[5].children[0].value;
		protocol[protocolID].sourceProduct.components[id-1].classifier.classifierWeed.mainClassifier.weedNameID = classifier.children[0].children[2].children[7].children[0].value;
		protocol[protocolID].sourceProduct.components[id-1].classifier.classifierWeed.mainClassifier.descriptionID = classifier.children[0].children[2].children[9].children[0].value;
		
		updateSourceMaxInfo();
		headerTooltip.children[1].style.display = "";
		//itemSourceNameUpdate(id);
	}
	catch(error){
		console.log(error.name+": "+ error.message);
	}
}
function clearClassifierSource(id){
	protocol[protocolID].sourceProduct.components[id-1].classifier.classifierProduct = {
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
	protocol[protocolID].sourceProduct.components[id-1].classifier.classifierWeed = {
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
//Функции отображение класификатора для исходного продукта
function classifierProduct(){
	try{
		var productBlock = sourceBlockComponents.children[0];
		var selectElement = productBlock.children[0].children[1].children[0];
		if(selectElement.options[selectElement.value].textContent == "Классификатор"){
			productClassifier.style.display = "flex";
			headerTooltip.children[1].style.display = "none";
			productClassifier.style.zIndex = 2;
			overlayDisplayBlcok.style.zIndex = 1;
		}
		else{
			productClassifier.style.display = "none";
			productClassifier.style.zIndex = 0;
			overlayDisplayBlcok.style.zIndex = 0;
		}
	}
	catch{
		productClassifier.style.display = "none";
	}
}
//Функция добавление нового классивикатора в исходный продукт
function classifierProductEdit(){
	var productBlock = sourceBlockComponents.children[0];
	var selectElementProduct = productBlock.children[0].children[1].children[0];
	//Наименование классификатора
	var classifierProductSelectElementName = productClassifier.children[0].children[0].children[5].children[0];
	var classifierProductSelectDescription = productClassifier.children[0].children[0].children[7].children[0];
	//Наименования засорителя
	var classifierClassWeedSelectElememnt = productClassifier.children[0].children[2].children[5].children[0];
	var classifierWeedSelectElememnt = productClassifier.children[0].children[2].children[7].children[0];
	var classifierDescriptionWeedSelectElememnt = productClassifier.children[0].children[2].children[9].children[0];
	
	var classifierOption = document.createElement('option');
	classifierOption.value ="classifier";
	
	if(protocol[protocolID].sourceProduct.classifier.classifierType == 0){
		//Проверка наличия предустановленного наименования
		if(classifierProductSelectElementName.value != 9999)
			classifierOption.text = list_product[classifierProductSelectElementName.value].productName
		if(classifierProductSelectDescription.value != 9999)
			classifierOption.text += " (" + list_descriptionWeeed[classifierProductSelectDescription.value].descriptionName + ")";
			
		var NameElement = classifierProductSelectElementName;
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
	protocol[protocolID].sourceProduct.name = classifierOption.text;
	
	if(classifierOption.text.length > 23)
		classifierOption.text = classifierOption.text.substring(0,20) + "...";
	
	//Проверка сущестования компанента класификатора, его перезапись
	if(selectElementProduct[selectElementProduct.length-1].value != "classifier" && NameElement.value != 9999)
		selectElementProduct.add(classifierOption);
	else if(NameElement.value != 9999)
		selectElementProduct[selectElementProduct.length-1] = classifierOption;
	
	productClassifier.style.display = "none";
	productClassifier.style.zIndex = 0;
	overlayDisplayBlcok.style.zIndex = 0;
	//Отчиста ID-класификатора
	clearClassifierProduct();
	//Заполнение ID-класификатора Продукт
	protocol[protocolID].sourceProduct.classifier.classifierProduct.useADD = false;
	protocol[protocolID].sourceProduct.classifier.classifierProduct.mainClassifier.industryID = productClassifier.children[0].children[0].children[1].children[0].value;
	protocol[protocolID].sourceProduct.classifier.classifierProduct.mainClassifier.groupProductID = productClassifier.children[0].children[0].children[3].children[0].value;
	protocol[protocolID].sourceProduct.classifier.classifierProduct.mainClassifier.productID = productClassifier.children[0].children[0].children[5].children[0].value;
	protocol[protocolID].sourceProduct.classifier.classifierProduct.mainClassifier.descriptionID = productClassifier.children[0].children[0].children[7].children[0].value;
	protocol[protocolID].sourceProduct.classifier.classifierProduct.mainClassifier.productTypeID = productClassifier.children[0].children[0].children[9].children[0].value;
	protocol[protocolID].sourceProduct.classifier.classifierProduct.mainClassifier.productSortID = productClassifier.children[0].children[0].children[11].children[0].value;
	protocol[protocolID].sourceProduct.classifier.classifierProduct.mainClassifier.purposeID = productClassifier.children[0].children[0].children[13].children[0].value;
	protocol[protocolID].sourceProduct.classifier.classifierProduct.mainClassifier.GOST_ID = productClassifier.children[0].children[0].children[15].children[0].value;
	//Заполнение ID-класификатора Засоритили
	protocol[protocolID].sourceProduct.classifier.classifierWeed.useADD = false;
	protocol[protocolID].sourceProduct.classifier.classifierWeed.mainClassifier.industryID = productClassifier.children[0].children[2].children[1].children[0].value;
	protocol[protocolID].sourceProduct.classifier.classifierWeed.mainClassifier.categoryID = productClassifier.children[0].children[2].children[3].children[0].value;
	protocol[protocolID].sourceProduct.classifier.classifierWeed.mainClassifier.classWeedID = productClassifier.children[0].children[2].children[5].children[0].value;
	protocol[protocolID].sourceProduct.classifier.classifierWeed.mainClassifier.weedNameID = productClassifier.children[0].children[2].children[7].children[0].value;
	protocol[protocolID].sourceProduct.classifier.classifierWeed.mainClassifier.descriptionID = productClassifier.children[0].children[2].children[9].children[0].value;
	
	//Обнавление компанента, и закрытие классификатора
	if(NameElement.value != 9999){
		selectElementProduct.selectedIndex = selectElementProduct.length-1;
		
		protocol[protocolID].sourceProduct.components[0].classifier.classifierType = protocol[protocolID].sourceProduct.classifier.classifierType;
		protocol[protocolID].sourceProduct.components[0].classifier.classifierProduct.useADD = protocol[protocolID].sourceProduct.classifier.classifierProduct.useADD;
		protocol[protocolID].sourceProduct.components[0].classifier.classifierWeed.useADD = protocol[protocolID].sourceProduct.classifier.classifierWeed.useADD;
		//Заполнение ID-класификатора Продукт
		protocol[protocolID].sourceProduct.components[0].classifier.classifierProduct.mainClassifier.industryID = protocol[protocolID].sourceProduct.classifier.classifierProduct.mainClassifier.industryID;
		protocol[protocolID].sourceProduct.components[0].classifier.classifierProduct.mainClassifier.groupProductID = protocol[protocolID].sourceProduct.classifier.classifierProduct.mainClassifier.groupProductID;
		protocol[protocolID].sourceProduct.components[0].classifier.classifierProduct.mainClassifier.productID = protocol[protocolID].sourceProduct.classifier.classifierProduct.mainClassifier.productID;
		protocol[protocolID].sourceProduct.components[0].classifier.classifierProduct.mainClassifier.descriptionID = protocol[protocolID].sourceProduct.classifier.classifierProduct.mainClassifier.descriptionID;
		protocol[protocolID].sourceProduct.components[0].classifier.classifierProduct.mainClassifier.productTypeID = protocol[protocolID].sourceProduct.classifier.classifierProduct.mainClassifier.productTypeID;
		protocol[protocolID].sourceProduct.components[0].classifier.classifierProduct.mainClassifier.productSortID = protocol[protocolID].sourceProduct.classifier.classifierProduct.mainClassifier.productSortID;
		//Заполнение ID-класификатора Засоритили
		protocol[protocolID].sourceProduct.components[0].classifier.classifierWeed.mainClassifier.industryID = protocol[protocolID].sourceProduct.classifier.classifierWeed.mainClassifier.industryID;
		protocol[protocolID].sourceProduct.components[0].classifier.classifierWeed.mainClassifier.categoryID = protocol[protocolID].sourceProduct.classifier.classifierWeed.mainClassifier.categoryID;
		protocol[protocolID].sourceProduct.components[0].classifier.classifierWeed.mainClassifier.classWeedID = protocol[protocolID].sourceProduct.classifier.classifierWeed.mainClassifier.classWeedID;
		protocol[protocolID].sourceProduct.components[0].classifier.classifierWeed.mainClassifier.weedNameID = protocol[protocolID].sourceProduct.classifier.classifierWeed.mainClassifier.weedNameID;
		protocol[protocolID].sourceProduct.components[0].classifier.classifierWeed.mainClassifier.descriptionID = protocol[protocolID].sourceProduct.classifier.classifierWeed.mainClassifier.descriptionID;
		
		setupClassifierComponents(1);
	}
	headerTooltip.children[1].style.display = "";
	sourceProductNameUpdate();
}
function clearClassifierProduct(){
	protocol[protocolID].sourceProduct.classifier.classifierProduct = {
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
	protocol[protocolID].sourceProduct.classifier.classifierWeed = {
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
var source_item = 0; //Начальное количество компанентов 
//Функции добавление компанента в исходное
function addSourceItem(object_name){
	source_item++;
	var cloneItem = item_source_0.cloneNode(true);
	var cloneAddPhotoBlock = addPhotoBlock_0.cloneNode(true);
	var cloneClassifier = classifier_0.cloneNode(true);
	cloneItem.id = "item_source_" + source_item;
	cloneAddPhotoBlock.id = "addPhotoBlock_" + source_item;
	cloneClassifier.id = "classifier_" + source_item;
	
	cloneItem.style = "display: flex";
	
	if(source_item<10)
		cloneItem.children[0].children[0].children[1].textContent = "0"+source_item;
	else
		cloneItem.children[0].children[0].children[1].textContent = source_item;
	
	if(source_item == 1){
		cloneItem.children[0].children[0].children[0].style.display = "none";
		//Отключение возможности редактирования внутри классификатора
		cloneClassifier.children[0].children[0].children[13].style.display = "none";
		cloneClassifier.children[0].children[1].children[14].style.display = "none";
		cloneClassifier.children[0].children[2].children[11].style.display = "none";
		cloneClassifier.children[0].children[3].children[12].style.display = "none";	
		cloneClassifier.children[0].children[5].children[0].children[0].disabled = "disabled";
		
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
		
	
	item_source_block.appendChild(cloneItem);
	item_source_block.appendChild(cloneAddPhotoBlock);
	item_source_block.appendChild(cloneClassifier);
	
	//Обновление заначений компанетов в зависимости от выборки
	//cloneItem.children[1].children[1].children[0].max = protocol[protocolID].sourceProduct.selection_value;
	//cloneItem.children[1].children[0].children[1].children[0].value = Number(protocol[protocolID].sourceProduct.selection_value).toFixed(3);
	//добавление функции для вызова классификатора
	cloneItem.children[1].children[0].children[0].addEventListener("change",function(){
		classifier(cloneItem.id.substr(12));
	});
	//добавление функции для удаления компанента
	cloneItem.children[0].children[0].children[0].addEventListener("click", function(){
		delateCompItem(cloneItem.id);
	});
	//добаление функции для добаления нового классификатора
	cloneClassifier.children[0].children[5].children[2].addEventListener("click", function(){
		classifierSourceEdit(cloneClassifier.id.substr(11));
	});
	cloneClassifier.children[0].children[0].children[13].addEventListener("click", function(){
		classifierSourceComponentProductVidewADD(cloneClassifier.id.substr(11));
	});
	cloneClassifier.children[0].children[1].children[13].addEventListener("click", function(){
		classifierSourceComponentNewProductADD(cloneClassifier.id.substr(11));
	});
	cloneClassifier.children[0].children[1].children[14].addEventListener("click", function(){
		classifierSourceComponentProductVidewADD(cloneClassifier.id.substr(11));
	});
	cloneClassifier.children[0].children[2].children[11].addEventListener("click", function(){
		classifierSourceComponentWeedVidewADD(cloneClassifier.id.substr(11));
	});
	cloneClassifier.children[0].children[3].children[11].addEventListener("click", function(){
		classifierSourceComponentNewWeedADD(cloneClassifier.id.substr(11));
	});
	cloneClassifier.children[0].children[3].children[12].addEventListener("click", function(){
		classifierSourceComponentWeedVidewADD(cloneClassifier.id.substr(11));
	});
	cloneClassifier.children[0].children[5].children[0].children[0].addEventListener("change", function(){
		classifierSourceCompanentChangeType(cloneClassifier.id.substr(11));
	});
	//Добавление функций переключения для компонента
	sourceComponentsClassifierAddEvenListeners(cloneClassifier.id.substr(11));
	//Добавлениее функции для прикрепление фотографий компанента
	var cloneImage = cloneItem.children[2].children[0].children[0];
	var cloneInputField = cloneItem.children[3];
	file_img_change(cloneInputField,cloneImage); //добавление изображения
	//Добавление функции для взаимодействия слайдеров и инпутами; Добавление функций для обновление значений компанента
	cloneItem.children[1].children[0].children[1].children[0].addEventListener("change", function(){
		var Input = cloneItem.children[1].children[0].children[1].children[0];
		var Slider = cloneItem.children[1].children[1].children[0];
		
		chengeTypeOfValue(protocol[protocolID].sourceProduct, protocol[protocolID].sourceProduct.components[source_item-1], Input);
		SliderEdit(Input,Slider);
		itemSourceUpdate(cloneItem.id);
		calculation_main_protocol(cloneItem.id.substr(12));
	});
	cloneItem.children[1].children[0].children[1].children[1].addEventListener("change", function(){
		itemSourceUpdate(cloneItem.id);
	});
	cloneItem.children[1].children[1].children[0].addEventListener("input", function(){
		var Input = cloneItem.children[1].children[0].children[1].children[0];
		var Slider = cloneItem.children[1].children[1].children[0];
		
		InputEdit(Input,Slider);
		itemSourceUpdate(cloneItem.id);
		calculation_main_protocol(cloneItem.id.substr(12));
	});
	cloneItem.children[1].children[1].children[1].children[0].addEventListener("click", function(){
		itemSourceUpdate(cloneItem.id);
	});
	cloneItem.children[1].children[1].children[1].children[1].addEventListener("click", function(){
		itemSourceUpdate(cloneItem.id);
		removeProtocolComponetsForCalculation(cloneItem.id.substr(12));
	});
	//добавление функции вызова прикрепления изображения компанента
	cloneItem.children[2].addEventListener("click", function(){
		addItemPhoto_1(cloneItem.id.substr(12));
	});
	cloneAddPhotoBlock.children[0].addEventListener("click", function(){
		addItemPhoto_2(cloneItem.id.substr(12));
	});
	//Добавление функций для слайдеров и импутов комонетов создание прочего и т.д.
	cloneItem.children[1].children[0].children[1].children[0].addEventListener("change", checkProtocolComponents);
	cloneItem.children[1].children[1].children[0].addEventListener("input", checkProtocolComponents);
	
	//добавление нового компанета в исходный компанентов
	protocol[protocolID].sourceProduct.components.push({
		object_name: cloneItem.id,
		product_name: "-",
		classifier: {
			useADD_ID: Math.random().toString(36).substring(2,10) + "PR" + (protocol[protocolID].sourceProduct.components.length + 1),
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
		value: protocol[protocolID].sourceProduct.components.length == 0 ? 100 : 0,
		value_type: 0,
		removed_value: 0,
		flag_1: protocol[protocolID].sourceProduct.components.length == 0 ? true : false,
		flag_2: true,
		images: []
	});
	//добавление нового компанета для всех сортировок
	for(var id=0; id<protocol[protocolID].sorting.length; id++){
		protocol[protocolID].sorting[id].accept_components.push({
			product_name: "-",
			iterfraction_percent: 0.00,
			value: protocol[protocolID].sorting[id].accept_components.length == 0 ? 100 : 0,
			value_type: 0,
			removed_value: 0,
			flag_1: protocol[protocolID].sorting[id].accept_components.length == 0 ? true : false,
			flag_2: false
		});
		protocol[protocolID].sorting[id].reject_components.push({
			product_name: "-",
			iterfraction_percent: 0.00,
			value: protocol[protocolID].sorting[id].reject_components.length == 0 ? 100 : 0,
			value_type: 0,
			removed_value: 0,
			flag_1: protocol[protocolID].sorting[id].reject_components.length == 0 ? true : false,
			flag_2: false
		});
	}
	//уствнока значений для компанентов
	itemSourceSetup(cloneItem.id);
	//исполнение функции по добавлению в проход и отбой
	addAccepRejectItem();
	updateSourceMaxInfo();
}
//Функция добавления компанентов в проход и отбой
function addAccepRejectItem(){
	var cloneAccept = item_acceptComp_0.cloneNode(true);
	var cloneReject = item_rejectComp_0.cloneNode(true);
	cloneAccept.id = "item_acceptComp_" + source_item;
	cloneReject.id = "item_rejectComp_" + source_item;
	cloneAccept.style = "display: flex";
	cloneReject.style = "display: flex";
	
	if(source_item<10)
	{
		cloneAccept.children[0].children[0].children[0].textContent = "0"+source_item;
		cloneReject.children[0].children[0].children[0].textContent = "0"+source_item;
	}
	else
	{
		cloneAccept.children[0].children[0].children[0].textContent = source_item;
		cloneReject.children[0].children[0].children[0].textContent = source_item;
	}
	
	//Обновление заначений компанетов прохода в зависимости от выборки
	//cloneAccept.children[1].children[1].children[0].max = protocol[protocolID].sorting[SortingLable.value].accept_selection_mass;
	//protocol[protocolID].sorting[SortingLable.value].accept_components[Number(cloneAccept.id.substr(16))-1].value = protocol[protocolID].sorting[SortingLable.value].accept_selection_mass;
	acceptInput.children[0].children[1].children[0].addEventListener("change",function(){
		
	});
	//Добавление функционала для обновления компанентов прохода сортировок
	cloneAccept.children[1].children[0].children[1].children[0].addEventListener("change", function(){
		var compID = Number(cloneAccept.id.substr(16));
		var Input = cloneAccept.children[1].children[0].children[1].children[0];
		var Slider = cloneAccept.children[1].children[1].children[0];
		
		chengeTypeOfValueSorting(protocol[protocolID].sorting[SortingLable.value], protocol[protocolID].sorting[SortingLable.value].accept_components[compID-1], "accept", Input);
		SliderEdit(Input,Slider);
		sortingComponentsUpdate(compID);
		//sortingExitByAccept(Number(SortingLable.value) + 1);
	});
	cloneAccept.children[1].children[1].children[0].addEventListener("input", function(){
		var compID = Number(cloneAccept.id.substr(16));
		var Input = cloneAccept.children[1].children[0].children[1].children[0];
		var Slider = cloneAccept.children[1].children[1].children[0];
		
		InputEdit(Input,Slider);
		sortingComponentsUpdate(compID);
		//sortingExitByAccept(Number(SortingLable.value) + 1);
	});
	cloneAccept.children[1].children[0].children[1].children[1].addEventListener("change", function(){
		var compID = Number(cloneAccept.id.substr(16));
		sortingComponentsUpdate(compID);
	});
	cloneAccept.children[1].children[0].children[1].children[2].children[0].addEventListener("click", function(){
		var compID = Number(cloneAccept.id.substr(16));
		sortingComponentsUpdate(compID);
	});
	cloneAccept.children[1].children[0].children[1].children[2].children[1].addEventListener("click", function(){
		var compID = Number(cloneAccept.id.substr(16));
		sortingComponentsUpdate(compID);
	});
	//Обновление заначений компанетовотбоя в зависимости от выборки
	//cloneReject.children[1].children[1].children[0].max = protocol[protocolID].sorting[SortingLable.value].reject_selection_mass;
	//protocol[protocolID].sorting[SortingLable.value].reject_components[Number(cloneReject.id.substr(16))-1].value = protocol[protocolID].sorting[SortingLable.value].reject_selection_mass;
	rejectInput.children[0].children[1].children[0].addEventListener("change",function(){
		
	});
	//Добавление функционала для обновления компанентов отбоя сортировок
	cloneReject.children[1].children[0].children[1].children[0].addEventListener("change", function(){
		var compID = Number(cloneReject.id.substr(16));
		var Input = cloneReject.children[1].children[0].children[1].children[0];
		var Slider = cloneReject.children[1].children[1].children[0];
		
		chengeTypeOfValueSorting(protocol[protocolID].sorting[SortingLable.value], protocol[protocolID].sorting[SortingLable.value].reject_components[compID-1], "reject", Input);
		SliderEdit(Input,Slider);
		sortingComponentsUpdate(compID);
		//sortingExitByReject(Number(SortingLable.value) + 1);
	});
	cloneReject.children[1].children[1].children[0].addEventListener("input", function(){
		var compID = Number(cloneReject.id.substr(16));
		var Input = cloneReject.children[1].children[0].children[1].children[0];
		var Slider = cloneReject.children[1].children[1].children[0];
		
		InputEdit(Input,Slider);
		sortingComponentsUpdate(compID);
		//sortingExitByReject(Number(SortingLable.value) + 1);
	});
	cloneReject.children[1].children[0].children[1].children[1].addEventListener("change", function(){
		var compID = Number(cloneReject.id.substr(16));
		sortingComponentsUpdate(compID);
	});
	cloneReject.children[1].children[0].children[1].children[2].children[0].addEventListener("click", function(){
		var compID = Number(cloneReject.id.substr(16));
		sortingComponentsUpdate(compID);
	});
	cloneReject.children[1].children[0].children[1].children[2].children[1].addEventListener("click", function(){
		var compID = Number(cloneReject.id.substr(16));
		sortingComponentsUpdate(compID);
	});
	
	acceptComponents.appendChild(cloneAccept);
	rejectComponents.appendChild(cloneReject);
	
	addCalculationAcceptComponents(source_item);
	addCalculationRejectComponents(source_item);
}
//Функция удаления ненужного компанента
function delateCompItem(id_item){
	var id = id_item.substr(12);
	document.getElementById("item_source_"+id).remove();
	document.getElementById("addPhotoBlock_"+id).remove();
	document.getElementById("classifier_"+id).remove();
	document.getElementById("item_acceptComp_"+id).remove();
	document.getElementById("item_rejectComp_"+id).remove();
	
	if(protocol[protocolID].sourceProduct.components[id-1].other_check)
		removeOtherProtocolsComponents();
	else
		removeMainProtocolComponents(id-1);
	
	protocol[protocolID].sourceProduct.components.splice(id-1,1);
	for(var i=0; i<protocol[protocolID].sorting.length;i++){
		protocol[protocolID].sorting[i].accept_components.splice(id-1,1);
		protocol[protocolID].sorting[i].reject_components.splice(id-1,1);
	}
	source_item--;
	
	newProtoclComponentsOtherID();
	changeCompItems();
	updateAllSorting();
	updateSourceMaxInfo();
}
//изменение айдишников компанентов
function changeCompItems(){
	for(var id=1; id<=source_item; id++){
		var sourceItemElement = item_source_block.children[id*3];
		var addPhotoBlock = item_source_block.children[id*3+1];
		var classifierElement = item_source_block.children[id*3+2];
		var acceptCompItemElement = acceptComponents.children[id];
		var rejectCompItemElement = rejectComponents.children[id];
		
		sourceItemElement.id = "item_source_"+id;
		addPhotoBlock.id = "addPhotoBlock_"+id;
		classifierElement.id = "classifier_"+id;
		acceptCompItemElement.id = "item_acceptComp_"+id;
		rejectCompItemElement.id = "item_rejectComp_"+id;
		
		protocol[protocolID].sourceProduct.components[id-1].object_name = "item_source_"+id;
		
		if(id<10)
		{
			sourceItemElement.children[0].children[0].children[1].textContent = "0"+id;
			acceptCompItemElement.children[0].children[0].children[0].textContent = "0"+id;
			rejectCompItemElement.children[0].children[0].children[0].textContent = "0"+id;
		}
		else
		{
			sourceItemElement.children[0].children[0].children[1].textContent = id;
			acceptCompItemElement.children[0].children[0].children[0].textContent = id;		
			rejectCompItemElement.children[0].children[0].children[0].textContent = id;		
		}
		
		var componentSelectedValue = sourceItemElement.children[1].children[0].children[1].children[0];
		var componentSlider = sourceItemElement.children[1].children[1].children[0];
	
		//Удаление слушателей с компонентов
		componentSelectedValue.replaceWith(componentSelectedValue.cloneNode(false));
		componentSlider.replaceWith(componentSlider.cloneNode(false));
		
		//Удаление слушалетлей с компонентов прохода и отбоя	
		acceptCompItemElement.children[1].children[0].children[1].children[0].replaceWith(acceptCompItemElement.children[1].children[0].children[1].children[0].cloneNode(false));
		acceptCompItemElement.children[1].children[1].children[0].replaceWith(acceptCompItemElement.children[1].children[1].children[0].cloneNode(false));
			
		rejectCompItemElement.children[1].children[0].children[1].children[0].replaceWith(rejectCompItemElement.children[1].children[0].children[1].children[0].cloneNode(false));
		rejectCompItemElement.children[1].children[1].children[0].replaceWith(rejectCompItemElement.children[1].children[1].children[0].cloneNode(false));
	}

	
	for(var i = 0; i < protocol[protocolID].sourceProduct.components.length; i++){
		var sourceItemElement =  document.getElementById("item_source_"+Number(i+1));
		var componentSelectedValue = sourceItemElement.children[1].children[0].children[1].children[0];
		var componentSlider = sourceItemElement.children[1].children[1].children[0];
		
		var acceptCompItemElement =  document.getElementById("item_acceptComp_"+Number(i+1));
		var rejectCompItemElement =  document.getElementById("item_rejectComp_"+Number(i+1));
				
		componentSelectedValue.addEventListener("change", returnProtocolSelect(i));
		componentSlider.addEventListener("input", returnProtocolSlider(i));
		
		acceptCompItemElement.children[1].children[0].children[1].children[0].addEventListener("change", returnAcceptSelect(i));
		acceptCompItemElement.children[1].children[1].children[0].addEventListener("input", returnAcceptSlider(i));
		
		rejectCompItemElement.children[1].children[0].children[1].children[0].addEventListener("change", returnRejectSelect(i));
		rejectCompItemElement.children[1].children[1].children[0].addEventListener("input", returnRejectSlider(i));
		
		componentSelectedValue.addEventListener("change", checkProtocolComponents);
		componentSlider.addEventListener("input", checkProtocolComponents);
		
		addCalculationAcceptComponents(Number(i+1));
		addCalculationRejectComponents(Number(i+1));
	}
}

//Функция добавление сортировки
function addSortingBlock(){
	//Клонирование блоков сортировки (MinInfo)
	var cloneSortingBlockMin = SortingBlockMin_0.cloneNode(true);
	var cloneSettings = cloneSortingBlockMin.children[0];
	var cloneComponents = cloneSortingBlockMin.children[1];
	
	cloneSortingBlockMin.id = "SortingBlockMin_"+(protocol[protocolID].sorting.length+1);
	cloneSettings.id = "SortingSettings_"+(protocol[protocolID].sorting.length+1);
	cloneComponents.id = "SortingComponents_"+(protocol[protocolID].sorting.length+1);

	cloneSortingBlockMin.style.display = "";
	
	cloneSettings.children[0].children[0].children[0].children[0].addEventListener('click',function(){
		delateSortingBlockID(cloneSettings.id);
	});	
	cloneSettings.children[0].children[0].children[3].children[0].addEventListener('click',function(){
		sortBlockView(cloneSettings.id);
	});
	
	SortingInfoMin.appendChild(cloneSortingBlockMin);
	
	//Генерация опции Сортировки (MaxInfo)
	var sortOption = document.createElement("option");
	var sortOptionNumber = protocol[protocolID].sorting.length+1;
		
	var cloneInputRowSource = inputRowSource_0.cloneNode(true);	
	cloneInputRowSource.id = "inputRowSource_"+(protocol[protocolID].sorting.length+1);
	cloneInputRowSource.style.display = "";
	
	var cloneAcceptAddPhotoBlock = acceptAddPhotoBlock_0.cloneNode(true);
	var cloneRejectAddPhotoBlock = rejectAddPhotoBlock_0.cloneNode(true);
	cloneAcceptAddPhotoBlock.id = "acceptAddPhotoBlock_"+(protocol[protocolID].sorting.length+1);
	cloneRejectAddPhotoBlock.id = "rejectAddPhotoBlock_"+(protocol[protocolID].sorting.length+1);
	
	sortOption.value = protocol[protocolID].sorting.length;
	if(sortOption.value<9){
		sortOption.innerText = "Сортировка 0" + sortOptionNumber;
		cloneSettings.children[0].children[0].children[0].children[1].value = "Сортировка 0" + sortOptionNumber;
		
		cloneInputRowSource.children[0].textContent = "Сортировка 0" + sortOptionNumber;
	}
	else{
		sortOption.innerText = "Сортировка " + sortOptionNumber;
		cloneSettings.children[0].children[0].children[0].children[1].value = "Сортировка " + sortOptionNumber;
		
		cloneInputRowSource.children[0].textContent = "Сортировка " + sortOptionNumber;
	}
	
	SortingLable.appendChild(sortOption);
	addSourceBlock.appendChild(cloneInputRowSource);
	sortingAcceptPhotoBlock.appendChild(cloneAcceptAddPhotoBlock);
	sortingRejectPhotoBlock.appendChild(cloneRejectAddPhotoBlock);

	var acceptSelect = cloneComponents.children[0].children[0].children[0];
	var rejectSelect = cloneComponents.children[2].children[0].children[0];
		
	//Генерация элемента сортировки(Проходы и Отбои)
	if(sortOptionNumber<10){
		accept_name = "Проход 0" + sortOptionNumber;
		reject_name = "Отбой 0" + sortOptionNumber;
	}
	else{
		accept_name = "Проход " + sortOptionNumber;
		reject_name = "Отбой " + sortOptionNumber;
	}
	
	acceptSelect[0].innerText = accept_name;	
	rejectSelect[0].innerText = reject_name;
	
	for(var i = 1; i <= protocol[protocolID].sortingName.length; i++){
		var accept_option = document.createElement('option');
		accept_option.value = i;
		accept_option.innerText = protocol[protocolID].sortingName[i-1];
		acceptSelect.add(accept_option);
		
		var reject_option = document.createElement('option');
		reject_option.innerText = protocol[protocolID].sortingName[i-1];
		reject_option.value = i;
		rejectSelect.add(reject_option);
	}
	
	cloneInputRowSource.children[1].children[0].textContent = accept_name;
	cloneInputRowSource.children[2].children[0].textContent = reject_name;
	
	//Добавление функции для входящих функций
	cloneInputRowSource.children[1].children[1].addEventListener("change", function(){
		sortingEnterFraction(cloneInputRowSource.children[1].children[1]);
	});
	cloneInputRowSource.children[2].children[1].addEventListener("change", function(){
		sortingEnterFraction(cloneInputRowSource.children[2].children[1]);
	});

	//генерация элемента сортировки
	generateSortElement(protocol, sortOption.value, accept_name, reject_name);
	sortingInfoMinSetup(cloneSortingBlockMin.id);
	//Добавление функций обновления значений сортировок
	cloneSettings.children[0].children[0].children[0].children[2].addEventListener("change",function(){
		sortingInfoMinUpdate(cloneSortingBlockMin.id);
	});
	cloneSettings.children[0].children[0].children[2].children[0].addEventListener("change",function(){
		sortingInfoMinUpdate(cloneSortingBlockMin.id);
		updateAllSorting();
	});
	cloneSettings.children[0].children[0].children[2].children[1].addEventListener("change",function(){
		sortingInfoMinUpdate(cloneSortingBlockMin.id);
		updateAllSorting();
	});
	cloneComponents.children[0].children[0].children[0].addEventListener("change",function(){
		updateInfoMinFractionName(cloneSortingBlockMin.id.substr(16));
	});
	cloneComponents.children[0].children[1].children[1].children[0].addEventListener("change",function(){
		sortingInfoMinUpdate(cloneSortingBlockMin.id);
	});
	cloneComponents.children[0].children[1].children[1].children[2].addEventListener("change",function(){
		sortingInfoMinUpdate(cloneSortingBlockMin.id);
	});
	cloneComponents.children[0].children[1].children[1].children[4].addEventListener("change",function(){
		sortingInfoMinUpdate(cloneSortingBlockMin.id);
	});	
	cloneComponents.children[2].children[0].children[0].addEventListener("change",function(){
		updateInfoMinFractionName(cloneSortingBlockMin.id.substr(16));
	});
	cloneComponents.children[2].children[1].children[1].children[0].addEventListener("change",function(){
		sortingInfoMinUpdate(cloneSortingBlockMin.id);
	});
	cloneComponents.children[2].children[1].children[1].children[2].addEventListener("change",function(){
		sortingInfoMinUpdate(cloneSortingBlockMin.id);
	});
	cloneComponents.children[2].children[1].children[1].children[4].addEventListener("change",function(){
		sortingInfoMinUpdate(cloneSortingBlockMin.id);
	});
	//Добавление значений компанентов
	for(var id=0; id<source_item; id++){
		protocol[protocolID].sorting[sortOption.value].accept_components.push({
			product_name: protocol[protocolID].sourceProduct.components[id].product_name,
			iterfraction_percent: 0.00,
			value: protocol[protocolID].sorting[sortOption.value].accept_components.length == 0 ? 100 : 0,
			value_type: 0,
			removed_value: 0,
			flag_1: protocol[protocolID].sorting[sortOption.value].accept_components.length == 0 ? true : false,
			flag_2: false
		});
		protocol[protocolID].sorting[sortOption.value].reject_components.push({
			product_name: protocol[protocolID].sourceProduct.components[id].product_name,
			iterfraction_percent: 0.00,
			value: protocol[protocolID].sorting[sortOption.value].reject_components.length == 0 ? 100 : 0,
			value_type: 0,
			removed_value: 0,
			flag_1: protocol[protocolID].sorting[sortOption.value].reject_components.length == 0 ? true : false,
			flag_2: false
		});
	};
	//Добавление значений входящих фракции
	for(var id=0; id<protocol[protocolID].sorting.length; id++){
		while(protocol[protocolID].sorting[id].inbox_fraction.length != protocol[protocolID].sorting.length)
			protocol[protocolID].sorting[id].inbox_fraction.push({accept: false, reject: false});
	}
	
	updateAllSorting();
}

//функция удаление сотировки (MaxInfo)
function delateSortingBlock(){
	if(SortingLable.value != 0){
		var sortOption = SortingLable.options[SortingLable.value];
		var sortBlockNumber = Number(SortingLable.value)+1;
		protocol[protocolID].sorting.splice(SortingLable.value,1);
		//удаление лишних входящих фракции
		for(var id = 0; id<protocol[protocolID].sorting.length; id++)
			protocol[protocolID].sorting[id].inbox_fraction.splice(SortingLable.value,1);
		
		//удаление блоков сортировки (MinInfo)
		document.getElementById("SortingBlockMin_"+sortBlockNumber).remove();
		
		//удаление сортировки (MaxInfo)
		SortingLable.removeChild(sortOption);
		document.getElementById("inputRowSource_"+sortBlockNumber).remove();
		document.getElementById("acceptAddPhotoBlock_"+sortBlockNumber).remove();
		document.getElementById("rejectAddPhotoBlock_"+sortBlockNumber).remove();
		
		changeSortingBlock();
		sortingChangePrevievPhoto(SortingLable.value);
		sortingHideEnterFraction(SortingLable.value);
		sortingUpdateEnterFraction();
		sortingInfoMaxSetup();
		sortingHidePhotoBlock();
	}
}
function delateSortingBlockID(id_value){
	var id = Number(id_value.substr(16));
	var sortOption = SortingLable.options[id-1];
	protocol[protocolID].sorting.splice(id-1,1);
	//удаление лишних входящих фракции
	for(var i = 0; i<protocol[protocolID].sorting.length; i++)
		protocol[protocolID].sorting[i].inbox_fraction.splice((id-1),1);	
		
	//удаление блоков сортировки (MinInfo)
	document.getElementById("SortingBlockMin_"+id).remove();
		
	//удаление сортировки (MaxInfo)
	SortingLable.removeChild(sortOption);
	document.getElementById("inputRowSource_"+id).remove();
	document.getElementById("acceptAddPhotoBlock_"+id).remove();
	document.getElementById("rejectAddPhotoBlock_"+id).remove();
	
	changeSortingBlock();
}
//Функция перезаписи сортировки
function changeSortingBlock(){
	for(var id=1; id<SortingLable.length; id++){
		var sortOption = SortingLable.options[id];
		sortOption.value = id;
		protocol[protocolID].sorting[id].id = id;
		
		SortingInfoMin.children[id+1].id = "SortingBlockMin_" + (id+1);
		SortingInfoMin.children[id+1].children[0].id = "SortingSettings_" + (id+1);
		SortingInfoMin.children[id+1].children[1].id = "SortingComponents_" + (id+1);
		
		addSourceBlock.children[id+1].id = "inputRowSource_" + (id+1);
		
		sortingAcceptPhotoBlock.children[id+1].id = "acceptAddPhotoBlock_" + (id+1);
		sortingRejectPhotoBlock.children[id+1].id = "rejectAddPhotoBlock_" + (id+1);
		
		var acceptSelect = document.getElementById("SortingComponents_" + (id+1)).children[0].children[0].children[0];
		var rejectSelect = document.getElementById("SortingComponents_" + (id+1)).children[2].children[0].children[0];
		
		var acceptRowSource = addSourceBlock.children[id+1].children[1].children[0];
		var rejectRowSource = addSourceBlock.children[id+1].children[2].children[0];
		
		if(sortOption.value<9){
			sortOption.innerHTML = "Сортировка 0" + (id+1);
			protocol[protocolID].sorting[id].accept_name = "Проход 0" + (id+1);	
			protocol[protocolID].sorting[id].reject_name = "Отбой 0" + (id+1);
			
			document.getElementById("SortingSettings_" + (id+1)).children[0].children[0].children[0].children[1].value = "Сортировка 0" + (id+1);
			acceptSelect[0].innerText = "Проход 0" + (id+1);		
			rejectSelect[0].innerText = "Отбой 0" + (id+1);
			
			document.getElementById("inputRowSource_" + (id+1)).children[0].textContent = "Сортировка 0" + (id+1);
			acceptRowSource.textContent = "Проход 0" + (id+1);		
			rejectRowSource.textContent = "Отбой 0" + (id+1);
		}
		else{
			sortOption.innerHTML = "Сортировка " + (id+1);
			protocol[protocolID].sorting[id].accept_name = "Проход " + (id+1);	
			protocol[protocolID].sorting[id].reject_name = "Отбой " + (id+1);

			document.getElementById("SortingSettings_" + (id+1)).children[0].children[0].children[0].children[1].value = "Сортировка " + (id+1);
			acceptSelect[0].innerText = "Проход " + (id+1);		
			rejectSelect[0].innerText = "Отбой " + (id+1);
			
			document.getElementById("inputRowSource_" + (id+1)).children[0].textContent = "Сортировка 0" + (id+1);
			acceptRowSource.textContent = "Проход " + (id+1);		
			rejectRowSource.textContent = "Отбой " + (id+1);			
		}
	}
}
//функциия обновление информации
function updateSourceMaxInfo(){
	for(var id=1; id<=source_item; id++){
		var sourceItem = document.getElementById("item_source_"+id).children[1].children[0].children[0];
		var acceptItem = document.getElementById("item_acceptComp_"+id).children[1].children[0].children[0];
		var rejectItem = document.getElementById("item_rejectComp_"+id).children[1].children[0].children[0];
		
		if(sourceItem.value != "classifier")
			var sourceItemID = sourceItem.value
		else
			var sourceItemID = sourceItem.length-1
		
		acceptItem.value = sourceItem[sourceItemID].innerText;
		rejectItem.value = sourceItem[sourceItemID].innerText;
	}
}
//Функция добавление и изменения картинок
function file_img_change(input,img){
	input.addEventListener("change", function(){
		var selectedFile = input.files[0];
		
		var reader = new FileReader();
		reader.onload = function() {
			img.src = this.result;
			
			switch (img.parentElement.id){
				case "sourceBlockPhoto":
					if(protocol[protocolID].sourceProduct.images.length < 3){
						var clone = sourceBlockAddPhoto.children[2].cloneNode(true);
						clone.style.display = "flex";
						clone.id = "sourcePhoto_" + (protocol[protocolID].sourceProduct.images.length + 1);
						clone.children[0].children[0].src = this.result;
						
						sourceBlockAddPhoto.appendChild(clone);
						clone.children[0].addEventListener("click", function(){
							editPhoto(clone.id, img);
						});
						clone.children[1].addEventListener("click", function(){
							deleateSourceBlockPhoto(clone.id);
						});
						
						protocol[protocolID].sourceProduct.images.push(img.src);
						
						if(protocol[protocolID].sourceProduct.images.length == 3){
							sourceBlockAddPhoto.children[0].style.display = "none";
							sourceBlockAddPhoto.children[1].style.display = "none";
						}
						else{
							sourceBlockAddPhoto.children[0].style.display = "flex";
							sourceBlockAddPhoto.children[1].style.display = "flex";
						}
					}
					break;
				case "acceptBlockPhoto":
					var id = Number(SortingLable.value);
					if(protocol[protocolID].sorting[id].accept_img.length < 3){
						var clone = document.getElementById("acceptAddPhotoBlock_"+(id+1)).children[2].cloneNode(true);
						clone.style.display = "flex";
						clone.id = "sortingAccept_"+(id+1)+"_photo_"+(protocol[protocolID].sorting[id].accept_img.length+1);
						clone.children[0].children[0].src = this.result;
						
						document.getElementById("acceptAddPhotoBlock_"+(id+1)).appendChild(clone);
						clone.children[0].addEventListener("click", function(){
							editPhoto(clone.id, img);
						});
						clone.children[1].addEventListener("click", function(){
							deleateSortingAcceptPhoto(clone.id);
						});
						
						protocol[protocolID].sorting[id].accept_img.push(img.src);
						
						if(protocol[protocolID].sorting[id].accept_img.length == 3){
							document.getElementById("acceptAddPhotoBlock_"+(id+1)).children[0].style.display = "none";
							document.getElementById("acceptAddPhotoBlock_"+(id+1)).children[1].style.display = "none";
						}
						else{
							document.getElementById("acceptAddPhotoBlock_"+(id+1)).children[0].style.display = "flex";
							document.getElementById("acceptAddPhotoBlock_"+(id+1)).children[1].style.display = "flex";
						}
					}
					break;
				case "rejectBlockPhoto":
					var id = Number(SortingLable.value);
					if(protocol[protocolID].sorting[id].reject_img.length < 3){
						var clone = document.getElementById("rejectAddPhotoBlock_"+(id+1)).children[2].cloneNode(true);
						clone.style.display = "flex";
						clone.id = "sortingReject_"+(id+1)+"_photo_"+(protocol[protocolID].sorting[id].reject_img.length+1);
						clone.children[0].children[0].src = this.result;
						
						document.getElementById("rejectAddPhotoBlock_"+(id+1)).appendChild(clone);
						clone.children[0].addEventListener("click", function(){
							editPhoto(clone.id, img);
						});
						clone.children[1].addEventListener("click", function(){
							deleateSortingRejectPhoto(clone.id);
						});
						
						protocol[protocolID].sorting[id].reject_img.push(img.src);
						
						if(protocol[protocolID].sorting[id].reject_img.length == 3){
							document.getElementById("rejectAddPhotoBlock_"+(id+1)).children[0].style.display = "none";
							document.getElementById("rejectAddPhotoBlock_"+(id+1)).children[1].style.display = "none";
						}
						else{
							document.getElementById("rejectAddPhotoBlock_"+(id+1)).children[0].style.display = "flex";
							document.getElementById("rejectAddPhotoBlock_"+(id+1)).children[1].style.display = "flex";
						}
					}
					break;
				case "":
					var id = Number(input.parentElement.id.substr(12));
					if(protocol[protocolID].sourceProduct.components[id-1].images.length < 3){
						var clone = document.getElementById("addPhotoBlock_"+id).children[1].cloneNode(true);
						clone.style.display = "flex";
						clone.id = "item_source_"+id+"_photo_"+(protocol[protocolID].sourceProduct.components[id-1].images.length + 1);
						clone.children[0].children[0].src = this.result;
						
						document.getElementById("addPhotoBlock_"+id).appendChild(clone);
						clone.children[0].addEventListener("click", function(){
							editPhoto(clone.id, img);
						});
						clone.children[1].addEventListener("click", function(){
							deleateItemSourcePhoto(clone.id);
						});						
						
						protocol[protocolID].sourceProduct.components[id-1].images.push(img.src);
						
						if(protocol[protocolID].sourceProduct.components[id-1].images.length == 3)
							document.getElementById("addPhotoBlock_"+id).children[0].style.display = "none";
						else
							document.getElementById("addPhotoBlock_"+id).children[0].style.display = "flex";					
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
function editPhoto(id_value, targetIMG){
	var img_src = document.getElementById(id_value).children[0].children[0].src;
	targetIMG.src = img_src;
}
function addFileChange(){
	var sourceBlockInput = sourceBlockComponents.children[0].lastElementChild;	
	var sourceBlockImage = sourceBlockPhoto.children[0];
	
	var item_source_1_image =  item_source_1.children[2].children[0].children[0];
	var item_source_1_input =  item_source_1.children[3];
	
	var acceptBlcokInput = acceptInput.children[2];
	var acceptBlcokImage = acceptInput.children[1].children[0].children[0];
	
	var rejectBlcokInput = rejectInput.children[2];
	var rejectBlcokImage = rejectInput.children[1].children[0].children[0];
	
	file_img_change(sourceBlockInput,sourceBlockImage);
	file_img_change(item_source_1_input,item_source_1_image);
	file_img_change(acceptBlcokInput,acceptBlcokImage);
	file_img_change(rejectBlcokInput,rejectBlcokImage);
}
//функции для добавления фотографий (Исходный продукт)
function addSourcePhoto_1(){
	if(protocol[protocolID].sourceProduct.images.length == 0){
		sourceBlockComponents.children[0].lastElementChild.click();
	}
	else if(sourceBlockAddPhoto.style.display == "none"){
		sourceBlockAddPhoto.style.display = "flex";
		headerTooltip.children[1].style.display = "none";
		sourceBlockComponents.children[0].style.zIndex = 2;
		sourceBlockAddPhoto.style.zIndex = 2;
		overlayDisplayBlcok.style.zIndex = 1;
	}
	else if(sourceBlockAddPhoto.style.display == "flex"){
		sourceBlockAddPhoto.style.display = "none";
		headerTooltip.children[1].style.display = "";
		sourceBlockComponents.children[0].style.zIndex = 0;
		sourceBlockAddPhoto.style.zIndex = 0;
		overlayDisplayBlcok.style.zIndex = 0;
	}
	
	if(protocol[protocolID].sourceProduct.images.length == 3){
		sourceBlockAddPhoto.children[0].style.display = "none";
		sourceBlockAddPhoto.children[1].style.display = "none";
	}
	else{
		sourceBlockAddPhoto.children[0].style.display = "flex";
		sourceBlockAddPhoto.children[1].style.display = "flex";
	}
}
function addSourcePhoto_2(){
	sourceBlockComponents.children[0].lastElementChild.click();
}
function deleateSourceBlockPhoto(id_value){
	var id = Number(id_value.substr(12));
	protocol[protocolID].sourceProduct.images.splice((id-1),1);
	
	document.getElementById(id_value).remove();
	
	sourceBlockAddPhoto.children[0].style.display = "flex";
	sourceBlockAddPhoto.children[1].style.display = "flex";	
	
	//замена айдишников фотографий(для последующих удалений)
	for(var id=1; id<=protocol[protocolID].sourceProduct.images.length; id++){
		sourceBlockAddPhoto.children[2+id].id = "sourcePhoto_"+id;
	}	
	//отображение объектов для добавления(камера)
	if(protocol[protocolID].sourceProduct.images.length > 0){
		sourceBlockAddPhoto.style.display = "flex";
		
		sourceBlockPhoto.children[0].src = protocol[protocolID].sourceProduct.images[protocol[protocolID].sourceProduct.images.length-1];
	}
	else{
		sourceBlockAddPhoto.style.display = "none";
		headerTooltip.children[1].style.display = "";
		sourceBlockComponents.children[0].style.zIndex = 0;
		sourceBlockAddPhoto.style.zIndex = 0;
		overlayDisplayBlcok.style.zIndex = 0;
		sourceBlockPhoto.children[0].src = "/static/img/req/photo.png";
	}
}
//Функции для добавления фотографиий (Компаненты)
function addItemPhoto_1(id){
	var item_source = document.getElementById("item_source_"+id);
	var addPhotoBlock = document.getElementById("addPhotoBlock_"+id);
		
	if(protocol[protocolID].sourceProduct.components[id-1].images.length == 0){
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
	
	if(protocol[protocolID].sourceProduct.components[id-1].images.length == 3){
		document.getElementById("addPhotoBlock_"+id).children[0].style.display = "none";
	}
	else{
		document.getElementById("addPhotoBlock_"+id).children[0].style.display = "flex";
	}
	
}
function addItemPhoto_2(id){
	var item_source = document.getElementById("item_source_"+id);
	item_source.lastElementChild.click();
}
function deleateItemSourcePhoto(id_value){
	var item_id = Number(id_value.substr(12,1));
	var photo_id = Number(id_value.substr(20,1));
	
	protocol[protocolID].sourceProduct.components[item_id-1].images.splice((photo_id-1),1);
	document.getElementById(id_value).remove();
	
	document.getElementById("addPhotoBlock_"+item_id).children[0].style.display = "flex";
	//замена айдишников фотографий(для последующих удалений)
	for(var id=1; id<=protocol[protocolID].sourceProduct.components[item_id-1].images.length; id++){
		document.getElementById("addPhotoBlock_"+item_id).children[id+1].id = "item_source_"+item_id+"_photo_"+id;
	}
	//отображение объектов для добавления(камера)
	if(protocol[protocolID].sourceProduct.components[item_id-1].images.length > 0){
		document.getElementById("addPhotoBlock_"+item_id).style.display = "flex";
		headerTooltip.children[1].style.display = "none";
		document.getElementById("item_source_"+item_id).children[2].children[0].children[0].src = protocol[protocolID].sourceProduct.components[item_id-1].images[protocol[protocolID].sourceProduct.components[item_id-1].images.length-1];
	}
	else{
		document.getElementById("addPhotoBlock_"+item_id).style.display  = "none";
		headerTooltip.children[1].style.display = "";
		document.getElementById("addPhotoBlock_"+item_id).style.zIndex = 0;
		document.getElementById("item_source_"+item_id).style.zIndex = 0;
		overlayDisplayBlcok.style.zIndex = 0;		
		document.getElementById("item_source_"+item_id).children[2].children[0].children[0].src = "/static/img/req/photo.png";
	}
	
}
//Функции для добавления фотографий (Сортировки)
function sortingAcceptPhoto_1(){
	var id = Number(SortingLable.value);
	var addPhotoBlock = document.getElementById("acceptAddPhotoBlock_"+(id+1));
	
	if(protocol[protocolID].sorting[id].accept_img.length == 0)
		acceptInput.children[2].click();
	else if(addPhotoBlock.style.display == "none"){
		addPhotoBlock.style.display = "flex";
		headerTooltip.children[1].style.display = "none";
		sortingAcceptPhotoBlock.style.zIndex = 2;
		acceptBlock.style.zIndex = 2;
		overlayDisplayBlcok.style.zIndex = 1;
	}
	else if(addPhotoBlock.style.display == "flex"){
		addPhotoBlock.style.display = "none";
		headerTooltip.children[1].style.display = "";
		sortingAcceptPhotoBlock.zIndex = 0;
		acceptBlock.style.zIndex = 0;
		overlayDisplayBlcok.style.zIndex = 0;
	}
	
	if(protocol[protocolID].sorting[id].accept_img.length == 3){
		document.getElementById("acceptAddPhotoBlock_"+(id+1)).children[0].style.display = "none";
		document.getElementById("acceptAddPhotoBlock_"+(id+1)).children[1].style.display = "none";
	}
	else{
		document.getElementById("acceptAddPhotoBlock_"+(id+1)).children[0].style.display = "flex";
		document.getElementById("acceptAddPhotoBlock_"+(id+1)).children[1].style.display = "flex"
	}	
	
}
function sortingAcceptPhoto_2(){
	acceptInput.children[2].click();
}
function deleateSortingAcceptPhoto(id_value){
	var sorting_id = Number(id_value.substr(14,1));
	var photo_id = Number(id_value.substr(22,1));
	
	protocol[protocolID].sorting[sorting_id-1].accept_img.splice((photo_id-1),1);
	document.getElementById(id_value).remove();
	
	document.getElementById("acceptAddPhotoBlock_"+sorting_id).children[0].style.display = "flex";
	document.getElementById("acceptAddPhotoBlock_"+sorting_id).children[1].style.display = "flex";
	//замена айдишников фотографиий(для последующих удалений)
	for(var id=1;id<=protocol[protocolID].sorting[sorting_id-1].accept_img.length; id++){
		document.getElementById("acceptAddPhotoBlock_"+sorting_id).children[id+2].id = "sortingAccept_"+sorting_id+"_photo_"+id;
	}
	//отображение объектов для добавления(камера)
	if(protocol[protocolID].sorting[sorting_id-1].accept_img.length > 0){
		document.getElementById("acceptAddPhotoBlock_"+sorting_id).style.display = "flex";
		headerTooltip.children[1].style.display = "none";
		document.getElementById("acceptInput").children[1].children[0].children[0].src = protocol[protocolID].sorting[sorting_id-1].accept_img[protocol[protocolID].sorting[sorting_id-1].accept_img.length-1];
	}
	else{
		document.getElementById("acceptAddPhotoBlock_"+sorting_id).style.display  = "none";	
		headerTooltip.children[1].style.display = "";
		sortingAcceptPhotoBlock.style.zIndex = 0;
		acceptBlock.style.zIndex = 0;
		overlayDisplayBlcok.style.zIndex = 0;
		document.getElementById("acceptInput").children[1].children[0].children[0].src = "/static/img/req/photo.png";
	}	
}

function sortingRejectPhoto_1(){
	var id = Number(SortingLable.value);
	var addPhotoBlock = document.getElementById("rejectAddPhotoBlock_"+(id+1));
	
	if(protocol[protocolID].sorting[id].reject_img.length == 0)
		rejectInput.children[2].click();
	else if(addPhotoBlock.style.display == "none"){
		addPhotoBlock.style.display = "flex";
		headerTooltip.children[1].style.display = "none";
		sortingRejectPhotoBlock.style.zIndex = 2;
		rejectBlock.style.zIndex = 2;
		overlayDisplayBlcok.style.zIndex = 1;
	}
	else if(addPhotoBlock.style.display == "flex"){
		addPhotoBlock.style.display = "none";
		headerTooltip.children[1].style.display = "";
		sortingRejectPhotoBlock.style.zIndex = 0;
		rejectBlock.style.zIndex = 0;
		overlayDisplayBlcok.style.zIndex = 0;
	}
}
function sortingRejectPhoto_2(){
	rejectInput.children[2].click();
}
function deleateSortingRejectPhoto(id_value){
	var sorting_id = Number(id_value.substr(14,1));
	var photo_id = Number(id_value.substr(22,1));
	
	protocol[protocolID].sorting[sorting_id-1].reject_img.splice((photo_id-1),1);
	document.getElementById(id_value).remove();
	
	document.getElementById("rejectAddPhotoBlock_"+sorting_id).children[0].style.display = "flex";
	document.getElementById("rejectAddPhotoBlock_"+sorting_id).children[1].style.display = "flex";
	//замена айдишников фотографиий(для последующих удалений)
	for(var id=1;id<=protocol[protocolID].sorting[sorting_id-1].reject_img.length; id++){
		document.getElementById("rejectAddPhotoBlock_"+sorting_id).children[id+2].id = "sortingReject_"+sorting_id+"_photo_"+id;
	}
	//отображение объектов для добавления(камера)
	if(protocol[protocolID].sorting[sorting_id-1].reject_img.length > 0){
		document.getElementById("rejectAddPhotoBlock_"+sorting_id).style.display = "flex";
		headerTooltip.children[1].style.display = "none";
		document.getElementById("rejectInput").children[1].children[0].children[0].src = protocol[protocolID].sorting[sorting_id-1].reject_img[protocol[protocolID].sorting[sorting_id-1].reject_img.length-1];
	}
	else{
		document.getElementById("rejectAddPhotoBlock_"+sorting_id).style.display  = "none";
		headerTooltip.children[1].style.display = "";
		sortingRejectPhotoBlock.style.zIndex = 0;
		rejectBlock.style.zIndex = 0;
		overlayDisplayBlcok.style.zIndex = 0;
		document.getElementById("rejectInput").children[1].children[0].children[0].src = "/static/img/req/photo.png";
	}	
}
//установка и обновление значений protocol[protocolID].sourceProduct (Исходный продукт)
function sourceProductSetup(){
	//установка основных значений исходного продукта
	sourceBlock.children[0].children[0].children[1].value = Number(protocol[protocolID].sourceProduct.purity).toFixed(3);
	sourceBlock.children[2].children[0].value = Number(protocol[protocolID].sourceProduct.capacity_value).toFixed(3);
	sourceBlock.children[2].children[1].value = Number(protocol[protocolID].sourceProduct.capacity_type);
	sourceBlockComponents.children[0].children[0].children[1].children[1].children[0].value = Number(protocol[protocolID].sourceProduct.selection_value).toFixed(3);
	sourceBlockComponents.children[0].children[0].children[1].children[1].children[1].value = Number(protocol[protocolID].sourceProduct.selection_type);
	
	if(protocol[protocolID].sourceProduct.images.length > 0)
		sourceBlockPhoto.children[0].src = protocol[protocolID].sourceProduct.images[protocol[protocolID].sourceProduct.images.length-1];
	else
		sourceBlockPhoto.children[0].src =  "/static/img/req/photo.png";
	
	for(var i = 1; i <= protocol[protocolID].sourceProduct.components.length; i++){
		itemSourceSetup("item_source_"+i);
	}
	updateAllSorting();
}
function sourceProductNameUpdate(){
	//Обновление имени исходного продукта
	var selectProductName = sourceBlockComponents.children[0].children[0].children[1].children[0];
	if (selectProductName.value != "classifier")
		protocol[protocolID].sourceProduct.name = selectProductName.options[selectProductName.value].textContent;
	else
		protocol[protocolID].sourceProduct.name = selectProductName.options[selectProductName.length-1].textContent;
}
function sourceProductUpdate(){	
	//обновление значений исходного продукта
	protocol[protocolID].sourceProduct.purity = sourceBlock.children[0].children[0].children[1].value;
	protocol[protocolID].sourceProduct.capacity_value = Number(sourceBlock.children[2].children[0].value).toFixed(3);
	protocol[protocolID].sourceProduct.capacity_type = Number(sourceBlock.children[2].children[1].value);
	protocol[protocolID].sourceProduct.selection_value = Number(sourceBlockComponents.children[0].children[0].children[1].children[1].children[0].value).toFixed(3);
	protocol[protocolID].sourceProduct.selection_type = Number(sourceBlockComponents.children[0].children[0].children[1].children[1].children[1].value);
	
	//установка обновленных значений
	sourceProductSetup();
}
//установка и обновление значений item_source
function itemSourceSetup(id_value){
	var id = Number(id_value.substr(12));
	var itemElement = document.getElementById("item_source_"+id);
	
	if(protocol[protocolID].sourceProduct.components[id-1].flag_2){
		itemElement.children[1].children[0].children[1].children[0].value = Number(protocol[protocolID].sourceProduct.components[id-1].value).toFixed(3);
		itemElement.children[1].children[1].children[0].value = Number(protocol[protocolID].sourceProduct.components[id-1].value).toFixed(3);
	}
	else{
		itemElement.children[1].children[0].children[1].children[0].value = Number(protocol[protocolID].sourceProduct.components[id-1].removed_value).toFixed(3);
		itemElement.children[1].children[1].children[0].value = Number(protocol[protocolID].sourceProduct.components[id-1].removed_value).toFixed(3);
	}
	
	itemElement.children[1].children[0].children[1].children[1].value = Number(protocol[protocolID].sourceProduct.components[id-1].value_type);
	itemElement.children[1].children[1].children[1].children[0].checked = protocol[protocolID].sourceProduct.components[id-1].flag_1;
	itemElement.children[1].children[1].children[1].children[1].checked = protocol[protocolID].sourceProduct.components[id-1].flag_2;
	
	
	if(protocol[protocolID].sourceProduct.components[id-1].images.length > 0)
		itemElement.children[2].children[0].children[0].src = protocol[protocolID].sourceProduct.components[id-1].images[protocol[protocolID].sourceProduct.components[id-1].images.length-1];
	else
		itemElement.children[2].children[0].children[0].src = "/static/img/req/photo.png";
	
	itemElement.children[1].children[0].children[1].children[0].value 
		= changeValueOfType(protocol[protocolID].sourceProduct, protocol[protocolID].sourceProduct.components[id-1], itemElement.children[1].children[1].children[0]);
}
function itemSourceNameUpdate(id){
	var selectItemSourceName = document.getElementById("item_source_"+id).children[1].children[0].children[0];
	if (selectItemSourceName.value != "classifier")
		protocol[protocolID].sourceProduct.components[id-1].product_name = selectItemSourceName.options[selectItemSourceName.value].textContent;
	else
		protocol[protocolID].sourceProduct.components[id-1].product_name = selectItemSourceName.options[selectItemSourceName.length-1].textContent;
	//изменение имени продукта для сортировок
	for(var i=0; i<protocol[protocolID].sorting.length; i++){
		protocol[protocolID].sorting[i].accept_components[id-1].product_name = protocol[protocolID].sourceProduct.components[id-1].product_name;
		protocol[protocolID].sorting[i].reject_components[id-1].product_name = protocol[protocolID].sourceProduct.components[id-1].product_name;
	}
}
function itemSourceUpdate(id_value){
	var id = Number(id_value.substr(12));
	var itemElement = document.getElementById("item_source_"+id);
	
	
	if(protocol[protocolID].sourceProduct.components[id-1].flag_2)
		protocol[protocolID].sourceProduct.components[id-1].value = itemElement.children[1].children[1].children[0].value;
	else
		protocol[protocolID].sourceProduct.components[id-1].removed_value = itemElement.children[1].children[1].children[0].value;
	
	
	protocol[protocolID].sourceProduct.components[id-1].value_type = Number(itemElement.children[1].children[0].children[1].children[1].value);
	protocol[protocolID].sourceProduct.components[id-1].flag_1 = itemElement.children[1].children[1].children[1].children[0].checked;
	protocol[protocolID].sourceProduct.components[id-1].flag_2 = itemElement.children[1].children[1].children[1].children[1].checked;
		
	//Проверка невозможности исключить компонент из рачетов
	if(id-1 == 0 || id == protocolComponentsOtherID)
		protocol[protocolID].sourceProduct.components[id-1].flag_2 = true;
	
	itemSourceSetup(id_value);
	
	if(protocol[protocolID].sourceProduct.components[id-1].flag_2){
		setupMainPagePurity(protocol[protocolID].sourceProduct, sourceBlock.children[0].children[0].children[1]);
	}
}
//установка и обновление значений для SortingBlock (sortingBlocInfoMin)
function sortingInfoMinSetup(id_value){
	var id = Number(id_value.substr(16));
	var Settings = document.getElementById("SortingSettings_"+id);
	var Components = document.getElementById("SortingComponents_"+id);
	//Основные настройки блока сортировки
	if(id == 1)
		Settings.children[0].children[0].children[0].children[1].value = Number(protocol[protocolID].sorting[id-1].trays_number).toFixed(2);
	else
		Settings.children[0].children[0].children[0].children[2].value = Number(protocol[protocolID].sorting[id-1].trays_number).toFixed(2);
	
	Settings.children[0].children[0].children[2].children[0].value = Number(protocol[protocolID].sorting[id-1].capacity_value).toFixed(3);
	Settings.children[0].children[0].children[2].children[1].value = Number(protocol[protocolID].sorting[id-1].capacity_type);
	//Компаненты Прохода блока сортировки
	Components.children[0].children[1].children[1].children[0].value = Number(protocol[protocolID].sorting[id-1].accept_exit).toFixed(3);
	Components.children[0].children[1].children[1].children[2].value = Number(protocol[protocolID].sorting[id-1].accept_purity).toFixed(3);
	Components.children[0].children[1].children[1].children[4].value = Number(protocol[protocolID].sorting[id-1].accept_mass).toFixed(3);
	//Компаненты отбоя блока сортировки
	Components.children[2].children[1].children[1].children[0].value = Number(protocol[protocolID].sorting[id-1].reject_exit).toFixed(3);
	Components.children[2].children[1].children[1].children[2].value = Number(protocol[protocolID].sorting[id-1].reject_purity).toFixed(3);
	Components.children[2].children[1].children[1].children[4].value = Number(protocol[protocolID].sorting[id-1].reject_mass).toFixed(3);
}
function sortingInfoMinUpdate(id_value){
	var id = Number(id_value.substr(16));
	var Settings = document.getElementById("SortingSettings_"+id);
	var Components = document.getElementById("SortingComponents_"+id);
	//Основные настройки блока сортировки
	if(id == 1)
		protocol[protocolID].sorting[id-1].trays_number = Settings.children[0].children[0].children[0].children[1].value;
	else
		protocol[protocolID].sorting[id-1].trays_number = Settings.children[0].children[0].children[0].children[2].value;
	
	protocol[protocolID].sorting[id-1].capacity_value = Number(Settings.children[0].children[0].children[2].children[0].value);
	protocol[protocolID].sorting[id-1].capacity_type = Number(Settings.children[0].children[0].children[2].children[1].value);
	//Компаненты Прохода блока сортировки
	protocol[protocolID].sorting[id-1].accept_exit = Number(Components.children[0].children[1].children[1].children[0].value);
	protocol[protocolID].sorting[id-1].accept_purity = Number(Components.children[0].children[1].children[1].children[2].value);
	protocol[protocolID].sorting[id-1].accept_mass = Number(Components.children[0].children[1].children[1].children[4].value);
	//Компаненты отбоя блока сортировки
	protocol[protocolID].sorting[id-1].reject_exit = Number(Components.children[2].children[1].children[1].children[0].value);
	protocol[protocolID].sorting[id-1].reject_purity = Number(Components.children[2].children[1].children[1].children[2].value);
	protocol[protocolID].sorting[id-1].reject_mass = Number(Components.children[2].children[1].children[1].children[4].value);
	
	sortingInfoMinSetup(id_value);
}
//установка и обновление значений для SortingBlock (sortingBlocInfoMax)
function sortingInfoMaxSetup(){
	var id = Number(SortingLable.value);
	//Основные настройки блока сортировки
	SortingSettings.children[0].children[0].children[0].children[2].value = Number(protocol[protocolID].sorting[id].trays_number).toFixed(2);
	SortingSettings.children[0].children[0].children[2].children[0].value = Number(protocol[protocolID].sorting[id].capacity_value).toFixed(3);
	SortingSettings.children[0].children[0].children[2].children[1].value = Number(protocol[protocolID].sorting[id].capacity_type);
	//Компаненты Прохода блока сортировки
	acceptBlock.children[0].children[0].children[1].children[0].value = Number(protocol[protocolID].sorting[id].accept_exit).toFixed(3);
	acceptBlock.children[0].children[0].children[1].children[2].value = Number(protocol[protocolID].sorting[id].accept_purity).toFixed(3);
	acceptBlock.children[0].children[0].children[1].children[4].value = Number(protocol[protocolID].sorting[id].accept_mass).toFixed(3);
	//дополнительные свойства прохода 
	acceptInput.children[0].children[1].children[0].value = Number(protocol[protocolID].sorting[id].accept_selection_mass).toFixed(3);
	acceptInput.children[0].children[1].children[1].value = Number(protocol[protocolID].sorting[id].accept_selection_type);
	//Компаненты отбоя блока сортировки
	rejectBlock.children[0].children[0].children[1].children[0].value = Number(protocol[protocolID].sorting[id].reject_exit).toFixed(3);
	rejectBlock.children[0].children[0].children[1].children[2].value = Number(protocol[protocolID].sorting[id].reject_purity).toFixed(3);
	rejectBlock.children[0].children[0].children[1].children[4].value = Number(protocol[protocolID].sorting[id].reject_mass).toFixed(3);
	//дополнительные свойта отбоя
	rejectInput.children[0].children[1].children[0].value = Number(protocol[protocolID].sorting[id].reject_selection_mass).toFixed(3);
	rejectInput.children[0].children[1].children[1].value = Number(protocol[protocolID].sorting[id].reject_selection_type);
	
	//установка значений Прохода и Отбоя
	for(var i=1; i<=source_item; i++){
		sortingComponentsSetup(i);
	}
}
function sortingInfoMaxUpdate(){
	var id = Number(SortingLable.value);
	//Основные настройки блока сортировки
	protocol[protocolID].sorting[id].trays_number = SortingSettings.children[0].children[0].children[0].children[2].value;
	protocol[protocolID].sorting[id].capacity_value =  Number(SortingSettings.children[0].children[0].children[2].children[0].value);
	protocol[protocolID].sorting[id].capacity_type = Number(SortingSettings.children[0].children[0].children[2].children[1].value);
	//Компаненты Прохода блока сортировки
	protocol[protocolID].sorting[id].accept_exit = Number(acceptBlock.children[0].children[0].children[1].children[0].value);
	protocol[protocolID].sorting[id].accept_purity = Number(acceptBlock.children[0].children[0].children[1].children[2].value);
	protocol[protocolID].sorting[id].accept_mass = Number(acceptBlock.children[0].children[0].children[1].children[4].value);
	//дополнительные свойства прохода 
	protocol[protocolID].sorting[id].accept_selection_mass = Number(acceptInput.children[0].children[1].children[0].value);
	protocol[protocolID].sorting[id].accept_selection_type = Number(acceptInput.children[0].children[1].children[1].value);
	//Компаненты отбоя блока сортировки
	protocol[protocolID].sorting[id].reject_exit = Number(rejectBlock.children[0].children[0].children[1].children[0].value);
	protocol[protocolID].sorting[id].reject_purity = Number(rejectBlock.children[0].children[0].children[1].children[2].value);
	protocol[protocolID].sorting[id].reject_mass = Number(rejectBlock.children[0].children[0].children[1].children[4].value);
	//дополнительные свойта отбоя
	protocol[protocolID].sorting[id].reject_selection_mass = Number(rejectInput.children[0].children[1].children[0].value);
	protocol[protocolID].sorting[id].reject_selection_type = Number(rejectInput.children[0].children[1].children[1].value);
	
	sortingInfoMaxSetup();
}
//Установка имен фракций под компоненты прохода и отобя
function updateInfoMaxFractionName(){
	var id = Number(SortingLable.value);
	//Установка имен фракций для первой сортировки(SortingBlockMax)
	var acceptSelectMax = sortingFractionsComponents.children[0].children[0].children[0].children[0].children[1];
	var rejectSelectMax = sortingFractionsComponents.children[2].children[0].children[0].children[0].children[1];
	
	protocol[protocolID].sorting[id].accept_name = acceptSelectMax.options[acceptSelectMax.value].textContent;
	protocol[protocolID].sorting[id].accept_name_id = acceptSelectMax.value;
	protocol[protocolID].sorting[id].reject_name = rejectSelectMax.options[rejectSelectMax.value].textContent;
	protocol[protocolID].sorting[id].reject_name_id = rejectSelectMax.value;
}
function updateInfoMinFractionName(id){
	//Установка имен фракций для первой сортировки(SortingBlockMin)
	var acceptSelectMin = document.getElementById("SortingComponents_"+id).children[0].children[0].children[0];
	var rejectSelectMin = document.getElementById("SortingComponents_"+id).children[2].children[0].children[0];
	
	protocol[protocolID].sorting[id-1].accept_name = acceptSelectMin.options[acceptSelectMin.value].textContent;
	protocol[protocolID].sorting[id-1].accept_name_id = acceptSelectMin.value;
	protocol[protocolID].sorting[id-1].reject_name = rejectSelectMin.options[rejectSelectMin.value].textContent;
	protocol[protocolID].sorting[id-1].reject_name_id = rejectSelectMin.value;
}
function setupInfoFractionName(){
	var id = Number(SortingLable.value);
	//Установка имен фракций для первой сортировки(SortingBlockMax)
	var acceptSelectMax = sortingFractionsComponents.children[0].children[0].children[0].children[0].children[1];
	var rejectSelectMax = sortingFractionsComponents.children[2].children[0].children[0].children[0].children[1];

	acceptSelectMax.value = protocol[protocolID].sorting[id].accept_name_id;
	rejectSelectMax.value = protocol[protocolID].sorting[id].reject_name_id;
	
	//Установка имен фракций для первой сортировки(SortingBlockMin)
	for(var i = 1; i <= protocol[protocolID].sorting.length; i++){
		var acceptSelectMin = document.getElementById("SortingComponents_"+i).children[0].children[0].children[0];
		var rejectSelectMin = document.getElementById("SortingComponents_"+i).children[2].children[0].children[0];
		acceptSelectMin.value = protocol[protocolID].sorting[i-1].accept_name_id;
		rejectSelectMin.value = protocol[protocolID].sorting[i-1].reject_name_id;
	}
}

//установка и обновление значений компонентетов для SortingBlock(acceptComponents & rejectComponents)
function sortingComponentsSetup(compID){
	var sortID = Number(SortingLable.value);
	//Основные значения прохода компанета сортирокт
	var item_acceptComp = document.getElementById("item_acceptComp_"+compID);
	if(protocol[protocolID].sourceProduct.components[compID-1].flag_2){
		item_acceptComp.children[1].children[0].children[1].children[0].value = Number(protocol[protocolID].sorting[sortID].accept_components[compID-1].value).toFixed(3);
		item_acceptComp.children[1].children[1].children[0].value = Number(protocol[protocolID].sorting[sortID].accept_components[compID-1].value).toFixed(3);
	}
	else{
		item_acceptComp.children[1].children[0].children[1].children[0].value = Number(protocol[protocolID].sorting[sortID].accept_components[compID-1].removed_value).toFixed(3);
		item_acceptComp.children[1].children[1].children[0].value = Number(protocol[protocolID].sorting[sortID].accept_components[compID-1].removed_value).toFixed(3);
	}
	
	item_acceptComp.children[1].children[0].children[1].children[1].value = Number(protocol[protocolID].sorting[sortID].accept_components[compID-1].value_type);
	item_acceptComp.children[1].children[0].children[1].children[2].children[0].checked = protocol[protocolID].sorting[sortID].accept_components[compID-1].flag_1;
	item_acceptComp.children[1].children[0].children[1].children[2].children[1].checked = protocol[protocolID].sorting[sortID].accept_components[compID-1].flag_2;
	
	item_acceptComp.children[1].children[0].children[1].children[0].value 
		= changeValueOfTypeSorting(protocol[protocolID].sorting[sortID], protocol[protocolID].sorting[sortID].accept_components[compID-1], "accept", item_acceptComp.children[1].children[1].children[0]);
	
	//Основные значения отбоя компанета сортирокт
	var item_rejectComp = document.getElementById("item_rejectComp_"+compID);
	if(protocol[protocolID].sourceProduct.components[compID-1].flag_2){
		item_rejectComp.children[1].children[0].children[1].children[0].value = Number(protocol[protocolID].sorting[sortID].reject_components[compID-1].value).toFixed(3);
		item_rejectComp.children[1].children[1].children[0].value = Number(protocol[protocolID].sorting[sortID].reject_components[compID-1].value).toFixed(3);
	}
	else{
		item_rejectComp.children[1].children[0].children[1].children[0].value = Number(protocol[protocolID].sorting[sortID].reject_components[compID-1].removed_value).toFixed(3);
		item_rejectComp.children[1].children[1].children[0].value = Number(protocol[protocolID].sorting[sortID].reject_components[compID-1].removed_value).toFixed(3);
	}
	item_rejectComp.children[1].children[0].children[1].children[1].value = Number(protocol[protocolID].sorting[sortID].reject_components[compID-1].value_type);
	item_rejectComp.children[1].children[0].children[1].children[2].children[0].checked = protocol[protocolID].sorting[sortID].reject_components[compID-1].flag_1;
	item_rejectComp.children[1].children[0].children[1].children[2].children[1].checked = protocol[protocolID].sorting[sortID].reject_components[compID-1].flag_2;
	
	item_rejectComp.children[1].children[0].children[1].children[0].value 
		= changeValueOfTypeSorting(protocol[protocolID].sorting[sortID], protocol[protocolID].sorting[sortID].reject_components[compID-1], "reject", item_rejectComp.children[1].children[1].children[0]);
}
function sortingComponentsUpdate(compID){
	var sortID = Number(SortingLable.value);
	//Основные значения прохода компанета сортирокт
	var item_acceptComp = document.getElementById("item_acceptComp_"+compID);
	if(protocol[protocolID].sourceProduct.components[compID-1].flag_2)
		protocol[protocolID].sorting[sortID].accept_components[compID-1].value = Number(item_acceptComp.children[1].children[1].children[0].value).toFixed(3);
	else
		protocol[protocolID].sorting[sortID].accept_components[compID-1].removed_value = Number(item_acceptComp.children[1].children[1].children[0].value).toFixed(3);
	
	protocol[protocolID].sorting[sortID].accept_components[compID-1].value_type = Number(item_acceptComp.children[1].children[0].children[1].children[1].value);
	protocol[protocolID].sorting[sortID].accept_components[compID-1].flag_1 = item_acceptComp.children[1].children[0].children[1].children[2].children[0].checked;
	protocol[protocolID].sorting[sortID].accept_components[compID-1].flag_2 = item_acceptComp.children[1].children[0].children[1].children[2].children[1].checked;
	//Основные значения отбоя компанета сортирокт
	var item_rejectComp = document.getElementById("item_rejectComp_"+compID);
	if(protocol[protocolID].sourceProduct.components[compID-1].flag_2)
		protocol[protocolID].sorting[sortID].reject_components[compID-1].value = Number(item_rejectComp.children[1].children[1].children[0].value).toFixed(3);
	else
		protocol[protocolID].sorting[sortID].reject_components[compID-1].removed_value = Number(item_rejectComp.children[1].children[1].children[0].value).toFixed(3);
	
	protocol[protocolID].sorting[sortID].reject_components[compID-1].value_type = Number(item_rejectComp.children[1].children[0].children[1].children[1].value);
	protocol[protocolID].sorting[sortID].reject_components[compID-1].flag_1 = item_rejectComp.children[1].children[0].children[1].children[2].children[0].checked;
	protocol[protocolID].sorting[sortID].reject_components[compID-1].flag_2 = item_rejectComp.children[1].children[0].children[1].children[2].children[1].checked;
	
	sortingComponentsSetup(compID);
	
	if(protocol[protocolID].sourceProduct.components[compID-1].flag_2){
		setupAcceptPurity(sortID+1);
		setupRejectPurity(sortID+1);
	}
}
//Создание нового блока протокола
function addProtocolData(){
	//Создание данных под новый протокол
	protocolID = protocol.length; 
	generateProtocolElement(protocol); //создание нового элемента протокола
	generateSortElement(protocol,0,"Проход 01","Отбой 01"); // Добавление элемента сортировки
	protocol[protocolID].sourceProduct.components.push({ // Добовление изначального компанента для исходного продукта
		object_name: "item_source_1",
		product_name: "-",
		classifier: {
			useADD_ID: Math.random().toString(36).substring(2,10) + "PR" + (protocol[protocolID].sourceProduct.components.length + 1),
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
		value: protocol[protocolID].sourceProduct.components.length == 0 ? 100 : 0,
		value_type: 0,
		removed_value: 0,
		flag_1: protocol[protocolID].sourceProduct.components.length == 0 ? true : false,
		flag_2: true,
		images: []
	});
	//Создание Блока протокола
	var cloneProtocol = protocol_0.cloneNode(true);
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
	var protocolDeleteButton = cloneProtocol.children[0].children[1].children[0].children[0].children[0];
	var protocolViewButton =  cloneProtocol.children[0].children[1].children[4].children[0].children[0].children[0];
	var protocolResultButton =  cloneProtocol.children[0].children[1].children[4].children[1].children[0].children[0];
	//Добавление в список протоколов
	var protocolSelect = protocolSettings.children[0].children[0].children[0].children[0].children[0];
	var option = document.createElement('option');
	option.value = protocolID;
	option.textContent = protocolID < 9 ? "Протокол 0" + Number(protocolID+1) : "Протокол " + Number(protocolID+1);
	protocolSelect.add(option);

	//ID protocol_block
	cloneProtocol.style.display = "";
	cloneProtocol.id = "protocol_"+Number(protocolID+1);
	//заполнение основной информация по протоколу в блок
	try{
		protocolName.textContent 
			= search_user_info(Number(protocol[id_protocol].id_responsible)).name + " " + protocol[protocolID].create_date + " " + protocol[protocolID].id_requirements + "_" + protocol[protocolID].id_protocol;
	}
	catch{
		protocolName.textContent = "undefined" + " " + protocol[protocolID].create_date + " " + protocol[protocolID].id_requirements;
	}	
	protocolSearchProduct.value = protocol[protocolID].main_product + " - " + protocol[protocolID].main_weed;
	protocolSourceCapacity.value = Number(protocol[protocolID].source_capacity).toFixed(3);
	protocolSourcePurity.value = Number(protocol[protocolID].source_purity).toFixed(3);
	protocolFractionCapacity.value = Number(protocol[protocolID].fraction_capacity).toFixed(3);
	protocolFractionPurity.value = Number(protocol[protocolID].fraction_purity).toFixed(3);

	//Номер протокола дл отображения
	if(protocolID<9)
		protocolNumber.textContent = "0"+Number(protocolID+1);
	else
		protocolNumber.textContent = Number(protocolID+1);
	//Добавление функций
	protocolDeleteButton.addEventListener("click", function(){
		deleteProtocolData(cloneProtocol.id);
	});
	protocolViewButton.addEventListener("click", function(){
		setupProtocolView(cloneProtocol.id);
	});
	protocolResultButton.addEventListener("click", function(){
		protocolResultView(cloneProtocol.id);
	});
	protocolEquipmentSelect.addEventListener("change", function(){
		protocolEquipment(Number(protocolID+1));
	});
	protocolConfigurationSelect.addEventListener("change", function(){
		protocolConfiguration(Number(protocolID+1));
	});
	
	protocolBlock.appendChild(cloneProtocol);
	
	protocol[protocolID].equipment_machine = protocolRequirements.equipment_machine;
	protocol[protocolID].configuration = protocolRequirements.configuration;
	
	setupProtocolMachine(protocolID+1);
	protocolEquipmentSelect.value = protocol[protocolID].equipment_machine;
	setupProtocolConfiguration(protocolID+1, protocol[protocolID].equipment_machine);
	
	load_protocol[protocol.length-1] = false;
}
//Удаление протокола
function deleteProtocolData(id_value){
	var id = Number(id_value.substr(9));
	document.getElementById("protocol_"+id).remove();
	protocol.splice(id-1,1);
	//Изменение айдишников в блоке протоколов
	for(var i=1; i<=protocol.length;i++){
		var protocolElement = protocolBlock.children[i];
		var protocolNumber = protocolElement.children[0].children[1].children[0].children[0].children[1];
		protocolElement.id = "protocol_"+i;
		if(i<9)
			protocolNumber.textContent = "0"+i;
		else
			protocolNumber.textContent = "0"+i;
	}
}
//Отображение и предустановка выбранного протокала
function setupProtocolView(id_value){
	//Подготовка к отображению протокола
	var ID = Number(id_value.substr(9)-1);
	var protocolSelect = protocolSettings.children[0].children[0].children[0].children[0].children[0];
	var protocolEquipmentSelect = protocolSettings.children[0].children[0].children[1].children[0].children[0];
	var protocolConfigurationSelect = protocolSettings.children[0].children[0].children[1].children[0].children[1];
	protocolID = ID;
	protocolSelect.value = protocolID;
	protocolEquipmentSelect.value = protocol[protocolID].equipment_machine;
	
	if(!search_load){
		setupProtocolConfiguration(protocolID+1, protocol[protocolID].equipment_machine);
	}
	else
		setupProtocolConfiguration(searchProtocolID+1, protocol[protocolID].equipment_machine);
	
	protocolConfigurationSelect.value = protocol[protocolID].configuration;
	protocolTypeID.value = protocol[protocolID].id_protocolType;
	//Отчистка интерфейса
	clearProtocolInterface();
	fractionNameRequirementsInProtocol();
	
	sortingInfoMinSetup("SortingBlockMin_1");
	//Подготовка к добавлению количества сортировок
	for(var i=2; i<=protocol[protocolID].sorting.length; i++){
		feakeAddSortionBlock(i);
	}
	//Создание необходимого числа компанентов исходного продукта
	for(var i=1; i<=protocol[protocolID].sourceProduct.components.length; i++){
		addSourceItem();
		setupClassifierComponents(i);
		var lastElementID = Number(protocol[protocolID].sourceProduct.components.length-1); 
		protocol[protocolID].sourceProduct.components.splice(lastElementID,1);
		for(var j=0; j<protocol[protocolID].sorting.length; j++){
			protocol[protocolID].sorting[j].accept_components.splice(lastElementID,1);
			protocol[protocolID].sorting[j].reject_components.splice(lastElementID,1);
		}
	}
	//Подгрузка данных из требований
	if(!load_protocol[protocolID]){
		sourceProductRequirementsInProtocol();
		componentsProductRequirementsInProtocol();
		protocolComponentsOtherID = requirementsComponentsOtherID;
		sortingInfoMinUpdate("SortingBlockMin_1");
	}
	else
		setupClassifierSourceProduct();	//Установка ID-классификатора для исходного
		
	//Создание блоков под фотографии прохода и отбоя
	for(var i=1; i<=protocol[protocolID].sorting.length; i++){
		for(var j=1; j<=protocol[protocolID].sorting[i-1].accept_img.length;j++){
			var photoBlock = document.getElementById("acceptAddPhotoBlock_"+i);
			var cloneAcceptPhoto = photoBlock.children[2].cloneNode(true);
			cloneAcceptPhoto.style.display = "flex";
			cloneAcceptPhoto.id = "sortingAccept_"+i+"_photo_"+j;
			
			photoBlock.appendChild(cloneAcceptPhoto);
			cloneAcceptPhoto.children[0].children[0].src = protocol[protocolID].sorting[i-1].accept_img[j-1];
			cloneAcceptPhoto.children[0].addEventListener("click",
				AcceptImageAddEventFunction(cloneAcceptPhoto.id.substring(14,15),cloneAcceptPhoto.id.substring(22,23),"edit"));
			cloneAcceptPhoto.children[1].addEventListener("click",
				AcceptImageAddEventFunction(cloneAcceptPhoto.id.substring(14,15),cloneAcceptPhoto.id.substring(22,23),"deleate"));			
		}
		for(var j=1; j<=protocol[protocolID].sorting[i-1].reject_img.length;j++){
			var photoBlock = document.getElementById("rejectAddPhotoBlock_"+i);
			var cloneRejectPhoto = photoBlock.children[2].cloneNode(true);
			cloneRejectPhoto.style.display = "flex";
			cloneRejectPhoto.id = "sortingReject_"+i+"_photo_"+j;
			
			photoBlock.appendChild(cloneRejectPhoto);
			cloneRejectPhoto.children[0].children[0].src = protocol[protocolID].sorting[i-1].reject_img[j-1];
			cloneRejectPhoto.children[0].addEventListener("click",
				RejectImageAddEventFunction(cloneRejectPhoto.id.substring(14,15),cloneRejectPhoto.id.substring(22,23),j,"edit"));
			cloneRejectPhoto.children[1].addEventListener("click",
				RejectImageAddEventFunction(cloneRejectPhoto.id.substring(14,15),cloneRejectPhoto.id.substring(22,23),"deleate"));			
		}
	}
	//Созание блоков под фотографии исходного продукта
	for(var i=1; i<=protocol[protocolID].sourceProduct.images.length; i++){
		var cloneSourcePhoto = sourceBlockAddPhoto.children[2].cloneNode(true);
		cloneSourcePhoto.style.display = "flex"
		cloneSourcePhoto.id = "sourcePhoto_"+i;
		
		sourceBlockAddPhoto.appendChild(cloneSourcePhoto);
		cloneSourcePhoto.children[0].children[0].src = protocol[protocolID].sourceProduct.images[i-1];
		cloneSourcePhoto.children[0].addEventListener("click",
			SourceImageAddEventFunction(cloneSourcePhoto.id.substring(12) ,"edit"));
		cloneSourcePhoto.children[1].addEventListener("click",
			SourceImageAddEventFunction(cloneSourcePhoto.id.substring(12),"deleate"));
	}
	//Создание блоков под фотографии компанентов исходного продукта
	for(var i=1; i<=protocol[protocolID].sourceProduct.components.length; i++){
		for(var j=1; j<=protocol[protocolID].sourceProduct.components[i-1].images.length; j++){
			var photoBlock = document.getElementById("addPhotoBlock_"+i);
			var cloneItemSourcePhoto = photoBlock.children[1].cloneNode(true);
			cloneItemSourcePhoto.style.display = "flex";
			cloneItemSourcePhoto.id = "item_source_"+i+"_photo_"+j;
			
			cloneItemSourcePhoto.children[0].children[0].src = protocol[protocolID].sourceProduct.components[i-1].images[j-1];
			
			photoBlock.appendChild(cloneItemSourcePhoto);
			cloneItemSourcePhoto.children[0].children[0].src = protocol[protocolID].sourceProduct.components[i-1].images[j-1];
			cloneItemSourcePhoto.children[0].addEventListener("click",
				ItemSourceImageAddEventFunction(cloneItemSourcePhoto.id.substring(12,13),cloneItemSourcePhoto.id.substring(20,21),"edit"));
			cloneItemSourcePhoto.children[1].addEventListener("click",
				ItemSourceImageAddEventFunction(cloneItemSourcePhoto.id.substring(12,13),cloneItemSourcePhoto.id.substring(20,21),"deleate"));			
		}
	}
	//Установка значений производительности исходного продукта из требований
	if(!search_load){
		protocol[protocolID].sourceProduct.capacity_value = protocolRequirements.capacity_per_hour;
		protocol[protocolID].sourceProduct.capacity_type = protocolRequirements.capacity_type == 0 ? 1 : 0;
	}
	
	sourceProductSetup();
	setupInfoFractionName();
	protocolBlockView();
	newProtoclComponentsOtherID();
	setupMainPagePurity(protocol[protocolID].sourceProduct, sourceBlock.children[0].children[0].children[1]);
	sortingExitByAccept(Number(SortingLable.value) + 1);
	sortingExitByReject(Number(SortingLable.value) + 1);
	updateAllSorting();
	addFileChange();
	
	if(!load_protocol[protocolID]){
		sourceProductUpdate();
		load_protocol[protocolID] = true;
	}
}
//Обновление имени протокола(сохраненного,подгруженного,найденого по поиску)
function updateProtocolName(object_name){
	var string = object_name.split("_");
	var id_protocol = Number(string[string.length-1] - 1);
	var protocol_type = !search_load ? protocol : protocolSearch; 
	
	var protocolName = document.getElementById(object_name).children[0].children[0];
	var fullProtocolID = protocol_type[id_protocol].id_protocol != "id_protocol" ? protocol_type[id_protocol].id_requirements + "_" + protocol_type[id_protocol].id_protocol : protocol_type[id_protocol].id_requirements;
	try{
		protocolName.textContent = search_user_info(Number(protocol_type[id_protocol].id_responsible)).name + " " + protocol_type[id_protocol].create_date + " " + fullProtocolID;
	}
	catch{
		protocolName.textContent = "undefined" + " " + protocol_type[id_protocol].create_date + " " + fullProtocolID;
	}
}
//Отображение значений классификатора Продукт
function setupClassifierSourceProduct(){
	//Начальная Установка Классификатора
	productClassifier.children[0].children[5].children[0].children[0].value = protocol[protocolID].sourceProduct.classifier.classifierType;
	classifierSourceChangeType();
	
	//Элементы класиификатора продукта
	var IndustryElement = productClassifier.children[0].children[0].children[1].children[0];
	var ProductGroupElement = productClassifier.children[0].children[0].children[3].children[0];
	var ProductElement = productClassifier.children[0].children[0].children[5].children[0];
	var ProductDescription = productClassifier.children[0].children[0].children[7].children[0];
	var ProductTypeElement = productClassifier.children[0].children[0].children[9].children[0];
	var PurposeElement = productClassifier.children[0].children[0].children[13].children[0];
	//Элементы класиификатора засорителя
	var IndustryWeedElement = productClassifier.children[0].children[2].children[1].children[0];
	var CategoryElement = productClassifier.children[0].children[2].children[3].children[0];
	var ClassWeedElement = productClassifier.children[0].children[2].children[5].children[0];
	var WeedElement = productClassifier.children[0].children[2].children[7].children[0];
	var DescriptionElement = productClassifier.children[0].children[2].children[9].children[0];
	
	switch(protocol[protocolID].sourceProduct.classifier.classifierType){
		case 0:
			//Переключение на панель добавления Компонента
			if(protocol[protocolID].sourceProduct.classifier.classifierProduct.useADD){
				classifierSourceProductViewADD();
				
				//Установка дополнительных значений
				productClassifier.children[0].children[1].children[1].children[0].value = protocol[protocolID].sourceProduct.classifier.classifierProduct.addClassifier.industry;
				productClassifier.children[0].children[1].children[3].children[0].value = protocol[protocolID].sourceProduct.classifier.classifierProduct.addClassifier.groupProduct;
				productClassifier.children[0].children[1].children[5].children[0].value = protocol[protocolID].sourceProduct.classifier.classifierProduct.addClassifier.product;
				productClassifier.children[0].children[1].children[7].children[0].value = protocol[protocolID].sourceProduct.classifier.classifierProduct.addClassifier.description;
				productClassifier.children[0].children[1].children[9].children[0].value = protocol[protocolID].sourceProduct.classifier.classifierProduct.addClassifier.productType;
				productClassifier.children[0].children[1].children[11].children[0].value = protocol[protocolID].sourceProduct.classifier.classifierProduct.addClassifier.productSort;
				productClassifier.children[0].children[1].children[13].children[0].value = protocol[protocolID].sourceProduct.classifier.classifierProduct.addClassifier.purpose;
				
				classifierSourceNewProductADD();
			}
			else{
				//Установка ID
				productClassifier.children[0].children[0].children[1].children[0].value = protocol[protocolID].sourceProduct.classifier.classifierProduct.mainClassifier.industryID;
				clearClassifierSelect(ProductDescription);
				clearClassifierSelect(ProductGroupElement);
				clearClassifierSelect(ProductElement);
				clearClassifierSelect(ProductTypeElement);
				clearClassifierSelect(PurposeElement);		
				
				if(IndustryElement.value == 0)
					sourceProductSetupProductGroup();
				
				productClassifier.children[0].children[0].children[3].children[0].value = protocol[protocolID].sourceProduct.classifier.classifierProduct.mainClassifier.groupProductID;
				clearClassifierSelect(ProductElement);
				clearClassifierSelect(ProductTypeElement);
				clearClassifierSelect(PurposeElement);
				
				if(ProductGroupElement.value != 9999){
					sourceProductSetupProduct();
					sourceProductSetupPurpose();
				}
				
				productClassifier.children[0].children[0].children[5].children[0].value = protocol[protocolID].sourceProduct.classifier.classifierProduct.mainClassifier.productID;
				clearClassifierSelect(ProductTypeElement);
				
				if(ProductElement.value != 9999){
					sourceProductSetupProductType();
				}
				
				productClassifier.children[0].children[0].children[7].children[0].value = protocol[protocolID].sourceProduct.classifier.classifierProduct.mainClassifier.descriptionID;
				productClassifier.children[0].children[0].children[9].children[0].value = protocol[protocolID].sourceProduct.classifier.classifierProduct.mainClassifier.productTypeID;
				productClassifier.children[0].children[0].children[11].children[0].value = protocol[protocolID].sourceProduct.classifier.classifierProduct.mainClassifier.productSortID;
				productClassifier.children[0].children[0].children[13].children[0].value = protocol[protocolID].sourceProduct.classifier.classifierProduct.mainClassifier.purposeID;
				productClassifier.children[0].children[0].children[15].children[0].value = protocol[protocolID].sourceProduct.classifier.classifierProduct.mainClassifier.GOST_ID;
				
				
				classifierSourceGOST(ProductElement.value,PurposeElement.value);
				classifierProductEdit();
			}
			break;
		case 1:
			//Переключение на панель добавления Компонента
			if(protocol[protocolID].sourceProduct.classifier.classifierWeed.useADD){
				classifierSourceWeedViewADD();
			
				//Установка дополнительных значений
				productClassifier.children[0].children[3].children[1].children[0].value = protocol[protocolID].sourceProduct.classifier.classifierWeed.addClassifier.industry;
				productClassifier.children[0].children[3].children[3].children[0].value = protocol[protocolID].sourceProduct.classifier.classifierWeed.addClassifier.category;
				productClassifier.children[0].children[3].children[5].children[0].value = protocol[protocolID].sourceProduct.classifier.classifierWeed.addClassifier.classWeed;
				productClassifier.children[0].children[3].children[7].children[0].value = protocol[protocolID].sourceProduct.classifier.classifierWeed.addClassifier.weedName;
				productClassifier.children[0].children[3].children[9].children[0].value = protocol[protocolID].sourceProduct.classifier.classifierWeed.addClassifier.description;
				
				classifierSourceNewWeedADD();
			}
			else{
				//Установка ID
				productClassifier.children[0].children[2].children[1].children[0].value = protocol[protocolID].sourceProduct.classifier.classifierWeed.mainClassifier.industryID;
				clearClassifierSelect(CategoryElement);
				clearClassifierSelect(ClassWeedElement);
				clearClassifierSelect(WeedElement);
				clearClassifierSelect(DescriptionElement);
			
				if(IndustryWeedElement.value == 0)
					sourceProductSetupCategory();
				
				productClassifier.children[0].children[2].children[3].children[0].value = protocol[protocolID].sourceProduct.classifier.classifierWeed.mainClassifier.categoryID;
				clearClassifierSelect(ClassWeedElement);
				clearClassifierSelect(WeedElement);
				clearClassifierSelect(DescriptionElement);
				
				if(CategoryElement.value != 9999)
					sourceProductSetupClassWeed();
				
				productClassifier.children[0].children[2].children[5].children[0].value = protocol[protocolID].sourceProduct.classifier.classifierWeed.mainClassifier.classWeedID;
				clearClassifierSelect(WeedElement);
				clearClassifierSelect(DescriptionElement);
				
				if(ClassWeedElement.value != 9999){
					sourceProductSetupWeed();
					sourceProductSetupDescriptionWeeed();
				}
				
				productClassifier.children[0].children[2].children[7].children[0].value = protocol[protocolID].sourceProduct.classifier.classifierWeed.mainClassifier.weedNameID;
				productClassifier.children[0].children[2].children[9].children[0].value = protocol[protocolID].sourceProduct.classifier.classifierWeed.mainClassifier.descriptionID;
				
				classifierProductEdit();
			}
			break;
	}
}
function setupClassifierComponents(id){
	var selectElementSource = document.getElementById("item_source_"+id).children[1].children[0].children[0];
	var classifier = document.getElementById("classifier_"+id);

	classifier.children[0].children[5].children[0].children[0].value = protocol[protocolID].sourceProduct.components[id-1].classifier.classifierType;
	classifierSourceCompanentChangeType(id);
	
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
	
	switch(protocol[protocolID].sourceProduct.components[id-1].classifier.classifierType){
		case 0:
			//Переключение на панель добавления Компонента
			if(protocol[protocolID].sourceProduct.components[id-1].classifier.classifierProduct.useADD){
				classifierSourceComponentProductVidewADD(id);
				
				//Установка дополнительных значений
				classifier.children[0].children[1].children[1].children[0].value = protocol[protocolID].sourceProduct.components[id-1].classifier.classifierProduct.addClassifier.industry;
				classifier.children[0].children[1].children[3].children[0].value = protocol[protocolID].sourceProduct.components[id-1].classifier.classifierProduct.addClassifier.groupProduct;
				classifier.children[0].children[1].children[5].children[0].value = protocol[protocolID].sourceProduct.components[id-1].classifier.classifierProduct.addClassifier.product;
				classifier.children[0].children[1].children[7].children[0].value = protocol[protocolID].sourceProduct.components[id-1].classifier.classifierProduct.addClassifier.description;
				classifier.children[0].children[1].children[9].children[0].value = protocol[protocolID].sourceProduct.components[id-1].classifier.classifierProduct.addClassifier.productType;
				classifier.children[0].children[1].children[11].children[0].value = protocol[protocolID].sourceProduct.components[id-1].classifier.classifierProduct.addClassifier.productSort;
				
				classifierSourceComponentNewProductADD(id);
			}
			else{
				//Установка ID
				classifier.children[0].children[0].children[1].children[0].value = protocol[protocolID].sourceProduct.components[id-1].classifier.classifierProduct.mainClassifier.industryID;
				clearClassifierSelect(ProductDescription);
				clearClassifierSelect(ProductGroupElement);
				clearClassifierSelect(ProductElement);
				clearClassifierSelect(ProductTypeElement);

				if(IndustryElement.value == 0)
					sourceComponentsSetupProductGroup(id);
				
				classifier.children[0].children[0].children[3].children[0].value = protocol[protocolID].sourceProduct.components[id-1].classifier.classifierProduct.mainClassifier.groupProductID;
				clearClassifierSelect(ProductElement);
				clearClassifierSelect(ProductTypeElement);
				
				if(ProductGroupElement.value != 9999)
					sourceComponentsSetupProduct(id);
				
				if(protocol[protocolID].sourceProduct.components[id-1].classifier.classifierProduct.mainClassifier.productID == list_product.length-1){
					
					protocol[protocolID].sourceProduct.components[id-1].other_check = true;
					protocolComponentsOtherID = id;
					
					var componentItem = document.getElementById("item_source_" + protocolComponentsOtherID);
					var componentSelectedValue = componentItem.children[1].children[0].children[1].children[0];
					var componentSlider = componentItem.children[1].children[1].children[0];
					
					//Добавление-Удаление функций
					componentSelectedValue.addEventListener("change",calculation_other_protocol);
					componentSlider.addEventListener("input",calculation_other_protocol);
					
					componentSelectedValue.removeEventListener("change", checkProtocolComponents);
					componentSlider.removeEventListener("input", checkProtocolComponents);
					
					var option = document.createElement('option');
					option.textContent = list_product[list_product.length-1].productName;
					option.value = list_product[list_product.length-1].id_product;
					ProductElement.add(option);
				}
				
				classifier.children[0].children[0].children[5].children[0].value = protocol[protocolID].sourceProduct.components[id-1].classifier.classifierProduct.mainClassifier.productID;
				clearClassifierSelect(ProductTypeElement);
				
				if(ProductElement.value != 9999){
					sourceComponentsSetupProductType(id);
				}
				
				classifier.children[0].children[0].children[7].children[0].value = protocol[protocolID].sourceProduct.components[id-1].classifier.classifierProduct.mainClassifier.descriptionID;
				classifier.children[0].children[0].children[9].children[0].value = protocol[protocolID].sourceProduct.components[id-1].classifier.classifierProduct.mainClassifier.productTypeID;
				classifier.children[0].children[0].children[11].children[0].value = protocol[protocolID].sourceProduct.components[id-1].classifier.classifierProduct.mainClassifier.productSortID;
				
				classifierSourceComponentGOST(id,ProductElement.value,protocol[protocolID].sourceProduct.classifier.classifierProduct.mainClassifier.purposeID);
				classifierSourceEdit(id);
			}
			break;
		case 1:		
			//Переключение на панель добавления Компонента
			if(protocol[protocolID].sourceProduct.components[id-1].classifier.classifierWeed.useADD){
				classifierSourceComponentWeedVidewADD(id);
				
				//Установка дополнительных значений
				classifier.children[0].children[3].children[1].children[0].value = protocol[protocolID].sourceProduct.components[id-1].classifier.classifierWeed.addClassifier.industry;
				classifier.children[0].children[3].children[3].children[0].value = protocol[protocolID].sourceProduct.components[id-1].classifier.classifierWeed.addClassifier.category;
				classifier.children[0].children[3].children[5].children[0].value = protocol[protocolID].sourceProduct.components[id-1].classifier.classifierWeed.addClassifier.classWeed;
				classifier.children[0].children[3].children[7].children[0].value = protocol[protocolID].sourceProduct.components[id-1].classifier.classifierWeed.addClassifier.weedName;
				classifier.children[0].children[3].children[9].children[0].value = protocol[protocolID].sourceProduct.components[id-1].classifier.classifierWeed.addClassifier.description;
				
				classifierSourceComponentNewWeedADD(id);
			}
			else{
				//Установка ID
				classifier.children[0].children[2].children[1].children[0].value = protocol[protocolID].sourceProduct.components[id-1].classifier.classifierWeed.mainClassifier.industryID;
				clearClassifierSelect(CategoryElement);
				clearClassifierSelect(ClassWeedElement);
				clearClassifierSelect(WeedElement);
				clearClassifierSelect(DescriptionElement);
			
				if(IndustryWeedElement.value == 0)
					sourceComponentsSetupCategory(id);
				
				classifier.children[0].children[2].children[3].children[0].value = protocol[protocolID].sourceProduct.components[id-1].classifier.classifierWeed.mainClassifier.categoryID;
				clearClassifierSelect(ClassWeedElement);
				clearClassifierSelect(WeedElement);
				clearClassifierSelect(DescriptionElement);
				
				if(CategoryElement.value != 9999)
					sourceComponentsSetupClassWeed(id);
				
				classifier.children[0].children[2].children[5].children[0].value = protocol[protocolID].sourceProduct.components[id-1].classifier.classifierWeed.mainClassifier.classWeedID;
				clearClassifierSelect(WeedElement);
				clearClassifierSelect(DescriptionElement);
				
				if(ClassWeedElement.value != 9999){
					sourceComponentsSetupWeed(id);
					sourceComponentsSetupDescriptionWeeed(id);
				}
				
				classifier.children[0].children[2].children[7].children[0].value = protocol[protocolID].sourceProduct.components[id-1].classifier.classifierWeed.mainClassifier.weedNameID;
				classifier.children[0].children[2].children[9].children[0].value = protocol[protocolID].sourceProduct.components[id-1].classifier.classifierWeed.mainClassifier.descriptionID;
				
				classifierSourceEdit(id);
			}
			break;
	}
}

function AcceptImageAddEventFunction(i,j,type){
	return function(e){
		switch(type){
			case "edit":
				editPhoto(document.getElementById("sortingAccept_"+i+"_photo_"+j).id, document.getElementById("acceptInput").children[1].children[0].children[0]);
				break;
			case "deleate":
				deleateSortingAcceptPhoto("sortingAccept_"+i+"_photo_"+j);
				break;
		}
	}
}
function RejectImageAddEventFunction(i,j,type){
	return function(e){
		switch(type){
			case "edit":
				editPhoto(document.getElementById("sortingReject_"+i+"_photo_"+j).id, document.getElementById("rejectInput").children[1].children[0].children[0]);
				break;
			case "deleate":
				deleateSortingRejectPhoto("sortingReject_"+i+"_photo_"+j);
				break;
		}
	}
}
function SourceImageAddEventFunction(i,type){
	return function(e){
		switch(type){
			case "edit":
				editPhoto(document.getElementById("sourcePhoto_"+i).id, document.getElementById("sourceBlockPhoto").children[0]);
				break;
			case "deleate":
				deleateSourceBlockPhoto("sourcePhoto_"+i);
				break;
		}
	}
}
function ItemSourceImageAddEventFunction(i,j,type){
	return function(e){
		switch(type){
			case "edit":
				editPhoto(document.getElementById("item_source_"+i+"_photo_"+j).id, document.getElementById("item_source_"+i).children[2].children[0].children[0]);
				break;
			case "deleate":
				deleateItemSourcePhoto("item_source_"+i+"_photo_"+j);
				break;
		}
	}
}

function feakeAddSortionBlock(id){
	//Клонирование блоков сортировки (MinInfo)
	var cloneSortingBlockMin = SortingBlockMin_0.cloneNode(true);
	var cloneSettings = cloneSortingBlockMin.children[0];
	var cloneComponents = cloneSortingBlockMin.children[1];
	
	cloneSortingBlockMin.id = "SortingBlockMin_"+(id);
	cloneSettings.id = "SortingSettings_"+(id);
	cloneComponents.id = "SortingComponents_"+(id);

	cloneSortingBlockMin.style.display = "";
	
	cloneSettings.children[0].children[0].children[0].children[0].addEventListener('click',function(){
		delateSortingBlockID(cloneSettings.id);
	});	
	cloneSettings.children[0].children[0].children[3].children[0].addEventListener('click',function(){
		sortBlockView(cloneSettings.id);
	});
	
	SortingInfoMin.appendChild(cloneSortingBlockMin);
	
	//Генерация опции Сортировки (MaxInfo)
	var sortOption = document.createElement("option");
	var sortOptionNumber = id;
		
	var cloneInputRowSource = inputRowSource_0.cloneNode(true);	
	cloneInputRowSource.id = "inputRowSource_"+(id);
	cloneInputRowSource.style.display = "";
	
	var cloneAcceptAddPhotoBlock = acceptAddPhotoBlock_0.cloneNode(true);
	var cloneRejectAddPhotoBlock = rejectAddPhotoBlock_0.cloneNode(true);
	cloneAcceptAddPhotoBlock.id = "acceptAddPhotoBlock_"+(id);
	cloneRejectAddPhotoBlock.id = "rejectAddPhotoBlock_"+(id);
	
	sortOption.value = id-1;
	if(sortOption.value<9){
		sortOption.innerText = "Сортировка 0" + sortOptionNumber;
		cloneSettings.children[0].children[0].children[0].children[1].value = "Сортировка 0" + sortOptionNumber;
		
		cloneInputRowSource.children[0].textContent = "Сортировка 0" + sortOptionNumber;
	}
	else{
		sortOption.innerText = "Сортировка " + sortOptionNumber;
		cloneSettings.children[0].children[0].children[0].children[1].value = "Сортировка " + sortOptionNumber;
		
		cloneInputRowSource.children[0].textContent = "Сортировка " + sortOptionNumber;
	}
	
	SortingLable.appendChild(sortOption);
	addSourceBlock.appendChild(cloneInputRowSource);
	sortingAcceptPhotoBlock.appendChild(cloneAcceptAddPhotoBlock);
	sortingRejectPhotoBlock.appendChild(cloneRejectAddPhotoBlock);

	var acceptSelect = cloneComponents.children[0].children[0].children[0];
	var rejectSelect = cloneComponents.children[2].children[0].children[0];
		
	//Генерация элемента сортировки(Проходы и Отбои)
	if(sortOptionNumber<10){
		accept_name = "Проход 0" + sortOptionNumber;
		reject_name = "Отбой 0" + sortOptionNumber;
	}
	else{
		accept_name = "Проход " + sortOptionNumber;
		reject_name = "Отбой " + sortOptionNumber;
	}
	
	acceptSelect[0].innerText = accept_name;		
	rejectSelect[0].innerText = reject_name;

	for(var i = 1; i <= protocol[protocolID].sortingName.length; i++){
		var accept_option = document.createElement('option');
		accept_option.value = i;
		accept_option.innerText = protocol[protocolID].sortingName[i-1];
		acceptSelect.add(accept_option);
		
		var reject_option = document.createElement('option');
		reject_option.innerText = protocol[protocolID].sortingName[i-1];
		reject_option.value = i;
		rejectSelect.add(reject_option);
	}

	cloneInputRowSource.children[1].children[0].textContent = accept_name;
	cloneInputRowSource.children[2].children[0].textContent = reject_name;	
	
	//Добавление функции для входящих функций
	cloneInputRowSource.children[1].children[1].addEventListener("change", function(){
		sortingEnterFraction(cloneInputRowSource.children[1].children[1]);
	});
	cloneInputRowSource.children[2].children[1].addEventListener("change", function(){
		sortingEnterFraction(cloneInputRowSource.children[2].children[1]);
	});

	//генерация элемента сортировки
	sortingInfoMinSetup(cloneSortingBlockMin.id);
	//Добавление функций обновления значений сортировок
	cloneSettings.children[0].children[0].children[0].children[2].addEventListener("change",function(){
		sortingInfoMinUpdate(cloneSortingBlockMin.id);
	});
	cloneSettings.children[0].children[0].children[2].children[0].addEventListener("change",function(){
		sortingInfoMinUpdate(cloneSortingBlockMin.id);
		updateAllSorting();
	});
	cloneSettings.children[0].children[0].children[2].children[1].addEventListener("change",function(){
		sortingInfoMinUpdate(cloneSortingBlockMin.id);
		updateAllSorting();
	});
	cloneComponents.children[0].children[1].children[1].children[0].addEventListener("change",function(){
		sortingInfoMinUpdate(cloneSortingBlockMin.id);
	});
	cloneComponents.children[0].children[1].children[1].children[2].addEventListener("change",function(){
		sortingInfoMinUpdate(cloneSortingBlockMin.id);
	});
	cloneComponents.children[0].children[1].children[1].children[4].addEventListener("change",function(){
		sortingInfoMinUpdate(cloneSortingBlockMin.id);
	});
	cloneComponents.children[2].children[1].children[1].children[0].addEventListener("change",function(){
		sortingInfoMinUpdate(cloneSortingBlockMin.id);
	});
	cloneComponents.children[2].children[1].children[1].children[2].addEventListener("change",function(){
		sortingInfoMinUpdate(cloneSortingBlockMin.id);
	});
	cloneComponents.children[2].children[1].children[1].children[4].addEventListener("change",function(){
		sortingInfoMinUpdate(cloneSortingBlockMin.id);
	});
	cloneComponents.children[0].children[0].children[0].addEventListener("change",function(){
		updateInfoMinFractionName(cloneSortingBlockMin.id.substr(16));
	});
	cloneComponents.children[2].children[0].children[0].addEventListener("change",function(){
		updateInfoMinFractionName(cloneSortingBlockMin.id.substr(16));
	});
	
	setupAcceptPurity(Number(sortOption.value)+1);
	setupRejectPurity(Number(sortOption.value)+1);
}
//Функция предназначеная для отчистки интерфейса протокола
function clearProtocolInterface(){
	for(var id=1; id<=source_item; id++){
		//Отчистка компанентов исходного продукта
		document.getElementById("item_source_"+id).remove();
		document.getElementById("addPhotoBlock_"+id).remove();
		document.getElementById("classifier_"+id).remove();
		//Отчиска компонетов Прохода и Отбоя
		document.getElementById("item_acceptComp_"+id).remove();
		document.getElementById("item_rejectComp_"+id).remove();
	}
	source_item = 0;
	addSourceBlock.style.display = "none";
	//Отчистка числа сортировок и входящих фракций
	var sortingCount = Number(SortingLable.options.length);
	for(var id=2; id<=sortingCount; id++){
		document.getElementById("SortingBlockMin_"+id).remove();
		document.getElementById("acceptAddPhotoBlock_"+id).remove();
		document.getElementById("rejectAddPhotoBlock_"+id).remove();
		document.getElementById("inputRowSource_"+id).remove();
		
		SortingLable.options[SortingLable.options.length-1].remove();
	}
	//Отчиста фотографий исходного продукта
	try{
		document.getElementById("sourcePhoto_1").remove();
		document.getElementById("sourcePhoto_2").remove();
		document.getElementById("sourcePhoto_3").remove();
	}
	catch{
		
	}
	//Отчистка фотографий для компанентов исходного продукта
	try{
		for(var id=1; id<=protocol[protocolID].sourceProduct.components.length; id++){
			document.getElementById("item_source_"+id+"_photo_1").remove();
			document.getElementById("item_source_"+id+"_photo_2").remove();
			document.getElementById("item_source_"+id+"_photo_3").remove();
		}
	}
	catch{
		
	}
	//Отчистка фотографий прохода
	try{
		for(var id=1; id<=protocol[protocolID].sorting.length; id++){
			document.getElementById("sortingAccept_"+id+"_photo_1").remove();
			document.getElementById("sortingAccept_"+id+"_photo_2").remove();
			document.getElementById("sortingAccept_"+id+"_photo_3").remove();
		}
	}
	catch{
		
	}
	//Отчистка фотографий отбоя
	try{
		for(var id=1; id<=protocol[protocolID].sorting.length; id++){
			document.getElementById("sortingReject_"+id+"_photo_1").remove();
			document.getElementById("sortingReject_"+id+"_photo_2").remove();
			document.getElementById("sortingReject_"+id+"_photo_3").remove();
		}
	}
	catch{
		
	}
}
//Перенос данных из требований
var load_protocol = [];
//Установка исходного продукта
function sourceProductRequirementsInProtocol(){
	//Установка классификатора исходного продукта
	//Основные параметры
	protocol[protocolID].sourceProduct.capacity_value = Number(protocolRequirements.capacity_per_hour).toFixed(3);
	protocol[protocolID].sourceProduct.capacity_type = protocolRequirements.capacity_type == 0 ? 1 : 0;
	protocol[protocolID].sourceProduct.selection_value = protocolRequirements.selection_value;
	protocol[protocolID].sourceProduct.selection_type = protocolRequirements.selection_type;
	//Параметры классификатора
	protocol[protocolID].sourceProduct.classifier.classifierType = protocolRequirements.classifier.classifierType;
	protocol[protocolID].sourceProduct.classifier.classifierProduct.useADD = protocolRequirements.classifier.classifierProduct.useADD;
	protocol[protocolID].sourceProduct.classifier.classifierWeed.useADD = protocolRequirements.classifier.classifierWeed.useADD;
	if(protocol[protocolID].sourceProduct.classifier.classifierType == 0){
		if(!protocol[protocolID].sourceProduct.classifier.classifierProduct.useADD){
			protocol[protocolID].sourceProduct.classifier.classifierProduct.mainClassifier.industryID = protocolRequirements.classifier.classifierProduct.mainClassifier.industryID;
			protocol[protocolID].sourceProduct.classifier.classifierProduct.mainClassifier.groupProductID = protocolRequirements.classifier.classifierProduct.mainClassifier.groupProductID;
			protocol[protocolID].sourceProduct.classifier.classifierProduct.mainClassifier.productID = protocolRequirements.classifier.classifierProduct.mainClassifier.productID;
			protocol[protocolID].sourceProduct.classifier.classifierProduct.mainClassifier.descriptionID = protocolRequirements.classifier.classifierProduct.mainClassifier.descriptionID;
			protocol[protocolID].sourceProduct.classifier.classifierProduct.mainClassifier.productTypeID = protocolRequirements.classifier.classifierProduct.mainClassifier.productTypeID;
			protocol[protocolID].sourceProduct.classifier.classifierProduct.mainClassifier.productSortID = protocolRequirements.classifier.classifierProduct.mainClassifier.productSortID;
			protocol[protocolID].sourceProduct.classifier.classifierProduct.mainClassifier.purposeID = protocolRequirements.classifier.classifierProduct.mainClassifier.purposeID;
			protocol[protocolID].sourceProduct.classifier.classifierProduct.mainClassifier.GOST_ID = protocolRequirements.classifier.classifierProduct.mainClassifier.GOST_ID;
		}
		else{
			protocol[protocolID].sourceProduct.classifier.classifierProduct.addClassifier.industry = protocolRequirements.classifier.classifierProduct.addClassifier.industry;
			protocol[protocolID].sourceProduct.classifier.classifierProduct.addClassifier.groupProduct = protocolRequirements.classifier.classifierProduct.addClassifier.groupProduct;
			protocol[protocolID].sourceProduct.classifier.classifierProduct.addClassifier.product = protocolRequirements.classifier.classifierProduct.addClassifier.product;
			protocol[protocolID].sourceProduct.classifier.classifierProduct.addClassifier.description = protocolRequirements.classifier.classifierProduct.addClassifier.description;
			protocol[protocolID].sourceProduct.classifier.classifierProduct.addClassifier.productType = protocolRequirements.classifier.classifierProduct.addClassifier.productType;
			protocol[protocolID].sourceProduct.classifier.classifierProduct.addClassifier.productSort = protocolRequirements.classifier.classifierProduct.addClassifier.productSort;
			protocol[protocolID].sourceProduct.classifier.classifierProduct.addClassifier.purpose = protocolRequirements.classifier.classifierProduct.addClassifier.purpose;
		}
	}
	else{
		if(!protocol[protocolID].sourceProduct.classifier.classifierWeed.useADD){
			protocol[protocolID].sourceProduct.classifier.classifierWeed.mainClassifier.industryID = protocolRequirements.classifier.classifierWeed.mainClassifier.industryID;
			protocol[protocolID].sourceProduct.classifier.classifierWeed.mainClassifier.categoryID = protocolRequirements.classifier.classifierWeed.mainClassifier.categoryID;
			protocol[protocolID].sourceProduct.classifier.classifierWeed.mainClassifier.classWeedID = protocolRequirements.classifier.classifierWeed.mainClassifier.classWeedID;
			protocol[protocolID].sourceProduct.classifier.classifierWeed.mainClassifier.weedNameID = protocolRequirements.classifier.classifierWeed.mainClassifier.weedNameID;
			protocol[protocolID].sourceProduct.classifier.classifierWeed.mainClassifier.descriptionID = protocolRequirements.classifier.classifierWeed.mainClassifier.descriptionID;
		}
		else{
			protocol[protocolID].sourceProduct.classifier.classifierWeed.addClassifier.industry = protocolRequirements.classifier.classifierWeed.addClassifier.industry;
			protocol[protocolID].sourceProduct.classifier.classifierWeed.addClassifier.category = protocolRequirements.classifier.classifierWeed.addClassifier.category;
			protocol[protocolID].sourceProduct.classifier.classifierWeed.addClassifier.classWeed = protocolRequirements.classifier.classifierWeed.addClassifier.classWeed;
			protocol[protocolID].sourceProduct.classifier.classifierWeed.addClassifier.weedName = protocolRequirements.classifier.classifierWeed.addClassifier.weedName;
			protocol[protocolID].sourceProduct.classifier.classifierWeed.addClassifier.description = protocolRequirements.classifier.classifierWeed.addClassifier.description;
		}
	}
	setupClassifierSourceProduct();
	
	//Установка фотографий исходного продукта
	for(var i=0; i < protocolRequirements.images.length; i++)
		protocol[protocolID].sourceProduct.images.push(protocolRequirements.images[i]);
}
function componentsProductRequirementsInProtocol(){
	for(var i=0; i < protocolRequirements.components.length; i++){
		
		if(i != 0)
			addSourceItem();
		
		//Основные параметры компонента
		protocol[protocolID].sourceProduct.components[i].value = protocolRequirements.components[i].value;
		protocol[protocolID].sourceProduct.components[i].value_type = protocolRequirements.components[i].value_type;
		protocol[protocolID].sourceProduct.components[i].flag_1 = protocolRequirements.components[i].flag_1;
		protocol[protocolID].sourceProduct.components[i].flag_2 = protocolRequirements.components[i].flag_2;
		
		itemSourceSetup(protocol[protocolID].sourceProduct.components[i].object_name);
		
		//Основные компоненты классификатора
		protocol[protocolID].sourceProduct.components[i].classifier.classifierType = protocolRequirements.components[i].classifier.classifierType;
		protocol[protocolID].sourceProduct.components[i].classifier.classifierProduct.useADD = protocolRequirements.components[i].classifier.classifierProduct.useADD;
		protocol[protocolID].sourceProduct.components[i].classifier.classifierWeed.useADD = protocolRequirements.components[i].classifier.classifierWeed.useADD;
		
		if(protocol[protocolID].sourceProduct.components[i].classifier.classifierType == 0){
			if(!protocol[protocolID].sourceProduct.components[i].classifier.classifierProduct.useADD){
				protocol[protocolID].sourceProduct.components[i].classifier.classifierProduct.mainClassifier.industryID 
					= protocolRequirements.components[i].classifier.classifierProduct.mainClassifier.industryID;
				protocol[protocolID].sourceProduct.components[i].classifier.classifierProduct.mainClassifier.groupProductID 
					= protocolRequirements.components[i].classifier.classifierProduct.mainClassifier.groupProductID;
				protocol[protocolID].sourceProduct.components[i].classifier.classifierProduct.mainClassifier.productID 
					= protocolRequirements.components[i].classifier.classifierProduct.mainClassifier.productID;
				protocol[protocolID].sourceProduct.components[i].classifier.classifierProduct.mainClassifier.descriptionID 
					= protocolRequirements.components[i].classifier.classifierProduct.mainClassifier.descriptionID;
				protocol[protocolID].sourceProduct.components[i].classifier.classifierProduct.mainClassifier.productTypeID 
					= protocolRequirements.components[i].classifier.classifierProduct.mainClassifier.productTypeID;
				protocol[protocolID].sourceProduct.components[i].classifier.classifierProduct.mainClassifier.productSortID 
					= protocolRequirements.components[i].classifier.classifierProduct.mainClassifier.productSortID;
				protocol[protocolID].sourceProduct.components[i].classifier.classifierProduct.mainClassifier.purposeID 
					= protocolRequirements.components[i].classifier.classifierProduct.mainClassifier.purposeID;
				protocol[protocolID].sourceProduct.components[i].classifier.classifierProduct.mainClassifier.GOST_ID 
					= protocolRequirements.components[i].classifier.classifierProduct.mainClassifier.GOST_ID;
			}
			else{
				protocol[protocolID].sourceProduct.components[i].classifier.classifierProduct.addClassifier.industry 
					= protocolRequirements.components[i].classifier.classifierProduct.addClassifier.industry;
				protocol[protocolID].sourceProduct.components[i].classifier.classifierProduct.addClassifier.groupProduct 
					= protocolRequirements.components[i].classifier.classifierProduct.addClassifier.groupProduct;
				protocol[protocolID].sourceProduct.components[i].classifier.classifierProduct.addClassifier.product 
					= protocolRequirements.components[i].classifier.classifierProduct.addClassifier.product;
				protocol[protocolID].sourceProduct.components[i].classifier.classifierProduct.addClassifier.description 
					= protocolRequirements.components[i].classifier.classifierProduct.addClassifier.description;
				protocol[protocolID].sourceProduct.components[i].classifier.classifierProduct.addClassifier.productType 
					= protocolRequirements.components[i].classifier.classifierProduct.addClassifier.productType;
				protocol[protocolID].sourceProduct.components[i].classifier.classifierProduct.addClassifier.productSort 
					= protocolRequirements.components[i].classifier.classifierProduct.addClassifier.productSort;
				protocol[protocolID].sourceProduct.components[i].classifier.classifierProduct.addClassifier.purpose 
					= protocolRequirements.components[i].classifier.classifierProduct.addClassifier.purpose;
			}
		}
		else{
			if(!protocol[protocolID].sourceProduct.components[i].classifier.classifierWeed.useADD){
				protocol[protocolID].sourceProduct.components[i].classifier.classifierWeed.mainClassifier.industryID 
					= protocolRequirements.components[i].classifier.classifierWeed.mainClassifier.industryID;
				protocol[protocolID].sourceProduct.components[i].classifier.classifierWeed.mainClassifier.categoryID 
					= protocolRequirements.components[i].classifier.classifierWeed.mainClassifier.categoryID;
				protocol[protocolID].sourceProduct.components[i].classifier.classifierWeed.mainClassifier.classWeedID 
					= protocolRequirements.components[i].classifier.classifierWeed.mainClassifier.classWeedID;
				protocol[protocolID].sourceProduct.components[i].classifier.classifierWeed.mainClassifier.weedNameID 
					= protocolRequirements.components[i].classifier.classifierWeed.mainClassifier.weedNameID;
				protocol[protocolID].sourceProduct.components[i].classifier.classifierWeed.mainClassifier.descriptionID 
					= protocolRequirements.components[i].classifier.classifierWeed.mainClassifier.descriptionID;
			}
			else{
				protocol[protocolID].sourceProduct.components[i].classifier.classifierWeed.addClassifier.industry 
					= protocolRequirements.components[i].classifier.classifierWeed.addClassifier.industry;
				protocol[protocolID].sourceProduct.components[i].classifier.classifierWeed.addClassifier.category 
					= protocolRequirements.components[i].classifier.classifierWeed.addClassifier.category;
				protocol[protocolID].sourceProduct.components[i].classifier.classifierWeed.addClassifier.classWeed 
					= protocolRequirements.components[i].classifier.classifierWeed.addClassifier.classWeed;
				protocol[protocolID].sourceProduct.components[i].classifier.classifierWeed.addClassifier.weedName 
					= protocolRequirements.components[i].classifier.classifierWeed.addClassifier.weedName;
				protocol[protocolID].sourceProduct.components[i].classifier.classifierWeed.addClassifier.description 
					= protocolRequirements.components[i].classifier.classifierWeed.addClassifier.description;
			}
		}
		setupClassifierComponents(i+1);
		//Установка фотографий исходного продукта
		for(var k=0; k < protocolRequirements.components[i].images.length; k++)
			protocol[protocolID].sourceProduct.components[i].images.push(protocolRequirements.components[i].images[k]);
		//Установка фотографий исходного продукта (первый компонент)
		if(protocol[protocolID].sourceProduct.components[i].images.length > 0){			
			document.getElementById("item_source_"+Number(i+1)).children[2].children[0].children[0].src 
				= protocol[protocolID].sourceProduct.components[i].images[protocol[protocolID].sourceProduct.components[i].images.length-1];
		}
	}
}
function fractionNameRequirementsInProtocol(){
	protocol[protocolID].sortingName.splice(0,protocol[protocolID].sortingName.length);
	if(!search_load){
		for(var i = 0; i < protocolRequirements.fractions.length; i++){
			var fractionName = protocolRequirements.fractions[i].purpose == 0 ? 
				protocolRequirements.fractions[i].fractionName : protocolRequirements.fractions[i].fractionName + " ("+list_purpose[protocolRequirements.fractions[i].purpose-1].purposeName+")";
			protocol[protocolID].sortingName.push(fractionName);
		}
	}
	else{
		for(var i = 0; i < fractionSearch.length; i++){
			if(protocol[protocolID].id_requirements == fractionSearch[i].id_requirements){
				var fractionName = fractionSearch[i].purpose == 0 ? 
					fractionSearch[i].fractionName : fractionSearch[i].fractionName + " ("+list_purpose[fractionSearch[i].purpose-1].purposeName+")";
				protocol[protocolID].sortingName.push(fractionName);
			}
		}
	}
	//Установка имен фракций для первой сортировки(SortingBlockMin)
	var acceptSelectMin = SortingComponents_1.children[0].children[0].children[0];
	var rejectSelectMin = SortingComponents_1.children[2].children[0].children[0];
	//Удаление лишьних элементов.
	var val = acceptSelectMin.length;
	for(var i = 0; i < val; i++){
		acceptSelectMin.remove(1);
		rejectSelectMin.remove(1);
	}
	
	for(var i = 1; i <= protocol[protocolID].sortingName.length; i++){
		var accept_option = document.createElement('option');
		accept_option.value = i;
		accept_option.innerText = protocol[protocolID].sortingName[i-1];
		acceptSelectMin.add(accept_option);
		
		var reject_option = document.createElement('option');
		reject_option.innerText = protocol[protocolID].sortingName[i-1];
		reject_option.value = i;
		rejectSelectMin.add(reject_option);
	}
	//Установка имен фракций для первой сортировки(SortingBlockMax)
	var acceptSelectMax = sortingFractionsComponents.children[0].children[0].children[0].children[0].children[1];
	var rejectSelectMax = sortingFractionsComponents.children[2].children[0].children[0].children[0].children[1];
	//Удаление лишьних элементов.
	var val = acceptSelectMax.length;
	for(var i = 0; i < val; i++){
		acceptSelectMax.remove(1);
		rejectSelectMax.remove(1);
	}
	
	for(var i = 1; i <= protocol[protocolID].sortingName.length; i++){
		var accept_option = document.createElement('option');
		accept_option.value = i;
		accept_option.innerText = protocol[protocolID].sortingName[i-1];
		acceptSelectMax.add(accept_option);
		
		var reject_option = document.createElement('option');
		reject_option.innerText = protocol[protocolID].sortingName[i-1];
		reject_option.value = i;
		rejectSelectMax.add(reject_option);
	}
}
//Прочие
function returnProtocolSelect(id_components){
	return function e(){
		var componentProtocolElement =  document.getElementById("item_source_"+Number(id_components+1));
		var componentProtocolSelectedValue = componentProtocolElement.children[1].children[0].children[1].children[0];
		var componentProtocolSlider = componentProtocolElement.children[1].children[1].children[0];
			
		chengeTypeOfValue(protocol[protocolID].sourceProduct, protocol[protocolID].sourceProduct.components[id_components], componentProtocolSelectedValue);
		SliderEdit(componentProtocolSelectedValue,componentProtocolSlider);
		itemSourceUpdate(componentProtocolElement.id);
		
		if(protocolComponentsOtherID != id_components+1)
			calculation_main_protocol(id_components+1);
		else
			calculation_other_protocol();
	}
}
function returnProtocolSlider(id_components){
	return function e(){
		var componentProtocolElement =  document.getElementById("item_source_"+Number(id_components+1));
		var componentProtocolSelectedValue = componentProtocolElement.children[1].children[0].children[1].children[0];
		var componentProtocolSlider = componentProtocolElement.children[1].children[1].children[0];
				
		InputEdit(componentProtocolSelectedValue,componentProtocolSlider);;
		itemSourceUpdate(componentProtocolElement.id);
		
		if(protocolComponentsOtherID != id_components+1)
			calculation_main_protocol(id_components+1);
		else
			calculation_other_protocol();
	}
}
function returnAcceptSelect(id_components){
	return function e(){
		var componentAcceptElement =  document.getElementById("item_acceptComp_"+Number(id_components+1));
		var componentAcceptSelectedValue = componentAcceptElement.children[1].children[0].children[1].children[0];
		var componentAcceptSlider = componentAcceptElement.children[1].children[1].children[0];
			
		chengeTypeOfValueSorting(protocol[protocolID].sorting[SortingLable.value], 
			protocol[protocolID].sorting[SortingLable.value].accept_components[id_components], "accept", componentAcceptSelectedValue);
		SliderEdit(componentAcceptSelectedValue,componentAcceptSlider);
		sortingComponentsUpdate(Number(id_components+1));
	}
}
function returnAcceptSlider(id_components){
	return function e(){
		var componentAcceptElement =  document.getElementById("item_acceptComp_"+Number(id_components+1));
		var componentAcceptSelectedValue = componentAcceptElement.children[1].children[0].children[1].children[0];
		var componentAcceptSlider = componentAcceptElement.children[1].children[1].children[0];
				
		InputEdit(componentAcceptSelectedValue,componentAcceptSlider);
		sortingComponentsUpdate(Number(id_components+1));
	}
}
function returnRejectSelect(id_components){
	return function e(){
		var componentRejectElement =  document.getElementById("item_rejectComp_"+Number(id_components+1));
		var componentRejectSelectedValue = componentRejectElement.children[1].children[0].children[1].children[0];
		var componentRejectSlider = componentRejectElement.children[1].children[1].children[0];
			
		chengeTypeOfValueSorting(protocol[protocolID].sorting[SortingLable.value], 
			protocol[protocolID].sorting[SortingLable.value].reject_components[id_components], "reject", componentRejectSelectedValue);
		SliderEdit(componentRejectSelectedValue,componentRejectSlider);
		sortingComponentsUpdate(Number(id_components+1));
	}
}
function returnRejectSlider(id_components){
	return function e(){
		var componentRejectElement =  document.getElementById("item_rejectComp_"+Number(id_components+1));
		var componentRejectSelectedValue = componentRejectElement.children[1].children[0].children[1].children[0];
		var componentRejectSlider = componentRejectElement.children[1].children[1].children[0];
				
		InputEdit(componentRejectSelectedValue,componentRejectSlider);
		sortingComponentsUpdate(Number(id_components+1));
	}
}
/*
function readImage(url, callback) {   
    var request = new
    XMLHttpRequest();   request.onload = function() {
       var file = new FileReader();
       file.onloadend = function() {
          callback(file.result);
       }
       file.readAsDataURL(request.response);   };   
       request.open('GET', url);   
       request.responseType = 'blob';              
       request.send(); 
}
*/
//Выбор аппара и конфигурации
function protocolEquipment(id){
	var check;
	var protocolEquipmentSelect;
	check = id != null ? true : false;
	id = check ? id : protocolID+1;
	protocolEquipmentSelect = check ? document.getElementById("protocol_"+id).children[0].children[1].children[1].children[1].children[0].children[0] 
		: protocolSettings.children[0].children[0].children[1].children[0].children[0];
	
	protocol[id-1].equipment_machine = Number(protocolEquipmentSelect.value);
	setupProtocolConfiguration(id, protocol[protocolID].equipment_machine);
	
	document.getElementById("protocol_"+id).children[0].children[1].children[1].children[1].children[0].children[0].value = protocol[protocolID].equipment_machine;
}
function protocolConfiguration(id){
	var check;
	var protocolConfigurationSelect;
	check = id != null ? true : false;
	id = check ? id : protocolID+1;
	protocolConfigurationSelect = check ? document.getElementById("protocol_"+id).children[0].children[1].children[1].children[1].children[0].children[1] 
		: protocolSettings.children[0].children[0].children[1].children[0].children[1];
		
	protocol[id-1].configuration = Number(protocolConfigurationSelect.value);
	
	document.getElementById("protocol_"+id).children[0].children[1].children[1].children[1].children[0].children[1].value = protocol[protocolID].configuration;
}
//Добавление параметров в основном меню
function addProtocolMainParamets(id_protocol){
	if(search_load){
			var productName = document.getElementById("search_protocol_"+id_protocol).children[0].children[1].children[1].children[0].children[0].children[0];
			var capacityTextContent = document.getElementById("search_protocol_"+id_protocol).children[0].children[1].children[2].children[0].children[0];
			var sourceCapactity = document.getElementById("search_protocol_"+id_protocol).children[0].children[1].children[1].children[0].children[0].children[1];
			var sourcePurity = document.getElementById("search_protocol_"+id_protocol).children[0].children[1].children[1].children[1].children[0].children[2];
			var fractionCapacity = document.getElementById("search_protocol_"+id_protocol).children[0].children[1].children[3].children[0].children[0];
			var fractionPurity = document.getElementById("search_protocol_"+id_protocol).children[0].children[1].children[3].children[1].children[0];
			//Установка весовой категоии
			capacityTextContent.textContent = protocolSearch[id_protocol-1].sorting[0].capacity_type == 0 ? "кг/ч" : "т/ч";
			//Операции относящиеся к исходному продукту
			mainPageProduct(protocolSearch[id_protocol-1].sourceProduct.components, productName);
			setupMainPagePurity(protocolSearch[id_protocol-1].sourceProduct, sourcePurity);
			sourceCapactity.value = Number(protocolSearch[id_protocol-1].sorting[0].capacity_value).toFixed(3);
			//Операции относящиеся к основной фракции(промаркированной фракции)
			var mainFractionID = 1;
			for(var id = 1; id <= fractionSearch.length; id++){
				if(protocolSearch[id_protocol-1].id_requirements == fractionSearch[id-1].id_requirements)
					mainFractionID = fractionSearch[id-1].mainFraction ? Number(fractionSearch[id-1].id_fraction) : mainFractionID;
			}
			for(var i = 0; i < protocolSearch[id_protocol-1].sorting.length; i++){
				if(Number(protocolSearch[id_protocol-1].sorting[i].accept_name_id) == mainFractionID){
					fractionCapacity.value = protocolSearch[id_protocol-1].sorting[0].capacity_type == 0 ? 
						Number(protocolSearch[id_protocol-1].sorting[i].accept_mass).toFixed(3) : Number(protocolSearch[id_protocol-1].sorting[i].accept_mass / 1000).toFixed(3);
					fractionPurity.value = Number(protocolSearch[id_protocol-1].sorting[i].accept_purity).toFixed(3);
				}
				if(Number(protocolSearch[id_protocol-1].sorting[i].reject_name_id) == mainFractionID){
					fractionCapacity.value = protocolSearch[id_protocol-1].sorting[0].capacity_type == 0 ? 
						Number(protocolSearch[id_protocol-1].sorting[i].reject_mass).toFixed(3) : Number(protocolSearch[id_protocol-1].sorting[i].reject_mass / 1000).toFixed(3);
					fractionPurity.value = Number(protocolSearch[id_protocol-1].sorting[i].reject_purity).toFixed(3);
				}
			}
			updateProtocolName("search_protocol_"+id_protocol);
		}
	if(!search_load){
		var productName = document.getElementById("protocol_"+id_protocol).children[0].children[1].children[1].children[0].children[0].children[0];
		var capacityTextContent = document.getElementById("protocol_"+id_protocol).children[0].children[1].children[2].children[0].children[0];
		var sourceCapactity = document.getElementById("protocol_"+id_protocol).children[0].children[1].children[1].children[0].children[0].children[1];
		var sourcePurity = document.getElementById("protocol_"+id_protocol).children[0].children[1].children[1].children[1].children[0].children[2];
		var fractionCapacity = document.getElementById("protocol_"+id_protocol).children[0].children[1].children[3].children[0].children[0];
		var fractionPurity = document.getElementById("protocol_"+id_protocol).children[0].children[1].children[3].children[1].children[0];
		//Установка весовой категоии
		capacityTextContent.textContent = protocol[id_protocol-1].sorting[0].capacity_type == 0 ? "кг/ч" : "т/ч";
		//Операции относящиеся к исходному продукту
		mainPageProduct(protocol[id_protocol-1].sourceProduct.components, productName);
		setupMainPagePurity(protocol[id_protocol-1].sourceProduct, sourcePurity);
		sourceCapactity.value = Number(protocol[id_protocol-1].sorting[0].capacity_value).toFixed(3);
		//Операции относящиеся к основной фракции(промаркированной фракции)
		var mainFractionID = 1;
		for(var id = 1; id <= protocolRequirements.fractions.length; id++){
			mainFractionID = protocolRequirements.fractions[id-1].mainFraction ? id : mainFractionID;
		}
		for(var i = 0; i < protocol[id_protocol-1].sorting.length; i++){
			if(Number(protocol[id_protocol-1].sorting[i].accept_name_id) == mainFractionID){
				fractionCapacity.value = protocol[id_protocol-1].sorting[0].capacity_type == 0 ? 
					Number(protocol[id_protocol-1].sorting[i].accept_mass).toFixed(3) : Number(protocol[id_protocol-1].sorting[i].accept_mass / 1000).toFixed(3);
				fractionPurity.value = Number(protocol[id_protocol-1].sorting[i].accept_purity).toFixed(3);
			}
			if(Number(protocol[id_protocol-1].sorting[i].reject_name_id) == mainFractionID){
				fractionCapacity.value = protocol[id_protocol-1].sorting[0].capacity_type == 0 ? 
					Number(protocol[id_protocol-1].sorting[i].reject_mass).toFixed(3) : Number(protocol[id_protocol-1].sorting[i].reject_mass / 1000).toFixed(3);
				fractionPurity.value = Number(protocol[id_protocol-1].sorting[i].reject_purity).toFixed(3);
			} 
		}
		updateProtocolName("protocol_"+id_protocol);
	}	
}
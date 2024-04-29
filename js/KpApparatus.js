//Массивы подгружаемых данных
var Main = []
var Model = []
var Configuration = []
var KompressorType = []
var Kompressor = []
var Price = []
var Product_K = []
var Elevator = []
var Conditions = []

var Aspiration = []
var Bunker = []
var Complect = []

var LiftType = []
var ImportType = []

var __bitrixSYS;

//Подготовленные данные для передачи в битрикс
var ApparatModelList = [];
var ElevatirModelList = [];

//Типовые подгруженные данные из битрикса
var BitrixPreloadData = {
	"tears_of_payment": []
}

var Translate = {
	'Total':[],
	'FirstPage':[],
	'SpecifMenu':[],
	'Specification':[],
	'Delivery':[],
	'SmartSort':[],
	'Lift':[],
	'Compressor':[],
	'CompressorP':[],
	'Elevators':[]
}
//Элемент для элементов КП
var ComercialOfferElements = []
var ecc = "0";

language = 'RU';
languageP = 'RU';

var InfoDeal = {
	"id_deal": "id_deal",
	"id_contact": "id_contact",
	"id_commercial_offer": "id_commercial_offer"
}
var ModelCSZE = {
	"id_model": "id_model",
	"modelName": "modelName",
	"material": "material",
	"motor_reductor": "motor_reductor",
	"metalThickness": "2x15",
	"outletSize": "outletSize",
	"capacity_param": {
		"capacity": 0,
		"speed": 0,
		"turn": 0,
		"step": 0,
		"bucket": 0,
		"bucket_load": 0
	},
	"modelSize":{
		"height": 0,
		"top_length": 0,
		"bottom_length": 0,
	},
	"sectionElement":{
		"heightSection": "heightSection",
		"topSection": "topSection",
		"bottomSection": "bottomSection"
	},
	"onloadElement":{
		"load":{"len_size": 0, "count": 0, "un_price": 0},
		"unload":{"len_size": 0, "count": 0, "un_price": 0, "type": 'electrical'},
		"load_x": 0,
		"unload_x": 0,
		"unload_y": 0,
	},
	"otherComponents":{
		"chain": {"name": "name", "count": "count", "un_price": "un_price"},
		"bucket": {"name": "name", "count": "count", "un_price": "un_price"},
		"converter": {"name": "name", "count": "count", "un_price": "un_price", "kW": "kW", "enable": true},
		"reductor": {"name": "name", "count": "count", "un_price": "un_price", "kW": "kW"},
		"motor": {"name": "name", "count": "count", "un_price": "un_price", "kW": "kW"},
		"sensorPodpor": {"name": "name", "count": "count", "un_price": "un_price", "enable": true},
		"sensorChain": {"name": "name", "count": "count", "un_price": "un_price", "enable": true},
		"controlBox": {"name": "name", "count": "count", "un_price": "un_price", "enable": true},
		"backward": {"name": "name", "count": "count", "un_price": "un_price", "enable": true, "enable_force": true},
		"streetFulfillment":{"name": "name", "count": "count", "un_price": "un_price", "enable": false}
	},
	"modelDeliveryData":{
		"modelMass": "modelMass",
		"modelVolume": "modelVolume"
	},
	"basePrice": 0,
	"sectionPrice": {
		"heightSectionPrice": 0,
		"topSectionPrice": 0,
		"bottomSectionPrice": 0,
		"sum": 0
	},
	"onloadPrice": 0,
	"otherPrice": 0,
	"modelPrice": 0,
	"NDS": 1.2
	}
var ModelCSE = {
	"id_model": "id_model",
	"modelName": "modelName",
	"material": "material",
	"motor_reductor": "motor_reductor",
	"bucketMaterial": "bucketPlastic",
	"carefulTransport": false, 
	"capacity_param": {
		"capacity": 0,
		"speed": 0,
		"turn": 0,
		"step": 0,
		"bucket": 0,
		"bucket_load": 0
	},
	"metalThickness": {
		"headT": 0,
		"bottomT": 0,
		"tubeT": 0
	},
	"modelSize":{
		"height": 0,
		"load": 0
	},
	"sectionElement":{
		"heightSection": "heightSection",
	},
	"otherComponents":{
		"belt": {"name": "name", "count": "count", "un_price": "un_price"},
		"bucket": {"name": "name", "count": "count", "un_price": "un_price"},
		"converter": {"name": "name", "count": "count", "un_price": "un_price", "kW": "kW", "enable": true},
		"reductor": {"name": "name", "count": "count", "un_price": "un_price", "kW": "kW"},
		"motor": {"name": "name", "count": "count", "un_price": "un_price", "kW": "kW"},
		"sensorSpeed": {"name": "name", "count": "count", "un_price": "un_price", "enable": true},
		"sensorPodporTop": {"name": "name", "count": "count", "un_price": "un_price", "enable": true},
		"sensorPodporBottom": {"name": "name", "count": "count", "un_price": "un_price", "enable": true},
		"sensorBelt": {"name": "name", "count": "count", "un_price": "un_price", "enable": true},
		"controlBox": {"name": "name", "count": "count", "un_price": "un_price", "enable": true},
		"backward": {"name": "name", "count": "count", "un_price": "un_price", "enable": true, "enable_force": true},
		"streetFulfillment":{"name": "name", "count": "count", "un_price": "un_price", "enable": false},
		"drillInBelt":{"name": "name", "count": "count", "un_price": "un_price", "enable": false}
	},
	"modelDeliveryData":{
		"modelMass": "modelMass",
		"modelVolume": "modelVolume"
	},
	"basePrice": 0,
	"sectionPrice": {
		"heightSectionPrice": 0,
	},
	"otherPrice": 0,
	"modelPrice": 0,
	"NDS": 1.2
}
var ModelCSCC = {
	"id_model": "id_model",
	"modelName": "modelName",
	"material": "material",
	"motor_reductor": "motor_reductor",
	"capacity_param": {
		"capacity": 0,
		"speed": 0,
		"turn": 0,
		"step": 0,
		"bucket": 0,
		"bucket_load": 0
	},
	"metalThickness": {
		"bodyT": 0,
		"capT": 0,
		"liningT": 0
	},
	"modelSize":{
		"TransportLength": 0,
		"unloadCenter": 0,
		"loadCenter": 0,
		"unload": 0,
		"load": 0
	},
	"sectionElement":{
		"lengthSection": [],
		"leteralSection": [],
		"verticalSection": [],
		"doubleSideLateral": false
	},
	"otherComponents":{
		"belt": {"name": "name", "count": "count", "un_price": "un_price"},
		"lining": {"name": "name", "count": "count", "un_price": "un_price"},
		"bucket": {"name": "name", "count": "count", "un_price": "un_price"},
		"converter": {"name": "name", "count": "count", "un_price": "un_price", "kW": "kW", "enable": false},
		"reductor": {"name": "name", "count": "count", "un_price": "un_price", "kW": "kW"},
		"motor": {"name": "name", "count": "count", "un_price": "un_price", "kW": "kW"},
		"sensorSpeed": {"name": "name", "count": "count", "un_price": "un_price", "enable": true},
		"sensorPodpor": {"name": "name", "count": "count", "un_price": "un_price", "enable": true},
		"controlBox": {"name": "name", "count": "count", "un_price": "un_price", "enable": true},
		"streetFulfillment":{"name": "name", "count": "count", "un_price": "un_price", "enable": false}
	},
	"modelDeliveryData":{
		"modelMass": "modelMass",
		"modelVolume": "modelVolume"
	},
	"basePrice": 0,
	"sectionPrice":{
		"lengthSectionPrice": 0,
		"leteralSectionPrice": 0,
		"verticalSectionPrice": 0
	},
	"otherPrice": 0,
	"modelPrice": 0,
	"NDS": 1.2
}
//Данны протокола сортировки
var requirements = {
	id_requirements: "id_requirements",
	exit: "100.000",
	purity: "purity",
	capacity: "capacity",
	components: [],
	fractions: []
}
var protocol = {
	id_protocol: "id_protocol",
	id_requirements: "id_requirements",
	id_creater: "id_enginere",
	id_responsible: "id_enginere",
	company_name: "company_name",
	create_date: "create_date",
	//Внешние параметры протокола
	equipment_machine: "equipment_machine",
	configuration: "configuration",
	sorting: [],
	sourceProduct: {
		exit: "100.000",
		purity: "purity",
		capacity: "capacity",
		image: "image",
		components : []
	}
} 
var ENParam = {
	title: 'MAIN TECHNICAL<br>CHARACTERISTICS',
	importParamText: 'MAIN CHARACTERISTICS:',
	Capacity: 'Capacity (t/h)',
	Accuracy: 'Accuracy, (%)',
	Voltage: 'Voltage / Frequency, (V/Hz)',
	Power: 'Power, (KW)',
	Weight:'Weight, (KG)',

	editDate:'The offer is valid until',

	FirstPage:{
		csortDescription:'OPTICAL SORTERS,<br>COMPLETE SORTING SOLLUTIONS, <br>ELEVATORS, SERVICE',
		commercialOfferTitle:'COMMERCIAL<br>OFFER',
		managerInfoBlock:{
			vacancy:'Administrator',
			csort:'CSort LLC'
		},
		clientName:'Dear Customer',
		introduction:'We appreciate your interest to the equipment produced by CSort LLC. Especially for You well prepared commercial offer contains equipment characteristics, services, delivery and payment terms details. Feel free to contact us in case You need additional information. We will be glad to help You.',
	},
	
	SmartSort:{
		title:{
			main:'MAIN TECHNICAL<br>CHARACTERISTICS',
			ModelSeria:'SmartSort B'
		},
		description_ModelTray:'The flagship single-tray color sorter, upgradeable to 3 trays. 2 color cameras per tray with a resolution of 5400 px: one in the front, one in the back.',
		size:' mm',
		param:{
			paramTitle:'MAIN CHARACTERISTICS:',
			Channel:'Number of channels',
			Capaсity:'Production capacity (for wheat), tons per hour*',
			Cleaning_factor:'Cleanliness coefficient, %, min.*',
			CCD:'CCD-matrix resolution (per chute), pixel',
			Voltage:'"Power supply voltage, V"',
			Hz:'Power line frequency, Hz',
			kW:'Nominal power, kW',
			Air_MPa:'Air pressure, MPa from 0.6 to 0.8',
			air_class:{
				air_title:'Air purity according to	GOST 17433, ISO 8573-1:',
				air_hard:'Рarticles',
				air_wet:'Humidity',
				air_oil:'Oil'
			},
			air_flow:'Air consumption for the technical process (wheat),m³/h, max.*',
			Air_flowMax:'"Maximum air consumpt at 0.6 MPa), m3/h"',
			modelBlock11:{
				description:'Air consumption for the aspiration, m³/h, max.:',
				aspiration:{
					standart:'Standard aspiration',
					additional:'With additional	aspiration nozzles on chutes'
				}
			},
			Weight:'Weight, kg, max.',
			defence_class:'Electric shock protection class according to GOST IEC 61140-2012',
			defence_lvl:'Degree of protection	provided by enclosures according to GOST 14254',
			temp:'Ambient temperature, °С from 5 to 40',
			wet:'Relative air humidity at the	temperature of 25 °С, % from 20 to 80',
			DBA:'Noise level at the work site, dBA, max.'			
		},
		exeption:'* With the initial content of foreign materials of 2% or less and the volume weight of the product of 0.750 t/m3'
	},

	Specification:{
		Specification:'SPECIFICATION',
		Item:'Item',
		pcs:'pcs.',
		Price:'Price, RUB',
		Sum:'Sum, RUB',
		Discount:'Discount, RUB',
		DiscountAlt:'Discount, %',
		Discounted:'Discounted price, RUB',
		incl:'incl. VAT, RUB',
		Total:'Total:',
	},
	Delivery:{
		DeliveryTerms: 'DELIVERY TERMS',
		delivery_name: 'Delivery time',
		delivery: 'within 30 working days in case funds are trunsfered to the current account',
		payment_name: 'Payment terms',
		payment: '100% advance payment',
		commissioning_name: 'commissioning',
		commissioning: 'Assembling and commissioning works are performed by the Buyer on its own and at its own expense. The equipment must be adjusted by the Buyer locally according to the work instruction attached to the machine. The Seller must assist the Buyer’s adjusting works wireless with giving technical consultations under the condition that the equipment has the internet access. The primary wireless commissioning (within two working days) for adjusting works assisting with no more than 4 sorting products is not paid. ',
		priceInclude_name: 'price Include:',
		priceInclude: 'Price for equipment; wireless distant adjusting; Service by guarantee ',
		warranty_name: 'Garranty',
		warranty: '12 or 24 months depending on the supplied equipment type'
	}
}
var RUParam = {
	title: 'ОСНОВНЫЕ ТЕХНИЧЕСКИЕ<br>ХАРАКТЕРИСТИКИ',
	importParamText: 'Основные характеристики:',
	Capacity: 'Производительность (т/ч)',
	Accuracy: 'Коэффициент очистки, %',
	Voltage: 'Напряжение питания, В',
	Power: 'Номинальная потребляемая мощность, кВт',
	Weight:'Масса, кг, не более',
	editDate:'Предложение действительно до',

	FirstPage:{
		csortDescription:'ОПТИЧЕСКИЕ СОРТИРОВЩИКИ,<br>СОРТИРОВОЧНЫЕ КОМПЛЕКСЫ,<br>ТРАНСПОРТИРОВОЧНОЕ<br>ОБОРУДОВАНИЕ, СЕРВИС',
		commercialOfferTitle:'КОММЕРЧЕСКОЕ<br>ПРЕДЛОЖЕНИЕ',
		managerInfoBlock:{
			vacancy:'Руководитель ОП г. Барнаул',
			csort:'ООО «СиСорт»'
		},
		clientName:'Уважаемый Клиент',
		introduction:'Благодарим Вас за интерес проявленный к оборудованию компании CSort. Представляем специально для Вас подготовленное предложение на оборудование и услуги, а также условия доставки и оплаты. Пожалуйста, если Вам необходима дополнительная информация, обязательно свяжитесь с нами, будем рады Вам помочь.',
	},
	SmartSort:{
		title:{
			main:'ОСНОВНЫЕ ТЕХНИЧЕСКИЕ<br>ХАРАКТЕРИСТИКИ',
			ModelSeria:'Фотосепаратор СмартСорт'
		},
		description_ModelTray:'Флагманский фотосепаратор в однолотковом исполнени с возможностью модернизации до 3-х лотков. 2 цветные камеры на лоток с разрешением 5400 px: одна спереди, одна сзади.',
		size:' мм',
		param:{
			paramTitle:'Основные характеристики:',
			Channel:'Количество каналов, шт.',
			Capaсity:'Прозводительность(пшеница), т/ч, не менее*',
			Cleaning_factor:'Коэффициент очистки, %, не менее*',
			CCD:'Разрешение CCD-матрицы(на лоток), пиксель',
			Voltage:'Напряжение питания, В',
			Hz:'Частота питающей сети, Гц',
			kW:'Номинальная потребляемая мощность, кВт',
			Air_MPa:'Давление воздуха, МПа',
			air_class:{
				air_title:'Класс чистоты воздуха по ГОСТ 17433, ISO 8573-1:',
				air_hard:'По твердым частицам',
				air_wet:'По влажности',
				air_oil:'По содержанию масел'
			},
			air_flow:'Расход воздуха на технологический процесс (пшеница), м³/час, не более*',
			Air_flowMax:'Максимальный расход воздуха(при давлении 0,6 МПа), м³/ч',
			modelBlock11:{
				description:'Расход воздуха на аспирацию, м³/ч, не более:',
				aspiration:{
					standart:'Стандартная аспирация',
					additional:'С дополнительными аспирационными патрубками на спускных лотках'
				}
			},
			Weight:'Масса, кг, не более',
			defence_class:'Класс защиты от поражения электрическим током по ГОСТ IEC 61140-2012',
			defence_lvl:'Степень защиты оболочки по ГОСТ 14254',
			temp:'Температура окружающей среды, °С',
			wet:'Относительная влажность воздуха при температуре 25 °С, %',
			DBA:'Уровень звука на рабочем месте, дБА, не более'			
		},
		exeption:'* При исходной засоренности не более 2%, объемной массе продукта 0,750 т/м³.'
	},
	Specification:{
		Specification:'СПЕЦИФИКАЦИЯ',
		Item:'Наименование',
		pcs:'Шт.',
		Price:'Цена, руб',
		Sum:'Сумма, руб',
		Discount:'Скидка,руб',
		DiscountAlt:'Скидка,%',
		Discounted:'Цена со</br>скидкой, руб',
		incl:'В т.ч. НДС, руб',
		Total:'Итого:',
	},	
	Delivery:{
		DeliveryTerms: 'УСЛОВИЯ ПОСТАВКИ',
		delivery_name: 'Срок поставки',
		delivery: 'В течение 30 календарных дней при условии поступления суммы на расчетный счет.',
		payment_name: 'Оплата',
		payment: 'Оплата осуществляется по схеме 100% предоплата. Покупатель перечисляет на расчетный счет Поставщика в срок не позднее 5 (пяти) рабочих дней после подписания Договора.',
		commissioning_name: 'Ввод в эксплуатацию',
		commissioning: 'Ввод в эксплуатацию осуществляется в течение 7 рабочих дней с момента получения заявки и подтверждения готовности оборудования к запуску.',
		priceInclude_name: 'В цену включены:',
		priceInclude: 'Стоимость оборудования; Расходы по доставке оборудования; Работы по вводу в эксплуатацию оборудования; Гарантийное обслуживание оборудования.',
		warranty_name: 'Гарантия',
		warranty: 'Срок гарантии на поставляемое оборудование исчисляется с момента подписания сторонами Акта ввода оборудования в эксплуатацию и составляет: 24 месяца - для фотосепаратора 12 месяцев - транспортировочное оборудование.'
	}
}
var AllMass = {
	'Main' : [],
	'Model' : [],
	'Configuration' : [],
	'KompressorType' : [],
	'Kompressor' : [],
	'Price' : [],
	'Product_K': [],
	'Elevator': [],
	'Conditions' : [],

	'Aspiration' : [],
	'Bunker' :[],
	'Complect': [],

	'LiftType': [],
	'ImportType': [],
	'ENParam':0,
	'RUParam':0
}

//Функция сна для асинхронных функций
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

//ЗАГРУЗКА СТРАНИЦЫ
function load_apparatus_data(){
	var queryString = location.search;
	
	var checkNewVersion = queryString.search("d_") != -1 || queryString.search("s_") != -1 ? true : false;
	
	if(queryString && !checkNewVersion){
		//запонение информации о сделки
		var paramsString = location.search.substr(1);
		var id_contact = paramsString.split("&")[0].split("=")[1].split("_")[0] == "user" ? paramsString.split("&")[0].split("=")[1].split("_")[1]  : paramsString.split("&")[0].split("=")[1].split("_")[0] ;
		var id_deal = paramsString.split("&")[1];
		var id_commercial_offer = paramsString.split("&")[2];
		
		InfoDeal.id_deal = id_deal;
		InfoDeal.id_contact = id_contact;
		InfoDeal.id_commercial_offer = id_commercial_offer.split("=")[1];
		coNumber.textContent = "№ " + InfoDeal.id_deal + "." + InfoDeal.id_commercial_offer;
		
		__bitrixSYS = "old";
	}
	else if(queryString.search("d_") != -1){
		var paramsString = location.search.substr(1);
		var id_contact = paramsString.split("&")[0].split("=")[1].split("_")[1];
		var id_deal = paramsString.split("&")[1].substr(2);
		var id_commercial_offer = paramsString.split("&")[2];
		
		InfoDeal.id_deal = id_deal;
		InfoDeal.id_contact = id_contact;
		InfoDeal.id_commercial_offer = id_commercial_offer.split("=")[1];
		coNumber.textContent = "№ " + InfoDeal.id_deal + "." + InfoDeal.id_commercial_offer;
		
		__bitrixSYS = "manager";
		
		NewCommercialOfferInfo(InfoDeal.id_deal);
	}
	else if(queryString.search("s_") != -1){
		var paramsString = location.search.substr(1);
		var id_contact = paramsString.split("&")[0].split("=")[1].split("_")[0];
		var id_deal = paramsString.split("&")[1].substr(2);
		var id_commercial_offer = paramsString.split("&")[2];
		
		InfoDeal.id_deal = id_deal;
		InfoDeal.id_contact = id_contact;
		InfoDeal.id_commercial_offer = id_commercial_offer.split("=")[1];
		coNumber.textContent = "№ " + InfoDeal.id_deal + "." + InfoDeal.id_commercial_offer;
		
		__bitrixSYS = "dealer";
		
		NewDealerCommercialOfferInfo(InfoDeal.id_deal);
	}
	
	read_manager();
	get_dealer_list();
	preloadComercialOfferInfo();
	
	coDate.textContent = datestring;
	
	get_translate_Total();
	// get_separation_model();	
	// get_separator_machine();
	// get_separator_configuration();
	// get_separation_KompressorType();
	// get_aspiration();
	
	createPriceRow();
	get_product_K();
	get_crd_daily_ru();
	pageHidden();
	setupEndDate();
	
	if(queryString && !checkNewVersion){
		//get_commercial_elements();
	}
}

//превю картинок
function spoilerRun(imgSpoiler){
	spoilerImg.src = imgSpoiler;
	overlay.style.display = "flex";
	var spoiler = overlay.children[0];
	var height = screen.height
	var width = screen.width
	if (height <= width)
		var resolution = height/width;
	else
		var resolution = 1;

	spoiler.style.width = 900 * resolution;
	spoiler.style.height = 900 * resolution;		
}
function spoilerClose(){
	overlay.style.display = "none";	
}
//превю меню и его работа
function Calculator(){
	CalcWindow.style.display = "flex";
	changeMachineType();
	selectorParam();
	selectorKompressor();
	selectorCuber();
	selectorImport();
	selectorComp();
}
function CalculatorClose(){
	CalcWindow.style.display = "none";
	createSinglePriceRow();		
}
function CalculatorCloseButton(){
	CalcWindow.style.display = "none";	
}
function selectorParam(){
	var elevator = document.getElementById("calcElevator")
	var lotok = document.getElementById("calcLotok")
	var configuration = document.getElementById("calcConf")
	var targetModel = Model[elevator.value].Model;
	for(var i = lotok.length - 1; i >= 0; i--){
		lotok.remove(i);
	}
	for(var i = configuration.length - 1; i >= 0; i--){
		configuration.remove(i);
	}
	for ( var i = 0; i < Main.length; i++){
		if(targetModel == Main[i].Model){
			var option =  document.createElement("option");
			option.value =  Main[i].modelNumber;
			option.text =  Main[i].modelNumber;
			lotok.add(option);
		}
	}
	for ( var i = 0; i < Configuration.length; i++){
		if (targetModel == Configuration[i].Model){
			var option =  document.createElement("option");
			option.value =  Configuration[i].configuration;
			option.text =  Configuration[i].configuration;
			configuration.add(option);
		}
	}
}
function selectorKompressor(){
	//отчистка списка моделей Компрессоров
	for(var i = genesisSelector.children[1].children[0].length - 1; i >= 0; i--){
		genesisSelector.children[1].children[0].remove(i);
	}
	//Составление списка моделей Компрессоров
	for(var i = 0; i < KompressorType.length; i++){
		if(genesisProvider.value == KompressorType[i].compressor){
			var option =  document.createElement("option");
			option.value =  KompressorType[i].seria;
			option.text =  KompressorType[i].seria;
			genesisSelector.children[1].children[0].add(option);
		}
	}
	selectorKompressorModel();
}
function selectorKompressorModel(){
	//отчистка списка мощьности Компрессоров
	for(var i = genesisSelector.children[2].children[0].length - 1; i >= 0; i--){
		genesisSelector.children[2].children[0].remove(i);
	}
	//Составление списка мощьности Компрессоров
	for(var i = 0; i < Kompressor.length; i++){
		if(genesisProvider.value == Kompressor[i].compressorManufacturer && genesisSelector.children[1].children[0].value == Kompressor[i].compressorModel){
			var option =  document.createElement("option");
			option.value =  Kompressor[i].compressorEnginePower;
			option.text =  Kompressor[i].compressorEnginePower;
			genesisSelector.children[2].children[0].add(option);
		}
	}
}
function selectorCuber(){
	//отчистка списка моделей Компрессоров
	for(var i = cuber.children[0].children[0].length - 1; i >= 0; i--){
		cuber.children[0].children[0].remove(i);
	}
	//Составление списка моделей Компрессоров
	for(var i = 0; i < LiftType.length; i++){
		var option =  document.createElement("option");
		option.value =  LiftType[i].size;
		option.text =  LiftType[i].size;
		cuber.children[0].children[0].add(option);
		
	}
}
function selectorImport(){
	//отчистка списка моделей Компрессоров
	for(var i = Import.children[0].children[0].length - 1; i >= 0; i--){
		Import.children[0].children[0].remove(i);
	}
	//Составление списка моделей Компрессоров
	for(var i = 0; i < ImportType.length; i++){
		var option =  document.createElement("option");
		option.value =  ImportType[i].Model;
		option.text =  ImportType[i].Model;
		Import.children[0].children[0].add(option);
		
	}
}

function selectorComp(){
	for(var i = ComplectationSelector.children[0].children[0].length - 1; i >= 0; i--){
		ComplectationSelector.children[0].children[0].remove(i);
	}
	//Составление списка моделей Компрессоров
	for(var i = 0; i < Complect.length; i++){
		var option =  document.createElement("option");
		option.value =  Complect[i][language];
		option.text =  Complect[i][language];
		ComplectationSelector.children[0].children[0].add(option);
		
	}
}
//настройка селекторов меню 
function changeMachineType(){
	var main = language == 'RU' ? mainSelector : mainSelectorEN;
	var Apparat = document.getElementById("ApparatSelector");	  
	var genesis = document.getElementById("genesisSelector");	  
	var elevator = document.getElementById("elevatorSelector");	  
	var protocol = document.getElementById("protocolSelector");	  
	var aspiration = document.getElementById("AspirationSelector");
	var bunker = document.getElementById("BunkerSelector");
	var complectation = document.getElementById("ComplectationSelector");
	var svoy = document.getElementById("svoyWarriant");	 
	var cuber = document.getElementById("cuber");
	var Import = document.getElementById("Import");
	switch(main.value){
		case "0":
			svoy.style.display = "none"
			Apparat.style.display = "flex";
			elevator.style.display = "none";					
			genesis.style.display = "none";					
			protocol.style.display = "none";					
			aspiration.style.display = "none";
			bunker.style.display = "none";
			complectation.style.display = "none";
			Import.style.display = "none";
			cuber.style.display = "none";
			break;
		case "1":
			svoy.style.display = "none"
			Apparat.style.display = "none";			
			genesis.style.display = "flex";
			protocol.style.display = "none";					
			elevator.style.display = "none";
			aspiration.style.display = "none";
			bunker.style.display = "none";
			complectation.style.display = "none";
			Import.style.display = "none";
			cuber.style.display = "none";
			break;
		case "2":
			Apparat.style.display = "none";		
			genesis.style.display = "none";
			protocol.style.display = "flex";					
			elevator.style.display = "none";
			aspiration.style.display = "none";
			bunker.style.display = "none";
			complectation.style.display = "none";
			Import.style.display = "none";
			cuber.style.display = "none";
			break;
		case "3":
			svoy.style.display = "none"
			Apparat.style.display = "none";		
			genesis.style.display = "none";	
			elevator.style.display = "flex";
			protocol.style.display = "none";
			aspiration.style.display = "none";
			bunker.style.display = "none";
			complectation.style.display = "none";
			Import.style.display = "none";
			cuber.style.display = "none";
			break;
		case "4":
			svoy.style.display = "none"
			Apparat.style.display = "none";		
			elevator.style.display = "none";					
			genesis.style.display = "none";					
			protocol.style.display = "none";
			aspiration.style.display = "none";
			bunker.style.display = "flex";
			complectation.style.display = "none";
			cuber.style.display = "none";
			break;
		case "5":
			svoy.style.display = "none"
			Apparat.style.display = "none";		
			elevator.style.display = "none";					
			genesis.style.display = "none";					
			protocol.style.display = "none";
			aspiration.style.display = "flex";
			bunker.style.display = "none";
			complectation.style.display = "none";
			Import.style.display = "none";
			cuber.style.display = "none";
			break;
		case "6":
			svoy.style.display = "none";
			Apparat.style.display = "none";		
			elevator.style.display = "none";					
			genesis.style.display = "none";					
			protocol.style.display = "none";
			aspiration.style.display = "none";
			bunker.style.display = "none";
			complectation.style.display = "flex";
			cuber.style.display = "none";
			Import.style.display = "none";
			break;
		case "7":
			svoy.style.display = "flex";
			Apparat.style.display = "none";		
			elevator.style.display = "none";					
			genesis.style.display = "none";					
			protocol.style.display = "none";
			aspiration.style.display = "none";
			bunker.style.display = "none";
			complectation.style.display = "none";
			cuber.style.display = "none";
			Import.style.display = "none";
			break;
		case "8":
			svoy.style.display = "none";
			Apparat.style.display = "none";		
			elevator.style.display = "none";					
			genesis.style.display = "none";					
			protocol.style.display = "none";
			aspiration.style.display = "none";
			bunker.style.display = "none";
			complectation.style.display = "none";
			cuber.style.display = "flex";
			Import.style.display = "none";
			break;
		case "9":
			svoy.style.display = "none";
			Apparat.style.display = "none";		
			elevator.style.display = "none";					
			genesis.style.display = "none";					
			protocol.style.display = "none";
			aspiration.style.display = "none";
			bunker.style.display = "none";
			complectation.style.display = "none";
			cuber.style.display = "none";
			Import.style.display = "flex";
			break;
		case "10":
			svoy.style.display = "flex";
			Apparat.style.display = "none";		
			elevator.style.display = "none";					
			genesis.style.display = "none";					
			protocol.style.display = "none";
			aspiration.style.display = "none";
			bunker.style.display = "none";
			complectation.style.display = "none";
			cuber.style.display = "none";
			Import.style.display = "none";
			break;
		case "11":
			svoy.style.display = "flex";
			Apparat.style.display = "none";		
			elevator.style.display = "none";					
			genesis.style.display = "none";					
			protocol.style.display = "none";
			aspiration.style.display = "none";
			bunker.style.display = "none";
			complectation.style.display = "none";
			cuber.style.display = "none";
			Import.style.display = "none";
			break;
	}	
 }
 function changeAspType(){
	var aspirationType = language == 'RU' ? AspirationSelectorType : AspirationSelectorTypeEN;
	var Photoseparation = document.getElementById("AspirationSelectorPhotoseparation");
	var Lotok = document.getElementById("AspirationSelectorLotok");
	switch(language){
		case "RU":
			switch(aspirationType.value){
				case "Для фотосепаратора":
					Photoseparation.style.display = "flex";
					Lotok.style.display = "none";
					break;
				case "Для лотка":
					Photoseparation.style.display = "none";			
					Lotok.style.display = "flex";
					break;
			}
			break;
		case "EN":
			switch(aspirationType.value){
				case "For P/S":
					Photoseparation.style.display = "flex";
					Lotok.style.display = "none";
					break;
				case "For tray":
					Photoseparation.style.display = "none";			
					Lotok.style.display = "flex";
					break;
			}
			break;
	}
 }
 function changeBunkerType(){
	var BunkerType = language == 'RU' ? BunkerSelectorType : BunkerSelectorTypeEN;
	var Shod = document.getElementById("BunkerSelectorShod");
	var Lotok = document.getElementById("BunkerLotok");
	switch(language){
		case "RU":
			switch(BunkerType.value){
				case "Сходы":
					Shod.style.display = "flex";
					Lotok.style.display = "none";
					break;
				case "Лотки":
					Shod.style.display = "none";			
					Lotok.style.display = "flex";
					break;
			}
			break;
		case "EN":
			switch(BunkerType.value){
				case "Kits":
					Shod.style.display = "flex";
					Lotok.style.display = "none";
					break;
				case "Trays":
					Shod.style.display = "none";			
					Lotok.style.display = "flex";
					break;
			}
			break;
	}
 }
 function CalcWindowSelectorLoad(){
	//Заполнение селектора аппаратов
	for(var i = 0; i < Model.length; i++){
		var option =  document.createElement("option");
		if(i == 0){
			option.text = language == 'RU' ? "СмартСорт": "SmartSort";
		}			
		else if(i == 5){
			option.text = language == 'RU' ? "МиниСорт" : "MiniSort";			
		}
			
		else{
			option.text = Model[i].Model;
		}
		
		option.value = i;
		calcElevator.add(option);
		
		if(i == 1 || i == 2 || i == 3 || i == 4){
			option.style.display = "none";
		}
	}
	//Заполнение селектора компрессоров
	var model_list = [null];
	for(var i = 0; i < KompressorType.length; i++){
		if(KompressorType[i].compressor != model_list[model_list.length-1]){
			var option =  document.createElement("option");
			option.text = KompressorType[i].compressor;
			option.value = KompressorType[i].compressor;;
			genesisProvider.add(option);
			model_list.push(KompressorType[i].compressor);
		}
	}	
 }
//НАСТРОЙКА СТРАНИЦ АППАРАТА
	//смена модели
function ChangeElevatorType(){
	var elevatorTypeSelect = document.getElementById("elevatorTypeSelect");
	var dba = document.getElementById("dba");
	var service = document.getElementById("service");	    
	var modelBlockAir = document.getElementById("modelBlockAir");
	
	if(Number(elevatorTypeSelect.value)<= 0){		       
		modelBlock11.style.display = "flex";  
		dba.style.display = "flex"; 		
		service.style.display = "none";
		aspiration.children[1].style.display = "flex"			
	}
	else if(Number(elevatorTypeSelect.value)<= 1){		      
		modelBlock11.style.display = "flex";
		dba.style.display = "flex"; 		
		service.style.display = "none";
		aspiration.children[1].style.display = "none"			
	}
	else if(Number(elevatorTypeSelect.value)<= 3){
		modelBlock11.style.display = "flex";              
		dba.style.display = "none"; 		
		service.style.display = "none"; 
		modelBlockAir.style.display = "flex";
		aspiration.children[1].style.display = "flex"
	}
	else{
		modelBlock11.style.display = "none";              
		dba.style.display = "none"; 		
		service.style.display = "flex"; 
		modelBlockAir.style.display = "none";
	}
	
	modelParametrNumber();
	ApparatConstruct();	
	
}
function ApparatConstruct(){
	var lotokType = document.getElementById('lotokTypeSelect');
	var confType = document.getElementById('confTypeSelect');

	for(var i = lotokType.length - 1; i >= 0; i--){
		lotokType.remove(i);
	}
	for(var i = confType.length - 1; i >= 0; i--){
		confType.remove(i);
	}
	var targetModel = elevatorTypeSelect.options[elevatorTypeSelect.value].textContent;

	for ( var i = 0; i < Main.length; i++){
		if (targetModel == Main[i].Model){
			var option =  document.createElement("option");
			option.value =  Main[i].modelNumber;
			option.text =  Main[i].modelNumber;
			lotokType.add(option);
		}
	}
	for ( var i = 0; i < Configuration.length; i++){
		if (targetModel == Configuration[i].Model){
			var option =  document.createElement("option");
			option.value =  Configuration[i].configuration;
			option.text =  Configuration[i].configuration;
			confType.add(option);
		}
	}
	updateApparatusData();
}
function modelParametrNumber(idRow){
	var number = 1;

	if (idRow == null){
		var param1 = modelParametr_1;
		var param2 = modelParametr_2;
		var param3 = modelParametr_3;
	}
	else{
		var param1 = document.getElementById("modelParametr_1_" + idRow);
		var param2 = document.getElementById("modelParametr_2_" + idRow);
		var param3 = document.getElementById("modelParametr_3_" + idRow);
	}

	for(i = 0 ; i < param1.children.length-1; i++){
		if(param1.children[i].style.display != "none"){
			param1.children[i].children[0].textContent = number;
			number++;
		}
	}
	for(i = 0 ; i < param2.children.length; i++){
		if(param2.children[i].style.display != "none"){
			param2.children[i].children[0].textContent = number;
			number++;
		}
	}
	for(i = 0 ; i < param3.children.length; i++){
		if(param3.children[i].style.display != "none"){
			param3.children[i].children[0].textContent = number;
			number++;
		}
	}
}
		//выгрузка данных для страницы аппарата
function updateApparatusData(){
	var targetElevator = elevatorTypeSelect.options[elevatorTypeSelect.value].textContent;
	var targetLotok = lotokTypeSelect.value;
	var targetConfig = confTypeSelect.value;
	ModelSeria.textContent = targetElevator;
	modelNumber.textContent = targetLotok;
	configuration.textContent = targetConfig;

	for (var i = 0; i < Model.length; i++){
		if (targetElevator == Model[i].Model){
			Voltage.children[1].textContent = Model[i].Voltage;
			Hz.children[1].textContent = Model[i].Hz;
			Air_MPa.children[1].textContent = Model[i].Air_MPa;

			air_class.children[0].children[1].textContent = Model[i].air_class.split(', ')[0];
			air_class.children[1].children[1].textContent = Model[i].air_class.split(', ')[1];
			air_class.children[2].children[1].textContent = Model[i].air_class.split(', ')[2];

			defence_class.children[1].textContent = Model[i].defence_class;
			defence_lvl.children[1].textContent = Model[i].defence_lvl;
			temp.children[1].textContent = Model[i].temp;
			wet.children[1].textContent = Model[i].wet;
			DBA.children[1].textContent = Model[i].DBA;
			explore_time.children[1].textContent = Model[i].explore_time;
		}
	} 
	for (var i = 0; i < Main.length; i++){
		if (targetElevator == Main[i].Model && targetLotok == Main[i].modelNumber){
			Channel.children[1].textContent = Main[i].Channel;	
			Capaсity.children[1].textContent = Main[i].Capaсity;
			Weight.children[1].textContent = Main[i].Weight;	
			kW.children[1].textContent = Main[i].kW;
			air_flow.children[1].textContent = Main[i].air_flow;
			Air_flowMax.children[1].textContent = Main[i].Air_flowMax;
			aspiration.children[0].children[1].textContent = Main[i].aspiration.split(', ')[0];
			aspiration.children[1].children[1].textContent = Main[i].aspiration.split(', ')[1];
			ModelImage.style.backgroundImage = "url(/static/img/kpApparatus/" + Main[i].imageName + ")";
			ModelTray.textContent = Main[i].description;	
		}
	}
	for (var i = 0; i < Configuration.length; i++){
		if (targetElevator == Configuration[i].Model && targetConfig == Configuration[i].configuration){
			ModelTray.textContent += " "+ Configuration[i].Description;
		}
	}
}	
//формирование страницы-клона нового аппарата
function createApparatNew(page_id){
	var page = modelPage_Param_MainBlock.children[0].cloneNode(true);
	var space = modelPage_Param_MainBlock.children[1].cloneNode(true);
	var idRow = Number(modelPage_Param_MainBlock.children.length/2);

	page.setAttribute("name", "page_" + page_id);
	space.setAttribute("name", "space_" + page_id);

	page.id = "modelPage_Param_" + idRow;
	page.style.display = "";
	space.style.display = "";
	space.id = "space_" + idRow;
	page.children[0].children[0].children[1].children[1].children[0].id = "ModelSeria_" + idRow;
	page.children[0].children[0].children[1].children[1].children[1].id = "modelNumber_" + idRow;
	page.children[0].children[0].children[1].children[1].children[2].id = "configuration_" + idRow;
	page.children[0].children[0].children[2].children[0].id = "button_Lang_Smart_" + idRow;
	page.children[0].children[0].children[2].children[0].addEventListener('click', setupLangSmart(idRow));
					//это весь основной контент (modelSettings) не считая pageBottomBlock											
	page.children[0].children[1].children[0].children[0].children[0].children[0].id = "ModelTray_" + idRow;											
	page.children[0].children[1].children[0].children[2].id = "Title_Param_" + idRow;											
								//это первый settingsColumn
											//modelParametr_1
	page.children[0].children[1].children[0].children[3].id = "modelParametr_1_" + idRow;							
	page.children[0].children[1].children[0].children[3].children[0].children[1].id = "Channel_" + idRow;							
	page.children[0].children[1].children[0].children[3].children[1].children[1].id = "Capaсity_" + idRow;								
	page.children[0].children[1].children[0].children[3].children[2].children[1].id = "Cleaning_factor_" + idRow;									
	page.children[0].children[1].children[0].children[3].children[3].children[1].id = "CCD_" + idRow;									
	page.children[0].children[1].children[0].children[3].children[4].children[1].id = "Voltage_" + idRow;									
	page.children[0].children[1].children[0].children[3].children[5].children[1].id = "Hz_" + idRow;									
	page.children[0].children[1].children[0].children[3].children[6].children[1].id = "kW_" + idRow;									
	page.children[0].children[1].children[0].children[3].children[7].children[1].id = "Air_MPa_" + idRow;									
	page.children[0].children[1].children[0].children[3].children[8].children[1].children[1].id = "air_class_" + idRow;									
	page.children[0].children[1].children[0].children[3].children[9].children[1].id = "air_flow_" + idRow;
								//это 2 settingsColumn	
	page.children[0].children[1].children[1].children[0].children[0].id = "ModelImage_" + idRow;
	page.children[0].children[1].children[1].children[0].children[1].children[0].children[1].id = "sizeHeight_" + idRow;
	page.children[0].children[1].children[1].children[0].children[1].children[1].children[1].id = "sizeDeep_" + idRow;
	page.children[0].children[1].children[1].children[0].children[1].children[2].children[1].id = "sizeWidth_" + idRow;
											//modelParametr_2
	page.children[0].children[1].children[1].children[1].id = "modelParametr_2_" + idRow;
	page.children[0].children[1].children[1].children[1].children[0].id = "modelBlockAir_" + idRow;
	page.children[0].children[1].children[1].children[1].children[0].children[1].id = "Air_flowMax_" + idRow;
	page.children[0].children[1].children[1].children[1].children[1].id = "modelBlock11_" + idRow;
	page.children[0].children[1].children[1].children[1].children[1].children[1].children[1].id = "aspiration_" + idRow;
	page.children[0].children[1].children[1].children[1].children[2].children[1].id = "Weight_" + idRow;
	page.children[0].children[1].children[1].children[1].children[3].children[1].id = "defence_class_" + idRow;
	page.children[0].children[1].children[1].children[1].children[4].children[1].id = "defence_lvl_" + idRow;	
											//modelParametr_3
	page.children[0].children[1].children[1].children[2].id = "modelParametr_3_" + idRow;
	page.children[0].children[1].children[1].children[2].children[0].children[1].id = "temp_" + idRow;
	page.children[0].children[1].children[1].children[2].children[1].children[1].id = "wet_" + idRow;
	page.children[0].children[1].children[1].children[2].children[2].id = "dba_" + idRow;
	page.children[0].children[1].children[1].children[2].children[2].children[1].id = "DBA_" + idRow;
	page.children[0].children[1].children[1].children[2].children[3].id = "service_" + idRow;
	page.children[0].children[1].children[1].children[2].children[3].children[1].id = "explore_time_" + idRow;

	page.children[0].children[1].children[1].children[4].children[0].id = "advDesc_" + idRow;
	page.children[0].children[1].children[1].children[4].children[1].id = "en_model_" + idRow;
	modelPage_Param_MainBlock.appendChild(page);
	modelPage_Param_MainBlock.appendChild(space);

	updateCloneApparatusData(idRow);
	autoPageNumber();
}
		//выгрузка данных для страницы-клона аппарата
function updateCloneApparatusData(idNumber){
	var targetElevator = Model[calcElevator.value].Model;
	var targetLotok = calcLotok.value;
	var targetConfig = calcConf.value.split('(')[0];
	//Добавление серии модели в список(для битрикса)
	ApparatModelList.push(targetElevator);

	var button_Lang_Smart = document.getElementById('button_Lang_Smart_' + idNumber);

	// document.getElementById("en_model_" + idNumber).textContent = targetElevator + ' ' + targetLotok + ' ' + targetConfig;
	document.getElementById("ModelSeria_" + idNumber).textContent = apparatNameRU();	
	document.getElementById("modelNumber_" + idNumber).textContent = targetLotok;
	document.getElementById("configuration_" + idNumber).textContent = targetConfig;
	
	for (var i = 0; i < Model.length; i++){
		if (targetElevator == Model[i].Model){
			document.getElementById("Voltage_" + idNumber).children[1].textContent = Model[i].Voltage;
			document.getElementById("Hz_" + idNumber).children[1].textContent = Model[i].Hz;
			document.getElementById("Air_MPa_" + idNumber).children[1].textContent = Model[i].Air_MPa;

			document.getElementById("air_class_" + idNumber).children[0].children[1].textContent = Model[i].air_class.split(', ')[0];
			document.getElementById("air_class_" + idNumber).children[1].children[1].textContent = Model[i].air_class.split(', ')[1];
			document.getElementById("air_class_" + idNumber).children[2].children[1].textContent = Model[i].air_class.split(', ')[2];

			document.getElementById("defence_class_" + idNumber).children[1].textContent = Model[i].defence_class;
			document.getElementById("defence_lvl_" + idNumber).children[1].textContent = Model[i].defence_lvl;
			document.getElementById("temp_" + idNumber).children[1].textContent = Model[i].temp;
			document.getElementById("wet_" + idNumber).children[1].textContent = Model[i].wet;
			document.getElementById("DBA_" + idNumber).children[1].textContent = Model[i].DBA;
			document.getElementById("explore_time_" + idNumber).children[1].textContent = Model[i].explore_time;			
		}
	} 
	for (var i = 0; i < Main.length; i++){
		if (targetElevator == Main[i].Model && targetLotok == Main[i].modelNumber){
			document.getElementById("Channel_" + idNumber).children[1].textContent = Main[i].Channel;	
			document.getElementById("Capaсity_" + idNumber).children[1].textContent = Main[i].Capacity;
			document.getElementById("Weight_" + idNumber).children[1].textContent = Main[i].Weight;	
			document.getElementById("kW_" + idNumber).children[1].textContent = Main[i].kW;
			document.getElementById("air_flow_" + idNumber).children[1].textContent = Main[i].air_flow;
			document.getElementById("Air_flowMax_" + idNumber).children[1].textContent = Main[i].Air_flowMax;
			document.getElementById("aspiration_" + idNumber).children[0].children[1].textContent = Main[i].aspiration.split(', ')[0];
			document.getElementById("aspiration_" + idNumber).children[1].children[1].textContent = Main[i].aspiration.split(', ')[1];
			document.getElementById("ModelImage_" + idNumber).style.backgroundImage = "url(/static/img/kpApparatus/" + Main[i].imageName + ")";
			document.getElementById("sizeHeight_" + idNumber).children[0].textContent = Main[i].sizeHeight;
			document.getElementById("sizeDeep_" + idNumber).children[0].textContent = Main[i].sizeDeep;
			document.getElementById("sizeWidth_" + idNumber).children[0].textContent = Main[i].sizeWidth;
			document.getElementById("ModelTray_" + idNumber).textContent = Main[i].description;	
			
			document.getElementById("en_model_" + idNumber).textContent = i;
		}
	}
	for (var i = 0; i < Configuration.length; i++){
		if (targetElevator == Configuration[i].Model && targetConfig == Configuration[i].configuration){
			document.getElementById("ModelTray_" + idNumber).textContent += " "+ Configuration[i].Description;
			document.getElementById("CCD_" + idNumber).children[1].textContent = Configuration[i].CCD;
			document.getElementById("en_model_" + idNumber).textContent += "_"+ i;
		}
	}
	//для грамотного отображениЯ необходимых параметров аппарата
	if(Number(calcElevator.value)<= 0){		       
		document.getElementById("modelBlock11_" + idNumber).style.display = "flex";  
		document.getElementById("dba_" + idNumber).style.display = "flex"; 		
		document.getElementById("service_" + idNumber).style.display = "none";
		document.getElementById("aspiration_" + idNumber).children[1].style.display = "flex"			
	}
	else if(Number(calcElevator.value)<= 1){		      
		document.getElementById("modelBlock11_" + idNumber).style.display = "flex";
		document.getElementById("dba_" + idNumber).style.display = "flex"; 		
		document.getElementById("service_" + idNumber).style.display = "none";
		document.getElementById("aspiration_" + idNumber).children[1].style.display = "none"			
	}
	else if(Number(calcElevator.value)<= 3){
		document.getElementById("modelBlock11_" + idNumber).style.display = "flex";              
		document.getElementById("dba_" + idNumber).style.display = "none"; 		
		document.getElementById("service_" + idNumber).style.display = "none"; 
		document.getElementById("modelBlockAir_" + idNumber).style.display = "flex";
		document.getElementById("aspiration_" + idNumber).children[1].style.display = "flex"
	}
	else{
		document.getElementById("modelBlock11_" + idNumber).style.display = "none";              
		document.getElementById("dba_" + idNumber).style.display = "none"; 		
		document.getElementById("service_" + idNumber).style.display = "flex"; 
		document.getElementById("aspiration_" + idNumber).children[1].style.display = "none";
	}

	modelParametrNumber(idNumber);	
	switchActual(button_Lang_Smart);
}
//ДОБАВЛЕНИЕ СТРОК С АППАРАТОМ В ЦЕНУ
function createPriceRow(){	
	for (var i = 2; i < 0; i++){
		var cloneRow = priceRow_0.cloneNode(true);
		cloneRow.children[1].textContent = i;	
		cloneRow.id = "priceRow_" + i;		
		cloneRow.children[2].children[1].id = "componentName_" + i;	
		cloneRow.children[2].children[2].id = "count_" + i;		
		cloneRow.children[2].children[3].id = "price_" + i;		
		cloneRow.children[2].children[4].id = "sum_" + i;		
		cloneRow.children[2].children[5].id = "discountValue_" + i;		
		cloneRow.children[2].children[6].id = "discountSum_" + i;		
		cloneRow.children[2].children[7].id = "nds_" + i;	
		
		priceModelBlock.appendChild(cloneRow);
	}	
	for(var i = 1; i <= priceModelBlock.children.length; i++){		
		priceModelBlock.children[i-1].children[2].children[2].addEventListener('change', ReturnCalculatePrice(i));
		priceModelBlock.children[i-1].children[2].children[3].addEventListener('change', ReturnCalculatePrice(i));
		priceModelBlock.children[i-1].children[2].children[5].addEventListener('change', ReturnCalculatePrice(i));
		priceModelBlock.children[i-1].children[2].children[6].addEventListener('change', ReturnCalculatePrice(i));
	}
}
function createSinglePriceRow(){
	var mainSelect = language == 'RU' ? mainSelector : mainSelectorEN;
	var idRow = Number(priceModelBlock.children.length);
	var cloneRow = priceRow_0.cloneNode(true);	
	cloneRow.children[0].style.display = "";
	cloneRow.children[1].textContent = idRow;	
	cloneRow.id = "priceRow_" + idRow;		
	cloneRow.style.display = "flex";		
	cloneRow.children[2].children[0].id = "rowImageApparat_" + idRow;
	cloneRow.children[2].children[1].id = "componentName_" + idRow;
	cloneRow.children[2].children[2].id = "count_" + idRow;
	cloneRow.children[2].children[3].id = "price_" + idRow;
	cloneRow.children[2].children[4].id = "sum_" + idRow;
	cloneRow.children[2].children[5].id = "discountValue_" + idRow;
	cloneRow.children[2].children[6].id = "discountSum_" + idRow;
	cloneRow.children[2].children[7].id = "nds_" + idRow;
	
	priceModelBlock.appendChild(cloneRow);
	var page_id = mainSelect.value + "_" + Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
	document.getElementById("componentName_" + idRow).name = page_id;
	
	priceModelBlock.children[idRow].children[2].children[2].addEventListener('change', ReturnCalculatePrice(idRow));
	priceModelBlock.children[idRow].children[2].children[3].addEventListener('change', ReturnCalculatePrice(idRow));
	priceModelBlock.children[idRow].children[2].children[5].addEventListener('change', ReturnCalculatePrice(idRow));
	priceModelBlock.children[idRow].children[2].children[6].addEventListener('change', ReturnCalculatePrice(idRow));

	priceModelBlock.children[idRow].children[0].addEventListener('click', function (){deleteSinglePriceRow(idRow, page_id);checkDayToDelivery();});
		
	switch(mainSelect.value){
		case "0":			
			// var conf = calcConf.value.split("(")
			document.getElementById("componentName_" + idRow).textContent = apparatNameRU() + " " + calcLotok.value + " " + calcConf.value.split("(")[0];
			createApparatNew(page_id);		
			getModelPrice(idRow);
			chimg();			
			break;
		case "1":
			var __kompressor = findKompressor();
			document.getElementById("componentName_" + idRow).textContent = language == 'RU' ? __kompressor.fullName : __kompressor.fullNameEN;
			createCompressorNew(page_id);
			getCompressorPrice(idRow);
			document.getElementById("rowImageApparat_" + idRow).style = "background:url(/static/img/kpApparatus/" + __kompressor.imageName + ") center center no-repeat; background-size: contain;";
			
			break;
		case "2":
			document.getElementById("componentName_" + idRow).textContent = "ПРОТОКОЛ СОРТИРОВКИ №" + protocol.id_requirements + "_" + protocol.id_protocol;
			document.getElementById("rowImageApparat_" + idRow).style.backgroundImage = "";
			createProtocolNew(page_id);
			break;
		case "3":
			switch(ElevatorType){
				case"CSZE":
				  var modelSize = Number(ModelCSZE.modelSize.height + ModelCSZE.modelSize.top_length + ModelCSZE.modelSize.bottom_length).toFixed(0);
				  var modelPrice = Number(ModelCSZE.modelPrice * ModelCSZE.NDS).toFixed(2);
				  var modelCount = ModelCSZE.modelCount != "modelCount" ? ModelCSZE.modelCount : 1;
				  var materialText = ModelCSZE.material == "Сталь оцинкованная" ? "-А" : "-Б";
				  var modelName = ModelCSZE.modelName.substr(0,4) + "-" + ModelCSZE.modelName.substr(4);
				  
				  ElevatirModelList.push(ModelCSZE.modelName);
				  
				  document.getElementById("componentName_" + idRow).textContent = "Конвейер цепной " + modelName + "(-" + modelSize + materialText + ")" /*+ SA_text*/;
				  createCSZENew(page_id);
				  break;
				case"CSE":
				  var modelSize = Number(ModelCSE.modelSize.height).toFixed(2);
				  var modelPrice = Number(ModelCSE.modelPrice * ModelCSE.NDS).toFixed(2);
				  var modelCount = ModelCSE.modelCount != "modelCount" ? ModelCSE.modelCount : 1;
				  var materialText = ModelCSE.material == "Сталь оцинкованная" ? "Оцинкованный металл" : "Нержавеющий металл";
				  var modelName = "Зерновой элеватор " + ModelCSE.modelName.substr(0,3) + " " + ModelCSE.modelName.substr(3);
				  
				  ElevatirModelList.push(ModelCSE.modelName);
				  
				  document.getElementById("componentName_" + idRow).textContent = modelName + /*SA_text */ " " + modelSize + " метра. " + materialText;;
				  createCSENew(page_id);
				  break;
				case"CSCC":
				  var modelSize = Math.ceil(Number(ModelCSCC.modelSize.TransportLength).toFixed(2) * 10) / 10;
				  var modelPrice = Number(ModelCSCC.modelPrice * ModelCSCC.NDS).toFixed(2);
				  var modelCount = ModelCSCC.modelCount != "modelCount" ? ModelCSCC.modelCount : 1;
				  var materialText = ModelCSCC.material == "Сталь оцинкованная" ? "-А" : "-Б";
				  var modelName = ModelCSCC.modelName.substr(0,4) + "-" + ModelCSCC.modelName.substr(4);
				  
				  ElevatirModelList.push(ModelCSCC.modelName);
				  
				  document.getElementById("componentName_" + idRow).textContent = "Конвейер скребковый " + modelName + "(-" + modelSize + materialText + ")" /*+ SA_text*/;
				  createCSCCNew(page_id);
				  break;
			  }		
			getElevatorPrice(idRow);
			chimgElevator();
			break;
		case "4"://Бункеры и сходы
			var type = language == 'RU' ?  BunkerSelectorType : BunkerSelectorTypeEN;
			switch(type.value){
				case 'Сходы':
					for(var i = 0; i<Bunker.length; i++){
						if(BunkerShod.value == Bunker[i].lotok){
							document.getElementById('componentName_' + idRow).textContent = Bunker[i].name;
							break;
						}
					}
					break;
				case 'Лотки':
					for(var i = 0; i<Bunker.length; i++){
						if(BunkerSelectorLotok.value == Bunker[i].lotok){
							document.getElementById('componentName_' + idRow).textContent = Bunker[i].name;
							break;
						}
					}
					break;
				case 'Kits':
					for(var i = 0; i<Bunker.length; i++){
						if(BunkerShod.value == Bunker[i].lotok){
							document.getElementById('componentName_' + idRow).textContent = Bunker[i].nameEN;
							break;
						}
					}
					break;
				case 'Trays':
					for(var i = 0; i<Bunker.length; i++){
						if(BunkerSelectorLotok.value == Bunker[i].lotok){
							document.getElementById('componentName_' + idRow).textContent = Bunker[i].nameEN;
							break;
						}
					}
					break;
			}
			
			document.getElementById("rowImageApparat_" + idRow).style = "";
			getBunkerPrice(idRow);
			break;
		case "5"://Аспирация
			var type = language == 'RU' ? AspirationSelectorType : AspirationSelectorTypeEN;
			switch(type.value){
				case 'Для фотосепаратора':
					for(var i = 0; i<Aspiration.length; i++){
						if(SelectorPhotoseparation.value == Aspiration[i].lotok){
							document.getElementById('componentName_' + idRow).textContent = Aspiration[i].name;
						}
					}
					break;
				case 'Для лотка':
					for(var i = 0; i<Aspiration.length; i++){
						if(SelectorLotok.value == Aspiration[i].lotok){
							document.getElementById('componentName_' + idRow).textContent = Aspiration[i].name;
						}
					}
					break;
				case 'For P/S':
					for(var i = 0; i<Aspiration.length; i++){
						if(SelectorPhotoseparation.value == Aspiration[i].lotok){
							document.getElementById('componentName_' + idRow).textContent = Aspiration[i].nameEN;
						}
					}
					break;
				case 'For tray':
					for(var i = 0; i<Aspiration.length; i++){
						if(SelectorLotok.value == Aspiration[i].lotok){
							document.getElementById('componentName_' + idRow).textContent = Aspiration[i].nameEN;
						}
					}
					break;	
			}					
			document.getElementById("rowImageApparat_" + idRow).style = "";
			getAspirationPrice(idRow);
			break;
		case "6"://Комплектующие
			document.getElementById('componentName_' + idRow).textContent = ComplectationSelector.children[0].children[0].value;
			document.getElementById("rowImageApparat_" + idRow).style = '';
			getComplectationPrice(idRow);
			break;
		case "7"://Свое значение
			document.getElementById('componentName_' + idRow).contentEditable = "true";
			document.getElementById('componentName_' + idRow).addEventListener("input", returnOtherName(idRow));
			document.getElementById("rowImageApparat_" + idRow).style = "";
			break;
		case "8"://cuber
			document.getElementById('componentName_' + idRow).textContent = language == 'RU' ? "Лифтовой склад " + cuberSize.value : "Lift warehouse " + cuberSize.value;
			document.getElementById("rowImageApparat_" + idRow).style = "";
			getLiftPrice(idRow);
			discountButton.click();
			discountButton.click();
			createLiftNew(page_id);
			break;
		case "9"://import
			document.getElementById('componentName_' + idRow).textContent = language == 'RU' ? "Импортный сепаратор " + ImportModel.value : "Imported separator " + ImportModel.value;
			document.getElementById("rowImageApparat_" + idRow).style = "";
			getImportPrice(idRow);
			discountButton.click();
			discountButton.click();
			createImportNew(page_id);
			break;
		case "10"://Настройка оборудования
			document.getElementById('componentName_' + idRow).textContent = language == 'RU' ? "Настройка оборудования" : 'Equipment setup';
			document.getElementById("rowImageApparat_" + idRow).style = "";
			document.getElementById("price_" + idRow).value = "85000";
			discountButton.click();
			discountButton.click();
			break;
		case "11"://Доставка
			document.getElementById('componentName_' + idRow).textContent = language == 'RU' ? "Доставка" : 'Delivery';
			document.getElementById("rowImageApparat_" + idRow).style = "";
			prepareDeliveryBlock();
			break;
	}
	setupEndDate();
	CalculationSum();
	addComercialOfferElement(mainSelect.value, idRow);
	newAddComercialOfferElement(mainSelect.value, idRow);	
}
function findKompressor(){
	for(var i = 0; i < Kompressor.length; i++){
		if(Kompressor[i].compressorManufacturer == genesisProvider.value && Kompressor[i].compressorModel == GenesisModel.value && Kompressor[i].compressorEnginePower == GenesisMotor.value){
			var __kompressor = Kompressor[i];
			break;
		}
	}
	
	return __kompressor;
}
function apparatNameRU(){
	for(var i = 0; i< Main.length; i++){
		var elevatorName = Model[calcElevator.value].Model;
		var model = Main[i].Model;
		if(elevatorName == model){
			elevatorName = model;
			model = language == 'RU' ? Main[i].ModelRU : Main[i].Model;			
			return model;
		}	
	}				
}
function getLiftPrice(idRow){
	var price = document.getElementById('price_'+idRow);
	var sum = document.getElementById('sum_'+idRow);
	for (var i = 0; i < LiftType.length; i++){
		if (cuberSize.value == LiftType[i].size){
			price.value = LiftType[i].price;
			sum.value = LiftType[i].price;
		}
	}
}
function getImportPrice(idRow){
	var price = document.getElementById('price_' + idRow);
	var sum = document.getElementById('sum_' + idRow);
	for (var i = 0; i < ImportType.length; i++){
		if (ImportModel.value == ImportType[i].Model){
			price.value = Number(ImportType[i].price * CRB_RUB_RATE.USD.Value).toFixed(2);
			sum.value = Number(ImportType[i].price * CRB_RUB_RATE.USD.Value).toFixed(2);
		}
	}
}
	//удаение строк-клонов
function deleteSinglePriceRow(idRemove, selectorType){
	document.getElementById("priceRow_" + Number(idRemove)).remove();

	for ( var i = 1; i < priceModelBlock.children.length; i++){
		var priceRow = priceModelBlock.children[i];
		
		priceRow.id = "priceRow_" + i;
		priceRow.children[1].textContent = i;
		priceRow.children[2].children[0].id = "rowImageApparat_" + i;	
		priceRow.children[2].children[1].id = "componentName_" + i;	
		priceRow.children[2].children[2].id = "count_" + i;		
		priceRow.children[2].children[3].id = "price_" + i;		
		priceRow.children[2].children[4].id = "sum_" + i;		
		priceRow.children[2].children[5].id = "discountValue_" + i;		
		priceRow.children[2].children[6].id = "discountSum_" + i;		
		priceRow.children[2].children[7].id = "nds_" + i;	

		clearEventListener(priceRow.children[2].children[2]);
		clearEventListener(priceRow.children[2].children[3]);
		clearEventListener(priceRow.children[2].children[5]);
		clearEventListener(priceRow.children[2].children[6]);
		clearEventListener(priceRow.children[0]);

		priceRow.children[2].children[2].addEventListener('change', ReturnCalculatePrice(i));
		priceRow.children[2].children[3].addEventListener('change', ReturnCalculatePrice(i));
		priceRow.children[2].children[5].addEventListener('change', ReturnCalculatePrice(i));
		priceRow.children[2].children[6].addEventListener('change', ReturnCalculatePrice(i));
		
		var selectName = document.getElementById("componentName_" + i).name;
		priceRow.children[0].addEventListener('click', returnDeletedPriceRow(i, selectName));
	}
	//проверка удаления страницы
	switch(selectorType.split("_")[0]){
		case "0":
		  var listSeparatorPage = [].slice.call(modelPage_Param_MainBlock.getElementsByClassName("a4"));
		  
		  var targetSeparatorID = Number(listSeparatorPage.indexOf(document.getElementsByName("page_" + selectorType)[0]) - 1);
		  
		  ApparatModelList.splice(targetSeparatorID, 1);
		  break;
		case "1":
		  break;
		case "2":
		  break;
		case "3":
		  var listELevatorPage = [].slice.call(ElevatorPage_Param_MainBlock.getElementsByClassName("a4"));
		  
		  var targetElevatorID = Number(listELevatorPage.indexOf(document.getElementsByName("page_" + selectorType)[0]) - 6) / 2;
		  
		  ElevatirModelList.splice(targetElevatorID, 1);
		  break;
	  }
	for(var i = document.getElementsByName("page_" + selectorType).length - 1; i >= 0; i--){
		document.getElementsByName("page_" + selectorType)[i].remove();
		try{
			document.getElementsByName("space_" + selectorType)[i].remove();
		}
		catch{
			
		}
	}
	switch(selectorType.split("_")[0]){
		case "0":
			for (var i = 1; i < Number(modelPage_Param_MainBlock.children.length/2); i++ ){
				var page = modelPage_Param_MainBlock.children[i + i];
				var space = modelPage_Param_MainBlock.children[i + i + 1];
		
				page.id = "modelPage_Param_" + i;
				space.id = "space_" + i;
				
				page.children[0].children[0].children[1].children[1].children[0].id = "ModelSeria_" + i;
				page.children[0].children[0].children[1].children[1].children[1].id = "modelNumber_" + i;
				page.children[0].children[0].children[1].children[1].children[2].id = "configuration_" + i;
								//это весь основной контент (modelSettings) не считая pageBottomBlock											
				page.children[0].children[1].children[0].children[0].children[0].children[0].id = "ModelTray_" + i;											
											//это первый settingsColumn
														//modelParametr_1
				page.children[0].children[1].children[0].children[3].id = "modelParametr_1_" + i;							
				page.children[0].children[1].children[0].children[3].children[0].children[1].id = "Channel_" + i;							
				page.children[0].children[1].children[0].children[3].children[1].children[1].id = "Capaсity_" + i;								
				page.children[0].children[1].children[0].children[3].children[2].children[1].id = "Cleaning_factor_" + i;									
				page.children[0].children[1].children[0].children[3].children[3].children[1].id = "CCD_" + i;									
				page.children[0].children[1].children[0].children[3].children[4].children[1].id = "Voltage_" + i;									
				page.children[0].children[1].children[0].children[3].children[5].children[1].id = "Hz_" + i;									
				page.children[0].children[1].children[0].children[3].children[6].children[1].id = "kW_" + i;									
				page.children[0].children[1].children[0].children[3].children[7].children[1].id = "Air_MPa_" + i;									
				page.children[0].children[1].children[0].children[3].children[8].children[1].children[1].id = "air_class_" + i;									
				page.children[0].children[1].children[0].children[3].children[9].children[1].id = "air_flow_" + i;
											//это 2 settingsColumn	
				page.children[0].children[1].children[1].children[0].children[0].id = "ModelImage_" + i;
														//modelParametr_2
				page.children[0].children[1].children[1].children[1].id = "modelParametr_2_" + i;
				page.children[0].children[1].children[1].children[1].children[0].id = "modelBlockAir_" + i;
				page.children[0].children[1].children[1].children[1].children[0].children[1].id = "Air_flowMax_" + i;
				page.children[0].children[1].children[1].children[1].children[1].id = "modelBlock11_" + i;
				page.children[0].children[1].children[1].children[1].children[1].children[1].children[1].id = "aspiration_" + i;
				page.children[0].children[1].children[1].children[1].children[2].children[1].id = "Weight_" + i;
				page.children[0].children[1].children[1].children[1].children[3].children[1].id = "defence_class_" + i;
				page.children[0].children[1].children[1].children[1].children[4].children[1].id = "defence_lvl_" + i;	
														//modelParametr_3
				page.children[0].children[1].children[1].children[2].id = "modelParametr_3_" + i;	
				page.children[0].children[1].children[1].children[2].children[0].children[1].id = "temp_" + i;
				page.children[0].children[1].children[1].children[2].children[1].children[1].id = "wet_" + i;
				page.children[0].children[1].children[1].children[2].children[2].id = "dba_" + i;
				page.children[0].children[1].children[1].children[2].children[2].children[1].id = "DBA_" + i;
				page.children[0].children[1].children[1].children[2].children[3].id = "service_" + i;
				page.children[0].children[1].children[1].children[2].children[3].children[1].id = "explore_time_" + i;
			}			
			break;
		case "1":
			for (var i = 1; i < Number(CompressorPage_Param_MainBlock.children.length/2); i++ ){
				var page = CompressorPage_Param_MainBlock.children[i + i];
				var space = CompressorPage_Param_MainBlock.children[i + i + 1];

				page.id = "CompressorPage_Param_" + i;				
				space.id = "spaceComp_" + i;	

				page.children[0].children[0].children[1].children[0].id = "GENESIS_Title_" + i;
				page.children[0].children[0].children[1].children[1].children[2].id = "GENESIS_Power_" + i;
				//это весь основной контент (modelSettings) не считая pageBottomBlock
				page.children[0].children[1].children[0].children[0].children[0].children[0].children[0].id = "infoTitle_" + i;	
				page.children[0].children[1].children[0].children[0].children[0].children[1].id = "compressorDescription_" + i;
				page.children[0].children[1].children[0].children[2].children[0].children[0].id = "description_seria_" + i;
				page.children[0].children[1].children[0].children[2].children[0].children[1].id = "settingsOption_" + i;

				page.children[0].children[1].children[1].children[0].children[0].id = "compressorImg_" + i;
				
				page.children[0].children[1].children[1].children[2].children[0].children[1].id = "compressorVolume_" + i;
				page.children[0].children[1].children[1].children[2].children[1].children[1].id = "compressorCapacity_" + i;											
				page.children[0].children[1].children[1].children[2].children[2].children[1].id = "compressorPressure_" + i;											
				page.children[0].children[1].children[1].children[2].children[3].children[1].id = "compressorEnginePower_" + i;											
				page.children[0].children[1].children[1].children[2].children[4].children[1].id = "compressorVoltage_" + i;											
				page.children[0].children[1].children[1].children[2].children[5].children[1].id = "compressorHz_" + i;											
				page.children[0].children[1].children[1].children[2].children[6].children[1].id = "compressorPhase_" + i;											
				page.children[0].children[1].children[1].children[2].children[7].children[1].id = "compressorMass_" + i;											
				page.children[0].children[1].children[1].children[2].children[8].children[1].id = "desiccant_" + i;											
				page.children[0].children[1].children[1].children[2].children[9].children[1].id = "filter_" + i;											
				page.children[0].children[1].children[1].children[2].children[10].children[1].id = "ressiver_" + i;
				
			}			
			break;
		case "2":
			
			break;
		case "3":
			var counter = 0;
			for (var i = 0; i < Number(ElevatorPage_Param_MainBlock.children.length/4)-1; i++ ){				
				if(i != 0){
					counter += 3;
				}
				var Technical = ElevatorPage_Param_MainBlock.children[i + 4 + counter];
				var space = ElevatorPage_Param_MainBlock.children[i + 5 + counter];
				var Size = ElevatorPage_Param_MainBlock.children[i + 6 + counter];
				var space2 = ElevatorPage_Param_MainBlock.children[i + 7 + counter];

				var model = Technical.id.split("_")[0];

				Technical.id = model + "_Technical_" + i;
				space.id = "space_" + model + "_" + i;
				Size.id = model + "_Size_" + i;
				space2.id = "space_" + model + "_" + i;
				switch(model){
					case"CSZE":
						Technical.children[0].children[0].children[1].id = model + "_ModelName_" + i;//+
						Technical.children[0].children[1].children[0].id = model + "_Technic_" + i;//+
						Technical.children[0].children[1].children[0].children[2].children[1].children[1].id = model + "_Capacity_" + i;//+
						Technical.children[0].children[1].children[0].children[2].children[2].children[1].id = model + "_CapacityProduct_" + i;//+
						Technical.children[0].children[1].children[0].children[2].children[3].children[1].id = model + "_Height_" + i;
						Technical.children[0].children[1].children[0].children[2].children[4].children[1].id = model + "_LengthTotal_" + i;
						Technical.children[0].children[1].children[0].children[2].children[5].children[1].id = model + "_LengthTop_" + i;
						Technical.children[0].children[1].children[0].children[2].children[6].children[1].id = model + "_LengthBottom_" + i;
						Technical.children[0].children[1].children[0].children[2].children[7].children[1].id = model + "_ChainSpeed_" + i;
						Technical.children[0].children[1].children[0].children[2].children[8].children[1].id = model + "_BucketVolume_" + i;
						Technical.children[0].children[1].children[0].children[2].children[9].children[1].id = model + "_Diametr_" + i;
						Technical.children[0].children[1].children[0].children[2].children[10].children[1].id = model + "_Turn_" + i;
						Technical.children[0].children[1].children[0].children[2].children[11].children[1].id = model + "_Power_" + i;
						Technical.children[0].children[1].children[0].children[2].children[12].children[1].id = model + "_Material_" + i;
						Technical.children[0].children[1].children[0].children[2].children[13].children[1].id = model + "_BucketMaterial_" + i;
						Technical.children[0].children[1].children[0].children[2].children[14].children[1].id = model + "_Motor_" + i;
						Technical.children[0].children[1].children[0].children[2].children[15].children[1].id = model + "_Reductor_" + i;

						Technical.children[0].children[1].children[1].children[0].children[0].id = model + "_ModelImage_" + i;
						Technical.children[0].children[1].children[1].children[2].children[0].id = model + "_Complect_" + i;
						Technical.children[0].children[1].children[1].children[2].children[1].children[1].id = model + "_Window_" + i;
						Technical.children[0].children[1].children[1].children[2].children[2].children[1].id = model + "_Hatches_" + i;
						Technical.children[0].children[1].children[1].children[2].children[3].children[1].id = model + "_LoadUnload_" + i;
						Technical.children[0].children[1].children[1].children[3].children[0].children[1].id = model + "_Converter_" + i;
						Technical.children[0].children[1].children[1].children[3].children[1].children[1].id = model + "_ControlBox_" + i;
						Technical.children[0].children[1].children[1].children[3].children[2].children[1].id = model + "_Backward_" + i;
						Technical.children[0].children[1].children[1].children[3].children[3].children[1].id = model + "_Sensor_" + i;
						Technical.children[0].children[1].children[1].children[3].children[4].children[1].id = model + "_ChainSensor_" + i;
						Technical.children[0].children[1].children[1].children[3].children[5].children[1].id = model + "_AddLoad_" + i;
						Technical.children[0].children[1].children[1].children[3].children[6].children[1].id = model + "_AddUnload_" + i;
						Technical.children[0].children[1].children[1].children[3].children[7].children[1].id = model + "_StreetFulfillment_" + i;
						Technical.children[0].children[1].children[1].children[4].children[0].id = model + "_Metall_" + i;
						Technical.children[0].children[1].children[1].children[4].children[1].children[1].id = model + "_MetallMain_" + i;
						Technical.children[0].children[1].children[1].children[4].children[2].children[1].id = model + "_MetallOther_" + i;
						
						Size.children[0].children[1].id = model + "_ModelDrawing_" + i;				
						Size.children[0].children[2].id = model + "_SizeBlock_" + i;
						Size.children[0].children[2].children[1].children[1].id = model + "_SizeHeight_" + i;
						Size.children[0].children[2].children[2].children[1].id = model + "_SizeHeightTransport_" + i;
						Size.children[0].children[2].children[3].children[1].id = model + "_SizeLengthTop_" + i;
						Size.children[0].children[2].children[4].children[1].id = model + "_SizeLengthBefore_" + i;
						Size.children[0].children[2].children[5].children[1].id = model + "_SizeLengthBot_" + i;
						Size.children[0].children[2].children[6].children[1].id = model + "_SizeLenghtUnload_" + i;
						Size.children[0].children[2].children[7].children[1].id = model + "_SizeLenghtTotal_" + i;
						break;
					case"CSE":
						Technical.children[0].children[0].children[1].id = model + "_ModelName_" + i;
						Technical.children[0].children[1].children[0].id = model + "_Technic_" + i;
						Technical.children[0].children[1].children[0].children[2].children[1].children[1].id = model + "_Capacity_" + i;
						Technical.children[0].children[1].children[0].children[2].children[2].children[1].id = model + "_CapacityProduct_" + i;
						Technical.children[0].children[1].children[0].children[2].children[3].children[1].id = model + "_TransportLength_" + i;
						Technical.children[0].children[1].children[0].children[2].children[4].children[1].id = model + "_Height_" + i;
						Technical.children[0].children[1].children[0].children[2].children[5].children[1].id = model + "_BeltSpeed_" + i;
						Technical.children[0].children[1].children[0].children[2].children[6].children[1].id = model + "_BucketStep_" + i;
						Technical.children[0].children[1].children[0].children[2].children[7].children[1].id = model + "_DrumStep_" + i;
						Technical.children[0].children[1].children[0].children[2].children[8].children[1].id = model + "_DrumDesign_" + i;
						Technical.children[0].children[1].children[0].children[2].children[9].children[1].id = model + "_Material_" + i;
						Technical.children[0].children[1].children[0].children[2].children[10].children[1].id = model + "_BucketMaterial_" + i;
						Technical.children[0].children[1].children[0].children[2].children[11].children[1].id = model + "_Motor_" + i;
						Technical.children[0].children[1].children[0].children[2].children[12].children[1].id = model + "_Reductor_" + i;

						Technical.children[0].children[1].children[1].children[0].children[0].id = "modelImageElevator_" + i;
						Technical.children[0].children[1].children[1].children[2].children[0].id = model + "_Complect_" + i;
						Technical.children[0].children[1].children[1].children[2].children[1].children[1].id = model + "_Explosion_" + i;
						Technical.children[0].children[1].children[1].children[2].children[2].children[1].id = model + "_SuctionConnect_" + i;
						Technical.children[0].children[1].children[1].children[2].children[3].children[1].id = model + "_WindowB_" + i;
						Technical.children[0].children[1].children[1].children[3].children[0].children[1].id = model + "_Converter_" + i;
						Technical.children[0].children[1].children[1].children[3].children[1].children[1].id = model + "_ControlBox_" + i;
						Technical.children[0].children[1].children[1].children[3].children[2].children[1].id = model + "_Backward_" + i;
						Technical.children[0].children[1].children[1].children[3].children[3].children[1].id = model + "_SpeedSensor_" + i;
						Technical.children[0].children[1].children[1].children[3].children[4].children[1].id = model + "_TapeSensor_" + i;
						Technical.children[0].children[1].children[1].children[3].children[5].children[1].id = model + "_SupportSensorTop_" + i;
						Technical.children[0].children[1].children[1].children[3].children[6].children[1].id = model + "_SupportSensorBot_" + i;
						Technical.children[0].children[1].children[1].children[3].children[7].children[1].id = model + "_StreetFulfillment_" + i;
						Technical.children[0].children[1].children[1].children[3].children[8].children[1].id = model + "_DrillInBelt_" + i;
						Technical.children[0].children[1].children[1].children[4].children[0].id = model + "_Metall_" + i;
						Technical.children[0].children[1].children[1].children[4].children[1].children[1].id = model + "_MetallSection_" + i;
						Technical.children[0].children[1].children[1].children[4].children[2].children[1].id = model + "_MetallOther_" + i;
						
						Size.children[0].children[1].id = model + "_ModelDrawing_" + i;				
						Size.children[0].children[2].id = model + "_SizeBlock_" + i;
						Size.children[0].children[2].children[1].children[1].id = model + "_HeightMain_" + i;
						Size.children[0].children[2].children[2].children[1].id = model + "_HeightTransport_" + i;
						break;
					case"CSCC":
						Technical.children[0].children[0].children[1].id = model + "_ModelName_" + i;
						Technical.children[0].children[1].children[0].id = model + "_Technic_" + i;
						Technical.children[0].children[1].children[0].children[2].children[1].children[1].id = model + "_Capacity_" + i;
						Technical.children[0].children[1].children[0].children[2].children[2].children[1].id = model + "_CapacityProduct_" + i;
						Technical.children[0].children[1].children[0].children[2].children[3].children[1].id = model + "_TransportLength_" + i;
						Technical.children[0].children[1].children[0].children[2].children[4].children[1].id = model + "_length_" + i;
						Technical.children[0].children[1].children[0].children[2].children[5].children[1].id = model + "_BeltSpeed_" + i;
						Technical.children[0].children[1].children[0].children[2].children[6].children[1].id = model + "_ScraperStep_" + i;
						Technical.children[0].children[1].children[0].children[2].children[7].children[1].id = model + "_DrumStep_" + i;
						Technical.children[0].children[1].children[0].children[2].children[8].children[1].id = model + "_Material_" + i;
						Technical.children[0].children[1].children[0].children[2].children[9].children[1].id = model + "_ScraperMaterial_" + i;
						Technical.children[0].children[1].children[0].children[2].children[10].children[1].id = model + "_Motor_" + i;
						Technical.children[0].children[1].children[0].children[2].children[11].children[1].id = model + "_Reductor_" + i;

						Technical.children[0].children[1].children[1].children[0].children[0].id = "modelImage_" + model + '_' + i;
						Technical.children[0].children[1].children[1].children[2].children[0].id = model + "_Complect_" + i;
						Technical.children[0].children[1].children[1].children[2].children[1].children[1].id = model + "_SuctionConnect_" + i;
						Technical.children[0].children[1].children[1].children[2].children[2].children[1].id = model + "_Window_" + i;
						Technical.children[0].children[1].children[1].children[3].children[0].children[1].id = model + "_Converter_" + i;
						Technical.children[0].children[1].children[1].children[3].children[1].children[1].id = model + "_ControlBox_" + i;
						Technical.children[0].children[1].children[1].children[3].children[2].children[1].id = model + "_SpeedSensor_" + i;
						Technical.children[0].children[1].children[1].children[3].children[3].children[1].id = model + "_SupportSensorTop_" + i;
						Technical.children[0].children[1].children[1].children[3].children[4].children[1].id = model + "_Backload_" + i;
						Technical.children[0].children[1].children[1].children[3].children[5].children[1].id = model + "_DoubleSideBackload_" + i;
						Technical.children[0].children[1].children[1].children[3].children[6].children[1].id = model + "_Vertical_" + i;
						Technical.children[0].children[1].children[1].children[3].children[7].children[1].id = model + "_StreetFulfillment_" + i;

						Technical.children[0].children[1].children[1].children[4].children[0].id = model + "_Metall_" + i;
						Technical.children[0].children[1].children[1].children[4].children[1].children[1].id = model + "_bodyT_" + i;
						Technical.children[0].children[1].children[1].children[4].children[2].children[1].id = model + "_capT_" + i;
						Technical.children[0].children[1].children[1].children[4].children[3].children[1].id = model + "_liningT_" + i;
						
						Size.children[0].children[1].id = model + "_ModelDrawing_" + i;				
						Size.children[0].children[2].id = model + "_SizeBlock_" + i;
						Size.children[0].children[2].children[1].children[1].id = model + "_lengthAxis_" + i;
						Size.children[0].children[2].children[2].children[1].id = model + "_lengthMain_" + i;
						Size.children[0].children[2].children[3].children[1].id = model + "_lengthTransport_" + i;
						break;
				}
				
			}
			break;
		case "8":
			CUBER_page.style.display = 'none';
			break;
		case "11":
			prepareDeliveryBlock();
			break;
	}		
	CalculationSum();
	autoPageNumber();
	//Удаление элемента из Списка КП
	ComercialOfferElements.splice(idRemove-1, 1);
	ComercialOfferElementIDs.splice(idRemove-1, 1);
}
function returnDeletedPriceRow(idRow, selectorType){
	return function e(){
		deleteSinglePriceRow(idRow, selectorType); 
	} 	
}
function clearEventListener(element) {
	const clonedElement = element.cloneNode(true);
    element.replaceWith(clonedElement);
    return clonedElement;
}
function chimg(){
	var targetElevator = Model[calcElevator.value].Model;
	var targetLotok = calcLotok.value;	
	for (var i = 0; i < Main.length; i++){
		if (targetElevator == Main[i].Model && targetLotok == Main[i].modelNumber){
			var idRow = Number(priceModelBlock.children.length - 1);
			document.getElementById("rowImageApparat_" + idRow).style = "background:url(/static/img/kpApparatus/" + Main[i].imageName + ") center center no-repeat; background-size: contain;";
				
		}
	}
}
function chimgElevator(){
	var idRow = Number(priceModelBlock.children.length - 1);
	switch(ElevatorType){
		case'CSZE':
			document.getElementById("rowImageApparat_" + idRow).style = "background:url(/static/img/kpApparatus/z-icon.jpg) center center no-repeat; background-size: contain;";
			break;
		case'CSE':
			document.getElementById("rowImageApparat_" + idRow).style = "background:url(/static/img/kpApparatus/noria-icon.jpg) center center no-repeat; background-size: contain;"
			break;
		case'CSCC':
			document.getElementById("rowImageApparat_" + idRow).style = "background:url(/static/img/kpApparatus/cscc-icon.jpg) center center no-repeat; background-size: contain;"
			break;
	}
}
//ПОДСЧЕТ ЦЕН
function CalculatePrice(id){
	var selectRegion = language == "RU" ? headerTooltip.children[6].children[0].children[0].value : headerTooltip.children[6].children[1].children[0].value;
	var selectDiscount = headerTooltip.children[7].children[0].value;
	document.getElementById('sum_' + id).value = document.getElementById('count_'+ id).value * document.getElementById('price_'+ id).value;
	document.getElementById('discountSum_'+ id).value = selectDiscount == "0" ? document.getElementById('sum_'+ id).value - document.getElementById('discountValue_'+ id).value : document.getElementById('sum_'+ id).value - (document.getElementById('sum_'+ id).value / 100 * document.getElementById('discountValue_'+ id).value);
	document.getElementById('nds_'+ id).value = selectRegion == "0" ? document.getElementById('discountSum_'+ id).value/120*20 : "0.00";
	document.getElementById('discountValue_'+ id).value = document.getElementById('discountValue_'+ id).value;
	
	document.getElementById('sum_' + id).value = Number(document.getElementById('sum_' + id).value).toFixed(2);
	document.getElementById('discountSum_' + id).value = Number(document.getElementById('discountSum_' + id).value).toFixed(2);
	document.getElementById('nds_' + id).value = Number(document.getElementById('nds_' + id).value).toFixed(2);
	document.getElementById('discountValue_' + id).value = Number(document.getElementById('discountValue_' + id).value).toFixed(2);
}
function CalculationSum(){
	var sum = 0;
	var discountSum = 0;
	var discountValue = 0;
	var nds = 0;
	var selectDiscount = headerTooltip.children[7].children[0].value;

	for (var i = 1; i< priceModelBlock.children.length; i++){
		sum += parseFloat(document.getElementById('sum_' + i).value);
		discountSum += parseFloat(document.getElementById('discountSum_' + i).value);
		discountValue += selectDiscount == "0" ? parseFloat(document.getElementById('discountValue_' + i).value) : Number(document.getElementById('sum_'+ i).value) / 100 * Number(document.getElementById('discountValue_'+ i).value);
		nds += parseFloat(document.getElementById('nds_' + i).value);
	}

	document.getElementById('sumTotal').value = Number(sum).toFixed(2);
	document.getElementById('discountSumTotal').value = Number(discountSum).toFixed(2);
	document.getElementById('discountValueTotal').value = (selectDiscount == "0" || discountValue == 0)? Number(discountValue).toFixed(2) : Number(discountValue / (sum / 100)).toFixed(2);

	document.getElementById('ndsTotal').value = Number(nds).toFixed(2);
}
function ReturnCalculatePrice(id){
	return function(e){
		CalculatePrice(id);
		CalculationSum();
		updateComercialOfferElement(id);
	}	
}
//НАСТРОЙКА СТРАНИЦ КОМПРЕССОРОВ
		//выгрузка данных для страницы компрессора
function updateCompressorData(){
	var compressor = genesisProvider.value;
	var model = GenesisModel.value;
	var motor = GenesisMotor.value;
	GENESIS_name.textContent = compressor + model;
	GENESIS_Power.textContent = motor;

	for(var i = 0; i < Kompressor.length; i++){
		if(motor == Kompressor[i].compressorEnginePower){
			compressorVolume.children[1].textContent = Kompressor[i].compressorVolume;
			compressorCapacity.children[1].textContent = Kompressor[i].compressorCapacity;		
			compressorPressure.children[1].textContent = Kompressor[i].compressorPressure;
			compressorEnginePower.children[1].textContent =	Kompressor[i].compressorEnginePower;			
			compressorVoltage.children[1].textContent =	Kompressor[i].compressorVoltage;		
			compressorHz.children[1].textContent = Kompressor[i].compressorHz;	
			compressorPhase.children[1].textContent =	Kompressor[i].compressorPhase;
			compressorMass.children[1].textContent = Kompressor[i].compressorMass;			
			desiccant.children[1].textContent =	Kompressor[i].desiccant;//тут по идее тринарный			
			filter.children[1].textContent = Kompressor[i].filter;//тут по идее тринарный
			ressiver.children[1].textContent =	Kompressor[i].ressiver;//тут по идее тринарный
		}
	}
}
		//формирование страницы-клона нового компрессора
function createCompressorNew(page_id){
	var page = CompressorPage_Param_MainBlock.children[0].cloneNode(true);
	var space = CompressorPage_Param_MainBlock.children[1].cloneNode(true);
	var idRow = Number(CompressorPage_Param_MainBlock.children.length/2);

	page.setAttribute("name", "page_" + page_id);
	space.setAttribute("name", "space_" + page_id);

	page.id = "CompressorPage_Param_" + idRow;
	page.style.display = "";
	space.style.display = "";
	space.id = "spaceComp_" + idRow;	
	page.children[0].children[0].children[1].children[0].id = "GENESIS_Title_" + idRow; 
					//это весь основной контент (modelSettings) не считая pageBottomBlock											
	page.children[0].children[1].children[0].children[0].children[0].children[0].children[0].id = "infoTitle_" + idRow;
	page.children[0].children[1].children[0].children[0].children[0].children[1].id = "compressorDescription_" + idRow;
	page.children[0].children[1].children[0].children[2].children[0].children[0].id = "description_seria_" + idRow;
	page.children[0].children[1].children[0].children[2].children[0].children[1].id = "settingsOption_" + idRow;
									//второй setting column
	page.children[0].children[1].children[1].children[0].children[0].id = "compressorImg_" + idRow;											
	page.children[0].children[1].children[1].children[2].children[0].children[1].id = "compressorVolume_" + idRow;											
	page.children[0].children[1].children[1].children[2].children[1].children[1].id = "compressorCapacity_" + idRow;											
	page.children[0].children[1].children[1].children[2].children[2].children[1].id = "compressorPressure_" + idRow;											
	page.children[0].children[1].children[1].children[2].children[3].children[1].id = "compressorEnginePower_" + idRow;											
	page.children[0].children[1].children[1].children[2].children[4].children[1].id = "compressorVoltage_" + idRow;											
	page.children[0].children[1].children[1].children[2].children[5].children[1].id = "compressorHz_" + idRow;											
	page.children[0].children[1].children[1].children[2].children[6].children[1].id = "compressorPhase_" + idRow;											
	page.children[0].children[1].children[1].children[2].children[7].children[1].id = "compressorMass_" + idRow;											
	page.children[0].children[1].children[1].children[2].children[8].children[1].id = "desiccant_" + idRow;											
	page.children[0].children[1].children[1].children[2].children[9].children[1].id = "filter_" + idRow;											
	page.children[0].children[1].children[1].children[2].children[10].children[1].id = "ressiver_" + idRow;
								//это втрой settingsColumn
		
	CompressorPage_Param_MainBlock.appendChild(page);
	CompressorPage_Param_MainBlock.appendChild(space);

	updateCloneApparatusDataComp(idRow);
	autoPageNumber();
}
		//выгрузка данных для страницы-клона компрессора
function updateCloneApparatusDataComp(idNumber){	
	var targetMotor = GenesisMotor.value;
	var targetName = genesisProvider.value + " " + GenesisModel.value;
	var __kompressor = findKompressor();
	
	document.getElementById("GENESIS_Title_" + idNumber).textContent = document.getElementById("componentName_" + Number(priceModelBlock.children.length-1)).textContent;
	document.getElementById("compressorImg_" + idNumber).style = "background:url(/static/img/kpApparatus/" + __kompressor.imageName + ") center center no-repeat; background-size: contain;";
	
	for (var i = 0; i < Kompressor.length; i++){
		if (targetMotor == Kompressor[i].compressorEnginePower && targetName.split(" ")[0] == Kompressor[i].compressorManufacturer){
			document.getElementById("compressorVolume_" + idNumber).children[1].textContent = Kompressor[i].compressorVolume;
			document.getElementById("compressorCapacity_" + idNumber).children[1].textContent = Kompressor[i].compressorCapacity;
			document.getElementById("compressorPressure_" + idNumber).children[1].textContent = Kompressor[i].compressorPressure;
			document.getElementById("compressorEnginePower_" + idNumber).children[1].textContent = Kompressor[i].compressorEnginePower;
			document.getElementById("compressorVoltage_" + idNumber).children[1].textContent = Kompressor[i].compressorVoltage;
			document.getElementById("compressorHz_" + idNumber).children[1].textContent = Kompressor[i].compressorHz;
			document.getElementById("compressorPhase_" + idNumber).children[1].textContent = Kompressor[i].compressorPhase;
			document.getElementById("compressorMass_" + idNumber).children[1].textContent = Kompressor[i].compressorMass;
			document.getElementById("desiccant_" + idNumber).children[1].textContent = Kompressor[i].desiccant;
			document.getElementById("filter_" + idNumber).children[1].textContent = Kompressor[i].filter;
			document.getElementById("ressiver_" + idNumber).children[1].textContent = Kompressor[i].ressiver;			
		}
	}
	for (var i = 0; i < KompressorType.length; i++){
		if(targetName == KompressorType[i].compressor +' ' + KompressorType[i].seria){
			document.getElementById("infoTitle_" + idNumber).textContent = KompressorType[i].infoTitle;
			document.getElementById("compressorDescription_" + idNumber).textContent = KompressorType[i].description;
			document.getElementById("description_seria_" + idNumber).textContent = KompressorType[i].description_seria;
			document.getElementById("settingsOption_" + idNumber).children[0].children[1].textContent = KompressorType[i].option.split(';')[0];
			document.getElementById("settingsOption_" + idNumber).children[1].children[1].textContent = KompressorType[i].option.split(';')[1];
			document.getElementById("settingsOption_" + idNumber).children[2].children[1].textContent = KompressorType[i].option.split(';')[2];
			document.getElementById("settingsOption_" + idNumber).children[3].children[1].textContent = KompressorType[i].option.split(';')[3];
			document.getElementById("settingsOption_" + idNumber).children[4].children[1].textContent = KompressorType[i].option.split(';')[4];
			document.getElementById("settingsOption_" + idNumber).children[5].children[1].textContent = KompressorType[i].option.split(';')[5];			
		}
		if(targetName.split(' ')[0] == 'Comaro'){
			document.getElementById("settingsOption_" + idNumber).children[4].style.display = 'none';
			document.getElementById("settingsOption_" + idNumber).children[5].style.display = 'none';
		}
		else{
			document.getElementById("settingsOption_" + idNumber).children[4].style.display = 'flex';
			document.getElementById("settingsOption_" + idNumber).children[5].style.display = 'flex';
		}
	}
}
//Формирование страницы колона Протокола
function createProtocolNew(page_id){
	var protoclClone = ProtocolPages.cloneNode(true);
	var protocolMainPage = protoclClone.children[0];
	var protocolSchemePage = protoclClone.children[2];
	var space = protoclClone.children[1];
	var space2 = protoclClone.children[3];
	
	var idRow = Number(ProtocolPage_Param_Main_Block.children.length);
	
	protoclClone.setAttribute("name", "page_" + page_id);
	protoclClone.id = "ProtocolPages_" + idRow;
	protoclClone.style.display = "";
	protocolMainPage.style.display = "";
	protocolSchemePage.style.display = "";
	space.style.display = "";
	space2.style.display = "";
	
	protocolMainPage.children[0].children[0].children[1].children[1].id = "protocolNumber_" + idRow; //Номер протокола
	protocolMainPage.children[0].children[0].children[2].id = "titleTable_" + idRow; //Основная информация по протоколу
	
	//fractionBlock
	protocolMainPage.children[0].children[1].children[0].children[2].id = "componentTitles_" + idRow; //componentTitles
	protocolMainPage.children[0].children[1].children[1].id = "sourceColumn_" + idRow;	//sourceColumn
	protocolMainPage.children[0].children[1].children[2].id = "fractionColumn_1_" + idRow;	//fractionColumn_1
	protocolMainPage.children[0].children[1].children[3].id = "fractionColumn_2_" + idRow;	//fractionColumn_2
	protocolMainPage.children[0].children[1].children[4].id = "fractionColumn_3_" + idRow;	//fractionColumn_3
	protocolMainPage.children[0].children[1].children[5].id = "fractionColumn_4_" + idRow;	//fractionColumn_4
	
	//sorting_diagram
	protocolSchemePage.children[0].children[2].id = "sorting_diagram_" + idRow;
	
	ProtocolPage_Param_Main_Block.appendChild(protoclClone);
	
	loadProtocolParametrs(idRow);
	autoPageNumber();
}
function loadProtocolParametrs(idNumber){
	//Загрузка заголовков
	document.getElementById("protocolNumber_" + idNumber).textContent = protocol.id_requirements + "_" + protocol.id_protocol;
	var titleTable = document.getElementById("titleTable_" + idNumber);
	titleTable.children[0].children[1].textContent = protocol.company_name != "" ? protocol.company_name : "не установлено";
	titleTable.children[1].children[1].textContent = protocol.sourceProduct.name;
	titleTable.children[4].children[1].textContent = protocol.create_date;
	try{	
		titleTable.children[2].children[1].textContent = search_user_info(protocol.id_creater).name;
	}
	catch{
		titleTable.children[2].children[1].textContent = "не установлено";
	}
	try{	
		titleTable.children[3].children[1].textContent = search_user_info(protocol.id_responsible).name
	}
	catch{
		titleTable.children[3].children[1].textContent = "не установлено";
	}
	try {
		titleTable.children[5].children[1].textContent = list_machine[protocol.equipment_machine].machineName + " " + list_configuration[protocol.configuration].configuration;
	}
	catch (error){
		if(error.machineName == undefined)
			titleTable.children[5].children[1].textContent = "не определено";
		else if(error.configuration == undefined)
			titleTable.children[5].children[1].textContent = list_machine[protocol.equipment_machine].machineName + " не установлено";
	}
	//Основные данные по исходному продукту
	var sourceProductImage = document.getElementById("sourceColumn_" + idNumber).children[0].children[0];
	var sourceProductTitle = document.getElementById("sourceColumn_" + idNumber).children[1].children[0];
	var sourceProductTitleDescription = document.getElementById("sourceColumn_" + idNumber).children[1].children[1];

	var sourceProductPurity = document.getElementById("sourceColumn_" + idNumber).children[2].children[0].children[0].children[0];
	var sourceProductExit = document.getElementById("sourceColumn_" + idNumber).children[2].children[1].children[0].children[0];
	var sourceProductCapacity = document.getElementById("sourceColumn_" + idNumber).children[2].children[2].children[0].children[0];
	
	var requirementsSourceProductPurity = document.getElementById("sourceColumn_" + idNumber).children[2].children[0].children[1].children[0];
	var requirementsSourceProductExit = document.getElementById("sourceColumn_" + idNumber).children[2].children[1].children[1].children[0];
	var requirementsSourceProductCapacity = document.getElementById("sourceColumn_" + idNumber).children[2].children[2].children[1].children[0];
	
	var inboxName = checkInboxFraction(protocol.sorting[0].inbox_fraction);
	
	//Заполнение данных
	sourceProductImage.style.backgroundImage = "url('"+protocol.sourceProduct.image+"')";
	sourceProductTitle.textContent = "Исходный продукт";
	
	//Исходные данные протокола
	sourceProductPurity.textContent = protocol.sourceProduct.purity;
	sourceProductExit.textContent = protocol.sourceProduct.exit;
	sourceProductCapacity.textContent = Number(returnSortingFractionCapacity(inboxName)).toFixed(3);
	//Исходные данные требований
	requirementsSourceProductPurity.textContent = requirements.purity;
	requirementsSourceProductExit.textContent = requirements.exit;
	requirementsSourceProductCapacity.textContent = requirements.capacity;
	//Востановка цвета
	requirementsSourceProductPurity.style.color = "gray";
	requirementsSourceProductExit.style.color = "gray";
	requirementsSourceProductCapacity.style.color = "gray";
	
	
	//Основные данные по компоненту исходного продука
	for(var i = 0; i < protocol.sourceProduct.components.length; i++){
		var sourceProductComponentsTitle = document.getElementById("componentTitles_"+idNumber).children[i];
		var sourceProductComponentsValue = document.getElementById("sourceColumn_" + idNumber).children[3].children[i];
		
		//Отображение блока
		sourceProductComponentsTitle.style.display = "flex";
		sourceProductComponentsValue.style.display = "flex";
		//Разбиение имени и описания
		var product_description = protocol.sourceProduct.components[i].product_name.split("(");
		if(product_description.length > 1)
			product_description[1] = "("+product_description[1];
		else
			product_description[1] = "";
		
		//Запись данных	протокола
		sourceProductComponentsTitle.children[0].children[0].style.backgroundImage = "url('"+protocol.sourceProduct.components[i].image+"')";
		sourceProductComponentsTitle.children[1].children[0].textContent = product_description[0];
		sourceProductComponentsTitle.children[1].children[1].textContent = product_description[1];
		sourceProductComponentsValue.children[0].children[0].textContent = protocol.sourceProduct.components[i].value;
		sourceProductComponentsValue.children[0].children[1].style.display = protocol.sourceProduct.components[i].flag_1 ? "flex" : "none";
		sourceProductComponentsValue.children[1].children[1].style.display = protocol.sourceProduct.components[i].flag_2 ? "none" : "flex";
		//Запис данных требований
		for(var j = 0; j < requirements.components.length; j++){
			if(protocol.sourceProduct.components[i].product_name == requirements.components[j].product_name){
				sourceProductComponentsValue.children[1].children[0].textContent = requirements.components[j].value;
				sourceProductComponentsValue.children[1].children[0].style.color = "gray";
				break;
			}
			else{
				sourceProductComponentsValue.children[1].children[0].textContent = "-";
				sourceProductComponentsValue.children[1].children[0].style.color = "gray";
			}
		}
	}
	//Данные по фракциям
	var colum_id = 1;
	for(var i = 0; i < protocol.sorting.length; i++){
		if(protocol.sorting[i].accept_name_id != 0){
			//Данные для фракций проход
			var acceptColums = document.getElementById("fractionColumn_"+colum_id+"_"+idNumber);
		
			var acceptElementImage = acceptColums.children[0].children[0];
			var acceptElementTitle = acceptColums.children[1].children[0];
			var acceptElementTitleDescription = acceptColums.children[1].children[1];
			
			var acceptMainValue = document.getElementById("fractionColumn_"+colum_id+"_"+idNumber).children[2];
			var acceptElementPurity = acceptMainValue.children[0].children[0].children[0];
			var acceptElementExit = acceptMainValue.children[1].children[0].children[0];
			var acceptElementCapacity = acceptMainValue.children[2].children[0].children[0];
			
			var requirementsAcceptElementPurity = acceptMainValue.children[0].children[1].children[0];
			var requirementsAcceptElementExit = acceptMainValue.children[1].children[1].children[0];
			var requirementsAcceptElementCapacity = acceptMainValue.children[2].children[1].children[0];
			
			//Заполнение данных прохода
			acceptElementImage.style.backgroundImage = "url('"+protocol.sorting[i].accept_img+"')";
			acceptElementTitle.textContent = protocol.sorting[i].accept_name
			//acceptElementTitleDescription.textContent = "";
			
			acceptElementPurity.textContent = protocol.sorting[i].accept_purity;
			acceptElementExit.textContent = Number(protocol.sorting[i].accept_mass / protocol.sorting[0].capacity * 100).toFixed(3);
			acceptElementCapacity.textContent = protocol.sorting[i].accept_mass;
			
			//Данные из требований
			var id = Number(protocol.sorting[i].accept_name_id);
			requirementsAcceptElementPurity.textContent = requirements.fractions[id-1].purity;
			requirementsAcceptElementExit.textContent = requirements.fractions[id-1].exit;
			requirementsAcceptElementCapacity.textContent = requirements.fractions[id-1].capacity;
			
			acceptColums.style.display = "flex";
			
			for(var k = 0; k < protocol.sourceProduct.components.length; k++){
				var acceptComponents = document.getElementById("fractionColumn_"+colum_id+"_"+idNumber).children[3];
				acceptComponents.children[k].children[0].children[0].textContent = protocol.sorting[i].accept_components[k].value;
				acceptComponents.children[k].children[0].children[0].style.color = protocol.sorting[i].accept_components[k].flag_2 ? "red" : "black";
				acceptComponents.children[k].children[0].children[1].style.display = protocol.sorting[i].accept_components[k].flag_1 ? "flex" : "none";

				//Данные из требований
				if(checkComponentName(protocol.sourceProduct.components[k].product_name)[0]){
					var id_product = checkComponentName(protocol.sourceProduct.components[k].product_name)[1];
					acceptComponents.children[k].children[1].children[0].textContent =  requirements.fractions[id-1].components[id_product].value;
					acceptComponents.children[k].children[1].children[0].style.color =  requirements.fractions[id-1].components[id_product].flag_2 ? "red" : "gray";
				}
				else{
					acceptComponents.children[k].children[1].children[0].textContent = "-";
				}
				
				acceptComponents.children[k].style.display = "flex";
				
			}
			
			colum_id++;
		}
		if(protocol.sorting[i].reject_name_id != 0){
			var rejectColums = document.getElementById("fractionColumn_"+colum_id+"_"+idNumber);
		
			var rejectElementImage = rejectColums.children[0].children[0];
			var rejectElementTitle = rejectColums.children[1].children[0];
			var rejectElementTitleDescription = rejectColums.children[1].children[1];
			
			var rejectMainValue = document.getElementById("fractionColumn_"+colum_id+"_"+idNumber).children[2];
			var rejectElementPurity = rejectMainValue.children[0].children[0].children[0];
			var rejectElementExit = rejectMainValue.children[1].children[0].children[0];
			var rejectElementCapacity = rejectMainValue.children[2].children[0].children[0];
			
			var requirementsRejectElementPurity = rejectMainValue.children[0].children[1].children[0];
			var requirementsRejectElementExit = rejectMainValue.children[1].children[1].children[0];
			var requirementsRejectElementCapacity = rejectMainValue.children[2].children[1].children[0];
			
			//Заполнение данных отбоя
			rejectElementImage.style.backgroundImage = "url('"+protocol.sorting[i].reject_img+"')";
			rejectElementTitle.textContent = protocol.sorting[i].reject_name
			//rejectElementTitleDescription.textContent = "";
			
			rejectElementPurity.textContent = protocol.sorting[i].reject_purity;
			rejectElementExit.textContent = Number(protocol.sorting[i].reject_mass / protocol.sorting[0].capacity * 100).toFixed(3);
			rejectElementCapacity.textContent = protocol.sorting[i].reject_mass;
			
			//Данные из требований
			var id = Number(protocol.sorting[i].reject_name_id);
			requirementsRejectElementPurity.textContent = requirements.fractions[id-1].purity;
			requirementsRejectElementExit.textContent = requirements.fractions[id-1].exit;
			requirementsRejectElementCapacity.textContent = requirements.fractions[id-1].capacity;
			
			rejectColums.style.display = "flex";
			
			for(var k = 0; k < protocol.sourceProduct.components.length; k++){
				var rejectComponents = document.getElementById("fractionColumn_"+colum_id+"_"+idNumber).children[3];
				rejectComponents.children[k].children[0].children[0].textContent = protocol.sorting[i].reject_components[k].value;
				rejectComponents.children[k].children[0].children[0].style.color = protocol.sorting[i].reject_components[k].flag_2 ? "red" : "black";
				rejectComponents.children[k].children[0].children[1].style.display = protocol.sorting[i].reject_components[k].flag_1 ? "flex" : "none";
				
				//Данные из требований
				if(checkComponentName(protocol.sourceProduct.components[k].product_name)[0]){
					var id_product = checkComponentName(protocol.sourceProduct.components[k].product_name)[1];
					rejectComponents.children[k].children[1].children[0].textContent =  requirements.fractions[id-1].components[id_product].value;
					rejectComponents.children[k].children[1].children[0].style.color =  requirements.fractions[id-1].components[id_product].flag_2 ? "red" : "gray";
				}
				else{
					rejectComponents.children[k].children[1].children[0].textContent = "-";
				}
				
				rejectComponents.children[k].style.display = "flex";
			}
			colum_id++;;
		}
	}
	//Данные по схеме сортировки
	for(var i = 1; i <= protocol.sorting.length; i++){
		//Создание строки для описания процесса сортировки
		var clone = document.getElementById("sorting_diagram_"+idNumber).children[0].cloneNode(true);
		var rowID = i < 9 ? "0"+i : i; 
		//Ячейки строки
		var rowName = clone.children[0].children[0];
		var inboxFractionBlock = clone.children[1];
		var inboxFractionName = clone.children[1].children[0];
		var capacityTray = clone.children[2].children[0];
		var numberTray = clone.children[3].children[0];
		var acceptOutboxFraction = clone.children[4].children[0];
		var rejectOutboxFraction = clone.children[4].children[1];
		var acceptExit = clone.children[5].children[0];
		var rejectExit = clone.children[5].children[1];
		var acceptPurity = clone.children[6].children[0];
		var rejectPurity = clone.children[6].children[1];
		var acceptFinalFraction = clone.children[7].children[0];
		var rejectFinalFraction = clone.children[7].children[1];
		
		var inboxName = checkInboxFraction(protocol.sorting[i-1].inbox_fraction);
		//Заполнение ячеек сортировки (без входящих фракции)
		rowName.textContent = rowID;
		capacityTray.textContent = Number(protocol.sorting[i-1].capacity / 1000).toFixed(3);
		numberTray.textContent = protocol.sorting[i-1].trays_number;
		acceptOutboxFraction.textContent = "Проход " + rowID;
		rejectOutboxFraction.textContent = "Отбой " + rowID;
		acceptExit.textContent = Number(protocol.sorting[i-1].accept_mass / 1000).toFixed(3); 
		rejectExit.textContent = Number(protocol.sorting[i-1].reject_mass / 1000).toFixed(3); 
		acceptPurity.textContent = protocol.sorting[i-1].accept_purity; 
		rejectPurity.textContent = protocol.sorting[i-1].reject_purity; 
		acceptFinalFraction.textContent = protocol.sorting[i-1].accept_name_id != 0 ? protocol.sorting[i-1].accept_name : "-"; 
		rejectFinalFraction.textContent = protocol.sorting[i-1].reject_name_id != 0 ? protocol.sorting[i-1].reject_name : "-"; 
		
		document.getElementById("sorting_diagram_"+idNumber).appendChild(clone);
		
		//заполнение ячеек входящих фракций
		for(var j = 0; j < inboxName.length; j++){
			var cloneFractionName = inboxFractionName.cloneNode(true);
			cloneFractionName.textContent = inboxName[j];
			cloneFractionName.style.display = "";
			inboxFractionBlock.appendChild(cloneFractionName);
		}
		
		clone.style.display = "flex";
	}
}
//формирование страницы-клона нового CSZE
function createCSZENew(page_id){
	var pageTechnical = ElevatorPage_Param_MainBlock.children[0].children[0].cloneNode(true);
	var pageSize = ElevatorPage_Param_MainBlock.children[0].children[2].cloneNode(true);
	var space = ElevatorPage_Param_MainBlock.children[0].children[1].cloneNode(true);
	var space2 = ElevatorPage_Param_MainBlock.children[0].children[3].cloneNode(true);
	var idRow = Number(ElevatorPage_Param_MainBlock.children.length/2);

	pageTechnical.setAttribute("name", "page_" + page_id);
	pageSize.setAttribute("name", "page_" + page_id);
	space.setAttribute("name", "space_" + page_id);
	space2.setAttribute("name", "space_" + page_id);

	pageTechnical.id = "CSZE_Technical_" + idRow;
	pageSize.id = "CSZE_Size_" + idRow;
	pageTechnical.style.display = "";
	pageSize.style.display = "";
	space.id = "space_CSZE_" + idRow;	
	space2.id = "space_CSZE2_" + idRow;
	space.style.display = "";	
	space2.style.display = "";	
	
	pageTechnical.children[0].children[0].children[1].id = "CSZE_ModelName_" + idRow;
								//это весь основной контент (modelSettings) не считая pageBottomBlock
											//это 1 settingsColumn											
	pageTechnical.children[0].children[1].children[0].id = "CSZE_Technic_" + idRow;
	pageTechnical.children[0].children[1].children[0].children[2].children[1].children[1].id = "CSZE_Capacity_" + idRow;											
	pageTechnical.children[0].children[1].children[0].children[2].children[2].children[1].id = "CSZE_CapacityProduct_" + idRow;											
	pageTechnical.children[0].children[1].children[0].children[2].children[3].children[1].id = "CSZE_Height_" + idRow;											
	pageTechnical.children[0].children[1].children[0].children[2].children[4].children[1].id = "CSZE_LengthTotal_" + idRow;											
	pageTechnical.children[0].children[1].children[0].children[2].children[5].children[1].id = "CSZE_LengthTop_" + idRow;											
	pageTechnical.children[0].children[1].children[0].children[2].children[6].children[1].id = "CSZE_LengthBottom_" + idRow;											
	pageTechnical.children[0].children[1].children[0].children[2].children[7].children[1].id = "CSZE_ChainSpeed_" + idRow;											
	pageTechnical.children[0].children[1].children[0].children[2].children[8].children[1].id = "CSZE_BucketVolume_" + idRow;											
	pageTechnical.children[0].children[1].children[0].children[2].children[9].children[1].id = "CSZE_Diametr_" + idRow;											
	pageTechnical.children[0].children[1].children[0].children[2].children[10].children[1].id = "CSZE_Turn_" + idRow;											
	pageTechnical.children[0].children[1].children[0].children[2].children[11].children[1].id = "CSZE_Power_" + idRow;
	pageTechnical.children[0].children[1].children[0].children[2].children[12].children[1].id = "CSZE_Material_" + idRow;
	pageTechnical.children[0].children[1].children[0].children[2].children[13].children[1].id = "CSZE_BucketMaterial_" + idRow;
	pageTechnical.children[0].children[1].children[0].children[2].children[14].children[1].id = "CSZE_Motor_" + idRow;
	pageTechnical.children[0].children[1].children[0].children[2].children[15].children[1].id = "CSZE_Reductor_" + idRow;
											//это втрой settingsColumn
	pageTechnical.children[0].children[1].children[1].children[0].children[0].id = "CSZE_ModelImage_" + idRow;
	pageTechnical.children[0].children[1].children[1].children[2].children[0].id = "CSZE_Complect_" + idRow;
	pageTechnical.children[0].children[1].children[1].children[2].children[1].children[1].id = "CSZE_Window_" + idRow;
	pageTechnical.children[0].children[1].children[1].children[2].children[2].children[1].id = "CSZE_Hatches_" + idRow;
	pageTechnical.children[0].children[1].children[1].children[2].children[3].children[1].id = "CSZE_LoadUnload_" + idRow;
	pageTechnical.children[0].children[1].children[1].children[3].children[0].children[1].id = "CSZE_Converter_" + idRow;
	pageTechnical.children[0].children[1].children[1].children[3].children[1].children[1].id = "CSZE_ControlBox_" + idRow;
	pageTechnical.children[0].children[1].children[1].children[3].children[2].children[1].id = "CSZE_Backward_" + idRow;
	pageTechnical.children[0].children[1].children[1].children[3].children[3].children[1].id = "CSZE_Sensor_" + idRow;
	pageTechnical.children[0].children[1].children[1].children[3].children[4].children[1].id = "CSZE_ChainSensor_" + idRow;
	pageTechnical.children[0].children[1].children[1].children[3].children[5].children[1].id = "CSZE_AddLoad_" + idRow;
	pageTechnical.children[0].children[1].children[1].children[3].children[6].children[1].id = "CSZE_AddUnload_" + idRow;
	pageTechnical.children[0].children[1].children[1].children[3].children[7].children[1].id = "CSZE_StreetFulfillment_" + idRow;
	pageTechnical.children[0].children[1].children[1].children[4].children[0].id = "CSZE_Metall_" + idRow;
	pageTechnical.children[0].children[1].children[1].children[4].children[1].children[1].id = "CSZE_MetallMain_" + idRow;
	pageTechnical.children[0].children[1].children[1].children[4].children[2].children[1].id = "CSZE_MetallOther_" + idRow;

	//pageSize.children[0].children[0].children[1].children[1].children[2].id = "GENESIS_Power_" + idRow;
							//это весь основной контент (2 modelSettings) не считая pageBottomBlock											
	pageSize.children[0].children[1].id = "CSZE_ModelDrawing_" + idRow;
	pageSize.children[0].children[2].id = "CSZE_SizeBlock_" + idRow;
	pageSize.children[0].children[2].children[1].children[1].id = "CSZE_SizeHeight_" + idRow;											
	pageSize.children[0].children[2].children[2].children[1].id = "CSZE_SizeHeightTransport_" + idRow;											
	pageSize.children[0].children[2].children[3].children[1].id = "CSZE_SizeLengthTop_" + idRow;											
	pageSize.children[0].children[2].children[4].children[1].id = "CSZE_SizeLengthBefore_" + idRow;											
	pageSize.children[0].children[2].children[5].children[1].id = "CSZE_SizeLengthBot_" + idRow;											
	pageSize.children[0].children[2].children[6].children[1].id = "CSZE_SizeLenghtUnload_" + idRow;
	pageSize.children[0].children[2].children[7].children[1].id = "CSZE_SizeLenghtTotal_" + idRow;



	ElevatorPage_Param_MainBlock.appendChild(pageTechnical);
	ElevatorPage_Param_MainBlock.appendChild(space);
	ElevatorPage_Param_MainBlock.appendChild(pageSize);
	ElevatorPage_Param_MainBlock.appendChild(space2);

	loadModelCSZE(idRow);
	autoPageNumber();
}
		//выгрузка данных для страницы-клона CSZE
function loadModelCSZE(idNumber){
	var materialText = ModelCSZE.material == "Сталь оцинкованная" ? " В ОЦИНКОВАННОМ" : " В НЕРЖАВЕЮЩЕМ";
	
	document.getElementById("CSZE_ModelName_" + idNumber).innerHTML = "КОНВЕЙЕР ЦЕПНОЙ</br>" + ModelCSZE.modelName + materialText + "</br>ИСПОЛНЕНИИ ";
	document.getElementById("CSZE_Capacity_" + idNumber).children[1].textContent = Number(ModelCSZE.capacity_param.capacity).toFixed(2);
	document.getElementById("CSZE_CapacityProduct_" + idNumber).children[0].textContent = "Прозводительность(" +" " + Product_K[ID_Product].nameProduct + " "+ "), т/ч";
	document.getElementById("CSZE_CapacityProduct_" + idNumber).children[1].textContent = Number(ModelCSZE.capacity_param.capacity * Product_K[ID_Product].K).toFixed(2);
	
	document.getElementById("CSZE_Height_" + idNumber).children[1].textContent = ModelCSZE.modelSize.height;
	document.getElementById("CSZE_LengthTop_" + idNumber).children[1].textContent = ModelCSZE.modelSize.top_length;
	document.getElementById("CSZE_LengthTotal_" + idNumber).children[1].textContent = Number(ModelCSZE.modelSize.height + ModelCSZE.modelSize.top_length + ModelCSZE.modelSize.bottom_length).toFixed(2);
	document.getElementById("CSZE_LengthBottom_" + idNumber).children[1].textContent = ModelCSZE.modelSize.bottom_length;
	document.getElementById("CSZE_ChainSpeed_" + idNumber).children[1].textContent = ModelCSZE.capacity_param.speed;
	document.getElementById("CSZE_BucketVolume_" + idNumber).children[1].textContent = ModelCSZE.capacity_param.bucket;
	document.getElementById("CSZE_Diametr_" + idNumber).children[1].textContent = ModelCSZE.outletSize;
	document.getElementById("CSZE_Turn_" + idNumber).children[1].textContent = ModelCSZE.capacity_param.turn;
	document.getElementById("CSZE_Power_" + idNumber).children[1].textContent = ModelCSZE.otherComponents.motor.kW;
	document.getElementById("CSZE_Material_" + idNumber).children[1].textContent = ModelCSZE.material;
	document.getElementById("CSZE_BucketMaterial_" + idNumber).children[1].textContent = "Пластик";
	document.getElementById("CSZE_Motor_" + idNumber).children[1].textContent = ModelCSZE.otherComponents.motor.kW;
	document.getElementById("CSZE_Reductor_" + idNumber).children[1].textContent = ModelCSZE.otherComponents.reductor.name  + "(" + MR_country(ModelCSZE.motor_reductor) + ")";

	/*Тринарный опрератор*/
	document.getElementById("CSZE_Converter_" + idNumber).children[1].textContent = ModelCSZE.otherComponents.converter.enable ? "Да" : "Нет";
	document.getElementById("CSZE_ControlBox_" + idNumber).children[1].textContent = ModelCSZE.otherComponents.controlBox.enable ? "Да" : "Нет";
	document.getElementById("CSZE_Backward_" + idNumber).children[1].textContent = ModelCSZE.otherComponents.backward.enable ? "Да" : "Нет";
	document.getElementById("CSZE_Sensor_" + idNumber).children[1].textContent = ModelCSZE.otherComponents.sensorPodpor.enable ? "Да" : "Нет";
	document.getElementById("CSZE_ChainSensor_" + idNumber).children[1].textContent = ModelCSZE.otherComponents.sensorChain.enable ? "Да" : "Нет";
	document.getElementById("CSZE_StreetFulfillment_" + idNumber).children[1].textContent = ModelCSZE.otherComponents.streetFulfillment.enable ? "Да" : "Нет";
	document.getElementById("CSZE_AddLoad_" + idNumber).children[1].textContent = ModelCSZE.onloadElement.load.count;
	document.getElementById("CSZE_AddUnload_" + idNumber).children[1].textContent = ModelCSZE.onloadElement.unload.count;

	var unloadTypeText = ModelCSZE.onloadElement.unload.type == "electrical" ? " (Электродвигатель)" : " (Пневматика)";
  	document.getElementById("CSZE_AddUnload_" + idNumber).children[1].textContent += unloadTypeText;

	document.getElementById("CSZE_MetallMain_" + idNumber).children[1].textContent = ModelCSZE.metalThickness.split("x")[0];
	document.getElementById("CSZE_MetallOther_" + idNumber).children[1].textContent = ModelCSZE.metalThickness.split("x")[1];

	/*основные размеры*/
	document.getElementById("CSZE_SizeHeight_" + idNumber).children[1].textContent = ModelCSZE.modelSize.height;
	document.getElementById("CSZE_SizeHeightTransport_" + idNumber).children[1].textContent = Number(ModelCSZE.modelSize.height - ModelCSZE.onloadElement.unload_y).toFixed(2);
	document.getElementById("CSZE_SizeLengthTop_" + idNumber).children[1].textContent = ModelCSZE.modelSize.top_length;
	document.getElementById("CSZE_SizeLengthBefore_" + idNumber).children[1].textContent = Number(ModelCSZE.modelSize.top_length - ModelCSZE.onloadElement.unload_x).toFixed(2);
	document.getElementById("CSZE_SizeLengthBot_" + idNumber).children[1].textContent = ModelCSZE.modelSize.bottom_length;
	document.getElementById("CSZE_SizeLenghtUnload_" + idNumber).children[1].textContent = Number(ModelCSZE.modelSize.bottom_length - ModelCSZE.onloadElement.load_x).toFixed(2);
	document.getElementById("CSZE_SizeLenghtTotal_" + idNumber).children[1].textContent = Number(ModelCSZE.modelSize.top_length + ModelCSZE.modelSize.bottom_length - ModelCSZE.modelSize.height_length_x).toFixed(2);		
	
	/*Соответствие требованиям Безопасности и Автоматизации*/
	if(!ModelCSZE.otherComponents.controlBox.enable || !ModelCSZE.otherComponents.sensorPodpor.enable || !ModelCSZE.otherComponents.sensorChain.enable){
		document.getElementById("CSZE_Technic_" + idNumber).children[0].children[0].style.display = "none";
		document.getElementById("CSZE_Technic_" + idNumber).children[0].children[1].style.display = "flex";
		document.getElementById("CSZE_Technic_" + idNumber).children[0].children[1].children[0].textContent += ModelCSZE.otherComponents.controlBox.enable ? "" : " Шкаф управления;";
		document.getElementById("CSZE_Technic_" + idNumber).children[0].children[1].children[0].textContent += ModelCSZE.otherComponents.sensorPodpor.enable ? "" : " Датчики подпора;";;
		document.getElementById("CSZE_Technic_" + idNumber).children[0].children[1].children[0].textContent+= ModelCSZE.otherComponents.sensorChain.enable ? "" : " Датчик обрыва цепи;";;
		document.getElementById("CSZE_Technic_" + idNumber).children[1].style = "height: -webkit-fill-available; max-height: 334px;";
	}
	/*Изображение модели*/
	document.getElementById("CSZE_ModelImage_" + idNumber).style = "background: url(/static/img/kpApparatus/CSZ.jpg) no-repeat; background-size: contain;";
	document.getElementById("CSZE_ModelDrawing_" + idNumber).style = "background: url(/static/img/kpApparatus/" + ModelCSZE.modelName + ".png) no-repeat; background-size: contain;";
		
	/*Данные длинн моделди на изображении*/
	document.getElementById("CSZE_ModelDrawing_" + idNumber).children[0].innerHTML = Number(document.getElementById("CSZE_SizeHeightTransport_" + idNumber).children[1].textContent * 1000).toFixed(0);
	document.getElementById("CSZE_ModelDrawing_" + idNumber).children[1].innerHTML = Number(document.getElementById("CSZE_SizeHeight_" + idNumber).children[1].textContent * 1000).toFixed(0);
	document.getElementById("CSZE_ModelDrawing_" + idNumber).children[2].innerHTML = Number(document.getElementById("CSZE_SizeLengthTop_" + idNumber).children[1].textContent * 1000).toFixed(0);
	document.getElementById("CSZE_ModelDrawing_" + idNumber).children[3].innerHTML = Number(document.getElementById("CSZE_SizeLengthBefore_" + idNumber).children[1].textContent * 1000).toFixed(0);
	document.getElementById("CSZE_ModelDrawing_" + idNumber).children[4].innerHTML = Number(document.getElementById("CSZE_SizeLenghtUnload_" + idNumber).children[1].textContent * 1000).toFixed(0);
	document.getElementById("CSZE_ModelDrawing_" + idNumber).children[5].innerHTML = Number(document.getElementById("CSZE_SizeLengthBot_" + idNumber).children[1].textContent * 1000).toFixed(0);
	document.getElementById("CSZE_ModelDrawing_" + idNumber).children[6].innerHTML = Number(document.getElementById("CSZE_SizeLenghtTotal_" + idNumber).children[1].textContent * 1000).toFixed(0);
}
//формирование страницы-клона нового CSE 
function createCSENew(page_id){
	var pageTechnical = ElevatorPage_Param_MainBlock.children[1].children[0].cloneNode(true);
	var pageSize = ElevatorPage_Param_MainBlock.children[1].children[2].cloneNode(true);
	var space = ElevatorPage_Param_MainBlock.children[1].children[1].cloneNode(true);
	var space2 = ElevatorPage_Param_MainBlock.children[1].children[3].cloneNode(true);
	var idRow = Number(ElevatorPage_Param_MainBlock.children.length/2);

	pageTechnical.setAttribute("name", "page_" + page_id);
	pageSize.setAttribute("name", "page_" + page_id);
	space.setAttribute("name", "space_" + page_id);
	space2.setAttribute("name", "space_" + page_id);

	pageTechnical.id = "CSE_Technical_" + idRow;
	pageSize.id = "CSE_Size_" + idRow;
	pageTechnical.style.display = "";
	pageSize.style.display = "";
	space.id = "space_CSE_" + idRow;	
	space2.id = "space_CSE2_" + idRow;
	space.style.display = "";	
	space2.style.display = "";	
	
	pageTechnical.children[0].children[0].children[1].id = "CSE_ModelName_" + idRow;
								//это весь основной контент (modelSettings) не считая pageBottomBlock
											//это 1 settingsColumn	
	pageTechnical.children[0].children[1].children[0].id = "CSE_Technic_" + idRow;											
	pageTechnical.children[0].children[1].children[0].children[2].children[1].children[1].id = "CSE_Capacity_" + idRow;											
	pageTechnical.children[0].children[1].children[0].children[2].children[2].children[1].id = "CSE_CapacityProduct_" + idRow;										
	pageTechnical.children[0].children[1].children[0].children[2].children[3].children[1].id = "CSE_TransportLength_" + idRow;											
	pageTechnical.children[0].children[1].children[0].children[2].children[4].children[1].id = "CSE_Height_" + idRow;											
	pageTechnical.children[0].children[1].children[0].children[2].children[5].children[1].id = "CSE_BeltSpeed_" + idRow;											
	pageTechnical.children[0].children[1].children[0].children[2].children[6].children[1].id = "CSE_BucketStep_" + idRow;											
	pageTechnical.children[0].children[1].children[0].children[2].children[7].children[1].id = "CSE_DrumStep_" + idRow;											
	pageTechnical.children[0].children[1].children[0].children[2].children[8].children[1].id = "CSE_DrumDesign_" + idRow;											
	pageTechnical.children[0].children[1].children[0].children[2].children[9].children[1].id = "CSE_Material_" + idRow;											
	pageTechnical.children[0].children[1].children[0].children[2].children[10].children[1].id = "CSE_BucketMaterial_" + idRow;											
	pageTechnical.children[0].children[1].children[0].children[2].children[11].children[1].id = "CSE_Motor_" + idRow;											
	pageTechnical.children[0].children[1].children[0].children[2].children[12].children[1].id = "CSE_Reductor_" + idRow;
											//это 2 settingsColumn
	pageTechnical.children[0].children[1].children[1].children[0].children[0].id = "modelImageElevator_" + idRow;
	pageTechnical.children[0].children[1].children[1].children[2].children[0].id = "CSE_Complect_" + idRow;
	pageTechnical.children[0].children[1].children[1].children[2].children[1].children[1].id = "CSE_Explosion_" + idRow;
	pageTechnical.children[0].children[1].children[1].children[2].children[2].children[1].id = "CSE_SuctionConnect_" + idRow;
	pageTechnical.children[0].children[1].children[1].children[2].children[3].children[1].id = "CSE_WindowB_" + idRow;
	pageTechnical.children[0].children[1].children[1].children[3].children[0].children[1].id = "CSE_Converter_" + idRow;
	pageTechnical.children[0].children[1].children[1].children[3].children[1].children[1].id = "CSE_ControlBox_" + idRow;
	pageTechnical.children[0].children[1].children[1].children[3].children[2].children[1].id = "CSE_Backward_" + idRow;
	pageTechnical.children[0].children[1].children[1].children[3].children[3].children[1].id = "CSE_SpeedSensor_" + idRow;
	pageTechnical.children[0].children[1].children[1].children[3].children[4].children[1].id = "CSE_TapeSensor_" + idRow;
	pageTechnical.children[0].children[1].children[1].children[3].children[5].children[1].id = "CSE_SupportSensorTop_" + idRow;
	pageTechnical.children[0].children[1].children[1].children[3].children[6].children[1].id = "CSE_SupportSensorBot_" + idRow;
	pageTechnical.children[0].children[1].children[1].children[3].children[7].children[1].id = "CSE_StreetFulfillment_" + idRow;
	pageTechnical.children[0].children[1].children[1].children[3].children[8].children[1].id = "CSE_DrillInBelt_" + idRow;
	pageTechnical.children[0].children[1].children[1].children[4].children[0].id = "CSE_Metall_" + idRow;
	pageTechnical.children[0].children[1].children[1].children[4].children[1].children[1].id = "CSE_MetallSection_" + idRow;
	pageTechnical.children[0].children[1].children[1].children[4].children[2].children[1].id = "CSE_MetallOther_" + idRow;

											
	pageSize.children[0].children[1].id = "CSE_ModelDrawing_" + idRow;
	pageSize.children[0].children[2].id = "CSE_SizeBlock_" + idRow;
	pageSize.children[0].children[2].children[1].children[1].id = "CSE_HeightMain_" + idRow;											
	pageSize.children[0].children[2].children[2].children[1].id = "CSE_HeightTransport_" + idRow;

	ElevatorPage_Param_MainBlock.appendChild(pageTechnical);
	ElevatorPage_Param_MainBlock.appendChild(space);
	ElevatorPage_Param_MainBlock.appendChild(pageSize);
	ElevatorPage_Param_MainBlock.appendChild(space2);

	loadModelCSE(idRow);
	autoPageNumber();
}
		//выгрузка данных для страницы-клона CSE
function loadModelCSE(idNumber){
	document.getElementById("CSE_ModelName_" + idNumber).innerHTML = document.getElementById("componentName_" + Number(priceModelBlock.children.length-1)).textContent;
	document.getElementById("CSE_Capacity_" + idNumber).children[1].textContent = ModelCSE.capacity_param.capacity;
	document.getElementById("CSE_CapacityProduct_" + idNumber).children[0].textContent = "Прозводительность("+" " + Product_K[ID_Product].nameProduct+" " + "), т/ч";
	document.getElementById("CSE_CapacityProduct_" + idNumber).children[1].textContent = Number(ModelCSE.capacity_param.capacity * Product_K[ID_Product].K).toFixed(2);
	
	document.getElementById("CSE_TransportLength_" + idNumber).children[1].textContent = Number(ModelCSE.modelSize.height - ModelCSE.modelSize.unload).toFixed(2);
	document.getElementById("CSE_Height_" + idNumber).children[1].textContent = ModelCSE.modelSize.height;
	document.getElementById("CSE_BeltSpeed_" + idNumber).children[1].textContent = ModelCSE.capacity_param.speed;
	document.getElementById("CSE_BucketStep_" + idNumber).children[1].textContent = ModelCSE.capacity_param.step;
	document.getElementById("CSE_DrumStep_" + idNumber).children[1].textContent = ModelCSE.capacity_param.turn;	
	document.getElementById("CSE_Material_" + idNumber).children[1].textContent = ModelCSE.material;
	document.getElementById("CSE_BucketMaterial_" + idNumber).children[1].textContent = ModelCSE.bucketMaterial == "bucketPlastic" ? "Пластик" : "Металл";
	document.getElementById("CSE_Motor_" + idNumber).children[1].textContent = ModelCSE.otherComponents.motor.kW;
	document.getElementById("CSE_Reductor_" + idNumber).children[1].textContent = ModelCSE.otherComponents.reductor.name + "(" + MR_country(ModelCSE.motor_reductor) + ")";	
	
	document.getElementById("CSE_SupportSensorTop_" + idNumber).children[1].textContent = ModelCSE.otherComponents.sensorPodporTop.enable ? "Да" : "Нет";
	document.getElementById("CSE_SupportSensorBot_" + idNumber).children[1].textContent = ModelCSE.otherComponents.sensorPodporBottom.enable ? "Да" : "Нет";

    /*Тринарный опрератор*/
	document.getElementById("CSE_Converter_" + idNumber).children[1].textContent = ModelCSE.otherComponents.converter.enable ? "Да" : "Нет";
    document.getElementById("CSE_ControlBox_" + idNumber).children[1].textContent = ModelCSE.otherComponents.controlBox.enable ? "Да" : "Нет";
	document.getElementById("CSE_Backward_" + idNumber).children[1].textContent = ModelCSE.otherComponents.backward.enable ? "Да" : "Нет";
    document.getElementById("CSE_SpeedSensor_" + idNumber).children[1].textContent = ModelCSE.otherComponents.sensorSpeed.enable ? "Да" : "Нет";
    document.getElementById("CSE_TapeSensor_" + idNumber).children[1].textContent = ModelCSE.otherComponents.sensorBelt.enable ? "Да" : "Нет";
    document.getElementById("CSE_StreetFulfillment_" + idNumber).children[1].textContent = ModelCSE.otherComponents.streetFulfillment.enable ? "Да" : "Нет";
    document.getElementById("CSE_DrillInBelt_" + idNumber).children[1].textContent = ModelCSE.otherComponents.drillInBelt.enable ? "Да" : "Нет";
	document.getElementById("CSE_MetallSection_" + idNumber).children[1].textContent = ModelCSE.metalThickness.tubeT;
    document.getElementById("CSE_MetallOther_" + idNumber).children[1].textContent = ModelCSE.metalThickness.headT;

    /*основные размеры*/
	document.getElementById("CSE_HeightMain_" + idNumber).children[1].textContent = ModelCSE.modelSize.height;
    document.getElementById("CSE_HeightTransport_" + idNumber).children[1].textContent = Number(ModelCSE.modelSize.height - ModelCSE.modelSize.unload).toFixed(2);
    
	/*Соответствие требованиям Безопасности и Автоматизации*/
	if(!ModelCSE.otherComponents.controlBox.enable || !ModelCSE.otherComponents.backward.enable || !ModelCSE.otherComponents.sensorPodporBottom.enable || !ModelCSE.otherComponents.sensorSpeed.enable || !ModelCSE.otherComponents.sensorBelt.enable){
		document.getElementById("CSE_Technic_" + idNumber).children[0].children[0].style.display = "none";
		//document.getElementById("CSETechnic_" + idNumber).children[0].children[1].style.display = "flex";
		//document.getElementById("CSETechnic_" + idNumber).children[0].children[1].children[0].textContent += ModelCSE.otherComponents.controlBox.enable ? "" : " Шкаф управления;";
		//document.getElementById("CSETechnic_" + idNumber).children[0].children[1].children[0].textContent += ModelCSE.otherComponents.backward.enable ? "" : " Устройство обратного хода;";
		//document.getElementById("CSETechnic_" + idNumber).children[0].children[1].children[0].textContent += ModelCSE.otherComponents.sensorPodporBottom.enable ? "" : " Датчики подпора нижний;";
		//document.getElementById("CSETechnic_" + idNumber).children[0].children[1].children[0].textContent += ModelCSE.otherComponents.sensorSpeed.enable ? "" : " Датчики скорости;";
		//document.getElementById("CSETechnic_" + idNumber).children[0].children[1].children[0].textContent += ModelCSE.otherComponents.sensorBelt.enable ? "" : " Датчик схода ленты;";
		//document.getElementById("CSETechnic_" + idNumber).children[1].style = "height: -webkit-fill-available; max-height: 334px;";
	}	
	
	/*Изображение модели*/
	document.getElementById("modelImageElevator_" + idNumber).style = "background: url(/static/img/kpApparatus/CSE.jpg);background-size: contain; background-position: center; background-repeat: no-repeat;";
	document.getElementById("CSE_ModelDrawing_" + idNumber).style = "background: url(/static/img/kpApparatus/" + ModelCSE.modelName + ".png) no-repeat; background-size: contain;";

	/*Данные длинн моделди на изображении*/
	document.getElementById("CSE_ModelDrawing_" + idNumber).children[0].innerHTML = Number(document.getElementById("CSE_HeightTransport_" + idNumber).children[1].textContent * 1000);
	document.getElementById("CSE_ModelDrawing_" + idNumber).children[1].innerHTML = Number(document.getElementById("CSE_HeightMain_" + idNumber).children[1].textContent * 1000);
	
}
function createCSCCNew(page_id){
	var pageTechnical = ElevatorPage_Param_MainBlock.children[2].children[0].cloneNode(true);
	var pageSize = ElevatorPage_Param_MainBlock.children[2].children[2].cloneNode(true);
	var space = ElevatorPage_Param_MainBlock.children[2].children[1].cloneNode(true);
	var space2 = ElevatorPage_Param_MainBlock.children[2].children[3].cloneNode(true);
	var idRow = Number(ElevatorPage_Param_MainBlock.children.length/2);

	pageTechnical.setAttribute("name", "page_" + page_id);
	pageSize.setAttribute("name", "page_" + page_id);
	space.setAttribute("name", "space_" + page_id);
	space2.setAttribute("name", "space_" + page_id);

	pageTechnical.id = "CSCC_Technical_" + idRow;
	pageSize.id = "CSCC_Size_" + idRow;
	pageTechnical.style.display = "";
	pageSize.style.display = "";
	space.id = "space_CCCE_" + idRow;	
	space2.id = "space_CSCC2_" + idRow;
	space.style.display = "";	
	space2.style.display = "";	
	
	pageTechnical.children[0].children[0].children[1].id = "CSCC_ModelName_" + idRow;
								//это весь основной контент (modelSettings) не считая pageBottomBlock
											//это 1 settingsColumn	
	pageTechnical.children[0].children[1].children[0].id = "CSCC_Technic_" + idRow;											
	pageTechnical.children[0].children[1].children[0].children[2].children[1].children[1].id = "CSCC_Capacity_" + idRow;											
	pageTechnical.children[0].children[1].children[0].children[2].children[2].children[1].id = "CSCC_CapacityProduct_" + idRow;										
	pageTechnical.children[0].children[1].children[0].children[2].children[3].children[1].id = "CSCC_TransportLength_" + idRow;											
	pageTechnical.children[0].children[1].children[0].children[2].children[4].children[1].id = "CSCC_length_" + idRow;											
	pageTechnical.children[0].children[1].children[0].children[2].children[5].children[1].id = "CSCC_BeltSpeed_" + idRow;											
	pageTechnical.children[0].children[1].children[0].children[2].children[6].children[1].id = "CSCC_ScraperStep_" + idRow;											
	pageTechnical.children[0].children[1].children[0].children[2].children[7].children[1].id = "CSCC_DrumStep_" + idRow;											
	pageTechnical.children[0].children[1].children[0].children[2].children[8].children[1].id = "CSCC_Material_" + idRow;											
	pageTechnical.children[0].children[1].children[0].children[2].children[9].children[1].id = "CSCC_ScraperMaterial_" + idRow;											
	pageTechnical.children[0].children[1].children[0].children[2].children[10].children[1].id = "CSCC_Motor_" + idRow;											
	pageTechnical.children[0].children[1].children[0].children[2].children[11].children[1].id = "CSCC_Reductor_" + idRow;
											//это 2 settingsColumn
	pageTechnical.children[0].children[1].children[1].children[0].children[0].id = "modelImage_CSCC_" + idRow;
	pageTechnical.children[0].children[1].children[1].children[2].children[0].id = "CSCC_Complect_" + idRow;
	pageTechnical.children[0].children[1].children[1].children[2].children[1].children[1].id = "CSCC_SuctionConnect_" + idRow;
	pageTechnical.children[0].children[1].children[1].children[2].children[2].children[1].id = "CSCC_Window_" + idRow;
	pageTechnical.children[0].children[1].children[1].children[3].children[0].children[1].id = "CSCC_Converter_" + idRow;
	pageTechnical.children[0].children[1].children[1].children[3].children[1].children[1].id = "CSCC_ControlBox_" + idRow;
	pageTechnical.children[0].children[1].children[1].children[3].children[2].children[1].id = "CSCC_SpeedSensor_" + idRow;
	pageTechnical.children[0].children[1].children[1].children[3].children[3].children[1].id = "CSCC_SupportSensorTop_" + idRow;
	pageTechnical.children[0].children[1].children[1].children[3].children[4].children[1].id = "CSCC_Backload_" + idRow;
	pageTechnical.children[0].children[1].children[1].children[3].children[5].children[1].id = "CSCC_DoubleSideBackload_" + idRow;
	pageTechnical.children[0].children[1].children[1].children[3].children[6].children[1].id = "CSCC_Vertical_" + idRow;
	pageTechnical.children[0].children[1].children[1].children[3].children[7].children[1].id = "CSCC_StreetFulfillment_" + idRow;
	pageTechnical.children[0].children[1].children[1].children[4].children[0].id = "CSCC_Metall_" + idRow;
	pageTechnical.children[0].children[1].children[1].children[4].children[1].children[1].id = "CSCC_bodyT_" + idRow;
	pageTechnical.children[0].children[1].children[1].children[4].children[2].children[1].id = "CSCC_capT_" + idRow;
	pageTechnical.children[0].children[1].children[1].children[4].children[3].children[1].id = "CSCC_liningT_" + idRow;

											
	pageSize.children[0].children[1].id = "CSCC_ModelDrawing_" + idRow;
	pageSize.children[0].children[2].id = "CSCC_SizeBlock_" + idRow;
	pageSize.children[0].children[2].children[1].children[1].id = "CSCC_lengthAxis_" + idRow;											
	pageSize.children[0].children[2].children[2].children[1].id = "CSCC_lengthMain_" + idRow;											
	pageSize.children[0].children[2].children[3].children[1].id = "CSCC_lengthTransport_" + idRow;

	ElevatorPage_Param_MainBlock.appendChild(pageTechnical);
	ElevatorPage_Param_MainBlock.appendChild(space);
	ElevatorPage_Param_MainBlock.appendChild(pageSize);
	ElevatorPage_Param_MainBlock.appendChild(space2);

	loadModelCSCC(idRow);
	autoPageNumber();
}
		//выгрузка данных для страницы-клона CSсс
function loadModelCSCC(idNumber){
	var materialText = ModelCSCC.material == "Сталь оцинкованная" ? " В ОЦИНКОВАННОМ" : " В НЕРЖАВЕЮЩЕМ";
	
	var lineID = priceModelBlock.children.length - 1;
	document.getElementById("CSCC_ModelName_" + idNumber).textContent = document.getElementById("componentName_" + lineID).textContent;
	document.getElementById("CSCC_Capacity_" + idNumber).children[1].textContent = ModelCSCC.capacity_param.capacity;
	document.getElementById("CSCC_CapacityProduct_" + idNumber).children[0].textContent = "Прозводительность("+" " + Product_K[ID_Product].nameProduct+" " + "), т/ч";
	document.getElementById("CSCC_CapacityProduct_" + idNumber).children[1].textContent = Number(ModelCSCC.capacity_param.capacity * Product_K[ID_Product].K).toFixed(1);
	
	document.getElementById("CSCC_TransportLength_" + idNumber).children[1].textContent = Number(ModelCSCC.modelSize.TransportLength - ( ModelCSCC.modelSize.unload +  ModelCSCC.modelSize.load)).toFixed(1);//транспортировки = общая - (unload+load)
	document.getElementById("CSCC_length_" + idNumber).children[1].textContent = ModelCSCC.modelSize.TransportLength;//тут нужно брать с калька и считать общая
	document.getElementById("CSCC_BeltSpeed_" + idNumber).children[1].textContent = ModelCSCC.capacity_param.speed;
	document.getElementById("CSCC_ScraperStep_" + idNumber).children[1].textContent = ModelCSCC.capacity_param.step;
	document.getElementById("CSCC_DrumStep_" + idNumber).children[1].textContent = ModelCSCC.capacity_param.turn;	
	document.getElementById("CSCC_Material_" + idNumber).children[1].textContent = ModelCSCC.material;
	document.getElementById("CSCC_Motor_" + idNumber).children[1].textContent = ModelCSCC.otherComponents.motor.kW;
	document.getElementById("CSCC_Reductor_" + idNumber).children[1].textContent = ModelCSCC.otherComponents.reductor.name + "(" + MR_country(ModelCSCC.motor_reductor) + ")";	
	document.getElementById("CSCC_Backload_" + idNumber).children[1].textContent = ModelCSCC.sectionElement.leteralSection != 0 ? ModelCSCC.sectionElement.leteralSection.reduce((accumulator, currentValue) => Number(accumulator) + Number(currentValue))*10 + 'мм' : 'Нет';
	document.getElementById("CSCC_Vertical_" + idNumber).children[1].textContent = ModelCSCC.sectionElement.verticalSection.length != 0 ? ModelCSCC.sectionElement.verticalSection.length + "шт" : "Нет";
    /*Тринарный опрератор*/
	document.getElementById("CSCC_SupportSensorTop_" + idNumber).children[1].textContent = ModelCSCC.otherComponents.sensorPodpor.enable ? "Да" : "Нет";
	document.getElementById("CSCC_DoubleSideBackload_" + idNumber).children[1].textContent = ModelCSCC.sectionElement.doubleSideLateral ? "Да" : "Нет";
	document.getElementById("CSCC_Converter_" + idNumber).children[1].textContent = ModelCSCC.otherComponents.converter.enable ? "Да" : "Нет";
    document.getElementById("CSCC_ControlBox_" + idNumber).children[1].textContent = ModelCSCC.otherComponents.controlBox.enable ? "Да" : "Нет";
    document.getElementById("CSCC_SpeedSensor_" + idNumber).children[1].textContent = ModelCSCC.otherComponents.sensorSpeed.enable ? "Да" : "Нет";
    document.getElementById("CSCC_StreetFulfillment_" + idNumber).children[1].textContent = ModelCSCC.otherComponents.streetFulfillment.enable ? "Да" : "Нет";

	document.getElementById("CSCC_bodyT_" + idNumber).children[1].textContent = ModelCSCC.metalThickness.bodyT;
    document.getElementById("CSCC_capT_" + idNumber).children[1].textContent = ModelCSCC.metalThickness.capT;
    document.getElementById("CSCC_liningT_" + idNumber).children[1].textContent = ModelCSCC.metalThickness.liningT;

    /*основные размеры*/
	document.getElementById("CSCC_lengthAxis_" + idNumber).children[1].textContent = Number(ModelCSCC.modelSize.TransportLength - ( ModelCSCC.modelSize.loadCenter +  ModelCSCC.modelSize.unloadCenter)).toFixed(2);;//общая - (loadCenter+unloadCenter)
	document.getElementById("CSCC_lengthMain_" + idNumber).children[1].textContent = ModelCSCC.modelSize.TransportLength;//тут нужно брать с калька и считать общая
    document.getElementById("CSCC_lengthTransport_" + idNumber).children[1].textContent = Number(ModelCSCC.modelSize.TransportLength - ( ModelCSCC.modelSize.unload +  ModelCSCC.modelSize.load)).toFixed(2);//транспортировки = общая - (unload+load)
    
	/*Соответствие требованиям Безопасности и Автоматизации*/
	if(!ModelCSCC.otherComponents.controlBox.enable || !ModelCSCC.otherComponents.converter.enable || !ModelCSCC.otherComponents.sensorSpeed.enable){
		document.getElementById("CSCC_Technic_" + idNumber).children[0].children[0].style.display = "none";
		document.getElementById("CSCC_Technic_" + idNumber).children[0].children[1].style.display = "flex";
		document.getElementById("CSCC_Technic_" + idNumber).children[0].children[1].children[0].textContent += ModelCSCC.otherComponents.sensorPodpor.enable ? "" : " Датчик подпора;";
		//document.getElementById("CSCCTechnic_" + idNumber).children[0].children[1].children[0].textContent += ModelCSCC.otherComponents.converter.enable ? "" : " Шкаф управления;";
		document.getElementById("CSCC_Technic_" + idNumber).children[0].children[1].children[0].textContent += ModelCSCC.otherComponents.sensorSpeed.enable ? "" : " Датчик скорости;";
		document.getElementById("CSCC_Technic_" + idNumber).children[1].style = "height: -webkit-fill-available; max-height: 334px;";
	}	
	
	/*Изображение модели*/
	document.getElementById("modelImage_CSCC_" + idNumber).style = "background: url(/static/img/kpApparatus/CSCC.jpg);background-size: contain; background-position: center; background-repeat: no-repeat;";
	document.getElementById("CSCC_ModelDrawing_" + idNumber).style = "background: url(/static/img/kpApparatus/" + ModelCSCC.modelName + ".png) no-repeat; background-size: contain;";
	
	/*Данные длинн моделди на изображении*/
	document.getElementById("CSCC_ModelDrawing_" + idNumber).children[0].innerHTML = Number(document.getElementById("CSCC_lengthTransport_" + idNumber).children[1].textContent * 1000);
	document.getElementById("CSCC_ModelDrawing_" + idNumber).children[1].innerHTML = Number(document.getElementById("CSCC_lengthAxis_" + idNumber).children[1].textContent * 1000);
	document.getElementById("CSCC_ModelDrawing_" + idNumber).children[2].innerHTML = Number(document.getElementById("CSCC_lengthMain_" + idNumber).children[1].textContent * 1000);
}
//Изменение текста и изображения
function changeInfoToDealer(){
	var id_dealer = dealer_list.map((el) => el.id_dealer).indexOf(InfoDeal.id_contact);
	
	if(id_dealer != -1){
		//замена изображений(нижние логотип)
		for(var i = 0; i < document.getElementsByClassName("bottomLogoImage").length; i++){
			document.getElementsByClassName("bottomLogoImage")[i].style.backgroundImage = "url(/static/img/dealer/" + dealer_list[id_dealer].img_logoBottom + ")";
		}
		//замена изображений(главный логотип)
		document.getElementsByClassName("topLogo")[0].style.backgroundImage = "url(/static/img/dealer/" + dealer_list[id_dealer].img_logoTop + ")";
		//Замена текстов
		titleTextMainPage.innerHTML = dealer_list[id_dealer].textTop;
		introduction.innerHTML = dealer_list[id_dealer].textBottom;
		//Замена имени компании
		managerInfoBlock.children[1].children[2].textContent = dealer_list[id_dealer].companyName;
	}
}
//НАСТРОЙКА СТРАНИЦ ЛИФТОВ
	//формирование страницы-клона нового лифта
function createLiftNew(page_id){
	var page = CUBER_page_Param_MainBlock.children[0].cloneNode(true);
	var space = CUBER_page_Param_MainBlock.children[1].cloneNode(true);
	var idRow = Number(CUBER_page_Param_MainBlock.children.length/2);

	page.setAttribute("name", "page_" + page_id);
	space.setAttribute("name", "space_" + page_id);

	page.id = "CUBER_page_" + idRow;
	page.style.display = "";
	space.style.display = "";
	space.id = "space_" + idRow;
	page.children[0].children[0].children[1].children[0].id = "maintitleLift_" + idRow;
	page.children[0].children[0].children[1].children[1].children[0].id = "Lift_Seria_" + idRow;

				////modelSettings\settingsColumn
	page.children[0].children[1].children[0].children[0].children[0].children[0].id = "advantageDescriptionLift_" + idRow;

	page.children[0].children[1].children[0].children[2].id = "MTC_Lift_" + idRow;

	page.children[0].children[1].children[0].children[3].children[0].children[1].id = "LiftSpeed_" + idRow;
	page.children[0].children[1].children[0].children[3].children[1].children[1].id = "LiftVoltage_" + idRow;
	page.children[0].children[1].children[0].children[3].children[2].children[1].id = "LiftPhase_" + idRow;
	page.children[0].children[1].children[0].children[3].children[3].children[1].id = "LiftHz_" + idRow;
	page.children[0].children[1].children[0].children[3].children[4].children[1].id = "LiftkW_" + idRow;
	page.children[0].children[1].children[0].children[3].children[5].children[1].id = "Liftdefence_class_" + idRow;
	page.children[0].children[1].children[0].children[3].children[6].children[1].id = "Liftdefence_lvl_" + idRow;
	page.children[0].children[1].children[0].children[3].children[7].children[1].id = "Lifttemp_" + idRow;
	page.children[0].children[1].children[0].children[3].children[8].children[1].id = "Liftwet_" + idRow;
	page.children[0].children[1].children[0].children[3].children[9].children[1].id = "LiftLevelMax_" + idRow;
	

	page.children[0].children[1].children[1].children[0].children[1].children[0].children[1].id = "LiftSize_height_" + idRow;	
	page.children[0].children[1].children[1].children[0].children[1].children[1].children[1].id = "LiftSize_deep_" + idRow;	
	page.children[0].children[1].children[1].children[0].children[1].children[2].children[1].id = "LiftSize_width_" + idRow;

	page.children[0].children[1].children[1].children[1].children[0].children[1].id = "LiftDBA_" + idRow;
	page.children[0].children[1].children[1].children[1].children[1].children[1].id = "LiftmaxMass_" + idRow;
	page.children[0].children[1].children[1].children[1].children[2].children[1].id = "LiftmaxUP_" + idRow;
	page.children[0].children[1].children[1].children[1].children[3].children[1].id = "Liftlifetime_" + idRow;
	page.children[0].children[1].children[1].children[1].children[4].children[1].id = "LiftShelfLife_" + idRow;
	page.children[0].children[1].children[1].children[1].children[5].children[1].id = "LiftShelf_" + idRow;
		
	CUBER_page_Param_MainBlock.appendChild(page);
	CUBER_page_Param_MainBlock.appendChild(space);

	updateLiftData(idRow);
	autoPageNumber();
	setupLangLift(idRow);
}

	//выгрузка данных для страницы лифта
function updateLiftData(idNumber){
	for (var i = 0; i < LiftType.length; i++){
		if (cuberSize.value == LiftType[i].size){
			var height = LiftType[i].size;
			document.getElementById("LiftSize_height_" + idNumber).textContent = language == "RU" ? height + 'M' : height + 'm';
			document.getElementById("LiftSize_deep_" + idNumber).textContent += language == "RU" ? 'M' : 'm';
			document.getElementById("LiftSize_width_" + idNumber).textContent += language == "RU" ? 'M' : 'm';
			document.getElementById("LiftmaxUP_" + idNumber).children[1].textContent = LiftType[i].mass;
		}
	}	
}
//НАСТРОЙКА СТРАНИЦ импорта
	//формирование страницы-клона нового импорта
function createImportNew(page_id){
	var page = importPage_Param_MainBlock.children[0].cloneNode(true);
	var space = importPage_Param_MainBlock.children[1].cloneNode(true);
	var idRow = Number(importPage_Param_MainBlock.children.length/2);

	page.setAttribute("name", "page_" + page_id);
	space.setAttribute("name", "space_" + page_id);

	page.id = "import_page_" + idRow;
	page.style.display = "";
	space.style.display = "";
	space.id = "space_" + idRow;
	page.children[0].children[0].children[1].children[1].children[0].id = "import_Seria_" + idRow;
	page.children[0].children[0].children[2].children[0].id = "button_Lang_" + idRow;
	page.children[0].children[0].children[2].children[0].addEventListener('click', setupLang(idRow));
					//modelSettings
	page.children[0].children[1].children[0].children[0].children[0].children[0].id = "importDescription_" + idRow;
								// settingsColumn
	page.children[0].children[1].children[0].children[2].id = "importParamText_" + idRow;
	page.children[0].children[1].children[0].children[3].id = "importParametr_" + idRow;
	page.children[0].children[1].children[0].children[3].children[0].children[1].id = "importCapaсity_" + idRow;
	page.children[0].children[1].children[0].children[3].children[3].children[1].id = "importkW_" + idRow;
	page.children[0].children[1].children[0].children[3].children[4].children[1].id = "importWeight_" + idRow;

	page.children[0].children[1].children[1].children[0].children[0].id = "importImage_" + idRow;	

	page.children[0].children[1].children[1].children[0].children[1].children[0].children[1].id = "importSize_height_" + idRow;	
	page.children[0].children[1].children[1].children[0].children[1].children[1].children[1].id = "importSize_deep_" + idRow;	
	page.children[0].children[1].children[1].children[0].children[1].children[2].children[1].id = "importSize_width_" + idRow;

	
		
	importPage_Param_MainBlock.appendChild(page);
	importPage_Param_MainBlock.appendChild(space);

	updateimportData(idRow);
	autoPageNumber();
}

	//выгрузка данных для страницы лифта
function updateimportData(idNumber){
	var button = document.getElementById("button_Lang_" + idNumber);
	for (var i = 0; i < ImportType.length; i++){
		if (ImportModel.value == ImportType[i].Model){
			document.getElementById("import_Seria_" + idNumber).textContent = ImportType[i].Model;
			document.getElementById("importDescription_" + idNumber).textContent = ImportType[i].description;

			document.getElementById("importCapaсity_" + idNumber).children[1].textContent = ImportType[i].Capaсity;
			document.getElementById("importkW_" + idNumber).children[1].textContent = ImportType[i].kW;
			document.getElementById("importWeight_" + idNumber).children[1].textContent = ImportType[i].mass;

			document.getElementById("importImage_" + idNumber).children[0].src = "/static/img/kpApparatus/" + ImportType[i].imageName;

			document.getElementById("importSize_height_" + idNumber).textContent = ImportType[i].sizeHeight;
			document.getElementById("importSize_deep_" + idNumber).textContent = ImportType[i].sizeDeep;
			document.getElementById("importSize_width_" + idNumber).textContent = ImportType[i].sizeWidth;			
		}
	}
	switchActual(button);
}

//СКРЫТИЕ СТРАНИЦ
function menuOpen(){
	if (pageMenuContent.style.display == 'none'){
		pageMenuContent.style.display = 'block';		
	}
	else{
		pageMenuContent.style.display = 'none';		
	}
}
function pageHidden(){
	document.getElementById("aboutCompanyCheckbox").addEventListener('click', function(){
		var checked = this.checked;
		var elementsToHide = document.getElementById('aboutCompany');		
		for(var i = 0; i < elementsToHide.children.length; i++){
			if(checked){
				elementsToHide.children[i].style.display = 'flex';
			}
			else{
				elementsToHide.children[i].style.display = 'none'
			}
		}
		if(checked){
			elementsToHide.style.display = 'flex';			
		}
		else{
			elementsToHide.style.display = 'none'
		}		
		autoPageNumber();
	});
	document.getElementById("referenceCheckbox").addEventListener('click', function(){
		var checked = this.checked;
		var elementsToHide = document.getElementById('reference');		
		for(var i = 0; i < elementsToHide.children.length; i++){
			if(checked){
				elementsToHide.children[i].style.display = 'flex';
			}
			else{
				elementsToHide.children[i].style.display = 'none'
			}
		}
		if(checked){
			elementsToHide.style.display = 'block';			
		}
		else{
			elementsToHide.style.display = 'none'
		}		
		autoPageNumber();
	});
	document.getElementById("reqirementsCheckbox").addEventListener('click', function(){
		var checked = this.checked;
		var elementsToHide = document.getElementById('requirements');		
		for(var i = 0; i < elementsToHide.children.length; i++){
			if(checked){
				elementsToHide.children[i].style.display = 'flex';
			}
			else{
				elementsToHide.children[i].style.display = 'none'
			}
		}
		if(checked){
			elementsToHide.style.display = 'flex';			
		}
		else{
			elementsToHide.style.display = 'none'
		}		
		autoPageNumber();
	});
	document.getElementById("airRequirementsCheckbox").addEventListener('click', function(){
		var checked = this.checked;
		var elementsToHide = document.getElementById('airRequirements');		
		for(var i = 0; i < elementsToHide.children.length; i++){
			if(checked){
				elementsToHide.children[i].style.display = 'flex';
			}
			else{
				elementsToHide.children[i].style.display = 'none'
			}
		}
		if(checked){
			elementsToHide.style.display = 'block';			
		}
		else{
			elementsToHide.style.display = 'none'
		}		
		autoPageNumber();
	});		
	aboutCompanyCheckbox.click();
	referenceCheckbox.click();
	reqirementsCheckbox.click();
	airRequirementsCheckbox.click();
}
function hideDiscount(){
	var discountValueTitle = document.getElementById('discountValueTitle');
	var discountSumTitle = document.getElementById('discountSumTitle');	
	var discountValueTotal = document.getElementById('discountValueTotal');
	var discountSumTotal = document.getElementById('discountSumTotal');
	
	if(discountValueTitle.style.display != "none"){
		discountValueTitle.style.display = "none";
		discountSumTitle.style.display = "none";
		discountValueTotal.style.display = "none";
		discountValueTotal.style.value = 0;
		discountSumTotal.style.display = "none";
		discountSumTotal.style.value = 0;
	}
	else{
		discountValueTitle.style.display = "flex";
		discountSumTitle.style.display = "flex";
		discountValueTotal.style.display = "flex";
		discountSumTotal.style.display = "flex";
	}
	for(var i = 0; i < priceModelBlock.children.length; i++){
		if(document.getElementById("discountValue_" + i).style.display != "none"){
			document.getElementById("discountValue_" + i).style.display = "none";
			document.getElementById("discountSum_" + i).style.display = "none";
			
		}
		else{
			document.getElementById("discountValue_" + i).style.display = "flex";
			document.getElementById("discountSum_" + i).style.display = "flex";
		}
		//кайфарики я таки смог!!!!!
		document.getElementById("discountValue_" + i).value = 0;		
		document.getElementById("discountValueTotal").value = 0;
		CalculatePrice(i);
	}
	CalculationSum();				
}
//ПОДГРУЗКА ЦЕН
//аппараты
function getModelPrice(idRow){
	var targetElevator = Model[calcElevator.value].Model;
	var targetLotok = calcLotok.value;
	var targetConfig = calcConf.value;
	var select = headerTooltip.children[6].children[0];
	
	var fullName = targetElevator + " " + targetLotok + " " + targetConfig;
	
	for(var i = 0; i < Price.length; i++){
		if(fullName.split(" ").length == 3){
			var modelName = Price[i].name.split(" ")[0];
			var lotokType = Price[i].name.split(" ")[1];
			var configuration = Price[i].name.split(" ")[2];
		}
		else if(fullName.split(" ").length == 4){
			var modelName = Price[i].name.split(" ")[0] + " " + Price[i].name.split(" ")[1];
			var lotokType = Price[i].name.split(" ")[2];
			var configuration = Price[i].name.split(" ")[3];
		}
		else if(fullName.split(" ").length == 5){
			var modelName = Price[i].name.split(" ")[0] + " " + Price[i].name.split(" ")[1];
			var lotokType = Price[i].name.split(" ")[2];
			var configuration = Price[i].name.split(" ")[3] + " " + Price[i].name.split(" ")[4];
		}
		if(targetElevator == modelName && targetLotok == lotokType && (targetConfig == configuration || configuration == null)){
			document.getElementById("price_" + idRow).value = select.value == "0" ? Price[i].priceNDS : Price[i].priceExport;
			changeValut(idRow);
			CalculatePrice(idRow);
		}
	}
}
//компрессоры
function getCompressorPrice(idRow){
	var compressor = genesisProvider.value;
	var model = GenesisModel.value;
	var motor = GenesisMotor.value;
	
	for(var i = 0; i < Kompressor.length; i++){
		if(compressor == Kompressor[i].compressorManufacturer && model == Kompressor[i].compressorModel && motor == Kompressor[i].compressorEnginePower){
			document.getElementById("price_" + idRow).value = Number(Kompressor[i].compressorPrice * CRB_RUB_RATE[Kompressor[i].currency].Value).toFixed(2);
			changeValut(idRow);
			CalculatePrice(idRow);
		}
	}

}
//элеваторы
function getElevatorPrice(idRow){	
	switch (ElevatorType){
		case "CSZE":
			document.getElementById("price_" + idRow).value = Number(ModelCSZE.modelPrice * ModelCSZE.NDS).toFixed(2);			
			break;
		case "CSE":
			document.getElementById("price_" + idRow).value = Number(ModelCSE.modelPrice * ModelCSE.NDS).toFixed(2);			
			break;
		case "CSCC":
			document.getElementById("price_" + idRow).value = Number(ModelCSCC.modelPrice * ModelCSCC.NDS).toFixed(2);			
			break;
	}
	changeValut(idRow);
	CalculatePrice(idRow);	
}
//бункеры
function getBunkerPrice(idRow){
	var type = language == 'RU' ? BunkerSelectorType  : BunkerSelectorTypeEN;
	switch(type.value){
		case 'Сходы':
			for(var i = 0; i < Bunker.length; i++){
				if(BunkerShod.value == Bunker[i].lotok){
					document.getElementById("price_" + idRow).value = Number(Bunker[i].price);
					changeValut(idRow);
					CalculatePrice(idRow);
				}
			}
			break;
		case 'Лотки':
			for(var i = 0; i < Bunker.length; i++){
				if(BunkerSelectorLotok.value == Bunker[i].lotok){
					document.getElementById("price_" + idRow).value = Number(Bunker[i].price);
					changeValut(idRow);
					CalculatePrice(idRow);
				}
			}		
			break;	
			case 'Kits':
				for(var i = 0; i < Bunker.length; i++){
					if(BunkerShod.value == Bunker[i].lotok){
						document.getElementById("price_" + idRow).value = Number(Bunker[i].price);
						changeValut(idRow);
						CalculatePrice(idRow);
					}
				}
				break;
			case 'Trays':
				for(var i = 0; i < Bunker.length; i++){
					if(BunkerShod.value == Bunker[i].lotok){
						document.getElementById("price_" + idRow).value = Number(Bunker[i].price);
						changeValut(idRow);
						CalculatePrice(idRow);
					}
				}
				break;
	}		
}
//Аспираторы
function getAspirationPrice(idRow){	
	var type = language == 'RU' ?AspirationSelectorType : AspirationSelectorTypeEN;
	switch(type.value){
		case 'Для фотосепаратора':
			for(var i = 0; i < Aspiration.length; i++){
				if(SelectorPhotoseparation.value == Aspiration[i].lotok){
					document.getElementById("price_" + idRow).value = Number(Aspiration[i].price);
					changeValut(idRow);
					CalculatePrice(idRow);
				}
			}
			break;
		case 'Для лотка':
			for(var i = 0; i < Aspiration.length; i++){
				if(SelectorLotok.value == Aspiration[i].lotok){
					document.getElementById("price_" + idRow).value = Number(Aspiration[i].price);
					changeValut(idRow);
					CalculatePrice(idRow);
				}
			}		
			break;
		case 'For P/S':
			for(var i = 0; i < Aspiration.length; i++){
				if(SelectorPhotoseparation.value == Aspiration[i].lotok){
					document.getElementById("price_" + idRow).value = Number(Aspiration[i].price);
					changeValut(idRow);
					CalculatePrice(idRow);
				}
			}
			break;
		case 'For tray':
			for(var i = 0; i < Aspiration.length; i++){
				if(SelectorPhotoseparation.value == Aspiration[i].lotok){
					document.getElementById("price_" + idRow).value = Number(Aspiration[i].price);
					changeValut(idRow);
					CalculatePrice(idRow);
				}
			}
			break;	
	}	
}
//Комплектующие
function getComplectationPrice(idRow){
	for(var i = 0; i < Complect.length; i++){
		if(ComplectationSelector.children[0].children[0].value == Complect[i][language]){
			document.getElementById("price_" + idRow).value = Number(Complect[i].price * CRB_RUB_RATE[Complect[i].vault].Value).toFixed(2);
			changeValut(idRow);
			CalculatePrice(idRow);
		}
	}		
}
//ДАТИРОВКА СТРАНЦЫ И ПР
function autoPageNumber(){
	var pages = document.getElementsByClassName("a4");
	var bottomBlock = document.getElementsByClassName("pageBottomBlock");
	var pageNumber = 1;
	var lastPage;
	for(var i = 0; i < pages.length; i++){
		pages[i].style.height = "";
		if(pages[i].style.display != "none"){
			bottomBlock[i].children[1].children[1].textContent = language == 'RU' ? "стр. " + pageNumber : "page " + pageNumber;
			pageNumber++;
			lastPage = i;
		}
	}
	pages[lastPage].style = "height:290mm; page-break-after: auto;";
}
//Работа с элементами КП
function returnTrueName(modelRU){
	if(modelRU.split(' ').length == 4){
		var last = modelRU.split(' ')[2] + " " + modelRU.split(' ')[3];
	}
	else if(modelRU.split(' ').length == 5){
		var last = modelRU.split(' ')[2] + " " + modelRU.split(' ')[3] + " " + modelRU.split(' ')[4];
	}
	else{
		var last = modelRU.split(' ')[1] + " " + modelRU.split(' ')[2];
	}
	for(var i = 0; i < Main.length; i++){
		if(Model[calcElevator.value].Model == Main[i].Model){
			var trueName = Main[i].Model + " " + last;
			break;
		}
	}
	return trueName;
}
function addComercialOfferElement(selectType, idRow){
	switch(selectType){
		case "0":
			ComercialOfferElements.push(
				{
					"data_type": "ColorSorter", 
					"id_task": InfoDeal.id_deal,
					"id_offer": InfoDeal.id_commercial_offer,
					"model": returnTrueName(document.getElementById("componentName_"+idRow).textContent),
					"count": document.getElementById("count_"+idRow).value,
					"price": document.getElementById("price_"+idRow).value,
					"discount": document.getElementById("discountSum_"+idRow).value,
					"date": coDate.textContent,
					"relevance": true
				}
			);
			break;
		case "1":
			ComercialOfferElements.push(
				{	
					"data_type": "Compressor", 
					"id_task": InfoDeal.id_deal,
					"id_offer": InfoDeal.id_commercial_offer,
					"model": document.getElementById("componentName_"+idRow).textContent,
					"count": document.getElementById("count_"+idRow).value,
					"price": document.getElementById("price_"+idRow).value,
					"discount": document.getElementById("discountSum_"+idRow).value,
					"date": coDate.textContent,
					"relevance": true
				}
			);
			break;
		case "2":
			ComercialOfferElements.push(
				{
					"data_type": "Protocol", 
					"id_task": InfoDeal.id_deal,
					"id_offer": InfoDeal.id_commercial_offer,
					"id_protocol": protocol.id_protocol,
					"name": document.getElementById("componentName_"+idRow).textContent,
					"date": coDate.textContent,
					"relevance": true
				}
			);
			break;
		case "3":
			ComercialOfferElements.push(
				{
					"data_type": "Elevator", 
					"id_task": InfoDeal.id_deal,
					"id_offer": InfoDeal.id_commercial_offer,
					"id_commercial_offer_elevator": elevatorSelector.children[0].children[0].children[0].value,
					"model": document.getElementById("componentName_"+idRow).textContent,
					"count": document.getElementById("count_"+idRow).value,
					"price": document.getElementById("price_"+idRow).value,
					"discount": document.getElementById("discountSum_"+idRow).value,
					"date": coDate.textContent,
					"relevance": true
				}
			);
			break;
		case "4":
			ComercialOfferElements.push(
				{
					"data_type": "Bunker", 
					"id_task": InfoDeal.id_deal,
					"id_offer": InfoDeal.id_commercial_offer,
					"id_commercial_offer_elevator": elevatorSelector.children[0].children[0].children[0].value,
					"model": document.getElementById("componentName_"+idRow).textContent,
					"count": document.getElementById("count_"+idRow).value,
					"price": document.getElementById("price_"+idRow).value,
					"discount": document.getElementById("discountSum_"+idRow).value,
					"date": coDate.textContent,
					"relevance": true
				}
			);
			break;
		case "5":
			ComercialOfferElements.push(
				{
					"data_type": "Aspiration", 
					"id_task": InfoDeal.id_deal,
					"id_offer": InfoDeal.id_commercial_offer,
					"id_commercial_offer_elevator": elevatorSelector.children[0].children[0].children[0].value,
					"model": document.getElementById("componentName_"+idRow).textContent,
					"count": document.getElementById("count_"+idRow).value,
					"price": document.getElementById("price_"+idRow).value,
					"discount": document.getElementById("discountSum_"+idRow).value,
					"date": coDate.textContent,
					"relevance": true
				}
			);
			break;
		case "7":
			ComercialOfferElements.push(
				{
					"data_type": "Other", 
					"id_task": InfoDeal.id_deal,
					"id_offer": InfoDeal.id_commercial_offer,
					"otherName": document.getElementById("componentName_"+idRow).textContent,
					"count": document.getElementById("count_"+idRow).value,
					"price": document.getElementById("price_"+idRow).value,
					"discount": document.getElementById("discountSum_"+idRow).value,
					"date": coDate.textContent,
					"relevance": true
				}
			);
			break;
		case "8":
			ComercialOfferElements.push(
				{
					"data_type": "Lift", 
					"id_task": InfoDeal.id_deal,
					"id_offer": InfoDeal.id_commercial_offer,
					"model": document.getElementById("componentName_"+idRow).textContent,
					"count": document.getElementById("count_"+idRow).value,
					"price": document.getElementById("price_"+idRow).value,
					"discount": document.getElementById("discountSum_"+idRow).value,
					"date": coDate.textContent,
					"relevance": true
				}
			);
			break;
		case "9":
			ComercialOfferElements.push(
				{
					"data_type": "Import", 
					"id_task": InfoDeal.id_deal,
					"id_offer": InfoDeal.id_commercial_offer,
					"model": document.getElementById("componentName_"+idRow).textContent,
					"count": document.getElementById("count_"+idRow).value,
					"price": document.getElementById("price_"+idRow).value,
					"discount": document.getElementById("discountSum_"+idRow).value,
					"date": coDate.textContent,
					"relevance": true
				}
			);
			break;
	}
	checkDayToDelivery();
}
//Изменение скроков поставки
function checkDayToDelivery(){
	for(var i = 0; i < ComercialOfferElements.length; i++){
		document.getElementById('delivery').textContent = "В течение 30 рабочих дней при условии поступления суммы на расчетный счет.";
		if(ComercialOfferElements[i].data_type == "ColorSorter" && ComercialOfferElements[i].model.match(/4|5|6/)){
			document.getElementById('delivery').textContent = "В течение 60 рабочих дней при условии поступления суммы на расчетный счет.";
			break;
		}
		if(ComercialOfferElements[i].data_type == "Lift"){
			document.getElementById('delivery').textContent = "В течение 90 рабочих дней при условии поступления суммы на расчетный счет.";
			document.getElementById('priceInclude').textContent = "Стоимость оборудования. Ввод в эксплуатацию."
			document.getElementById('warranty').textContent = "Срок гарантии на поставляемое оборудование 12 месяцев."
			document.getElementById('commissioning').textContent = "Работы, связанные с монтажом и установкой оборудования, а так же все подготовительные мероприятия по подключению оборудования производятся Покупателем своими силами и за свой счет.  Поставщик на месте контролирует и принимает работу."
			break;
		}
	}
	setupLangDelivery();
}
function updateComercialOfferElement(idRow){
	if(ComercialOfferElements[idRow-1].model != null)
		ComercialOfferElements[idRow-1].model = ComercialOfferElements[idRow-1].data_type == "ColorSorter" ? returnTrueName(document.getElementById("componentName_"+idRow).textContent) : document.getElementById("componentName_"+idRow).textContent;	
	else
		ComercialOfferElements[idRow-1].otherName = document.getElementById("componentName_"+idRow).textContent;
	
	ComercialOfferElements[idRow-1].count  = document.getElementById("count_"+idRow).value;
	ComercialOfferElements[idRow-1].price  = document.getElementById("price_"+idRow).value;
	ComercialOfferElements[idRow-1].discount  = document.getElementById("discountSum_"+idRow).value;
}
function returnOtherName(idRow){
	return function(e){
		ComercialOfferElements[idRow-1].otherName = document.getElementById("componentName_"+idRow).textContent;
	}
}
//НАСТРОЙКА ДАТЫ КП
var string_end_data;

function setupEndDate(){
	var day = coDate.textContent.split(".")[0];
	var month = coDate.textContent.split(".")[1];
	var year = coDate.textContent.split(".")[2];
	var create_dete = new Date(month + "/" + day + "/" + year);
	var end_data = new Date(create_dete);
	end_data.setDate(create_dete.getDate()+3);

	var end_data_month = Number(end_data.getMonth()) < 9 ? "0" + Number(end_data.getMonth() + 1) : Number(end_data.getMonth() + 1);
	string_end_data = end_data.getDate() + "." + end_data_month + "." + end_data.getFullYear();
	var botLogo = document.getElementsByClassName("bottomLogoText");
	for(var i = 0; i < botLogo.length; i++){
		var textBlock = document.getElementsByClassName('bottomLogoText')[i];
		textBlock.children[0].textContent = language == 'RU' ? "предложение действительно до " + string_end_data : 'offer valid until' + string_end_data;
	}
	
}
function changeEconomModel(){
	var select = language == 'RU' ? headerTooltip.children[6].children[0].children[0] : headerTooltip.children[6].children[1].children[0];
	switch(language){
		case'RU':
			switch(select.value){
				case "0":
				  priceValueTitle.innerHTML = "Цена, руб";
				  priceSumTitle.innerHTML = "Сумма, руб";
				  discountValueTitle.innerHTML = "Скидка,руб";
				  discountSumTitle.innerHTML = "Цена со" + "<br>" + "скидкой, руб"
				  ndsTitle.innerHTML = "В т.ч. НДС, руб";
				  break;
				case "1":
				  priceValueTitle.innerHTML = "Цена, руб";
				  priceSumTitle.innerHTML = "Сумма, руб";
				  discountValueTitle.innerHTML = "Скидка,руб";
				  discountSumTitle.innerHTML = "Цена со" + "<br>" + "скидкой, руб"
				  ndsTitle.innerHTML = "В т.ч. НДС (0%)";	
				  break;
				case "2":
				  priceValueTitle.innerHTML = "Цена, доллар";
				  priceSumTitle.innerHTML = "Сумма, доллар";
				  discountValueTitle.innerHTML = "Скидка, доллар";
				  discountSumTitle.innerHTML = "Цена со" + "<br>" + "скидкой, доллар"
				  ndsTitle.innerHTML = "В т.ч. НДС (0%)";	
				  break;
				case "3":
				  priceValueTitle.innerHTML = "Цена, евро";
				  priceSumTitle.innerHTML = "Сумма, евро";
				  discountValueTitle.innerHTML = "Скидка, евро";
				  discountSumTitle.innerHTML = "Цена со" + "<br>" + "скидкой, евро"
				  ndsTitle.innerHTML = "В т.ч. НДС (0%)";
				  break;
			  }
			break;
		case'EN':
			switch(select.value){
				case "0":
				  priceValueTitle.innerHTML = "Price, RUB";
				  priceSumTitle.innerHTML = "Sum, RUB";
				  discountValueTitle.innerHTML = "Discount,RUB";
				  discountSumTitle.innerHTML = "Discounted " + "<br>" + "price, RUB"
				  ndsTitle.innerHTML = "incl. VAT, руб";
				  break;
				case "1":
				  priceValueTitle.innerHTML = "Price, RUB";
				  priceSumTitle.innerHTML = "Sum, RUB";
				  discountValueTitle.innerHTML = "Discount,RUB";
				  discountSumTitle.innerHTML = "Discounted " + "<br>" + "price, RUB"
				  ndsTitle.innerHTML = "incl. VAT (0%)";	
				  break;
				case "2":
				  priceValueTitle.innerHTML = "Price, Dollar";
				  priceSumTitle.innerHTML = "Sum, Dollar";
				  discountValueTitle.innerHTML = "Discount, Dollar";
				  discountSumTitle.innerHTML = "Discounted " + "<br>" + "price, Dollar"
				  ndsTitle.innerHTML = "incl. VAT (0%)";	
				  break;
				case "3":
				  priceValueTitle.innerHTML = "ЦPrice, Euro";
				  priceSumTitle.innerHTML = "Sum, Euro";
				  discountValueTitle.innerHTML = "Discount, Euro";
				  discountSumTitle.innerHTML = "Discounted " + "<br>" + "price, Euro"
				  ndsTitle.innerHTML = "incl. VAT (0%)";
				  break;
			  }
			break;
	}	
	
	for(var i = 1; i < priceModelBlock.children.length; i++){
		changeValut(i,ecc);
		CalculatePrice(i);
	}
	CalculationSum();
}
//Переключение типа скидки (рубли или проценты)
function changeDiscountType(){
	var select = headerTooltip.children[7].children[0];
	switch(select.value){
		case "0":
			discountValueTitle.textContent = language == "RU"? "Скидка,руб" : "Discount, RUB";
			//Перевод процентной скидки в рубли
			for(var id = 1; id < priceModelBlock.children.length; id++){
				document.getElementById('discountValue_'+ id).value = Number(document.getElementById('sum_'+ id).value) / 100 * Number(document.getElementById('discountValue_'+ id).value);
				document.getElementById('discountValue_'+ id).value = Number(document.getElementById('discountValue_'+ id).value).toFixed(2);
			}
			break;
		case "1":
			discountValueTitle.textContent = language == "RU"? "Скидка,%" : "Discount, %";			
			//Перевод скидки из рублей в проценты
			for(var id = 1; id < priceModelBlock.children.length; id++){
				document.getElementById('discountValue_'+ id).value = Number(document.getElementById('discountValue_'+ id).value) / Number(document.getElementById('sum_'+ id).value) * 100;
				document.getElementById('discountValue_'+ id).value = Number(document.getElementById('discountValue_'+ id).value).toFixed(2);
			}
			break;
	}
	for(var i = 1; i < priceModelBlock.children.length; i++){
		CalculatePrice(i);
	}
	CalculationSum()
}
function openElevatorSite(){
	if(InfoDeal.id_deal != "id_deal"){
		var queryString = document.location.search;
		var id_string = queryString.split("=")[1];
		
		if(queryString.search("d_") != -1){
			window.open("http://csort-transport.ru/calc?id=nw&"+InfoDeal.id_contact+"&d_"+InfoDeal.id_deal);
		}
		else if(queryString.search("s_") != -1){
					window.open("http://csort-transport.ru/calc?id=nw&"+InfoDeal.id_contact+"&s_"+InfoDeal.id_deal);
		}
		else{
			window.open("http://csort-transport.ru/calc?id="+InfoDeal.id_contact+"&"+InfoDeal.id_deal);
		}
	}
	else
		window.open("http://csort-transport.ru/calc");
}
function openProtocolSite(){
	if(InfoDeal.id_deal != "id_deal")
		window.open("http://csort-request.ru/protocol?id="+InfoDeal.id_deal);
	else
		window.open("http://csort-request.ru/protocol");
}
//УСЛОВИЯ ПОСТАВКИ
function setupDelivery(){
	var delivery = document.getElementById("deliverySelector");
	var payment = document.getElementById("paymentSelector");	  
	var costInclude = document.getElementById("costIncludeSelector");	  
	var commissioning = document.getElementById("commissioningSelector");	  
	var guarantee = document.getElementById("guaranteeSelector");

	for(var i = 0; i < Conditions.length; i++){
		if(Conditions[i].delivery != "-"){
			var option =  document.createElement("option");
			option.value = i;
			option.text = "вариант " + Number(i+1);
			delivery.add(option);
		}
		/*if(Conditions[i].termsOfPayment != "-"){
			var option =  document.createElement("option");
			option.value = i;
			option.text = "вариант " + Number(i+1);
			payment.add(option);
		}*/
		if(Conditions[i].priceIncludes != "-"){
			var option =  document.createElement("option");
			option.value = i;
			option.text = "вариант " + Number(i+1);
			costInclude.add(option);
		}
		if(Conditions[i].Commissioning != "-"){
			var option =  document.createElement("option");
			option.value = i;
			option.text = "вариант " + Number(i+1);
			commissioning.add(option);
		}
		if(Conditions[i].guarantee != "-"){
			var option =  document.createElement("option");
			option.value = i;
			option.text = "вариант " + Number(i+1);
			guarantee.add(option);
		}
	}
	
	setupLangDelivery();
}

function changeDelivery(id){
	switch(id){
		case'deliverySelector':
			document.getElementById('delivery').textContent = Translate.Delivery[0].delivery[language];
			break;
		/*case'paymentSelector':
			document.getElementById('payment').textContent = Translate.Delivery[0].payment[language];
			break;*/
		case'commissioningSelector':
			document.getElementById('commissioning').textContent = commissioningSelector.value == '0' ? Translate.Delivery[0].commissioning[language] : Translate.Delivery[0].commissioning2[language];
			break;
		case'costIncludeSelector':
			document.getElementById('priceInclude').textContent = costIncludeSelector.value == '0' ? Translate.Delivery[0].priceInclude[language] : Translate.Delivery[0].priceInclude2[language];
			break;
		case'guaranteeSelector':
			document.getElementById('warranty').textContent = Translate.Delivery[0].warranty[language];
			break;
	}
	
 }

function changeValut(id,_ecc){
	var selectRegion = language == 'RU'? headerTooltip.children[6].children[0].children[0].value :headerTooltip.children[6].children[1].children[0].value;
	
	switch(_ecc){
		case "2":
			document.getElementById('price_' + id).value = Number(document.getElementById('price_' + id).value * CRB_RUB_RATE.USD.Value).toFixed(2);
			break;
		case "3":
			document.getElementById('price_' + id).value = Number(document.getElementById('price_' + id).value * CRB_RUB_RATE.EUR.Value).toFixed(2);
			break;
	}
	switch(selectRegion){
		case "2":
			document.getElementById('price_' + id).value = Number(document.getElementById('price_' + id).value / CRB_RUB_RATE.USD.Value).toFixed(2);
			break;
		case "3":
			document.getElementById('price_' + id).value = Number(document.getElementById('price_' + id).value / CRB_RUB_RATE.EUR.Value).toFixed(2);
			break;
	}
}

//Возвращение наименования страны производителя
function MR_country(motor_reductor){
	switch(motor_reductor){
		case "it":
			var country = language == 'RU'?  "Италия" : 'Italy';
			break;
		case "ch":
			var country = language == 'RU'?  "Китай" : 'China';
			break;		
	}
	
	return country;
}


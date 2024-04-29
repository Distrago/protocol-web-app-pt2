var product_name_route = "";
var product_description_route = "";
var weed_name_route = "";
var weed_description_route = "";
var patern_product_route = "";
var patern_product_purpose_route = "";

//Функция подгрузки всех таблиц для работы
function load_table(){
	get_product_name();
	get_product_description();
	get_weed_name();
	get_weed_description();
	
	get_patern_product();
	get_patern_product_purpose();
}

//Таблица Классификации продуката
function get_product_name(){
	$.getJSON($SCRIPT_ROOT + '/request/product_name', {
    }, function (data) {
		for(var i=0; i< data.result.length; i++){
			var ID_Product = data.result[i].ID_Product;
			var ID_Name = data.result[i].ID_Name;
			var product = data.result[i].product;
			var addName = data.result[i].addName;
			var minM = data.result[i].minM;
			var maxM = data.result[i].maxM;
			var M = data.result[i].M;
			
			generate_сlassification_product_name(ID_Product, ID_Name, product, addName, minM, maxM, M);
		}
		console.log("Таблица(объект) сlassification_product_name передана");
    });
    return false;
}

function get_product_description(){
	$.getJSON($SCRIPT_ROOT + '/request/product_description', {
    }, function (data) {
		for(var i=0; i< data.result.length; i++){
			var ID_Description = data.result[i].ID_Description;
			var ID_Class = data.result[i].ID_Class;
			var description = data.result[i].description;
			var percent_M = data.result[i].percent_M;
			var ID_Products = data.result[i].ID_Products;

			generate_сlassification_product_description(ID_Description, ID_Class, description, percent_M, ID_Products);
		}
		console.log("Таблица(объект) сlassification_product_description передана");
    });
    return false;
}

function get_weed_name(){
	$.getJSON($SCRIPT_ROOT + '/request/weed_name', {
    }, function (data) {
		for(var i=0; i< data.result.length; i++){
			var ID_Weed = data.result[i].ID_Weed;
			var ID_Class = data.result[i].ID_Class;
			var ID_Name = data.result[i].ID_Name;
			var weed = data.result[i].weed;
			var minM = data.result[i].minM;
			var maxM = data.result[i].maxM;
			var M = data.result[i].M;

			generate_сlassification_weed_name(ID_Weed, ID_Class, ID_Name, weed, minM, maxM, M);
		}
		console.log("Таблица(объект) сlassification_weed_name передана");
    });
    return false;
}

function get_weed_description(){
	$.getJSON($SCRIPT_ROOT + '/request/weed_description', {
    }, function (data) {
		for(var i=0; i< data.result.length; i++){
			var ID_Description = data.result[i].ID_Description;
			var ID_Class = data.result[i].ID_Class;
			var description = data.result[i].description;

			generate_сlassification_weed_description(ID_Description, ID_Class, description);
		}
		console.log("Таблица(объект) сlassification_weed_description передана");
    });
    return false;
}

function get_patern_product(){
	$.getJSON($SCRIPT_ROOT + '/request/patern_product', {
    }, function (data) {
		for(var i=0; i< data.result.length; i++){
			var ID_Product = data.result[i].ID_Product;
			var ID_ProductGroup = data.result[i].ID_ProductGroup;
			var product = data.result[i].product;

			generate_nomenclature_product(ID_Product, ID_ProductGroup, product);
		}
		console.log("Таблица(объект) nomenclature_product передана");
    });
    return false;
}

function get_patern_product_purpose(){
	$.getJSON($SCRIPT_ROOT + '/request/patern_product_purpose', {
    }, function (data) {
		for(var i=0; i< data.result.length; i++){
			var ID_Purpose = data.result[i].ID_Purpose;
			var purpose = data.result[i].purpose;

			generate_nomenclature_product_purpose(ID_Purpose, purpose);
		}
		console.log("Таблица(объект) nomenclature_product_purpose передана");
    });
    return false;
}
//Записи в таблицу протоколов
var id_requirements;
function set_requirements(){
	$.getJSON($SCRIPT_ROOT + '/request/requirements', {
		id_protocol : protocolID.value,
		name_product : nomenclature_product[compositionInput_NameProduct.value].product,
		purpose_product : nomenclature_product_purpose[compositionInput_ProductPurpose.value].purpose,
		main_product_percent : (percent_main.value).toLocaleString(),
		photo_product : upload_img_src[0],
		capacity : (capacityInputValue_temp.value).toLocaleString(),
		fraction_count : fraction,
		companent_count : 2 + row,
		comment : "Тестовый комент, т.к. нету блок коментариев"
    }, function (data) {
		id_requirements = data.result;
		protocolFractionSave();
		console.log("Запись основной информации по протоколу произведена успешно");
    })
	  .fail(function() {
		set_requirements();
	  });
    return false;
}
var protocol_fraction_id;
var protocol_fraction_id_max;
var protocol_array_fraction = [];
var protocol_array_valid_itemBlock = [];

function set_fraction(_id_fraction, _id_valid_itemBlock){
	var _fraction_name = document.getElementById("fraction_"+_id_fraction).children[0].children[0].textContent;
	var _exit = document.getElementById("fraction_"+_id_fraction+"_TechBlock").children[0].children[0].children[0].value;
	var _purity_percent = document.getElementById("fraction_"+_id_fraction+"_TechBlock").children[0].children[0].children[1].value;
	var _capacity = document.getElementById("fraction_"+_id_fraction+"_TechBlock").children[0].children[0].children[2].value;
	var _comment = document.getElementById("fraction_" +_id_fraction +"_CommentBlock").children[0].value;
	
	var id_img = protocol_fraction_id+1;
	
	$.getJSON($SCRIPT_ROOT + '/request/fraction', {
		id_requirements : id_requirements,
		id_fraction : _id_fraction,
		id_valid_itemBlock : _id_valid_itemBlock, 
		fraction_name : _fraction_name, 
		selection : "-", 
		exit : _exit.toLocaleString(),
		purity_percent : (document.getElementById("fraction_"+_id_fraction+"_TechBlock").children[0].children[0].children[1].value).toLocaleString(),
		capacity : _capacity.toLocaleString(),
		comment : _comment,
		photo_fraction : upload_img_src[id_img]
    }, function (data) {
		if(protocol_fraction_id<protocol_fraction_id_max)
		{
			protocol_fraction_id++;
			set_fraction(protocol_array_fraction[protocol_fraction_id], protocol_array_valid_itemBlock[protocol_fraction_id]);
		}
		else if(protocol_fraction_id == protocol_fraction_id_max){
			protocolCompanentSave();
			console.log("Запись информации по фракциям произведенна успешно");
		}
    })
	  .fail(function() {
		set_fraction(protocol_array_fraction[protocol_fraction_id], protocol_array_valid_itemBlock[protocol_fraction_id]);
	  });
    return false;	
}

var protocol_companent;
var protocol_companent_max;
var protocol_array_companent = [];

function set_companent_mainInfo(id){
	var _id_companent = id.children[0].children[0];
	var _companent_name = id.children[1].children[0].children[1];
	var _companent_description = id.children[1].children[0].children[2];
	var _companent_value = id.children[1].children[0].children[3];
	var _companent_valid_check = id.children[1].children[0].children[7].children[0].children[0];
	
	var id_img = protocol_companent+protocol_fraction_id_max+2;
	
	$.getJSON($SCRIPT_ROOT + '/request/companent_mainInfo', {
		id_requirements : id_requirements,
		id_companent : _id_companent.textContent,
		companent_name : isNaN(Number(_companent_name.value)) == true ? _companent_name.value : _companent_name.options[_companent_name.selectedIndex].text, 
		companent_description : isNaN(Number(_companent_description.value)) == true ? _companent_description.value : _companent_description.options[_companent_description.selectedIndex].text, 
		companent_value : _companent_value.value.toLocaleString(), 
		unit_type : "1",
		companent_valid_check : _companent_valid_check.checked,
		companent_photo : upload_img_src[id_img]
    }, function (data) {
		if(protocol_companent<protocol_companent_max)
		{
			protocol_companent++;
			set_companent_mainInfo(protocol_array_companent[protocol_companent]);
		}
		else if(protocol_companent==protocol_companent_max){
			protolCompanentSaveADD(1);
			console.log("Запись информации по основным компонетам произведена успешно");
		}
    })
	  .fail(function() {
		set_companent_mainInfo(protocol_array_companent[protocol_companent]);
	  });	
    return false;	
}

function set_companent_addInfo(fracton_number, id){
	var _str_number = (row+2) - (protocol_companent + 1);
	var _companent_value = id.children[1].children[0].children[3];
	var _companent_valid_check = id.children[2].children[0].children[0];
	var _companent_warnin_check = id.children[3].children[0].children[0];
	
	$.getJSON($SCRIPT_ROOT + '/request/companent_addInfo', {
		id_fraction : fracton_number,
		str_number : _str_number, 
		companent_value : _companent_value.value.toLocaleString(), 
		unit_type : "1",
		companent_valid_check : _companent_valid_check.checked,
		companent_warnin_check : _companent_warnin_check.checked
    }, function (data) {
	if(protocol_companent<protocol_companent_max)
		{
			protocol_companent++;
			set_companent_addInfo(fracton_number, protocol_array_companent[protocol_companent])
		}
		else if(protocol_companent==protocol_companent_max && fracton_number != fraction){
			protolCompanentSaveADD(fracton_number+1);
		}
		else if(protocol_companent==protocol_companent_max && fracton_number == fraction){
			console.log("Запись информации по компонетам фракций произведена успешно");
			overlay.style.display = "none";
		}
    })
	.fail(function() {
		set_companent_addInfo(fracton_number,protocol_array_companent[protocol_companent]);
	  });
    return false;	
}
var upload_img_src = [];
var upload_count = 0
function upload_img(img_src, img_name){
	$.post($SCRIPT_ROOT + '/request/upload', {
		img_name: img_name,
		base64_img : img_src.substring(22)
	}, function(data){
		upload_count++; //счетчик изображений
		
		if(upload_count == (row+fraction+3))
			set_requirements();
	});
}
var google_img_id = []
function upload_to_google(){
	$.post($SCRIPT_ROOT + '/reques/upload_to_google', {
		protocolID : protocolID.value != "" ? protocolID.value : "test",
		fraction_coint : fraction,
		add_companents : row
	}, function(data){
		google_img_id = data.result;
		set_requirements();
	});
}


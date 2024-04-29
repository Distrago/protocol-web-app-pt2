var list_industry = [];
var list_productGroup = [];
var list_product = [];
var list_productType = [];
var list_purpose = [];
var list_GOST = [];
var list_segment = [];
var list_region = [];
var list_descriptionSeed = [];

var list_categoryWeed = [];
var list_classWeed = [];
var list_weed = [];
var list_descriptionWeeed = [];

var list_productPart = [];
var list_productStatus = [];
var list_productColor = [];


var list_machine = [];
var list_configuration = [];



//Популярные продукты
var list_protocolTop = [];

//Классификаторы продукта
function read_industry(){
	$.getJSON($SCRIPT_ROOT + '/protocol/classifier/industry',{	
	}, function(data){
		for(var i = 0; i< data.result.length; i++){
			list_industry.push({
				"id_industry": Number(data.result[i]["ID_Industry"]),
				"industryName": data.result[i]["industryName"]
			});
		}
		read_productGroup();
	})
	.fail(function(){
		read_industry();
	});
}

function read_productGroup(){
	$.getJSON($SCRIPT_ROOT + '/protocol/classifier/productGroup',{	
	}, function(data){
		for(var i = 0; i< data.result.length; i++){
			var purpose_list = data.result[i]["purpose_list"].split(", ");
			
			list_productGroup.push({
				"id_productGroup": Number(data.result[i]["ID_ProductGroup"]),
				"productGroupName": data.result[i]["productGroupName"],
				"purpose_list": purpose_list
			});
		}
		read_product();
	})
	.fail(function(){
		read_productGroup();
	});
}

function read_product(){
	$.getJSON($SCRIPT_ROOT + '/protocol/classifier/product',{	
	}, function(data){
		for(var i = 0; i< data.result.length; i++){
			list_product.push({
				"id_product": Number(data.result[i]["ID_Product"]),
				"id_productGroup": Number(data.result[i]["ID_ProductGroup"]),
                "productName": data.result[i]["productName"],
                "wikilink": data.result[i]["wikilink"],
                "purpose_seed": data.result[i]["purpose_seed"].split(","),
                "purpose_fodder": data.result[i]["purpose_fodder"].split(","),
                "purpose_raw": data.result[i]["purpose_raw"].split(",")                
			});
		}
		read_productType();
	})
	.fail(function(){
		read_product();
	});
}

function read_productType(){
	$.getJSON($SCRIPT_ROOT + '/protocol/classifier/productType',{	
	}, function(data){
		for(var i = 0; i< data.result.length; i++){
			list_productType.push({
				"id_productType": Number(data.result[i]["ID_ProductType"]),
				"id_product": Number(data.result[i]["ID_Product"]),
				"productTypeName": data.result[i]["productTypeName"]
			});
		}
		read_purpose();
	})
	.fail(function(){
		read_productType();
	});
}

function read_purpose(){
	$.getJSON($SCRIPT_ROOT + '/protocol/classifier/purpose',{	
	}, function(data){
		for(var i = 0; i< data.result.length; i++){
			list_purpose.push({
				"id_purpose": Number(data.result[i]["ID_Purpose"]),
				"purposeName": data.result[i]["purposeName"],
			});
		}
		read_GOST();
	})
	.fail(function(){
		read_purpose();
	});	
}

function read_GOST(){
	$.getJSON($SCRIPT_ROOT + '/protocol/classifier/gost',{	
	}, function(data){
		for(var i = 0; i< data.result.length; i++){
			list_GOST.push({
				"ID_gost": data.result[i]["ID_gost"],
				"gostName": data.result[i]["gostName"],
                "description": data.result[i]["description"],
                "link": data.result[i]["link"],                           
			});
		}
		read_segment();
	})
	.fail(function(){
		read_GOST();
	});
}

function read_segment(){
	$.getJSON($SCRIPT_ROOT + '/protocol/classifier/segment',{	
	}, function(data){
		for(var i = 0; i< data.result.length; i++){
			list_segment.push({
				"id_segment": Number(data.result[i]["ID_Segment"]),
				"segmentName": data.result[i]["segmentName"]
			});
		}
		read_region();
	})
	.fail(function(){
		read_segment();
	});
}
function read_region(){
	$.getJSON($SCRIPT_ROOT + '/protocol/classifier/region',{	
	}, function(data){
		for(var i = 0; i< data.result.length; i++){
			list_region.push({
				"id_region": Number(data.result[i]["ID_Region"]),
				"regionName": data.result[i]["regionName"]
			});
		}
		read_category();
	})
	.fail(function(){
		read_region();
	});
}
//Классификаторы засорителя
function read_category(){
	$.getJSON($SCRIPT_ROOT + '/protocol/classifier/category',{	
	}, function(data){
		for(var i = 0; i< data.result.length; i++){
			list_categoryWeed.push({
				"id_category": Number(data.result[i]["ID_Category"]),
				"category": data.result[i]["category"]
			});
		}
		read_classWeed();
	})
	.fail(function(){
		read_category();
	});
}

function read_classWeed(){
	$.getJSON($SCRIPT_ROOT + '/protocol/classifier/classWeed',{	
	}, function(data){
		for(var i = 0; i< data.result.length; i++){
			list_classWeed.push({
				"id_class": Number(data.result[i]["ID_Class"]),
				"id_category": Number(data.result[i]["ID_Category"]),
				"className": data.result[i]["className"]
			});
		}
		read_weed();
	})
	.fail(function(){
		read_classWeed();
	});
}

function read_weed(){
	$.getJSON($SCRIPT_ROOT + '/protocol/classifier/weed',{	
	}, function(data){
		for(var i = 0; i< data.result.length; i++){
			list_weed.push({
				"id_weed": Number(data.result[i]["ID_Weed"]),
				"id_class": Number(data.result[i]["ID_Class"]),
				"weedName": data.result[i]["weedName"]
			});
		}
		read_descriptionWeed();
	})
	.fail(function(){
		read_weed();
	});
}

function read_descriptionWeed(){
	$.getJSON($SCRIPT_ROOT + '/protocol/classifier/descriptionWeed',{	
	}, function(data){
		for(var i = 0; i< data.result.length; i++){
			list_descriptionWeeed.push({
				"id_description": Number(data.result[i]["ID_Description"]),
				"id_category": Number(data.result[i]["ID_Category"]),
				"id_class": Number(data.result[i]["ID_Class"]),
				"descriptionName": data.result[i]["descriptionName"]
			});
			list_descriptionSeed.push({
				"id_description": Number(data.result[i]["ID_Description"]),
				"descriptionName": data.result[i]["descriptionName"]
			});
		}
		read_ProductPart();
	})
	.fail(function(){
		read_descriptionWeed();
	});
}

function read_ProductPart(){
	$.getJSON($SCRIPT_ROOT + '/protocol/classifier/productPart',{	
	}, function(data){
		for(var i = 0; i< data.result.length; i++){
			list_productPart.push({
				"id_group": data.result[i]["id_group"],
				"id_number": data.result[i]["id_number"],
				"productPart": data.result[i]["productPart"]
			});
		}
		read_ProductStatus();
	})
	.fail(function(){
		read_ProductPart();
	});
}
function read_ProductStatus(){
	$.getJSON($SCRIPT_ROOT + '/protocol/classifier/productStatus',{	
	}, function(data){
		for(var i = 0; i< data.result.length; i++){
			list_productStatus.push({
				"id_group": data.result[i]["id_group"],
				"id_number": data.result[i]["id_number"],
				"productStatus": data.result[i]["productStatus"]
			});
		}
		read_ProductColor();
	})
	.fail(function(){
		read_ProductStatus();
	});
}
function read_ProductColor(){
	$.getJSON($SCRIPT_ROOT + '/protocol/classifier/productColor',{	
	}, function(data){
		for(var i = 0; i< data.result.length; i++){
			list_productColor.push({
				"id_group": data.result[i]["id_group"],
				"id_number": data.result[i]["id_number"],
				"productColor": data.result[i]["productColor"]
			});
		}
		read_machine();
	})
	.fail(function(){
		read_ProductColor();
	});
}

function read_machine(){
	$.getJSON($SCRIPT_ROOT + '/protocol/classifier/machine',{	
	}, function(data){
		for(var i = 0; i< data.result.length; i++){
			list_machine.push({
				"id_machine": data.result[i]["id_machine"],
				"machineName": data.result[i]["machineName"],
				"id_configration": data.result[i]["id_configration"].split(", "),
				"gabarit": data.result[i]["gabarit"].split(", "),
                "col1": data.result[i]["col1"],
                "col2": data.result[i]["col2"],
                "col3": data.result[i]["col3"],
                "col4": data.result[i]["col4"],  
                "col5": data.result[i]["col5"],
                "col6": data.result[i]["col6"],
                "col7": data.result[i]["col7"],
                "id_industry": data.result[i]["id_industry"].split(", ")
			});
		}
		read_configuration();
	})
	.fail(function(){
		read_machine();
	});
}

function read_configuration(){
	$.getJSON($SCRIPT_ROOT + '/protocol/classifier/configuration',{	
	}, function(data){
		for(var i = 0; i< data.result.length; i++){
			list_configuration.push({
				"id_configuration": data.result[i]["id_configuration"],
				"configuration": data.result[i]["configuration"]                                           
			});
		}
		setupTableInfo();
	})
	.fail(function(){
		read_configuration();
	});
}

//Получение списка популярности продуктов
function get_protocolTop(){
	$.getJSON($SCRIPT_ROOT + '/protocol/get_TopComponent',{	
	}, function(data){
		for(var i = 0; i < data.result.length; i++){
			if(data.result[i][1] > 2)
				list_protocolTop.push(data.result[i][0]);
		}
	})
	.fail(function(){
		
	});
}
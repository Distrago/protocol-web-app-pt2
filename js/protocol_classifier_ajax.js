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

var list_machine = []
var list_configuration = []

//Классификаторы продукта
function read_industry(){
	overlay.style.display = "flex";
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
		read_machine();
	})
	.fail(function(){
		read_descriptionWeed();
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
		read_manager();
	})
	.fail(function(){
		read_configuration();
	});
}
//Функции настройки классификатора основного продукта (продукт)
function sourceProductSetupIndusrty(){
	var IndustryElement = productClassifier.children[0].children[0].children[1].children[0];
	for(var i = 0; i<list_industry.length; i++){
			var option = document.createElement('option');
			option.text = list_industry[i].industryName;
			option.value = list_industry[i].id_industry;
			IndustryElement.add(option);
	}
}

function sourceProductSetupProductGroup(){
	var ProductGroupElement = productClassifier.children[0].children[0].children[3].children[0];
	var ProductDescription = productClassifier.children[0].children[0].children[7].children[0];
	for(var i = 0; i<list_productGroup.length; i++){
		var option = document.createElement('option');
		option.text = list_productGroup[i].productGroupName;
		option.value = list_productGroup[i].id_productGroup;
		ProductGroupElement.add(option);
	}
	for(var i = 0; i<list_descriptionSeed.length; i++){
		var option = document.createElement('option');
		option.text = list_descriptionSeed[i].descriptionName;
		option.value = list_descriptionSeed[i].id_description;
		ProductDescription.add(option);
	}
}

function sourceProductSetupProduct(){
	var ProductElement = productClassifier.children[0].children[0].children[5].children[0];
	var ProductGroupElement = productClassifier.children[0].children[0].children[3].children[0];
	var id_productGroup = Number(ProductGroupElement.value);
	
	for(var i = 0; i<list_product.length; i++){
		if(id_productGroup == list_product[i].id_productGroup){
			var option = document.createElement('option');
			option.text = list_product[i].productName;
			option.value = list_product[i].id_product;
			ProductElement.add(option);
		}
	}
}
function sourceProductSetupProductType(){
	var ProductTypeElement = productClassifier.children[0].children[0].children[9].children[0];
	var ProductElement = productClassifier.children[0].children[0].children[5].children[0];
	var id_product = Number(ProductElement.value);
	//Можно ускорить
	for(var i = 0; i < list_productType.length; i++){
		if(id_product == list_productType[i].id_product){
			var option = document.createElement('option');
			option.text = list_productType[i].productTypeName;
			option.value = list_productType[i].id_productType;
			ProductTypeElement.add(option);			
		}
	}
}

function sourceProductSetupPurpose(){
	var PurposeElement = productClassifier.children[0].children[0].children[13].children[0];
	var ProductGroupElement = productClassifier.children[0].children[0].children[3].children[0];
	var id_productGroup = Number(ProductGroupElement.value);
	
	for(var i = 0; i<list_productGroup[id_productGroup].purpose_list.length; i++){
		var number = Number(list_productGroup[id_productGroup].purpose_list[i]);
		for(var j = 0; j<list_purpose.length; j++){
			if(list_purpose[j].id_purpose == number)
			{
				var option = document.createElement('option');
				option.text = list_purpose[j].purposeName;
				option.value = list_purpose[j].id_purpose;
				PurposeElement.add(option);
			}
		}
	}	
}
//Функции настройки классификатора основного продукта (засоритель)
function sourceProductSetupIndusrtyWeed(){
	var IndustryWeedElement = productClassifier.children[0].children[2].children[1].children[0];
	for(var i = 0; i<list_industry.length; i++){
		var option = document.createElement('option');
		option.text = list_industry[i].industryName;
		option.value = list_industry[i].id_industry;
		IndustryWeedElement.add(option);
	}
}

function sourceProductSetupCategory(){
	var CategoryElement = productClassifier.children[0].children[2].children[3].children[0];
	for(var i = 0; i<list_categoryWeed.length; i++){
		var option = document.createElement('option');
		option.text = list_categoryWeed[i].category;
		option.value = list_categoryWeed[i].id_category;
		CategoryElement.add(option);
	}
}

function sourceProductSetupClassWeed(){
	var CategoryElement = productClassifier.children[0].children[2].children[3].children[0];
	var ClassWeedElement = productClassifier.children[0].children[2].children[5].children[0];
	var id_category = Number(CategoryElement.value);
	
	for(var i = 0; i<list_classWeed.length; i++){
		if(id_category == list_classWeed[i].id_category){
			var option = document.createElement('option');
			option.text = list_classWeed[i].className;
			option.value = list_classWeed[i].id_class;
			ClassWeedElement.add(option);
		}		
	}
}

function sourceProductSetupWeed(){
	var ClassWeedElement = productClassifier.children[0].children[2].children[5].children[0];
	var WeedElement = productClassifier.children[0].children[2].children[7].children[0];
	var id_class = Number(ClassWeedElement.value);
	
	for(var i = 0; i<list_weed.length; i++){
		if(id_class == list_weed[i].id_class){
			var option = document.createElement('option');
			option.text = list_weed[i].weedName;
			option.value = list_weed[i].id_weed;
			WeedElement.add(option);
		}		
	}
}

function sourceProductSetupDescriptionWeeed(){
	var CategoryElement = productClassifier.children[0].children[2].children[3].children[0];
	var ClassWeedElement = productClassifier.children[0].children[2].children[5].children[0];
	var DescriptionElement = productClassifier.children[0].children[2].children[9].children[0];
	var id_category = Number(CategoryElement.value);
	var id_class = Number(ClassWeedElement.value);
	
	for(var i = 0; i<list_descriptionWeeed.length; i++){
		if(id_class == list_descriptionWeeed[i].id_class && id_category == list_descriptionWeeed[i].id_category){
			var option = document.createElement('option');
			option.text = list_descriptionWeeed[i].descriptionName;
			option.value = list_descriptionWeeed[i].id_description;
			DescriptionElement.add(option);
		}		
	}
}

function clearClassifierSelect(SelectElement){	
	for(var i = SelectElement.length-1; i > 0; i--){
		SelectElement.remove(i);
	}
}

function sourceProductClassifierAddEventListeners(){
	sourceProductSetupIndusrty();
	sourceProductSetupIndusrtyWeed();
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
	
	IndustryElement.addEventListener("change", function(){
		clearClassifierSelect(ProductDescription);
		clearClassifierSelect(ProductGroupElement);
		clearClassifierSelect(ProductElement);
		clearClassifierSelect(ProductTypeElement);
		clearClassifierSelect(PurposeElement);
		classifierSourceGOST(ProductElement.value,PurposeElement.value);
		
		if(IndustryElement.value == 0)
			sourceProductSetupProductGroup();
		else if(IndustryElement.value != 9999)
			alert("Функции ещё не готовы");
	});
	ProductGroupElement.addEventListener("change", function(){
		clearClassifierSelect(ProductElement);
		clearClassifierSelect(ProductTypeElement);
		clearClassifierSelect(PurposeElement);
		classifierSourceGOST(ProductElement.value,PurposeElement.value);
		
		if(ProductGroupElement.value != 9999){
			sourceProductSetupProduct();
			sourceProductSetupPurpose();
		}
	});
	ProductElement.addEventListener("change", function(){
		clearClassifierSelect(ProductTypeElement);
		classifierSourceGOST(ProductElement.value,PurposeElement.value);
		
		if(ProductElement.value != 9999){
			sourceProductSetupProductType();
		}
	});
	PurposeElement.addEventListener("change", function(){
		classifierSourceGOST(ProductElement.value,PurposeElement.value);
	});
	
	IndustryWeedElement.addEventListener("change", function(){
		clearClassifierSelect(CategoryElement);
		clearClassifierSelect(ClassWeedElement);
		clearClassifierSelect(WeedElement);
		clearClassifierSelect(DescriptionElement);
	
		if(IndustryWeedElement.value == 0)
			sourceProductSetupCategory();
		else if(IndustryWeedElement.value != 9999)
			alert("Функции ещё не готовы");		
	});
	
	CategoryElement.addEventListener("change", function(){
		clearClassifierSelect(ClassWeedElement);
		clearClassifierSelect(WeedElement);
		clearClassifierSelect(DescriptionElement);
		
		if(CategoryElement.value != 9999)
			sourceProductSetupClassWeed();
	});
	
	ClassWeedElement.addEventListener("change", function(){
		clearClassifierSelect(WeedElement);
		clearClassifierSelect(DescriptionElement);
		
		if(ClassWeedElement.value != 9999){
			sourceProductSetupWeed();
			sourceProductSetupDescriptionWeeed();
		}
	});
}

//Функции настройки классификатора для компонентов исходного продукта (продукт)
function sourceComponentsIndustrySetup(id){
	var classifier = document.getElementById("classifier_"+id);
	var IndustryElement = classifier.children[0].children[0].children[1].children[0];
	
	for(var i = 0; i<list_industry.length; i++){
		var option = document.createElement('option');
		option.text = list_industry[i].industryName;
		option.value = list_industry[i].id_industry;
		IndustryElement.add(option);
	}
}
function sourceComponentsSetupProductGroup(id){
	var classifier = document.getElementById("classifier_"+id);
	var ProductGroupElement = classifier.children[0].children[0].children[3].children[0];
	var ProductDescription = classifier.children[0].children[0].children[7].children[0];
	
	for(var i = 0; i<list_productGroup.length; i++){
		var option = document.createElement('option');
		option.text = list_productGroup[i].productGroupName;
		option.value = list_productGroup[i].id_productGroup;
		ProductGroupElement.add(option);
	}
	for(var i = 0; i<list_descriptionSeed.length; i++){
		var option = document.createElement('option');
		option.text = list_descriptionSeed[i].descriptionName;
		option.value = list_descriptionSeed[i].id_description;
		ProductDescription.add(option);
	}
}

function sourceComponentsSetupProduct(id){
	var classifier = document.getElementById("classifier_"+id);
	var ProductElement = classifier.children[0].children[0].children[5].children[0];
	var ProductGroupElement = classifier.children[0].children[0].children[3].children[0];
	var id_productGroup = Number(ProductGroupElement.value);
	
	for(var i = 0; i<list_product.length; i++){
		if(id_productGroup == list_product[i].id_productGroup){
			var option = document.createElement('option');
			option.text = list_product[i].productName;
			option.value = list_product[i].id_product;
			ProductElement.add(option);
		}
	}
}

function sourceComponentsSetupProductType(id){
	var classifier = document.getElementById("classifier_"+id);
	var ProductTypeElement = classifier.children[0].children[0].children[9].children[0];
	var ProductElement = classifier.children[0].children[0].children[5].children[0];
	var id_product = Number(ProductElement.value);
	
	//Можно ускорить
	for(var i = 0; i < list_productType.length; i++){
		if(id_product == list_productType[i].id_product){
			var option = document.createElement('option');
			option.text = list_productType[i].productTypeName;
			option.value = list_productType[i].id_productType;
			ProductTypeElement.add(option);			
		}
	}
}

//Функции настройки классификатора для компонентов исходного продукта (засоритель)
function sourceComponentsSetupIndusrtyWeed(id){
	var classifier = document.getElementById("classifier_"+id);
	var IndustryWeedElement = classifier.children[0].children[2].children[1].children[0];
	for(var i = 0; i<list_industry.length; i++){
		var option = document.createElement('option');
		option.text = list_industry[i].industryName;
		option.value = list_industry[i].id_industry;
		IndustryWeedElement.add(option);
	}
}

function sourceComponentsSetupCategory(id){
	var classifier = document.getElementById("classifier_"+id);
	var CategoryElement = classifier.children[0].children[2].children[3].children[0];
	for(var i = 0; i<list_categoryWeed.length; i++){
		var option = document.createElement('option');
		option.text = list_categoryWeed[i].category;
		option.value = list_categoryWeed[i].id_category;
		CategoryElement.add(option);
	}
}

function sourceComponentsSetupClassWeed(id){
	var classifier = document.getElementById("classifier_"+id);
	var CategoryElement = classifier.children[0].children[2].children[3].children[0];
	var ClassWeedElement = classifier.children[0].children[2].children[5].children[0];
	var id_category = Number(CategoryElement.value);
	
	for(var i = 0; i<list_classWeed.length; i++){
		if(id_category == list_classWeed[i].id_category){
			var option = document.createElement('option');
			option.text = list_classWeed[i].className;
			option.value = list_classWeed[i].id_class;
			ClassWeedElement.add(option);
		}		
	}
}

function sourceComponentsSetupWeed(id){
	var classifier = document.getElementById("classifier_"+id);
	var ClassWeedElement = classifier.children[0].children[2].children[5].children[0];
	var WeedElement = classifier.children[0].children[2].children[7].children[0];
	var id_class = Number(ClassWeedElement.value);
	
	for(var i = 0; i<list_weed.length; i++){
		if(id_class == list_weed[i].id_class){
			var option = document.createElement('option');
			option.text = list_weed[i].weedName;
			option.value = list_weed[i].id_weed;
			WeedElement.add(option);
		}		
	}
}

function sourceComponentsSetupDescriptionWeeed(id){
	var classifier = document.getElementById("classifier_"+id);
	var CategoryElement = classifier.children[0].children[2].children[3].children[0];
	var ClassWeedElement = classifier.children[0].children[2].children[5].children[0];
	var DescriptionElement = classifier.children[0].children[2].children[9].children[0];
	var id_category = Number(CategoryElement.value);
	var id_class = Number(ClassWeedElement.value);
	
	for(var i = 0; i<list_descriptionWeeed.length; i++){
		if(id_class == list_descriptionWeeed[i].id_class && id_category == list_descriptionWeeed[i].id_category){
			var option = document.createElement('option');
			option.text = list_descriptionWeeed[i].descriptionName;
			option.value = list_descriptionWeeed[i].id_description;
			DescriptionElement.add(option);
		}		
	}
}

function sourceComponentsClassifierAddEvenListeners(id){
	var classifier = document.getElementById("classifier_"+id);
	sourceComponentsIndustrySetup(id);
	sourceComponentsSetupIndusrtyWeed(id);
	//Элементы класиификатора продукта
	var IndustryElement = classifier.children[0].children[0].children[1].children[0];
	var ProductGroupElement = classifier.children[0].children[0].children[3].children[0];
	var ProductElement = classifier.children[0].children[0].children[5].children[0];
	var ProductDescription = classifier.children[0].children[0].children[7].children[0];
	var ProductTypeElement = classifier.children[0].children[0].children[9].children[0];
	//Элементы класиификатора засорителя
	var IndustryWeedElement = classifier.children[0].children[2].children[1].children[0];
	var CategoryElement = classifier.children[0].children[2].children[3].children[0];
	var ClassWeedElement = classifier.children[0].children[2].children[5].children[0];
	var WeedElement = classifier.children[0].children[2].children[7].children[0];
	var DescriptionElement = classifier.children[0].children[2].children[9].children[0];
	
	IndustryElement.addEventListener("change", function(){
		if(protocol[protocolID].sourceProduct.components[id-1].other_check)
			changeProtocolComponents();
		
		clearClassifierSelect(ProductDescription);
		clearClassifierSelect(ProductGroupElement);
		clearClassifierSelect(ProductElement);
		clearClassifierSelect(ProductTypeElement);
		classifierSourceComponentGOST(id,ProductElement.value,protocol[protocolID].sourceProduct.classifier.classifierProduct.mainClassifier.purposeID);
		
		if(IndustryElement.value == 0)
			sourceComponentsSetupProductGroup(id);
		else if(IndustryElement.value != 9999)
			alert("Функции ещё не готовы");
	});
	ProductGroupElement.addEventListener("change", function(){
		if(protocol[protocolID].sourceProduct.components[id-1].other_check)
			changeProtocolComponents();
		
		clearClassifierSelect(ProductElement);
		clearClassifierSelect(ProductTypeElement);
		classifierSourceComponentGOST(id,ProductElement.value,protocol[protocolID].sourceProduct.classifier.classifierProduct.mainClassifier.purposeID);
		
		if(ProductGroupElement.value != 9999)
			sourceComponentsSetupProduct(id);
	});
	ProductElement.addEventListener("change", function(){
		clearClassifierSelect(ProductTypeElement);
		classifierSourceComponentGOST(id,ProductElement.value,protocol[protocolID].sourceProduct.classifier.classifierProduct.mainClassifier.purposeID);
		
		if(ProductElement.value != 9999)
			sourceComponentsSetupProductType(id);
	});
	
	IndustryWeedElement.addEventListener("change", function(){
		if(protocol[protocolID].sourceProduct.components[id-1].other_check)
			changeProtocolComponents();
		
		clearClassifierSelect(CategoryElement);
		clearClassifierSelect(ClassWeedElement);
		clearClassifierSelect(WeedElement);
		clearClassifierSelect(DescriptionElement);
	
		if(IndustryWeedElement.value == 0)
			sourceComponentsSetupCategory(id);
		else if(IndustryWeedElement.value != 9999)
			alert("Функции ещё не готовы");		
	});
	
	CategoryElement.addEventListener("change", function(){
		if(protocol[protocolID].sourceProduct.components[id-1].other_check)
			changeProtocolComponents();
		
		clearClassifierSelect(ClassWeedElement);
		clearClassifierSelect(WeedElement);
		clearClassifierSelect(DescriptionElement);
		
		if(CategoryElement.value != 9999)
			sourceComponentsSetupClassWeed(id);
	});
	
	ClassWeedElement.addEventListener("change", function(){
		clearClassifierSelect(WeedElement);
		clearClassifierSelect(DescriptionElement);
		
		if(ClassWeedElement.value != 9999){
			sourceComponentsSetupWeed(id);
			sourceComponentsSetupDescriptionWeeed(id);
		}
	});
	
}
//Функции переключения класификатора
function classifierSourceProductViewADD(){
	if(classifierSourceProductMain.style.display == "flex")
	{
		classifierSourceProductMain.style.display = "none";
		classifierSourceProductAdd.style.display = "flex";
	}
	else{
		classifierSourceProductMain.style.display = "flex";
		classifierSourceProductAdd.style.display = "none";
	}
}

function classifierSourceWeedViewADD(){
	if(classifierSourceWeedMain.style.display == "flex")
	{
		classifierSourceWeedMain.style.display = "none";
		classifierSourceWeedAdd.style.display = "flex";
	}
	else{
		classifierSourceWeedMain.style.display = "flex";
		classifierSourceWeedAdd.style.display = "none";
	}
}
function classifierSourceChangeType(){
	var classifierTypeValue = Number(productClassifier.children[0].children[5].children[0].children[0].value);
	//Переключение id типа классификатора
	protocol[protocolID].sourceProduct.classifier.classifierType = classifierTypeValue;
	
	switch(classifierTypeValue){
		case 0:
			classifierSourceProductMain.style.display = "flex";
			classifierSourceProductAdd.style.display = "none";
			classifierSourceWeedMain.style.display = "none";
			classifierSourceWeedAdd.style.display = "none";			
			break;
		case 1:
			classifierSourceWeedMain.style.display = "flex";
			classifierSourceWeedAdd.style.display = "none";
			classifierSourceProductMain.style.display = "none";
			classifierSourceProductAdd.style.display = "none";
			break;
	}
}
//Функции для класификатора компонентов
function classifierSourceComponentProductVidewADD(id){
	var classifier = document.getElementById("classifier_"+id);
	
	if(classifier.children[0].children[0].style.display == "flex")
	{
		classifier.children[0].children[0].style.display = "none";
		classifier.children[0].children[1].style.display = "flex";
	}
	else{
		classifier.children[0].children[0].style.display = "flex";
		classifier.children[0].children[1].style.display = "none";
	}
}
function classifierSourceComponentWeedVidewADD(id){
	var classifier = document.getElementById("classifier_"+id);
	
	if(classifier.children[0].children[2].style.display == "flex")
	{
		classifier.children[0].children[2].style.display = "none";
		classifier.children[0].children[3].style.display = "flex";
	}
	else{
		classifier.children[0].children[2].style.display = "flex";
		classifier.children[0].children[3].style.display = "none";
	}
}
function classifierSourceCompanentChangeType(id){
	var classifier = document.getElementById("classifier_"+id);
	var classifierTypeValue = Number(classifier.children[0].children[5].children[0].children[0].value);
	protocol[protocolID].sourceProduct.components[id-1].classifier.classifierType = classifierTypeValue;
	
	switch(classifierTypeValue){
		case 0:
			classifier.children[0].children[0].style.display = "flex";
			classifier.children[0].children[1].style.display = "none";
			classifier.children[0].children[2].style.display = "none";
			classifier.children[0].children[3].style.display = "none";			
			break;
		case 1:
			classifier.children[0].children[2].style.display = "flex";
			classifier.children[0].children[3].style.display = "none";
			classifier.children[0].children[0].style.display = "none";
			classifier.children[0].children[1].style.display = "none";
			break;
	}
}
//Функция добавления новых элементов классификатора для исходного продукта
function classifierSourceNewProductADD(){
	var selectElementProduct = sourceBlockComponents.children[0].children[0].children[1].children[0];
	var classifierProductSelectElementName = productClassifier.children[0].children[0].children[5].children[0];
	var productName = classifierSourceProductAdd.children[5].children[0];
	var descriptionName = classifierSourceProductAdd.children[7].children[0];
	
	var classifierOption = document.createElement('option');
	classifierOption.value ="classifier";
	
	if(productName.value != "")
		classifierOption.text = productName.value;
	if(descriptionName.value != "")
		classifierOption.text += " (" +descriptionName.value+")";
	
	protocol[protocolID].sourceProduct.name = classifierOption.text;
	
	if(classifierOption.text.length > 23)
		classifierOption.text = classifierOption.text.substring(0,20) + "...";
		
	//Проверка сущестования компанента класификатора, его перезапись
	if(selectElementProduct[selectElementProduct.length-1].value != "classifier")
		selectElementProduct.add(classifierOption);
	else
		selectElementProduct[selectElementProduct.length-1] = classifierOption;
		
	//Обнавление компанента, и закрытие классификатора
	selectElementProduct.selectedIndex = selectElementProduct.length-1;
	productClassifier.style.display = "none";
	productClassifier.style.zIndex = 0;
	overlayDisplayBlcok.style.zIndex = 0;
	//Отчиста ID-класификатора
	clearClassifierProduct();
	//Заполнение класcификатора Продукт
	protocol[protocolID].sourceProduct.classifier.classifierProduct.useADD = true;
	protocol[protocolID].sourceProduct.classifier.classifierProduct.addClassifier.industry = productClassifier.children[0].children[1].children[1].children[0].value;
	protocol[protocolID].sourceProduct.classifier.classifierProduct.addClassifier.groupProduct = productClassifier.children[0].children[1].children[3].children[0].value;
	protocol[protocolID].sourceProduct.classifier.classifierProduct.addClassifier.product = productClassifier.children[0].children[1].children[5].children[0].value;
	protocol[protocolID].sourceProduct.classifier.classifierProduct.addClassifier.description = productClassifier.children[0].children[1].children[7].children[0].value;
	protocol[protocolID].sourceProduct.classifier.classifierProduct.addClassifier.productType = productClassifier.children[0].children[1].children[9].children[0].value;
	protocol[protocolID].sourceProduct.classifier.classifierProduct.addClassifier.productSort = productClassifier.children[0].children[1].children[11].children[0].value;
	protocol[protocolID].sourceProduct.classifier.classifierProduct.addClassifier.purpose = productClassifier.children[0].children[1].children[13].children[0].value;
	
	
	protocol[protocolID].sourceProduct.components[0].classifier.classifierType = protocol[protocolID].sourceProduct.classifier.classifierType;
	protocol[protocolID].sourceProduct.components[0].classifier.classifierProduct.useADD = protocol[protocolID].sourceProduct.classifier.classifierProduct.useADD;
	protocol[protocolID].sourceProduct.components[0].classifier.classifierProduct.addClassifier.industry = protocol[protocolID].sourceProduct.classifier.classifierProduct.addClassifier.industry;
	protocol[protocolID].sourceProduct.components[0].classifier.classifierProduct.addClassifier.groupProduct = protocol[protocolID].sourceProduct.classifier.classifierProduct.addClassifier.groupProduct;
	protocol[protocolID].sourceProduct.components[0].classifier.classifierProduct.addClassifier.product = protocol[protocolID].sourceProduct.classifier.classifierProduct.addClassifier.product;
	protocol[protocolID].sourceProduct.components[0].classifier.classifierProduct.addClassifier.description = protocol[protocolID].sourceProduct.classifier.classifierProduct.addClassifier.description;
	protocol[protocolID].sourceProduct.components[0].classifier.classifierProduct.addClassifier.productType = protocol[protocolID].sourceProduct.classifier.classifierProduct.addClassifier.productType;
	protocol[protocolID].sourceProduct.components[0].classifier.classifierProduct.addClassifier.productSort = protocol[protocolID].sourceProduct.classifier.classifierProduct.addClassifier.productSort;
	protocol[protocolID].sourceProduct.components[0].classifier.classifierProduct.addClassifier.purpose = protocol[protocolID].sourceProduct.classifier.classifierProduct.addClassifier.purpose;
	
	setupClassifierComponents(1);
	
	sourceProductNameUpdate();
	headerTooltip.children[1].style.display = "";
}
function classifierSourceNewWeedADD(){
	var selectElementProduct = sourceBlockComponents.children[0].children[0].children[1].children[0];
	var classifierProductSelectElementName = productClassifier.children[0].children[0].children[5].children[0];
	var weedName = classifierSourceWeedAdd.children[7].children[0];
	var descriptionName = classifierSourceProductAdd.children[9].children[0];
	
	var classifierOption = document.createElement('option');
	classifierOption.value ="classifier";
	
	if(productName.value != "")
		classifierOption.text = productName.value;
	if(descriptionName.value != "")
		classifierOption.text += " (" +descriptionName.value+")";
	
	protocol[protocolID].sourceProduct.name = classifierOption.text;
		
	//Проверка сущестования компанента класификатора, его перезапись
	if(selectElementProduct[selectElementProduct.length-1].value != "classifier")
		selectElementProduct.add(classifierOption);
	else
		selectElementProduct[selectElementProduct.length-1] = classifierOption;
		
	//Обнавление компанента, и закрытие классификатора
	selectElementProduct.selectedIndex = selectElementProduct.length-1;
	productClassifier.style.display = "none";
	productClassifier.style.zIndex = 0;
	overlayDisplayBlcok.style.zIndex = 0;
	//Отчиста ID-класификатора
	clearClassifierProduct();
	//Заполнение класcификатора Засоритили
	protocol[protocolID].sourceProduct.classifier.classifierWeed.useADD = true;
	protocol[protocolID].sourceProduct.classifier.classifierWeed.addClassifier.industry = productClassifier.children[0].children[3].children[1].children[0].value;
	protocol[protocolID].sourceProduct.classifier.classifierWeed.addClassifier.category = productClassifier.children[0].children[3].children[3].children[0].value;
	protocol[protocolID].sourceProduct.classifier.classifierWeed.addClassifier.classWeed = productClassifier.children[0].children[3].children[5].children[0].value;
	protocol[protocolID].sourceProduct.classifier.classifierWeed.addClassifier.weedName = productClassifier.children[0].children[3].children[7].children[0].value;
	protocol[protocolID].sourceProduct.classifier.classifierWeed.addClassifier.description = productClassifier.children[0].children[3].children[9].children[0].value;
	
	protocol[protocolID].sourceProduct.components[0].classifier.classifierType = protocol[protocolID].sourceProduct.classifier.classifierType;
	protocol[protocolID].sourceProduct.components[0].classifier.classifierWeed.useADD = protocol[protocolID].sourceProduct.classifier.classifierWeed.useADD;
	protocol[protocolID].sourceProduct.components[0].classifier.classifierWeed.addClassifier.industry = protocol[protocolID].sourceProduct.classifier.classifierWeed.addClassifier.industry;
	protocol[protocolID].sourceProduct.components[0].classifier.classifierWeed.addClassifier.category = protocol[protocolID].sourceProduct.classifier.classifierWeed.addClassifier.category;
	protocol[protocolID].sourceProduct.components[0].classifier.classifierWeed.addClassifier.classWeed = protocol[protocolID].sourceProduct.classifier.classifierWeed.addClassifier.classWeed;
	protocol[protocolID].sourceProduct.components[0].classifier.classifierWeed.addClassifier.weedName = protocol[protocolID].sourceProduct.classifier.classifierWeed.addClassifier.weedName;
	protocol[protocolID].sourceProduct.components[0].classifier.classifierWeed.addClassifier.description = protocol[protocolID].sourceProduct.classifier.classifierWeed.addClassifier.description;
	
	setupClassifierComponents(1);
	
	sourceProductNameUpdate();
	headerTooltip.children[1].style.display = "";
}
//Функция добавления новых элементов классификатора для компонентов
function classifierSourceComponentNewProductADD(id){
	var selectElementSource = document.getElementById("item_source_"+id).children[1].children[0].children[0];
	var classifier = document.getElementById("classifier_"+id);
	var productName = classifier.children[0].children[1].children[5].children[0];
	var descriptionName = classifier.children[0].children[1].children[7].children[0];
	
	var classifierOption = document.createElement('option');
	classifierOption.value ="classifier";
	
	if(productName.value != "")
		classifierOption.text = productName.value;
	if(descriptionName.value != "")
		classifierOption.text += " (" +descriptionName.value+")";
	
	protocol[protocolID].sourceProduct.components[id-1].product_name = classifierOption.text;
		
	//Проверка сущестования компанента класификатора, его перезапись
	if(selectElementSource[selectElementSource.length-1].value != "classifier")
		selectElementSource.add(classifierOption);
	else
		selectElementSource[selectElementSource.length-1] = classifierOption;
	
	if(protocol[protocolID].sourceProduct.components[id-1].other_check)
		changeProtocolComponents();
	
	//Обнавление компанента, и закрытие классификатора
	selectElementSource.selectedIndex = selectElementSource.length-1;
	classifier.style.display = "none";
	classifier.style.zIndex = 0;
	overlayDisplayBlcok.style.zIndex = 0;	
	//Отчиста ID-класификатора
	clearClassifierSource(id);	
	//Заполнение ID-класификатора Продукт
	protocol[protocolID].sourceProduct.components[id-1].classifier.classifierProduct.useADD = true;
	protocol[protocolID].sourceProduct.components[id-1].classifier.classifierProduct.addClassifier.industry = classifier.children[0].children[1].children[1].children[0].value;
	protocol[protocolID].sourceProduct.components[id-1].classifier.classifierProduct.addClassifier.groupProduct = classifier.children[0].children[1].children[3].children[0].value;
	protocol[protocolID].sourceProduct.components[id-1].classifier.classifierProduct.addClassifier.product = classifier.children[0].children[1].children[5].children[0].value;
	protocol[protocolID].sourceProduct.components[id-1].classifier.classifierProduct.addClassifier.description = classifier.children[0].children[1].children[7].children[0].value;
	protocol[protocolID].sourceProduct.components[id-1].classifier.classifierProduct.addClassifier.productType = classifier.children[0].children[1].children[9].children[0].value;
	protocol[protocolID].sourceProduct.components[id-1].classifier.classifierProduct.addClassifier.productSort = classifier.children[0].children[1].children[11].children[0].value;
		
	updateSourceMaxInfo();
	//itemSourceNameUpdate(id);
	headerTooltip.children[1].style.display = "";
}
function classifierSourceComponentNewWeedADD(id){
	var selectElementSource = document.getElementById("item_source_"+id).children[1].children[0].children[0];
	var classifier = document.getElementById("classifier_"+id);
	var weedName = classifier.children[0].children[3].children[7].children[0];
	var descriptionName = classifier.children[0].children[3].children[9].children[0];
	
	var classifierOption = document.createElement('option');
	classifierOption.value ="classifier";
	
	if(weedName.value != "")
		classifierOption.text = weedName.value;
	if(descriptionName.value != "")
		classifierOption.text += " (" +descriptionName.value+")";
	
	protocol[protocolID].sourceProduct.components[id-1].product_name = classifierOption.text;
		
	//Проверка сущестования компанента класификатора, его перезапись
	if(selectElementSource[selectElementSource.length-1].value != "classifier")
		selectElementSource.add(classifierOption);
	else
		selectElementSource[selectElementSource.length-1] = classifierOption;
	
	if(protocol[protocolID].sourceProduct.components[id-1].other_check)
		changeProtocolComponents();
	
	//Обнавление компанента, и закрытие классификатора
	selectElementSource.selectedIndex = selectElementSource.length-1;
	classifier.style.display = "none";
	classifier.style.zIndex = 0;
	overlayDisplayBlcok.style.zIndex = 0;		
	//Отчиста ID-класификатора
	clearClassifierSource(id);
	//Заполнение ID-класификатора Засоритель
	protocol[protocolID].sourceProduct.components[id-1].classifier.classifierWeed.useADD = true;
	protocol[protocolID].sourceProduct.components[id-1].classifier.classifierWeed.addClassifier.industry = classifier.children[0].children[3].children[1].children[0].value;
	protocol[protocolID].sourceProduct.components[id-1].classifier.classifierWeed.addClassifier.category = classifier.children[0].children[3].children[3].children[0].value;
	protocol[protocolID].sourceProduct.components[id-1].classifier.classifierWeed.addClassifier.classWeed = classifier.children[0].children[3].children[5].children[0].value;
	protocol[protocolID].sourceProduct.components[id-1].classifier.classifierWeed.addClassifier.weedName = classifier.children[0].children[3].children[7].children[0].value;
	protocol[protocolID].sourceProduct.components[id-1].classifier.classifierWeed.addClassifier.description = classifier.children[0].children[3].children[9].children[0].value;	
	
	updateSourceMaxInfo();
	//itemSourceNameUpdate(id);
	headerTooltip.children[1].style.display = "";
}
//Классификаторы требований исходного продукта (продукт)
function requirementsSourceProductIndystrySetup(){
	var IndustryElement = requirementsProductClassifier.children[0].children[0].children[1].children[0];
	for(var i = 0; i<list_industry.length; i++){
			var option = document.createElement('option');
			option.text = list_industry[i].industryName;
			option.value = list_industry[i].id_industry;
			IndustryElement.add(option);
	}
}

function  requirementsSourceProductSetupProductGroup(){
	var ProductGroupElement = requirementsProductClassifier.children[0].children[0].children[3].children[0];
	var ProductDescription = requirementsProductClassifier.children[0].children[0].children[7].children[0];
	for(var i = 0; i<list_productGroup.length; i++){
		var option = document.createElement('option');
		option.text = list_productGroup[i].productGroupName;
		option.value = list_productGroup[i].id_productGroup;
		ProductGroupElement.add(option);
	}
	for(var i = 0; i<list_descriptionSeed.length; i++){
		var option = document.createElement('option');
		option.text = list_descriptionSeed[i].descriptionName;
		option.value = list_descriptionSeed[i].id_description;
		ProductDescription.add(option);
	}
}

function requirementsSourceProductSetupProduct(){
	var ProductElement = requirementsProductClassifier.children[0].children[0].children[5].children[0];
	var ProductGroupElement = requirementsProductClassifier.children[0].children[0].children[3].children[0];
	var id_productGroup = Number(ProductGroupElement.value);
	
	for(var i = 0; i<list_product.length; i++){
		if(id_productGroup == list_product[i].id_productGroup){
			var option = document.createElement('option');
			option.text = list_product[i].productName;
			option.value = list_product[i].id_product;
			ProductElement.add(option);
		}
	}
}

function requirementsSourceProductSetupProductType(){
	var ProductTypeElement = requirementsProductClassifier.children[0].children[0].children[9].children[0];
	var ProductElement = requirementsProductClassifier.children[0].children[0].children[5].children[0];
	var id_product = Number(ProductElement.value);
	//Можно ускорить
	for(var i = 0; i < list_productType.length; i++){
		if(id_product == list_productType[i].id_product){
			var option = document.createElement('option');
			option.text = list_productType[i].productTypeName;
			option.value = list_productType[i].id_productType;
			ProductTypeElement.add(option);			
		}
	}
}

function requirementsSourceProductSetupPurpose(){
	var PurposeElement = requirementsProductClassifier.children[0].children[0].children[13].children[0];
	var ProductGroupElement = requirementsProductClassifier.children[0].children[0].children[3].children[0];
	var id_productGroup = Number(ProductGroupElement.value);
	
	for(var i = 0; i<list_productGroup[id_productGroup].purpose_list.length; i++){
		var number = Number(list_productGroup[id_productGroup].purpose_list[i]);
		for(var j = 0; j<list_purpose.length; j++){
			if(list_purpose[j].id_purpose == number)
			{
				var option = document.createElement('option');
				option.text = list_purpose[j].purposeName;
				option.value = list_purpose[j].id_purpose;
				PurposeElement.add(option);
			}
		}
	}	
}

//Классификаторы требований исходного продукта (засоритель)
function requirementsSourceProductSetupIndusrtyWeed(){
	var IndustryWeedElement = requirementsProductClassifier.children[0].children[2].children[1].children[0];
	for(var i = 0; i<list_industry.length; i++){
		var option = document.createElement('option');
		option.text = list_industry[i].industryName;
		option.value = list_industry[i].id_industry;
		IndustryWeedElement.add(option);
	}
}

function requirementsSourceProductSetupCategory(){
	var CategoryElement = requirementsProductClassifier.children[0].children[2].children[3].children[0];
	for(var i = 0; i<list_categoryWeed.length; i++){
		var option = document.createElement('option');
		option.text = list_categoryWeed[i].category;
		option.value = list_categoryWeed[i].id_category;
		CategoryElement.add(option);
	}
}

function requirementsSourceProductSetupClassWeed(){
	var CategoryElement = requirementsProductClassifier.children[0].children[2].children[3].children[0];
	var ClassWeedElement = requirementsProductClassifier.children[0].children[2].children[5].children[0];
	var id_category = Number(CategoryElement.value);
	
	for(var i = 0; i<list_classWeed.length; i++){
		if(id_category == list_classWeed[i].id_category){
			var option = document.createElement('option');
			option.text = list_classWeed[i].className;
			option.value = list_classWeed[i].id_class;
			ClassWeedElement.add(option);
		}		
	}
}

function requirementsSourceProductSetupWeed(){
	var ClassWeedElement = requirementsProductClassifier.children[0].children[2].children[5].children[0];
	var WeedElement = requirementsProductClassifier.children[0].children[2].children[7].children[0];
	var id_class = Number(ClassWeedElement.value);
	
	for(var i = 0; i<list_weed.length; i++){
		if(id_class == list_weed[i].id_class){
			var option = document.createElement('option');
			option.text = list_weed[i].weedName;
			option.value = list_weed[i].id_weed;
			WeedElement.add(option);
		}		
	}
}

function requirementsSourceProductSetupDescriptionWeeed(){
	var CategoryElement = requirementsProductClassifier.children[0].children[2].children[3].children[0];
	var ClassWeedElement = requirementsProductClassifier.children[0].children[2].children[5].children[0];
	var DescriptionElement = requirementsProductClassifier.children[0].children[2].children[9].children[0];
	var id_category = Number(CategoryElement.value);
	var id_class = Number(ClassWeedElement.value);
	
	for(var i = 0; i<list_descriptionWeeed.length; i++){
		if(id_class == list_descriptionWeeed[i].id_class && id_category == list_descriptionWeeed[i].id_category){
			var option = document.createElement('option');
			option.text = list_descriptionWeeed[i].descriptionName;
			option.value = list_descriptionWeeed[i].id_description;
			DescriptionElement.add(option);
		}		
	}
}
//Классификаторы требований исходного продукта (засоритель)
function requirementsSourceProductSetupIndusrtyWeed(){
	var IndustryWeedElement = requirementsProductClassifier.children[0].children[2].children[1].children[0];
	for(var i = 0; i<list_industry.length; i++){
		var option = document.createElement('option');
		option.text = list_industry[i].industryName;
		option.value = list_industry[i].id_industry;
		IndustryWeedElement.add(option);
	}
}

function requirementsSourceProductSetupCategory(){
	var CategoryElement = requirementsProductClassifier.children[0].children[2].children[3].children[0];
	for(var i = 0; i<list_categoryWeed.length; i++){
		var option = document.createElement('option');
		option.text = list_categoryWeed[i].category;
		option.value = list_categoryWeed[i].id_category;
		CategoryElement.add(option);
	}
}

function requirementsSourceProductSetupClassWeed(){
	var CategoryElement = requirementsProductClassifier.children[0].children[2].children[3].children[0];
	var ClassWeedElement = requirementsProductClassifier.children[0].children[2].children[5].children[0];
	var id_category = Number(CategoryElement.value);
	
	for(var i = 0; i<list_classWeed.length; i++){
		if(id_category == list_classWeed[i].id_category){
			var option = document.createElement('option');
			option.text = list_classWeed[i].className;
			option.value = list_classWeed[i].id_class;
			ClassWeedElement.add(option);
		}		
	}
}

function requirementsSourceProductSetupWeed(){
	var ClassWeedElement = requirementsProductClassifier.children[0].children[2].children[5].children[0];
	var WeedElement = requirementsProductClassifier.children[0].children[2].children[7].children[0];
	var id_class = Number(ClassWeedElement.value);
	
	for(var i = 0; i<list_weed.length; i++){
		if(id_class == list_weed[i].id_class){
			var option = document.createElement('option');
			option.text = list_weed[i].weedName;
			option.value = list_weed[i].id_weed;
			WeedElement.add(option);
		}		
	}
}

function requirementsSourceProductSetupDescriptionWeeed(){
	var CategoryElement = requirementsProductClassifier.children[0].children[2].children[3].children[0];
	var ClassWeedElement = requirementsProductClassifier.children[0].children[2].children[5].children[0];
	var DescriptionElement = requirementsProductClassifier.children[0].children[2].children[9].children[0];
	var id_category = Number(CategoryElement.value);
	var id_class = Number(ClassWeedElement.value);
	
	for(var i = 0; i<list_descriptionWeeed.length; i++){
		if(id_class == list_descriptionWeeed[i].id_class && id_category == list_descriptionWeeed[i].id_category){
			var option = document.createElement('option');
			option.text = list_descriptionWeeed[i].descriptionName;
			option.value = list_descriptionWeeed[i].id_description;
			DescriptionElement.add(option);
		}		
	}
}

function requirementsSourceProductClassifierAddEventListeners(){
	requirementsSourceProductIndystrySetup();
	requirementsSourceProductSetupIndusrtyWeed();
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
	
	IndustryElement.addEventListener("change", function(){
		clearClassifierSelect(ProductDescription);
		clearClassifierSelect(ProductGroupElement);
		clearClassifierSelect(ProductElement);
		clearClassifierSelect(ProductTypeElement);
		clearClassifierSelect(PurposeElement);
		requirementsClassifierSourceGOST(ProductElement.value,PurposeElement.value);		
		
		for(var i = 2; i <= protocolRequirements.components.length; i++){
			document.getElementById("requirements_classifier_" + i).children[0].children[0].children[1].children[0].value = IndustryElement.value;
			requirementsSourceComponentsSetupProductGroup(2);
		}
		
		if(IndustryElement.value == 0){
			requirementsSourceProductSetupProductGroup();
		}
		else if(IndustryElement.value != 9999)
			alert("Функции ещё не готовы");
	});
	ProductGroupElement.addEventListener("change", function(){
		clearClassifierSelect(ProductElement);
		clearClassifierSelect(ProductTypeElement);
		clearClassifierSelect(PurposeElement);
		requirementsClassifierSourceGOST(ProductElement.value,PurposeElement.value);
		
		if(ProductGroupElement.value != 9999){
			requirementsSourceProductSetupProduct();
			requirementsSourceProductSetupPurpose();
			updateFractionPurposeSelect();
		}
	});
	ProductElement.addEventListener("change", function(){
		clearClassifierSelect(ProductTypeElement);
		requirementsClassifierSourceGOST(ProductElement.value,PurposeElement.value);
		
		if(ProductElement.value != 9999){
			requirementsSourceProductSetupProductType();
		}
	});
	PurposeElement.addEventListener("change", function(){
		requirementsClassifierSourceGOST(ProductElement.value,PurposeElement.value);
	});
	
	IndustryWeedElement.addEventListener("change", function(){
		clearClassifierSelect(CategoryElement);
		clearClassifierSelect(ClassWeedElement);
		clearClassifierSelect(WeedElement);
		clearClassifierSelect(DescriptionElement);
	
		if(IndustryWeedElement.value == 0)
			requirementsSourceProductSetupCategory();
		else if(IndustryWeedElement.value != 9999)
			alert("Функции ещё не готовы");		
	});
	
	CategoryElement.addEventListener("change", function(){
		clearClassifierSelect(ClassWeedElement);
		clearClassifierSelect(WeedElement);
		clearClassifierSelect(DescriptionElement);
		
		if(CategoryElement.value != 9999)
			requirementsSourceProductSetupClassWeed();
	});
	
	ClassWeedElement.addEventListener("change", function(){
		clearClassifierSelect(WeedElement);
		clearClassifierSelect(DescriptionElement);
		
		if(ClassWeedElement.value != 9999){
			requirementsSourceProductSetupWeed();
			requirementsSourceProductSetupDescriptionWeeed();
		}
	});
}
//Классификаторы компонентов требований (продукт)
function requirementsSourceComponentsIndystrySetup(id){
	var classifier = document.getElementById("requirements_classifier_"+id);
	var IndustryElement = classifier.children[0].children[0].children[1].children[0];
	for(var i = 0; i<list_industry.length; i++){
			var option = document.createElement('option');
			option.text = list_industry[i].industryName;
			option.value = list_industry[i].id_industry;
			IndustryElement.add(option);
	}
}

function  requirementsSourceComponentsSetupProductGroup(id){
	var classifier = document.getElementById("requirements_classifier_"+id);
	var ProductGroupElement = classifier.children[0].children[0].children[3].children[0];
	var ProductDescription = classifier.children[0].children[0].children[7].children[0];
	for(var i = 0; i<list_productGroup.length; i++){
		var option = document.createElement('option');
		option.text = list_productGroup[i].productGroupName;
		option.value = list_productGroup[i].id_productGroup;
		ProductGroupElement.add(option);
	}	
	for(var i = 0; i<list_descriptionSeed.length; i++){
		var option = document.createElement('option');
		option.text = list_descriptionSeed[i].descriptionName;
		option.value = list_descriptionSeed[i].id_description;
		ProductDescription.add(option);
	}
}

function requirementsSourceComponentsSetupProduct(id){
	var classifier = document.getElementById("requirements_classifier_"+id);
	var ProductElement = classifier.children[0].children[0].children[5].children[0];
	var ProductGroupElement = classifier.children[0].children[0].children[3].children[0];
	var id_productGroup = Number(ProductGroupElement.value);
	
	for(var i = 0; i<list_product.length; i++){
		if(id_productGroup == list_product[i].id_productGroup){
			var option = document.createElement('option');
			option.text = list_product[i].productName;
			option.value = list_product[i].id_product;
			ProductElement.add(option);
		}
	}
}

function requirementsSourceComponentsSetupProductType(id){
	var classifier = document.getElementById("requirements_classifier_"+id);
	var ProductTypeElement = classifier.children[0].children[0].children[9].children[0];
	var ProductElement = classifier.children[0].children[0].children[5].children[0];
	var id_product = Number(ProductElement.value);
	//Можно ускорить
	for(var i = 0; i < list_productType.length; i++){
		if(id_product == list_productType[i].id_product){
			var option = document.createElement('option');
			option.text = list_productType[i].productTypeName;
			option.value = list_productType[i].id_productType;
			ProductTypeElement.add(option);			
		}
	}
}

//Классификаторы компонентов требований(засоритель)
function requirementsSourceComponentsSetupIndusrtyWeed(id){
	var classifier = document.getElementById("requirements_classifier_"+id);
	var IndustryWeedElement = classifier.children[0].children[2].children[1].children[0];
	for(var i = 0; i<list_industry.length; i++){
		var option = document.createElement('option');
		option.text = list_industry[i].industryName;
		option.value = list_industry[i].id_industry;
		IndustryWeedElement.add(option);
	}
}

function requirementsSourceComponentsSetupCategory(id){
	var classifier = document.getElementById("requirements_classifier_"+id);
	var CategoryElement = classifier.children[0].children[2].children[3].children[0];
	for(var i = 0; i<list_categoryWeed.length; i++){
		var option = document.createElement('option');
		option.text = list_categoryWeed[i].category;
		option.value = list_categoryWeed[i].id_category;
		CategoryElement.add(option);
	}
}

function requirementsSourceComponentsSetupClassWeed(id){
	var classifier = document.getElementById("requirements_classifier_"+id);
	var CategoryElement = classifier.children[0].children[2].children[3].children[0];
	var ClassWeedElement = classifier.children[0].children[2].children[5].children[0];
	var id_category = Number(CategoryElement.value);
	
	for(var i = 0; i<list_classWeed.length; i++){
		if(id_category == list_classWeed[i].id_category){
			var option = document.createElement('option');
			option.text = list_classWeed[i].className;
			option.value = list_classWeed[i].id_class;
			ClassWeedElement.add(option);
		}		
	}
}

function requirementsSourceComponentsSetupWeed(id){
	var classifier = document.getElementById("requirements_classifier_"+id);
	var ClassWeedElement = classifier.children[0].children[2].children[5].children[0];
	var WeedElement = classifier.children[0].children[2].children[7].children[0];
	var id_class = Number(ClassWeedElement.value);
	
	for(var i = 0; i<list_weed.length; i++){
		if(id_class == list_weed[i].id_class){
			var option = document.createElement('option');
			option.text = list_weed[i].weedName;
			option.value = list_weed[i].id_weed;
			WeedElement.add(option);
		}		
	}
}

function requirementsSourceComponentsSetupDescriptionWeeed(id){
	var classifier = document.getElementById("requirements_classifier_"+id);
	var CategoryElement = classifier.children[0].children[2].children[3].children[0];
	var ClassWeedElement = classifier.children[0].children[2].children[5].children[0];
	var DescriptionElement = classifier.children[0].children[2].children[9].children[0];
	var id_category = Number(CategoryElement.value);
	var id_class = Number(ClassWeedElement.value);
	
	for(var i = 0; i<list_descriptionWeeed.length; i++){
		if(id_class == list_descriptionWeeed[i].id_class && id_category == list_descriptionWeeed[i].id_category){
			var option = document.createElement('option');
			option.text = list_descriptionWeeed[i].descriptionName;
			option.value = list_descriptionWeeed[i].id_description;
			DescriptionElement.add(option);
		}		
	}
}

function requirementsSourceComponentsClassifierAddEventListeners(id){
	var classifier = document.getElementById("requirements_classifier_"+id);
	requirementsSourceComponentsIndystrySetup(id);
	requirementsSourceComponentsSetupIndusrtyWeed(id);
	
	//Элементы класиификатора продукта
	var IndustryElement = classifier.children[0].children[0].children[1].children[0];
	var ProductGroupElement = classifier.children[0].children[0].children[3].children[0];
	var ProductElement = classifier.children[0].children[0].children[5].children[0];
	var ProductDescription = classifier.children[0].children[0].children[7].children[0];
	var ProductTypeElement = classifier.children[0].children[0].children[9].children[0];
	var ProductSortElement = classifier.children[0].children[0].children[11].children[0];
	//Элементы класиификатора засорителя
	var IndustryWeedElement = classifier.children[0].children[2].children[1].children[0];
	var CategoryElement = classifier.children[0].children[2].children[3].children[0];
	var ClassWeedElement = classifier.children[0].children[2].children[5].children[0];
	var WeedElement = classifier.children[0].children[2].children[7].children[0];
	var DescriptionElement = classifier.children[0].children[2].children[9].children[0];
	
	
	IndustryElement.addEventListener("change", function(){
		if(protocolRequirements.components[id-1].other_check)
			changeRequirementsComponents();
		
		clearClassifierSelect(ProductDescription);
		clearClassifierSelect(ProductGroupElement);
		clearClassifierSelect(ProductElement);
		clearClassifierSelect(ProductTypeElement);
		requirementsClassifierSourceComponentGOST(id,ProductElement.value,protocolRequirements.classifier.classifierProduct.mainClassifier.purposeID);
		
		if(IndustryElement.value == 0){
			requirementsSourceComponentsSetupProductGroup(id);
		}
		else if(IndustryElement.value != 9999)
			alert("Функции ещё не готовы");
	});
	ProductGroupElement.addEventListener("change", function(){
		if(protocolRequirements.components[id-1].other_check)
			changeRequirementsComponents();
		
		clearClassifierSelect(ProductElement);
		clearClassifierSelect(ProductTypeElement);
		requirementsClassifierSourceComponentGOST(id,ProductElement.value,protocolRequirements.classifier.classifierProduct.mainClassifier.purposeID);
		
		if(ProductGroupElement.value != 9999){
			requirementsSourceComponentsSetupProduct(id);
		}
	});
	ProductElement.addEventListener("change", function(){
		clearClassifierSelect(ProductTypeElement);
		requirementsClassifierSourceComponentGOST(id,ProductElement.value,protocolRequirements.classifier.classifierProduct.mainClassifier.purposeID);
		
		if(ProductElement.value != 9999){
			requirementsSourceComponentsSetupProductType(id);
		}
	});
		
	IndustryWeedElement.addEventListener("change", function(){
		if(protocolRequirements.components[id-1].other_check)
			changeRequirementsComponents();
		
		clearClassifierSelect(CategoryElement);
		clearClassifierSelect(ClassWeedElement);
		clearClassifierSelect(WeedElement);
		clearClassifierSelect(DescriptionElement);
	
		if(IndustryWeedElement.value == 0)
			requirementsSourceComponentsSetupCategory(id);
		else if(IndustryWeedElement.value != 9999)
			alert("Функции ещё не готовы");		
	});
	
	CategoryElement.addEventListener("change", function(){
		clearClassifierSelect(ClassWeedElement);
		clearClassifierSelect(WeedElement);
		clearClassifierSelect(DescriptionElement);
		
		if(CategoryElement.value != 9999)
			requirementsSourceComponentsSetupClassWeed(id);
	});
	
	ClassWeedElement.addEventListener("change", function(){
		clearClassifierSelect(WeedElement);
		clearClassifierSelect(DescriptionElement);
		
		if(ClassWeedElement.value != 9999){
			requirementsSourceComponentsSetupWeed(id);
			requirementsSourceComponentsSetupDescriptionWeeed(id);
		}
	});
	
}
//Функции переключения класификатора
function requirementsClassifierSourceProductViewADD(){
	if(requirementsClassifierSourceProductMain.style.display == "flex")
	{
		requirementsClassifierSourceProductMain.style.display = "none";
		requirementsClassifierSourceProductAdd.style.display = "flex";
	}
	else{
		requirementsClassifierSourceProductMain.style.display = "flex";
		requirementsClassifierSourceProductAdd.style.display = "none";
	}
}

function requirementsClassifierSourceWeedViewADD(){
	if(requirementsClassifierSourceWeedMain.style.display == "flex")
	{
		requirementsClassifierSourceWeedMain.style.display = "none";
		requirementsClassifierSourceWeedAdd.style.display = "flex";
	}
	else{
		requirementsClassifierSourceWeedMain.style.display = "flex";
		requirementsClassifierSourceWeedAdd.style.display = "none";
	}
}
function requirementsClassifierSourceChangeType(){
	var classifierTypeValue = Number(requirementsProductClassifier.children[0].children[5].children[0].children[0].value);
	//Переключение id типа классификатора
	protocolRequirements.classifier.classifierType = classifierTypeValue;
	
	switch(classifierTypeValue){
		case 0:
			requirementsClassifierSourceProductMain.style.display = "flex";
			requirementsClassifierSourceProductAdd.style.display = "none";
			requirementsClassifierSourceWeedMain.style.display = "none";
			requirementsClassifierSourceWeedAdd.style.display = "none";			
			break;
		case 1:
			requirementsClassifierSourceWeedMain.style.display = "flex";
			requirementsClassifierSourceWeedAdd.style.display = "none";
			requirementsClassifierSourceProductMain.style.display = "none";
			requirementsClassifierSourceProductAdd.style.display = "none";
			break;
	}
}
function requirementsClassifierSourceComponentProductVidewADD(id){
	var classifier = document.getElementById("requirements_classifier_"+id);
	
	if(classifier.children[0].children[0].style.display == "flex")
	{
		classifier.children[0].children[0].style.display = "none";
		classifier.children[0].children[1].style.display = "flex";
	}
	else{
		classifier.children[0].children[0].style.display = "flex";
		classifier.children[0].children[1].style.display = "none";
	}
}
function requirementsClassifierSourceComponentWeedVidewADD(id){
	var classifier = document.getElementById("requirements_classifier_"+id);
	
	if(classifier.children[0].children[2].style.display == "flex")
	{
		classifier.children[0].children[2].style.display = "none";
		classifier.children[0].children[3].style.display = "flex";
	}
	else{
		classifier.children[0].children[2].style.display = "flex";
		classifier.children[0].children[3].style.display = "none";
	}
}
function requirementsClassifierSourceCompanentChangeType(id){
	var classifier = document.getElementById("requirements_classifier_"+id);
	var classifierTypeValue = Number(classifier.children[0].children[5].children[0].children[0].value);
	protocolRequirements.components[id-1].classifier.classifierType = classifierTypeValue;
	
	switch(classifierTypeValue){
		case 0:
			classifier.children[0].children[0].style.display = "flex";
			classifier.children[0].children[1].style.display = "none";
			classifier.children[0].children[2].style.display = "none";
			classifier.children[0].children[3].style.display = "none";			
			break;
		case 1:
			classifier.children[0].children[2].style.display = "flex";
			classifier.children[0].children[3].style.display = "none";
			classifier.children[0].children[0].style.display = "none";
			classifier.children[0].children[1].style.display = "none";
			break;
	}
}
//Функция добавления новых элементов классификатора для исходного продукта тебований
function requirementsClassifierSourceNewProductADD(){
	var selectElementProduct = requirementsSourceBlockComponents.children[2].children[0].children[1].children[0];
	var productName = requirementsClassifierSourceProductAdd.children[5].children[0];
	var descriptionName = requirementsClassifierSourceProductAdd.children[7].children[0];
	
	var classifierOption = document.createElement('option');
	classifierOption.value ="classifier";
	
	if(productName.value != "")
		classifierOption.text = productName.value;
	if(descriptionName.value != "")
		classifierOption.text += " (" +descriptionName.value+")";
	
	protocolRequirements.product_name = classifierOption.text;
	
	if(classifierOption.text.length > 23)
		classifierOption.text = classifierOption.text.substring(0,20) + "...";
	
	//Проверка сущестования компанента класификатора, его перезапись
	if(selectElementProduct[selectElementProduct.length-1].value != "classifier")
		selectElementProduct.add(classifierOption);
	else
		selectElementProduct[selectElementProduct.length-1] = classifierOption;
	
	//Обнавление компанента, и закрытие классификатора
	selectElementProduct.selectedIndex = selectElementProduct.length-1;
	requirementsProductClassifier.style.display = "none";
	requirementsProductClassifier.style.zIndex = 0;
	overlayDisplayBlcok.style.zIndex = 0;
	//Отчиста ID-класификатора
	clearRequirementsClassifierProduct()
	//Запись дополнительных значений Продукт
	protocolRequirements.classifier.classifierProduct.useADD = true;
	protocolRequirements.classifier.classifierProduct.addClassifier.industry = requirementsProductClassifier.children[0].children[1].children[1].children[0].value;
	protocolRequirements.classifier.classifierProduct.addClassifier.groupProduct = requirementsProductClassifier.children[0].children[1].children[3].children[0].value;
	protocolRequirements.classifier.classifierProduct.addClassifier.product = requirementsProductClassifier.children[0].children[1].children[5].children[0].value;
	protocolRequirements.classifier.classifierProduct.addClassifier.description = requirementsProductClassifier.children[0].children[1].children[7].children[0].value;
	protocolRequirements.classifier.classifierProduct.addClassifier.productType = requirementsProductClassifier.children[0].children[1].children[9].children[0].value;
	protocolRequirements.classifier.classifierProduct.addClassifier.productSort = requirementsProductClassifier.children[0].children[1].children[11].children[0].value;
	protocolRequirements.classifier.classifierProduct.addClassifier.purpose = requirementsProductClassifier.children[0].children[1].children[13].children[0].value;
		
	
	if(protocolRequirements.components.length == 0)
		addComponentRequirements();
	
	protocolRequirements.components[0].classifier.classifierType = protocolRequirements.classifier.classifierType;
	protocolRequirements.components[0].classifier.classifierProduct.useADD = protocolRequirements.classifier.classifierProduct.useADD;
	protocolRequirements.components[0].classifier.classifierProduct.addClassifier.industry = protocolRequirements.classifier.classifierProduct.addClassifier.industry;
	protocolRequirements.components[0].classifier.classifierProduct.addClassifier.groupProduct = protocolRequirements.classifier.classifierProduct.addClassifier.groupProduct;
	protocolRequirements.components[0].classifier.classifierProduct.addClassifier.product = protocolRequirements.classifier.classifierProduct.addClassifier.product;
	protocolRequirements.components[0].classifier.classifierProduct.addClassifier.description = protocolRequirements.classifier.classifierProduct.addClassifier.description;
	protocolRequirements.components[0].classifier.classifierProduct.addClassifier.productType = protocolRequirements.classifier.classifierProduct.addClassifier.productType;
	protocolRequirements.components[0].classifier.classifierProduct.addClassifier.productSort = protocolRequirements.classifier.classifierProduct.addClassifier.productSort;
	protocolRequirements.components[0].classifier.classifierProduct.addClassifier.purpose = protocolRequirements.classifier.classifierProduct.addClassifier.purpose;
	
	setupRequirementsClassifierComponents(1);
	
	headerTooltip.children[1].style.display = "";
}
function requirementsClassifierSourceNewWeedADD(){
	var selectElementProduct = requirementsSourceBlockComponents.children[2].children[0].children[1].children[0];
	var weedName = requirementsClassifierSourceWeedAdd.children[7].children[0];
	var descriptionName = requirementsClassifierSourceWeedAdd.children[9].children[0];
	
	var classifierOption = document.createElement('option');
	classifierOption.value ="classifier";
	
	if(weedName.value != "")
		classifierOption.text = weedName.value;
	if(descriptionName.value != "")
		classifierOption.text += " (" +descriptionName.value+ ")";
	
	protocolRequirements.product_name = classifierOption.text;
	
	if(classifierOption.text.length > 23)
		classifierOption.text = classifierOption.text.substring(0,20) + "...";
	
	//Проверка сущестования компанента класификатора, его перезапись
	if(selectElementProduct[selectElementProduct.length-1].value != "classifier")
		selectElementProduct.add(classifierOption);
	else
		selectElementProduct[selectElementProduct.length-1] = classifierOption;
	
	//Обнавление компанента, и закрытие классификатора
	selectElementProduct.selectedIndex = selectElementProduct.length-1;
	requirementsProductClassifier.style.display = "none";
	requirementsProductClassifier.style.zIndex = 0;
	overlayDisplayBlcok.style.zIndex = 0;
	//Отчиста ID-класификатора
	clearRequirementsClassifierProduct()
	//Запись дополнительных значений Засоритель
	protocolRequirements.classifier.classifierWeed.useADD = true;
	protocolRequirements.classifier.classifierWeed.addClassifier.industry = requirementsProductClassifier.children[0].children[3].children[1].children[0].value;
	protocolRequirements.classifier.classifierWeed.addClassifier.category = requirementsProductClassifier.children[0].children[3].children[3].children[0].value;
	protocolRequirements.classifier.classifierWeed.addClassifier.classWeed = requirementsProductClassifier.children[0].children[3].children[5].children[0].value;
	protocolRequirements.classifier.classifierWeed.addClassifier.weedName = requirementsProductClassifier.children[0].children[3].children[7].children[0].value;
	protocolRequirements.classifier.classifierWeed.addClassifier.description = requirementsProductClassifier.children[0].children[3].children[9].children[0].value;
		
	if(protocolRequirements.components.length == 0)
		addComponentRequirements();
	
	protocolRequirements.components[0].classifier.classifierType = protocolRequirements.classifier.classifierType;
	protocolRequirements.components[0].classifier.classifierWeed.useADD = protocolRequirements.classifier.classifierWeed.useADD;
	protocolRequirements.components[0].classifier.classifierWeed.addClassifier.industry = protocolRequirements.classifier.classifierWeed.addClassifier.industry;
	protocolRequirements.components[0].classifier.classifierWeed.addClassifier.category = protocolRequirements.classifier.classifierWeed.addClassifier.category;
	protocolRequirements.components[0].classifier.classifierWeed.addClassifier.classWeed = protocolRequirements.classifier.classifierWeed.addClassifier.classWeed;
	protocolRequirements.components[0].classifier.classifierWeed.addClassifier.weedName = protocolRequirements.classifier.classifierWeed.addClassifier.weedName;
	protocolRequirements.components[0].classifier.classifierWeed.addClassifier.description = protocolRequirements.classifier.classifierWeed.addClassifier.description;
	
	setupRequirementsClassifierComponents(1);
	
	headerTooltip.children[1].style.display = "";
}
//Функция добавления новых элементов классификатора для компонентов требований
function requirementsClassifierSourceComponentNewProductADD(id){
	var selectElementSource = document.getElementById("requirements_item_source_"+id).children[1].children[0].children[0];
	var classifier = document.getElementById("requirements_classifier_"+id);
	var productName = classifier.children[0].children[1].children[5].children[0];
	var descriptionName = classifier.children[0].children[1].children[7].children[0];
		
	var classifierOption = document.createElement('option');
	classifierOption.value = "classifier";
	
	if(productName.value != "")
		classifierOption.text = productName.value;
	if(descriptionName.value != "")
		classifierOption.text += " (" +descriptionName.value+")";
	
	protocolRequirements.components[id-1].product_name = classifierOption.text;
	
	if(classifierOption.text.length > 23)
		classifierOption.text = classifierOption.text.substring(0,20) + "...";
	
	if(protocolRequirements.components[id-1].other_check){
		var requirementsClassifier = document.getElementById("requirements_classifier_"+id);
		var ProductElement = requirementsClassifier.children[0].children[0].children[5].children[0];
		
		changeRequirementsComponents();
		clearClassifierSelect(ProductElement);
	}
	
	//Проверка сущестования компанента класификатора, его перезапись
	if(selectElementSource[selectElementSource.length-1].value != "classifier")
		selectElementSource.add(classifierOption);
	else
		selectElementSource[selectElementSource.length-1] = classifierOption;
		
	//Обнавление компанента, и закрытие классификатора
	selectElementSource.selectedIndex = selectElementSource.length-1;
	classifier.style.display = "none";
	classifier.style.zIndex = 0;
	overlayDisplayBlcok.style.zIndex = 0
	//Отчиста ID-класификатора
	clearRequirementsClassifierComponents(id);
	//Заполнение ID-класификатора Продукт
	protocolRequirements.components[id-1].classifier.classifierProduct.useADD = true;
	protocolRequirements.components[id-1].classifier.classifierProduct.addClassifier.industry = classifier.children[0].children[1].children[1].children[0].value;
	protocolRequirements.components[id-1].classifier.classifierProduct.addClassifier.groupProduct = classifier.children[0].children[1].children[3].children[0].value;
	protocolRequirements.components[id-1].classifier.classifierProduct.addClassifier.product = classifier.children[0].children[1].children[5].children[0].value;
	protocolRequirements.components[id-1].classifier.classifierProduct.addClassifier.description = classifier.children[0].children[1].children[7].children[0].value;
	protocolRequirements.components[id-1].classifier.classifierProduct.addClassifier.productType = classifier.children[0].children[1].children[9].children[0].value;
	protocolRequirements.components[id-1].classifier.classifierProduct.addClassifier.productSort = classifier.children[0].children[1].children[11].children[0].value;
		
	for(var i = 0; i< protocolRequirements.fractions.length; i++){
		setupFractionComponents(i+1, id);
	}
	
	headerTooltip.children[1].style.display = "";
}
function requirementsClassifierSourceComponentNewWeedADD(id){
	var selectElementSource = document.getElementById("requirements_item_source_"+id).children[1].children[0].children[0];
	var classifier = document.getElementById("requirements_classifier_"+id);
	var weedName = classifier.children[0].children[3].children[7].children[0];
	var descriptionWeed = classifier.children[0].children[3].children[9].children[0];
		
	var classifierOption = document.createElement('option');
	classifierOption.value = "classifier";
	
	if(weedName.value != "")
		classifierOption.text = weedName.value;
	if(descriptionWeed.value != "")
		classifierOption.text += " (" +descriptionWeed.value+ ")";
	
	protocolRequirements.components[id-1].product_name = classifierOption.text;
	
	if(classifierOption.text.length > 23)
		classifierOption.text = classifierOption.text.substring(0,20) + "...";
	
	if(protocolRequirements.components[id-1].other_check){
		var requirementsClassifier = document.getElementById("requirements_classifier_"+id);
		var ProductElement = requirementsClassifier.children[0].children[0].children[5].children[0];
		
		changeRequirementsComponents();
		clearClassifierSelect(ProductElement);
	}

	//Проверка сущестования компанента класификатора, его перезапись
	if(selectElementSource[selectElementSource.length-1].value != "classifier")
		selectElementSource.add(classifierOption);
	else
		selectElementSource[selectElementSource.length-1] = classifierOption;
		
	//Обнавление компанента, и закрытие классификатора
	selectElementSource.selectedIndex = selectElementSource.length-1;
	classifier.style.display = "none";
	classifier.style.zIndex = 0;
	overlayDisplayBlcok.style.zIndex = 0
	//Отчиста ID-класификатора
	clearRequirementsClassifierComponents(id);
	//Заполнение ID-класификатора Засоритель
	protocolRequirements.components[id-1].classifier.classifierWeed.useADD = true;
	protocolRequirements.components[id-1].classifier.classifierWeed.addClassifier.industry = classifier.children[0].children[3].children[1].children[0].value;
	protocolRequirements.components[id-1].classifier.classifierWeed.addClassifier.category = classifier.children[0].children[3].children[3].children[0].value;
	protocolRequirements.components[id-1].classifier.classifierWeed.addClassifier.classWeed = classifier.children[0].children[3].children[5].children[0].value;
	protocolRequirements.components[id-1].classifier.classifierWeed.addClassifier.weedName = classifier.children[0].children[3].children[7].children[0].value;
	protocolRequirements.components[id-1].classifier.classifierWeed.addClassifier.description = classifier.children[0].children[3].children[9].children[0].value;
	
	for(var i = 0; i< protocolRequirements.fractions.length; i++){
		setupFractionComponents(i+1, id);
	}
	
	headerTooltip.children[1].style.display = "";
}
//Вывод ссылок на гост и википедию
function classifierSourceGOST(id_product,id_purpose){
	var scrollBlock = productClassifier.children[0].children[5].children[1].children[1];
	var wikiBlock = scrollBlock.children[0];
	var wikiLink = wikiBlock.children[0].children[0];
	
	if(id_product != 9999 && id_product != "" && list_product[id_product].wikilink != "-"){
		wikiBlock.style.display = "flex";
		wikiLink.href = list_product[id_product].wikilink;
	}
	else
		wikiBlock.style.display = "none";
	
	creatingGOST(id_product,id_purpose,scrollBlock);
}
function classifierSourceComponentGOST(id_classifier,id_product,id_purpose){
	var classifier = document.getElementById("classifier_"+id_classifier);
	var scrollBlock = classifier.children[0].children[5].children[1].children[1];
	var wikiBlock = scrollBlock.children[0];
	var wikiLink = wikiBlock.children[0].children[0];
	
	if(id_product != 9999 && id_product != "" && list_product[id_product].wikilink != "-"){
		wikiBlock.style.display = "flex";
		wikiLink.href = list_product[id_product].wikilink;
	}
	else
		wikiBlock.style.display = "none";
	
	creatingGOST(id_product,id_purpose,scrollBlock);
}
function requirementsClassifierSourceGOST(id_product, id_purpose){
	var scrollBlock = requirementsProductClassifier.children[0].children[5].children[1].children[1];
	var wikiBlock = scrollBlock.children[0];
	var wikiLink = wikiBlock.children[0].children[0];
	
	if(id_product != 9999 && id_product != "" && list_product[id_product].wikilink != "-"){
		wikiBlock.style.display = "flex";
		wikiLink.href = list_product[id_product].wikilink;
	}
	else
		wikiBlock.style.display = "none";
	
	creatingGOST(id_product,id_purpose,scrollBlock);
}
function requirementsClassifierSourceComponentGOST(id_classifier, id_product, id_purpose){
	var classifier = document.getElementById("requirements_classifier_"+id_classifier);
	var scrollBlock = classifier.children[0].children[5].children[1].children[1];
	var wikiBlock = scrollBlock.children[0];
	var wikiLink = wikiBlock.children[0].children[0];
	
	if(id_product != 9999 && id_product != "" && list_product[id_product].wikilink != "-"){
		wikiBlock.style.display = "flex";
		wikiLink.href = list_product[id_product].wikilink;
	}
	else
		wikiBlock.style.display = "none";
	
	creatingGOST(id_product,id_purpose,scrollBlock);
}
function creatingGOST(id_product,id_purpose,scrollBlock){
	var gostBlock = scrollBlock.children[1];
	//Удаление лишних гостов.
	while(scrollBlock.children.length != 2){
		scrollBlock.children[2].remove();
	}
	if(list_product[id_product] != null){
		switch(Number(id_purpose)){
			//Добавление гостов для Семян
			case 1:
				for(var i = 0; i < list_product[id_product].purpose_seed.length; i++){
					var gostClone = gostBlock.cloneNode(true);
					var gostLink = gostClone.children[0];
					var gostTitle = gostClone.children[0].children[0];
					var gostDescription = gostClone.children[0].children[1];
					
					if(list_product[id_product].purpose_seed[i] != "-"){
						var id = list_product[id_product].purpose_seed[i];
						gostLink.href = list_GOST[id-1].link != "-" ? list_GOST[id-1].link : "#";
						gostTitle.textContent = list_GOST[id-1].gostName;
						gostDescription.textContent = list_GOST[id-1].description;
						gostClone.style.display = "flex";
						scrollBlock.appendChild(gostClone);
					}
				}
				break;
				//Добавление гостов для Корма
			case 5:
				for(var i = 0; i < list_product[id_product].purpose_fodder.length; i++){
					var gostClone = gostBlock.cloneNode(true);
					var gostLink = gostClone.children[0];
					var gostTitle = gostClone.children[0].children[0];
					var gostDescription = gostClone.children[0].children[1];
					
					if(list_product[id_product].purpose_fodder[i] != "-"){
						var id = list_product[id_product].purpose_fodder[i];
						gostLink.href = list_GOST[id-1].link != "-" ? list_GOST[id-1].link : "#";
						gostTitle.textContent = list_GOST[id-1].gostName;
						gostDescription.textContent = list_GOST[id-1].description;
						gostClone.style.display = "flex";
						scrollBlock.appendChild(gostClone);
					}
				}
				break;
				//Добавление гостов для Сырья
			case 7:
				for(var i = 0; i < list_product[id_product].purpose_raw.length; i++){
					var gostClone = gostBlock.cloneNode(true);
					var gostLink = gostClone.children[0];
					var gostTitle = gostClone.children[0].children[0];
					var gostDescription = gostClone.children[0].children[1];
					
					if(list_product[id_product].purpose_raw[i] != "-"){
						var id = list_product[id_product].purpose_raw[i];
						gostLink.href = list_GOST[id-1].link != "-" ? list_GOST[id-1].link : "#";
						gostTitle.textContent = list_GOST[id-1].gostName;
						gostDescription.textContent = list_GOST[id-1].description;
						gostClone.style.display = "flex";
						scrollBlock.appendChild(gostClone);
					}
				}
				break;
			case 9999:
				for(var i = 0; i < list_product[id_product].purpose_seed.length; i++){
					var gostClone = gostBlock.cloneNode(true);
					var gostLink = gostClone.children[0];
					var gostTitle = gostClone.children[0].children[0];
					var gostDescription = gostClone.children[0].children[1];
					
					if(list_product[id_product].purpose_seed[i] != "-"){
						var id = list_product[id_product].purpose_seed[i];
						gostLink.href = list_GOST[id-1].link != "-" ? list_GOST[id-1].link : "#";
						gostTitle.textContent = list_GOST[id-1].gostName;
						gostDescription.textContent = list_GOST[id-1].description;
						gostClone.style.display = "flex";
						scrollBlock.appendChild(gostClone);
					}
				}
				for(var i = 0; i < list_product[id_product].purpose_fodder.length; i++){
					var gostClone = gostBlock.cloneNode(true);
					var gostLink = gostClone.children[0];
					var gostTitle = gostClone.children[0].children[0];
					var gostDescription = gostClone.children[0].children[1];
					
					if(list_product[id_product].purpose_fodder[i] != "-"){
						var id = list_product[id_product].purpose_fodder[i];
						gostLink.href = list_GOST[id-1].link != "-" ? list_GOST[id-1].link : "#";
						gostTitle.textContent = list_GOST[id-1].gostName;
						gostDescription.textContent = list_GOST[id-1].description;
						gostClone.style.display = "flex";
						scrollBlock.appendChild(gostClone);
					}
				}
				for(var i = 0; i < list_product[id_product].purpose_raw.length; i++){
					var gostClone = gostBlock.cloneNode(true);
					var gostLink = gostClone.children[0];
					var gostTitle = gostClone.children[0].children[0];
					var gostDescription = gostClone.children[0].children[1];
					
					if(list_product[id_product].purpose_raw[i] != "-"){
						var id = list_product[id_product].purpose_raw[i];
						gostLink.href = list_GOST[id-1].link != "-" ? list_GOST[id-1].link : "#";
						gostTitle.textContent = list_GOST[id-1].gostName;
						gostDescription.textContent = list_GOST[id-1].description;
						gostClone.style.display = "flex";
						scrollBlock.appendChild(gostClone);
					}
				}
				break;
		}
	}
}
//ввывод аппаратов и конфигураций
function setupProtocolMachine(id){
	var protocolSelectElement = protocolSettings.children[0].children[0].children[1].children[0].children[0];
	if(!search_load)
		var menuSelectElement = document.getElementById("protocol_"+id).children[0].children[1].children[1].children[1].children[0].children[0];
	else
		var menuSelectElement = document.getElementById("search_protocol_"+id).children[0].children[1].children[1].children[1].children[0].children[0];
	
	while(protocolSelectElement.length > 1){
		protocolSelectElement.children[1].remove();
	}
	
	for(var i = 0; i < list_machine.length; i++){
		//Заполнение внешнего поля
		var optionMenu = document.createElement("option");
		optionMenu.textContent = list_machine[i].machineName;
		optionMenu.value = list_machine[i].id_machine;
		menuSelectElement.add(optionMenu);
		//Заполнение внутреннего поля
		var optionPrototol = document.createElement("option");
		optionPrototol.textContent = list_machine[i].machineName;
		optionPrototol.value = list_machine[i].id_machine;
		protocolSelectElement.add(optionPrototol);
	}
}
function setupProtocolConfiguration(id, id_machine){
	var protocolSelectElement = protocolSettings.children[0].children[0].children[1].children[0].children[1];
	if(!search_load)
		var menuSelectElement = document.getElementById("protocol_"+id).children[0].children[1].children[1].children[1].children[0].children[1];
	else
		var menuSelectElement = document.getElementById("search_protocol_"+id).children[0].children[1].children[1].children[1].children[0].children[1];
	
	while(protocolSelectElement.length > 1)
		protocolSelectElement.children[1].remove();
	while(menuSelectElement.length > 1)
		menuSelectElement.children[1].remove();
	
	if(id_machine != 9999){
		for(var i = 0; i < list_machine[id_machine].id_configration.length; i++){
			var id_configration = list_machine[id_machine].id_configration[i];
			//Заполнение внешнего поля
			var optionMenu = document.createElement("option");
			optionMenu.textContent = list_configuration[id_configration].configuration;
			optionMenu.value = list_configuration[id_configration].id_configuration;
			menuSelectElement.add(optionMenu);
			//Заполнение внутреннего поля
			var optionPrototol = document.createElement("option");
			optionPrototol.textContent = list_configuration[id_configration].configuration;
			optionPrototol.value = list_configuration[id_configration].id_configuration;
			protocolSelectElement.add(optionPrototol);
		}	
	}
	if(!search_load)
		menuSelectElement.value = protocol[id-1].configuration;
	else
		menuSelectElement.value = protocolSearch[id-1].configuration;
}
function setupRequirementsMachine(){
	for(var i = 0; i < list_machine.length; i++){
		var option = document.createElement("option");
		option.textContent = list_machine[i].machineName;
		option.value = list_machine[i].id_machine;
		requirementsMachine.add(option);
	}
}
function setupRequirementsConfiguration(){
	while(requirementsConfiguration.length > 1)
		requirementsConfiguration.children[1].remove();
	
	var id_machine = requirementsMachine.value;
	if(id_machine != 9999){
		for(var i = 0; i < list_machine[id_machine].id_configration.length; i++){
			var id_configration = list_machine[id_machine].id_configration[i];
			var option = document.createElement("option");
			option.textContent = list_configuration[id_configration].configuration;
			option.value = list_configuration[id_configration].id_configuration;
			requirementsConfiguration.add(option);
		}		
	}
}
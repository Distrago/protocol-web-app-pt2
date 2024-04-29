var row = 0;
var fraction = 2;

//Константа для максимального значения засорителя
const weed_max = 15.0;
//Коэфициент дял массы 1000 зерен продукта
var product_coeficient;
var weed_coeficient = [];

//Массивы-объекты для подгружаемых таблиц
//Объетт Классификации продукта
var сlassification_product_name = []
//Объетт Классификации описания продукта
var сlassification_product_description = []
//Объетт Классификации засорителя
var сlassification_weed_name = []
//Объетт Классификации описания засорителя
var сlassification_weed_description = []
//Объект Номиклатуры продукта
var nomenclature_product = []
//Объект Номиклатуры назначения продукта
var nomenclature_product_purpose = []

//Функции генерации таблиц
function generate_сlassification_product_name(ID_Product, ID_Name, product, addName, minM, maxM, M)
{
	сlassification_product_name[ID_Product] =
	{
		id_product: Number(ID_Product),
		id_name: Number(ID_Name),
		product: String(product),
		addName: String(addName),
		minM: Number(minM),
		maxM: Number(maxM),
		M: Number(M)
	}
}
function generate_сlassification_product_description(ID_Description, ID_Class, description, percent_M, ID_Products)
{
	сlassification_product_description[ID_Description] =
	{
		id_description: Number(ID_Description),
		id_class: Number(ID_Class),
		description: String(description),
		percent_M: Number(percent_M),
		id_producst: Number(ID_Products)
	}
}
function generate_сlassification_weed_name(ID_Weed, ID_Class, ID_Name, weed, minM, maxM, M)
{
	сlassification_weed_name[ID_Weed] =
	{
		id_weed: Number(ID_Weed),
		id_class: Number(ID_Class),
		id_name: Number(ID_Name),
		weed: String(weed),
		minM: Number(minM),
		maxM: Number(maxM),
		M: Number(M)
	}
}
function generate_сlassification_weed_description(ID_Description, ID_Class, description)
{
	сlassification_weed_description[ID_Description] =
	{
		id_description: Number(ID_Description),
		id_class: Number(ID_Class),
		description: String(description)
	}
}
function generate_nomenclature_product(ID_Product, ID_ProductGroup, product)
{
	nomenclature_product[ID_Product] =
	{
		id_product: Number(ID_Product),
		id_productGroup: Number(ID_ProductGroup),
		product: String(product)
	}
}
function generate_nomenclature_product_purpose(ID_Purpose, purpose)
{
	nomenclature_product_purpose[ID_Purpose] =
	{
		id_purpos: Number(ID_Purpose),
		purpose: String(purpose)
	}
}

//Функции отвечающая за загрузку приложения
function StartApp(){
	load_table();
	setTimeout(function(){
		productSelect();
		purposeSelect();
		
		weedNameSelect();
		weedDescriptionSelect();
		fraction_valid_mark();
		mass_and_count();
		fractionCompanentName();
		addFileChange();
	},1500);
	
	fraction_01_count_mass_main.addEventListener("change", function(){
		calculation_fraction_block_1(1,"mainProduct");
		fraction_01_calculation();
	});	
	fraction_01_count_mass_other.addEventListener("change", function(){
		calculation_fraction_block_1(1,"otherBlock");
		fraction_01_calculation();
	});	
	fraction_02_count_mass_main.addEventListener("change", function(){
		calculation_fraction_block_1(2,"mainProduct");
		fraction_02_calculation();
	});	
	fraction_02_count_mass_other.addEventListener("change", function(){
		calculation_fraction_block_1(2,"otherBlock");
		fraction_02_calculation();
	});
	
	fraction_01_mass_main.addEventListener("change", function(){
		calculation_fraction_block_2(1,"mainProduct");
		fraction_01_calculation();
	});	
	fraction_01_mass_other.addEventListener("change", function(){
		calculation_fraction_block_2(1,"otherBlock");
		fraction_01_calculation();
	});	
	fraction_02_mass_main.addEventListener("change", function(){
		calculation_fraction_block_2(2,"mainProduct");
		fraction_02_calculation();
	});	
	fraction_02_mass_other.addEventListener("change", function(){
		calculation_fraction_block_2(2,"otherBlock");
		fraction_02_calculation();
	});
	
	//Автоматическое добавление id
	var queryString = location.search;
	if(queryString != "")
		protocolID.value = queryString.substr(4);
}
//Сохрание в таблицы протоколы
function protocolSave(){
	//отображение заглушки
	overlay.style.display = "flex";
	overlay.style.height = document.body.offsetHeight;
	overlay.style.width = document.body.offsetWidth;
	
	//Сохранение на сервере
	server_img_save();
}
//Функции сохраниения данных в таблицы гугла
function protocolFractionSave(){
	
	protocol_array_fraction = [];
	protocol_array_valid_itemBlock = [];
	
	for(var fraction_id=1; fraction_id<=fraction;fraction_id++){
		if(fraction_id<10)
			protocol_array_fraction[fraction_id-1] = "0" + String(fraction_id);
		else
			protocol_array_fraction[fraction_id-1] = String(fraction_id);
		
		protocol_array_valid_itemBlock[fraction_id-1] = "";
		protocol_array_valid_itemBlock[fraction_id-1] += document.getElementById("fraction_"+protocol_array_fraction[fraction_id-1]+"_mainProduct").children[3].children[0].children[0].checked ? "0" : "";
		
		for(var id=1; id<=row; id++){
			protocol_array_valid_itemBlock[fraction_id-1] += document.getElementById("fraction_"+protocol_array_fraction[fraction_id-1]+"_itemBlock_"+id).children[3].children[0].children[0].checked ? String(id) : "";
		}
		
		protocol_array_valid_itemBlock[fraction_id-1] += document.getElementById("fraction_"+protocol_array_fraction[fraction_id-1]+"_otherBlock").children[3].children[0].children[0].checked ? String(row+1) : "";
	}
	protocol_fraction_id = 0;
	protocol_fraction_id_max = protocol_array_fraction.length-1;
	
	set_fraction(protocol_array_fraction[0], protocol_array_valid_itemBlock[0]);
}
function protocolCompanentSave(){
	protocol_array_companent = [];
	
	protocol_array_companent.push(document.getElementById("mainProduct"));
	
	for(var id=1; id<=row; id++){
		protocol_array_companent.push(document.getElementById("itemBlock_"+id));
	}
	
	protocol_array_companent.push(document.getElementById("otherBlock"));
	
	protocol_companent = 0;
	protocol_companent_max = protocol_array_companent.length-1;
	
	set_companent_mainInfo(protocol_array_companent[0]);
}
function protolCompanentSaveADD(protocol_fracton_number){
	protocol_array_companent = [];
	
	if(protocol_fracton_number<10)
		var str = "fraction_0" + protocol_fracton_number;
	else
		var str = "fraction_0" + protocol_fracton_number;
	
	protocol_array_companent.push(document.getElementById(str+"_mainProduct"));
	
	for(var id=1; id<=row; id++){
		protocol_array_companent.push(document.getElementById(str+"_itemBlock_"+id));
	}
	
	protocol_array_companent.push(document.getElementById(str+"_otherBlock"));
	
	protocol_companent = 0;
	protocol_companent_max = protocol_array_companent.length-1;
	
	set_companent_addInfo(protocol_fracton_number,protocol_array_companent[0]);
}

//Заполнение Номиклатуры
function productSelect(){
	for(var i=0; i < nomenclature_product.length; i++){
        var newOption = new Option(nomenclature_product[i].product, i);
        compositionInput_NameProduct.append(newOption);
	}
}
function purposeSelect(){
	for(var i=0; i < nomenclature_product_purpose.length; i++){
        var newOption = new Option(nomenclature_product_purpose[i].purpose, i);
        compositionInput_ProductPurpose.append(newOption);
	}
}
function weedNameSelect(){
	for(var i=0; i < сlassification_weed_name.length; i++){
        var newOption = new Option(сlassification_weed_name[i].weed, i);
        selectNameWeed.append(newOption);
	}
	for(var i=0; i < сlassification_product_name.length; i++){
        var newOption = new Option(сlassification_product_name[i].product, сlassification_weed_name.length + i);
        selectNameWeed.append(newOption);
	}	
}
function weedDescriptionSelect(){
	for(var i=0; i < сlassification_product_description.length; i++){
        var newOption = new Option(сlassification_product_description[i].description, i);
        selectDescriptionWeed.append(newOption);
	}	
	for(var i=0; i < сlassification_weed_description.length; i++){
        var newOption = new Option(сlassification_weed_description[i].description, сlassification_product_description.length + i);
        selectDescriptionWeed.append(newOption);
	}	
}
//Добавление засорителей для основной таблицы
function addRow(){	
	row++;
	//добовление в основную страницу
	var clone = itemBlock.cloneNode(true);
	clone.id = "itemBlock_" + row;
	clone.style = "display: flex";
	clone.firstElementChild.firstElementChild.textContent = row + 1;
	itemWeedBlock.appendChild(clone);
	
	document.getElementById("itemBlock_" + row).children[1].children[1].children[0].max = weed_max; //Вариант с максимальным значение по статичному параметру
	otherBlock.firstElementChild.firstElementChild.textContent = row + 2;

	var input_weed = document.getElementById("itemBlock_" + row).children[1].children[0].children[3];
	var slider_weed = document.getElementById("itemBlock_" + row).children[1].children[1].children[0];
	addListeners(input_weed, slider_weed, "main");
	//Добавление функции добавление функции картинки
	var weed_img_photo = document.getElementById("itemBlock_" + row).lastElementChild.firstElementChild;
	var weed_input_photo = document.getElementById("itemBlock_" + row).lastElementChild.lastElementChild;
	file_img_change(weed_input_photo,weed_img_photo);
	
	
	//добовление в фракцию 01
	var clone_01 = fraction_01_itemBlock.cloneNode(true);
	clone_01.id = "fraction_01_itemBlock_" + row;
	clone_01.style = "display: flex";
	clone_01.firstElementChild.firstElementChild.textContent = row + 1;
	
	fraction_01_itemWeedBlock.appendChild(clone_01);
	fraction_01_otherBlock.firstElementChild.firstElementChild.textContent = row + 2;
	
	var fraction_01_input_weed = document.getElementById("fraction_01_itemBlock_" + row).children[1].children[0].children[4];
	var fraction_01_slider_weed = document.getElementById("fraction_01_itemBlock_" + row).children[1].children[1].children[0];
	addListeners(fraction_01_input_weed, fraction_01_slider_weed, "fraction_01");
	
	//Добавление функции для расчета шт/кг
	clone_01.children[1].children[0].children[6].addEventListener("change",function(){
		calculation_fraction_block_1(Number(clone_01.id.substring(10,11)),clone_01.id.substring(12));
		fraction_01_calculation();
	});	
	//Добавление функции для расчета массы
	clone_01.children[1].children[0].children[7].addEventListener("change",function(){
		calculation_fraction_block_2(Number(clone_01.id.substring(10,11)),clone_01.id.substring(12));
		fraction_01_calculation();
	});

	//добовление в фракцию 02
	var clone_02 = fraction_02_itemBlock.cloneNode(true);
	clone_02.id = "fraction_02_itemBlock_" + row;
	clone_02.style = "display: flex";
	clone_02.firstElementChild.firstElementChild.textContent = row + 1;
	
	fraction_02_itemWeedBlock.appendChild(clone_02);
	fraction_02_otherBlock.firstElementChild.firstElementChild.textContent = row + 2;
	
	var fraction_02_input_weed = document.getElementById("fraction_02_itemBlock_" + row).children[1].children[0].children[4];
	var fraction_02_slider_weed = document.getElementById("fraction_02_itemBlock_" + row).children[1].children[1].children[0];
	addListeners(fraction_02_input_weed, fraction_02_slider_weed, "fraction_02");
	
	//Добавление функции для расчета шт/кг
	clone_02.children[1].children[0].children[6].addEventListener("change",function(){
		calculation_fraction_block_1(Number(clone_02.id.substring(10,11)),clone_02.id.substring(12));
		fraction_02_calculation();
	});	
	//Добавление функции для расчета массы
	clone_02.children[1].children[0].children[7].addEventListener("change",function(){
		calculation_fraction_block_2(Number(clone_02.id.substring(10,11)),clone_02.id.substring(12));
		fraction_02_calculation();
	});
	
	
	//добавление функции удаления
	clone.firstElementChild.lastElementChild.addEventListener("click", function(){
		deleteRow(clone.id);
	});
	
	//дополнительные засорители
	addFractionRow();
	
	fraction_valid_mark();
}
//Добавление фракции в таблицу фракции
function addfraction(){
	fraction++;
	var clone = fraction_00.cloneNode(true);	
	if (fraction < 10)
	{
		clone.id = "fraction_0" + fraction;
		clone.children[1].children[1].children[0].children[0].id = "fraction_0" + fraction + "_mainProduct";
		clone.children[1].children[1].children[0].children[1].id = "fraction_0" + fraction + "_itemWeedBlock";
		clone.children[1].children[1].children[0].children[2].id = "fraction_0" + fraction + "_otherBlock";
		clone.children[1].children[1].children[1].children[0].id = "fraction_0" + fraction + "_TechBlock";
		clone.children[1].children[1].children[1].children[1].id = "fraction_0" + fraction + "_CommentBlock";
		clone.firstElementChild.firstElementChild.textContent = "Фракция 0" + (fraction - 1);		
		fraction_02.firstElementChild.firstElementChild.textContent = "Фракция 0" + fraction;
	}
	else if (fraction == 10)
	{
		clone.id = "fraction_" + fraction;
		clone.children[1].children[1].children[0].children[0].id = "fraction_0" + fraction + "_mainProduct";
		clone.children[1].children[1].children[0].children[1].id = "fraction_0" + fraction + "_itemWeedBlock";
		clone.children[1].children[1].children[0].children[2].id = "fraction_0" + fraction + "_otherBlock";
		clone.children[1].children[1].children[1].children[0].id = "fraction_0" + fraction + "_TechBlock";
		clone.children[1].children[1].children[1].children[1].id = "fraction_0" + fraction + "_CommentBlock";
		clone.firstElementChild.firstElementChild.textContent = "Фракция 0" + (fraction - 1);
		fraction_02.firstElementChild.firstElementChild.textContent = "Фракция " + fraction;
	}
	else if (fraction > 10)
	{
		clone.id = "fraction_" + fraction;
		clone.children[1].children[1].children[0].children[0].id = "fraction_" + fraction + "_mainProduct";
		clone.children[1].children[1].children[0].children[1].id = "fraction_" + fraction + "_itemWeedBlock";
		clone.children[1].children[1].children[0].children[2].id = "fraction_" + fraction + "_otherBlock";
		clone.children[1].children[1].children[1].children[0].id = "fraction_" + fraction + "_TechBlock";
		clone.children[1].children[1].children[1].children[1].id = "fraction_" + fraction + "_CommentBlock";
		clone.firstElementChild.firstElementChild.textContent = "Фракция " + (fraction - 1);
		fraction_02.firstElementChild.firstElementChild.textContent = "Фракция " + fraction;
	}
	clone.style = "display: block";
	addFractionBlock.appendChild(clone);
	
	clone.firstElementChild.lastElementChild.addEventListener("click", function(){
		deleateFraction(clone.id);
	});
	
	var input_main = clone.children[1].children[1].children[0].children[0].children[1].children[0].children[4];
	var slider_main = clone.children[1].children[1].children[0].children[0].children[1].children[1].children[0];
	addListeners(input_main,slider_main, "fraction_00");
	
	var input_other = clone.children[1].children[1].children[0].children[2].children[1].children[0].children[4];
	var slider_slider = clone.children[1].children[1].children[0].children[2].children[1].children[1].children[0];
	addListeners(input_other,slider_slider, "fraction_00");
	
	//Добавление функции для расчета шт/кг
	clone.children[1].children[1].children[0].children[0].children[1].children[0].children[6].addEventListener("change",function(){
		calculation_fraction_block_1(Number(clone.id.substring(9)),"mainProduct");
		fraction_00_calculation();
	});
	clone.children[1].children[1].children[0].children[2].children[1].children[0].children[6].addEventListener("change",function(){
		calculation_fraction_block_1(Number(clone.id.substring(9)),"otherBlock");
		fraction_00_calculation();
	});	
	//Добавление функции для расчета масс
	clone.children[1].children[1].children[0].children[0].children[1].children[0].children[7].addEventListener("change",function(){
		calculation_fraction_block_2(Number(clone.id.substring(9)),"mainProduct");
		fraction_00_calculation();
	});
	clone.children[1].children[1].children[0].children[2].children[1].children[0].children[7].addEventListener("change",function(){
		calculation_fraction_block_2(Number(clone.id.substring(9)),"otherBlock");
		fraction_00_calculation();
	});
	
	//Добавление функции добавление функции картинки
	if (fraction < 10)
	{
		var fraction_00_img_photo = document.getElementById("fraction_0" + fraction + "_TechBlock").lastElementChild.firstElementChild;
		var fraction_00_input_photo = document.getElementById("fraction_0" + fraction + "_TechBlock").lastElementChild.lastElementChild;
	}
	else
	{
		var fraction_00_img_photo = document.getElementById("fraction_" + fraction + "_TechBlock").lastElementChild.firstElementChild;
		var fraction_00_input_photo = document.getElementById("fraction_" + fraction + "_TechBlock").lastElementChild.lastElementChild;		
	}
	file_img_change(fraction_00_input_photo,fraction_00_img_photo);
	
	
	for(var i=1; i<=row; i++){
		var button_del = document.getElementById("itemBlock_" + i).firstElementChild.lastElementChild;
		
		var weed_block = clone.children[1].children[1].children[0].children[1];
		var clone_weed = clone.children[1].children[1].children[0].children[1].children[0].cloneNode(true);
		clone_weed.style = "display: flex";
		clone_weed.firstElementChild.firstElementChild.textContent = i + 1;
		clone.children[1].children[1].children[0].children[2].firstElementChild.firstElementChild.textContent = i + 2;
		
		if (fraction < 10)
			clone_weed.id = "fraction_0" + fraction + "_itemBlock_" + i;
		else
			clone_weed.id = "fraction_" + fraction + "_itemBlock_" + i;
		
		weed_block.appendChild(clone_weed);
		
		var input = clone_weed.children[1].children[0].children[4];
		var slider = clone_weed.children[1].children[1].children[0];
		addListeners(input,slider, "fraction_00");
		
		//Добавление функции для расчета шт/кг
		clone_weed.children[1].children[0].children[6].addEventListener("change",function(){
			calculation_fraction_block_1(Number(clone_weed.id.substring(10,11)),clone_weed.id.substring(12));
			if(Number(clone_weed.id.substring(10,11)) == 1)
				fraction_01_calculation();
			else if(Number(clone_weed.id.substring(10,11)) == 2)
				fraction_02_calculation();
			else
				fraction_00_calculation();
		});			
		//Добавление функции для расчета масс
		clone_weed.children[1].children[0].children[7].addEventListener("change",function(){
			calculation_fraction_block_2(Number(clone_weed.id.substring(10,11)),clone_weed.id.substring(12));
			if(Number(clone_weed.id.substring(10,11)) == 1)
				fraction_01_calculation();
			else if(Number(clone_weed.id.substring(10,11)) == 2)
				fraction_02_calculation();
			else
				fraction_00_calculation();
		});		
		

	}
	
	fraction_valid_mark();
}
function addFractionRow(){
	for(var i= 3; i <= fraction; i++){
		var weed_block = document.getElementById("addFractionBlock").children[i-2].children[1].children[1].children[0].children[1];
		var clone = document.getElementById("addFractionBlock").children[i-2].children[1].children[1].children[0].children[1].children[0].cloneNode(true);
		clone.style = "display: flex";	
		clone.firstElementChild.firstElementChild.textContent = row + 1;
		
		if (fraction < 10)
		{
			clone.id = "fraction_0" + i + "_itemBlock_" + row;			
			document.getElementById("fraction_0"+ i +"_otherBlock").firstElementChild.firstElementChild.textContent = row + 2;
		}
		else
		{
			clone.id = "fraction_" + i + "_itemBlock_" + row;
			document.getElementById("fraction_"+ i +"_otherBlock").firstElementChild.firstElementChild.textContent = row + 2;
		}
	
		weed_block.appendChild(clone);
		
		var input = clone.children[1].children[0].children[4];
		var slider = clone.children[1].children[1].children[0];
		addListeners(input,slider, "fraction_00");
		
		//Добавление функции для расчета шт/кг
		clone.children[1].children[0].children[6].addEventListener("change",function(){
			calculation_fraction_block_1(Number(clone.id.substring(10,11)),clone.id.substring(12));
			if(Number(clone.id.substring(10,11)) == 1)
				fraction_01_calculation();
			else if(Number(clone.id.substring(10,11)) == 2)
				fraction_02_calculation();
			else
				fraction_00_calculation();
		});		
		//Добавление функции для расчета масс
		clone.children[1].children[0].children[7].addEventListener("change",function(){
			calculation_fraction_block_2(Number(clone.id.substring(10,11)),clone.id.substring(12));
			if(Number(clone.id.substring(10,11)) == 1)
				fraction_01_calculation();
			else if(Number(clone.id.substring(10,11)) == 2)
				fraction_02_calculation();
			else
				fraction_00_calculation();
		});
		
	}
	fraction_mass_count();
}
//TODO: ПЕРИСИСАТЬ и СКОМПОНОВАТЬ РЕДАКТИРОВАНИЕ В ОДНУ ФУНКЦИЮ!!!
function editCloneElement(){
	var length = itemWeedBlock.children.length;
	for(var i = 1; i < length; i++){
		itemWeedBlock.children[i].id  = "itemBlock_" + i;
		fraction_01_itemWeedBlock.children[i].id = "fraction_01_itemBlock_" + i;
		fraction_02_itemWeedBlock.children[i].id = "fraction_02_itemBlock_" + i;
		 
		fraction_01_itemWeedBlock.children[i].firstElementChild.firstElementChild.textContent = i + 1; 
		fraction_02_itemWeedBlock.children[i].firstElementChild.firstElementChild.textContent = i + 1; 
		itemWeedBlock.children[i].firstElementChild.firstElementChild.textContent = i + 1;
	}
	for(var k=3;k<=fraction; k++){
		if (k<10)
			var element = document.getElementById("fraction_0"+k+"_itemWeedBlock");
		else
			var element = document.getElementById("fraction_"+k+"_itemWeedBlock");
		for(var j=1; j< length; j++){
			if (fraction<10)
				element.children[j].id = "fraction_0"+k+"_itemBlock_"+j
			else
				element.children[j].id = "fraction_"+k+"_itemBlock_"+j;
			element.children[j].firstElementChild.firstElementChild.textContent = j + 1
		}
		if (k<10)
			document.getElementById("fraction_0"+k+"_otherBlock").firstElementChild.firstElementChild.textContent = row + 2;
		else
			document.getElementById("fraction_"+k+"_otherBlock").firstElementChild.firstElementChild.textContent = row + 2;
	}
		
	otherBlock.firstElementChild.firstElementChild.textContent = row + 2;
	fraction_01_otherBlock.firstElementChild.firstElementChild.textContent = row + 2;
	fraction_02_otherBlock.firstElementChild.firstElementChild.textContent = row + 2;
}
function editFractionElement(){
	for (var i = 3; i <= fraction; i++){
		var element = document.getElementById("addFractionBlock").children[i-2];
		if (fraction < 10)
		{
			element.id = "fraction_0" + i;
			element.children[1].children[1].children[0].children[0].id = "fraction_0" + i + "_mainProduct";
			element.children[1].children[1].children[0].children[1].id = "fraction_0" + i + "_itemWeedBlock";
			element.children[1].children[1].children[0].children[2].id = "fraction_0" + i + "_otherBlock";
			element.children[1].children[1].children[1].children[0].id = "fraction_0" + i + "_TechBlock";
			element.firstElementChild.firstElementChild.textContent = "Фракция 0" + (i - 1);		
			fraction_02.firstElementChild.firstElementChild.textContent = "Фракция 0" + i;
		}
		else if (fraction == 10)
		{
			element.id = "fraction_" + i;
			element.children[1].children[1].children[0].children[0].id = "fraction_" + i + "_mainProduct";
			element.children[1].children[1].children[0].children[1].id = "fraction_" + i + "_itemWeedBlock";
			element.children[1].children[1].children[0].children[2].id = "fraction_" + i + "_otherBlock";
			element.children[1].children[1].children[1].children[0].id = "fraction_" + i + "_TechBlock";
			element.firstElementChild.firstElementChild.textContent = "Фракция 0" + (i - 1);
			fraction_02.firstElementChild.firstElementChild.textContent = "Фракция " + i;
		}
		else if (fraction > 10)
		{
			element.id = "fraction_" + i;
			element.children[1].children[1].children[0].children[0].id = "fraction_" + i + "_mainProduct";
			element.children[1].children[1].children[0].children[1].id = "fraction_" + i + "_itemWeedBlock";
			element.children[1].children[1].children[0].children[2].id = "fraction_" + i + "_otherBlock";
			element.children[1].children[1].children[1].children[0].id = "fraction_" + i + "_TechBlock";
			element.firstElementChild.firstElementChild.textContent = "Фракция " + (i - 1);
			fraction_02.firstElementChild.firstElementChild.textContent = "Фракция " + i;
		}
	}
	if(fraction == 2)
		fraction_02.firstElementChild.firstElementChild.textContent = "Фракция 02";
}
function addListeners(input,slider, version){
	if(version == "main"){
		input.addEventListener("change", function(){
			SliderEdit(input,slider);
			calculation_weed();
		});
		slider.addEventListener("input", function(){
			inputEdit(input,slider);
			calculation_weed();
		});
	}
	else if (version == "fraction_01"){
		input.addEventListener("change", function(){
			SliderEdit(input,slider);
			fraction_01_calculation();
		});
		slider.addEventListener("input", function(){
			inputEdit(input,slider);
			fraction_01_calculation();
		});
	}
	else if (version == "fraction_02"){
		input.addEventListener("change", function(){
			SliderEdit(input,slider);
			fraction_02_calculation();
		});
		slider.addEventListener("input", function(){
			inputEdit(input,slider);
			fraction_02_calculation();
		});
	}
	else if (version == "fraction_00"){
		input.addEventListener("change", function(){
			SliderEdit(input,slider);
			fraction_00_calculation();
		});
		slider.addEventListener("input", function(){
			inputEdit(input,slider);
			fraction_00_calculation();
		});
	}
}
//Фкнкции удаления
function deleteRow(id){
	var id_number = Number(id.substring(10));
	
	document.getElementById("itemBlock_"+id_number).remove();
	document.getElementById("fraction_01_itemBlock_"+id_number).remove();
	document.getElementById("fraction_02_itemBlock_"+id_number).remove();
	
	
	for(var i=3; i <=fraction; i++){
		if(i<10)
			document.getElementById("fraction_0"+i+"_itemBlock_"+id_number).remove();
		else
			document.getElementById("fraction_"+i+"_itemBlock_"+id_number).remove();
	}
	
	row--;
	
	editCloneElement();
	calculation_weed();
}
function deleateFraction(fraction_id){
	document.getElementById(fraction_id).remove();
	fraction--;
	
	editFractionElement();
}
//Изменения значений слайдера и поля ввода
function inputEdit(Input,Slider){
	Input.value = Number(Slider.value);
}
function SliderEdit(Input,Slider){
	Slider.value = Input.value;
	
	if(Number(Input.value) > Slider.max)
		Input.value = Slider.max;
}

function mass_and_count(){
	//Установка массы для 1000 зерен номеклатурного продукта
	product_coeficient = сlassification_product_name[compositionInput_NameProduct.value].M;
	//Обнуление массива со значение массы для  1000 зерен для вариантов засорителя и других типов продукта
	weed_coeficient = []; 
	
	//Часто частиц и масса для основного
	mass_main.value = capacityInputValue_temp.value / 100 * percent_main.value;
	count_main.value = (mass_main.value * 1000) / product_coeficient * 1000;
	count_mass_main.value = count_main.value / capacityInputValue_temp.value;
	
	mass_main.value = Number(mass_main.value).toFixed(3);
	count_main.value = Number(count_main.value).toFixed(3);
	count_mass_main.value = Number(count_mass_main.value).toFixed(3);
	
	//Число частиц и масса для дополнительного(прочее)
	mass_other.value = capacityInputValue_temp.value / 100 * percent_other.value;
	count_other.value = (mass_other.value * 1000) / product_coeficient * 1000;
	count_mass_other.value = count_other.value / capacityInputValue_temp.value;
	
	mass_other.value = Number(mass_other.value).toFixed(3);
	count_other.value = Number(count_other.value).toFixed(3);
	count_mass_other.value = Number(count_mass_other.value).toFixed(3);
	
	//Число частиц и масса для засорителе()
	for(var id=1; id <=row; id++){
		var weed_name_value = Number(document.getElementById("itemBlock_" + id).children[1].children[0].children[1].value);
		var weed_description_value = (document.getElementById("itemBlock_" + id).children[1].children[0].children[2].value);
		
		
		if(weed_name_value < сlassification_weed_name.length)
		{
			var id_value = weed_name_value;
			weed_coeficient[id] = сlassification_weed_name[id_value].M
		}
		else
		{
			var id_value = weed_name_value - сlassification_weed_name.length;
			weed_coeficient[id] = сlassification_product_name[id_value].M * сlassification_product_description[id_value].percent_M;
		}
		
		
		var percent = document.getElementById("itemBlock_" + id).children[1].children[0].children[3];
		var mass = document.getElementById("itemBlock_" + id).children[1].children[0].children[6];
		var count = document.getElementById("itemBlock_" + id).children[1].children[0].children[4];
		var count_mass = document.getElementById("itemBlock_" + id).children[1].children[0].children[5];
		
		mass.value = capacityInputValue_temp.value / 100 * percent.value;
		count.value = (mass.value * 1000) / weed_coeficient[id] * 1000;
		count_mass.value = count.value / capacityInputValue_temp.value;
		
		mass.value = Number(mass.value).toFixed(3);
		count.value = Number(count.value).toFixed(3);
		count_mass.value = Number(count_mass.value).toFixed(3);
	}
	fraction_01_calculation();
	fraction_02_calculation();
	fraction_00_calculation();
}
function calculation_count_mass(){
	//Установка массы для 1000 зерен номеклатурного продукта
	product_coeficient = сlassification_product_name[compositionInput_NameProduct.value].M;
	//Обнуление массива со значение массы для  1000 зерен для вариантов засорителя и других типов продукта
	weed_coeficient = []; 
	
	//Часто частиц и масса для основного
	count_main.value = count_mass_main.value * capacityInputValue_temp.value;
	mass_main.value = (count_main.value / 1000 * product_coeficient) / 1000;
	percent_main.value = mass_main.value / (capacityInputValue_temp.value / 100);
	
	count_main.value = Number(count_main.value).toFixed(3);
	mass_main.value = Number(mass_main.value).toFixed(3);
	percent_main.value = Number(percent_main.value).toFixed(3);
	
	inputSlaider_main.value = Number(percent_main.value);	
	
	//Число частиц и масса для дополнительного(прочее)
	count_other.value = count_mass_other.value * capacityInputValue_temp.value;
	mass_other.value = (count_other.value / 1000 * product_coeficient) / 1000;
	percent_other.value = mass_other.value / (capacityInputValue_temp.value / 100);
	
	count_other.value = Number(count_other.value).toFixed(3);
	mass_other.value = Number(mass_other.value).toFixed(3);
	percent_other.value = Number(percent_other.value).toFixed(3);
	
	inputSlaider_other.value = Number(percent_other.value);
	
	//Число частиц и масса для засорителе()
	for(var id=1; id <=row; id++){
		var weed_name_value = Number(document.getElementById("itemBlock_" + id).children[1].children[0].children[1].value);
		var weed_description_value = (document.getElementById("itemBlock_" + id).children[1].children[0].children[2].value);
		var weed_inputSlide = document.getElementById("itemBlock_" + id).children[1].children[1].children[0];
		
		if(weed_name_value < сlassification_weed_name.length)
		{
			var id_value = weed_name_value;
			weed_coeficient[id] = сlassification_weed_name[id_value].M
		}
		else
		{
			var id_value = weed_name_value - сlassification_weed_name.length;
			weed_coeficient[id] = сlassification_product_name[id_value].M * сlassification_product_description[id_value].percent_M;
		}
		
		
		var percent = document.getElementById("itemBlock_" + id).children[1].children[0].children[3];
		var mass = document.getElementById("itemBlock_" + id).children[1].children[0].children[6];
		var count = document.getElementById("itemBlock_" + id).children[1].children[0].children[4];
		var count_mass = document.getElementById("itemBlock_" + id).children[1].children[0].children[5];
		
		count.value = count_mass.value * capacityInputValue_temp.value;
		mass.value = (count.value / 1000 * weed_coeficient[id]) / 1000;
		percent.value = mass.value / (capacityInputValue_temp.value / 100);
		
		count.value = Number(count.value).toFixed(3);
		mass.value = Number(mass.value).toFixed(3);
		percent.value = Number(percent.value).toFixed(3);
		
		weed_inputSlide.value = Number(percent.value);
	}
}
function calculation_mass(){
	percent_main.value = mass_main.value / capacityInputValue_temp.value * 100;
	percent_main.value = Number(percent_main.value).toFixed(3);
	inputSlaider_main.value = Number(percent_main.value);	
	
	percent_other.value = mass_other.value / capacityInputValue_temp.value * 100;
	percent_other.value = Number(percent_other.value).toFixed(3);
	inputSlaider_other.value = Number(percent_other.value);
	
	//Число частиц и масса для засорителе()
	for(var id=1; id <=row; id++){
		var weed_inputSlide = document.getElementById("itemBlock_" + id).children[1].children[1].children[0];
		
		var percent = document.getElementById("itemBlock_" + id).children[1].children[0].children[3];
		var mass = document.getElementById("itemBlock_" + id).children[1].children[0].children[6];
		
		percent.value = mass.value / capacityInputValue_temp.value * 100;
		percent.value = Number(percent.value).toFixed(3);
		weed_inputSlide.value = Number(percent.value);
	}
}

function calculation_main(){
	var weed = sum_weed();	
	percent_other.value = 100.00 - Number(percent_main.value) - weed;
	percent_other.value = Number(percent_other.value).toFixed(3);
	inputSlaider_other.value = percent_other.value;
		
	percent_main.value = 100.00 - Number(percent_other.value) - weed;
	percent_main.value = Number(percent_main.value).toFixed(3);
	inputSlaider_main.value = percent_main.value;
	
	calculation_check_sum();
	mass_and_count();
}
function calculation_other(){
	var weed = sum_weed();		
	percent_main.value = 100 - Number(percent_other.value) - weed;
	percent_main.value = Number(percent_main.value).toFixed(3);
	inputSlaider_main.value = percent_main.value;
		
	percent_other.value = 100 - Number(percent_main.value) - weed;
	percent_other.value = Number(percent_other.value).toFixed(3);
	inputSlaider_other.value = percent_other.value;
	
	calculation_check_sum();
	mass_and_count();
}
function calculation_weed(){
	var weed = sum_weed();
	
	percent_other.value = 100 - Number(percent_main.value) - weed;
	percent_other.value = Number(percent_other.value).toFixed(3);
	inputSlaider_other.value = percent_other.value;
	
	calculation_check_sum();
	mass_and_count();
}
function calculation_check_sum(){
	var weed = sum_weed();
	if (percent_other.value < 0){
		percent_main.value = Number(percent_main.value) + Number(percent_other.value);
		percent_main.value = Number(percent_main.value).toFixed(3);
		inputSlaider_main.value = Number(percent_main.value);
		percent_other.value = 0.00;
	}
	if (percent_main.value < 0){
		percent_other.value = Number(percent_other.value) + Number(percent_main.value);
		percent_other.value = Number(percent_other.value).toFixed(3);
		inputSlaider_other.value = Number(percent_other.value);
		percent_main.value = 0.00;
	}
	if (weed >= 100){
		var sum = 0;
		for (var id=1;id<=row - 1; id++){
			var precent_weed_value = document.getElementById("itemBlock_" + id).children[1].children[1].children[0].value;
			sum += Number(precent_weed_value);
		}
		
		document.getElementById("itemBlock_" + row).children[1].children[1].children[0].max = 100 - sum;
		document.getElementById("itemBlock_" + row).children[1].children[0].children[4].value = document.getElementById("itemBlock_" + row).children[1].children[1].children[0].value;
		
		percent_other.value = 0.00;
		inputSlaider_other.value = 0.00;
		percent_main.value = 0.00;
	}
}
function sum_weed(){
	var sum = 0;
	
	for (var id=1;id<=row;id++){
		var precent_weed_value = document.getElementById("itemBlock_" + id).children[1].children[1].children[0].value;
		document.getElementById("itemBlock_" + id).children[1].children[0].children[3].value = Number(precent_weed_value).toFixed(3);
		sum += Number(precent_weed_value);
	}
	
	return sum;
}
//Функции для фракций
function fraction_01_calculation(){
	var sum_main_00 = fraction_00_sum_main();
	var sum_other_00 = fraction_00_sum_other();
	
	fraction_02_percent_main.value = 100 - fraction_01_percent_main.value - sum_main_00;
	fraction_02_percent_main.value = Number(fraction_02_percent_main.value).toFixed(3);
	fraction_02_main_slider.value = fraction_02_percent_main.value;
	
	fraction_02_percent_other.value = 100 - fraction_01_percent_other.value - sum_other_00;
	fraction_02_percent_other.value = Number(fraction_02_percent_other.value).toFixed(3);
	fraction_02_other_slider.value = fraction_02_percent_other.value;
	
	fraction_01_percent_main.value = 100 - fraction_02_percent_main.value - sum_main_00;
	fraction_01_percent_main.value = Number(fraction_01_percent_main.value).toFixed(3);
	fraction_01_main_slider.value = fraction_01_percent_main.value;
	
	fraction_01_percent_other.value = 100 - fraction_02_percent_other.value - sum_other_00;
	fraction_01_percent_other.value = Number(fraction_01_percent_other.value).toFixed(3);
	fraction_01_other_slider.value = fraction_01_percent_other.value;
	
	
	for(var id=1; id <= row;id++){
		var percent_fraction = document.getElementById("fraction_01_itemBlock_" + id).children[1].children[0].children[4];
		var sum_weed = fraction_00_sum_weed_id(id);
		
		document.getElementById("fraction_02_itemBlock_" + id).children[1].children[0].children[4].value = 100 - percent_fraction.value  - sum_weed;
		document.getElementById("fraction_02_itemBlock_" + id).children[1].children[0].children[4].value = Number(document.getElementById("fraction_02_itemBlock_" + id).children[1].children[0].children[4].value).toFixed(3);
		document.getElementById("fraction_02_itemBlock_" + id).children[1].children[1].children[0].value = document.getElementById("fraction_02_itemBlock_" + id).children[1].children[0].children[4].value;		
	}	
	
	check_fraction_sum();
	fraction_mass_count();
}
function fraction_02_calculation(){
	var sum_main_00 = fraction_00_sum_main();
	var sum_other_00 = fraction_00_sum_other();
	
	fraction_01_percent_main.value = 100 - fraction_02_percent_main.value - sum_main_00;
	fraction_01_percent_main.value = Number(fraction_01_percent_main.value).toFixed(3);
	fraction_01_main_slider.value = fraction_01_percent_main.value;
	
	fraction_01_percent_other.value = 100 - fraction_02_percent_other.value - sum_other_00;
	fraction_01_percent_other.value = Number(fraction_01_percent_other.value).toFixed(3);
	fraction_01_other_slider.value = fraction_01_percent_other.value;

	fraction_02_percent_main.value = 100 - fraction_01_percent_main.value - sum_main_00;
	fraction_02_percent_main.value = Number(fraction_02_percent_main.value).toFixed(3);
	fraction_02_main_slider.value = fraction_02_percent_main.value;
	
	fraction_02_percent_other.value = 100 - fraction_01_percent_other.value - sum_other_00;
	fraction_02_percent_other.value = Number(fraction_02_percent_other.value).toFixed(3);
	fraction_02_other_slider.value = fraction_02_percent_other.value;
	
	for(var id=1; id <= row;id++){
		var percent_fraction = document.getElementById("fraction_02_itemBlock_" + id).children[1].children[0].children[4];
		var sum_weed = fraction_00_sum_weed_id(id);	
		
		document.getElementById("fraction_01_itemBlock_" + id).children[1].children[0].children[4].value = 100 - percent_fraction.value - sum_weed;
		document.getElementById("fraction_01_itemBlock_" + id).children[1].children[0].children[4].value = Number(document.getElementById("fraction_01_itemBlock_" + id).children[1].children[0].children[4].value).toFixed(3);
		document.getElementById("fraction_01_itemBlock_" + id).children[1].children[1].children[0].value = document.getElementById("fraction_01_itemBlock_" + id).children[1].children[0].children[4].value;
	}	

	check_fraction_sum();
	fraction_mass_count();
}
function fraction_00_calculation(){
	var sum_main_00 = fraction_00_sum_main();
	var sum_other_00 = fraction_00_sum_other();
	
	fraction_02_percent_main.value = 100 - fraction_01_percent_main.value - sum_main_00;
	fraction_02_percent_main.value = Number(fraction_02_percent_main.value).toFixed(3);
	fraction_02_main_slider.value = fraction_02_percent_main.value;
	
	fraction_02_percent_other.value = 100 - fraction_01_percent_other.value - sum_other_00;
	fraction_02_percent_other.value = Number(fraction_02_percent_other.value).toFixed(3);
	fraction_02_other_slider.value = fraction_02_percent_other.value;
	
	for(var id=1; id <= row;id++){
		var percent_fraction = document.getElementById("fraction_01_itemBlock_" + id).children[1].children[0].children[4];
		var sum_weed = fraction_00_sum_weed_id(id);
		
		document.getElementById("fraction_02_itemBlock_" + id).children[1].children[0].children[4].value = 100 - percent_fraction.value  - sum_weed;
		document.getElementById("fraction_02_itemBlock_" + id).children[1].children[0].children[4].value = Number(document.getElementById("fraction_02_itemBlock_" + id).children[1].children[0].children[4].value).toFixed(3);
		document.getElementById("fraction_02_itemBlock_" + id).children[1].children[1].children[0].value = document.getElementById("fraction_02_itemBlock_" + id).children[1].children[0].children[4].value;		
	}	
	
	check_fraction_sum();
	fraction_mass_count();
}
//Подсчет общей массы для выбранной фракции
function fraction_id_mass(fraction_id){
	var sum = 0;
	
	if(fraction_id<10)
	{
		var fraction_main_mass = document.getElementById("fraction_0"+fraction_id+"_mainProduct").children[1].children[0].children[7].value;
		var fraction_other_mass = document.getElementById("fraction_0"+fraction_id+"_otherBlock").children[1].children[0].children[7].value;
	}
	else
	{
		var fraction_main_mass = document.getElementById("fraction_"+fraction_id+"_mainProduct").children[1].children[0].children[7].value;
		var fraction_other_mass = document.getElementById("fraction_"+fraction_id+"_otherBlock").children[1].children[0].children[7].value;
	}
	sum += Number(fraction_main_mass);
	sum += Number(fraction_other_mass);
	
	for(var id=1; id<=row; id++){
		if (fraction_id<10)
			var fraction_weed_mass = document.getElementById("fraction_0"+fraction_id+"_itemBlock_"+id).children[1].children[0].children[7].value;
		else
			var fraction_weed_mass = document.getElementById("fraction_"+fraction_id+"_itemBlock_"+id).children[1].children[0].children[7].value;
		sum += Number(fraction_weed_mass);
	}
	
	return Number(sum).toFixed(3);
}
//Промежуточные функции для расчетов внутри фракций
function fraction_00_sum_main(){
	var sum = 0;
	
	for(var i=3;i<=fraction;i++){
		if (i<10)
			var precent_main_fraction = document.getElementById("fraction_0"+i+"_mainProduct").children[1].children[1].children[0].value;
		else
			var precent_main_fraction = document.getElementById("fraction_"+i+"_mainProduct").children[1].children[1].children[0].value;
		sum += Number(precent_main_fraction);
	}
	
	return sum;
}
function fraction_00_sum_other(){
	var sum = 0;
	
	for(var i=3;i<=fraction;i++){
		if (i<10)
			var precent_other_fraction = document.getElementById("fraction_0"+i+"_otherBlock").children[1].children[1].children[0].value;
		else
			var precent_other_fraction = document.getElementById("fraction_"+i+"_otherBlock").children[1].children[1].children[0].value;
		sum += Number(precent_other_fraction);
	}
	
	return sum;
}
function fraction_00_sum_weed_id(id){
	var sum = 0;
	
	for(var i=3;i<=fraction;i++){
		if (i<10)
			var precent_weed_fraction_id = document.getElementById("fraction_0"+i+"_itemBlock_"+id).children[1].children[1].children[0].value;
		else
			var precent_weed_fraction_id = document.getElementById("fraction_"+i+"_itemBlock_"+id).children[1].children[1].children[0].value;
		sum += Number(precent_weed_fraction_id);
	}
	
	return sum;
}
function check_fraction_sum(){
	var sum_main_00 = fraction_00_sum_main();
	var sum_other_00 = fraction_00_sum_other();
	//Расчет для значения смесей Основного поля(самый верхний пункт у фракций)
	if(fraction_02_percent_main.value < 0){
		fraction_01_percent_main.value = Number(fraction_01_percent_main.value) + Number(fraction_02_percent_main.value);
		fraction_01_percent_main.value = Number(fraction_01_percent_main.value).toFixed(3);
		fraction_01_main_slider.value = Number(fraction_01_percent_main.value);
		fraction_02_percent_main.value = 0.00;
	}
	if(fraction_01_percent_main.value < 0){
		fraction_02_percent_main.value = Number(fraction_02_percent_main.value) + Number(fraction_01_percent_main.value);
		fraction_02_percent_main.value = Number(fraction_02_percent_main.value).toFixed(3);
		fraction_02_main_slider.value = Number(fraction_02_percent_main.value);
		fraction_01_percent_main.value = 0.00;
	}
	if(sum_main_00 >= 100){
		var sum = 0;
		for(var i=3;i<=fraction-1;i++){
			if (i<10)
				var precent_main_fraction = document.getElementById("fraction_0"+i+"_mainProduct").children[1].children[1].children[0].value;
			else
				var precent_main_fraction = document.getElementById("fraction_"+i+"_mainProduct").children[1].children[1].children[0].value;
			sum += Number(precent_main_fraction);
		}
		if (fraction<10)
		{
			document.getElementById("fraction_0"+fraction+"_mainProduct").children[1].children[0].children[4].value = 100 - sum;
			document.getElementById("fraction_0"+fraction+"_mainProduct").children[1].children[0].children[4].value = Number(document.getElementById("fraction_0"+fraction+"_mainProduct").children[1].children[0].children[4].value).toFixed(3);
			document.getElementById("fraction_0"+fraction+"_mainProduct").children[1].children[1].children[0].value = document.getElementById("fraction_0"+fraction+"_mainProduct").children[1].children[0].children[4].value;
		}
		else
		{
			document.getElementById("fraction_"+fraction+"_mainProduct").children[1].children[0].children[4].value = 100 - sum;
			document.getElementById("fraction_"+fraction+"_mainProduct").children[1].children[0].children[4].value = Number(document.getElementById("fraction_"+fraction+"_mainProduct").children[1].children[0].children[4].value).toFixed(3);
			document.getElementById("fraction_"+fraction+"_mainProduct").children[1].children[1].children[0].value = document.getElementById("fraction_"+fraction+"_mainProduct").children[1].children[0].children[4].value;
		}
		
		fraction_02_percent_main.value = 0.00;
		fraction_02_main_slider.value = 0.00;
		fraction_01_percent_main.value = 0.00;
	}
	//Расчет для значения смесей Другое(самый последний пункт у фракций)
	if(fraction_02_percent_other.value < 0){
		fraction_01_percent_other.value = Number(fraction_01_percent_other.value) + Number(fraction_02_percent_other.value);
		fraction_01_percent_other.value = Number(fraction_01_percent_other.value).toFixed(3);
		fraction_01_other_slider.value = Number(fraction_01_percent_other.value);
		fraction_02_percent_other.value = 0.00;
	}
	if(fraction_01_percent_other.value < 0){
		fraction_02_percent_other.value = Number(fraction_02_percent_other.value) + Number(fraction_01_percent_other.value);
		fraction_02_percent_other.value = Number(fraction_02_percent_other.value).toFixed(3);
		fraction_02_other_slider.value = Number(fraction_02_percent_other.value);
		fraction_01_percent_other.value = 0.00;
	}
	if(sum_other_00 >= 100){
		var sum = 0;
		for(var i=3;i<=fraction-1;i++){
			if (i<10)
				var precent_other_fraction = document.getElementById("fraction_0"+i+"_otherBlock").children[1].children[1].children[0].value;
			else
				var precent_other_fraction = document.getElementById("fraction_"+i+"_otherBlock").children[1].children[1].children[0].value;
			sum += Number(precent_other_fraction);
		}
		if (fraction<10)
		{
			document.getElementById("fraction_0"+fraction+"_otherBlock").children[1].children[0].children[4].value = 100 - sum;
			document.getElementById("fraction_0"+fraction+"_otherBlock").children[1].children[0].children[4].value = Number(document.getElementById("fraction_0"+fraction+"_otherBlock").children[1].children[0].children[4].value).toFixed(3);
			document.getElementById("fraction_0"+fraction+"_otherBlock").children[1].children[1].children[0].value = document.getElementById("fraction_0"+fraction+"_otherBlock").children[1].children[0].children[4].value;
		}
		else
		{
			document.getElementById("fraction_"+fraction+"_otherBlock").children[1].children[0].children[4].value = 100 - sum;
			document.getElementById("fraction_"+fraction+"_otherBlock").children[1].children[0].children[4].value = Number(document.getElementById("fraction_"+fraction+"_otherBlock").children[1].children[0].children[4].value).toFixed(3);
			document.getElementById("fraction_"+fraction+"_otherBlock").children[1].children[1].children[0].value = document.getElementById("fraction_"+fraction+"_otherBlock").children[1].children[0].children[4].value;
		}
		
		fraction_02_percent_other.value = 0.00;
		fraction_02_other_slider.value = 0.00;
		fraction_01_percent_other.value = 0.00;
	}
	//Расчет для смесей Засорителей(пункты между первым и последним)
	for(var id=1; id <=row; id++){
		var element_01_percent = document.getElementById("fraction_01_itemBlock_" + id).children[1].children[0].children[4];
		var element_01_slider = document.getElementById("fraction_01_itemBlock_" + id).children[1].children[1].children[0];
		var element_02_percent = document.getElementById("fraction_02_itemBlock_" + id).children[1].children[0].children[4];
		var element_02_slider = document.getElementById("fraction_02_itemBlock_" + id).children[1].children[1].children[0];
				
		if(element_02_percent.value < 0){
			element_01_percent.value = Number(element_01_percent.value) + Number(element_02_percent.value);
			element_01_percent.value = Number(element_01_percent.value).toFixed(3);
			element_01_slider.value = Number(element_01_percent.value);
			element_02_percent.value = 0.00;
		}
		if(element_01_percent.value < 0){
			element_02_percent.value = Number(element_02_percent.value) + Number(element_01_percent.value);
			element_02_percent.value = Number(element_02_percent.value).toFixed(3);
			element_02_slider.value = Number(element_02_percent.value);
			element_01_percent.value = 0.00;
		}
		
		var sum_weed = fraction_00_sum_weed_id(id);
		if (sum_weed >= 100){
			var sum = 0;
			for(var i=3;i<=fraction-1;i++){
				if (i<10)
					var precent_weed_fraction_id = document.getElementById("fraction_0"+i+"_itemBlock_"+id).children[1].children[1].children[0].value;
				else
					var precent_weed_fraction_id = document.getElementById("fraction_"+i+"_itemBlock_"+id).children[1].children[1].children[0].value;
				sum += Number(precent_weed_fraction_id);
			}
			if (fraction<10)
			{
				document.getElementById("fraction_0"+fraction+"_itemBlock_"+id).children[1].children[0].children[4].value = 100 - sum;
				document.getElementById("fraction_0"+fraction+"_itemBlock_"+id).children[1].children[0].children[4].value = Number(document.getElementById("fraction_0"+fraction+"_itemBlock_"+id).children[1].children[0].children[4].value).toFixed(3);
				document.getElementById("fraction_0"+fraction+"_itemBlock_"+id).children[1].children[1].children[0].value = document.getElementById("fraction_0"+fraction+"_itemBlock_"+id).children[1].children[0].children[4].value;
			}
			else
			{
				document.getElementById("fraction_"+fraction+"_itemBlock_"+id).children[1].children[0].children[4].value = 100 - sum;
				document.getElementById("fraction_"+fraction+"_itemBlock_"+id).children[1].children[0].children[4].value = Number(document.getElementById("fraction_"+fraction+"_itemBlock_"+id).children[1].children[0].children[4].value).toFixed(3);
				document.getElementById("fraction_"+fraction+"_itemBlock_"+id).children[1].children[1].children[0].value = document.getElementById("fraction_"+fraction+"_itemBlock_"+id).children[1].children[0].children[4].value;
			}
			
			element_02_percent.value = 0.00;
			element_02_slider.value = 0.00;
			element_01_percent.value = 0.00;
		}
	}
}
//Расчет количества элементов для продукции внутри фракций(куч).
function fraction_mass_count(){
	//Количество и масса для Основного поля(самый верхний пункт у фракций)
	fraction_01_mass_main.value = mass_main.value / 100 * fraction_01_percent_main.value;
	fraction_01_count_main.value = (fraction_01_mass_main.value * 1000) / product_coeficient * 1000;
	fraction_01_mass_main.value = Number(fraction_01_mass_main.value).toFixed(3);		
	fraction_01_count_main.value = Number(fraction_01_count_main.value).toFixed(3);
	
	fraction_01_mass_other.value = mass_other.value / 100 * fraction_01_percent_other.value;
	fraction_01_count_other.value = (fraction_01_mass_other.value * 1000) / product_coeficient * 1000;
	fraction_01_mass_other.value = Number(fraction_01_mass_other.value).toFixed(3);
	fraction_01_count_other.value = Number(fraction_01_count_other.value).toFixed(3);

	for(var id=1; id <= row;id++){
		var mass_weed = document.getElementById("itemBlock_" + id).children[1].children[0].children[6];

		var percent_fraction = document.getElementById("fraction_01_itemBlock_" + id).children[1].children[0].children[4];
		var mass_fraction = document.getElementById("fraction_01_itemBlock_" + id).children[1].children[0].children[7];
		var count_fraction = document.getElementById("fraction_01_itemBlock_" + id).children[1].children[0].children[5];
				
		mass_fraction.value = mass_weed.value / 100 * percent_fraction.value;
		count_fraction.value = (mass_fraction.value * 1000) / weed_coeficient[id] * 1000;

		mass_fraction.value = Number(mass_fraction.value).toFixed(3);
		count_fraction.value = Number(count_fraction.value).toFixed(3);
	}
	
	//Технические характеристики 01
	fraction_id_tech_input(1);

	//Количество и масса для Другое(самый последний пункт у фракций)
	fraction_02_mass_main.value = mass_main.value / 100 * fraction_02_percent_main.value;
	fraction_02_count_main.value = (fraction_02_mass_main.value * 1000) / product_coeficient * 1000;
	fraction_02_mass_main.value = Number(fraction_02_mass_main.value).toFixed(3);		
	fraction_02_count_main.value = Number(fraction_02_count_main.value).toFixed(3);
	
	fraction_02_mass_other.value = mass_other.value / 100 * fraction_02_percent_other.value;
	fraction_02_count_other.value = (fraction_02_mass_other.value * 1000) / product_coeficient * 1000;
	fraction_02_mass_other.value = Number(fraction_02_mass_other.value).toFixed(3);
	fraction_02_count_other.value = Number(fraction_02_count_other.value).toFixed(3);
	
	for(var id=1; id <= row;id++){
		var mass_weed = document.getElementById("itemBlock_" + id).children[1].children[0].children[6];

		var percent_fraction = document.getElementById("fraction_02_itemBlock_" + id).children[1].children[0].children[4];
		var mass_fraction = document.getElementById("fraction_02_itemBlock_" + id).children[1].children[0].children[7];
		var count_fraction = document.getElementById("fraction_02_itemBlock_" + id).children[1].children[0].children[5];
		var count_mass_fraction = document.getElementById("fraction_02_itemBlock_" + id).children[1].children[0].children[6];
		
		mass_fraction.value = mass_weed.value / 100 * percent_fraction.value;
		count_fraction.value = (mass_fraction.value * 1000) /  weed_coeficient[id] * 1000;
		
		mass_fraction.value = Number(mass_fraction.value).toFixed(3);
		count_fraction.value = Number(count_fraction.value).toFixed(3);
	}

	//Технические характеристики 02
	fraction_id_tech_input(2);
	
	//Количество и масса для Дополнительных(пункты между первым и последним)
	for(var i=3;i<=fraction;i++){
		if (i<10)
		{
			var fraction_id_main_percent = document.getElementById("fraction_0"+i+"_mainProduct").children[1].children[0].children[4];
			var fraction_id_main_mass = document.getElementById("fraction_0"+i+"_mainProduct").children[1].children[0].children[7];
			var fraction_id_main_count = document.getElementById("fraction_0"+i+"_mainProduct").children[1].children[0].children[5];
			var fraction_id_main_count_mass = document.getElementById("fraction_0"+i+"_mainProduct").children[1].children[0].children[6];
			
			var fraction_id_other_percent = document.getElementById("fraction_0"+i+"_otherBlock").children[1].children[0].children[4];
			var fraction_id_other_mass = document.getElementById("fraction_0"+i+"_otherBlock").children[1].children[0].children[7];
			var fraction_id_other_count = document.getElementById("fraction_0"+i+"_otherBlock").children[1].children[0].children[5];
			var fraction_id_other_count_mass = document.getElementById("fraction_0"+i+"_otherBlock").children[1].children[0].children[6];
		}
		else
		{
			var fraction_id_main_percent = document.getElementById("fraction_"+i+"_mainProduct").children[1].children[0].children[4];
			var fraction_id_main_mass = document.getElementById("fraction_"+i+"_mainProduct").children[1].children[0].children[7];
			var fraction_id_main_count = document.getElementById("fraction_"+i+"_mainProduct").children[1].children[0].children[5];
			var fraction_id_main_count_mass = document.getElementById("fraction_"+i+"_mainProduct").children[1].children[0].children[6];
			
			var fraction_id_other_percent = document.getElementById("fraction_"+i+"_otherBlock").children[1].children[0].children[4];
			var fraction_id_other_mass = document.getElementById("fraction_"+i+"_otherBlock").children[1].children[0].children[7];
			var fraction_id_other_count = document.getElementById("fraction_"+i+"_otherBlock").children[1].children[0].children[5];
			var fraction_id_other_count_mass = document.getElementById("fraction_"+i+"_otherBlock").children[1].children[0].children[6];
		}
		
		fraction_id_main_mass.value = mass_main.value / 100 * fraction_id_main_percent.value;
		fraction_id_main_count.value = (fraction_id_main_mass.value * 1000) / product_coeficient * 1000;
			
		fraction_id_main_mass.value = Number(fraction_id_main_mass.value).toFixed(3);
		fraction_id_main_count.value = Number(fraction_id_main_count.value).toFixed(3);
		fraction_id_main_count_mass.value = Number(fraction_id_main_count_mass.value).toFixed(3);
		
		fraction_id_other_mass.value = mass_other.value / 100 * fraction_id_other_percent.value;
		fraction_id_other_count.value = (fraction_id_other_mass.value * 1000) / product_coeficient * 1000;
		
		fraction_id_other_mass.value = Number(fraction_id_other_mass.value).toFixed(3);
		fraction_id_other_count.value = Number(fraction_id_other_count.value).toFixed(3);
		fraction_id_other_count_mass.value = Number(fraction_id_other_count_mass.value).toFixed(3);
		
		for(var id=1; id <= row;id++){
			var mass_weed = document.getElementById("itemBlock_" + id).children[1].children[0].children[6];
			
			if (i<10)
			{
				var fraction_id_weed_percent = document.getElementById("fraction_0"+i+"_itemBlock_" + id).children[1].children[0].children[4];
				var fraction_id_weed_mass = document.getElementById("fraction_0"+i+"_itemBlock_" + id).children[1].children[0].children[7];
				var fraction_id_weed_count = document.getElementById("fraction_0"+i+"_itemBlock_" + id).children[1].children[0].children[5];
				var fraction_id_weed_count_mass = document.getElementById("fraction_0"+i+"_itemBlock_" + id).children[1].children[0].children[6];
			}
			else
			{
				var fraction_id_weed_percent = document.getElementById("fraction_"+i+"_itemBlock_" + id).children[1].children[0].children[4];
				var fraction_id_weed_mass = document.getElementById("fraction_"+i+"_itemBlock_" + id).children[1].children[0].children[7];
				var fraction_id_weed_count = document.getElementById("fraction_"+i+"_itemBlock_" + id).children[1].children[0].children[5];				
				var fraction_id_weed_count_mass = document.getElementById("fraction_"+i+"_itemBlock_" + id).children[1].children[0].children[6];				
			}
			
			fraction_id_weed_mass.value = mass_weed.value / 100 * fraction_id_weed_percent.value;
			fraction_id_weed_count.value = (fraction_id_weed_mass.value * 1000) / weed_coeficient[id] * 1000;
			
			fraction_id_weed_mass.value = Number(fraction_id_weed_mass.value).toFixed(3);
			fraction_id_weed_count.value = Number(fraction_id_weed_count.value).toFixed(3);
			fraction_id_weed_count_mass.value = Number(fraction_id_weed_count_mass.value).toFixed(3);
		}
		
		//Технические характеристики (00)
		fraction_id_tech_input(i);
	}

}
function calculation_fraction_block_1(fraction_id, block){
	if (fraction_id < 10)
	{
		var mass = document.getElementById("fraction_0"+fraction_id+"_" + block).children[1].children[0].children[7];
		var count_mass = document.getElementById("fraction_0"+fraction_id+"_" + block).children[1].children[0].children[6];
		var percent = document.getElementById("fraction_0"+fraction_id+"_" + block).children[1].children[0].children[4];		
		var inFraction_percent = document.getElementById("fraction_0"+fraction_id+"_" + block).children[1].children[0].children[3];
		var slider = document.getElementById("fraction_0"+fraction_id+"_" + block).children[1].children[1].children[0];
	}
	else
	{
		var mass = document.getElementById("fraction_"+fraction_id+"_" + block).children[1].children[0].children[7];
		var count_mass = document.getElementById("fraction_"+fraction_id+"_" + block).children[1].children[0].children[6];
		var percent = document.getElementById("fraction_"+fraction_id+"_" + block).children[1].children[0].children[4];		
		var inFraction_percent = document.getElementById("fraction_"+fraction_id+"_" + block).children[1].children[0].children[3];
		var slider = document.getElementById("fraction_"+fraction_id+"_" + block).children[1].children[1].children[0];
	}
	if(block == "mainProduct" || block == "otherBlock")
		var coeficient = product_coeficient;
	else
	{
		var id_number = Number(block.substring(10));
		var coeficient = weed_coeficient[id_number];
	}
	var parent_mass = document.getElementById(block).children[1].children[0].children[6];
	
	calculation_fraction_count_mass(fraction_id, mass, count_mass, coeficient, percent, inFraction_percent, slider, parent_mass);
}
function calculation_fraction_block_2(fraction_id, block){
	if (fraction_id < 10)
	{
		var mass = document.getElementById("fraction_0"+fraction_id+"_" + block).children[1].children[0].children[7];
		var percent = document.getElementById("fraction_0"+fraction_id+"_" + block).children[1].children[0].children[4];
		var slider = document.getElementById("fraction_0"+fraction_id+"_" + block).children[1].children[1].children[0];		
	}
	else
	{
		var mass = document.getElementById("fraction_"+fraction_id+"_" + block).children[1].children[0].children[7];
		var percent = document.getElementById("fraction_"+fraction_id+"_" + block).children[1].children[0].children[4];	
		var slider = document.getElementById("fraction_"+fraction_id+"_" + block).children[1].children[1].children[0];
	}

	var parent_mass = document.getElementById(block).children[1].children[0].children[6];
	
	percent.value = mass.value / parent_mass.value * 100;
	percent.valuer = Number(percent.value).toFixed(3);
	slider.value = percent.value;
}

function calculation_fraction_count_mass(fraction_id, mass, count_mass, coeficient, percent, inFraction_percent, slider, parent_mass){
	var temp_main_mass = count_mass.value * coeficient / 1000;
	var rest_main_mass = fraction_id_mass(fraction_id) - mass.value;
	temp_main_mass = temp_main_mass.toFixed(3);
	rest_main_mass = rest_main_mass.toFixed(3);
	
	inFraction_percent.value = 0.1 * temp_main_mass;
	inFraction_percent.value = Number(inFraction_percent.value).toFixed(3);
	
	var temp_fraction_mass = (rest_main_mass /(100 - inFraction_percent.value) * 100);
	
	if(isNaN(temp_fraction_mass) || temp_fraction_mass == 0)
		temp_fraction_mass = mass.value;
	
	mass.value = temp_fraction_mass / 100 * inFraction_percent.value;
	percent.value = mass.value / parent_mass.value  * 100;
	
	mass.value = Number(mass.value).toFixed(3);
	percent.value = Number(percent.value).toFixed(3);
	slider.value = percent.value;
}

function fraction_id_tech_input(fraction_id){	
	if (fraction_id < 10)
	{
		var fraction_TechBlock = document.getElementById("fraction_0"+fraction_id+"_TechBlock");
		var inFraction_percent_main = document.getElementById("fraction_0"+fraction_id+"_mainProduct").children[1].children[0].children[3];
		var fraction_main_mass = document.getElementById("fraction_0"+fraction_id+"_mainProduct").children[1].children[0].children[7];
		var fraction_main_count = document.getElementById("fraction_0"+fraction_id+"_mainProduct").children[1].children[0].children[5];
		var fraction_count_mass_main = document.getElementById("fraction_0"+fraction_id+"_mainProduct").children[1].children[0].children[6];
		var fraction_check_valid_main = document.getElementById("fraction_0"+fraction_id+"_mainProduct").children[3].children[0].children[0];
		
		var inFraction_percent_other = document.getElementById("fraction_0"+fraction_id+"_otherBlock").children[1].children[0].children[3];
		var fraction_other_mass = document.getElementById("fraction_0"+fraction_id+"_otherBlock").children[1].children[0].children[7];
		var fraction_other_count = document.getElementById("fraction_0"+fraction_id+"_otherBlock").children[1].children[0].children[5];
		var fraction_count_mass_other = document.getElementById("fraction_0"+fraction_id+"_otherBlock").children[1].children[0].children[6];
		var fraction_check_valid_other = document.getElementById("fraction_0"+fraction_id+"_otherBlock").children[3].children[0].children[0];
	}
	else
	{
		var fraction_TechBlock = document.getElementById("fraction_"+fraction_id+"_TechBlock");
		var inFraction_percent_main = document.getElementById("fraction_"+fraction_id+"_mainProduct").children[1].children[0].children[3];
		var fraction_main_mass = document.getElementById("fraction_"+fraction_id+"_mainProduct").children[1].children[0].children[7];
		var fraction_main_count = document.getElementById("fraction_"+fraction_id+"_mainProduct").children[1].children[0].children[5];
		var fraction_count_mass_main = document.getElementById("fraction_"+fraction_id+"_mainProduct").children[1].children[0].children[6];
		var fraction_check_valid_main = document.getElementById("fraction_"+fraction_id+"_mainProduct").children[3].children[0].children[0];
		
		var inFraction_percent_other = document.getElementById("fraction_"+fraction_id+"_otherBlock").children[1].children[0].children[3];
		var fraction_other_mass = document.getElementById("fraction_"+fraction_id+"_otherBlock").children[1].children[0].children[7];
		var fraction_other_count = document.getElementById("fraction_"+fraction_id+"_otherBlock").children[1].children[0].children[5];
		var fraction_count_mass_other = document.getElementById("fraction_"+fraction_id+"_otherBlock").children[1].children[0].children[6];
		var fraction_check_valid_other = document.getElementById("fraction_"+fraction_id+"_otherBlock").children[3].children[0].children[0];	
	}
	
	fraction_TechBlock.children[0].children[0].children[2].value = fraction_id_mass(fraction_id);
	fraction_TechBlock.children[0].children[0].children[0].value = fraction_TechBlock.children[0].children[0].children[2].value / capacityInputValue_temp.value * 100;
	fraction_TechBlock.children[0].children[0].children[0].value = Number(fraction_TechBlock.children[0].children[0].children[0].value).toFixed(3);
	
	inFraction_percent_main.value = fraction_main_mass.value / fraction_TechBlock.children[0].children[0].children[2].value * 100;
	fraction_count_mass_main.value = fraction_main_count.value / fraction_TechBlock.children[0].children[0].children[2].value;

	inFraction_percent_main.value = Number(inFraction_percent_main.value).toFixed(3);
	fraction_count_mass_main.value = Number(fraction_count_mass_main.value).toFixed(3);
	
	inFraction_percent_other.value = fraction_other_mass.value / fraction_TechBlock.children[0].children[0].children[2].value * 100;
	fraction_count_mass_other.value = fraction_other_count.value / fraction_TechBlock.children[0].children[0].children[2].value;
	
	inFraction_percent_other.value = Number(inFraction_percent_other.value).toFixed(3);
	fraction_count_mass_other.value = Number(fraction_count_mass_other.value).toFixed(3);
	
	//Подсчет чистоты фракции для основной подукта и пункта другое.
	var valid_sum = 0;
	valid_sum += fraction_check_valid_main.checked == true ? Number( inFraction_percent_main.value) : 0;
	valid_sum += fraction_check_valid_other.checked == true ? Number(inFraction_percent_other.value) : 0;
	
	for(var id=1; id <= row;id++){
		if(fraction_id <10)
		{
			var mass_fraction = document.getElementById("fraction_0"+fraction_id+"_itemBlock_" + id).children[1].children[0].children[7];
			var count_mass_fraction = document.getElementById("fraction_0"+fraction_id+"_itemBlock_" + id).children[1].children[0].children[6];
			var count_fraction = document.getElementById("fraction_0"+fraction_id+"_itemBlock_" + id).children[1].children[0].children[5];
			var ifFraction_percent = document.getElementById("fraction_0"+fraction_id+"_itemBlock_" + id).children[1].children[0].children[3];
			var check_valid_fraction = document.getElementById("fraction_0"+fraction_id+"_itemBlock_" + id).children[3].children[0].children[0];
		}
		else
		{
			var mass_fraction = document.getElementById("fraction_"+fraction_id+"_itemBlock_" + id).children[1].children[0].children[7];
			var count_mass_fraction = document.getElementById("fraction_"+fraction_id+"_itemBlock_" + id).children[1].children[0].children[6];
			var count_fraction = document.getElementById("fraction_"+fraction_id+"_itemBlock_" + id).children[1].children[0].children[5];
			var ifFraction_percent = document.getElementById("fraction_"+fraction_id+"_itemBlock_" + id).children[1].children[0].children[3];
			var check_valid_fraction = document.getElementById("fraction_"+fraction_id+"_itemBlock_" + id).children[3].children[0].children[0];
		}
		
		ifFraction_percent.value = mass_fraction.value / fraction_TechBlock.children[0].children[0].children[2].value * 100;
		count_mass_fraction.value = count_fraction.value / fraction_TechBlock.children[0].children[0].children[2].value;
		
		ifFraction_percent.value = Number(ifFraction_percent.value).toFixed(3);
		count_mass_fraction.value = Number(count_mass_fraction.value).toFixed(3);
		
		//Подсчет чистоты фракции для засорителей.
		valid_sum += check_valid_fraction.checked == true ? Number(ifFraction_percent.value) : 0;
	}
	
	fraction_TechBlock.children[0].children[0].children[1].value = Number(valid_sum).toFixed(3);
}
//Изменение наименований для компонетов фракций и исходного продукта.
function fractionCompanentName(){
	var mainProduct = compositionInput_NameProduct[compositionInput_NameProduct.value].textContent;
	selectNameMain.value = mainProduct;
	
	for(var i=1; i<=fraction; i++){
		if(i<10)
		{
			var element_main = document.getElementById("fraction_0"+i+"_mainProduct").children[1].children[0].children[1];
			var element_other = document.getElementById("fraction_0"+i+"_otherBlock").children[1].children[0].children[1];
		}
		else
		{
			var element_main = document.getElementById("fraction_"+i+"_mainProduct").children[1].children[0].children[1];
			var element_other = document.getElementById("fraction_"+i+"_otherBlock").children[1].children[0].children[1];
		}
		
		if (selectDescriptionMain.value == "-")
			element_main.value = selectNameMain.value;
		else
			element_main.value = selectNameMain.value +"("+ selectDescriptionMain.value +")";
		
		if (selectDescriptionOther.value == "-")
			element_other.value = selectNameOther.value;
		else
			element_other.value = selectNameOther.value +"("+ selectDescriptionOther.value +")";
		
		for(var id=1; id<=row; id++){
			if(i<10)
				var element_weed = document.getElementById("fraction_0"+i+"_itemBlock_" + id).children[1].children[0].children[1];
			else
				var element_weed = document.getElementById("fraction_"+i+"_itemBlock_" + id).children[1].children[0].children[1];
			
			var weed_NameProduct = document.getElementById("itemBlock_"+id).children[1].children[0].children[1];
			var weed_DescriptionProduct = document.getElementById("itemBlock_"+id).children[1].children[0].children[2];
			
			var NameProduct = weed_NameProduct[weed_NameProduct.value].textContent;
			var DescriptionProduct = weed_DescriptionProduct[weed_DescriptionProduct.value].textContent;
			
			if (NameProduct == "-" && DescriptionProduct == "-")
				element_weed.value = "NaN";
			else if (NameProduct == "-")
				element_weed.value = DescriptionProduct;
			else if (DescriptionProduct == "-")
				element_weed.value = NameProduct;
			else
				element_weed.value = NameProduct +"("+ DescriptionProduct +")";
		}
	}
	//Вызов функции смены цветов.
	fractionColorMark();
}
//Маркировка годного продукта (Разбить на три функции и оптимизировать)
function fraction_valid_mark(){
	for(var fraction_id=1; fraction_id<=fraction; fraction_id++){
		if(fraction_id<10)
		{
			var fraction_check_valid_main = document.getElementById("fraction_0"+fraction_id+"_mainProduct").children[3].children[0].children[0];
			var fraction_check_valid_other = document.getElementById("fraction_0"+fraction_id+"_otherBlock").children[3].children[0].children[0];
		}
		else
		{
			var fraction_check_valid_main = document.getElementById("fraction_"+fraction_id+"_mainProduct").children[3].children[0].children[0];
			var fraction_check_valid_other = document.getElementById("fraction_"+fraction_id+"_otherBlock").children[3].children[0].children[0];			
		}
		fraction_check_valid_main.checked = mainProduct.children[1].children[0].children[7].children[0].children[0].checked;
		fraction_check_valid_other.checked = otherBlock.children[1].children[0].children[7].children[0].children[0].checked;
		
		for(var id=1; id<=row;id++)
		{
			if(fraction_id < 10)
				var check_valid_fraction = document.getElementById("fraction_0"+fraction_id+"_itemBlock_" + id).children[3].children[0].children[0];
			else
				var check_valid_fraction = document.getElementById("fraction_"+fraction_id+"_itemBlock_" + id).children[3].children[0].children[0];
			
			check_valid_fraction.checked =  document.getElementById("itemBlock_"+id).children[1].children[0].children[7].children[0].children[0].checked;
		}
	}
	fraction_mass_count();
}

//Цветовое отображение элементов фракции
function fractionColorMark(){
	for(var i=1; i<=fraction; i++){
		var main_validProductCheck = mainProduct.children[1].children[0].children[7].children[0].children[0].checked;
		var other_validProductCheck = otherBlock.children[1].children[0].children[7].children[0].children[0].checked;
		
		if(i<10)
		{
			var element_main = document.getElementById("fraction_0"+i+"_mainProduct");
			var element_main_mark = document.getElementById("fraction_0"+i+"_mainProduct").children[2].children[0].children[0].checked;
			
			var element_other = document.getElementById("fraction_0"+i+"_otherBlock");
			var element_other_mark = document.getElementById("fraction_0"+i+"_otherBlock").children[2].children[0].children[0].checked;
			
		}
		else
		{
			var element_main = document.getElementById("fraction_"+i+"_mainProduct");
			var element_main_mark = document.getElementById("fraction_"+i+"_mainProduct").children[2].children[0].children[0].checked;
			
			var element_other = document.getElementById("fraction_"+i+"_otherBlock");
			var element_other_mark = document.getElementById("fraction_"+i+"_otherBlock").children[2].children[0].children[0].checked;		
		}
		
		//Комбинации для вариантов цветов для main и other
		if(main_validProductCheck && element_main_mark)
			element_main.style.backgroundColor = "#ffa500";
		else if(main_validProductCheck)
			element_main.style.backgroundColor = "#ffffff";
		else if(element_main_mark)
			element_main.style.backgroundColor = "#ffa500";		
		else
			element_main.style.backgroundColor = "#ffffff";		
		
		if(other_validProductCheck && element_other_mark)
			element_other.style.backgroundColor = "#ffffff";
		else if(other_validProductCheck)
			element_other.style.backgroundColor = "#ffffff";
		else if(element_other_mark)
			element_other.style.backgroundColor = "#ffa500";
		else
			element_other.style.backgroundColor = "#ffffff";
		
		for (id=1; id<=row;id++){
			var weed_validProductCheck = document.getElementById("itemBlock_"+id).children[1].children[0].children[7].children[0].children[0].checked;
			if(i<10)
			{
				var element_weed = document.getElementById("fraction_0"+i+"_itemBlock_" + id);
				var element_weed_mark = document.getElementById("fraction_0"+i+"_itemBlock_" + id).children[2].children[0].children[0].checked;
			}
			else
			{
				var element_weed = document.getElementById("fraction_"+i+"_itemBlock_" + id);
				var element_weed_mark = document.getElementById("fraction_"+i+"_itemBlock_" + id).children[2].children[0].children[0].checked;
			}
			
			//Комбинации для вариантов цветов для weed
			if(weed_validProductCheck && element_weed_mark)
				element_weed.style.backgroundColor = "#ffa500";
			else if(weed_validProductCheck)
				element_weed.style.backgroundColor = "#ffffff";
			else if(element_weed_mark)
				element_weed.style.backgroundColor = "#ffa500";		
			else
				element_weed.style.backgroundColor = "#ffffff";				
		}
	}
}
//Функция добавление и изменения картинок
function file_img_change(input,img){
	input.addEventListener("change", function(){
		var selectedFile = input.files[0];
		
		var reader = new FileReader();
		reader.onload = function() {
			img.src = this.result
		}
		reader.readAsDataURL(selectedFile);
		
	});
}
function addFileChange(){
	file_img_change(input_photo,img_photo);
	
	//Добавляем к основному продукту
	var main_img_photo = mainProduct.lastElementChild.firstElementChild;
	var main_input_photo = mainProduct.lastElementChild.lastElementChild;
	file_img_change(main_input_photo,main_img_photo);	
	
	//Добавляем к другому продукту
	var other_img_photo = otherBlock.lastElementChild.firstElementChild;
	var other_input_photo = otherBlock.lastElementChild.lastElementChild;
	file_img_change(other_input_photo,other_img_photo);	

	//Добавляем к фракции 01
	var fraction_01_img_photo = fraction_01_TechBlock.lastElementChild.firstElementChild;
	var fraction_01_input_photo = fraction_01_TechBlock.lastElementChild.lastElementChild;
	file_img_change(fraction_01_input_photo,fraction_01_img_photo);	
	//Добавляем к другому продукту
	var fraction_02_img_photo = fraction_02_TechBlock.lastElementChild.firstElementChild;
	var fraction_02_input_photo = fraction_02_TechBlock.lastElementChild.lastElementChild;
	file_img_change(fraction_02_input_photo,fraction_02_img_photo);
}
//Функция сохранения всех картинок на сервере
function server_img_save(){
	if(protocolID.value != "")
		var protocol_name = protocolID.value
	else
		var protocol_name = "test"
	
	upload_img_src = [];
	upload_count = 0;
	
	//загружаем фотографию исходного продукта
	upload_img(img_photo.src, protocol_name+"_source_product");
	upload_img_src.push("/static/img/save_img/"+protocol_name+"_source_product.png")
	
	//загрузка фотографий по фракциям
	for(var id = 1; id<=fraction; id++){
		if(id<10)
		{
			var img_src = document.getElementById("fraction_0"+id+"_TechBlock").children[1].children[0].src;
			var img_name = protocol_name+"_fraction_0"+id;
		}
		else
		{
			var img_src = document.getElementById("fraction_"+id+"_TechBlock").children[1].children[0].src;
			var img_name = protocol_name+"_fraction_"+id;
		}
		
		upload_img(img_src, img_name);
		upload_img_src.push("/static/img/save_img/"+img_name+".png")
	}
	
	//загрузка фотографий по продуктам
	var main_product_img_src = mainProduct.lastElementChild.firstElementChild.src;
	var main_product_img_name = protocol_name+"_main_product";
	upload_img(main_product_img_src, main_product_img_name);
	upload_img_src.push("/static/img/save_img/"+main_product_img_name+".png");
	
	for (var id = 1; id<=row; id++){
		var img_src = document.getElementById("itemBlock_"+id).lastElementChild.firstElementChild.src;
		var img_name = protocol_name+"_itemBlock_"+id+"_product";

		upload_img(img_src, img_name);
		upload_img_src.push("/static/img/save_img/"+img_name+".png");
	}
	
	var other_img_src = otherBlock.lastElementChild.firstElementChild.src;
	var other_img_name = protocol_name+"_other_product";
	upload_img(other_img_src, other_img_name);
	upload_img_src.push("/static/img/save_img/"+other_img_name+".png");
}

//Функция отображающая дополнительные параметры для АГРОТЕХНИКОВ!!!!
function viewAddOptions() {
	if(additional.style.display == "none")
	{
		additional.style.display = "block";
		additionalOptions.firstElementChild.style.transform = "rotateZ(-90deg)";
	}
	else
	{
		additional.style.display = "none";
		additionalOptions.firstElementChild.style.transform = "rotateZ(90deg)";
	}
}
function viewFraction(){
	if(fraction_page.style.display == "none")
	{
		fraction_page.style.display = "block";
		fraction_controls.style.display = "block";
	}
	else
	{
		fraction_page.style.display = "none";
		fraction_controls.style.display = "none";
	}
}
// Дабавленые Константином функции
function compactView(){

	if (compact.checked) {
		titleCategory.style.display = "none";
		selectCategoryMain.style.display = "none";
		selectCategoryOther.style.display = "none";
		titleClass.style.display = "none";
		selectClassMain.style.display = "none";
		selectClassOther.style.display = "none";
		titlePhoto.style.display = "none";
		inputSliderMainRow.style.display = "none";
		inputPhotoMain.style.display = "none";
		inputSliderOtherRow.style.display = "none";
		inputPhotoOther.style.display = "none";
		inputPhotoProduct.style.display = "none";
		
		for(var i = 0; i<=row; i++){
			if (row != 0)
			{
				selectCategoryWeed[i].style.display = "none";
				selectClassWeed[i].style.display = "none";
				inputSliderWeedRow[i].style.display = "none";
				inputPhotoWeed[i].style.display = "none";
				deleteRowButton[i].style.display = "none";
			}
			else
			{
				selectCategoryWeed.style.display = "none";
				selectClassWeed.style.display = "none";
				inputSliderWeedRow.style.display = "none";
				inputPhotoWeed.style.display = "none";
				deleteRowButton.style.display = "none";	
			}
		}
	}
	
	if (compact.checked==false) {
		titleCategory.style.display = "flex";
		selectCategoryMain.style.display = "flex";
		selectCategoryOther.style.display = "flex";
		titleClass.style.display = "flex";
		selectClassMain.style.display = "flex";
		selectClassOther.style.display = "flex";
		titlePhoto.style.display = "flex";
		inputSliderMainRow.style.display = "flex";
		inputPhotoMain.style.display = "block";
		inputSliderOtherRow.style.display = "flex";
		inputPhotoOther.style.display = "block";
		inputPhotoProduct.style.display = "block";
		
		for(var i = 0; i<=row; i++){
			if (row != 0)
			{
			selectCategoryWeed[i].style.display = "flex";
			selectClassWeed[i].style.display = "flex";
			inputSliderWeedRow[i].style.display = "flex";
			inputPhotoWeed[i].style.display = "block";
			deleteRowButton[i].style.display = "block";
			}
			else
			{
				selectCategoryWeed.style.display = "flex";
				selectClassWeed.style.display = "flex";
				inputSliderWeedRow.style.display = "flex";
				inputPhotoWeed.style.display = "block";
				deleteRowButton.style.display = "block";	
			}
		}
	}
}
//slider capasity
function ChangeSliderColorCapasity() {
	var sliderCapasity = document.getElementById("sliderCapacity");
	var inputCapacity = document.getElementById("inputCapacity");
	var sliderCapacityMin = document.getElementById("sliderCapacityMin");
	var sliderCapacityMax = document.getElementById("sliderCapacityMax");
	var sliderGradientPoint;
	
	sliderCapacityMax.value = Number(sliderCapacityMax.value).toFixed(2);
	sliderCapacityMin.value = Number(sliderCapacityMin.value).toFixed(2);
	
	sliderCapasity.max = sliderCapacityMax.value
	sliderCapasity.min = sliderCapacityMin.value
	
	sliderGradientPoint = (100/(sliderCapasity.max - sliderCapasity.min)) * (sliderCapasity.value - sliderCapasity.min);
	
	sliderCapasity.style = "background: linear-gradient(90deg, red, red "+sliderGradientPoint+"%, #5B677D "+sliderGradientPoint+"%, #5B677D)";
	
	inputCapacity.value = Number(sliderCapasity.value).toFixed(2);
}
			
function InputToSlider(){	
	var sliderCapasity = document.getElementById("sliderCapacity");
	var inputCapacity = document.getElementById("inputCapacity");
	var point = 0;
	var pageID = Number(sliderType.split('_')[1]);
	var Mass = 0;
	var eventChange = new Event('change');
	switch(sliderType){
		case 'Req':
			point = currentPage;
			Mass = pageRow[currentPage-1].requirementsTable.mainFractionData.mass;
			pageRow[currentPage-1].Sustatment.ColumnState = ["active", "lock", "unlock"];
			break;
		case 'Prot':
			point = ProtocolPage + '_P';
			Mass = pageProtocolRow[ProtocolPage-1].requirementsTable.mainFractionData.mass;
			pageProtocolRow[ProtocolPage-1].Sustatment.ColumnState  = ["active", "lock", "unlock"];
			break;
		default:
			point = pageID + '_S';	
			Mass = pageProtocolRow[ProtocolPage-1].pageSortRow[pageID-1].requirementsTable.mainFractionData.mass;
			pageProtocolRow[ProtocolPage-1].pageSortRow[pageID-1].Sustatment.ColumnState  = ["active", "lock", "unlock"];	
			break;
	}
	var outputStart = document.getElementById("outputStart_" + point);
	
	sliderCapasity.value = Number(inputCapacity.value).toFixed(2);
	outputStart.value = Number(inputCapacity.value).toFixed(3);
	
	outputStart.value = outputStart.value < 0 ? Number(Mass).toFixed(3) : Number(outputStart.value).toFixed(3);
	outputStart.dispatchEvent(eventChange);	
}

function ChangeSliderColorAcceptCapasity() {
	var sliderCapasity = document.getElementById("acceptSliderCapacity");
	var inputCapacity = document.getElementById("acceptInputCapacity");
	var sliderCapacityMin = document.getElementById("acceptSliderCapacityMin");
	var sliderCapacityMax = document.getElementById("acceptSliderCapacityMax");
	var sliderGradientPoint;
	
	sliderCapacityMax.value = Number(sliderCapacityMax.value).toFixed(2);
	sliderCapacityMin.value = Number(sliderCapacityMin.value).toFixed(2);
	
	sliderCapasity.max = sliderCapacityMax.value
	sliderCapasity.min = sliderCapacityMin.value
	switch(sliderType){
		case 'Req':
			sliderCapasity.value = Number(sliderCapasity.value) <= requirementsMaxExitClone("suitableFractionData", currentPage) ? Number(sliderCapasity.value).toFixed(2): requirementsMaxExitClone("suitableFractionData", currentPage);
			break;
		case 'Prot':
			sliderCapasity.value = Number(sliderCapasity.value) <= requirementsMaxExitProtocol("suitableFractionData", ProtocolPage) ? Number(sliderCapasity.value).toFixed(2): requirementsMaxExitProtocol("suitableFractionData", ProtocolPage);
			break;
		default:
			var pageID = Number(sliderType.split('_')[1]);
			sliderCapasity.value = Number(sliderCapasity.value) <= requirementsMaxExitSort("suitableFractionData", pageID) ? Number(sliderCapasity.value).toFixed(2): requirementsMaxExitSort("suitableFractionData", pageID);		
			break;
	}
	sliderGradientPoint = (100/(sliderCapasity.max - sliderCapasity.min)) * (sliderCapasity.value - sliderCapasity.min);
	sliderCapasity.style = "background: linear-gradient(90deg, red, red "+sliderGradientPoint+"%, #5B677D "+sliderGradientPoint+"%, #5B677D)";
	
	inputCapacity.value = Number(sliderCapasity.value);
}
			
function InputToAcceptSlider(){	
	var sliderCapasity = document.getElementById("acceptSliderCapacity");
	var inputCapacity = document.getElementById("acceptInputCapacity");
	var point = 0;
	var MaxExit = 0;
	var eventChange = new Event('change');
	
	switch(sliderType){
		case 'Req':
			point = currentPage;
			MaxExit = requirementsMaxExitClone("suitableFractionData", currentPage);
			pageRow[currentPage-1].Sustatment.ColumnState = ["lock", "active", "unlock"];
			break;
		case 'Prot':
			point = ProtocolPage + '_P';
			MaxExit = requirementsMaxExitProtocol("suitableFractionData", ProtocolPage);			
			pageProtocolRow[ProtocolPage-1].Sustatment.ColumnState = ["lock", "active", "unlock"];
			break;
		default:
			var pageID = Number(sliderType.split('_')[1]);
			point = pageID + '_S';
			MaxExit = requirementsMaxExitSort("suitableFractionData", pageID);			
			pageProtocolRow[ProtocolPage-1].pageSortRow[pageID-1].Sustatment.ColumnState = ["lock", "active", "unlock"];
			break;
	}
	var percentGood = document.getElementById("percentGood_" + point);
	
	
	sliderCapasity.value = Number(inputCapacity.value) <= MaxExit ? Number(inputCapacity.value).toFixed(2): MaxExit;
	percentGood.value = Number(inputCapacity.value).toFixed(2);
	percentGood.dispatchEvent(eventChange);	
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
			bottomBlock[i].children[1].children[1].textContent = "стр. " + pageNumber;
			pageNumber++;
			lastPage = i;
		}
	}
	pages[lastPage].style.height = "290mm";
}
function additionalPages(arrowElement, targetBlock) {
	var blocklElement = targetBlock;

	if (blocklElement.style.display != "flex" && blocklElement.style.display != "") {
		blocklElement.style.display = "flex";
		arrowElement.style.transform = "rotate(0deg)";
	}
	else {
		blocklElement.style.display = "none";
		arrowElement.style.transform = "rotate(180deg)";
	}
}
function addPageView(element){
	switch(element.value){
		case "СПЕЦИФИКАЦИЯ":
			element.style.backgroundColor = specificPage.style.display == "none" ? "#ffb23f" : "#f1f1f1";
			specificPage.style.display = specificPage.style.display == "none" ? "" : "none";
			break;
		case "СТАТИСТИКА":
			element.style.backgroundColor = statisticsPage.style.display == "none" ? "#ffb23f" : "#f1f1f1";
			statisticsPage.style.display = statisticsPage.style.display == "none" ? "" : "none";
			break;
		case "КОНКУРЕНТЫ":
			element.style.backgroundColor = competitorPage.style.display == "none" ? "#ffb23f" : "#f1f1f1";
			competitorPage.style.display = competitorPage.style.display == "none" ? "" : "none";
			break;
		case "РЕФЕРЕНТЫ":
			element.style.backgroundColor = referentPage.style.display == "none" ? "#ffb23f" : "#f1f1f1";
			referentPage.style.display = referentPage.style.display == "none" ? "" : "none";
	}
	autoPageNumber();
}

function HelpSlider(){
	var sliderHelp = document.getElementById("sliderHelp");
	
	if (sliderHelp.style.display=="flex"){
		sliderHelp.style.display = "none";
	}
	else{	
		sliderHelp.style.display = "flex";
		}	
}

function HelpMoreOptions(){
	var moreOptionsHelp = document.getElementById("moreOptionsHelp");
	
	if (moreOptionsHelp.style.display=="flex"){
		moreOptionsHelp.style.display = "none";
	}
	else{	
		moreOptionsHelp.style.display = "flex";
		}	
}

function HelpOptions(){
	var optionsHelp = document.getElementById("optionsHelp");
	
	if (optionsHelp.style.display=="flex"){
		optionsHelp.style.display = "none";
	}
	else{	
		optionsHelp.style.display = "flex";
		}	
}

function ShowMaxDescription(){
	var maxDescription = document.getElementById("maxDescription");
	var imageModel = document.getElementById("imageModel");
	var selected3d = document.getElementById("selected3d");
	
	if (maxDescription.style.display=="flex"){
		maxDescription.style.display = "none";
		imageModel.style.display = "flex";
		selected3d.style.display = "none";
	}
	else{	
		maxDescription.style.display = "flex";
		imageModel.style.display = "none";
		selected3d.style.display = "none";
		}	
}
function Show3dmodel(){
	var maxDescription = document.getElementById("maxDescription");
	var imageModel = document.getElementById("imageModel");
	var selected3d = document.getElementById("selected3d");
	
	if (selected3d.style.display=="flex"){
		maxDescription.style.display = "none";
		imageModel.style.display = "flex";
		selected3d.style.display = "none";
	}
	else{	
		maxDescription.style.display = "none";
		imageModel.style.display = "none";
		selected3d.style.display = "flex";
		}	
}

function ShowMore(){
	var moreOptions = document.getElementById("moreOptions");
	var mainOptions = document.getElementById("mainOptions");
	var Options = document.getElementById("Options");

	moreOptions.style.display = "flex";	
	mainOptions.style.display = "none";	
	Options.style.display = "none";	
	
	sliderHelp.style.display = "none";
	moreOptionsHelp.style.display = "none";
	optionsHelp.style.display = "none";
}
function ShowLess(){
	var moreOptions = document.getElementById("moreOptions");
	var mainOptions = document.getElementById("mainOptions");
	var Options = document.getElementById("Options");

	moreOptions.style.display = "none";	
	mainOptions.style.display = "flex";
	Options.style.display = "flex";	

	sliderHelp.style.display = "none";
	moreOptionsHelp.style.display = "none";
	optionsHelp.style.display = "none";	
}

function SelectOptimalModel(){
	var modelOptimal = document.getElementById("modelOptimal");
	var modelLeft = document.getElementById("modelLeft");
	var modelRight = document.getElementById("modelRight");

	modelOptimal.style.backgroundColor = "darkOrange"
	modelLeft.style.backgroundColor = "white"
	modelRight.style.backgroundColor = "white"
}

function SelectLeftModel(){
	var modelOptimal = document.getElementById("modelOptimal");
	var modelLeft = document.getElementById("modelLeft");
	var modelRight = document.getElementById("modelRight");

	modelOptimal.style.backgroundColor = "white"
	modelLeft.style.backgroundColor = "darkOrange"
	modelRight.style.backgroundColor = "white"
}

function SelectRightModel(){
	var modelOptimal = document.getElementById("modelOptimal");
	var modelLeft = document.getElementById("modelLeft");
	var modelRight = document.getElementById("modelRight");

	modelOptimal.style.backgroundColor = "white"
	modelLeft.style.backgroundColor = "white"
	modelRight.style.backgroundColor = "darkOrange"
}


function HideModel(){
	var moreOptions = document.getElementById("moreOptions");
	var mainOptions = document.getElementById("mainOptions");
	var Options = document.getElementById("Options");
	var Options = document.getElementById("Options");
	var resultImage = document.getElementById("resultImage");
	var typeBlock = document.getElementById("typeBlock");
		
	resultImage.style.display = "none";	
	moreOptions.style.display = "none";	
	mainOptions.style.display = "flex";
	Options.style.display = "flex";
	typeBlock.style.display = "flex";	
	controlRow.style.display = "none";	
}

function sourceBlockView(){

var elevatorType = document.getElementById("elevatorType");	

var zInputTop = document.getElementById("zInputTop");
var zInputBottom = document.getElementById("zInputBottom");
var scraperInputLength = document.getElementById("scraperInputLength");
var scraperInputAngle = document.getElementById("scraperInputAngle");
var elevatorHeight = document.getElementById("elevatorHeight");

var converterBlock = document.getElementById("converterBlock");
var safeTransportingBlock = document.getElementById("safeTransportingBlock");
var autoBlock = document.getElementById("autoBlock");

var mainMaterial = document.getElementById("mainMaterial");
var bucketMaterial = document.getElementById("bucketMaterial");
var motorManufacturer = document.getElementById("motorManufacturer");

var controlBox = document.getElementById("controlBox");
var topPressureSensor = document.getElementById("topPressureSensor");
var bottomPressureSensor = document.getElementById("bottomPressureSensor");
var pressureSensors = document.getElementById("pressureSensors");

var reverse = document.getElementById("reverse");
var speedSensor = document.getElementById("speedSensor");
var beltSensor = document.getElementById("beltSensor");

var chainSensor = document.getElementById("chainSensor");
var controlBoxConverter = document.getElementById("controlBoxConverter");

var sideInput = document.getElementById("sideInput");
var addInput = document.getElementById("addInput");
var addOutput = document.getElementById("addOutput");


if (elevatorType.selectedIndex=="0"){
		zInputTop.style.display = "none";
		zInputBottom.style.display = "none";
		scraperInputLength.style.display = "none";
		scraperInputAngle.style.display = "none";
		elevatorHeight.style.display = "flex";
		
		converterBlock.style.display = "flex";
		safeTransportingBlock.style.display = "flex";
		autoBlock.style.display = "flex";
		
		mainMaterial.style.display = "flex";
		bucketMaterial.style.display = "flex";
		
		chainSensor.style.display = "none";
		controlBoxConverter.style.display = "none";
		controlBox.style.display = "flex";
		pressureSensors.style.display = "none";
		
		topPressureSensor.style.display = "flex";
		bottomPressureSensor.style.display = "flex";
		beltSensor.style.display = "flex";
		speedSensor.style.display = "flex";
		
		addInput.style.display = "none";
		addOutput.style.display = "none";
		sideInput.style.display = "none";
		
		reverse.style.display = "flex";
		
}
else if (elevatorType.selectedIndex=="1") {
	zInputTop.style.display = "flex";
	zInputBottom.style.display = "flex";
	scraperInputLength.style.display = "none";
	scraperInputAngle.style.display = "none";
	elevatorHeight.style.display = "flex";
	
	converterBlock.style.display = "none";
	safeTransportingBlock.style.display = "none";
	autoBlock.style.display = "flex";
	
	mainMaterial.style.display = "flex";
	bucketMaterial.style.display = "none";
	
	pressureSensors.style.display = "flex";
	chainSensor.style.display = "flex";
	controlBoxConverter.style.display = "flex";
	
	topPressureSensor.style.display = "none";
	bottomPressureSensor.style.display = "none";
	beltSensor.style.display = "none";
	speedSensor.style.display = "none";
	controlBox.style.display = "none";
	
	addInput.style.display = "flex";
	addOutput.style.display = "flex";
	sideInput.style.display = "none";
	
	reverse.style.display = "flex";
	
	
	
	
}
else  {
	zInputTop.style.display = "none";
	zInputBottom.style.display = "none";
	scraperInputLength.style.display = "flex";
	scraperInputAngle.style.display = "flex";
	elevatorHeight.style.display = "none";
	
	converterBlock.style.display = "flex";
	safeTransportingBlock.style.display = "none";
	autoBlock.style.display = "flex";
	
	mainMaterial.style.display = "flex";
	bucketMaterial.style.display = "none";
	
	pressureSensors.style.display = "flex";
	chainSensor.style.display = "none";
	controlBoxConverter.style.display = "none";
	
	topPressureSensor.style.display = "none";
	bottomPressureSensor.style.display = "none";
	beltSensor.style.display = "none";
	speedSensor.style.display = "flex";
	controlBox.style.display = "flex";
	
	addInput.style.display = "none";
	addOutput.style.display = "flex";
	sideInput.style.display = "flex";
	
	reverse.style.display = "none";
	
}

}
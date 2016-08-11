var elementUpdationStatus = new Array();

function getDefaults() {
	
	var defaultValues = new Array();

	defaultValues['color-min'] = 16;
	defaultValues['color-max'] = 96;
	defaultValues['refresh-interval'] = 25;
	defaultValues['target-property'] = 'backgroundColor';	

	return defaultValues;

}

function getValue(targetElement, property) {

	var defaultValues;
	
	if(targetElement.hasAttribute(property)){

		return targetElement.getAttribute(property);

	}
	else{

		defaultValues = getDefaults();

		return defaultValues[property];

	}

}

function getRandomInt() { 

	return  Math.ceil(Math.random() * 7);	

}

function getUpdateFlag(flag) {

	if( flag == '1') {

		return true;

	}
	else if (flag == '0') {

		return false;

	}

}

function zeroPad(text, size) {

	var i;

	for(i = text.length; i < size; i++) {
		
		text = '0' +text;

	}

	return text;

}


function updateDirection(colorCode, dir, colorMin, colorMax) {

	switch(colorCode) {

		case colorMax : return 'DOWN';

		case colorMin : return 'UP';

		default : return dir;

	}

}

function updateValue(colorCode, dir) {

	if(dir == 'UP') {

		return colorCode + 1;

	}

	else if(dir == 'DOWN') {

		return colorCode - 1;
	}

	else {

		return colorCode;

	}

}

function getCurrentColors(targetElement, targetProperty) {

	var colorData, currentColorValue, regex, result;

	if(targetElement === undefined || targetProperty === undefined) {

		return false;

	}

	colorData = new Array();
	currentColorValue = targetElement.style[targetProperty.toString()];

	if(currentColorValue == "") {

		return false;

	}

	regex = /(\d+), (\d+), (\d+)/;
	result = currentColorValue.match(regex);

	colorData['red'] = parseInt( result[1]);
	colorData['green'] = parseInt( result[2]);
	colorData['blue'] = parseInt( result[3]);

	return colorData;

}

function updateColors(colorTransitionData) {

	var redUpdate, greenUpdate, blueUpdate, statusBinary, colorMin, colorMax, red, green, blue, redDir, greenDir, blueDir;

	colorMin = colorTransitionData['colorMin'];
	colorMax = colorTransitionData['colorMax'];	

	red = colorTransitionData['red'];
	green = colorTransitionData['green'];
	blue = colorTransitionData['blue'];

	redDir = colorTransitionData['redDir'];
	greenDir = colorTransitionData['greenDir'];
	blueDir = colorTransitionData['blueDir'];


	statusBinary = zeroPad( ( getRandomInt().toString(2) ), 3);

	redUpdate = getUpdateFlag(statusBinary.substr(0,1));
	greenUpdate = getUpdateFlag(statusBinary.substr(1,1));
	blueUpdate = getUpdateFlag(statusBinary.substr(2,1));

	if(redUpdate) {

		red = updateValue(red, redDir);
		redDir = updateDirection(red, redDir, colorMin, colorMax);

	}

	if(greenUpdate) {

		green = updateValue(green, greenDir);
		greenDir = updateDirection(green, greenDir, colorMin, colorMax);

	}

	if(blueUpdate) {

		blue = updateValue(blue, blueDir);
		blueDir = updateDirection(blue, blueDir, colorMin, colorMax);

	}

	colorTransitionData['red'] = red;
	colorTransitionData['green'] = green;
	colorTransitionData['blue'] = blue;

	colorTransitionData['redDir'] = redDir;
	colorTransitionData['greenDir'] = greenDir;
	colorTransitionData['blueDir'] = blueDir;

	return colorTransitionData;

}



function changeElementColor(targetElement, colorMin, colorMax, targetProperty, refreshInterval) {

		var colorCode;
		var colorTransitionData = new Array();

		colorTransitionData = getCurrentColors(targetElement, targetProperty);

		if(colorTransitionData === false) {			

			colorTransitionData = new Array();
			colorTransitionData['red'] = colorMin;
			colorTransitionData['green'] = colorMin;
			colorTransitionData['blue'] = colorMin;

		}

		colorTransitionData['redDir'] = 'UP';
		colorTransitionData['greenDir'] = 'UP';
		colorTransitionData['blueDir'] = 'UP';

		colorTransitionData['colorMin'] = colorMin;
		colorTransitionData['colorMax'] = colorMax;

		elementUpdationStatus[targetElement.id.toString()] = 

			setInterval(

				function() {

					red = colorTransitionData['red'];
					green = colorTransitionData['green'];
					blue = colorTransitionData['blue'];

					colorCode = ( '#' + zeroPad( red.toString(16), 2 ) + zeroPad( green.toString(16), 2 ) + zeroPad( blue.toString(16), 2 ) ).toUpperCase();
					
					targetElement.style[ targetProperty.toString() ] = colorCode;

					colorTransitionData = updateColors(colorTransitionData);

				}, refreshInterval);

}

function startColorTransitionForElement(targetElement) {

	var colorMin, colorMax, refreshInterval, targetProperty;

	if(targetElement === undefined) {

		return;

	}

	colorMin = parseInt( getValue( targetElement, 'color-min'));
	colorMax = parseInt( getValue( targetElement, 'color-max'));
	refreshInterval = parseInt( getValue( targetElement, 'refresh-interval'));
	targetProperty = getValue( targetElement, 'target-property');

	changeElementColor(targetElement, colorMin, colorMax, targetProperty, refreshInterval);

}

function startColorTransitionForAll() {

	var targetElements, i;

	targetElements = document.getElementsByClassName('color-transition-target');

	for( i = 0; i < targetElements.length; i++) {

		startColorTransitionForElement(targetElements[i]);

	}


}

function startColorTransition(elementId) {


	if(elementId === undefined) {

		startColorTransitionForAll();

	}
	else {

		startColorTransitionForElement( document.getElementById( elementId.toString() ));

	}

}


function stopElementColorChange(elementId) {

	clearInterval(elementUpdationStatus[elementId.toString()]);
	elementUpdationStatus[elementId.toString()] = null;


}

function stopColorTransitionForElement(elementId) {

	if(elementId === undefined) {

		return false;

	}

	stopElementColorChange(elementId);

}

function stopColorTransitionForAll() {

	var targetElements, i;

	targetElements = document.getElementsByClassName('color-transition-target');

	for( i = 0; i < targetElements.length; i++) {

		stopColorTransitionForElement(targetElements[i].id);

	}


}

function stopColorTransition(elementId) {

	if(elementId === undefined) {

		stopColorTransitionForAll();

	}
	else {

		stopColorTransitionForElement(elementId);

	}
}


function toggleColorTransitionForElement(elementId) {

	console.log(elementId);
	if(parseInt(elementUpdationStatus[elementId.toString()]) < 2 || elementUpdationStatus[elementId.toString()] == null){

		console.log('start');
		startColorTransition(elementId);

	}
	else {
		console.log('stop');

		stopColorTransition(elementId);
		elementUpdationStatus[elementId.toString()] = null;

	}

}

function toggleColorTransition(elementId){

	console.log(elementUpdationStatus);

	if(elementId === undefined){

	}
	else{

		toggleColorTransitionForElement(elementId);

	}
}
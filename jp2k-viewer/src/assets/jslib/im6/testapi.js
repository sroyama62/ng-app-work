function testIsEnableWebGL(){
	alert(isEnableWebGL());
}

function testSetImageBrightness(){
	alert(setImageBrightness(document.getElementById('lutMin').value,document.getElementById('lutMax').value));
}

function testGetParams(){
	var jsonObject = JSON.parse(getParams());
	var alertString = "JSON object \n"+
					  "-ScanMode: "+jsonObject.scanMode + "\n"+
					  "-realScanLength1: "+jsonObject.realScanLength1 + "\n"+
					  "-realScanLength2: "+jsonObject.realScanLength2 + "\n"+
					  "-imageWidth: "+jsonObject.imageWidth + "\n"+
					  "-imageHeight: "+jsonObject.imageHeight + "\n"+
					  "-imageBrightnessMax: "+jsonObject.imageBrightnessMax + "\n"+
					  "-imageBrightnessMin: "+jsonObject.imageBrightnessMin + "\n"+
					  "-zResolution: "+jsonObject.zResolution + "\n"+
					  "-displayRatio: "+jsonObject.displayRatio + "\n"+
					  "-imageFileDirectory: "+jsonObject.imageFileDirectory + "\n"+
					  "-imageNum: "+jsonObject.imageNum + "\n"+
					  "-imageFormat: "+jsonObject.imageFormat + "\n"+
					  "-eye: "+jsonObject.eye + "\n";
	alert(alertString);
}

function testGetViewImageNum(){
	alert(getViewImageNum());
}

function jpg256(){
	//set new input params
	document.getElementById('dataSet').innerHTML =
		'<div id="scanMode">6</div>\n'+
        '<div id="realScanLength1">12.0</div>\n'+
        '<div id="realScanLength2">9.0</div>\n'+
        '<div id="imageWidth">512</div>\n'+
        '<div id="imageHeight" >992</div>\n'+
        '<div id="imageBrightnessMax">49003</div>\n'+
        '<div id="imageBrightnessMin">10995</div>\n'+
        '<div id="zResolution">2.6</div>\n'+
        '<div id="displayRatio">2</div>\n'+
        '<div id="imageFileDirectory">./JPG256</div>\n'+
        '<div id="imageNum">256</div>\n'+
        '<div id="imageFormat">1</div>\n'+
        '<div id="eye">0</div>';
	
        // Add start (20151127 HungNT30) SubVolume function /
        document.getElementById("width").setAttribute("value", 512);
        document.getElementById("height").setAttribute("value", 256);
        // Add end/
	//reload X3Dom
	refresh();
}

function raw256(){
	//set new input params
	document.getElementById('dataSet').innerHTML =
		'<div id="scanMode">6</div>\n'+
        '<div id="realScanLength1">12.0</div>\n'+
        '<div id="realScanLength2">9.0</div>\n'+
        '<div id="imageWidth">512</div>\n'+
        '<div id="imageHeight" >992</div>\n'+
        '<div id="imageBrightnessMax">49003</div>\n'+
        '<div id="imageBrightnessMin">10995</div>\n'+
        '<div id="zResolution">2.6</div>\n'+
        '<div id="displayRatio">2</div>\n'+
        '<div id="imageFileDirectory">./RAW256</div>\n'+
        '<div id="imageNum">256</div>\n'+
        '<div id="imageFormat">0</div>\n'+
        '<div id="eye">1</div>';
	
	//reload X3Dom
	refresh();
}

function radianJPG(){
	//set new input params
	document.getElementById('dataSet').innerHTML =
		'<div id="scanMode">3</div>\n'+
        '<div id="realScanLength1">6.0</div>\n'+
        '<div id="realScanLength2">0.0</div>\n'+
        '<div id="imageWidth">1024</div>\n'+
        '<div id="imageHeight" >992</div>\n'+
        '<div id="imageBrightnessMax">49003</div>\n'+
        '<div id="imageBrightnessMin">10995</div>\n'+
        '<div id="zResolution">2.6</div>\n'+
        '<div id="displayRatio">2</div>\n'+
        '<div id="imageFileDirectory">./RADIAN_JPG</div>\n'+
        '<div id="imageNum">12</div>\n'+
        '<div id="imageFormat">1</div>\n'+
        '<div id="eye">1</div>';
	
	//reload X3Dom
	refresh();
}

function radianRAW(){
	//set new input params
	document.getElementById('dataSet').innerHTML =
		'<div id="scanMode">3</div>\n'+
        '<div id="realScanLength1">6.0</div>\n'+
        '<div id="realScanLength2">0.0</div>\n'+
        '<div id="imageWidth">1024</div>\n'+
        '<div id="imageHeight" >992</div>\n'+
        '<div id="imageBrightnessMax">49003</div>\n'+
        '<div id="imageBrightnessMin">10995</div>\n'+
        '<div id="zResolution">2.6</div>\n'+
        '<div id="displayRatio">2</div>\n'+
        '<div id="imageFileDirectory">./RADIAN_RAW</div>\n'+
        '<div id="imageNum">12</div>\n'+
        '<div id="imageFormat">0</div>\n'+
        '<div id="eye">1</div>';
	
	//reload X3Dom
	refresh();
}

function testChangeSteps(){
	alert(changeSteps(parseFloat(document.getElementById('steps').value)));
}

function testGetViewImageNumI(){
	alert(getViewImageNumI());
}

function testGetViewImageNumS(){
	alert(getViewImageNumS());
}

function testGetViewImageNumN(){
	alert(getViewImageNumN());
}

function testGetViewImageNumT(){
	alert(getViewImageNumT());
}

function testGetViewImageNumU(){
	alert(getViewImageNumU());
}

function testGetViewImageNumB(){
	alert(getViewImageNumB());
}

function testSetDisplayRatio(){
	alert(setDisplayRatio(document.getElementById('ratio').value));
        //Add start ( 20151127 HieuDD) SubVolume function /
        testDisableButtons();
        //Add end /
}
function testsave(){
	save(document.getElementById('nameIm').value, document.getElementById('typeIm').value);
}

//Add start (20151127 HungNT30) SubVolume function /
function testShowSubVolume(){
    var number = testGetActiveSubVolume();
    showSubVolume(number);
}

function testHideSubVolume(){
    var number = testGetActiveSubVolume();
    hideSubVolume(number);
    offSubVolumeMove(number);
}
//Add end/

//Add start (20151127 BangPX) SubVolume function /
function testSetLayerData(){
    var data = [];
    // Image width
    var width = parseInt(document.getElementById("width").value);
    // Image number
    var height = parseInt(document.getElementById("height").value);
   
    var rawFile = new XMLHttpRequest();
    if( !width) {
        width = parseInt(obj3D.imageWidth);
    }
    
    if( !height) {
        height = parseInt(obj3D.imageNum);
    }
    
    // Read data from text file
    var fileName = "./LayerData/layerdata_width" + _imageWidth + "_height" + _imageNum + ".txt";
    rawFile.open("GET", fileName,false);
    //rawFile.open("GET", "./LayerData/layerdata_width512_height128.txt",false);
    rawFile.onreadystatechange = function (){
        if(rawFile.readyState === 4){
            if(rawFile.status === 200 || rawFile.status === 0){
                var str = rawFile.responseText;
                // Remove characters no necessarSy 
                str = str.replace(/[^0-9,]/g, '').split(',').map(Number);
                // Convert 1 dimensional array to 2 dimensional
                    for(i = 0; i < str.length; i+= width) {
                        data.push(str.slice(i, width + i));
                    }
                // Set layer data
                setLayerData(width, height, data);
            }
        }
    };
    rawFile.send(null);
    testDisableButtons();
}

function testStartSubVolume(){
    startSubVolume();
    testDisableButtons();
    document.getElementById("SVRadio1").checked = true;
}

function testEndSubVolume(){
    endSubVolume();
    testDisableButtons();
}
//Add end /

//Add start (20151127 ThangTH) SubVolume function /
function testOnSubVolumeMove()
{
    var number = testGetActiveSubVolume();
    onSubVolumeMove(number);
}
function testOffSubVolumeMove()
{
    var number = testGetActiveSubVolume();
    offSubVolumeMove(number);
}
//Add end/

//Add start (20151127 HieuDD) SubVolume function /
function testOnSubVolumePeeling(){
        var number = testGetActiveSubVolume();
        onSubVolumePeeling(number);
}

function testOffSubVolumePeeling(){
        var number = testGetActiveSubVolume();
        offSubVolumePeeling(number);
}

function testGetActiveSubVolume(){
        var number = 0;
        if(document.getElementById('SVRadio1').checked){
            number = 1;
        }
        else if(document.getElementById('SVRadio2').checked){
            number = 2;
        }
        return number;
}

function testDisableButtons(){
        var SubVolumeON = parseInt(document.getElementById("style").getAttribute("SubVolume"));
        var buttons = document.getElementsByName("SVControl");

        buttons[1].disabled = false;
        //if(1.0 == SubVolumeON )
        if(1.0 == SubVolumeON || onStartButton == true)
        {
            for(var ii = 1; ii < buttons.length; ii++){
                buttons[ii].disabled = false;
            }
            document.getElementsByName("Crop")[0].disabled = true;
            document.getElementsByName("Crop")[1].disabled = true;
        } 
        else {
            for(var ii = 2; ii < buttons.length; ii++){
                buttons[ii].disabled = true;
            }
            document.getElementsByName("Crop")[0].disabled = false;
            document.getElementsByName("Crop")[1].disabled = false;
        }   
}

function testOnAnnotation(){
    onAnnotation();
    testDisableButtons();
}

function testOffAnnotation(){
    offAnnotation();
    var SVControls = document.getElementsByName("SVControl");
    for ( var ii = 1; ii < SVControls.length; ii++) {
        SVControls[ii].disabled  = true;
    }
}

function jpg128(){
	//set new input params
	document.getElementById('dataSet').innerHTML =
        '<div id="scanMode">6</div>\n'+
        '<div id="realScanLength1">12.0</div>\n'+
        '<div id="realScanLength2">9.0</div>\n'+
        '<div id="imageWidth">512</div>\n'+
        '<div id="imageHeight" >885</div>\n'+
        '<div id="imageBrightnessMax">49003</div>\n'+
        '<div id="imageBrightnessMin">10995</div>\n'+
        '<div id="zResolution">2.6</div>\n'+
        '<div id="displayRatio">2</div>\n'+
        '<div id="imageFileDirectory">./JPG128</div>\n'+
        '<div id="imageNum">128</div>\n'+
        '<div id="imageFormat">1</div>\n'+
        '<div id="eye">0</div>';
	
        document.getElementById("width").setAttribute("value", 512);
        document.getElementById("height").setAttribute("value", 128);
	//reload X3Dom
	refresh();
}
// Add end /

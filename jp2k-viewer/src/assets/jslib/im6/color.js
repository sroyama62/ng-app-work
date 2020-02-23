var lutColorData;
var lutGrayData;
var lutInvertData;
//var resizedLutData;
var tftex = new Array();
var threshold = defaultThreshold = 280; // threshold for noise reduction

//DuyPhuc++
var displayingLut = 0;  //0: Color; 1: Gray ; 2: Invert;
//DuyPhuc--

//DuyPhuc++
function readLutFileRad(byteArr, bgnd, gl, doc, texture, minBr, maxBr, imgWidth, imgHeight, scale){
	lutColorData = new Array();
	var rawFile = new XMLHttpRequest();
	rawFile.open("GET", "lut/OCTCMAP.CLM", true);
	rawFile.onreadystatechange = function ()
	{
		if(rawFile.readyState === 4)
		{		
			var allText = rawFile.responseText;
			var arrLine = allText.split("\n");
			var numofcolor = arrLine[0] * 1;
			var factor =  ( numofcolor - 2 )/254;
			
			if(arrLine[1]){
				var arrCol = arrLine[1].split(" ");
				lutColorData[0] = arrCol[0] * 255;
				lutColorData[1] = arrCol[1] * 255;
				lutColorData[2] = arrCol[2] * 255;
				lutColorData[3] = 255;			
			}
			for (var i = 1; i <= 254; i++) {
				var arrCol = arrLine[Math.floor((i-1)*factor) + 2].split(" ");				
				lutColorData[i*4] = arrCol[0] * 255;
				lutColorData[i*4 + 1] = arrCol[1] * 255;
				lutColorData[i*4 + 2] = arrCol[2] * 255;
				lutColorData[i*4 + 3] = 255;				
			}
			if(arrLine[numofcolor]){
				var arrCol = arrLine[numofcolor].split(" ");
				lutColorData[1020] = arrCol[0] * 255;
				lutColorData[1021] = arrCol[1] * 255;
				lutColorData[1022] = arrCol[2] * 255;
				lutColorData[1023] = 255;
			}
			bindTextureRad(byteArr, bgnd, gl, doc, texture, minBr, maxBr, imgWidth, imgHeight, scale);
			startDefaultLut();	
		}
	}
	rawFile.send();
}

function loadLutDataRad(byteArr, bgnd, gl, doc, texture, minBr, maxBr, imgWidth, imgHeight, scale){	
	readLutFileRad(byteArr, bgnd, gl, doc, texture, minBr, maxBr, imgWidth, imgHeight, scale);
	initLutGray();
	initLutInvert();
}
//DuyPhuc--

function loadLutData(){
	readLutFile();
	initLutGray();
	initLutInvert();
}

function initLutGray(){
	lutGrayData = new Array();
	for(var i=0 ; i < 1024 ; i+=4){
		lutGrayData[i] = i/4;
		lutGrayData[i+1] = i/4;
		lutGrayData[i+2] = i/4;
		lutGrayData[i+3] = 255;
	}
}

function initLutInvert(){
	// lutInvertData = new Array();
	// for(var i=0 ; i < 1024 ; i+=4){
		// lutInvertData[i] = 255 - i/4;
		// lutInvertData[i+1] = 255 - i/4;
		// lutInvertData[i+2] = 255 - i/4;
		// lutInvertData[i+3] = 255;
	// }
	
	//new LUT invert after change gama
	lutInvertData = new Array();
     var gamma = 1.5;
     var max = Math.pow(255, gamma); //Because min will be 0, so (max - min) = max
     var value;
     for(var i=0 ; i < 1024 ; i+=4){
           value = Math.floor(((Math.pow(255 - i/4,gamma)) * 255)/max);
           lutInvertData[i] = value;
           lutInvertData[i+1] = value;
           lutInvertData[i+2] = value;
           lutInvertData[i+3] = 255;
     }
}


/** 
* @Function RGB2Color
* @Description : convert RGB  to Code Color
* @param : r
* @param : g
* @param : b
* @author : ManhDD
* @Since : 03:08 PM 11/11/2013
* @return CodeColor
*/
function RGB2Color(r, g, b) {
	return '#' + byte2Hex(r) + byte2Hex(g) + byte2Hex(b);
}

/** 
* @Function byte2Hex
* @Description : convert RGB  to Code Color
* @param : n
* @author : ManhDD
* @Since : 03:08 PM 11/11/2013
* @return String
*/
function byte2Hex(n) {
	var nybHexString = "0123456789ABCDEF";
	return String(nybHexString.substr((n >> 4) & 0x0F, 1)) + nybHexString.substr(n & 0x0F, 1);
}

/** 
* @Function makeColorGradient
* @Description : set color bar
* @param : frequency1
* @param : frequency2
* @param : frequency3
* @param : center
* @param : width
* @param : len
* @author : ManhDD
* @Since : 03:08 PM 11/11/2013
* @return void
*/
function makeColorGradient(frequency1, frequency2, frequency3, center, width, len) {
	if (len == undefined)
		len = 130;
	if (center == undefined)
		center = 128;
	if (width == undefined)
		width = 127;
	for (var i = 0; i < len; ++i) {
		var red = frequency1*255;
		var grn = frequency2*255;
		var blu = frequency3*255;
			lutColorData.push(red);
			lutColorData.push(grn);
			lutColorData.push(blu);
			lutColorData.push(255);
	}
}

/** 
* @Function readTextFile
* @Description : read file CLM
* @author : ManhDD
* @Since : 03:08 PM 11/11/2013
* @return void
*/
function readLutFile()
{
	lutColorData = new Array();
	var rawFile = new XMLHttpRequest();
	rawFile.open("GET", "lut/OCTCMAP.CLM", true);
	rawFile.onreadystatechange = function ()
	{
		if(rawFile.readyState === 4)
		{
			
			var allText = rawFile.responseText;
			var arrLine = allText.split("\n");
			if(arrLine[1]){
				var arrCol = arrLine[1].split(" ");
				makeColorGradient(arrCol[0],arrCol[1],arrCol[2], 129, 128, 1);
			}
			for (var i = 2; i <= arrLine[0]-1; i++) {
				var arrCol = arrLine[i].split(" ");
				for(var j = 0; j < arrCol.length-1; j++){		
					makeColorGradient(arrCol[0],arrCol[1],arrCol[2], 129, 128, 1);
				}
			}
			if(arrLine[129]){
				var arrCol = arrLine[129].split(" ");
				makeColorGradient(arrCol[0],arrCol[1],arrCol[2], 129, 128, 1);
			}
			startDefaultLut();
		}
	}

	rawFile.send();
}

/** 
* @Function createMapColor
* @Description : create texture for webgl program
* @author : KienVT4
* @Since : 11:0 AM 12/09/2013
* @return void
*/
function createMapColor(resizedLutData){
	var colorCanvas = document.createElement('canvas');
	
	colorCanvas.width = 256;
	colorCanvas.height = 1;
	
	var colorCtx = colorCanvas.getContext('2d');
	
	var imageData = colorCtx.createImageData(256,1);
	var r,g,b;
	var indexMin = Math.round(_imageBrightnessMin/256) *4+12 + (threshold-280);
	var indexMax = Math.round(_imageBrightnessMax/256) *4;
	var indexCenter = Math.round((_imageBrightnessMin+_imageBrightnessMax)/512) * 4;
	var index4 = (indexCenter*0.32+indexMin*0.68);
	var contrast3Dvolume = 1.5;
	var contrastNoise = (displayingLut == 2)?1.21 : 1.33;
	for(var i=0; i<resizedLutData.length; i+=4){
		r=resizedLutData[i];
		g=resizedLutData[i+1];
		b=resizedLutData[i+2];
		a=resizedLutData[i+3];
		//luma = 0.4*r + 0.4*g + 0.2*b; // per ITU-R BT.709

		if (i <= indexMin) {
			imageData.data[i]=null;
			imageData.data[i+1]=null;
			imageData.data[i+2]=null;
			imageData.data[i+3]=null;
		} else if (i > indexCenter) {
			imageData.data[i]=r;
			imageData.data[i+1]=g;
			imageData.data[i+2]=b;
			imageData.data[i+3]=a;
		} else if (i < threshold){//280
			imageData.data[i]=null;
			imageData.data[i+1]=null;
			imageData.data[i+2]=null;
			imageData.data[i+3]=null;
		} else {
			imageData.data[i]=r;
			imageData.data[i+1]=g;
			imageData.data[i+2]=b;
			imageData.data[i+3]=(i>index4)?Math.pow((i-indexMin)*255/(indexMax-indexMin),contrast3Dvolume):Math.pow((i-indexMin)*255/(indexMax-indexMin),contrastNoise);//Math.pow((i-indexMin)*255/(indexMax-indexMin),1.5);//(i>index4 || index4==indexMin)?255:(i-indexMin)*index4/(index4 - indexMin) - (i-indexMin)/4;
		}
	}
	
	colorCtx.putImageData(imageData,0,0);
	
	applyColorMap(colorCanvas);
}

/** 
* @Function resizeLutArray
* @Description : resize Lut base on _imageBrightnessMin, _imageBrightnessMax
* @author : KienVT4
* @Since : 11:50 AM 12/10/2013
* @return void
*/
function resizeLutArray(lutData){
	var resizedLutData = new Array();
	var indexMin = Math.round(_imageBrightnessMin/256) *4;
	var indexMax = Math.round(_imageBrightnessMax/256) *4;
	for(var i = 0; i< lutData.length ; i+=4){
		if(i<=indexMin){
			resizedLutData[i] = lutData[0];
			resizedLutData[i+1] = lutData[0];
			resizedLutData[i+2] = lutData[0];
			resizedLutData[i+3] = 255;
		} else if (i>=indexMax){
		//alert("32");
			resizedLutData[i] = lutData[1020];
			resizedLutData[i+1] = lutData[1021];
			resizedLutData[i+2] = lutData[1022];
			resizedLutData[i+3] = 255;
		} else {
			index = Math.round((i-indexMin)*256/(indexMax-indexMin));
			resizedLutData[i] = lutData[index*4];
			resizedLutData[i+1] = lutData[index*4+1];
			resizedLutData[i+2] = lutData[index*4+2];
			resizedLutData[i+3] = lutData[index*4+3];
		}
	}
	
	displayLut(resizedLutData);
	
	resizedLutData = new Array();
	indexMin = Math.round(_imageBrightnessMin/256) *4 + 24 + (threshold-280);
	indexMax = Math.round(_imageBrightnessMax/256) *4;
	for(var i = 0; i< lutData.length ; i+=4){
		if(i<=indexMin){
			resizedLutData[i] = lutData[0];
			resizedLutData[i+1] = lutData[0];
			resizedLutData[i+2] = lutData[0];
			resizedLutData[i+3] = 255;
		} else if (i>=indexMax){
		//alert("32");
			resizedLutData[i] = lutData[1020];
			resizedLutData[i+1] = lutData[1021];
			resizedLutData[i+2] = lutData[1022];
			resizedLutData[i+3] = 255;
		} else {
			index = Math.round((i-indexMin)*256/(indexMax-indexMin));
			resizedLutData[i] = lutData[index*4];
			resizedLutData[i+1] = lutData[index*4+1];
			resizedLutData[i+2] = lutData[index*4+2];
			resizedLutData[i+3] = lutData[index*4+3];
		}
	}
	//not need for Radian
	if(_scanMode !=3)
		createMapColor(resizedLutData);
	//[03.25.2014] DucHT - Fix bug memory leak begin
	resizedLutData = [];
	resizedLutData = undefined;
	//[03.25.2014] DucHT - Fix bug memory leak end
}

/** 
* @Function displayLut
* @Description : display color in color bar
* @author : KienVT4
* @Since : 11:50 AM 12/10/2013
* @return void
*/
function displayLut(data){
	var newCanvas = document.createElement('canvas');
	var canvasDisplay = document.getElementById('lut');
	var ctxDisplay = canvasDisplay.getContext('2d');
	
	canvasDisplay.width = 256*2.68;
	canvasDisplay.height = 15;
	
	var imageData = ctxDisplay.createImageData(256,1);
	for(var i = 0 ; i < data.length ; i++)	
		imageData.data[i] = data[i];
	
	newCanvas.getContext("2d").putImageData(imageData, 0, 0);
	ctxDisplay.scale(2.68,15);
	ctxDisplay.drawImage(newCanvas, 0, 0);
}

function startDefaultLut(){
	//displayingLut = 0;
	switch(displayingLut){
		case 0:
			//Lut Color
			startColorLut();
			break;
		case 1:
			//Lut Gray
			startGrayLut();
			break;
		case 2:
			//Lut Invert
			startInvertLut();
			break;
		default:
			return false;
		}
}

function startColorLutBtn(){
	displayingLut = 0;
	
	if(setImageBrightness(_imageBrightnessMin,_imageBrightnessMax)){
		//change button style
		document.getElementById("imgColor").setAttribute("class", "imgColor");
		document.getElementById("imgGray").setAttribute("class", "imgNone");
		document.getElementById("imgInvert").setAttribute("class", "imgNone");
		//change background color
		changeSkyColor(0,0,0);
	}else{
		alert('Brightness Invalid !');
	}
}

function startGrayLutBtn(){
	displayingLut = 1;	
	if(setImageBrightness(_imageBrightnessMin,_imageBrightnessMax)){
		//change button style
		document.getElementById("imgGray").setAttribute("class", "imgGray");
		document.getElementById("imgColor").setAttribute("class", "imgNone");
		document.getElementById("imgInvert").setAttribute("class", "imgNone");
		//change background color
		changeSkyColor(0.39216,0.509804,0.78432);
	}else{
		alert('Brightness Invalid !');
	}
}

function startInvertLutBtn(){
	displayingLut = 2;
	if(setImageBrightness(_imageBrightnessMin,_imageBrightnessMax)){
		//change button style
		document.getElementById("imgInvert").setAttribute("class", "imgGray");
		document.getElementById("imgGray").setAttribute("class", "imgNone");
		document.getElementById("imgColor").setAttribute("class", "imgNone");
		//change background color
		changeSkyColor(1,1,1);
	}else{
		alert('Brightness Invalid !');
	}
}

/** 
* @Function applyColorMap
* @Description : Function apply Lut color to 3D volume. Bind image to webGL as texture.
* @param : image
* @author : KienVT4
* @Since : 11:50 AM 12/10/2013
* @return void
*/
function applyColorMap(image){
	gl = x3dom.canvases[0].doc.ctx.ctx3d;
	doc = x3dom.canvases[0].doc;
	
    gl.bindTexture(gl.TEXTURE_2D, tftex[0]);
	// Set the parameters so we can render any size image.
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

    // Upload the image into the texture.
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
	
	//make change
	document.getElementById('style').setAttribute('tf','true');
}

/** 
* @Function changeSkyColor
* @Description : Change background color of canvas.
* @param : red
* @param : green
* @param : blue
* @author : KienVT4
* @Since : 03:30 PM 12/24/2013
* @return void
*/
function changeSkyColor(red, green, blue){
	skyColor = x3dom.canvases[0].doc._scene.getBackground().getSkyColor()[0];
	skyColor.r = red;
	skyColor.g = green;
	skyColor.b = blue;
}

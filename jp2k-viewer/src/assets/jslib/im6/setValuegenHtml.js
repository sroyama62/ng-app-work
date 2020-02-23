var dx = 0.0;
var dy = 0.0;
var dz = 0.0;
var trl = "translation";
var rt = "rotation";
//Add start (20151127 ThangTH) Add upper and lower bounds/
var posOriginal = 0.00001;
var topLimit = 0.0;
var bottomLimit = 0.0;
var orgDy = 0.0;
var ballShift = 1.0;
//Add end/
/** 
 * @Function : setAll
 * @Description : set value 
 * @param : null
 * @author : LinhVn4
 * @Since : 10:00 AM 11/8/2013
 * @return : void
 */
function setAll(){	
	if(parseFloat(obj3D.scanMode)==6)
	{
	   dx = parseFloat(JSON.parse(obj3D.realScanLength2));
	   dz = parseFloat(JSON.parse(obj3D.realScanLength1));
	}else if(parseFloat(obj3D.scanMode)==3)
	{
	  dz = parseFloat(JSON.parse(obj3D.realScanLength1));
	  dx = parseFloat(JSON.parse(obj3D.realScanLength1));
	}
	else
	{
	  dz = parseFloat(JSON.parse(obj3D.realScanLength2));
	  dx = parseFloat(JSON.parse(obj3D.realScanLength1));
	}
	dy =  parseFloat(_realScanLength3);
	
	//[3DViewer][set default dimensions] KienVT4 add -start
	var scale = 10.0 / Math.max(dx,dy,dz);
	dx = dx * scale;
	dy = dy * scale;
	dz = dz * scale;
	//[3DViewer][set default dimensions] KienVT4 add -end
	
	_radiusBall = Math.sqrt(dx*dx  + dy*dy + dz*dz)/2.0;

	document.getElementById("cubesize").setAttribute("point", (dx+0.008)/-2+" "+(dy+0.008)/2+" "+(dz+0.008)/2+" "+(dx+0.008)/2+" "+(dy+0.008)/2+" "+(dz+0.008)/2+" "+(dx+0.008)/2+" "+(dy+0.008)/2+" "+(dz+0.008)/-2+" "+(dx+0.008)/-2+" "+(dy+0.008)/2+" "+(dz+0.008)/-2+" "+(dx+0.008)/-2+" "+(dy+0.008)/-2+" "+(dz+0.008)/2+" "+(dx+0.008)/2+" "+(dy+0.008)/-2+" "+(dz+0.008)/2+" "+(dx+0.008)/2+" "+(dy+0.008)/-2+" "+(dz+0.008)/-2+" "+(dx+0.008)/-2+" "+(dy+0.008)/-2+" "+(dz+0.008)/-2);
	document.getElementById("volume3d").setAttribute("dimensions",dx+" "+dy+" "+dz);
	document.getElementById("sizeimage1").setAttribute("point", dx/-2+" "+dy/-2+" 0 "+dx/2+" "+dy/-2+" 0 "+dx/2+" "+dy/2+" 0 "+dx/-2+" "+dy/2+" 0");
	document.getElementById("sizeimage2").setAttribute("point", dx/-2+" "+dy/-2+" 0 "+dx/2+" "+dy/-2+" 0 "+dx/2+" "+dy/2+" 0 "+dx/-2+" "+dy/2+" 0");
	//document.getElementById("radian1").setAttribute(rt,"0 0 1 3.14");
	//Add start (20151127 ThangTH) Add for SubVolume function/
	orgDy = dy;
	topLimit = bottomLimit = 1/(Math.ceil(Math.sqrt(parseFloat(_imageNum))) * 2);
	//Add end/
}

/** 
 * @Function settrl
 * @Description : set element translation
 * @param :scan
 * @author :HoangTh2
 * @Since : 1:43 PM 11/12/2013
 * @return :void
 */
function checkScanMode(scanmode) {
    if (3 === scanmode) {
        document.getElementById("3Dbox").setAttribute("render", false);
        document.getElementById("radian").setAttribute("render", true);
		//Radian setup 
		if(_eye == 0){
			_displayRad = Math.PI;
		}
    } else {
        document.getElementById("3Dbox").setAttribute("render", true);
        document.getElementById("radian").setAttribute("render", false);
		//Function resetCrop in crop3D.js
		resetCrop();
    }
	
	
}
/** 
 * @check marker
 * @Description : check marker by param
 * @param : eye
 * @author :LinhVn4
 * @Since : 10:00 AM 11/8/2013
 * @return null
 */
function checkMarker(_eye) {
if( 6 === parseFloat(_scanMode)){
	document.getElementById("square1").setAttribute(trl,(dx-0.7)/-2+" "+(dy-0.7)/2+" "+(dz+0.005)/2);
    document.getElementById("square2").setAttribute(trl, (dx+0.005)/2+" "+(dy-0.7)/2+" "+(dz-0.7)/2);
    document.getElementById("square3").setAttribute(trl, (dx-0.7)/2+" "+(dy-0.7)/2+" "+(dz+0.005)/-2);
    document.getElementById("square4").setAttribute(trl, (dx+0.005)/-2+" "+(dy-0.7)/2+" "+(dz-0.7)/-2);
	
	document.getElementById("texti1").setAttribute(trl, (dx+0.02)/2+" "+(dy-1.5)/2+" "+(dz-0.7)/2);
	document.getElementById("texti2").setAttribute(trl,	(dx-0.01)/2+" "+(dy-1.5)/2+" "+(dz-0.7)/2);
	document.getElementById("texti1").setAttribute("rotation", "0 1 0 4.712");
    document.getElementById("texti2").setAttribute("rotation", "0 1 0 4.712");
	
	document.getElementById("texts1").setAttribute(trl, (dx+0.02)/-2+" "+(dy-1.5)/2+" "+(dz-0.7)/-2);
	document.getElementById("texts2").setAttribute(trl, (dx-0.01)/-2+" "+(dy-1.5)/2+" "+(dz-0.7)/-2);
    document.getElementById("texts2").setAttribute("rotation", "0 1 0 4.712");
	document.getElementById("texts1").setAttribute("rotation", "0 1 0 4.712");
	
	if (0 === parseFloat(_eye)) {
		document.getElementById("textt1").setAttribute(trl,(dx-0.7)/-2+" "+(dy-1.5)/2+" "+(dz+0.02)/2);	
		document.getElementById("textt2").setAttribute(trl,	(dx-0.7)/-2+" "+(dy-1.5)/2+" "+(dz-0.01)/2);	
		
		document.getElementById("textn1").setAttribute(trl, (dx-0.7)/2+" "+(dy-1.5)/2+" "+(dz+0.02)/-2);
		document.getElementById("textn2").setAttribute(trl, (dx-0.7)/2+" "+(dy-1.5)/2+" "+(dz-0.01)/-2);
		document.getElementById("textn1").setAttribute(rt, "0 1 0 3.14");
		document.getElementById("textn2").setAttribute(rt, "0 1 0 3.14");	
	} else if (1 === parseFloat(_eye)) {
		document.getElementById("textn1").setAttribute(trl,(dx-0.7)/-2+" "+(dy-1.5)/2+" "+(dz+0.02)/2);	
		document.getElementById("textn2").setAttribute(trl,	(dx-0.7)/-2+" "+(dy-1.5)/2+" "+(dz-0.01)/2);	
		
		document.getElementById("textt1").setAttribute(trl, (dx-0.7)/2+" "+(dy-1.5)/2+" "+(dz+0.02)/-2);
		document.getElementById("textt2").setAttribute(trl, (dx-0.7)/2+" "+(dy-1.5)/2+" "+(dz-0.01)/-2);
		document.getElementById("textn1").setAttribute(rt, "0 0 0 0");
		document.getElementById("textn2").setAttribute(rt, "0 0 0 0");	
	}
}else{		
	document.getElementById("texti1").setAttribute(trl,(dx-0.7)/-2+" "+(dy-1.5)/2+" "+(dz+0.02)/2);	
    document.getElementById("texti2").setAttribute(trl,	(dx-0.7)/-2+" "+(dy-1.5)/2+" "+(dz-0.01)/2);
    document.getElementById("texts1").setAttribute(trl, (dx-0.7)/2+" "+(dy-1.5)/2+" "+(dz+0.02)/-2);
    document.getElementById("texts2").setAttribute(trl, (dx-0.7)/2+" "+(dy-1.5)/2+" "+(dz-0.01)/-2);
	
	document.getElementById("square1").setAttribute(trl,(dx-0.7)/-2+" "+(dy-0.7)/2+" "+(dz+0.005)/2);
    document.getElementById("square2").setAttribute(trl, (dx+0.005)/2+" "+(dy-0.7)/2+" "+(dz-0.7)/2);
    document.getElementById("square3").setAttribute(trl, (dx-0.7)/2+" "+(dy-0.7)/2+" "+(dz+0.005)/-2);
    document.getElementById("square4").setAttribute(trl, (dx+0.005)/-2+" "+(dy-0.7)/2+" "+(dz-0.7)/-2);
	
	document.getElementById("texts1").setAttribute(rt, "0 1 0 3.14");
    document.getElementById("texts2").setAttribute(rt, "0 1 0 3.14");
	document.getElementById("textt1").setAttribute("rotation", "0 1 0 4.712");
    document.getElementById("textt2").setAttribute("rotation", "0 1 0 4.712");	
    if (1 === parseFloat(_eye)) {
        document.getElementById("textt1").setAttribute(trl, (dx+0.02)/2+" "+(dy-1.5)/2+" "+(dz-0.7)/2);
		document.getElementById("textt2").setAttribute(trl,	(dx-0.01)/2+" "+(dy-1.5)/2+" "+(dz-0.7)/2);
        document.getElementById("textn1").setAttribute(trl, (dx+0.02)/-2+" "+(dy-1.5)/2+" "+(dz-0.7)/-2);
		document.getElementById("textn2").setAttribute(trl, (dx-0.01)/-2+" "+(dy-1.5)/2+" "+(dz-0.7)/-2);
        document.getElementById("textn2").setAttribute("rotation", "0 1 0 4.712");
        document.getElementById("textn1").setAttribute("rotation", "0 1 0 4.712");
    } else if (0 === parseFloat(_eye)) {
		document.getElementById("textn1").setAttribute(trl, (dx+0.02)/2+" "+(dy-1.5)/2+" "+(dz-0.7)/2);
		document.getElementById("textn2").setAttribute(trl,	(dx-0.01)/2+" "+(dy-1.5)/2+" "+(dz-0.7)/2);
        document.getElementById("textt1").setAttribute(trl, (dx+0.02)/-2+" "+(dy-1.5)/2+" "+(dz-0.7)/-2);
		document.getElementById("textt2").setAttribute(trl, (dx-0.01)/-2+" "+(dy-1.5)/2+" "+(dz-0.7)/-2);        
        document.getElementById("textn2").setAttribute("rotation", "0 1 0 1.57");
        document.getElementById("textn1").setAttribute("rotation", "0 1 0 1.57");
    }}
}



var cropflg;

/** 
 * @Function : onOffCrop
 * @Description : On Off Crop
 * @author :LinhVn4
 * @Since : 10:00 AM 11/8/2013
 * @return :void
 */
function onOffCrop(){
if(_scanMode == 3)
	return;
if(1 === cropflg){	
	document.getElementById("crop").setAttribute("value", "Crop:Off"); 	
	//Define in Crop3D.js
	offCrop();
}else if(1 !== cropflg && "true"===document.getElementById("overlay").getAttribute("render")){
	document.getElementById("crop").setAttribute("value", "Crop:On");	
	//Define in Crop3D.js
	onCrop();
	}
}
/** 
 * @Function : displayResult
 * @Description : show/hide Overlay
 * @param :null
 * @author :LinhVn4
 * @Since : 10:00 AM 11/8/2013
 * @return :void
 */

function displayOverlay() {	
    if ("false"===document.getElementById("overlay").getAttribute("render")) {
		document.getElementById("imgA").setAttribute("class", "imgA");
		document.getElementById("overlay").setAttribute("render", true);           
        document.getElementById("lut").style.visibility = 'visible';		
		document.getElementById("crop").disabled=false;		
		if(1===cropflg)
		document.getElementById("borderCrop").setAttribute("render", true);
		//cropflg=1;
    } else {
        document.getElementById("imgA").setAttribute("class", "imgNone");
        document.getElementById("overlay").setAttribute("render", false);
        document.getElementById("lut").style.visibility = 'hidden';
		document.getElementById("borderCrop").setAttribute("render", false); 	
		document.getElementById("crop").setAttribute("value", "Crop:Off");		
		document.getElementById("crop").disabled=true;
		//document.getElementById("crop").setAttribute("disabled", true);			
    }
}

/** 
 * @Function : radian
 * @Description : radian 
 * @author :LinhVn4
 * @Since : 10:00 AM 11/8/2013
 * @return :void
 */
var ii=1;
//var jj=0;

function RotateLeftBtn(){
	var n=parseFloat(_imageNum);

		//var imagesDir = './volume/bscan_SLICE.jpg';	
		var imagesDir = 'bscan_SLICE';			
        var imagesDirS = imagesDir.split('SLICE');
        //var dataImgs;	
		if(_eye == 1){
			ii--;
		} else {
			ii++;
		}
		//ii++;//jj++;
				
		if(ii==n+1){
			ii=1;
			_displayRad = _displayRad - Math.PI;
			//jj=0;
		}
		if(ii<=0){
			ii=n;
			_displayRad = _displayRad + Math.PI;
		}
		
		num = ii.toString();

		if (num.length == 1) {
			num = '00' + num;
		} else if (num.length == 2) {
			num = '0' + num;
		}
				
		//dataImgs = imagesDirS[0] + num + imagesDirS[1];
		//document.getElementById("radian").setAttribute("rotation", " 0 1 0 " + (Math.PI/n)*jj);
		//document.getElementById("image3D1").setAttribute("url",dataImgs);
		//document.getElementById("image3D2").setAttribute("url",dataImgs);			
		
		_displayRadImage = imagesDirS[0] + num + imagesDirS[1];	
		_displayRad += Math.PI/n;
		document.getElementById("image3D1").setAttribute("url", _defaultRadImage);
		document.getElementById("image3D2").setAttribute("url", _defaultRadImage);	
        }
function RotateRightBtn(){
	var n=parseFloat(_imageNum);

	//var imagesDir = './volume/bscan_SLICE.jpg';
	var imagesDir = 'bscan_SLICE';			
	var imagesDirS = imagesDir.split('SLICE');
       //var dataImgs;		
	if(_eye == 1){
		ii++;
	} else {
		ii--;
	}
			
	if(ii==n+1){
		ii=1;
		_displayRad = _displayRad - Math.PI;
		//jj=0;
	}
	if(ii<=0){
		ii=n;
		_displayRad = _displayRad + Math.PI;
	}
	
	
	num = ii.toString();

    if (num.length == 1) {
	    num = '00' + num;
    } else if (num.length == 2) {
	    num = '0' + num;
    }			
	//dataImgs = imagesDirS[0] + num + imagesDirS[1];
	//document.getElementById("radian").setAttribute("rotation", " 0 1 0 " + (Math.PI/n)*jj); 
	//document.getElementById("image3D1").setAttribute("url",dataImgs);
	//document.getElementById("image3D2").setAttribute("url",dataImgs);	
	
	_displayRadImage = imagesDirS[0] + num + imagesDirS[1];		
	_displayRad -= Math.PI/n;		
	document.getElementById("image3D1").setAttribute("url", _defaultRadImage);
	document.getElementById("image3D2").setAttribute("url",_defaultRadImage);
}

function loadCSS(){
	var handlerBall = document.getElementById('croppingHandlerBall');
	if(handlerBall){
		//Mod start (20151127 DoanNP) Modify for SubVolume function/
                ballShift = parseFloat(x3dom.getStyle(handlerBall, "height"));
		//Mod end/
		var new_size_handler =  parseFloat(x3dom.getStyle(handlerBall, "width"));
		_default_color_handler =  x3dom.getStyle(handlerBall, "color");

		setCSSHandlerBall(new_size_handler, _default_color_handler);
	}
}

var node; // use in x3dom-full.js line 41375
var backGeo; // use in x3dom-full.js line 41268
var translationVolume = new x3dom.fields.SFVec3f(0,0,0); // use in x3dom-full.js line 41161
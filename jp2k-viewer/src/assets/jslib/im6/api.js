/** 
 * @Function isEnableWebGL
 * @Description API check webGL
 * @author DucHT
 * @Since 4:15 PM 12/30/2013
 * @return  1 : if webGL enabled
 *			0 : if  webGL disabled
 */

function isEnableWebGL() {
    var canvas = document.createElement('canvas');
    var validContextNames = ['moz-webgl', 'webkit-3d', 'experimental-webgl', 'webgl'];

    var ctx = null;
    // Context creation params
    var ctxAttribs = {
        alpha: true,
        depth: true,
        stencil: true,
        antialias: true,
        premultipliedAlpha: false,
        preserveDrawingBuffer: true
    };

    for (var i = 0; i < validContextNames.length; i++) {
        try {
            ctx = canvas.getContext(validContextNames[i], ctxAttribs);
            if (ctx) {
                try {
                    var webglVersion = parseFloat(ctx.getParameter(ctx.VERSION).match(/\d+\.\d+/)[0]);
                    if (webglVersion >= 1.0)   return true;
                    
                } catch (ex) {}

                return false;
            }
        } catch (e) {}
    }
    return false;
}

/** 
 * @Function getParams
 * @Description API getParams
 * @author HuyL4
 * @Since 10:37 AM 11/13/2013
 * @return input parameter (JSON format)
 */
function getParams(){
		obj3D = new Object();
		obj3D.scanMode = _scanMode;
		obj3D.realScanLength1  = _realScanLength1;
		obj3D.realScanLength2 = _realScanLength2;
		obj3D.imageWidth = _imageWidth;
		obj3D.imageHeight = _imageHeight;
		obj3D.imageBrightnessMax = _imageBrightnessMax;
		obj3D.imageBrightnessMin = _imageBrightnessMin;
		obj3D.zResolution = _zResolution;
		obj3D.displayRatio = _displayRatio;
		obj3D.imageFileDirectory = _imageFileDirectory;
		obj3D.imageNum = _imageNum;
		obj3D.imageFormat = _imageFormat;
		obj3D.eye = _eye;
		var jsonString = JSON.stringify(obj3D);
		return jsonString;
} 
function readJson() {
	JSON.parse(obj3D.scanMode);
	JSON.parse(obj3D.realScanLength1);
	JSON.parse(obj3D.realScanLength2);
	JSON.parse(obj3D.imageWidth);
	JSON.parse(obj3D.imageHeight);
	JSON.parse(obj3D.imageBrightnessMax);
	JSON.parse(obj3D.imageBrightnessMin);
	JSON.parse(obj3D.zResolution);
	JSON.parse(obj3D.displayRatio);
	JSON.parse('"obj3D.imageFileDirectory"');
	JSON.parse(obj3D.imageNum);
	JSON.parse(obj3D.imageFormat);
	JSON.parse(obj3D.eye);	
}

/** 
 * @Function setImageBrightness
 * @Description API setImageBrightness
 * @author KienVT4
 * @Since 4:15 PM 12/30/2013
 * @return  true : success
 *			false : fail
 */
function setImageBrightness(minBrightness, maxBrightness){
	try{
		if(!validBrightness(parseInt(minBrightness),parseInt(maxBrightness)))
			return false;
		_imageBrightnessMin = parseInt(minBrightness);
		_imageBrightnessMax = parseInt(maxBrightness);
		//If radian mode: Lut for 1 slice.
		if(3 === parseFloat(_scanMode)){		
			document.getElementById("image3D1").setAttribute("url", _defaultRadImage);
			document.getElementById("image3D2").setAttribute("url", _defaultRadImage);
			return true;
		} else {
			//Lut for 3D volume
			switch(displayingLut){
				case 0:
					//Lut Color
					resizeLutArray(lutColorData);
					break;
				case 1:
					//Lut Gray
					resizeLutArray(lutGrayData);
					break;
				case 2:
					//Lut Invert
					resizeLutArray(lutInvertData);
					break;
				default:
					return false;
				}
			return true;
		}
	} catch (err) {
		return false;
	}
}

/** 
 * @Function validBrightness
 * @Description function validBrightness
 * @author KienVT4
 * @Since 4:15 PM 12/30/2013
 * @return  true : success
 *			fail : fail
 */
function validBrightness(min,max){
	if(min > max || min < 0 || max > 65535 || isNaN(min) || isNaN(max))
		return false;
	return true;
}

/** 
 * @Function getViewImageNum
 * @Description API getViewImageNum
 * @author KienVT4
 * @Since 4:15 PM 12/30/2013
 * @return  1 -> n : No. of slides Radian mode
 *			0 : scanmode is 3D volume
 */
function getViewImageNum(){
	switch(_scanMode){
		case 3:
			return ii;
		default:
			return 0;
	}
}

/** 
 * @Function getViewImageNumI
 * @Description API getViewImageNumI
 * @author KienVT4
 * @Since 11:00 AM 10/02/2014
 * @return  1 -> n : distance on cropping
 */
function getViewImageNumI(){
	var num=0;
	if(document.getElementById("3Dbox").getAttribute('render') != 'false'){
		switch(_scanMode){
			case 2:
				var z2 = parseFloat(document.getElementById("style").getAttribute('z2'));
				if(!isNaN(z2)){
					num = Math.floor((1.00001-z2)*_imageNum + 1);
					num = (_imageNum < num)?_imageNum:num;
				}
				break;
			case 6:
				var x2 = parseFloat(document.getElementById("style").getAttribute('x2'));
				if(!isNaN(x2)){
					num = Math.floor((1.00001-x2)*_imageWidth + 1);
					num = (_imageWidth < num)?_imageWidth:num;
				}
				break;
			default:
				break;
		}
	}
	return num;
}

/** 
 * @Function getViewImageNumS
 * @Description API getViewImageNumS
 * @author KienVT4
 * @Since 11:00 AM 10/02/2014
 * @return  1 -> n : distance on cropping
 */
function getViewImageNumS(){
	var num=0;
	if(document.getElementById("3Dbox").getAttribute('render') != 'false'){
		switch(_scanMode){
			case 2:
				var z1 = parseFloat(document.getElementById("style").getAttribute('z1'));
				if(!isNaN(z1)){
					num = Math.floor((z1 - 0.00001)*_imageNum + 1);
					num = (_imageNum < num)?_imageNum:num;
				}
				break;
			case 6:
				var x1 = parseFloat(document.getElementById("style").getAttribute('x1'));
				if(!isNaN(x1)){
					num = Math.floor((x1 - 0.00001)*_imageWidth + 1);
					num = (_imageWidth < num)?_imageWidth:num;
				}
				break;
			default:
				break;
		}
	}
	return num;
}

/** 
 * @Function getViewImageNumN
 * @Description API getViewImageNumN
 * @author KienVT4
 * @Since 11:00 AM 10/02/2014
 * @return  1 -> n : distance on cropping
 */
function getViewImageNumN(){
	var num=0;
	if(document.getElementById("3Dbox").getAttribute('render') != 'false'){
		switch(_scanMode){
			case 2:
				if(0 == _eye){
					var x2 = parseFloat(document.getElementById("style").getAttribute('x2'));
					if(!isNaN(x2)){
						num = Math.floor((1.00001 - x2)*_imageWidth + 1);
						num = (_imageWidth < num)?_imageWidth:num;
					}
				}else if(1 == _eye){
					var x1 = parseFloat(document.getElementById("style").getAttribute('x1'));
					if(!isNaN(x1)){
						num = Math.floor((x1 - 0.00001)*_imageWidth + 1);
						num = (_imageWidth < num)?_imageWidth:num;
					}
				}
				break;
			case 6:
				if(0 == _eye){
					var z1 = parseFloat(document.getElementById("style").getAttribute('z1'));
					if(!isNaN(z1)){
						num = Math.floor((z1 - 0.00001)*_imageNum + 1);
						num = (_imageNum < num)?_imageNum:num;
					}
				}else if(1 == _eye){
					var z2 = parseFloat(document.getElementById("style").getAttribute('z2'));
					if(!isNaN(z2)){
						num = Math.floor((1.00001 - z2)*_imageNum + 1);
						num = (_imageNum < num)?_imageNum:num;
					}
				}
				break;
			default:
				break;
		}
	}
	return num;
}

/** 
 * @Function getViewImageNumT
 * @Description API getViewImageNumT
 * @author KienVT4
 * @Since 11:00 AM 10/02/2014
 * @return  1 -> n : distance on cropping
 */
function getViewImageNumT(){
	var num=0;
	if(document.getElementById("3Dbox").getAttribute('render') != 'false'){
		switch(_scanMode){
			case 2:
				if(1 == _eye){
					var x2 = parseFloat(document.getElementById("style").getAttribute('x2'));
					if(!isNaN(x2)){
						num = Math.floor((1.00001 - x2)*_imageWidth + 1);
						num = (_imageWidth < num)?_imageWidth:num;
					}
				}else if(0 == _eye){
					var x1 = parseFloat(document.getElementById("style").getAttribute('x1'));
					if(!isNaN(x1)){
						num = Math.floor((x1 - 0.00001)*_imageWidth + 1);
						num = (_imageWidth < num)?_imageWidth:num;
					}
				}
				break;
			case 6:
				if(1 == _eye){
					var z1 = parseFloat(document.getElementById("style").getAttribute('z1'));
					if(!isNaN(z1)){
						num = Math.floor((z1 - 0.00001)*_imageNum + 1);
						num = (_imageNum < num)?_imageNum:num;
					}
				}else if(0 == _eye){
					var z2 = parseFloat(document.getElementById("style").getAttribute('z2'));
					if(!isNaN(z2)){
						num = Math.floor((1.00001 - z2)*_imageNum + 1);
						num = (_imageNum < num)?_imageNum:num;
					}
				}
				break;
			default:
				break;
		}
	}
	return num;
}

/** 
 * @Function getViewImageNumU
 * @Description API getViewImageNumU
 * @author KienVT4
 * @Since 11:00 AM 10/02/2014
 * @return  1 -> n : distance on cropping
 */
function getViewImageNumU(){
	var num=0;
	if(document.getElementById("3Dbox").getAttribute('render') != 'false'){
		var y2 = parseFloat(document.getElementById("style").getAttribute('y2'));
		if(!isNaN(y2)){
			num = Math.floor((1.00001 - y2)*_imageHeight + 1);
			num = (_imageHeight < num)?_imageHeight:num;
		}
	}
	return num;
}

/** 
 * @Function getViewImageNumB
 * @Description API getViewImageNumB
 * @author KienVT4
 * @Since 11:00 AM 10/02/2014
 * @return  1 -> n : distance on cropping
 */
function getViewImageNumB(){
	var num=0;
	if(document.getElementById("3Dbox").getAttribute('render') != 'false'){
		var y1 = parseFloat(document.getElementById("style").getAttribute('y1'));
		if(!isNaN(y1)){
			num = Math.floor((y1 - 0.00001)*_imageHeight + 1);
			num = (_imageHeight < num)?_imageHeight:num;
		}
	}
	return num;
}

/** 
 * @Function changeSteps
 * @Description API public steps
 * @author KienVT4
 * @Since 3:00 PM 02/07/2014
 * @return N/A
 * @TODO change quality of 3D volume base on value of Steps.
 */
function changeSteps(step){
	if(3 != _scanMode){
		var steps = parseFloat(step);
		//validate
		if(isNaN(steps) || 0 >= steps)
			return false;
		steps = (maxSteps < steps)?maxSteps:steps;
		//apply change
		document.getElementById('style').setAttribute('steps', steps);
		return true;
	}
	return false;
}

/** 
 * @Function refresh
 * @Description API refresh
 * @author KienVT4
 * @Since 5:21 PM 01/20/2014
 * @return N/A
 * @TODO reload X3Dom after change input params.
 */
 var canvasRender;
function refresh(){
	if(x3dom.canvases[0]){
		gl = x3dom.canvases[0].gl;
		context3D = x3dom.canvases[0].gl.ctx3d;
		if(context3D){
			for(var index in gl.cache.textures){
				context3D.deleteTexture(gl.cache.textures[index]);
			}
			gl.cache.textures = [];
			for(var index in x3dom.canvases[0].doc._nodeBag.renderTextures){
				var fboBuffer = x3dom.canvases[0].doc._nodeBag.renderTextures[index]._webgl.fbo;
				context3D.deleteFramebuffer(fboBuffer.fbo);
				context3D.deleteRenderbuffer(fboBuffer.rbo);
				context3D.deleteTexture(fboBuffer.tex);
			}
			var fboPick = x3dom.canvases[0].doc._scene._webgl.fboPick;
			context3D.deleteFramebuffer(fboPick.fbo);
			context3D.deleteRenderbuffer(fboPick.rbo);
			context3D.deleteTexture(fboPick.tex);
			
			var webgl = x3dom.canvases[0].doc._scene._webgl;
			context3D.deleteBuffer(webgl.ppBuffer);
			
			for (var shaderId in gl.cache.shaders) {
				var shader = gl.cache.shaders[shaderId];
				var glShaders = context3D.getAttachedShaders(shader.program);
				if(!context3D.getProgramParameter(shader.program, 35712)){
					context3D.useProgram(shader.program);
					
					context3D.deleteProgram(shader.program);
					// for (var i=0; i<glShaders.length; ++i) {
						// //context3D.detachShader(shader.program, glShaders[i])
						// context3D.deleteShader(glShaders[i]);
					// }
					for (var i=0; i<glShaders.length; ++i) {
						context3D.detachShader(shader.program, glShaders[i])
						context3D.deleteShader(glShaders[i]);
					}
					//context3D.deleteProgram(shader.program);
					var b;
				}
			}
			gl.cache.shaders = [];
			
			for(var i in x3dom.nodeTypes.Shape.idMap.nodeID){
				var shape = x3dom.nodeTypes.Shape.idMap.nodeID[i];
				if (shape._cleanupGLObjects)
					shape._cleanupGLObjects(true);
				x3dom.nodeTypes.Shape.idMap.remove(shape);
			}
			//x3dom.canvases[0].doc.render(x3dom.canvases[0].doc.ctx);
		}
		ii=1;
		//jj=0;
		_displayRadImage = "bscan_001";
		_displayRad = 0;	
	//document.getElementById("image3D1").setAttribute("url", _defaultRadImage);
	//document.getElementById("image3D2").setAttribute("url",_defaultRadImage);
		isLoadImage = false;
		//Add start (20151127 DoanNP) Add layerData texture/
        isColorMap = false;
		//Add end/
		iCount = 0;
		cropflg = 0;
		lutColorData = lutGrayData = lutInvertData = undefined;
		window.cancelRequestAnimFrame(animate);
		//purge(document.getElementById("loadX3D").innerHTML );
		document.getElementById("loadX3D").innerHTML = '';
		
// @ADD Start(TOPCON)  20151202
		onStartButton = false;
// @ADD End  (TOPCON)  20151202
	}
	x3dom.reverseLabel = true;
	x3dom.reload();
}


/** 
 * @Function setDisplayRatio
 * @Description API setDisplayRatio
 * @author KienVT4
 * @Since 2:12 PM 02/10/2014
 * @return N/A
 * @TODO change size of 3Dvolume base on ratio.
 */
function setDisplayRatio(ratio){
	//Add start (20151127 DoanNP) Add for Subvolume/
        if("1" === document.getElementById("style").getAttribute("SubVolume"))
        {
            endSubVolume();
        }
	//Add end (20151127 DoanNP)Add for Subvolume/
	//validate ratio
	ratio = parseFloat(ratio);
	if(1 > ratio || 4 < ratio || isNaN(ratio)){
		return false;
	}else{
		//calculate new size
		_imageHeightAdjust = Math.ceil((_imageHeight*ratio)/(_realScanLength1*1000)*_zResolution*_imageWidth);
		_realScanLength3 = _imageHeightAdjust/_imageWidth*_realScanLength1;
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

		var scaleY = _realScanLength3/dy;
		dy = _realScanLength3;
		
		var scale = 10.0 / Math.max(dx,dy,dz);
		dx = dx * scale;
		dy = dy * scale;
		dz = dz * scale;
		
		scaleY = scaleY * scale;
		//Reset all size base on dx, dy, dz.
		//Reset Marker
		setAll();
		checkMarker(_eye);
		
		//[KienVT4] change position of camera to fit 3DVolume -add
		//calculate real length
		var _realX, _realY, _realZ;
		switch(_scanMode){
			case 2:
				_realX = dx;
				_realY = dy;
				_realZ = dz;
				break;
			case 3:
				_realX = dx;
				_realY = dy;
				_realZ = dz;
				break;
			case 6:
				_realX = dz;
				_realY = dy;
				_realZ = dx;
				break;
			default:
				_realX = 10;
				_realY = 10;
				_realZ = 10;
				break;
		}
		
		//calculate new position of camera
		var scale = _realX/_realY;
		if(scale > x3dWidth/x3dHeight){
			scale = (800/x3dWidth)/(10/_realX)/(800/x3dHeight);
		} else {
			scale = (_realY/10);
		}
		newpositionCamera = positionCamera * scale + _realZ/2;
		
		//apply new position
		document.getElementById('camera').setAttribute('position','0 0 '+newpositionCamera);
		//[KienVT4] change position of camera to fit 3DVolume -end
		
		//reset 3Dvolume
		reset();
		
		//back data
		_displayRatio = ratio;
		return true;
	}
}

/** 
 * @Function startColorLut
 * @Description API startColorLut
 * @author KienVT4
 * @Since 5:12 PM 02/10/2014
 * @return N/A
 * @TODO change mode color LUT.
 */
function startColorLut(){
	displayingLut = 0;
	
	if(setImageBrightness(_imageBrightnessMin,_imageBrightnessMax)){
		//change background color
		changeSkyColor(0,0,0);
		return true;
	}else{
		return false;
	}
}

/** 
 * @Function startGrayLut
 * @Description API startGrayLut
 * @author KienVT4
 * @Since 5:12 PM 02/10/2014
 * @return N/A
 * @TODO change mode gray LUT.
 */
function startGrayLut(){
	displayingLut = 1;	
	if(setImageBrightness(_imageBrightnessMin,_imageBrightnessMax)){
		//change background color
		changeSkyColor(0.39216,0.509804,0.78432);
		return true;
	}else{
		return false;
	}
}

/** 
 * @Function startInvertLut
 * @Description API startInvertLut
 * @author KienVT4
 * @Since 5:12 PM 02/10/2014
 * @return N/A
 * @TODO change mode invert LUT.
 */
function startInvertLut(){
	displayingLut = 2;
	if(setImageBrightness(_imageBrightnessMin,_imageBrightnessMax)){
		//change background color
		changeSkyColor(1,1,1);
		return true;
	}else{
		return false;
	}
}

/** 
 * @Function onAnnotation
 * @Description API onAnnotation
 * @author KienVT4
 * @Since 5:12 PM 02/10/2014
 * @return N/A
 * @TODO show marker.
 */
function onAnnotation(){
	document.getElementById("overlay").setAttribute("render", true);           
    document.getElementById("lut").style.visibility = 'visible';
    //Add start (20151127 HieuDD) Add SubVolume on/off annotation/
    //if(1===cropflg)
    var peelV1 = document.getElementById("style").getAttribute("VolPeeling1");
    var peelV2 = document.getElementById("style").getAttribute("VolPeeling2");    
        
	if(1===cropflg || peelV1 == 1 || peelV2 == 1) {
       if(peelV1 == 1 || peelV2 == 1)
           SubVolumePeel = true;
        //Add end /
        document.getElementById("borderCrop").setAttribute("render", true);
    }
	return true;
}

/** 
 * @Function offAnnotation
 * @Description API offAnnotation
 * @author KienVT4
 * @Since 5:12 PM 02/10/2014
 * @return N/A
 * @TODO hide marker.
 */
function offAnnotation(){
	document.getElementById("overlay").setAttribute("render", false);
	document.getElementById("lut").style.visibility = 'hidden';
	document.getElementById("borderCrop").setAttribute("render", false);
	return true;
}

/** 
 * @Function : offCrop
 * @Description : to off crop function
 * @param : none
 * @author : KienVT4
 * @Since : 1:10 AM 12/25/2013
 * @return : void
 */
function offCrop(){
	if(_scanMode != 3 && cropflg == 1){
		document.getElementById("borderCrop").setAttribute("render", false);
		cropflg=0;	
		//Reset Crop value of 3D volume for re-render
		document.getElementById("style").setAttribute('x1', '0.00001'); 
		document.getElementById("style").setAttribute('x2', '1');
		document.getElementById("style").setAttribute('y1', '0.00001');
		document.getElementById("style").setAttribute('y2', '1');
		document.getElementById("style").setAttribute('z1', '0.00001');
		document.getElementById("style").setAttribute('z2', '1');
		//reset size and translation of 3D volume
		if(backGeo != undefined){
			translationVolume = new x3dom.fields.SFVec3f(0,0,0);
			backGeo._vf.size = new x3dom.fields.SFVec3f(dx,dy,dz);
			backGeo.fieldChanged("size");
			node._vf.size = new x3dom.fields.SFVec3f(dx,dy,dz);
			node.fieldChanged("size");
		}
		return true;
	}
	return false;
}

/** 
 * @Function : offCrop
 * @Description : to off crop function
 * @param : none
 * @author : KienVT4
 * @Since : 1:10 AM 12/25/2013
 * @return : void
 */
function onCrop(){
	if(1 !== cropflg && "true"===document.getElementById("overlay").getAttribute("render") && _scanMode != 3){
		document.getElementById("borderCrop").setAttribute("render", true);
		//Mod start (20151207 DoanNP) Add Hide y ball when peeling / 
		document.getElementById("yCrop").setAttribute("render", true);
		cropflg=1;
		var valBall1 = (parseFloat(document.getElementById("ball1").getAttribute("translation").split(" ")[0])  + ballShift + dx/2)/dx + 0.00001;		
		var valBall2 = (parseFloat(document.getElementById("ball2").getAttribute("translation").split(" ")[0])  - ballShift + dx/2)/dx;
		var valBall3 = (parseFloat(document.getElementById("ball4").getAttribute("translation").split(" ")[1])  + ballShift + dy/2)/dy + 0.00001;
		var valBall4 = (parseFloat(document.getElementById("ball3").getAttribute("translation").split(" ")[1])  - ballShift + dy/2)/dy;
		var valBall5 = (parseFloat(document.getElementById("ball5").getAttribute("translation").split(" ")[2])  + ballShift+ dz/2)/dz + 0.00001;
		var valBall6 = (parseFloat(document.getElementById("ball6").getAttribute("translation").split(" ")[2])  - ballShift+ dz/2)/dz;
		//Continue Crop with previous value
		var dx1 = parseFloat(document.getElementById("ball1").getAttribute("translation").split(" ")[0]) + ballShift;
		var dx2 = parseFloat(document.getElementById("ball2").getAttribute("translation").split(" ")[0]) - ballShift;
		var dy1 = parseFloat(document.getElementById("ball4").getAttribute("translation").split(" ")[1])  + ballShift;
		var dy2 = parseFloat(document.getElementById("ball3").getAttribute("translation").split(" ")[1])  - ballShift;
		var dz1 = parseFloat(document.getElementById("ball5").getAttribute("translation").split(" ")[2])  + ballShift;
		var dz2 = parseFloat(document.getElementById("ball6").getAttribute("translation").split(" ")[2])  - ballShift;
		//Mod end / 

		if(dx1 < -dx/2)
			dx1 = -dx/2;
		else if(dx1 > dx/2)
			dx1 = dx/2;
		if(dx2 < -dx/2)
			dx2 = -dx/2;
		else if(dx2 > dx/2)
			dx2 = dx/2;
		if(dy1 < -dy/2)
			dy1 = -dy/2;
		else if(dy1 > dy/2)
			dy1 = dy/2;
		if(dy2 < -dy/2)
			dy2 = -dy/2;
		else if(dy2 > dy/2)
			dy2 = dy/2;
		if(dz1 < -dz/2)
			dz1 = -dz/2;
		else if(dz1 > dz/2)
			dz1 = dz/2;
		if(dz2 < -dz/2)
			dz2 = -dz/2;
		else if(dz2 > dz/2)
			dz2 = dz/2;
		
		var valBall1 = (dx1 + dx/2)/dx+0.00001;		
		var valBall2 = (dx2 + dx/2)/dx+0.00001;
		var valBall3 = (dy1 + dy/2)/dy+0.00001;
		var valBall4 = (dy2 + dy/2)/dy+0.00001;
		var valBall5 = (dz1 + dz/2)/dz+0.00001;
		var valBall6 = (dz2 + dz/2)/dz+0.00001;
		
		// dam bao x1 < x2, y1 < y2, z1 < z2
		if(valBall1 > valBall2) {
			temp = valBall1;
			valBall1 = valBall2;
			valBall2 = temp;
		}
		if(valBall3 > valBall4) {
			temp = valBall4;
			valBall4 = valBall3;
			valBall3 = temp;
		}
		if(valBall5 > valBall6) {
			temp = valBall5;
			valBall5 = valBall6;
			valBall6 = temp;
		}	
		
		document.getElementById("style").setAttribute('x1', valBall1); 
		document.getElementById("style").setAttribute('x2', valBall2);
		document.getElementById("style").setAttribute('y1', valBall3);
		document.getElementById("style").setAttribute('y2', valBall4);
		document.getElementById("style").setAttribute('z1', valBall5);
		document.getElementById("style").setAttribute('z2', valBall6);
		
		//back size and translation of 3D volume
		if(valBall1==valBall2 || valBall3==valBall4 || valBall5==valBall6){
			document.getElementById("3Dbox").setAttribute("render", false);
		}else if(backGeo != undefined){
			translationVolume = new x3dom.fields.SFVec3f((dx1+dx2)/2,(dy1+dy2)/2,(dz1+dz2)/2);
			backGeo._vf.size = new x3dom.fields.SFVec3f(dx*(valBall2-valBall1),dy*(valBall4-valBall3),dz*(valBall6-valBall5));
			backGeo.fieldChanged("size");
			node._vf.size = new x3dom.fields.SFVec3f(dx*(valBall2-valBall1),dy*(valBall4-valBall3),dz*(valBall6-valBall5));
			node.fieldChanged("size");
			document.getElementById("3Dbox").setAttribute("render", true);
		}
		return true;
	}
	return false;
}

/** 
 * @Function RotateLeft
 * @Description API RotateLeft
 * @author KienVT4
 * @Since 5:12 PM 02/10/2014
 * @return N/A
 * @TODO Rotate left in radian mode.
 */
function RotateLeft(){
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

/** 
 * @Function RotateRight
 * @Description API RotateRight
 * @author KienVT4
 * @Since 5:12 PM 02/10/2014
 * @return N/A
 * @TODO Rotate right in radian mode.
 */
function RotateRight(){
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

/** 
 * @Function : reset
 * @Description : reset 3d
 * @author :LinhVn4
 * @Since : 10:00 AM 11/8/2013
 * @return :void
 */
reset = function()
{
	x3dom.canvases[0].doc._viewarea.resetView();	
	if(6===parseFloat(_scanMode)){	
	x3dom.canvases[0].doc._viewarea._rotMat._00 = 0.0;
	x3dom.canvases[0].doc._viewarea._rotMat._01 = 0.0;
	x3dom.canvases[0].doc._viewarea._rotMat._02 = -1.0;
	x3dom.canvases[0].doc._viewarea._rotMat._03 = 0.0;
	x3dom.canvases[0].doc._viewarea._rotMat._10 = 0.0;
	x3dom.canvases[0].doc._viewarea._rotMat._11 = 1.0;
	x3dom.canvases[0].doc._viewarea._rotMat._12 = 0.0;
	x3dom.canvases[0].doc._viewarea._rotMat._13 = 0.0;
	x3dom.canvases[0].doc._viewarea._rotMat._20 = 1.0;;
	x3dom.canvases[0].doc._viewarea._rotMat._21 = 0.0;
	x3dom.canvases[0].doc._viewarea._rotMat._22 = 0.0;
	x3dom.canvases[0].doc._viewarea._rotMat._23 = 0.0;
	x3dom.canvases[0].doc._viewarea._rotMat._30 = 0.0;
	x3dom.canvases[0].doc._viewarea._rotMat._31 = 0.0;
	x3dom.canvases[0].doc._viewarea._rotMat._32 = 0.0;
	x3dom.canvases[0].doc._viewarea._rotMat._33 = 1.0;  
	}
    //Add start (20151127 DoanNP) Add for SubVolume function/
    if("1" === document.getElementById("style").getAttribute("SubVolume"))
    {
        resetCropAndPeeling();
    }
    else{
	
	if(_scanMode != 3)
		resetCrop();
    }
}

function resetPeeling() {    
    //Reset peeling
    resetSubVolumePeeling();
    //Reset position of CropBall
    document.getElementById("ball1").setAttribute(trl, dx/-2  - ballShift+" "+0+" "+0);
    document.getElementById("ball2").setAttribute(trl, dx/2  + ballShift+" "+0+" "+0);
    document.getElementById("ball3").setAttribute(trl, 0+" "+(dy/4  + ballShift)+" "+0);
    document.getElementById("ball4").setAttribute(trl, 0+" "+(dy/-4  - ballShift)+" "+0);
    document.getElementById("ball5").setAttribute(trl, 0+" "+0+" "+(dz/-2 - ballShift));
    document.getElementById("ball6").setAttribute(trl, 0+" "+0+" "+(dz/2  + ballShift));

    document.getElementById("xCrop").setAttribute('translation', '0 0 0');
    document.getElementById("yCrop").setAttribute('translation', '0 0 0');
    document.getElementById("zCrop").setAttribute('translation', '0 0 0');
    //Reset position of remain elements base on CropBall
    setCropValue();    
    if( "false"===document.getElementById("overlay").getAttribute("render")){           
        document.getElementById("borderCrop").setAttribute("render", false);
    }
}


function resetSubVolume() {    
    //Reset peeling
    var peelV1 = document.getElementById("style").getAttribute("VolPeeling1");
    var peelV2 = document.getElementById("style").getAttribute("VolPeeling2");    
    if(peelV1 == 1 || peelV2 == 1)
    {
        resetPeeling();
        peelV1 == 1?onSubVolumePeeling(1):onSubVolumePeeling(2);
    }
    
    //reset SubVolume
    //document.getElementById("style").setAttribute("SubVolume",2.0);
    document.getElementById("style").setAttribute("DspVolume1",1.0);
    document.getElementById("style").setAttribute("DspVolume2",1.0);
    //Add end
}

/** 
 * @Function : saveCanvas
 * @Description :API saveImage 
 * @param : canvas,type,names
 * @author : Linhvn4
 * @Since : 16:00 AM 12/26/2013
 * @return : void
 */
function save(filePath, type){
	var canvas = document.getElementById("x3dom-someUniqueId-canvas");
	var typeCorrect;
	
    var filename = filePath;
    var lnk = document.createElement('a'),e;
	if(type.toUpperCase() =="JPG"){
		typeCorrect="image/jpeg";		
	}else if(type.toUpperCase()=="PNG"){
		typeCorrect="image/png";		
	}else{
	return false;
	}
	var strData = canvas.toDataURL(typeCorrect);	
    lnk.download = filename;
    lnk.href = strData;
    if (document.createEvent) {
        e = document.createEvent("MouseEvents");
        e.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        lnk.dispatchEvent(e);
    } else if (lnk.fireEvent) {
        lnk.fireEvent("onclick");
    }
	return true;
}
/** 
 * @Function : showSubVolume
 * @Description :API show SubVolume
 * @param : number of SubVolume
 * @author : HungNT30
 * @Since : 10:00 AM 2015/11/17
 * @return : void
 */

function showSubVolume(number){
    if("1" === document.getElementById("style").getAttribute("SubVolume"))
    {
        if(1 === number)
        {
            document.getElementById("style").setAttribute("DspVolume1",1);
        }
        else 
        {
            document.getElementById("style").setAttribute("DspVolume2",1);
        }
    }
}
/** 
 * @Function : hidewSubVolume
 * @Description :API hide SubVolume
 * @param : number of SubVolume
 * @author : HungNT30
 * @Since : 10:00 AM 2015/11/17
 * @return : void
 */
function hideSubVolume(number){
    if("1" === document.getElementById("style").getAttribute("SubVolume"))
    {
        if(1 === number)
        {
            document.getElementById("style").setAttribute("DspVolume1",2);
        }
        else 
        {
            document.getElementById("style").setAttribute("DspVolume2",2);
        }
    }
}

/** 
 * @Function setDataLayer
 * @Description API set data of layer
 * @author BangPX
 * @Since 10:00 AM 11/16/2015
 * @return  None
 */
function setLayerData(width, height, data){
    ProcessLayerData(width, height, data);
}

/** 
 * @Function startSubVolume
 * @Description API enable sub volume
 * @author BangPX
 * @Since 10:00 AM 11/16/2015
 * @return None
 */
var onStartButton = false;
function startSubVolume() {
    if (!onStartButton) {
         dy = orgDy * 2;
    
        document.getElementById("style").setAttribute('SubVolume',1.0);      
        if(_scanMode != 3 && cropflg == 1){
            offCrop();
            onSubVolumePeeling(1);
        } else {
            resetSubVolumePeeling();
        }
        onStartButton = true;
        
        document.getElementById("style").setAttribute('y1', '0.00001');
        document.getElementById("style").setAttribute('y2', '1');
        backGeo._vf.size = new x3dom.fields.SFVec3f(dx,dy,dz);
        backGeo.fieldChanged("size");
        node._vf.size = new x3dom.fields.SFVec3f(dx,dy,dz);
        node.fieldChanged("size");
        document.getElementById("3Dbox").setAttribute("render", true);
    }
}

/** 
 * @Function endSubVolume
 * @Description API disable sub volume
 * @author BangPX
 * @Since 10:00 AM 11/16/2015
 * @return  None
 */
function endSubVolume() {
    if(onStartButton){
        offSubVolumeMove(1);
        offSubVolumeMove(2);
        resetSubVolumePeeling();
        //document.getElementById("style").setAttribute("SubVolume", 2.0);

        //offSubVolumePeeling(1);
        //offSubVolumePeeling(2);

        //document.getElementById("style").setAttribute('VolPeeling1', 2);
        //document.getElementById("style").setAttribute('VolPeeling2', 2);

        dy = orgDy;
        document.getElementById("style").setAttribute('y1', '0.00001');
        document.getElementById("style").setAttribute('y2', '1');
        backGeo._vf.size = new x3dom.fields.SFVec3f(dx,dy,dz);
        backGeo.fieldChanged("size");
        node._vf.size = new x3dom.fields.SFVec3f(dx,dy,dz);
        node.fieldChanged("size");
        document.getElementById("3Dbox").setAttribute("render", true);
        onStartButton = false;
    }
    
    //Reset Move
    document.getElementById("style").setAttribute("MoveVolume1",0.00001);
    document.getElementById("style").setAttribute("MoveVolume2",0.00001);
    offSubVolumeMove(1);
    offSubVolumeMove(2); 
    
    //Reset peeling
    var peelV1 = document.getElementById("style").getAttribute("VolPeeling1");
    var peelV2 = document.getElementById("style").getAttribute("VolPeeling2");    
    offSubVolumePeeling(1);
    offSubVolumePeeling(2);
    if(peelV1 == 1 || peelV2 == 1)
    {
        onCrop();
    }    
    
    //reset SubVolume
    document.getElementById("style").setAttribute("SubVolume",2.0);
    document.getElementById("style").setAttribute("DspVolume1",1.0);
    document.getElementById("style").setAttribute("DspVolume2",1.0);
}

// add start: ThangTH /
/** 
 * @Function : onSubVolumeMove
 * @Description :API enable move SubVolume
 * @param : number of SubVolume
 * @author : thangTH
 * @Since : 10:00 AM 2015/11/17
 * @return : void
 */
function onSubVolumeMove(number)
{
    if("1" === document.getElementById("style").getAttribute("SubVolume"))
    {
        if(1 === number)
        {
            document.getElementById("style").setAttribute("SelectVol",1);
        }
        else if(2 === number)
        {
            document.getElementById("style").setAttribute("SelectVol",2);
        }
        else 
        {
            document.getElementById("style").setAttribute("SelectVol",0);
        }
    }
}

function setX3DomDisplayRatio(ratio){
	setDisplayRatio(ratio);
}

function setX3DomColorTypeDefault(colorType) {
	if (colorType === 1) {
		displayingLut = 1;
	}
	else if (colorType === 2) {
		displayingLut = 0;
	}
	else if (colorType === 3) {
		displayingLut = 2;
	}
	else {
		displayingLut = 1;
	}
}

function setX3DomColorType(colorType) {
	if (colorType === 1) {
		startGrayLut();
	}
	else if (colorType === 2) {
		startColorLut();
	}
	else if (colorType === 3) {
		startInvertLut();
	}
	else {
		startGrayLut();
	}
}

/** 
 * @Function : offSubVolumeMove
 * @Description :API disable move SubVolume
 * @param : number of SubVolume
 * @author : ThangTH
 * @Since : 10:00 AM 2015/11/17
 * @return : void
 */
function offSubVolumeMove(number)
{   
    if("1" === document.getElementById("style").getAttribute("SubVolume"))
    {
        if(number === parseInt(document.getElementById("style").getAttribute("SelectVol")))
        {
            document.getElementById("style").setAttribute("SelectVol",0);
        }
    }
}
// add end: ThangTH /

//add start HieuDD: Add Subvolume Peeling API/
/** 
 * @Function : onSubVolumePeeling
 * @Description : Turn SubVolume peeling on
 * @param : number
 * @author : HieuDD
 * @Since : 2015/11/19
 * @return : true: function succeeds, false: function fails
 */
var SubVolumePeel = false;
function onSubVolumePeeling(number)
{
    var isPeelingOn = 2;
    if (1 === number) {                
        isPeeling  = parseFloat(document.getElementById("style").getAttribute("VolPeeling2"));
        if(isPeeling === 1)
        {
            offSubVolumePeeling(2);                    
        }
    }else {                                
        isPeeling  = parseFloat(document.getElementById("style").getAttribute("VolPeeling1"));
        if(isPeeling === 1)
        {
            offSubVolumePeeling(1);                    
        }
    }        
        // Get sub volume on,off state/
        var isSubVolOn = parseFloat(document.getElementById("style").getAttribute("SubVolume"));
 	if( 1.0 == isSubVolOn  && _scanMode !== 3){
            SubVolumePeel = true;            
            //Add start (20151207 DoanNP) Add Hide y ball when peeling /            
            
            var valBall1 = (parseFloat(document.getElementById("ball1").getAttribute("translation").split(" ")[0]));		
            var valBall2 = (parseFloat(document.getElementById("ball2").getAttribute("translation").split(" ")[0]));
            var valxCropX = (parseFloat(document.getElementById("xCrop").getAttribute("translation").split(" ")[0]));
            var valxCropZ = (parseFloat(document.getElementById("xCrop").getAttribute("translation").split(" ")[2]));
            
            
            var valBall5 = (parseFloat(document.getElementById("ball5").getAttribute("translation").split(" ")[2]));
            var valBall6 = (parseFloat(document.getElementById("ball6").getAttribute("translation").split(" ")[2]));
            var valzCropX = (parseFloat(document.getElementById("zCrop").getAttribute("translation").split(" ")[0]));
            var valzCropZ = (parseFloat(document.getElementById("zCrop").getAttribute("translation").split(" ")[2]));

            //Reset position of CropBall
            document.getElementById("ball1").setAttribute(trl, valBall1+" "+0+" "+0);
            document.getElementById("ball2").setAttribute(trl, valBall2+" "+0+" "+0);
            document.getElementById("ball3").setAttribute(trl, 0+" "+(dy/4 + ballShift)+" "+0);
            document.getElementById("ball4").setAttribute(trl, 0+" "+(dy/-4 - ballShift)+" "+0);
            document.getElementById("ball5").setAttribute(trl, 0+" "+0+" "+valBall5);
            document.getElementById("ball6").setAttribute(trl, 0+" "+0+" "+valBall6);
            document.getElementById("xCrop").setAttribute('translation', valxCropX + ' 0 ' + valxCropZ);            
            document.getElementById("zCrop").setAttribute('translation', valzCropX + ' 0 '+valzCropZ);
            //Reset position of remain elements base on CropBall
            document.getElementById("yCrop").setAttribute("render", false);
            document.getElementById("borderCrop").setAttribute("render", true);
            setCropValue();           
            //Add end/
            if (1 === number) {
                document.getElementById("style").setAttribute('VolPeeling1', 1);
                document.getElementById("style").setAttribute('VolPeeling2', 2);
            }
            else {
                document.getElementById("style").setAttribute('VolPeeling1', 2);
                document.getElementById("style").setAttribute('VolPeeling2', 1);
            }
            // Get ball position based on mouse drag/
            setCropHandlerPos();
            return true;
	}
	return false;
}

/** 
 * @Function : offSubVolumePeeling
 * @Description : Turn SubVolume peeling off
 * @param : number
 * @author : HieuDD
 * @Since : 2015/11/19
 * @return : true: function succeeds, false: function fails
 */
function offSubVolumePeeling(number)
{
        // Get sub volume on,off state/
        var volPeelingName = "VolPeeling" + number;
        var isPeelingOn = parseFloat(document.getElementById("style").getAttribute(volPeelingName));
        
        var isSubVolOn = parseFloat(document.getElementById("style").getAttribute("SubVolume"));
    	if( _scanMode !== 3 && isSubVolOn == 1.0 && SubVolumePeel === true){
            //if(isPeelingOn == 1 && _scanMode !== 3 && isSubVolOn == 1.0 && SubVolumePeel === true){
                if (1 === number) {
                    document.getElementById("style").setAttribute('VolPeeling1', 2);                    
                }
                else {
                    document.getElementById("style").setAttribute('VolPeeling2', 2);                    
                }                
                if(isPeelingOn == 1)
                {
                    resetSubVolumePeeling();
                    SubVolumePeel = false;
                    document.getElementById("borderCrop").setAttribute("render", false);
                }
                return true;                
	}
	return false;
}
function resetSubVolumePeeling()
{   
    
                //document.getElementById("borderCrop").setAttribute("render", false);
                //document.getElementById("style").setAttribute('VolPeeling1', 2);
                // document.getElementById("style").setAttribute('VolPeeling2', 2);
       
                //Reset Crop value of 3D volume for re-render
                
                document.getElementById("style").setAttribute('PeelCoorX1', '0.00001'); 
	document.getElementById("style").setAttribute('PeelCoorX2', '1');
//del start (20151207 HuyTN) Delelete Peeling Y
//        document.getElementById("style").setAttribute('PeelCoorY1', '0.00001'); 
//	document.getElementById("style").setAttribute('PeelCoorY2', '1');
//del end (20151207 HuyTN) 
        document.getElementById("style").setAttribute('PeelCoorZ1', '0.00001'); 
	document.getElementById("style").setAttribute('PeelCoorZ2', '1');
		document.getElementById("style").setAttribute('x1', '0.00001'); 
		document.getElementById("style").setAttribute('x2', '1');
		document.getElementById("style").setAttribute('y1', '0.00001');
		document.getElementById("style").setAttribute('y2', '1');
		document.getElementById("style").setAttribute('z1', '0.00001');
		document.getElementById("style").setAttribute('z2', '1');
		//reset size and translation of 3D volume
		if(backGeo != undefined){
			translationVolume = new x3dom.fields.SFVec3f(0,0,0);
			backGeo._vf.size = new x3dom.fields.SFVec3f(dx,dy,dz);
			backGeo.fieldChanged("size");
			node._vf.size = new x3dom.fields.SFVec3f(dx,dy,dz);
			node.fieldChanged("size");
		}
                    
}
/** 
 * @Function : getCropHandlerPos
 * @Description : Get crop handler position
 * @param : none
 * @author : HieuDD
 * @Since : 2015/11/19
 * @return : void
 */
function setCropHandlerPos()
{
        var valBall1 = (parseFloat(document.getElementById("ball1").getAttribute("translation").split(" ")[0])  + ballShift + dx/2)/dx + 0.00001;		
        var valBall2 = (parseFloat(document.getElementById("ball2").getAttribute("translation").split(" ")[0])  - ballShift + dx/2)/dx;
        var valBall3 = (parseFloat(document.getElementById("ball4").getAttribute("translation").split(" ")[1])   + ballShift+ dy/2)/dy + 0.00001;
        var valBall4 = (parseFloat(document.getElementById("ball3").getAttribute("translation").split(" ")[1])   - ballShift+ dy/2)/dy;
        var valBall5 = (parseFloat(document.getElementById("ball5").getAttribute("translation").split(" ")[2])   + ballShift+ dz/2)/dz + 0.00001;
        var valBall6 = (parseFloat(document.getElementById("ball6").getAttribute("translation").split(" ")[2])   - ballShift+ dz/2)/dz;
        //Continue Crop with previous value
        var dx1 = parseFloat(document.getElementById("ball1").getAttribute("translation").split(" ")[0])  + ballShift;
        var dx2 = parseFloat(document.getElementById("ball2").getAttribute("translation").split(" ")[0])  - ballShift;
        var dy1 = parseFloat(document.getElementById("ball4").getAttribute("translation").split(" ")[1])  + ballShift;
        var dy2 = parseFloat(document.getElementById("ball3").getAttribute("translation").split(" ")[1])  - ballShift;
        var dz1 = parseFloat(document.getElementById("ball5").getAttribute("translation").split(" ")[2])  + ballShift;
        var dz2 = parseFloat(document.getElementById("ball6").getAttribute("translation").split(" ")[2])  - ballShift;

        if(dx1 < -dx/2)
                dx1 = -dx/2;
        else if(dx1 > dx/2)
                dx1 = dx/2;
        if(dx2 < -dx/2)
                dx2 = -dx/2;
        else if(dx2 > dx/2)
                dx2 = dx/2;
        if(dy1 < -dy/2)
                dy1 = -dy/2;
        else if(dy1 > dy/2)
                dy1 = dy/2;
        if(dy2 < -dy/2)
                dy2 = -dy/2;
        else if(dy2 > dy/2)
                dy2 = dy/2;
        if(dz1 < -dz/2)
                dz1 = -dz/2;
        else if(dz1 > dz/2)
                dz1 = dz/2;
        if(dz2 < -dz/2)
                dz2 = -dz/2;
        else if(dz2 > dz/2)
                dz2 = dz/2;

        var valBall1 = (dx1 + dx/2)/dx+0.00001;		
        var valBall2 = (dx2 + dx/2)/dx+0.00001;
        var valBall3 = (dy1 + dy/2)/(dy/2)+0.00001;
        var valBall4 = (dy2 + dy/2)/(dy/2)+0.00001;
        var valBall5 = (dz1 + dz/2)/dz+0.00001;
        var valBall6 = (dz2 + dz/2)/dz+0.00001;

        // dam bao x1 < x2, y1 < y2, z1 < z2
        if(valBall1 > valBall2) {
                temp = valBall1;
                valBall1 = valBall2;
                valBall2 = temp;
        }
        if(valBall3 > valBall4) {
                temp = valBall4;
                valBall4 = valBall3;
                valBall3 = temp;
        }
        if(valBall5 > valBall6) {
                temp = valBall5;
                valBall5 = valBall6;
                valBall6 = temp;
        }
        document.getElementById("style").setAttribute('PeelCoorX1', valBall1); 
	document.getElementById("style").setAttribute('PeelCoorX2', valBall2);
//del start (20151207 HuyTN) Delelete Peeling Y
//        document.getElementById("style").setAttribute('PeelCoorY1', valBall3); 
//	document.getElementById("style").setAttribute('PeelCoorY2', valBall4);
//del end (20151207 HuyTN) 
        document.getElementById("style").setAttribute('PeelCoorZ1', valBall5); 
	document.getElementById("style").setAttribute('PeelCoorZ2', valBall6);
	document.getElementById("style").setAttribute('x1', '0.00001'); 
	document.getElementById("style").setAttribute('x2', '1');
//del start (20151207 HuyTN) Delelete Peeling Y
//	document.getElementById("style").setAttribute('y1', '0.00001');
//	document.getElementById("style").setAttribute('y2', '1');
//del end (20151207 HuyTN) 
	document.getElementById("style").setAttribute('z1', '0.00001');
	document.getElementById("style").setAttribute('z2', '1');

        if(backGeo !== undefined){
            translationVolume = new x3dom.fields.SFVec3f(0,0,0);
            backGeo._vf.size = new x3dom.fields.SFVec3f(dx,dy,dz);
            backGeo.fieldChanged("size");
            node._vf.size = new x3dom.fields.SFVec3f(dx,dy,dz);
            node.fieldChanged("size");
            document.getElementById("3Dbox").setAttribute("render", true);
        }
}
// add end /

//Add start (20151221 DoanNP) reset Crop and Peeling function/
/** 
 * @Function : resetCropAndPeeling
 * @Description : reset Crop and Peeling
 * @author :DoanNP
 * @Since : 21/12/2015
 * @return :void
 */
function resetCropAndPeeling()
{    
    if("1" === document.getElementById("style").getAttribute("SubVolume"))
    {
        //Reset peeling
        resetPeeling();
    }
    else{
	
	if(_scanMode != 3)
		resetCrop();
    }
}
//Add end//
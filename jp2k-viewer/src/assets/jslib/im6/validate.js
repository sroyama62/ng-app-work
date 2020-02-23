/** 
 * @Function checkLocal
 * @Description Check path
 * @author HuyL4
 * @Since 10:37 AM 11/13/2013
 * @return void
 */
function checkLocal() {
    var path = _imageFileDirectory;
    checkAbsolute(path);
}

function UrlExists(url)
{
	try{
		var http = new XMLHttpRequest();
		http.open('GET', url, false);
		http.onerror = function(){
			displayError('-3');
		}
		http.onreadystatechange = function(){
			if(this.readyState == 4){
				var buffer = (this.mozResponseArrayBuffer || this.mozResponse ||
						  this.responseArrayBuffer || this.response);
				if (buffer == null || buffer == '' || this.status == 404)
					displayError('-3');
			}
		}
		http.send(null);
	}catch(e){
		displayError('-3');
	}
}

/** 
 * @Function convertURL
 * @Description Convert address URL
 * @param URL
 * @author HuyL4
 * @Since 10:37 AM 11/13/2013
 * @return path
 */
function convertURL(URL) {
    var link = document.createElement("a");
    link.href = URL;
    var path = link.protocol + "//" + link.host + link.pathname + link.search + link.hash;
    if (path.indexOf("%20")) {
        path = path.replace(/%20/g, " ");
        return path;
    } else {
        return path;
    }
}
/** 
 * @Function checkAbsolute
 * @Description Check data Input local path
 * @param URL
 * @author  HuyL4
 * @Since  10:37 AM 11/13/2013
 * @return void
 */
function checkAbsolute(URL) {
    /*Check Absolute, Relative path*/
    if (URL.startsWith(".") || URL.startsWith("/") == false) {
        checkIfRemoteFileExists(convertURL(URL));
    }
    /*Absolute path*/
    else {
        checkIfRemoteFileExists(convertURL(URL));
    }
}
/** 
 * @Function checkNetwork
 * @Description  Check path Network
 * @param URL
 * @author HuyL4
 * @Since 10:37 AM 11/13/2013
 * @return void
 */
function checkNetwork(URL) {
    if (URL.startsWith(".")) {
        fileToCheck = convertURL(URL);
        if (!fileToCheck.startsWith("http")) {
            checkIfRemoteFileExists(URL);
        }
    }
}
/** 
 * @Function CheckUnc
 * @Description Check LAN path
 * @param URL
 * @author HuyL4
 * @Since 10:37 AM 11/13/2013
 * @return void
 */
function checkUnc(URL) {
    if (URL.startsWith(".")) {
        convertURL(URL);
    } else {
        checkIfRemoteFileExists(URL);
    }
}

/** 
 * @Function checkIfRemoteFileExists
 * @Description Check Exit file in path
 * @param fileToCheck
 * @author HuyL4
 * @Since 10:37 AM 11/13/2013
 * @return true
 */
function checkIfRemoteFileExists(fileToCheck) {
    var tmp = new Image;
    var error = "-3";
    tmp.src = fileToCheck;
    if (tmp.complete) {
	   
		tmp = null;//[03.25.2014] DucHT - Fix bug memory leak 
	
        return true;
    } else {
        displayError(error);
    }
}
/** 
 * @Function is_valid_integer
 * @Description Check integer number
 * @author HuyL4
 * @Since 10:37 AM 11/13/2013
 * @return false
 */
function is_valid_integer(paramInt) {
    // var error = "-2";
    // var reg = /^[0-9]+$/;
    // return reg.test(paramInt);
	var floatNum = parseFloat(paramInt);
	return Math.floor(floatNum)===floatNum;
}
/** 
 * @Function displayError
 * @Description display error
 * @param error
 * @author HuyL4
 * @Since 10:37 AM 11/13/2013
 * @return false
 */
function displayError(error) {
	//document.body.innerHTML = "<div style='width:200px;height: 20px; margin: auto;margin-top: 20px;text-align: center;border: 1px solid;padding:15px 10px; background-repeat: no-repeat; background-position: 10px center;-moz-border-radius:.5em;-webkit-border-radius:.5em;border-radius:.5em; color: #D8000C; background-color: #FFBABA;'>"+ error +"</div>";
    return false;
}

//DuyPhuc++
function imgrad(arrdata, displaymode, maxbr, minbr, imgWidth, imgHeight)
{
	this.data=arrdata;
	this.mode=displaymode;
	this.max=maxbr;
	this.min=minbr;
	this.width=imgWidth;
	this.height=imgHeight;
}
//DuyPhuc--

/** 
 * @Function validation
 * @Description validate input value
 * @author HuyL4
 * @Since  10:37 AM 11/13/2013
 * @return true
 */
 
var _scanMode;
var _realScanLength1;
var _realScanLength2;
var _realScanLength3;
var _imageWidth;
var _imageHeight;
var _imageBrightnessMax;
var _imageBrightnessMin;
var _zResolution;
var _displayRatio;
var _imageFileDirectory;
var _imageNum;
var _imageFormat;
var _eye;
var _radiusBall;
var _imageHeightAdjust;
//DuyPhuc++
//var _rawTextureArr = new Array();
var rawLoaded;
//DuyPhuc--

//DuyPhuc++
var _rawTextureHash = [];
var _defaultRadImage = 'bscan_001';
var _displayRadImage = _defaultRadImage;
var _displayRad = 0;
var _radFileName = 'bscan';
//DuyPhuc--
function validation(){
	var error1 = "-1";
    var error2 = "-2";
	var error3 = "-3";
    /* define variable */
	_scanMode = document.getElementById("scanMode");	
    _realScanLength1 = document.getElementById("realScanLength1");
    _realScanLength2 = document.getElementById("realScanLength2");
    _imageWidth = document.getElementById("imageWidth");
    _imageHeight = document.getElementById("imageHeight");
    _imageBrightnessMax = document.getElementById("imageBrightnessMax");
    _imageBrightnessMin = document.getElementById("imageBrightnessMin");
    _zResolution = document.getElementById("zResolution");
    _displayRatio = document.getElementById("displayRatio");
    _imageFileDirectory = document.getElementById("imageFileDirectory");
    _imageNum = document.getElementById("imageNum");
    _imageFormat = document.getElementById("imageFormat");
    _eye = document.getElementById("eye");
    
	if( null==_scanMode || null==_realScanLength1 || null==_realScanLength2 || null==_imageWidth || null==_imageHeight || null==_imageBrightnessMax || null==_imageBrightnessMin || null==_zResolution || null==_displayRatio || null==_imageFileDirectory || null==_imageNum || null==_imageFormat || null==_eye){
		displayError(error1);	
	}else{
		_scanMode = _scanMode.innerHTML;
		_realScanLength1 = _realScanLength1.innerHTML;
		_realScanLength2 = _realScanLength2.innerHTML;
		_imageWidth = _imageWidth.innerHTML;
		_imageHeight = _imageHeight.innerHTML;
		_imageBrightnessMax = _imageBrightnessMax.innerHTML;
		_imageBrightnessMin = _imageBrightnessMin.innerHTML;
		_zResolution = _zResolution.innerHTML;
		_displayRatio = _displayRatio.innerHTML;
		_imageFileDirectory = _imageFileDirectory.innerHTML;
		_imageNum = _imageNum.innerHTML;
		_imageFormat = _imageFormat.innerHTML;
		_eye = _eye.innerHTML;
		
		
		/* Check data input*/
		// isNaN(_imageBrightnessMax)
		if ("" === _scanMode || "" === _realScanLength1 || "" === _realScanLength2 || "" === _imageWidth || "" === _imageHeight || ""===_imageBrightnessMax || "" ===_imageBrightnessMin || "" === _zResolution || "" === _displayRatio || "" === _imageFileDirectory || "" ===_imageNum || "" ===  _imageFormat || "" === _eye) {
			document.getElementById("dataSet")
				.className = "hiddenForm";
			displayError(error1);
		}else{
			_scanMode = parseFloat(_scanMode);
			_realScanLength1 = parseFloat(_realScanLength1);
			_realScanLength2 = parseFloat(_realScanLength2);
			// _imageWidth = _imageWidth;
			// _imageHeight = _imageHeight;
			_imageBrightnessMax = parseFloat(_imageBrightnessMax);
			_imageBrightnessMin = parseFloat(_imageBrightnessMin);
			_zResolution = parseFloat(_zResolution);
			_displayRatio = parseFloat(_displayRatio);
			_imageFileDirectory = _imageFileDirectory;
			// _imageNum = _imageNum;
			_imageFormat = parseFloat(_imageFormat);
			_eye = parseFloat(_eye);
			
			if(
					//scan mode Scanlength
					(2 != _scanMode && 6 != _scanMode && 3 != _scanMode) ||
					//Scanlength
					(3 == _scanMode && 0 != _realScanLength2) || (0 == _realScanLength2 && 3 != _scanMode) ||
					(isNaN(_realScanLength1) || isNaN(_realScanLength2) || _realScanLength1 <=0 || _realScanLength2 < 0) ||
					//Brightness
					(isNaN(_imageBrightnessMax) || isNaN(_imageBrightnessMin) || _imageBrightnessMin < 0 || _imageBrightnessMax > 65535 || _imageBrightnessMax < _imageBrightnessMin) ||
					//zResolutions
					(isNaN(_zResolution) || 0.0 >= _zResolution) ||
					//displayRatio
					(1 > _displayRatio || 4 < _displayRatio || isNaN(_displayRatio)) ||
					//imageNum
					(parseFloat(_imageNum) <= 0.0 || isNaN(parseFloat(_imageNum)) || !is_valid_integer(_imageNum)) ||
					//imageWidth
					(parseFloat(_imageWidth) <= 0.0 || isNaN(parseFloat(_imageWidth)) || !is_valid_integer(_imageWidth)) ||
					//imageHeight
					(parseFloat(_imageHeight) <= 0.0 || isNaN(parseFloat(_imageHeight)) || !is_valid_integer(_imageHeight)) ||
					//typeImage
					(0 != _imageFormat && 1 != _imageFormat) ||
					//eye
					(1 != _eye && 0 != _eye)
				){ 
			
			displayError(error2);		

			} else {
				//validate directory
				var baseData = octview.work.base;
				var db = baseData.dataBase;
				var ext = '';
				if (_imageFormat === 0) {
					ext = 'raw';
				} else if (_imageFormat === 1) {
					ext = db.bscanExt;
				}
				UrlExists(_imageFileDirectory+'/bscan_001.'+ext + '?' + Math.random() * 9999);
			}
		}
		//Set some remain value
		_imageHeightAdjust = Math.ceil((_imageHeight*_displayRatio)/(_realScanLength1*1000)*_zResolution*_imageWidth);
		_realScanLength3 = _imageHeightAdjust/_imageWidth*_realScanLength1;
	}    
	jsonObject();
}
/** 
 * @Function jsonObject
 * @Description variable json object
 * @author HuyL4
 * @Since 10:37 AM 11/13/2013
 * @return true
 */
function jsonObject(){
		obj3D = new Object();
		obj3D.scanMode = _scanMode;
		obj3D.realScanLength1  = _realScanLength1;
		obj3D.realScanLength2 = _realScanLength2;
		obj3D.imageWidth = _imageWidth;
		obj3D.imageHeight = _imageHeight;
		obj3D.imageBrightnessMax = parseFloat(_imageBrightnessMax);
		obj3D.imageBrightnessMin = parseFloat(_imageBrightnessMin);
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

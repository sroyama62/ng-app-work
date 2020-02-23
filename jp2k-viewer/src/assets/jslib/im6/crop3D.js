	var onCroping = false;
	var _onclick_color_handler = 'rgb(255,0,0)';
	var _default_color_handler = 'rgb(255,255,255)';
	var _current_color_handler = _default_color_handler;
	// /** 
	 // * @Function : changeColor
	 // * @Description : change style handle control when hover
	 // * @param : tagId, r, g, b
	 // * @author : SyTQ
	 // * @Since : 14:08 PM 11/20/2013
	 // * @return : void
	 // */
	// function changeColor(tagId, r, g, b) {		
		// var id = 'mate' + tagId;			
		// var color = r + ' ' + g + ' ' + b;		
		// document.getElementById(id).setAttribute('diffuseColor', color);		
	// }	
	
	// /** 
	 // * @Function : start
	 // * @Description : override start method of moveable class
	 // * @param : none
	 // * @author : SyTQ
	 // * @Since : 14:08 PM 11/20/2013
	 // * @return : void
	 // */
    // function start() {
        // if (!drag) {
            // drag = true;			
        // }
    // }  
	
	/** 
	 * @Function : moveBox
	 * @Description : move object in x3dom
	 * @param : tagId
	 * @author : SyTQ
	 * @Since : 14:08 PM 11/20/2013
	 * @return : void
	 */
	function moveBox(tagId) {
		if(onCroping)
			return;
        var redBox = document.getElementById(tagId);			
        var x3dId = document.getElementById('someUniqueId');	
        // Moveable wrapper requires x3dom-full.js, its signature is:
        // x3dom.Moveable(x3domElement, transformNode, callback, snapToGridSize)
        new x3dom.Moveable(x3dId, redBox, calBack, 0,"");
		onCroping = true;
    }
	var calBack = function(){}
	
	/** 
	 * @Function : redrawAxis
	 * @Description : redraw axis in cube
	 * @param : ball, translation
	 * @author : KienVT4
	 * @Since : 14:08 PM 11/20/2013
	 * @return : void
	 */
	function redrawAxis(ball, translation) {
		if ('ball1' === ball.getAttribute('id')) {			
			var axis = document.getElementById("Xaxis");
			var points = axis.getAttribute("point").split(" ");
			axis.setAttribute("point", translation.toString() + " " + points[3] + " " + points[4] + " " + points[5]);
			x = (translation.x + parseFloat(document.getElementById("ball2").getAttribute("translation").split(" ")[0]))/2;
			yy = document.getElementById("yCrop").getAttribute("translation").split(" ")[1];
			zy = document.getElementById("yCrop").getAttribute("translation").split(" ")[2];
			yz = document.getElementById("zCrop").getAttribute("translation").split(" ")[1];
			zz = document.getElementById("zCrop").getAttribute("translation").split(" ")[2];
			document.getElementById("yCrop").setAttribute("translation", x + " " + yy + " " + zy);
			document.getElementById("zCrop").setAttribute("translation", x + " " + yz + " " + zz);
		} else if ('ball2' === ball.getAttribute('id')){
			var axis = document.getElementById("Xaxis");
			var points = axis.getAttribute("point").split(" ");
			axis.setAttribute("point", points[0] + " " + points[1] + " " + points[2] + " " + translation.toString());
			x = (translation.x + parseFloat(document.getElementById("ball1").getAttribute("translation").split(" ")[0]))/2;
			yy = document.getElementById("yCrop").getAttribute("translation").split(" ")[1];
			zy = document.getElementById("yCrop").getAttribute("translation").split(" ")[2];
			yz = document.getElementById("zCrop").getAttribute("translation").split(" ")[1];
			zz = document.getElementById("zCrop").getAttribute("translation").split(" ")[2];
			document.getElementById("yCrop").setAttribute("translation", x + " " + yy + " " + zy);
			document.getElementById("zCrop").setAttribute("translation", x + " " + yz + " " + zz);
		} else if ('ball4' === ball.getAttribute('id')){
			var axis = document.getElementById("Yaxis");
			var points = axis.getAttribute("point").split(" ");
			axis.setAttribute("point", translation.toString() + " " + points[3] + " " + points[4] + " " + points[5]);
			y = (translation.y + parseFloat(document.getElementById("ball3").getAttribute("translation").split(" ")[1]))/2;
			xx = document.getElementById("xCrop").getAttribute("translation").split(" ")[0];
			zx = document.getElementById("xCrop").getAttribute("translation").split(" ")[2];
			xz = document.getElementById("zCrop").getAttribute("translation").split(" ")[0];
			zz = document.getElementById("zCrop").getAttribute("translation").split(" ")[2];
			document.getElementById("xCrop").setAttribute("translation", xx + " " + y + " " + zx);
			document.getElementById("zCrop").setAttribute("translation", xz + " " + y + " " + zz);
		} else if ('ball3' === ball.getAttribute('id')){
			var axis = document.getElementById("Yaxis");
			var points = axis.getAttribute("point").split(" ");
			axis.setAttribute("point", points[0] + " " + points[1] + " " + points[2] + " " + translation.toString());
			y = (translation.y + parseFloat(document.getElementById("ball4").getAttribute("translation").split(" ")[1]))/2;
			xx = document.getElementById("xCrop").getAttribute("translation").split(" ")[0];
			zx = document.getElementById("xCrop").getAttribute("translation").split(" ")[2];
			xz = document.getElementById("zCrop").getAttribute("translation").split(" ")[0];
			zz = document.getElementById("zCrop").getAttribute("translation").split(" ")[2];
			document.getElementById("xCrop").setAttribute("translation", xx + " " + y + " " + zx);
			document.getElementById("zCrop").setAttribute("translation", xz + " " + y + " " + zz);
		} else if ('ball5' === ball.getAttribute('id')){
			var axis = document.getElementById("Zaxis");
			var points = axis.getAttribute("point").split(" ");
			axis.setAttribute("point", translation.toString() + " " + points[3] + " " + points[4] + " " + points[5]);
			z = (translation.z + parseFloat(document.getElementById("ball6").getAttribute("translation").split(" ")[2]))/2;
			xx = document.getElementById("xCrop").getAttribute("translation").split(" ")[0];
			yx = document.getElementById("xCrop").getAttribute("translation").split(" ")[1];
			xy = document.getElementById("yCrop").getAttribute("translation").split(" ")[0];
			yy = document.getElementById("yCrop").getAttribute("translation").split(" ")[1];
			document.getElementById("xCrop").setAttribute("translation", xx + " " + yx + " " + z);
			document.getElementById("yCrop").setAttribute("translation", xy + " " + yy + " " + z);
		} else if ('ball6' === ball.getAttribute('id')){
			var axis = document.getElementById("Zaxis");
			var points = axis.getAttribute("point").split(" ");
			axis.setAttribute("point", points[0] + " " + points[1] + " " + points[2] + " " + translation.toString());
			z = (translation.z + parseFloat(document.getElementById("ball5").getAttribute("translation").split(" ")[2]))/2;
			xx = document.getElementById("xCrop").getAttribute("translation").split(" ")[0];
			yx = document.getElementById("xCrop").getAttribute("translation").split(" ")[1];
			xy = document.getElementById("yCrop").getAttribute("translation").split(" ")[0];
			yy = document.getElementById("yCrop").getAttribute("translation").split(" ")[1];
			document.getElementById("xCrop").setAttribute("translation", xx + " " + yx + " " + z);
			document.getElementById("yCrop").setAttribute("translation", xy + " " + yy + " " + z);
		}
		drawCropCube (ball.getAttribute('id'));		
		// redrawCrop3D		
		var temp;
		//Mod start (20151127 DoanNP) Modify for SubVolume function/
		var dx1 = parseFloat(document.getElementById("ball1").getAttribute("translation").split(" ")[0])  + ballShift;
		var dx2 = parseFloat(document.getElementById("ball2").getAttribute("translation").split(" ")[0])  - ballShift;
		var dy1 = parseFloat(document.getElementById("ball4").getAttribute("translation").split(" ")[1]) + ballShift;
		var dy2 = parseFloat(document.getElementById("ball3").getAttribute("translation").split(" ")[1]) - ballShift;
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
        //Mod start (20151126 ToanDN3) Move function/
        //var valBall3 = (dy1 + dy/2)/dy+0.00001;
        //var valBall4 = (dy2 + dy/2)/dy+0.00001;
        if (SubVolumePeel === true) {
            var valBall3 = (dy1 + dy/2/2)/(dy/2)+0.00001;
            var valBall4 = (dy2 + dy/2/2)/(dy/2)+0.00001;
        }
        else {
            var valBall3 = (dy1 + dy/2)/dy+0.00001;
            var valBall4 = (dy2 + dy/2)/dy+0.00001;
        }
        //Mod end/
		var valBall5 = (dz1 + dz/2)/dz+0.00001;
		var valBall6 = (dz2 + dz/2)/dz+0.00001;
		
		// Make sure that x1 < x2, y1 < y2, z1 < z2
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
		//Mod Start (20151124 ToanDN3) Peeling function/
		//document.getElementById("style").setAttribute('x1', valBall1); 
		//document.getElementById("style").setAttribute('x2', valBall2);
		//document.getElementById("style").setAttribute('y1', valBall3);
		//document.getElementById("style").setAttribute('y2', valBall4);
		//document.getElementById("style").setAttribute('z1', valBall5);
		//document.getElementById("style").setAttribute('z2', valBall6);
        if (SubVolumePeel == true){
            document.getElementById("style").setAttribute('PeelCoorX1', valBall1); 
            document.getElementById("style").setAttribute('PeelCoorX2', valBall2);
//del start (20151207 HuyTN) Delelete Peeling Y
//                    document.getElementById("style").setAttribute('PeelCoorY1', valBall3); 
//                    document.getElementById("style").setAttribute('PeelCoorY2', valBall4);
//del end (20151207 HuyTN) 
            document.getElementById("style").setAttribute('PeelCoorZ1', valBall5); 
            document.getElementById("style").setAttribute('PeelCoorZ2', valBall6);
            document.getElementById("style").setAttribute('x1', '0.00001'); 
            document.getElementById("style").setAttribute('x2', '1');
            document.getElementById("style").setAttribute('y1', '0.0001');
            document.getElementById("style").setAttribute('y2', '1');
            document.getElementById("style").setAttribute('z1', '0.00001');
            document.getElementById("style").setAttribute('z2', '1');
        }
        else
        {
            document.getElementById("style").setAttribute('x1', valBall1); 
            document.getElementById("style").setAttribute('x2', valBall2);
            document.getElementById("style").setAttribute('y1', valBall3);
            document.getElementById("style").setAttribute('y2', valBall4);
            document.getElementById("style").setAttribute('z1', valBall5);
            document.getElementById("style").setAttribute('z2', valBall6);
        }
       //Mod End/
                
		if(valBall1==valBall2 || valBall3==valBall4 || valBall5==valBall6){
             //Mod start (20151124 ToanDN3) Peeling function /
             //document.getElementById("3Dbox").setAttribute("render", false);
             if (SubVolumePeel == false){
                 document.getElementById("3Dbox").setAttribute("render", false);
             }
             //Mod end/
		}else if(backGeo != undefined){
            //Mod Start (20151124 ToanDN3) Peeling function /
            //translationVolume = new x3dom.fields.SFVec3f((dx1+dx2)/2,(dy1+dy2)/2,(dz1+dz2)/2);
			//backGeo._vf.size = new x3dom.fields.SFVec3f(dx*(valBall2-valBall1),dy*(valBall4-valBall3),dz*(valBall6-valBall5));
			//backGeo.fieldChanged("size");
			//node._vf.size = new x3dom.fields.SFVec3f(dx*(valBall2-valBall1),dy*(valBall4-valBall3),dz*(valBall6-valBall5));
			//node.fieldChanged("size");
			//document.getElementById("3Dbox").setAttribute("render", true);
            if (SubVolumePeel == true){
                translationVolume = new x3dom.fields.SFVec3f(0,0,0);
                backGeo._vf.size = new x3dom.fields.SFVec3f(dx,dy,dz);
                backGeo.fieldChanged("size");
                node._vf.size = new x3dom.fields.SFVec3f(dx,dy,dz);
                node.fieldChanged("size");
                document.getElementById("3Dbox").setAttribute("render", true);
            }
            else 
            {
               translationVolume = new x3dom.fields.SFVec3f((dx1+dx2)/2,(dy1+dy2)/2,(dz1+dz2)/2);
				backGeo._vf.size = new x3dom.fields.SFVec3f(dx*(valBall2-valBall1),dy*(valBall4-valBall3),dz*(valBall6-valBall5));
				backGeo.fieldChanged("size");
				node._vf.size = new x3dom.fields.SFVec3f(dx*(valBall2-valBall1),dy*(valBall4-valBall3),dz*(valBall6-valBall5));
				node.fieldChanged("size");
				document.getElementById("3Dbox").setAttribute("render", true);
            }
            //Mod End/
		}
	}
	
	/** 
	 * @Function : drawCropCube
	 * @Description : create box crop
	 * @param : id
	 * @author : KienVT4
	 * @Since : 14:08 PM 11/20/2013
	 * @return : void
	 */
	function drawCropCube (id) {
		var ball = new Array();
		for(i = 0 ; i < 6 ; i++) {
			ball[i] = (new x3dom.fields.SFVec3f).setValueByStr(document.getElementById("ball"+(i+1)).getAttribute("translation"));
		}
		var pointCrop = new Array();
		//Mod start (20151127 DoanNP) Modify for SubVolume function/
		pointCrop[0] = new x3dom.fields.SFVec3f(ball[0].x + ballShift, ball[2].y - ballShift, ball[5].z - ballShift);
		pointCrop[1] = new x3dom.fields.SFVec3f(ball[1].x - ballShift, ball[2].y - ballShift, ball[5].z - ballShift);
		pointCrop[2] = new x3dom.fields.SFVec3f(ball[1].x - ballShift, ball[3].y + ballShift, ball[5].z - ballShift);
		pointCrop[3] = new x3dom.fields.SFVec3f(ball[0].x + ballShift, ball[3].y + ballShift, ball[5].z - ballShift);
		pointCrop[4] = new x3dom.fields.SFVec3f(ball[0].x + ballShift, ball[2].y - ballShift, ball[4].z + ballShift);
		pointCrop[5] = new x3dom.fields.SFVec3f(ball[1].x - ballShift, ball[2].y - ballShift, ball[4].z + ballShift);
		pointCrop[6] = new x3dom.fields.SFVec3f(ball[1].x - ballShift, ball[3].y + ballShift, ball[4].z + ballShift);
		pointCrop[7] = new x3dom.fields.SFVec3f(ball[0].x + ballShift, ball[3].y + ballShift, ball[4].z + ballShift);
		//Mod end/
		var point = "";
		for(i = 0 ; i < 8 ; i++) {
			point += pointCrop[i] + " ";
		}
		document.getElementById("cubeCrop").setAttribute("point",point);
		var facePoint = "";
		if('ball1' === id){
			facePoint = pointCrop[0] + " " + pointCrop[4] + " " + pointCrop[7] + " " + pointCrop[3];
		} else if('ball2' === id){
			facePoint = pointCrop[1] + " " + pointCrop[5] + " " + pointCrop[6] + " " + pointCrop[2];
		} else if('ball3' === id){
			facePoint = pointCrop[0] + " " + pointCrop[1] + " " + pointCrop[5] + " " + pointCrop[4];
		} else if('ball4' === id){
			facePoint = pointCrop[3] + " " + pointCrop[2] + " " + pointCrop[6] + " " + pointCrop[7];
		} else if('ball5' === id){
			facePoint = pointCrop[4] + " " + pointCrop[5] + " " + pointCrop[6] + " " + pointCrop[7];
		} else if('ball6' === id){
			facePoint = pointCrop[0] + " " + pointCrop[1] + " " + pointCrop[2] + " " + pointCrop[3];
		}
		if (document.getElementById("transFaceCrop").getAttribute('render') == 'false') {
			document.getElementById("transFaceCrop").setAttribute('render', 'true');
		}		
		document.getElementById("faceCrop").setAttribute('point', facePoint);
		//[03.25.2014] DucHT - Fix bug memory leak begin
		ball = [];
		ball = undefined;
		pointCrop = [];
		pointCrop = undefined;
		//[03.25.2014] DucHT - Fix bug memory leak end

	}
	
	/** 
	 * @Function : removeFaceCrop
	 * @Description : hide face create effect hover
	 * @param : none
	 * @author : KienVT4
	 * @Since : 14:08 PM 11/20/2013
	 * @return : void
	 */
	function removeFaceCrop() {
		document.getElementById("transFaceCrop").setAttribute('render', 'false');
		x3dom.debug.logInfo("remove face");
	}
	
	/** 
	 * @Function : setCropValue
	 * @Description : Set crop value
	 * @param : none
	 * @author : KienVT4
	 * @Since : 17:00 PM 11/20/2013
	 * @return : void
	 */
	function setCropValue(){
		var ball = new Array();
		for(i = 0 ; i < 6 ; i++) {
			ball[i] = (new x3dom.fields.SFVec3f).setValueByStr(document.getElementById("ball"+(i+1)).getAttribute("translation"));
		}
		document.getElementById("Xaxis").setAttribute("point", ball[0] + " " + ball[1]);
		document.getElementById("Yaxis").setAttribute("point", ball[3] + " " + ball[2]);
		document.getElementById("Zaxis").setAttribute("point", ball[4] + " " + ball[5]);		
		var pointCrop = new Array();
		//Mod start (20151127 DoanNP) Modify for SubVolume function/
//		pointCrop[0] = new x3dom.fields.SFVec3f(ball[0].x, ball[2].y, ball[5].z);
//		pointCrop[1] = new x3dom.fields.SFVec3f(ball[1].x, ball[2].y, ball[5].z);
//		pointCrop[2] = new x3dom.fields.SFVec3f(ball[1].x, ball[3].y, ball[5].z);
//		pointCrop[3] = new x3dom.fields.SFVec3f(ball[0].x, ball[3].y, ball[5].z);
//		pointCrop[4] = new x3dom.fields.SFVec3f(ball[0].x, ball[2].y, ball[4].z);
//		pointCrop[5] = new x3dom.fields.SFVec3f(ball[1].x, ball[2].y, ball[4].z);
//		pointCrop[6] = new x3dom.fields.SFVec3f(ball[1].x, ball[3].y, ball[4].z);
//		pointCrop[7] = new x3dom.fields.SFVec3f(ball[0].x, ball[3].y, ball[4].z);
		pointCrop[0] = new x3dom.fields.SFVec3f(ball[0].x + ballShift, ball[2].y - ballShift, ball[5].z - ballShift);
		pointCrop[1] = new x3dom.fields.SFVec3f(ball[1].x - ballShift, ball[2].y - ballShift, ball[5].z - ballShift);
		pointCrop[2] = new x3dom.fields.SFVec3f(ball[1].x - ballShift, ball[3].y + ballShift, ball[5].z - ballShift);
		pointCrop[3] = new x3dom.fields.SFVec3f(ball[0].x + ballShift, ball[3].y + ballShift, ball[5].z - ballShift);
		pointCrop[4] = new x3dom.fields.SFVec3f(ball[0].x + ballShift, ball[2].y - ballShift, ball[4].z + ballShift);
		pointCrop[5] = new x3dom.fields.SFVec3f(ball[1].x - ballShift, ball[2].y - ballShift, ball[4].z + ballShift);
		pointCrop[6] = new x3dom.fields.SFVec3f(ball[1].x - ballShift, ball[3].y + ballShift, ball[4].z + ballShift);
		pointCrop[7] = new x3dom.fields.SFVec3f(ball[0].x + ballShift, ball[3].y + ballShift, ball[4].z + ballShift);
		//Mod end/
		var point = "";
		for(i = 0 ; i < 8 ; i++) {
			point += pointCrop[i] + " ";
		}
		document.getElementById("cubeCrop").setAttribute("point",point);
		//[03.25.2014] DucHT - Fix bug memory leak begin
		ball = [];
		ball = undefined;
		pointCrop = [];
		pointCrop = undefined;
		//[03.25.2014] DucHT - Fix bug memory leak end
	}
	
	/** 
	 * @Function : resetCrop
	 * @Description : reset all value of Crop function to default
	 * @param : none
	 * @author : KienVT4
	 * @Since : 11:30 AM 12/21/2013
	 * @return : void
	 */
	function resetCrop(){
		//Reset position of CropBall
		document.getElementById("ball1").setAttribute(trl, dx/-2 - ballShift +" "+0+" "+0);
		document.getElementById("ball2").setAttribute(trl, dx/2 + ballShift +" "+0+" "+0);
		document.getElementById("ball3").setAttribute(trl, 0+" "+(dy/2 + ballShift)+" "+0);
		document.getElementById("ball4").setAttribute(trl, 0+" "+(dy/-2 - ballShift)+" "+0);
		document.getElementById("ball5").setAttribute(trl, 0+" "+0+" "+(dz/-2 - ballShift));
		document.getElementById("ball6").setAttribute(trl, 0+" "+0+" "+(dz/2 + ballShift));
		document.getElementById("xCrop").setAttribute('translation', '0 0 0');
		document.getElementById("yCrop").setAttribute('translation', '0 0 0');
		document.getElementById("zCrop").setAttribute('translation', '0 0 0');
		//Reset position of remain elements base on CropBall
		setCropValue();
        //Add start (20151124 ToanDN3) Peeling function/
        //Reset Peeling value
        document.getElementById("style").setAttribute('PeelCoorX1', '0.00001'); 
        document.getElementById("style").setAttribute('PeelCoorX2', '1');
//del start (20151207 HuyTN) Delelete Peeling Y
//                document.getElementById("style").setAttribute('PeelCoorY1', '0.00001'); 
//                document.getElementById("style").setAttribute('PeelCoorY2', '1');
//del end (20151207 HuyTN) 
        document.getElementById("style").setAttribute('PeelCoorZ1', '0.00001'); 
        document.getElementById("style").setAttribute('PeelCoorZ2', '1');
        //Add end/
		//Reset Crop value of 3D volume for re-render
		document.getElementById("style").setAttribute('x1', '0.00001'); 
		document.getElementById("style").setAttribute('x2', '1');
		//Mod start Texture NoneDisplay (20151207)/
        //Add start ToanDN3 (20151124) Peeling function/
        //Mod start (20151124 HuyTN) expand volume size for moving object
		//document.getElementById("style").setAttribute('y1', '0.00001');
        //document.getElementById("style").setAttribute('y1', '-0.5');
		//document.getElementById("style").setAttribute('y2', '1');
        //document.getElementById("style").setAttribute('y2', '1.5');
        //mod end (20151124 HuyTN)/
		//if(1===document.getElementById("style").getAttribute('SubVolume')) {
		//	document.getElementById("style").setAttribute('y1', '0.00001');
		//	document.getElementById("style").setAttribute('y2', '1');
		//}
		//else {
		//	document.getElementById("style").setAttribute('y1', '0.00001');
		//	document.getElementById("style").setAttribute('y2', '1');
		//}
		//Add end/
		document.getElementById("style").setAttribute('y1', '0.00001');
		document.getElementById("style").setAttribute('y2', '1');
		//Mod end Texture NoneDisplay (20151207)/
		document.getElementById("style").setAttribute('z1', '0.00001');
		document.getElementById("style").setAttribute('z2', '1');
		//reset size and translation of 3D volume
		if(backGeo != undefined){
			translationVolume = new x3dom.fields.SFVec3f(0,0,0);
			backGeo._vf.size = new x3dom.fields.SFVec3f(dx,dy,dz);
			backGeo.fieldChanged("size");
			node._vf.size = new x3dom.fields.SFVec3f(dx,dy,dz);
			node.fieldChanged("size");
			document.getElementById("3Dbox").setAttribute("render", true);
		}
	}
	
	function setCSSHandlerBall(size, colorStr){
		var colorArray = colorStr.split(/[(),]+/);

		for(i = 1; i < 7 ; i++){
			document.getElementById('mateball'+i).setAttribute('diffuseColor',RGB2Color(colorArray[1], colorArray[2], colorArray[3]));
			document.getElementById('radiusball'+i).setAttribute('radius',size/10);
		}
		
	}
	
	function setColorHandlerBall(id,colorStr){
		if(colorStr != _current_color_handler){
			_current_color_handler = colorStr;
			var colorArray = colorStr.split(/[(),]+/);
			
			document.getElementById('mate'+id).setAttribute('diffuseColor',RGB2Color(colorArray[1], colorArray[2], colorArray[3]));
		}
	}
	
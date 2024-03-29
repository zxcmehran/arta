/* Fisheye Menu v1.0 
   Written by Marc Grabanski (m@marcgrabanski.com)

   Copyright (c) 2007 Marc Grabanski (http://marcgrabanski.com/code/fisheye-menu)
   Dual licensed under the GPL (http://www.gnu.org/licenses/gpl-3.0.txt) and 
   CC (http://creativecommons.org/licenses/by/3.0/) licenses. "Share or Remix it but please Attribute the authors."
   Date: 10-05-2007  */

var fisheyemenu = {
	startSize : 32,
	endSize :64,
	imgType : ".png",
	init : function (idname) {
		var animElements = document.getElementById(idname).getElementsByTagName("img");
		var titleElements = document.getElementById(idname).getElementsByTagName("span");
		for(var j=0; j<titleElements.length; j++) {
			if(Element.readAttribute(titleElements[j],'class')!=='tooltip_text'){
					titleElements[j].style.display = 'none';
					titleElements[j].onmouseover=restoreSize;
			}
		}
		for(var i=0; i<animElements.length; i++) {
			var y = animElements[i];
			y.style.width = fisheyemenu.startSize+'px';
			y.style.height = fisheyemenu.startSize+'px';
			fisheyemenu.imgSmall(y);
			animElements[i].onmouseover = changeSize;
			animElements[i].onmouseout = restoreSize;
		}
		function changeSize() {
			fisheyemenu.imgLarge(this);
			var x = this.parentNode.getElementsByTagName("span");
			//tooltip_text
			for(i=0;i<x.length;i++){
				if(x[i].hasClassName('tooltip_text')==false){
					/* EDITED BY MEHRAN AHADI */
				//	x[i].style.display = 'block';
					if(this.effect && this.effect.cancel){
						this.effect.cancel();
					}
					this.effect= new Effect.Appear($(x[i]), {delay:.5,duration:.5});
					/* END */
				}
			}
			if (!this.currentWidth) this.currentWidth = fisheyemenu.startSize;
			fisheyemenu.resizeAnimation(this,this.currentWidth,fisheyemenu.endSize,10,15,0.333);
		}
		function restoreSize() {
			var x = this.parentNode.getElementsByTagName("span");
			for(i=0;i<x.length;i++){
				if(x[i].hasClassName('tooltip_text')==false){
					/* EDITED BY MEHRAN AHADI */
					if(this.effect && this.effect.cancel){
						this.effect.cancel();
					}
					/* END */
					x[i].style.display = 'none';
				}
			}
			if (!this.currentWidth) return;
			fisheyemenu.resizeAnimation(this,this.currentWidth,fisheyemenu.startSize,10,15,0.5);
			fisheyemenu.imgSmall(this);
		}
	},
	resizeAnimation : function (elem,startWidth,endWidth,steps,intervals,powr) {
		if (elem.widthChangeMemInt) window.clearInterval(elem.widthChangeMemInt);
		var actStep = 0;
		elem.widthChangeMemInt = window.setInterval(
			function() {
				elem.currentWidth = fisheyemenu.easeInOut(startWidth,endWidth,steps,actStep,powr);
				elem.style.width = elem.currentWidth+"px";
				elem.style.height = elem.currentWidth+"px";
				/* added by Mehran Ahadi*/
				delta=elem.currentWidth-(endWidth<startWidth?endWidth:startWidth);
				elem.style.position='relative';
				delta= delta>0? (-1*delta):delta;
				elem.style.top=(delta)+"px";
				/* end added by Mehran Ahadi*/
	
				actStep++;
				if (actStep > steps) window.clearInterval(elem.widthChangeMemInt);
			}
			,intervals)
	},
	easeInOut : function (minValue,maxValue,totalSteps,actualStep,powr) {
	//Generic Animation Step Value Generator By www.hesido.com
		var delta = maxValue - minValue;
		var stepp = minValue+(Math.pow(((1 / totalSteps)*actualStep),powr)*delta);
		return Math.ceil(stepp)
	},
	imgSmall : function (obj) {
		/*imgSrc = obj.getAttribute("src");
		var typePos = imgSrc.indexOf(fisheyemenu.imgType, 0);
		var imgName = imgSrc.substr(0, typePos);
		obj.setAttribute("src", imgName+"_small"+fisheyemenu.imgType);*/
	},
	imgLarge : function (obj) {
		/*imgSrc = obj.getAttribute("src");
		var typePos = imgSrc.indexOf("_small", 0);
		var imgName = imgSrc.substr(0, typePos);
		obj.setAttribute("src", imgName+fisheyemenu.imgType);*/
	}
}

// Add event with wide browser support
/*if ( typeof window.addEventListener != "undefined" )
    window.addEventListener( "load", fisheyemenu.init, false );
else if ( typeof window.attachEvent != "undefined" )
    window.attachEvent( "onload", fisheyemenu.init );
else {
    if ( window.onload != null ) {
        var oldOnload = window.onload;
        window.onload = function ( e ) {
            oldOnload( e );
            fisheyemenu.init();
        };
    }
    else
        window.onload = fisheyemenu.init;
}*/
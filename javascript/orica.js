/**
 * @author Kei
 */

$((function(window) {
	
	//defines namespace
	var Orica = window.Orica = window.Orica || {};
	
	//defines the vanguard class
	Orica.Vanguard = function(){
		var self = this;
		var _ctx;
		var _imgSrcStore = {};
		var _imgParams = [];
		var _txtParamsStore = [];		
		var _loadedImage = 0;
		var _backgroundParams = null;
		
		self.drawText = function(params){
			if(_ctx){				
				_ctx.save();	
				
				var newLayer = document.createElement('canvas');
				newLayer.id = params.name;
				var newCtx = newLayer.getContext('2d');				
				newCtx.fillStyle = params.color;
				newCtx.textAlign = "center";
				newCtx.font = params.font;
				newCtx.textBaseline = 'top';	

				if (params.shadow) {
					newCtx.shadowColor = '#000';
					newCtx.shadowOffsetX = 1;
					newCtx.shadowOffsetY = 1;
				}
				
				newCtx.fillText(params.text, params.width/2, 0);				
				_ctx.drawImage(newLayer, params.x, params.y);
				_ctx.restore();
			}
		};
		
		self.drawImage = function(params){
			if(_ctx){				
				_ctx.save();	
				var newLayer = document.createElement('canvas');
				newLayer.width = params.width;
				newLayer.height = params.height;
				var newCtx = newLayer.getContext('2d');
				var newImg = new Image();
				newImg.src = params.imgSrc;
				newImg.onload = function() {
					newCtx.drawImage(newImg, 0, 0);
					_ctx.drawImage(newLayer, params.x, params.y);
					if(++_loadedImage >= _imgParams.length){
						for(i = 0 ; i < _txtParamsStore.length ; i++){					
							self.drawText(_txtParamsStore[i]);						
						}
					}
				};	
				_imgSrcStore[params.name] = newImg;
				_ctx.restore();				
			}
		};
		
		
		self.drawBackground = function(){
			var c = document.getElementById(_backgroundParams.canvasName);//cardCanvas
			c.setAttribute('width', _backgroundParams.width);
			c.setAttribute('height', _backgroundParams.height);
			_ctx = c.getContext("2d");
						
			var background = new Image();
			background.src = _backgroundParams.imgSrc;
			background.onload = function() {				
				_ctx.drawImage(background, 0, 0);
				
				for(i = 0 ; i < _imgParams.length ; i++){					
					self.drawImage(_imgParams[i]);						
				}
			};
			_imgSrcStore['background'] = background;
		};		
		
		
		//{canvasName : 'cardCanvas',
		//	width : 327,
		//	height : 477
		//	imgSrc : './images/card/candice.jpg'}
		self.setBackground = function(params){
			if(_backgroundParams === null){
				_backgroundParams = params;
			}
			else{
				if(params.width !== undefined){
					_backgroundParams.width = params.width;
				}
				if(params.height !== undefined){
					_backgroundParams.height = params.height;
				}
				if(params.imgSrc !== undefined){
					_backgroundParams.imgSrc = params.imgSrc;
				}
				if(params.canvasName !== undefined){
					_backgroundParams.canvasName = params.canvasName;
				}
			}
			self.drawBackground();
		};
				
		//{width : 327,
		//		height:477,
		//		imgSrc:'./images/card/Normal_border.png'
		//		name : used to get a reference to the image
		// x: 0, y:0 }
		self.addImage = function(params){			
			_imgParams.push(params);
		};
		
			
		
		//{
		//  name : id of this text
		//	color : '#003300',
		//	font  : '40px san-serif',
		//	text : the actual words,
		//	wrap : TRUE / FALSE,
		//	x : 300,
		//	y : 100,
		//	width : if wordwrap is true, the max width,
		//	height : if wordwrap is true, the max height
		//}
		self.addText = function(params){
			_txtParamsStore.push(params);
		};
				
		
		//{
		//	layerName : name of target layer image to change
		//	imgSrc : new source of the image
		//}
		self.changeImageSource = function(params){
			if(_imgSrcStore && _imgSrcStore.hasOwnProperty(params.layerName)){
				_imgSrcStore[params.layerName].src = params.imgSrc;
				
				for(i = 0 ; i < _imgParams.length ; i++){
					if(_imgParams[i].name === params.layerName){
						_imgParams[i].imgSrc = params.imgSrc;												
					}					
				};				
			}
		};
	};	
})(window));
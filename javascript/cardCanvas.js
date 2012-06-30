/**
 * @author Kei
 */

$((function(window) {
	
	//create new instance
	var card = new Orica.Vanguard();
	window.card = card;


	
//	add the background first
	card.setBackground({
		canvasName : 'cardCanvas',
			width : 327,
			height : 477,
			imgSrc : './images/card/candice.jpg'
	});
	
	card.addImage({
		width : 327,
		height : 477,
		imgSrc:'./images/card/Normal_border.png',
		name : 'border',
		x : 0,
		y : 0 
	});
	
	//add grado!
	card.addImage({
		width : 41,
		height : 70,
		imgSrc:'./images/card/grade/0.png',
		name : 'grade',
		x : 6,
		y : 6 
	});
	
	//add trigger!
	card.addImage({
		width : 63,
		height : 77,
		imgSrc:'./images/card/trigger/critical.png',
		name : 'trigger',
		x : 254,
		y : 6 
	});
	
	//add shield!
	card.addImage({
		width : 36,
		height : 130,
		imgSrc:'./images/card/shield/0.png',
		name : 'shield',
		x : 0,
		y : 116 
	});
			
	
	$('#grade').on('change', function(event) {		
		var src = './images/card/grade/' + $(this).val() + '.png';
		card.changeImageSource({layerName : 'grade', imgSrc : src});
	});
	
	$('#shield').on('change', function(event) {		
		var src = './images/card/shield/' + $(this).val() + '.png';
		card.changeImageSource({layerName : 'shield', imgSrc : src});
	});
	
	$('#trigger').on('change', function(event) {		
		var src = './images/card/trigger/' + $(this).val() + '.png';
		card.changeImageSource({layerName : 'trigger', imgSrc : src});
	});
	
})(window));
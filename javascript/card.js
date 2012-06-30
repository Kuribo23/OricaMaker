/**
 * 
 */

$(function() {

	var cx, cy, cw, ch;

	$('#preview').on('click', function(event) {
		event.preventDefault;
		var target = window.card;
		var clone = $.extend({}, target);
		var display = '<canvas id="showPreview"/>';
		$('#dialog').html(display);
		
		card.addText({
			name : 'title',
			color : 'black',
			font : 'italic bold 18px sans-serif',
			text : $('#title').val(),
			wrap : false,
			x : 80, y : 408, width : 200,height : 0
		});

		card.addText({
			name : 'power',
			color : 'yellow',
			font : 'italic bold 20px sans-serif',
			text : $('#power').val(),
			wrap : false,
			shadow : true,
			x : 55, y : 433, width : 75, height : 0
		});

		card.addText({
			name : 'clan',
			color : 'white',
			font : 'italic bold 10px sans-serif',
			text : $('#clan').val(),
			wrap : false,
			x : 186, y : 432, width : 84, height : 0
		});

		card.addText({
			name : 'race',
			color : 'white',
			font : 'italic bold 8px sans-serif',
			text : $('#race').val(),
			wrap : false,
			x : 186, y : 447, width : 84, height : 0
		});

		card.addText({
			name : 'comment',
			color : 'yellow',
			font : 'italic bold 11px Georgia, serif',
			text : $('#comment').val(),
			wrap : false,
			x : 50, y : 296, width : 220, height : 0
		});
		
		clone.setBackground({
			canvasName : 'showPreview'
		});

		$('#dialog').dialog({
			modal : true,
			width : 500,
			buttons : {
				OK : function() {
					$(this).dialog('close');
				}
			}
		});
	});

	$('#title').on('change', function(event) {
		$('#cardTitle').text($(this).val());
	});

	$('#power').on('change', function(event) {
		$('#cardPower').text($(this).val());
	});

	$('#comment').on('change', function(event) {
		$('#cardComment').text($(this).val());
	});

	$('#clan').on('change', function(event) {
		$('#cardClan').text($(this).val());
	});

	$('#race').on('change', function(event) {
		$('#cardRace').text($(this).val());
	});

	$('.editor a img').on('click', function(event) {
		$('#ability_text').append('<img src="' + $(this).attr('src') + '"/>');
	});

	$("#loading").ajaxStart(function() {
		$(this).show();
	}).ajaxComplete(function() {
		$(this).hide();
	});

	$('#image').change(
			function(e) {
				// e.preventDefault();
				$.ajaxFileUpload({
					url : 'index.php?/card/upload/',
					secureuri : false,
					fileElementId : 'image',
					dataType : 'json',
					success : function(data, status) {
						if (data.status == 'success') {
							var imageString = '<img id="crop_target" src="'
									+ data.url + '"/>';
							$('#dialog').append(imageString);
							// does the cropping
							$('#crop_target').Jcrop({
								aspectRatio : 0.755,
								onSelect : function(c) {
									cx = c.x;
									cy = c.y;
									cw = c.w;
									ch = c.h;
								}
							});
							$('#dialog').dialog({
								modal : true,
								width : 500,
								buttons : {
									OK : function() {
										$.ajaxFileUpload({
											url : 'index.php?/card/upload/',
											secureuri : false,
											fileElementId : 'image',
											dataType : 'json',
											data : {
												cx : cx,
												cy : cy,
												cw : cw,
												ch : ch
											},
											success : function(data, status) {
												window.card.changeImageSource({
													layerName : 'background',
													imgSrc : data.url
												});
											}
										});

										$(this).dialog('close');
									}
								}
							});
						}
					}
				});
				return false;
			});
})
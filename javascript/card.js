/**
 * 
 */

$(function(window) {

	var gradeUrl = 'https://s3-ap-southeast-1.amazonaws.com/vanguardcardmaker/images/card/grade/';
	var triggerUrl = 'https://s3-ap-southeast-1.amazonaws.com/vanguardcardmaker/images/card/trigger/';
	var shieldUrl = 'https://s3-ap-southeast-1.amazonaws.com/vanguardcardmaker/images/card/shield/';
	var cx, cy, cw, ch; 

	$('#title').on('change', function(event) {
		$('.card-title').text($(this).val());
	});

	$('#power').on('change', function(event) {
		$('.card-power').text($(this).val());
	});

	$('#comment').on('change', function(event) {
		$('.card-comment').text($(this).val());
	});

	$('#clan').on('change', function(event) {
		$('.card-clan').text($(this).val());
	});

	$('#race').on('change', function(event) {
		$('.card-race').text($(this).val());
	});

	$('#grade').on('change', function(event) {
		$('.card-grade').attr('src', gradeUrl + $(this).val() + '.png');
	});
	$('.card-grade').attr('src', gradeUrl + $('#grade').val() + '.png');

	$('#trigger').on('change', function(event) {
		$('.card-trigger').attr('src', triggerUrl + $(this).val() + '.png');
	});
	$('.card-trigger').attr('src', triggerUrl + $('#trigger').val() + '.png');

	$('#shield').on('change', function(event) {
		$('.card-shield').attr('src', shieldUrl + $(this).val() + '.png');
	});
	$('.card-shield').attr('src', shieldUrl + $('#shield').val() + '.png');

	$('.editor a img').on('click', function(event) {

		$('#ability_text').append('<img src="' + $(this).attr('src') + '"/>');
	});

	$("#loading").ajaxStart(function() {
		$(this).show();
	}).ajaxComplete(function() {
		$(this).hide();
	});

	$('#image').change(function(e) {
		// e.preventDefault();
		$.ajaxFileUpload({
			url : 'index.php?/card/upload/',
			secureuri : false,
			fileElementId : 'image',
			dataType : 'json',
			success : function(data, status) {
				if (data.status == 'success') {
					var imageString = '<img id="crop_target" src="' + data.url + '"/>';
					$('#dialog').append(imageString);
					// does the cropping
					$('#crop_target').Jcrop({
						aspectRatio: 0.755,
						onSelect : function(c){
							cx = c.x;
							cy = c.y;
							cw = c.w;
							ch = c.h;
						}
					});
					$('#dialog').dialog({
						modal: true,
						width : 500,
						buttons: {
							OK : function(){								
								$.ajaxFileUpload({
									url : 'index.php?/card/upload/',
									secureuri : false,
									fileElementId : 'image',
									dataType : 'json',
									data : {
										cx:cx,
										cy:cy,
										cw:cw,
										ch:ch
									},
									success : function(data, status) {
										$('.card-image').css('background', 'url("' + data.url + '") center no-repeat');
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
	
	//var imageString = '<img id="crop_target" src="https://dl.dropbox.com/u/4302206/vanguardcardmaker/images/card/candice.jpg"/>';
	

})
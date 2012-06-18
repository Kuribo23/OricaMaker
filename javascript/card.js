/**
 * 
 */

$(function(window) {

	var gradeUrl = 'https://s3-ap-southeast-1.amazonaws.com/vanguardcardmaker/images/card/grade/';
	var triggerUrl = 'https://s3-ap-southeast-1.amazonaws.com/vanguardcardmaker/images/card/trigger/';
	var shieldUrl = 'https://s3-ap-southeast-1.amazonaws.com/vanguardcardmaker/images/card/shield/';

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

	$('.editor a img').on(
			'click',
			function(event) {

				$('#ability_text').append(
						'<img src="' + $(this).attr('src')
								+ '" style="width:28px;height:28px"/>');
			});

	$('.crop_target').Jcrop();

	$('.dial').dialog({
		modal : true,
		buttons : {
			Ok : function() {
				$(this).dialog('close');
			}
		}
	});
})
<?php
$card_image_url = 'https://dl.dropbox.com/u/4302206/vanguardcardmaker/images/card/candice.jpg'; 
?>

<section class="card">
<div class="card-image" style="background: url(<?php echo $card_image_url;?>) no-repeat">
	<div class="card-template">
		<section class="card-sect-top"> <img class="card-grade" /> <img
			class="card-trigger" /> </section>
		<section class="card-sect-body"> <img class="card-shield"
			src="https://s3-ap-southeast-1.amazonaws.com/vanguardcardmaker/images/card/shield/10000.png" />
		</section>
		<section class="card-sect-comment"> <span class="card-comment"></span>
		</section>
		<section class="card-sect-ability">
		<p class="card-ability">Auto : When this Unit attacks a Vanguard,
			during that battle, this Unit gains +3000 power.</p>
		<p class="card-ability">Auto : [Choose 1 Grade 3 Kagero from your hand
			and discard it] When this Unit attacks, you may pay the cost. If so,
			for that Battle, this unit gains +10000 Power.</p>
		</section>
		<section class="card-sect-title"> <span class="card-title"></span> </section>
		<section class="card-sect-attrs">
		<div class="card-attrs-left">
			<span class="card-power"></span>
		</div>
		<div class="card-attrs-right">
			<span class="card-clan"></span> <span class="card-race"></span>
		</div>
		</section>
		<section class="card-sect-footer"> <span class="card-artist">Kei
			Studio</span> </section>
	</div>
</div>
</section>
<section class="editor">
<h1>Card Details</h1>

<img id="loading" src="images/loading.gif" style="display:none;">
<form method="post" enctype="multipart/form-data" id="vanguardEditor" action="index.php?/card/upload"
	accept="">
	<ul>
		<li><label for="title">Title :</label> <input type="text" name="title"
			id="title" value='<?php echo $title_val?>' />
		</li>
		<li><label for="power">Power :</label> <input type="text" name="power"
			id="power" value='<?php echo $power_val?>' />
		</li>
		<li><label for="comment">Comment :</label> <input type="text"
			name="comment" id="comment" value='<?php echo $comment_val?>' />
		</li>
		<li><label for="clan">Clan :</label> <input type="text" name="clan"
			id="clan" value='<?php echo $clan_val?>' />
		</li>
		<li><label for="race">Race :</label> <input type="text" name="race"
			id="race" value='<?php echo $race_val?>' />
		</li>
		<li><label for="grade">Grade :</label> <select id="grade"
			title="please select a value" name="grade">
				<option>0</option>
				<option>1</option>
				<option>2</option>
				<option>3</option>
		</select>
		</li>
		<li><label for="trigger">Trigger :</label> <select id="trigger"
			title="please select a trigger" name="trigger">
				<option>critical</option>
				<option>Heal</option>
				<option>Stand</option>
				<option>Draw</option>
		</select>
		</li>
		<li><label for="shield">Shield :</label> <select id="shield"
			title="please select defence strength" name="shield">
				<option>0</option>
				<option>5000</option>
				<option>10000</option>
		</select>
		</li>		
		<li>
			<label for="image">Image :</label> <input type="file" name="image" id="image">			
		</li>
		<li><label for="ability">Ability :</label> <a href="#"><img
				src="images/card/ability/act.png" alt="" />
		</a> <a href="#"><img
				src="images/card/ability/auto.png" />
		</a> <a href="#"><img
				src="images/card/ability/cont.png" />
		</a> <a href="#"><img
				src="images/card/ability/counter.png" />
		</a> <a href="#"><img
				src="images/card/ability/rearguard.png" />
		</a> <a href="#"><img
				src="images/card/ability/rest.png" />
		</a> <a href="#"><img
				src="images/card/ability/soul_blast.png" />
		</a> <a href="#"><img
				src="images/card/ability/soul_charge.png" />
		</a> <a href="#"><img
				src="images/card/ability/stand.png" />
		</a> <a href="#"><img
				src="images/card/ability/sword.png" />
		</a> <a href="#"><img
				src="images/card/ability/vanguard.png" />
		</a>
			<div id="ability_text" contenteditable="true"></div> <!-- <textarea id="ability_text" rows="5" cols="30" style="resize: none;" name="ability">					
					</textarea> -->
		</li>
		<li><input class="cssbutton" type="submit" name="submit"
			value="submit" />
		</li>
	</ul>
</form>
</section>
<div id="dialog" title="Image Crop" style="display:none">	
</div>

<script
	src="javascript/ajaxfileupload/ajaxfileupload.js" type="text/javascript"></script>
<script
	src="javascript/jcrop/jquery.Jcrop.min.js" type="text/javascript"></script>
<script
	src="javascript/jcrop/jquery.color.js" type="text/javascript"></script>
<script
	src="javascript/jquery-ui-1.8.21.custom.min.js" type="text/javascript"></script>
<link
	rel="stylesheet" href="stylesheets/jcrop/jquery.Jcrop.css"
	media="Screen" type="text/css"></link>
<link
	rel="stylesheet"
	href="stylesheets/ui-lightness/jquery-ui-1.8.21.custom.css"
	media="Screen" type="text/css"></link>
</script>


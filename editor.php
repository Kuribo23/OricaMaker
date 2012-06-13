<?php

require_once 'lib/aws/sdk.class.php';




if ((($_FILES["image"]["type"] == "image/gif")
|| ($_FILES["image"]["type"] == "image/jpg")
|| ($_FILES["image"]["type"] == "image/jpeg")
|| ($_FILES["image"]["type"] == "image/pjpeg"))
&& ($_FILES["image"]["size"] < 100000))
{
	if ($_FILES["file"]["error"] > 0)
	{
		echo "Return Code: " . $_FILES["file"]["error"] . "<br />";
	}
	else
	{
		echo "Upload: " . $_FILES["image"]["name"] . "<br />";
		echo "Type: " . $_FILES["image"]["type"] . "<br />";
		echo "Size: " . ($_FILES["image"]["size"] / 1024) . " Kb<br />";
		echo "Temp file: " . $_FILES["image"]["tmp_name"] . "<br />";

		if (file_exists("upload/" . $_FILES["image"]["name"]))
		{
			echo $_FILES["image"]["name"] . " already exists. ";
		}
		else
		{	
			$s3 = new AmazonS3();
			$s3->use_ssl = false;
			$bucket = 'vanguarduploads';
			
			
			
			$exists = $s3->if_bucket_exists($bucket);
			while(!$exists){
				sleep(1);
				$exists = $s3->if_bucket_exists($bucket);
			}
									
			$fileNameFinal = time().$_FILES["image"]["name"];
			$response = $s3->create_object($bucket, $fileNameFinal,
				array('fileUpload' => $_FILES["image"]["tmp_name"]));	
			$wwww = $s3->get_object_url($bucket, $fileNameFinal);		
			
		}
	}
}
else
{
	echo "Invalid file";
}
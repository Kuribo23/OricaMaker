<?php
require_once 'lib/aws/sdk.class.php';

$s3 = new AmazonS3();
$s3->use_ssl = false;
$bucket = 'vanguarduploads';
$filename = '1339425237300px-BT01-024EN_R.jpg';
$url = $s3->get_object_url($bucket, $filename);
echo $url;
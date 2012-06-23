<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

if(!class_exists('AmazonS3')) require_once 'lib/aws/sdk.class.php';

class Card extends CI_Controller{

	public function index(){
		
		$data['title_val'] = '';
		$data['power_val'] = '';
		$data['comment_val'] = '';
		$data['clan_val'] = '';
		$data['race_val'] = '';
		$data['grade_val'] = '';
		$data['trigger_val'] = '';
		$data['shield_val'] = '';
		
		$this->load->view('templates/header');
		$this->load->view('card/card_maker',$data);
		$this->load->view('templates/footer');
	}
	
	public function create(){
		$error_summary = array();
		$title_val = isset($_POST['title'])?$_POST['title']:'';
		$power_val = isset($_POST['power'])?$_POST['power']:'';
		$comment_val = isset($_POST['comment'])?$_POST['comment']:'';
		$clan_val = isset($_POST['clan'])?$_POST['clan']:'';
		$race_val = isset($_POST['race'])?$_POST['race']:'';
		$grade_val = isset($_POST['grade'])?$_POST['grade']:'0';
		$trigger_val = isset($_POST['trigger'])?$_POST['trigger']:'critical';
		$shield_val = isset($_POST['shield'])?$_POST['shield']:'5000';
		$card_image_url = 'https://dl.dropbox.com/u/4302206/vanguardcardmaker/images/card/candice.jpg';
	}

	//@todo ajax image upload
	public function upload(){
			
		if(isset($_POST['cx'])){
			$config['image_library'] = 'gd2';
			$config['source_image'] = $_FILES['image']['tmp_name'];
			$config['x_axis'] = $_POST['cx'];
			$config['y_axis'] = $_POST['cy'];
			$config['width'] = $_POST['cw'];
			$config['height'] = $_POST['ch'];
			$this->load->library('image_lib', $config);
			$this->image_lib->crop();			
		};

		if ((($_FILES["image"]["type"] == "image/gif")
		|| ($_FILES["image"]["type"] == "image/jpg")
		|| ($_FILES["image"]["type"] == "image/jpeg")
		|| ($_FILES["image"]["type"] == "image/pjpeg"))
		&& ($_FILES["image"]["size"] < 1000000))
		{
			if ($_FILES["image"]["error"] > 0)
			{
				echo array_push($error_summary, "Return Code: " . $_FILES["image"]["error"] . "<br />") ;
			}
			else
			{
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
					array('fileUpload' => $_FILES["image"]["tmp_name"],
					'acl' => AmazonS3::ACL_PUBLIC));
					$card_image_url = $s3->get_object_url($bucket, $fileNameFinal);

					$status = "success"; $msg = "File successfully uploaded";
					$this->output->set_content_type("application/json")
					->set_output(json_encode(array('status' => $status, 'msg' => $msg, 'url'=>$card_image_url)));
				}
			}
		}
		else
		{
			echo "Invalid file";
		}
	}
}

<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Card extends CI_Controller{
	
	public function index(){
		$this->load->view('templates/header');
		$this->load->view('card/card_maker');
		$this->load->view('templates/footer');
	}

	//@todo ajax image upload
	public function upload(){		
		$this->load->library('UploadedFileForm');
		$this->load->library('UploadedFileXhr');
		// list of valid extensions, ex. array("jpeg", "xml", "bmp")
		$allowedExtensions = array();
		// max file size in bytes
		$sizeLimit = 10 * 1024 * 1024;

		$uploader = new $this->fileUploader($allowedExtensions, $sizeLimit);
		$result = $uploader->handleUpload('index.php?/card/upload');
		// to pass data through iframe you will need to encode all html tags
		echo htmlspecialchars(json_encode($result), ENT_NOQUOTES);
	}
}
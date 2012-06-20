<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Card extends CI_Controller{
	
	public function index(){
		$this->load->view('templates/header');
		$this->load->view('card/card_maker');
		$this->load->view('templates/footer');
	}

	//@todo ajax image upload
	public function upload(){
		$status = "success";
		$msg = "File successfully uploaded";		
		echo json_encode(array('status' => $status, 'msg' => $msg));
	}
}
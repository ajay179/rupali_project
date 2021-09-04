<?php
ob_start();
defined('BASEPATH') OR exit('No direct script access allowed');
	
class MY_Controller extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		if(function_exists('date_default_timezone_set')) {
			date_default_timezone_set("Asia/Kolkata");
		}
		$this->current_date_time = date('Y-m-d H:i:s');

		
	}

	public function adminBackend($common, $data = array(), $return = FALSE) {
		(!empty($this->session->userdata('UADMINID'))) ? '' : redirect(base_url() . 'admin');
		if ($return):
			$this->load->view('admin/bars/head',$data);
			$this->load->view('admin/bars/header',$data);
			$this->load->view('admin/bars/side_bar',$data);
			$this->load->view($common, $data);
			$this->load->view('admin/bars/footer',$data);
			$this->load->view('admin/bars/js',$data);
			
		else:
			$this->load->view('admin/bars/head');
			$this->load->view('admin/bars/header');
			$this->load->view('admin/bars/side_bar');
			$this->load->view($common);
			$this->load->view('admin/bars/footer');
			$this->load->view('admin/bars/js');
			
		endif;
	}

	
	
	
}

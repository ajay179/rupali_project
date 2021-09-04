<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Auth extends CI_Controller {

  public function __construct() {

    parent::__construct();

		//$this->check_login();
  }
	/*public function check_login(){

		if($this->session->userdata('user_id')){
			redirect('profile');
		}
	}*/

	public function login(){
		$this->load->view('login');
	}

	public function signup(){
		$this->load->view('sign-up');
	}

	public function home(){
		$user_id = $this->session->userdata('user_id');
		 $data['container'] = $this->common_model->GetAllData('container_data','','id','desc');
		$this->load->view('home',$data);
	}

	public function do_signup(){
		
		$this->form_validation->set_rules('first_name','First Name','trim|required');
		$this->form_validation->set_rules('last_name','Last Name','trim|required');
		$this->form_validation->set_rules('email','Email','trim|required|valid_email|is_unique[signup.email]',array('is_unique'=>"This email already exist, try with another email."));
		$this->form_validation->set_rules('password', 'Password', 'required|min_length[6]');
		$this->form_validation->set_rules('cpassword', 'Confirm Password', 'required|matches[password]');

 		if($this->form_validation->run()==true){

 			$this->load->library('mailchimp_email');
										$params["email"] = $this->input->post('email');
			$result = $this->mailchimp_email->subscribe($params);
//print_r($result);die;

		
			$insert['first_name']= $this->input->post('first_name');
			$insert['last_name'] = $this->input->post('last_name');
			$insert['email'] = $this->input->post('email');
			$insert['password']= $this->input->post('password');
			$insert['created_at']=date('Y-m-d H:i:s');
			$insert['update_at']=date('Y-m-d H:i:s');
			
			
			$run = $this->common_model->InsertData('signup',$insert);
			
			if($run){


										

					$this->session->set_flashdata('msg','<div class="alert alert-success">Success! Your account has been created successfully.</div>');
               
				echo 1;
			} else {

				echo '<div class="alert alert-success">Something went wrong. Try again later.</div>';
			}
			
			
		} else {
			echo '<div class="alert alert-danger">'.validation_errors().'</div>';
		}
	
 	}


 		public function do_login(){

		$this->form_validation->set_rules('email','Email','required');
		$this->form_validation->set_rules('password','Password','required');

		if($this->form_validation->run()==true){

			$email = $this->input->post('email');
			$password = $this->input->post('password');

			$run = $this->common_model->GetSingleData('signup',array('email' =>$email ,'password'=>$password));

			if($run){

				 $this->session->set_userdata('user_id',$run['user_id']);
				 $this->session->set_userdata('email',$run['email']);
			
				   $output['status'] = 1;
					 
			} else {
				$output['status'] = 0;
				$output['message'] =  '<div class="alert alert-danger">Incorrect email or password.</div>';
		
			}
		} else {
			$output['status'] = 0;
			$output['message'] =  '<div class="alert alert-danger">'.validation_errors().'</div>';
		}
		
		echo json_encode($output);
	}


	public function edit_profile_form(){
		$this->form_validation->set_rules('first_name','First Name','trim|required');
		$this->form_validation->set_rules('last_name','Last Name','trim|required');
		$this->form_validation->set_rules('email','Email','trim|required');
		$this->form_validation->set_rules('subject','Subject','trim|required');
		$this->form_validation->set_rules('message','Message','trim|required');
		

 		if($this->form_validation->run()==true){
			
		
			$insert['first_name']= $this->input->post('first_name');
			$insert['last_name'] = $this->input->post('last_name');
			$insert['email'] = $this->input->post('email');
			$insert['subject'] = $this->input->post('subject');
			$insert['message'] = $this->input->post('message');
			$insert['update_at']=date('Y-m-d H:i:s');
			
				
			
			$user_id = $this->session->userdata('user_id');
		
			$run = $this->common_model->UpdateData('signup',array('user_id'=>$user_id),$insert);
			
			if($run){
						 
				$output['status'] = 1;
				
				$this->session->set_flashdata('msg','<div class="alert alert-success">Profile has been updated successfully.</div>');
               
			} else {
				
				$output['status'] = 0;
				$output['msg'] = '<div class="alert alert-success">Something went wrong. Try again later.</div>';
			}
			
			
		} else {
			$output['status'] = 0;
			$output['msg'] = '<div class="alert alert-success">'.validation_errors().'</div>';
		}
		
		echo json_encode($output);

	}

	public function logout(){
		session_destroy();
		redirect('login');
	}


		public function delete(){

		$id = $this->uri->segment(2);

		$run = $this->common_model->DeleteData('container_data',array('id'=>$id));

		$run1 = $this->common_model->DeleteData('text_block',array('container_id'=>$id));

//echo $this->db->last_query(); die;

          if($run){

             
				$this->session->set_flashdata('msg','<div class="alert alert-success"><p>Conatiner deleted successfully!</p></div>');

                $_SESSION['success']='<div class="alert alert-success">Success! Conatiner has been deleted successfully.</div>';


			} else {

				 $this->session->set_flashdata('msg','<div class="alert alert-danger">Something went wrong.</div>');
             
	}
	        redirect('home');
	}





	public function container_form(){
		
		

			$insert['conatiner_block_col_1']= $this->input->post('conatiner_block_col_1');
			$insert['conatiner_block_col_2'] = $this->input->post('conatiner_block_col_2');
			$insert['conatiner_block_col_2_2'] = $this->input->post('conatiner_block_col_2_2');
			$insert['conatiner_block_col_3']= $this->input->post('conatiner_block_col_3');
			$insert['conatiner_block_col_3_3']= $this->input->post('conatiner_block_col_3_3');
			$insert['conatiner_block_col_3_3_3']= $this->input->post('conatiner_block_col_3_3_3');
			$insert['link']= $this->input->post('link');
			$insert['image_url']= $this->input->post('image_url');
			$insert['created_date']=date('Y-m-d H:i:s');
			$insert['update_date']=date('Y-m-d H:i:s');
			
			

			
			$run = $this->common_model->InsertData('container_data',$insert);

		$container_id =$run;


 $input_conn = count($_REQUEST['text']);

  $input_conn1 = $_REQUEST['text'];

  for($i=0; $i<$input_conn; $i++){

 $input_data = ($input_conn1[$i]);




$sqlInsert1="insert into text_block set container_id = '".$container_id."' , text = '".$input_data."'  ";

                   $run21 = $this->db->query($sqlInsert1);

//echo $this->db->last_query(); die;
}

			if($run){
					
					$this->session->set_flashdata('msg','<div class="alert alert-success">Success!.</div>');
               
				echo 1;
			} else {

				echo '<div class="alert alert-success">Something went wrong. Try again later.</div>';
			}
	
 	}

 	




}


?>
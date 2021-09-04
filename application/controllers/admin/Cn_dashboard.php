<?php defined('BASEPATH') OR exit('No direct script access allowed');

class Cn_dashboard extends MY_Controller {

	 public function dashboard()
	{
		// $this->session->set_userdata('UADMINID', $user_details['id']);
		  $data['container']=$this->Md_database->getData(TASK_CONTAINER_DETAILS,'*', array('status'=>'1'));
		$this->load->view('admin/dashboard',$data);

		// $this->adminBackend('admin/dashboard',$data);
	}

	public function add_container_details1() {

        if (!empty($this->input->post())) {

            if ($this->form_validation->run('dashboard') === FALSE) {
                $this->session->set_flashdata('error', validation_errors());
                redirect($this->agent->referrer(),'location',301);
                exit();
            } else {
               
                // $conatinerType = ($this->security->xss_clean($this->input->POST('conatiner_type')));
                // $imageType = ($this->security->xss_clean($this->input->POST('image_type')));

	                $conatiner_data=$this->input->post();
	                $conatiner_data['updated_by']=$this->current_date_time;



                    $res= $this->Md_database->insertData(TASK_CONTAINER_DETAILS,$conatiner_data);
                     if (!empty($res)) 
                    {
                           $this->session->set_flashdata('Success', 'Data  Submited Successfully.');
                        redirect($this->agent->referrer(),'location',301);
                    }else{
                            $this->session->set_flashdata('error', 'Data Not Submited .');
                        redirect($this->agent->referrer(),'location',301);
                    }
                    
                
            }
        } else {
            $this->session->set_flashdata('error', 'Something goes wrong.');
             redirect(base_url() . 'admin');
        }
        // redirect(base_url() . 'adminarea/login');
    }

    public function add_container_details()
	{
		// $conatiner_data=$this->input->post();

        $conatiner_data['conatiner_type'] = $_POST['conatiner_type'];
        $conatiner_data['container_1'] = $_POST['container_1'];
        $conatiner_data['container_21']= $_POST['container_21'];
        $conatiner_data['container_22'] = $_POST['container_22'];
        $conatiner_data['container_31'] = $_POST['container_31'];
        $conatiner_data['container_32'] = $_POST['container_32'];
        $conatiner_data['container_33']= $_POST['container_33'];
        $conatiner_data['image_type'] = $_POST['image_type'];
        $conatiner_data['url_image']= $_POST['url_image'];
        $conatiner_data['image_link'] = $_POST['image_link'];
	
        $conatiner_data['created_date_time']=$this->current_date_time;
		$data_id= $this->Md_database->insertData(TASK_CONTAINER_DETAILS,$conatiner_data);
         if ($data_id) {
            echo '1';
        }
         $text = explode(',', $_POST['text_msg']);
         $text_status = $_POST['text_status'];
        

        if ($data_id) {
            for ($i=0; $i <count($text); $i++) { 
                $text_info = array(
                    'container_id'=>$data_id,
                    'text_msg'=>$text[$i],
                    'status'=>$text_status,
                    'created_date_time'=>$this->current_date_time,
                );
              $data_text=  $this->Md_database->insertData(TASK_TEXT_DETAILS,$text_info);
            }
            // print_r($text_info);
            // die();
	   }
    }


	public function delete_data()
	{
		$id = $_POST['id'];
		$conditoin = array('id'=> $id);
        $res = $this->Md_database->updateData(TASK_CONTAINER_DETAILS , array('status'=>'2'), $conditoin);
		 if ($res) {
            echo "Valid";
        }
	}

			
}

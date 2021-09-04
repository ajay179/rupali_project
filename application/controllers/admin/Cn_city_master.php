<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Cn_city_master extends MY_Controller {

	
	
	 public function city_master()
	{
        if(!empty($this->uri->segment(3))){
            $city_id=$this->uri->segment(3);
            $data['city_data']=$this->Md_database->getData(MEDI_CITY_MASTER,'id ,city_name', array('status'=>'1','id'=>$city_id));
            
        }else{
             $data['city_data']='';
        }
        
        // print_r($data['city_data']);
        // die();
         $data['city_info']=$this->Md_database->getData(MEDI_CITY_MASTER,'id ,city_name', array('status'=>'1'));

		$this->adminBackend('admin/city_master',$data,TRUE);
	}

	public function city_master_submition() {

        if (!empty($this->input->post())) {

            if ($this->form_validation->run('city_master') === FALSE) {
                $this->session->set_flashdata('error', validation_errors());
                redirect($this->agent->referrer(),'location',301);
                exit();
            } else {
                $cityName = ($this->security->xss_clean($this->input->POST('txtcity')));
                $cityId = ($this->security->xss_clean($this->input->POST('txtid')));

                if(!empty($cityId)){
                    
                    $updateCity = array(
                        'city_name'=>$cityName,
                        'updated_id_address'=>'1',
                    );
                    $conditoin = array('id'=> $cityId);
                    $res = $this->Md_database->updateData(MEDI_CITY_MASTER ,$updateCity,$conditoin);
                    if (!empty($res)) 
                    {
                        $this->session->set_flashdata('success', 'City Update successful.');
                         redirect($this->agent->referrer(),'location',301);
                    }else{
                        $this->session->set_flashdata('error', 'City Not Updated.');
                         redirect($this->agent->referrer(),'location',301);
                    }
                 } else{
                         $insertData=array(
                            'city_name'=>$cityName,
                        );
                    $res= $this->Md_database->insertData(MEDI_CITY_MASTER,$insertData);
                     if (!empty($res)) 
                    {
                           $this->session->set_flashdata('Success', 'Data  Submited Successfully.');
                        redirect($this->agent->referrer(),'location',301);
                    }else{
                            $this->session->set_flashdata('error', 'Data Not Submited .');
                        redirect($this->agent->referrer(),'location',301);
                    }
                    
                } 
            }
        } else {
            $this->session->set_flashdata('error', 'Something goes wrong.');
             redirect(base_url() . 'admin');
        }
        // redirect(base_url() . 'adminarea/login');
    }

    /**
      * This is City Submition function
      * 
      *
      * @param    no perameter are required
      * @package   application/Controller/view city/addcity
      */
    

}

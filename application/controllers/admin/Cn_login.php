<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Cn_login extends MY_Controller {

	
	
	 public function admin_login()
	{
        (empty($this->session->userdata('UADMINID'))) ? '' : redirect(base_url() . 'admin/dashboard');

		$this->load->view('admin/login');
	}

	public function login_action() {

        if (!empty($this->input->post())) {

            if ($this->form_validation->run('admin_login') === FALSE) {
                $this->session->set_flashdata('error', validation_errors());
                redirect($this->agent->referrer(),'location',301);
                exit();
            } else {
                $user_email = ($this->security->xss_clean($this->input->POST('txtemail')));
                $user_pw = ($this->security->xss_clean($this->input->POST('txtPassword')));

                $condition = array('email' => $user_email, 'password' => base64_encode($user_pw), 'status' => '1');
                $user_details = $this->Md_database->getData(TASK_STATIC_LOGIN, 'id,full_name,status,email', $condition, '', '');

                if (!empty($user_details)) {
                    $user_details = $user_details[0];
                    if ($user_details['status'] == '1') {
                        $this->session->set_userdata('UADMINID', $user_details['id']);
                        $this->session->set_userdata('UADMINNAME', $user_details['full_name']);
                        $this->session->set_userdata('UADMINMAIL', $user_details['email']);


                        if ($this->input->POST('remember') == "yes") {
                            // echo "hi";
                           
                            setcookie('admin_Email', $user_email, time() + (86400 * 30));
                            setcookie('admin_Password', $user_pw, time() + (86400 * 30));
                      
                             // die();
                        } else {
                            setcookie('admin_Email', $user_email, time() - (86400 * 30));
                            setcookie('admin_Password', $user_pw, time() - (86400 * 30));
                        }


                        $this->session->set_flashdata('success', 'You are logged in successfully.');
                       
                        redirect(base_url() . 'admin/dashboard');
                    } else if ($user_details['status'] == '2') {
                        $this->session->set_flashdata('error', 'User inactive. Please contact admin.');
                        redirect($this->agent->referrer(),'location',301);
                    }
                } else {
                    //Email id or password not match:
                    /* @ Redirect */
                    $this->session->set_flashdata('error', 'Please enter valid credentials to login.');
                    redirect($this->agent->referrer(),'location',301);
                }
            }
        } else {
            $this->session->set_flashdata('error', 'Something goes wrong.');
             redirect(base_url() . 'admin');
        }
        // redirect(base_url() . 'adminarea/login');
    }

    /**
      * This is admin logout function
      * this function are used to logout admin and unset all session admin data
      * this function logout the admin and redirect to login
      * 
      *
      * @param    no perameter are required
      * @package   application/Controller/Login/logout
      */
    public function logout() {
        $this->session->unset_userdata('UADMINID');
        $this->session->unset_userdata('UADMINNAME');
        $this->session->unset_userdata('UADMINMAIL');


        $this->session->set_flashdata('success', 'You are logged out successfully.');
        redirect(base_url() . 'admin');
    }

}

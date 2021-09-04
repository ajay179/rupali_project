<?php

class Md_database extends CI_Model {

    function __construct() {
        parent::__construct();
//          date_default_timezone_set('Asia/kabul');
        date_default_timezone_set('Asia/Kolkata');
    }

//function for inserting data into database
    public function insertData($table, $data) {
        $this->db->insert($table, $data);
        $this->db->trans_complete();
        return $this->db->insert_id();
    }

//function for inserting batch data into database
    public function insertDataBatch($table, $data) {
        $this->db->insert_batch($table, $data);
        $this->db->trans_complete();
        return $this->db->trans_status();
    }

//function for delete data into database
    public function deleteData($table, $condition) {
        $this->db->where($condition);
        $this->db->delete($table);
        $this->db->trans_complete();
        return $this->db->trans_status();
    }

    public function deleteMultiple($table,$id){
        if(is_array($id)){
            $this->db->where_in('id', $id);
        }else{
            $this->db->where('id', $id);
        }
        $delete = $this->db->delete($table);
        return $delete?true:false;
    }

//function for  data fetching data from database
    public function getData($table, $fields = '', $condition = '', $order_by = '', $limit = '') {
        $str_sql = '';
        if (is_array($fields)) {
#$fields passed as array
            $str_sql .= implode(",", $fields);
        } elseif ($fields != "") {
#$fields passed as string
            $str_sql .= $fields;
        } else {
            $str_sql .= '*';  #$fields passed blank
        }
        $this->db->select($str_sql);
        if (is_array($condition)) {  #$condition passed as array
            if (count($condition) > 0) {
                foreach ($condition as $field_name => $field_value) {
                    if ($field_name != '' && $field_value != '') {
                        $this->db->where($field_name, $field_value);
                    }
                }
            }
        } else if ($condition != "") { #$condition passed as string
            $this->db->where($condition);
        }
        if ($limit != "")
            $this->db->limit($limit);#limit is not blank

        if (is_array($order_by)) {
            $this->db->order_by($order_by[0], $order_by[1]);  #$order_by is not blank
        } else if ($order_by != "") {
            $this->db->order_by($order_by);  #$order_by is not blank
        }
        $this->db->from($table);  #getting record from table name passed
        $query = $this->db->get();

        return $query->result_array();
    }

     // This will get table with where condition 
    public function getWhereIn($table, $select, $fieldName, $para, $ParaWhere='')
    {
        $this->db->select($select);
        if(!empty($ParaWhere)){
            $this->db->where($ParaWhere);
        }
        $this->db->where_in($fieldName,$para);
        $query = $this->db->get($table);
        return $query->result_array();
    }

//code to get data useing common function in object form
    public function getDataObject($table, $fields = '', $condition = '', $order_by = '', $limit = '') {
        $str_sql = '';
        if (is_array($fields)) {
#$fields passed as array
            $str_sql .= implode(",", $fields);
        } elseif ($fields != "") {
#$fields passed as string
            $str_sql .= $fields;
        } else {
            $str_sql .= '*';  #$fields passed blank
        }
        $this->db->select($str_sql);
        if (is_array($condition)) {  #$condition passed as array
            if (count($condition) > 0) {
                foreach ($condition as $field_name => $field_value) {
                    if ($field_name != '' && $field_value != '') {
                        $this->db->where($field_name, $field_value);
                    }
                }
            }
        } else if ($condition != "") { #$condition passed as string
            $this->db->where($condition);
        }
        if ($limit != "")
            $this->db->limit($limit);#limit is not blank

        if (is_array($order_by)) {
            $this->db->order_by($order_by[0], $order_by[1]);  #$order_by is not blank
        } else if ($order_by != "") {
            $this->db->order_by($order_by);  #$order_by is not blank
        }
        $this->db->from($table);  #getting record from table name passed
        $query = $this->db->get();

        return $query->num_rows() ? $query->result() : false;
    }

//end of getDataObject()
//function for updating data into database
    public function updateData($table, $data, $condition) {
        $this->db->where($condition);
        $this->db->update($table, $data);
        $this->db->trans_complete();
        return $this->db->trans_status();
    }

    //function for updating batch data into database
    public function updateBatchData($table, $data, $field_name) {
        $this->db->update_batch($table, $data, $field_name);
        $this->db->trans_complete();
        return $this->db->trans_status();
    }

    // counting all
    public function countAllResult($table, $condition='', $like='')
    {
        if(!empty($like)){
            $this->db->like($like);
        }

        if(!empty($condition)){
            $this->db->where($condition);
        }

        $this->db->from($table);
        return $this->db->count_all_results();   
    }

    // sum all
    public function sumAllResult($table, $fields, $condition, $like='')
    {
        $this->db->select_sum($fields);

        if(!empty($like)){
            $this->db->like($like);
        }

        $this->db->where($condition);
        return $this->db->get($table)->row()->$fields;         
    }

    public function getLastWeek($table, $fields, $con, $condate)
    {
        // date BETWEEN DATE_SUB(NOW(), INTERVAL 15 DAY) AND NOW() // 15 days
        // date('Y-m-d', strtotime(' +1 day')) // next day
        // date('Y-m-d', strtotime(' -1 day')) // prev day
        // BETWEEN date_sub(now(),INTERVAL 1 WEEK) and now(); // last week 
        // MONTH( DATE ) = MONTH( DATE_SUB(CURDATE(),INTERVAL 1 MONTH )) // last month
        
        // $this->db->select_sum($fields);
        // $this->db->where($con);

        $str_sql = '';
        if (is_array($fields)) {
            #$fields passed as array
            $str_sql .= implode(",", $fields);
        } else {
            #$fields passed as string
            $str_sql .= $fields;
        }
        $this->db->select($str_sql);
        $this->db->where($con);        
        $this->db->where('WEEKOFYEAR('.$condate.')=WEEKOFYEAR(CURDATE())-1');
        // return $this->db->get($table)->row()->$fields;
        return $this->db->get($table)->result_array();
    }

    public function getLastWeekApp($table, $fields, $con, $condate)
    {
        $this->db->select_sum($fields);
        $this->db->where($con);          
        $this->db->where('WEEKOFYEAR('.$condate.')=WEEKOFYEAR(CURDATE())-1');
        return $this->db->get($table)->row()->$fields;        
    }

    public function getLastMonthApp($table, $fields, $con, $condate)
    {
        $this->db->select_sum($fields);
        $this->db->where($con);
        $this->db->where('MONTH( '.$condate.' ) = MONTH( DATE_SUB(CURDATE(),INTERVAL 1 MONTH ))');
        return $this->db->get($table)->row()->$fields;
    }

    public function getLastMonth($table, $fields, $con, $condate)
    {
        $str_sql = '';
        if (is_array($fields)) {
            #$fields passed as array
            $str_sql .= implode(",", $fields);
        } else {
            #$fields passed as string
            $str_sql .= $fields;
        }
        $this->db->select($str_sql);
        $this->db->where($con);
        $this->db->where('MONTH( '.$condate.' ) = MONTH( DATE_SUB(CURDATE(),INTERVAL 1 MONTH ))');
        return $this->db->get($table)->result_array();
    }

    public function getPreviousYearApp($table, $fields, $con, $condate)
    {
        $this->db->select_sum($fields);
        $this->db->where($con);
        $this->db->where('YEAR( '.$condate.' ) = YEAR( DATE_SUB(CURDATE(),INTERVAL 1 YEAR ))');
        return $this->db->get($table)->row()->$fields;
    }

    public function getPreviousYear($table, $fields, $con, $condate)
    {
        $str_sql = '';
        if (is_array($fields)) {
            #$fields passed as array
            $str_sql .= implode(",", $fields);
        } else {
            #$fields passed as string
            $str_sql .= $fields;
        }

        $this->db->select($str_sql);
        $this->db->where($con);
        $this->db->where('YEAR( '.$condate.' ) = YEAR( DATE_SUB(CURDATE(),INTERVAL 1 YEAR ))');
        return $this->db->get($table)->result_array();
    }

    function getPriviliges() {
        $condition = array('UA_pkey' => $this->session->userdata('UID'), 'UA_status' => 1);
        $this->db->join(ROLES .' rl', 'rl.pk_id = static_useradmin.assign_role','left');
        $user_details1 = $this->getData(STATIC_USERADMIN, 'UA_priviliges', $condition, '', '');

        $user_details = !empty($user_details1[0]) ? $user_details1[0]['UA_priviliges'] : '';
        
        $privilige = $user_details;
        $privilige = !empty($privilige) ? explode(',', $privilige) : [];
        if (empty($privilige)) {
            redirect(base_url() . 'admin/logout');
        }
        return $privilige;
        exit();
    }

    public function getAreaCityState($condition='')
    {
        $this->db->select('a.id as area_id, a.area_name, s.StateId as state_id, s.StateName as state_name, ct.CityID as city_id, ct.CityName as city_name');
        $this->db->from(STATIC_AREA .' a');
        $this->db->join(STATIC_STATE .' s','s.StateId=a.state_id');
        $this->db->join(STATIC_CITY .' ct','ct.CityID=a.city_id');
        
        // if(!empty($search_term)){
        //     $this->db->group_start();
        //         $this->db->where("a.area_name LIKE '%$search_term%'");
        //         $this->db->or_where("ct.CityName LIKE '%$search_term%'");
        //         $this->db->or_where("s.StateName LIKE '%$search_term%'");                
        //     $this->db->group_end();
        // }

        if(!empty($condition)){
            $this->db->where($condition);
        }

        $this->db->where('a.IsActive',"1");
        $this->db->where('a.IsSoftDelete',"0");
        $this->db->where('ct.IsActive',"1");
        $this->db->where('ct.IsSoftDelete',"0");
        $this->db->where('s.IsActive',"1");
        $this->db->where('s.IsSoftDelete',"0");

        $this->db->order_by('a.id','desc');
        $res = $this->db->get();
        return $res->result_array();
    }

    public function getCityState($condition='')
    {
        $this->db->select('s.StateId as state_id, s.StateName as state_name, ct.CityID as city_id, ct.CityName as city_name');
        $this->db->from(STATIC_CITY .' ct');
        $this->db->join(STATIC_STATE .' s','s.StateId=ct.StateId');

        // if(!empty($search_term)){
        //     $this->db->group_start();        
        //         $this->db->where("ct.CityName LIKE '%$search_term%'");
        //         $this->db->or_where("s.StateName LIKE '%$search_term%'");                
        //     $this->db->group_end();
        // }

        if(!empty($condition)){
            $this->db->where($condition);
        }

        $this->db->where('ct.IsActive',"1");
        $this->db->where('ct.IsSoftDelete !=',"1");
        $this->db->where('s.IsSoftDelete !=',"1");
        $this->db->where('s.IsActive',"1");

        $this->db->order_by('ct.CityID','desc');
        $res = $this->db->get();
        return $res->result_array();
    }

    public function sendEmail($recipeinets, $from, $subject, $message) {
        $config['protocol'] = 'mail';
        $config['wordwrap'] = FALSE;
        $config['mailtype'] = 'html';
        $config['charset'] = 'utf-8';
        $config['crlf'] = "\r\n";
        $config['newline'] = "\r\n";
        $this->load->library('email', $config);
        $this->email->initialize($config);

// set the from address
        $this->email->from(stripslashes($from['email']), $from['name']);
// set the subject
        $this->email->subject($subject);
// set recipeinets
        $this->email->to($recipeinets);

// set mail message
        $this->email->message($message);

// return boolean value for email send
        return $this->email->send();
    }

    public function uploadFile($path, $type, $file_name, $error_msg, $new_name) {

        $config['upload_path'] = $path; //'uploads/superadmin/';
        $config['allowed_types'] = $type; //'gif|jpg|png|jpeg';
        $config['max_width'] = 0;
        $config['max_height'] = 0;
        $config['max_size'] = 0;
        $config['encrypt_name'] = false;
//          $config['file_name'] = $new_name;
        $config['overwrite'] = true;
        $this->load->library('upload');
        $this->upload->initialize($config);

        if (!$this->upload->do_upload($file_name)) {
            $error = $this->upload->display_errors();
//               $this->session->set_flashdata('error', $error_msg . " : " . $error);
//               redirect($_SERVER['HTTP_REFERER']);
        } else {

            $upload_data = $this->upload->data()['file_name'];
        }

        if (!empty($upload_data)) {
//               chmod($upload_data['full_path'], 0755);
            return $upload_data;
        } else {
            return 0;
        }
    }

    public function multiUploadFile($path, $type, $file_name, $error_msg, $new_name) {

        $upload_data = '';
        $new_name = uniqid();

        foreach ($_FILES[$file_name]['name'] as $key => $img) {

            $_FILES['userfile']['name'] = $_FILES[$file_name]['name'][$key];
            $_FILES['userfile']['type'] = $_FILES[$file_name]['type'][$key];
            $_FILES['userfile']['tmp_name'] = $_FILES[$file_name]['tmp_name'][$key];
            $_FILES['userfile']['error'] = $_FILES[$file_name]['error'][$key];
            $_FILES['userfile']['size'] = $_FILES[$file_name]['size'][$key];

            $config['upload_path'] = $path; //'uploads/superadmin/';
            $config['allowed_types'] = $type; //'gif|jpg|png|jpeg';
            $config['max_width'] = 0;
            $config['max_height'] = 0;
            $config['max_size'] = 0;
            $config['encrypt_name'] = false;
//               $config['file_name'] = $new_name . '_' . $key;
            $config['overwrite'] = false;
            $this->load->library('upload', $config);
            $this->upload->initialize($config);
            if (!$this->upload->do_upload('userfile')) {
                $error = $this->upload->display_errors();
//                    $this->session->set_flashdata('error', $error_msg . " : " . $error);
//                    redirect($_SERVER['HTTP_REFERER']);
            } else {
                $upload_data[] = $this->upload->data()['file_name'];
            }
        }

        if (!empty($upload_data)) {
//               chmod($upload_data['full_path'], 0755);
            return $upload_data;
        } else {
            return 0;
        }
    }

// end of uploadFile()



    public function coreQuery($query) {
        $res = $this->db->query("$query");
        return $res->result_array();
    }

    public function do_resize($sorcePAth, $photoDoc, $tarPath, $height, $width) {
        $filename = $this->input->post('new_val');
        $source_path = FCPATH . $sorcePAth . $photoDoc;
        $target_path = FCPATH . $tarPath;
        $config_manip = array('image_library' => 'gd2',
            'source_image' => $source_path,
            'new_image' => $target_path,
            'maintain_ratio' => TRUE,
            'create_thumb' => TRUE,
            'thumb_marker' => '_thumb',
            'width' => $width,
            'height' => $height);

        $newNAme = str_replace('.', '_thumb.', $photoDoc);
        $this->load->library('image_lib', $config_manip);
        if (!$this->image_lib->resize()) {
            echo $this->image_lib->display_errors();
        } else {
//            (file_exists($source_path)) ? unlink($source_path) : "";
            return $newNAme;
        }
        $this->image_lib->clear();
    }

    public function getEmailInfo($email_title, $reserved_words) {
// gather information for database table
        $email_data = $this->getData('mkm_static_email_format', '', array("email_title" => $email_title));
        $content = !empty($email_data[0]['email_content']) ? $email_data[0]['email_content'] : "";
        $subject = !empty($email_data[0]['email_subject']) ? $email_data[0]['email_subject'] : "";

// replace reserved words if any
        foreach ($reserved_words as $k => $v) {
            $content = str_replace($k, $v, $content);
        }
        return array("subject" => $subject, "content" => $content);
    }

    public function sendSMTPEmail($recipeinets, $from, $subject, $message) {
        $config['protocol'] = 'smtp';
        $config['wordwrap'] = FALSE;
        $config['mailtype'] = 'html';
        $config['charset'] = 'utf-8';
        $config['crlf'] = "\r\n";
        $config['smtp_host'] = SMTP_SERVER_NAME;
        $config['smtp_user'] = SMTP_USERNAME;
        $config['smtp_pass'] = SMTP_PASSWORD;
        $config['smtp_port'] = SMTP_PORT;
        $config['newline'] = "\r\n";
        $config['smtp_crypto'] = 'tls';
        $this->load->library('email', $config);
        $this->email->initialize($config);
        $this->email->from($from['email'], $from['name']);
        $this->email->subject($subject);
        $this->email->to($recipeinets);
        $this->email->message($message);
        return $this->email->send();
    }

    public function download_pdf($name = 'download', $html = '') {
        $this->load->library('M_pdf');
        $mpdf = new mPDF();
        $mpdf->AddPage('P', // L - landscape, P - portrait
                '', '', '', '', 4, // margin_left
                4, // margin right
                4, // margin top
                4, // margin bottom
                4, // margin header
                4); // margin footer
        //            die;
        ob_clean();
        $mpdf->allow_charset_conversion = true;
//        $mpdf->charset_in = 'UTF-8';
//        $mpdf->charset_in = 'ISO-8859-2';
        $mpdf->SetDisplayMode('fullpage');

//        $mpdf->showWatermarkImage = true;
//        $mpdf->SetWatermarkImage(base_url() . 'AdminMedia/images/water-mark.png', 0.15, 'F');
        $mpdf->WriteHTML($html);

        $mpdf->Output("$name", 'D'); //D-download,I=View
    } 
    // get single field name
    public function get_name_by_there_id($table, $country_id='', $fields = '', $condition = '', $order_by = '', $limit = '')
    {
        if($fields){
            $this->db->select($fields);
            $this->db->from($table);
            $this->db->where('status',1);
            $this->db->where('id',$country_id);
            $res=$this->db->get();
            if ($res->num_rows() != 0) {
                return $result=$res->row()->$fields;
            }else{
                return $result=$res->row();
            }
        }else{
            return $result='';
        }
       
    }

    public function getUserLastloginData($table, $user_id='', $user_type='')
    {
        $this->db->select('MSL.created_at');
        $this->db->from($table.' as MSL');
        $this->db->where('MSL.user_type =',$user_type);
        $this->db->where('MSL.logged_in_user_id =', $user_id);
        $this->db->order_by('MSL.id desc');
        $this->db->limit('1','1');
        $res=$this->db->get();
       return  $user_referral_list_data=$res->result_array(); 
    }      

}

?>

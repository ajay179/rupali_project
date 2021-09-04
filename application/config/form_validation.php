<?php

$config = array(
   

   
    // Admin :: this is Faq form validation 
    'city_master' => array(
      
      array(
        'field' => 'txtcity',
        'label' => 'City',
        'rules' => 'trim|required'
      )
    ),
   

    // validation of admin login form
    'admin_login' => array(
      array(
        'field' => 'txtemail',
        'label' => 'Email',
        'rules' => 'trim|required'
      ),
      array(
        'field' => 'txtPassword',
        'label' => 'Password',
        'rules' => 'trim|required'
      )
    ),

    'error_prefix' => '<span class="error-block">',
    'error_suffix' => '</span>'
  );
?>
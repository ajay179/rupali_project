<!DOCTYPE html>
<html lang="en">
  <?php $this->load->view('admin/bars/head');?>
  <style type="text/css">
    .card{
      margin-top: 100px;
      margin-left: 30%;
      margin-right: 30%;
      padding-left: 40px;
      padding-right: 40px;
      padding-top: 40px;

    }
    .card input{
      height: 40px;
    }
    .error{
      font-size: 13px;
      color: red;
    }
    .alert-success {
    color: #ffffff;
    background-color: #08624a;
    border-color: #1ddd23;
    border: solid;
  }
  </style>
  <!-- <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"> -->
    
  <body class="login">
    <div>
      <div class="login_wrapper">
        <div class="col-md-12">
        <div class="card">
        <div class="animate form login_form">
          <section class="login_content">
             <?php 
                $attribute =array('role' => 'form','id'=>'adminLoginForm');
                echo form_open('admin/login',$attribute);?> 

              <h1 class="text-center">Login Form</h1>
              <div class="form-group">
                <input type="email" class="form-control" autocomplete="off"  name="txtemail" value="<?php echo (!empty($_COOKIE['admin_Email'])) ? $_COOKIE['admin_Email'] : ''; ?>" placeholder="Email">
              </div>
              <div class="form-group">
                 <input type="password" class="form-control"  name="txtPassword"  value="<?php echo (!empty($_COOKIE['admin_Password'])) ? $_COOKIE['admin_Password'] : ''; ?>" placeholder="Password">
              </div>
              <div class="row">
               <div class="form-group">
                  <label>
                  <input type="checkbox" name="remember" value="yes" <?php echo (!empty($_COOKIE['admin_Email']) && !empty($_COOKIE['admin_Password'])) ? 'checked="" ' : ''; ?>> Remember Me
                  </label>
                </div>
              </div>
              <div class="form-group">
                <button class="btn btn-default submit" type="submit">Log in</button>
              </div>

              <hr>

              <div class="separator">
                <div>
                  <h1 class="text-center"> <strong>Medificians</strong> </h1>
                </div>
              </div>
             <?php echo form_close(); ?>
          </section>
        </div>
      </div>
     </div>
  </div>
</div>

  <div class="msg_div">
    <?php
    $msg = '';
    $error_class = 'alert-success';
    $hint_text = 'Success';
    if ($this->session->flashdata("success") != "") {
        $msg = $this->session->flashdata("success");
        $error_class = 'alert-success';
        $hint_text = 'Success';
    } else if ($this->session->flashdata("error") != "" || (validation_errors() != "")) {
        $msg = ($this->session->flashdata("error") ? $this->session->flashdata("error") : validation_errors());
        $error_class = 'alert-danger';
        $hint_text = 'Error';
    }
    ?>
    <div class="err-msg2" style=" width: 324px; position: absolute;right:: 5px;z-index: 1; <?php echo (!empty($msg) ? 'display:block;' : 'display:none;'); ?>">
        <div class="alert <?php echo $error_class; ?>"  >
            <a href="#" class="close" aria-label="close" style="text-decoration: none;position: absolute;top: 1px;right: 6px;opacity: 0.4; ">&times;</a>
            <strong><?php echo $hint_text; ?> !</strong> <?php echo $msg; ?>
        </div>
    </div>
  </div>

    <script src="<?php echo base_url();?>assets/js/jquery.min.js"></script>
    <!-- Bootstrap -->
    <script src="<?php echo base_url();?>assets/js/bootstrap.min.js"></script>
    <script src="<?php echo base_url();?>assets/js/common.js"></script>

    <script type="text/javascript">
      $( "#login_form" ).submit(function( event ) {
        login();
        event.preventDefault();
      });
    </script>

    <script type="text/javascript" src="<?php echo base_url(); ?>assets/js/jquery.validate.js"></script>
    <script type="text/javascript" src="<?php echo base_url(); ?>assets/js/js_common_validations.js"></script>
    <?php
    $filename = strtolower($this->router->fetch_class() . ".js");
    $JSFilePath = FCPATH . 'assets/controller_js/' . $filename;
    $JSFileUrl = base_url('assets/controller_js/' . $filename);
    // echo $filename;

    if (file_exists($JSFilePath)) {
      echo '<script type="text/javascript" src="' . $JSFileUrl . '"></script>';
    }
    ?>

  </body>

</html>

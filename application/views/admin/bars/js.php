
	<script src="<?php echo base_url();?>assets/js/core/jquery.3.2.1.min.js"></script>
	<script src="<?php echo base_url();?>assets/js/core/bootstrap.min.js"></script>
    <script src="<?php echo base_url();?>assets/js/core/popper.min.js"></script>
	<!-- jQuery UI -->
	<script src="<?php echo base_url();?>assets/js/plugin/jquery-ui-1.12.1.custom/jquery-ui.min.js"></script>
	<script src="<?php echo base_url();?>assets/js/plugin/jquery-ui-touch-punch/jquery.ui.touch-punch.min.js"></script>
	
    <!-- <script src="<?php //echo base_url();?>assets/js/demo.js"></script> -->
	<script src="<?php echo base_url();?>assets/js/plugin/datatables/datatables.min.js"></script>
	<script src="<?php echo base_url();?>assets/js/setting-demo2.js"></script>
    
	<!-- jQuery Scrollbar -->
	<script src="<?php echo base_url();?>assets/js/plugin/jquery-scrollbar/jquery.scrollbar.min.js"></script>

	<!-- Chart JS -->
	<script src="<?php echo base_url();?>assets/js/plugin/chart.js/chart.min.js"></script>

	<!-- jQuery Sparkline -->
	<script src="<?php echo base_url();?>assets/js/plugin/jquery.sparkline/jquery.sparkline.min.js"></script>

	<!-- Chart Circle -->
	<script src="<?php echo base_url();?>assets/js/plugin/chart-circle/circles.min.js"></script>

	<!-- Datatables -->
	<script src="<?php echo base_url();?>assets/js/plugin/datatables/datatables.min.js"></script>


	<script src="<?php echo base_url();?>assets/js/atlantis.min.js"></script>

	<!-- Atlantis DEMO methods, don't include it in your project! -->
	<script src="<?php echo base_url();?>assets/js/setting-demo.js"></script>
	<script src="<?php echo base_url();?>assets/js/demo.js"></script>
	
	


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
<!DOCTYPE html>
<html lang="en">
<head>
	<?php $this->load->view('admin/bars/head');?>
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<meta content='width=device-width, initial-scale=1.0, shrink-to-fit=no' name='viewport' />	
</head>

<body>
	<div class="wrapper">
		<?php $this->load->view('admin/bars/header');?>
		<!-- Sidebar -->
		<?php $this->load->view('admin/bars/side_bar');?>
		<!-- End Sidebar -->
    
		<div class="main-panel">
			 <div class="content">
		 <div class="row">
		    <div class="col-md-5">
					<div class="card">
		        <div class="card-header">
							<div class="d-flex align-items-center">
								<h4 class="card-title">Add City Name</h4>
							</div>
						</div>
                  <!-- <div class="x_content"> -->
	          	<div class="card-body">
	            <br />
			        <?php 
	                $attribute =array('role' => 'form','id'=>'admincityForm');
	                echo form_open('admin/add-city',$attribute);?> 
							<div class="row">
								<div class="col-md-3">
									<label>City Name:</label>
								</div>
								<div class="form-group form-group-default col-md-8">
									<input type="text" class="form-control" autocomplete="off"   name="txtcity" value="<?php echo !empty($city_data[0]['city_name'])?$city_data[0]['city_name']:''; ?>" placeholder="File City Name">
								</div>
								<input type="hidden" class="form-control" autocomplete="off"   name="txtid" value="<?php echo !empty($city_data[0]['id'])?$city_data[0]['id']:''; ?>" >
							</div>

						<button type="submit"  class="btn btn-primary" >Add</button>
		 			  <?php echo form_close(); ?>
			     </div>
		     </div>
		   </div>
		   <div class="col-md-7">
			   <div class="card">
					<div class="card-header">
						<div class="d-flex align-items-center">
							<h4 class="card-title">View Citys Detail </h4>
						</div>
					</div>
					<div class="card-body">
						<div class="table-responsive">
							<table id="multi-filter-select" class="display table table-striped table-hover">
							<thead >
			                    <tr style=" color: azure;  background-color: #134249;">
			                      <th>Sr.No.</th>
			                      <th>City Name</th>
			                      <th>Action</th>
			                    </tr>
			                  </thead>
			                 <tbody>
			                    <?php $x = 1; foreach ($city_info as $key){ ?>
			                    <tr>
			                      <td><?php echo $x++; ?></td>
			                      <td><?php echo $key['city_name']; ?></td>
			                      <td><button class="btn btn-danger btn-xs" id="alert_demo_7" ><i class="fa fa-trash"></i></button>
			                      	<a href="<?= site_url('admin/update-city/')?><?php echo $key['id'];?>">
	                                  <button type="button" class="btn btn-info btn-xs btn-edit" id="Edit_42" title="Edit">
	                                  <i class="fa fa-edit"></i>
	                                  </button>
	                               </a>
		                           </td>
			                    </tr>
			                    <?php } ?>
			                  </tbody>
							</table>
						</div>
					</div>
				</div>
		  </div>
		</div>
	</div>
			  </div>
		</div>
		
		<!-- End Custom template -->
		<?php $this->load->view('admin/bars/footer')?>
		<?php $this->load->view('admin/bars/js')?>
	</div>
</div>
	<!--   Core JS Files   -->
   
</body>
</html>
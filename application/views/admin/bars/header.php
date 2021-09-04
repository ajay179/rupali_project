<title>Task</title>
<div class="wrapper">
  <div class="main-header">
		

			<!-- Navbar Header -->
			<nav class="navbar navbar-header navbar-expand-lg" data-background-color="dark">
				
				<div class="fluid">
				
					    <div class="wrapper">
					       
					        <div class="hamburger" id="ham">
					            <span class="lettuce slice"></span>            
					            <span class="cheese slice"></span>
					            <span class="beef slice"></span>
					        </div>
					        <div class="linkWrapper">
					            <button id="add_container_block" class="btn btn-primary" >Add Container Block</button>
					            <button id="add_image_block" class="btn btn-primary" >Add Image Block</button>
					            <button id="add_text_block" class="btn btn-primary" >Add Text Block</button>					           
					        </div>


					    </div>
					<ul class="navbar-nav topbar-nav ml-md-auto align-items-center">

									
						
							<li>
					          <a href="<?php echo base_url();?>home">Pages</a>
					     			<a onclick="return confirm('Are you sure?');" href="<?=base_url('admin-logout')?>" >Logout</a>  
					     			</li>  
					</ul>
				</div>
			</nav>
			<!-- End Navbar -->
		</div>

		<script type="text/javascript">
			var modal = document.getElementById('id01');
			// When the user clicks anywhere outside of the modal, close it
			window.onclick = function(event) {
			    if (event.target == modal) {
			        modal.style.display = "none";
			    }
			}
		</script>

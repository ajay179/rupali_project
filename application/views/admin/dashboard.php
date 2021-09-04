<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js"></script>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
<!DOCTYPE html>
<html lang="en">

<style><?php $this->load->view('admin/bars/style.css');?></style>

<nav id="nav">
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
            <a href="<?php echo base_url();?>home">Pages</a>
            <a onclick="return confirm('Are you sure?');" href="<?=base_url('admin-logout')?>" >Logout</a>
                   
        </div>
    </div>
</nav>




<div class="content">
    <div class="contact">
        <!-- <div class="col-lg-5"> -->
           <div class="form">
            <div class=""><?php echo $this->session->flashdata('msg'); ?></div>
                <form id="container_form" enctype="multipart/form-data">

                    <div id = "container_block" class="col-md-12 ">

                        <div class="flex-rev" >
                          <select class="form-control" id="conatiner_type" name="conatiner_type" >
                            <option value="">Container Block</option>
                            <option value="opt1">Option 1</option>
                            <option value="opt2">Option 2</option>
                            <option value="opt3">Option 3</option>
                          </select>
                        </div>

                         
                    </div>

                    <div id = "image_block" class="col-md-12">

                        <div class="flex-rev" >
                           <select class="form-control" id="image_type" name="image_type" >
                            <option value="">Image Block</option>
                            <option value="image_url" >Image Url</option>
                            <option value="link" >Link</option>
                          </select>
                        </div>
                        <div class="">
                         <input type="checkbox" name="image_status" id="image_status" value="2"> In Above Container
                        </div>
                    </div>

                    <div id = "text_block" class="col-md-12" >
                        <div class="flex-rev" >
                            <label value="">Text Block</label>
                        </div>
                        <div class="input_fields_wrap">
                            <div class="flex-rev">
                              <textarea placeholder="Type your text here...." class="text_msg" name="text" id="text" onkeyup="textData();" ></textarea>
                            </div>
                        </div>
                        <button class="btn btn-success add_field_button">Add Text</button>
                       <div class="">
                         <input type="checkbox" name="text_status" id="text_status" value="2"> In Above Container
                        </div>
                    </div>

                    <button class="btn btn-success btn_save" id="submit_btn" onclick="save_details();">SAVE PAGE</button>
                </form>

            </div>

        <!-- </div> -->
        <!-- <div class="col-lg-7"> -->
<style>
.container {
  background-color: lightgrey;
  width: 195px;
  border: 2px solid  rgb(36, 51, 66);
  padding: 15px;
  margin: 1.5px;
}
</style>
           
                   <div class="" style="background-color: #f6f7f7; width: 715px;">
                        <div class="info">

                             <div class="flex-rev" >
                                 <div class="row" style="border-radius: 10px;   box-shadow: 0px 0px 1px 1px rgb(0 0 0 / 12%); padding: 22px;">
                                 <!-- <p id="demo"></p>   -->
                                <div id="show_opt1" >
                                    <div  class="col-md-4 container" name="container_1"  id="container_1">
                                        
                                    </div>
                                </div>
                                <div id="show_opt2" >
                                    <div  class="col-md-4 container" name="container_21"  id="container_21">
                                        
                                    </div>
                                </div>
                                <div id="show_opt3" >
                                    <div  class="col-md-4 container" name="container_31"  id="container_31">
                                        
                                    </div>
                                </div>
                                 
                            </div>
                                 
                        </div>

                         <div class="flex-rev" >
                                 <div class="row"  style="border-radius: 10px;   box-shadow: -1px -1px 1px 1px rgb(0 0 0 / 12%); padding: 22px;">
                                  
                                  <div id="image_url" class="row">
                                    <div  class="col-md-10">
                                        <center><div class="form-group">
                                            <input type="url" class="form-control" name="url_image" id="url_image" placeholder="Enter Image URL" onkeyup="urlImage();"> 
                                        </div></center>
                                    </div>
                                    
                                </div>
                                  
                                <div id="link" class="row">
                                    <div  class="col-md-10">
                                        <div class="form-group">
                                           <input type="link" class="form-control" name="image_link" id="image_link" placeholder="Enter Image LINK" >
                                        </div>
                                    </div>
                                </div>
                            </div>
                                 
                        </div>

                            <div class="row ">                 
                                <h2> Container (<?php echo count($container);?>)</h2> 
                                <?php  if($container){ foreach ($container as $data) {
                                  $text = $this->Md_database->getData(TASK_TEXT_DETAILS,array('container_id'=>$data['id']));  ?>

                                    <div class="col-md-6">
                                        <div class="ibox-content text-center"  style="background-color: whitesmoke;">

                                        <?php if(!empty($data['container_1'])){ ?>
                                            <p class="text-muted h-name">

                                                <?php echo $data['container_1'];?>

                                            </p>
                                        <?php }?>

                                        <?php if(!empty($data['container_21'])){ ?>
                                            <p class="text-muted h-name">

                                                <?php echo $data['container_21'];?>

                                            </p>
                                          <?php }?>

                                        <?php if($data['container_22']){ ?>
                                            <p class="text-muted h-name">

                                                <?php echo $data['container_22'];?>

                                            </p>
                                          <?php }?>

                                        <?php if(!empty($data['container_31'])){ ?>
                                            <p class="text-muted h-name">

                                                <?php echo $data['container_31'];?>

                                            </p>
                                          <?php }?>

                                        <?php if(!empty($data['container_32'])){ ?>
                                            <p class="text-muted h-name">

                                                <?php echo $data['container_32'];?>

                                            </p>
                                          <?php }?>

                                        <?php if(!empty($data['container_33'])){ ?>
                                            <p class="text-muted h-name">

                                                <?php echo $data['container_33'];?>

                                            </p>
                                          <?php }?>

                                        <?php if(!empty($data['image_url'])){ ?>
                                            <p class="text-muted h-name">

                                               <?php echo $data['image_url'];?>

                                            </p>
                                          <?php }?>

                                           <?php if(!empty($data['image_link'])){ ?>
                                                <div class="m-b-sm">
                                                        <img alt="image" style="width: 100px;height: 100px;"  src="<?php echo $data['image_link'];?>">
                                                </div>
                                             <?php }?>
                                                

                                              <?php   foreach ($text as $text) { if(!empty($text['text'])){ ?>
                                            <p class="text-muted h-name">

                                               <?php echo $text['text'];?>

                                            </p>
                                          <?php } } ?>

                                    </div>

                                    <center><button ><a class=" text-danger" href="javascript:void(0);" onclick="delete_detail('<?php echo $data['id'];?>');">Delete</a></button></center>
   
                                
                            </div>

                            <?php } } else{ echo '<div class="col-md-12 btn btn-danger">No Data Found.</div>' ; } ?>
                        </div>

                    </div>
                </div>
            </div>
        </div>

        <!-- </div> -->
    </div>
</div>

</html>
<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>

<script type="text/javascript">
function urlImage() {
var image_status = document.getElementById('image_status').checked;
var conatiner_type = document.getElementById('conatiner_type').value;
var image_type = document.getElementById('image_type').value;
var container_1 = document.getElementById('container_1').value;
var container_21 = document.getElementById('container_21').value;
var container_31 = document.getElementById('container_31').value;

  // alert(container_1);
  // return;
  // if(conatiner_type== opt1){
  //   if(container_1 =''){

        if (image_status == true ){
          var x = document.getElementById("url_image").value;
          document.getElementById("container_1").innerHTML = x;
        }else{
           

        }
    }

//   }
    
// }
function textData() {

    var text_status = document.getElementById('text_status').checked;


    if (text_status == true ){
      var x = document.getElementById("text").value;
      document.getElementById("container_21").innerHTML = x;
    }else{

    }
}
</script>

<script type="text/javascript">
 
base_url = $('base').attr('href');
    function delete_detail(id)
{
    if (confirm('Are you delete this Detail') == true) 
    {
        $.ajax({
            url: "<?php echo base_url(); ?>admin/Cn_dashboard/delete_data", 
            type : "POST",
            data: {id : id},
            success: function(result)
            {
                if (result == 'Valid') 
                {
                    alert(' Details deleted!');
                    location.reload();
                }
            }
        });
    }
}

    $('#add_container_block').click(function(){
   $('#container_block').toggle();
    $('#submit_btn').show();
});

   $('#add_image_block').click(function(){
   $('#image_block').toggle();
    $('#submit_btn').show();
});

      $('#add_text_block').click(function(){
   $('#text_block').toggle();
    $('#submit_btn').show();
});



 $(document).ready(function(){
    function show_opt1()
    {
         $('#show_opt1').show();
         $('#show_opt2').hide();
         $('#show_opt3').hide();
    }
    function show_opt2()
    {
       $('#show_opt2').show();
       $('#show_opt1').show();
       $('#show_opt3').hide();
    }
    function show_opt3()
    {
         $('#show_opt3').show();
         $('#show_opt2').show();
         $('#show_opt1').show();
    }
    $('#conatiner_type').on('change', function() {
    
      if ( $('#conatiner_type').val() == 'opt1' ) show_opt1();
      else if ( $('#conatiner_type').val() == 'opt2' ) show_opt2();
      else if ( $('#conatiner_type').val() == 'opt3' ) show_opt3();
    });
});

  $(document).ready(function(){
    function image_url()
    {
         $('#image_url').show();
         $('#link').hide();
    }
    function link()
    {
       $('#link').show();
       $('#image_url').hide();
    }
 
    
    $('#image_type').on('change', function() {
    
      if ( $('#image_type').val() == 'image_url' ) image_url();
      else if ( $('#image_type').val() == 'link' ) link();
    });
});


$(document).ready(function() {
    var max_fields      = 10; //maximum input boxes allowed
    var wrapper         = $(".input_fields_wrap"); //Fields wrapper
    var add_button      = $(".add_field_button"); //Add button ID
    
    var x = 1; //initlal text box count
    $(add_button).click(function(e){ //on add input button click
        e.preventDefault();
        if(x < max_fields){ //max input box allowed
            x++; //text box increment
            $(wrapper).append('<div class="flex-rev"><button  class="remove_field btn btn-danger btn-sm">Remove</button> <textarea placeholder="Type your text here...." class="text_msg" name="text" id="text" onkeyup="textData();"/></textarea></div>'); //add input box
        }
    });
    
    $(wrapper).on("click",".remove_field", function(e){ //user click on remove text
        e.preventDefault(); $(this).parent('div').remove(); x--;
    })
});


</script>

<script>
function container_form(){
    var formdata = new FormData($('#container_form')[0]);
    // alert (formdata);
    // return;
   $.ajax({   
        type : 'post',
        data : formdata,
        dataType: 'JSON',
        processData: false,           
        contentType: false,
        cache: false,
        url  : '<?php echo base_url(); ?>admin/Cn_dashboard/add_container_details',
        beforeSend:function(){
         $('.btn_save').prop('disabled',true);
         $('.btn_save').html('<i class="fa fa-spin fa-spinner"></i> Processing...');
       },
      success : function(data){
         console.log(data);
         if(data==1){   
         
            window.location.href="<?php echo base_url(); ?>admin/Cn_dashboard/deshboard";
         } else {
            $(".err").html(data);
            $('.btn_save').prop('disabled',false);
            $('.btn_save').html('SAVE PAGE');
            topFunction();
            return false;
         }  
      } 
   });  
   return false;
}
</script>

<script>
  function save_details() {
  
    conatiner_type = $('#conatiner_type').val();
    container_1 = $('#container_1').val();
    container_21 = $('#container_21').val();
    container_22 = $('#container_22').val();
    container_31 = $('#container_31').val();
    container_32 = $('#container_32').val();
    container_33 = $('#container_33').val();
    image_type = $('#image_type').val();
    url_image = $('#url_image').val();
    image_link = $('#image_link').val();
    text_status = $('#text_status').val();

    text_msg = '';
    $( ".text_msg" ).each(function() {
        text_msg = text_msg + ','+ $(this).val();
    });
    text_msg = text_msg.replace(/^,/, '');

  //   alert(url_image);
  // return;
    var formData = new FormData();
     
      formData.append('conatiner_type',conatiner_type);
      formData.append('container_1',container_1);
      formData.append('container_21',container_21);
      formData.append('container_22',container_22);
      formData.append('container_31',container_31);
      formData.append('container_32',container_32);
      formData.append('container_33',container_33);
      formData.append('image_type',image_type);
      formData.append('url_image',url_image);
      formData.append('image_link',image_link);

      formData.append('text_msg',text_msg);
      formData.append('text_status',text_status);
       
    $.ajax({
    url: "<?php echo base_url(); ?>admin/Cn_dashboard/add_container_details", 
    type : "POST",
    data: formData,
    processData:false,
    contentType:false,  
    success: function(result)
    {
        console.log(result);
        
      if (result == 1)
      {
         alert('Success', 'Data  Submited Successfully.');
         window.location.reload(); 
      }
      else
      {
        alert('some thing is wrong');
        $('.btn_save').prop('disabled',false);
            $('.btn_save').html('SAVE PAGE');
             topFunction();
            return false;
      }
    }
  });
}
</script>

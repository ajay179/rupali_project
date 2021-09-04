base_url = $('base').attr('href');

function change_img(img,preview_img) 
{
    var oFReader = new FileReader();
    oFReader.readAsDataURL($('#'+img)[0].files[0]);

    oFReader.onload = function (oFREvent) {
        $('#'+preview_img).attr('src', oFREvent.target.result);
    }
}

function login() {
    email = $('#email').val();
    password = $('#password').val();
    // alert(password);

    $.ajax({
        url: base_url+"Login/check_login", 
        type : "POST",
        data: {email : email , password :password},
        success: function(result)
        {
            if (result == 'Valid')
            {
                window.location.href = base_url + "Dashboard";
            }
            else if(result == 'Susepend'){
                alert('User Are Suspended Now Please Contact Scheme Hub!');
            }
            else
            {
                alert('Please Enter Valid Username and Password');
            }
        }
    });
}
  function user_login() {

  mobile_no = $('#mobile_no').val();
  // $('#loader').show();
  $.ajax({
      url: base_url+"Login_web/check_login_web", 
      type : "POST",
      data: {mobile_no : mobile_no},
      success: function(result)
      {
            console.log(result);
            // alert(result);
        if (result == 'Valid')
      {
          // $('#loader').hide();
        $('#otp_details').html('<label for="otp">OTP Details</label><div class="form-label-group"><input type="text" name="" id="otp" class="form-control" placeholder="Enter otp" required autofocus></div><button type="submit" class="btn btn-default submit">Submit</button>');
                $('#mobile_no').attr('disabled',true);
                $('#btn_submit').attr('disabled',true);
      }
      else
      {
        alert('Please Enter Valid Mobile Number or Signup First!');
      }
        }
    });
}

function re_login()
{
    mobile_no = $('#mobile_no').val();
    otp = $('#otp').val();
     
    $.ajax({
        url: base_url+"Login_web/re_check_login", 
        type : "POST",
        data: {mobile_no : mobile_no ,otp:otp},
        success: function(result)
        {
            if (result == 'Valid')
            {
                 
                window.location.href = base_url + "Home";
            }
            else
            {
                alert('Please Enter Valid OTP');
            }
        }
    });
}

function user_login_for_my_cart() {

  mobile_no = $('#mobile_no').val();
   // $('#loader').show();
  $.ajax({
      url: base_url+"Login_web/check_login_web", 
      type : "POST",
      data: {mobile_no : mobile_no},
      success: function(result)
      {
            // console.log(result);
            // alert(result);
        if (result == 'Valid')
      {
         // $('#loader').hide();
        $('#otp_details').html('<label for="otp">OTP Details</label><div class="form-label-group"><input type="text" name="" id="otp" class="form-control" placeholder="Enter otp" required autofocus></div><button type="submit" class="btn btn-default submit">Submit</button>');
                $('#mobile_no').attr('disabled',true);
                $('#btn_submit').attr('disabled',true);
      }
      else
      {
        alert('Please Enter Valid Mobile Number or Signup First!');
      }
        }
    });
}


function re_login_for_my_cart()
{
    
    mobile_no = $('#mobile_no').val();
    otp = $('#otp').val();
    m_category = $('#m_category').val();
    test_name2 = $('#test_name2').val();
    category34 = $('#category34').val();
    lab_name45 = $('#lab_name45').val();
    offer_price34 = $('#offer_price34').val();
    status_for_payment = $('#status_for_payment').val();

    $.ajax({
        url: base_url+"Login_web/re_check_login_for_my_cart", 
        type : "POST",
        data: {mobile_no : mobile_no ,otp:otp,m_category:m_category,test_name2:test_name2,category34:category34,lab_name45:lab_name45,offer_price34:offer_price34,status_for_payment:status_for_payment},
        success: function(result)
        {
            if (result == 'Valid')
            {
                 // $('#loader').hide();
                window.location.href = base_url + "Home/view_cart_details";
            }
            else
            {
                alert('Please Enter Valid OTP');
            }
        }
    });
}

function add_pharmacy_medicine_price()
{
    /*if (document.myform.gst_amount.value == "") {
    alert("!Please Add GST (in %) First...");
    return false;
      }
    else if (document.myform.medicine_name.value == "") {
    alert("Enter Medicine Name...");
    return false;
      }
    else if (document.myform.medicine_price.value == "") {
    alert("Enter Medicine Price...");
    return false;
      }  
    else if (document.myform.qty.value == "") {
    alert("Enter Quantity First...");
    return false;
      } 
   else{*/
    order_id = $('#order_id').val();
    price = $('#price').val();
    gst_amount = $('#gst_amount').val();
    total_amount = $('#total_amount').val();

    medicine_name = '';
    $( ".medicine_name" ).each(function() {
        medicine_name = medicine_name + ','+ $(this).val();
    });
    medicine_name = medicine_name.replace(/^,/, '');

    medicine_price = '';
    $( ".medicine_price" ).each(function() {
        medicine_price = medicine_price + ','+ $(this).val();
    });
    medicine_price = medicine_price.replace(/^,/, '');

    medicine_gst_price = '';
    $( ".medicine_gst_price" ).each(function() {
        medicine_gst_price = medicine_gst_price + ','+ $(this).val();
    });
    medicine_gst_price = medicine_gst_price.replace(/^,/, '');

    qty = '';
    $( ".qty" ).each(function() {
        qty = qty + ','+ $(this).val();
    });
    qty = qty.replace(/^,/, '');


    var formData = new FormData();
    formData.append('order_id',order_id);
    formData.append('price',price);
    formData.append('gst_amount',gst_amount);
    formData.append('total_amount',total_amount);
    formData.append('medicine_name',medicine_name);
    formData.append('medicine_price',medicine_price);
    formData.append('medicine_gst_price',medicine_gst_price);
    formData.append('qty',qty);
    
    $.ajax({
        url: base_url + "Pharmacy/add_pharmacy_medicine_price", 
        type : "POST",
        data: formData,
        processData:false,       
        contentType:false,  
        success: function(result)
        {
            $('#preloader').hide();   
            if (result == 'Valid') 
            {
               alert('Updated Successfully');
               location.reload();
            }
        }
    });
}
/*}*/
function update_delivered_status()
    {
    status_id = $('#status_id').val();
    status = $('#status').val();

    var formData = new FormData();
    formData.append('status_id',status_id);
    formData.append('status',status);
    $.ajax({
        url: base_url + "Pharmacy/update_deliver_status", 
        type : "POST",
        data: formData,
        processData:false,       
        contentType:false,  
        success: function(result)
        {
            $('#preloader').hide();   
            if (result == 'Valid') 
            {
               alert('Status Updated  successfully');
               location.reload();
            }
        }
    });
}
function update_payment_status()
    {
    payment_id = $('#payment_id').val();
    payment_type = $('#payment_type').val();

    var formData = new FormData();
    formData.append('payment_id',payment_id);
    formData.append('payment_type',payment_type);
    $.ajax({
        url: base_url + "Pharmacy/update_payment_status", 
        type : "POST",
        data: formData,
        processData:false,       
        contentType:false,  
        success: function(result)
        {
            $('#preloader').hide();   
            if (result == 'Valid') 
            {
               alert('Status Updated  successfully');
               location.reload();
            }
        }
    });
}
function delete_canceled_order(id)
{
    if (confirm('Are you delete this Order') == true) 
    {
        $.ajax({
            url: base_url+"Pharmacy/delete_canceled_order", 
            type : "POST",
            data: {id : id},
            success: function(result)
            {
                if (result == 'Valid') 
                {
                    alert('Order deleted!');
                    location.reload();
                }
            }
        });
    }
}
function add_labs()
{ 
   if ($('#lab_name').val()=="" || $('#logo_image').val()=="" || $('#email').val()=="" || $('#address').val()==""|| $('#city').val()=="" || $('#state').val()=="" || $('#mobile_no').val()=="" || $('#landline_no').val()==""){
                alert('All Fields Are Mandatory! Please Fill All Input Fields... ');
        }
    else{       
    lab_name = $('#lab_name').val();
    email = $('#email').val();
    address = $('#address').val();
    city = $('#city').val();
    state = $('#state').val();
    mobile_no = $('#mobile_no').val();
    landline_no = $('#landline_no').val();
    
    var formData = new FormData();
    formData.append('lab_name',lab_name);
    formData.append('file1',$('#logo_image')[0].files[0]); 
    formData.append('email',email);
    formData.append('address',address);
    formData.append('city',city);
    formData.append('state',state);
    formData.append('mobile_no',mobile_no);
    formData.append('landline_no',landline_no);

   
    $.ajax({
        url: base_url + "Pathology/add_labs", 
        type : "POST",
        data: formData,
        processData:false,       
        contentType:false,  
        success: function(result)
        {
            if (result == 'Valid') 
            {   
                alert('Lab Added successfully');
                location.reload();
            }
        }
    });
}
}
function update_lab_details()
{      
    lab_id = $('#lab_id').val();
    lab_name = $('#lab_name').val();
    email = $('#email').val();
    address = $('#address').val();
    city = $('#city').val();
    state = $('#state').val();
    mobile_no = $('#mobile_no').val();
    landline_no = $('#landline_no').val();
    
    var formData = new FormData();
    formData.append('lab_id',lab_id);
    formData.append('lab_name',lab_name);
    formData.append('file1',$('#logo_image')[0].files[0]);
    formData.append('email',email);
    formData.append('address',address);
    formData.append('city',city);
    formData.append('state',state);
    formData.append('mobile_no',mobile_no);
    formData.append('landline_no',landline_no);

   
    $.ajax({
        url: base_url + "Pathology/edit_labs", 
        type : "POST",
        data: formData,
        processData:false,       
        contentType:false,  
        success: function(result)
        {
            if (result == 'Valid') 
            {   
                alert('Lab Updated successfully');
                location.reload();
            }
        }
    });
}
function delete_labs(id)
{
    if (confirm('Are you delete this Lab') == true) 
    {
        $.ajax({
            url: base_url+"Pathology/delete_lab_details", 
            type : "POST",
            data: {id : id},
            success: function(result)
            {
                if (result == 'Valid') 
                {
                    alert('Lab deleted!');
                    location.reload();
                }
            }
        });
    }
}
function delete_tests(id)
{
    if (confirm('Are you delete this test') == true) 
    {
        $.ajax({
            url: base_url+"Pathology/delete_test_details", 
            type : "POST",
            data: {id : id},
            success: function(result)
            {
                if (result == 'Valid') 
                {
                    alert('Test deleted!');
                    location.reload();
                }
            }
        });
    }
}
function add_pathology_test()
{  
    if ($('#test_name').val()=="" || $('#category_name').val()=="" || $('#description').val()=="" || $('.lab_id').val()==""||
     $('.price').val()=="" || $('.offer_price').val()=="" || $('.off').val()==""){
                alert('All fields are mandatory');
            }
    else{
    test_name = $('#test_name').val();
    category_name = $('#category_name').val();
    description = $('#description').val();

    lab_id = '';
    $( ".lab_id" ).each(function() {
        lab_id = lab_id + ','+ $(this).val();
    });
    lab_id = lab_id.replace(/^,/, '');

    price = '';
    $( ".price" ).each(function() {
        price = price + ','+ $(this).val();
    });
    price = price.replace(/^,/, '');

    offer_price = '';
    $( ".offer_price" ).each(function() {
        offer_price = offer_price + ','+ $(this).val();
    });
    offer_price = offer_price.replace(/^,/, '');

    off = '';
    $( ".off" ).each(function() {
        off = off + ','+ $(this).val();
    });
    off = off.replace(/^,/, '');

   
    var formData = new FormData();
    formData.append('test_name',test_name);
    formData.append('category_name',category_name);
    formData.append('description',description);
    formData.append('lab_id',lab_id);   
    formData.append('price',price);   
    formData.append('offer_price',offer_price);   
    formData.append('off',off);


    $.ajax({
        url: base_url+"Pathology/add_pathology_test", 
        type : "POST",
        data: formData,
        processData:false,
        contentType:false,  
        success: function(result)
        {
            console.log(result);
            if (result == 'Valid') 
            {
                alert('Test Added successfully!');
                location.reload();
            }
        }
    });

}
}
function update_test_details()
{   
    test_id = $('#test_id').val();   
    test_name = $('#test_name').val();
    category_name = $('#category_name').val();
    description = $('#description').val();
    
    var formData = new FormData();
    formData.append('test_id',test_id);
    formData.append('test_name',test_name);
    formData.append('category_name',category_name);
    formData.append('description',description);
    
   
    $.ajax({
        url: base_url + "Pathology/edit_test_details", 
        type : "POST",
        data: formData,
        processData:false,       
        contentType:false,  
        success: function(result)
        {
            if (result == 'Valid') 
            {   
                alert('Test Updated successfully');
                location.reload();
            }
        }
    });
}
function delete_pathology_test_price(id)
{
    if (confirm('Are you delete this Test') == true) 
    {
        $.ajax({
            url: base_url+"Pathology/delete_test_price_details", 
            type : "POST",
            data: {id : id},
            success: function(result)
            {
                if (result == 'Valid') 
                {
                    alert('Test deleted!');
                    location.reload();
                }
            }
        });
    }
}
function add_price_test_data()
{   
    test_id=$('#test_id').val();
    lab_id = '';
    $( ".lab_id" ).each(function() {
        lab_id = lab_id + ','+ $(this).val();
    });
    lab_id = lab_id.replace(/^,/, '');

    price = '';
    $( ".price" ).each(function() {
        price = price + ','+ $(this).val();
    });
    price = price.replace(/^,/, '');

    offer_price = '';
    $( ".offer_price" ).each(function() {
        offer_price = offer_price + ','+ $(this).val();
    });
    offer_price = offer_price.replace(/^,/, '');

    off = '';
    $( ".off" ).each(function() {
        off = off + ','+ $(this).val();
    });
    off = off.replace(/^,/, '');

    var formData = new FormData();
    formData.append('test_id',test_id); 
    formData.append('lab_id',lab_id);   
    formData.append('price',price);   
    formData.append('offer_price',offer_price);   
    formData.append('off',off);  
    $.ajax({
        url: base_url+"Pathology/add_price_modal", 
        type : "POST",
        data: formData,
        processData:false,
        contentType:false,  
        success: function(result)
        {
            if (result == 'Valid') 
            {
                alert('update successfully!');
                location.reload();
            }
        }
    });
}

function update_cod_status()
    {
    status_id = $('#status_id').val();
    status = $('#status').val();

    var formData = new FormData();
    formData.append('status_id',status_id);
    formData.append('status',status);
    $.ajax({
        url: base_url + "Pathology/update_cod_status", 
        type : "POST",
        data: formData,
        processData:false,       
        contentType:false,  
        success: function(result)
        {
            $('#preloader').hide();   
            if (result == 'Valid') 
            {
               alert('Status Updated  successfully');
               location.reload();
            }
        }
    });
}
function add_pathology_medicine_price()
{
    if (document.myform.medicine_name.value == "") {
    alert("Enter Medicine Name...");
    return false;
      }
    else if (document.myform.medicine_price.value == "") {
    alert("Enter Medicine Price...");
    return false;
      }  
    else if (document.myform.qty.value == "") {
    alert("Enter Quantity First...");
    return false;
      } 
   else{
    order_id = $('#order_id').val();
    price = $('#price').val();

    medicine_name = '';
    $( ".medicine_name" ).each(function() {
        medicine_name = medicine_name + ','+ $(this).val();
    });
    medicine_name = medicine_name.replace(/^,/, '');

    medicine_price = '';
    $( ".medicine_price" ).each(function() {
        medicine_price = medicine_price + ','+ $(this).val();
    });
    medicine_price = medicine_price.replace(/^,/, '');

    qty = '';
    $( ".qty" ).each(function() {
        qty = qty + ','+ $(this).val();
    });
    qty = qty.replace(/^,/, '');


    var formData = new FormData();
    formData.append('order_id',order_id);
    formData.append('price',price);
    formData.append('medicine_name',medicine_name);
    formData.append('medicine_price',medicine_price);
    formData.append('qty',qty);
    
    $.ajax({
        url: base_url + "Pathology/add_pathology_medicine_price", 
        type : "POST",
        data: formData,
        processData:false,       
        contentType:false,  
        success: function(result)
        {
            $('#preloader').hide();   
            if (result == 'Valid') 
            {
               alert('Updated Successfully');
               location.reload();
            }
        }
    });
}
}
function pathology_prescription_deliver_status()
    {
    status_id = $('#status_id').val();
    status = $('#status').val();

    var formData = new FormData();
    formData.append('status_id',status_id);
    formData.append('status',status);
    $.ajax({
        url: base_url + "Pathology/pathology_prescription_deliver_status", 
        type : "POST",
        data: formData,
        processData:false,       
        contentType:false,  
        success: function(result)
        {
            $('#preloader').hide();   
            if (result == 'Valid') 
            {
               alert('Status Updated  successfully');
               location.reload();
            }
        }
    });
}
function pathology_prescription_payment_status()
    {
    payment_id = $('#payment_id').val();
    payment_type = $('#payment_type').val();

    var formData = new FormData();
    formData.append('payment_id',payment_id);
    formData.append('payment_type',payment_type);
    $.ajax({
        url: base_url + "Pathology/pathology_prescription_payment_status", 
        type : "POST",
        data: formData,
        processData:false,       
        contentType:false,  
        success: function(result)
        {
            $('#preloader').hide();   
            if (result == 'Valid') 
            {
               alert('Status Updated  successfully');
               location.reload();
            }
        }
    });
}
function delete_pathology_cancelled_prescription(id)
{
    if (confirm('Are you delete this Order') == true) 
    {S
        $.ajax({
            url: base_url+"Pathology/delete_pathology_cancelled_prescription", 
            type : "POST",
            data: {id : id},
            success: function(result)
            {
                if (result == 'Valid') 
                {
                    alert('Order deleted!');
                    location.reload();
                }
            }
        });
    }
}
function delete_pathology_cancelled_order(id)
{
    if (confirm('Are you delete this Order') == true) 
    {S
        $.ajax({
            url: base_url+"Pathology/delete_pathology_cancelled_order", 
            type : "POST",
            data: {id : id},
            success: function(result)
            {
                if (result == 'Valid') 
                {
                    alert('Order deleted!');
                    location.reload();
                }
            }
        });
    }
}
function pathology_order_deliver_status()
    {
    status_id = $('#status_id').val();
    delivery_status = $('#delivery_status').val();

    var formData = new FormData();
    formData.append('status_id',status_id);
    formData.append('delivery_status',delivery_status);
    $.ajax({
        url: base_url + "Pathology/pathology_order_deliver_status", 
        type : "POST",
        data: formData,
        processData:false,       
        contentType:false,  
        success: function(result)
        {
            $('#preloader').hide();   
            if (result == 'Valid') 
            {
               alert('Status Updated  successfully');
               location.reload();
            }
        }
    });
}
function pathology_order_payment_status()
    {
    payment_id = $('#payment_id').val();
    payment_status = $('#payment_status').val();

    var formData = new FormData();
    formData.append('payment_id',payment_id);
    formData.append('payment_status',payment_status);
    $.ajax({
        url: base_url + "Pathology/pathology_order_payment_status", 
        type : "POST",
        data: formData,
        processData:false,       
        contentType:false,  
        success: function(result)
        {
            $('#preloader').hide();   
            if (result == 'Valid') 
            {
               alert('Status Updated  successfully');
               location.reload();
            }
        }
    });
}

function update_pathology_report_status()
{
    if (document.myform.upload_report.value == "") {
    alert("!Please Select Report First...");
    return false;
      }
   else{
    report_id = $('#report_id').val();

    var formData = new FormData();
    formData.append('report_id',report_id);
    formData.append('file',$('#upload_report')[0].files[0]);
    
    $.ajax({
        url: base_url + "Pathology/update_pathology_report_status", 
        type : "POST",
        data: formData,
        processData:false,       
        contentType:false,  
        success: function(result)
        {
            $('#preloader').hide();   
            if (result == 'Valid') 
            {
               alert('Report Uploaded Successfully');
               location.reload();
            }
        }
    });
}
}
function update_pathology_total_amount()
{
    if (document.myform.gst_amount.value == "") {
    alert("!Please Add GST (in %) First...");
    return false;
      }
    else{
    order_id = $('#order_id').val();
    gst_amount = $('#gst_amount').val();
    total_amount = $('#total_amount').val();

    var formData = new FormData();
    formData.append('order_id',order_id);
    formData.append('gst_amount',gst_amount);
    formData.append('total_amount',total_amount);
    
    $.ajax({
        url: base_url + "Pathology/update_pathology_total_amount", 
        type : "POST",
        data: formData,
        processData:false,       
        contentType:false,  
        success: function(result)
        {
            $('#preloader').hide();   
            if (result == 'Valid') 
            {
               alert('GST Added Successfully');
               location.reload();
            }
        }
    });
}
}
function add_pathology_health_package()
{  
    if ($('#test_name').val()=="" || $('#category_name').val()=="" || $('#description').val()=="" || $('.lab_id').val()==""||
     $('.price').val()=="" || $('.offer_price').val()=="" || $('.off').val()==""){
                alert('All fields are mandatory');
            }
    else{
    package_name = $('#package_name').val();
    category_name = $('#category_name').val();
    description = $('#description').val();

    lab_id = '';
    $( ".lab_id" ).each(function() {
        lab_id = lab_id + ','+ $(this).val();
    });
    lab_id = lab_id.replace(/^,/, '');

    price = '';
    $( ".price" ).each(function() {
        price = price + ','+ $(this).val();
    });
    price = price.replace(/^,/, '');

    offer_price = '';
    $( ".offer_price" ).each(function() {
        offer_price = offer_price + ','+ $(this).val();
    });
    offer_price = offer_price.replace(/^,/, '');

    off = '';
    $( ".off" ).each(function() {
        off = off + ','+ $(this).val();
    });
    off = off.replace(/^,/, '');

   
    var formData = new FormData();
    formData.append('package_name',package_name);
    formData.append('category_name',category_name);
    formData.append('description',description);
    formData.append('lab_id',lab_id);   
    formData.append('price',price);   
    formData.append('offer_price',offer_price);   
    formData.append('off',off);


    $.ajax({
        url: base_url+"Pathology/add_health_package_test", 
        type : "POST",
        data: formData,
        processData:false,
        contentType:false,  
        success: function(result)
        {
            console.log(result);
            if (result == 'Valid') 
            {
                alert('Test Added successfully!');
                location.reload();
            }
        }
    });

}
}
function update_health_test_details()
{   
    package_id = $('#package_id').val();   
    package_name = $('#package_name').val();
    category_name = $('#category_name').val();
    description = $('#description').val();
    
    var formData = new FormData();
    formData.append('package_id',package_id);
    formData.append('package_name',package_name);
    formData.append('category_name',category_name);
    formData.append('description',description);
    
   
    $.ajax({
        url: base_url + "Pathology/edit_heatlh_pkg_test_details", 
        type : "POST",
        data: formData,
        processData:false,       
        contentType:false,  
        success: function(result)
        {
            if (result == 'Valid') 
            {   
                alert('Test Updated successfully');
                location.reload();
            }
        }
    });
}
function delete_health_pkg_tests(id)
{
    if (confirm('Are you delete this Test') == true) 
    {
        $.ajax({
            url: base_url+"Pathology/delete_health_test_price_details", 
            type : "POST",
            data: {id : id},
            success: function(result)
            {
                if (result == 'Valid') 
                {
                    alert('Health Package Price deleted!');
                    location.reload();
                }
            }
        });
    }
}
function delete_health_package(id)
{
    if (confirm('Are you delete this Test') == true) 
    {
        $.ajax({
            url: base_url+"Pathology/delete_health_package_details", 
            type : "POST",
            data: {id : id},
            success: function(result)
            {
                if (result == 'Valid') 
                {
                    alert('Health Package deleted!');
                    location.reload();
                }
            }
        });
    }
}
function add_price_health_test_data()
{   
    package_id=$('#package_id').val();
    lab_id = '';
    $( ".lab_id" ).each(function() {
        lab_id = lab_id + ','+ $(this).val();
    });
    lab_id = lab_id.replace(/^,/, '');

    price = '';
    $( ".price" ).each(function() {
        price = price + ','+ $(this).val();
    });
    price = price.replace(/^,/, '');

    offer_price = '';
    $( ".offer_price" ).each(function() {
        offer_price = offer_price + ','+ $(this).val();
    });
    offer_price = offer_price.replace(/^,/, '');

    off = '';
    $( ".off" ).each(function() {
        off = off + ','+ $(this).val();
    });
    off = off.replace(/^,/, '');

    var formData = new FormData();
    formData.append('package_id',package_id); 
    formData.append('lab_id',lab_id);   
    formData.append('price',price);   
    formData.append('offer_price',offer_price);   
    formData.append('off',off);  
    $.ajax({
        url: base_url+"Pathology/add_health_price_modal", 
        type : "POST",
        data: formData,
        processData:false,
        contentType:false,  
        success: function(result)
        {
            if (result == 'Valid') 
            {
                alert('update successfully!');
                location.reload();
            }
        }
    });
}

function add_pathology_executive_health_package()
{  
    if ($('#package_name').val()=="" || $('#description').val()=="" || $('.lab_id').val()==""||
     $('.price').val()=="" || $('.offer_price').val()=="" || $('.off').val()==""){
                alert('All fields are mandatory');
            }
    else{
    package_name = $('#package_name').val();
    description = $('#description').val();

    lab_id = '';
    $( ".lab_id" ).each(function() {
        lab_id = lab_id + ','+ $(this).val();
    });
    lab_id = lab_id.replace(/^,/, '');

    price = '';
    $( ".price" ).each(function() {
        price = price + ','+ $(this).val();
    });
    price = price.replace(/^,/, '');

    offer_price = '';
    $( ".offer_price" ).each(function() {
        offer_price = offer_price + ','+ $(this).val();
    });
    offer_price = offer_price.replace(/^,/, '');

    off = '';
    $( ".off" ).each(function() {
        off = off + ','+ $(this).val();
    });
    off = off.replace(/^,/, '');

   
    var formData = new FormData();
    formData.append('package_name',package_name);
    formData.append('description',description);
    formData.append('lab_id',lab_id);   
    formData.append('price',price);   
    formData.append('offer_price',offer_price);   
    formData.append('off',off);


    $.ajax({
        url: base_url+"Pathology/add_executive_health_package_test", 
        type : "POST",
        data: formData,
        processData:false,
        contentType:false,  
        success: function(result)
        {
            console.log(result);
            if (result == 'Valid') 
            {
                alert('Test Added successfully!');
                location.reload();
            }
        }
    });

}
}
function update_executive_health_test_details()
{   
    package_id = $('#package_id').val();   
    package_name = $('#package_name').val();
    category_name = $('#category_name').val();
    description = $('#description').val();
    
    var formData = new FormData();
    formData.append('package_id',package_id);
    formData.append('package_name',package_name);
    formData.append('category_name',category_name);
    formData.append('description',description);
    
   
    $.ajax({
        url: base_url + "Pathology/edit_executive_heatlh_pkg_test_details", 
        type : "POST",
        data: formData,
        processData:false,       
        contentType:false,  
        success: function(result)
        {
            if (result == 'Valid') 
            {   
                alert('Test Updated successfully');
                location.reload();
            }
        }
    });
}
function delete_executive_health_pkg_tests(id)
{
    if (confirm('Are you delete this Test') == true) 
    {
        $.ajax({
            url: base_url+"Pathology/delete_executive_health_test_price_details", 
            type : "POST",
            data: {id : id},
            success: function(result)
            {
                if (result == 'Valid') 
                {
                    alert('Executive Health Package Price deleted!');
                    location.reload();
                }
            }
        });
    }
}
function delete_executive_health_package(id)
{
    if (confirm('Are you delete this Test') == true) 
    {
        $.ajax({
            url: base_url+"Pathology/delete_executive_health_package_details", 
            type : "POST",
            data: {id : id},
            success: function(result)
            {
                if (result == 'Valid') 
                {
                    alert('Executive Health Package deleted!');
                    location.reload();
                }
            }
        });
    }
}
function add_price_executive_health_test_data()
{   
    package_id=$('#package_id').val();
    lab_id = '';
    $( ".lab_id" ).each(function() {
        lab_id = lab_id + ','+ $(this).val();
    });
    lab_id = lab_id.replace(/^,/, '');

    price = '';
    $( ".price" ).each(function() {
        price = price + ','+ $(this).val();
    });
    price = price.replace(/^,/, '');

    offer_price = '';
    $( ".offer_price" ).each(function() {
        offer_price = offer_price + ','+ $(this).val();
    });
    offer_price = offer_price.replace(/^,/, '');

    off = '';
    $( ".off" ).each(function() {
        off = off + ','+ $(this).val();
    });
    off = off.replace(/^,/, '');

    var formData = new FormData();
    formData.append('package_id',package_id); 
    formData.append('lab_id',lab_id);   
    formData.append('price',price);   
    formData.append('offer_price',offer_price);   
    formData.append('off',off);  
    $.ajax({
        url: base_url+"Pathology/add_executive_health_price_modal", 
        type : "POST",
        data: formData,
        processData:false,
        contentType:false,  
        success: function(result)
        {
            if (result == 'Valid') 
            {
                alert('update successfully!');
                location.reload();
            }
        }
    });
}

function add_radiology_labs()
{
    if ($('#lab_name').val()=="" || $('#logo_image').val()=="" || $('#email').val()=="" || $('#address').val()==""|| $('#city').val()=="" || $('#state').val()=="" || $('#mobile_no').val()=="" || $('#landline_no').val()==""){
                alert('All Fields Are Mandatory! Please Fill All Input Fields... ');
        }
    else{
    lab_name = $('#lab_name').val();
    email = $('#email').val();
    address = $('#address').val();
    r_city = $('#r_city').val();
    r_state = $('#r_state').val();
    mobile_no = $('#mobile_no').val();
    landline_no = $('#landline_no').val();
    
    var formData = new FormData();
    formData.append('lab_name',lab_name);
    formData.append('file1',$('#logo_image')[0].files[0]);
    formData.append('email',email);
    formData.append('address',address);
    formData.append('r_city',r_city);
    formData.append('r_state',r_state);
    formData.append('mobile_no',mobile_no);
    formData.append('landline_no',landline_no);

    $.ajax({
        url: base_url + "Radiology/add_radiology_labs", 
        type : "POST",
        data: formData,
        processData:false,       
        contentType:false,  
        success: function(result)
        {
            if (result == 'Valid') 
            {   
                alert('Lab Added successfully');
                location.reload();
            }
        }
    });
}
}
function edit_radiology_lab_details()
{
    lab_id = $('#lab_id').val();
    lab_name = $('#lab_name').val();
    email = $('#email').val();
    address = $('#address').val();
    r_city = $('#r_city').val();
    r_state = $('#r_state').val();
    mobile_no = $('#mobile_no').val();
    landline_no = $('#landline_no').val();
    
    var formData = new FormData();
    formData.append('lab_id',lab_id);
    formData.append('lab_name',lab_name);
    formData.append('email',email);
    formData.append('file1',$('#logo_image')[0].files[0]); 
    formData.append('address',address);
    formData.append('r_city',r_city);
    formData.append('r_state',r_state);
    formData.append('mobile_no',mobile_no);
    formData.append('landline_no',landline_no);

    $.ajax({
        url: base_url + "Radiology/edit_radiology_labs", 
        type : "POST",
        data: formData,
        processData:false,       
        contentType:false,  
        success: function(result)
        {
            if (result == 'Valid') 
            {   
                alert('Lab Updated successfully');
                location.reload();
            }
        }
    });
}
function delete_radiology_labs(id)
{
    if (confirm('Are you delete this Lab') == true) 
    {
        $.ajax({
            url: base_url+"Radiology/delete_radiology_lab_details", 
            type : "POST",
            data: {id : id},
            success: function(result)
            {
                if (result == 'Valid') 
                {
                    alert('Lab deleted!');
                    location.reload();
                }
            }
        });
    }
}
function add_radiology_test()
{
    if ($('#test_name').val()=="" || $('#description').val()=="" || $('.lab_id').val()==""||
     $('.price').val()=="" || $('.offer_price').val()=="" || $('.off').val()==""){
                alert('All fields are mandatory');
            }
    else{
    test_name = $('#test_name').val();
    description = $('#description').val();

    lab_id = '';
    $( ".lab_id" ).each(function() {
        lab_id = lab_id + ','+ $(this).val();
    });
    lab_id = lab_id.replace(/^,/, '');

    price = '';
    $( ".price" ).each(function() {
        price = price + ','+ $(this).val();
    });
    price = price.replace(/^,/, '');

    offer_price = '';
    $( ".offer_price" ).each(function() {
        offer_price = offer_price + ','+ $(this).val();
    });
    offer_price = offer_price.replace(/^,/, '');

    off = '';
    $( ".off" ).each(function() {
        off = off + ','+ $(this).val();
    });
    off = off.replace(/^,/, '');

   
    var formData = new FormData();
    formData.append('test_name',test_name);
    formData.append('description',description);
    formData.append('lab_id',lab_id);   
    formData.append('price',price);   
    formData.append('offer_price',offer_price);   
    formData.append('off',off);

    $.ajax({
        url: base_url+"Radiology/add_radiology_test", 
        type : "POST",
        data: formData,
        processData:false,
        contentType:false,  
        success: function(result)
        {
            console.log(result);
            if (result == 'Valid') 
            {
                alert('Test Added successfully!');
                location.reload();
            }
        }
    });

}
}
function update_radiology_test_details()
{   
    test_id = $('#test_id').val();   
    test_name = $('#test_name').val();
    description = $('#description').val();
    
    var formData = new FormData();
    formData.append('test_id',test_id);
    formData.append('test_name',test_name);
    formData.append('description',description);
    
   
    $.ajax({
        url: base_url + "Radiology/edit_radiology_test_details", 
        type : "POST",
        data: formData,
        processData:false,       
        contentType:false,  
        success: function(result)
        {
            if (result == 'Valid') 
            {   
                alert('Test Updated successfully');
                location.reload();
            }
        }
    });
}
function delete_radiology_test_price(id)
{
    if (confirm('Are you delete this Test') == true) 
    {
        $.ajax({
            url: base_url+"Radiology/delete_radiology_test_price_details", 
            type : "POST",
            data: {id : id},
            success: function(result)
            {
                if (result == 'Valid') 
                {
                    alert('Test deleted!');
                    location.reload();
                }
            }
        });
    }
}
function add_radiology_price_test_data()
{   
    test_id=$('#test_id').val();
    lab_id = '';
    $( ".lab_id" ).each(function() {
        lab_id = lab_id + ','+ $(this).val();
    });
    lab_id = lab_id.replace(/^,/, '');

    price = '';
    $( ".price" ).each(function() {
        price = price + ','+ $(this).val();
    });
    price = price.replace(/^,/, '');

    offer_price = '';
    $( ".offer_price" ).each(function() {
        offer_price = offer_price + ','+ $(this).val();
    });
    offer_price = offer_price.replace(/^,/, '');

    off = '';
    $( ".off" ).each(function() {
        off = off + ','+ $(this).val();
    });
    off = off.replace(/^,/, '');

    var formData = new FormData();
    formData.append('test_id',test_id); 
    formData.append('lab_id',lab_id);   
    formData.append('price',price);   
    formData.append('offer_price',offer_price);   
    formData.append('off',off);  
    $.ajax({
        url: base_url+"Radiology/add_radiology_price_modal", 
        type : "POST",
        data: formData,
        processData:false,
        contentType:false,  
        success: function(result)
        {
            if (result == 'Valid') 
            {
                alert('Price added successfully!');
                location.reload();
            }
        }
    });
}
function delete_radiology_tests(id)
{
    if (confirm('Are you delete this Lab') == true) 
    {
        $.ajax({
            url: base_url+"Radiology/delete_radiology_test_details", 
            type : "POST",
            data: {id : id},
            success: function(result)
            {
                if (result == 'Valid') 
                {
                    alert('Test deleted!');
                    location.reload();
                }
            }
        });
    }
}
function radiology_prescription_deliver_status()
    {
    status_id = $('#status_id').val();
    status = $('#status').val();

    var formData = new FormData();
    formData.append('status_id',status_id);
    formData.append('status',status);
    $.ajax({
        url: base_url + "Radiology/radiology_prescription_deliver_status", 
        type : "POST",
        data: formData,
        processData:false,       
        contentType:false,  
        success: function(result)
        {
            $('#preloader').hide();   
            if (result == 'Valid') 
            {
               alert('Status Updated  successfully');
               location.reload();
            }
        }
    });
}
function radiology_prescription_payment_status()
    {
    payment_id = $('#payment_id').val();
    payment_type = $('#payment_type').val();

    var formData = new FormData();
    formData.append('payment_id',payment_id);
    formData.append('payment_type',payment_type);
    $.ajax({
        url: base_url + "Radiology/radiology_prescription_payment_status", 
        type : "POST",
        data: formData,
        processData:false,       
        contentType:false,  
        success: function(result)
        {
            $('#preloader').hide();   
            if (result == 'Valid') 
            {
               alert('Status Updated  successfully');
               location.reload();
            }
        }
    });
}
function radiology_order_deliver_status()
    {
    status_id = $('#status_id').val();
    delivery_status = $('#delivery_status').val();

    var formData = new FormData();
    formData.append('status_id',status_id);
    formData.append('delivery_status',delivery_status);
    $.ajax({
        url: base_url + "Radiology/radiology_order_deliver_status", 
        type : "POST",
        data: formData,
        processData:false,       
        contentType:false,  
        success: function(result)
        {
            $('#preloader').hide();   
            if (result == 'Valid') 
            {
               alert('Status Updated  successfully');
               location.reload();
            }
        }
    });
}
function radiology_order_payment_status()
    {
    payment_id = $('#payment_id').val();
    payment_status = $('#payment_status').val();

    var formData = new FormData();
    formData.append('payment_id',payment_id);
    formData.append('payment_status',payment_status);
    $.ajax({
        url: base_url + "Radiology/radiology_order_payment_status", 
        type : "POST",
        data: formData,
        processData:false,       
        contentType:false,  
        success: function(result)
        {
            $('#preloader').hide();   
            if (result == 'Valid') 
            {
               alert('Status Updated  successfully');
               location.reload();
            }
        }
    });
}

function add_radiology_medicine_price()
{
    if (document.myform.medicine_name.value == "") {
    alert("Enter Medicine Name...");
    return false;
      }
    else if (document.myform.medicine_price.value == "") {
    alert("Enter Medicine Price...");
    return false;
      }  
    else if (document.myform.qty.value == "") {
    alert("Enter Quantity First...");
    return false;
      } 
   else{
    order_id = $('#order_id').val();
    price = $('#price').val();

    medicine_name = '';
    $( ".medicine_name" ).each(function() {
        medicine_name = medicine_name + ','+ $(this).val();
    });
    medicine_name = medicine_name.replace(/^,/, '');

    medicine_price = '';
    $( ".medicine_price" ).each(function() {
        medicine_price = medicine_price + ','+ $(this).val();
    });
    medicine_price = medicine_price.replace(/^,/, '');

    qty = '';
    $( ".qty" ).each(function() {
        qty = qty + ','+ $(this).val();
    });
    qty = qty.replace(/^,/, '');


    var formData = new FormData();
    formData.append('order_id',order_id);
    formData.append('price',price);
    formData.append('medicine_name',medicine_name);
    formData.append('medicine_price',medicine_price);
    formData.append('qty',qty);
    
    $.ajax({
        url: base_url + "Radiology/add_radiology_medicine_price", 
        type : "POST",
        data: formData,
        processData:false,       
        contentType:false,  
        success: function(result)
        {
            $('#preloader').hide();   
            if (result == 'Valid') 
            {
               alert('Updated Successfully');
               location.reload();
            }
        }
    });
}
}
function update_radiology_cod_status()
    {
    status_id = $('#status_id').val();
    status = $('#status').val();

    var formData = new FormData();
    formData.append('status_id',status_id);
    formData.append('status',status);
    $.ajax({
        url: base_url + "Radiology/update_radiology_cod_status", 
        type : "POST",
        data: formData,
        processData:false,       
        contentType:false,  
        success: function(result)
        {
            $('#preloader').hide();   
            if (result == 'Valid') 
            {
               alert('Status Updated  successfully');
               location.reload();
            }
        }
    });
}
function update_radiology_report_status()
{ 
   if (document.myform.upload_report.value == "") {
        alert("!Please Select Report First...");
        return false;
      }
   else{
    report_id = $('#report_id').val();

    var formData = new FormData();
    formData.append('report_id',report_id);
    formData.append('file',$('#upload_report')[0].files[0]);
    
    $.ajax({
        url: base_url + "Radiology/update_radiology_report_status", 
        type : "POST",
        data: formData,
        processData:false,       
        contentType:false,  
        success: function(result)
        {
            $('#preloader').hide();   
            if (result == 'Valid') 
            {
               alert('Report Uploaded Successfully');
               location.reload();
            }
        }
    });
}
}
function update_radiology_total_amount()
{
    if (document.myform.gst_amount.value == "") {
    alert("!Please Add GST (in %) First...");
    return false;
      }
    else{
    order_id = $('#order_id').val();
    gst_amount = $('#gst_amount').val();
    total_amount = $('#total_amount').val();

    var formData = new FormData();
    formData.append('order_id',order_id);
    formData.append('gst_amount',gst_amount);
    formData.append('total_amount',total_amount);
    
    $.ajax({
        url: base_url + "Radiology/update_radiology_total_amount", 
        type : "POST",
        data: formData,
        processData:false,       
        contentType:false,  
        success: function(result)
        {
            $('#preloader').hide();   
            if (result == 'Valid') 
            {
               alert('GST Added Successfully');
               location.reload();
            }
        }
    });
}
}
function delete_radiology_canceled_order(id)
{
    if (confirm('Are you delete this Order') == true) 
    {S
        $.ajax({
            url: base_url+"Radiology/delete_radiology_cancelled_order", 
            type : "POST",
            data: {id : id},
            success: function(result)
            {
                if (result == 'Valid') 
                {
                    alert('Order deleted!');
                    location.reload();
                }
            }
        });
    }
}
function delete_radiology_canceled_prescription(id)
{
    if (confirm('Are you delete this Order') == true) 
    {S
        $.ajax({
            url: base_url+"Radiology/delete_radiology_cancelled_prescription", 
            type : "POST",
            data: {id : id},
            success: function(result)
            {
                if (result == 'Valid') 
                {
                    alert('Order deleted!');
                    location.reload();
                }
            }
        });
    }
}
function add_physiotherapy_labs()
{
    if ($('#lab_name').val()=="" || $('#logo_image').val()=="" || $('#email').val()=="" || $('#address').val()==""|| $('#city').val()=="" || $('#state').val()=="" || $('#mobile_no').val()=="" || $('#landline_no').val()==""){
                alert('All Fields Are Mandatory! Please Fill All Input Fields... ');
        }
    else{
    lab_name = $('#lab_name').val();
    email = $('#email').val();
    address = $('#address').val();
    p_city = $('#p_city').val();
    p_state = $('#p_state').val();
    mobile_no = $('#mobile_no').val();
    landline_no = $('#landline_no').val();
    
    var formData = new FormData();
    formData.append('lab_name',lab_name);
    formData.append('file1',$('#logo_image')[0].files[0]);
    formData.append('email',email);
    formData.append('address',address);
    formData.append('p_city',p_city);
    formData.append('p_state',p_state);
    formData.append('mobile_no',mobile_no);
    formData.append('landline_no',landline_no);

   
    $.ajax({
        url: base_url + "Physiotherapy/add_physiotherapy_labs", 
        type : "POST",
        data: formData,
        processData:false,       
        contentType:false,  
        success: function(result)
        {
            if (result == 'Valid') 
            {   
                alert('Lab Added successfully');
                location.reload();
            }
        }
    });
}
}
function edit_physiotherapy_lab_details()
{
    lab_id = $('#lab_id').val();
    lab_name = $('#lab_name').val();
    email = $('#email').val();
    address = $('#address').val();
    p_city = $('#p_city').val();
    p_state = $('#p_state').val();
    mobile_no = $('#mobile_no').val();
    landline_no = $('#landline_no').val();
    
    var formData = new FormData();
    formData.append('lab_id',lab_id);
    formData.append('lab_name',lab_name);
    formData.append('file1',$('#logo_image')[0].files[0]);
    formData.append('email',email);
    formData.append('address',address);
    formData.append('p_city',p_city);
    formData.append('p_state',p_state);
    formData.append('mobile_no',mobile_no);
    formData.append('landline_no',landline_no);

   
    $.ajax({
        url: base_url + "Physiotherapy/edit_physiotherapy_labs", 
        type : "POST",
        data: formData,
        processData:false,       
        contentType:false,  
        success: function(result)
        {
            if (result == 'Valid') 
            {   
                alert('Lab Updated successfully');
                location.reload();
            }
        }
    });
}
function delete_physiotherapy_lab(id)
{
    if (confirm('Are you delete this Lab') == true) 
    {
        $.ajax({
            url: base_url+"Physiotherapy/delete_physiotherapy_lab_details", 
            type : "POST",
            data: {id : id},
            success: function(result)
            {
                if (result == 'Valid') 
                {
                    alert('Lab deleted!');
                    location.reload();
                }
            }
        });
    }
}
function delete_physiotherapy_test(id)
{
    if (confirm('Are you delete this Test') == true) 
    {
        $.ajax({
            url: base_url+"Physiotherapy/delete_physiotherapy_test_details", 
            type : "POST",
            data: {id : id},
            success: function(result)
            {
                if (result == 'Valid') 
                {
                    alert('Test deleted!');
                    location.reload();
                }
            }
        });
    }
}

function add_physiotherapy_test()
{
    if ($('#test_name').val()=="" || $('#description').val()=="" || $('.lab_id').val()==""||
     $('.price').val()=="" || $('.offer_price').val()=="" || $('.off').val()==""){
                alert('All fields are mandatory');
            }
    else{
    test_name = $('#test_name').val();
    description = $('#description').val();

    lab_id = '';
    $( ".lab_id" ).each(function() {
        lab_id = lab_id + ','+ $(this).val();
    });
    lab_id = lab_id.replace(/^,/, '');

    price = '';
    $( ".price" ).each(function() {
        price = price + ','+ $(this).val();
    });
    price = price.replace(/^,/, '');

    offer_price = '';
    $( ".offer_price" ).each(function() {
        offer_price = offer_price + ','+ $(this).val();
    });
    offer_price = offer_price.replace(/^,/, '');

    off = '';
    $( ".off" ).each(function() {
        off = off + ','+ $(this).val();
    });
    off = off.replace(/^,/, '');

   
    var formData = new FormData();
    formData.append('test_name',test_name);
    formData.append('description',description);
    formData.append('lab_id',lab_id);   
    formData.append('price',price);   
    formData.append('offer_price',offer_price);   
    formData.append('off',off);


    $.ajax({
        url: base_url+"Physiotherapy/add_physiotherapy_test", 
        type : "POST",
        data: formData,
        processData:false,
        contentType:false,  
        success: function(result)
        {
            console.log(result);
            if (result == 'Valid') 
            {
                alert('Test Added successfully!');
                location.reload();
            }
        }
    });
}
}
function update_physiotherapy_test_details()
{   
    test_id = $('#test_id').val();   
    test_name = $('#test_name').val();
    description = $('#description').val();
    
    var formData = new FormData();
    formData.append('test_id',test_id);
    formData.append('test_name',test_name);
    formData.append('description',description);
    
   
    $.ajax({
        url: base_url + "physiotherapy/edit_physiotherapy_test_details", 
        type : "POST",
        data: formData,
        processData:false,       
        contentType:false,  
        success: function(result)
        {
            if (result == 'Valid') 
            {   
                alert('Test Updated successfully');
                location.reload();
            }
        }
    });
}
function delete_physiotherapy_test_price(id)
{
    if (confirm('Are you delete this Test') == true) 
    {
        $.ajax({
            url: base_url+"Physiotherapy/delete_physiotherapy_test_price_details", 
            type : "POST",
            data: {id : id},
            success: function(result)
            {
                if (result == 'Valid') 
                {
                    alert('Test deleted!');
                    location.reload();
                }
            }
        });
    }
}
function add_physiotherapy_price_test_data()
{   
    test_id=$('#test_id').val();
    lab_id = '';
    $( ".lab_id" ).each(function() {
        lab_id = lab_id + ','+ $(this).val();
    });
    lab_id = lab_id.replace(/^,/, '');

    price = '';
    $( ".price" ).each(function() {
        price = price + ','+ $(this).val();
    });
    price = price.replace(/^,/, '');

    offer_price = '';
    $( ".offer_price" ).each(function() {
        offer_price = offer_price + ','+ $(this).val();
    });
    offer_price = offer_price.replace(/^,/, '');

    off = '';
    $( ".off" ).each(function() {
        off = off + ','+ $(this).val();
    });
    off = off.replace(/^,/, '');

    var formData = new FormData();
    formData.append('test_id',test_id); 
    formData.append('lab_id',lab_id);   
    formData.append('price',price);   
    formData.append('offer_price',offer_price);   
    formData.append('off',off);  
    $.ajax({
        url: base_url+"Physiotherapy/add_physiotherapy_price_modal", 
        type : "POST",
        data: formData,
        processData:false,
        contentType:false,  
        success: function(result)
        {
            if (result == 'Valid') 
            {
                alert('Price added successfully!');
                location.reload();
            }
        }
    });
}
function delete_physiotherapy_tests(id)
{
    if (confirm('Are you delete this Lab') == true) 
    {
        $.ajax({
            url: base_url+"Physiotherapy/delete_physiotherapy_test_details", 
            type : "POST",
            data: {id : id},
            success: function(result)
            {
                if (result == 'Valid') 
                {
                    alert('Test deleted!');
                    location.reload();
                }
            }
        });
    }
}

function add_physiotherapy_medicine_price()
{
    if (document.myform.medicine_name.value == "") {
    alert("Enter Medicine Name...");
    return false;
      }
    else if (document.myform.medicine_price.value == "") {
    alert("Enter Medicine Price...");
    return false;
      }  
    else if (document.myform.qty.value == "") {
    alert("Enter Quantity First...");
    return false;
      } 
   else{
    order_id = $('#order_id').val();
    price = $('#price').val();

    medicine_name = '';
    $( ".medicine_name" ).each(function() {
        medicine_name = medicine_name + ','+ $(this).val();
    });
    medicine_name = medicine_name.replace(/^,/, '');

    medicine_price = '';
    $( ".medicine_price" ).each(function() {
        medicine_price = medicine_price + ','+ $(this).val();
    });
    medicine_price = medicine_price.replace(/^,/, '');

    qty = '';
    $( ".qty" ).each(function() {
        qty = qty + ','+ $(this).val();
    });
    qty = qty.replace(/^,/, '');


    var formData = new FormData();
    formData.append('order_id',order_id);
    formData.append('price',price);
    formData.append('medicine_name',medicine_name);
    formData.append('medicine_price',medicine_price);
    formData.append('qty',qty);
    
    $.ajax({
        url: base_url + "Physiotherapy/add_physiotherapy_medicine_price", 
        type : "POST",
        data: formData,
        processData:false,       
        contentType:false,  
        success: function(result)
        {
            $('#preloader').hide();   
            if (result == 'Valid') 
            {
               alert('Updated Successfully');
               location.reload();
            }
        }
    });
}
}
function physiotherapy_prescription_deliver_status()
    {
    status_id = $('#status_id').val();
    status = $('#status').val();

    var formData = new FormData();
    formData.append('status_id',status_id);
    formData.append('status',status);
    $.ajax({
        url: base_url + "Physiotherapy/physiotherapy_prescription_deliver_status", 
        type : "POST",
        data: formData,
        processData:false,       
        contentType:false,  
        success: function(result)
        {
            $('#preloader').hide();   
            if (result == 'Valid') 
            {
               alert('Status Updated  successfully');
               location.reload();
            }
        }
    });
}
function physiotherapy_prescription_payment_status()
    {
    payment_id = $('#payment_id').val();
    payment_type = $('#payment_type').val();

    var formData = new FormData();
    formData.append('payment_id',payment_id);
    formData.append('payment_type',payment_type);
    $.ajax({
        url: base_url + "Physiotherapy/physiotherapy_prescription_payment_status", 
        type : "POST",
        data: formData,
        processData:false,       
        contentType:false,  
        success: function(result)
        {
            $('#preloader').hide();   
            if (result == 'Valid') 
            {
               alert('Status Updated  successfully');
               location.reload();
            }
        }
    });
}
function delete_physiotherapy_cancelled_prescription(id)
{
    if (confirm('Are you delete this Order') == true) 
    {S
        $.ajax({
            url: base_url+"Physiotherapy/delete_physiotherapy_cancelled_prescription", 
            type : "POST",
            data: {id : id},
            success: function(result)
            {
                if (result == 'Valid') 
                {
                    alert('Order deleted!');
                    location.reload();
                }
            }
        });
    }
}
function delete_physiotherapy_cancelled_order(id)
{
    if (confirm('Are you delete this Order') == true) 
    {S
        $.ajax({
            url: base_url+"Physiotherapy/delete_physiotherapy_cancelled_order", 
            type : "POST",
            data: {id : id},
            success: function(result)
            {
                if (result == 'Valid') 
                {
                    alert('Order deleted!');
                    location.reload();
                }
            }
        });
    }
}
function physiotherapy_order_deliver_status()
    {
    status_id = $('#status_id').val();
    delivery_status = $('#delivery_status').val();

    var formData = new FormData();
    formData.append('status_id',status_id);
    formData.append('delivery_status',delivery_status);
    $.ajax({
        url: base_url + "Physiotherapy/physiotherapy_order_deliver_status", 
        type : "POST",
        data: formData,
        processData:false,       
        contentType:false,  
        success: function(result)
        {
            $('#preloader').hide();   
            if (result == 'Valid') 
            {
               alert('Status Updated  successfully');
               location.reload();
            }
        }
    });
}
function physiotherapy_order_payment_status()
    {
    payment_id = $('#payment_id').val();
    payment_status = $('#payment_status').val();

    var formData = new FormData();
    formData.append('payment_id',payment_id);
    formData.append('payment_status',payment_status);
    $.ajax({
        url: base_url + "Physiotherapy/physiotherapy_order_payment_status", 
        type : "POST",
        data: formData,
        processData:false,       
        contentType:false,  
        success: function(result)
        {
            $('#preloader').hide();   
            if (result == 'Valid') 
            {
               alert('Status Updated  successfully');
               location.reload();
            }
        }
    });
}
function update_physiotherapy_report_status()
{
    if (document.myform.upload_report.value == "") {
    alert("!Please Select Report First...");
    return false;
      }
   else{
    report_id = $('#report_id').val();

    var formData = new FormData();
    formData.append('report_id',report_id);
    formData.append('file',$('#upload_report')[0].files[0]);
    
    $.ajax({
        url: base_url + "Physiotherapy/update_physiotherapy_report_status", 
        type : "POST",
        data: formData,
        processData:false,       
        contentType:false,  
        success: function(result)
        {
            $('#preloader').hide();   
            if (result == 'Valid') 
            {
               alert('Report Uploaded  successfully');
               location.reload();
            }
        }
    });
}
}
function update_physiotherapy_total_amount()
{
    if (document.myform.gst_amount.value == "") {
    alert("!Please Add GST (in %) First...");
    return false;
      }
    else{
    order_id = $('#order_id').val();
    gst_amount = $('#gst_amount').val();
    total_amount = $('#total_amount').val();

    var formData = new FormData();
    formData.append('order_id',order_id);
    formData.append('gst_amount',gst_amount);
    formData.append('total_amount',total_amount);
    
    $.ajax({
        url: base_url + "Physiotherapy/update_physiotherapy_total_amount", 
        type : "POST",
        data: formData,
        processData:false,       
        contentType:false,  
        success: function(result)
        {
            $('#preloader').hide();   
            if (result == 'Valid') 
            {
               alert('GST Added Successfully');
               location.reload();
            }
        }
    });
}
}
function update_radiology_report_status()
{ 
   if (document.myform.upload_report.value == "") {
        alert("!Please Select Report First...");
        return false;
      }
   else{
    report_id = $('#report_id').val();

    var formData = new FormData();
    formData.append('report_id',report_id);
    formData.append('file',$('#upload_report')[0].files[0]);
    
    $.ajax({
        url: base_url + "Radiology/update_radiology_report_status", 
        type : "POST",
        data: formData,
        processData:false,       
        contentType:false,  
        success: function(result)
        {
            $('#preloader').hide();   
            if (result == 'Valid') 
            {
               alert('Report Uploaded Successfully');
               location.reload();
            }
        }
    });
}
}
function add_nursing_price()
{
    if ($('#time').val()=="" || $('#price').val()=="" ){
                alert('All fields are mandatory');
            }
    else{        
    time = $('#time').val();
    price = $('#price').val();

    var formData = new FormData();
    formData.append('time',time);
    formData.append('price',price);
    $.ajax({
        url: base_url + "Nursing/add_nursing_price", 
        type : "POST",
        data: formData,
        processData:false,       
        contentType:false,  
        success: function(result)
        {
             $('#preloader').hide(); 
             if (result == 'Valid') 
            {   
                alert('Nursing Price Added successfully');
                location.reload();
            }
        }
    });
}
}
function edit_nursing_price_details()
{  
    nursing_id = $('#nursing_id').val();     
    time = $('#time').val();
    price = $('#price').val();

    var formData = new FormData();
    formData.append('nursing_id',nursing_id);
    formData.append('time',time);
    formData.append('price',price);
    $.ajax({
        url: base_url + "Nursing/edit_nursing_price", 
        type : "POST",
        data: formData,
        processData:false,       
        contentType:false,  
        success: function(result)
        {
             $('#preloader').hide(); 
             if (result == 'Valid') 
            {   
                alert('Nursing Updated successfully');
                location.reload();
            }
        }
    });
}
function delete_nursing_price(id)
{
    if (confirm('Are you delete this Details') == true) 
    {
        $.ajax({
            url: base_url+"Nursing/delete_nursing_details", 
            type : "POST",
            data: {id : id},
            success: function(result)
            {
                if (result == 'Valid') 
                {
                    alert('Detail deleted!');
                    location.reload();
                }
            }
        });
    }
}
function update_nursing_price()
    {
    price_id = $('#price_id').val();
    price = $('#price').val();

    var formData = new FormData();
    formData.append('price_id',price_id);
    formData.append('price',price);
    $.ajax({
        url: base_url + "Nursing/update_nursing_price", 
        type : "POST",
        data: formData,
        processData:false,       
        contentType:false,  
        success: function(result)
        {
            $('#preloader').hide();   
            if (result == 'Valid') 
            {
               alert('Price Updated  successfully');
               location.reload();
            }
        }
    });
}

function add_vendor()
{
   if ($('#name').val()=="" || $('#email').val()=="" || $('#mobile_no').val()=="" || $('#address').val()==""
   || $('#password').val()=="" ){
                alert('All fields are mandatory');
            }
    else{
    name = $('#name').val();
    company_name = $('#company_name').val();
    email = $('#email').val();
    mobile_no = $('#mobile_no').val();
    address = $('#address').val();
    password = $('#password').val();
    
    var role = [];
        $('input[type=checkbox]').each(function(){
            if($(this).is(':checked')){
                role.push($(this).val());
            }
        })
    var formData = new FormData();
    formData.append('name',name);
    formData.append('company_name',company_name);
    formData.append('email',email);
    formData.append('mobile_no',mobile_no);
    formData.append('address',address);
    formData.append('password',password);
    formData.append('role', role.join(', '))
   
    $.ajax({
        url: base_url + "Vendor/add_vendor", 
        type : "POST",
        data: formData,
        processData:false,       
        contentType:false,  
        success: function(result)
        {
            if (result == 'Valid') 
            {   
                alert('Vendor Added successfully');
                location.reload();
            }
        }
    });
}
}
function edit_vendor_data()
{
    vendor_id = $('#vendor_id').val();
    name = $('#name').val();
    company_name = $('#company_name').val();
    email = $('#email').val();
    mobile_no = $('#mobile_no').val();
    address = $('#address').val();
    password = $('#password').val();
    
    var role = [];
        $('input[type=checkbox]').each(function(){
            if($(this).is(':checked')){
                role.push($(this).val());
            }
        })
    var formData = new FormData();
    formData.append('name',name);
    formData.append('vendor_id',vendor_id);
    formData.append('company_name',company_name);
    formData.append('email',email);
    formData.append('mobile_no',mobile_no);
    formData.append('address',address);
    formData.append('password',password);
    formData.append('role', role.join(', '))
   
    $.ajax({
        url: base_url + "Vendor/update_vendor_details", 
        type : "POST",
        data: formData,
        processData:false,       
        contentType:false,  
        success: function(result)
        {
            if (result == 'Valid') 
            {   
                alert('Vendor Updated successfully');
                location.reload();
            }
        }
    });
}
function delete_vendor_details(id)
{
    if (confirm('Are you delete this Vendor') == true) 
    {
        $.ajax({
            url: base_url+"Vendor/delete_vendor", 
            type : "POST",
            data: {id : id},
            success: function(result)
            {
                if (result == 'Valid') 
                {
                    alert('Vendor deleted!');
                    location.reload();
                }
            }
        });
    }
}
function update_vendor_profile()
{   
    profile_id = $('#profile_id').val();
    name = $('#name').val();
    company_name = $('#company_name').val();
    mobile_no = $('#mobile_no').val();
    address = $('#address').val();
    password = $('#password').val();
    
    var formData = new FormData();
    formData.append('profile_id',profile_id);
    formData.append('name',name);
    formData.append('company_name',company_name);
    formData.append('mobile_no',mobile_no);
    formData.append('address',address);
    formData.append('password',password);
   
    $.ajax({
        url: base_url + "Vendor/update_vendor_profile", 
        type : "POST",
        data: formData,
        processData:false,       
        contentType:false,  
        success: function(result)
        {
            if (result == 'Valid') 
            {   
                alert('Profile Update successfully');
                location.reload();
            }
        }
    });
}

function update_dietician_name_form()
{   
    order_id=$('#order_id').val();
    dietician_id = $('#dietician_id').val();

    var formData = new FormData();
    formData.append('order_id',order_id);
    formData.append('dietician_id',dietician_id);

    $.ajax({
        url: base_url+"Dietician/update_dietician_name_form", 
        type : "POST",
        data: formData,
        processData:false,
        contentType:false,  
        success: function(result)
        {
            if (result == 'Valid') 
            {
                alert('Dietician Updated successfully!');
                location.reload();
            }
        }
    });
}
function update_diet_chart_details()
{ 
   /*if (document.myform.upload_diet_chart.value == "") {
        alert("!Please Select Report First...");
        return false;
      }
   else{*/
    diet_id = $('#diet_id').val();

    var formData = new FormData();
    formData.append('diet_id',diet_id);
    formData.append('file',$('#upload_diet_chart')[0].files[0]);
    
    $.ajax({
        url: base_url + "Dietician/update_diet_chart_details", 
        type : "POST",
        data: formData,
        processData:false,       
        contentType:false,  
        success: function(result)
        {
            $('#preloader').hide();   
            if (result == 'Valid') 
            {
               alert('Report Uploaded Successfully');
               location.reload();
            }
        }
    });

}
function add_banner()
{  
    if (document.myform.banner_image.value == "") {
        alert("!Please Select Image First");
        return false;
      }
else{
    var formData = new FormData();
    formData.append('file',$('#banner_image')[0].files[0]);  
    $.ajax({
        url: base_url+"Vendor/add_banner", 
        type : "POST",
        data: formData,
        processData:false,
        contentType:false,  
        success: function(result)
        {
            if (result == 'Valid') 
            {
                alert('Banner Image Added successfully!');
                location.reload();
            }
        }
    });
}
}
function add_web_banner()
{  
   /* if (document.myform.banner_image.value == "") {
        alert("!Please Select Image First");
        return false;
      }
else{*/
    link = $('#link').val();

    var formData = new FormData();
    formData.append('file1',$('#banner_image1')[0].files[0]);
    formData.append('link',link);

    $('#loader').show();
    $.ajax({
        url: base_url+"Vendor/add_banner_web", 
        type : "POST",
        data: formData,
        processData:false,
        contentType:false,  
        success: function(result)
        {
            if (result == 'Valid') 
            {  
                $('#loader').hide();
                alert('Web Banner Added successfully!');
                location.reload();
            }
        }
    });
}
/*}*/
function upload_pdf_report()
{
    var formData = new FormData();
    formData.append('file',$('#upload_report')[0].files[0]);  
    $.ajax({
        url: base_url+"Radiology/upload_pdf_report", 
        type : "POST",
        data: formData,
        processData:false,
        contentType:false,  
        success: function(result)
        {
            if (result == 'Valid') 
            {
                alert('Added successfully!');
                location.reload();
            }
        }
    });
}

function delete_banner(id)
{
    if (confirm('Are you delete this image') == true) 
    {
        $.ajax({
            url: base_url+"Vendor/delete_banner", 
            type : "POST",
            data: {id : id},
            success: function(result)
            {
                if (result == 'Valid') 
                {
                    alert('Image deleted!');
                    location.reload();
                }
            }
        });
    }
}
function delete_web_banner(id)
{
    if (confirm('Are you delete this image') == true) 
    {
        $.ajax({
            url: base_url+"Vendor/delete_web_banner", 
            type : "POST",
            data: {id : id},
            success: function(result)
            {
                if (result == 'Valid') 
                {
                    alert('banner Image deleted!');
                    location.reload();
                }
            }
        });
    }
}
function save_user_onscreen_notification()
{   
    if ($('#start_date').val()=="" || $('#end_date').val()=="" || $('#notification').val()==""  ){
                alert('Please Fill Input Feilds First!');
            }
    else{
    start_date = $('#start_date').val();
    end_date = $('#end_date').val();
    notification = $('#notification').val();
   
    var formData = new FormData();
    formData.append('start_date',start_date);
    formData.append('end_date',end_date);
    formData.append('notification',notification);
    $.ajax({
        url : base_url+"Vendor/save_user_onscreen_notification",
        type : "POST",
        data : formData,
        processData:false,
        contentType:false,
        success:function(result)
        {
            if (result == 'Valid') 
            {
                alert('Notification Added successfully');
                location.reload();
            }
        }
    });
}
}
function delete_onscreen_notification(id)
{
    if (confirm('Are you delete this notification') == true) 
    {
        $.ajax({
            url: base_url+"Vendor/delete_onscreen_notification", 
            type : "POST",
            data: {id : id},
            success: function(result)
            {
                if (result == 'Valid') 
                {
                    alert('Notification deleted!');
                    location.reload();
                }
            }
        });
    }
}
function save_pharmacy_prescription()
{  
   user_id = $('#user_id').val();
   problem = $('#problem').val();

   var formData = new FormData();
   formData.append('user_id',user_id); 
   formData.append('problem',problem); 
   formData.append('file',$('#image')[0].files[0]);  
    $.ajax({
        url : base_url+ "Home/add_pharmacy_prescription",
        type : "POST",
        data : formData,
        processData:false,
        contentType:false,
        success:function(result)
        {
            if (result == 'Valid') 
            {
                alert('Prescription Added successfully');
                location.reload();
            }
        }
    });
}
function add_to_cart_details(z)
{  
   user_id = $('#user_id'+z).val();
   test_id = $('#test_id'+z).val();
   lab_id = $('#update_lab_id'+z).val();

   var formData = new FormData();
   formData.append('user_id',user_id); 
   formData.append('test_id',test_id);
   formData.append('lab_id',lab_id); 
     
    $.ajax({
        url : base_url+ "Home/add_to_cart",
        type : "POST",
        data : formData,
        processData:false,
        contentType:false,
        success:function(result)
        {
            if (result == 'Valid') 
            {
                alert('Your Item- Successfully Added To Cart');
                location.reload();
            }
            else
            {
                window.location.href = base_url + "Home/login_user";
            }
        }
    });
}
function add_to_cart_details1(z)
{  
   user_id = $('#user_id'+z).val();
   package_id = $('#package_id'+z).val();
   lab_id = $('#update_lab_id'+z).val();
   
   var formData = new FormData();
   formData.append('user_id',user_id); 
   formData.append('package_id',package_id);
   formData.append('lab_id',lab_id); 
     
    $.ajax({
        url : base_url+ "Home/add_to_cart1",
        type : "POST",
        data : formData,
        processData:false,
        contentType:false,
        success:function(result)
        {
            if (result == 'Valid') 
            {
                alert('Your Item- Successfully Added To Cart');
                location.reload();
            }
        }
    });
}
function add_nursing_details()
{  
   user_id = $('#user_id').val();
   time_id = $('#time_id').val();
   time = $('#time').val();
   price = $('#price').val();
   email = $('#email').val();
   p_mobile_no = $('#p_mobile_no').val();
   alt_mobile_no = $('#alt_mobile_no').val();
   address = $('#address').val();
   landmark = $('#landmark').val();
   a_city = $('#a_city').val();
   a_state = $('#a_state').val();
   appointment_date = $('#appointment_date').val();
   clinical_history = $('#clinical_history').val();
   description = $('#description').val();

   var formData = new FormData();
   formData.append('user_id',user_id); 
   formData.append('time_id',time_id);
   formData.append('time',time);
   formData.append('price',price); 
   formData.append('email',email); 
   formData.append('p_mobile_no',p_mobile_no); 
   formData.append('alt_mobile_no',alt_mobile_no);
   formData.append('address',address); 
   formData.append('landmark',landmark); 
   formData.append('a_city',a_city);
   formData.append('a_state',a_state); 
   formData.append('appointment_date',appointment_date); 
   formData.append('clinical_history',clinical_history);
   formData.append('description',description); 
   formData.append('file',$('#upload_nuring_prescription')[0].files[0]);
     
    $.ajax({
        url : base_url+ "Home/add_nursing_order_data",
        type : "POST",
        data : formData,
        processData:false,
        contentType:false,
        success:function(result)
        {
            if (result == 'Valid') 
            {
                alert('Your Item Successfully Added To Cart');
                location.reload();
            }
        }
    });
}
function add_dietician_order_details()
{  
   user_id = $('#user_id').val();
   name = $('#name').val();
   gender = $('#gender').val();
   dob = $('#dob').val();
   diet_for = $('#diet_for').val();
   weight = $('#weight').val();
   height = $('#height').val();
   sleeping_hours = $('#sleeping_hours').val();
   vegeterian = $('#vegeterian').val();
   habbit = $('#habbit').val();
   life_style = $('#life_style').val();
   working_hour = $('#working_hour').val();
   sitting_job = $('#sitting_job').val();
   clinical_history = $('#clinical_history').val();
   problem = $('#problem').val();

   var formData = new FormData();
   formData.append('user_id',user_id); 
   formData.append('name',name);
   formData.append('gender',gender);
   formData.append('dob',dob); 
   formData.append('diet_for',diet_for); 
   formData.append('weight',weight); 
   formData.append('height',height); 
   formData.append('sleeping_hours',sleeping_hours);
   formData.append('vegeterian',vegeterian); 
   formData.append('habbit',habbit); 
   formData.append('life_style',life_style);
   formData.append('working_hour',working_hour); 
   formData.append('sitting_job',sitting_job); 
   formData.append('clinical_history',clinical_history);
   formData.append('problem',problem);
   formData.append('file',$('#upload_diet_prescription')[0].files[0]);   
     
    $.ajax({
        url : base_url+ "Home/add_dietician_order_data",
        type : "POST",
        data : formData,
        processData:false,
        contentType:false,
        success:function(result)
        {
            if (result == 'Valid') 
            {
                alert('Your Request Succesfully Added !Please Wait For SomeTime for admin Response');
                location.reload();
            }
        }
    });
}
function add_feedback_details()
{     
    name = $('#name').val();
    description = $('#description').val();
    
    var formData = new FormData();
    formData.append('name',name);
    formData.append('file1',$('#user_image')[0].files[0]); 
    formData.append('description',description);
   
    $('#loader').show();
    $.ajax({
        url: base_url + "Vendor/add_feedback_data", 
        type : "POST",
        data: formData,
        processData:false,       
        contentType:false,  
        success: function(result)
        {
            if (result == 'Valid') 
            {   
                $('#loader').hide();
                alert('Feedback Added successfully');
                location.reload();
            }
        }
    });
}

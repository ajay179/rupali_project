$(function () {
    $("#admincityForm").validate({
        // Specify the validation rules
      
        rules: {
           
            txtcity: {
                required: true,
            }
        },
        // Specify the validation error messages
        messages: {
           
            txtcity: {
                required: '* Please enter City Name.',
            }
        },
        submitHandler: function (form) { // <- pass 'form' argument in
            $(".submit").attr("disabled", true);
            form.submit(); // <- use 'form' argument here.
        }
    });
});
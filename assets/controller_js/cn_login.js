$(function () {
    $("#adminLoginForm").validate({
        // Specify the validation rules
      
        rules: {
           
            txtemail: {
                required: true,
                email: true,
            },
            txtPassword: {
                required: true,
            }
        },
        // Specify the validation error messages
        messages: {
           
            txtemail: {
                required: '* Please enter email id.',
            },
            txtPassword: {
                required: '* Please enter password.',
            }
        },
        submitHandler: function (form) { // <- pass 'form' argument in
            $(".submit").attr("disabled", true);
            form.submit(); // <- use 'form' argument here.
        }
    });
});


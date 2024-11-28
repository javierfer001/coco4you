// Content Contact Form
// ---------------------------------------------------------------------------------------
$(function () {

    $('#contact-form').submit(function (event) {

        var dataString = $('#contact-form').serialize();
        //alert (dataString); return false;
        var successMsg = $('#contact-form').attr('data-msg');
        var type = $('#contact-form').attr('data-type');
        $.ajax({
            type: "POST",
            url: "/send/" + type,
            data: dataString,
            success: function (request) {
                console.log(request.data);
                if (request.data == "error") {
                    $('#contact-form').prepend("<div class=\"alert alert-danger fade in\" style='margin: 10px;'><button class=\"close\" data-dismiss=\"alert\" type=\"button\">&times;</button><strong>Error! </strong> You need to add all fields</div>");
                    return;
                } else {
                    $('#contact-form').prepend("<div class=\"alert alert-success fade in\" style='margin: 10px;'><button class=\"close\" data-dismiss=\"alert\" type=\"button\">&times;</button><strong>Contact Form Submitted!</strong> We will be in touch soon.</div>");
                }
                $('#contact-form')[0].reset();
            }
        });
        return false;

    });

});
$(document).ready(function() {

    $("input[type = 'text']").click(function() {
        $("input[type = 'text']").addClass("blured_input");
    });
    $("input[type = 'password']").click(function() {
        $("input[type = 'password']").addClass("blured_input");
    });
    $("input[type = 'text']").blur(function() {
        $("input[type = 'text']").removeClass("blured_input");
    });
    $("input[type = 'password']").blur(function() {
        $("input[type = 'password']").removeClass("blured_input");
    });
})
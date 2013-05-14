$(document).ready(function() {

    // ================= HIDDEN ==============

    $("#log_in_div").hide();
    $("#overlay_div_container").hide();

    $("#close_log_in_options_span").click(function() {
        $("#log_in_option_ul").slideUp(300);
        $("#overlay_div_container").slideUp(300);
        $("#log_in_div").slideUp(300);
    });
    $('#main_log_in_button').click(function(){
        $('#login_as_div').fadeIn();
    });
    $('#login_as_close_btn').click(function(){
        $('#login_as_div').fadeOut();
    })

    $("#log_in_as_cashier_btn").click(function() {
        $("#log_in_as").val("cashier");
        $("#log_in_as_span").html("CASHIER LOG-IN")
        $("#overlay_div_container").show();
        $("#log_in_div").slideDown(300);
    });

    $("#log_in_as_administrator_btn").click(function() {
        $("#log_in_as").val("administrator");
        $("#log_in_as_span").html("ADMINISTRATOR LOG-IN");
        $("#overlay_div_container").show();
        $("#log_in_div").slideDown(300);
    });

    /*==========showing sample info=========*/
    $('#right_sidebar_div').load('../PAGES/page_info.html #sample1');

    $('.sample1').click(function(){
        $('#right_sidebar_div').load('../PAGES/page_info.html #sample1');
        $('#left_sidebar_div  ul li a > i').removeClass('icon-chevron-right');
        var arrow =  $('#left_sidebar_div  ul li a.sample1 > i');
        arrow.addClass("icon-chevron-right");
    });
    $('.sample2').click(function(){
        $('#right_sidebar_div').load('../PAGES/page_info.html #sample2');
        $('#left_sidebar_div  ul li a > i').removeClass('icon-chevron-right');
        var arrow =  $('#left_sidebar_div  ul li a.sample2 > i');
        arrow.addClass("icon-chevron-right");
    });
    $('.sample3').click(function(){
        $('#right_sidebar_div').load('../PAGES/page_info.html #sample3');
        $('#left_sidebar_div  ul li a > i').removeClass('icon-chevron-right');
        var arrow =  $('#left_sidebar_div  ul li a.sample3 > i');
        arrow.addClass("icon-chevron-right");
    });
    $('.sample4').click(function(){
        $('#right_sidebar_div').load('../PAGES/page_info.html #sample4');
        $('#left_sidebar_div  ul li a > i').removeClass('icon-chevron-right');
        var arrow =  $('#left_sidebar_div  ul li a.sample4 > i');
        arrow.addClass("icon-chevron-right");
    });
    $('.sample5').click(function(){
        $('#right_sidebar_div').load('../PAGES/page_info.html #sample5');
        $('#left_sidebar_div  ul li a > i').removeClass('icon-chevron-right');
        var arrow =  $('#left_sidebar_div  ul li a.sample5 > i');
        arrow.addClass("icon-chevron-right");
    });
    $('.sample6').click(function(){
        $('#right_sidebar_div').load('../PAGES/page_info.html #sample6');
        $('#left_sidebar_div  ul li a > i').removeClass('icon-chevron-right');
        var arrow =  $('#left_sidebar_div  ul li a.sample6 > i');
        arrow.addClass("icon-chevron-right");
    });

    // ========== LOG-IN PROCESS ==========

    $("#log_in_form").submit(function() {
        return false;
    })

    $("#log_in_submit").click(function() {
        if($("#username_entered").val() != "" && $("#password_entered").val() != "") {
            $.ajax({
                type: "POST",
                url: "../PHP/OBJECTS/log_in_validation.php",
                data: {"log_in_data": JSON.stringify($("#log_in_form").serializeArray())},
                success: function(data) {
                    if(data != "") {
                        $("#error_span").html(data);
                    } else {
                        if($("#log_in_as").val() == "cashier") {
                            window.location.assign("transaction.php");
                        }
                        if($("#log_in_as").val() == "administrator") {
                            window.location.assign("adminhome.php");
                        }
                    }
                },
                error: function(data) {
                    console.log("ERROR in processing log in = " + JSON.stringify(data));
                }
            });
        } else {
            // username or password blank warning
        }
    });

    /*---slide Show*/
    $('.carousel').carousel();
});
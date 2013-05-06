$(document).ready(function() {

    // ================= HIDDEN ==============

    $("#log_in_div").hide();
    $("#overlay_div_container").hide();

    var width = $("#main_log_in_button").css("width");
    var margin = $("#main_log_in_button").css("margin");

    $("#log_in_option_ul").css({
        "width": width,
        "margin": margin
    });

    $("#close_log_in_options_span").click(function() {
        $("#log_in_option_ul").slideUp(300);
        $("#overlay_div_container").slideUp(300);
        $("#log_in_div").slideUp(300);
    });

    $("#log_in_as_cashier_li").click(function() {
        $("#log_in_as_input").val("cashier");
        $("#log_in_as_span").html("CASHIER LOG-IN")
        $("#overlay_div_container").show();
        $("#log_in_div").show();
    });

    $("#log_in_as_administrator_button").click(function() {
        $("#log_in_as_input").val("administrator");
        $("#log_in_as_span").html("ADMINISTRATOR LOG-IN");
        $("#overlay_div_container").show();
        $("#log_in_div").show();
    });
});
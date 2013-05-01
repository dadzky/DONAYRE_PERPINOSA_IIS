$(function() {

    $("#admins_content_div").load("admin_home_content.html");

    $("#for_home_button").click(function() {
        $("#admins_content_div").load("admin_home_content.html");
    });

    $("#for_product_button").click(function() {
        $("#admins_content_div").load("products_page.php");
    });

    $("#for_employee_button").click(function() {
        $("#admins_content_div").load("employees_page.php");
    });

    $("#for_transaction_record_button").click(function() {
        $("#admins_content_div").load("tra");
    });



    $("#buttons_div").buttonset();
})

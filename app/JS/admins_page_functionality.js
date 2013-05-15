$(function() {

    $("#admins_content_div").load("transaction_records.php");

    $("#for_product_button").click(function() {
        $("#admins_content_div").load("products_page.php");
    });

    $("#for_suppliers_button").click(function() {
        $("#admins_content_div").load("suppliers_page.php");
    });

    $("#for_employee_button").click(function() {
        $("#admins_content_div").load("employees_page.php");
    });

    $("#for_transaction_record_button").click(function() {
        $("#admins_content_div").load("transaction_records.php");
    });

    $("#log_out_button").click(function() {
        window.location.assign("logout.php");
    });

    $("#log_out_button").tooltip();

    $("#buttons_div").buttonset();
    $('#for_home_button').button({
        icons: {
            primary: "ui-icon-home"
        }
    }).next().button({
            icons:{
                primary:"ui-icon-suitcase"
            }
        }).next().button({
            icons: {
                primary:"ui-icon-person"
            }
        }).next().button({
            icons:{
                primary:"ui-icon-cart"
            }
        }).next().button({
            text: false,
            icons: {
                primary: "ui-icon-arrowthick-1-e"
            }
        });
})

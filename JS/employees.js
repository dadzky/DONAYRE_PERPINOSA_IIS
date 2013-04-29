$(function() {

    // ============ HIDDEN ELEMENTS ==============================

    $("#add_account_for_cashier_div").hide();
    $("#add_employees_div").hide();
    $("#overlay_div_container").hide();
    $(".warning").hide();
    $("#packers_table").hide();
    $("#porters_table").hide();
    $("#employee_added_successfully_p").hide();

    $("#employees_category_div").buttonset();

    // ============ ADDING OPTIONS TO SELECT TAGS ================

    for(var counter = 1; counter <= 31; counter++) {
        if(counter < 10) {
            counter = "0" + counter;
        }
        if(counter <= 12) {
            $("#birthday_month").append("<option>" + counter + "</option>");
        }
        $("#birthday_date").append("<option>" + counter + "</option>");
    }

    for(var counter = 1950; counter <= 1995; counter++) {
        $("#birthday_year").prepend("<option>" + counter + "</option>");
    }

    // ================== CLICK EVENTS FUNCTIONS ===================

    $("#add_employees_image").click(function() {
        $("#add_employees_div").slideDown();
        $("#overlay_div_container").show();
    });

    $("#cashiers_category_button").click(function () {
        $("#cashiers_table").slideDown(300);
        $("#packers_table").hide();
        $("#porters_table").hide();
        //$(this).css("color", "dodgerblue");
    });
    $("#packers_category_button").click(function() {
        $("#cashiers_table").hide();
        $("#packers_table").slideDown(300);
        $("#porters_table").hide();
    });
    $("#porters_category_button").click(function() {
        $("#cashiers_table").hide();
        $("#packers_table").hide();
        $("#porters_table").slideDown(300);
    });

    $("#add_employees_close_span").click(function() {
        $("#add_employees_div").slideUp(300);
        $("#overlay_div_container").slideUp(300);
    });

    // ====================== EMPLOYEES' DATA CONTROLLERS (functions) ===========

    display_employees();

    // ============= ADDNING EMPLOYEES ======================

    $("#job_type").change(function() {
        $("#job_type").val() == "cashier" ? $("#add_account_for_cashier_div").slideDown() :  $("#add_account_for_cashier_div").slideUp(300);
    });

    $("#add_employee_button").click(function() {
        var string_pattern= /^[a-z, A-Z, -]*$/;

        var firstname = $("#firstname").val();
        var lastname = $("#lastname").val();
        var contact_number = $("#contact_number").val();
        var job_type = $("#job_type").val();

        var username = $("#username").val();
        var password = $("#password").val();
        var password_confirmation = $("#password_confirmation").val();

        var lastname_valid = string_pattern.test(lastname);
        var firstname_valid = string_pattern.test(firstname);
        var contact_number_valid = /^[0-9]*$/.test(contact_number);

        if(firstname != "" && firstname_valid && lastname != "" && lastname_valid && contact_number != "" && contact_number_valid && contact_number.length == 11) {
            if(job_type == "cashier") {
                if(username != "" && password != "") {
                    if(password == password_confirmation) {
                        $.ajax({
                            type: "POST",
                            url: "../PHP/OBJECTS/EMPLOYEES/add_employee.php",
                            data: {"employees_data": JSON.stringify($("#add_employees_form").serializeArray())},
                            success: function() {
                                $("#employee_added_successfully_p").show();
                                $("#employee_added_successfully_p").fadeOut(5000);
                                $("#add_employees_div").fadeOut(1000);
                                $("#overlay_div_container").fadeOut(1000);
                                display_employees();
                            },
                            error: function(data) {
                                console.log("Error in adding employee = " + JSON.stringify(data));
                            }
                        });
                    } else {
                        $("#password_confirmation_dd").addClass("control-group error");
                    }
                } else {
                    $("#username_dd").addClass("control-group error");
                    $("#password_dd").addClass("control-group error");
                }
            } else {
                // not a cashier, so proceed
                $.ajax({
                    type: "POST",
                    url: "../PHP/OBJECTS/EMPLOYEES/add_employee.php",
                    data: {"employees_data": JSON.stringify($("#add_employees_form").serializeArray())},
                    success: function() {
                        $("#employee_added_successfully_p").show();
                        $("#employee_added_successfully_p").fadeOut(5000);
                        $("#add_employees_div").fadeOut(1000);
                        $("#overlay_div_container").fadeOut(1000);
                        display_employees();
                    },
                    error: function(data) {
                        console.log("Error in adding employee = " + JSON.stringify(data));
                    }
                });
            }
        } else {
            $("#add_employee_warning").show();
            $("#add_employee_warning").fadeOut(8000);
        }
    });

    // ====================== SEARCH EMPLOYEE ===============

    $("#search_employee_input_field").keyup(function() {
        $.ajax({
            type: "POST",
            url: "../PHP/OBJECTS/EMPLOYEES/search_employee.php",
            data: {"name_to_search": $("#search_employee_input_field").val()},
            success: function(data) {
                $("#display_employees_div").html(data);
            },
            error: function(data) {
                console.log("Error in searching employee = " + JSON.stringify(data));
            }
        });
    });
});

function display_employees() {
    $.ajax({
        url: "../PHP/OBJECTS/EMPLOYEES/display_employees.php",
        success: function(data) {
            var parsed_data = JSON.parse(data);
            $("#display_cashier_employees_table").html(parsed_data.cashier_employees);
            $("#display_packer_employees_table").html(parsed_data.packer_employees);
            $("#display_porter_employees_table").html(parsed_data.porter_employees);
        },
        error: function(data) {
            console.log("Error in displaying employees = " + JSON.stringify(data));
        }
    });
}
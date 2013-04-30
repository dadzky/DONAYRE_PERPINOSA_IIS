$(function() {

    // ============ HIDDEN ELEMENTS ==============================

    $("#add_account_for_cashier_div").hide();
    $("#add_employees_div").hide();
    $("#overlay_div_container").hide();
    $(".warning").hide();
    $("#packers_table").hide();
    $("#porters_table").hide();
    $("#employee_added_successfully_p").hide();
    $("#job_type_jobs_option").hide();
    $("#action_options_div").hide();
    $("#save_employee_button").hide();

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

    $("#search_cashier_input_field").keyup(function() {
        var job_type = "cashier";
        $.ajax({
            type: "POST",
            url: "../PHP/OBJECTS/EMPLOYEES/search_employee.php",
            data: {"name_to_search": $("#search_cashier_input_field").val(), "job_type": job_type},
            success: function(data) {
                if(data != "") {
                    $("#display_cashier_employees_table").html(data);
                } else {
                    $("#display_cashier_employees_table").html("<tr><td colspan='5'>No result....</td></tr>");
                }
            },
            error: function(data) {
                console.log("Error in searching employee = " + JSON.stringify(data));
            }
        });
        if($("#search_cashier_input_field").val() == "") {
            display_employees();
        }
    });

    $("#search_packer_input_field").keyup(function() {
        var job_type = "packer";
        $.ajax({
            type: "POST",
            url: "../PHP/OBJECTS/EMPLOYEES/search_employee.php",
            data: {"name_to_search": $("#search_packer_input_field").val(), "job_type": job_type},
            success: function(data) {
                if(data != "") {
                    $("#display_packer_employees_table").html(data);
                } else {
                    $("#display_packer_employees_table").html("<tr><td colspan='5'>No result....</td></tr>");
                }
            },
            error: function(data) {
                console.log("Error in searching employee = " + JSON.stringify(data));
            }
        });
        if($("#search_packer_input_field").val() == "") {
            display_employees();
        }
    });

    $("#search_porter_input_field").keyup(function() {
        var job_type = "porter";
        $.ajax({
            type: "POST",
            url: "../PHP/OBJECTS/EMPLOYEES/search_employee.php",
            data: {"name_to_search": $("#search_porter_input_field").val(), "job_type": job_type},
            success: function(data) {
                if(data != "") {
                    $("#display_porter_employees_table").html(data);
                } else {
                    $("#display_porter_employees_table").html("<tr><td colspan='5'>No result....</td></tr>");
                }
            },
            error: function(data) {
                console.log("Error in searching employee = " + JSON.stringify(data));
            }
        });
        if($("#search_porter_input_field").val() == "") {
            display_employees();
        }
    });

    // ============== SAVING EMPLOYEES DATA ===========
    $("#save_employee_button").click(function() {
        $.ajax({
            type: "POST",
            url: "",
            data: {},
            success: function() {

            },
            error: function(data) {
                console.log("Error in saving employee's data = " + JSON.stringify(data));
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

function show_action_options(id) {
    $("#overlay_div_container").show();
    $("#action_options_div").show();

    $("#edit_employees_info_button").click(function() {
        $.ajax({
            type: "POST",
            url: "../PHP/OBJECTS/EMPLOYEES/retrieve_employees_data_to_update.php",
            data: {"id": id},
            success: function(data) {
                var parsed_data = JSON.parse(data);
                $("#id").val(parsed_data.employee_id);
                $("#firstname").val(parsed_data.firstname);
                $("#lastname").val(parsed_data.lastname);
                $("#gender").val(parsed_data.gender);
                $("#birthday_month").val(parsed_data.birth_month);
                $("#birthday_date").val(parsed_data.birth_date);
                $("#birthday_year").val(parsed_data.birth_year);
                $("#address").val(parsed_data.address);
                $("#contact_number").val(parsed_data.contact_number);
                $("#job_type").val(parsed_data.type_of_job);

                if(parsed_data.type_of_job == "cashier") {
                    $("#username").val(parsed_data.username);
                    $("#add_employees_form h5").html("UPDATE CASHIER'S ACCOUNT");
                    $("#add_account_for_cashier_div").show();
                } else {
                    $("#add_account_for_cashier_div").hide();
                }
                $("#action_options_div").hide();
                $("#add_employee_button").hide();
                $("#save_employee_button").show();

                $("#add_employees_form h4").html("UPDATE EMPLOYEE'S INFORMATION")
                $("#overlay_div_container").show();
                $("#add_employees_div").slideDown(200);
            },
            error: function(data) {
                console.log("Error in retrieving employees data to update = " + JSON.stringify(data));
            }
        });
    });
}

function validate_employees_info() {

}
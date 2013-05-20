$(function() {

    $("#show_transaction_span").click(function() {
        $("#display_admins_transaction_div").toggle('slow');
        $("#display_suppliers_div").toggle('slow');
        if($("#show_transaction_span").html() == "show admin's transaction") {
            $("#show_transaction_span").html("back to suppliers");
        } else {
            $("#show_transaction_span").html("show admin's transaction");
        }

    });

    // ================ SUPPLIERS DATA CONTROLLERS ==========

    display_admins_transaction();
    display_suppliers();
    retrieve_all_suppliers();
    display_supplier_pager();

    $("#add_supplier_button").click(function() {
        if($.trim($("#company_name").val()) != "" && $.trim($("#address").val() != "" && $.trim($("#contact_number").val() != ""))) {
            if(/^[0-9, -]*$/.test($("#contact_number").val())) {
                var data = {"suppliers_data": JSON.stringify($("#add_suppliers_form").serializeArray())};
                var add_request = request("../PHP/OBJECTS/SUPPLIERS/add_supplier.php", data, "adding supplier");
                add_request.success(function(data) {
                    retrieve_all_suppliers();
                    $("#contact_number_dd").removeClass("control-group error");

                    // ====== back in adding products ===

                    $("#add_product_form").toggle('slow');
                    $("#add_suppliers_form").slideToggle('slow');
                    $("#add_supplier_button").hide();
                    $("#add_product_button").show();
                    /*
                    var option_length = $('#product_supplier option').length;
                    var index;
                    for(var counter = 0; counter < option_length; counter++) {
                        if($('#product_supplier option')[counter].value == data) {
                            alert(data);
                            console.log($('#product_supplier option')[counter].value);
                            index = counter;
                            break;
                        }
                    }*/
                    $("#product_supplier").val(data);

                });
            } else {
                // ========== invalid contact number warning =========
                $("#contact_number_dd").addClass("control-group error");
            }
        } else {
            // ======= Some fields are blank warning ==========
        }
    });

    $("#item_limit_input").keyup(function() {
        display_supplier_pager();
        display_suppliers();
    });

    $("#pagination_content_div").on('click', 'li a', function() {
        $("#pagination_content_div li").removeClass("active");
        var current_page = $(this).html();
        $("#current_page").val(current_page - 1);
        display_suppliers();
    })

});


function retrieve_all_suppliers() {
    var retrieve_all_suppliers_request = request("../PHP/OBJECTS/SUPPLIERS/retrieve_all_suppliers.php", null, "retrieving all suppliers");
    retrieve_all_suppliers_request.success(function(data) {
        $("#product_supplier").html(data);
    });
}

function display_suppliers() {
    var item_limit = $("#item_limit_input").val();
    var current_page = parseInt($("#current_page").val());
    if(item_limit == "") {
        item_limit = 5;
    } else {
        item_limit = parseInt(item_limit);
    }
    var data = {"item_limit": item_limit, "current_page": current_page*item_limit};

    var display_suppliers_request = request("../PHP/OBJECTS/SUPPLIERS/display_suppliers.php", data, "displaying suppliers request");
    display_suppliers_request.success(function(data) {
        $("#display_suppliers_tbody").html(data);
    });
}

function display_admins_transaction() {
    var display_admins_transaction_request = request("../PHP/OBJECTS/SUPPLIERS/display_admins_transaction.php", null, "displaying admins transaction");
    display_admins_transaction_request.success(function(data) {
        $("#display_admins_transaction_table").html(data);
    });
}

function display_supplier_pager() {
    var item_limit = $("#item_limit_input").val();
    if(item_limit == "") {
        item_limit = 5;
    }
    var data = {"item_limit": parseInt(item_limit)};
    var display_supplier_pager_request = request("../PHP/OBJECTS/SUPPLIERS/display_supplier_pager.php", data, "displaying supplier pager");
    display_supplier_pager_request.success(function(data) {
        $("#suppliers_pagination_ul").html(data);
    });
}

// =========== AJAX REQUEST ==========

function request(url, data, what_request) {
    return $.ajax({
        type: "POST",
        url: url,
        data: data,
        error: function(data) {
            console.log("Error in " + what_request + " = " + JSON.stringify(data));
        }
    });
}
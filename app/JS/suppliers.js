$(function() {

<<<<<<< HEAD
    // ============ ON CLICK EVENTS ==========

    $("#new_supplier_button").click(function() {
        $("#add_suppliers_div").slideDown(300);
    })

})

function display_suppliers() {

=======
    // ================ SUPPLIERS DATA CONTROLLERS ==========

    retrieve_all_suppliers();

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

})


function retrieve_all_suppliers() {
    var retrieve_all_suppliers_request = request("../PHP/OBJECTS/SUPPLIERS/retrieve_all_suppliers.php", null, "retrieving all suppliers");
    retrieve_all_suppliers_request.success(function(data) {
        $("#product_supplier").html(data);
    });
}

function display_suppliers() {
    var request = request();
>>>>>>> 1f7798dc8bb854ba71c238c04fc487adfe808159
}

// =========== AJAX REQUEST ==========

function request(url, data, what_request) {
    return $.ajax({
        type: "POST",
        url: url,
        data: data,
        error: function(data) {
<<<<<<< HEAD
            console.log(what_request + " = " + JSON.stringify(data));
=======
            console.log("Error in " + what_request + " = " + JSON.stringify(data));
>>>>>>> 1f7798dc8bb854ba71c238c04fc487adfe808159
        }
    });
}
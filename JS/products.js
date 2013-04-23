$(function() {

    // ============== HIDDEN ELEMENTS ===============
    $("#hide_delete_action_button").hide();
    $("#delete_product_confirmation_div").hide();

    $("#delete_products_button").click(function() {
        $(this).hide();
        $(".product_delete_action").css('visibility', 'visible');
        $("#hide_delete_action_button").show();
    });
    $("#hide_delete_action_button").click(function() {
        $(this).hide();
        $(".product_delete_action").css('visibility', 'hidden');
        $("#delete_products_button").show();
    });

    // ================= PRODUCT DATA CONTROLLERS > FUNCTIONS ====================


    display_products();

    // ================ ADDING PRODUCTS ===============

    $("#add_product_button").click(function() {
        var product_name = $("#product_name").val();
        var product_price = $("#product_price").val();
        var number_of_stocks = $("#number_of_stocks").val();
        var stock_unit = $("#stock_unit").val();

        var string_pattern = /^[a-z, A-Z]*$/;
        var numeric_pattern = /^[0-9]*$]/;

        var product_name_valid = string_pattern.test(product_name);
        var product_price_valid = numeric_pattern.test(product_price);
        var number_of_stocks_valid = numeric_pattern.test(number_of_stocks);

        if(product_name != "" && product_name_valid) {
            if(product_price != "" && product_price_valid) {
                if(number_of_stocks != "" && number_of_stocks_valid) {
                    $.ajax({
                        type: "POST",
                        url: "../PHP/OBJECTS/PRODUCTS/add_product.php",
                        data: {"products_data": JSON.stringify($("#add_product_form").serializeArray())},
                        success: function(data) {
                            display_products();
                        },
                        error: function(data) {
                            console.log("There's an error in adding a product. It says " + JSON.stringify(data));
                        }
                    });
                } else {
                    //number of stocks warning
                }
            } else {
                //product price warning
            }
        } else {
            //product name warning
        }
    });

});

function display_products() {
    $.ajax({
        url: "../PHP/OBJECTS/PRODUCTS/display_products.php",
        success: function(data) {
            $("#display_products_table").html(data);
        },
        error: function(data) {
            console.log("There's an error in displaying products. It says " + JSON.stringify(data));
        }
    })
}

function edit_products_name(id) {
    var product_name = document.getElementById(id).getElementsByTagName('td')[0].innerHTML;
    $(document.getElementById(id).getElementsByTagName('td')[0]).html("<form id = 'new_product_name_form'><input type = 'text' id = 'new_product_name'/></form>");
    $("#new_product_name").val(product_name);

    $("#new_product_name_form").submit(function() {
        $.ajax({
            type: "POST",
            url: "../PHP/OBJECTS/PRODUCTS/update_products_info.php",
            data: {"id": id, "product_name": $("#new_product_name").val(), "product_price": "", "products_number_of_stocks": "", "stock_unit": ""},
            success: function(data) {
                $(document.getElementById(id).getElementsByTagName('td')[0]).html(data);
            },
            error: function(data) {
                console.log("There's an error in retrieving product's name. It says " + JSON.stringify(data));
            }
        });
        return false;
    });

    $("#new_product_name").blur(function() {
        $.ajax({
            type: "POST",
            url: "../PHP/OBJECTS/PRODUCTS/update_products_info.php",
            data: {"id": id, "product_name": $("#new_product_name").val(), "product_price": "", "products_number_of_stocks": "", "stock_unit": ""},
            success: function(data) {
                $(document.getElementById(id).getElementsByTagName('td')[0]).html(data);
            },
            error: function(data) {
                console.log("There's an error in retrieving product's name. It says " + JSON.stringify(data));
            }
        });
    });
}

function edit_products_price(id) {
    var product_price = document.getElementById(id).getElementsByTagName('td')[1].innerHTML;
    $(document.getElementById(id).getElementsByTagName('td')[1]).html("<form id = 'new_product_price_form'><input type = 'text' id = 'new_product_price' class = 'input-mini'/></form>");
    $("#new_product_price").val(product_price);

    $("#new_product_price_form").submit(function() {
        $.ajax({
            type: "POST",
            url: "../PHP/OBJECTS/PRODUCTS/update_products_info.php",
            data: {"id": id, "product_name": "", "product_price": $("#new_product_price").val(), "products_number_of_stocks": "", "stock_unit": ""},
            success: function(data) {
                $(document.getElementById(id).getElementsByTagName('td')[1]).html(data);
            },
            error: function(data) {
                console.log("There's an error in updating product's price. It says " + JSON.stringify(data));
            }
        });
        return false;
    });

    $("#new_product_price").blur(function() {
        $.ajax({
            type: "POST",
            url: "../PHP/OBJECTS/PRODUCTS/update_products_info.php",
            data: {"id": id, "product_name": "", "product_price": $("#new_product_price").val(), "products_number_of_stocks": "", "stock_unit": ""},
            success: function(data) {
                $(document.getElementById(id).getElementsByTagName('td')[1]).html(data);
            },
            error: function(data) {
                console.log("There's an error in updating product's price. It says " + JSON.stringify(data));
            }
        });
    });
}

function edit_products_number_of_stocks(id) {
    var number_of_stocks = document.getElementById(id).getElementsByTagName('td')[2].innerHTML;
    $(document.getElementById(id).getElementsByTagName('td')[2]).html("<form id = 'new_products_number_of_stock_form'><input type = 'text' id = 'new_products_number_of_stocks' class = 'input-mini'/></form>");
    $("#new_products_number_of_stocks").val(number_of_stocks);
    $("#new_products_number_of_stock_form").submit(function() {
        $.ajax({
            type: "POST",
            url: "../PHP/OBJECTS/PRODUCTS/update_products_info.php",
            data: {"id": id, "product_name": "", "product_price": "", "products_number_of_stocks": $("#new_products_number_of_stocks").val(), "stock_unit": ""},
            success: function(data) {
                $(document.getElementById(id).getElementsByTagName('td')[2]).html(data);
            },
            error: function(data) {
                console.log("There's an error in updating product's stock info. It says " + JSON.stringify(data));
            }
        });
        return false;
    });

    $("#new_products_number_of_stocks").blur(function() {
        $.ajax({
            type: "POST",
            url: "../PHP/OBJECTS/PRODUCTS/update_products_info.php",
            data: {"id": id, "product_name": "", "product_price": "", "products_number_of_stocks": $("#new_products_number_of_stocks").val(), "stock_unit": ""},
            success: function(data) {
                $(document.getElementById(id).getElementsByTagName('td')[2]).html(data);
            },
            error: function(data) {
                console.log("There's an error in updating product's stock info. It says " + JSON.stringify(data));
            }
        });
    });
}

function edit_products_stock_unit(id) {
    var stock_unit = document.getElementById(id).getElementsByTagName('td')[3].innerHTML;
    $(document.getElementById(id).getElementsByTagName('td')[3]).html("<form id = 'new_stock_unit_form'><select id = 'new_stock_unit' class = 'span1'><option>pieces</option><option>packs</option><option>klg</option><option>g</option><option>lbs</option></select></form>")
    $("#new_stock_unit").val(stock_unit);
    $("#new_stock_unit_form").change(function() {
        $.ajax({
            type: "POST",
            url: "../PHP/OBJECTS/PRODUCTS/update_products_info.php",
            data: {"id": id, "product_name": "", "product_price": "", "products_number_of_stocks": "", "stock_unit": $("#new_stock_unit").val()},
            success: function(data) {
                $(document.getElementById(id).getElementsByTagName('td')[3]).html(data);
            },
            error: function(data) {
                console.log("There's an error in updating product's stock unit. It says " + JSON.stringify(data));
            }
        });
        return false;
    });
}

function delete_products(id) {
    $("#delete_product_confirmation_div").dialog({
        title: "DELETE CONFIRMATION",
        show: {effect: 'slide', direction: 'up'},
        hide: {effect: 'slide', direction: 'up'},
        modal: true,
        resizable: false,
        draggable: false,
        buttons: {
            "YES": function() {
                var product_ids_to_delete = new Array();
                var product_table = document.getElementById("display_products_table");
                var table_rows = product_table.getElementsByTagName("tr");
                var counter = 1;
                while(counter <= table_rows.length) {
                    var tr_id = document.getElementById(table_rows[counter].id);
                    var check_box = document.getElementById('product_check_box_' + tr_id.id);
                    if(check_box.checked) {
                        product_ids_to_delete.push(tr_id.id);
                    }
                }
                alert(product_ids_to_delete);
                $.ajax({
                    type: "POST",
                    url: "../PHP/OBJECTS/PRODUCTS/delete_product.php",
                    data: {"product_ids_to_delete": product_ids_to_delete},
                    success: function() {
                        var ctr = 0;
                        while(counter < product_ids_to_delete.length) {
                            $("#" + product_ids_to_delete[counter]).remove();
                            ctr++;
                        }
                    },
                    error: function(data) {
                        console.log("There's an error in deleting products. It says " + JSON.stringify(data));
                    }
                });
            },
            "CANCEL": function() {
                $("#delete_product_confirmation_div").dialog("close");
            }
        }
    });


}
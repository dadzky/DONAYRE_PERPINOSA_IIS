$(function() {

    display_products();
    // ================ ADDING PRODUCTS ===============

    $("#add_product_button").click(function() {
        var product_name = $("#product_name").val();
        var product_price = $("#product_price").val();
        var number_of_stocks = $("#number_of_stocks").val();
        var stock_unit = $("#stock_unit").val();

        //var valid_product_name = ;
        //

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
            data: {"id": id, "product_name": $("#new_product_name").val(), "product_price": "", "product_stock_info": ""},
            success: function(data) {
                $(document.getElementById(id).getElementsByTagName('td')[0]).html(data);
            },
            error: function(data) {
                console.log("There's an error in retrieving product's data. It says " + JSON.stringify(data));
            }
        });
        return false;
    });
}

function edit_products_price(id) {
    var product_price = document.getElementById(id).getElementsByTagName('td')[1].innerHTML;
    $(document.getElementById(id).getElementsByTagName('td')[1]).html("<form id = 'new_product_price_form'><input type = 'text' id = 'new_product_price'/></form>");
    $("#new_product_price").val(product_price);

    $("#new_product_price_form").submit(function() {
        $.ajax({
            type: "POST",
            url: "../PHP/OBJECTS/PRODUCTS/update_products_info.php",
            data: {"id": id, "product_name": "", "product_price": $("#new_product_price").val(), "product_stock_info": ""},
            success: function(data) {
                $(document.getElementById(id).getElementsByTagName('td')[1]).html(data);
            },
            error: function(data) {
                console.log("There's an error in retrieving product's data. It says " + JSON.stringify(data));
            }
        })
        return false;
    });
}
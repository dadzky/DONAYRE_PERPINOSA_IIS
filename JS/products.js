$(function() {

    // ============== HIDDEN ELEMENTS ===============
    $("#hide_delete_action_button").hide();
    $("#delete_product_confirmation_div").hide();
    $("#add_product_confirmation_div").hide();
    $(".warning").hide();

    $("#delete_products_image").click(function() {
        $(this).hide();
        $(".product_delete_action").css('visibility', 'visible');
        $("#hide_delete_action_button").show();

        // =============== MARK and UNMARK CHECKBOXES

        $("#display_products_table").find("tr").click(function() {
            if($(this).find("input").attr('checked')) {
                $(this).find("input").attr('checked', false);
            }  else {
                $(this).find("input").attr('checked', true);
            }
        });

        $("#mark_all_delete_action").click(function() {
                $("#display_products_table").find("tr").find('input').attr("checked", true);
        });

        $("#unmark_all_delete_action").click(function() {
            $("#display_products_table").find("tr").find('input').attr("checked", false);
        });
    });
    $("#hide_delete_action_button").click(function() {
        $(this).hide();
        $(".product_delete_action").css('visibility', 'hidden');
        $("#delete_products_image").show();
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
        var numeric_pattern = /^[0-9]*$/;

        var product_name_valid = string_pattern.test(product_name);
        var product_price_valid = numeric_pattern.test(product_price);
        var number_of_stocks_valid = numeric_pattern.test(number_of_stocks);

        if(product_name != "" && product_name_valid) {
            if(product_price != "" && product_price_valid) {
                if(number_of_stocks != "" && number_of_stocks_valid) {
                    $.ajax({
                        type: "POST",
                        url: "../PHP/OBJECTS/PRODUCTS/check_if_product_to_add_already_exist.php",
                        data: {"products_data": JSON.stringify($("#add_product_form").serializeArray())},
                        success: function(data) {
                            if(data == "true") {
                                $("#add_product_confirmation_div").dialog({
                                    title: "PRODUCT EXIST",
                                    show: {effect: "slide", direction: "up"},
                                    hide: {effect: "slide", direction: "up"},
                                    modal: true,
                                    draggable: false,
                                    resizable: false,
                                    buttons: {
                                        "YES": function() {
                                            // ================= UPDATES THE NUMBER OF STOCKS OF A PRODUCT =================
                                            $.ajax({
                                                type: "POST",
                                                url: "../PHP/OBJECTS/PRODUCTS/add_product.php",
                                                data: {"products_data": JSON.stringify($("#add_product_form").serializeArray()), "update": "yes"},
                                                success: function() {
                                                    display_products();
                                                    $("#add_product_form").addClass("control-group success");
                                                    $("#add_product_confirmation_div").dialog("close");
                                                },
                                                error: function(data) {
                                                    console.log("There's an error in adding a product. It says " + JSON.stringify(data));
                                                }
                                            });
                                        },
                                        "NO THANKS": function() {
                                            $("#add_product_confirmation_div").dialog("close");
                                        }
                                    }
                                })
                            } else {
                                // -=================== ADDING PRODUCT ==============
                                $.ajax({
                                    type: "POST",
                                    url: "../PHP/OBJECTS/PRODUCTS/add_product.php",
                                    data: {"products_data": JSON.stringify($("#add_product_form").serializeArray()), "update": "no"},
                                    success: function(data) {
                                        display_products();
                                        $("#add_product_form").addClass("control-group success");
                                    },
                                    error: function(data) {
                                        console.log("There's an error in adding a product. It says " + JSON.stringify(data));
                                    }
                                });
                            }
                        },
                        error: function(data) {
                            console.log("There's an error in checking products. It says " + JSON.stringify(data));
                        }
                    }); // ============ END of AJAX Request in cheking if product exist ========
                } else {
                    //number of stocks warning
                    $("#number_of_stocks_dd").addClass("control-group error");
                }
            } else {
                //product price warning
                $("#product_price_dd").addClass("control-group error");
            }
        } else {
            //product name warning
            $("#product_name_dd").addClass("control-group error");
        }
    });

});

// =================== DISPLAYS PRODUCTS ============== //

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
// =================== UPDATES PRODUCTS DATA================ //

function edit_products_name(id) {
    var product_name = document.getElementById(id).getElementsByTagName('td')[0].innerHTML;
    $(document.getElementById(id).getElementsByTagName('td')[0]).html("<form id = 'new_product_name_form'><input type = 'text' id = 'new_product_name'/></form>");
    $("#invalid_new_product_name_warning").hide();
    $("#new_product_name").val(product_name);
    $("#new_product_name_form").submit(function() {
        var new_product_name = $("#new_product_name").val();
        var string_pattern = /^[a-z, A-Z]*$/;
        var new_product_name_valid = string_pattern.test(new_product_name);
        if(new_product_name != "" && new_product_name_valid) {
            $.ajax({
                type: "POST",
                url: "../PHP/OBJECTS/PRODUCTS/update_products_info.php",
                data: {"id": id, "product_name": new_product_name, "product_price": "", "products_number_of_stocks": "", "stock_unit": ""},
                success: function(data) {
                    $(document.getElementById(id).getElementsByTagName('td')[0]).html(data);
                },
                error: function(data) {
                    console.log("There's an error in retrieving product's name. It says " + JSON.stringify(data));
                }
            });
        } else {
            $("#new_product_name_form").addClass("control-group error");
        }
        return false;
    });

    $("#new_product_name").blur(function() {
        var new_product_name = $("#new_product_name").val();
        var string_pattern = /^[a-z, A-Z]*$/;
        var new_product_name_valid = string_pattern.test(new_product_name);
        if(new_product_name != "" && new_product_name_valid) {
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
        } else {
            $("#new_product_name_form").addClass("control-group error");
        }
    });
}

function edit_products_price(id) {
    var product_price = document.getElementById(id).getElementsByTagName('td')[1].innerHTML;
    $(document.getElementById(id).getElementsByTagName('td')[1]).html("<form id = 'new_product_price_form'><input type = 'text' id = 'new_product_price' class = 'input-mini'/></form>");
    $("#invalid_new_product_price_warning").hide();
    $("#new_product_price").val(product_price);
    $("#new_product_price_form").submit(function() {
        var numeric_pattern = /^[0-9, .]*$/;
        var new_product_price = $("#new_product_price").val();
        var new_product_price_valid = numeric_pattern.test(new_product_price);
        if(new_product_price != "" && new_product_price_valid) {
            $.ajax({
                type: "POST",
                url: "../PHP/OBJECTS/PRODUCTS/update_products_info.php",
                data: {"id": id, "product_name": "", "product_price": new_product_price, "products_number_of_stocks": "", "stock_unit": ""},
                success: function(data) {
                    $(document.getElementById(id).getElementsByTagName('td')[1]).html(data);
                },
                error: function(data) {
                    console.log("There's an error in updating product's price. It says " + JSON.stringify(data));
                }
            });
        } else {
            $("#new_product_price_form").addClass("control-group error");
        }
        return false;
    });

    $("#new_product_price").blur(function() {
        var numeric_pattern = /^[0-9, .]*$/;
        var new_product_price = $("#new_product_price").val();
        var new_product_price_valid = numeric_pattern.test(new_product_price);
        if(new_product_price != "" && new_product_price_valid) {
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
        } else {
            $("#new_product_price_form").addClass("control-group error");
        }
    });
}

function edit_products_number_of_stocks(id) {
    var number_of_stocks = document.getElementById(id).getElementsByTagName('td')[2].innerHTML;
    $(document.getElementById(id).getElementsByTagName('td')[2]).html("<form id = 'new_products_number_of_stock_form'><input type = 'text' id = 'new_products_number_of_stocks' class = 'input-mini'/></form>");
    $("#new_products_number_of_stocks").val(number_of_stocks);
    $("#new_products_number_of_stock_form").submit(function() {
        var numeric_pattern = /^[0-9]*$/;
        var new_products_number_of_stocks = $("#new_products_number_of_stocks").val();
        var new_products_number_of_stocks_valid = numeric_pattern.test(new_products_number_of_stocks);
        if(new_products_number_of_stocks != "" && new_products_number_of_stocks_valid) {
            $.ajax({
                type: "POST",
                url: "../PHP/OBJECTS/PRODUCTS/update_products_info.php",
                data: {"id": id, "product_name": "", "product_price": "", "products_number_of_stocks": new_products_number_of_stocks, "stock_unit": ""},
                success: function(data) {
                    $(document.getElementById(id).getElementsByTagName('td')[2]).html(data);
                },
                error: function(data) {
                    console.log("There's an error in updating product's stock info. It says " + JSON.stringify(data));
                }
            });
        } else {
            $("#new_products_number_of_stock_form").addClass("control-group error");
        }
        return false;
    });

    $("#new_products_number_of_stocks").blur(function() {
        var numeric_pattern = /^[0-9]*$/;
        var new_products_number_of_stocks = $("#new_products_number_of_stocks").val();
        var new_products_number_of_stocks_valid = numeric_pattern.test(new_products_number_of_stocks);
        if(new_products_number_of_stocks != "" && new_products_number_of_stocks_valid) {
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
        } else {
            $("#new_products_number_of_stock_form").addClass("control-group error");
        }
    });
}

function edit_products_stock_unit(id) {
    var stock_unit = document.getElementById(id).getElementsByTagName('td')[3].innerHTML;
    $(document.getElementById(id).getElementsByTagName('td')[3]).html("<form id = 'new_stock_unit_form'><select id = 'new_stock_unit' class = 'span1'><option>pieces</option><option>packs</option><option>klg</option><option>g</option><option>lbs</option><option id = 'new_stock_unit_others_option'>others</option></select></form>")
    $("#new_stock_unit").val(stock_unit);
    $("#new_stock_unit_form").change(function() {
        if($("#new_stock_unit").val() == "others") {
            $(document.getElementById(id).getElementsByTagName('td')[3]).html("<form id = 'new_stock_unit_form'><input type = 'text' id = 'new_inputted_stock_unit' class = 'input-medium' /></form>");
            $("#new_stock_unit_form").submit(function() {
                $.ajax({
                    type: "POST",
                    url: "../PHP/OBJECTS/PRODUCTS/update_products_info.php",
                    data: {"id": id, "product_name": "", "product_price": "", "products_number_of_stocks": "", "stock_unit": $("#new_inputted_stock_unit").val()},
                    success: function(data) {
                        $(document.getElementById(id).getElementsByTagName('td')[3]).html(data);
                    },
                    error: function(data) {
                        console.log("There's an error in updating product's stock unit. It says " + JSON.stringify(data));
                    }
                });
                return false;
            });
            $("#new_inputted_stock_unit").blur(function() {
                $.ajax({
                    type: "POST",
                    url: "../PHP/OBJECTS/PRODUCTS/update_products_info.php",
                    data: {"id": id, "product_name": "", "product_price": "", "products_number_of_stocks": "", "stock_unit": $("#new_inputted_stock_unit").val()},
                    success: function(data) {
                        $(document.getElementById(id).getElementsByTagName('td')[3]).html(data);
                    },
                    error: function(data) {
                        console.log("There's an error in updating product's stock unit. It says " + JSON.stringify(data));
                    }
                });
            });
        } else {
            edit_products_stock_unit_ajax_request(id);
        }
    });

    $("#new_stock_unit").blur(function() {
        edit_products_stock_unit_ajax_request(id);
    });
}

function edit_products_stock_unit_ajax_request(id) {
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
                while(counter < table_rows.length) {
                    var check_box = document.getElementById('product_check_box_' + table_rows[counter].id);
                    if(check_box.checked) {
                        product_ids_to_delete.push(table_rows[counter].id);
                    }
                    $('#' + table_rows[counter].id).remove();
                    counter++;
                }
                $.ajax({
                    type: "POST",
                    url: "../PHP/OBJECTS/PRODUCTS/delete_product.php",
                    data: {"product_ids_to_delete": product_ids_to_delete},
                    success: function() {
                        $("#delete_product_confirmation_div").dialog("close");
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
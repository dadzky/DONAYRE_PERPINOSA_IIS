$(function() {

    // ============== HIDDEN ELEMENTS ===============
    $("#hide_delete_action_button").hide();
    $("#delete_product_confirmation_div").hide();
    $("#add_product_confirmation_div").hide();
    $("#select_stock_unit_first_option").hide();

    // ============== APPENDING OPTIONS TO SELECT TAG (display_product_selected_letter) ===================

    var alphabet_array = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',];
    var counter = 0;
    while(counter < alphabet_array.length) {
        $("#display_product_selected_letter").append("<option>" + alphabet_array[counter] + "</option>");
        counter++;
    }
    // ============ MARKING AND UNMARKING checkboxes ============== //
    $('#display_products_table').on('click','tbody li:first',function(){
        var id = $('#display_products_table tr').find('input')
        for(var ctr=0;ctr<id.length;ctr++){
            var td=$(id[ctr]).context.parentNode;
            $(td).html("<input id='"+$(id[ctr]).attr('id')+"' type='checkbox' checked='checked'>");
        }
    })
    $('#display_products_table').on('click','tbody li:last',function(){
        var id = $('#display_products_table tr').find('input')
        for(var ctr=0;ctr<id.length;ctr++){
            var td=$(id[ctr]).context.parentNode;
            $(td).html("<input id='"+$(id[ctr]).attr('id')+"' type='checkbox' />");
        }
    });

    // ================= PRODUCT DATA CONTROLLERS > FUNCTIONS ====================

    display_products();

    // ================ ADDING PRODUCTS ===============

    $("#stock_unit").change(function() {
        if($("#stock_unit").val() == "others") {
            $("#stock_unit_dd").html("<input type = 'text' name = 'stock_unit' id = 'stock_unit' />");
            $("#stock_unit").focus();
        }
    })

    $("#add_product_button").click(function() {
        var product_name = $("#product_name").val();
        var product_price = $("#product_price").val();
        var number_of_stocks = $("#number_of_stocks").val();
        var stock_unit = $("#stock_unit").val();

        var string_pattern = /^[a-z, A-Z]*$/;
        var numeric_pattern = /^[0-9, .]*$/;

        var product_price_valid = numeric_pattern.test(product_price);
        var number_of_stocks_valid = numeric_pattern.test(number_of_stocks);

        if(product_name != "") {
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
                                                    $("#add_product_confirmation_div").dialog("close");
                                                    $("#stock_unit_dd").html("<select name = 'stock_unit' id = 'stock_unit'><option>pieces</option><option>packs</option><option>klg</option><option>g</option> <option>lbs</option><option>others</option></select>");
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
                                    success: function() {
                                        display_products();
                                        $("#stock_unit_dd").html("<select name = 'stock_unit' id = 'stock_unit'><option>pieces</option><option>packs</option><option>klg</option><option>g</option> <option>lbs</option><option>others</option></select>");
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

    // ===================== DISPLAYING PRODUCTS BY SELECTED letter ===================

    $("#display_product_selected_letter").change(function() {
        $.ajax({
            type: "POST",
            url: "../PHP/OBJECTS/PRODUCTS/display_products_by_select_letter.php",
            data: {"selected_letter": $("#display_product_selected_letter").val()},
            success: function(data) {
                if(data != "") {
                    $("#display_products_table").html(data);
                } else {
                    $("#display_products_table").html("<tr><td>No results for '<b>" + $("#display_product_selected_letter").val() + "</b>'.</td></tr>");
                }
                if($("#display_product_selected_letter").val() == "all") {
                    display_products();
                }
            },
            error: function(data) {
                console.log("THERE'S AN ERROR IN DISPLAYING PRODUCTS BY SELECTED LETTER. IT SAYS " + JSON.stringify(data));
            }
        });
    });

    // ================== SEARCHING SPECIFIC PRODUCT ====================

    $("#search_product_input_field").keyup(function() {
        $.ajax({
            type: "POST",
            url: "../PHP/OBJECTS/PRODUCTS/search_product.php",
            data: {"product_name_to_search": $("#search_product_input_field").val()},
            success: function(data) {
                if(data != "") {
                    $("#display_products_table").html(data);
                } else {
                    $("#display_products_table").html("<tr><td>No results for '<b>" + $("#search_product_input_field").val() + "</b>'.</td></tr>");
                }
            },
            error: function(data) {
                console.log("There's an error in searching product. It says " + JSON.stringify(data));
            }
        });

        if($("#search_product_input_field").val() == "") {
            display_products();
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

function retrieve_product_data(id, data_to_retrieve) {
    return $.ajax({
        async: true,
        type: "POST",
        url: "../PHP/OBJECTS/PRODUCTS/retrieve_product_data.php",
        data: {"id":id, "data_to_retrieve": data_to_retrieve},
        error: function(data) {
            console.log("Error in retrieving products' data = " + JSON.stringify(data));
        }
    });
}

function edit_products_name(id) {
    $(document.getElementById(id).getElementsByTagName('td')[0]).html("<form id = 'new_product_name_form'><input type = 'text' id = 'new_product_name' class = 'input-medium'/></form>");
    var data_to_retrieve = "product_name";
    var retrieve_product_name_to_edit = retrieve_product_data(id, data_to_retrieve);
    retrieve_product_name_to_edit.success(function(data) {
        $("#new_product_name").val(data);
        $("#new_product_name").focus();
    });

    $("#new_product_name").blur(function() {
        var new_product_name = $("#new_product_name").val();
        if(new_product_name != "") {
            request_for_editing_product_name(id, new_product_name);
        } else {
            $("#new_product_name_form").addClass("control-group error");
        }
    });

    $("#new_product_name_form").submit(function() {
        var new_product_name = $("#new_product_name").val();
        if(new_product_name != "") {
            request_for_editing_product_name(id, new_product_name);
        } else {
            $("#new_product_name_form").addClass("control-group error");
        }
        return false;
    });
}

function request_for_editing_product_name(id, new_product_name) {
    $.ajax({
        type: "POST",
        url: "../PHP/OBJECTS/PRODUCTS/update_products_info.php",
        data: {"id": id, "product_name": new_product_name, "product_price": "", "products_number_of_stocks": "", "stock_unit": ""},
        success: function(data) {
            display_products();
        },
        error: function(data) {
            console.log("There's an error in retrieving product's name. It says " + JSON.stringify(data));
        }
    });
}

function edit_products_price(id) {
    $(document.getElementById(id).getElementsByTagName('td')[1].getElementsByTagName('span')).html("<form id = 'new_product_price_form'><input type = 'text' id = 'new_product_price' class = 'input-mini'/></form>");
    var data_to_retrieve = "product_price";
    var retrieve_product_price_to_edit = retrieve_product_data(id, data_to_retrieve);
    retrieve_product_price_to_edit.success(function(data) {
        $("#new_product_price").val(data);
        $("#new_product_price").focus();
    });
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
                    display_products();
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
                    display_products();
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
    $(document.getElementById(id).getElementsByTagName('td')[2]).html("<form id = 'new_products_number_of_stock_form'><input type = 'text' id = 'new_products_number_of_stocks' class = 'input-mini'/></form>");
    var data_to_retrieve = "number_of_stocks";
    var retrieve_number_of_stocks_to_edit = retrieve_product_data(id, data_to_retrieve);
    retrieve_number_of_stocks_to_edit.success(function(data) {
        $("#new_products_number_of_stocks").val(data);
        $("#new_products_number_of_stocks").focus();
    });
    $("#new_products_number_of_stock_form").submit(function() {
        var numeric_pattern = /^[0-9, .]*$/;
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
        var numeric_pattern = /^[0-9, .]*$/;
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
    $("#new_stock_unit").focus();
    $("#new_stock_unit_form").change(function() {
        if($("#new_stock_unit").val() == "others") {
            $(document.getElementById(id).getElementsByTagName('td')[3]).html("<form id = 'new_stock_unit_form'><input type = 'text' id = 'new_inputted_stock_unit' class = 'input-mini' placeholder = 'stock unit' /></form>");
            $("#new_inputted_stock_unit").focus();
            $("#new_stock_unit_form").submit(function() {
                if($("#new_inputted_stock_unit").val() != "") {
                    edit_products_stock_unit_using_select(id);
                } else {
                    $("#new_stock_unit_form").addClass("control-group error");
                }
                return false;
            });
            $("#new_inputted_stock_unit").blur(function() {

                if($("#new_inputted_stock_unit").val() != "") {
                    edit_products_stock_unit_using_select(id);
                } else {
                    $("#new_stock_unit_form").addClass("control-group error");
                }
            });
        } else {
            edit_products_stock_unit_using_input(id);
        }
    });

    $("#new_stock_unit").blur(function() {
        edit_products_stock_unit_using_input(id);
    });
}

function edit_products_stock_unit_using_select(id) {
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
}

function edit_products_stock_unit_using_input(id) {
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

function delete_products() {
    var product_ids_to_delete = new Array();
    var product_table = document.getElementById("display_products_table");
    var table_rows = product_table.getElementsByTagName("tr");
    var counter = 1;
    while(counter < table_rows.length) {
        var check_box = document.getElementById('product_check_box_' + table_rows[counter].id);
        if(check_box.checked) {
            product_ids_to_delete.push(table_rows[counter].id);
        }
        counter++;
    }

    if(product_ids_to_delete == "") {
        alert("Nothing to delete!");
    } else {
        $("#delete_product_confirmation_div").dialog({
            title: "DELETE CONFIRMATION",
            show: {effect: 'slide', direction: 'up'},
            hide: {effect: 'slide', direction: 'up'},
            modal: true,
            resizable: false,
            draggable: false,
            buttons: {
                "YES": function() {
                    $.ajax({
                        type: "POST",
                        url: "../PHP/OBJECTS/PRODUCTS/delete_product.php",
                        data: {"product_ids_to_delete": product_ids_to_delete},
                        success: function() {
                            $("#delete_product_confirmation_div").dialog("close");
                            for(var counter = 0; counter < product_ids_to_delete.length; counter++) {
                                $('#' + product_ids_to_delete[counter]).remove();
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
}
$(function() {

    // ============== HIDDEN ELEMENTS ===============
    $("#hide_delete_action_button").hide();
    $("#delete_product_confirmation_div").hide();
    $("#add_product_confirmation_div").hide();
    $("#select_stock_unit_first_option").hide();
    $("#add_supplier_button").hide();
    getProductTotalPages();

    // ============== APPENDING OPTIONS TO SELECT TAG (display_product_selected_letter) ===================

    var alphabet_array = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    var counter = 0;
    while(counter < alphabet_array.length) {
        $("#display_product_selected_letter").append("<option>" + alphabet_array[counter] + "</option>");
        counter++;
    }
    // ============ MARKING AND UNMARKING checkboxes ============== //
    $('#display_products_table').on('click','thead li:first',function(){
        var id = $('#display_products_table tr').find('input')
        for(var ctr=0;ctr<id.length;ctr++){
            var td=$(id[ctr]).context.parentNode;
            $(td).html("<input id='"+$(id[ctr]).attr('id')+"' type='checkbox' checked='checked'>");
        }
    })
    $('#display_products_table').on('click','thead li:last',function(){
        var id = $('#display_products_table tr').find('input')
        for(var ctr=0;ctr<id.length;ctr++){
            var td=$(id[ctr]).context.parentNode;
            $(td).html("<input id='"+$(id[ctr]).attr('id')+"' type='checkbox' />");
        }
    });

    //================== ON CLICK EVENTS ===================

    $("#back_to_adding_product_img").click(function() {
        $("#add_product_form").toggle('slow');
        $("#add_suppliers_form").slideToggle('slow');
        $("#add_supplier_button").hide();
        $("#add_product_button").show();
        $("#product_supplier").prop('selectedIndex', 0);
    });

    $("#product_supplier").click(function() {
        if($("#product_supplier option:first").html() == "NEW SUPPLIER") {
            $("#add_product_form").toggle('slow');
            $("#add_suppliers_form").slideToggle('slow');
            $("#add_supplier_button").show();
            $("#add_product_button").hide();
        }
    })

    // =============== ON CHANGE EVENTS ==============

    $("#product_supplier").change(function() {
        if($("#product_supplier").val() == "NEW SUPPLIER") {
            $("#add_product_form").toggle('slow');
            $("#add_suppliers_form").slideToggle('slow');
            $("#add_supplier_button").show();
            $("#add_product_button").hide();
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
        var product_name = $.trim($("#product_name").val());
        var product_price = $.trim($("#product_price").val());
        var number_of_stocks = $.trim($("#number_of_stocks").val());
        var stock_unit = $("#stock_unit").val();

        var numeric_pattern = /^[0-9, .]*$/;

        var product_price_valid = numeric_pattern.test(product_price);
        var number_of_stocks_valid = numeric_pattern.test(number_of_stocks);

        if(product_name != "" ) {
            if(product_price != "" && product_price_valid) {
                if(number_of_stocks != "" && number_of_stocks_valid) {
                    if($.trim($("#bar_code").val()) != "") {
                        $.ajax({
                            type: "POST",
                            url: "../PHP/OBJECTS/PRODUCTS/check_if_product_to_add_already_exist.php",
                            data: {"execute": "check_product_name_to_add", "product_data": JSON.stringify($("#add_product_form").serializeArray())},
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
                                                // ================= UPDATES THE NUMBER OF STOCK OF A PRODUCT =================
                                                $.ajax({
                                                    type: "POST",
                                                    url: "../PHP/OBJECTS/PRODUCTS/add_product.php",
                                                    data: {"products_data": JSON.stringify($("#add_product_form").serializeArray()), "update": "yes"},
                                                    success: function(data) {
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
                                    // ============== Okay, product name is unique. Proceed naman in checking the bar code if it is also unique ========
                                    $.ajax({
                                        type: "POST",
                                        url: "../PHP/OBJECTS/PRODUCTS/check_bar_code.php",
                                        data: {"bar_code": $("#bar_code").val()},
                                        success: function(data) {
                                            if(data == "true") {
                                                // ======= means bar code already exist!!!! ======
                                                alert("Please check PRODUCT'S BAR CODE. \n It should be unique!");

                                            } else {
                                                // bar code doesn't exist, so proceed in adding the new product =========
                                                $.ajax({
                                                    type: "POST",
                                                    url: "../PHP/OBJECTS/PRODUCTS/add_product.php",
                                                    data: {"products_data": JSON.stringify($("#add_product_form").serializeArray()), "update": "no"},
                                                    success: function() {
                                                        display_products();
                                                        $("#stock_unit_dd").html("<select name = 'stock_unit' id = 'stock_unit'><option>piece</option><option>packs</option><option>klg</option><option>g</option> <option>lbs</option><option>others</option></select>");
                                                        $("#number_of_stocks_dd").removeClass("control-group error");
                                                        $("#product_price_dd").removeClass("control-group error");
                                                        $("#bar_code_dd").removeClass("control-group error");
                                                        $("#product_name_dd").removeClass("control-group error");
                                                        $("#add_product_form input").not(':input[type = reset]').val(' ');
                                                    },
                                                    error: function(data) {
                                                        console.log("There's an error in adding a product. It says " + JSON.stringify(data));
                                                    }
                                                });
                                            }
                                        },
                                        error: function(data) {
                                            console.log("Error in checking bar code = " + JSON.stringify(data));
                                        }
                                    });
                                }
                            },
                            error: function(data) {
                                console.log("There's an error in checking products. It says " + JSON.stringify(data));
                            }
                        }); // ============ END of AJAX Request in cheking if product exist ========
                    } else {
                        // ========= bar code empty warning ===========
                        $("#bar_code_dd").addClass("control-group error");
                    }

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

    // ===================== DISPLAYING PRODUCTS BY SELECTED GENRE ===================

    $("#product_genre_to_display").change(function() {
        display_products();
        getProductTotalPages();
    });

    /*
    // ===================== DISPLAYING PRODUCTS BY SELECTED letter ===================

    $("#display_product_selected_letter").change(function() {
        $.ajax({
            type: "POST",
            url: "../PHP/OBJECTS/PRODUCTS/display_products_by_select_letter.php",
            data: {"selected_letter": $("#display_product_selected_letter").val()},
            success: function(data) {
                if(data != "") {
                    $("#display_products_table_tbody").html(data);
                } else {
                    $("#display_products_table_tbody").html("<tr><td>No results for '<b>" + $("#display_product_selected_letter").val() + "</b>'.</td></tr>");
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
    */

    // ================== SEARCHING PRODUCT WITH SPECIFIC GENRE ====================

    $("#search_product_input_field").keyup(function() {
        $.ajax({
            type: "POST",
            url: "../PHP/OBJECTS/PRODUCTS/search_product.php",
            data: {"product_name_to_search": $("#search_product_input_field").val(), "product_genre_to_display": $("#product_genre_to_display").val()},
            success: function(data) {
                if(data != "") {
                    $("#display_products_table_tbody").html(data);
                } else {
                    $("#display_products_table_tbody").html("<tr class = 'alert alert-block alert-danger'><td>No results for '<b>" + $("#search_product_input_field").val() + "</b>'.</td></tr>");
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

    /*============================ [-- PAGINATION --] =============================*/
    $('#pager_ul').on('click','li a',function(){
        var maxPage = parseInt($('#product_total_pages').val());
        var pageSelected = parseInt($(this).html());
        var liIndex = $($(this).context.parentNode).index();
        var lilength = parseInt($('#pager_ul li').length)-1;
        var newSetOfPages = 0;
        if(regexInt.test(pageSelected)){
            $('#pager_ul li').removeClass('active');
            if(liIndex == 6){

                newSetOfPages = pageSelected+4;
                if(newSetOfPages <= maxPage){
                    displayProductsPager(pageSelected, newSetOfPages)
                }else{
                    newSetOfPages = maxPage-4;
                    displayProductsPager(newSetOfPages, maxPage)
                }
            }else if(liIndex == 2){
                newSetOfPages = pageSelected-4;
                if(newSetOfPages>0){
                    displayProductsPager(newSetOfPages, pageSelected)
                }else{
                    if( maxPage < 5 ){
                        displayProductsPager(1, maxPage)
                    }else{
                        displayProductsPager(1, 5)
                    }
                }
            }
            $('#current_page_tracker_span').html(pageSelected);
            $('#page_'+pageSelected).addClass('active');
        }else if(liIndex == 0){ //first pager
            $('#pager_ul li').removeClass('active');
            if(maxPage <= 5 ){
                displayProductsPager(1, maxPage);
            }else{
                displayProductsPager(1, 5);
            }

            $('#pager_ul li:eq(2)').addClass('active');
            $('#current_page_tracker_span').html(1);
        }else if(liIndex == lilength){ //last pager
            $('#pager_ul li').removeClass('active');
            newSetOfPages = maxPage-4;
            if(maxPage<=5){
                newSetOfPages = maxPage+1;
                displayProductsPager(1, maxPage)
                $("#pager_ul li:eq("+newSetOfPages +")").addClass('active');
            }else{
                displayProductsPager(newSetOfPages, maxPage)
                $("#pager_ul li:eq(6)").addClass('active');

            }

            $('#current_page_tracker_span').html(maxPage);
        }
        display_products();
    });

    $('#product_pageLimit_form').submit(function(){
        display_products();
        getProductTotalPages();
        return false;
    });
});

// =================== DISPLAYS PRODUCTS ============== //
var regexInt = /^[0-9]+$/;

function display_products() {
    var prod_genre = $("#product_genre_to_display").val();
    var currentPage = parseInt($('#current_page_tracker_span').html())-1;
    var pageLimit = $('#product_pageLimit_input').val();
    if(!regexInt.test(pageLimit)){
        pageLimit = 5;
    }
    var obj = {'product_genre_to_display':prod_genre, currentPage:currentPage, pageLimit:pageLimit };
    $.ajax({
        type: "POST",
        url: "../PHP/OBJECTS/PRODUCTS/display_products.php",
        data: obj,
        success: function(data) {
             //  alert(data)
            if(data != "") {
                $("#display_products_table_tbody").html(data);
            } else {
                $("#display_products_table_tbody").html("<tr class = 'alert alert-block alert-danger'><td>No Product Found!</td></tr>");
            }
        },
        complete: function() {
            $("#loading_image").hide();
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
        // ============= CHECK IF EDITED PRODUCT NAME WAS ALREADY IN THE LIST ============
        $.ajax({
            type: "POST",
            url: "../PHP/OBJECTS/PRODUCTS/check_if_product_to_add_already_exist.php",
            data: {"execute": "check_edited_product_name", "product_name": $("#new_product_name").val(), "product_id": id},
            success: function(data) {

                if(data == "true") {
                    $("#new_product_name_form").addClass("control-group error");
                } else {
                    // =========== DOESN'T EXIST IN THE LIST, SO PROCEED UPDATING ===========
                    var new_product_name = $("#new_product_name").val();
                    if(new_product_name != "") {
                        request_for_editing_product_name(id, new_product_name);
                    } else {
                        $("#new_product_name_form").addClass("control-group error");
                    }
                }
            },
            error: function(data) {

            }
        });
    });

    $("#new_product_name_form").submit(function() {
        // ============= CHECK IF EDITED PRODUCT NAME WAS ALREADY IN THE LIST ============
        $.ajax({
            type: "POST",
            url: "../PHP/OBJECTS/PRODUCTS/check_if_product_to_add_already_exist.php",
            data: {"execute": "check_edited_product_name", "product_name": $("#new_product_name").val(), "product_id": id},
            success: function(data) {
                if(data == "true") {
                    $("#new_product_name_form").addClass("control-group error");
                } else {
                    // =========== DOESN'T EXIST IN THE LIST, SO PROCEED UPDATING ===========
                    var new_product_name = $("#new_product_name").val();
                    if(new_product_name != "") {
                        request_for_editing_product_name(id, new_product_name);
                    } else {
                        $("#new_product_name_form").addClass("control-group error");
                    }
                }
            },
            error: function(data) {

            }
        });
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
    $(document.getElementById(id).getElementsByTagName('td')[2].getElementsByTagName('span')).html("<form id = 'new_product_price_form'><input type = 'text' id = 'new_product_price' class = 'input-mini'/></form>");
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
                success: function() {
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
    $(document.getElementById(id).getElementsByTagName('td')[3]).html("<form id = 'new_products_number_of_stock_form'><input type = 'text' id = 'new_products_number_of_stocks' class = 'input-mini'/></form>");
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
                success: function() {
                    display_products();
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
                success: function() {
                    display_products();
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
    var stock_unit = document.getElementById(id).getElementsByTagName('td')[4].innerHTML;
    $(document.getElementById(id).getElementsByTagName('td')[4]).html("<form id = 'new_stock_unit_form'><select id = 'new_stock_unit' class = 'span1'><option>piece</option><option>pack</option><option>klg</option><option>g</option><option>lbs</option><option id = 'new_stock_unit_others_option'>others</option></select></form>");
    $("#new_stock_unit").val(stock_unit);
    $("#new_stock_unit").focus();
    $("#new_stock_unit_form").change(function() {
        if($("#new_stock_unit").val() == "others") {
            $(document.getElementById(id).getElementsByTagName('td')[4]).html("<form id = 'new_stock_unit_form'><input type = 'text' id = 'new_inputted_stock_unit' class = 'input-mini' placeholder = 'stock unit' /></form>");
            $("#new_inputted_stock_unit").focus();
            $("#new_stock_unit_form").submit(function() {
                if($("#new_inputted_stock_unit").val() != "") {
                    edit_products_stock_unit_ajax(id, $("#new_inputted_stock_unit").val());
                } else {
                    $("#new_stock_unit_form").addClass("control-group error");
                }
                return false;
            });
            $("#new_inputted_stock_unit").blur(function() {

                if($("#new_inputted_stock_unit").val() != "") {
                    edit_products_stock_unit_ajax(id, $("#new_inputted_stock_unit").val());
                } else {
                    $("#new_stock_unit_form").addClass("control-group error");
                }
            });
        } else {
            // edit using select tag,
            edit_products_stock_unit_ajax(id, $("#new_stock_unit").val());
        }
    });

    $("#new_stock_unit").blur(function() {
        edit_products_stock_unit_ajax(id, $("#new_stock_unit").val());
    });
}

function edit_products_stock_unit_ajax(id, new_product_stock_unit) {
    $.ajax({
        type: "POST",
        url: "../PHP/OBJECTS/PRODUCTS/update_products_info.php",
        data: {"id": id, "product_name": "", "product_price": "", "products_number_of_stocks": "", "stock_unit": new_product_stock_unit},
        success: function(data) {
            console.log("wew = " + data);
            display_products();
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


function show_complete_product_name(id) {
    var shortened_product_name = $("#display_products_table_tbody #" + id + " td:first span:first").html();
    $.ajax({
        type: "POST",
        url: "../PHP/OBJECTS/PRODUCTS/show_complete_product_name.php",
        data: {"id": id},
        success: function(data) {
            if(data != "") {
                var td = document.getElementById(id).getElementsByTagName('td')[0];
                $("#" + id + " td:first").addClass("complete_product_name_style");
                $("#display_products_table_tbody #" + id + " td:first span:first").html(data);
                $("#display_products_table_tbody #" + id + " td:first span:eq(1)").hide();
                $("#" + id + " td:first").mouseleave(function() {
                    $("#display_products_table_tbody #" + id + " td:first span:first").html(shortened_product_name);
                    $("#display_products_table_tbody #" + id + " td:first span:eq(1)").show();
                    $("#" + id + " td:first").removeClass("complete_product_name_style");
                });
            }
        },
        error: function(data) {
            console.log("Error in show_complete_product_name = " + JSON.stringify(data));
        }

    });
}

/*======================== [--PAGINATION AREA--] ===============================*/
function getProductTotalPages(){
    var productName = $('#search_product_input_field').val();
    var productGenre = $('#product_genre_to_display').val();
    var pageLimit = $('#product_pageLimit_input').val();
    var totalPages = 0;
    if(!regexInt.test(pageLimit)){
        pageLimit = 5;
    }
    pageLimit = parseInt(pageLimit);
    var obj = {productName:productName, productGenre:productGenre};
    $.ajax({
        type:'POST',
        url: '../PHP/OBJECTS/PRODUCTS/retrieveProductTotalPages.php',
        data: obj,
        success:function(data){
            totalPages = Math.ceil(parseInt(data)/pageLimit)
            $('#product_total_pages').val(totalPages);
            $('#total_page_span').html(totalPages);
            $('#current_page_tracker_span').html(1);
            if(totalPages < 5){
                displayProductsPager(1,totalPages);
            }else{
                displayProductsPager(1,5);
            }
            $('#pager_ul li:eq(2)').addClass('active')
        },
        error:function(data){
            alert(data['statusText'])
        }
    })
}

function displayProductsPager(pages, offset){
    var maxPage = parseInt($('#product_total_pages').val());
    var productsPager = "";

    if(maxPage > 1){
        productsPager += " <li ><a href='#'>&laquo; first</a></li> <li onclick='previousProductPager()'><a href='#'>&lsaquo; prev</a></li>";
        for(var ctr=pages; ctr<=offset; ctr++){
            productsPager += "<li id=page_"+ctr+"><a href='javascript:void(0)'>"+ctr+"</a></li>";
        }
        productsPager += " <li onclick='nextProductPager()' ><a href='#'>next &rsaquo;</a></li> <li><a href='#'>last &raquo;</a></li>";
    }else{
        productsPager = "--------------------------------------------------------";
    }
    $('#pager_ul').html(productsPager);
}

function nextProductPager(){
    var maxPage = parseInt($('#product_total_pages').val());
    var currentPage = parseInt($('#current_page_tracker_span').html())+1;
    var liActive = $('#pager_ul li.active').index();
    if(currentPage <= maxPage && liActive != 6){
        $('#pager_ul li').removeClass('active');
        $('#current_page_tracker_span').html(currentPage);
        $('#page_'+currentPage).addClass('active');
        display_products();
    }
}

function previousProductPager(){
    var liActive = $('#pager_ul li.active').index();
    var currentPage = parseInt($('#current_page_tracker_span').html())-1;
    if(liActive != 2){
        $('#pager_ul li').removeClass('active');
        $('#current_page_tracker_span').html(currentPage);
        $('#page_'+currentPage).addClass('active');
        display_products();
    }
}

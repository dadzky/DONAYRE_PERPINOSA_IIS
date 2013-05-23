$(function() {

    $("#show_transaction_span").click(function() {
        $("#display_admins_transaction_div").slideToggle('slow');
        $("#display_suppliers_div").slideToggle('slow');
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
        if($.trim($("#company_name").val()) != "" && $.trim($("#supplier_address").val()) != "" ) {
            if(/^[0-9, -]*$/.test($("#supplier_contact_number").val()) && $.trim($("#supplier_contact_number").val()) != "" ) {
                var data = {"suppliers_data": JSON.stringify($("#add_suppliers_form").serializeArray())};
                var add_request = request("../PHP/OBJECTS/SUPPLIERS/add_supplier.php", data, "adding supplier");
                add_request.success(function(data) {
                    $("#contact_number_dd").removeClass("control-group error");
                    // ====== back in adding products ===

                    $("#add_product_form").toggle('slow');
                    $("#add_suppliers_form").slideToggle('slow');
                    $("#add_supplier_button").hide();
                    $("#add_product_button").show();

                    $("#product_supplier").prepend("<option>"+data+"</option>");
                    $("#product_supplier").val(data);


                });
            } else {
                alert("not valid");
                // ========== invalid contact number warning =========
                $("#contact_number_dd").addClass("control-group error");
            }
        } else {
            // ======= Some fields are blank warning ==========
            $("#add_supplier_warning").show();
            $("#add_supplier_warning").fadeOut(7000);
        }
    });

    $("#item_limit_input").keyup(function() {
        if($("#item_limit_input").val() > 0 || $("#item_limit_input").val() == "") {
            display_supplier_pager();
            display_suppliers();
            $("#item_limit_content").removeClass("control-group error");
        } else {
            $("#item_limit_content").addClass("control-group error");
        }
    });

    $("#pagination_content_div").on('click', 'li a', function() {
        $("#pagination_content_div li").removeClass("active");
        var maxPage = parseInt($('#maxPage_input').val());
        var liParent = $(this.parentNode);
        var pageNum = liParent.index()+1;
        var limit=0;
        var current_page = $(this).html();
        $("#current_page").val(current_page - 1);
        if(maxPage > 6){
            if((pageNum == 6 || pageNum == 7) && current_page < maxPage){
                limit = parseInt(current_page)+5;
                if(limit >= maxPage){
                    pageOnTracked = maxPage-6;
                }else{
                    pageOnTracked = parseInt(current_page) - 1;
                }
                show_pager(pageOnTracked);
            }else if(pageNum == 1 || pageNum == 2){
                limit = parseInt(current_page)-5;
                if(limit > 0){
                    pageOnTracked = current_page - 5;
                }else{
                    pageOnTracked = 1;
                }
                show_pager(pageOnTracked);
            }

            $('#page_'+current_page).toggleClass('active');
        }else{
            liParent.toggleClass("active");
        }
        display_suppliers(null);
    });

    // =========== PAGER NEXT AND PREVIOUS BUTTON ============ //

    $("#previous_page_button").click(function() {
        var current_page = parseInt($("#current_page").val())-1;
        var liActive = current_page+1;
        if(current_page >= 0){
            $("#suppliers_table").hide("slide", {direction: "right"}, 500);
            $("#pagination_content_div li").removeClass("active");
            $("#current_page").val(current_page);
            $('#page_'+ liActive).toggleClass('active');
            display_suppliers("left");
        }

    });

    $("#next_page_button").click(function() {
        var maxPage = parseInt($('#maxPage_input').val());
        var current_page = parseInt($("#current_page").val())+1;
        var liActive = current_page+1;

        if(current_page < maxPage){
            $("#suppliers_table").hide("slide", {direction: "left"}, 500);
            $("#pagination_content_div li").removeClass("active");
            $("#current_page").val(current_page);
            $('#page_'+ liActive).toggleClass('active');
            display_suppliers("right");
        }

    });
    // ========= searching employees =============
    $("#filter_by_option_a").click(function() {
        $(document).bind('click', function() {
            $(this).css("display", "none");
        });
        $("#search_supplier_input").tooltip();
        $("#filter_by_options_ul").toggle();
        $("#search_by_company_name_li").click(function() {
            $("#filter_by_options_ul").css("display", "none");
            $("#search_supplier_input").attr("data-original-title", "Filter By COMPANY NAME");
            $("#hidden_search_supplier_by_input").val("company_name");
            if($.trim($("#search_supplier_input").val()) != "") {
                search_supplier();
            }
        });
        $("#search_by_product_name_li").click(function() {
            $("#filter_by_options_ul").css("display", "none");
            $("#search_supplier_input").attr("data-original-title", "Filter By PRODUCT NAME");
            $("#hidden_search_supplier_by_input").val("product_name");
            if($.trim($("#search_supplier_input").val()) != "") {
                alert($("#search_supplier_input").val());
                search_supplier();
            }
        });
        $("#search_by_supplier_address_li").click(function() {
            $("#filter_by_options_ul").css("display", "none");
            $("#search_supplier_input").attr("data-original-title", "Filter By SUPPLIER ADDRESS");
            $("#hidden_search_supplier_by_input").val("address");
            if($.trim($("#search_supplier_input").val()) != "") {
                search_supplier();
            }
        });
        /*
        var mouse_position = "outside ul";
        $("#filter_by_options_ul").hover(function() {
            mouse_position = "inside ul";
        });
        if(mouse_position == "outside ul") {
            $("body").click(function() {
                $("#filter_by_options_ul").toggle();
            })
        }
        */
    });
    $("#search_supplier_input").keyup(function() {
        search_supplier();

    });
});

var pageOnTracked = 0;

function search_supplier() {
    if($("#hidden_search_supplier_by_input").val() != "") {
        $("#search_supplier_span").removeClass("control-group error");
        var item_limit = $("#item_limit_input").val();
        var current_page = parseInt($("#current_page").val());
        current_page = current_page * item_limit;
        if(item_limit == "") {
            item_limit = 5;
        } else {
            item_limit = parseInt(item_limit);
        }
        var field_name = $("#hidden_search_supplier_by_input").val();
        var search_input_value = $("#search_supplier_input").val();

        var data_object = {"field_name": field_name, "search_input_value": search_input_value, "current_page": current_page, "item_limit": item_limit};

        var search_supplier_request = request("../PHP/OBJECTS/SUPPLIERS/search_supplier.php", data_object, "searching supplier request");
        search_supplier_request.success(function(data) {
            if(data != "") {
                alert("data = " + data);
                $("#display_suppliers_tbody").html(data);
            } else {
                $("#display_suppliers_tbody").html("<tr class = 'alert alert-danger'><td colspan = '4'>No record found!</td></tr>");
            }
        });
    } else {
        $("#search_supplier_input").attr("data-original-title", "Select first CATEGORY to FILTER");
        $("#search_supplier_input").tooltip();
        $("#search_supplier_span").addClass("control-group error");
    }

    if($("#search_supplier_input").val() == "") {
        display_suppliers();
    }
}

function retrieve_all_suppliers() {
    var retrieve_all_suppliers_request = request("../PHP/OBJECTS/SUPPLIERS/retrieve_all_suppliers.php", null, "retrieving all suppliers");
    retrieve_all_suppliers_request.success(function(data) {
        $("#product_supplier").html(data);
    });
}

function display_suppliers(direction) {
    var item_limit = $("#item_limit_input").val();
    var current_page = parseInt($("#current_page").val());
    if(item_limit == "") {
        item_limit = 5;
    } else {
        item_limit = parseInt(item_limit);
    }
    var data_object = {"item_limit": item_limit, "current_page": current_page*item_limit};

    var display_suppliers_request = request("../PHP/OBJECTS/SUPPLIERS/display_suppliers.php", data_object, "displaying suppliers request");
    display_suppliers_request.success(function(data) {
        $("#display_suppliers_tbody").html(data);
        $("#suppliers_table").show("slide", {direction: direction}, 500);
        var cur_page = current_page / item_limit * item_limit + 1;
        $("#current_page_span").html(cur_page);
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
    var display_supplier_pager_request = request("../PHP/OBJECTS/SUPPLIERS/display_supplier_pager.php", data, "displaying supplieqr pager");
    display_supplier_pager_request.success(function(data) {
        var obj = JSON.parse(data);
        $("#suppliers_pagination_ul").html(obj.pager);
        $('#maxPage_input').val(obj.maxpage);
        $("#number_of_pages_span").html(obj.maxpage);
        display_suppliers();
    });
}


function show_pager(pageOnTracked){
    var newPager = "";
    for(var ctr=1; ctr<=7; ctr++){
        newPager += "<li id=page_"+pageOnTracked+"><a href = 'Javascript:void(0)'>"+pageOnTracked+"</a></li>";
        pageOnTracked++;
    }
    $("#suppliers_pagination_ul").html(newPager);
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
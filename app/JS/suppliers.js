$(function() {

    // ============ ON CLICK EVENTS ==========

    $("#new_supplier_button").click(function() {
        $("#add_suppliers_div").slideDown(300);
    })

})

function display_suppliers() {

}

// =========== AJAX REQUEST ==========

function request(url, data, what_request) {
    return $.ajax({
        type: "POST",
        url: url,
        data: data,
        error: function(data) {
            console.log(what_request + " = " + JSON.stringify(data));
        }
    });
}
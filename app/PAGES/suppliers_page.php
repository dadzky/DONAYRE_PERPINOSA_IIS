<!DOCTYPE html>
<html>
    <head>
        <title>Admin | Suppliers</title>
        <link rel = "stylesheet" href = "../CSS/includes_all_css_files.css" />
    </head>
    <body>
        <div id = "suppliers_main_container_div" class = "container">
            <h1>Suppliers</h1>
            <span id = 'show_transaction_span' class = 'label pull-right' title = "Toggle Records" ><img src = "../CSS/images/other_page.png" class = "img-circle"/></span>
            <br />
            <div id = "display_suppliers_div">
                <div id = "suppliers_action_div">
                    <span id = 'current_page_content_span' class = 'label label-info pull-left'>PAGE
                        <span id = 'current_page_span'></span> OUT OF
                        <span id = 'number_of_pages_span'></span>
                    </span> <!-- ========= current_page_content_span ======= -->

                    <div id = 'search_supplier_div' class = "input-append btn-group">
                        <img src = "../CSS/images/search_icon1.png" />
                        <span id = "search_supplier_span"><input type = "text" id = "search_supplier_input" placeholder = "Search Supplier"/></span>
                        <a id = "filter_by_option_a" class = "btn dropdown-toggle">filter by
                            <span class="caret"></span>
                        </a>
                        <ul id = "filter_by_options_ul" class = "dropdown-menu pull-right">
                            <li id = "search_by_company_name_li"><a href = 'Javascript:void(0)'><i class = "icon-file"></i> Company Name</a></li>
                            <li id = "search_by_product_name_li"><a href = 'Javascript:void(0)'><i class = "icon-barcode"></i> Product Name</a></li>
                            <li id = "search_by_supplier_address_li"><a href = 'Javascript:void(0)'><i class = "icon-road"></i> Address</a></li>
                        </ul>
                        <input type = "hidden" id = "hidden_search_supplier_by_input" />
                    </div> <!-- ====== search supplier div ends ========= -->

                    <span id = "item_limit_content" class = "pull-right">
                        <span id = "item_limit_span" class = "label label-info">Item Limit:</span>
                        <input type = "number" id = "item_limit_input" class = "input-mini" />
                    </span>
                    <input type = "hidden" id = "current_page" value = "0" />
                    <input type='hidden' id='maxPage_input' />

                </div><!-- ======== suppliers action div ends ============ -->
                <br/>
                <table id = "suppliers_table" class = "table table-bordered">
                    <thead>
                        <tr>
                            <th>Company Name</th>
                            <th>Supplied Product(s)</th>
                            <th>Address</th>
                            <th>Contact NUmber</th>
                        </tr>
                    </thead>
                    <tbody id = "display_suppliers_tbody"></tbody>
                </table><!-- ======= display suppliers table ends ======== -->
                <div id = "pagination_content_div" class = "pagination pagination-centered">

                    <button class = "btn btn-primary" id = "previous_page_button"><<</button>
                    <ul id = "suppliers_pagination_ul"></ul>
                    <button class = "btn btn-primary" id = "next_page_button">>></button>
                </div><!-- =========== pagination content div ends =============-->
            </div><!-- ======= display suppliers div ends ============ -->
            <div id = "display_admins_transaction_div">
                <table id = "admins_transaction_table" class = "table table-bordered">
                    <thead>
                    <tr>
                        <th rowspan = "2">DATE</th>
                        <th colspan = "3">PURCHASE INFO</th>
                    </tr>
                    <tr>
                        <th>Purchased Product</th>
                        <th>Items Bought</th>
                        <th>Supplier</th>
                    </tr>
                    </thead>
                    <tbody id = "display_admins_transaction_table"></tbody>
                </table><!-- ======= admins transaction table ends ===== -->
            </div><!-- ====== display admins transaction div ends ======= -->
        </div><!-- main container div ends -->
        <script src = "../JS/jquery-1.9.1.min.js"></script>
        <script src = "../JS/jquery-ui-1.10.2.min.js"></script>
        <script src = "../JS/bootstrap.min.js"></script>
        <script src = "../JS/suppliers.js"></script>
    </body>
</html>
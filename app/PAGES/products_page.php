<!Doctype html>
<html xmlns="http://www.w3.org/1999/html">
    <head>
        <title>Products</title>
        <link rel = "shortcut icon" href = "../CSS/images/IIS%20logos/iis0.jpg" />
        <link rel = "stylesheet" href = "../CSS/includes_all_css_files.css" />
    </head>
    <body>
        <div id = "products_main_div_container" class = "container">

            <div id = "display_products_div" class = "control-group">
                <h2>PRODUCTS</h2>
                <div id = "product_actions">
                    <span class = 'add-on'><img src = "../CSS/images/search_icon1.png"></span>
                    <input type = "text" id = "search_product_input_field" class = 'search-query' placeholder = "Search product here" />
                    <select id = "display_product_selected_letter" class = "span1"><option>all</option></select>
                </div><!-- ========  Product actions div ends ======== -->
                <table id = "display_products_table" class = "table table-hover">
                    <thead>
                        <tr>
                            <th>NAME</th>
                            <th>BAR CODE</th>
                            <th>PRICE</th>
                            <th>STOCKS</th>
                            <th>UNIT</th>
                            <th class = 'product_delete_action'>
                                <img src = '../CSS/images/trash_can.gif' id = 'delete_trash_icon' onclick = 'delete_products()' />
                                <ul>
                                    <li id = 'mark_all_delete_action'>Mark All</li>
                                    <li id = 'unmark_all_delete_action'>UnMark All</li>
                                </ul>
                            </th>
                        </tr>
                    </thead>
                    <tbody id = "display_products_table_tbody" ></tbody>
                </table>
            </div><!-- ======= display products div ends ======= -->
            <div id = "add_product_div">
                <h4>Add Product here:</h4>
                <form id = "add_product_form">
                    <input type = "hidden" id = "id" name = "id">
                    <dl>
                    <dt>Product Name:</dt>
                        <dd id = 'product_name_dd'><input type = "text" name = "product_name" id = "product_name" /></dd>
                    <dt>Product's Bar Code:</dt>
                        <dd id = "bar_code_dd"><input type = "text" name = "bar_code" id = "bar_code" /></dd>
                    <dt>Product Price:</dt>
                        <dd id = 'product_price_dd'>&#8369;<input type = "text" name = "product_price" id = "product_price" /></dd>
                    <dt>Number of Stock(s):</dt>
                        <dd id = 'number_of_stocks_dd'><input type = "text" name = "number_of_stocks" id = "number_of_stocks" /></dd>
                    <dt>Stock Unit:</dt>
                        <dd id = "stock_unit_dd"><select name = "stock_unit" id = "stock_unit">
                                <option>piece</option>
                                <option>pack</option>
                                <option>kg</option>
                                <option>g</option>
                                <option>lbs</option>
                                <option>others</option>
                            </select></dd>
                    </dl>
                    <input type = "reset" value = "reset" class = "btn btn-danger" />
                </form>
                <button id = "add_product_button" class = "btn btn-primary">ADD</button>


            </div><!-- ======= add products div ends ======== -->
        </div>

        <!-- ================ HIDDEN FOR DIALOGS ================== -->
        <div id = "delete_product_confirmation_div">
            Sure to delete the selected product(s)?
        </div><!-- ================= delete product confirmation div ends ==================-->
        <div id = "add_product_confirmation_div">
            The product you've entered was already on the list.<br />
            Update it's number of stocks instead?
        </div><!-- ======== ADD confirmation div ends! ======= -->
        <!-- ============ IMPORTS ===============-->
        <script src = "../JS/jquery-1.9.1.min.js"></script>
        <script src = "../JS/jquery-ui-1.10.2.min.js"></script>
        <script src = "../JS/products.js"></script>
    </body>
</html>
<!Doctype html>
<html xmlns="http://www.w3.org/1999/html">
    <head>
        <link rel = "stylesheet" href = "../CSS/includes_all_css_files.css" />
    </head>
    <body>
        <div id = "products_main_div_container" class = "container">

            <div id = "display_products_div" class = "control-group">
                <h2>PRODUCTS</h2>
                <div id = "product_actions">
                    <input type = "text" class = 'search-query' />
                    <select id = "display_product_selected_letter" class = "span1"></select>
                </div><!-- ========  Product actions div ends ======== -->
                <table id = "display_products_table" class = "table table-hover">
                </table>
                <div class = "pagination"></div>
            </div><!-- ======= display products div ends ======= -->
            <div id = "add_product_div">
                <h4>Add Product here:</h4>
                <form id = "add_product_form">
                    <dl>
                    <dt>Product Name:</dt>
                        <dd id = 'product_name_dd'><input type = "text" name = "product_name" id = "product_id" /></dd>
                    <dt>Product Price:</dt>
                        <dd id = 'product_price_dd'>&#8369;<input type = "text" name = "product_price" id = "product_price" /></dd>
                    <dt>Number of Stock(s):</dt>
                        <dd id = 'number_of_stocks_dd'><input type = "text" name = "number_of_stocks" id = "number_of_stocks" /></dd>
                    <dt>Stock Unit:</dt>
                        <dd><select name = "stock_unit" id = "stock_unit">
                                <option>pieces</option>
                                <option>packs</option>
                                <option>klg</option>
                                <option>g</option>
                                <option>lbs</option>
                                <option>others</option>
                            </select></dd>
                    </dl>
                </form>
                <button id = "add_product_button" class = "btn btn-primary">ADD</button>


            </div><!-- ======= add products div ends ======== -->
        </div>

        <!-- ================ FOR DIALOGS ================== -->
        <div id = "delete_product_confirmation_div">
            Sure to delete this product?
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
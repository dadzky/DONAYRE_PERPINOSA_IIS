<!Doctype html>
<html xmlns="http://www.w3.org/1999/html">
    <head>
    </head>
    <body>
        <div id = "products_main_div_container">
            <?php include_once "page_header.html"; ?>

            <div id = "display_products_div">
                <h2>PRODUCTS</h2>
                <table id = "display_products_table" class = "table table-striped table-bordered table-condensed">
                </table>
            </div><!-- ======= display products div ends ======= -->
            <div id = "add_product_div">
                <form id = "add_product_form">
                    <dt>Product Name:<dt>
                        <dd><input type = "text" name = "product_name" id = "product_id" /></dd>
                    <dt>Product Price:</dt>
                        <dd>&#8369;<input type = "text" name = "product_price" id = "product_price" /></dd>
                    <dt>Number of Stock(s):</dt>
                        <dd><input type = "text" name = "number_of_stocks" id = "number_of_stocks" /></dd>
                    <dt>Stock Unit:</dt>
                        <dd><select name = "stock_unit" id = "stock_unit">
                                <option>pieces</option>
                                <option>packs</option>
                                <option>klg</option>
                                <option>g</option>
                                <option>lbs</option>
                            </select></dd>
                </form>
                <button id = "add_product_button">ADD</button>
            </div><!-- ======= add products div ends ======== -->

            <?php include_once "page_footer.html"; ?>
        </div>

        <!-- ============ IMPORTS ===============-->
        <link rel = "stylesheet" href = "../CSS/includes_all_css_files.css" />
        <script src = "../JS/jquery-1.9.1.min.js"></script>
        <script src = "../JS/jquery-ui-1.9.0.custom.min.js"></script>
        <script src = "../JS/products.js"></script>
    </body>
</html>
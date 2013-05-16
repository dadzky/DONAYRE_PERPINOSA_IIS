<!DOCTYPE html>
<html>
    <head>
        <title>Admin | Suppliers</title>
        <link rel = "stylesheet" href = "../CSS/includes_all_css_files.css" />
    </head>
    <body>
        <div id = "suppliers_main_container_div" class = "container">
            <h1>Suppliers</h1>
            <button class = "btn btn-block" id = "new_supplier_button">NEW SUPPLIER</button>
            <div id = "display_suppliers_div">
                <table id = "suppliers_table" class = "table table-bordered">
                    <thead>
                        <tr>
                            <th>Company Name</th>
                            <th>Supplied Product</th>
                            <th>Address</th>
                            <th>Contact</th>
                        </tr>
                    </thead>
                    <tbody id = "display_suppliers_tbody"></tbody>
                </table>
            </div><!-- ======= display suppliers div ends ============ -->


            <h4>Under Construction</h4>
        </div><!-- main container div ends -->
        <script src = "../JS/jquery-1.9.1.min.js"></script>
        <script src = "../JS/jquery-ui-1.10.2.min.js"></script>
        <script src = "../JS/suppliers.js"></script>
    </body>
</html>
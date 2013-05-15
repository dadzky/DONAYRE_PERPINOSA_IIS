<?php
    session_start();
    if(!isset($_SESSION['log_in_as']) && $_SESSION['log_in_as'] != "cashier"):
        header('Location: login.php');
    endif;
?>
<!Doctype HTML>
<html>
    <head>
        <title>Transaction</title>
        <link rel = "stylesheet" href = "../CSS/jquery-ui.min.css" />
        <link rel = "stylesheet" href = "../CSS/bootstrap.min.css" />
        <link rel = "stylesheet" href = "../CSS/transaction_page.css" />

    </head>
    <body>

        <div id='header_div'>
            <div id = "system_name_div">
                <h2>
                    <span>I</span>-
                    <span>I</span>NVENTORY
                    <span>S</span>YSTEM
                </h2>
            </div>
            <span class = 'logout_span label label-important' >[<a id ='logout_a' href = 'logout.php'>LOG OUT</a>]</span>
        </div>
        <div id = "transaction_wrapper_div">
            <p id='cashier_p' class='label label-info'>Cashier:</p> <span id='cashier_info_span' class='text text-info'> Sample Sample</span>
            <span id='date_span'>
                <p class='label label-info'>Date And Time:</p> <span class='text text-info text-right'></span>
            </span>
            <br/> <br/> <br/> 
            <div id='product_to_transact_div' class="input-prepend">         
                <span class="add-on">BarCode :</span>
                <input type='text' id='product_code' class='input-large' />      
                <span class="add-on">Quantity :</span>
                <input type='text' id='product_quantity'  class='input-large'/>
            </div>
            <br/>
            <button id='product_displayer_btn' class='btn btn-large'>GO</button>
                       
            <table id='shopping_list_table' class='table table-striped table-hover table-bordered'>
                <thead>
                     <tr>
                        <th></th>
                        <th></th>
                        <th>Product Name</th>
                        <th>Product Cost</th>
                        <th>Quantity</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>
                <tbody id='shopping_list_tbody'><tr><th rowspan='1000'>Product List</th></tr></tbody>
                <tfoot id='shopping_list_total_tfoot'></tfoot>

            </table>
                            
        </div> <!-- ======= transaction_wrapper_div ======= -->

        <!-- ========= IMPORTS =======-->
        <script src = "../JS/jquery-1.9.1.min.js"></script>
        <script src = "../JS/jquery-ui-1.10.2.min.js"></script>
        <script src = "../JS/transaction_functionality.js"></script>

    </body>
</html>
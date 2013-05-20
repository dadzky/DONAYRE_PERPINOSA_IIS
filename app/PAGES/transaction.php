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

<<<<<<< HEAD
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
                <p class='label label-info'>Date | Time:</p> <span class='text text-info text-right'></span>
            </span>
    <hr/><hr/>

    <div id='alert_productExist_div' class='alert alert-error alerts_div'>
        <p id='alert_error_msg_p'></p>
    </div>

    <div id='default_alert_div' class='alert alert-info alerts_div'>
        <h3 class='text-center'>welcome</h3>
    </div>

    <div id='success_alert_div' class='alert alert-success alerts_div'>
        <h3 class='text-center'>Product Added</h3>
    </div>

    <br/> <br/> <br/>
    <div id='product_to_transact_div'>
        <form id='product_to_transact_form' class='form-horizontal'>
            <input type='text' id='product_code' class='input-xxlarge' placeholder='Bar Code' require/><br/>
            <input type='text' id='product_quantity'  class='input-xxlarge' placeholder='Quantity' require/><br/>
            <input type='submit' id='product_displayer_btn' class='btn btn-primary btn-block btn-large' value='GO'>
        </form>
    </div>
    <div id='payment_div'>
        <table class='table'>
            <thead>
            <tr>
                <th>&#8369; Total Cost</th>
                <th>&#8369; Cash</th>
                <th>&#8369; Change</th>
            </tr>
            </thead>
            <tbody id = 'payment_tbody'>
            <tr>
                <th>&#8369; 00.00</th>
                <th><input id = 'cash_in_hand_input' type='text' class='input-mini' readonly/></th>
                <th>&#8369; 00.00</th>
            </tr>
            </tbody>
            <tfoot><tr><td colspan='3'><button id='payment_btn' type='button' class='btn btn-success btn-block' disabled>bayad</button></td></tr></tfoot>
        </table>
    </div><!--payment_div-->
    <hr/>
    <br/>

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
    <div id='dialog_div'>
        Product Name: <br/>
        <input type='text' id='product_name_to_transact' readonly='readonly' /><br/>
        Product Cost: <br/>
        <input type='text' id='product_cost_to_transact' readonly='readonly' /> <br/>
        <div id='quantity_div' class="input-prepend">
            <label class='control-label' for='product_quantity' > Product Quantity:</label> <br/>
            <span class="add-on"></span>
            <input type='text' id='product_quantity' />
        </div>
    </div>
    <div id='dialog2_div'></div>
</div> <!-- ======= transaction_wrapper_div ======= -->
<div id='dialog_div'></div>
=======
        <div id='header_div'>
            <div id = "system_name_div">
                <h2>
                    <img src='../CSS/images/systemName.png' alt='Inventory System' />
                </h2>
            </div>
            <span class = 'logout_span label label-important' >[<a id ='logout_a' href = 'logout.php'>LOG OUT</a>]  <i class='icon-circle-arrow-right'></i></span>
        </div>
        <div id = "transaction_wrapper_div">
            <p id='cashier_p' class='label label-info'><i class='icon-user'></i> Cashier:</p> <span id='cashier_info_span' class='text text-info'> <?php  echo ucwords($_SESSION['employee_name']) ?></span>
            <span id='date_span'>
                <p class='label label-info'><i class='icon-calendar'></i> Date | <i class='icon-time'></i> Time:</p> <span class='text text-info text-right'></span>
            </span>
            <hr/><hr/>

            <div id='alert_productExist_div' class='alert alert-error alerts_div'>
                <p id='alert_error_msg_p'></p>
            </div>

            <div id='default_alert_div' class='alert alert-info alerts_div'>
                <h3 class='text-center'>welcome</h3>
            </div>

            <div id='success_alert_div' class='alert alert-success alerts_div'>
                <h3 class='text-center'>Product Added</h3>
            </div>

            <br/> <br/> <br/> 
            <div id='product_to_transact_div'> 
                <form id='product_to_transact_form' class='form-horizontal'>
                    <input type='text' id='product_code' class='input-xxlarge' placeholder='Bar Code' require/><br/>
                    <input type='text' id='product_quantity'  class='input-xxlarge' placeholder='Quantity' require/><br/>
                    <input type='submit' id='product_displayer_btn' class='btn btn-primary btn-block btn-large' value='GO'>
                </form>
            </div>
            <div id='payment_div'>
                <table class='table'>
                    <thead>
                        <tr>
                            <th>&#8369; Total Cost</th>
                            <th>&#8369; Cash</th>
                            <th>&#8369; Change</th>
                        </tr>      
                    </thead>
                    <tbody id = 'payment_tbody'>
                        <tr>
                            <th>&#8369; 00.00</th>
                            <th><input id = 'cash_in_hand_input' type='text' class='input-mini' value='00.00' disabled/></th>
                            <th>&#8369; 00.00</th>
                        </tr>       
                    </tbody>
                    <tfoot><tr><td colspan='3'><button id='payment_btn' type='button' class='btn btn-success btn-block' disabled>bayad</button></td></tr></tfoot>
                </table>
            </div><!--payment_div-->
            <hr/>
            <br/>

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
                <tbody id='shopping_list_tbody'><tr><th rowspan='1000'><i class='icon-th-list'></i> Product List</th></tr></tbody>
                <tfoot id='shopping_list_total_tfoot'></tfoot>

            </table>
            <div id='dialog_div'>
                Product Name: <br/>
                <input type='text' id='product_name_to_transact' readonly='readonly' /><br/>
                Product Cost: <br/>
                <input type='text' id='product_cost_to_transact' readonly='readonly' /> <br/>             
                <div id='quantity_div' class="input-prepend">     
                 <label class='control-label' for='product_quantity' > Product Quantity:</label> <br/>              
                    <span class="add-on"></span>
                    <input type='text' id='product_quantity' />
                </div>
            </div>
            <div id='dialog2_div'></div>
            <div id='overlay_div'><h3>Loading....<img src='../CSS/img_tbls/loading.gif' alt='loading.....' /></h3></div>
        </div> <!-- ======= transaction_wrapper_div ======= -->
        <div id='dialog_div'></div>
>>>>>>> 2bf14b914ae86deab4be2d17f7272fa1ce1e770e

<!-- ========= IMPORTS =======-->
<script src = "../JS/jquery-1.9.1.min.js"></script>
<script src = "../JS/jquery-ui-1.10.2.min.js"></script>
<script src = "../JS/transaction_functionality.js"></script>

</body>
</html>
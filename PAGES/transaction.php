<!Doctype html>
<html>
    <head>
        <title>Transactions</title>
        <link rel = "stylesheet" href = "../CSS/jquery-ui.min.css" />
        <link rel = "stylesheet" href = "../CSS/bootstrap.min.css" />
        <link rel = "stylesheet" href = "../CSS/transaction_page.css" />

    </head>
    <body>
 
        <div id = "transaction_wrapper_div">

            <table class='table table-striped table-hover table-bordered'>
                <thead>
                    <tr >
                        <th colspan='3'>
                            <input type='text' id='search_item' class='input-large search-query' placeholder='Search for an item'/>
                        </th>
                     </tr>
                     <tr>                    
                        <th>Product Name</th>
                        <th>Product Cost</th>
                        <th>Product Unit</th>
                    </tr>
                </thead>
                <tbody id='products_to_transact_tbody'>
                </tbody>                
            </table>
            <div class='pagination'></div><!-- ========= pagination ============= -->            
            <input type='hidden' id='currentPage' value='0'/> 

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
                <tbody id='shopping_list_tbody'><tr><th rowspan='1000'>Shopping List</th></tr></tbody>                         
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

        <!-- ========= IMPORTS =======-->
        <script src = "../JS/jquery-1.9.1.min.js"></script>
        <script src = "../JS/jquery-ui-1.10.2.min.js"></script>
        <script src = "../JS/transaction_functionality.js"></script>

    </body>
</html>
<!Doctype html>
<html>
    <head>
        <title>Transactions</title>

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
                        <th>Product Name</th>
                        <th>Product Cost</th>
                        <th>Quantity</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>
                <tbody id='shopping_list_tbody'><tr><th rowspan='1000'>Shopping List</th></tr></tbody>                         
                <tfoot id='shopping_list_total_tfoot'></tfoot>
                

            </table>               
           
        </div> <!-- ======= transaction_wrapper_div ======= -->


        <!-- ========= IMPORTS =======-->
        <script src = "../JS/jquery-1.9.1.min.js"></script>
        <script src = "../JS/jquery-ui-1.9.0.custom.min.js"></script>
        <script src = "../JS/transaction_functionality.js"></script>
        <link rel = "stylesheet" href = "../CSS/jquery-ui.min.css" />
        <link rel = "stylesheet" href = "../CSS/bootstrap.min.css" />
        <link rel = "stylesheet" href = "../CSS/transaction_page.css" />
    </body>
</html>
<?php

    include "../../CLASSES/Products_functions_home.php";
    $execute_update = new Products_functions_home();

    $product_name = $_POST['product_name'];
    $product_price = $_POST['product_price'];
    $product_stock_info = $_POST['product_stock_info'];
    $id = $_POST['id'];

    $execute_update->edit_products_data($id, $product_name, $product_price, $product_stock_info);
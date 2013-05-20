<?php

    include "../../CLASSES/Products_functions_home.php";
    $execute_add = new Products_functions_home();

    $update = $_POST["update"];
    $products_data = $_POST["products_data"];
    $decoded_products_data = json_decode($products_data, true);

    foreach($decoded_products_data as $content) {
        $$content['name'] = $content['value'];
    }


    $execute_add->add_product($product_name, $bar_code, $product_price, $number_of_stocks, $stock_unit, $update, $product_supplier);


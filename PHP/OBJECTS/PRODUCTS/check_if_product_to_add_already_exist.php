<?php
    include "../../CLASSES/Products_functions_home.php";
    $execute_check = new Products_functions_home();

    $products_data = $_POST['products_data'];
    $decoded_data = json_decode($products_data, true);

    foreach($decoded_data as $content) {
        $$content['name'] = $content['value'];
    }
    $execute_check->check_if_product_to_add_already_exist($product_name);
<?php
    include "../../CLASSES/Products_functions_home.php";
    $execute_check = new Products_functions_home();
    $execute_check->check_if_product_to_add_already_exist($_POST['product_name'], $_POST['product_id']);
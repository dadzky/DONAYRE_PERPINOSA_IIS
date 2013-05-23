<?php
    include "../../CLASSES/Products_functions_home.php";
    $execute_search = new Products_functions_home();

    $product_name_to_search = $_POST["product_name_to_search"];
    $product_name_to_search = $product_name_to_search."%";
    $product_genre_to_display = $_POST["product_genre_to_display"];
    $execute_search->search_product($product_name_to_search, $product_genre_to_display);
<?php

    include "../../CLASSES/Products_functions_home.php";
    $execute_display = new Products_functions_home();

    $product_genre_to_display = $_POST["product_genre_to_display"];
    $currentPage = $_POST['currentPage'];
    $pageLimit = $_POST['pageLimit'];

    $execute_display->display_products($product_genre_to_display, $currentPage, $pageLimit);
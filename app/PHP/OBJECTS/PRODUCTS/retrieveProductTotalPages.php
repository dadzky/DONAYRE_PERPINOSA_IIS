<?php
    include "../../CLASSES/Products_functions_home.php";

    $productName = $_POST['productName'].'%';
    $productGenre = $_POST['productGenre'];

    $action = new Products_functions_home();
    $totalPages = $action -> getProductTotalPages($productName, $productGenre);

    echo $totalPages;
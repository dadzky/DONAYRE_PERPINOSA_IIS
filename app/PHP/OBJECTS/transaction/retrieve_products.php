<?php
    include "../../CLASSES/iis_functions_sales.php";
    $execute_retrieve = new Iis_functions_sales();

    $inputted_product = $_POST["inputted_product"]."%";
    $execute_retrieve->retrieve_products($inputted_product);
<?php
    //$employeeID = $_SESSION['id'] -> employee id

    include_once '../../CLASSES/iis_functions_sales.php';

    $employeeID = 1;
    $productIDs = $_POST['productIDs'];
    $quantities = $_POST['quantities'];

    $action = new Iis_functions_sales();
    $action -> saveTransaction($employeeID, $productIDs, $quantities);
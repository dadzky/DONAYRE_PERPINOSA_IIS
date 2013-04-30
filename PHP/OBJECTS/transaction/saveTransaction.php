<?php
    //$employeeID = $_SESSION['id'] -> employee id

    include_once '../../CLASSES/iis_functions_sales.php';

    $employeeID = 1; //must be replace by a session (employee id)
    $productIDs = $_POST['productIDs']; //array of product id
    $quantities = $_POST['quantities'];	//array of quantity

    $action = new Iis_functions_sales();
    $action -> saveTransaction($employeeID, $productIDs, $quantities);
<?php
    session_start();

    include_once '../../CLASSES/iis_functions_sales.php';

    $employeeID = $_SESSION['employee_id'];
    $productIDs = $_POST['productIDs']; //array of product id
    $quantities = $_POST['quantities'];	//array of quantity
    $action = new Iis_functions_sales();
    $action -> saveTransaction($employeeID, $productIDs, $quantities);
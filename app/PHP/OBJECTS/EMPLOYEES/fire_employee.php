<?php
    include "../../CLASSES/Employees_functions_home.php";
    $execute_insert = new Employees_functions_home();

    $id = $_POST["id"];
    $date = $_POST["date"];
    $remarks = $_POST["remarks"];

    $execute_insert->fire_employee($id, $date, $remarks);
<?php
    include "../../CLASSES/Employees_functions_home.php";
    $execute_check = new Employees_functions_home();

    $lastname = $_POST["lastname"];
    $firstname = $_POST["firstname"];
    $username = $_POST["username"];
    $execute_check->check_if_employee_or_username_exist($lastname, $firstname, $username);
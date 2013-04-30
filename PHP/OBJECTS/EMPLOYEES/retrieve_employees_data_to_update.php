<?php
    include "../../CLASSES/Employees_functions_home.php";
    $execute_retrieve = new Employees_functions_home();
    $id = $_POST["id"];

    $execute_retrieve->retrieve_employees_data_to_update($id);
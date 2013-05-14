<?php
    include "../../CLASSES/Employees_functions_home.php";
    $execute_search = new Employees_functions_home();

    $name_to_search = $_POST["name_to_search"];
    $job_type = $_POST["job_type"];
    $name_to_search = $name_to_search."%";

    $execute_search->search_employee($name_to_search, $job_type);
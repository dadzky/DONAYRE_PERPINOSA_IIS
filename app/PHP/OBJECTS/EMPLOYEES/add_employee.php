<?php
    include "../../CLASSES/Employees_functions_home.php";
    $execute_add = new Employees_functions_home();

    $employees_data = $_POST["employees_data"];
    $decoded_employees_data = json_decode($employees_data, true);

    foreach($decoded_employees_data as $content) {
        $$content['name'] = $content['value'];
    }

    $birthday = $birthday_year."-".$birthday_month."-".$birthday_date;

    $execute_add->add_employee($lastname, $firstname, $gender, $birthday, $address, $contact_number, $job_type, $username, $password);
<?php
    include "../../CLASSES/Employees_functions_home.php";
    $execute_update = new Employees_functions_home();

    $id = $_POST["id"];
    $employees_data = $_POST["employees_data"];
    $decoded_employees_data = json_decode($employees_data, true);

    foreach($decoded_employees_data as $content) {
        $$content['name'] = $content['value'];
    }

    $birthdate = $birthday_year."-".$birthday_month."-".$birthday_date;

    $execute_update->update_employees_data($id, $lastname, $firstname, $gender, $birthdate, $address, $contact_number, $job_type, $username, $password);
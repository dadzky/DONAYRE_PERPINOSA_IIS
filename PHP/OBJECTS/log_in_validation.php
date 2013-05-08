<?php
    session_start();
    include "../CLASSES/iis_functions_home.php";

    $execute_check = new Iis_functions_home();

    $log_in_data = $_POST["log_in_data"];
    $decoded_data = json_decode($log_in_data, true);

    foreach($decoded_data as $content) {
        $$content['name'] = $content['value'];
    }
    $username_exist = $execute_check->check_username($username_entered, $log_in_as);

    if($username_exist) {
        $password_valid = $execute_check->check_password($username_entered, $password_entered, $log_in_as);
        if($password_valid) {
            $_SESSION['log_in_as'] = $log_in_as;
            $_SESSION['username'] = $username_entered;
            $_SESSION['employee_id'] = $execute_check->get_cashiers_data($username_entered);
        } else {
            echo "Invalid password!";
        }
    } else {
        echo "Unknown user's name!";
    }
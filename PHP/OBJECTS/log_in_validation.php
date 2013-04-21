<?php
    session_start();

    include_once "../CLASSES/iis_data_functionso_hme.php";
    $execute_check = new Iis_functions_home();

    if(isset($_POST["username_entered"]) && isset($_POST["password_entered"])) {
        $username_entered = $_POST["username_entered"];
        $password_entered = $_POST["password_entered"];

        $username_exist = $execute_check->check_username($username_entered);
        if($username_exist) {
            $same_password = $execute_check->check_password($username_entered, $password_entered);
            if($same_password) {
                $_SESSION['username_entered'] = $username_entered;
                $_SESSION['password_entered'] = $password_entered;
                $cashiers_fullname = $execute_check->get_cashiers_fullname($_SESSION['username_entered']);
                $_SESSION['cashiers_fullname'] = $cashiers_fullname;
            } else {
                $error_message = "Incorrect password!";
            }
        } else {
            $error_message = "Unknown username!";
        }
    }
<?php
    session_start();

    include_once "../CLASSES/iis_data_functionso_hme.php";
    $execute_check = new Iis_functions_home();

    if(isset($_POST["username_entered"]) && isset($_POST["password_entered"])) {
        $username_entered = $_POST["username_entered"];
        $password_entered = $_POST["password_entered"];

        $user_exist = $execute_check->check_user($username_entered, $password_entered);
        if($user_exist) {

        }
    }
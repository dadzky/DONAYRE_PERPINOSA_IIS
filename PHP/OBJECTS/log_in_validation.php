<?php
    session_start();
    include "../CLASSES/iis_functions_home.php";

    $execute_check = new Iis_functions_home();

    if(isset($_POST["log_in_as_input"]) && isset($_POST["username_entered"]) && isset($_POST["password_entered"])) {
        $username_entered = $_POST["username_entered"];
        $password_entered = $_POST["password_entered"];
        $log_in_as = $_POST["log_in_as_input"];

        $username_exist = $execute_check->check_username($username_entered, $log_in_as);
        if($username_exist) {
            $same_password = $execute_check->check_password($username_entered, $password_entered, $log_in_as);
            if($same_password) {
                if($log_in_as == "cashier") {
                    $_SESSION['username_entered'] = $username_entered;
                    $_SESSION['password_entered'] = $password_entered;
                    // =========== STORING CASHIERS DATA INTO SESSION VARIABLE ========
                    $cashiers_data = $execute_check->get_cashiers_data($_SESSION['username_entered']);

                    /*foreach($cashiers_data as $data) {
                        if($data['name'] == "cashier_fullname") {
                            $_SESSION['cashiers_fullname'] = $data['value'];
                        }
                        if($data['name'] == "cashier_id") {
                            $_SESSION['cashiers_id'] = $data['value'];
                        }
                    }
                    */
                    echo "wew".$cashiers_data;
                    //header("Location: ../../PAGES/transaction.php");
                }
                if($log_in_as == "administrator") {
                    $_SESSION['username_entered'] = $username_entered;
                    $_SESSION['password_entered'] = $password_entered;

                    header("Location: ../../PAGES/admins.php");
                }

            } else {
                $error_message = "Incorrect password!";
            }
        } else {
            $error_message = "Unknown username!";
        }
    }
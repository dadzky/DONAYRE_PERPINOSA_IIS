<?php
    include "../../CLASSES/Products_functions_home.php";
    $execute_check = new Products_functions_home();

    $bar_code = $_POST["bar_code"];
    $execute_check->check_bar_code($bar_code);
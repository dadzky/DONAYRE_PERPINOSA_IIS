<?php
    include "../../CLASSES/Suppliers_functions_home.php";
    $execute_display = new Suppliers_functions_home();

    $current_page = $_POST["current_page"];
    $item_limit = $_POST["item_limit"];
    $execute_display->display_suppliers($current_page, $item_limit);

<?php
    include "../../CLASSES/Suppliers_functions_home.php";
    $execute_display = new Suppliers_functions_home();
    $item_limit = $_POST["item_limit"];
    $execute_display->display_supplier_pager($item_limit);
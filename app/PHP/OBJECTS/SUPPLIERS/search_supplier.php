<?php
    include "../../CLASSES/Suppliers_functions_home.php";
    $execute_search = new Suppliers_functions_home();

    $field_name = $_POST["field_name"];
    $search_input_value = $_POST["search_input_value"]."%";
    $current_page = $_POST["current_page"];
    $item_limit = $_POST["item_limit"];

    $execute_search->search_supplier($field_name, $search_input_value, $current_page, $item_limit);
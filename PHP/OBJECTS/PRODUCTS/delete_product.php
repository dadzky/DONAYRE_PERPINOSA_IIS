<?php

    include "../../CLASSES/Products_functions_home.php";
    $execute_delete = new Products_functions_home();

    $id = $_POST['id'];
    $execute_delete->delete_product($id);
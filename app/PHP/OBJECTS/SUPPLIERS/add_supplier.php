<?php
    include "../../CLASSES/Suppliers_functions_home.php";
    $execute_add = new Suppliers_functions_home();

    $suppliers_data = $_POST["suppliers_data"];
    $decoded_suppliers_data = json_decode($suppliers_data, true);

    foreach($decoded_suppliers_data as $content) {
        $$content['name'] = $content['value'];
    }

    $execute_add->add_supplier($company_name, $supplier_address, $supplier_contact_number);
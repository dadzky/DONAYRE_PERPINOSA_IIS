<?php

    include "Database_connection.php";

    class Suppliers_functions_home extends Database_connection{
<<<<<<< HEAD
        function add_supplier() {}
=======

        function retrieve_all_suppliers() {
            $this->open_connection();

            $select_statement = $this->db_holder->query("SELECT DISTINCT company_name FROM suppliers ORDER BY company_name;");

            while($content = $select_statement->fetch()) {
                echo "<option>".$content[0]."</option>";
            }
            echo "<option>new supplier</option>";
            $this->close_connection();
        }

        function add_supplier($company_name, $address, $contact_number) {
            $this->open_connection();

            $insert_statement = $this->db_holder->prepare("INSERT INTO suppliers VALUES (null, ?, ?, ?)");
            $insert_statement->execute(array($company_name, $address, $contact_number));

            echo $company_name;

            $this->close_connection();
        }
>>>>>>> 1f7798dc8bb854ba71c238c04fc487adfe808159
    }
<?php
    session_start();

    include_once "database_connection.php";

    class Iis_data extends Database_connection {

        function check_user() {
            $this->open_connection();

            $select_statement = $this->db_holder->prepare("SELECT * FROM employees WHERE   ");

            $this->close_connection();
        }

    }
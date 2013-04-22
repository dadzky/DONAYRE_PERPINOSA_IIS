<?php

    include_once "database_connection.php";
    class Products extends Database_connection {

        function add_product() {
            $this->open_connection();

            $this->close_connection();
        }

    }
<?php
    class Database_connection {

        protected $db_holder;

        protected function open_connection() {
            $this->db_holder = new PDO("mysql:host = localhost;dbname = IIS_DB", "root", "");
        }

        protected function close_connection() {
            $this->db_holder = null;
        }

    }
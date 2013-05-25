<?php
    class Database_connection {

		private $db_host =  "mysql:host=192.168.0.117;";
		private $db_name = "dbname=IIS_DB";
		private $db_user = "student2";
		private $db_pass = "password";
        protected $db_holder;

        protected function open_connection() {
            $this->db_holder = new PDO($this->db_host.$this->db_name, $this->db_user, $this->db_pass);
        }

        protected function close_connection() {
            $this->db_holder = null;
        }

    }
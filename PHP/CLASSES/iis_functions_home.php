<?php
    session_start();

    include_once "database_connection.php";


    class Iis_functions_home extends Database_connection {

        function check_user($username_entered, $password_entered) {
            $this->open_connection();

            $select_statement = $this->db_holder->prepare("SELECT *
                                                             FROM employees AS e,
                                                                  accounts AS a
                                                             WHERE e.employee_id = a.employee_id AND
                                                                   a.username = ? AND
                                                                   a.password = ?;");
            $select_statement->execute(array($username_entered, $password_entered));

            if($select_statement->fetch()) {
                return true;
            }

            $this->close_connection();
        }

    }
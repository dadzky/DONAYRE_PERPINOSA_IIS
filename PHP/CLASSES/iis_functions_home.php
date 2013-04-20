<?php
    session_start();

    include_once "database_connection.php";


    class Iis_functions_home extends Database_connection {

        function check_username($username_entered) {
            $this->open_connection();

            $select_statement = $this->db_holder->prepare("SELECT *
                                                             FROM employees AS e,
                                                                  accounts AS a
                                                             WHERE e.employee_id = a.employee_id AND
                                                                   a.username = ?;");
            $select_statement->execute(array($username_entered));

            if($select_statement->fetch()) {
                return true;
            }

            $this->close_connection();
        }

        function check_password($username_entered, $password_entered) {
            $this->open_connection();

            $select_statement = $this->db_holder->prepare("SELECT *
                                                             FROM accounts
                                                             WHERE username = ? AND
                                                                   password = ?;");
            $select_statement->execute(array($username_entered, $password_entered));

            if($select_statement->fetch()) {
                return true;
            }

            $this->close_connection();
        }

        function get_cashiers_fullname($username_entered) {
            $this->open_connection();

            $select_statement = $this->db_holder->prepare("SELECT CONCAT(e.lastname, ', ',
                                                                         e.firstname)
                                                            FROM employees AS e,
                                                                 accounts AS a
                                                           WHERE e.employee_id = a.employee_id AND
                                                                 a.username = ?;");
            $select_statement->execute(array($username_entered));
            $cashiers_fullname = $select_statement->fetch();
            return $cashiers_fullname[0];

            $this->close_connection();
        }

    }
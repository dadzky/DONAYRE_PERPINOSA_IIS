<?php

    include "database_connection.php";


    class Iis_functions_home extends Database_connection {

        function check_username($username_entered, $log_in_as) {
            $this->open_connection();
            if($log_in_as == "cashier") {
                $select_statement = $this->db_holder->prepare("SELECT *
                                                                 FROM employees AS e,
                                                                      accounts AS a
                                                                 WHERE e.employee_id = a.employee_id AND
                                                                       e.employee_id NOT IN(SELECT employee_id FROM fired_employees) AND
                                                                       a.username = ?;");
                $select_statement->execute(array($username_entered));
                if($select_statement->fetch()) {
                    return true;
                }
            } else {
                $select_statement = $this->db_holder->prepare("SELECT * FROM administrator WHERE username = ?;");
                $select_statement->execute(array($username_entered));
                if($select_statement->fetch()) {
                    return true;
                }
            }
            $this->close_connection();
        }

        function check_password($username_entered, $password_entered, $log_in_as) {
            $this->open_connection();
            if($log_in_as == "cashier") {
                $select_statement = $this->db_holder->prepare("SELECT *
                                                                 FROM accounts
                                                                 WHERE username = ? AND
                                                                       password = ?;");
                $select_statement->execute(array($username_entered, $password_entered));

                if($select_statement->fetch()) {
                    return true;
                }
            } else {
                $select_statement = $this->db_holder->prepare("SELECT *
                                                                 FROM administrator
                                                                 WHERE username = ? AND
                                                                       password = ?;");
                $select_statement->execute(array($username_entered, $password_entered));

                if($select_statement->fetch()) {
                    return true;
                }
            }
            $this->close_connection();
        }

        function get_cashiers_data($username_entered) {
            $this->open_connection();

            $select_statement = $this->db_holder->prepare("SELECT e.employee_id
                                                            FROM employees AS e,
                                                                 accounts AS a
                                                           WHERE e.employee_id = a.employee_id AND
                                                                 a.username = ?;");
            $select_statement->execute(array($username_entered));
            $content = $select_statement->fetch();
            return $content[0];
            $this->close_connection();
        }

    }
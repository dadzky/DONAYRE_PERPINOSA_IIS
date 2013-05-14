<?php
    include "database_connection.php";

    class Employees_functions_home extends Database_connection {

        function check_if_employee_or_username_exist($lastname, $firstname, $username) {
            $this->open_connection();

            $select_statement = $this->db_holder->prepare("SELECT * FROM employees WHERE lastname = ? AND firstname = ?;");
            $select_statement->execute(array($lastname, $firstname));

            if($select_statement->fetch()) {
                echo "Employee was already hired!";
            } else {
                $select_statement1 = $this->db_holder->prepare("SELECT a.* FROM accounts AS a,
                                                                                employees AS e
                                                                           WHERE e.employee_id = a.employee_id AND
                                                                                 e.employee_id NOT IN(SELECT employee_id FROM fired_employees) AND
                                                                                 a.username = ?;");
                $select_statement1->execute(array($username));

                if($select_statement1->fetch()) {
                    echo "User name was already taken!";
                }
            }

            $this->close_connection();
        }

        function add_employee($lastname, $firstname, $gender, $birthday, $address, $contact_number, $job_type, $username, $password) {
            $this->open_connection();

            $insert_statement1 = $this->db_holder->prepare("INSERT INTO employees VALUES (null, ?, ?, ?, ?, ?, ?, ?);");
            $insert_statement1->execute(array($lastname, $firstname, $gender, $birthday, $address, $contact_number, $job_type));

            $employee_id = $this->db_holder->lastInsertId();

            if($job_type == "cashier") {
                $insert_statement2 = $this->db_holder->prepare("INSERT INTO accounts VALUES (?, ?, ?);");
                $insert_statement2->execute(array($employee_id, $username, $password));
            }

            $this->close_connection();
        }

        function display_employees() {
            $this->open_connection();

            $select_statement = $this->db_holder->query("SELECT e.* FROM employees AS e
                                                         WHERE e.employee_id NOT IN(SELECT employee_id FROM fired_employees);");

            $cashier_employees = "";
            $packer_employees = "";
            $porter_employees = "";

            while($content = $select_statement->fetch()) {
                if($content[7] == "cashier") {
                    $cashier_employees .= "<tr title = 'double click to show actions' id = 'employee_".$content[0]."' ondblclick = 'show_action_options(".$content[0].")'>
                                                <td>".$content[1].", ".$content[2]."</td>
                                                <td>".$content[3]."</td>
                                                <td>".$content[4]."</td>
                                                <td>".$content[5]."</td>
                                                <td>".$content[6]."</td>
                                           </tr>";
                }
                if($content[7] == "packer") {
                    $packer_employees .= "<tr title = 'double click to show actions' id = 'employee_".$content[0]."' ondblclick = 'show_action_options(".$content[0].")'>
                                                <td>".$content[1].", ".$content[2]."</td>
                                                <td>".$content[3]."</td>
                                                <td>".$content[4]."</td>
                                                <td>".$content[5]."</td>
                                                <td>".$content[6]."</td>
                                           </tr>";
                }

                if($content[7] == "porter") {
                    $porter_employees .= "<tr title = 'double click to show actions' id = 'employee_".$content[0]."' ondblclick = 'show_action_options(".$content[0].")'>
                                                <td>".$content[1].", ".$content[2]."</td>
                                                <td>".$content[3]."</td>
                                                <td>".$content[4]."</td>
                                                <td>".$content[5]."</td>
                                                <td>".$content[6]."</td>
                                           </tr>";
                }
            }

            $employees_array = array("cashier_employees"=>$cashier_employees, "packer_employees"=>$packer_employees, "porter_employees"=>$porter_employees);
            $encoded_array = json_encode($employees_array);
            echo $encoded_array;

            $this->close_connection();
        }

        function search_employee($name_to_search, $job_type) {
            $this->open_connection();
            $select_statement = $this->db_holder->prepare("SELECT * FROM employees
                                                            WHERE (lastname LIKE ? OR
                                                                   firstname LIKE ?) AND
                                                                   job_type = '".$job_type."' AND
                                                                   employee_id NOT IN(SELECT employee_id FROM fired_employees);");

            $select_statement->execute(array($name_to_search, $name_to_search));
            while($content = $select_statement->fetch()) {
                echo "<tr id = 'employee_'".$content[0].">
                        <td>".$content[1].", ".$content[2]."</td>
                        <td>".$content[3]."</td>
                        <td>".$content[4]."</td>
                        <td>".$content[5]."</td>
                        <td>".$content[6]."</td>
                      </tr>";
            }

            $this->close_connection();
        }

        function retrieve_employees_data_to_update($id) {
            $this->open_connection();

            $select_statement = $this->db_holder->prepare("SELECT employee_id,
                                                                  lastname,
                                                                  firstname,
                                                                  gender,
                                                                  month(birthdate),
                                                                  day(birthdate),
                                                                  year(birthdate),
                                                                  address,
                                                                  contact_number,
                                                                  job_type
                                                           FROM employees
                                                           WHERE employee_id = ?;");
            $select_statement->execute(array($id));
            $content = $select_statement->fetch();
            if($content[9] == "cashier") {
                $select_statement2 = $this->db_holder->prepare("SELECT a.username
                                                                FROM accounts AS a,
                                                                     employees AS e
                                                                WHERE e.employee_id = a.employee_id AND
                                                                      e.employee_id = ?;");
                $select_statement2->execute(array($id));
                $username = $select_statement2->fetch();
                $data_array = array("employee_id"=>$content[0],
                                    "lastname"=>$content[1],
                                    "firstname"=>$content[2],
                                    "gender"=>$content[3],
                                    "birth_month"=>$content[4],
                                    "birth_date"=>$content[5],
                                    "birth_year"=>$content[6],
                                    "address"=>$content[7],
                                    "contact_number"=>$content[8],
                                    "type_of_job"=>$content[9],
                                    "username"=>$username[0]);
                $encoded_data = json_encode($data_array);
                echo $encoded_data;
            } else {
                $data_array = array("employee_id"=>$content[0],
                                    "lastname"=>$content[1],
                                    "firstname"=>$content[2],
                                    "gender"=>$content[3],
                                    "birth_month"=>$content[4],
                                    "birth_date"=>$content[5],
                                    "birth_year"=>$content[6],
                                    "address"=>$content[7],
                                    "contact_number"=>$content[8],
                                    "type_of_job"=>$content[9],);
                $encoded_data = json_encode($data_array);
                echo $encoded_data;
            }

            $this->close_connection();
        }

        function update_employees_data($id, $lastname, $firstname, $gender, $birthdate, $address, $contact_number, $job_type, $username, $password) {
            $this->open_connection();

            $update_statement = $this->db_holder->prepare("UPDATE employees
                                                              SET lastname = ?,
                                                                  firstname = ?,
                                                                  gender = ?,
                                                                  birthdate = ?,
                                                                  address = ?,
                                                                  contact_number = ?,
                                                                  job_type = ?
                                                              WHERE employee_id = ?;");
            $update_statement->execute(array($lastname, $firstname, $gender, $birthdate, $address, $contact_number, $job_type, $id));

            echo "php = ".$lastname;

            if($job_type == "cashier") {
                echo "php cashier = ".$username.$password.$id;
                $update_statement2 = $this->db_holder->prepare("UPDATE accounts
                                                                   SET username = ?,
                                                                       password = ?
                                                                   WHERE employee_id = ?;");
                $update_statement2->execute(array($username, $password, $id));
            }
            $this->close_connection();
        }

        function fire_employee($id, $date, $remarks) {
            $this->open_connection();

            $insert_statement = $this->db_holder->prepare("INSERT INTO fired_employees VALUES (?, ?, ?);");
            $insert_statement->execute(array($id, $date, $remarks));

            $this->close_connection();
        }

        function display_fired_employees() {
            $this->open_connection();

            $select_statement = $this->db_holder->query("SELECT e.*, f.date_fired, f.reason
                                                           FROM employees AS e, fired_employees AS f
                                                           WHERE e.employee_id = f.employee_id;");

            while($content = $select_statement->fetch()) {
                echo "<tr id = 'fired_employee_".$content[0]."'>
                        <td>".$content[1].", ".$content[2]."</td>
                        <td>
                            <table>
                                <tr><td>Gender: </td><td>".$content[3]."</td></tr>
                                <tr><td>Birthday: </td><td>".$content[4]."</td></tr>
                                <tr><td>Address: </td><td>".$content[5]."</td></tr>
                                <tr><td>Contact Number: </td><td>".$content[6]."</td></tr>
                                <tr><td>Job Type: </td><td>".$content[7]."</td></tr>
                            </table>
                        </td>
                        <td>".$content[8]."</td>
                        <td>".$content[9]."</td>
                      </tr>";
            }
            $this->close_connection();
        }

        function search_fired_employees($name_to_search) {
            $this->open_connection();

            $select_statement = $this->db_holder->prepare("SELECT e.*,
                                                            f.date_fired,
                                                            f.reason
                                                     FROM employees AS e,
                                                          fired_employees AS f
                                                     WHERE e.employee_id = f.employee_id AND
                                                           (e.firstname LIKE ? OR
                                                            e.lastname LIKE ?);");
            $select_statement->execute(array($name_to_search, $name_to_search));

            while($content = $select_statement->fetch()) {
                echo "<tr id = 'fired_employee_".$content[0]."'>
                        <td>".$content[1].", ".$content[2]."</td>
                        <td>
                            <table>
                                <tr><td>Gender: </td><td>".$content[3]."</td></tr>
                                <tr><td>Birthday: </td><td>".$content[4]."</td></tr>
                                <tr><td>Address: </td><td>".$content[5]."</td></tr>
                                <tr><td>Contact Number: </td><td>".$content[6]."</td></tr>
                                <tr><td>Job Type: </td><td>".$content[7]."</td></tr>
                            </table>
                        </td>
                        <td>".$content[8]."</td>
                        <td>".$content[9]."</td>
                      </tr>";
            }

            $this->close_connection();
        }

    } // ============= Class ends ===============
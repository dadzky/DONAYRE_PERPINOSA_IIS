<?php
    include "database_connection.php";

    class Employees_functions_home extends Database_connection {
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

            $select_statement = $this->db_holder->query("SELECT * FROM employees;");

            $cashier_employees = "";
            $packer_employees = "";
            $porter_employees = "";

            while($content = $select_statement->fetch()) {
                if($content[7] == "cashier") {
                    $cashier_employees .= "<tr id = 'employee_".$content[0]."'>
                                                <td>".$content[1].", ".$content[2]."</td>
                                                <td>".$content[3]."</td>
                                                <td>".$content[4]."</td>
                                                <td>".$content[5]."</td>
                                                <td>".$content[6]."</td>
                                           </tr>";
                }
                if($content[7] == "packer") {
                    $packer_employees .= "<tr id = 'employee_".$content[0]."'>
                                                <td>".$content[1].", ".$content[2]."</td>
                                                <td>".$content[3]."</td>
                                                <td>".$content[4]."</td>
                                                <td>".$content[5]."</td>
                                                <td>".$content[6]."</td>
                                           </tr>";
                }

                if($content[7] == "porter") {
                    $porter_employees .= "<tr id = 'employee_".$content[0]."'>
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

        function serach_employee($name_to_search) {
            $this->open_connection();

            $select_statement = $this->db_holder->prepare("SELECT * FROM employees WHERE lastname LIKE ? OR firstname LIKE ?;");
            $select_statement->execute(array($name_to_search, $name_to_search));

            echo "<table class = 'table table-striped table-bordered table-condensed'>";
            $counter = 0;
            while($content = $select_statement->fetch()) {
                while($counter < 1) {
                    echo "<tr>
                            <th>NAME</th><th>GENDER</th><th>BIRTHDAY</th><th>ADDRESS</th><th>CONTACT NUMBER</th><th>JOB TYPE</th>
                          </tr>";
                    $counter++;
                }
                echo "<tr id = 'employee_'".$content[0].">
                        <td>".$content[1].", ".$content[2]."</td>
                        <td>".$content[3]."</td>
                        <td>".$content[4]."</td>
                        <td>".$content[5]."</td>
                        <td>".$content[6]."</td>
                        <td>".$content[7]."</td>
                      </tr>";
            }
            echo "</table>";

            $this->close_connection();
        }
    }
<?php

    include "Database_connection.php";

    class Suppliers_functions_home extends Database_connection{

        function retrieve_all_suppliers() {
            $this->open_connection();

            $select_statement = $this->db_holder->query("SELECT DISTINCT company_name FROM suppliers ORDER BY company_name;");

            while($content = $select_statement->fetch()) {
                echo "<option>".$content[0]."</option>";
            }
            echo "<option>new supplier</option>";
            $this->close_connection();
        }

        function display_suppliers($current_page, $item_limit) {
            $this->open_connection();

            $select_statement = $this->db_holder->query("SELECT * FROM suppliers LIMIT $current_page, $item_limit;");
            while($content = $select_statement->fetch()) {
                $select_statement2 = $this->db_holder->prepare("SELECT p.product_name
                                                                  FROM products AS p,
                                                                       suppliers AS s,
                                                                       product_to_supplier AS ps
                                                                 WHERE p.product_id = ps.product_id AND
                                                                       s.supplier_id = ps.supplier_id AND
                                                                       s.supplier_id = ?;" );
                $select_statement2->execute(array($content[0]));
                echo "<tr id = 'supplier_".$content[0]."'>
                        <td>".$content[1]."</td>
                        <td><table>";
                        while($supplied_product = $select_statement2->fetch()) {
                            echo "<tr><td>".$supplied_product[0]."</td></tr>";
                        }
                echo    "</table></td>
                         <td>".$content[2]."</td>
                         <td>".$content[3]."</td>
                         </tr>";
            }
            $this->close_connection();
        }

        function display_supplier_pager($item_limit) {
            $this->open_connection();

            $select_statement = $this->db_holder->query("SELECT COUNT(DISTINCT company_name) FROM suppliers;");
            $number_of_items = $select_statement->fetch();
            $pages = $number_of_items[0] / intval($item_limit);
            if(is_float($pages)) {
                $pages = $pages + 1;
            }
            $list = "";
            if(intval($pages > 1)) {
                for($counter = 1; $counter <= intval($pages); $counter++) {
                    if($counter ==1) {
                        $list .= "<li class = 'active'><a href = 'Javascript:void(0)'>".$counter."</a></li>";
                    } else {
                        $list .= "<li><a href = 'Javascript:void(0)'>".$counter."</a></li>";
                    }
                }

            }
            echo $list;

            $this->close_connection();
        }

        function display_admins_transaction() {
            $this->open_connection();

            $select_statement = $this->db_holder->query("SELECT DISTINCT transaction_date FROM admins_transaction;");
            while($date = $select_statement->fetch()) {
                $select_statement2 = $this->db_holder->prepare("SELECT p.product_name,
                                                                       t.total_items_bought,
                                                                       p.stock_unit,
                                                                       s.company_name,
                                                                       p.product_price
                                                                  FROM products AS p,
                                                                       suppliers AS s,
                                                                       product_to_supplier AS ps,
                                                                       admins_transaction AS t
                                                                  WHERE p.product_id = ps.product_id AND
                                                                        s.supplier_id = ps.supplier_id AND
                                                                        p.product_id = t.product_id AND
                                                                        t.transaction_date = ?;");
                $select_statement2->execute(array($date[0]));
                $row_length = 1;
                $daily_spent_money = 0;
                $row_fetched = "";
                while($content = $select_statement2->fetch()) {
                    $daily_spent_money += $content[1] * $content[4];
                    $row_fetched .= "<tr>
                                        <td>".$content[0]."</td>
                                        <td>".$content[1]." ".$content[2]."(s)</td>
                                        <td>".$content[3]."</td>
                                     </tr>";

                    $row_length++;
                }
                $decimal_position = strpos($daily_spent_money, ".");
                if($decimal_position != "") {
                    $rounded_daily_spent_money = round($daily_spent_money, 2);
                    $whole_number = substr($rounded_daily_spent_money, 0, $decimal_position - 1);
                    $decimal_number = substr($rounded_daily_spent_money, $decimal_position + 1);
                    $formatted_whole_number = number_format($whole_number);
                    $daily_spent_money = $formatted_whole_number.".".$decimal_number;
                } else {
                    $daily_spent_money = number_format($daily_spent_money).".00";
                }


                echo "<tr id = 'admins_transaction_".$date[0]."'><td rowspan = ".$row_length.">".$date[0]."</td></tr>";
                echo $row_fetched;
                echo "<tr class = 'info'><td colspan = '3'></td><td class = 'money_spent_td'>Money Spent: &#8369;".$daily_spent_money."</td></tr>";
            }

            $this->close_connection();
        }
    }
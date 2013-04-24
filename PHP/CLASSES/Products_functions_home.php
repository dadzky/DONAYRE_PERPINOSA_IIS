<?php

    include_once "database_connection.php";
    class Products_functions_home extends Database_connection {

        function check_if_product_to_add_already_exist($product_name) {
            $this->open_connection();

            $select_statement = $this->db_holder->query("SELECT * FROM products;");

            while($products = $select_statement->fetch()) {
                if($products[1] == $product_name) {
                    echo "true";
                    break;
                }
            }

            $this->close_connection();
        }

        function add_product($product_name, $product_price, $number_of_stocks, $stock_unit, $update) {
            $this->open_connection();

            if($update == "yes") {
                $select_statement = $this->db_holder->prepare("SELECT number_of_stocks FROM products WHERE product_name = ?");
                $select_statement->execute(array($product_name));
                $product_number_of_stocks = $select_statement->fetch();
                $total_number_of_stocks = $product_number_of_stocks[0] + $number_of_stocks;
                $update_statement = $this->db_holder->prepare("UPDATE products SET number_of_stocks = ? WHERE product_name = ?");
                $update_statement->execute(array($total_number_of_stocks, $product_name));
            } else {
                $insert_statement = $this->db_holder->prepare("INSERT INTO products VALUES (null, ?, ?, ?, ?);");
                $insert_statement->execute(array($product_name, $product_price, $number_of_stocks, $stock_unit));
            }

            $this->close_connection();
        }

        function display_products() {
            $this->open_connection();

            $select_statement = $this->db_holder->query("SELECT * FROM products ORDER BY product_name;");

            $counter = 0;
            while($content = $select_statement->fetch()) {
                while($counter < 1) {
                    echo "<tr><th>NAME</th><th>PRICE</th><th>STOCKS</th><th>UNIT</th><th class = 'product_delete_action'><img src = '../CSS/images/red_trash.png' onclick = 'delete_products(".$content[0].")' /><ul><li id = 'mark_all_delete_action'>Mark All</li><li id = 'unmark_all_delete_action'>UnMark All</li></ul></th></tr>";
                    $counter++;
                }
                echo "<tr id = '".$content[0]."'>";
                echo    "<td ondblclick = 'edit_products_name(".$content[0].")'>".$content[1]."</td>";
                echo    "<td ondblclick = 'edit_products_price(".$content[0].")'>&#8369;".$content[2]."</td>";
                echo    "<td ondblclick = 'edit_products_number_of_stocks(".$content[0].")'>".$content[3]."</td>";
                echo    "<td ondblclick = 'edit_products_stock_unit(".$content[0].")'>".$content[4]."</td>";
                echo    "<td class = 'product_delete_action'><input type = 'checkbox' id = 'product_check_box_".$content[0]."'></td>";
                echo "</tr>";

            }

            $this->close_connection();
        }

        function edit_products_data($id, $product_name, $product_price, $products_number_of_stocks, $stock_unit) {
            $this->open_connection();

            if($product_name != "") {
                $update_statement = $this->db_holder->prepare("UPDATE products SET product_name = ? WHERE product_id = ?;");
                $update_statement->execute(array($product_name, $id));
                echo $product_name;
            }

            if($product_price != "") {
                $update_statement = $this->db_holder->prepare("UPDATE products SET product_price = ? WHERE product_id = ?;");
                $update_statement->execute(array($product_price, $id));
                echo $product_price;
            }

            if($products_number_of_stocks != "") {
                $update_statement = $this->db_holder->prepare("UPDATE products SET number_of_stocks = ? WHERE product_id = ?;");
                $update_statement->execute(array($products_number_of_stocks, $id));
                echo $products_number_of_stocks;
            }

            if($stock_unit != "") {
                $update_statement = $this->db_holder->prepare("UPDATE products SET stock_unit = ? WHERE product_id = ?;");
                $update_statement->execute(array($stock_unit, $id));
                echo $stock_unit;
            }

            $this->close_connection();
        }

        function delete_product($id) {
            $this->open_connection();

            $delete_statement = $this->db_holder->prepare("DELETE FROM products WHERE product_id = ?;");
            $delete_statement->execute(array($id));

            $this->close_connection();
        }

    }
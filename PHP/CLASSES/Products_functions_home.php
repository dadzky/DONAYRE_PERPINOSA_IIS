<?php

    include_once "database_connection.php";
    class Products_functions_home extends Database_connection {

        function add_product($product_name, $product_price, $number_of_stocks, $stock_unit) {
            $this->open_connection();

            $insert_statement = $this->db_holder->prepare("INSERT INTO products VALUES (null, ?, ?, ?, ?);");
            $insert_statement->execute(array($product_name, $product_price, $number_of_stocks, $stock_unit));
            echo $product_name.$product_price.$number_of_stocks.$stock_unit;
            $this->close_connection();
        }

        function display_products() {
            $this->open_connection();

            $select_statement = $this->db_holder->query("SELECT * FROM products;");

            $counter = 0;
            while($content = $select_statement->fetch()) {
                while($counter < 1) {
                    echo "<tr><th>NAME</th><th>PRICE</th><th>STOCKS</th></tr>";
                    $counter++;
                }
                echo "<tr id = '".$content[0]."'>";
                echo "<td ondblclick = 'edit_products_name(".$content[0].")'>".$content[1]."</td>";
                echo "<td ondblclick = 'edit_products_price(".$content[0].")'>".$content[2]."</td>";
                echo "<td ondblclick = 'edit_products_stock_info(".$content[0].")'>".$content[3].$content[4]."</td>";
                echo "</tr>";

            }

            $this->close_connection();
        }

        function edit_products_data($id, $product_name, $product_price, $product_stock_info) {
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

            if($product_stock_info != "") {
                $number_of_stocks = "";
            }
            $this->close_connection();
        }

    }
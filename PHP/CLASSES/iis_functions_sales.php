<?php
    session_start();

    include "database_connection.php";
    
    class Iis_functions_sales extends Database_connection {

    	function searchProductWithCost($toSearch, $page, $pageLimit,$pageActive){	

    		$this->open_connection();

    			$sql= "SELECT product_id,product_name,product_price,stock_unit
                        FROM products
                        WHERE product_name LIKE ?
                        LIMIT $page,$pageLimit";
                    
                $stmt = $this->db_holder->prepare($sql);
                $stmt->bindParam(1, $toSearch);
                $stmt->execute();

                $sql2 = "SELECT COUNT(product_id)
                         FROM products
                         WHERE product_name LIKE ?";
                $stmt2 = $this->db_holder->prepare($sql2);
                $stmt2->bindParam(1, $toSearch);
                $stmt2->execute();
                $totalProducts = $stmt2->fetch();
                $pagesToDisplay = $totalProducts[0]/$pageLimit;


    		$this->close_connection();    

            $pagerLI = "";
            $pager = "";
            $tbody = "";

            while($row = $stmt->fetch()){
                $tbody .= "<tr id='tr_transact_search_".$row[0]."'>";
                $tbody .= "<td>".$row[1]."</td>";
                $tbody .= "<td>".$row[2]."</td>";
                $tbody .= "<td>".$row[3]."</td>";
                $tbody .= "</tr>";
            }
            if($tbody == ""){
                  $tbody = "<tr><td colspan='3'>No Product Found!</td></tr>";
            }
            if(is_float($pagesToDisplay)){
               $pagesToDisplay = $pagesToDisplay+1; 
            }

            if(intval($pagesToDisplay) > 0 ){
                for($ctr=1;$ctr < intval($pagesToDisplay)+1;$ctr++){
                    if($ctr == $pageActive){
                        $pagerLI .= "<li class='active'><a href='#' class='page_number'>".$ctr."</a></li>";
                    }else{
                         $pagerLI .= "<li><a href='#' class='page_number'>".$ctr."</a></li>";
                    }
                }
            }else{
                $pagerLI = "<li class='active'><a href='#' class='page_number'>1</a></li>";
            }

            $pager =    "<button class='btn-primary' id='pager_prev' >prev</button>
                        <ul>".$pagerLI."</ul>
                        <button class='btn-primary' id='pager_next'>next</button>";

            $json_array = array('tbody'=>$tbody,'pager'=>$pager, 'pagesToDisplay'=> intval($pagesToDisplay));
            $encoded = json_encode($json_array);
            echo $encoded;

    	}

        function saveTransaction($employeeID, $productIDs, $quantities){

            $this->open_connection();

                $sql1 = "SELECT CONCAT(CURDATE(),' ', CURTIME())";
                $stmt1 = $this->db_holder->query($sql1);
                $dateTime = $stmt1->fetch();
                for($ctr=0; $ctr<sizeof($employeeID); $ctr++){
                    $prodID = $productIDs[$ctr];
                    $quantity = $quantities[$ctr];
                    $sql2 = "SELECT transaction_id
                            FROM transactions
                            WHERE product_id = ?
                            AND employee_id = ?";

                    $stmt2  = $this->db_holder->prepare($sql2);
                    $stmt2 -> execute(array($prodID, $employeeID));
                    if(!$stmt2->fetch()){

                        $this->insertToTransactionsTbl($prodID, $employeeID, $dateTime[0], $quantity);
                    }

                }

            $this->close_connection();
        }

        function insertToTransactionsTbl($prodID, $employeeID, $dateTime, $quantity){
            $this->open_connection();
                echo $prodID;
            echo $employeeID;
            echo $dateTime;
            try{
                $sql1 = "INSERT INTO transactions
                        VALUES(null,?,?,?)";
                $stmt1  = $this->db_holder->prepare($sql1);
                $stmt1 -> execute(array($prodID, $employeeID, $dateTime));

                $transactionID = $this->db_holder->lastInsertId();
            }catch(PDOException $e){
                echo $e;
            }
                echo  $transactionID;
                $sql2 = "INSERT INTO transactions_info
                        VALUES(?,?)";
                $stmt2  = $this->db_holder->prepare($sql2);
                $stmt2 -> execute(array($transactionID,$quantity));

            $this->close_connection();
        }

    }

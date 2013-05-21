<?php
		
	include_once "../../CLASSES/iis_functions_sales.php";

	$identifier = $_GET['identifier'];
    $identifier_val = $_GET['identifier_val'];

	$action = new Iis_functions_sales();
	$action -> getProductForTransaction($identifier,$identifier_val);
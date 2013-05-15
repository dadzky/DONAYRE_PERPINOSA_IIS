<?php
		
	include_once "../../CLASSES/iis_functions_sales.php";

	$barCode = $_GET['barCode'];

	$action = new Iis_functions_sales();
	$action -> getProductForTransaction($barCode);
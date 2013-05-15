<?php
		
	include_once "../../CLASSES/iis_functions_sales.php";

	$quantity =  $_GET['quantity']."%";
	$toSearch = $_GET['toSearch']."%";

	$action = new Iis_functions_sales();
	$action -> searchProductWithCost($toSearch);
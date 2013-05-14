<?php
		
	include_once "../../CLASSES/iis_functions_sales.php";

	$toSearch = $_POST['toSearch']."%";

	$action = new Iis_functions_sales();
	$action -> searchProductWithCost($toSearch);
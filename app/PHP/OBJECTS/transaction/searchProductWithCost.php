<?php
		
	include_once "../../CLASSES/iis_functions_sales.php";

	$page = $_POST['page'];
	$pageActive = $_POST['pageActive']+1;
	$pageLimit = $_POST['pageLimit'];
	$toSearch = $_POST['toSearch']."%";

	$action = new Iis_functions_sales();
	$action -> searchProductWithCost($toSearch, $page, $pageLimit,$pageActive);
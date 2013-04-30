<?php
	
	include_once '../../CLASSES/iis_functions_sales.php';

	$pageLimit = $_POST['pageLimit'];
	$toSearch = $_POST['toSearch'];
	$action = new Iis_functions_sales();
	$action -> displayPager($pageLimit, $toSearch);
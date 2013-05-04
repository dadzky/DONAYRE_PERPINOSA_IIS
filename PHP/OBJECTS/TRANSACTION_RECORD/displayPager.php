<?php
	
	include_once '../../CLASSES/iis_functions_sales.php';

	$pageLimit = $_POST['pageLimit'];
    $searchBy = $_POST['searchBy'];
	$toSearch = $_POST['toSearch'].'%';
	$action = new Iis_functions_sales();
	$action -> displayPager($pageLimit, $searchBy, $toSearch);
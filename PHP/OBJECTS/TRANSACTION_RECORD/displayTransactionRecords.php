<?php
	include_once '../../CLASSES/iis_functions_sales.php';

	$currentPage = $_POST['currentPage'];
	$pageLimit = $_POST['pageLimit'];
	$action = new Iis_functions_sales();
	$action -> displayTransactionRecords($currentPage,$pageLimit);

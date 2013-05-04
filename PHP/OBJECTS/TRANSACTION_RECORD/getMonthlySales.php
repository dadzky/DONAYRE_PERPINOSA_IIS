<?php

	include_once '../../CLASSES/iis_functions_sales.php';

    $yearSelected = $_POST['yearSelected'];
	$action = new Iis_functions_sales();
	$action -> displayMonthlySales($yearSelected);
<?php

    session_start();
    echo "wew";
    if(isset($_SESSION["log_in_as"])) {
        session_destroy();
        session_unset();
        header("Location: login.php");
    } else {
        header("Location: login.php");
    }
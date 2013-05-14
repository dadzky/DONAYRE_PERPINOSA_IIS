<?php
    session_start();

    if(!isset($_SESSION["log_in_as"])) {
        header("Location: login.php");
    }
?>

<!Doctype html>
<html>
    <head>
        <link rel = "stylesheet" href = "../CSS/includes_all_css_files.css" />
    </head>
    <body>
        <div id = "admins_main_container" class = "container-fluid">
            <?php include_once "page_header.html"; ?>
            <div id = "admins_content_div"></div>

        </div><!-- ====== admins main container div ends ===== -->

        <!-- ============ IMPORTS ========= -->

        <script src = "../JS/jquery-1.9.1.min.js"></script>
        <script src = "../JS/jquery-ui-1.10.2.min.js"></script>
        <script src = "../JS/admins_page_functionality.js"></script>
    </body>
</html>
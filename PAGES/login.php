<!Doctype html>
<html>
    <head>
        <title>Log-in</title>
    </head>
    <body>
        <div id = "main_container_div">
            <?php include_once "page_header.html"; ?>
            <div id = "iis_related_content_div">
            </div> <!-- ======= iis related content div ends ======= -->
            <div id = "log_in_div">
                <form id = "log_in_form" action = "../PHP/OBJECTS/log_in_validation.php" method = "POST">
                    <input type = "text" name = "username_entered" placeholder = "username" />
                    <input type = "password" name = "password_entered" placeholder = "password" />
                    <input type = "submit" value = "log-in"/>
                </form>
            </div> <!-- ====== log in div ends ======= -->
            <?php include_once "page_footer.html"; ?>
        </div><!-- ======= main container div ends ====== -->

        <!-- ========= IMPORTS =======-->
        <link rel = "shortcut icon" href = "../CSS/images/IIS%20logos/iis_icon1.jpg" />
        <script src = "../JS/jquery-1.9.1.min.js"></script>
        <script src = "../JS/jquery-ui-1.9.0.custom.min.js"></script>
        <script src = "../JS/log_in_page_functionality.js"></script>
        <link rel = "stylesheet" href = "../CSS/includes_all_css_files.css" />
    </body>
</html>
<!Doctype html>
<html>
    <head>
        <title>Log-in</title>
    </head>
    <body>
        <div id = "main_container_div">
            <div id = "iis_header_div">
            </div> <!-- ===== iis div ends ======= -->
            <form id = "log_in_form" action = "../PHP/OBJECTS/log_in_validation.php" method = "POST">
                <input type = "text" name = "username_entered" placeholder = "username" />
                <input type = "password" name = "password_entered" placeholder = "password" />
            </form>
            <div id = "iis_related_content_div">
            </div> <!-- ======= iis related content div ends ======= -->
        </div>

        <!-- ========= IMPORTS =======-->
        <link rel = "shortcut icon" href = "../CSS/images/IIS%20logos/iis_icon1.jpg" />
        <script src = "../JS/jquery-1.9.1.min.js"></script>
        <script src = "../JS/jquery-ui-1.9.0.custom.min.js"></script>
        <script src = "../JS/log_in_page_functionality.js"></script>
        <link rel = "stylesheet" href = "../CSS/jquery-ui.min.css" />
        <link rel = "stylesheet" href = "../CSS/log_in_page.css" />
        <link rel = "stylesheet" href = "../CSS/bootstrap.min.css" />
    </body>
</html>
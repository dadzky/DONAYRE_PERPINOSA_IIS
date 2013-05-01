<!Doctype html>
<html>
    <head>
        <title>Log-in</title>
        <link rel = "shortcut icon" href = "../CSS/images/IIS%20logos/iis0.jpg" />
        <link rel = "stylesheet" href = "../CSS/includes_all_css_files.css" />
    </head>
    <body>
        <div id = "main_container_div" class = "container">
            <a id = "log_in_a">
                <ul>
                    <li><button id = "main_log_in_button" class = "btn-primary btn-block">LOG-IN</button></li>
                    <li>
                        <ul id = "log_in_option_ul">
                            <span id = "close_log_in_options_span"><img src = "../CSS/images/close_icon1.png"></span>
                            <li>AS:</li>
                            <li id = "log_in_as_cashier_li"><button id = "log_in_as_cashier_button" class = "btn-info btn-block">cashier</button></li>
                            <li><button id = "log_in_as_administrator_button" class = "btn-info btn-block">administrator</button></li>
                        </ul>
                    </li>
                </ul>
            </a>
            <div id = "iis_related_content_div">
                LOG-IN PAGE RELATED CONTENTS HERE!!!
            </div> <!-- ======= iis related content div ends ======= -->
            <div id = "log_in_div">
                <form id = "log_in_form" action = "../PHP/OBJECTS/log_in_validation.php" method = "POST">
                    <input type = "hidden" name = "log_in_as_input" id = "log_in_as_input" />
                    <span id = "log_in_as_span"></span>
                    <input type = "text" name = "username_entered" placeholder = "username" />
                    <input type = "password" name = "password_entered" placeholder = "password" />
                    <?php if(isset($error_message)) echo $error_message;  ?>
                    <input type = "submit" value = "log-in"/>
                </form>
            </div> <!-- ====== log in div ends ======= -->
            <div id = "overlay_div_container"></div>
        </div><!-- ======= main container div ends ====== -->

        <!-- ========= IMPORTS =======-->

        <script src = "../JS/jquery-1.9.1.min.js"></script>
        <script src = "../JS/jquery-ui-1.10.2.min.js"></script>
        <script src = "../JS/log_in_page_functionality.js"></script>

    </body>
</html>
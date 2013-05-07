<?php
    session_start();

    if(isset($_SESSION['log_in_as'])) {
        if($_SESSION['log_in_as'] == "cashier") {
            header("Location: transaction.php");
        } else {
            header("Location: adminhome.php");
        }
    }


?>

<!Doctype html>
<html>
    <head>
        <title>Log-in</title>
        <meta content = text/html charset="utf-8">
        <link rel = "shortcut icon" href = "../CSS/images/IIS%20logos/iis0.jpg" />
        <link rel = "stylesheet" href = "../CSS/includes_all_css_files.css" />
    </head>
    <body>
        <div id = "iis_header_div" class = "container-fluid">
            <div id = "system_name_div">
                <h2>
                    <span>I</span>-
                    <span>I</span>NVENTORY
                    <span>S</span>YSTEM
                </h2>
            </div>
            <div id = "log_in_a">
                <ul>
                    <li><button id = "main_log_in_button" class = "btn btn-primary btn-large">LOG-IN</button>
                        <ul id = "log_in_option_ul">
                            <li>AS:</li>
                            <li id = "log_in_as_cashier_li"><button id = "log_in_as_cashier_button" class = "btn-info btn-block">cashier</button></li>
                            <li id = "log_in_as_administrator_li"><button id = "log_in_as_administrator_button" class = "btn-info btn-block">administrator</button></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div><!-- ======= iis header div ends ============ -->
        <div id = "main_container_div">


            <div id = "iis_related_content_div" class = "container">
                Content. Content.Content.Content.Content.Content.Content.Content.Content.Content.Content.Content.Content.Content.Content.<br />
                Programming! Programming! Programming! Programming! Programming! Programming! Programming! Programming! Programming!
                Programming! Programming! Programming! Programming! Programming! Programming! Programming! Programming! Programming!
                Programming! Programming! Programming! Programming! Programming! Programming! Programming! Programming! Programming!
                Programming! Programming! Programming! Programming! Programming! Programming! Programming! Programming! Programming!
                Programming! Programming! Programming! Programming! Programming! Programming! Programming! Programming! Programming!
                Programming! Programming! Programming! Programming! Programming! Programming! Programming! Programming! Programming!
                Programming! Programming! Programming! Programming! Programming! Programming! Programming! Programming! Programming!
                Programming! Programming! Programming! Programming! Programming! Programming! Programming! Programming! Programming!
                Programming! Programming! Programming! Programming! Programming! Programming! Programming! Programming! Programming!
                Programming! Programming! Programming! Programming! Programming! Programming! Programming! Programming! Programming!
                Programming! Programming! Programming! Programming! Programming! Programming! Programming! Programming! Programming!
                Programming! Programming! Programming! Programming! Programming! Programming! Programming! Programming! Programming!
                Programming! Programming! Programming! Programming! Programming! Programming! Programming! Programming! Programming!
                Programming! Programming! Programming! Programming! Programming! Programming! Programming! Programming! Programming!
                Programming! Programming! Programming! Programming! Programming! Programming! Programming! Programming! Programming!
                Programming! Programming! Programming! Programming! Programming! Programming! Programming! Programming! Programming!
                Programming! Programming! Programming! Programming! Programming! Programming! Programming! Programming! Programming!
                Programming! Programming! Programming! Programming! Programming! Programming! Programming! Programming! Programming!
                Programming! Programming! Programming! Programming! Programming! Programming! Programming! Programming! Programming!
                Programming! Programming! Programming! Programming! Programming! Programming! Programming! Programming! Programming!
                Programming! Programming! Programming! Programming! Programming! Programming! Programming! Programming! Programming!
                Programming! Programming! Programming! Programming! Programming! Programming! Programming! Programming! Programming!
                Programming! Programming! Programming! Programming! Programming! Programming! Programming! Programming! Programming!
                Programming! Programming! Programming! Programming! Programming! Programming! Programming! Programming! Programming!
                Programming! Programming! Programming! Programming! Programming! Programming! Programming! Programming! Programming!
                Programming! Programming! Programming! Programming! Programming! Programming! Programming! Programming! Programming!
                Programming! Programming! Programming! Programming! Programming! Programming! Programming! Programming! Programming!
                Programming! Programming! Programming! Programming! Programming! Programming! Programming! Programming! Programming!
                Programming! Programming! Programming! Programming! Programming! Programming! Programming! Programming! Programming!
                Programming! Programming! Programming! Programming! Programming! Programming! Programming! Programming! Programming!
                Programming! Programming! Programming! Programming! Programming! Programming! Programming! Programming! Programming!
                Programming! Programming! Programming! Programming! Programming! Programming! Programming! Programming! Programming!
                Programming! Programming! Programming! Programming! Programming! Programming! Programming! Programming! Programming!
                Programming! Programming! Programming! Programming! Programming! Programming! Programming! Programming! Programming!
                Programming! Programming! Programming! Programming! Programming! Programming! Programming! Programming! Programming!

            </div> <!-- ======= iis related content div ends ======= -->
            <div id = "log_in_div">
                <span id = "close_log_in_options_span"><img src = "../CSS/images/close_icon1.png"></span>
                <form id = "log_in_form" action = "login.php" method = "POST">
                    <input type = "hidden" name = "log_in_as" id = "log_in_as" />
                    <span id = "log_in_as_span"></span>
                    <input type = "text" name = "username_entered" placeholder = "username" />
                    <input type = "password" name = "password_entered" placeholder = "password" />
                    <span id = "error_span"></span><br />
                    <button class = "btn btn-info" id = "log_in_submit">log-in</button>
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
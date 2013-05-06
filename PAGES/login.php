<?php
    session_start();
    include "../PHP/CLASSES/iis_functions_home.php";

    $execute_check = new Iis_functions_home();

    if(isset($_SESSION["log_in_as"]) && $_SESSION["log_in_as"] == "cashier") {
        header("Location: transaction.php");
    } else if(isset($_SESSION["log_in_as"]) && $_SESSION["log_in_as"] == "administrator") {
        header("Location: adminhome.php");
    } else {
        if(isset($_POST["log_in_as_input"]) && isset($_POST["username_entered"]) && isset($_POST["password_entered"])) {
            $username_entered = $_POST["username_entered"];
            $password_entered = $_POST["password_entered"];
            $log_in_as = $_POST["log_in_as_input"];
            $username_exist = $execute_check->check_username($username_entered, $log_in_as);
            if($username_exist) {
                $same_password = $execute_check->check_password($username_entered, $password_entered, $log_in_as);
                if($same_password) {
                    if($log_in_as == "cashier") {
                        $_SESSION['log_in_as'] = "cashier";
                        $_SESSION['username_entered'] = $username_entered;
                        $_SESSION['password_entered'] = $password_entered;
                        // =========== STORING CASHIERS I.D. INTO SESSION VARIABLE ========
                        $_SESSION['employee_id'] = $execute_check->get_cashiers_data($_SESSION['username_entered']);
                        header("Location: transaction.php");
                    } else {
                        $_SESSION["log_in_as"] = "administrator";
                        $_SESSION['username_entered'] = $username_entered;
                        header("Location: adminhome.php");
                    }

                } else {
                    $error_message = "Incorrect password!";



                }
            } else {
                $error_message = "Unknown username!";
            }
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
                    <input type = "hidden" name = "log_in_as_input" id = "log_in_as_input" />
                    <span id = "log_in_as_span"></span>
                    <input type = "text" name = "username_entered" placeholder = "username" />
                    <input type = "password" name = "password_entered" placeholder = "password" />
                    <?php
                    if(isset($error_message)) echo $error_message;
                    ?><br />
                    <input type = "submit" class = "btn btn-info" value = "log-in" />
                </form>
            </div> <!-- ====== log in div ends ======= -->
            <?php include "page_footer.html";?>
            <div id = "overlay_div_container"></div>

        </div><!-- ======= main container div ends ====== -->

        <!-- ========= IMPORTS =======-->

        <script src = "../JS/jquery-1.9.1.min.js"></script>
        <script src = "../JS/jquery-ui-1.10.2.min.js"></script>
        <script src = "../JS/log_in_page_functionality.js"></script>

    </body>
</html>
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
                    <span>I</span><i class='icon-circle-arrow-right'></i>
                    <span>I</span>NVENTORY
                    <span>S</span>YSTEM
                </h2>
            </div>
            <button id = "main_log_in_button" class = "btn btn-primary btn-large">LOG-IN</button>
            <div id='login_as_div' class="alert alert-info">
                <div id = "arrow_div"></div>
                <button id='login_as_close_btn' type='button' class="close" title="close">&times;</button>
                <h4>Sign in as: <img src='../CSS/images/arrowdown.png' alt='dint'/></h4><br/>
                <button id='log_in_as_cashier_btn' class='btn log_in_option'>Cashier</button>
                <button id='log_in_as_administrator_btn' class='btn btn-success log_in_option'>Admin</button>
            </div> <!--login_as_div-->
        </div><!-- ======= iis header div ends ============ -->
        <div id = "main_container_div">

            <div id = "iis_related_content_div" class = "container">
                <div id="myCarousel" class="carousel slide">
                    <ol class="carousel-indicators">
                        <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
                        <li data-target="#myCarousel" data-slide-to="1"></li>
                    </ol>
                    <!-- Carousel items -->
                    <div id='slide_imgs' class="carousel-inner">
                        <div class="active item"><img src='../CSS/img/IIS%20logos/iis1.jpg' class ='slideimg' alt='first'/></div>
                        <div class="item"><img src='../CSS/img/IIS%20logos/iis7.jpg' class ='slideimg' alt='second'/></div>
                    </div>
                    <!-- Carousel nav -->
                    <a class="carousel-control left" href="#myCarousel" data-slide="prev">&lsaquo;</a>
                    <a class="carousel-control right" href="#myCarousel" data-slide="next">&rsaquo;</a>
                </div><!--Carousel[slide show]-->
                <div class="container-fluid">
                    <div class="row-fluid">
                        <div id='left_sidebar_div' class="span2">
                            <ul id='branch_Names' class="nav nav-tabs">
                                <li class="nav-header">Branch Names</li>
                                <li> <a href="Javascript:void(0)" class='sample1'>sample1 &nbsp;&nbsp;<i class='icon-chevron-right  '></i> </a> </li>
                                <li> <a href="Javascript:void(0)" class='sample2'>sample2 &nbsp;&nbsp;<i></i> </a> </li>
                                <li> <a href="Javascript:void(0)" class='sample3'>sample3 &nbsp;&nbsp;<i></i> </a> </li>
                                <li> <a href="Javascript:void(0)" class='sample4'>sample4 &nbsp;&nbsp;<i></i> </a> </li>
                                <li> <a href="Javascript:void(0)" class='sample5'>sample5 &nbsp;&nbsp;<i></i> </a> </li>
                                <li> <a href="Javascript:void(0)" class='sample6'>sample6 &nbsp;&nbsp;<i></i> </a> </li>
                            </ul>
                        </div>
                        <div id='right_sidebar_div' class="span10">

                        </div>
                    </div>
                </div>
            </div> <!-- ======= iis related content div ends ======= -->

            <div id = "log_in_div">
                <p id = "logo_p"><img src = "../CSS/images/IIS%20logos/iis0.jpg"> <span>Unknown Store</span></p>
                <span id = "close_log_in_options_span" title = "close"><img src = "../CSS/images/close_icon.png"></span>
                <form id = "log_in_form" action = "login.php" method = "POST">
                    <input type = "hidden" name = "log_in_as" id = "log_in_as" />

                    <span id = "log_in_as_span"></span><br /><br />
                    <input type = "text" name = "username_entered" placeholder = "username" /><br/>
                    <input type = "password" name = "password_entered" placeholder = "password" /><br/>
                    <span class = "alert-error" id = "error_span"></span><br />
                    <button class = "btn btn-primary" id = "log_in_submit"><i class = "icon-check"></i>&nbsp;&nbsp;log-in</button>
                    <button class = "btn btn-danger" type = "reset" id = "log_in_reset_button"><i class = "icon-remove"></i>&nbsp;&nbsp;reset</button>
                </form>

            </div> <!-- ====== log in div ends ======= -->
            <div id = "overlay_div_container"></div>
        </div><!-- ======= main container div ends ====== -->


        <?php include "page_footer.html"; ?>
        <!-- ========= IMPORTS =======-->
        <script src = "../JS/jquery-1.9.1.min.js"></script>
        <script src = "../JS/jquery-ui-1.10.2.min.js"></script>
        <script src = "../JS/bootstrap.min.js"></script>
        <script src = "../JS/log_in_page_functionality.js"></script>

    </body>
</html>
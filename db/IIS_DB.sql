-- phpMyAdmin SQL Dump
-- version 3.3.9
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: May 17, 2013 at 10:41 AM
-- Server version: 5.5.8
-- PHP Version: 5.3.5

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `IIS_DB`
--

-- --------------------------------------------------------

--
-- Table structure for table `accounts`
--
<<<<<<< HEAD

CREATE TABLE IF NOT EXISTS `accounts` (
=======
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `accounts` (
>>>>>>> 2bf14b914ae86deab4be2d17f7272fa1ce1e770e
  `employee_id` int(11) DEFAULT NULL,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  KEY `employee_id` (`employee_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `accounts`
--

<<<<<<< HEAD
INSERT INTO `accounts` (`employee_id`, `username`, `password`) VALUES
(16, 'marejean', 'marejean'),
(21, 'test', 'test'),
(22, 't', 't');

-- --------------------------------------------------------
=======
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
INSERT INTO `accounts` VALUES (16,'marejean','marejean'),(21,'test','test'),(22,'t','t');
/*!40000 ALTER TABLE `accounts` ENABLE KEYS */;
UNLOCK TABLES;
>>>>>>> 2bf14b914ae86deab4be2d17f7272fa1ce1e770e

--
-- Table structure for table `administrator`
--

<<<<<<< HEAD
CREATE TABLE IF NOT EXISTS `administrator` (
=======
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `administrator` (
>>>>>>> 2bf14b914ae86deab4be2d17f7272fa1ce1e770e
  `admin_id` int(11) NOT NULL AUTO_INCREMENT,
  `lastname` varchar(50) DEFAULT NULL,
  `firstname` varchar(50) DEFAULT NULL,
  `gender` varchar(6) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `contact_number` int(11) DEFAULT NULL,
  `username` varchar(20) DEFAULT NULL,
  `password` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`admin_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `administrator`
--

<<<<<<< HEAD
INSERT INTO `administrator` (`admin_id`, `lastname`, `firstname`, `gender`, `birthday`, `address`, `contact_number`, `username`, `password`) VALUES
(2, 'Wew', 'Wew', 'female', '1996-02-15', 'Palo', 2147483647, 'granaderos', 'marjiecasosa'),
(3, 'f', 'f', 'female', '1996-02-15', 'Palo', 2147483647, 'granaderos', 'marjiecasosa'),
(4, 'Perpinosa', 'Marejean', 'female', '1996-02-15', 'Palo', 910798543, 'granaderos', 'marjiecasosa');

-- --------------------------------------------------------
=======
/*!40000 ALTER TABLE `administrator` DISABLE KEYS */;
INSERT INTO `administrator` VALUES (2,'Wew','Wew','female','1996-02-15','Palo',2147483647,'granaderos','marjiecasosa'),(3,'f','f','female','1996-02-15','Palo',2147483647,'granaderos','marjiecasosa'),(4,'Perpinosa','Marejean','female','1996-02-15','Palo',910798543,'granaderos','marjiecasosa');
/*!40000 ALTER TABLE `administrator` ENABLE KEYS */;
UNLOCK TABLES;
>>>>>>> 2bf14b914ae86deab4be2d17f7272fa1ce1e770e

--
-- Table structure for table `admins_transaction`
--

<<<<<<< HEAD
CREATE TABLE IF NOT EXISTS `admins_transaction` (
=======
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admins_transaction` (
  `admins_transaction_id` int(11) NOT NULL AUTO_INCREMENT,
>>>>>>> 2bf14b914ae86deab4be2d17f7272fa1ce1e770e
  `transaction_date` date DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `total_items_bought` double DEFAULT NULL,
  KEY `product_id_admins_transaction_to_products` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admins_transaction`
--

<<<<<<< HEAD
INSERT INTO `admins_transaction` (`transaction_date`, `product_id`, `total_items_bought`) VALUES
('2013-05-16', 62, 7),
('2013-05-17', 63, 8),
('2013-05-17', 64, 78);

-- --------------------------------------------------------
=======
/*!40000 ALTER TABLE `admins_transaction` DISABLE KEYS */;
/*!40000 ALTER TABLE `admins_transaction` ENABLE KEYS */;
UNLOCK TABLES;
>>>>>>> 2bf14b914ae86deab4be2d17f7272fa1ce1e770e

--
-- Table structure for table `employees`
--

<<<<<<< HEAD
CREATE TABLE IF NOT EXISTS `employees` (
=======
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `employees` (
>>>>>>> 2bf14b914ae86deab4be2d17f7272fa1ce1e770e
  `employee_id` int(11) NOT NULL AUTO_INCREMENT,
  `lastname` varchar(50) DEFAULT NULL,
  `firstname` varchar(50) DEFAULT NULL,
  `gender` varchar(6) DEFAULT NULL,
  `birthdate` date DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `contact_number` varchar(11) DEFAULT NULL,
  `job_type` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`employee_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=23 ;

--
-- Dumping data for table `employees`
--

<<<<<<< HEAD
INSERT INTO `employees` (`employee_id`, `lastname`, `firstname`, `gender`, `birthdate`, `address`, `contact_number`, `job_type`) VALUES
(16, 'Perpinosa', 'Marejean', 'female', '1995-02-15', 'lkjskd', '09107985432', 'cashier'),
(17, 'Per', 'Marejean', 'female', '1995-02-15', 'lkjskd', '09107985432', 'cashier'),
(18, 'Per', 'Marejean', 'female', '1995-02-15', 'lkjskd', '09107985432', 'packer'),
(19, 'Per', 'Marejean', 'female', '1995-02-15', 'lkjskd', '09107985432', 'porter'),
(20, 'Wew', 'Marejean', 'female', '1995-01-15', 'lkjskd', '09107985432', 'packer'),
(21, 'fdghgf', 'hgf', 'female', '1995-01-01', 'ghfh', '09107985432', 'cashier'),
(22, 't', 't', 't', '2013-05-15', 't', 't', 'cashier');

-- --------------------------------------------------------
=======
/*!40000 ALTER TABLE `employees` DISABLE KEYS */;
INSERT INTO `employees` VALUES (16,'Perpinosa','Marejean','female','1995-02-15','lkjskd','09107985432','cashier'),(17,'Per','Marejean','female','1995-02-15','lkjskd','09107985432','cashier'),(18,'Per','Marejean','female','1995-02-15','lkjskd','09107985432','packer'),(19,'Per','Marejean','female','1995-02-15','lkjskd','09107985432','porter'),(20,'Wew','Marejean','female','1995-01-15','lkjskd','09107985432','packer'),(21,'fdghgf','hgf','female','1995-01-01','ghfh','09107985432','cashier'),(22,'t','t','t','2013-05-15','t','t','cashier');
/*!40000 ALTER TABLE `employees` ENABLE KEYS */;
UNLOCK TABLES;
>>>>>>> 2bf14b914ae86deab4be2d17f7272fa1ce1e770e

--
-- Table structure for table `fired_employees`
--

<<<<<<< HEAD
CREATE TABLE IF NOT EXISTS `fired_employees` (
  `employee_id` int(11) NOT NULL AUTO_INCREMENT,
  `date_fired` date DEFAULT NULL,
  `reason` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`employee_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=22 ;
=======
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `employees_attendance` (
  `attendance_id` int(11) NOT NULL AUTO_INCREMENT,
  `employee_id` int(11) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  PRIMARY KEY (`attendance_id`),
  KEY `employee_id_employees_attendance_to_employees` (`employee_id`),
  CONSTRAINT `employee_id_employees_attendance_to_employees` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
>>>>>>> 2bf14b914ae86deab4be2d17f7272fa1ce1e770e

--
-- Dumping data for table `fired_employees`
--

<<<<<<< HEAD
INSERT INTO `fired_employees` (`employee_id`, `date_fired`, `reason`) VALUES
(16, '2013-05-02', 'Always absent'),
(17, '2013-05-10', 'Doesn''t have an account'),
(20, '2013-05-02', 'Always Sleeping during work hours'),
(21, '2013-05-02', 'Wala lang');

-- --------------------------------------------------------

=======
/*!40000 ALTER TABLE `employees_attendance` DISABLE KEYS */;
/*!40000 ALTER TABLE `employees_attendance` ENABLE KEYS */;
>>>>>>> 2bf14b914ae86deab4be2d17f7272fa1ce1e770e
--
-- Table structure for table `products`
--

<<<<<<< HEAD
CREATE TABLE IF NOT EXISTS `products` (
  `product_id` int(11) NOT NULL AUTO_INCREMENT,
  `product_name` varchar(100) DEFAULT NULL,
  `bar_code` varchar(50) DEFAULT NULL,
  `product_price` double DEFAULT NULL,
  `number_of_stocks` double DEFAULT NULL,
  `stock_unit` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=65 ;
=======
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `employees_payroll` (
  `payroll_id` int(11) NOT NULL AUTO_INCREMENT,
  `employee_id` int(11) DEFAULT NULL,
  `salary_period` varchar(20) DEFAULT NULL,
  `salary_id` int(11) DEFAULT NULL,
  `paid_days` int(11) DEFAULT NULL,
  `total_salary` double DEFAULT NULL,
  PRIMARY KEY (`payroll_id`),
  KEY `employee_id_employees_payroll_to_employees` (`employee_id`),
  KEY `salary_id_employees_payroll_to_employees_salaries` (`salary_id`),
  CONSTRAINT `employee_id_employees_payroll_to_employees` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `salary_id_employees_payroll_to_employees_salaries` FOREIGN KEY (`salary_id`) REFERENCES `employees_salaries` (`salary_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
>>>>>>> 2bf14b914ae86deab4be2d17f7272fa1ce1e770e

--
-- Dumping data for table `products`
--

<<<<<<< HEAD
INSERT INTO `products` (`product_id`, `product_name`, `bar_code`, `product_price`, `number_of_stocks`, `stock_unit`) VALUES
(48, 'test', '657657657', 7, 34, 'piece'),
(49, 'test01', '6578', 6, 40, 'piece'),
(50, 'test02', '56546546', 6, -2, 'piece'),
(51, 'test03', '543546546', 6, -18, 'piece'),
(52, 'test08', '6546', 9, 9, 'pieces'),
(53, 'test07', '8798', 9, 9, 'pieces'),
(54, 'test06', '6546546', 9, 9, 'pieces'),
(55, 'test04', '567547', 9, 9, 'pieces'),
(56, 'test05', '78678', 9, 9, 'pieces'),
(57, 'marejean kjdkfjd jiodjfmmmmmmmmmmm111', '567546', 5, 4, 'pieces'),
(58, 'gfd', '756765', 4, 4, 'piece'),
(59, '   ', '675756', 5, 4, 'g'),
(60, 'fgfd', '  5645654   ', 56, 4, 'piece'),
(61, '    fg   fd', '56546', 56, 4, 'pieces'),
(62, 'Sample90', '896875765', 67, 7, 'piece'),
(63, 'Sample_Pro', '76875687675', 87, 8, 'piece'),
(64, 'Sample898', '9867875', 78, 78, 'piece');

-- --------------------------------------------------------
=======
/*!40000 ALTER TABLE `employees_payroll` DISABLE KEYS */;
/*!40000 ALTER TABLE `employees_payroll` ENABLE KEYS */;
UNLOCK TABLES;
>>>>>>> 2bf14b914ae86deab4be2d17f7272fa1ce1e770e

--
-- Table structure for table `product_to_supplier`
--

<<<<<<< HEAD
CREATE TABLE IF NOT EXISTS `product_to_supplier` (
  `product_id` int(11) DEFAULT NULL,
  `supplier_id` int(11) DEFAULT NULL,
  KEY `product_id` (`product_id`),
  KEY `supplier_id` (`supplier_id`)
=======
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `employees_salaries` (
  `salary_id` int(11) NOT NULL AUTO_INCREMENT,
  `job_type` varchar(20) DEFAULT NULL,
  `basic_salary_monthly` double DEFAULT NULL,
  PRIMARY KEY (`salary_id`)
>>>>>>> 2bf14b914ae86deab4be2d17f7272fa1ce1e770e
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product_to_supplier`
--

<<<<<<< HEAD
INSERT INTO `product_to_supplier` (`product_id`, `supplier_id`) VALUES
(62, 5),
(63, 3),
(64, 1);

-- --------------------------------------------------------
=======
/*!40000 ALTER TABLE `employees_salaries` DISABLE KEYS */;
/*!40000 ALTER TABLE `employees_salaries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fired_employees`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `fired_employees` (
  `employee_id` int(11) NOT NULL AUTO_INCREMENT,
  `date_fired` date DEFAULT NULL,
  `reason` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`employee_id`),
  CONSTRAINT `fired_employees_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
>>>>>>> 2bf14b914ae86deab4be2d17f7272fa1ce1e770e

--
-- Table structure for table `suppliers`
--

<<<<<<< HEAD
CREATE TABLE IF NOT EXISTS `suppliers` (
  `supplier_id` int(11) NOT NULL AUTO_INCREMENT,
  `company_name` varchar(200) DEFAULT NULL,
  `address` varchar(200) DEFAULT NULL,
  `contact_number` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`supplier_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=21 ;
=======
/*!40000 ALTER TABLE `fired_employees` DISABLE KEYS */;
INSERT INTO `fired_employees` VALUES (16,'2013-05-02','Always absent'),(17,'2013-05-10','Doesn\'t have an account'),(20,'2013-05-02','Always Sleeping during work hours'),(21,'2013-05-02','Wala lang');
/*!40000 ALTER TABLE `fired_employees` ENABLE KEYS */;
UNLOCK TABLES;
>>>>>>> 2bf14b914ae86deab4be2d17f7272fa1ce1e770e

--
-- Dumping data for table `suppliers`
--

<<<<<<< HEAD
INSERT INTO `suppliers` (`supplier_id`, `company_name`, `address`, `contact_number`) VALUES
(1, 'W.E. Foods', 'Metro Manila', '09232478294'),
(2, 'Unilever', 'Caloocan', '9218321843214'),
(3, 'Ewan', 'khjfd/f,m;lsd', '878'),
(4, 'Sample01', 'Palo', '8973894632748'),
(5, 'Sample02', 'jhkuy', '788'),
(6, 'Sample03', 'JHdjskhd', '89687869'),
(7, 'Sample04', 'lkfdiosyuf', '87876'),
(8, 'Sample05', 'nbjkdfhsd', '87678'),
(9, 'Sample06', 'dskfjhdskjfnk', '786786'),
(10, 'Sample07', 'kjdifusdi', '89789'),
(11, 'Sample08', 'lkdjfdsf', '7686'),
(12, 'Sample09', 'hjk hjgbj', '7679'),
(13, 'Sample10', 'jhb', '878'),
(14, 'Sample11', 'lkjsdnih', '78'),
(15, 'Sample12', 'klhjnb', '7678'),
(16, 'Sample13', 'Sample13', '40958943578'),
(17, 'Sample14', 'Sample14', '8798'),
(18, 'Sample1312', 'kljk', '87'),
(19, 'samp', 'kjkh', '878'),
(20, 'Sample3443', 'fsdfds', '4543');

-- --------------------------------------------------------
=======
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `product_id` int(11) NOT NULL AUTO_INCREMENT,
  `product_name` varchar(100) DEFAULT NULL,
  `bar_code` varchar(50) DEFAULT NULL,
  `product_price` double DEFAULT NULL,
  `number_of_stocks` double DEFAULT NULL,
  `stock_unit` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (48,'test','657657657',7,-58,'piece'),(49,'test01','6578',6,-40,'piece'),(50,'test02','56546546',6,1,'piece'),(51,'test03','543546546',6,5,'piece'),(52,'test08','6546',9,9,'pieces'),(53,'test07','8798',9,9,'pieces'),(54,'test06','6546546',9,9,'pieces'),(55,'test04','567547',9,9,'pieces'),(56,'test05','78678',9,9,'pieces'),(57,'marejean kjdkfjd jiodjfmmmmmmmmmmmmmmmmmmmmdsf','567546',5,4,'pieces'),(58,'gfd','756765',4,4,'piece'),(59,'   ','675756',5,4,'piece'),(60,'fgfd','  5645654   ',56,4,'piece'),(61,'    fg   fd','56546',56,4,'pieces');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;
>>>>>>> 2bf14b914ae86deab4be2d17f7272fa1ce1e770e

--
-- Table structure for table `transactions`
--

<<<<<<< HEAD
CREATE TABLE IF NOT EXISTS `transactions` (
=======
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `transactions` (
>>>>>>> 2bf14b914ae86deab4be2d17f7272fa1ce1e770e
  `transaction_id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) DEFAULT NULL,
  `employee_id` int(11) DEFAULT NULL,
  `transaction_date` date NOT NULL,
  `transaction_time` time NOT NULL,
  PRIMARY KEY (`transaction_id`),
  KEY `product_id_transactions_to_products` (`product_id`),
  KEY `employee_id_transactions_to_employees` (`employee_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=86 ;

--
-- Dumping data for table `transactions`
--

<<<<<<< HEAD
INSERT INTO `transactions` (`transaction_id`, `product_id`, `employee_id`, `transaction_date`, `transaction_time`) VALUES
(79, 48, NULL, '2013-05-10', '14:15:03'),
(80, 49, 22, '2013-05-11', '17:13:50'),
(81, 50, 22, '2013-05-11', '17:13:50'),
(82, 48, 22, '2013-05-11', '17:13:50'),
(83, 48, 22, '2013-05-16', '17:32:51'),
(84, 50, 22, '2013-05-16', '17:32:51'),
(85, 51, 22, '2013-05-16', '17:32:51');

-- --------------------------------------------------------
=======
/*!40000 ALTER TABLE `transactions` DISABLE KEYS */;
INSERT INTO `transactions` VALUES (79,48,NULL,'2013-05-10','14:15:03'),(80,49,22,'2013-05-11','17:13:50'),(81,50,22,'2013-05-11','17:13:50'),(82,48,22,'2013-05-11','17:13:50');
/*!40000 ALTER TABLE `transactions` ENABLE KEYS */;
UNLOCK TABLES;
>>>>>>> 2bf14b914ae86deab4be2d17f7272fa1ce1e770e

--
-- Table structure for table `transactions_info`
--

<<<<<<< HEAD
CREATE TABLE IF NOT EXISTS `transactions_info` (
=======
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `transactions_info` (
>>>>>>> 2bf14b914ae86deab4be2d17f7272fa1ce1e770e
  `transaction_id` int(11) DEFAULT NULL,
  `number_of_items` int(11) DEFAULT NULL,
  KEY `transaction_id_transactions_info_to_transactions` (`transaction_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `transactions_info`
--

<<<<<<< HEAD
INSERT INTO `transactions_info` (`transaction_id`, `number_of_items`) VALUES
(79, 65),
(80, 45),
(81, 4),
(82, 65),
(83, 34),
(84, 3),
(85, 23);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `accounts`
--
ALTER TABLE `accounts`
  ADD CONSTRAINT `accounts_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `admins_transaction`
--
ALTER TABLE `admins_transaction`
  ADD CONSTRAINT `product_id_admins_transaction_to_products` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `fired_employees`
--
ALTER TABLE `fired_employees`
  ADD CONSTRAINT `fired_employees_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE;
=======
/*!40000 ALTER TABLE `transactions_info` DISABLE KEYS */;
INSERT INTO `transactions_info` VALUES (79,65),(80,45),(81,4),(82,65);
/*!40000 ALTER TABLE `transactions_info` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;
>>>>>>> 2bf14b914ae86deab4be2d17f7272fa1ce1e770e

--
-- Constraints for table `product_to_supplier`
--
ALTER TABLE `product_to_supplier`
  ADD CONSTRAINT `product_to_supplier_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `product_to_supplier_ibfk_2` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers` (`supplier_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `employee_id_transactions_to_employees` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `product_id_transactions_to_products` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `transactions_info`
--
ALTER TABLE `transactions_info`
  ADD CONSTRAINT `transaction_id_transactions_info_to_transactions` FOREIGN KEY (`transaction_id`) REFERENCES `transactions` (`transaction_id`) ON DELETE CASCADE ON UPDATE CASCADE;

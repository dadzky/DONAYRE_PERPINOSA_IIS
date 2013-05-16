-- MySQL dump 10.13  Distrib 5.5.8, for Linux (i686)
--
-- Host: localhost    Database: IIS_DB
-- ------------------------------------------------------
-- Server version	5.5.8

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `accounts`
--

DROP TABLE IF EXISTS `accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `accounts` (
  `employee_id` int(11) DEFAULT NULL,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  KEY `employee_id` (`employee_id`),
  CONSTRAINT `accounts_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts`
--

LOCK TABLES `accounts` WRITE;
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
INSERT INTO `accounts` VALUES (16,'marejean','marejean'),(21,'test','test'),(22,'t','t');
/*!40000 ALTER TABLE `accounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `administrator`
--

DROP TABLE IF EXISTS `administrator`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `administrator` (
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `administrator`
--

LOCK TABLES `administrator` WRITE;
/*!40000 ALTER TABLE `administrator` DISABLE KEYS */;
INSERT INTO `administrator` VALUES (2,'Wew','Wew','female','1996-02-15','Palo',2147483647,'granaderos','marjiecasosa'),(3,'f','f','female','1996-02-15','Palo',2147483647,'granaderos','marjiecasosa'),(4,'Perpinosa','Marejean','female','1996-02-15','Palo',910798543,'granaderos','marjiecasosa');
/*!40000 ALTER TABLE `administrator` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admins_transaction`
--

DROP TABLE IF EXISTS `admins_transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admins_transaction` (
  `admins_transaction_id` int(11) NOT NULL AUTO_INCREMENT,
  `transaction_date` date DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `total_items_bought` double DEFAULT NULL,
  `supplier` varchar(100) DEFAULT NULL,
  `supplier_address` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`admins_transaction_id`),
  KEY `product_id_admins_transaction_to_products` (`product_id`),
  CONSTRAINT `product_id_admins_transaction_to_products` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admins_transaction`
--

LOCK TABLES `admins_transaction` WRITE;
/*!40000 ALTER TABLE `admins_transaction` DISABLE KEYS */;
/*!40000 ALTER TABLE `admins_transaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employees`
--

DROP TABLE IF EXISTS `employees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `employees` (
  `employee_id` int(11) NOT NULL AUTO_INCREMENT,
  `lastname` varchar(50) DEFAULT NULL,
  `firstname` varchar(50) DEFAULT NULL,
  `gender` varchar(6) DEFAULT NULL,
  `birthdate` date DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `contact_number` varchar(11) DEFAULT NULL,
  `job_type` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`employee_id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employees`
--

LOCK TABLES `employees` WRITE;
/*!40000 ALTER TABLE `employees` DISABLE KEYS */;
INSERT INTO `employees` VALUES (16,'Perpinosa','Marejean','female','1995-02-15','lkjskd','09107985432','cashier'),(17,'Per','Marejean','female','1995-02-15','lkjskd','09107985432','cashier'),(18,'Per','Marejean','female','1995-02-15','lkjskd','09107985432','packer'),(19,'Per','Marejean','female','1995-02-15','lkjskd','09107985432','porter'),(20,'Wew','Marejean','female','1995-01-15','lkjskd','09107985432','packer'),(21,'fdghgf','hgf','female','1995-01-01','ghfh','09107985432','cashier'),(22,'t','t','t','2013-05-15','t','t','cashier');
/*!40000 ALTER TABLE `employees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employees_attendance`
--

DROP TABLE IF EXISTS `employees_attendance`;
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

--
-- Dumping data for table `employees_attendance`
--

LOCK TABLES `employees_attendance` WRITE;
/*!40000 ALTER TABLE `employees_attendance` DISABLE KEYS */;
/*!40000 ALTER TABLE `employees_attendance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employees_payroll`
--

DROP TABLE IF EXISTS `employees_payroll`;
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

--
-- Dumping data for table `employees_payroll`
--

LOCK TABLES `employees_payroll` WRITE;
/*!40000 ALTER TABLE `employees_payroll` DISABLE KEYS */;
/*!40000 ALTER TABLE `employees_payroll` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employees_salaries`
--

DROP TABLE IF EXISTS `employees_salaries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `employees_salaries` (
  `salary_id` int(11) NOT NULL AUTO_INCREMENT,
  `job_type` varchar(20) DEFAULT NULL,
  `basic_salary_monthly` double DEFAULT NULL,
  PRIMARY KEY (`salary_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employees_salaries`
--

LOCK TABLES `employees_salaries` WRITE;
/*!40000 ALTER TABLE `employees_salaries` DISABLE KEYS */;
/*!40000 ALTER TABLE `employees_salaries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fired_employees`
--

DROP TABLE IF EXISTS `fired_employees`;
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

--
-- Dumping data for table `fired_employees`
--

LOCK TABLES `fired_employees` WRITE;
/*!40000 ALTER TABLE `fired_employees` DISABLE KEYS */;
INSERT INTO `fired_employees` VALUES (16,'2013-05-02','Always absent'),(17,'2013-05-10','Doesn\'t have an account'),(20,'2013-05-02','Always Sleeping during work hours'),(21,'2013-05-02','Wala lang');
/*!40000 ALTER TABLE `fired_employees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
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

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (48,'test','657657657',7,-58,'piece'),(49,'test01','6578',6,-40,'piece'),(50,'test02','56546546',6,1,'piece'),(51,'test03','543546546',6,5,'piece'),(52,'test08','6546',9,9,'pieces'),(53,'test07','8798',9,9,'pieces'),(54,'test06','6546546',9,9,'pieces'),(55,'test04','567547',9,9,'pieces'),(56,'test05','78678',9,9,'pieces'),(57,'marejean kjdkfjd jiodjfmmmmmmmmmmmmmmmmmmmmdsf','567546',5,4,'pieces'),(58,'gfd','756765',4,4,'piece'),(59,'   ','675756',5,4,'piece'),(60,'fgfd','  5645654   ',56,4,'piece'),(61,'    fg   fd','56546',56,4,'pieces');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transactions`
--

DROP TABLE IF EXISTS `transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `transactions` (
  `transaction_id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) DEFAULT NULL,
  `employee_id` int(11) DEFAULT NULL,
  `transaction_date` date NOT NULL,
  `transaction_time` time NOT NULL,
  PRIMARY KEY (`transaction_id`),
  KEY `product_id_transactions_to_products` (`product_id`),
  KEY `employee_id_transactions_to_employees` (`employee_id`),
  CONSTRAINT `employee_id_transactions_to_employees` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `product_id_transactions_to_products` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=83 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactions`
--

LOCK TABLES `transactions` WRITE;
/*!40000 ALTER TABLE `transactions` DISABLE KEYS */;
INSERT INTO `transactions` VALUES (79,48,NULL,'2013-05-10','14:15:03'),(80,49,22,'2013-05-11','17:13:50'),(81,50,22,'2013-05-11','17:13:50'),(82,48,22,'2013-05-11','17:13:50');
/*!40000 ALTER TABLE `transactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transactions_info`
--

DROP TABLE IF EXISTS `transactions_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `transactions_info` (
  `transaction_id` int(11) DEFAULT NULL,
  `number_of_items` int(11) DEFAULT NULL,
  KEY `transaction_id_transactions_info_to_transactions` (`transaction_id`),
  CONSTRAINT `transaction_id_transactions_info_to_transactions` FOREIGN KEY (`transaction_id`) REFERENCES `transactions` (`transaction_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactions_info`
--

LOCK TABLES `transactions_info` WRITE;
/*!40000 ALTER TABLE `transactions_info` DISABLE KEYS */;
INSERT INTO `transactions_info` VALUES (79,65),(80,45),(81,4),(82,65);
/*!40000 ALTER TABLE `transactions_info` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2013-05-14 17:10:05

-- phpMyAdmin SQL Dump
-- version 3.3.9
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Apr 14, 2013 at 10:42 AM
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
-- Table structure for table `admins_transaction`
--

CREATE TABLE IF NOT EXISTS `admins_transaction` (
  `admins_transaction_id` int(11) NOT NULL AUTO_INCREMENT,
  `transaction_date` date DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `total_items_bought` double DEFAULT NULL,
  `supplier` varchar(100) DEFAULT NULL,
  `supplier_address` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`admins_transaction_id`),
  KEY `product_id_admins_transaction_to_products` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `admins_transaction`
--


-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE IF NOT EXISTS `employees` (
  `employee_id` int(11) NOT NULL AUTO_INCREMENT,
  `lastname` varchar(50) DEFAULT NULL,
  `firstname` varchar(50) DEFAULT NULL,
  `birthdate` date DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `contact_number` int(11) DEFAULT NULL,
  `job_type` varchar(20) DEFAULT NULL,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`employee_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `employees`
--


-- --------------------------------------------------------

--
-- Table structure for table `employees_attendance`
--

CREATE TABLE IF NOT EXISTS `employees_attendance` (
  `attendance_id` int(11) NOT NULL AUTO_INCREMENT,
  `employee_id` int(11) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  PRIMARY KEY (`attendance_id`),
  KEY `employee_id_employees_attendance_to_employees` (`employee_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `employees_attendance`
--


-- --------------------------------------------------------

--
-- Table structure for table `employees_payroll`
--

CREATE TABLE IF NOT EXISTS `employees_payroll` (
  `payroll_id` int(11) NOT NULL AUTO_INCREMENT,
  `employee_id` int(11) DEFAULT NULL,
  `salary_period` varchar(20) DEFAULT NULL,
  `salary_id` int(11) DEFAULT NULL,
  `paid_days` int(11) DEFAULT NULL,
  `total_salary` double DEFAULT NULL,
  PRIMARY KEY (`payroll_id`),
  KEY `employee_id_employees_payroll_to_employees` (`employee_id`),
  KEY `salary_id_employees_payroll_to_employees_salaries` (`salary_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `employees_payroll`
--


-- --------------------------------------------------------

--
-- Table structure for table `employees_salaries`
--

CREATE TABLE IF NOT EXISTS `employees_salaries` (
  `salary_id` int(11) NOT NULL AUTO_INCREMENT,
  `job_type` varchar(20) DEFAULT NULL,
  `basic_salary_monthly` double DEFAULT NULL,
  PRIMARY KEY (`salary_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `employees_salaries`
--


-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE IF NOT EXISTS `products` (
  `product_id` int(11) NOT NULL AUTO_INCREMENT,
  `product_name` varchar(100) DEFAULT NULL,
  `product_price` double DEFAULT NULL,
  `number_of_stocks` double DEFAULT NULL,
  `stock_unit` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `products`
--


-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE IF NOT EXISTS `transactions` (
  `transaction_id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) DEFAULT NULL,
  `employee_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`transaction_id`),
  KEY `product_id_transactions_to_products` (`product_id`),
  KEY `employee_id_transactions_to_employees` (`employee_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `transactions`
--


-- --------------------------------------------------------

--
-- Table structure for table `transactions_info`
--

CREATE TABLE IF NOT EXISTS `transactions_info` (
  `transaction_id` int(11) DEFAULT NULL,
  `number_of_items` int(11) DEFAULT NULL,
  `transaction_date` date DEFAULT NULL,
  KEY `transaction_id_transactions_info_to_transactions` (`transaction_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `transactions_info`
--


--
-- Constraints for dumped tables
--

--
-- Constraints for table `admins_transaction`
--
ALTER TABLE `admins_transaction`
  ADD CONSTRAINT `product_id_admins_transaction_to_products` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `employees_attendance`
--
ALTER TABLE `employees_attendance`
  ADD CONSTRAINT `employee_id_employees_attendance_to_employees` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `employees_payroll`
--
ALTER TABLE `employees_payroll`
  ADD CONSTRAINT `salary_id_employees_payroll_to_employees_salaries` FOREIGN KEY (`salary_id`) REFERENCES `employees_salaries` (`salary_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `employee_id_employees_payroll_to_employees` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE;

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

-- phpMyAdmin SQL Dump
-- version 3.3.9
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: May 06, 2013 at 11:04 AM
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

CREATE TABLE IF NOT EXISTS `accounts` (
  `employee_id` int(11) DEFAULT NULL,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  KEY `employee_id` (`employee_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (`employee_id`, `username`, `password`) VALUES
(16, 'marejean', 'marejean'),
(21, 'test', 'test'),
(22, 't', 't');

-- --------------------------------------------------------

--
-- Table structure for table `administrator`
--

CREATE TABLE IF NOT EXISTS `administrator` (
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

INSERT INTO `administrator` (`admin_id`, `lastname`, `firstname`, `gender`, `birthday`, `address`, `contact_number`, `username`, `password`) VALUES
(2, 'Wew', 'Wew', 'female', '1996-02-15', 'Palo', 2147483647, 'granaderos', 'marjiecasosa'),
(3, 'f', 'f', 'female', '1996-02-15', 'Palo', 2147483647, 'granaderos', 'marjiecasosa'),
(4, 'Perpinosa', 'Marejean', 'female', '1996-02-15', 'Palo', 910798543, 'granaderos', 'marjiecasosa');

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

INSERT INTO `employees` (`employee_id`, `lastname`, `firstname`, `gender`, `birthdate`, `address`, `contact_number`, `job_type`) VALUES
(16, 'Perpinosa', 'Marejean', 'female', '1995-02-15', 'lkjskd', '09107985432', 'cashier'),
(17, 'Per', 'Marejean', 'female', '1995-02-15', 'lkjskd', '09107985432', 'cashier'),
(18, 'Per', 'Marejean', 'female', '1995-02-15', 'lkjskd', '09107985432', 'packer'),
(19, 'Per', 'Marejean', 'female', '1995-02-15', 'lkjskd', '09107985432', 'porter'),
(20, 'Wew', 'Marejean', 'female', '1995-01-15', 'lkjskd', '09107985432', 'packer'),
(21, 'fdghgf', 'hgf', 'female', '1995-01-01', 'ghfh', '09107985432', 'cashier'),
(22, 't', 't', 't', '2013-05-15', 't', 't', 'cashier');

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
-- Table structure for table `fired_employees`
--

CREATE TABLE IF NOT EXISTS `fired_employees` (
  `employee_id` int(11) NOT NULL AUTO_INCREMENT,
  `date_fired` date DEFAULT NULL,
  `reason` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`employee_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=22 ;

--
-- Dumping data for table `fired_employees`
--

INSERT INTO `fired_employees` (`employee_id`, `date_fired`, `reason`) VALUES
(16, '2013-05-02', 'Always absent'),
(20, '2013-05-02', 'Always Sleeping during work hours'),
(21, '2013-05-02', 'Wala lang');

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=48 ;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`product_id`, `product_name`, `product_price`, `number_of_stocks`, `stock_unit`) VALUES
(38, 'sample', 17, 58, 'piece'),
(39, 'sample1', 17, -24, 'pieces'),
(40, 'sample3', 17, 127, 'pieces'),
(41, 'sample4', 17.5, 75, 'pieces'),
(42, 'sample5', 17.35, -25, 'pieces'),
(43, 'sample6', 17, 123, 'pieces'),
(44, 'sample7', 17, 832, 'pieces'),
(45, 'sample8', 17, 12321, 'pieces'),
(46, 'sample9', 17, -24, 'pieces'),
(47, 'sample10', 17.32, 12312, 'pieces');

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE IF NOT EXISTS `transactions` (
  `transaction_id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) DEFAULT NULL,
  `employee_id` int(11) DEFAULT NULL,
  `transaction_date` date NOT NULL,
  `transaction_time` time NOT NULL,
  PRIMARY KEY (`transaction_id`),
  KEY `product_id_transactions_to_products` (`product_id`),
  KEY `employee_id_transactions_to_employees` (`employee_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=79 ;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`transaction_id`, `product_id`, `employee_id`, `transaction_date`, `transaction_time`) VALUES
(75, 39, 22, '2013-05-06', '15:42:57'),
(76, 42, 22, '2013-05-06', '15:42:57'),
(77, 38, 22, '2013-05-06', '15:45:53'),
(78, 40, 22, '2013-05-06', '15:45:53');

-- --------------------------------------------------------

--
-- Table structure for table `transactions_info`
--

CREATE TABLE IF NOT EXISTS `transactions_info` (
  `transaction_id` int(11) DEFAULT NULL,
  `number_of_items` int(11) DEFAULT NULL,
  KEY `transaction_id_transactions_info_to_transactions` (`transaction_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `transactions_info`
--

INSERT INTO `transactions_info` (`transaction_id`, `number_of_items`) VALUES
(75, 199),
(76, 123),
(77, 140),
(78, 48);

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
-- Constraints for table `employees_attendance`
--
ALTER TABLE `employees_attendance`
  ADD CONSTRAINT `employee_id_employees_attendance_to_employees` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `employees_payroll`
--
ALTER TABLE `employees_payroll`
  ADD CONSTRAINT `employee_id_employees_payroll_to_employees` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `salary_id_employees_payroll_to_employees_salaries` FOREIGN KEY (`salary_id`) REFERENCES `employees_salaries` (`salary_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `fired_employees`
--
ALTER TABLE `fired_employees`
  ADD CONSTRAINT `fired_employees_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE;

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

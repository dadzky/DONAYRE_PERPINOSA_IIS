-- phpMyAdmin SQL Dump
-- version 3.3.9
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: May 03, 2013 at 09:07 AM
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
(17, 'test', 'test');

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=22 ;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`employee_id`, `lastname`, `firstname`, `gender`, `birthdate`, `address`, `contact_number`, `job_type`) VALUES
(16, 'Perpinosa', 'Marejean', 'female', '1995-02-15', 'lkjskd', '09107985432', 'cashier'),
(17, 'Per', 'Marejean', 'female', '1995-02-15', 'lkjskd', '09107985432', 'cashier'),
(18, 'Per', 'Marejean', 'female', '1995-02-15', 'lkjskd', '09107985432', 'packer'),
(19, 'Per', 'Marejean', 'female', '1995-02-15', 'lkjskd', '09107985432', 'porter'),
(20, 'Wew', 'Marejean', 'female', '1995-01-15', 'lkjskd', '09107985432', 'packer'),
(21, 'fdghgf', 'hgf', 'female', '1995-01-01', 'ghfh', '09107985432', 'porter');

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
(38, 'sample', 17, -34, 'piece'),
(39, 'sample1', 17, -66, 'pieces'),
(40, 'sample3', 17, -46, 'pieces'),
(41, 'sample4', 17, -36, 'pieces'),
(42, 'sample5', 17, -116, 'pieces'),
(43, 'sample6', 17, 8, 'pieces'),
(44, 'sample7', 17, -66, 'pieces'),
(45, 'sample8', 17, -24, 'pieces'),
(46, 'sample9', 17, 8, 'pieces'),
(47, 'sample10', 17, -4, 'pieces');

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=64 ;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`transaction_id`, `product_id`, `employee_id`, `transaction_date`, `transaction_time`) VALUES
(51, 39, 16, '2013-05-03', '13:03:37'),
(52, 41, 17, '2013-04-02', '13:04:18'),
(53, 42, 16, '2013-05-02', '13:07:07'),
(54, 41, 17, '2013-05-03', '14:03:44'),
(55, 42, 17, '2013-05-04', '14:03:44'),
(56, 40, 17, '2013-05-04', '14:03:44'),
(57, 40, 16, '2013-05-04', '14:03:44'),
(58, 38, 16, '2013-05-08', '14:03:44'),
(59, 44, 16, '2013-05-08', '14:03:44'),
(60, 47, 16, '2013-05-08', '14:03:44'),
(61, 45, 17, '2013-05-04', '14:03:44'),
(62, 44, 17, '2013-03-03', '14:05:38'),
(63, 40, 17, '2013-05-03', '14:27:26');

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
(51, 32),
(52, 32),
(53, 123),
(54, 12),
(55, 1),
(56, 42),
(57, 42),
(58, 42),
(59, 42),
(60, 12),
(61, 32),
(62, 32),
(63, 12);

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

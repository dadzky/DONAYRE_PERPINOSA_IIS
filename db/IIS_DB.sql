-- phpMyAdmin SQL Dump
-- version 3.3.9
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: May 23, 2013 at 02:01 PM
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
(22, 't', 't'),
(23, 'Nick', 'mk'),
(24, 'lo', 'lo'),
(25, 'po', 'po'),
(26, 'ko', 'ko'),
(27, 'kl', 'kl'),
(28, 'io', 'io'),
(29, 'wew', 'yu');

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
  `transaction_date` date DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `total_items_bought` double DEFAULT NULL,
  KEY `product_id_admins_transaction_to_products` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admins_transaction`
--

INSERT INTO `admins_transaction` (`transaction_date`, `product_id`, `total_items_bought`) VALUES
('2013-05-16', 62, 7),
('2013-05-23', 69, 78),
('2013-05-23', 70, 24),
('2013-05-23', 71, 50),
('2013-05-23', 72, 8),
('2013-05-23', 73, 90),
('2013-05-23', 74, 100);

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=30 ;

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
(22, 't', 't', 't', '2013-05-15', 't', 't', 'cashier'),
(23, 'Caingay', 'Nick', 'male', '1988-03-14', 'Kannga', '09234567895', 'cashier'),
(24, ' Canonigo', 'Aldrin', 'male', '1984-10-07', ' Merida', '09675439854', 'cashier'),
(25, ' Borja', 'Elizabeth', 'female', '1982-06-06', ' Ormoc', '09108654256', 'cashier'),
(26, ' Rebuya', 'Ivy', 'female', '1983-05-12', ' Kangga', '09345367897', 'cashier'),
(27, ' Lampong', 'Maria Stephanie', 'female', '1988-05-09', ' Palompon', '09786785432', 'cashier'),
(28, 'Ignacio ', 'Lorriza Mae', 'female', '1994-02-02', 'Palompon', '09168965430', 'cashier'),
(29, ' Codera', 'Efthel', 'female', '1995-05-04', 'Palompon', '12345678900', 'cashier');

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
(17, '2013-05-10', 'Doesn''t have an account'),
(20, '2013-05-02', 'Always Sleeping during work hours'),
(21, '2013-05-02', 'Wala lang');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE IF NOT EXISTS `products` (
  `product_id` int(11) NOT NULL AUTO_INCREMENT,
  `product_name` varchar(100) DEFAULT NULL,
  `bar_code` varchar(50) DEFAULT NULL,
  `product_price` double DEFAULT NULL,
  `number_of_stocks` double DEFAULT NULL,
  `stock_unit` varchar(20) DEFAULT NULL,
  `product_genre` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=75 ;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`product_id`, `product_name`, `bar_code`, `product_price`, `number_of_stocks`, `stock_unit`, `product_genre`) VALUES
(48, 'test', '657657657', 7, 0, 'piece', 'Candies'),
(49, 'test01', '6578', 6, 40, 'piece', 'Candies'),
(50, 'test02', '56546546', 6, -2, 'piece', 'Candies'),
(51, 'test03', '543546546', 6, -18, 'piece', 'Candies'),
(52, 'test08', '6546', 9, 9, 'pieces', 'Candies'),
(53, 'test07', '8798', 9, 9, 'pieces', 'Candies'),
(54, 'test06', '6546546', 9, -36, 'pieces', 'Candies'),
(55, 'test04', '567547', 9, 9, 'pieces', 'Candies'),
(56, 'test05', '78678', 9, 9, 'pieces', 'Candies'),
(62, 'Sample90', '896875765', 67, 7, 'piece', 'Candies'),
(69, 'Shelame love Diosdado', '56676897', 78, 78, 'pack', 'Candies'),
(70, 'Sample908', '8976785', 12, 24, 'pack', 'Candies'),
(71, 'Sample78784', '7687456', 50, 50, 'g', 'Candies'),
(72, 'Sample837483', '78567576', 60, 8, 'piece', 'Candies'),
(73, 'Sample6478', '76856', 900, 90, 'piece', 'Candies'),
(74, 'Family Sardines', '67978567476', 15, 100, 'piece', 'Can Goods');

-- --------------------------------------------------------

--
-- Table structure for table `product_to_supplier`
--

CREATE TABLE IF NOT EXISTS `product_to_supplier` (
  `product_id` int(11) DEFAULT NULL,
  `supplier_id` int(11) DEFAULT NULL,
  KEY `product_id` (`product_id`),
  KEY `supplier_id` (`supplier_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product_to_supplier`
--

INSERT INTO `product_to_supplier` (`product_id`, `supplier_id`) VALUES
(62, 5),
(69, 23),
(70, 5),
(71, 43),
(72, 44),
(73, 45),
(74, 45);

-- --------------------------------------------------------

--
-- Table structure for table `sales`
--

CREATE TABLE IF NOT EXISTS `sales` (
  `transaction_id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) DEFAULT NULL,
  `employee_id` int(11) DEFAULT NULL,
  `transaction_date` date NOT NULL,
  `transaction_time` time NOT NULL,
  PRIMARY KEY (`transaction_id`),
  KEY `product_id_transactions_to_products` (`product_id`),
  KEY `employee_id_transactions_to_employees` (`employee_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=88 ;

--
-- Dumping data for table `sales`
--

INSERT INTO `sales` (`transaction_id`, `product_id`, `employee_id`, `transaction_date`, `transaction_time`) VALUES
(79, 48, NULL, '2013-05-10', '14:15:03'),
(80, 49, 22, '2013-05-11', '17:13:50'),
(81, 50, 22, '2013-05-11', '17:13:50'),
(82, 48, 22, '2013-05-11', '17:13:50'),
(83, 48, 22, '2013-05-16', '17:32:51'),
(84, 50, 22, '2013-05-16', '17:32:51'),
(85, 51, 22, '2013-05-16', '17:32:51'),
(86, 48, 22, '2013-05-20', '17:09:19'),
(87, 54, 22, '2013-05-20', '17:09:19');

-- --------------------------------------------------------

--
-- Table structure for table `suppliers`
--

CREATE TABLE IF NOT EXISTS `suppliers` (
  `supplier_id` int(11) NOT NULL AUTO_INCREMENT,
  `company_name` varchar(200) DEFAULT NULL,
  `address` varchar(200) DEFAULT NULL,
  `contact_number` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`supplier_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=46 ;

--
-- Dumping data for table `suppliers`
--

INSERT INTO `suppliers` (`supplier_id`, `company_name`, `address`, `contact_number`) VALUES
(5, 'Sample02', 'jhkuy', '788'),
(12, 'Sample09', 'hjk hjgbj', '7679'),
(23, '123333', '123', '123'),
(31, 'qqqeqe', 'qweqwe', '123'),
(43, 'Company15', 'Palo', '7898732648'),
(44, 'Company90', 'Tacloban', '9867798567'),
(45, 'Alinayre Company', 'Kanangga Merida', '9867896');

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
(79, 65),
(80, 45),
(81, 4),
(82, 65),
(83, 34),
(84, 3),
(85, 23),
(86, 34),
(87, 45);

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

--
-- Constraints for table `product_to_supplier`
--
ALTER TABLE `product_to_supplier`
  ADD CONSTRAINT `product_to_supplier_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `product_to_supplier_ibfk_2` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers` (`supplier_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `sales`
--
ALTER TABLE `sales`
  ADD CONSTRAINT `employee_id_transactions_to_employees` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `product_id_transactions_to_products` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `transactions_info`
--
ALTER TABLE `transactions_info`
  ADD CONSTRAINT `transaction_id_transactions_info_to_transactions` FOREIGN KEY (`transaction_id`) REFERENCES `sales` (`transaction_id`) ON DELETE CASCADE ON UPDATE CASCADE;

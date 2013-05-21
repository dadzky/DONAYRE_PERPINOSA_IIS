-- phpMyAdmin SQL Dump
-- version 3.4.11.1deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: May 20, 2013 at 04:51 PM
-- Server version: 5.5.29
-- PHP Version: 5.4.6-1ubuntu1.2

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


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
('2013-05-17', 63, 8),
('2013-05-20', 65, 34),
('2013-05-20', 66, 3);

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
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=67 ;

--
-- Dumping data for table `products`
--

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
(62, 'Sample90', '896875765', 67, 7, 'piece'),
(63, 'Sample_Pro', '76875687675', 87, 8, 'piece'),
(65, 'aasas', '121212', 1100, 34, 'pack'),
(66, ' asda', 'asds', 34, 3, 'packs');

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
(63, 3),
(65, 31),
(66, 12);

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=86 ;

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
(85, 51, 22, '2013-05-16', '17:32:51');

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=35 ;

--
-- Dumping data for table `suppliers`
--

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
(20, 'Sample3443', 'fsdfds', '4543'),
(21, 'Mao', '908kjghjtrg', '12345678908'),
(22, 'mjjj', '32', '32'),
(23, '123333', '123', '123'),
(24, 'wapakwapa', '2', '2'),
(25, '555454', '45', '455'),
(26, '23213213', '2', '2'),
(27, '3333', '3', '3'),
(28, '555565656565', '12', '12'),
(29, 'ppp', 'pp', '3213'),
(30, 'gana ana', '123', '123'),
(31, 'qqqeqe', 'qweqwe', '123'),
(32, 'mj', '32', '32'),
(33, 'lolz', '32', '32'),
(34, 'polkdfsaf', '12', '12');

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

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

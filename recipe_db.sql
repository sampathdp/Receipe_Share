-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Dec 05, 2024 at 03:00 PM
-- Server version: 5.7.26
-- PHP Version: 7.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `recipe_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `recipes`
--

DROP TABLE IF EXISTS `recipes`;
CREATE TABLE IF NOT EXISTS `recipes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `ingredients` text NOT NULL,
  `instructions` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `image` varchar(225) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `recipes`
--

INSERT INTO `recipes` (`id`, `title`, `description`, `ingredients`, `instructions`, `created_at`, `image`) VALUES
(1, 'CSE_4005', 'asd', 'asd', 'asd', '2024-12-03 07:12:10', ''),
(2, 'jhgfjh', 'asd', 'asd', 'asd', '2024-12-03 07:57:05', ''),
(3, 'jhgfjh', 'asd', 'asd', 'asd', '2024-12-03 09:16:23', '/uploads/1733217383874.png'),
(4, 'jhgfjh', 'adsad', 'asdad', 'asdad', '2024-12-03 09:19:37', '/uploads/1733217577223.png'),
(5, 'asdasdad', 'asdadadadsa', 'asdassdasda', 'asdasdada', '2024-12-05 07:46:00', '/uploads/1733384760301.png');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`) VALUES
(1, 'admin', '$2b$10$TpGvlpyqy9D.qVRACAhR1e6lfO4xvLfD5C3CLfZbOzY7jA9v47nwK'),
(2, 'aa', '$2b$10$E/XubwmS2bQwMd4Mh.JWq.ga0w2RONAVncpSpfcs0Aj.HjvLlIKHe'),
(3, 'qew', '$2b$10$a0Nupd1t26fgbFMFILWSTe26qI9nX/7d4/Rdaw5asRH/m4L.YXiiC'),
(4, 'aaa', '$2b$10$6lo8uRBdxy7rMLNeuhAPn.Wcb9h031TxETlRp8GAMbsIHE6WxdC6i'),
(5, 'www', '$2b$10$UqzpRewupek7BG4npapwAuquyutG1JP17Xrqp6MJk.2hhnAl04TgK'),
(6, 'aa', '$2b$10$lqSxWZqzJgpTx3eKSDRm0..CIzQMUMN8mhhkNcxST01LXVzf8rUe6'),
(7, 'bb', '$2b$10$938AS8Bt29w7bSafNc.SL.zb6m63jDl1STFHlIKxnkpiWdEnH3Yei'),
(8, 'aa', '$2b$10$PrGSgrOp7GPy24BkZVqD4.4lGh4ZHp0asTBiX7.fYxt47luWuENPW'),
(9, 'aa', '$2b$10$XhcYP8PPWxs8W4VGTXyzy.oGW82uTxxw/VH4Nweizz/yZE4n/lbhe'),
(10, 'adm', '$2b$10$bC4QdTxthEYun3CT34rfceC.ylCE/WIa7ipqE.1vSclnNsR2MzLlS'),
(11, 'aa', '$2b$10$wbHER34jVKDUbAJac/tPsuNFCJXGf/5/mRwFw863gDvzH1d8VkWzq'),
(12, 'uu', '$2b$10$SGqlbv42orAREz9MN7JGuOlxgG0n3WRLtGQp58ZEo9g0NIKg391qO'),
(13, 'wqe', '$2b$10$O4qMMotwFFwvT167irWxp.miSRu9tU7xVjW9fKFXZ9YGqFzXitT16'),
(14, 'asdas', '$2b$10$EGLbaR5uVvyqUysyS0WecOtztSFkGvCoRDgcLe8OBncioG.kAY4yu'),
(15, 'sam', '$2b$10$0I8B.v3t7ZQxBQdFCNJpbuz6NQ5sYDEhvChp0kjvIoUUwO5yhpBf.');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

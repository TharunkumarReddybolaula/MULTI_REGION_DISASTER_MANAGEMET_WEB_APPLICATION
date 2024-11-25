-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 25, 2024 at 01:12 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `userdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `resetToken` varchar(255) DEFAULT NULL,
  `resetTokenExpire` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `resetToken`, `resetTokenExpire`) VALUES
(1, 'tharun', 'tbolaula@gitam.in', '$2a$10$W5RlIyRc05U59U3CZ3SoNu9kSSGkQtdZmJQ45rncu6jBoaWiEYMI2', 'a372b407d8b63d3b9f8ff5b81f56efff2f5ba1aa', '0000-00-00 00:00:00'),
(2, 'puneeth', 'srokkam@gitam.in', '$2a$10$tfo2GomAzPPmHZ72Q9H4YuLNlzJI11HIhyIr.a7r2dee2vZmPQiVK', 'aca37bc911d717ce87709b4bfb17c817a0db602c', '0000-00-00 00:00:00'),
(3, 'nana', 'tbolaula@gitam1.in', '$2a$10$rT0Rzn2aZM6GiGNGx60Ca.DGxsSFIsh7h2LqfcsnSUyl9.EnIyyF2', '4caebb70239e8ce71a93734b774326bb9ca2ca74', '0000-00-00 00:00:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

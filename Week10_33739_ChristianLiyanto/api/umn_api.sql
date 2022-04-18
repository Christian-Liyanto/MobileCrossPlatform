-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 13, 2022 at 05:08 AM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 7.4.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `umn_api`
--

-- --------------------------------------------------------

--
-- Table structure for table `memories`
--

CREATE TABLE `memories` (
  `id` int(11) NOT NULL,
  `title` varchar(30) NOT NULL,
  `type` varchar(10) NOT NULL,
  `photo` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `memories`
--

INSERT INTO `memories` (`id`, `title`, `type`, `photo`) VALUES
(8, 'Kucing Lutju', 'good', 'uploads/1636349419295.jpeg'),
(9, 'Monochrome', 'good', 'uploads/1636368429207.jpeg'),
(10, 'Kakek', 'bad', 'uploads/1636369005979.jpeg'),
(11, 'Dark Side', 'bad', 'uploads/1636369039431.jpeg'),
(12, 'Power ', 'bad', 'uploads/1649808230676.jpeg');

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `nim` varchar(10) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `prodi` varchar(50) NOT NULL,
  `foto` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`nim`, `nama`, `prodi`, `foto`) VALUES
('001', 'John Thor', 'Informatika', NULL),
('002', 'John Wick', 'Informatika', NULL),
('003', 'John Doe', 'Investigasi', NULL),
('004', 'Lerga', 'Sungkem Lords', 'uploads/Swaq Face.jpg'),
('005', 'Kamen Rider', 'Kamen Rider', 'uploads/Pepatah kakek kura-kura.jpg'),
('009', 'Gemini', 'Gemini', 'uploads/kucing.jpg'),
('010', 'Kakek Kura-kura', 'Kakek Kura-kura', 'uploads/8049.jpg'),
('011', 'Sexy Lips', 'Love Dovey', 'uploads/monochrome.jpg'),
('012', 'Yosha', '', 'uploads/wil.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `memories`
--
ALTER TABLE `memories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`nim`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `memories`
--
ALTER TABLE `memories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Mar 18, 2022 at 02:04 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `spp`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `admin_id` int(4) NOT NULL,
  `admin_nama` varchar(100) NOT NULL,
  `admin_email` varchar(100) NOT NULL,
  `admin_password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`admin_id`, `admin_nama`, `admin_email`, `admin_password`) VALUES
(1, 'admin', 'admin@admin.com', 'admin'),
(2, 'admin2', 'admin2@admin.com', 'admin2');

-- --------------------------------------------------------

--
-- Table structure for table `akses_token`
--

CREATE TABLE `akses_token` (
  `akses_token_id` int(4) NOT NULL,
  `admin_id` int(4) NOT NULL,
  `akses_token` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `akses_token`
--

INSERT INTO `akses_token` (`akses_token_id`, `admin_id`, `akses_token`) VALUES
(1, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb3dzIjpbeyJhZG1pbl9pZCI6MSwiYWRtaW5fbmFtYSI6ImFkbWluIiwiYWR'),
(2, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb3dzIjpbeyJhZG1pbl9pZCI6MSwiYWRtaW5fbmFtYSI6ImFkbWluIiwiYWR'),
(3, 2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb3dzIjpbeyJhZG1pbl9pZCI6MiwiYWRtaW5fbmFtYSI6ImFkbWluMiIsImF');

-- --------------------------------------------------------

--
-- Table structure for table `bebas`
--

CREATE TABLE `bebas` (
  `bebas_id` int(11) NOT NULL,
  `siswa_id` int(11) NOT NULL,
  `pembayaran_id` int(11) NOT NULL,
  `bebas_tagihan` decimal(10,0) NOT NULL,
  `bebas_total_bayar` decimal(10,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `bebas`
--

INSERT INTO `bebas` (`bebas_id`, `siswa_id`, `pembayaran_id`, `bebas_tagihan`, `bebas_total_bayar`) VALUES
(1, 5, 2, '1800000', '0'),
(2, 6, 2, '1800000', '0'),
(3, 7, 2, '1800000', '0');

-- --------------------------------------------------------

--
-- Table structure for table `bulanan`
--

CREATE TABLE `bulanan` (
  `bulanan_id` int(11) NOT NULL,
  `siswa_id` int(11) NOT NULL,
  `pembayaran_id` int(11) NOT NULL,
  `month_id` int(11) NOT NULL,
  `bulanan_tagihan` decimal(10,0) NOT NULL,
  `no_transaksi` varchar(50) NOT NULL,
  `bulanan_status` tinyint(1) NOT NULL,
  `bulanan_tanggal` date DEFAULT NULL,
  `admin_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `bulanan`
--

INSERT INTO `bulanan` (`bulanan_id`, `siswa_id`, `pembayaran_id`, `month_id`, `bulanan_tagihan`, `no_transaksi`, `bulanan_status`, `bulanan_tanggal`, `admin_id`) VALUES
(1, 5, 1, 1, '300000', '', 1, '2022-03-08', 1),
(2, 5, 1, 2, '300000', '', 1, '2022-03-16', 2),
(3, 5, 1, 3, '300000', '', 1, '2022-03-18', 1),
(4, 5, 1, 4, '300000', '', 0, '2022-03-08', 1),
(5, 5, 1, 5, '300000', '', 0, '2022-03-08', 1),
(6, 5, 1, 6, '300000', '', 0, '2022-03-08', 1),
(7, 5, 1, 7, '300000', '', 0, '2022-03-08', 1),
(8, 5, 1, 8, '300000', '', 0, '2022-03-08', 1),
(9, 5, 1, 9, '300000', '', 0, '2022-03-08', 1),
(10, 5, 1, 10, '300000', '', 0, '2022-03-08', 1),
(11, 5, 1, 11, '300000', '', 0, '2022-03-08', 1),
(12, 5, 1, 12, '300000', '', 0, '2022-03-08', 1),
(13, 6, 1, 1, '300000', '', 1, '2022-03-16', 2),
(14, 6, 1, 2, '300000', '', 1, '2022-03-17', 1),
(15, 6, 1, 3, '300000', '', 1, '2022-03-18', 1),
(16, 6, 1, 4, '300000', '', 0, '2022-03-08', 1),
(17, 6, 1, 5, '300000', '', 0, '2022-03-08', 1),
(18, 6, 1, 6, '300000', '', 0, '2022-03-08', 1),
(19, 6, 1, 7, '300000', '', 0, '2022-03-08', 1),
(20, 6, 1, 8, '300000', '', 0, '2022-03-08', 1),
(21, 6, 1, 9, '300000', '', 0, '2022-03-08', 1),
(22, 6, 1, 10, '300000', '', 0, '2022-03-08', 1),
(23, 6, 1, 11, '300000', '', 0, '2022-03-08', 1),
(24, 6, 1, 12, '300000', '', 0, '2022-03-08', 1),
(25, 7, 1, 1, '300000', '', 0, '2022-03-08', 1),
(26, 7, 1, 2, '300000', '', 0, '2022-03-08', 1),
(27, 7, 1, 3, '300000', '', 0, '2022-03-08', 1),
(28, 7, 1, 4, '300000', '', 0, '2022-03-08', 1),
(29, 7, 1, 5, '300000', '', 0, '2022-03-08', 1),
(30, 7, 1, 6, '300000', '', 0, '2022-03-08', 1),
(31, 7, 1, 7, '300000', '', 0, '2022-03-08', 1),
(32, 7, 1, 8, '300000', '', 0, '2022-03-08', 1),
(33, 7, 1, 9, '300000', '', 0, '2022-03-08', 1),
(34, 7, 1, 10, '300000', '', 0, '2022-03-08', 1),
(35, 7, 1, 11, '300000', '', 0, '2022-03-08', 1),
(36, 7, 1, 12, '300000', '', 0, '2022-03-08', 1);

-- --------------------------------------------------------

--
-- Table structure for table `d_bebas`
--

CREATE TABLE `d_bebas` (
  `d_bebas_id` int(11) NOT NULL,
  `no_transaksi` varchar(50) NOT NULL,
  `bebas_id` int(11) NOT NULL,
  `d_bebas_bayar` decimal(10,0) NOT NULL,
  `d_bebas_deskripsi` varchar(100) NOT NULL,
  `d_bebas_tanggal` date NOT NULL,
  `admin_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `d_kelas`
--

CREATE TABLE `d_kelas` (
  `d_kelas_id` int(4) NOT NULL,
  `d_kelas_nama` int(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `d_kelas`
--

INSERT INTO `d_kelas` (`d_kelas_id`, `d_kelas_nama`) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4);

-- --------------------------------------------------------

--
-- Table structure for table `jurusan`
--

CREATE TABLE `jurusan` (
  `jurusan_id` int(4) NOT NULL,
  `jurusan_nama` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `jurusan`
--

INSERT INTO `jurusan` (`jurusan_id`, `jurusan_nama`) VALUES
(1, 'AK'),
(2, 'RPL'),
(3, 'TKJ'),
(4, 'TEI'),
(5, 'TBSM'),
(6, 'TET');

-- --------------------------------------------------------

--
-- Table structure for table `kelas`
--

CREATE TABLE `kelas` (
  `kelas_id` int(4) NOT NULL,
  `kelas_nama` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `kelas`
--

INSERT INTO `kelas` (`kelas_id`, `kelas_nama`) VALUES
(1, 'X'),
(2, 'XI'),
(3, 'XII');

-- --------------------------------------------------------

--
-- Table structure for table `month`
--

CREATE TABLE `month` (
  `month_id` int(11) NOT NULL,
  `month_nama` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `month`
--

INSERT INTO `month` (`month_id`, `month_nama`) VALUES
(1, 'Juli'),
(2, 'Agustus'),
(3, 'September'),
(4, 'Oktober'),
(5, 'November'),
(6, 'Desember'),
(7, 'Januari'),
(8, 'Februari'),
(9, 'Maret'),
(10, 'April'),
(11, 'Mei'),
(12, 'Juni');

-- --------------------------------------------------------

--
-- Table structure for table `pembayaran`
--

CREATE TABLE `pembayaran` (
  `pembayaran_id` int(11) NOT NULL,
  `pembayaran_tipe` enum('BULANAN','BEBAS') NOT NULL,
  `periode_id` int(11) NOT NULL,
  `pos_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `pembayaran`
--

INSERT INTO `pembayaran` (`pembayaran_id`, `pembayaran_tipe`, `periode_id`, `pos_id`) VALUES
(1, 'BULANAN', 1, 1),
(2, 'BEBAS', 1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `periode`
--

CREATE TABLE `periode` (
  `periode_id` int(11) NOT NULL,
  `periode_mulai` year(4) NOT NULL,
  `periode_akhir` year(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `periode`
--

INSERT INTO `periode` (`periode_id`, `periode_mulai`, `periode_akhir`) VALUES
(1, 2020, 2021);

-- --------------------------------------------------------

--
-- Table structure for table `pos`
--

CREATE TABLE `pos` (
  `pos_id` int(11) NOT NULL,
  `pos_nama` varchar(100) NOT NULL,
  `pos_deskripsi` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `pos`
--

INSERT INTO `pos` (`pos_id`, `pos_nama`, `pos_deskripsi`) VALUES
(1, 'SPP', 'Pembayaran SPP Bulanan'),
(2, 'sumbangan', 'Pembayaran Sumbangan Pendidikan');

-- --------------------------------------------------------

--
-- Table structure for table `siswa`
--

CREATE TABLE `siswa` (
  `siswa_id` int(11) NOT NULL,
  `siswa_nis` varchar(45) NOT NULL,
  `siswa_nama` varchar(255) NOT NULL,
  `siswa_password` varchar(100) NOT NULL,
  `siswa_gender` enum('L','P') NOT NULL,
  `siswa_img` varchar(100) NOT NULL,
  `kelas_id` int(4) NOT NULL,
  `jurusan_id` int(4) NOT NULL,
  `d_kelas_id` int(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `siswa`
--

INSERT INTO `siswa` (`siswa_id`, `siswa_nis`, `siswa_nama`, `siswa_password`, `siswa_gender`, `siswa_img`, `kelas_id`, `jurusan_id`, `d_kelas_id`) VALUES
(4, '192010003', 'Asti', 'asti', 'P', 'profile.png', 3, 2, 3),
(5, '192010004', 'Angga', 'angga', 'L', 'profile.png', 1, 2, 3),
(6, '192010005', 'Fadil', 'fadil', 'L', 'profile.png', 1, 2, 3),
(7, '192010006', 'Fajar', 'fajar', 'L', 'profile.png', 1, 2, 3),
(8, '192010007', 'Rafly', 'rafly', 'L', 'profile.png', 3, 2, 3),
(9, '192010008', 'Raka', 'raka', 'L', 'profile.png', 3, 2, 3),
(82, '192010429', 'ABEL NATANAEL HUTAPEA', 'NMKfF9LH', 'L', 'profile.png', 3, 2, 3),
(83, '192010430', 'ADE RAFIF HILMANSYAH', 'qkJWOTqO', 'L', 'profile.png', 3, 2, 3),
(84, '192010431', 'ADILLA MARSYA SOFHIANTI', 'vnqrN5sD', 'P', 'profile.png', 3, 2, 3),
(85, '192010432', 'AGNIA PINASTI AULIA', '0ZAa2gDr', 'P', 'profile.png', 3, 2, 3),
(86, '192010433', 'AGUSTIN WULANDARI', 'frd0rYjX', 'P', 'profile.png', 3, 2, 3),
(87, '192010434', 'AHMAD FADHILAH', 'XKk37U3e', 'L', 'profile.png', 3, 2, 3),
(88, '192010435', 'AMELIA ADESTI', 'vACrBDkF', 'P', 'profile.png', 3, 2, 3),
(89, '192010436', 'ANDRI HARTONO', 'LeEjcsGR', 'L', 'profile.png', 3, 2, 3),
(90, '192010437', 'ANGGA DWI ADITYA', 'E5k59pUq', 'L', 'profile.png', 3, 2, 3),
(91, '192010438', 'ANISA NUR FADILA', 'E7EgFiTU', 'P', 'profile.png', 3, 2, 3),
(92, '192010439', 'ARIPIN', 'X9RgfQpc', 'L', 'profile.png', 3, 2, 3),
(93, '192010440', 'AYUM ADAWIYAH', 'J7kpyXvv', 'P', 'profile.png', 3, 2, 3),
(94, '192010441', 'CUT SETIAWATI', 'WEib0lj5', 'P', 'profile.png', 3, 2, 3),
(95, '192010442', 'DAMAHYANTI', 'c4OcVZOO', 'P', 'profile.png', 3, 2, 3),
(96, '192010443', 'DHAFIN MUKTI AL FARIZI', '2MTuBZVb', 'L', 'profile.png', 3, 2, 3),
(97, '192010444', 'DIAN NURLAELA', 'g331pt3I', 'P', 'profile.png', 3, 2, 3),
(98, '192010445', 'EDELWEISS HARUMI JINGGA', 'Dh5sC2dn', 'P', 'profile.png', 3, 2, 3),
(99, '192010446', 'ELIS SALLEHA', 'GVtjbFu1', 'P', 'profile.png', 3, 2, 3),
(100, '192010447', 'FAJAR NUR HIDAYAT', 'KKiaDWgQ', 'L', 'profile.png', 3, 2, 3),
(101, '192010448', 'HISYAM DAFFA RABBANI', 'JUuIV2Vq', 'L', 'profile.png', 3, 2, 3),
(102, '192010449', 'LUTHFI RAFIF PRADJOKO', 'b35tQbOE', 'L', 'profile.png', 3, 2, 3),
(103, '192010450', 'MUHAMMAD MAGHVI FAJAR', 'fvVHiEp4', 'L', 'profile.png', 3, 2, 3),
(104, '192010451', 'PUTRI RAHAYU', 'vf1CFVA7', 'P', 'profile.png', 3, 2, 3),
(105, '192010452', 'RADEN FATAHILLAH SOENDJOTO', 'MFbzqntG', 'L', 'profile.png', 3, 2, 3),
(106, '192010453', 'RAFLY HIDAYAT', 'udCIs4YV', 'L', 'profile.png', 3, 2, 3),
(107, '192010454', 'RAKA SANTANG RABBANI', 'Pv6DrVbE', 'L', 'profile.png', 3, 2, 3),
(108, '192010455', 'RIFQI ABDUL AZIZ AFIFI', 'NsOwYuAw', 'L', 'profile.png', 3, 2, 3),
(109, '192010456', 'ROSITA', 'L4X1an5s', 'P', 'profile.png', 3, 2, 3),
(110, '192010457', 'SANTI', 'gWNwn27B', 'P', 'profile.png', 3, 2, 3),
(111, '192010458', 'SITI KHUMAIROH', 'YIRp81jL', 'P', 'profile.png', 3, 2, 3),
(112, '192010459', 'SITI NUR HOSITOH', '8HgEKFGY', 'P', 'profile.png', 3, 2, 3),
(113, '192010460', 'SYAFA RANI ZAHIRA', 'Kohysv6i', 'P', 'profile.png', 3, 2, 3),
(114, '192010461', 'VANIA ANDRYANI', '2Q3VNT8t', 'P', 'profile.png', 3, 2, 3),
(115, '192010462', 'VARITS GORGA', 'FLZElS4j', 'L', 'profile.png', 3, 2, 3),
(116, '192010463', 'YUNI OCTAVIANI', 'RF8syJ15', 'P', 'profile.png', 3, 2, 3);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`admin_id`);

--
-- Indexes for table `akses_token`
--
ALTER TABLE `akses_token`
  ADD PRIMARY KEY (`akses_token_id`),
  ADD KEY `admin_id` (`admin_id`);

--
-- Indexes for table `bebas`
--
ALTER TABLE `bebas`
  ADD PRIMARY KEY (`bebas_id`),
  ADD KEY `siswa_id` (`siswa_id`),
  ADD KEY `pembayaran_id` (`pembayaran_id`);

--
-- Indexes for table `bulanan`
--
ALTER TABLE `bulanan`
  ADD PRIMARY KEY (`bulanan_id`),
  ADD KEY `siswa_nis` (`siswa_id`),
  ADD KEY `pembayaran_id` (`pembayaran_id`),
  ADD KEY `month_id` (`month_id`),
  ADD KEY `admin_id` (`admin_id`);

--
-- Indexes for table `d_bebas`
--
ALTER TABLE `d_bebas`
  ADD PRIMARY KEY (`d_bebas_id`),
  ADD KEY `bayar_id` (`bebas_id`),
  ADD KEY `admin_id` (`admin_id`);

--
-- Indexes for table `d_kelas`
--
ALTER TABLE `d_kelas`
  ADD PRIMARY KEY (`d_kelas_id`);

--
-- Indexes for table `jurusan`
--
ALTER TABLE `jurusan`
  ADD PRIMARY KEY (`jurusan_id`);

--
-- Indexes for table `kelas`
--
ALTER TABLE `kelas`
  ADD PRIMARY KEY (`kelas_id`);

--
-- Indexes for table `month`
--
ALTER TABLE `month`
  ADD PRIMARY KEY (`month_id`);

--
-- Indexes for table `pembayaran`
--
ALTER TABLE `pembayaran`
  ADD PRIMARY KEY (`pembayaran_id`),
  ADD KEY `poriode_id` (`periode_id`),
  ADD KEY `pos_id` (`pos_id`);

--
-- Indexes for table `periode`
--
ALTER TABLE `periode`
  ADD PRIMARY KEY (`periode_id`);

--
-- Indexes for table `pos`
--
ALTER TABLE `pos`
  ADD PRIMARY KEY (`pos_id`);

--
-- Indexes for table `siswa`
--
ALTER TABLE `siswa`
  ADD PRIMARY KEY (`siswa_id`),
  ADD UNIQUE KEY `siswa_nis` (`siswa_nis`),
  ADD KEY `kelas_id` (`kelas_id`),
  ADD KEY `jurusan_id` (`jurusan_id`),
  ADD KEY `d_kelas_id` (`d_kelas_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `admin_id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `akses_token`
--
ALTER TABLE `akses_token`
  MODIFY `akses_token_id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `bebas`
--
ALTER TABLE `bebas`
  MODIFY `bebas_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `bulanan`
--
ALTER TABLE `bulanan`
  MODIFY `bulanan_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `d_bebas`
--
ALTER TABLE `d_bebas`
  MODIFY `d_bebas_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `d_kelas`
--
ALTER TABLE `d_kelas`
  MODIFY `d_kelas_id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `jurusan`
--
ALTER TABLE `jurusan`
  MODIFY `jurusan_id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `kelas`
--
ALTER TABLE `kelas`
  MODIFY `kelas_id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `month`
--
ALTER TABLE `month`
  MODIFY `month_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `pembayaran`
--
ALTER TABLE `pembayaran`
  MODIFY `pembayaran_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `periode`
--
ALTER TABLE `periode`
  MODIFY `periode_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `pos`
--
ALTER TABLE `pos`
  MODIFY `pos_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `siswa`
--
ALTER TABLE `siswa`
  MODIFY `siswa_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=141;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `akses_token`
--
ALTER TABLE `akses_token`
  ADD CONSTRAINT `akses_token_ibfk_1` FOREIGN KEY (`admin_id`) REFERENCES `admin` (`admin_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `bebas`
--
ALTER TABLE `bebas`
  ADD CONSTRAINT `bebas_ibfk_1` FOREIGN KEY (`siswa_id`) REFERENCES `siswa` (`siswa_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `bebas_ibfk_2` FOREIGN KEY (`pembayaran_id`) REFERENCES `pembayaran` (`pembayaran_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `bulanan`
--
ALTER TABLE `bulanan`
  ADD CONSTRAINT `bulanan_ibfk_1` FOREIGN KEY (`month_id`) REFERENCES `month` (`month_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `bulanan_ibfk_2` FOREIGN KEY (`pembayaran_id`) REFERENCES `pembayaran` (`pembayaran_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `bulanan_ibfk_3` FOREIGN KEY (`siswa_id`) REFERENCES `siswa` (`siswa_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `bulanan_ibfk_4` FOREIGN KEY (`admin_id`) REFERENCES `admin` (`admin_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `d_bebas`
--
ALTER TABLE `d_bebas`
  ADD CONSTRAINT `d_bebas_ibfk_1` FOREIGN KEY (`bebas_id`) REFERENCES `bebas` (`bebas_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `d_bebas_ibfk_2` FOREIGN KEY (`admin_id`) REFERENCES `admin` (`admin_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `pembayaran`
--
ALTER TABLE `pembayaran`
  ADD CONSTRAINT `pembayaran_ibfk_1` FOREIGN KEY (`periode_id`) REFERENCES `periode` (`periode_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `pembayaran_ibfk_2` FOREIGN KEY (`pos_id`) REFERENCES `pos` (`pos_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `siswa`
--
ALTER TABLE `siswa`
  ADD CONSTRAINT `siswa_ibfk_1` FOREIGN KEY (`jurusan_id`) REFERENCES `jurusan` (`jurusan_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `siswa_ibfk_2` FOREIGN KEY (`kelas_id`) REFERENCES `kelas` (`kelas_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `siswa_ibfk_3` FOREIGN KEY (`d_kelas_id`) REFERENCES `d_kelas` (`d_kelas_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

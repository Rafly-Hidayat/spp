-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 10 Jan 2022 pada 10.49
-- Versi server: 10.4.17-MariaDB
-- Versi PHP: 8.0.2

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
-- Struktur dari tabel `admin`
--

CREATE TABLE `admin` (
  `admin_id` int(4) NOT NULL,
  `admin_nama` varchar(100) NOT NULL,
  `admin_email` varchar(100) NOT NULL,
  `admin_password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `admin`
--

INSERT INTO `admin` (`admin_id`, `admin_nama`, `admin_email`, `admin_password`) VALUES
(1, 'admin', 'admin@admin.com', 'admin'),
(2, 'admin2', 'admin2@admin.com', 'admin2');

-- --------------------------------------------------------

--
-- Struktur dari tabel `akses_token`
--

CREATE TABLE `akses_token` (
  `akses_token_id` int(4) NOT NULL,
  `admin_id` int(4) NOT NULL,
  `akses_token` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `akses_token`
--

INSERT INTO `akses_token` (`akses_token_id`, `admin_id`, `akses_token`) VALUES
(1, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb3dzIjpbeyJhZG1pbl9pZCI6MSwiYWRtaW5fbmFtYSI6ImFkbWluIiwiYWR'),
(2, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb3dzIjpbeyJhZG1pbl9pZCI6MSwiYWRtaW5fbmFtYSI6ImFkbWluIiwiYWR'),
(3, 2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb3dzIjpbeyJhZG1pbl9pZCI6MiwiYWRtaW5fbmFtYSI6ImFkbWluMiIsImF');

-- --------------------------------------------------------

--
-- Struktur dari tabel `bebas`
--

CREATE TABLE `bebas` (
  `bebas_id` int(11) NOT NULL,
  `siswa_id` int(11) NOT NULL,
  `pembayaran_id` int(11) NOT NULL,
  `bebas_tagihan` decimal(10,0) NOT NULL,
  `bebas_total_bayar` decimal(10,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Struktur dari tabel `bulanan`
--

CREATE TABLE `bulanan` (
  `bulanan_id` int(11) NOT NULL,
  `siswa_id` int(11) NOT NULL,
  `pembayaran_id` int(11) NOT NULL,
  `month_id` int(11) NOT NULL,
  `bulanan_tagihan` decimal(10,0) NOT NULL,
  `bulanan_status` tinyint(1) NOT NULL,
  `bulanan_tanggal` date NOT NULL,
  `admin_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Struktur dari tabel `d_bebas`
--

CREATE TABLE `d_bebas` (
  `d_bebas_id` int(11) NOT NULL,
  `bebas_id` int(11) NOT NULL,
  `d_bebas_bayar` decimal(10,0) NOT NULL,
  `d_bebas_deskripsi` varchar(100) NOT NULL,
  `d_bebas_tanggal` date NOT NULL,
  `admin_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Struktur dari tabel `d_kelas`
--

CREATE TABLE `d_kelas` (
  `d_kelas_id` int(4) NOT NULL,
  `d_kelas_nama` int(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `d_kelas`
--

INSERT INTO `d_kelas` (`d_kelas_id`, `d_kelas_nama`) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4);

-- --------------------------------------------------------

--
-- Struktur dari tabel `jurusan`
--

CREATE TABLE `jurusan` (
  `jurusan_id` int(4) NOT NULL,
  `jurusan_nama` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `jurusan`
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
-- Struktur dari tabel `kelas`
--

CREATE TABLE `kelas` (
  `kelas_id` int(4) NOT NULL,
  `kelas_nama` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `kelas`
--

INSERT INTO `kelas` (`kelas_id`, `kelas_nama`) VALUES
(1, 'X'),
(2, 'XI'),
(3, 'XII');

-- --------------------------------------------------------

--
-- Struktur dari tabel `month`
--

CREATE TABLE `month` (
  `month_id` int(11) NOT NULL,
  `month_nama` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Struktur dari tabel `pembayaran`
--

CREATE TABLE `pembayaran` (
  `pembayaran_id` int(11) NOT NULL,
  `pembayaran_tipe` enum('BULAN','BEBAS') NOT NULL,
  `periode_id` int(11) NOT NULL,
  `pos_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Struktur dari tabel `periode`
--

CREATE TABLE `periode` (
  `periode_id` int(11) NOT NULL,
  `periode_mulai` year(4) NOT NULL,
  `periode_akhir` year(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `periode`
--

INSERT INTO `periode` (`periode_id`, `periode_mulai`, `periode_akhir`) VALUES
(1, 2020, 2021),
(14, 2020, 2020),
(15, 2001, 2020),
(16, 2012, 2020),
(17, 0000, 2020);

-- --------------------------------------------------------

--
-- Struktur dari tabel `pos`
--

CREATE TABLE `pos` (
  `pos_id` int(11) NOT NULL,
  `pos_nama` varchar(100) NOT NULL,
  `pos_deskripsi` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `pos`
--

INSERT INTO `pos` (`pos_id`, `pos_nama`, `pos_deskripsi`) VALUES
(1, 'spp', 'pembayaran bulanan');

-- --------------------------------------------------------

--
-- Struktur dari tabel `siswa`
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
-- Dumping data untuk tabel `siswa`
--

INSERT INTO `siswa` (`siswa_id`, `siswa_nis`, `siswa_nama`, `siswa_password`, `siswa_gender`, `siswa_img`, `kelas_id`, `jurusan_id`, `d_kelas_id`) VALUES
(1, '192010001', 'Ade', 'Ade', 'L', 'profile.png', 3, 2, 3),
(2, '192010002', 'Abel', 'Abel', 'L', 'profile.png', 3, 2, 3);

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`admin_id`);

--
-- Indeks untuk tabel `akses_token`
--
ALTER TABLE `akses_token`
  ADD PRIMARY KEY (`akses_token_id`),
  ADD KEY `admin_id` (`admin_id`);

--
-- Indeks untuk tabel `bebas`
--
ALTER TABLE `bebas`
  ADD PRIMARY KEY (`bebas_id`),
  ADD KEY `siswa_id` (`siswa_id`),
  ADD KEY `pembayaran_id` (`pembayaran_id`);

--
-- Indeks untuk tabel `bulanan`
--
ALTER TABLE `bulanan`
  ADD PRIMARY KEY (`bulanan_id`),
  ADD KEY `siswa_nis` (`siswa_id`),
  ADD KEY `pembayaran_id` (`pembayaran_id`),
  ADD KEY `month_id` (`month_id`),
  ADD KEY `admin_id` (`admin_id`);

--
-- Indeks untuk tabel `d_bebas`
--
ALTER TABLE `d_bebas`
  ADD PRIMARY KEY (`d_bebas_id`),
  ADD KEY `admin_id` (`admin_id`),
  ADD KEY `bayar_id` (`bebas_id`);

--
-- Indeks untuk tabel `d_kelas`
--
ALTER TABLE `d_kelas`
  ADD PRIMARY KEY (`d_kelas_id`);

--
-- Indeks untuk tabel `jurusan`
--
ALTER TABLE `jurusan`
  ADD PRIMARY KEY (`jurusan_id`);

--
-- Indeks untuk tabel `kelas`
--
ALTER TABLE `kelas`
  ADD PRIMARY KEY (`kelas_id`);

--
-- Indeks untuk tabel `month`
--
ALTER TABLE `month`
  ADD PRIMARY KEY (`month_id`);

--
-- Indeks untuk tabel `pembayaran`
--
ALTER TABLE `pembayaran`
  ADD PRIMARY KEY (`pembayaran_id`),
  ADD KEY `poriode_id` (`periode_id`),
  ADD KEY `pos_id` (`pos_id`);

--
-- Indeks untuk tabel `periode`
--
ALTER TABLE `periode`
  ADD PRIMARY KEY (`periode_id`);

--
-- Indeks untuk tabel `pos`
--
ALTER TABLE `pos`
  ADD PRIMARY KEY (`pos_id`);

--
-- Indeks untuk tabel `siswa`
--
ALTER TABLE `siswa`
  ADD PRIMARY KEY (`siswa_id`),
  ADD KEY `kelas_id` (`kelas_id`),
  ADD KEY `jurusan_id` (`jurusan_id`),
  ADD KEY `d_kelas_id` (`d_kelas_id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `admin`
--
ALTER TABLE `admin`
  MODIFY `admin_id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `akses_token`
--
ALTER TABLE `akses_token`
  MODIFY `akses_token_id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `bebas`
--
ALTER TABLE `bebas`
  MODIFY `bebas_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `bulanan`
--
ALTER TABLE `bulanan`
  MODIFY `bulanan_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `d_bebas`
--
ALTER TABLE `d_bebas`
  MODIFY `d_bebas_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `d_kelas`
--
ALTER TABLE `d_kelas`
  MODIFY `d_kelas_id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT untuk tabel `jurusan`
--
ALTER TABLE `jurusan`
  MODIFY `jurusan_id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT untuk tabel `kelas`
--
ALTER TABLE `kelas`
  MODIFY `kelas_id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT untuk tabel `month`
--
ALTER TABLE `month`
  MODIFY `month_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `pembayaran`
--
ALTER TABLE `pembayaran`
  MODIFY `pembayaran_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `periode`
--
ALTER TABLE `periode`
  MODIFY `periode_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT untuk tabel `pos`
--
ALTER TABLE `pos`
  MODIFY `pos_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `siswa`
--
ALTER TABLE `siswa`
  MODIFY `siswa_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `akses_token`
--
ALTER TABLE `akses_token`
  ADD CONSTRAINT `akses_token_ibfk_1` FOREIGN KEY (`admin_id`) REFERENCES `admin` (`admin_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `bebas`
--
ALTER TABLE `bebas`
  ADD CONSTRAINT `bebas_ibfk_1` FOREIGN KEY (`siswa_id`) REFERENCES `siswa` (`siswa_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `bebas_ibfk_2` FOREIGN KEY (`pembayaran_id`) REFERENCES `pembayaran` (`pembayaran_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `bulanan`
--
ALTER TABLE `bulanan`
  ADD CONSTRAINT `bulanan_ibfk_1` FOREIGN KEY (`month_id`) REFERENCES `month` (`month_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `bulanan_ibfk_2` FOREIGN KEY (`pembayaran_id`) REFERENCES `pembayaran` (`pembayaran_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `bulanan_ibfk_3` FOREIGN KEY (`siswa_id`) REFERENCES `siswa` (`siswa_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `bulanan_ibfk_4` FOREIGN KEY (`admin_id`) REFERENCES `admin` (`admin_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `d_bebas`
--
ALTER TABLE `d_bebas`
  ADD CONSTRAINT `d_bebas_ibfk_1` FOREIGN KEY (`bebas_id`) REFERENCES `bebas` (`bebas_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `d_bebas_ibfk_2` FOREIGN KEY (`d_bebas_id`) REFERENCES `admin` (`admin_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `pembayaran`
--
ALTER TABLE `pembayaran`
  ADD CONSTRAINT `pembayaran_ibfk_1` FOREIGN KEY (`periode_id`) REFERENCES `periode` (`periode_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `pembayaran_ibfk_2` FOREIGN KEY (`pos_id`) REFERENCES `pos` (`pos_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `siswa`
--
ALTER TABLE `siswa`
  ADD CONSTRAINT `siswa_ibfk_1` FOREIGN KEY (`jurusan_id`) REFERENCES `jurusan` (`jurusan_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `siswa_ibfk_2` FOREIGN KEY (`kelas_id`) REFERENCES `kelas` (`kelas_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `siswa_ibfk_3` FOREIGN KEY (`d_kelas_id`) REFERENCES `d_kelas` (`d_kelas_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

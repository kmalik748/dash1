-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 06, 2021 at 09:58 AM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 7.3.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `project_aivizo`
--

-- --------------------------------------------------------

--
-- Table structure for table `appointments`
--

CREATE TABLE `appointments` (
  `id` int(50) NOT NULL,
  `patient_id` int(11) NOT NULL,
  `doctor_id` int(11) NOT NULL,
  `apnt_date` date NOT NULL,
  `apnt_time` time NOT NULL,
  `prescription` varchar(10000) NOT NULL DEFAULT '',
  `datetime` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `appointments`
--

INSERT INTO `appointments` (`id`, `patient_id`, `doctor_id`, `apnt_date`, `apnt_time`, `prescription`, `datetime`) VALUES
(1, 178, 159, '2021-09-18', '19:00:00', '', '2021-10-06 06:06:30'),
(2, 178, 45, '2021-09-20', '20:00:00', '', '2021-09-26 11:26:31'),
(3, 177, 159, '2021-10-19', '22:11:10', '', '2021-10-06 06:06:25');

-- --------------------------------------------------------

--
-- Table structure for table `doctors`
--

CREATE TABLE `doctors` (
  `id` int(10) NOT NULL,
  `doctor_id` int(10) NOT NULL,
  `specialty` varchar(200) NOT NULL,
  `qualification` varchar(200) NOT NULL,
  `fees` int(10) NOT NULL,
  `availability` varchar(100) DEFAULT NULL,
  `tags` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`tags`)),
  `startTime` timestamp(6) NULL DEFAULT NULL,
  `endTime` timestamp(6) NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `doctors`
--

INSERT INTO `doctors` (`id`, `doctor_id`, `specialty`, `qualification`, `fees`, `availability`, `tags`, `startTime`, `endTime`) VALUES
(4, 159, 'General Sergon', 'PHD', 50, '09/18/2021 06:00 PM - 09/21/2021 08:00 PM', '{\"0\":\"kasif\",\"1\":\"ali\",\"2\":\"rb\"}', '2021-09-18 13:00:00.000000', '2021-09-21 15:00:00.000000'),
(5, 103, 'Corona Specialist', 'MBBS', 100, NULL, '{\"0\":\"corona\",\"1\":\"mbbs\"}', '2021-09-15 00:09:00.000000', '2021-09-18 13:25:53.000000'),
(6, 45, 'ENT Specialist', 'PHD', 80, '09/18/2021 07:00 PM - 09/22/2021 10:00 PM', '{\"0\":\"ENT\",\"1\":\" Brain Especialist\",\"2\":\"Surgury\",\"3\":\"PHD\"}', '2021-09-18 14:00:00.000000', '2021-09-22 17:00:00.000000');

-- --------------------------------------------------------

--
-- Table structure for table `signupemailtoken`
--

CREATE TABLE `signupemailtoken` (
  `id` int(11) NOT NULL,
  `userID` int(100) NOT NULL,
  `token` int(100) NOT NULL,
  `type` varchar(100) NOT NULL,
  `date_time` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `signupemailtoken`
--

INSERT INTO `signupemailtoken` (`id`, `userID`, `token`, `type`, `date_time`) VALUES
(1, 190, 894607, '', '2021-10-06 05:48:09'),
(2, 191, 849251, '', '2021-10-06 05:49:11'),
(3, 192, 13193, '', '2021-10-06 05:50:56'),
(4, 193, 87700, '', '2021-10-06 05:51:59'),
(5, 194, 463266, '', '2021-10-06 05:52:56'),
(6, 159, 435877, '', '2021-10-06 05:57:31'),
(7, 197, 290243, '', '2021-10-06 06:08:20'),
(8, 199, 721252, 'emailVerification', '2021-10-06 07:43:02'),
(9, 187, 923880, 'passwordReset', '0000-00-00 00:00:00'),
(10, 180, 522284, 'passwordReset', '2021-10-06 07:53:45'),
(11, 180, 989882, 'passwordReset', '2021-10-06 07:54:16'),
(12, 180, 649315, 'passwordReset', '2021-10-06 07:54:47'),
(13, 180, 969212, 'passwordReset', '2021-10-06 07:55:38');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `middle_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `dob` date NOT NULL,
  `phone_number` varchar(50) NOT NULL,
  `city` varchar(50) NOT NULL,
  `state` varchar(50) DEFAULT NULL,
  `country` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `gender` varchar(20) NOT NULL,
  `userType` varchar(20) NOT NULL,
  `verified` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `middle_name`, `last_name`, `dob`, `phone_number`, `city`, `state`, `country`, `email`, `password`, `gender`, `userType`, `verified`) VALUES
(1, 'Pauli', 'Wilde', 'Ernie', '2021-08-27', '763-881-4029', 'Situbondo', NULL, 'Indonesia', 'ewilde0@admin.ch', 'ewilde0@admin.ch', 'Male', 'Admin', 0),
(2, 'Karrie', 'Goundsy', 'Corbett', '2020-09-17', '887-344-4952', 'Zhongxinqiao', NULL, 'China', 'cgoundsy1@a8.net', 'r3VpYqNzi', 'Male', 'Admin', 0),
(3, 'Karen', 'Roma', 'Joe', '2020-11-09', '656-814-3442', 'Lubumbashi', NULL, 'Democratic Republic of the Congo', 'jroma2@blog.com', 'jroma2@blog.com', 'Other', 'Patient', 0),
(4, 'Herold', 'Charlotte', 'Leonhard', '2020-09-26', '792-376-9593', 'Nishishinminato', NULL, 'Japan', 'lcharlotte3@google.ca', 'MxPbSKiSdSfS', 'Male', 'Patient', 0),
(5, 'Demetri', 'Bezzant', 'Artemus', '2021-07-07', '490-889-7465', 'Gali??ana', NULL, 'Croatia', 'abezzant4@gravatar.com', 'VEIrksf90Xw', 'Female', 'Patient', 0),
(6, 'Vaughn', 'McAulay', 'Bob', '2021-01-28', '751-364-5015', 'Jinja', NULL, 'Uganda', 'bmcaulay5@businessinsider.com', 'XkEx2n0N2', 'Male', 'Admin', 0),
(7, 'Geri', 'Rohfsen', 'Luke', '2021-01-19', '862-344-4678', 'Alpatovo', NULL, 'Russia', 'lrohfsen6@indiegogo.com', '0vGc6SkZeGG7', 'Other', 'Admin', 0),
(8, 'Iosep', 'Ringwood', 'Carson', '2020-09-28', '177-469-4051', 'Linquan', NULL, 'China', 'cringwood7@fastcompany.com', '5PkrzK6C', 'Male', 'Admin', 0),
(9, 'Wandie', 'Pengelly', 'Alessandro', '2021-02-24', '466-603-7833', 'Yuxi', NULL, 'China', 'apengelly8@cnn.com', 'O4vqWNz4', 'Male', 'Admin', 0),
(10, 'Hasty', 'Simionescu', 'Ev', '2020-09-15', '337-596-7756', 'Soledad', NULL, 'Venezuela', 'esimionescu9@studiopress.com', 'hti8C3e', 'Other', 'Admin', 0),
(11, 'Daven', 'Udden', 'Hasheem', '2020-12-07', '704-470-0668', 'Charlotte', 'North Carolina', 'United States', 'huddena@163.com', 'GFgCpwQ', 'Other', 'Admin', 0),
(12, 'Dona', 'Descroix', 'Emmanuel', '2021-03-18', '635-960-3156', 'Bieliny', NULL, 'Poland', 'edescroixb@nba.com', 'edescroixb@nba.com', 'Other', 'Patient', 0),
(13, 'Kristian', 'Andreassen', 'Alvin', '2021-08-23', '388-919-5278', 'Ch??teauroux', 'Centre', 'France', 'aandreassenc@weather.com', 'rxM1JbIolHt', 'Male', 'Admin', 0),
(14, 'Leontine', 'Lenahan', 'Pinchas', '2021-04-10', '874-538-8051', 'Chiguang', NULL, 'China', 'plenahand@google.com.au', 'HfxpYYZIUP', 'Male', 'Patient', 0),
(15, 'Eadmund', 'Ravilious', 'Dwayne', '2021-05-20', '614-809-0606', 'Guixi', NULL, 'China', 'draviliouse@hc360.com', 'ERuBwbI', 'Female', 'Admin', 0),
(16, 'Monro', 'Soff', 'Mathew', '2021-08-19', '761-148-7927', 'Nova Praha', NULL, 'Ukraine', 'msofff@about.me', 'WwoT4sQT', 'Female', 'Patient', 0),
(17, 'Brucie', 'Ferrey', 'Gabie', '2020-11-14', '728-877-7641', 'Dampol', NULL, 'Indonesia', 'gferreyg@fc2.com', 'YKY0fLN', 'Female', 'Admin', 0),
(18, 'Ash', 'Todaro', 'Orlando', '2021-05-28', '349-657-9987', 'Guinobatan', NULL, 'Philippines', 'otodaroh@google.com', 'tEs6MnQFh', 'Female', 'Admin', 0),
(19, 'Shell', 'Matkovic', 'Ralph', '2021-06-10', '974-338-8159', 'Parczew', NULL, 'Poland', 'rmatkovici@dailymotion.com', '39i8c82EHV', 'Female', 'Patient', 0),
(20, 'Deane', 'O\'Cullinane', 'Blane', '2021-08-15', '379-520-6035', 'Verkhniy Baskunchak', NULL, 'Russia', 'bocullinanej@issuu.com', 'ToAqpZTe2uX', 'Female', 'Patient', 0),
(21, 'Henrieta', 'Enders', 'Banky', '2021-08-19', '714-311-1597', 'Zeist', 'Provincie Utrecht', 'Netherlands', 'bendersk@sciencedirect.com', '8wgKwRB5XTh', 'Other', 'Patient', 0),
(22, 'Rebekkah', 'Aslott', 'Gale', '2020-12-02', '734-476-8521', 'Yun???an', NULL, 'China', 'gaslottl@walmart.com', 'Jzd0APWdV', 'Female', 'Admin', 0),
(23, 'Ryley', 'Cavet', 'Barrett', '2020-11-28', '271-679-4728', 'Bengtsfors', 'V??stra G??taland', 'Sweden', 'bcavetm@hud.gov', 'jS9wR90', 'Male', 'Patient', 0),
(24, 'Terry', 'Coffey', 'Booth', '2021-05-11', '906-165-7344', 'Stockholm', 'Stockholm', 'Sweden', 'bcoffeyn@trellian.com', 'QBqUMrD9zRzu', 'Female', 'Admin', 0),
(25, 'Catie', 'Alyonov', 'Vic', '2021-07-25', '991-188-2075', 'Bilajari', NULL, 'Azerbaijan', 'valyonovo@opensource.org', 'G5IfxeHQHou', 'Female', 'Patient', 0),
(26, 'Miranda', 'Barhims', 'Creight', '2021-06-02', '639-204-4503', 'Goris', NULL, 'Armenia', 'cbarhimsp@buzzfeed.com', 'N1fWf944j', 'Other', 'Patient', 0),
(27, 'Ricki', 'Judson', 'Perice', '2020-12-22', '104-428-2958', 'Yorii', NULL, 'Japan', 'pjudsonq@smh.com.au', 'llMtwFXX1K', 'Female', 'Admin', 0),
(28, 'Edythe', 'McCaig', 'Donovan', '2021-08-02', '520-564-3676', 'Batticaloa', NULL, 'Sri Lanka', 'dmccaigr@merriam-webster.com', 'H4f3jMH9e6rw', 'Female', 'Patient', 0),
(29, 'Tybalt', 'Lacroix', 'Ganny', '2020-12-10', '517-779-2599', 'Ampele??es', NULL, 'Greece', 'glacroixs@utexas.edu', 'VpFA8JlkGmo8', 'Female', 'Admin', 0),
(30, 'Teodoor', 'Caswall', 'Dav', '2021-08-12', '497-225-1551', 'Yankou', NULL, 'China', 'dcaswallt@angelfire.com', 'olDf71r85Y8', 'Other', 'Patient', 0),
(31, 'Marcelline', 'Kopfen', 'Desmond', '2020-11-16', '911-389-3768', 'Sydney', 'New South Wales', 'Australia', 'dkopfenu@chron.com', '7dfCI78LzK', 'Female', 'Admin', 0),
(32, 'Francesco', 'Younie', 'Redford', '2021-01-31', '303-845-2881', 'Pivijay', NULL, 'Colombia', 'ryouniev@howstuffworks.com', 'PmncivyV1U27', 'Other', 'Patient', 0),
(33, 'Daphne', 'Wharton', 'Weider', '2021-06-11', '171-872-4609', 'Basseterre', NULL, 'Saint Kitts and Nevis', 'wwhartonw@uiuc.edu', 'g07tBdZvn', 'Male', 'Patient', 0),
(34, 'Gordan', 'Masding', 'Cheston', '2021-02-11', '808-936-0856', 'Hayes', NULL, 'Jamaica', 'cmasdingx@nature.com', 'NI2cmHSR', 'Other', 'Patient', 0),
(35, 'Annabal', 'Vernay', 'Neville', '2021-03-03', '745-794-3869', 'Rzesz??w', NULL, 'Poland', 'nvernayy@twitpic.com', '2we7m6', 'Male', 'Admin', 0),
(36, 'Jerrie', 'Wodham', 'Casey', '2020-11-25', '818-746-7741', 'Bamban', NULL, 'Indonesia', 'cwodhamz@spotify.com', 'cwodhamz@spotify.com', 'Female', 'Doctor', 0),
(37, 'Gwen', 'Sorton', 'Julian', '2020-10-21', '585-813-3202', 'Kebonkai', NULL, 'Indonesia', 'jsorton10@ebay.co.uk', 'h4HatYv4PJW', 'Other', 'Admin', 0),
(38, 'Marchelle', 'Dedham', 'Leicester', '2021-03-11', '505-249-8087', 'Akonolinga', NULL, 'Cameroon', 'ldedham11@csmonitor.com', 'ta9vaNy5', 'Male', 'Admin', 0),
(39, 'Bliss', 'Tschierse', 'Calvin', '2020-11-15', '160-927-4934', 'Widorokandang', NULL, 'Indonesia', 'ctschierse12@addthis.com', 'EkjmxrYndU', 'Female', 'Admin', 0),
(40, 'Clarke', 'Legion', 'Reg', '2021-04-06', '145-580-8647', 'Puk??', NULL, 'Albania', 'rlegion13@google.pl', 'H9IMvSJo', 'Other', 'Admin', 0),
(41, 'Marlo', 'Windsor', 'Bart', '2021-03-09', '475-787-1221', 'Savyon', NULL, 'Israel', 'bwindsor14@time.com', 'Cl3qlBN', 'Other', 'Patient', 0),
(42, 'Godiva', 'Jovanovic', 'Gardiner', '2021-05-22', '207-623-1595', 'Jishui', NULL, 'China', 'gjovanovic15@indiatimes.com', 'bZyjMi', 'Male', 'Admin', 0),
(43, 'Alexander', 'Connal', 'Dionisio', '2021-04-04', '207-522-7524', 'Jacara??', 'Connal ', 'Brazil', 'dconnal16@ftc.gov', 'dconnal16@ftc.gov', 'Male', 'Patient', 0),
(44, 'Kass', 'Danilyuk', 'Westley', '2021-05-01', '846-290-8354', 'Anling', NULL, 'China', 'wdanilyuk17@theglobeandmail.com', 'r3lTmeV9ruc', 'Female', 'Admin', 0),
(45, 'Lois', 'Mandal', 'Waite', '2021-07-15', '317-686-2060', 'Obonoma', 'dsfsdf', 'Nigeria', 'wmandal18@dagondesign.com', 'wmandal18@dagondesign.com', 'Male', 'Doctor', 0),
(46, 'Hasty', 'Brasse', 'Art', '2021-04-26', '537-209-7674', 'Babakan', NULL, 'Indonesia', 'abrasse19@tinypic.com', '1vNBEKc', 'Male', 'Admin', 0),
(47, 'Cassie', 'Molloy', 'Urban', '2021-01-01', '461-586-0157', 'Mentaras', NULL, 'Indonesia', 'umolloy1a@biglobe.ne.jp', 'SlUcSwx', 'Female', 'Patient', 0),
(48, 'Keenan', 'Croasdale', 'Orlando', '2021-08-24', '974-291-5867', 'Campo Alegre', NULL, 'Brazil', 'ocroasdale1b@plala.or.jp', 'ZiPNI1gqI', 'Male', 'Patient', 0),
(49, 'Keene', 'Polin', 'Logan', '2021-02-11', '510-836-3171', 'Tr??s Rios', NULL, 'Brazil', 'lpolin1c@statcounter.com', 'BJnnFYwydi', 'Other', 'Admin', 0),
(50, 'Natividad', 'Malacrida', 'Nels', '2020-10-27', '300-787-3972', 'Bailuquan', NULL, 'China', 'nmalacrida1d@nytimes.com', 'RvWYrDE2sNsx', 'Male', 'Admin', 0),
(51, 'Aurelie', 'Fraschetti', 'Ange', '2021-03-08', '584-488-5384', 'Nikolayevsk', NULL, 'Russia', 'afraschetti1e@hud.gov', 'uFHrfDZXg2', 'Male', 'Patient', 0),
(52, 'Reeta', 'Dunlap', 'Pooh', '2021-04-09', '810-656-0730', 'Nangahale', NULL, 'Indonesia', 'pdunlap1f@upenn.edu', 'hxMmQ2HSWv', 'Male', 'Admin', 0),
(53, 'Ryley', 'Oglethorpe', 'Reagen', '2021-02-19', '123-946-9243', 'Sanzhou', NULL, 'China', 'roglethorpe1g@csmonitor.com', 'IQYArVS0n', 'Other', 'Patient', 0),
(54, 'Lock', 'McVity', 'Craggie', '2021-08-09', '819-397-5286', 'Chuqui Chuqui', NULL, 'Bolivia', 'cmcvity1h@adobe.com', 'fGMMgqnjQlqx', 'Female', 'Admin', 0),
(55, 'Oates', 'Rosenstiel', 'Booth', '2021-05-03', '611-923-7652', '??wilcza', NULL, 'Poland', 'brosenstiel1i@harvard.edu', 'XwyZxG', 'Female', 'Admin', 0),
(56, 'Erminia', 'Sowersby', 'Wat', '2020-11-01', '317-993-5546', 'N??ssj??', 'J??nk??ping', 'Sweden', 'wsowersby1j@webmd.com', 'wsowersby1j@webmd.com', 'Female', 'Patient', 0),
(57, 'Fonzie', 'Harm', 'Craggy', '2021-03-10', '891-573-9205', 'Mando', NULL, 'Nigeria', 'charm1k@fc2.com', '1t62ITs', 'Male', 'Patient', 0),
(58, 'Doloritas', 'Plessing', 'Garrard', '2021-06-11', '694-614-8336', 'Zastron', NULL, 'South Africa', 'gplessing1l@newyorker.com', 'G7mCS0d9', 'Other', 'Patient', 0),
(59, 'Gussie', 'Hutable', 'Cy', '2021-08-04', '569-519-8100', 'Anan', NULL, 'Japan', 'chutable1m@businessweek.com', 'KMSRNy', 'Other', 'Patient', 0),
(60, 'Austin', 'Manzell', 'Rowland', '2021-03-28', '828-712-3796', 'Slavkov u Brna', 'd', 'Czech Republic', 'rmanzell1n@webs.com', 'rmanzell1n@webs.com', 'Female', 'Patient', 0),
(61, 'Estella', 'Eades', 'Norton', '2020-10-20', '568-197-1813', 'Longjiang', NULL, 'China', 'neades1o@japanpost.jp', '0DhFyYdaOchn', 'Female', 'Patient', 0),
(62, 'Rollin', 'Adrienne', 'Tomaso', '2021-06-22', '233-440-9109', 'Plast', NULL, 'Russia', 'tadrienne1p@mail.ru', 'v91j7aEsqQ', 'Other', 'Admin', 0),
(63, 'Berky', 'Collcutt', 'Wally', '2021-03-18', '272-809-5213', 'Tilburg', 'Provincie Noord-Brabant', 'Netherlands', 'wcollcutt1q@newyorker.com', '1F856z', 'Male', 'Admin', 0),
(64, 'Tuesday', 'Cowern', 'Terrance', '2021-04-15', '459-502-9975', 'Pomichna', NULL, 'Ukraine', 'tcowern1r@state.gov', 'D1Bons', 'Female', 'Admin', 0),
(65, 'Ebony', 'Pibworth', 'Phip', '2020-10-03', '329-136-2525', 'Senador Pompeu', NULL, 'Brazil', 'ppibworth1s@hhs.gov', 'djmU6vde', 'Other', 'Admin', 0),
(66, 'Venus', 'Brownill', 'Darrell', '2020-09-10', '369-391-0638', 'Maliuzui', NULL, 'China', 'dbrownill1t@homestead.com', 'IHRmvaV7', 'Male', 'Patient', 0),
(67, 'Charmian', 'Beardshaw', 'Tedd', '2020-11-03', '948-827-3114', 'Calde', 'Viseu', 'Portugal', 'tbeardshaw1u@w3.org', '5xGYbZYJE', 'Male', 'Admin', 0),
(68, 'Remy', 'Bradick', 'Waylon', '2020-11-22', '165-622-4310', 'Kabardinka', NULL, 'Russia', 'wbradick1v@cloudflare.com', 'pHscnydJ01V', 'Female', 'Admin', 0),
(69, 'Nettie', 'D\'Alesco', 'Kennie', '2021-04-27', '139-717-4517', 'Caiyuan', NULL, 'China', 'kdalesco1w@blogtalkradio.com', 'vdNq60A3zR', 'Male', 'Admin', 0),
(70, 'Leighton', 'Lilly', 'Darnall', '2021-07-29', '297-468-6292', 'Kawangkoan', NULL, 'Indonesia', 'dlilly1x@vimeo.com', 'qs28Hw', 'Male', 'Patient', 0),
(71, 'Daryl', 'Sutliff', 'Skipp', '2020-09-18', '141-835-0747', 'Rojas', NULL, 'Argentina', 'ssutliff1y@digg.com', '6HCph1', 'Male', 'Patient', 0),
(72, 'Lesli', 'Hache', 'Faber', '2021-03-17', '356-929-2710', 'Horqueta', NULL, 'Paraguay', 'fhache1z@webeden.co.uk', 'o8fHMfgpFZW', 'Female', 'Patient', 0),
(73, 'Janifer', 'Hitschke', 'Graig', '2021-08-03', '142-307-4440', 'K??kar', NULL, 'Aland Islands', 'ghitschke20@usnews.com', 'SM1I7vg0C', 'Other', 'Patient', 0),
(74, 'Michaeline', 'Heakins', 'Casar', '2021-02-23', '554-164-2144', 'Krasica', NULL, 'Croatia', 'cheakins21@mysql.com', 'ohCjCokGMy', 'Male', 'Patient', 0),
(75, 'Danni', 'Curme', 'Buddie', '2021-05-20', '772-663-5585', 'Dalu', NULL, 'China', 'bcurme22@wired.com', 'ediSNin', 'Male', 'Admin', 0),
(76, 'Elna', 'Creigan', 'Giles', '2021-07-01', '137-126-2188', 'Turiys???k', NULL, 'Ukraine', 'gcreigan23@barnesandnoble.com', 'Iv0BiSe', 'Female', 'Patient', 0),
(77, 'Jacob', 'Flewitt', 'Guss', '2021-02-01', '496-102-4913', 'Xianlin', NULL, 'China', 'gflewitt24@spiegel.de', '6ll4cGs', 'Male', 'Admin', 0),
(78, 'Ettore', 'Archibold', 'Reider', '2021-03-02', '874-832-3622', 'Comagascas', NULL, 'Philippines', 'rarchibold25@spiegel.de', 'OxQxUV5', 'Female', 'Admin', 0),
(79, 'Ezri', 'McCoughan', 'Way', '2021-05-31', '463-843-1608', 'Tetovo', NULL, 'Macedonia', 'wmccoughan26@about.me', 'J4yWrE', 'Other', 'Patient', 0),
(80, 'Armstrong', 'House', 'Hilary', '2021-01-23', '398-803-9127', 'Barras', NULL, 'Brazil', 'hhouse27@lulu.com', 'vH4UTpy', 'Other', 'Admin', 0),
(81, 'Ferdinanda', 'O\'Bradain', 'Romain', '2020-11-17', '329-916-8036', 'Sawahbaru', NULL, 'Indonesia', 'robradain28@so-net.ne.jp', 'ZEorNC', 'Female', 'Admin', 0),
(82, 'Clem', 'Stubbe', 'Isac', '2021-01-15', '740-875-0978', 'Villa Dolores', NULL, 'Argentina', 'istubbe29@simplemachines.org', 'qvAIH9f', 'Female', 'Admin', 0),
(83, 'Cicily', 'Veare', 'Matthias', '2021-04-01', '104-694-5550', 'Longju', NULL, 'China', 'mveare2a@chicagotribune.com', 'i8Lsm9T', 'Male', 'Patient', 0),
(84, 'Charla', 'Polak', 'Vito', '2021-03-08', '336-738-0693', 'Lamak', NULL, 'Philippines', 'vpolak2b@oracle.com', 'zNVXUS4tk', 'Male', 'Patient', 0),
(85, 'Arlina', 'Poyle', 'Gilberto', '2021-03-01', '975-143-9564', 'Prokuplje', NULL, 'Serbia', 'gpoyle2c@opera.com', 'oOgSstfH', 'Male', 'Admin', 0),
(86, 'Elwira', 'Tippings', 'Randie', '2021-04-22', '541-379-0459', 'Buta', NULL, 'Democratic Republic of the Congo', 'rtippings2d@artisteer.com', '535WxNr19Xz', 'Other', 'Patient', 0),
(87, 'Freddy', 'Collishaw', 'Gaspard', '2021-04-17', '510-864-1613', 'Biha??', NULL, 'Bosnia and Herzegovina', 'gcollishaw2e@vistaprint.com', 'TXwDsX4CH', 'Other', 'Admin', 0),
(88, 'Dietrich', 'Neaves', 'Zak', '2021-04-24', '931-320-1548', 'Middleton', 'Nova Scotia', 'Canada', 'zneaves2f@vinaora.com', '7H29wz81y1', 'Other', 'Patient', 0),
(89, 'Emma', 'Sawart', 'Sven', '2021-01-17', '169-506-5731', 'Sainte-Agathe-des-Monts', 'Qu??bec', 'Canada', 'ssawart2g@alexa.com', '79FXnVgE', 'Male', 'Patient', 0),
(90, 'Dina', 'Lace', 'Korey', '2020-10-22', '562-243-4116', 'Sannois', '??le-de-France', 'France', 'klace2h@mayoclinic.com', 'NtNECFZ', 'Male', 'Patient', 0),
(91, 'Roxanna', 'Fossord', 'Cory', '2021-05-01', '773-693-9789', 'Lesnoy', NULL, 'Russia', 'cfossord2i@biglobe.ne.jp', 'eU64hNn0RpoV', 'Other', 'Admin', 0),
(92, 'Pail', 'Roscamp', 'Rafaello', '2021-04-05', '165-631-2790', 'Jinping', NULL, 'China', 'rroscamp2j@squidoo.com', 'uakTAn', 'Female', 'Patient', 0),
(93, 'Gert', 'Wrightham', 'Shelley', '2021-03-23', '929-134-6300', 'Nyangao', NULL, 'Tanzania', 'swrightham2k@shinystat.com', 'nqbGDu', 'Female', 'Admin', 0),
(94, 'Tammy', 'Redpath', 'Archaimbaud', '2021-06-02', '256-521-0671', 'Langford', 'British Columbia', 'Canada', 'aredpath2l@tamu.edu', '5gAgVc', 'Female', 'Patient', 0),
(95, 'Willyt', 'Wannan', 'Gustav', '2020-12-17', '446-458-5439', 'Achanizo', NULL, 'Peru', 'gwannan2m@nydailynews.com', 'iTeeZ6', 'Other', 'Admin', 0),
(96, 'Rudolfo', 'Edscer', 'Quinton', '2021-01-09', '282-876-9928', 'Gemena', NULL, 'Democratic Republic of the Congo', 'qedscer2n@wordpress.com', 'Cz8X3pK', 'Female', 'Patient', 0),
(97, 'Klaus', 'Potten', 'Desmund', '2021-06-19', '307-863-5280', 'Kota Kinabalu', 'Sabah', 'Malaysia', 'dpotten2o@cocolog-nifty.com', '5YxEMwxhi', 'Male', 'Patient', 0),
(98, 'Raffarty', 'Bischoff', 'Stevie', '2021-07-14', '991-125-5790', 'Shashemen??', NULL, 'Ethiopia', 'sbischoff2p@thetimes.co.uk', 'qdraTy0fo0', 'Other', 'Patient', 0),
(99, 'Gabriela', 'Dimitrijevic', 'Sinclair', '2021-01-10', '992-846-1639', 'Shyroke', NULL, 'Ukraine', 'sdimitrijevic2q@dagondesign.com', 'je4MNdMbW', 'Male', 'Admin', 0),
(100, 'Diane', 'Churn', 'Carlyle', '2021-07-20', '157-771-9875', 'Maulawin', NULL, 'Philippines', 'cchurn2r@wiley.com', 'V4YVU5', 'Other', 'Admin', 0),
(101, 'Chic', 'Rosling', 'Muhammad', '2021-05-19', '173-723-2775', 'San Silvestre', NULL, 'Venezuela', 'mrosling2s@wikispaces.com', 'XCJhBR', 'Female', 'Admin', 0),
(102, 'Harriott', 'Cuzen', 'Douglass', '2021-06-05', '313-858-2452', 'Caomiao', NULL, 'China', 'dcuzen2t@salon.com', 'FtHURAlnl', 'Other', 'Patient', 0),
(104, 'Giorgia', 'Coste', 'Cecilio', '2021-08-30', '442-240-5642', 'Ketapang', NULL, 'Indonesia', 'ccoste2v@nhs.uk', 'z3rEf7', 'Other', 'Admin', 0),
(105, 'Morgana', 'Kayes', 'Justen', '2021-01-25', '715-836-4608', 'Pul-e Sang??', NULL, 'Afghanistan', 'jkayes2w@ehow.com', '8gWmmx3', 'Male', 'Admin', 0),
(106, 'Pierce', 'Migheli', 'Pattin', '2021-02-08', '256-776-4306', 'Bouca', NULL, 'Central African Republic', 'pmigheli2x@yolasite.com', 'LeJS3o1QOR6', 'Male', 'Admin', 0),
(107, 'Fabiano', 'Cathery', 'Pepito', '2021-05-07', '533-210-6782', 'Eadestown', NULL, 'Ireland', 'pcathery2y@jigsy.com', '8BT20gMp3', 'Other', 'Admin', 0),
(108, 'Torrence', 'Ilieve', 'Marshal', '2021-03-27', '980-116-2988', 'Heishan', NULL, 'China', 'milieve2z@imageshack.us', '4vkLud', 'Other', 'Admin', 0),
(109, 'Hamilton', 'Spellacey', 'Gardner', '2021-07-15', '889-818-3364', 'Yuanmen', NULL, 'China', 'gspellacey30@census.gov', 'EO35KstXB', 'Male', 'Patient', 0),
(110, 'Jerrilyn', 'Howel', 'Kenon', '2021-05-29', '274-903-1630', 'Tanghua', NULL, 'China', 'khowel31@unesco.org', '2mEmQaKvF', 'Other', 'Admin', 0),
(111, 'Verney', 'Shildrick', 'Garrot', '2020-12-29', '950-643-6682', 'Kotauneng', NULL, 'Indonesia', 'gshildrick32@google.ru', 'f31zRFxK', 'Female', 'Patient', 0),
(112, 'Lexie', 'Juzek', 'Matt', '2021-02-10', '482-926-6091', 'Str????nice', NULL, 'Czech Republic', 'mjuzek33@cloudflare.com', '8VjjZ8J', 'Other', 'Admin', 0),
(113, 'Haroun', 'Machent', 'Mikol', '2021-05-31', '317-557-0666', 'Drybin', NULL, 'Belarus', 'mmachent34@cocolog-nifty.com', 'l22I7Th', 'Male', 'Admin', 0),
(114, 'Rogers', 'Northedge', 'Denis', '2021-04-23', '884-920-3799', 'Richibucto', 'New Brunswick', 'Canada', 'dnorthedge35@ed.gov', 'IDOLboRSyTz', 'Male', 'Patient', 0),
(115, 'Hamil', 'Beecker', 'Yule', '2021-09-05', '872-479-2745', 'Qingshui', NULL, 'China', 'ybeecker36@themeforest.net', 'VXw11DoE2', 'Male', 'Patient', 0),
(116, 'Gabi', 'Josey', 'Cosme', '2021-08-28', '273-202-5369', 'Bang Lamung', NULL, 'Thailand', 'cjosey37@naver.com', '1hiVOW', 'Female', 'Admin', 0),
(117, 'Johnnie', 'Blumire', 'Hilly', '2020-12-25', '372-621-9172', 'Warin Chamrap', NULL, 'Thailand', 'hblumire38@netscape.com', 'KWnbfsCdNC', 'Male', 'Patient', 0),
(118, 'Syman', 'Livingstone', 'Frans', '2020-11-08', '661-697-7344', 'Dong???an', NULL, 'China', 'flivingstone39@altervista.org', 'nAZXQ5Uz', 'Female', 'Admin', 0),
(119, 'Kirsti', 'd\' Elboux', 'Dom', '2020-11-08', '497-244-1850', 'Saltsj??-Boo', 'Stockholm', 'Sweden', 'ddelboux3a@wikipedia.org', 'tIXyOSow', 'Male', 'Patient', 0),
(120, 'Rheba', 'Remon', 'Will', '2020-09-26', '647-792-6335', 'Los Rastrojos', NULL, 'Venezuela', 'wremon3b@theglobeandmail.com', 'ZuISAE7LGL', 'Male', 'Patient', 0),
(121, 'Chauncey', 'Ades', 'Andrea', '2021-03-17', '199-225-0694', 'Sumber Tengah', NULL, 'Indonesia', 'aades3c@senate.gov', 'UfYgLBuj', 'Female', 'Admin', 0),
(122, 'Giavani', 'Rawe', 'Hakeem', '2020-11-27', '203-853-6004', 'Maswa', NULL, 'Tanzania', 'hrawe3d@chronoengine.com', 'p01MAKV7L', 'Male', 'Admin', 0),
(123, 'Christye', 'Ebben', 'Keenan', '2021-06-15', '673-253-1677', 'Sardoal', 'Porto', 'Portugal', 'kebben3e@edublogs.org', 'yJCIsWpVrg', 'Other', 'Admin', 0),
(124, 'Geri', 'Scupham', 'Tomas', '2021-04-27', '123-950-4366', 'Rubizhne', NULL, 'Ukraine', 'tscupham3f@imgur.com', '5ALlbyqn', 'Female', 'Patient', 0),
(125, 'Ludwig', 'Rosenfelt', 'Ollie', '2021-07-29', '864-676-5448', 'Aksu', NULL, 'Kazakhstan', 'orosenfelt3g@xinhuanet.com', 'pa4KDOZd', 'Female', 'Patient', 0),
(126, 'Chucho', 'Kerin', 'Jeramey', '2020-12-20', '359-308-5494', 'Songhu', NULL, 'China', 'jkerin3h@yelp.com', '6BRPEMUx', 'Male', 'Admin', 0),
(127, 'El', 'Wratten', 'Hagen', '2021-07-06', '511-407-8160', 'Cabcaben', NULL, 'Philippines', 'hwratten3i@wufoo.com', 'KzK4ReN', 'Other', 'Admin', 0),
(128, 'Codi', 'Lefley', 'Merell', '2021-06-28', '878-280-3646', 'Shatian', NULL, 'China', 'mlefley3j@friendfeed.com', 'HVVbyx', 'Male', 'Admin', 0),
(129, 'Florian', 'Jerrans', 'Kevin', '2021-08-30', '828-132-3187', 'Korba', NULL, 'Tunisia', 'kjerrans3k@sina.com.cn', 'ARCJICtjz3f', 'Female', 'Admin', 0),
(130, 'Lusa', 'Labbett', 'Carlo', '2021-08-20', '623-545-7306', 'S??c Tr??ng', NULL, 'Vietnam', 'clabbett3l@naver.com', 'cQ4LwfY1f7f', 'Female', 'Admin', 0),
(131, 'Ximenez', 'Ketteringham', 'Caz', '2021-07-29', '837-835-0252', 'Lyon', 'Rh??ne-Alpes', 'France', 'cketteringham3m@amazon.co.jp', 'x7D5HrEmC', 'Male', 'Patient', 0),
(132, 'Josie', 'Howlett', 'Dannie', '2020-12-10', '881-352-9759', 'Wuxue Shi', NULL, 'China', 'dhowlett3n@sina.com.cn', '5969k5Hb', 'Female', 'Patient', 0),
(133, 'Aurelie', 'Zammett', 'Mikael', '2020-12-17', '809-450-5852', 'Donglai', NULL, 'China', 'mzammett3o@goo.ne.jp', 'GJPx7lhYl', 'Male', 'Patient', 0),
(134, 'Deane', 'Colisbe', 'Sky', '2021-04-14', '619-867-7805', 'Banatski Despotovac', NULL, 'Serbia', 'scolisbe3p@amazon.com', 'esIfy8', 'Other', 'Patient', 0),
(135, 'Gan', 'Mardoll', 'Rodolph', '2021-03-29', '100-142-8634', 'Croix', 'Nord-Pas-de-Calais', 'France', 'rmardoll3q@sohu.com', 'KqmuZ4H', 'Other', 'Admin', 0),
(136, 'Esme', 'Enga', 'Nicolis', '2021-08-21', '880-756-2842', 'Colomiers', 'Midi-Pyr??n??es', 'France', 'nenga3r@ameblo.jp', 'vMgOysrObuF', 'Other', 'Admin', 0),
(137, 'Braden', 'Bayly', 'Sidnee', '2020-12-27', '927-407-4431', 'Nago', NULL, 'Japan', 'sbayly3s@independent.co.uk', 'JAQqsr0nrhy', 'Male', 'Patient', 0),
(138, 'Mil', 'Bernardotti', 'Brody', '2021-08-19', '575-305-6736', 'Pantijan No 2', NULL, 'Philippines', 'bbernardotti3t@dot.gov', 'dpYVkoOPG', 'Male', 'Patient', 0),
(139, 'Shellysheldon', 'O\'Toole', 'Gannie', '2020-12-10', '467-100-1743', 'Bieto', NULL, 'Indonesia', 'gotoole3u@oaic.gov.au', 'hNYbaQ', 'Female', 'Patient', 0),
(140, 'Cherlyn', 'Leavry', 'Brooks', '2021-06-28', '242-824-2192', '????miyah', NULL, 'Egypt', 'bleavry3v@hubpages.com', 'trZXDFNsR7E', 'Male', 'Patient', 0),
(141, 'Nikoletta', 'Cantua', 'Syd', '2020-11-08', '369-932-0183', '???????????????? ????????', NULL, 'Ukraine', 'scantua3w@dedecms.com', 'oVFB8RlDF', 'Other', 'Admin', 0),
(142, 'Benjie', 'Elles', 'Derrick', '2021-06-05', '430-134-5241', 'Huage', NULL, 'China', 'delles3x@jimdo.com', 'lz4QnJuv', 'Male', 'Patient', 0),
(143, 'Mahalia', 'Presidey', 'Halsey', '2021-01-11', '587-276-5056', 'Malie', NULL, 'Samoa', 'hpresidey3y@umich.edu', 'QEo7qplmjg', 'Other', 'Admin', 0),
(144, 'Micky', 'Lochran', 'Iggy', '2021-08-08', '115-751-7159', 'Canauay', NULL, 'Philippines', 'ilochran3z@blinklist.com', 't5Bl7s7X', 'Other', 'Admin', 0),
(145, 'Tyler', 'Climar', 'Odo', '2021-07-16', '153-789-3528', 'Bitkine', NULL, 'Chad', 'oclimar40@netlog.com', '5qZKhUo', 'Other', 'Patient', 0),
(146, 'Sondra', 'Bellenie', 'Kippar', '2020-12-07', '111-963-2762', 'Bourges', 'Centre', 'France', 'kbellenie41@mac.com', 'v1dGKJMkd8', 'Male', 'Patient', 0),
(147, 'Tull', 'Bacon', 'Barny', '2021-07-18', '703-438-6106', 'Nemuro', NULL, 'Japan', 'bbacon42@businessweek.com', 'EI9Wconm', 'Female', 'Admin', 0),
(148, 'Curtice', 'Rubra', 'Eberto', '2021-03-27', '862-917-8457', 'Newark', 'New Jersey', 'United States', 'erubra43@php.net', 'JkAKIHy', 'Female', 'Patient', 0),
(149, 'Alfie', 'Cerith', 'Lance', '2021-09-05', '653-777-1209', 'Romblon', NULL, 'Philippines', 'lcerith44@purevolume.com', 'SAq0Q7pL', 'Male', 'Admin', 0),
(150, 'Teressa', 'Carillo', 'Ulrick', '2021-07-23', '472-623-8327', 'Afonsoeiro', 'Set??bal', 'Portugal', 'ucarillo45@earthlink.net', 'N7txB3ez9O0', 'Female', 'Patient', 0),
(151, 'b', 'b', 'b', '2021-09-10', 'b', 'b', 'b', 'b', 'a@a', 'bb', 'Other', 'Patient', 0),
(153, 'Kashif', 'Ali', 'Rabbani', '2021-09-09', '03118547875', 'Rwp', 'Punjab', 'Pakistan', 'kashif@ali.com', 'kashif@ali.com', 'Male', 'Admin', 0),
(159, 'John Victor', '', '', '2021-09-09', '2332', 'ds', NULL, 'sdf', 'doc@tor.com', 'doc@tor.com', '', 'Doctor', 1),
(175, 'asfd', 'adsffdfsa', 'afdaf', '2021-09-08', '4443', 'asdfasdf', NULL, 'dsfsdf', 'jj@d.d', 'jj@d.d', 'Other', 'Doctor', 0),
(176, 'gg', 'g', 'g', '2021-09-23', '4', 'a', NULL, 'd', 'm@m.m', 'm@m.m', 'Other', 'Patient', 0),
(177, 'Doctor', 'Testing', 'User', '2021-09-11', '+92584256', 'Cityher', NULL, 'def', 'doctor@user.com', 'doctor@user.com', '', 'Doctor', 0),
(178, 'Patient', 'User', 'test', '2021-09-08', '+925555555', 'abc', NULL, 'ghi', 'patient@123.com', 'patient@123.com', 'Female', 'Patient', 0),
(180, 'asfd', 'asfasdf', 'sdf', '2021-10-19', '+355 4 344 2425', '', NULL, 'AL', 'asf@zb', 'asf@zb', 'Other', 'Doctor', 0),
(181, 'asfd', 'fasdf', 'fdasd', '2021-10-13', '+213 43 53 53 53', '', NULL, 'DZ', 'af@ag', 'as', 'Female', 'Doctor', 0),
(183, 'asfdfs', 'asdf', 'asf', '2021-10-22', '+593 2-563-6273', '', NULL, 'EC', 'asfda@tya', 'GoogleDrive@123', '', 'Doctor', 0),
(184, 'asf', 'sad', 'sf', '2021-10-12', '+376 363 663', '', NULL, 'AD', 'a@asf', 'aaa3', 'Female', 'Doctor', 0),
(185, 'asf', 'sad', 'sf', '2021-10-12', '+376 363 663', '', NULL, 'AD', 'a@asf', 'aaa3', 'Female', 'Doctor', 0),
(186, 'asf', 'sad', 'sf', '2021-10-12', '+376 363 663', '', NULL, 'AD', 'a@asf', 'aaa3', 'Female', 'Doctor', 0),
(187, '', '', '', '0000-00-00', '', '', NULL, '', '', '', '', '', 0),
(188, 'sdf', 'asdf', 'asdf', '2021-10-11', '+213 43 55 25 26', '', NULL, 'DZ', 'd@a', 'aaaa', 'Female', 'Doctor', 0),
(189, '', '', '', '0000-00-00', '', '', NULL, '', '', '', '', '', 0),
(190, 'asf', 'asf', 'asf', '2021-10-02', '+213 36 36 36 36', '', NULL, 'DZ', 'a@h', 'ggggg', 'Other', 'Patient', 0),
(191, 'fsad', 'asf', 'asf', '2021-10-21', '+355 34 535 353', '', NULL, 'AL', 'af@afg', 'af', 'Other', 'Doctor', 0),
(192, 'fadf', 'adf', 'adf', '2021-10-07', '+220 677 7333', '', NULL, 'GM', 'afd@jk', 'af', 'Other', 'Doctor', 0),
(193, 'af', 'asdf', 'asf', '2021-10-16', '+376 356 336', '', NULL, 'AD', '24@FG', 'SDFG', 'Female', 'Doctor', 0),
(194, 'ASDF', 'ASDF', 'ASDF', '2021-10-20', '+66 77 777 777', '', NULL, 'TH', 'SDFG@ASDF', 'AS', 'Female', 'Doctor', 0),
(195, 'asdf', 'adsf', 'dsaf', '2021-10-06', '+93 42 244 2442', '', NULL, 'AF', 'asf@fg', 'asdf', 'Female', 'Doctor', 0),
(196, '', '', '', '0000-00-00', '', '', NULL, '', '', '', '', '', 0),
(197, 'asdf', 'adf', 'asdf', '2021-10-05', '+213 34 43 34 34', '', NULL, 'DZ', 'sfad@asdf', 'asdf', 'Female', 'Doctor', 1),
(198, '', '', '', '0000-00-00', '', '', NULL, '', '', '', '', '', 0),
(199, 'asdf', 'asdf', 'asd', '2021-10-21', '+213 23 42 34 24', '', NULL, 'DZ', 'asf@jkl', 'asdf', 'Female', 'Doctor', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `doctors`
--
ALTER TABLE `doctors`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `signupemailtoken`
--
ALTER TABLE `signupemailtoken`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `appointments`
--
ALTER TABLE `appointments`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `doctors`
--
ALTER TABLE `doctors`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `signupemailtoken`
--
ALTER TABLE `signupemailtoken`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=200;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 172.23.0.2 (MySQL 5.7.20)
# Database: dockersetup
# Generation Time: 2017-11-28 21:43:32 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


 ------------------------------------------------------------
CREATE DATABASE IF NOT EXISTS dockersetup;

USE dockersetup;


DROP TABLE IF EXISTS `admin`;

CREATE TABLE `admin` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;

INSERT INTO `admin` (`id`, `username`, `password`)
VALUES
	(1,'admin','$2a$10$Xv.yOTKudHuubtOiKPUGGuIuFtVDU4XmB3EK.rBnAQ3yHT9rwBMaO');

/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table name
# ------------------------------------------------------------

DROP TABLE IF EXISTS `name`;

CREATE TABLE `name` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `name` WRITE;
/*!40000 ALTER TABLE `name` DISABLE KEYS */;

INSERT INTO `name` (`id`, `firstname`, `lastname`)
VALUES
	(1,'Scott','Shaper'),
	(2,'Karen','Shaper'),
	(6,'Jazzy','Shaper');

/*!40000 ALTER TABLE `name` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

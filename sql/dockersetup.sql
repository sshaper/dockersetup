
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


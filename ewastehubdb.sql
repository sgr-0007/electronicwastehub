/*
Navicat MySQL Data Transfer

Source Server         : æœ?æœ?
Source Server Version : 50724
Source Host           : 127.0.0.1:3306
Source Database       : ewastehubdb

Target Server Type    : MYSQL
Target Server Version : 50724
File Encoding         : 65001

Date: 2024-02-28 15:28:42
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for tbldeviceclassification
-- ----------------------------
DROP TABLE IF EXISTS `tbldeviceclassification`;
CREATE TABLE `tbldeviceclassification` (
  `deviceclassificationid` int(11) NOT NULL AUTO_INCREMENT,
  `deviceclassification` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`deviceclassificationid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for tbldevicedetails
-- ----------------------------
DROP TABLE IF EXISTS `tbldevicedetails`;
CREATE TABLE `tbldevicedetails` (
  `devicedetailsid` int(11) NOT NULL AUTO_INCREMENT,
  `bonus` double DEFAULT NULL,
  `datatransferfee` double DEFAULT NULL,
  `deviceclassificationid` int(11) DEFAULT NULL,
  `devicetypeid` int(11) DEFAULT NULL,
  `expectedvalue` double DEFAULT NULL,
  `isactive` bit(1) DEFAULT NULL,
  `isdraft` bit(1) DEFAULT NULL,
  `model` varchar(255) DEFAULT NULL,
  `ownerid` int(11) DEFAULT NULL,
  `qrcodedata` varchar(255) DEFAULT NULL,
  `statusid` int(11) DEFAULT NULL,
  `userid` int(11) DEFAULT NULL,
  PRIMARY KEY (`devicedetailsid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for tbldevicetype
-- ----------------------------
DROP TABLE IF EXISTS `tbldevicetype`;
CREATE TABLE `tbldevicetype` (
  `devicetypeid` int(11) NOT NULL AUTO_INCREMENT,
  `devicetype` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`devicetypeid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for tblqrusage
-- ----------------------------
DROP TABLE IF EXISTS `tblqrusage`;
CREATE TABLE `tblqrusage` (
  `qrusageid` varchar(255) NOT NULL ,
  `isused` bit(1) DEFAULT NULL,
  PRIMARY KEY (`qrusageid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for tblreferral
-- ----------------------------
DROP TABLE IF EXISTS `tblreferral`;
CREATE TABLE `tblreferral` (
  `referralid` int(11) NOT NULL AUTO_INCREMENT,
  `devicedetailsid` int(11) DEFAULT NULL,
  `ownerid` int(11) DEFAULT NULL,
  `referralpoints` double DEFAULT NULL,
  PRIMARY KEY (`referralid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for tblrole
-- ----------------------------
DROP TABLE IF EXISTS `tblrole`;
CREATE TABLE `tblrole` (
  `roleid` int(11) NOT NULL AUTO_INCREMENT,
  `role` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`roleid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for tblstatus
-- ----------------------------
DROP TABLE IF EXISTS `tblstatus`;
CREATE TABLE `tblstatus` (
  `statusid` int(11) NOT NULL AUTO_INCREMENT,
  `status` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`statusid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for tblusers
-- ----------------------------
DROP TABLE IF EXISTS `tblusers`;
CREATE TABLE `tblusers` (
  `userid` int(11) NOT NULL AUTO_INCREMENT,
  `password` varchar(255) DEFAULT NULL,
  `useremail` varchar(255) DEFAULT NULL,
  `roleid` int(11) DEFAULT NULL,
  PRIMARY KEY (`userid`),
  KEY `FK73egnvwe3ps64ty7sery91h2b` (`roleid`),
  CONSTRAINT `FK73egnvwe3ps64ty7sery91h2b` FOREIGN KEY (`roleid`) REFERENCES `tblrole` (`roleid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

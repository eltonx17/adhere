-- Create 'Users' Table
CREATE TABLE IF NOT EXISTS `users` (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `firstname` varchar(100) NOT NULL,
  `lastname` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `usertype` int(1) DEFAULT NULL COMMENT '0 - Admin 1 - Mentor 2 - Mentee',
  `accountstatus` int(1) DEFAULT '0' COMMENT '0 - Inactive 1 - Active',
  `firstlogin` int(1) DEFAULT '0',
  PRIMARY KEY (`uid`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=MyISAM AUTO_INCREMENT=26 DEFAULT CHARSET=latin1;


-- Create 'mentormapping' Table
CREATE TABLE IF NOT EXISTS `mentormapping` (
  `idmentormapping` int(11) NOT NULL AUTO_INCREMENT,
  `mentorid` int(11) DEFAULT NULL,
  `menteeid` int(11) DEFAULT NULL,
  `mapstatus` int(11) DEFAULT '0' COMMENT '0 - Under Review \n1 - Accepted\n2 - Rejected',
  PRIMARY KEY (`idmentormapping`),
  UNIQUE KEY `menteeid_UNIQUE` (`menteeid`),
  KEY `mentorID_idx` (`mentorid`),
  KEY `menteeFK_idx` (`menteeid`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;


-- Create 'menteeworkbook' Table
CREATE TABLE IF NOT EXISTS `menteeworkbook` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `menteeid` int(11) DEFAULT NULL,
  `gst` int(11) NOT NULL DEFAULT '1' COMMENT 'Global Stage Tracker : Stage 1 - 5.',
  `stage1` longtext,
  `stage2` longtext,
  `stage3` longtext,
  `stage4` longtext,
  `stage5` longtext,
  `na` int(11) DEFAULT '0' COMMENT 'Needs Attention: 0 - Mentee needs to fill 1 - Mentor needs to verify',
  PRIMARY KEY (`id`),
  UNIQUE KEY `menteeid_UNIQUE` (`menteeid`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COMMENT='To indicate the stage mentee is in.';

-- Create 'competency' Table
CREATE TABLE IF NOT EXISTS `competency` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `timestamp` timestamp NOT NULL,
  `data` longtext NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- Create 'evidence' Table
DROP TABLE IF EXISTS `evidence`;
CREATE TABLE IF NOT EXISTS `evidence` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `menteeid` int(11) NOT NULL,
  `workbookid` int(11) NOT NULL,
  `filepath` varchar(260) NOT NULL,
  `filename` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
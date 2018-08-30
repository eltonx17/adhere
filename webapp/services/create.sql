-- Create 'Users' Table
CREATE TABLE IF NOT EXISTS `users` (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `firstname` varchar(100) NOT NULL,
  `lastname` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `usertype` int(1) DEFAULT NULL COMMENT '0 - Admin 1 - Mentor 2 - Mentee',
  `accountstatus` int(1) DEFAULT '0' COMMENT '0 - Inactive 1 - Active',
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


-- Create 'competency' Table
CREATE TABLE IF NOT EXISTS `competency` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `timestamp` timestamp NOT NULL,
  `data` longtext NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

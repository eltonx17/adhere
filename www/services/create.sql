-- Create 'Users' Table
CREATE TABLE IF NOT EXISTS `users` (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `firstname` varchar(100) NOT NULL,
  `lastname` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `usertype` int(1) DEFAULT NULL COMMENT '0 - Admin 1 - Mentor 2 - Mentee',
  `status` int(1) DEFAULT NULL COMMENT '0 - Inactive 1 - Under Review 2 - Verified',
  PRIMARY KEY (`uid`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=MyISAM AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;

-- Create 'mentormapping' Table
CREATE TABLE IF NOT EXISTS `mentormapping` (
  `mapid` int(11) NOT NULL AUTO_INCREMENT,
  `menteeid` int(11) DEFAULT NULL,
  `mentorid` int(11) DEFAULT NULL,
  PRIMARY KEY (`mapid`),
  KEY `menteeid_idx` (`menteeid`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=latin1 COMMENT='Mentor Mapping - Connecting Mentee with Mentor';
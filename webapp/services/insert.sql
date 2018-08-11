-- Dumping data for table `users`

INSERT INTO `users` (`uid`, `firstname`, `lastname`, `email`, `password`, `usertype`, `accountstatus`) VALUES
(19, 'Jun', 'Shen', 'js@gmail.com', '123', 0, 1),
(20, 'Nidhin', 'George', 'ngj@gmail.com', '123', 1, 0),
(21, 'Elton', 'Gonsalvez', 'exg@gmail.com', '123', 2, 0),
(22, 'Abhinandan', 'Anantha', 'aa@gmail.com', '123', 2, 0),
(23, 'Sourabh', 'Kulahalli', 'sck@gmail.com', '123', 2, 0),
(24, 'Ping', 'Yu', 'py@gmail.com', '123', 1, 0),
(25, 'Ali', 'Alsh', 'aas@gmail.com', '123', 2, 0);
COMMIT;

-- Dumping data for table `mentormapping`

INSERT INTO `mentormapping` (`idmentormapping`, `mentorid`, `menteeid`, `mapstatus`) VALUES
(1, 20, 21, 0),
(2, 20, 22, 0),
(3, 20, 23, 0),
(4, 24, 25, 0);
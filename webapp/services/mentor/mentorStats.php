<?php
header('Content-type: application/json');

require "../conn.php";

$mentorStats = array();
$totalMentees = 0;
$inactiveMentees = 0;

//Dummy Mentor variable for testing purpose
$nidhinMentor = 27;


//Query to get all users from users table who are not admin
$query = "SELECT * 
FROM users 
INNER JOIN mentormapping 
ON mentormapping.menteeid = users.uid 
AND mentormapping.mentorid = '$nidhinMentor' 
AND users.accountstatus=0 
ORDER BY `users`.`firstname` ASC";
$executeQuery = mysqli_query($db,$query);

//Fetch all rows into var $listOfMentees
$listOfMentees = mysqli_fetch_all ($executeQuery, MYSQLI_ASSOC);

//Run through List of Users to check Number of Mentees ($totalMentees) and Inactive Mentees (inactiveMentees)
foreach ($listOfMentees as $row){
    
    $totalMentees++;
    
    if($row['mapstatus']=="0" || $row['mapstatus']==0) 
        $inactiveMentees++; 
    
}

$mentorStats["totalMentees"] = $totalMentees;
$mentorStats["inactiveMentees"] = $inactiveMentees;
$mentorStats["listOfMentees"] = $listOfMentees;

echo json_encode($mentorStats);


?>
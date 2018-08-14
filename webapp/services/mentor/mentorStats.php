<?php
header('Content-type: application/json');

require "../conn.php";

$mentorStats = array();
$totalMentees = 0;
$inactiveMentees = 0;

$mentorId = mysqli_real_escape_string($db, $_GET['mentorID']);

//Query to get all users from users table who are not admin
$query = "SELECT * 
          FROM users 
          INNER JOIN mentormapping 
          ON mentormapping.menteeid = users.uid 
          AND mentormapping.mentorid = '$mentorId' 
          AND users.accountstatus=0 
          ORDER BY `users`.`firstname` ASC";
$executeQuery = mysqli_query($db,$query);

if (!$executeQuery) {
     $error = array(
            'data'=>'null', 'error'=>array('msg'=>'Failed to get users','code'=>'500')
            );
        echo json_encode($error);
}
else{
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
}
?>
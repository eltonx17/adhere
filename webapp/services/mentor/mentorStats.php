<?php
header('Content-type: application/json');

require "../conn.php";

$mentorStats = array();
$totalMentees = 0;
$inactiveMentees = 0;
$needsAttention = 0;

$mentorId = mysqli_real_escape_string($db, $_GET['mentorID']);

//Query to get all users from users table who are not admin
$query = "SELECT users.uid AS menteeid, users.firstname, users.lastname, users.email, mentormapping.mapstatus, menteeworkbook.gst, menteeworkbook.na
FROM users

 	INNER JOIN mentormapping 
    ON mentormapping.menteeid = users.uid 
    
    	INNER JOIN menteeworkbook
        ON mentormapping.menteeid = menteeworkbook.menteeid
          
    AND mentormapping.mentorid = '$mentorId' 
    AND users.accountstatus=1 
    ORDER BY users.`firstname` ASC";
$executeQuery = mysqli_query($db,$query);

if (!$executeQuery) {
     $error = array(
            'data'=>'null', 'error'=>array('msg'=>'Failed to get users','code'=>'708')
            );
        echo json_encode($error);
}
else{
    //Fetch all rows into var $listOfMentees
    $listOfMentees = mysqli_fetch_all ($executeQuery, MYSQLI_ASSOC);

    //Run through List of Users to check Number of Mentees ($totalMentees) and Inactive Mentees ($inactiveMentees)
    foreach ($listOfMentees as $row){
    
        $totalMentees++;
        
        //To check number of inactive mentees; mapstatus=0
        if($row['mapstatus']=="0" || $row['mapstatus']==0) 
            $inactiveMentees++; 

        //To check number of mentees who need attention; NA=1
        if($row['na']=="1" || $row['na']==1) 
            $needsAttention++; 
    }

    $mentorStats["totalMentees"] = $totalMentees;
    $mentorStats["inactiveMentees"] = $inactiveMentees;
    $mentorStats["needsAttention"] = $needsAttention;
    $mentorStats["listOfMentees"] = $listOfMentees;

    $success = array(
                    'data'=>$mentorStats, 'error'=>null
                    );
    echo json_encode($success);
}
?>
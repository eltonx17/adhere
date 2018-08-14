<?php
header('Content-type: application/json');

require "../conn.php";

$adminStats = array();
$totalUsers = 0;
$inactiveUsers = 0;


//Query to get all users from users table who are not admin
$query = "SELECT * FROM `users` 
WHERE users.usertype = 1 
OR users.usertype = 2
ORDER BY `usertype` ASC";
$executeQuery = mysqli_query($db,$query);

if (!$executeQuery) {
     $error = array(
            'data'=>'null', 'error'=>array('msg'=>'Email already exists. Please use another email ID','code'=>'100')
            );
        echo json_encode($error);
}
else{
    //Fetch all rows into var $listOfUsers
    $listOfUsers = mysqli_fetch_all ($executeQuery, MYSQLI_ASSOC);

    foreach ($listOfUsers as $row){
    
        $totalUsers++;
    
        if($row['accountstatus']=="0" || $row['accountstatus']==0) 
            $inactiveUsers++; 
    
    }
    
    $adminStats["totalUsers"] = $totalUsers;
    $adminStats["inactiveUsers"] = $inactiveUsers;
    $adminStats["listOfUsers"] = $listOfUsers;
    echo json_encode($adminStats);
    /*$success = array(
                    'data'=>$adminStats, 'error'=>null
                    );
    echo json_encode($success);*/
}

?>
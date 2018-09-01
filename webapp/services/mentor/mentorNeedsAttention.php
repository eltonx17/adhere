<?php
header('Content-type: application/json');

require "../conn.php";

//Query to get all users from menteeworkbook table who needs attention from mentor
$query = "SELECT users.uid, CONCAT(users.firstname, ' ', users.lastname) AS Fullname, menteeworkbook.gst, menteeworkbook.na
FROM users,menteeworkbook
WHERE users.uid = menteeworkbook.menteeid
AND menteeworkbook.na=1";

$executeQuery = mysqli_query($db,$query);

//Check for query error
if (!$executeQuery) {
     $error = array(
            'data'=>'null', 'error'=>array('msg'=>'Failed to get users','code'=>'500')
            );
        echo json_encode($error);
}

else{
    $usersNeedAttention["data"] =  mysqli_fetch_all ($executeQuery, MYSQLI_ASSOC);
    $usersNeedAttention["error"] =  "null";
    
    echo json_encode($usersNeedAttention);
    }
?>
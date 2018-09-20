<?php
header('Content-type: application/json');
require "../conn.php";

$mentorList = "";
$mentors = array();

$query = "(SELECT * FROM users WHERE usertype=1) UNION (SELECT * from users where usertype = 0 LIMIT 1)";
$results = mysqli_query($db, $query);

if($results){
    while($mentorList = mysqli_fetch_assoc($results)) {
        $mentors[] = $mentorList;       
    }
    echo json_encode($mentors);
} else {
    $error = array(
            'data'=>'null', 'error'=>array('msg'=>'Error retrieving mentorlist details','code'=>'705')
        );
        echo json_encode($error);
}
?>
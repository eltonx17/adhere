<?php
header('Content-type: application/json');
require "../conn.php";

$menteeId = mysqli_real_escape_string($db, $_GET['menteeID']);
$action = mysqli_real_escape_string($db, $_GET['action']);

if(($action != "0") && ($action != "1")){   
     $error = array(
                 'data'=>'null', 'error'=>array('msg'=>'Failed to update status','code'=>'803')
                 );
    return;
}

$query="UPDATE mentormapping SET mentormapping.mapstatus = '$action' WHERE mentormapping.menteeid = '$menteeId'";
$executeQuery= mysqli_query($db, $query);


if(!$executeQuery){
    $error = array(
             'data'=>'null', 'error'=>array('msg'=>'Failed to update status','code'=>'709')
             );
    echo json_encode($error);
}
else{
    $success = array(
               'data'=>'User status updated successfully', 'error'=>null
                );
    echo json_encode($success);
}
?>
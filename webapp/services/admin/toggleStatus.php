<?php
header('Content-type: application/json');
require "../conn.php";

$userId = mysqli_real_escape_string($db, $_GET['userID']);
$action = mysqli_real_escape_string($db, $_GET['action']);

if(($action != "0") && ($action != "1")){   
     $error = array(
                 'data'=>0, 'error'=>array('msg'=>'Failed to update status','code'=>'802')
                 );
    return;
}

$query="UPDATE users SET users.accountstatus = '$action' WHERE users.uid = '$userId'";
$executeQuery= mysqli_query($db, $query);

if(!$executeQuery){
    $error = array(
             'data'=>'null', 'error'=>array('msg'=>'Failed to update status','code'=>'707')
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
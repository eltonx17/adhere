<?php
header('Content-type: application/json');
require "../conn.php";

$userId = mysqli_real_escape_string($db, $_GET['userID']);
$action = mysqli_real_escape_string($db, $_GET['action']);

if(($action != "0") && ($action != "1")){   
     $error = array(
                 'data'=>0, 'error'=>array('msg'=>'Failed to update status','code'=>'401')
                 );
    return;
}

    $query="UPDATE users
            SET userstatus = '$action'
            WHERE uid = '$userId'";
    if(!$query){
        $error = array(
                 'data'=>0, 'error'=>array('msg'=>'Failed to update status','code'=>'401')
                 );
    }
    else{
        $success = array(
                   'data'=>'User status updated successfully', 'error'=>null
                    );
        echo json_encode($success);
    }


?>
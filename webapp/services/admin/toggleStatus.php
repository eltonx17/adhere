<?php
header('Content-type: application/json');
require "../conn.php";

$userId = mysqli_real_escape_string($db, $_GET['userID']);
$action = mysqli_real_escape_string($db, $_GET['action'])
    
if($action==1){
    $query="UPDATE users
            SET userstatus = 0
            WHERE uid = '$userId';"
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
}
else-if($action==0){
    $query="UPDATE users
            SET userstatus = 1
            WHERE uid = '$userId';"
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
}

?>

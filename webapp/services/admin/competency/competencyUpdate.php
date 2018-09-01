<?php
header('Content-type: application/json');

require "../../conn.php";

//variable creation
$stageData = array();
$gstData = 0;
$menteeID = 0;
$userType = 0;

//collecting input
//$stageData = mysqli_real_escape_string($db, $_GET['stageData']);
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$stageData = ($request->stageData);
$gstData = ($request->gstData);
$menteeID = ($request->menteeID);
$userType = ($request->usertype);

return;

$stageNum = "stage{$gstData}";

//check if the submission is from mentee and update
if($userType == '2'){
    if ($gstData <= 5){
        $query = mysqli_query("UPDATE menteeworkbook
        SET ". mysqli_real_escape_string($stageNum)."= ".json_encode($stageData).", na = '1'
        WHERE gst = ".$gstData."AND menteeid =".$menteeID);
        $executeQuery = mysqli_query($db,$query);
        echo json_encode("update successful");
        if(!executeQuery){
            $error = array(
                'data'=>0, 'error'=>array('msg'=>'Failed to update status','code'=>'401')
                );
            echo json_encode($error);
        }
    }
}

//check if the submission is from mentor and update
elseif($userType == '1'){
    
    if ($gstData < 5){
        $query = mysql_query("UPDATE menteeworkbook
        SET gst = ".++$gstData.", na = '0'
        WHERE gst = ".$gstData." AND menteeid =".$menteeID);
        echo json_encode("update successful");
        if(!executeQuery){
            $error = array(
                'data'=>0, 'error'=>array('msg'=>'Failed to update status','code'=>'401')
                );
            echo json_encode($error);
        }
    }
    elseif ($gstData =='5'){
        echo json_encode("successful completed all the stages");
        if(!executeQuery){
            $error = array(
                'data'=>0, 'error'=>array('msg'=>'Failed to update status','code'=>'401')
                );
            echo json_encode($error);
        }
    }
}
?>
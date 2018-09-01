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

$stageData = json_encode($request->stageData);
$gstData = ($request->gstData);
$menteeID = ($request->menteeID);
$userType = ($request->usertype);

//check if the submission is from mentee and update
if($userType == '2'){
    if ($gstData <= 5){
        $query = ("UPDATE menteeworkbook
        SET ".($stageNum)."='".base64_encode($stageData)."', na=1
        WHERE menteeid=".$menteeID);
            
        $executeQuery = mysqli_query($db,$query);
        
        if(!$executeQuery){
            $error = array(
                'data'=>0, 'error'=>array('msg'=>'Failed to update status','code'=>'401')
                );
            echo json_encode($error);
        }   else {
            echo json_encode("update successful");
        }
    }
}

//check if the submission is from mentor and update
elseif($userType == '1'){
    
    if ($gstData < 5){
        $query = ("UPDATE menteeworkbook
        SET ".($stageNum)."= ".json_encode($stageData).", gst = ".++$gstData.", na = '0'
        WHERE gst = ".$gstData." AND menteeid =".$menteeID);        
        if(!$executeQuery){
            $error = array(
                'data'=>0, 'error'=>array('msg'=>'Failed to update status','code'=>'401')
                );
            echo json_encode($error);
        } if($gstData =='5' || $gstData ==5){
             echo json_encode("successful completed all the stages");
        } else {
            echo json_encode("update successful");
        }
    }
}
?>
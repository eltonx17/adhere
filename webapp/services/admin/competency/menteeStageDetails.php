<?php
header('Content-type: application/json');

require "../../conn.php";

$stageData = "";

//Get menteeID
//$menteeId = mysqli_real_escape_string($db, $_GET['menteeID']);

//Query to get mentee stage details
$query = "SELECT menteeworkbook.menteeid,menteeworkbook.gst,menteeworkbook.stage1,menteeworkbook.stage2,menteeworkbook.stage3,menteeworkbook.stage4,menteeworkbook.stage5 FROM menteeworkbook WHERE menteeworkbook.menteeid = '$menteeId'";
$executeQuery = mysqli_query($db, $query);

if($executeQuery){
    
    $stageData = mysqli_fetch_assoc($executeQuery);
                             
    $stageData["stage1"] = json_decode($stageData['stage1']);
    $stageData["stage2"] = json_decode($stageData['stage2']);    
    $stageData["stage3"] = json_decode($stageData['stage3']);
    $stageData["stage4"] = json_decode($stageData['stage4']);
    $stageData["stage5"] = json_decode($stageData['stage5']);
    $stageData["gst"] = $stageData['gst'];
    
    $stages["data"] = ($stageData);
    $stages["error"] = "null";
    
    echo json_encode($stages);    

} else {
    $error = array(
            'data'=>'null', 'error'=>array('msg'=>'Error retrieving competency data','code'=>'102')
        );
        echo json_encode($error);
}


?>
<?php

header('Content-type: application/json');
require "../../conn.php";

$menteeId = $_GET["menteeId"];
$workbookId = $_GET["workbookId"];

//file path initiation
$uploadsDir = "../../../uploads/";
$directory = "../../../uploads/" . $menteeId . "/";
$evidence = "../../../uploads/" . $menteeId . "/evidence/";
$dbFilePath = "/uploads/".$menteeId."/evidence/"; 

//check for menteeID is received
if(!$menteeId){
    $error = array(
            'data'=>'null', 'error'=>array('msg'=>'Missing MenteeID','code'=>'000')
            );
    echo json_encode($error);
    exit;
}
else{
    $query = "SELECT filename FROM evidence WHERE menteeid = $menteeID";
    $executeQuery = mysqli_query($db, $query);
    $filename = mysql_fetch_array($executeQuery);
    
    $qurey = "DELETE FROM evidence WHERE menteeid = $menteeID";
    uplink($dbFilePath.$filename)
}

?>
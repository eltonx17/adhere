<?php
header('Content-type: application/json');
require "../../conn.php";

$compList = "";
$compArray = array();

$query = "SELECT * FROM competency ORDER BY timestamp DESC LIMIT 1";
$executeQuery = mysqli_query($db, $query);

if($executeQuery){
    $compList = mysqli_fetch_assoc($executeQuery);
    $compList["data"] = json_decode($compList["data"]);
    echo json_encode($compList);
} else {
    $error = array(
            'data'=>'null', 'error'=>array('msg'=>'Error retrieving competency data','code'=>'102')
        );
        echo json_encode($error);
}
?>
<?php
header('Content-type: application/json');
require "../../conn.php";

$compList = "";
$compArray = array();

$query = "SELECT * FROM competency ORDER BY timestamp DESC LIMIT 1";
$executeQuery = mysqli_query($db, $query);

if($executeQuery){
    while($compList = mysqli_fetch_assoc($executeQuery)) {
        $compData = $compList;       
    }
    echo json_encode($compData);
} else {
    $error = array(
            'data'=>'null', 'error'=>array('msg'=>'Error retrieving competency data','code'=>'102')
        );
        echo json_encode($error);
}
?>
<?php
header('Content-type: application/json');
require "../conn.php";

$date = new DateTime();
$date->setTimeZone(new DateTimeZone('Australia/Sydney'));
$timestamp = $date->format('Y-m-d H:i:s');

//Retrieve Competency String
$competencyData = mysqli_real_escape_string($db, $_GET['competencyData']);

$query = "INSERT INTO competency (timestamp, data) VALUES ('$timestamp', '$competencyData')";
$executeQuery = mysqli_query($db, $query);

if (!$executeQuery) {
     $error = array(
            'data'=>'null', 'error'=>array('msg'=>'Failed to insert','code'=>'100')
            );
        echo json_encode($error);
    }
else{
    $success = array(
                       'data'=>'Successfully inserted', 'error'=>null
                       );
    echo json_encode($success);
}

?>
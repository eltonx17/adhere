<?php
header('Content-type: application/json');
require "../../conn.php";

$date = new DateTime();
$date->setTimeZone(new DateTimeZone('Australia/Sydney'));
$timestamp = $date->format('Y-m-d H:i:s');

//Retrieve Competency String
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$competencyData = json_encode($request->competencyData);
$competencyData = base64_encode($competencyData);


$query = "INSERT INTO competency (timestamp, data) VALUES('$timestamp','".$competencyData."')";

$executeQuery = mysqli_query($db, $query);

if (!$executeQuery) {
     $error = array(
            'data'=>'null', 'error'=>array('msg'=>'Failed to insert','code'=>'711')
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
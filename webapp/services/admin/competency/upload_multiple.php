<?php

//header('Content-type: application/json');
require "../../conn.php";

$menteeId = $_GET["menteeId"];
$workbookId = $_GET["workbookId"];

/*$menteeId = '22';
$workbookId = '13';*/
$uploadsDir = "../../../uploads/";
$directory = "../../../uploads/" . $menteeId . "/";
$evidence = "../../../uploads/" . $menteeId . "/evidence/";
$dbFilePath = "/uploads/".$menteeId."/evidence"; //to store in db without "../"

//check if menteeId is received and accordingly check and create required directories
if(!$menteeId){
    $error = array(
            'data'=>'null', 'error'=>array('msg'=>'Missing MenteeID','code'=>'000')
            );
    echo json_encode($error);
    exit;
}
else{
    if(file_exists($uploadsDir)){
        if (!file_exists($directory)) {
            mkdir("../../../uploads/" . $menteeId, 0777);
            mkdir("../../../uploads/" . $menteeId ."/evidence/", 0777);
        }
        if (file_exists($directory) && !file_exists($evidence)) {
            mkdir("../../../uploads/" . $menteeId ."/evidence/", 0777);
        }
    }
    else{
        mkdir("../../../uploads/", 0777);
        mkdir("../../../uploads/" . $menteeId, 0777);
        mkdir("../../../uploads/" . $menteeId ."/evidence/", 0777);
    }
}

//generate time stamp for naming
$date=date_create();
$date->setTimeZone(new DateTimeZone('Australia/Sydney'));
$date = date_timestamp_get($date);
 //$tmpFilePath = $_FILES['upload']['tmp_name'];
    //$fName = $_FILES['upload']['name'];

// Count # of uploaded files in array
$total = count(['name']);
$counter = 0;
$errorCount = 0;

// Loop through each file
for( $i=0 ; $i < $total ; $i++ ) {
    //Get the temp file path
    $tmpFilePath = $_FILES['upload']['tmp_name'][$i];
    $fName = $_FILES['upload']['name'][$i];
    $fName = mb_strimwidth($fName, 0, 50, "...");

    //extract extension and append it along with the date
    $ext = pathinfo($fName, PATHINFO_EXTENSION);
    $fileName = $date.$i.".".$ext;
    
    //Make sure we have a file path
    if ($tmpFilePath != ""){
        //Setup our new file path with new file name
        $newFilePath = $evidence.$fileName;
        $dbFilePath = $dbFilePath.$fileName;

        //Upload the file into the temp dir
        if(move_uploaded_file($tmpFilePath, $newFilePath)) {
            $query = "INSERT INTO evidence (menteeid, workbookid, filepath, filename) 
                      VALUES('$menteeId','$workbookId','$dbFilePath','".base64_encode($fName)."')";        
            $executeQuery= mysqli_query($db, $query);
            if(mysqli_affected_rows($db) > 0 ){
                $counter++;
            }
            else{
                $errorCount++;
            }
        }
    }
}

if ($counter>0 && $errorCount==0 ){
    $success = array('data'=>"Successfully uploaded " .$counter. " files", 'error'=>null);
    echo json_encode($success);
}
else{
    $error = array(
    'data'=>'null', 'error'=>array('msg'=>"Error uploading ".$errorCount." files",'code'=>'000')
    );
    echo json_encode($error);
}

?>
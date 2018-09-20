<?php

$menteeId = $_POST["menteeId"];
//$menteeId = '24';
$uploadsDir = "../../../uploads/";
$directory = "../../../uploads/" . $menteeId . "/";
$evidence = "../../../uploads/" . $menteeId . "/evidence/";

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
            $success = array('data'=>"Directory created successfully ", 'error'=>null);
            echo json_encode($success);
        }
        if (file_exists($directory) && !file_exists($evidence)) {
            mkdir("../../../uploads/" . $menteeId ."/evidence/", 0777);
            $success = array('data'=>"Directory evidence was missing, created successfully ", 'error'=>null);
            echo json_encode($success);
        }
    }
    else{
        mkdir("../../../uploads/", 0777);
        mkdir("../../../uploads/" . $menteeId, 0777);
        mkdir("../../../uploads/" . $menteeId ."/evidence/", 0777);
        $success = array('data'=>"Directory created successfully ", 'error'=>null);
        echo json_encode($success);
    }
}

//generate time stamp for naming
$date=date_create();
$date->setTimeZone(new DateTimeZone('Australia/Sydney'));
$date = date_timestamp_get($date);

// Count # of uploaded files in array
$total = count($_FILES['upload']['name']);
$counter = 0;

// Loop through each file
for( $i=0 ; $i < $total ; $i++ ) {
    //Get the temp file path
    $tmpFilePath = $_FILES['upload']['tmp_name'][$i];
    $fName = $_FILES['upload']['name'][$i];
    
    //extract extension and append it along with the date
    $ext = pathinfo($fName, PATHINFO_EXTENSION);
    $fileName = $date.$i.".".$ext;
    
    //Make sure we have a file path
    if ($tmpFilePath != ""){
        //Setup our new file path with new file name
        $newFilePath = $evidence.$fileName;

        //Upload the file into the temp dir
        if(move_uploaded_file($tmpFilePath, $newFilePath)) {
            $counter++;
        }
        else{
            $error = array(
            'data'=>'null', 'error'=>array('msg'=>'Error uploading files','code'=>'000')
            );
            echo json_encode($error);
        }
    }
}

$success = array('data'=>"Successfully uploaded " .$counter. " files", 'error'=>null);
echo json_encode($success);

?>
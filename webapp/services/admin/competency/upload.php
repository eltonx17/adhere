<?php

// Count # of uploaded files in array
$total = count($_FILES['upload']['name']);
$checkSum = 0;
// Loop through each file
for( $i=0 ; $i < $total ; $i++ ) {

  //Get the temp file path
  $tmpFilePath = $_FILES['upload']['tmp_name'][$i];

  //Make sure we have a file path
  if ($tmpFilePath != ""){
    //Setup our new file path
    $newFilePath = "uploads/" . $_FILES['upload']['name'][$i];

    //Upload the file into the temp dir
    if(move_uploaded_file($tmpFilePath, $newFilePath)) {
      $checkSum++;
    }
  }
}

echo ("Successfully uploaded " .$checkSum. " files");

?>
<?php
header('Content-type: application/json');

// initializing variables
$firstname = "";
$lastname = "";
$email    = "";
$usertype = "";
$mentorid = "";

//db connection string
$db = new mysqli("localhost", "root", "", "adhere") or die($this->db->error);

// REGISTER USER
// receive all input values from the form
$firstname = mysqli_real_escape_string($db, $_GET['firstName']);
$lastname = mysqli_real_escape_string($db, $_GET['lastName']);
$email = mysqli_real_escape_string($db, $_GET['email']);
$password_1 = mysqli_real_escape_string($db, $_GET['password']);
$usertype = mysqli_real_escape_string($db, $_GET['userType']);
    
//Encrypt the password before saving in the database
$password = md5($password_1);

//Query to register user info into db
$query = "INSERT INTO users (firstname, lastname, email, password, usertype) VALUES('$firstname', '$lastname', '$email', '$password', '$usertype')";
mysqli_query($db, $query);

//Retrieve the ID of the inserted record
$last_uid = $db->insert_id;

//Check if the query is valid, if yes check for usertype=2 i.e mentee
if (!$query) {
     $error = array(
            'data'=>'null', 'error'=>array('msg'=>'Error','code'=>'46')
            );
        echo json_encode($error);
    }
    else{
        //If Mentee, fire another query to map mentee to a mentor
        if ($usertype == 2){
            $mentorid = mysqli_real_escape_string($db, $_GET['mentorId']);
            $mapquery = "INSERT INTO mentormapping (menteeid, mentorid) VALUES ('$last_uid', '$mentorid')";
            mysqli_query($db, $mapquery);
       } 
    }
?>
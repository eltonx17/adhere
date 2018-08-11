<?php
header('Content-type: application/json');

// initializing variables
$firstName = "";
$lastName = "";
$email    = "";
$userType = "";
$mentorId = "";

//db connection string
$db = new mysqli("localhost", "root", "", "adhere") or die($this->db->error);

// REGISTER USER
// receive all input values from the form
$firstName = mysqli_real_escape_string($db, $_GET['firstName']);
$lastName = mysqli_real_escape_string($db, $_GET['lastName']);
$email = mysqli_real_escape_string($db, $_GET['email']);
$password = mysqli_real_escape_string($db, $_GET['password']);
$userType = mysqli_real_escape_string($db, $_GET['userType']);
    
//Encrypt the password before saving in the database
$passwordEnc = md5($password);

//Query to register user info into db
$query = "INSERT INTO users (firstname, lastname, email, password, usertype) 
          VALUES('$firstName', '$lastName','$email', '$passwordEnc', '$userType')";
$executeQuery= mysqli_query($db, $query);

//Retrieve the ID of the inserted record
$last_uid = $db->insert_id;

//Check if the query is valid, if yes check for usertype=2 i.e mentee
if (!$executeQuery) {
     $error = array(
            'data'=>'null', 'error'=>array('msg'=>'Email already exists. Please use another email ID','code'=>'100')
            );
        echo json_encode($error);
    }
    else{
        //If Mentee, fire another query to map mentee to a mentor
        if ($userType == 2){
            $mentorId = mysqli_real_escape_string($db, $_GET['mentorId']);
            $query = "INSERT INTO mentormapping (menteeid, mentorid) VALUES ('$last_uid', '$mentorId')";
            $executeQuery= mysqli_query($db, $query);
            if (!$executeQuery) {
                $error = array(
                         'data'=>'null', 'error'=>array('msg'=>'Error selecting mentor','code'=>'101')
                         );
                echo json_encode($error);
            }
        else{
            $success = array(
                       'data'=>'Registration successful', 'error'=>null
                       );
            echo json_encode($success);
            }               
        }
        else{
            $success = array(
                       'data'=>'Registration successful', 'error'=>null
                       );
            echo json_encode($success);
        } 
    }
?>
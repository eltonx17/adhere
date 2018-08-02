<?php
header('Content-type: application/json');

// initializing variables
$firstname = "";
$lastname = "";
$email    = "";
$usertype = "";
$mentorid = "";
$errors = array(); 

//db connection string
$db = new mysqli("localhost", "root", "", "adhere") or die($this->db->error);

// REGISTER USER
// receive all input values from the form
$firstname = mysqli_real_escape_string($db, $_GET['firstName']);
$lastname = mysqli_real_escape_string($db, $_GET['lastName']);
$email = mysqli_real_escape_string($db, $_GET['email']);
$password_1 = mysqli_real_escape_string($db, $_GET['password']);
$usertype = mysqli_real_escape_string($db, $_GET['userType']);
    
//encrypt the password before saving in the database
$password = md5($password_1);

//Query to register user info into db
$query = "INSERT INTO users (firstname, lastname, email, password, usertype) VALUES('$firstname', '$lastname', '$email', '$password', '$usertype')";
mysqli_query($db, $query);

//Check if the query is valid and echo accordingly
if (!$query) {
        array_push($errors, "Error inserting into database");
        echo json_encode($errors);
    }
    else{
        array_push($errors, "Success");
        echo json_encode($errors);
    }
  	
?>
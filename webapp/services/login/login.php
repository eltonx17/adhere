<?php
header('Content-type: application/json');
//$obj = json_decode($_POST["x"], false);

// initializing variables
$firstname = "";
$lastname = "";
$email    = "";
$usertype = "";
$mentorid = "";
$errors = array(); 


$db = new mysqli("localhost", "root", "", "adhere") or die($this->db->error);

$email = mysqli_real_escape_string($db, $_GET['email']);
$password = mysqli_real_escape_string($db, $_GET['password']);

  if (count($errors) == 0) {
    //Encrypt received pwd to match DB value
  	$password_enc = md5($password);
  	
    $query = "SELECT * FROM users WHERE email='$email' AND password='$password_enc'";
  	$results = mysqli_query($db, $query);
  	
      if (mysqli_num_rows($results) == 1) {
          
          //$data = array();
          $data = $results->fetch_all(MYSQLI_ASSOC);
          
          $success = array(
              'data'=>$data[0], 'error'=>0
          );
          
          echo json_encode($success);

  	}else {
        $error = array(
            'data'=>0, 'error'=>array('msg'=>'Wrong username/password. Please try again.','code'=>'154')
        );
        echo json_encode($error);
  	}
  }

?>
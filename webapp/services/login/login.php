<?php
header('Content-type: application/json');

// initializing variables
$email    = "";
$password = "";
$userType = "";
$errors = array(); 

//Database connection string
$db = new mysqli("localhost", "root", "", "adhere") or die($this->db->error);

//Retrieve email and password 
$email = mysqli_real_escape_string($db, $_GET['email']);
$password = mysqli_real_escape_string($db, $_GET['password']);

  if (count($errors) == 0) {
    //Encrypt received pwd to match DB value
  	$passwordEnc = md5($password);
  	
    //Check entry in database
    $query = "SELECT * FROM users WHERE email='$email' AND password='$passwordEnc'";
  	$executeQuery = mysqli_query($db, $query);
  	
      //If entry exists
      if (mysqli_num_rows($executeQuery) == 1) {
          
          //Converting mentee details into array
          $fetchQuery = $executeQuery->fetch_all(MYSQLI_ASSOC);
          $userDetails = $fetchQuery[0];
          
          //Fetch userType and userID
          $query = "SELECT users.usertype, users.uid FROM users
                    WHERE email='$email' ";
  	      $executeQuery = mysqli_query($db, $query);
          
          //Convert variables into int
          $fetchQuery = $executeQuery->fetch_assoc();
          $userType = (int) $fetchQuery['usertype'];
          $menteeId = (int) $fetchQuery['uid'];
          
          //Check if usertype and userID exists 
          if (!$fetchQuery){
              $error = array(
                       'data'=>0, 'error'=>array('msg'=>'Could not fetch usertype.','code'=>'201')
                       );
              echo json_encode($error);
          }
          else{
              //if Mentee logs in, show Mentee details and Mentor details
              if ($userType==2){                  
                  $query = "SELECT users.firstname AS mentorname,users.uid 
                            FROM users,mentormapping 
                            WHERE mentormapping.mentorid = users.uid 
                            AND mentormapping.menteeid = '$menteeId'";
  	              $executeQuery = mysqli_query($db, $query);
                  $fetchQuery = $executeQuery->fetch_all(MYSQLI_ASSOC); //Convert into array
                  
                  if (!$fetchQuery){
                        $error = array(
                                 'data'=>0, 'error'=>array('msg'=>'Could not fetch mentor details.','code'=>'202')
                                 );
                        echo json_encode($error);
                  }
                  else{
                        $mentorDetails = $fetchQuery[0];
                  
                        //Append retrieved mentor details to 
                        $userDetails["mentorName"] = $mentorDetails["mentorname"];
                        $userDetails["mentorID"] = $mentorDetails["uid"];
                  
                        $success = array(
                                 'data'=>$userDetails, 'error'=>null
                                 );
                        echo json_encode($success);
                  }
              }
            
              //If Admin or Mentor logs in
              elseif($userType==1 || $userType==0){
                  $success = array(
                                 'data'=>$userDetails, 'error'=>null
                                 );
                  echo json_encode($success);
              }
          }
  	}
      //If login fails
      else {
        $error = array(
                 'data'=>0, 'error'=>array('msg'=>'Wrong username/password. Please try again.','code'=>'200')
                 );
        echo json_encode($error);
  	}
  }

?>
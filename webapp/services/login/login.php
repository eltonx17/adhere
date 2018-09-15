<?php
header('Content-type: application/json');
require "../conn.php";

// initializing variables
$email    = "";
$password = "";
$userType = "";
$errors = array(); 

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
                    
          //Convert variables into int
          $userType = (int) $userDetails['usertype'];
          $menteeId = (int) $userDetails['uid'];
          $firstLogin = (int) $userDetails['firstlogin'];
          $accountStatus = (int) $userDetails["accountstatus"];
          
          //Check if usertype and userID exists 
          if (!$fetchQuery){
              $error = array(
                       'data'=>'null', 'error'=>array('msg'=>'Could not fetch usertype.','code'=>'201')
                       );
              echo json_encode($error);
          }
          else{
              //if Mentee logs in, show Mentee details and Mentor details
              if ($userType==2){                  
                  $query = "SELECT users.firstname AS
                            mentorname,users.uid,users.firstlogin,mentormapping.mapstatus,menteeworkbook.gst 
                            FROM users,mentormapping,menteeworkbook 
                            WHERE mentormapping.mentorid = users.uid 
                            AND mentormapping.menteeid = '$menteeId'
                            AND menteeworkbook.menteeid = '$menteeId'";
  	              $executeQuery = mysqli_query($db, $query);
                  $fetchQuery = $executeQuery->fetch_all(MYSQLI_ASSOC); //Convert into array
                  
                  
                  if (!$fetchQuery){
                        $error = array(
                                 'data'=>'null', 'error'=>array('msg'=>'Could not fetch mentor details.','code'=>'202')
                                 );
                        echo json_encode($error);
                  }
                  else{
                        $mentorDetails = $fetchQuery[0];
                  
                        //Append retrieved mentor details to 
                        $userDetails["mentorName"] = $mentorDetails["mentorname"];
                        $userDetails["mentorID"] = $mentorDetails["uid"];
                        $userDetails["mapStatus"] = $mentorDetails["mapstatus"];
                        $userDetails["gst"] = $mentorDetails["gst"];
                      
                        $mapStatus = (int) $mentorDetails["mapstatus"];
                        
                        //Update firstlogin of Mentee to 0 after first login
                        if($firstLogin == 1 && $accountStatus == 1 && $mapStatus == 1){
                            $query = "UPDATE users SET users.firstlogin = 0 WHERE users.uid = '$menteeId'";
                            $executeQuery = mysqli_query($db, $query);
                        }

                      
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
                 'data'=>'null', 'error'=>array('msg'=>'Wrong username/password. Please try again.','code'=>'200')
                 );
        echo json_encode($error);
  	}
  }

?>
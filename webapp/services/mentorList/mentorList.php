<?php
header('Content-type: application/json');

$mentorlist = "";

$db = new mysqli("localhost", "root", "", "adhere") or die($this->db->error);

$query = "SELECT uid, CONCAT(firstname, ' ', lastname) AS fullname FROM users WHERE usertype = '1'";
$results = mysqli_query($db, $query);

$mentors = array();
while($mentorlist = mysqli_fetch_assoc($results)) {
    $mentors[] = $mentorlist;
}
echo json_encode($mentors);

?>
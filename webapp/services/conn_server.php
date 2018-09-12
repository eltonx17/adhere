<?php

//db connection string
$db = new mysqli("localhost", "dbkallic_adhere", "adhere@123", "dbkallic_adhere") or die($this->db->error);

if (mysqli_connect_errno())
{
    $error = array(
            'data'=>'null', 'error'=>array('msg'=>'Error connecting to database','code'=>'404')
            );
    echo json_encode($error);
}

?>
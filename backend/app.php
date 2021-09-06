<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');

function secure_parm($parm){
  return $parm;
}

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "project_aivizo";


$con = mysqli_connect($servername, $username, $password, $dbname);
if(!$con){
    json_encode(array("Message"=>"Connection to database failed!")); exit(); die();
}

sleep(3);

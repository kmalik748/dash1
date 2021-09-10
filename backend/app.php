<?php

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');
header("Access-Control-Allow-Headers : Content-Type");
header("Access-Control-Allow-Methods : POST, OPTIONS, GET");

function secure_parm($parm){
  return $parm;
}

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "project_aivizo";

$servername = "server127.web-hosting.com";
$username = "turkvjwp_fingerprinttest";
$password = "fingerprinttest";
$dbname = "turkvjwp_aivizo";


$con = mysqli_connect($servername, $username, $password, $dbname);
if(!$con){
    json_encode(array("Message"=>"Connection to database failed!")); exit(); die();
}

//sleep(3);


define('SECRET_KEY','Super-Secret-Key@@@@@@');  // secret key can be a random string and keep in secret from anyone
define('ALGORITHM','HS256');   // Algorithm used to sign the token
$iat = time(); // time of token issued at
$nbf = $iat + 0; //not before in seconds
$exp = $iat + 3600; // expire time of token in seconds



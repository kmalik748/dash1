<?php

//header('Content-Type: application/json');
//header('Access-Control-Allow-Origin: *');
//header('Content-Type: application/json, charset=utf-8');
//header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');
//header("Access-Control-Allow-Methods : POST, OPTIONS, GET");
//header('Access-Control-Allow-Origin: *');

    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Credentials: true");
    header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
    header('Access-Control-Max-Age: 1000');
    header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization');


$servername = "server127.web-hosting.com";
$username = "turkvjwp_fingerprinttest";
$password = "fingerprinttest";
$dbname = "turkvjwp_aivizo";

$servername = "localhost";
$username = "root";
$password = "password@123";
$dbname = "project_aivizo";

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "project_aivizo";


$con = $GLOBALS["con"] = mysqli_connect($servername, $username, $password, $dbname);
if(!$con){
    json_encode(array("Message"=>"Connection to database failed!")); exit(); die();
}

function secure_parm($parm){
//  $parm = mysqli_real_escape_string($GLOBALS["con"], $parm);
//  $parm = trim($parm);
//  $parm = htmlentities($parm);
//  $parm = strip_tags($parm);
  try { $parm = mysqli_real_escape_string($GLOBALS["con"], $parm);}  catch(Exception $e) { }
  try { $parm = trim($parm);}  catch(Exception $e) { }
  try { $parm = htmlentities($parm);}  catch(Exception $e) { }
  try { $parm = strip_tags($parm);}  catch(Exception $e) { }
  return $parm;
}

//sleep(3);


define('SECRET_KEY','Super-Secret-Key@@@@@@');  // secret key can be a random string and keep in secret from anyone
define('ALGORITHM','HS256');   // Algorithm used to sign the token
$iat = time(); // time of token issued at
$nbf = $iat + 0; //not before in seconds
$exp = $iat + 3600; // expire time of token in seconds



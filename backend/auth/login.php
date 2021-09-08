<?php
require '../app.php';
$output = array("Success"=>false);

$data = json_decode(file_get_contents("php://input"));

$email = secure_parm($data->email);
$pass = secure_parm($data->pass);

$s = "SELECT
       id,
       first_name,
       middle_name,
       last_name,
       gender,
       dob,
       city,
       state,
       country,
       email,
       phone_number,
       userType
    FROM users WHERE email='$email' AND password='$pass'";

$r = mysqli_query($con, $s);
$data = array();
if(mysqli_num_rows($r)){
  $row = mysqli_fetch_array($r, MYSQLI_ASSOC);
  $output["Success"] = true;
  $output["userType"] = $row["userType"];
  $data = $row;
  if($row["userType"]=="Admin") $output["redirectTo"] = "adminArea";
  if($row["userType"]=="Patient") $output["patient"] = "patientArea";
}


require_once('../vendor/autoload.php');
use \Firebase\JWT\JWT;
$token = array(
  "iss" => "http://example.org",
  "aud" => "http://example.com",
  "iat" => $iat,
  "nbf" => $nbf,
  "exp" => $exp,
  "data" => $data
);
http_response_code(200);
$jwt = JWT::encode($token, SECRET_KEY);

$output["token"] = $jwt;

echo json_encode($output);
<?php
require '../app.php';
$output = array("Success"=>false);

$data = json_decode(file_get_contents("php://input"));

//print_r($data); exit(); die();

require_once('../vendor/autoload.php');
use \Firebase\JWT\JWT;

$decoded = array("data"=>array("data"=>array("id"=>null)));
//print_r($decoded);
try {
  $token = secure_parm($data->token);

  $decoded = JWT::decode($token, SECRET_KEY, array(ALGORITHM));
  $data = (array) $decoded;
  $array = json_decode(json_encode($data["data"]), true);
  $uid= $array["id"];

  $result = mysqli_query($con, "SELECT * FROM doctors WHERE doctor_id =$uid ");


  if(mysqli_num_rows($result)){
    $row = mysqli_fetch_array($result, MYSQLI_ASSOC);
    $output["Success"] = true;
    $output["data"] = $row;
  }


} catch (\Exception $e) {
  $output["Message"] = "Error occurred";
}



echo json_encode($output);

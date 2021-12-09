<?php
require '../app.php';
$output = array(
  "Success"=>false,
  "data" =>array(
    "previousAppointments" => 0,
    "upcomingAppointments" => 0,
    "consults" => 0,
    "alerts" => 0
  )
);

$data = json_decode(file_get_contents("php://input"));

$key = secure_parm($data->token);

require_once('../vendor/autoload.php');
use \Firebase\JWT\JWT;

$decoded = array("data"=>array("data"=>array("id"=>null)));
//print_r($decoded);
try {
  $decoded = JWT::decode($key, SECRET_KEY, array(ALGORITHM));

} catch (\Exception $e) {
  return FALSE;
}

$id = $decoded->data->id;
if(isset($id)){
  $output["Success"] = true;
  $s = "SELECT * FROM appointments WHERE patient_id=$id AND DATE(`datetime`) < CURDATE()";
  $res = mysqli_query($con, $s);
  $output["data"]["previousAppointments"]  = mysqli_num_rows($res);
  $s = "SELECT * FROM appointments WHERE patient_id=$id AND DATE(`datetime`) >= CURDATE()";
  $res = mysqli_query($con, $s);
  $output["data"]["upcomingAppointments"]  = mysqli_num_rows($res);
  $s = "SELECT * FROM appointments WHERE patient_id=$id";
  $res = mysqli_query($con, $s);
  $output["data"]["consults"]  = mysqli_num_rows($res);
}else{
  $output["msg"] = "Invalid Token provided";
}

echo json_encode($output);

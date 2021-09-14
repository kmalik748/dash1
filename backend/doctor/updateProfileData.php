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
  $speciality = secure_parm($data->speciality);
  $qualification = secure_parm($data->qualification);
  $fees = secure_parm($data->fees);
  $availability = secure_parm($data->availability);
  $tags = json_encode(secure_parm($data->tags));
  $token = secure_parm($data->token);

  $decoded = JWT::decode($token, SECRET_KEY, array(ALGORITHM));
  $data = (array) $decoded;
  $array = json_decode(json_encode($data["data"]), true);
  $uid= $array["id"];

  $dates = explode("-",$availability);
  $timestamp1 = substr($dates[0], 0, -1);;
  $time1 = date("Y-m-d h:m:s", strtotime($timestamp1));
  $timestamp2 = $dates[1];
  $time2 = date("Y-m-d h:m:s", strtotime($timestamp2));

  $output["1"] = $time1;
  $output["2"] = $time2;

  $result = mysqli_query($con, "SELECT * FROM doctors WHERE doctor_id =$uid ");

  if( mysqli_num_rows($result) > 0) {
    $q = "UPDATE doctors SET specialty='$speciality', qualification='$qualification', fees=$fees,
        tags='$tags', startTime='$time1', endTime='$time2', availability='$availability' WHERE doctor_id=$uid";
  }
  else
  {
    $q = "INSERT INTO doctors (doctor_id, specialty, qualification, fees, tags, startTime, endTime) VALUES
        ($uid, '$speciality', '$qualification', $fees, '$tags', '$time1', '$timestamp1')";
  }
  if(mysqli_query($con, $q)){
    $output["Success"] = true;
  }


} catch (\Exception $e) {
  $output["Message"] = "Error occurred";
}



echo json_encode($output);

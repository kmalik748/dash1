<?php
require '../app.php';



$output = array("Success"=>false);

$data = json_decode(file_get_contents("php://input"));

$userID = secure_parm($data->userID);
$timestamp = secure_parm($data->timestamp);
$token = rand(0, 999999);

$s = "INSERT INTO signupemailtoken (userID, token, type, date_time) VALUES ($userID, '$token', 'emailVerification', '$timestamp')";
$output["sql"] = $s;

if(mysqli_query($con, $s)){
  $output["Success"] = true;
  $output["token"] = $token;
}

echo json_encode($output);

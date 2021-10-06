<?php
require '../app.php';



$output = array("Success"=>false);

$data = json_decode(file_get_contents("php://input"));

$userID = secure_parm($data->userID);
$timestamp = secure_parm($data->timestamp);
$token = rand(0, 999999);

$s = "INSERT INTO signupemailtoken (userID, token, date_time) VALUES ($userID, '$token', '$timestamp')";

if(mysqli_query($con, $s)){
  $output["Success"] = true;
}

echo json_encode($output);

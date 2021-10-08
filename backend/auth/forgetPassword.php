<?php
require '../app.php';



$output = array("Success"=>false);

$data = json_decode(file_get_contents("php://input"));

$email = secure_parm($data->email);
$timestamp = secure_parm($data->timestamp);
$token = rand(0, 999999);

$s = "SELECT * FROM users WHERE email='$email'";
$res = mysqli_query($con, $s);
if(mysqli_num_rows($res)){
  $row = mysqli_fetch_array($res);
  $userID = $row["id"];
  $output["userID"] = $userID;
  $output["token"] = $token;
  $output["emailNotFound"] = false;
  $s = "INSERT INTO signupemailtoken (userID, token, type, date_time) VALUES ($userID, '$token', 'passwordReset', '$timestamp')";
  if(mysqli_query($con, $s)){
    $output["Success"] = true;
  }
}else{
  $output["emailNotFound"] = true;
}



echo json_encode($output);

<?php
require '../app.php';
$output = array("Success"=>false);

$data = json_decode(file_get_contents("php://input"));

$userID = secure_parm($data->userID);
$password = secure_parm($data->password);

$s = "UPDATE users SET password='$password' WHERE id=$userID";

$output["sql"] = $s;

if(mysqli_query($con, $s)){
  $s = "UPDATE signupemailtoken SET type='passwordResetDone' WHERE userID = $userID AND type='passwordReset'";
  $output["sql1"] = $s;
  mysqli_query($con, $s);

  $output["Success"] = true;
}else{
  $output["Error"] = mysqli_error($con);
}

echo json_encode($output);

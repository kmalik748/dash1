<?php
require '../app.php';

$output = array("Success"=>false);

$data = json_decode(file_get_contents("php://input"));

$userID = secure_parm($data->userID);
$token = secure_parm($data->token);

$s = "SELECT * FROM signupemailtoken WHERE userID = $userID AND token='$token' AND type='passwordReset' ORDER BY id DESC LIMIT 1";
$res = mysqli_query($con, $s);
if(mysqli_num_rows($res)){
  $output["Success"] = true;
}

echo json_encode($output);

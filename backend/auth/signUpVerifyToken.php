<?php
require '../app.php';



$output = array("Success"=>false);

$data = json_decode(file_get_contents("php://input"));

$userID = secure_parm($data->userID);
$token = secure_parm($data->token);

$s = "SELECT * FROM signupemailtoken WHERE userID = $userID ORDER BY id DESC LIMIT 1";
$res = mysqli_query($con, $s);
if(mysqli_num_rows($res)){
  $row = mysqli_fetch_array($res);
  if($row["token"] == $token){
    $output["Success"] = true;
    $s = "UPDATE users SET verified = 1 WHERE id = $userID";
    mysqli_query($con, $s);
  }
}

echo json_encode($output);

<?php
require '../app.php';

$output = array("Error"=>false);

$data = json_decode(file_get_contents("php://input"));
$email = secure_parm($data->email);

$s = "SELECT email FROM users WHERE email='$email'";

$r = mysqli_query($con, $s);
$output["qry"] = $s;

if(mysqli_num_rows($r)){
  $output["Error"] = true;
}


echo json_encode($output);

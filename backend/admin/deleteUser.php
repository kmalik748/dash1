<?php
require '../app.php';

$data = json_decode(file_get_contents("php://input"));

$id = secure_parm($data->id);

$output = array("Result"=>false);

$sql = "DELETE FROM `users` WHERE id=$id";
if(mysqli_query($con, $sql)){
  $output["Result"] = true;
}

echo json_encode($output);

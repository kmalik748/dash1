<?php
require '../app.php';
$output = array("Success"=>false);

$data = json_decode(file_get_contents("php://input"));

$prescription = secure_parm($data->prescription);
$appointment = secure_parm($data->appointment);

$s = "UPDATE appointments SET prescription='$prescription' WHERE id=$appointment";
if(mysqli_query($con, $s)){
  $output["Success"] = true;
}else{
  $output["Error"] = mysqli_error($con);
}

echo json_encode($output);

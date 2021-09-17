<?php
require '../app.php';
$output = array(
  "Success"=>false,
  "data" =>array()
);

$data = json_decode(file_get_contents("php://input"));
$patientID = secure_parm($data->patientID);

$s = "SELECT * FROM appointments WHERE patient_id = $patientID";
$r = mysqli_query($con, $s);
if(mysqli_num_rows($r)){
  while ($row=mysqli_fetch_array($r, MYSQLI_ASSOC)){
    array_push($output["data"], $row);
  }
}

echo json_encode($output);

<?php
require '../app.php';
$output = array("Result"=>false);

$data = json_decode(file_get_contents("php://input"));
$patientID = secure_parm($data->patientID);
$doctorID = secure_parm($data->doctorID);
$apt_Date = secure_parm($data->apt_Date);
$apt_Time = secure_parm($data->apt_Time);
$timestamp = secure_parm($data->timestamp);

$time = explode("-",$apt_Time);
$apt_Time = $time[0].":00";


$apt_Date = date('Y-m-d', strtotime($apt_Date));
$apt_Time = date('H:i:s', strtotime($apt_Time));
$timestamp = date('Y-m-d H:i:s', strtotime($timestamp));

$s = "INSERT INTO appointments (patient_id, doctor_id, apnt_date, apnt_time, datetime) VALUES
    ($patientID, $doctorID, '$apt_Date', '$apt_Time', '$timestamp')";

$output["qry"] = $s;
if(mysqli_query($con, $s)){
  $output["Result"] = true;
}else{
  $output["err"] = mysqli_error($con);
}

echo json_encode($output);

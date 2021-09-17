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
    $appointment = array();
    $docID = $appointment["docID"] = $row["doctor_id"];
    $sql = "SELECT * FROM users WHERE id = $docID";
    $res = mysqli_query($con, $sql);
    $r1 = mysqli_fetch_array($res);
    $appointment["id"] = $row["id"];
    $appointment["DoctorName"] = $r1["first_name"].' '.$r1["middle_name"].' '.$r1["last_name"];
    $appointment["pic"] = "https://picsum.photos/300/300";
//    $appointment["time"] = $row["apnt_time"];
    $appointment["time"] =  date_format(date_create($row["apnt_time"])," h:i a");
    $appointment["date"] = date_format(date_create($row["apnt_date"]),"d M, Y");
//    $appointment["date"] = $row["apnt_date"];
    $appointment["timestamp"] =
    $appointment["timestamp"] = date_format(date_create($row["datetime"]),"d M, Y h:i a");
//    $appointment["timestamp"] = $row["datetime"];
    array_push($output["data"], $appointment);
  }
}


echo json_encode($output);

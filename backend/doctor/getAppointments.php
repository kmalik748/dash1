<?php
require '../app.php';
$output = array(
  "Success"=>false,
  "data" =>array()
);

$data = json_decode(file_get_contents("php://input"));
$doctorID = secure_parm($data->doctorID);

$s = "SELECT * FROM appointments WHERE doctor_id = $doctorID";
$output["q1"] = $s;
$r = mysqli_query($con, $s);
if(mysqli_num_rows($r)){
  while ($row=mysqli_fetch_array($r, MYSQLI_ASSOC)){
    $appointment = array();
    $patID = $appointment["patID"] = $row["patient_id"];
    $sql = "SELECT * FROM users WHERE id = $patID";
    $output["q2"] = $sql;
    $res = mysqli_query($con, $sql);
    $r1 = mysqli_fetch_array($res);
    $appointment["id"] = $row["id"];
    $appointment["userType"] = $r1["userType"];
    $appointment["PatientName"] = $r1["first_name"].' '.$r1["middle_name"].' '.$r1["last_name"];
    $appointment["email"] = $r1["email"];
    $appointment["pic"] = "https://picsum.photos/300/300";
//    $appointment["time"] = $row["apnt_time"];
    $appointment["time"] =  date_format(date_create($row["apnt_time"])," h:i a");
    $appointment["date"] = date_format(date_create($row["apnt_date"]),"d M, Y");
    $appointment["date_standard"] = $row["apnt_date"];
//    $appointment["date"] = $row["apnt_date"];
    $appointment["timestamp"] =
    $appointment["timestamp"] = date_format(date_create($row["datetime"]),"d M, Y h:i a");
//    $appointment["timestamp"] = $row["datetime"];
    array_push($output["data"], $appointment);
  }
}


echo json_encode($output);

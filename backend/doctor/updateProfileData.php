<?php
require '../app.php';
$output = array("Success"=>false);

$data = json_decode(file_get_contents("php://input"));

//print_r($data); exit(); die();

$speciality = secure_parm($data->speciality);
$qualification = secure_parm($data->qualification);
$fees = secure_parm($data->fees);
$availability = secure_parm($data->availability);

$output["Data"] = $availability;

//$sql = "UPDATE doctors SET specialty='$firstname', qualification='$middlename', last_name='$lastname',
//        gender='$gender', dob='$dob', city='$city', country='$country', phone_number='$phone',
//        password='$password', userType='$userType', state='$state'
//       WHERE id=$id";
//if(mysqli_query($con, $sql)){
//    $output["Success"] = true;
//}

echo json_encode($output);

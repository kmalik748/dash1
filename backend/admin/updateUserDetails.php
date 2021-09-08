<?php
require '../app.php';

$output = array("Success"=>false);

$data = json_decode(file_get_contents("php://input"));

$id = secure_parm($data->id);
$firstname = secure_parm($data->firstname);
$middlename = secure_parm($data->middlename);
$lastname = secure_parm($data->lastname);
$dob = secure_parm($data->dob);
$phone = secure_parm($data->phone);
$city = secure_parm($data->city);
$state = secure_parm($data->state);
$country = secure_parm($data->country);
$email = secure_parm($data->email);
$password = secure_parm($data->password);
$gender = secure_parm($data->gender);
$userType = secure_parm($data->userType);

$sql = "UPDATE users SET first_name='$firstname', middle_name='$middlename', last_name='$lastname',
        gender='$gender', dob='$dob', city='$city', country='$country', phone_number='$phone',
        password='$password', userType='$userType', state='$state'
       WHERE id=$id";
if(mysqli_query($con, $sql)){
    $output["Success"] = true;
}

echo json_encode($output);

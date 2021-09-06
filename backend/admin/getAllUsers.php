<?php
require '../app.php';
$users = array();

$sql = "SELECT
       id,
       first_name,
       middle_name,
       last_name,
       gender,
       dob,
       city,
       state,
       country,
       email,
       phone_number
       FROM users";
$res = mysqli_query($con, $sql);
if(mysqli_num_rows($res)){
  while($row=mysqli_fetch_array($res, MYSQLI_ASSOC)){
    array_push($users, $row);
  }
}

echo json_encode($users);

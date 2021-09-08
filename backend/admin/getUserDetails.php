<?php
require '../app.php';

$user = array();
$data = json_decode(file_get_contents("php://input"));
$id = secure_parm($data->id);

$sql = "SELECT
       *
       FROM users WHERE id=$id";
$res = mysqli_query($con, $sql);
if(mysqli_num_rows($res)){
  $row=mysqli_fetch_array($res, MYSQLI_ASSOC);
    $user = $row;
}

echo json_encode($user);

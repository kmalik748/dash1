<?php
require '../app.php';
$output = array("Success"=>false);

$data = json_decode(file_get_contents("php://input"));

$key = secure_parm($data->key);

require_once('../vendor/autoload.php');
use \Firebase\JWT\JWT;

$decoded = array("data"=>array("data"=>array("id"=>null)));
//print_r($decoded);
try {
  $decoded = JWT::decode($key, SECRET_KEY, array(ALGORITHM));

} catch (\Exception $e) {
  return FALSE;
}

$userId =  $decoded->data->id;

$s = "SELECT pic FROM users WHERE id=$userId";

$output["sql"] = $s;

$res = mysqli_query($con, $s);
$row = mysqli_fetch_array($res);
$output["Success"] = true;
$output["picture"] = $row["pic"];


echo json_encode($output);

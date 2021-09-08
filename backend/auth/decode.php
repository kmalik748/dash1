<?php

require '../app.php';

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

echo json_encode((array)$decoded);

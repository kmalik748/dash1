<?php

require '../app.php';

$data = json_decode(file_get_contents("php://input"));

$uname = secure_parm($data->name);
$pass = secure_parm($data->pass);

$data = array(
  "uname" => $uname,
  "pass" => $pass
);

require_once('../vendor/autoload.php');
use \Firebase\JWT\JWT;
$token = array(
  "iss" => "http://example.org",
  "aud" => "http://example.com",
  "iat" => $iat,
  "nbf" => $nbf,
  "exp" => $exp,
  "data" => $data
);

http_response_code(200);

$jwt = JWT::encode($token, SECRET_KEY);
echo json_encode(array("token"=>$jwt));


//$decoded = JWT::decode($token, SECRET_KEY, array(ALGORITHM));

//echo json_encode((array)$decoded);

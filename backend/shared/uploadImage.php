<?php

require '../app.php';
$output = array("Result"=>false, "msg" =>"");

//require '../../src/assets/profilePics';
$folderPath = "../../src/assets/profilePics/";

$postdata = file_get_contents("php://input");


$data = json_decode($postdata);
$key = secure_parm($data->token);
require_once('../vendor/autoload.php');
use \Firebase\JWT\JWT;
$decoded = array("data"=>array("data"=>array("id"=>null)));
try {
  $decoded = JWT::decode($key, SECRET_KEY, array(ALGORITHM));
} catch (\Exception $e) {
  return FALSE;
}
$userId =  $decoded->data->id;

if(!empty($postdata)){
  $request = json_decode($postdata);

  $image_parts = explode(";base64,", $request->image);
  $image_type_aux = explode("image/", $image_parts[0]);
  $image_base64 = base64_decode($image_parts[1]);
  $filename = uniqid() . '.png';
  $file = $folderPath . $filename;
  if(file_put_contents($file, $image_base64)){
    $s = "UPDATE users SET pic='$filename' WHERE id=$userId";
    if(mysqli_query($con, $s)){
      $output["Result"] = true;
      $output["imageName"] = $filename;
      $output["msg"] = 'Image Uploaded Successfully';
    }else{
      $output["Error"] = mysqli_error($con);
    }
  }else{
    $output["msg"] = 'Error occurred in uploading image';
  }
  echo json_encode($output);
}
?>

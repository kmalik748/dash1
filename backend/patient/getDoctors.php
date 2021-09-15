<?php
require '../app.php';
$output = array("Success"=>false);

$data = json_decode(file_get_contents("php://input"));
$speciality = secure_parm($data->query);

$q = htmlspecialchars($speciality, ENT_QUOTES, "ISO-8859-1");
$q = stripslashes($q);
$search_exploded = explode (" ", $q);

$construct = "";
$construct .=" CONCAT(specialty,' ',qualification,' ',tags) LIKE '%$q%' ";

foreach($search_exploded as $search_each)
{
  $construct .=" OR CONCAT(specialty,' ',qualification,' ',tags) LIKE '%$search_each%' ";
}
$doctor = array();
$output["Doctors"] = array();
$constructs ="SELECT * FROM doctors WHERE  ($construct) ";
$run = mysqli_query($con, $constructs);
$output["TotalRows"] = mysqli_num_rows($run);

if(mysqli_num_rows($run)){
  $output["Success"] = true;
  while($row = mysqli_fetch_array($run, MYSQLI_ASSOC)){
    $id = $row["id"];
    $doctor["picture"] = "https://picsum.photos/170/170?random=1";
    $doctor["specialty"] = $row["specialty"];
    $doctor["qualification"] = $row["qualification"];
    $doctor["fees"] = $row["fees"];
    $doctor["tags"] = $row["tags"];
    $doctor["startTime"] = $row["startTime"];
    $doctor["endTime"] = $row["endTime"];
    $constructs ="SELECT * FROM users WHERE id=$id";
    $res = mysqli_query($con, $constructs);
    $row = mysqli_fetch_array($res, MYSQLI_ASSOC);
    $doctor["id"] = $row["id"];
    $doctor["fullName"] = $row["first_name"].' '.$row["middle_name"].' '.$row["last_name"];
    array_push($output["Doctors"], $doctor);
  }
}



echo json_encode($output);

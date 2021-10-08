<?php
require '../app.php';
$output = array("Success"=>false);

$data = json_decode(file_get_contents("php://input"));
$speciality = secure_parm($data->query);
$docName = secure_parm($data->docName);

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


if(!empty($speciality) && $speciality!=="") {
  if(mysqli_num_rows($run)){
    $output["Success"] = true;
    while($row = mysqli_fetch_array($run, MYSQLI_ASSOC)){
      $id = $row["doctor_id"];

      $days = array();
      $from_date = new DateTime($row["startTime"]);
      $to_date = new DateTime($row["endTime"]);
      for ($date = $from_date; $date <= $to_date; $date->modify('+1 day')) {
        if (!in_array($date->format('D'), $days))
        {
          array_push($days, $date->format('D'));
        }
      }

      $doctor["days"] = $days;
      $doctor["picture"] = "https://picsum.photos/170/170";
      $doctor["specialty"] = $row["specialty"];
      $doctor["qualification"] = $row["qualification"];
      $doctor["fees"] = $row["fees"];
      $doctor["tags"] = $row["tags"];
      $doctor["startDate"] = $row["startTime"];
      $doctor["endDate"] = $row["endTime"];

      $doctor["startTime"] = date('g:i A', strtotime($row["startTime"]));
      $doctor["endTime"] = date('g:i A', strtotime($row["endTime"]));
      $qry ="SELECT * FROM users WHERE id=$id";
//    $doctor["qry"] = $qry;
      $res = mysqli_query($con, $qry);
      $row1 = mysqli_fetch_array($res, MYSQLI_ASSOC);
      $doctor["id"] = $row1["id"];
      $doctor["fullName"] = $row1["first_name"].' '.$row1["middle_name"].' '.$row1["last_name"];
      array_push($output["Doctors"], $doctor);
    }
  }
}


if(!empty($docName) && $docName!==""){
  $records = 0;
  $construct = " CONCAT(first_name,' ',middle_name,' ',last_name) LIKE '%$docName%' ";

  $search_exploded = explode (" ", $docName);
  foreach($search_exploded as $search_each)
  {
    $construct .=" OR CONCAT(first_name,' ',middle_name,' ',last_name) LIKE '%$search_each%'  ";
  }


  $constructs ="SELECT * FROM users WHERE $construct";
  $output["d"] = $constructs;
  $run = mysqli_query($con, $constructs);
  $numRows = mysqli_num_rows($run);
  $output["d1"] = $numRows;


  if($numRows>0){
    $records++;
    $output["Success"] = true;
    while($row = mysqli_fetch_array($run, MYSQLI_ASSOC)){
      $id = $row["id"];
      $r ="SELECT * FROM doctors WHERE doctor_id=$id";
      $re = mysqli_query($con, $r);
      if(mysqli_num_rows($re)){
        $row = mysqli_fetch_array($re);

        $id = $row["doctor_id"];

        $days = array();
        $from_date = new DateTime($row["startTime"]);
        $to_date = new DateTime($row["endTime"]);
        for ($date = $from_date; $date <= $to_date; $date->modify('+1 day')) {
          if (!in_array($date->format('D'), $days))
          {
            array_push($days, $date->format('D'));
          }
        }

        $doctor["days"] = $days;
        $doctor["picture"] = "https://picsum.photos/170/170";
        $doctor["specialty"] = $row["specialty"];
        $doctor["qualification"] = $row["qualification"];
        $doctor["fees"] = $row["fees"];
        $doctor["tags"] = $row["tags"];
        $doctor["startDate"] = $row["startTime"];
        $doctor["endDate"] = $row["endTime"];

        $doctor["startTime"] = date('g:i A', strtotime($row["startTime"]));
        $doctor["endTime"] = date('g:i A', strtotime($row["endTime"]));
        $qry ="SELECT * FROM users WHERE id=$id";
//    $doctor["qry"] = $qry;
        $res = mysqli_query($con, $qry);
        $row1 = mysqli_fetch_array($res, MYSQLI_ASSOC);
        $doctor["id"] = $row1["id"];
        $doctor["fullName"] = $row1["first_name"].' '.$row1["middle_name"].' '.$row1["last_name"];
        array_push($output["Doctors"], $doctor);
      }
    }
  }
  $output["TotalRows"] = $records;
}


    $output["Doctors"] = array_unique($output["Doctors"], SORT_REGULAR);


echo json_encode($output);

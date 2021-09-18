<?php
require '../app.php';
$output = array("Success"=>false);

$data = json_decode(file_get_contents("php://input"));
$docID = secure_parm($data->docID);

$s = "SELECT * FROM doctors WHERE doctor_id=$docID";
$r = mysqli_query($con, $s);
$row = mysqli_fetch_array($r, MYSQLI_ASSOC);

//echo date('H:i', strtotime($row["startTime"]));
//echo "<br>";
//echo date('H:i', strtotime($row["endTime"]));

$slots = getTimeSlot(30, $row["startTime"], $row["endTime"]);

$output["Success"] = true;
$output["times"] = $slots;
$output["dates"] = getDates($row["startTime"], $row["endTime"]);

echo json_encode($output);


function getTimeSlot($interval, $start_time, $end_time)
{
  $timeFormat = "H:i";
  $start = new DateTime($start_time);
  $end = new DateTime($end_time);
  $startTime = $start->format($timeFormat);
  $endTime = $end->format($timeFormat);
//  echo $start_time.' - '.$end_time; exit(); die();
  $times = array();
  while(strtotime($startTime) <= strtotime($endTime)){
    $time = array();
    $start = $startTime;
    $end = date($timeFormat,strtotime('+'.$interval.' minutes',strtotime($startTime)));
    $startTime = date($timeFormat,strtotime('+'.$interval.' minutes',strtotime($startTime)));
    if(strtotime($startTime) <= strtotime($endTime)){
      $time['start_time'] = $start;
      $time['end_time'] = $end;
    }
    array_push($times, "$start-$end");
  }
  return $times;
}

function getDates($date1, $date2, $format = 'd-m-Y' ) {
  $dates = array();
  $current = strtotime($date1);
  $date2 = strtotime($date2);
  $stepVal = '+1 day';
  while( $current <= $date2 ) {
    $dates[] = date($format, $current);
    $current = strtotime($stepVal, $current);
  }
  return (array) $dates;
}


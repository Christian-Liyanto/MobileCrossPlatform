<?php 

// Because we will use this php to REST API.
// Client side bisa mengambil data dari server yang berbeda
if(isset($_SERVER['HTTP_ORIGIN'])){
  header('Access-Control-Allow-Origin: *');
  header('Access-Control-Allow-Methods: POST, PUT, DELETE, OPTIONS');
  header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
}

$response = array();

// Check for required fields
if(isset($_POST['title']) && isset($_POST['photoName']) && isset($_POST['type']) && isset($_FILES['photo'])){
  $title = $_POST['title'];
  $type = $_POST['type'];
  $photo = $_FILES['photo'];
  $photoName = $_POST['photoName'];

  // Included 
  require_once __DIR__ . '/dbconfig.php';

  // Connecting to db
  $db = mysqli_connect(DB_SERVER, DB_USER, DB_PASSWORD, DB_DATABASE) or die(mysqli_connect_error());

  // var_dump($photo);

  $source = $photo['tmp_name'];
  $destination = 'uploads/' . $photoName;

  // var_dump($destination);
  
  move_uploaded_file($source, $destination);

  $result = mysqli_query($db, "INSERT INTO memories (title, type, photo ) VALUES('$title','$type','$destination')") or die(mysqli_connect_error());
  
  // var_dump($result);

  // Check if row inserted or not
  if($result) { 
    // Successfully inserted into database
    $response['success'] = 1;
    $response['message'] = "Memory Data Success Inserted";
  }
  else{
    // Failed insert row
    $response['success'] = 0;
    $response['message'] = "Memory Data Failed Inserted";
  }
  echo json_encode($response);
}
else{
  // Form reuired field is missing

  $response['success'] = 0;
  $response['message'] = "Must fill all data requirement";
  
  echo json_encode($response);
}

?>
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
if(isset($_POST['nim']) && isset($_POST['nama']) && isset($_POST['prodi']) && isset($_FILES['foto'])){
  $nim = $_POST['nim'];
  $nama = $_POST['nama'];
  $prodi = $_POST['prodi'];
  $foto = $_FILES['foto'];

  // Included 
  require_once __DIR__ . '/dbconfig.php';

  // Connecting to db
  $db = mysqli_connect(DB_SERVER, DB_USER, DB_PASSWORD, DB_DATABASE) or die(mysqli_connect_error());

  // var_dump($foto);

  $source = $foto['tmp_name'];
  $destination = 'uploads/' . $foto['name'];

  // var_dump($destination);
  
  move_uploaded_file($source, $destination);

  $result = mysqli_query($db, "INSERT INTO students VALUES('$nim', '$nama','$prodi','$destination')") or die(mysqli_connect_error());

  // Check if row inserted or not
  if($result) {
    // Successfully inserted into database
    $response['success'] = 1;
    $response['message'] = "Student Data Success Inserted";
  }
  else{
    // Failed insert row
    $response['success'] = 0;
    $response['message'] = "Student Data Failed Inserted";
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
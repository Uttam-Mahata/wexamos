<?php
// db.php
$servername = "localhost:3308";
$username = "root";
$password = "";
$dbname = "wexamos";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
?>

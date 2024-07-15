<?php
header('Content-Type: application/json');

// Database connection
include 'db.php';

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(array('success' => false, 'message' => 'Database connection failed: ' . $conn->connect_error)));
}

$sql = "SELECT StudentID, StudentName FROM students";
$result = $conn->query($sql);

$students = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $students[] = $row;
    }
}

echo json_encode(array('students' => $students));

$conn->close();
?>

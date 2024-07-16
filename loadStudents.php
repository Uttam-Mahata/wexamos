<?php
header('Content-Type: application/json');

// Database connection
include 'db.php';

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(array('success' => false, 'message' => 'Database connection failed: ' . $conn->connect_error)));
}

$courseID = isset($_GET['courseID']) ? intval($_GET['courseID']) : 0;

if ($courseID > 0) {
    $sql = "SELECT StudentID, StudentName FROM students WHERE CourseID = $courseID";
}

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

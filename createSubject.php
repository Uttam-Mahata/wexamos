<?php
header('Content-Type: application/json');

// Database connection details
include 'db.php';

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(array('success' => false, 'message' => 'Connection failed: ' . $conn->connect_error)));
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['courseID']) && isset($_POST['subjectName'])) {
        $courseID = $conn->real_escape_string($_POST['courseID']);
        $subjectName = $conn->real_escape_string($_POST['subjectName']);

        $sql = "INSERT INTO subjects (CourseID, SubjectName) VALUES ('$courseID', '$subjectName')";

        if ($conn->query($sql) === TRUE) {
            echo json_encode(array('success' => true));
        } else {
            echo json_encode(array('success' => false, 'message' => 'Error: ' . $sql . '<br>' . $conn->error));
        }
    } else {
        echo json_encode(array('success' => false, 'message' => 'Course ID and Subject Name are required'));
    }
} else {
    echo json_encode(array('success' => false, 'message' => 'Invalid request method'));
}

$conn->close();
?>

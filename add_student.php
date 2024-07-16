<?php
header('Content-Type: application/json');

// Database connection
include 'db.php';

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(array('success' => false, 'message' => 'Database connection failed: ' . $conn->connect_error)));
}

// Get the posted data
$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['studentName'], $data['emailID'], $data['dateOfBirth'], $data['courseID'])) {
    $studentName = $data['studentName'];
    $emailID = $data['emailID'];
    $dateOfBirth = $data['dateOfBirth'];
    $courseID = $data['courseID'];

    $sql = "INSERT INTO students (StudentName, EmailID, DateOfBirth, CourseID) VALUES (?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssi", $studentName, $emailID, $dateOfBirth, $courseID);

    if ($stmt->execute()) {
        echo json_encode(array('success' => true, 'message' => 'Student added successfully'));
    } else {
        echo json_encode(array('success' => false, 'message' => 'Failed to add student: ' . $stmt->error));
    }

    $stmt->close();
} else {
    echo json_encode(array('success' => false, 'message' => 'Invalid input'));
}

$conn->close();
?>

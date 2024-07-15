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

if (isset($data['studentID'], $data['examID'], $data['obtainedMarks'], $data['fullMarks'])) {
    $studentID = $data['studentID'];
    $examID = $data['examID'];
    $obtainedMarks = $data['obtainedMarks'];
    $fullMarks = $data['fullMarks'];

    $sql = "INSERT INTO scores (StudentID, ExamID, ObtainedMarks, FullMarks) VALUES (?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("iiii", $studentID, $examID, $obtainedMarks, $fullMarks);

    if ($stmt->execute()) {
        echo json_encode(array('success' => true, 'message' => 'Score added successfully'));
    } else {
        echo json_encode(array('success' => false, 'message' => 'Failed to add score: ' . $stmt->error));
    }

    $stmt->close();
} else {
    echo json_encode(array('success' => false, 'message' => 'Invalid input'));
}

$conn->close();
?>

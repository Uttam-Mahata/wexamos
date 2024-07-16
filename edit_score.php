<?php
header('Content-Type: application/json');

include 'db.php';

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(array('success' => false, 'message' => 'Database connection failed: ' . $conn->connect_error)));
}

$data = json_decode(file_get_contents('php://input'), true);
$scoreID = $data['scoreID'];
$obtainedMarks = $data['obtainedMarks'];
$fullMarks = $data['fullMarks'];

$sql = "UPDATE Scores SET ObtainedMarks = ?, FullMarks = ? WHERE ScoreID = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("iii", $obtainedMarks, $fullMarks, $scoreID);

if ($stmt->execute()) {
    echo json_encode(array('success' => true));
} else {
    echo json_encode(array('success' => false, 'message' => 'Error updating score'));
}

$stmt->close();
$conn->close();
?>

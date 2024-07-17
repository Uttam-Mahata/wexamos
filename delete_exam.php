<?php
include 'db.php';

header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

$examId = $data['id'];

$sql = "DELETE FROM Exams WHERE ExamID = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param('i', $examId);

$response = [];
if ($stmt->execute()) {
    $response['success'] = true;
} else {
    $response['success'] = false;
    $response['error'] = $stmt->error;
}

echo json_encode($response);

$stmt->close();
$conn->close();
?>

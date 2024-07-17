<?php
include 'db.php';

header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

$examId = $data['id'];
$examName = $data['name'];
$examDate = $data['date'];
$examSubject = $data['subject'];

$sql = "UPDATE Exams SET ExamName = ?, ExamDate = ?, SubjectID = (SELECT SubjectID FROM Subjects WHERE SubjectName = ?) WHERE ExamID = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param('sssi', $examName, $examDate, $examSubject, $examId);

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

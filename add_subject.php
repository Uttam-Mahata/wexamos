<?php
header('Content-Type: application/json');
include 'db.php';

$data = json_decode(file_get_contents('php://input'), true);

$courseID = $data['courseID'];
$subjectName = $data['subjectName'];

if (empty($courseID) || empty($subjectName)) {
    echo json_encode(['success' => false, 'message' => 'Course ID and subject name are required']);
    exit;
}

$sql = "INSERT INTO Subjects (CourseID, SubjectName) VALUES (?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param('is', $courseID, $subjectName);

if ($stmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Error adding subject']);
}

$stmt->close();
$conn->close();
?>

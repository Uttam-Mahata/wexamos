<?php
include 'db.php';

header('Content-Type: application/json');

$courseId = $_GET['course_id'];

$sql = "SELECT StudentID, StudentName, EmailID, DateOfBirth FROM Students WHERE CourseID = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param('i', $courseId);
$stmt->execute();
$result = $stmt->get_result();

$students = [];
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $students[] = $row;
    }
}

echo json_encode(['students' => $students]);

$stmt->close();
$conn->close();
?>

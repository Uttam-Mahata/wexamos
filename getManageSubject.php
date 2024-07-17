<?php
require 'db.php';

$course_id = $_GET['course_id'];

$sql = "SELECT SubjectID, SubjectName FROM subjects WHERE CourseID = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param('i', $course_id);
$stmt->execute();
$result = $stmt->get_result();

$subjects = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $subjects[] = $row;
    }
}

echo json_encode(['subjects' => $subjects]);
?>

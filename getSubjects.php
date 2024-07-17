<?php
require 'db.php';

$courseID = $_GET['courseID'];

$sql = "SELECT SubjectID, SubjectName FROM subjects WHERE CourseID = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param('i', $courseID);
$stmt->execute();
$result = $stmt->get_result();

$subjects = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $subjects[] = $row;
    }
}

echo json_encode($subjects);
?>    